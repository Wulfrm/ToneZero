import test from 'node:test';
import assert from 'node:assert/strict';
import {makeHandler} from '../worker/index.js';
import {TONES,AMPS} from '../dist/data.js';
const env={ALLOWED_ORIGIN:'https://wulfrm.github.io',TURNSTILE_HOSTNAME:'wulfrm.github.io',GEMINI_API_KEY:'test-only-secret',TURNSTILE_SECRET_KEY:'test-only-secret',TONE_RATE_LIMITER:{limit:async()=>({success:true})}};
const request=(body={kind:'guitar',query:'Fender test model',token:'test-token'},origin=env.ALLOWED_ORIGIN)=>new Request('https://api.example.com/api/research',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.1'},body:JSON.stringify(body)});
const answer={summary:'A sourced guitar profile.',caveats:'Check year.',profile:{name:'Example guitar',pickup:'single',specs:[]}};
const good={candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(answer)}]},groundingMetadata:{groundingChunks:[{web:{uri:'https://example.com/specs',title:'Manufacturer'}}],groundingSupports:[{segment:{text:'A sourced guitar profile.'},groundingChunkIndices:[0]}],searchEntryPoint:{renderedContent:'<div>Search suggestions</div>'}}}]};
const verify={success:true,hostname:env.TURNSTILE_HOSTNAME,action:'research'};
test('grounded research validates result and keeps secrets server-side',async()=>{const calls=[];const handler=makeHandler(async(url,opts)=>{calls.push([url,opts]);return Response.json(url.includes('siteverify')?verify:good)});const response=await handler.fetch(request(),env);assert.equal(response.status,200);assert.equal(response.headers.get('Cache-Control'),'no-store');const data=await response.json();assert.equal(data.profile.pickup,'single');assert.equal(data.sources[0].url,'https://example.com/specs');assert.equal(data.supports[0].sourceIndices[0],0);assert(data.searchEntryPoint);assert(!JSON.stringify(data).includes('test-only-secret'));const body=JSON.parse(calls[1][1].body);assert.deepEqual(body.tools,[{google_search:{}}]);assert(!body.generationConfig.responseMimeType);assert.equal(calls[1][1].headers['x-goog-api-key'],'test-only-secret')});
test('origin, invalid JSON structures, oversized body and unconfigured service fail before provider calls',async()=>{let calls=0;const h=makeHandler(async()=>{calls++;throw Error()});assert.equal((await h.fetch(request(undefined,'https://evil.example'),env)).status,403);assert.equal((await h.fetch(request(),{...env,GEMINI_API_KEY:''})).status,503);for(const body of [null,[],{kind:{toString:1},query:'test',token:'x'},{kind:'guitar',query:'test',token:4},{kind:'guitar',query:'x'.repeat(7000),token:'x'}])assert.equal((await h.fetch(request(body),env)).status,400);assert.equal(calls,0)});
test('verification rejects wrong host/action and rate limiter blocks all upstream calls',async()=>{for(const wrong of [{...verify,hostname:'evil.example'},{...verify,action:'other'},{success:false}]){let calls=0;const h=makeHandler(async()=>{calls++;return Response.json(wrong)});assert.equal((await h.fetch(request(),env)).status,403);assert.equal(calls,1)}let calls=0;const h=makeHandler(async()=>{calls++;throw Error()});assert.equal((await h.fetch(request(),{...env,TONE_RATE_LIMITER:{limit:async()=>({success:false})}})).status,429);assert.equal(calls,0)});
test('provider limits, missing grounding and malformed AI never become invented successes',async()=>{for(const [body,status,expected] of [[{},429,429],[{candidates:[{...good.candidates[0],groundingMetadata:{}}]},200,422],[{candidates:[{...good.candidates[0],content:{parts:[{text:'bad JSON'}]}}]},200,422],[{candidates:[{...good.candidates[0],finishReason:'MAX_TOKENS'}]},200,502]]){const h=makeHandler(async url=>url.includes('siteverify')?Response.json(verify):Response.json(body,{status}));assert.equal((await h.fetch(request(),env)).status,expected)}});

