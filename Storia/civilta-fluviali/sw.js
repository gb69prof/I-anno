const CACHE='civilta-fluviali-v7';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./assets/icon.svg','./assets/cover-civilta-fluviali.webp','./assets/cartina-civilta-fluviali.webp','./assets/cartina-oggi-civ-fluviali.webp','./assets/cartina-mesopotamia.webp','./assets/cartina-egitto.webp'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))));});
