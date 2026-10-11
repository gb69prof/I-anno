/* Offline shell + runtime CDN caching for Three.js. Network-first for HTML, cache-first for versioned assets. */
const CACHE='micene-3d-v1.0.0';
const SHELL=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin){
  if(url.hostname==='cdn.jsdelivr.net'){event.respondWith(caches.open(CACHE).then(async cache=>{
   const hit=await cache.match(req);if(hit)return hit;
   const res=await fetch(req);if(res.ok||res.type==='opaque')cache.put(req,res.clone());return res;
  }));}return;
 }
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(async res=>{if(res.ok){(await caches.open(CACHE)).put(req,res.clone())}return res}).catch(async()=>await caches.match(req)||await caches.match('./index.html')));
  return;
 }
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(async res=>{if(res.ok)(await caches.open(CACHE)).put(req,res.clone());return res})));
});