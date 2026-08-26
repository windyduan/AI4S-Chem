(function installCourse01Continuity(){
  const $=(q,c=document)=>c.querySelector(q);
  const zh=()=>document.documentElement.lang!=='en';
  const set=(el,cn,en)=>{if(!el)return;const next=zh()?cn:en;if(el.textContent!==next)el.textContent=next};

  if(!document.querySelector('link[data-course01-continuity]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='css/course/course01/continuity.css?v=20260826c';
    link.dataset.course01Continuity='1';
    document.head.appendChild(link);
  }

  const numbers={
    'course-lens':'COURSE 01 / WHY',
    'molecule-501':'01A / QUESTION',
    'learn':'01B / AI · ML · DL',
    'role-map-screen':'01C / ROLES',
    'represent':'01D / REPRESENTATION',
    'rep-vs-model':'01E / CONCEPT',
    'gnn-story':'01F / GNN',
    'symmetry-story':'01G / 3D',
    'capability-map-screen':'01H / MODEL CHOICE',
    'chemistry':'01I / CHEMISTRY',
    'chem-task-map-screen':'01J / RESEARCH LOOP',
    'case-nmrnet':'01K / CASE',
    'case-elyte':'01L / CASE',
    'case-catkg':'01M / CASE',
    'case-nose':'01N / CASE',
    'case-unixas':'01O / CASE',
    'case-electroplating':'01P / CASE',
    'research':'01Q / CASE REVIEW',
    'now':'01R / AGENT',
    'review-shelf-screen':'01S / REVIEW'
  };

  function applyNumbers(){
    Object.entries(numbers).forEach(([id,no])=>{
      const el=$(`#${id} .section-no`);
      if(el&&el.textContent!==no)el.textContent=no;
    });
  }

  const recap={
    zh:[
      ['NMRNet','3D 局域原子环境','几何模型 + 迁移学习','原子级 NMR 化学位移'],
      ['uMLP / OP-Elyte','原子构型与电解液组成','机器学习势 + MLMD','结构与电解液性质'],
      ['Cat-KG + LLM','催化文献与结构化知识','知识图谱 + LLM + 化学规则','可追溯的候选路线'],
      ['NOSE','分子 + 受体 + 气味语言','多模态对齐','预测、检索与 zero-shot'],
      ['Uni-XAS','XAS 光谱 + 局域 3D 结构','跨模态共享表示','光谱与结构双向任务'],
      ['配方研发 Agent','专业模型 + 数据 + 实验','Agent 工作流编排','候选筛选与实验闭环']
    ],
    en:[
      ['NMRNet','Local 3D atomic environments','Geometric model + transfer learning','Atom-level NMR chemical shifts'],
      ['uMLP / OP-Elyte','Atomic configurations + electrolyte compositions','ML potential + MLMD','Structure and electrolyte properties'],
      ['Cat-KG + LLM','Catalysis literature + structured knowledge','Knowledge graph + LLM + chemistry rules','Traceable candidate routes'],
      ['NOSE','Molecules + receptors + odor language','Multimodal alignment','Prediction, retrieval, and zero-shot tasks'],
      ['Uni-XAS','XAS spectra + local 3D structure','Cross-modal shared representation','Bidirectional spectrum/structure tasks'],
      ['Formulation R&D Agent','Specialist models + data + experiments','Agent workflow orchestration','Candidate screening + experiment loop']
    ]
  };

  function researchCardsHTML(){
    const items=zh()?recap.zh:recap.en;
    const labels=zh()?['输入','能力','输出']:['INPUT','CAPABILITY','OUTPUT'];
    return items.map((item,i)=>`<article class="course01-recap-card"><small>CASE ${String(i+1).padStart(2,'0')}</small><strong>${item[0]}</strong><div class="course01-recap-rows"><div class="course01-recap-row is-input"><b>${labels[0]}</b><span>${item[1]}</span></div><div class="course01-recap-row is-capability"><b>${labels[1]}</b><span>${item[2]}</span></div><div class="course01-recap-row is-output"><b>${labels[2]}</b><span>${item[3]}</span></div></div></article>`).join('')+`<div class="course01-recap-footer">${zh()?'问题和数据不同，需要的模型能力也不同。':'Different questions and data call for different model capabilities.'}</div>`;
  }

  function applyResearchRecap(){
    const s=$('#research');if(!s)return;
    s.classList.add('course01-recap-screen');
    const h2=$('h2',s),lead=$('.lead',s);
    set(h2,'六个案例用了哪些 AI 能力？','What AI capabilities appear across the six cases?');
    set(lead,'比较每个案例的输入、核心模型或工具，以及最终输出。','Compare the input, core model or tool, and output of each case.');
    let kicker=$('.course01-recap-kicker',s);
    if(!kicker&&h2){kicker=document.createElement('div');kicker.className='course01-recap-kicker';h2.insertAdjacentElement('beforebegin',kicker)}
    set(kicker,'CASE REVIEW','CASE REVIEW');
    $('#verified-research-gallery',s)?.remove();
    let root=$('.course01-case-recap',s);
    if(!root){root=document.createElement('div');root.className='course01-case-recap';const grid=$('#research-grid',s);grid?.insertAdjacentElement('beforebegin',root)||s.appendChild(root)}
    const html=researchCardsHTML();if(root.innerHTML!==html)root.innerHTML=html;
  }

  function cleanupInjectedNarration(){
    document.querySelectorAll('.course01-bridge-note,.course01-agent-bridge,.course01-closeout-flow,.course01-next-course,.course01-review-label,.course-bridge').forEach(el=>el.remove());
    $('#review-shelf-screen')?.classList.remove('course01-closeout-screen');
  }

  function apply(){applyNumbers();applyResearchRecap();cleanupInjectedNarration()}
  apply();

  const main=$('main');
  if(main&&'MutationObserver'in window){
    let pending=false;
    new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply()})}).observe(main,{childList:true});
  }
  document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
