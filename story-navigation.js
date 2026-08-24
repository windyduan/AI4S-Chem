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
      {labelZh:'04 · 指标与可信范围',labelEn:'04 · Metrics & trust range',ids:['metric-lab-screen','r2-baseline-screen','trust-zone-screen','generalization-review','generalization-checkpoint']},
      {labelZh:'05 · 两门课收口',labelEn:'05 · Course synthesis',ids:['course-summary-map']}
    ]},
    {course:'AFTER',titleZh:'课后继续',titleEn:'After class',groups:[
      {labelZh:'资源与课题组',labelEn:'Resources & group',ids:['explore','group','finish']}
    ]}
  ];

  const titles={
    'course-1-divider':['人工智能技术入门','Introduction to AI'],'course-lens':['为什么要懂一点 AI','Why learn a little AI'],'molecule-501':['第 501 个分子','Molecule #501'],'learn':['AI / ML / DL','AI / ML / DL'],'role-map-screen':['一个 ML 问题的角色','Roles in an ML problem'],
    'represent':['化学表示','Chemical representations'],'rep-vs-model':['Representation ≠ Model','Representation ≠ Model'],'gnn-story':['GNN / Message Passing','GNN / Message Passing'],'symmetry-story':['3D 与对称性','3D & symmetry'],'capability-map-screen':['现代 AI×Chemistry','Modern AI×Chemistry'],'chemistry':['化学任务','Chemistry tasks'],'chem-task-map-screen':['从任务到科研决策','From task to decision'],
    'discovery-story':['科研循环','Scientific discovery loop'],'case-nmrnet':['NMRNet','NMRNet'],'case-elyte':['电解液 uMLP','Electrolyte uMLP'],'case-catkg':['Cat-KG + LLM','Cat-KG + LLM'],'case-nose':['NOSE','NOSE'],'case-unixas':['Uni-XAS','Uni-XAS'],'case-electroplating':['电子电镀 Agent','Electroplating agent'],'now':['Scientific Agent','Scientific agent'],'research':['研究项目索引','Research gallery'],'review-shelf-screen':['综述与延伸','Reviews & perspectives'],
    'course-2-divider':['AI 模型训练','AI Model Training'],'equation-screen':['最小公式','The minimum equation'],'prediction-loss-screen':['Prediction / Loss','Prediction / Loss'],'train':['Training Loop','Training loop'],'training-playground-screen':['Gradient Descent','Gradient descent'],'batch-epoch-screen':['Batch / Epoch','Batch / Epoch'],'holdout-screen':['为什么要留出数据','Why hold out data'],'data-split':['Train / Val / Test','Train / Val / Test'],'play':['欠拟合与过拟合','Under/overfitting'],'generalization-curves':['Train vs Validation','Train vs Validation'],'unseen-vocabulary':['Unseen 是什么','What does unseen mean'],'split-scenarios':['化学数据划分','Chemistry-aware splits'],'evaluation-traps':['泄漏与评估陷阱','Leakage & evaluation traps'],'metric-lab-screen':['MAE / RMSE','MAE / RMSE'],'r2-baseline-screen':['R²','R²'],'trust-zone-screen':['适用范围','Applicability / trust zone'],'generalization-review':['评估回顾','Evaluation review'],'generalization-checkpoint':['Part B Checkpoint','Part B checkpoint'],'course-summary-map':['课程总结脑图','Course summary map'],
    'explore':['推荐学习资源','Learning resources'],'group':['课题组入口','Group links'],'finish':['课程结束','Finish']
  };
  const labelFor=id=>titles[id]?(zh()?titles[id][0]:titles[id][1]):id;
  const existing=ids=>ids.filter(id=>document.getElementById(id));
  const flat=()=>{const out=[];structure.forEach((course,ci)=>course.groups.forEach((group,gi)=>existing(group.ids).forEach(id=>out.push({id,course,group,ci,gi}))));return out};

  let trigger=$('#chapter-trigger');
  if(!trigger){trigger=document.createElement('button');trigger.id='chapter-trigger';trigger.className='chapter-trigger';trigger.type='button';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','chapter-drawer');trigger.innerHTML='<span class="chapter-trigger-icon"><i></i></span><span class="chapter-trigger-copy"><small>CHAPTERS</small><strong>—</strong></span>';info.insertAdjacentElement('afterend',trigger)}
  let backdrop=$('#chapter-backdrop');if(!backdrop){backdrop=document.createElement('div');backdrop.id='chapter-backdrop';backdrop.className='chapter-backdrop';document.body.appendChild(backdrop)}
  let drawer=$('#chapter-drawer');if(!drawer){drawer=document.createElement('aside');drawer.id='chapter-drawer';drawer.className='chapter-drawer';drawer.setAttribute('aria-label','Course chapters');document.body.appendChild(drawer)}

  function currentEntry(){let best=null,dist=Infinity;flat().forEach(e=>{const r=document.getElementById(e.id)?.getBoundingClientRect();if(!r)return;const d=Math.abs(r.top-Math.min(105,innerHeight*.13));if(d<dist){dist=d;best=e}});return best}
  function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('open');trigger.setAttribute('aria-expanded','false')}
  function updateActive(){const cur=currentEntry();if(!cur)return;const strong=$('.chapter-trigger-copy strong',trigger);if(strong)strong.textContent=labelFor(cur.id);if(!drawer.classList.contains('open'))return;$$('.chapter-item',drawer).forEach(b=>b.classList.toggle('is-current',b.dataset.target===cur.id));$$('.chapter-course',drawer).forEach(x=>x.classList.toggle('has-current',+x.dataset.course===cur.ci));$$('.chapter-group',drawer).forEach(x=>x.classList.toggle('has-current',+x.dataset.course===cur.ci&&+x.dataset.group===cur.gi));const all=flat(),idx=all.findIndex(x=>x.id===cur.id),bar=$('.chapter-progress i',drawer);if(bar)bar.style.width=(all.length>1?idx/(all.length-1)*100:0)+'%'}
  function buildDrawer(){drawer.innerHTML=`<div class="chapter-drawer-head"><div class="chapter-drawer-head-row"><div><small>COURSE MAP</small><strong>${zh()?'章节导航':'Chapter navigator'}</strong></div><button class="chapter-close" type="button" aria-label="Close">×</button></div><div class="chapter-progress"><i></i></div></div>`+structure.map((course,ci)=>{const groups=course.groups.map((g,gi)=>{const ids=existing(g.ids);if(!ids.length)return'';return `<div class="chapter-group" data-course="${ci}" data-group="${gi}"><div class="chapter-group-label">${zh()?g.labelZh:g.labelEn}</div><div class="chapter-item-list">${ids.map((id,j)=>`<button class="chapter-item" type="button" data-target="${id}"><span class="chapter-item-index">${String(j+1).padStart(2,'0')}</span><span><span class="chapter-item-title">${labelFor(id)}</span></span></button>`).join('')}</div></div>`}).join('');if(!groups)return'';return `<section class="chapter-course" data-course="${ci}"><div class="chapter-course-title"><div><small>${course.course==='AFTER'?'AFTER CLASS':'COURSE '+course.course}</small><strong>${zh()?course.titleZh:course.titleEn}</strong></div><span>${course.groups.reduce((n,g)=>n+existing(g.ids).length,0)} ${zh()?'页':'screens'}</span></div>${groups}</section>`}).join('');$('.chapter-close',drawer)?.addEventListener('click',closeDrawer);$$('.chapter-item',drawer).forEach(b=>b.addEventListener('click',()=>{document.getElementById(b.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'});closeDrawer()}));updateActive()}
  function openDrawer(){buildDrawer();drawer.classList.add('open');backdrop.classList.add('open');trigger.setAttribute('aria-expanded','true')}
  trigger.addEventListener('click',()=>drawer.classList.contains('open')?closeDrawer():openDrawer());backdrop.addEventListener('click',closeDrawer);addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});addEventListener('scroll',updateActive,{passive:true});addEventListener('resize',updateActive);

  function summaryHTML(){
    const q=zh()?['科学问题是什么？','数据与 target 从哪里来？','模型真正看到什么 representation？','模型学什么、输出什么？','评估是否模拟真正的未来使用？','输出怎样改变科研决策？']:['What is the scientific question?','Where do data and targets come from?','What representation does the model actually see?','What is learned and what is output?','Does evaluation simulate intended future use?','How does the output change a scientific decision?'];
    return `<div class="summary-map-head"><div class="story-copy"><div class="section-no">FINAL / SUMMARY</div><div class="story-kicker">CLICK TO UNFOLD · COURSE MAP</div><h2>${zh()?'两门课，最后回到同一条科研主线。':'Two courses, one scientific workflow.'}</h2><p class="lead compact">${zh()?'按真实上课顺序展开：先回顾“AI 能做什么”，再回顾“模型怎样训练、怎样证明可信”，最后收束成 6 个问题。':'Unfold in teaching order: first what AI can do, then how models learn and are evaluated, finally six questions to carry forward.'}</p></div><div><div class="summary-map-controls"><button class="story-button primary summary-next" type="button"></button><button class="story-button summary-reset" type="button">Reset</button></div><div class="summary-map-status"><span>0</span> / 3</div></div></div>
    <div class="summary-map-shell story-reveal">
      <div class="summary-spine"><article class="summary-course-card one"><small>COURSE 01</small><strong>${zh()?'人工智能技术入门':'Introduction to AI'}</strong><span>${zh()?'先认识能力':'understand capabilities'}</span></article><div class="summary-spine-arrow">→</div><div class="summary-core"><small>ONE SCIENTIFIC SPINE</small><strong>${zh()?'问题 → 数据 → 模型 → 证据 → 决策':'Question → Data → Model → Evidence → Decision'}</strong></div><div class="summary-spine-arrow">→</div><article class="summary-course-card two"><small>COURSE 02</small><strong>${zh()?'AI 模型训练':'AI Model Training'}</strong><span>${zh()?'再拆开训练与评估':'open training & evaluation'}</span></article></div>
      <div class="summary-unfold course-one-unfold" data-step="1"><div class="summary-unfold-label"><small>STEP 01 · COURSE 01</small><strong>${zh()?'AI 怎样进入化学科研？':'How does AI enter chemistry research?'}</strong></div><div class="summary-node-row"><div class="summary-mini-node"><small>OBJECT</small><strong>${zh()?'化学问题':'Chemistry question'}</strong></div><div class="summary-mini-arrow">→</div><div class="summary-mini-node"><small>INPUT</small><strong>Representation</strong><span>descriptor · fingerprint · SMILES · graph · 3D</span></div><div class="summary-mini-arrow">→</div><div class="summary-mini-node"><small>CAPABILITY</small><strong>GNN · 3D · Multimodal · Agent</strong></div><div class="summary-mini-arrow">→</div><div class="summary-mini-node cases"><small>REAL CASES</small><strong>6 projects</strong><span>NMRNet · uMLP · Cat-KG · NOSE · Uni-XAS · Electroplating</span></div></div></div>
      <div class="summary-unfold course-two-unfold" data-step="2"><div class="summary-unfold-label"><small>STEP 02 · COURSE 02</small><strong>${zh()?'模型为什么会学，以及为什么值得相信？':'How does a model learn, and why should we trust it?'}</strong></div><div class="summary-node-row"><div class="summary-mini-node"><small>MODEL</small><strong>ŷ = f(x; θ)</strong></div><div class="summary-mini-arrow">→</div><div class="summary-mini-node"><small>LEARN</small><strong>Prediction → Loss → Update</strong><span>learning rate · batch · epoch</span></div><div class="summary-mini-arrow">→</div><div class="summary-mini-node"><small>HOLD OUT</small><strong>Train · Val · Test</strong></div><div class="summary-mini-arrow">→</div><div class="summary-mini-node"><small>EVIDENCE</small><strong>Generalization · Split · Metrics</strong><span>MAE · RMSE · R² · applicability</span></div></div></div>
      <div class="summary-final" data-step="3"><div class="summary-final-title"><small>STEP 03 · TAKE THIS WITH YOU</small><strong>${zh()?'以后看到任何 AI×Chemistry 项目，先问这 6 个问题。':'For any AI×Chemistry project, ask these six questions first.'}</strong></div><div class="summary-six">${q.map((x,i)=>`<div><b>${i+1}</b><span>${x}</span></div>`).join('')}</div><p><strong>${zh()?'课程正式内容到这里结束。':'Core course content ends here.'}</strong> ${zh()?'后面的 Resources / Group 是课后入口。':'Resources and Group links that follow are after-class entry points.'}</p></div>
    </div>`;
  }

  function ensureSummary(force=false){
    let old=$('#course-summary-map');if(force&&old){old.remove();old=null}if(old)return;
    const anchor=$('#generalization-checkpoint')||$('#generalization-review')||$('#trust-zone-screen')||$('#data-split'),explore=$('#explore');if(!anchor||!explore)return;
    const s=document.createElement('section');s.id='course-summary-map';s.className='section snap-section story-section';s.innerHTML=summaryHTML();explore.insertAdjacentElement('beforebegin',s);
    let step=0;const next=$('.summary-next',s),reset=$('.summary-reset',s),status=$('.summary-map-status span',s);
    function render(){$$('[data-step]',s).forEach(el=>el.classList.toggle('visible',+el.dataset.step<=step));status.textContent=step;next.disabled=step>=3;next.textContent=zh()?(step===0?'回顾 Course 01 →':step===1?'展开 Course 02 →':step===2?'收束成 6 个问题 →':'总结完成 ✓'):(step===0?'Review Course 01 →':step===1?'Unfold Course 02 →':step===2?'Finish with six questions →':'Summary complete ✓')}
    next.addEventListener('click',()=>{step=Math.min(3,step+1);render()});reset.addEventListener('click',()=>{step=0;render()});render();window.dispatchEvent(new Event('resize'));
  }

  [180,700,1500,2600].forEach(ms=>setTimeout(()=>{ensureSummary();buildDrawer();updateActive()},ms));
  $('#lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{ensureSummary(true);buildDrawer();updateActive()},50));
})();
