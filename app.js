const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => [...ctx.querySelectorAll(q)];

const i18n = {
  zh: {
    courseInfoShort:"课程信息", courseInfoAria:"打开课程信息", courseInfoEyebrow:"COURSE INFORMATION · 2026.08.30", courseInfoTitle:"课程信息", courseNameA:"人工智能技术入门", courseNameB:"AI 模型训练", lecturersLabel:"主讲人 · 排名不分先后", assistantsLabel:"课程协助", assistantA:"人工智能技术入门", assistantB:"AI 模型训练", timeLabel:"课程时间", courseTime:"2026 年 8 月 30 日上午 · 09:00 开始", thanksText:"感谢各位老师、同学观看与参与。",
    heroEyebrow:"AI FUNDAMENTALS · MODEL TRAINING · AI × CHEMISTRY", heroTitleA:"人工智能技术入门", heroTitleB:"从训练模型到化学科研。", heroLead:"建立 AI / ML / DL 的基本概念，理解模型如何从数据中学习，再看这些技术怎样进入化学科研。", startLab:"开始课程 →", heroNote:"概念 → 训练 → 化学",
    learnTitle:"AI、ML、DL：先建立一个简单心智模型。", learnLead:"先不碰复杂公式。只需要知道这几个词之间是什么关系，以及一个机器学习问题最基本的组成。", aiSmall:"更大的技术集合", aiBody:"让机器完成通常需要智能的任务。", mlSmall:"从数据中学习", mlBody:"模型从样本中学习规律，并对新样本做预测。", dlSmall:"更灵活的模型", dlBody:"用多层神经网络学习复杂模式和表示。",
    trainTitle:"一个模型，到底是怎么“学会”的？", trainLead:"给模型数据，让它预测，计算误差，再调整参数。不断重复，就是最核心的训练循环。", trainData:"Data", trainPredict:"Prediction", trainLoss:"Loss", trainUpdate:"Update", splitTitle:"Train / Validation / Test", splitBody:"训练集学习参数；验证集帮助选设置；测试集最后检查未见数据上的表现。", lossTitle:"Loss", lossBody:"把“预测有多错”变成一个可以被优化的数字。", optimTitle:"Optimization", optimBody:"根据误差调整参数，让下一次预测更好。",
    trainerTitle:"亲手训练一条最简单的模型。", trainerLead:"黑色点是真实数据，蓝线是当前模型。点击训练，看参数变化和 Loss 下降。", stepOnce:"训练一步", trainAuto:"连续训练", pauseTrain:"暂停", resetTrainer:"重置",
    playTitle:"训练 ≠ 记住答案。", playLead:"真正关心的是：模型遇到没见过的数据，还能不能工作？", complexity:"模型复杂度", generalizeNote:"真正重要的是 unseen data。",
    representTitle:"化学对象，怎样变成模型能处理的数据？", representLead:"模型不直接看到“化学直觉”，它接收字符串、向量、图或三维几何等表示。",
    chemTitle:"把训练逻辑放回化学科研。", chemTask1Small:"结构 → 性质", chemTask1Body:"预测溶解度、能量、光谱、pKa 等性质。", chemTask2Small:"反应 → 结果", chemTask2Body:"预测产物、产率、选择性或实验条件。", chemTask3Small:"目标 → 候选", chemTask3Body:"筛选或生成候选，缩小昂贵实验与计算的搜索空间。",
    nowTitle:"AI 正在从“回答问题”走向“调用工具完成任务”。", nowLead:"Agent 可以把模型、检索、代码、文件和外部工具串成工作流，这会显著加速很多重复性的科研辅助工作。", agentCanTitle:"可以加速什么？", agentCanBody:"文献初筛、信息整理、代码草拟、数据处理、工具调用、工作流串联，以及把多个步骤自动衔接起来。", agentRiskTitle:"但不能把判断权完全交给 AI。", agentRiskBody:"模型可能生成看起来合理但实际错误的内容；更隐蔽的问题是错误可能出现在代码、引用、数据处理或中间步骤里，不容易被立即发现。", agentRule:"AI 可以加速科研，但证据、验证和最终判断仍然属于研究者。",
    researchTitle:"我们组正在怎么用 AI？", researchLead:"这里先保留真实项目入口。后续每个项目都按“问题 → 数据 → 表示 → 模型 → 输出 → 化学意义”填充。",
    exploreTitle:"课后继续学什么？", exploreLead:"课程、开源书、Agent 教程和 AI × Chemistry 项目，作为课后的延伸。", sourceNote:"这里只展示精选条目；外部卡片均链接到官方站点或官方 GitHub。",
    groupTitle:"从课程回到真实科研。", groupLab:"实验室主页", groupWebsite:"课题组主页", groupWiki:"课题组 Wiki", groupBilibili:"课题组 B 站",
    finishTitle:"课程结束，谢谢大家！", finishBody:"希望这次课程至少留下三个问题：数据是什么？模型在学什么？我们怎样知道它真的有效？", finishThanks:"感谢各位老师、同学观看与参与。祝大家科研顺利，也祝大家玩得开心。", viewCourseInfo:"查看课程信息",
    all:"全部", official:"官方来源 ↗", question:"问题", data:"数据", meaning:"意义", groupProject:"组内项目", underfit:"欠拟合", goodfit:"泛化较好", overfit:"过拟合风险", train:"训练", test:"测试"
  },
  en: {
    courseInfoShort:"Course info", courseInfoAria:"Open course information", courseInfoEyebrow:"COURSE INFORMATION · 2026.08.30", courseInfoTitle:"Course information", courseNameA:"Introduction to Artificial Intelligence", courseNameB:"AI Model Training", lecturersLabel:"Lecturers · no particular order", assistantsLabel:"Course assistants", assistantA:"Introduction to Artificial Intelligence", assistantB:"AI Model Training", timeLabel:"Course time", courseTime:"Morning of August 30, 2026 · starts at 09:00", thanksText:"Thank you to all teachers and students for watching and participating.",
    heroEyebrow:"AI FUNDAMENTALS · MODEL TRAINING · AI × CHEMISTRY", heroTitleA:"AI fundamentals", heroTitleB:"from model training to chemistry research.", heroLead:"Build a working mental model of AI / ML / DL, understand how models learn from data, then connect the same ideas to chemistry research.", startLab:"START COURSE →", heroNote:"concepts → training → chemistry",
    learnTitle:"AI, ML, DL — one simple mental model.", learnLead:"Skip the heavy mathematics at first. Understand how the terms relate and what a basic machine-learning problem contains.", aiSmall:"the broader field", aiBody:"Machines performing tasks associated with intelligence.", mlSmall:"learn from data", mlBody:"Models learn patterns from examples and predict on unseen data.", dlSmall:"more flexible models", dlBody:"Multi-layer neural networks learn complex patterns and representations.",
    trainTitle:"How does a model actually learn?", trainLead:"Give it data, make a prediction, measure the error, update the parameters, and repeat.", trainData:"Data", trainPredict:"Prediction", trainLoss:"Loss", trainUpdate:"Update", splitTitle:"Train / Validation / Test", splitBody:"Training learns parameters; validation helps choose settings; the test set checks unseen-data performance at the end.", lossTitle:"Loss", lossBody:"Turn “how wrong was the prediction?” into a number we can optimize.", optimTitle:"Optimization", optimBody:"Adjust parameters according to the error so the next prediction improves.",
    trainerTitle:"Train the simplest possible model yourself.", trainerLead:"Black dots are observations and the blue line is the current model. Train it and watch parameters move while loss falls.", stepOnce:"One step", trainAuto:"Auto train", pauseTrain:"Pause", resetTrainer:"Reset",
    playTitle:"Train ≠ memorize.", playLead:"What matters is whether the model still works on examples it has never seen.", complexity:"MODEL COMPLEXITY", generalizeNote:"what matters is unseen data.",
    representTitle:"How do chemical objects become model inputs?", representLead:"A model does not directly receive chemical intuition; it receives strings, vectors, graphs, 3D geometry, or other representations.",
    chemTitle:"Put the training logic back into chemistry research.", chemTask1Small:"structure → property", chemTask1Body:"Predict solubility, energies, spectra, pKa, and other properties.", chemTask2Small:"reaction → outcome", chemTask2Body:"Predict products, yield, selectivity, or experimental conditions.", chemTask3Small:"goal → candidates", chemTask3Body:"Screen or generate candidates and shrink expensive experimental or computational search spaces.",
    nowTitle:"AI is moving from answering questions toward using tools to complete workflows.", nowLead:"Agents can connect models, search, code, files, and external tools into workflows, accelerating many repetitive research-support tasks.", agentCanTitle:"What can it accelerate?", agentCanBody:"Literature triage, information organization, code drafting, data processing, tool use, workflow orchestration, and chaining multiple steps together.", agentRiskTitle:"But judgment cannot be fully delegated to AI.", agentRiskBody:"Models can produce plausible but wrong outputs, and subtler errors may hide in code, citations, data processing, or intermediate steps where they are harder to notice.", agentRule:"AI can accelerate research; evidence, verification, and final judgment still belong to the researcher.",
    researchTitle:"What are we doing with AI?", researchLead:"Keep this as the real-project entry point. Later, each project follows question → data → representation → model → output → chemical meaning.",
    exploreTitle:"What should I learn next?", exploreLead:"Courses, open books, agent tutorials, and AI × Chemistry projects for continued learning after the class.", sourceNote:"Only selected entries are shown here; external cards link to official project sites or official GitHub repositories.",
    groupTitle:"Back to real research.", groupLab:"Laboratory Website", groupWebsite:"Research Group Website", groupWiki:"Group Wiki", groupBilibili:"Group Bilibili",
    finishTitle:"Course complete — thank you!", finishBody:"If you leave with three questions, make them these: What is the data? What is the model learning? How do we know it really works?", finishThanks:"Thank you to all teachers and students for watching and participating. Best wishes for your research — and have fun exploring.", viewCourseInfo:"View course information",
    all:"All", official:"OFFICIAL SOURCE ↗", question:"Question", data:"Data", meaning:"Meaning", groupProject:"GROUP PROJECT", underfit:"underfitting", goodfit:"good generalization", overfit:"overfitting risk", train:"train", test:"test"
  }
};

