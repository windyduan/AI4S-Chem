const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => [...ctx.querySelectorAll(q)];

const boot = [
  "Loading chemical space...",
  "Loading molecular representations...",
  "Connecting models and experiments...",
  "✓ Ready."
];
const bootEl = $("#boot-lines");
boot.forEach((line,i)=>{
  const d=document.createElement("div");
  d.className="bootline";
  d.style.animationDelay=`${300+i*360}ms`;
  d.textContent=line;
  bootEl.appendChild(d);
});

addEventListener("scroll",()=>{
  const h=document.documentElement;
  const p=h.scrollTop/(h.scrollHeight-h.clientHeight);
  $("#progress-bar").style.width=`${Math.max(0,Math.min(1,p))*100}%`;
});

const bg=$("#chem-space"), bctx=bg.getContext("2d");
let dots=[];
function sizeBG(){
  const dpr=Math.min(devicePixelRatio||1,2);
  bg.width=innerWidth*dpr; bg.height=innerHeight*dpr;
  bg.style.width=innerWidth+"px"; bg.style.height=innerHeight+"px";
  bctx.setTransform(dpr,0,0,dpr,0,0);
  dots=Array.from({length:Math.min(120,Math.floor(innerWidth/9))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,r:1+Math.random()*2.2
  }));
}
function drawBG(){
  bctx.clearRect(0,0,innerWidth,innerHeight);
  bctx.fillStyle="#1f6f78";
  dots.forEach(d=>{
    d.x+=d.vx; d.y+=d.vy;
    if(d.x<0)d.x=innerWidth;if(d.x>innerWidth)d.x=0;
    if(d.y<0)d.y=innerHeight;if(d.y>innerHeight)d.y=0;
    bctx.beginPath();bctx.arc(d.x,d.y,d.r,0,Math.PI*2);bctx.fill();
  });
  requestAnimationFrame(drawBG);
}
sizeBG(); drawBG(); addEventListener("resize",sizeBG);

const tip=$("#tooltip");
$$(".gloss").forEach(el=>{
  el.addEventListener("mouseenter",()=>{tip.textContent=el.dataset.tip;tip.style.opacity=1});
  el.addEventListener("mousemove",e=>{tip.style.left=e.clientX+"px";tip.style.top=e.clientY+"px"});
  el.addEventListener("mouseleave",()=>tip.style.opacity=0);
});

const repStage=$("#rep-stage");
const reps={
  molecule:`<div class="molecule-sketch">CH<sub>3</sub>—CH<sub>2</sub>—OH</div>`,
  smiles:`<div>CCO</div>`,
  fingerprint:`<div class="fingerprint">00100101000110101010010001100101</div>`,
  graph:`<div class="graphviz">C —— C —— O\n│     │     │\nH     H     H</div>`
};
function setRep(name){
  if (repStage.animate) repStage.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:260});
  repStage.innerHTML=reps[name];
}
setRep("molecule");
$$(".rep-tab").forEach(btn=>btn.onclick=()=>{
  $$(".rep-tab").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  setRep(btn.dataset.rep);
});

