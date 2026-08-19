const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => [...ctx.querySelectorAll(q)];

const i18n = {
  zh: {
    navLearn:"INTRO", navTrain:"TRAIN", navPlay:"GENERALIZE", navChem:"CHEMISTRY", navExplore:"EXPLORE", navGroup:"GROUP",
    courseInfoShort:"课程信息", courseInfoAria:"打开课程信息", courseInfoEyebrow:"COURSE INFORMATION · 2026.08.30", courseInfoTitle:"课程信息", courseNameA:"人工智能技术入门", courseNameB:"AI 模型训练", lecturersLabel:"主讲人 · 排名不分先后", assistantsLabel:"课程协助", assistantA:"— 人工智能技术入门", assistantB:"— AI 模型训练", timeLabel:"课程时间", courseTime:"2026 年 8 月 30 日上午 · 09:00 开始", thanksText:"感谢各位老师、同学观看与参与。",
    heroEyebrow:"AI FUNDAMENTALS · MODEL TRAINING · AI × CHEMISTRY", heroTitleA:"人工智能技术入门", heroTitleB:"从训练模型到化学科研。", heroLead:"建立 AI / ML / DL 的基本概念，亲手观察一个模型如何从数据中学习，再看这些技术怎样进入化学科研。", startLab:"开始课程 →", browseResources:"浏览自学资源 ↘", heroNote:"概念 → 训练 → 化学",
    learnTitle:"AI、ML、DL：先建立一个简单心智模型。", learnLead:"先不碰复杂公式。把几个最常见的词放到正确的位置，知道它们之间是什么关系。", aiSmall:"更大的技术集合", aiBody:"让机器完成通常需要智能的任务。", mlSmall:"从数据中学习", mlBody:"模型从样本里学习规律，并对新样本做预测。", dlSmall:"学习复杂表示", dlBody:"用多层神经网络处理更复杂的模式与表示。",
    trainTitle:"一个 AI 模型，到底是怎么“学会”的？", trainLead:"训练的核心不是魔法：给模型数据，让它预测，计算误差，再不断调整参数，让误差变小。", trainData:"Data", trainPredict:"Prediction", trainLoss:"Loss", trainUpdate:"Update Parameters", splitTitle:"Train / Validation / Test", splitBody:"训练集用于学习；验证集帮助选择设置；测试集最后检查模型面对未见数据时的表现。", lossTitle:"Loss Function", lossBody:"把“预测得有多错”压缩成一个可以优化的数字，例如回归任务中的误差。", optimTitle:"Optimization", optimBody:"优化器根据误差调整模型参数，重复很多次后，模型逐渐拟合数据中的规律。", trainNote:"prediction → error → update → repeat.", trainerTitle:"亲手训练一条最简单的模型。", trainerLead:"黑色点是真实数据，蓝色线是模型当前的预测。点击“训练一步”，看参数如何调整、Loss 如何下降。", epochLabel:"STEP", lossMetric:"MSE LOSS", stepOnce:"训练一步", trainAuto:"连续训练", pauseTrain:"暂停训练", resetTrainer:"重置模型", newDataset:"换一组数据", learningRate:"Learning rate · 学习率", trainerObserve:"观察：", trainerObserveBody:"每次更新都不需要“理解”公式背后的化学意义；优化器只需要知道，参数往哪个方向改能让 Loss 更小。", trainerNote:"prediction → compare → loss → update → repeat.",
    playTitle:"训练 ≠ 记住答案。", playLead:"拖动模型复杂度，观察拟合曲线与泛化能力如何变化。", complexity:"模型复杂度", generalizeNote:"真正重要的是 unseen data。",
    representTitle:"化学对象，怎样变成模型能处理的数据？", representLead:"这是 AI 和化学真正连接起来的一步：模型不直接“看到化学直觉”，它接收的是字符串、向量、图或三维几何等数值表示。", repMolecule:"Molecule", representNote:"你看到的是化学结构；模型需要的是数值表示。",
    chemTitle:"AI 能在化学科研里做什么？", chemLead:"把前面的训练逻辑放回真实科研问题：输入是什么、目标是什么、数据从哪里来、模型最终帮我们做什么决策？", chemTask1Small:"结构 → 性质", chemTask1Title:"Property Prediction", chemTask1Body:"从分子或材料结构预测溶解度、能量、光谱、pKa 或其他性质。", chemTask2Small:"反应 → 结果", chemTask2Title:"Reaction & Experiment", chemTask2Body:"预测产物、产率、选择性或实验条件，并帮助安排下一轮实验。", chemTask3Small:"目标 → 候选", chemTask3Title:"Discovery & Design", chemTask3Body:"筛选材料、生成候选分子，或通过主动学习缩小需要真正实验和计算的搜索空间。", chemQuestion:"Chemical Question", chemData:"Data", chemRepresentation:"Representation", chemModel:"Model", chemDecision:"Scientific Decision",
    inspireTitle:"为什么有人会向往科研？", inspireBody:"真实科研往往比纪录片慢、乱、琐碎得多。但好奇心、合作，以及第一次让某件原本做不到的事成为可能，也是真实的科研体验。", watchLater:"稍后观看 ↗",
    exploreTitle:"课后继续学什么？", exploreLead:"把 AI 基础、深度学习、大模型与 Agent、AI × Chemistry 项目分开整理，按兴趣继续深入。", sourceNote:"外部卡片均链接到项目官方站点或官方 GitHub；详情见 SOURCES.md。",
    researchTitle:"我们组正在怎么用 AI？", researchLead:"后续实际填充时，每个项目都沿用同一条线：科学问题 → 数据 → 表示 → 模型 → 输出 → 化学意义。",
    groupTitle:"从课程回到真实科研。", groupLead:"如果你想继续了解我们的研究、教程、组内知识库或视频内容，可以从这里继续。", groupLab:"实验室主页", groupWebsite:"课题组主页", groupWiki:"课题组 Wiki", groupBilibili:"课题组 B 站", groupNote:"课程结束，但这些链接可以继续陪你往下走。", footerText:"AI fundamentals · Model training · AI × Chemistry · Sources in SOURCES.md",
    all:"全部", official:"官方来源 ↗", question:"问题", data:"数据", meaning:"意义", groupProject:"组内项目", underfit:"欠拟合", goodfit:"泛化较好", overfit:"过拟合风险", train:"训练误差", test:"测试误差"
  },
  en: {
    navLearn:"INTRO", navTrain:"TRAIN", navPlay:"GENERALIZE", navChem:"CHEMISTRY", navExplore:"EXPLORE", navGroup:"GROUP",
    courseInfoShort:"Course info", courseInfoAria:"Open course information", courseInfoEyebrow:"COURSE INFORMATION · 2026.08.30", courseInfoTitle:"Course information", courseNameA:"Introduction to Artificial Intelligence", courseNameB:"AI Model Training", lecturersLabel:"Lecturers · no particular order", assistantsLabel:"Course assistants", assistantA:"— Introduction to Artificial Intelligence", assistantB:"— AI Model Training", timeLabel:"Course time", courseTime:"Morning of August 30, 2026 · starts at 09:00", thanksText:"Thank you to all teachers and students for watching and participating.",
    heroEyebrow:"AI FUNDAMENTALS · MODEL TRAINING · AI × CHEMISTRY", heroTitleA:"AI fundamentals", heroTitleB:"from model training to chemistry research.", heroLead:"Build a working mental model of AI / ML / DL, watch a model learn from data, and then connect the same ideas to chemistry research.", startLab:"START COURSE →", browseResources:"Browse self-learning resources ↘", heroNote:"concepts → training → chemistry",
    learnTitle:"AI, ML, DL — one simple mental model.", learnLead:"Start without heavy mathematics. Put the common terms in the right places and understand how they relate.", aiSmall:"the broader field", aiBody:"Machines performing tasks associated with intelligence.", mlSmall:"learn from data", mlBody:"Models learn patterns from examples and predict on unseen data.", dlSmall:"learn representations", dlBody:"Multi-layer neural networks learn more complex patterns and representations.",
    trainTitle:"How does an AI model actually learn?", trainLead:"Training is not magic: show the model data, make a prediction, measure the error, then update the parameters to reduce that error.", trainData:"Data", trainPredict:"Prediction", trainLoss:"Loss", trainUpdate:"Update Parameters", splitTitle:"Train / Validation / Test", splitBody:"Training data teaches the model, validation data helps choose settings, and the test set checks performance on unseen examples at the end.", lossTitle:"Loss Function", lossBody:"Compress “how wrong was the prediction?” into a number that can be optimized.", optimTitle:"Optimization", optimBody:"An optimizer adjusts model parameters according to the error. Repeating this many times lets the model fit useful patterns in the data.", trainNote:"prediction → error → update → repeat.", trainerTitle:"Train the simplest possible model yourself.", trainerLead:"Black dots are observations. The blue line is the model's current prediction. Click “one training step” and watch the parameters move while the loss falls.", epochLabel:"STEP", lossMetric:"MSE LOSS", stepOnce:"One training step", trainAuto:"Auto train", pauseTrain:"Pause", resetTrainer:"Reset model", newDataset:"New dataset", learningRate:"Learning rate", trainerObserve:"Watch this:", trainerObserveBody:"The optimizer does not need chemical intuition here; it only needs a direction that changes the parameters so the loss gets smaller.", trainerNote:"prediction → compare → loss → update → repeat.",
    playTitle:"Train ≠ memorize.", playLead:"Drag model complexity and watch fitting and generalization change.", complexity:"MODEL COMPLEXITY", generalizeNote:"what matters is unseen data.",
    representTitle:"How do chemical objects become model inputs?", representLead:"This is where AI meets chemistry: a model does not directly receive chemical intuition; it receives strings, vectors, graphs, 3D geometry or other numerical representations.", repMolecule:"Molecule", representNote:"you see chemistry → the model needs a numerical representation.",
    chemTitle:"What can AI do in chemistry research?", chemLead:"Put the training logic back into real scientific questions: what is the input, what is the target, where does the data come from, and what decision does the model help us make?", chemTask1Small:"structure → property", chemTask1Title:"Property Prediction", chemTask1Body:"Predict solubility, energies, spectra, pKa or other properties from molecular or materials structure.", chemTask2Small:"reaction → outcome", chemTask2Title:"Reaction & Experiment", chemTask2Body:"Predict products, yield, selectivity or conditions and help choose the next experiments.", chemTask3Small:"goal → candidates", chemTask3Title:"Discovery & Design", chemTask3Body:"Screen materials, generate candidate molecules, or use active learning to shrink the space that needs expensive experiments or calculations.", chemQuestion:"Chemical Question", chemData:"Data", chemRepresentation:"Representation", chemModel:"Model", chemDecision:"Scientific Decision",
    inspireTitle:"Why people are drawn to research.", inspireBody:"Real research is usually slower, messier and less cinematic than a documentary. But curiosity, collaboration and making something previously impossible possible are real parts of research too.", watchLater:"WATCH LATER ↗",
    exploreTitle:"What should I learn next?", exploreLead:"Continue by interest: AI foundations, deep learning, LLMs and agents, or hands-on AI × Chemistry projects.", sourceNote:"External cards link to official project sites or official GitHub repositories. See SOURCES.md for attribution.",
    researchTitle:"What are we doing with AI?", researchLead:"When real group projects are added, keep the same storyline: scientific question → data → representation → model → output → chemical meaning.",
    groupTitle:"Back to real research.", groupLead:"Continue with our lab website, group site, wiki and video channel.", groupLab:"Laboratory Website", groupWebsite:"Research Group Website", groupWiki:"Group Wiki", groupBilibili:"Group Bilibili", groupNote:"the course ends here, but these links can take you further.", footerText:"AI fundamentals · Model training · AI × Chemistry · Sources in SOURCES.md",
    all:"All", official:"OFFICIAL SOURCE ↗", question:"Question", data:"Data", meaning:"Meaning", groupProject:"GROUP PROJECT", underfit:"underfitting", goodfit:"good generalization", overfit:"overfitting risk", train:"train", test:"test"
  }
};