let currentLang=localStorage.getItem("course-lang")||"zh";
function t(k){return i18n[currentLang][k]||k}
function applyLanguage(){
  document.documentElement.lang=currentLang==="zh"?"zh-CN":"en";
  $$('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(i18n[currentLang][k])el.textContent=i18n[currentLang][k]});
  $$('[data-i18n-aria]').forEach(el=>{const k=el.dataset.i18nAria;if(i18n[currentLang][k])el.setAttribute('aria-label',i18n[currentLang][k])});
  $("#lang-toggle").textContent=currentLang==="zh"?"EN / 中":"中 / EN";
  renderResources(window.__resources||[]); renderResearch(window.__research||[]); drawFit(); updateTrainerUI();
}
$("#lang-toggle").addEventListener("click",()=>{currentLang=currentLang==="zh"?"en":"zh";localStorage.setItem("course-lang",currentLang);applyLanguage()});

const dialog=$("#course-info-dialog");
function openCourseInfo(){if(dialog?.showModal)dialog.showModal()}
$("#course-info-button")?.addEventListener("click",openCourseInfo);
$("#finish-info-button")?.addEventListener("click",openCourseInfo);
dialog?.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});

addEventListener("scroll",()=>{const h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight);$("#progress-bar").style.width=`${Math.max(0,Math.min(1,p))*100}%`});

