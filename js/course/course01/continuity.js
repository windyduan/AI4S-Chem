(function installCourse01Continuity(){
  const $=(q,c=document)=>c.querySelector(q);
  const zh=()=>document.documentElement.lang!=='en';
  const set=(el,cn,en)=>{if(!el)return;const next=zh()?cn:en;if(el.textContent!==next)el.textContent=next};

  if(!document.querySelector('link[data-course01-continuity]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='css/course/course01/continuity.css?v=20260826a';
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

  function ensureNote(section,className,cn,en,anchor){
    if(!section)return;
    let note=$('.'+className,section);
    if(!note){
      note=document.createElement('div');
      note.className=className;
      anchor?.insertAdjacentElement('afterend',note);
    }
    set(note,cn,en);
  }

  function applyConceptBridges(){
    const repModel=$('#rep-vs-model');
    if(repModel){
      ensureNote(
        repModel,
        'course01-bridge-note',
        '如果 x 是分子图，一个最典型的选择就是 GNN。下一页只看它怎样沿化学键传递信息。',
        'If x is a molecular graph, a natural model family is a GNN. Next, follow how information moves along bonds.',
        $('.repmodel-grid',repModel)
      );
    }
    const gnn=$('#gnn-story');
    if(gnn){
      ensureNote(
        gnn,
        'course01-bridge-note',
        '图告诉模型“谁和谁相连”；但很多化学问题还需要知道“它们在空间里在哪里”。',
        'A graph tells the model who is connected to whom; many chemistry problems also need to know where atoms are in 3D space.',
        $('.gnn-lab',gnn)
      );
    }
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
    return items.map((item,i)=>`<article class="course01-recap-card"><small>CASE ${String(i+1).padStart(2,'0')}</small><strong>${item[0]}</strong><div class="course01-recap-rows"><div class="course01-recap-row"><b>${labels[0]}</b><span>${item[1]}</span></div><div class="course01-recap-row"><b>${labels[1]}</b><span>${item[2]}</span></div><div class="course01-recap-row"><b>${labels[2]}</b><span>${item[3]}</span></div></div></article>`).join('')+`<div class="course01-recap-footer">${zh()?'同样是 AI × Chemistry，真正决定方法的不是“哪个模型更高级”，而是问题、数据、表示和科研流程需要什么。':'Across AI × Chemistry, the method is determined by the question, data, representation, and workflow—not by which model sounds more advanced.'}</div>`;
  }

  function applyResearchRecap(){
    const s=$('#research');if(!s)return;
    s.classList.add('course01-recap-screen');
    const h2=$('h2',s),lead=$('.lead',s);
    set(h2,'六个案例，回头看它们用了什么能力？','Six cases: what capabilities did they actually use?');
    set(lead,'刚才六页看起来很不同。退一步只看三件事：输入是什么、用了什么模型或工具能力、最后输出什么。','The six cases look very different. Step back and ask three things: what went in, what capability was used, and what came out.');
    let kicker=$('.course01-recap-kicker',s);
    if(!kicker&&h2){kicker=document.createElement('div');kicker.className='course01-recap-kicker';h2.insertAdjacentElement('beforebegin',kicker)}
    set(kicker,'CASE REVIEW · ONE STEP BACK','CASE REVIEW · ONE STEP BACK');

    $('#verified-research-gallery',s)?.remove();
    let root=$('.course01-case-recap',s);
    if(!root){
      root=document.createElement('div');
      root.className='course01-case-recap';
      const grid=$('#research-grid',s);
      grid?.insertAdjacentElement('beforebegin',root) || s.appendChild(root);
    }
    const html=researchCardsHTML();
    if(root.innerHTML!==html)root.innerHTML=html;
  }

  function applyAgentBridge(){
    const s=$('#now');if(!s)return;
    let note=$('.course01-agent-bridge',s);
    if(!note){
      note=document.createElement('div');
      note.className='course01-agent-bridge';
      const anchor=$('.now-grid',s)||s.querySelector('.story-copy')||s.querySelector('h2');
      anchor?.insertAdjacentElement(anchor.classList?.contains('now-grid')?'beforebegin':'afterend',note);
    }
    set(note,
      '刚才最后一个案例已经不再是“一个模型做一次预测”：它把专业模型、实验和工具串起来。把这种模式抽象出来，就是 Agent。',
      'The last case was no longer “one model, one prediction”: it connected specialist models, experiments, and tools. That pattern is the idea behind an agent.'
    );
  }

  function closeoutFlowHTML(){
    const nodes=zh()?[
      ['01','对象与数据','先问研究对象是什么、证据从哪里来'],
      ['02','表示','决定哪些信息真正交给模型'],
      ['03','模型与工具','能力要和任务、数据匹配'],
      ['04','证据与决策','输出最后要回到验证和科研判断']
    ]:[
      ['01','Object & data','Ask what the scientific object is and where evidence comes from'],
      ['02','Representation','Choose what information the model actually receives'],
      ['03','Models & tools','Match capabilities to the task and data'],
      ['04','Evidence & decision','Return outputs to validation and scientific judgment']
    ];
    return nodes.map(n=>`<div class="course01-closeout-node"><small>${n[0]}</small><strong>${n[1]}</strong><span>${n[2]}</span></div>`).join('');
  }

  function applyReviewCloseout(){
    const s=$('#review-shelf-screen');if(!s)return;
    s.classList.add('course01-closeout-screen');
    const copy=$('.story-copy',s),h2=$('h2',s);
    set(h2,'第一堂课到这里，先把主线收回来','Course 01 ends here: bring the main thread back together');
    $('.lead',copy)?.remove();
    let kicker=$('.story-kicker',copy);
    if(!kicker&&h2){kicker=document.createElement('div');kicker.className='story-kicker';h2.insertAdjacentElement('beforebegin',kicker)}
    set(kicker,'COURSE 01 · CLOSEOUT','COURSE 01 · CLOSEOUT');

    let flow=$('.course01-closeout-flow',s);
    if(!flow){flow=document.createElement('div');flow.className='course01-closeout-flow';copy?.insertAdjacentElement('afterend',flow)}
    const flowHTML=closeoutFlowHTML();if(flow.innerHTML!==flowHTML)flow.innerHTML=flowHTML;

    let transition=$('.course01-next-course',s);
    if(!transition){transition=document.createElement('div');transition.className='course01-next-course';flow.insertAdjacentElement('afterend',transition)}
    set(transition,
      '下一堂课不再继续扩展“模型种类”，而是拆开同一件事：预测怎样产生、Loss 怎样推动更新、结果怎样被独立数据检验。',
      'Course 02 stops adding model families and opens the training process itself: how predictions are made, how loss drives updates, and how independent data test the result.'
    );

    let label=$('.course01-review-label',s);
    const shelf=$('.review-shelf',s);
    if(!label&&shelf){label=document.createElement('div');label.className='course01-review-label';shelf.insertAdjacentElement('beforebegin',label)}
    set(label,'课后想继续读','READ FURTHER AFTER CLASS');
    $('.course-bridge',s)?.remove();
  }

  function apply(){
    applyNumbers();
    applyConceptBridges();
    applyResearchRecap();
    applyAgentBridge();
    applyReviewCloseout();
  }

  apply();

  const research=$('#research');
  if(research&&'MutationObserver'in window){
    new MutationObserver(()=>requestAnimationFrame(applyResearchRecap)).observe(research,{childList:true,subtree:true,characterData:true});
  }
  const main=$('main');
  if(main&&'MutationObserver'in window){
    const mainObserver=new MutationObserver(()=>requestAnimationFrame(()=>{applyNumbers();applyConceptBridges();applyResearchRecap();applyAgentBridge();applyReviewCloseout();attachReviewObserver()}));
    mainObserver.observe(main,{childList:true});
  }
  let reviewObserved=false;
  function attachReviewObserver(){
    if(reviewObserved||!('MutationObserver'in window))return;
    const s=$('#review-shelf-screen');if(!s)return;
    reviewObserved=true;
    new MutationObserver(()=>requestAnimationFrame(applyReviewCloseout)).observe(s,{childList:true,subtree:true});
  }
  attachReviewObserver();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
