'use strict';
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const info=JSON.parse(fs.readFileSync(path.join(root,'data/iliade-art-sources.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'fatto/iliade-linea-tempo.html'),'utf8');
const js=fs.readFileSync(path.join(root,'js/iliade-timeline.js'),'utf8');
const css=fs.readFileSync(path.join(root,'css/iliade-linea-tempo.css'),'utf8');
assert.equal(info.length,10,'Expected ten artworks');
assert.equal(new Set(info.map(a=>a.number)).size,10);
for(const [i,a] of info.entries()){
 assert.equal(a.number,i+1,'Scene ordering');
 assert(a.source.startsWith('https://commons.wikimedia.org/wiki/File:'),'Source hyperlink');
 assert(a.artist && a.license && a.notes,'Mandatory credits and iconographic caution');
 const filename='tappa-'+String(i+1).padStart(2,'0')+'.webp';
 const file=fs.readFileSync(path.join(root,'assets/images/iliade-timeline',filename));
 assert(file.length>8000,'Image too short '+filename);
 assert.equal(file.subarray(0,4).toString(),'RIFF','RIFF header '+filename);
 assert.equal(file.subarray(8,12).toString(),'WEBP','WEBP header '+filename);
}
for(const id of ['iliade-photo','iliade-photo-credit','iliade-art','iliade-steps','iliade-event-title']){
 assert(html.includes('id="'+id+'"'),'HTML missing '+id);
}
assert(js.includes('tappa-'),'Image paths absent from JavaScript');
assert(css.includes('.iliade-art-shell img'),'Responsive image style absent');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const manifest=JSON.parse(sw.match(/const ASSETS=(\[[^\n]+\]);/)[1]);
for(let i=1;i<=10;i++)assert(manifest.includes('assets/images/iliade-timeline/tappa-'+String(i).padStart(2,'0')+'.webp'));
assert(manifest.includes('data/iliade-art-sources.json'));
console.log('Passed: 10 documented WebP paintings, credit links, gallery UI and offline manifest ('+manifest.length+' assets).');
