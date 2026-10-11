/* Micene 1250 a.C. — esperienza 3D gbprof. Ricostruzione didattica interpretativa, non rilievo archeologico. */
const $ = (s) => document.querySelector(s);
const sleep = (ms) => new Promise(r => setTimeout(r,ms));
const mobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth,innerHeight)<600;
const stops = [
 {id:'porta',number:'01',title:'La Porta dei Leoni',short:'Il confine del potere',pos:[0,39],arrival:[0,45],yaw:0,kicker:'ACCESSO MONUMENTALE',
 text:'La Porta dei Leoni costituiva il principale ingresso alla cittadella di Micene. L’architrave monumentale e il rilievo triangolare con due animali affrontati, disposto sopra l’ingresso, sono ancora visibili. Era un luogo di controllo, ma anche un messaggio: prima di entrare, chi arrivava riconosceva la forza del centro palaziale.',
 fact:'Le grandi fortificazioni in blocchi di pietra sono chiamate «mura ciclopiche»: i Greci di età successiva immaginavano che solo i Ciclopi potessero averle costruite.',
 caution:'Il rilievo della Porta dei Leoni è documentato. Le porte lignee, i colori e gli arredi dell’ingresso sono ipotesi visive.'},
 {id:'cortile',number:'02',title:'Il grande cortile',short:'Incontri, attese e cerimonie',pos:[0,14],arrival:[-2,17],yaw:0,kicker:'SPAZIO DI RAPPRESENTANZA',
 text:'Il cortile separava la via d’accesso dagli ambienti centrali del palazzo. Non era una piazza democratica: era uno spazio controllato, attraversato da visitatori, emissari, funzionari e personale del palazzo. Una sequenza di soglie, percorsi e portici guidava verso il megaron.',
 fact:'I palazzi micenei non erano solo abitazioni reali: costituivano centri del potere amministrativo, economico e religioso.',
 caution:'La funzione di rappresentanza è ben fondata; disposizione esatta dei figuranti e arredamento esterno sono ricostruzioni didattiche.'},
 {id:'megaron',number:'03',title:'Il megaron',short:'Il cuore del palazzo',pos:[0,-14],arrival:[0,-12],yaw:Math.PI,kicker:'LA SALA DEL SOVRANO',
 text:'Il megaron era l’ambiente di rappresentanza più importante. Attraverso un portico e un’anticamera si raggiungeva una sala con un grande focolare centrale. Quattro colonne sorreggevano la struttura superiore attorno al focolare. Qui il wanax, il sovrano, manifestava la propria autorità.',
 fact:'Il modello della grande sala con focolare centrale e quattro colonne è attestato nei principali palazzi micenei, tra cui Pilo e Tirinto.',
 caution:'Il numero delle colonne e la presenza del focolare sono documentati nei megara meglio conservati. Trono, stoffe, colori e particolari del soffitto sono ipotetici.'},
 {id:'magazzini',number:'04',title:'I magazzini',short:'Grano, olio, vino e ceramiche',pos:[-19,-15],arrival:[-16,-14.5],yaw:Math.PI/2,kicker:'LE RISORSE DEL REGNO',
 text:'Grandi recipienti per olio, vino e derrate raccontano una verità importante: la forza del palazzo dipendeva anche dalla raccolta e redistribuzione delle risorse. Artigiani, agricoltori e funzionari partecipavano a una rete economica diretta dall’amministrazione palaziale.',
 fact:'Le tavolette in Lineare B registrano beni, persone, animali e distribuzioni: non sono racconti letterari, ma documenti di gestione.',
 caution:'Contenitori e depositi sono archeologicamente attestati, ma quantità e disposizione di questa stanza sono scenografiche.'},
 {id:'archivi',number:'05',title:'L’amministrazione',short:'La scrittura Lineare B',pos:[19,-15],arrival:[16,-14.5],yaw:-Math.PI/2,kicker:'LE TAVOLETTE D’ARGILLA',
 text:'La Lineare B è un sistema di scrittura usato per registrare una forma antica di lingua greca. Gli scribi annotavano le entrate e le uscite dei magazzini, il lavoro, gli animali e gli oggetti. Il centro palaziale possedeva una burocrazia organizzata.',
 fact:'La scrittura Lineare B è stata decifrata nel XX secolo. Le tavolette che possediamo si sono spesso conservate perché cotte incidentalmente negli incendi.',
 caution:'Le pratiche contabili sono documentate; questo specifico ufficio e le tavolette rappresentate sono una ricostruzione interpretativa.'},
 {id:'terrazza',number:'06',title:'La terrazza alta',short:'La cittadella e il territorio',pos:[0,-33],arrival:[0,-34],yaw:0,kicker:'UN PAESAGGIO STRATEGICO',
 text:'Micene controllava un territorio di coltivazioni, percorsi e insediamenti. Le mura monumentali proteggevano il centro del potere; fuori dalla cittadella si estendeva un mondo di abitazioni, tombe, campi e attività produttive. Il palazzo dipendeva dalla regione, non viveva isolato.',
 fact:'La posizione di Micene, sulle alture dell’Argolide, permetteva di controllare le vie di accesso alla pianura.',
 caution:'Profilo del terreno e vista panoramica sono evocativi: questo modello non è georeferenziato né costruito su un rilievo topografico di precisione.'}
];
function addStopButtons(){
 const list=$('#stops');list.innerHTML='';
 stops.forEach(s=>{const b=document.createElement('button');b.className='stop';b.innerHTML='<span class="stop-number">'+s.number+'</span><span><span class="stop-title">'+s.title+'</span><span class="stop-sub">'+s.short+'</span></span><span class="stop-arrow">↗</span>';b.onclick=()=>{teleport(s);closePanels()};list.append(b)})
}
function openPanel(id){closePanels();const e=$('#'+id);e.classList.add('open');e.setAttribute('aria-hidden','false')}
function closePanels(){document.querySelectorAll('.panel.open').forEach(e=>{e.classList.remove('open');e.setAttribute('aria-hidden','true')})}
document.querySelectorAll('[data-close]').forEach(e=>e.addEventListener('click',closePanels));
$('#btn-menu').onclick=()=>openPanel('panel');
$('#btn-help').onclick=()=>{$('#help-panel').hidden=!$('#help-panel').hidden;$('#map-panel').hidden=true};
$('#close-help').onclick=()=>$('#help-panel').hidden=true;
$('#btn-map').onclick=()=>{$('#map-panel').hidden=!$('#map-panel').hidden;$('#help-panel').hidden=true;if(!$('#map-panel').hidden)drawMap()};
$('#close-map').onclick=()=>$('#map-panel').hidden=true;
addStopButtons();
let THREE,scene,renderer,camera,world,intact,ruins,fortLife,fortRuins,hearthFire;
let player={x:0,z:51,yaw:0,pitch:-.055}, keys=new Set(),joystick={x:0,y:0},lookPointer=null,joystickPointer=null;
let running=false,lastTime=0,lastWalk=0,nowRuins=false,nearStop=null;
let soundEnabled=false,audioCtx=null,windSource=null,windGain=null;
let npcAnimations=[];
let colliders=[];
let mouseDown=false,lastMouseX=0,lastMouseY=0;
const seed = 9137;
let rngState=seed;
function rand(){rngState+=0x6D2B79F5;let t=rngState;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}
const lerp=(a,b,t)=>a+(b-a)*t;
function terrainHeight(x,z){
 const r=Math.hypot(x,z); const k=Math.min(1,Math.max(0,(r-45)/85));
 const h=4.5*Math.sin(x*.023)*Math.cos(z*.027)+3*Math.sin(x*.071+z*.023)+2*Math.cos(z*.049);
 return -.20+k*(5+h);
}
async function init(){
 try{
  $('#progress').style.width='12%';$('#load-status').textContent='Caricamento del motore grafico…';
  THREE=await import('https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js');
  const probe=document.createElement('canvas');if(!probe.getContext('webgl2')&&!probe.getContext('webgl'))throw new Error('WebGL non supportato');
  $('#progress').style.width='30%';$('#load-status').textContent='Modellazione delle mura ciclopiche…';
  makeEngine();
  await sleep(20);
  buildWorld();
  $('#progress').style.width='78%';$('#load-status').textContent='Applicazione di materiali, affreschi e illuminazione…';
  await sleep(40);
  setupEvents();resize();renderer.render(scene,camera);
  $('#progress').style.width='100%';$('#load-status').textContent='Il palazzo è pronto.';
  $('#start').disabled=false;$('#start').addEventListener('click',()=>{
   $('#loading').classList.add('hidden');running=true;lastTime=performance.now();$('#touch-ui').classList.add('playing');
   requestAnimationFrame(frame);setTimeout(()=>$('#app .hud-left').classList.add('fade'),5800);
   if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
  },{once:true});
 }catch(e){console.error('Micene 3D:',e);$('#loading').style.display='none';$('#fatal').hidden=false;$('#fatal p').textContent='Errore: '+e.message+'. Controlla la connessione e ricarica con Safari o Chrome aggiornato.'}
}
const materials={};let stoneGeometry;
function canvasTexture(draw,size=512){
 const c=document.createElement('canvas');c.width=c.height=size;const ctx=c.getContext('2d');draw(ctx,size);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=renderer.capabilities.getMaxAnisotropy()>4?4:2;return t;
}
function noisyTexture(base,spots,cracks=false){
 return canvasTexture((g,n)=>{
  g.fillStyle=base;g.fillRect(0,0,n,n);
  for(let i=0;i<4000;i++){let v=rand()*n,w=.2+rand()*5;g.fillStyle=rand()>.5?'rgba(255,244,216,'+(rand()*.08)+')':'rgba(47,31,24,'+(rand()*.1)+')';g.fillRect(v,rand()*n,w,w)}
  for(let i=0;i<spots;i++){g.beginPath();g.ellipse(rand()*n,rand()*n,1+rand()*16,1+rand()*7,rand()*3.15,0,6.283);g.fillStyle=rand()>.5?'rgba(17,28,25,.042)':'rgba(245,228,195,.07)';g.fill()}
  if(cracks)for(let i=0;i<25;i++){g.beginPath();let x=rand()*n,y=rand()*n;g.moveTo(x,y);for(let q=0;q<4;q++){x+=rand()*40-20;y+=rand()*30-10;g.lineTo(x,y)}g.strokeStyle='rgba(63,45,35,.075)';g.lineWidth=1;g.stroke()}
 },512);
}
function paintFresco(){
 return canvasTexture((g,n)=>{
  const h=n;g.fillStyle='#a65b3e';g.fillRect(0,0,n,h);g.fillStyle='#dabb86';g.fillRect(0,18,n,h-36);
  g.fillStyle='#4a6d72';g.fillRect(0,29,n,14);g.fillRect(0,h-44,n,14);
  for(let i=0;i<13;i++){let x=i*44;g.beginPath();for(let a=0;a<14;a+=.16){let rr=2+a*1.5;g.lineTo(x+19+rr*Math.cos(a),h-24+rr*Math.sin(a))}g.strokeStyle='#c7ab70';g.lineWidth=3;g.stroke()}
  for(let i=0;i<6;i++){const x=45+i*86,y=160+7*Math.sin(i*2);
   g.fillStyle=i%2?'#a75339':'#4c6e76';g.beginPath();g.ellipse(x,y,19,10,-.1,0,6.283);g.fill();
   g.fillRect(x-13,y+3,5,28);g.fillRect(x+9,y+3,5,28);
   g.beginPath();g.moveTo(x+13,y-5);g.lineTo(x+30,y-20);g.lineTo(x+38,y-16);g.lineTo(x+28,y);g.fill();
   g.fillStyle='#efe2b5';g.beginPath();g.arc(x-20,y-9,6,0,6.283);g.fill();
  }
 },512);
}
function createMaterials(){
 const stone=noisyTexture('#958775',460,true);
 const plaster=noisyTexture('#eee0c3',220,true);
 const clay=noisyTexture('#bb7649',190);
 const wood=noisyTexture('#826047',140);
 const paving=noisyTexture('#b7a589',330,true);
 materials.stone=new THREE.MeshStandardMaterial({map:stone,color:0xdfd0b8,roughness:.97});
 materials.stoneDark=new THREE.MeshStandardMaterial({map:stone,color:0xb0aa9b,roughness:.98});
 materials.plaster=new THREE.MeshStandardMaterial({map:plaster,color:0xfaf5e8,roughness:.91});
 materials.plasterWarm=new THREE.MeshStandardMaterial({map:plaster,color:0xe2b383,roughness:.91});
 materials.floor=new THREE.MeshStandardMaterial({map:paving,color:0xddc8a3,roughness:1});
 materials.wood=new THREE.MeshStandardMaterial({map:wood,color:0xc7a27b,roughness:.9});
 materials.darkWood=new THREE.MeshStandardMaterial({map:wood,color:0x8b6954,roughness:.94});
 materials.red=new THREE.MeshStandardMaterial({color:0x9d402f,roughness:.73});
 materials.redDark=new THREE.MeshStandardMaterial({color:0x582f29,roughness:.87});
 materials.blue=new THREE.MeshStandardMaterial({color:0x416870,roughness:.88});
 materials.gold=new THREE.MeshStandardMaterial({color:0xab8053,metalness:.35,roughness:.56});
 materials.clay=new THREE.MeshStandardMaterial({map:clay,color:0xdfa16e,roughness:.9});
 materials.clayDeep=new THREE.MeshStandardMaterial({map:clay,color:0xa95032,roughness:.9});
 materials.black=new THREE.MeshStandardMaterial({color:0x302925,roughness:.96});
 materials.white=new THREE.MeshStandardMaterial({color:0xf1d8a5,roughness:.93});
 materials.leaf=new THREE.MeshStandardMaterial({color:0x52644a,roughness:1,flatShading:true});
 materials.leafLight=new THREE.MeshStandardMaterial({color:0x6b7850,roughness:1,flatShading:true});
 materials.earth=new THREE.MeshStandardMaterial({color:0x98886f,roughness:1});
 materials.fresco=new THREE.MeshStandardMaterial({map:paintFresco(),roughness:.94,side:THREE.DoubleSide});
 materials.embers=new THREE.MeshStandardMaterial({color:0xb94b24,emissive:0xdb5420,emissiveIntensity:1.8,roughness:.7});
 stoneGeometry=new THREE.BoxGeometry(1,1,1,2,2,2);
 const p=stoneGeometry.attributes.position;
 for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i),z=p.getZ(i);p.setXYZ(i,x+(rand()-.5)*.045,y+(rand()-.5)*.065,z+(rand()-.5)*.06)}
 stoneGeometry.computeVertexNormals();
}
function makeEngine(){
 renderer=new THREE.WebGLRenderer({antialias:!mobile,powerPreference:'high-performance',alpha:false});
 renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.35:1.8));
 renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.26;
 renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 $('#scene').appendChild(renderer.domElement);
 scene=new THREE.Scene();scene.background=new THREE.Color(0xb1bfca);scene.fog=new THREE.FogExp2(0xbcc2b6,.0035);
 camera=new THREE.PerspectiveCamera(mobile?74:69,innerWidth/innerHeight,.08,620);
 world=new THREE.Group();intact=new THREE.Group();ruins=new THREE.Group();fortLife=new THREE.Group();fortRuins=new THREE.Group();
 scene.add(world,intact,ruins,fortLife,fortRuins);
 ruins.visible=fortRuins.visible=false;
 let hemi=new THREE.HemisphereLight(0xdce9fc,0x846947,2.1);scene.add(hemi);
 let sun=new THREE.DirectionalLight(0xffe7bf,3.2);sun.position.set(-65,105,55);sun.castShadow=!mobile;
 sun.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);
 sun.shadow.camera.left=-85;sun.shadow.camera.right=85;sun.shadow.camera.top=85;sun.shadow.camera.bottom=-85;sun.shadow.normalBias=.035;
 scene.add(sun);
 let ambient=new THREE.AmbientLight(0xffecc8,.22);scene.add(ambient);
 let sky=new THREE.Mesh(new THREE.SphereGeometry(490,32,20),new THREE.ShaderMaterial({
  side:THREE.BackSide,depthWrite:false,vertexShader:'varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'varying vec3 vP;void main(){float h=clamp(normalize(vP).y*.5+.5,0.,1.);vec3 low=vec3(.80,.81,.75);vec3 mid=vec3(.52,.68,.76);vec3 high=vec3(.23,.45,.64);vec3 c=mix(low,mid,smoothstep(.30,.60,h));c=mix(c,high,smoothstep(.60,1.,h));gl_FragColor=vec4(c,1.);}'
 }));sky.name='sky';sky.frustumCulled=false;scene.add(sky);
 createMaterials();
 camera.position.set(player.x,1.8,player.z);
}
function mesh(parent,geom,mat,x,y,z,cast=true){
 let m=new THREE.Mesh(geom,mat);m.position.set(x,y,z);m.castShadow=cast&&!mobile;m.receiveShadow=true;parent.add(m);return m;
}
function box(parent,x,y,z,sx,sy,sz,mat,cast=true){return mesh(parent,new THREE.BoxGeometry(sx,sy,sz),mat,x,y,z,cast)}
function cyl(parent,x,y,z,rTop,rBottom,h,mat,segments=14){return mesh(parent,new THREE.CylinderGeometry(rTop,rBottom,h,segments),mat,x,y,z)}
function sphere(parent,x,y,z,r,mat){return mesh(parent,new THREE.IcosahedronGeometry(r,1),mat,x,y,z)}
function plant(parent,x,z,s=1){
 cyl(parent,x,.75*s,z,.10*s,.17*s,1.5*s,materials.darkWood,7);
 for(let j=0;j<3;j++){const leaf=sphere(parent,x+(rand()-.5)*.65*s,(1.7+j*.35)*s,z+(rand()-.5)*.5*s,(.78-j*.12)*s,j%2?materials.leaf:materials.leafLight);leaf.scale.set(1.1,.75,1)}
}
function rock(parent,x,y,z,s){let m=mesh(parent,new THREE.IcosahedronGeometry(s,0),rand()>.5?materials.stone:materials.stoneDark,x,y,z,false);m.rotation.set(rand(),rand(),rand());m.scale.set(1.2,.6,.8);return m}
function ground(){
 const N=145,S=660,geo=new THREE.PlaneGeometry(S,S,N,N);geo.rotateX(-Math.PI/2);
 const a=geo.attributes.position;let cols=[];
 for(let i=0;i<a.count;i++){let x=a.getX(i),z=a.getZ(i),h=terrainHeight(x,z);a.setY(i,h);const tone=rand()*.09;let c=new THREE.Color().setRGB(.47+tone+h*.003,.43+tone+h*.002,.33+tone*.75);cols.push(c.r,c.g,c.b)}
 geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));geo.computeVertexNormals();
 const m=mesh(world,geo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}),0,0,0,false);m.receiveShadow=true;
 box(world,0,-.31,-2,74,.35,101,materials.earth,false);
 // Subtle stony texture for the inhabited plateau and pebble beds.
 for(let i=0;i<330;i++){let x=(rand()-.5)*160,z=(rand()-.5)*210;if(Math.abs(x)<35&&z>-48&&z<36)continue;let s=.15+rand()*1.5;rock(world,x,terrainHeight(x,z)+s*.18,z,s)}
 for(let i=0;i<125;i++){let x=(rand()-.5)*230,z=(rand()-.5)*230;if(Math.abs(x)<42&&z>-53&&z<45)continue;plant(world,x,z,.6+rand()*1.2)}
 for(let i=0;i<155;i++){let x=(rand()-.5)*170,z=(rand()-.5)*200;if(Math.abs(x)<36&&z>-47&&z<39)continue;sphere(world,x,terrainHeight(x,z)+.2,z,.12+rand()*.33,rand()>.5?materials.leaf:materials.leafLight)}
}
function cyclopean(parent,x1,z1,x2,z2,h,ruin=false){
 let length=Math.hypot(x2-x1,z2-z1),angle=Math.atan2(z2-z1,x2-x1),depth=3.3;
 let parts=[],rowH=1.4,nrows=Math.ceil(h/rowH);
 for(let row=0;row<nrows;row++){let at=0,offset=(row%2)*1.2;
  while(at<length-.01){
   let w=Math.min(.95+rand()*1.45,length-at),current=at+w/2;at+=w;
   let rr=ruin?(2+2.5*rand()):h;
   if(row*rowH>rr)continue;
   let py=.67+row*rowH+(rand()-.5)*.05;
   let px=x1+Math.cos(angle)*(current+offset>length?current:current+offset),pz=z1+Math.sin(angle)*(current+offset>length?current:current+offset);
   parts.push({x:px,y:py,z:pz,w:w*(.96+rand()*.09),hh:1.37,dd:depth*(.93+rand()*.12),shade:rand()});
  }
 }
 let inst=new THREE.InstancedMesh(stoneGeometry,materials.stone,parts.length);inst.castShadow=!mobile;inst.receiveShadow=true;parent.add(inst);
 let mat=new THREE.Matrix4(),q=new THREE.Quaternion(),scale=new THREE.Vector3(),v=new THREE.Vector3(),col=new THREE.Color();
 for(let i=0;i<parts.length;i++){let p=parts[i];q.setFromAxisAngle(new THREE.Vector3(0,1,0),-angle+(rand()-.5)*.065);v.set(p.x,p.y,p.z);scale.set(p.w,p.hh,p.dd);mat.compose(v,q,scale);inst.setMatrixAt(i,mat);col.setHSL(.09+rand()*.04,.12+rand()*.09,.41+p.shade*.13);inst.setColorAt(i,col)}
 inst.instanceMatrix.needsUpdate=true;
 if(!ruin){const cx=(x1+x2)/2,cz=(z1+z2)/2;
  colliders.push({x:cx,z:cz,w:Math.abs(x2-x1)+depth,d:Math.abs(z2-z1)+depth,mode:'life'});
 }
}
function outerFort(){
 const segments=[[-33,33,-6,33],[6,33,33,33],[-33,33,-33,-46],[33,33,33,-46],[-33,-46,33,-46]];
 segments.forEach(s=>{cyclopean(fortLife,...s,7.2,false);cyclopean(fortRuins,...s,4.1,true)});
 // Gate jambs and massive lintel: inspired by the actual Lion Gate, interpretive proportions.
 box(fortLife,-5,4,32.5,3.9,8,4.9,materials.stoneDark);
 box(fortLife,5,4,32.5,3.9,8,4.9,materials.stoneDark);
 box(fortLife,0,7.85,32.5,13.6,1.5,4.9,materials.stoneDark);
 box(fortLife,0,9.3,32.45,5.2,1.5,.25,materials.plasterWarm);
 const relief=new THREE.Group();fortLife.add(relief);relief.position.set(0,8.45,34.98);
 const lionMat=new THREE.MeshStandardMaterial({color:0xcbbca6,roughness:1,side:THREE.DoubleSide});
 const triangle=new THREE.Shape();triangle.moveTo(-2.6,-.1);triangle.lineTo(2.6,-.1);triangle.lineTo(0,2.15);triangle.closePath();
 let tym=mesh(relief,new THREE.ShapeGeometry(triangle),materials.stone,0,0,0,false);tym.position.z=-.02;
 for(let side of [-1,1]){
  let body=box(relief,side*.88,.53,.13,1.14,.5,.22,lionMat);body.rotation.z=side*.24;
  cyl(relief,side*.74,.12,.23,.10,.10,.65,lionMat,7);
  cyl(relief,side*1.22,.14,.23,.10,.10,.63,lionMat,7);
  sphere(relief,side*.52,.92,.13,.27,lionMat);
 }
 box(relief,0,.43,.12,.35,1.0,.25,materials.redDark);
 // Wooden entrance leaves when open, set along jamb.
 box(fortLife,-3.3,2.7,30.2,.36,5.15,2.1,materials.darkWood);
 box(fortLife,3.3,2.7,30.2,.36,5.15,2.1,materials.darkWood);
 // Small gatehouse decoration.
 for(let z of [28,36])for(let x of [-5.7,5.7])cyl(fortLife,x,4,z,.47,.40,8,materials.stoneDark);
}
function wall(parent,x,z,sx,sz,h=5.3,mat=materials.plaster,mode='life'){
 box(parent,x,h/2+.2,z,sx,h,sz,mat);
 colliders.push({x,z,w:sx,d:sz,mode});
}
function roof(parent,x,z,sx,sz,y=6.5){
 box(parent,x,y,z,sx,.42,sz,materials.darkWood);
 box(parent,x,y+.30,z,sx+.5,.4,sz+.5,materials.plasterWarm);
 for(const side of [-1,1]){
  box(parent,x,y+.52,z+side*sz/2,sx+.6,.27,.34,materials.redDark);
  box(parent,x+side*sx/2,y+.52,z,.34,.27,sz+.5,materials.redDark);
 }
 // visible cross-beams at the eaves
 for(let i=-sx/2+1;i<sx/2;i+=2){box(parent,x+i,y-.35,z+sz/2+.35,.23,.5,1,materials.darkWood)}
}
function column(parent,x,z,y=3,h=5.8){
 cyl(parent,x,y,z,.49,.33,h,materials.red,18);
 cyl(parent,x,y+h/2+.15,z,.69,.69,.32,materials.black,18);
 cyl(parent,x,y-h/2+.1,z,.66,.55,.25,materials.stone,16);
 for(let j=0;j<3;j++)cyl(parent,x,y+h/2-.65-j*.18,z,.48,.48,.048,materials.gold,18);
}
function paving(){
 box(world,0,.015,12,37,.20,28,materials.floor,false);
 box(world,0,.05,-14,28,.23,30,materials.floor,false);
 box(world,-19,.02,-14,15,.22,23,materials.floor,false);
 box(world,19,.02,-14,15,.22,23,materials.floor,false);
 box(world,0,.04,-34,34,.24,17,materials.floor,false);
 // ceremonial paving up the entrance axis, varied stone tiles
 const group=new THREE.Group();world.add(group);
 let slabs=[];
 for(let z=46;z>17;z-=2.3)for(let x=-3;x<=3;x+=2){slabs.push({x:x+(rand()-.5)*.09,z:z+(rand()-.5)*.07})}
 const ins=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),materials.floor,slabs.length);
 const mm=new THREE.Matrix4(),pp=new THREE.Vector3(),qq=new THREE.Quaternion(),ss=new THREE.Vector3();
 slabs.forEach((b,i)=>{pp.set(b.x,-.01,b.z);ss.set(1.87,.13,2.12);mm.compose(pp,qq,ss);ins.setMatrixAt(i,mm)});
 ins.receiveShadow=true;group.add(ins);
 // dividing strips / painted borders
 for(const x of [-17,17])box(world,x,.15,12,.16,.13,28,materials.redDark,false);
 for(let j=-15;j<23;j+=4){box(world,-18.7,.11,j,1.5,.1,.09,materials.stoneDark,false);box(world,18.7,.11,j,1.5,.1,.09,materials.stoneDark,false)}
}
function decorateFresco(parent,x,y,z,sx,sz,angle=0){
 let p=mesh(parent,new THREE.PlaneGeometry(sx,sz),materials.fresco,x,y,z,false);
 p.rotation.y=angle;return p;
}
function hall(){
 // Megaron main building and antechamber, center north of courtyard.
 wall(intact,-10.2,-15.4,.74,17.2);
 wall(intact,10.2,-15.4,.74,17.2);
 wall(intact,0,-24,21,.8);
 // main south wall doorway x +-2.4 at z=-7
 wall(intact,-6.35,-7,7.3,.72);
 wall(intact,6.35,-7,7.3,.72);
 // threshold stone lintel
 box(intact,0,5.2,-7,4.7,.57,1,materials.wood);
 roof(intact,0,-15.4,22,19.2,7.2);
 // porch/anteroom and portico, open on south
 for(const x of [-9.7,9.7])wall(intact,x,-3.15,.62,7.0);
 roof(intact,0,-3,21,8.7,7.16);
 for(const x of [-7,7])column(intact,x,.9,3.15,5.55);
 for(const x of [-6.7,6.7])column(intact,x,-5.2,2.9,5.2);
 // vibrant upper band at entrance
 box(intact,0,6.52,.95,20,.39,.34,materials.red);
 for(let i=-9;i<10;i+=2){box(intact,i,6.60,1.16,.77,.12,.03,materials.gold,false)}
 // Door frame
 for(const x of [-2.5,2.5])box(intact,x,3.08,-6.54,.36,6,.47,materials.darkWood);
 box(intact,0,6.2,-6.53,5.1,.39,.47,materials.darkWood);
 // Frescoes on inner north wall, decorative dado
 decorateFresco(intact,0,3.55,-23.57,15,2.35,0);
 for(const x of [-9.78,9.78]){
  for(let z=-23;z<-8;z+=3.2)box(intact,x,1.05,z,.09,.5,2.0,materials.red,false);
 }
 // Central hearth (can walk around)
 cyl(intact,0,.15,-15.4,2.18,2.18,.35,materials.stone,38);
 cyl(intact,0,.36,-15.4,1.64,1.68,.13,materials.black,38);
 for(let i=0;i<16;i++){let a=rand()*6.283,s=.17+rand()*.2;sphere(intact,Math.cos(a)*rand()*1.1,.42,-15.4+Math.sin(a)*rand()*.9,s,materials.embers)}
 hearthFire=new THREE.PointLight(0xff7f32,2.6,16,2);hearthFire.position.set(0,2,-15.4);intact.add(hearthFire);
 // Four columns surrounding the hearth
 for(const x of [-4.3,4.3])for(const z of [-19.7,-11.1])column(intact,x,z,3.5,6.45);
 // Throne inspired by Mycenaean interiors; conjectural arrangement
 box(intact,0,.72,-21.7,2.1,1.4,1.7,materials.wood);
 box(intact,0,1.8,-22.35,2.1,2.7,.43,materials.darkWood);
 for(const x of [-.98,.98])box(intact,x,1.18,-21.7,.2,.8,1.7,materials.gold);
 for(const x of [-.85,.85])sphere(intact,x,3.18,-22.31,.19,materials.gold);
 // Decorative vases in corners
 for(const x of [-7.4,7.4])for(const z of [-21,-9.6])pot(intact,x,z,.7);
 // Floor bands and woven mat
 for(let x=-8;x<=8;x+=1.6)box(intact,x,.16,-15.5,.07,.02,15,materials.redDark,false);
 // Architecture of the ruins, foundations / fallen blocks
 for(const [x,z,sx,sz] of [[-10,-15.4,.9,17.6],[10,-15.4,.9,17.6],[0,-24,21,.95],[-6.3,-7,7.1,.8],[6.3,-7,7.1,.8]])box(ruins,x,.62,z,sx,1.25,sz,materials.stoneDark);
 for(let i=0;i<48;i++){let x=(rand()-.5)*23,z=-25+rand()*20;rock(ruins,x,.14+rand()*.35,z,.35+rand()*.55)}
}
function pot(parent,x,z,s=1){
 const pts=[new THREE.Vector2(.0,0),new THREE.Vector2(.29,0),new THREE.Vector2(.43,.15),new THREE.Vector2(.64,.52),new THREE.Vector2(.58,.95),new THREE.Vector2(.35,1.25),new THREE.Vector2(.35,1.43),new THREE.Vector2(.47,1.48),new THREE.Vector2(.48,1.58)];
 let g=new THREE.LatheGeometry(pts,18);let m=mesh(parent,g,rand()>.5?materials.clay:materials.clayDeep,x,.16,z);m.scale.setScalar(s);
 const rim=cyl(parent,x,.16+1.54*s,z,.50*s,.50*s,.10*s,materials.clayDeep);
 return m;
}
function storeRoom(){
 // left magazine / storage, with a broad opening on its east wall
 wall(intact,-25.5,-15,.73,20.5);wall(intact,-19.2,-25.2,13.2,.7);
 wall(intact,-19.2,-4.8,13.2,.7);wall(intact,-13,-21.0,.72,8.5);wall(intact,-13,-8.9,.72,8.3);
 roof(intact,-19.2,-15,14.1,22.3,6.3);
 box(intact,-13,5.5,-15,.72,.55,3.8,materials.wood);
 for(let i=0;i<14;i++){let x=-24.5+(i%3)*3.4,z=-23+Math.floor(i/3)*3.2;pot(intact,x,z,.8+rand()*.32)}
 for(let z=-22;z<=-8;z+=4){
  for(let y of [1.15,2.45])box(intact,-24.15,y,z,2.5,.16,3.15,materials.wood);
  for(let x of [-25,-23.3])box(intact,x,1.2,z, .12,2.2,.12,materials.darkWood);
 }
 decorateFresco(intact,-19,3.6,-24.79,8,1.2,0);
 // ruined storage foundations
 for(let b of [[-25.5,-15,.9,21],[-19,-25.2,13,.8],[-19,-4.8,13,.8],[-13,-20.5,.9,8.5],[-13,-9,.9,7]])box(ruins,b[0],.55,b[1],b[2],1.1,b[3],materials.stone);
 for(let i=0;i<15;i++)rock(ruins,-25+rand()*12,.2,-24+rand()*18,.35+rand()*.5);
}
function archiveRoom(){
 wall(intact,25.5,-15,.75,20.5);wall(intact,19.2,-25.2,13.1,.75);wall(intact,19.2,-4.8,13.1,.75);
 wall(intact,13,-21.0,.7,8.5);wall(intact,13,-8.9,.7,8.3);
 roof(intact,19.2,-15,14,22.2,6.34);
 box(intact,13,5.5,-15,.72,.55,3.8,materials.darkWood);
 for(let x of [16.2,20.6,23.2]){
  box(intact,x,.7,-22,2.2,1.27,1.4,materials.wood);
  for(let j=0;j<5;j++)box(intact,x+((j%3)-1)*.48,1.44,-22+(j%2)*.3,.55,.12,.4,materials.clay);
 }
 box(intact,19,.65,-11,4.4,1.2,2.0,materials.darkWood);
 for(let j=0;j<12;j++){let x=16+(j%4)*1.8,z=-8.0-Math.floor(j/4)*1.25;box(intact,x,.78,z,.76,.10,.57,materials.clay)}
 decorateFresco(intact,19,3.4,-24.78,9,1.7,0);
 for(let b of [[25.5,-15,.9,20.6],[19,-25.2,13,.8],[19,-4.8,13,.8],[13,-20.5,.9,8.5],[13,-9,.9,7]])box(ruins,b[0],.58,b[1],b[2],1.16,b[3],materials.stoneDark);
 for(let i=0;i<13;i++)rock(ruins,14+rand()*11,.2,-24+rand()*18,.38+rand()*.44);
}
function courtyard(){
 // Courtyard lateral porticoes and ritual basin
 for(let x of [-20.5,20.5]){
  for(let z of [4,10,16,22])column(intact,x,z,2.75,5.1);
  roof(intact,x,13,5.4,23,6.0);
 }
 // galleries along courtyard edges, fresco panels on backs
 for(let x of [-24.5,24.5]){
  wall(intact,x,12.5,.7,25.5,4.7);
  const f=decorateFresco(intact,x+(x>0?-.39:.39),3.15,10,11.5,2.2,x>0?-Math.PI/2:Math.PI/2);
 }
 // Large ceremonial stone platform
 box(intact,0,.3,9,7,.52,4,materials.plasterWarm);
 for(const x of [-2,2])pot(intact,x,7.4,.65);
 // Small low basins
 cyl(intact,-12,.28,18,1.14,1.2,.39,materials.stone,24);
 cyl(intact,-12,.49,18,.8,.82,.1,materials.black,24);
 // ruined courtyard stone stylobates
 for(let x of [-20.5,20.5])for(let z of [4,10,16,22])cyl(ruins,x,.23,z,.75,.9,.55,materials.stone,10);
 for(let x of [-24.5,24.5])box(ruins,x,.47,12.5,.8,.95,25.7,materials.stoneDark);
}
function terrace(){
 // northerly platform against rear wall
 for(let x of [-19,19])box(intact,x,1.2,-34,.85,2.4,14,materials.stoneDark);
 box(intact,0,.4,-40,38,.8,1.1,materials.stoneDark);
 for(let x=-16;x<18;x+=3.5){box(intact,x,1.15,-40,.55,1.5,.6,materials.plasterWarm)}
 for(let i=0;i<26;i++){let x=(rand()-.5)*35,z=-30-rand()*12;if(rand()>.70)pot(intact,x,z,.33)}
 // low foundations remain in ruins
 box(ruins,0,.4,-40,37,.8,1.1,materials.stoneDark);
}
function figures(){
 let skin=new THREE.MeshStandardMaterial({color:0xb88760,roughness:.9});
 let dress=new THREE.MeshStandardMaterial({color:0xd6bd8e,roughness:.88});
 let dressBlue=new THREE.MeshStandardMaterial({color:0x54737b,roughness:.85});
 const poses=[[-3,24,0],[3,20,.8],[-8,9,2],[9,11,1.2],[-18,-10,0],[19,-9,1],[-4,-3,1.8],[5,-29,2.5],[8,19,1.5],[-3,-30,1]];
 poses.forEach(([x,z,a],i)=>{
  const man=new THREE.Group();intact.add(man);man.position.set(x,.08,z);man.rotation.y=a;
  const cloth=i%3?dress:dressBlue;
  let body=mesh(man,new THREE.CylinderGeometry(.26,.39,1.08,9),cloth,0,1.12,0);body.castShadow=!mobile;
  cyl(man,0,1.85,0,.16,.13,.46,skin,10);
  sphere(man,0,2.14,0,.25,skin);
  sphere(man,0,2.30,-.07,.23,materials.darkWood);
  for(const side of [-1,1]){
   let arm=cyl(man,side*.38,1.17,0,.09,.10,.94,skin,8);arm.rotation.z=side*(.22+i*.025);
   cyl(man,side*.14,.34,0,.10,.13,.68,skin,8);
  }
  const sash=box(man,0,.89,0,.79,.11,.74,i%2?materials.red:materials.gold);
  const scale=.86+rand()*.25;man.scale.setScalar(scale);
  npcAnimations.push({obj:man,x,z,phase:rand()*6.28,base:a});
 });
}
function buildWorld(){
 ground();paving();outerFort();hall();storeRoom();archiveRoom();courtyard();terrace();figures();
 // Ornamentation of approach: blocks, bronze braziers, plants
 for(let z=5;z<29;z+=6){for(let side of [-1,1]){
  cyl(intact,side*12,.8,z,.66,.85,1.45,materials.stone,12);
  pot(intact,side*12,z,.48);
 }}
 for(const [x,z] of [[-29,38],[29,38],[-28,-40],[28,-40],[-28,-1],[28,3],[-30,18],[30,16]])plant(world,x,z,.75+rand()*.5);
 for(let i=0;i<75;i++){let x=(rand()-.5)*64,z=(rand()-.5)*91;if(Math.abs(x)<20&&z>-26&&z<27)continue;rock(world,x,.2,z,.1+rand()*.22)}
 camera.position.set(0,1.8,51);camera.rotation.order='YXZ';camera.rotation.set(player.pitch,player.yaw,0);
}
function teleport(s){
 player.x=s.arrival[0];player.z=s.arrival[1];player.yaw=s.yaw;player.pitch=-.05;
 camera.position.set(player.x,1.85,player.z);updateNear(true);$('#map-panel').hidden=true;
}
function explain(s){
 if(!s)return;
 const html='<div class="article-number">'+s.number+' / 06</div><h2>'+s.title+'</h2><div class="article-kicker">'+s.kicker+'</div><p>'+s.text+'</p>'+
 '<div class="fact"><strong>UN FATTO DA RICORDARE</strong><p>'+s.fact+'</p></div>'+
 '<div class="source-note"><small>TRA DOCUMENTO E IPOTESI</small><p>'+s.caution+'</p></div>'+
 '<a class="tomb-card" href="../Tomba-Agamennone/"><small>APPROFONDIMENTO · MICENE</small><strong>La Tomba di Agamennone</strong><span>Dal Tesoro di Atreo al mito del re: distingui testimonianze archeologiche e tradizione.</span><b>Entra nell’approfondimento ↗</b></a>'+
 '<div class="source-note"><small>FONTI PER APPROFONDIRE</small><p><a href="https://whc.unesco.org/en/list/941" target="_blank" rel="noopener">UNESCO: Micene e Tirinto ↗</a></p><p><a href="https://www.namuseum.gr/en/permanent_exhibition/mykinaikes-archaiotites/" target="_blank" rel="noopener">Museo Archeologico Nazionale di Atene ↗</a></p></div>';
 $('#article-content').innerHTML=html;openPanel('article');
}
function updateNear(force=false){
 let best=null,d=Infinity;
 stops.forEach(s=>{let r=Math.hypot(player.x-s.pos[0],player.z-s.pos[1]);if(r<d){best=s;d=r}});
 nearStop=d<13?best:null;
 $('#nearby').hidden=!nearStop;
 if(nearStop)$('#nearby-label').textContent='Scopri: '+nearStop.title;
 if(best)$('#place-name').textContent=d<19?best.title:(player.z>31?'Lungo la via d’accesso':'Dentro la cittadella');
}
$('#nearby').onclick=()=>explain(nearStop);
function drawMap(){
 let canvas=$('#map-canvas'),ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;
 ctx.fillStyle='#ddd6c8';ctx.fillRect(0,0,w,h);
 const sx=(x)=>w/2+x*4.5, sz=(z)=>h/2+z*3.55+10;
 ctx.strokeStyle='#b6a795';ctx.lineWidth=2;for(let x=20;x<w;x+=26){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
 for(let y=15;y<h;y+=26){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 const rect=(x,z,ww,dd,col)=>{ctx.fillStyle=col;ctx.fillRect(sx(x-ww/2),sz(z-dd/2),ww*4.5,dd*3.55)};
 rect(0,-2,67,80,'#968976');rect(0,-3,62,74,'#d7c8ad');
 rect(-19,-15,13,22,'#827566');rect(19,-15,13,22,'#827566');rect(0,-15,21,19,'#7d7060');
 rect(0,12,37,28,'#e0d7c7');rect(0,34,12,8,'#e0d7c7');rect(0,-34,35,14,'#b5a48d');
 for(let s of stops){ctx.beginPath();ctx.arc(sx(s.pos[0]),sz(s.pos[1]),10.8,0,Math.PI*2);ctx.fillStyle='#a67b43';ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 12px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(s.number,sx(s.pos[0]),sz(s.pos[1]))}
 ctx.beginPath();ctx.arc(sx(player.x),sz(player.z),6,0,Math.PI*2);ctx.fillStyle='#24485c';ctx.fill();ctx.strokeStyle='white';ctx.lineWidth=2;ctx.stroke();
 ctx.beginPath();ctx.moveTo(sx(player.x),sz(player.z));ctx.lineTo(sx(player.x)-Math.sin(player.yaw)*18,sz(player.z)-Math.cos(player.yaw)*14);ctx.strokeStyle='#24485c';ctx.lineWidth=3;ctx.stroke();
 ctx.font='bold 11px Manrope,Arial';ctx.fillStyle='#554b41';ctx.textAlign='left';ctx.fillText('N ↑',15,22);ctx.fillText('PIANTA ORIENTATIVA',15,h-15);
}
$('#map-canvas').addEventListener('click',e=>{
 const b=e.currentTarget.getBoundingClientRect(),x=(e.clientX-b.left)/b.width*360,y=(e.clientY-b.top)/b.height*390;
 let best=null,d=Infinity;
 stops.forEach(s=>{let dx=x-(180+s.pos[0]*4.5),dy=y-(195+s.pos[1]*3.55+10),dd=Math.hypot(dx,dy);if(dd<d){d=dd;best=s}});
 if(d<20){teleport(best);$('#map-panel').hidden=true}
});
function tryStep(x,z){
 const R=.50;
 for(const o of colliders){
  if(o.mode==='life'&&nowRuins)continue;
  if(Math.abs(x-o.x)<o.w/2+R&&Math.abs(z-o.z)<o.d/2+R)return false;
 }
 return true;
}
function setupEvents(){
 addEventListener('resize',resize);
 addEventListener('keydown',e=>{
  if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault()}
  if(e.code==='Escape'){closePanels();$('#map-panel').hidden=true;$('#help-panel').hidden=true}
  if(e.code==='KeyE'&&nearStop)explain(nearStop);
  if(e.code==='KeyM')$('#btn-map').click();
 });addEventListener('keyup',e=>keys.delete(e.code));
 window.addEventListener('blur',()=>keys.clear());
 const canvas=renderer.domElement;
 canvas.addEventListener('pointerdown',e=>{if(!running)return;if(mobile&&e.clientX<innerWidth*.39)return;lookPointer=e.pointerId;lastMouseX=e.clientX;lastMouseY=e.clientY;canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(e.pointerId!==lookPointer)return;const dx=e.clientX-lastMouseX,dy=e.clientY-lastMouseY;lastMouseX=e.clientX;lastMouseY=e.clientY;
 player.yaw-=dx*(mobile?.0043:.003);player.pitch=Math.max(-1.25,Math.min(.85,player.pitch-dy*(mobile?.0038:.0028)))});
 canvas.addEventListener('pointerup',e=>{if(e.pointerId===lookPointer)lookPointer=null});
 canvas.addEventListener('pointercancel',e=>{if(e.pointerId===lookPointer)lookPointer=null});
 const joy=$('#joystick'),knob=$('#stick');
 function moveJoy(e){const r=joy.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let dx=e.clientX-cx,dy=e.clientY-cy,mag=Math.hypot(dx,dy),max=r.width*.33;if(mag>max){dx=dx/mag*max;dy=dy/mag*max}joystick.x=dx/max;joystick.y=-dy/max;knob.style.transform='translate('+dx+'px,'+dy+'px)'}
 joy.addEventListener('pointerdown',e=>{e.preventDefault();joystickPointer=e.pointerId;joy.setPointerCapture(e.pointerId);moveJoy(e)});
 joy.addEventListener('pointermove',e=>{if(e.pointerId===joystickPointer){e.preventDefault();moveJoy(e)}});
 const end=e=>{if(e.pointerId===joystickPointer){joystickPointer=null;joystick.x=joystick.y=0;knob.style.transform='translate(0,0)'}};
 joy.addEventListener('pointerup',end);joy.addEventListener('pointercancel',end);
 $('#btn-life').onclick=()=>setEra(false);$('#btn-ruins').onclick=()=>setEra(true);
 $('#btn-sound').onclick=toggleSound;
}
function resize(){if(!renderer)return;renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.fov=mobile?74:69;camera.updateProjectionMatrix()}
function setEra(value){
 nowRuins=value;intact.visible=fortLife.visible=!value;ruins.visible=fortRuins.visible=value;
 $('#btn-life').classList.toggle('active',!value);$('#btn-ruins').classList.toggle('active',value);
 if(value&&player.z<-5&&player.z>-24&&Math.abs(player.x)<10){player.x=0;player.z=-8}
}
function frame(t){
 if(!running)return;requestAnimationFrame(frame);const dt=Math.min(.05,(t-lastTime)/1000||.016);lastTime=t;
 const panelOpen=!!document.querySelector('.panel.open');
 let forward=0,right=0;
 if(!panelOpen){
  forward=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'))+joystick.y;
  right=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'))+joystick.x;
 }
 const len=Math.hypot(forward,right);let walk=len>.05;
 if(walk){forward/=Math.max(1,len);right/=Math.max(1,len);const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight'))?8:4.25;
  let dx=(-Math.sin(player.yaw)*forward+Math.cos(player.yaw)*right)*speed*dt;
  let dz=(-Math.cos(player.yaw)*forward-Math.sin(player.yaw)*right)*speed*dt;
  if(tryStep(player.x+dx,player.z))player.x+=dx;
  if(tryStep(player.x,player.z+dz))player.z+=dz;
  lastWalk+=dt;if(lastWalk>.46){if(soundEnabled)footstep();lastWalk=0}
 }else lastWalk=0;
 const eyeH=1.82+(walk?Math.sin(t*.013)*.026:0);
 camera.position.set(player.x,eyeH+(Math.hypot(player.x,player.z)>52?terrainHeight(player.x,player.z):0),player.z);
 camera.rotation.set(player.pitch,player.yaw,0,'YXZ');
 const sky=scene.getObjectByName('sky');sky.position.copy(camera.position);
 if(hearthFire&&!nowRuins)hearthFire.intensity=2.25+.28*Math.sin(t*.008);
 npcAnimations.forEach((n,i)=>{n.obj.position.y=.08+Math.sin(t*.0008+n.phase)*.028;n.obj.rotation.y=n.base+Math.sin(t*.0004+n.phase)*.04});
 if(t%420<55)updateNear();
 if(!$('#map-panel').hidden&&t%400<40)drawMap();
 renderer.render(scene,camera);
}
function makeWind(){
 const SR=22050,len=SR*3,buffer=audioCtx.createBuffer(1,len,SR),d=buffer.getChannelData(0);let sm=0;
 for(let i=0;i<len;i++){sm=sm*.96+(Math.random()*2-1)*.04;d[i]=sm}
 windSource=audioCtx.createBufferSource();windSource.buffer=buffer;windSource.loop=true;
 let low=audioCtx.createBiquadFilter();low.type='lowpass';low.frequency.value=380;
 windGain=audioCtx.createGain();windGain.gain.value=.085;windSource.connect(low);low.connect(windGain);windGain.connect(audioCtx.destination);windSource.start();
}
function footstep(){
 if(!audioCtx||audioCtx.state!=='running')return;
 let osc=audioCtx.createOscillator(),gain=audioCtx.createGain(),now=audioCtx.currentTime;
 osc.type='sine';osc.frequency.setValueAtTime(85,now);osc.frequency.exponentialRampToValueAtTime(48,now+.095);
 gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.038,now+.014);gain.gain.exponentialRampToValueAtTime(.0001,now+.13);
 osc.connect(gain);gain.connect(audioCtx.destination);osc.start(now);osc.stop(now+.15);
}
async function toggleSound(){
 try{
  if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();makeWind()}
  await audioCtx.resume();soundEnabled=!soundEnabled;windGain.gain.setTargetAtTime(soundEnabled?.085:0,audioCtx.currentTime,.15);
  $('#btn-sound').textContent=soundEnabled?'♫':'♪';$('#btn-sound').setAttribute('aria-label',soundEnabled?'Disattiva suoni':'Attiva suoni ambientali');
 }catch(e){console.warn('Audio disattivato:',e)}
}
init();
