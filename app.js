const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => [...ctx.querySelectorAll(q)];

const i18n = {
  zh: {
    navWhy:"WHY", navLearn:"LEARN", navRepresent:"REPRESENT", navPlay:"PLAY", navExplore:"EXPLORE", navGroup:"GROUP",
    heroEyebrow:"AI × CHEMISTRY · INTERACTIVE · 60 MIN", heroTitleA:"从化学问题出发", heroTitleB:"理解 AI。", heroLead:"从一个真实的化学问题开始，理解机器学习到底在做什么。", startLab:"开始课程 →", browseResources:"浏览学习资源 ↘", heroNote:"点击 · 拖动 · 悬浮 · 学习",
    whyTitle:"下一个值得尝试的分子，应该是谁？", whyBody:"化学空间巨大，而实验和高精度计算都很昂贵。机器学习的价值之一，是帮助我们更聪明地排序和筛选。", pipeSpace:"Chemical Space", pipeModel:"AI Model", pipeCandidates:"Promising Candidates", pipeExperiment:"Experiment", whyNote:"不是“替代化学”，而是缩小搜索空间。",
    learnTitle:"AI、ML、DL：先建立一个简单心智模型。", aiSmall:"更大的技术集合", aiBody:"让机器完成通常需要智能的任务。", mlSmall:"从数据中学习", mlBody:"模型从样本里学习规律，并对新样本做预测。", dlSmall:"学习复杂表示", dlBody:"用多层神经网络处理更复杂的模式与表示。",
    representTitle:"计算机到底怎么看一个分子？", repMolecule:"Molecule", representNote:"你看到的是化学结构；模型需要的是数值表示。",
    playTitle:"训练 ≠ 记住答案。", playLead:"拖动模型复杂度，观察拟合曲线与泛化能力如何变化。", complexity:"模型复杂度",
    inspireTitle:"为什么有人会向往科研？", inspireBody:"真实科研往往比纪录片慢、乱、琐碎得多。但好奇心、合作，以及第一次让某件原本做不到的事成为可能，也是真实的科研体验。", watchLater:"稍后观看 ↗",
    exploreTitle:"一条更舒服的 AI 自学路线。", exploreLead:"课程、开源书、Agent 教程和 AI4Science 项目放在同一个可筛选资源架里。", sourceNote:"外部卡片均链接到项目官方站点或官方 GitHub；详情见 SOURCES.md。",
    researchTitle:"我们组正在怎么用 AI？", researchLead:"先保留项目卡模板。之后只需要补研究问题、数据、模型、论文、GitHub 与 Demo。",
    groupTitle:"课程结束，但学习可以继续。", groupLead:"把组内主页、课题组 Wiki、数据入口、组内 GitHub 或联系方式放在课程最底部，让这次教学自然回到真实科研环境。", groupWebsite:"课题组主页", groupGithub:"组内 GitHub", groupWiki:"内部 Wiki / 文档", groupContact:"联系 / 加入我们", comingSoon:"之后补充链接", groupNote:"← 之后你只需要改这四个 href 和文字。", footerText:"Interactive scientific notebook · Sources in SOURCES.md",
    all:"全部", official:"官方来源 ↗", question:"问题", data:"数据", meaning:"意义", groupProject:"组内项目", underfit:"欠拟合", goodfit:"泛化较好", overfit:"过拟合风险", train:"训练误差", test:"测试误差"
  },
  en: {
    navWhy:"WHY", navLearn:"LEARN", navRepresent:"REPRESENT", navPlay:"PLAY", navExplore:"EXPLORE", navGroup:"GROUP",
    heroEyebrow:"AI × CHEMISTRY · INTERACTIVE · 60 MIN", heroTitleA:"Learn AI through", heroTitleB:"chemical problems.", heroLead:"Start from a real chemistry question and build an intuition for what machine learning is actually doing.", startLab:"START LAB →", browseResources:"Browse resources ↘", heroNote:"click · drag · hover · learn",
    whyTitle:"Which molecule should we try next?", whyBody:"Chemical space is huge, while experiments and accurate calculations are expensive. ML can help us rank and prioritize more intelligently.", pipeSpace:"Chemical Space", pipeModel:"AI Model", pipeCandidates:"Promising Candidates", pipeExperiment:"Experiment", whyNote:"not “replace chemistry” — shrink the search space.",
    learnTitle:"AI, ML, DL — one mental model.", aiSmall:"big umbrella", aiBody:"Machines performing tasks associated with intelligence.", mlSmall:"learn from data", mlBody:"Models learn patterns from examples and predict on unseen data.", dlSmall:"learn representations", dlBody:"Multi-layer neural networks learn complex patterns and representations.",
    representTitle:"How does AI see a molecule?", repMolecule:"Molecule", representNote:"you see chemistry → the model needs a numerical representation.",
    playTitle:"Train ≠ memorize.", playLead:"Drag model complexity and watch fitting and generalization change.", complexity:"MODEL COMPLEXITY",
    inspireTitle:"Why people are drawn to research.", inspireBody:"Real research is usually slower, messier and less cinematic than a documentary. But curiosity, collaboration and making something previously impossible possible are real parts of research too.", watchLater:"WATCH LATER ↗",
    exploreTitle:"A good path for self-learning AI.", exploreLead:"Courses, open books, agent tutorials and AI4Science projects in one curated, filterable shelf.", sourceNote:"External cards link to official project sites or official GitHub repositories. See SOURCES.md for attribution.",
    researchTitle:"What are we doing with AI?", researchLead:"Keep the project-card structure for now. Later, fill in the question, data, model, paper, GitHub and demo.",
    groupTitle:"Continue from here.", groupLead:"Place your group website, wiki, data portal, GitHub and contact links at the bottom so the teaching experience leads back into real research work.", groupWebsite:"Group Website", groupGithub:"Group GitHub", groupWiki:"Internal Wiki / Docs", groupContact:"Contact / Join us", comingSoon:"link to add later", groupNote:"← later, just replace these hrefs and labels.", footerText:"Built as an interactive scientific notebook · Sources in SOURCES.md",
    all:"All", official:"OFFICIAL SOURCE ↗", question:"Question", data:"Data", meaning:"Meaning", groupProject:"GROUP PROJECT", underfit:"underfitting", goodfit:"good generalization", overfit:"overfitting risk", train:"train", test:"test"
  }
};

