import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
const port=Number(process.env.TONEZERO_PORT||4173);
http.createServer(async(req,res)=>{try{
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  // Also serve at /tonezero/ to test GitHub project-page subpaths.
  if(pathname.startsWith('/tonezero/'))pathname=pathname.slice('/tonezero'.length);
  if(pathname.endsWith('/'))pathname+='index.html';
  const file=resolve(root,'.'+pathname);
  if(!file.startsWith(resolve(root)+sep)){res.writeHead(403).end();return}
  const data=await readFile(file);
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}).end(data);
}catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`ToneZero preview: http://127.0.0.1:${port}/tonezero/`));
