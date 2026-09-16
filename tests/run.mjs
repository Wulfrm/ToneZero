import './core.test.mjs';
import './worker.test.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {makeHandler} from '../worker/index.js';

test('provider failures distinguish model and access errors without leaking sensitive details',async t=>{
  const warnings=t.mock.method(console,'warn',()=>{});
  const env={ALLOWED_ORIGIN:'https://wulfrm.github.io',TURNSTILE_HOSTNAME:'wulfrm.github.io',GEMINI_API_KEY:'private-provider-key',TURNSTILE_SECRET_KEY:'private-verification-key',TONE_RATE_LIMITER:{limit:async()=>({success:true})}};
  const query='Private guitar search';
  const sensitive=[env.GEMINI_API_KEY,env.TURNSTILE_SECRET_KEY,query,'private-provider-payload','private-token'];
  for(const [status,code,error] of [
    [404,'AI_MODEL_UNAVAILABLE','The configured AI model is unavailable to this project. Built-in tones and manual gear setup remain available.'],
    [401,'AI_ACCESS_DENIED','The AI provider denied access. The site owner needs to check the API key and project access. Built-in tones remain available.'],
    [403,'AI_ACCESS_DENIED','The AI provider denied access. The site owner needs to check the API key and project access. Built-in tones remain available.'],
    [500,'AI_UPSTREAM_UNAVAILABLE','AI research is temporarily unavailable. Please try again later. Built-in tones remain available.']
  ]){
    const handler=makeHandler(async url=>url.includes('siteverify')?Response.json({success:true,hostname:env.TURNSTILE_HOSTNAME,action:'research'}):Response.json({error:sensitive.join(' ')},{status}));
    const request=new Request('https://api.example.com/api/research',{method:'POST',headers:{Origin:env.ALLOWED_ORIGIN,'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.1'},body:JSON.stringify({kind:'guitar',query,token:'private-token'})});
    const response=await handler.fetch(request,env),body=await response.json();
    assert.equal(response.status,503);
    assert.equal(response.headers.get('Cache-Control'),'no-store');
    assert.deepEqual(body,{code,error});
    assert.deepEqual(warnings.mock.calls.at(-1).arguments,[{event:'gemini_request_failed',httpStatus:status,model:'gemini-2.5-flash'}]);
    for(const value of sensitive){assert(!JSON.stringify(body).includes(value));assert(!JSON.stringify(warnings.mock.calls.map(call=>call.arguments)).includes(value))}
  }
  assert.equal(warnings.mock.callCount(),4);
});