let currentLang = localStorage.getItem("chemai-lang") || "zh";
function t(key){ return i18n[currentLang][key] || key; }
function applyLanguage(){
  document.documentElement.dataset.lang=currentLang;
  document.documentElement.lang=currentLang==="zh"?"zh-CN":"en";
  $$('[data-i18n]').forEach(el=>{ const k=el.dataset.i18n; if(i18n[currentLang][k]) el.textContent=i18n[currentLang][k]; });
  $("#lang-toggle").textContent=currentLang==="zh"?"EN / 中":"中 / EN";
  renderResources(window.__resources || []);
  renderResearch(window.__research || []);
  drawFit();
}
$("#lang-toggle").addEventListener("click",()=>{currentLang=currentLang==="zh"?"en":"zh";localStorage.setItem("chemai-lang",currentLang);applyLanguage();});

addEventListener("scroll",()=>{
  const h=document.documentElement;
  const p=h.scrollTop/(h.scrollHeight-h.clientHeight);
  $("#progress-bar").style.width=`${Math.max(0,Math.min(1,p))*100}%`;
});

const bg=$("#chem-space"), bctx=bg.getContext("2d");
let dots=[];
function sizeBG(){
  const dpr=Math.min(devicePixelRatio||1,2);
  bg.width=innerWidth*dpr; bg.height=innerHeight*dpr; bg.style.width=innerWidth+"px"; bg.style.height=innerHeight+"px";
  bctx.setTransform(dpr,0,0,dpr,0,0);
  dots=Array.from({length:Math.min(90,Math.floor(innerWidth/12))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.08,vy:(Math.random()-.5)*.08,r:1+Math.random()*2}));
}
function drawBG(){
  bctx.clearRect(0,0,innerWidth,innerHeight); bctx.fillStyle="#2f7683";
  dots.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0)d.x=innerWidth;if(d.x>innerWidth)d.x=0;if(d.y<0)d.y=innerHeight;if(d.y>innerHeight)d.y=0;bctx.beginPath();bctx.arc(d.x,d.y,d.r,0,Math.PI*2);bctx.fill();});
  requestAnimationFrame(drawBG);
}
sizeBG(); drawBG(); addEventListener("resize",sizeBG);

