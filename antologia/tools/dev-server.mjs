// Development only. No server is required in production: upload the static folder.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const arg=(n,f)=>{const i=process.argv.indexOf(n);return i>=0?process.argv[i+1]:f};
const port=Number(arg('--port',process.env.PORT||4173));
const host=arg('--host','0.0.0.0');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.md':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://preview');
 if(url.pathname==='/__qa'){
  const width=url.searchParams.get('view')==='landscape'?1024:768,height=width===1024?768:1024;
  res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'});
  res.end(`<!doctype html><html lang="it"><title>Collaudo viewport ${width}×${height}</title><body style="margin:0;background:#ddd"><iframe title="Tablet ${width}×${height}" style="border:0;width:${width}px;height:${height}px" src="/I-anno/antologia/lezioni/01-racconto.html"></iframe></body></html>`);return;
 }
 let route;try{route=decodeURIComponent(url.pathname)}catch{res.writeHead(400);res.end();return;}
 if(route.startsWith('/I-anno/antologia/'))route=route.slice('/I-anno/antologia'.length);
 let file=path.resolve(root,'.'+route);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
 try{if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');const ext=path.extname(file);res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(file).pipe(res)}catch{res.writeHead(404,{'content-type':'text/plain'});res.end('Not found')}
}).listen(port,host,()=>console.log(`Static preview ready on port ${port}`));