const tavilyEnv={...env,RESEARCH_PROVIDER:'tavily',TAVILY_API_KEY:'private-tavily-key',GEMINI_API_KEY:'private-gemini-key',TURNSTILE_SECRET_KEY:'private-turnstile-key'};
const retrieved={results:[{title:'Manufacturer specifications',url:'https://manufacturer.example/specs',content:'The exact model uses single-coil pickups.'}]};
const synthesis=profile=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify({...answer,profile})}]},groundingMetadata:good.candidates[0].groundingMetadata}]});
test('Tavily performs one basic search after verification, then Gemini JSON synthesis without Google Search',async()=>{
  const events=[],calls=[];
  const handler=makeHandler(async(url,opts)=>{calls.push([url,opts]);events.push(url);if(url.includes('siteverify'))return Response.json(verify);if(url==='https://api.tavily.com/search')return Response.json(retrieved);return Response.json(synthesis(answer.profile))});
  const response=await handler.fetch(request(),{...tavilyEnv,TONE_RATE_LIMITER:{limit:async({key})=>{events.push('rate-limit');assert.match(key,/^[a-f0-9]{64}$/);assert(!key.includes('192.0.2.1'));return {success:true}}}});
  assert.equal(response.status,200);
  assert.deepEqual(events,['rate-limit','https://challenges.cloudflare.com/turnstile/v0/siteverify','https://api.tavily.com/search','https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent']);
  const searchBody=JSON.parse(calls[1][1].body);
  assert.deepEqual(searchBody,{query:'Fender test model guitar official specifications manual',topic:'general',search_depth:'basic',max_results:6,include_answer:false,include_raw_content:false,include_images:false,auto_parameters:false});
  assert.equal(calls[1][1].headers.Authorization,'Bearer '+tavilyEnv.TAVILY_API_KEY);
  const modelBody=JSON.parse(calls[2][1].body);
  assert(!Object.hasOwn(modelBody,'tools'));
  assert.equal(modelBody.generationConfig.responseMimeType,'application/json');
  assert.deepEqual(modelBody.generationConfig.thinkingConfig,{thinkingLevel:'minimal'});
  assert(modelBody.systemInstruction.parts[0].text.includes('Use only the supplied web-search excerpts'));
  assert(modelBody.contents[0].parts[0].text.includes(retrieved.results[0].content));
  assert.equal(calls[2][1].headers['x-goog-api-key'],tavilyEnv.GEMINI_API_KEY);
  assert(!calls[2][1].body.includes(tavilyEnv.TAVILY_API_KEY));
  assert(!calls[1][1].body.includes(tavilyEnv.GEMINI_API_KEY));
  const data=await response.json();
  assert.equal(data.searchProvider,'tavily');assert.equal(data.model,'gemini-3.1-flash-lite');assert.equal(data.searchEntryPoint,'');
  assert.deepEqual(data.sources,[{title:retrieved.results[0].title,url:retrieved.results[0].url}]);
  assert.deepEqual(data.supports,[{text:retrieved.results[0].content,sourceIndices:[0]}]);
  for(const key of [tavilyEnv.TAVILY_API_KEY,tavilyEnv.GEMINI_API_KEY,tavilyEnv.TURNSTILE_SECRET_KEY])assert(!JSON.stringify(data).includes(key));
});
test('Tavily does not spend search quota without a configured key, successful rate limit and valid verification',async()=>{
  for(const scenario of [
    {config:{TAVILY_API_KEY:''},expected:503,calls:0},
    {config:{TONE_RATE_LIMITER:{limit:async()=>({success:false})}},expected:429,calls:0},
    {verification:{...verify,success:false},expected:403,calls:1},
    {verification:{...verify,hostname:'other.example'},expected:403,calls:1},
    {verification:{...verify,action:'other'},expected:403,calls:1}
  ]){
    const calls=[];const handler=makeHandler(async url=>{calls.push(url);assert(url.includes('siteverify'));return Response.json(scenario.verification||verify)});
    const response=await handler.fetch(request(),{...tavilyEnv,...scenario.config});assert.equal(response.status,scenario.expected);assert.equal(calls.length,scenario.calls);
  }
});
test('Tavily empty, unsafe or quota-limited results stop before Gemini without exposing provider errors',async()=>{
  for(const [status,body,expected] of [
    [200,{results:[]},422],
    [200,{results:[{url:'javascript:alert(1)',content:'Unsafe'},{url:'https://example.com/empty',content:'   '}]},422],
    [429,{error:'private-provider-error '+tavilyEnv.TAVILY_API_KEY},429],
    [432,{error:'private-provider-error '+tavilyEnv.TAVILY_API_KEY},429],
    [433,{error:'private-provider-error '+tavilyEnv.TAVILY_API_KEY},429],
    [401,{error:'private-provider-error '+tavilyEnv.TAVILY_API_KEY},503]
  ]){
    const calls=[];const handler=makeHandler(async url=>{calls.push(url);if(url.includes('siteverify'))return Response.json(verify);assert.equal(url,'https://api.tavily.com/search');return Response.json(body,{status})});
    const response=await handler.fetch(request(),tavilyEnv);assert.equal(response.status,expected);assert.equal(calls.length,2);if(expected===429)assert.equal(response.headers.get('Retry-After'),'60');const text=await response.text();assert(!text.includes('private-provider-error'));assert(!text.includes(tavilyEnv.TAVILY_API_KEY));
  }
});
test('Tavily source links come only from retrieved results, including nested amp and song profiles',async()=>{
  const fabricated='https://model-invented.example/fake';
  for(const [kind,baseProfile] of [['guitar',answer.profile],['amp',AMPS[0]],['song',TONES[0]]]){
    const profile={...baseProfile,sources:[{title:'Invented',url:fabricated}],research:{rawText:'Invented',sources:[{title:'Invented',url:fabricated}]}};
    const handler=makeHandler(async url=>Response.json(url.includes('siteverify')?verify:url==='https://api.tavily.com/search'?{results:[{...retrieved.results[0]},{...retrieved.results[0]},{title:'Unsafe',url:'http://insecure.example',content:'Unsafe link'}]}:synthesis(profile)));
    const response=await handler.fetch(request({kind,query:'Specific model or song',token:'test-token'}),tavilyEnv);assert.equal(response.status,200);const data=await response.json();
    assert.deepEqual(data.sources,[{title:retrieved.results[0].title,url:retrieved.results[0].url}]);
    assert.deepEqual(data.supports,[{text:retrieved.results[0].content,sourceIndices:[0]}]);
    assert(!JSON.stringify(data.profile).includes(fabricated),'A model-generated link must not survive in the validated profile.');
  }
});
