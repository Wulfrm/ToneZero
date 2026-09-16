const VERSION='tonezero-v1.1.0';
const CACHE=VERSION+'-'+self.registration.scope;
const ASSETS=['./','./index.html','./style.css','./app.js','./core.js','./data.js','./config.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith('tonezero-')&&key.endsWith('-'+self.registration.scope)&&key!==CACHE)await caches.delete(key)}await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  // Research results and all third-party traffic must never enter the offline cache.
  if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope)||url.pathname.includes('/api/'))return;
  const known=ASSETS.some(asset=>new URL(asset,self.registration.scope).pathname===url.pathname);
  if(!known&&request.mode!=='navigate')return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    if(['127.0.0.1','localhost'].includes(url.hostname)){try{const fresh=await fetch(request);if(fresh.ok)await cache.put(request,fresh.clone());return fresh}catch{/* use the offline copy */}}
    // Keep the complete app version coherent. New versions activate once all old tabs close.
    const cached=await cache.match(request,{ignoreSearch:true});
    if(cached)return cached;
    try{return await fetch(request)}catch{if(request.mode==='navigate')return (await cache.match('./index.html'))||Response.error();return Response.error()}
  })());
});
