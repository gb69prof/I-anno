(function(){
'use strict';
const canvas=document.getElementById('cosmos'),button=document.getElementById('motion'),caption=document.getElementById('cosmos-caption');if(!canvas)return;
const ctx=canvas.getContext('2d');if(!ctx){button.hidden=true;return;}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let stopped=reduced.matches||window.MitiStorage?.prefs.paused||false,visible=true,t=4,prev=0,raf=0,w=600,h=480;
const TAU=Math.PI*2,clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);};
let seed=1969;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
const stars=Array.from({length:240},()=>({x:rand(),y:rand(),r:.3+rand()*1.25,light:.2+rand()*.75,phase:rand()*TAU}));
// Symbolic low-detail geography, projected onto a rotating sphere; this is not an atlas.
const lands=[[[ -17,36],[0,37],[12,33],[33,31],[42,12],[51,11],[42,-13],[32,-27],[18,-35],[11,-17],[6,4],[-12,6],[-18,20]],[[ -10,36],[-10,45],[-1,51],[8,55],[7,62],[22,71],[33,60],[45,60],[62,70],[105,73],[143,62],[179,66],[165,49],[143,46],[127,35],[122,22],[107,11],[100,2],[92,18],[80,9],[71,25],[55,25],[46,13],[34,30],[27,40],[14,40],[8,44],[0,43]],[[ -168,70],[-136,69],[-126,55],[-123,42],[-113,30],[-98,17],[-87,15],[-83,10],[-79,9],[-84,21],[-80,27],[-67,45],[-53,48],[-59,58],[-84,67],[-110,73]],[[ -80,11],[-64,9],[-50,0],[-35,-7],[-43,-24],[-54,-35],[-67,-56],[-74,-42],[-71,-20],[-81,-4]],[[113,-22],[116,-34],[131,-32],[140,-39],[151,-33],[153,-24],[144,-11],[132,-12],[123,-17]],[[ -52,59],[-42,62],[-20,76],[-39,83],[-58,77]],[[47,-14],[50,-17],[48,-26],[44,-24]]];
const constellations=[[-.55,-.25],[-.35,-.52],[-.12,-.29],[.08,-.41],[.30,-.16],[.50,-.26],[.39,.08],[.56,.33],[.25,.41],[.07,.2],[-.15,.42],[-.37,.17],[-.55,-.25]];
function circle(x,y,r,fill){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=fill;ctx.fill();}
function glow(x,y,r,color){const g=ctx.createRadialGradient(x,y,r*.2,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');circle(x,y,r,g);}
function project(lon,lat,rot,r,cx,cy){const a=lon*Math.PI/180+rot,b=lat*Math.PI/180;return{x:cx+Math.cos(b)*Math.sin(a)*r,y:cy-Math.sin(b)*r,z:Math.cos(b)*Math.cos(a)};}
function globe(cx,cy,r,rot,alpha,human){ctx.save();ctx.globalAlpha=alpha;
 glow(cx-r*.22,cy-r*.06,r*1.3,human?'#d7aa5628':'#97c8de20');
 const ocean=ctx.createRadialGradient(cx-r*.48,cy-r*.50,r*.04,cx+r*.1,cy+r*.1,r*1.2);
 ocean.addColorStop(0,human?'#adab84':'#91abb2');ocean.addColorStop(.35,human?'#637971':'#477888');ocean.addColorStop(.74,'#1b3c50');ocean.addColorStop(1,'#030d19');circle(cx,cy,r,ocean);
 ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.clip();
 for(const land of lands){ctx.beginPath();let started=false;for(let j=0;j<land.length;j++){const a=land[j],b=land[(j+1)%land.length];for(let k=0;k<8;k++){const f=k/8,p=project(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,rot,r,cx,cy);if(!started){ctx.moveTo(p.x,p.y);started=true;}else ctx.lineTo(p.x,p.y);}}
 // Only paint polygons mostly on the visible hemisphere.
 const avg=land.reduce((a,p)=>a+project(p[0],p[1],rot,r,cx,cy).z,0)/land.length;
 if(avg>0){ctx.closePath();ctx.fillStyle=human?'#c2b184':'#abb69a';ctx.fill();ctx.strokeStyle='#d4c8a033';ctx.lineWidth=.5;ctx.stroke();}}
 // Geographic arcs and grain evoke an engraved celestial atlas.
 ctx.strokeStyle='#c7d7cc20';ctx.lineWidth=.6;for(let lat=-60;lat<=60;lat+=30){ctx.beginPath();let start=true;for(let lon=-180;lon<=180;lon+=3){const p=project(lon,lat,rot,r,cx,cy);if(p.z<0){start=true;continue;}if(start){ctx.moveTo(p.x,p.y);start=false;}else ctx.lineTo(p.x,p.y);}ctx.stroke();}
 for(let lon=-180;lon<180;lon+=30){ctx.beginPath();let start=true;for(let lat=-90;lat<=90;lat+=3){const p=project(lon,lat,rot,r,cx,cy);if(p.z<0){start=true;continue;}if(start){ctx.moveTo(p.x,p.y);start=false;}else ctx.lineTo(p.x,p.y);}ctx.stroke();}
 const shade=ctx.createLinearGradient(cx-r,cy-r*.5,cx+r,cy+r*.5);shade.addColorStop(0,'#fff1c318');shade.addColorStop(.37,'#06101a00');shade.addColorStop(.73,'#03111b66');shade.addColorStop(1,'#020812ee');ctx.fillStyle=shade;ctx.fillRect(cx-r,cy-r,r*2,r*2);
 ctx.globalAlpha=alpha*.18;for(let j=0;j<stars.length;j++){const s=stars[j];circle(cx-r+s.x*r*2,cy-r+s.y*r*2,.6,'#f8eac2');}ctx.restore();
 ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.lineWidth=1;ctx.strokeStyle=human?'#d2b77f88':'#bcdae899';ctx.stroke();ctx.restore();}
function draw(){ctx.clearRect(0,0,w,h);const cx=w*.5,cy=h*.49,R=Math.min(w*.28,h*.31),cycle=t%30;
 // 0–9: Earth within heaven. 9–19: heaven encompasses Earth. 19–30: human world gathers heaven.
 const swallowing=ease((cycle-8)/5),gather=ease((cycle-18)/5),returning=ease((cycle-28)/2);
 const earthScale=(1-swallowing*.88)*(1-gather)+gather*(1.12-returning*.12);
 const earthAlpha=1-swallowing*(1-gather)*.82;
 glow(cx,cy,R*2.1,'#54749e18');
 stars.forEach(s=>{let x=s.x*w,y=s.y*h;const squeeze=gather*(1-returning);x=x*(1-squeeze)+(cx+(s.x-.5)*R*1.8)*squeeze;y=y*(1-squeeze)+(cy+(s.y-.5)*R*1.8)*squeeze;const twinkle=.83+Math.sin(t*.35+s.phase)*.17;ctx.globalAlpha=s.light*twinkle*(1-squeeze*.5);circle(x,y,s.r,'#e5e1d1');});ctx.globalAlpha=1;
 // Fine orbital rings surrounding both spheres.
 ctx.save();ctx.translate(cx,cy);ctx.rotate(-.35);ctx.strokeStyle='#bba47744';ctx.lineWidth=.7;ctx.beginPath();ctx.ellipse(0,0,R*1.6,R*.72,0,0,TAU);ctx.stroke();ctx.rotate(.75);ctx.beginPath();ctx.ellipse(0,0,R*1.52,R*1.2,0,0,TAU);ctx.stroke();ctx.restore();
 const celestialR=R*(1.35+swallowing*.45)*(1-gather*.62);
 if(swallowing>.01&&gather<.99){ctx.save();ctx.globalAlpha=swallowing*(1-gather);const g=ctx.createRadialGradient(cx-R*.3,cy-R*.4,0,cx,cy,celestialR);g.addColorStop(0,'#346182cc');g.addColorStop(.6,'#122c51a0');g.addColorStop(.94,'#172c4677');g.addColorStop(1,'#c2cfe144');circle(cx,cy,celestialR,g);for(let i=0;i<100;i++){const s=stars[i],rr=Math.sqrt(s.x)*celestialR*.94,ang=s.y*TAU+t*.01;circle(cx+Math.cos(ang)*rr,cy+Math.sin(ang)*rr,s.r,'#f0e3c9');}ctx.restore();}
 globe(cx,cy,R*earthScale,-.25+t*.012,earthAlpha,gather>.3);
 if(gather>0){ctx.save();ctx.globalAlpha=gather*(1-returning);ctx.beginPath();ctx.arc(cx,cy,R*earthScale*.92,0,TAU);ctx.clip();
 // The sky is visibly contained within the terrestrial outline, and stars become a human figure.
 const r=R*earthScale;glow(cx,cy,r,'#081a44b0');ctx.strokeStyle='#f1d390';ctx.lineWidth=1.2;constellations.forEach((p,i)=>{const x=cx+p[0]*r,y=cy+p[1]*r;if(i){const a=constellations[i-1];ctx.beginPath();ctx.moveTo(cx+a[0]*r,cy+a[1]*r);ctx.lineTo(x,y);ctx.stroke();}glow(x,y,7,'#f6d79488');circle(x,y,2,'#fff2c8');});
 // A small temple as symbol of the human world giving form to its sky.
 ctx.strokeStyle='#e6c994';ctx.lineWidth=1.2;const yy=cy+r*.67;ctx.beginPath();ctx.moveTo(cx-r*.27,yy);ctx.lineTo(cx+r*.27,yy);ctx.moveTo(cx-r*.3,yy-r*.25);ctx.lineTo(cx,yy-r*.4);ctx.lineTo(cx+r*.3,yy-r*.25);ctx.closePath();ctx.stroke();for(let i=-1;i<=1;i++){ctx.strokeRect(cx+i*r*.2-r*.035,yy-r*.23,r*.07,r*.23);}ctx.restore();}
 const text=cycle<9?'Il mondo guarda il cielo.':cycle<19?'Il cielo avvolge e ingloba il mondo.':'Il mondo raccoglie il cielo. Nasce il mito.';if(caption.textContent!==text)caption.textContent=text;
}
function loop(now){raf=0;if(stopped||!visible||document.hidden){prev=0;return;}if(prev&&now-prev<32){raf=requestAnimationFrame(loop);return;}if(prev)t+=Math.min((now-prev)/1000,.08);prev=now;draw();raf=requestAnimationFrame(loop);}
function start(){if(!raf&&!stopped&&visible&&!document.hidden){prev=0;raf=requestAnimationFrame(loop);}}
function controls(){button.textContent=stopped?'Avvia animazione':'Ferma animazione';button.setAttribute('aria-pressed',String(stopped));}
button.addEventListener('click',()=>{stopped=!stopped;if(window.MitiStorage){window.MitiStorage.prefs.paused=stopped;window.MitiStorage.save();}if(stopped&&raf){cancelAnimationFrame(raf);raf=0;}controls();start();});
const resize=()=>{const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();};
if('ResizeObserver'in window)new ResizeObserver(resize).observe(canvas);else window.addEventListener('resize',resize);
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible&&raf){cancelAnimationFrame(raf);raf=0;}start();}).observe(canvas);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0;}start();});
const change=()=>{if(reduced.matches){stopped=true;controls();if(raf)cancelAnimationFrame(raf);raf=0;draw();}};if(reduced.addEventListener)reduced.addEventListener('change',change);else reduced.addListener(change);
canvas.parentElement.classList.add('canvas-ready');controls();resize();start();
})();
