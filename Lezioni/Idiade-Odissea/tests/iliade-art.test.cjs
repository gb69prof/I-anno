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


/* Controlli di qualità del nuovo atlante narrativo in otto tappe. */
const dossier=JSON.parse(fs.readFileSync(path.join(root,'data/iliade-otto-tappe.json'),'utf8'));
assert.equal(dossier.events.length,8,'Eight narrative stages expected');
assert.deepEqual(dossier.events.map(e=>e.book),['I','II','III','VI','XVI','XXII','XXIII','XXIV']);
for(const [i,event] of dossier.events.entries()){
 assert.equal(event.paragraphs.length,6,'Six narrative scenes at stage '+(i+1));
 assert.equal(event.paragraphTitles.length,6,'Six scene headings at stage '+(i+1));
 assert(event.paragraphs.join(' ').trim().split(/\s+/).length>=350,'Narrative needs detail at stage '+(i+1));
 assert.equal(event.map.nodes.length,4,'Four map nodes at stage '+(i+1));
 assert.equal(event.quiz.length,4,'Four questions at stage '+(i+1));
 for(const [j,q] of event.quiz.entries()){
  assert.equal(q.length,4,'Complete quiz explanation at '+(i+1)+'/'+(j+1));
  assert.equal(q[1].length,3,'Three choices at '+(i+1)+'/'+(j+1));
  assert(q[2]>=0 && q[2]<3,'Valid answer at '+(i+1)+'/'+(j+1));
 }
}
assert(dossier.events[2].paragraphs.some(p=>p.includes('Pandaro')&&p.includes('Menelao')),'The interrupted truce must be narrated');
assert(dossier.events[3].paragraphs.some(p=>p.includes('Aiace')&&p.includes('notte')),'Hector and Ajax duel must be narrated');
for(const id of ['iliade-story','iliade-dossier','iliade-reading-title','iliade-extra-sources']){
 assert(html.includes('id="'+id+'"'),'Missing reader node: '+id);
}
assert(js.includes('paintStory(e)'),'Story renderer must be active');
console.log('Passed: eight extended episodes, 48 story sections, 32 corrected questions, diagrams and book links.');