const tip=$("#tooltip");
$$(".gloss").forEach(el=>{
  el.addEventListener("mouseenter",()=>{tip.textContent=currentLang==="zh"?el.dataset.tipZh:el.dataset.tipEn;tip.style.opacity=1});
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
function setRep(name){if(repStage.animate)repStage.animate([{opacity:0,transform:"translateY(10px) rotate(-1deg)"},{opacity:1,transform:"none"}],{duration:250});repStage.innerHTML=reps[name];}
setRep("molecule");
$$(".rep-tab").forEach(btn=>btn.onclick=()=>{$$(".rep-tab").forEach(b=>b.classList.remove("active"));btn.classList.add("active");setRep(btn.dataset.rep);});

const cv=$("#fit-canvas"), ctx=cv.getContext("2d");
const pts=[[-.9,-.28],[-.72,-.08],[-.52,-.2],[-.34,.16],[-.15,.11],[.04,.42],[.23,.31],[.42,.55],[.62,.48],[.82,.72]];
const test=[[-.82,-.18],[-.6,-.05],[-.25,.05],[.12,.34],[.52,.48],[.72,.58]];
function gauss(A,b){const n=b.length,M=A.map((r,i)=>[...r,b[i]]);for(let i=0;i<n;i++){let m=i;for(let k=i+1;k<n;k++)if(Math.abs(M[k][i])>Math.abs(M[m][i]))m=k;[M[i],M[m]]=[M[m],M[i]];const p=M[i][i]||1e-10;for(let j=i;j<=n;j++)M[i][j]/=p;for(let k=0;k<n;k++)if(k!==i){const f=M[k][i];for(let j=i;j<=n;j++)M[k][j]-=f*M[i][j];}}return M.map(r=>r[n]);}
function polyfit(data,deg){const n=deg+1,A=Array.from({length:n},()=>Array(n).fill(0)),b=Array(n).fill(0);for(const [x,y] of data){const pow=Array.from({length:2*deg+1},(_,i)=>x**i);for(let i=0;i<n;i++){b[i]+=y*pow[i];for(let j=0;j<n;j++)A[i][j]+=pow[i+j];}}for(let i=0;i<n;i++)A[i][i]+=1e-5;return gauss(A,b);}
function pred(c,x){return c.reduce((s,a,i)=>s+a*x**i,0)}
function mse(c,data){return data.reduce((s,[x,y])=>s+(pred(c,x)-y)**2,0)/data.length}
function drawFit(){
  if(!cv)return;const deg=+$("#degree").value,c=polyfit(pts,deg),W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);ctx.lineWidth=2;ctx.strokeStyle="#b9b2a1";ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(40,H/2);ctx.lineTo(W-30,H/2);ctx.stroke();ctx.beginPath();ctx.moveTo(W/2,20);ctx.lineTo(W/2,H-30);ctx.stroke();ctx.setLineDash([]);
  const X=x=>40+(x+1)/2*(W-80),Y=y=>H-35-(y+1)/2*(H-70);ctx.strokeStyle="#2f7683";ctx.lineWidth=5;ctx.beginPath();for(let i=0;i<=500;i++){const x=-1+2*i/500,y=pred(c,x);if(i===0)ctx.moveTo(X(x),Y(y));else ctx.lineTo(X(x),Y(y));}ctx.stroke();
  ctx.fillStyle="#26332f";pts.forEach(([x,y])=>{ctx.beginPath();ctx.arc(X(x),Y(y),6,0,Math.PI*2);ctx.fill()});ctx.fillStyle="#d87558";test.forEach(([x,y])=>{ctx.beginPath();ctx.arc(X(x),Y(y),6,0,Math.PI*2);ctx.fill()});
  const tr=mse(c,pts),te=mse(c,test);$("#degree-value").textContent=deg;const status=deg<=1?t("underfit"):deg<=4?t("goodfit"):t("overfit");$("#fit-status").textContent=`${status} · ${t("train")} ${tr.toFixed(3)} · ${t("test")} ${te.toFixed(3)}`;
}
$("#degree").addEventListener("input",drawFit);drawFit();

async function loadData(){
  try{
    const [r,p]=await Promise.all([fetch("data/resources.json").then(x=>x.json()),fetch("data/research.json").then(x=>x.json())]);
    window.__resources=r;window.__research=p;renderResources(r);renderResearch(p);
  }catch(e){$("#resource-grid").innerHTML="<p>Serve this folder with a local HTTP server to load JSON resources.</p>";}
}
function renderResearch(items){
  if(!items.length)return;$("#research-grid").innerHTML=items.map(x=>`<article class="research-card"><div class="meta">${t("groupProject")}</div><h3>${x.title}</h3><p><b>${t("question")}</b> — ${x.question}</p><p><b>${t("data")}</b> — ${x.data}</p><p><b>${t("meaning")}</b> — ${x.meaning}</p></article>`).join("");
}
function renderResources(items){
  if(!items.length)return;
  const cats=["All",...new Set(items.map(x=>currentLang==="zh"?(x.categoryZh||x.category):x.category))];
  $("#filters").innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?"active":""}" data-cat="${c}">${c==="All"?t("all"):c}</button>`).join("");
  const draw=(cat="All")=>{
    const shown=cat==="All"?items:items.filter(x=>(currentLang==="zh"?(x.categoryZh||x.category):x.category)===cat);
    $("#resource-grid").innerHTML=shown.map(x=>`<article class="resource-card tone-${x.tone||"blue"}"><div class="meta">${x.kind} · ${x.source}</div><h3>${x.name}</h3><p>${currentLang==="zh"?x.descriptionZh:x.descriptionEn}</p><span class="resource-level">${currentLang==="zh"?x.levelZh:x.levelEn}</span><br><a href="${x.url}" target="_blank" rel="noopener">${t("official")}</a></article>`).join("");
  };
  draw();$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');draw(b.dataset.cat);});
}

$$('.group-link.placeholder').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
loadData();applyLanguage();