// quiet ambient background
const bg=$("#chem-space"),bctx=bg?.getContext("2d"); let dots=[];
function sizeBG(){if(!bg)return;const dpr=Math.min(devicePixelRatio||1,2);bg.width=innerWidth*dpr;bg.height=innerHeight*dpr;bg.style.width=innerWidth+"px";bg.style.height=innerHeight+"px";bctx.setTransform(dpr,0,0,dpr,0,0);dots=Array.from({length:Math.min(60,Math.floor(innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.05,vy:(Math.random()-.5)*.05,r:1+Math.random()*1.5}))}
function drawBG(){if(!bg)return;bctx.clearRect(0,0,innerWidth,innerHeight);bctx.fillStyle="#2f7683";dots.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0)d.x=innerWidth;if(d.x>innerWidth)d.x=0;if(d.y<0)d.y=innerHeight;if(d.y>innerHeight)d.y=0;bctx.beginPath();bctx.arc(d.x,d.y,d.r,0,Math.PI*2);bctx.fill()});requestAnimationFrame(drawBG)}
sizeBG();drawBG();addEventListener("resize",sizeBG);

// glossary
const tip=$("#tooltip");$$('.gloss').forEach(el=>{el.addEventListener('mouseenter',()=>{tip.textContent=currentLang==='zh'?el.dataset.tipZh:el.dataset.tipEn;tip.style.opacity=1});el.addEventListener('mousemove',e=>{tip.style.left=e.clientX+'px';tip.style.top=e.clientY+'px'});el.addEventListener('mouseleave',()=>tip.style.opacity=0)});

