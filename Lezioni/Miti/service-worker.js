/* Miti: cache isolated to this application and directory. */
'use strict';
const VERSION='2026-09-05-v1';
const PREFIX='gbprof-miti-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE=PREFIX+VERSION;
const FILES=[
  "./",
  "./accessibilita.html",
  "./assets/app.js",
  "./assets/cosmos.js",
  "./assets/data.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/mappe/Mappa-02-Edipo-re.png",
  "./assets/mappe/Mappa-03-Hybris-e-nemesi.png",
  "./assets/mappe/Mappa-04-Antigone-legge-e-diritti.png",
  "./assets/mappe/Mappa-05-Iliade-ira-di-Achille.png",
  "./assets/mappe/Mappa-06-Dei-e-Fato.png",
  "./assets/mappe/Mappa-testo-antefatto-contesto.png",
  "./assets/mappe/Schema-sintesi-il-testo-al-centro.png",
  "./assets/style.css",
  "./fonti/01-testo-originale.txt",
  "./fonti/01-testo-web.html",
  "./fonti/02-testo-originale.txt",
  "./fonti/02-testo-web.html",
  "./fonti/03-testo-originale.txt",
  "./fonti/03-testo-web.html",
  "./fonti/04-testo-originale.txt",
  "./fonti/04-testo-web.html",
  "./fonti/05-testo-originale.txt",
  "./fonti/05-testo-web.html",
  "./fonti/06-testo-originale.txt",
  "./fonti/06-testo-web.html",
  "./fonti.html",
  "./guida.html",
  "./index.html",
  "./lezioni/antigone.html",
  "./lezioni/dei-e-fato.html",
  "./lezioni/edipo-re.html",
  "./lezioni/hybris-e-nemesi.html",
  "./lezioni/iliade.html",
  "./lezioni/testo-al-centro.html",
  "./manifest.webmanifest",
  "./mappe.html",
  "./privacy.html",
  "./ripasso.html"
];
const BASE=new URL('./',self.location.href);
const URLS=FILES.map(p=>new URL(p,BASE).href);
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(URLS);await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url);
 if(event.request.method!=='GET'||u.origin!==BASE.origin||!u.pathname.startsWith(BASE.pathname))return;
 // All essential resources form one versioned snapshot. Queries do not duplicate entries.
 u.search='';u.hash='';
 const key=u.href;
 if(!URLS.includes(key))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const hit=await cache.match(key);if(hit)return hit;return fetch(event.request);})());
});
self.addEventListener('message',event=>{if(event.data?.type!=='CHECK_READY')return;event.waitUntil((async()=>{const cache=await caches.open(CACHE);const present=await Promise.all(URLS.map(u=>cache.match(u)));if(present.every(Boolean))event.source?.postMessage({type:'OFFLINE_READY',version:VERSION});})());});