let currentLang = localStorage.getItem("chemai-lang") || "zh";
function t(key){ return i18n[currentLang][key] || key; }
function applyLanguage(){
  document.documentElement.dataset.lang=currentLang;
  document.documentElement.lang=currentLang==="zh"?"zh-CN":"en";
  $$('[data-i18n]').forEach(el=>{ const k=el.dataset.i18n; if(i18n[currentLang][k]) el.textContent=i18n[currentLang][k]; });
  $$('[data-i18n-aria]').forEach(el=>{const k=el.dataset.i18nAria;if(i18n[currentLang][k])el.setAttribute('aria-label',i18n[currentLang][k]);});
  $("#lang-toggle").textContent=currentLang==="zh"?"EN / 中":"中 / EN";
  renderResources(window.__resources || []);
  renderResearch(window.__research || []);
  drawFit();
  updateTrainerUI();
}
$("#lang-toggle").addEventListener("click",()=>{currentLang=currentLang==="zh"?"en":"zh";localStorage.setItem("chemai-lang",currentLang);applyLanguage();});

// Course information dialog
const courseDialog=$("#course-info-dialog");
const courseInfoButton=$("#course-info-button");
if(courseInfoButton&&courseDialog){
  courseInfoButton.addEventListener("click",()=>courseDialog.showModal());
  courseDialog.addEventListener("click",e=>{if(e.target===courseDialog)courseDialog.close();});
}

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