// molecular representation switcher
const repStage=$("#rep-stage");
const reps={molecule:`<div class="molecule-sketch">CH<sub>3</sub>—CH<sub>2</sub>—OH</div>`,smiles:`<div>CCO</div>`,fingerprint:`<div class="fingerprint">00100101000110101010010001100101</div>`,graph:`<div class="graphviz">C —— C —— O\n│     │     │\nH     H     H</div>`};
function setRep(name){if(!repStage)return;repStage.innerHTML=reps[name];if(repStage.animate)repStage.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:220})}
setRep('molecule');$$('.rep-tab').forEach(btn=>btn.addEventListener('click',()=>{$$('.rep-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');setRep(btn.dataset.rep)}));

// Playground: gradient descent on y = wx + b
const tcv=$("#train-canvas"),tctx=tcv?.getContext('2d');let trainPts=[],tw=-.8,tb=.55,tstep=0,timer=null,lr=.12;
function makeTrainData(){const slope=.8+Math.random()*.8,intercept=(Math.random()-.5)*.4;trainPts=Array.from({length:14},(_,i)=>{const x=-.9+i*(1.8/13);return [x,slope*x+intercept+(Math.random()-.5)*.22]});resetTrainer(false)}
function trainLoss(){return trainPts.reduce((s,[x,y])=>s+(tw*x+tb-y)**2,0)/trainPts.length}
function trainStep(){let gw=0,gb=0;trainPts.forEach(([x,y])=>{const e=tw*x+tb-y;gw+=2*e*x;gb+=2*e});gw/=trainPts.length;gb/=trainPts.length;tw-=lr*gw;tb-=lr*gb;tstep++;drawTrainer();pulseLoop()}
function pulseLoop(){const stages=$$('.train-stage');stages.forEach(s=>s.classList.remove('active'));if(stages.length){const seq=['data','prediction','loss','update'];const current=seq[tstep%4];$(`.train-stage[data-stage="${current}"]`)?.classList.add('active')}}
function drawTrainer(){if(!tcv)return;const W=tcv.width,H=tcv.height,X=x=>45+(x+1)/2*(W-90),Y=y=>H-30-(y+1.5)/3*(H-60);tctx.clearRect(0,0,W,H);tctx.strokeStyle='#b9b2a1';tctx.setLineDash([7,7]);tctx.beginPath();tctx.moveTo(40,H/2);tctx.lineTo(W-25,H/2);tctx.stroke();tctx.setLineDash([]);tctx.fillStyle='#26332f';trainPts.forEach(([x,y])=>{tctx.beginPath();tctx.arc(X(x),Y(y),6,0,Math.PI*2);tctx.fill()});tctx.strokeStyle='#2f7683';tctx.lineWidth=5;tctx.beginPath();tctx.moveTo(X(-1),Y(tw*(-1)+tb));tctx.lineTo(X(1),Y(tw+tb));tctx.stroke();updateTrainerUI()}
function updateTrainerUI(){if(!tcv)return;$("#trainer-step").textContent=tstep;$("#trainer-w").textContent=tw.toFixed(3);$("#trainer-b").textContent=tb.toFixed(3);$("#trainer-w-eq").textContent=tw.toFixed(2);$("#trainer-b-eq").textContent=tb>=0?tb.toFixed(2):`(${tb.toFixed(2)})`;$("#trainer-loss").textContent=trainLoss().toFixed(4);$("#trainer-auto-btn").textContent=timer?t('pauseTrain'):t('trainAuto');$("#trainer-auto-btn").classList.toggle('running',!!timer)}
function resetTrainer(stop=true){if(stop&&timer){clearInterval(timer);timer=null}tw=-.8;tb=.55;tstep=0;drawTrainer();$$('.train-stage').forEach(s=>s.classList.remove('active'))}
$("#trainer-step-btn")?.addEventListener('click',trainStep);$("#trainer-auto-btn")?.addEventListener('click',()=>{if(timer){clearInterval(timer);timer=null;updateTrainerUI()}else{timer=setInterval(()=>{trainStep();if(tstep>160||trainLoss()<.002){clearInterval(timer);timer=null;updateTrainerUI()}},90);updateTrainerUI()}});$("#trainer-reset-btn")?.addEventListener('click',()=>resetTrainer(true));makeTrainData();