const cv=$("#fit-canvas"), ctx=cv.getContext("2d");
const pts=[[-.9,-.28],[-.72,-.08],[-.52,-.2],[-.34,.16],[-.15,.11],[.04,.42],[.23,.31],[.42,.55],[.62,.48],[.82,.72]];
const test=[[-.82,-.18],[-.6,-.05],[-.25,.05],[.12,.34],[.52,.48],[.72,.58]];
function gauss(A,b){
  const n=b.length, M=A.map((r,i)=>[...r,b[i]]);
  for(let i=0;i<n;i++){
    let m=i;
    for(let k=i+1;k<n;k++) if(Math.abs(M[k][i])>Math.abs(M[m][i])) m=k;
    [M[i],M[m]]=[M[m],M[i]];
    const p=M[i][i]||1e-10;
    for(let j=i;j<=n;j++)M[i][j]/=p;
    for(let k=0;k<n;k++)if(k!==i){
      const f=M[k][i];
      for(let j=i;j<=n;j++)M[k][j]-=f*M[i][j];
    }
  }
  return M.map(r=>r[n]);
}
function polyfit(data,deg){
  const n=deg+1,A=Array.from({length:n},()=>Array(n).fill(0)),b=Array(n).fill(0);
  for(const [x,y] of data){
    const pow=Array.from({length:2*deg+1},(_,i)=>x**i);
    for(let i=0;i<n;i++){
      b[i]+=y*pow[i];
      for(let j=0;j<n;j++)A[i][j]+=pow[i+j];
    }
  }
  for(let i=0;i<n;i++)A[i][i]+=1e-5;
  return gauss(A,b);
}
function pred(c,x){return c.reduce((s,a,i)=>s+a*x**i,0)}
function mse(c,data){return data.reduce((s,[x,y])=>s+(pred(c,x)-y)**2,0)/data.length}
function drawFit(){
  const deg=+$("#degree").value, c=polyfit(pts,deg), W=cv.width,H=cv.height;
  ctx.clearRect(0,0,W,H);
  ctx.lineWidth=2;ctx.strokeStyle="#b9c1ba";
  ctx.beginPath();ctx.moveTo(40,H/2);ctx.lineTo(W-30,H/2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(W/2,20);ctx.lineTo(W/2,H-30);ctx.stroke();
  const X=x=>40+(x+1)/2*(W-80), Y=y=>H-35-(y+1)/2*(H-70);
  ctx.strokeStyle="#1f6f78";ctx.lineWidth=4;ctx.beginPath();
  for(let i=0;i<=500;i++){
    const x=-1+2*i/500,y=pred(c,x);
    if(i===0)ctx.moveTo(X(x),Y(y));else ctx.lineTo(X(x),Y(y));
  }
  ctx.stroke();
  ctx.fillStyle="#17211f";
  pts.forEach(([x,y])=>{ctx.beginPath();ctx.arc(X(x),Y(y),6,0,Math.PI*2);ctx.fill()});
  ctx.fillStyle="#b1583c";
  test.forEach(([x,y])=>{ctx.beginPath();ctx.arc(X(x),Y(y),5,0,Math.PI*2);ctx.fill()});
  const tr=mse(c,pts),te=mse(c,test);
  $("#degree-value").textContent=deg;
  const status=deg<=1?"underfitting":deg<=4?"good generalization":"overfitting risk";
  $("#fit-status").textContent=`${status} · train ${tr.toFixed(3)} · test ${te.toFixed(3)}`;
}
$("#degree").addEventListener("input",drawFit);drawFit();

async function loadData(){
  try{
    const [r,p]=await Promise.all([
      fetch("data/resources.json").then(x=>x.json()),
      fetch("data/research.json").then(x=>x.json())
    ]);
    renderResources(r); renderResearch(p);
  }catch(e){
    $("#resource-grid").innerHTML="<p>Serve this folder with a local HTTP server to load JSON resources.</p>";
  }
}
function renderResearch(items){
  $("#research-grid").innerHTML=items.map(x=>`<article class="research-card">
    <div class="meta">GROUP PROJECT</div><h3>${x.title}</h3><p><b>Question</b> — ${x.question}</p>
    <p><b>Data</b> — ${x.data}</p><p><b>Meaning</b> — ${x.meaning}</p></article>`).join("");
}
function renderResources(items){
  const cats=["All",...new Set(items.map(x=>x.category))];
  $("#filters").innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");
  const draw=(cat="All")=>{
    const shown=cat==="All"?items:items.filter(x=>x.category===cat);
    $("#resource-grid").innerHTML=shown.map(x=>`<article class="resource-card">
      <div class="meta">${x.category} · ${x.source}</div><h3>${x.name}</h3><p>${x.description}</p>
      <a href="${x.url}" target="_blank" rel="noopener">OFFICIAL SOURCE ↗</a></article>`).join("");
  };
  draw();
  $$(".filter").forEach(b=>b.onclick=()=>{
    $$(".filter").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");draw(b.dataset.cat);
  });
}
loadData();
