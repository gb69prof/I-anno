// Run the production service worker in a controlled worker-like context.
// Tests routing, origin/path isolation and cache lifecycle; not a substitute for Safari QA.
import vm from 'node:vm';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const source=await fs.readFile(path.join(root,'sw.js'),'utf8');
const results=[];
for(const pathname of ['/','/I-anno/antologia/']){
 const scope='https://example.test'+pathname;
 const cacheMaps=new Map([['other-pwa-cache',new Map()]]);let online=true,claimed=false,skipped=false;
 const cacheAPI=name=>({addAll:async urls=>{const responses=await Promise.all(urls.map(url=>network(url)));const data=cacheMaps.get(name);urls.forEach((url,i)=>data.set(url,responses[i]));},match:async(request,options={})=>{let url=typeof request==='string'?request:request.url;if(options.ignoreSearch){const u=new URL(url);u.search='';url=u.href;}return cacheMaps.get(name).get(url)?.clone();}});
 const caches={open:async name=>{if(!cacheMaps.has(name))cacheMaps.set(name,new Map());return cacheAPI(name)},keys:async()=>[...cacheMaps.keys()],delete:async name=>cacheMaps.delete(name)};
 const network=async request=>{if(!online)throw new TypeError('Offline');const url=new URL(typeof request==='string'?request:request.url);let file=url.pathname.slice(pathname.length)||'index.html';if(file.endsWith('/'))file+='index.html';const text=await fs.readFile(path.join(root,file));return new Response(text,{status:200})};
 const boot=src=>{const handlers={};vm.runInNewContext(src,{URL,Response,caches,fetch:network,console,self:{registration:{scope},location:{origin:'https://example.test'},addEventListener:(type,fn)=>handlers[type]=fn,clients:{claim:async()=>claimed=true},skipWaiting:async()=>skipped=true}});return handlers};
 const run=async(handler,event={})=>{let promise;handler({...event,waitUntil:p=>promise=p,respondWith:p=>promise=p});return await promise};
 let handlers=boot(source);await run(handlers.install);await run(handlers.activate);assert(claimed);assert(cacheMaps.has('other-pwa-cache'));
 online=false;
 for(const page of ['index.html','lezioni/01-racconto.html?resume=1','lezioni/09-odissea.html?return=c5-identita','assets/mappe/05-antigone.svg','assets/images/c5-identita.webp']){
  const response=await run(handlers.fetch,{request:{url:scope+page,method:'GET',mode:page.includes('.html')?'navigate':'cors'}});assert.equal(response.status,200);assert((await response.arrayBuffer()).byteLength>100);
 }
 const fallback=await run(handlers.fetch,{request:{url:scope+'pagina-inesistente.html',method:'GET',mode:'navigate'}});assert((await fallback.text()).includes('Questa pagina non è nella copia offline'));
 assert.equal(await run(handlers.fetch,{request:{url:'https://external.test/x',method:'GET',mode:'cors'}}),undefined);
 assert.equal(await run(handlers.fetch,{request:{url:scope+'index.html',method:'POST',mode:'cors'}}),undefined);
 if(pathname!=='/')assert.equal(await run(handlers.fetch,{request:{url:'https://example.test/IV-anno/Letteratura/Foscolo/',method:'GET',mode:'navigate'}}),undefined);
 const oldKeys=[...cacheMaps.keys()];online=true;handlers=boot(source.replace(/const VERSION = "[^"]+";/,'const VERSION = "test-update";'));await run(handlers.install);assert(oldKeys.every(k=>cacheMaps.has(k)));await run(handlers.message,{data:{type:'SKIP_WAITING'}});assert(skipped);await run(handlers.activate);assert(cacheMaps.has('other-pwa-cache'));assert.equal(cacheMaps.size,2);assert([...cacheMaps.keys()].some(k=>k.endsWith('test-update')));
 results.push({scope:pathname,status:'PASS',offline_assets:5,offline_fallback:true,query_parameters:true,external_origin_bypassed:true,post_bypassed:true,unrelated_cache_preserved:true,version_update:true});
}
await fs.writeFile(path.join(root,'docs/worker-checks.json'),JSON.stringify({status:'PASS',method:'VM worker harness; no physical device or browser network emulation',results},null,2));console.log(JSON.stringify(results,null,2));