// Playground: model complexity / generalization
const cv=$("#fit-canvas"),ctx=cv?.getContext('2d');const pts=[[-.9,-.28],[-.72,-.08],[-.52,-.2],[-.34,.16],[-.15,.11],[.04,.42],[.23,.31],[.42,.55],[.62,.48],[.82,.72]],testPts=[[-.82,-.18],[-.6,-.05],[-.25,.05],[.12,.34],[.52,.48],[.72,.58]];
function gauss(A,b){const n=b.length,M=A.map((r,i)=>[...r,b[i]]);for(let i=0;i<n;i++){let m=i;for(let k=i+1;k<n;k++)if(Math.abs(M[k][i])>Math.abs(M[m][i]))m=k;[M[i],M[m]]=[M[m],M[i]];const p=M[i][i]||1e-10;for(let j=i;j<=n;j++)M[i][j]/=p;for(let k=0;k<n;k++)if(k!==i){const f=M[k][i];for(let j=i;j<=n;j++)M[k][j]-=f*M[i][j]}}return M.map(r=>r[n])}
function polyfit(data,deg){const n=deg+1,A=Array.from({length:n},()=>Array(n).fill(0)),b=Array(n).fill(0);for(const [x,y] of data){const pow=Array.from({length:2*deg+1},(_,i)=>x**i);for(let i=0;i<n;i++){b[i]+=y*pow[i];for(let j=0;j<n;j++)A[i][j]+=pow[i+j]}}for(let i=0;i<n;i++)A[i][i]+=1e-5;return gauss(A,b)}
function pred(c,x){return c.reduce((s,a,i)=>s+a*x**i,0)}function mse(c,data){return data.reduce((s,[x,y])=>s+(pred(c,x)-y)**2,0)/data.length}
function drawFit(){if(!cv)return;const deg=+$("#degree").value,c=polyfit(pts,deg),W=cv.width,H=cv.height,X=x=>40+(x+1)/2*(W-80),Y=y=>H-30-(y+1)/2*(H-60);ctx.clearRect(0,0,W,H);ctx.strokeStyle='#b9b2a1';ctx.setLineDash([7,7]);ctx.beginPath();ctx.moveTo(40,H/2);ctx.lineTo(W-25,H/2);ctx.stroke();ctx.setLineDash([]);ctx.strokeStyle='#2f7683';ctx.lineWidth=5;ctx.beginPath();for(let i=0;i<=400;i++){const x=-1+2*i/400,y=pred(c,x);i?ctx.lineTo(X(x),Y(y)):ctx.moveTo(X(x),Y(y))}ctx.stroke();ctx.fillStyle='#26332f';pts.forEach(([x,y])=>{ctx.beginPath();ctx.arc(X(x),Y(y),6,0,Math.PI*2);ctx.fill()});ctx.fillStyle='#d87558';testPts.forEach(([x,y])=>{ctx.beginPath();ctx.arc(X(x),Y(y),6,0,Math.PI*2);ctx.fill()});const tr=mse(c,pts),te=mse(c,testPts);$("#degree-value").textContent=deg;const status=deg<=1?t('underfit'):deg<=4?t('goodfit'):t('overfit');$("#fit-status").textContent=`${status} · ${t('train')} ${tr.toFixed(3)} · ${t('test')} ${te.toFixed(3)}`}
$("#degree")?.addEventListener('input',drawFit);drawFit();

async function loadData(){try{const [r,p]=await Promise.all([fetch('data/resources.json').then(x=>x.json()),fetch('data/research.json').then(x=>x.json())]);window.__resources=r;window.__research=p;renderResources(r);renderResearch(p)}catch(e){console.warn(e)}}
function renderResearch(items){const root=$("#research-grid");if(!root)return;root.innerHTML=items.slice(0,4).map(x=>`<article class="research-card"><div class="meta">${t('groupProject')}</div><h3>${x.title}</h3><p><b>${t('question')}</b> — ${x.question}</p><p><b>${t('meaning')}</b> — ${x.meaning}</p></article>`).join('')}
function renderResources(items){const root=$("#resource-grid"),filters=$("#filters");if(!root||!items.length)return;const featured=items.filter(x=>x.featured).slice(0,9);const source=featured.length?featured:items.slice(0,9);const cats=['All',...new Set(source.map(x=>currentLang==='zh'?(x.categoryZh||x.category):x.category))];filters.innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?'active':''}" data-cat="${c}">${c==='All'?t('all'):c}</button>`).join('');const draw=cat=>{const shown=cat==='All'?source:source.filter(x=>(currentLang==='zh'?(x.categoryZh||x.category):x.category)===cat);root.innerHTML=shown.map(x=>`<article class="resource-card tone-${x.tone||'blue'}"><div class="meta">${x.kind} · ${x.source}</div><h3>${x.name}</h3><p>${currentLang==='zh'?x.descriptionZh:x.descriptionEn}</p><span class="resource-level">${currentLang==='zh'?x.levelZh:x.levelEn}</span><br><a href="${x.url}" target="_blank" rel="noopener">${t('official')}</a></article>`).join('')};draw('All');$$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');draw(b.dataset.cat)}))}

loadData();applyLanguage();