// Playground 01: interactive linear regression training
const trainCanvas=$("#train-canvas"), trainCtx=trainCanvas?trainCanvas.getContext("2d"):null;
let trainerData=[];
let trainerW=-0.8, trainerB=0.55, trainerStep=0, trainerTimer=null, trainerStage=0;
const trainerTruth={w:0.78,b:-0.08};
function seededData(){
  const noise=[-.12,.06,-.07,.09,-.02,.11,-.1,.035,.08,-.055,.02];
  return noise.map((n,i)=>{const x=-.9+i*.18;return [x,trainerTruth.w*x+trainerTruth.b+n];});
}
function randomTrainerData(){
  trainerData=Array.from({length:11},(_,i)=>{const x=-.9+i*.18;const n=(Math.random()-.5)*.22;return [x,trainerTruth.w*x+trainerTruth.b+n];});
}
trainerData=seededData();
function trainerLoss(){return trainerData.reduce((s,[x,y])=>{const e=trainerW*x+trainerB-y;return s+e*e;},0)/trainerData.length;}
function trainerGrad(){
  let gw=0,gb=0;
  trainerData.forEach(([x,y])=>{const e=trainerW*x+trainerB-y;gw+=2*e*x;gb+=2*e;});
  return [gw/trainerData.length,gb/trainerData.length];
}
function drawTrainer(){
  if(!trainCtx)return;
  const W=trainCanvas.width,H=trainCanvas.height,X=x=>55+(x+1)/2*(W-100),Y=y=>H-45-(y+1)/2*(H-90);
  trainCtx.clearRect(0,0,W,H);
  trainCtx.strokeStyle="#c0b9a9";trainCtx.lineWidth=2;trainCtx.setLineDash([7,7]);
  trainCtx.beginPath();trainCtx.moveTo(55,Y(0));trainCtx.lineTo(W-45,Y(0));trainCtx.stroke();
  trainCtx.beginPath();trainCtx.moveTo(X(0),30);trainCtx.lineTo(X(0),H-45);trainCtx.stroke();trainCtx.setLineDash([]);
  // residuals
  trainCtx.strokeStyle="rgba(216,117,88,.38)";trainCtx.lineWidth=2;
  trainerData.forEach(([x,y])=>{const py=trainerW*x+trainerB;trainCtx.beginPath();trainCtx.moveTo(X(x),Y(y));trainCtx.lineTo(X(x),Y(py));trainCtx.stroke();});
  // model line
  trainCtx.strokeStyle="#2f7683";trainCtx.lineWidth=5;trainCtx.beginPath();trainCtx.moveTo(X(-1),Y(trainerW*-1+trainerB));trainCtx.lineTo(X(1),Y(trainerW+trainerB));trainCtx.stroke();
  // points
  trainCtx.fillStyle="#26332f";trainerData.forEach(([x,y])=>{trainCtx.beginPath();trainCtx.arc(X(x),Y(y),6.5,0,Math.PI*2);trainCtx.fill();});
  // truth hint, subtle
  trainCtx.strokeStyle="rgba(169,200,173,.72)";trainCtx.lineWidth=3;trainCtx.setLineDash([10,10]);trainCtx.beginPath();trainCtx.moveTo(X(-1),Y(-trainerTruth.w+trainerTruth.b));trainCtx.lineTo(X(1),Y(trainerTruth.w+trainerTruth.b));trainCtx.stroke();trainCtx.setLineDash([]);
}
function highlightTrainerStage(){
  const stages=$$(".train-stage");stages.forEach(x=>x.classList.remove("active"));if(stages.length)stages[trainerStage%stages.length].classList.add("active");trainerStage++;
}
function updateTrainerUI(){
  if(!trainCanvas)return;
  $("#trainer-step").textContent=trainerStep;
  $("#trainer-w").textContent=trainerW.toFixed(3);$("#trainer-b").textContent=trainerB.toFixed(3);$("#trainer-loss").textContent=trainerLoss().toFixed(4);
  $("#trainer-w-eq").textContent=trainerW.toFixed(2);$("#trainer-b-eq").textContent=(trainerB>=0?"+ ":"− ")+Math.abs(trainerB).toFixed(2);
  const auto=$("#trainer-auto-btn");if(auto){auto.textContent=trainerTimer?t("pauseTrain"):t("trainAuto");auto.classList.toggle("running",!!trainerTimer);}
  drawTrainer();
}
function trainerStepOnce(){
  highlightTrainerStage();
  const [gw,gb]=trainerGrad();const lr=+$("#learning-rate").value;trainerW-=lr*gw;trainerB-=lr*gb;trainerStep++;updateTrainerUI();
}
function stopTrainer(){if(trainerTimer){clearInterval(trainerTimer);trainerTimer=null;updateTrainerUI();}}
$("#trainer-step-btn")?.addEventListener("click",()=>{stopTrainer();trainerStepOnce();});
$("#trainer-auto-btn")?.addEventListener("click",()=>{if(trainerTimer){stopTrainer();return;}trainerTimer=setInterval(()=>{trainerStepOnce();if(trainerStep>=120||trainerLoss()<0.003)stopTrainer();},120);updateTrainerUI();});
$("#trainer-reset-btn")?.addEventListener("click",()=>{stopTrainer();trainerW=-.8;trainerB=.55;trainerStep=0;trainerStage=0;$$('.train-stage').forEach(x=>x.classList.remove('active'));updateTrainerUI();});
$("#trainer-data-btn")?.addEventListener("click",()=>{stopTrainer();randomTrainerData();trainerW=-.8;trainerB=.55;trainerStep=0;trainerStage=0;updateTrainerUI();});
$("#learning-rate")?.addEventListener("input",e=>{$("#learning-rate-value").textContent=(+e.target.value).toFixed(2);});
updateTrainerUI();

// Playground 02: model flexibility / overfitting
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

loadData();applyLanguage();
