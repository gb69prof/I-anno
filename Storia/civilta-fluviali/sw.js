/* Offline: la nuova esperienza non può rendere inutilizzabile la PWA principale. */
const CACHE='civilta-fluviali-v9';
const CORE=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./assets/icon.svg','./assets/cover-civilta-fluviali.webp','./assets/cartina-civilta-fluviali.webp','./assets/cartina-oggi-civ-fluviali.webp','./assets/cartina-mesopotamia.webp','./assets/cartina-egitto.webp'];
const LAB=['./laboratorio/','./laboratorio/index.html','./laboratorio/style.css','./laboratorio/content.js','./laboratorio/app.js'];
self.addEventListener('install',event=>event.waitUntil(
 caches.open(CACHE)
 .then(async cache=>{
  await cache.addAll(CORE);
  await Promise.allSettled(LAB.map(path=>cache.add(path)));
 })
 .then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
 caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('civilta-fluviali-')&&k!==CACHE).map(k=>caches.delete(k))))
 .then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(
  fetch(event.request)
  .then(response=>{
   if(response.ok){
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
   }
   return response;
  })
  .catch(async()=>{
   const cache=await caches.open(CACHE);
   const exact=await cache.match(event.request);
   if(exact)return exact;
   if(event.request.mode==='navigate'){
    if(url.pathname.includes('/civilta-fluviali/laboratorio/'))return (await cache.match('./laboratorio/index.html'))||Response.error();
    return (await cache.match('./index.html'))||Response.error();
   }
   return Response.error();
  })
 );
});