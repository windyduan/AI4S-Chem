(function installCourseNavigation(){
  const $=(q,c=document)=>c.querySelector(q), $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const main=$('main'),topbar=$('.topbar'),info=$('#course-info-button');
  if(!main||!topbar||!info)return;

  const structure=[
    {course:'01',titleZh:'人工智能技术入门',titleEn:'Introduction to AI',groups:[
      {labelZh:'01 · 建立心智模型',labelEn:'01 · Mental model',ids:['course-1-divider','course-lens','molecule-501','learn','role-map-screen']},
      {labelZh:'02 · 化学怎样进入模型',labelEn:'02 · Chemistry as model input',ids:['represent','rep-vs-model','gnn-story','symmetry-story','capability-map-screen','chemistry','chem-task-map-screen']},
      {labelZh:'03 · 六个真实案例',labelEn:'03 · Six real cases',ids:['discovery-story','case-nmrnet','case-elyte','case-catkg','case-nose','case-unixas','case-electroplating']},
      {labelZh:'04 · Agent 与真实科研',labelEn:'04 · Agents & real research',ids:['now','research','review-shelf-screen']}
    ]},
    {course:'02',titleZh:'AI 模型训练',titleEn:'AI Model Training',groups:[
      {labelZh:'01 · 模型怎样学',labelEn:'01 · How models learn',ids:['course-2-divider','equation-screen','prediction-loss-screen','train','training-playground-screen','batch-epoch-screen']},
      {labelZh:'02 · 为什么要留出数据',labelEn:'02 · Why hold out data',ids:['holdout-screen','data-split']},
      {labelZh:'03 · 泛化与化学评估',labelEn:'03 · Generalization & chemistry evaluation',ids:['play','generalization-curves','unseen-vocabulary','split-scenarios','evaluation-traps']},
      {labelZh:'04 · 指标与可信范围',labelEn:'04 · Metrics & trust range',ids:['metric-lab-screen','r2-baseline-screen','trust-zone-screen','generalization-review','generalization-checkpoint']}
    ]},
    {course:'AFTER',titleZh:'课后继续',titleEn:'After class',groups:[
      {labelZh:'资源与课题组',labelEn:'Resources & group',ids:['course-summary-map','explore','group','finish']}
    ]}
  ];

  const titleMap={
    'course-1-divider':['人工智能技术入门','Introduction to AI'],'course-lens':['为什么要懂一点 AI','Why learn a little AI'],'molecule-501':['第 501 个分子','Molecule #501'],'learn':['AI / ML / DL','AI / ML / DL'],'role-map-screen':['一个 ML 问题的角色','Roles in an ML problem'],
    'represent':['化学表示','Chemical representations'],'rep-vs-model':['Representation ≠ Model','Representation ≠ Model'],'gnn-story':['GNN / Message Passing','GNN / Message Passing'],'symmetry-story':['3D 与对称性','3D & symmetry'],'capability-map-screen':['现代 AI×Chemistry','Modern AI×Chemistry'],'chemistry':['化学任务','Chemistry tasks'],'chem-task-map-screen':['从任务到科研决策','From task to decision'],
    'discovery-story':['科研循环','Scientific discovery loop'],'case-nmrnet':['NMRNet','NMRNet'],'case-elyte':['电解液 uMLP','Electrolyte uMLP'],'case-catkg':['Cat-KG + LLM','Cat-KG + LLM'],'case-nose':['NOSE','NOSE'],'case-unixas':['Uni-XAS','Uni-XAS'],'case-electroplating':['电子电镀 Agent','Electroplating agent'],'now':['Scientific Agent','Scientific agent'],'research':['研究项目索引','Research gallery'],'review-shelf-screen':['综述与延伸','Reviews & perspectives'],
    'course-2-divider':['AI 模型训练','AI Model Training'],'equation-screen':['最小公式','The minimum equation'],'prediction-loss-screen':['Prediction / Loss','Prediction / Loss'],'train':['Training Loop','Training loop'],'training-playground-screen':['Gradient Descent','Gradient descent'],'batch-epoch-screen':['Batch / Epoch','Batch / Epoch'],'holdout-screen':['为什么要留出数据','Why hold out data'],'data-split':['Train / Val / Test','Train / Val / Test'],'play':['欠拟合与过拟合','Under/overfitting'],'generalization-curves':['Train vs Validation','Train vs Validation'],'unseen-vocabulary':['Unseen 是什么','What does unseen mean'],'split-scenarios':['化学数据划分','Chemistry-aware splits'],'evaluation-traps':['泄漏与评估陷阱','Leakage & evaluation traps'],'metric-lab-screen':['MAE / RMSE','MAE / RMSE'],'r2-baseline-screen':['R²','R²'],'trust-zone-screen':['适用范围','Applicability / trust zone'],'generalization-review':['评估回顾','Evaluation review'],'generalization-checkpoint':['Part B Checkpoint','Part B checkpoint'],
    'course-summary-map':['课程总结脑图','Course summary map'],'explore':['推荐学习资源','Learning resources'],'group':['课题组入口','Group links'],'finish':['课程结束','Finish']
  };

  function existingIds(ids){return ids.filter(id=>document.getElementById(id))}
  function flatEntries(){const out=[];structure.forEach((course,ci)=>course.groups.forEach((g,gi)=>existingIds(g.ids).forEach(id=>out.push({id,course,group:g,ci,gi}))));return out}
  function labelFor(id){const x=titleMap[id];return x?(zh()?x[0]:x[1]):id}

  // Trigger next to course info.
  let trigger=$('#chapter-trigger');
  if(!trigger){trigger=document.createElement('button');trigger.id='chapter-trigger';trigger.className='chapter-trigger';trigger.type='button';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','chapter-drawer');trigger.innerHTML='<span class="chapter-trigger-icon"><i></i></span><span class="chapter-trigger-copy"><small>CHAPTERS</small><strong>—</strong></span>';info.insertAdjacentElement('afterend',trigger)}

  let backdrop=$('#chapter-backdrop');if(!backdrop){backdrop=document.createElement('div');backdrop.id='chapter-backdrop';backdrop.className='chapter-backdrop';document.body.appendChild(backdrop)}
  let drawer=$('#chapter-drawer');if(!drawer){drawer=document.createElement('aside');drawer.id='chapter-drawer';drawer.className='chapter-drawer';drawer.setAttribute('aria-label','Course chapters');document.body.appendChild(drawer)}

  function buildDrawer(){
    drawer.innerHTML=`<div class="chapter-drawer-head"><div class="chapter-drawer-head-row"><div><small>${zh()?'COURSE MAP':'COURSE MAP'}</small><strong>${zh()?'章节导航':'Chapter navigator'}</strong></div><button class="chapter-close" type="button" aria-label="Close">×</button></div><div class="chapter-progress"><i></i></div></div>`+
      structure.map((course,ci)=>{const groups=course.groups.map((g,gi)=>{const ids=existingIds(g.ids);if(!ids.length)return'';return `<div class="chapter-group" data-course="${ci}" data-group="${gi}"><div class="chapter-group-label">${zh()?g.labelZh:g.labelEn}</div><div class="chapter-item-list">${ids.map((id,j)=>`<button class="chapter-item" type="button" data-target="${id}"><span class="chapter-item-index">${String(j+1).padStart(2,'0')}</span><span><span class="chapter-item-title">${labelFor(id)}</span><span class="chapter-item-note">#${id}</span></span></button>`).join('')}</div></div>`}).join('');return groups?`<section class="chapter-course" data-course="${ci}"><div class="chapter-course-title"><div><small>${course.course==='AFTER'?'AFTER CLASS':'COURSE '+course.course}</small><strong>${zh()?course.titleZh:course.titleEn}</strong></div><span>${course.groups.reduce((n,g)=>n+existingIds(g.ids).length,0)} ${zh()?'页':'screens'}</span></div>${groups}</section>`:''}).join('');
    $('.chapter-close',drawer)?.addEventListener('click',closeDrawer);$$('.chapter-item',drawer).forEach(b=>b.addEventListener('click',()=>{document.getElementById(b.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'});closeDrawer()}));
    updateActive();
  }
  function openDrawer(){buildDrawer();drawer.classList.add('open');backdrop.classList.add('open');trigger.setAttribute('aria-expanded','true')}
  function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('open');trigger.setAttribute('aria-expanded','false')}
  trigger.addEventListener('click',()=>drawer.classList.contains('open')?closeDrawer():openDrawer());backdrop.addEventListener('click',closeDrawer);addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});

  function currentEntry(){const entries=flatEntries();let best=null,bestDist=Infinity;entries.forEach(e=>{const el=document.getElementById(e.id);if(!el)return;const r=el.getBoundingClientRect();const anchor=Math.abs(r.top-Math.min(110,innerHeight*.14));if(anchor<bestDist){bestDist=anchor;best=e}});return best}
  function updateActive(){const cur=currentEntry();if(!cur)return;$('.chapter-trigger-copy strong',trigger).textContent=labelFor(cur.id);if(drawer.classList.contains('open')){$$('.chapter-item',drawer).forEach(b=>b.classList.toggle('is-current',b.dataset.target===cur.id));$$('.chapter-course',drawer).forEach(c=>c.classList.toggle('has-current',+c.dataset.course===cur.ci));$$('.chapter-group',drawer).forEach(g=>g.classList.toggle('has-current',+g.dataset.course===cur.ci&&+g.dataset.group===cur.gi));const entries=flatEntries(),idx=entries.findIndex(e=>e.id===cur.id),pct=entries.length>1?idx/(entries.length-1)*100:0;const bar=$('.chapter-progress i',drawer);if(bar)bar.style.width=pct+'%'} }
  addEventListener('scroll',updateActive,{passive:true});addEventListener('resize',updateActive);

  // Progressive summary map: actual course content ends here; resources come after it.
  function ensureSummary(){
    if($('#course-summary-map'))return;
    const anchor=$('#generalization-checkpoint')||$('#generalization-review')||$('#trust-zone-screen')||$('#data-split');const explore=$('#explore');if(!anchor||!explore)return;
    const s=document.createElement('section');s.id='course-summary-map';s.className='section snap-section story-section';s.innerHTML=`
      <div class="summary-map-head"><div class="story-copy"><div class="section-no">FINAL / SUMMARY</div><div class="story-kicker">CLICK TO UNFOLD · COURSE MIND MAP</div><h2>${zh()?'把两门课重新压成一张脑图。':'Compress both courses into one map.'}</h2><p class="lead compact">${zh()?'先看两条主干，再逐层展开。最后留下的不是术语列表，而是一套看 AI×Chemistry 项目的提问方式。':'Start from the two trunks and unfold layer by layer. The goal is not a vocabulary list but a way to interrogate AI×Chemistry projects.'}</p></div><div><div class="summary-map-controls"><button class="story-button primary summary-next" type="button">${zh()?'展开下一层 →':'Unfold next layer →'}</button><button class="story-button summary-reset" type="button">Reset</button></div><div class="summary-map-status">LAYER <span>0</span> / 3</div></div></div>
      <div class="summary-map-shell story-reveal"><div class="summary-root"><small>AI × CHEMISTRY · NEW STUDENT MENTAL MODEL</small><strong>${zh()?'问题 → 模型 → 证据 → 科研决策':'Question → Model → Evidence → Scientific decision'}</strong><p>${zh()?'两门课最后汇合在同一个科研工作流。':'Both courses meet in one scientific workflow.'}</p></div>
        <div class="summary-layer" data-layer="1"><article class="summary-course-root course-one"><small>COURSE 01</small><strong>${zh()?'人工智能技术入门':'Introduction to AI'}</strong><p>${zh()?'AI 能接收什么信息？现代模型怎样进入真实化学问题？':'What information can AI receive, and how do modern models enter real chemistry problems?'}</p></article><article class="summary-course-root course-two"><small>COURSE 02</small><strong>${zh()?'AI 模型训练':'AI Model Training'}</strong><p>${zh()?'模型怎样从数据更新参数？怎样证明它不是只会训练集？':'How are parameters learned from data, and how do we show the model works beyond training data?'}</p></article></div>
        <div class="summary-layer" data-layer="2"><button class="summary-branch active" data-branch="repr"><small>COURSE 01 · INPUT</small><strong>Representation</strong><p>${zh()?'Descriptor / Fingerprint / SMILES / Graph / 3D：模型实际“看见”什么。':'What the model actually sees: descriptors, fingerprints, SMILES, graphs, 3D.'}</p></button><button class="summary-branch" data-branch="cap"><small>COURSE 01 · CAPABILITY</small><strong>GNN · 3D · Multimodal · Agent</strong><p>${zh()?'不同能力方向不是升级树，而是可以组合的工具。':'Parallel capabilities that can be combined, not a single upgrade ladder.'}</p></button><button class="summary-branch" data-branch="train"><small>COURSE 02 · LEARNING</small><strong>Prediction → Loss → Update</strong><p>${zh()?'ŷ=f(x;θ)、learning rate、batch、epoch 构成训练骨架。':'ŷ=f(x;θ), learning rate, batch and epoch form the training skeleton.'}</p></button><button class="summary-branch" data-branch="eval"><small>COURSE 02 · EVIDENCE</small><strong>Split · Generalization · Metrics</strong><p>${zh()?'Train/Val/Test、化学 split、MAE/RMSE/R² 和适用范围决定证据代表什么。':'Train/Val/Test, chemistry-aware splits, metrics and applicability determine what the evidence means.'}</p></button></div>
        <div class="summary-layer" data-layer="3"><div class="summary-deep-panel"><h3>${zh()?'六个案例：六种能力落地':'Six cases: six capability patterns'}</h3><div class="summary-case-grid"><div class="summary-case-chip">NMRNet<br>3D → spectrum</div><div class="summary-case-chip">Electrolyte uMLP<br>potential → MLMD</div><div class="summary-case-chip">Cat-KG + LLM<br>knowledge → pathway</div><div class="summary-case-chip">NOSE<br>molecule ↔ receptor ↔ language</div><div class="summary-case-chip">Uni-XAS<br>spectrum ↔ 3D</div><div class="summary-case-chip">Electroplating Agent<br>specialists → experiment loop</div></div></div><div class="summary-question-panel"><h3>${zh()?'以后看到一个项目，先问 6 个问题':'Six questions for any future project'}</h3><div class="summary-question-list">${(zh()?['它到底想解决什么科学问题？','数据从哪里来，target 怎样定义？','模型真正看到的 representation 是什么？','模型学什么、输出什么？','怎样证明在真正相关的新数据上有效？','输出最后怎样改变科研决策？']:['What scientific question is being solved?','Where does the data come from, and how is the target defined?','What representation does the model actually see?','What is learned, and what is output?','How is performance demonstrated on genuinely relevant new data?','How does the output change a scientific decision?']).map(x=>`<div class="summary-question">${x}</div>`).join('')}</div></div></div>
        <div class="summary-bridge"><strong>${zh()?'课程内容到这里结束。':'The course content ends here.'}</strong> ${zh()?'后面的 Resources / Group 是课后入口，不再加入新的核心概念。':'Resources and Group links that follow are after-class entry points; no new core concept is introduced.'}</div>
      </div>`;explore.insertAdjacentElement('beforebegin',s);
    let layer=0;const next=$('.summary-next',s),reset=$('.summary-reset',s),status=$('.summary-map-status span',s);function render(){$$('.summary-layer',s).forEach(x=>x.classList.toggle('visible',+x.dataset.layer<=layer));$('.summary-bridge',s).classList.toggle('visible',layer>=3);status.textContent=layer;next.textContent=zh()?(layer<3?'展开下一层 →':'已经全部展开 ✓'):(layer<3?'Unfold next layer →':'Fully unfolded ✓');next.disabled=layer>=3}
    next.addEventListener('click',()=>{layer=Math.min(3,layer+1);render()});reset.addEventListener('click',()=>{layer=0;render()});$$('.summary-branch',s).forEach(b=>b.addEventListener('click',()=>{$$('.summary-branch',s).forEach(x=>x.classList.remove('active'));b.classList.add('active');layer=Math.max(layer,3);render()}));render();
  }

  // Course-order moves async sections for a moment after load; insert summary after it settles.
  [250,900,1800,3000].forEach(ms=>setTimeout(()=>{ensureSummary();buildDrawer();updateActive()},ms));
  $('#lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{buildDrawer();updateActive();const old=$('#course-summary-map');if(old){old.remove();ensureSummary()}},40));
})();
