(function installCourseCases(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const bi=(cn,en)=>`<span class="story-zh">${cn}</span><span class="story-en">${en}</span>`;

  if(!document.querySelector('link[data-course-cases]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='css/course/cases/cases.css?v=20260826b';link.dataset.courseCases='1';document.head.appendChild(link);
  }

  function movePresentNav(){
    const nav=$('.story-present-nav'),anchor=$('#chapter-trigger')||$('#course-info-button');
    if(nav&&anchor&&nav.previousElementSibling!==anchor)anchor.insertAdjacentElement('afterend',nav);
  }

  const cfg={
    'case-nmrnet':{
      no:'01K / CASE',k:['NMRNet · 3D NMR','NMRNET · 3D NMR'],
      t:['局域 3D 结构，能预测 NMR 化学位移吗？','Can local 3D structure predict NMR chemical shifts?'],
      l:['局域环境一变，化学位移也会变。这里看三维几何怎样直接进入原子级谱学预测。','Local environments change chemical shifts. Here 3D geometry enters atom-level spectroscopy prediction directly.'],
      labels:[['局域环境','Local environment'],['SE(3) 模型','SE(3) model'],['预训练与微调','Pretrain + fine-tune'],['化学位移','Chemical shift']],
      copy:[
        ['目标原子周围的键、距离和空间排布共同决定它看到的局域化学环境。','Bonds, distances and spatial arrangement around the target atom define its local chemical environment.'],
        ['模型直接读取三维原子环境，并用更适合旋转与平移的方式处理几何关系。','The model reads the 3D atomic environment and handles rotations and translations in a geometry-aware way.'],
        ['先学习更通用的结构规律，再针对具体 NMR 数据集微调，不必每个任务都从零开始。','Learn broader structural patterns first, then fine-tune to a specific NMR dataset instead of starting from scratch.'],
        ['最后输出原子级 chemical shift；这是“3D representation 进入实验表征”的一个直观例子。','The output is an atom-level chemical shift: a direct example of 3D representation entering experimental characterization.']
      ]
    },
    'case-elyte':{
      no:'01L / CASE',k:['uMLP · 电解液模拟','uMLP · ELECTROLYTE SIMULATION'],
      t:['电解液模拟，怎样兼顾精度和规模？','How can electrolyte simulation balance fidelity and scale?'],
      l:['不是直接猜电导率，而是先学一个原子势能面，再用它驱动更大尺度的分子动力学。','Instead of guessing conductivity directly, learn an atomistic potential and use it to drive larger-scale molecular dynamics.'],
      labels:[['配方空间','Composition space'],['按需 DFT','Selective DFT'],['并发学习','Concurrent learning'],['MLMD 与性质','MLMD + properties']],
      copy:[
        ['论文从 2300+ 种溶剂候选和 20 种盐出发，随机组合大量不同组成与浓度的电解液体系。','The paper starts from 2300+ solvent candidates and 20 salts, generating many randomized electrolyte compositions and concentrations.'],
        ['昂贵的 DFT 不需要覆盖所有组合；优先标注模型最不确定的构型，把计算花在最有信息量的地方。','Expensive DFT does not need to cover every formulation; label the configurations where the model is most uncertain.'],
        ['训练、探索、模型分歧筛选、DFT 标注不断循环；论文报告 91 轮并发学习与约 16 万个构型。','Training, exploration, disagreement screening and DFT labeling repeat; the paper reports 91 iterations and about 160k configurations.'],
        ['训练好的 uMLP 驱动 MLMD，再从轨迹计算密度、溶剂化、黏度和离子电导率等性质。','The trained uMLP drives MLMD, from which density, solvation, viscosity and ionic conductivity can be computed.']
      ]
    },
    'case-catkg':{
      no:'01M / CASE',k:['Cat-KG · 催化知识','CAT-KG · CATALYSIS KNOWLEDGE'],
      t:['催化文献太多，怎样找到可行路线？','How can feasible routes be found across too much catalysis literature?'],
      l:['先把文献变成结构化知识，再做图查询和化学规则筛选；语言模型最后只负责把结果说清楚。','Turn literature into structured knowledge first, then query and filter with chemistry rules; the language model renders the result at the end.'],
      labels:[['文献','Literature'],['Cat-KG','Cat-KG'],['路线搜索','Route search'],['回到原文','Trace to source']],
      copy:[
        ['接力催化路线设计依赖大量文献阅读和经验判断；真正困难的是知识太多、组合也太多。','Relay-catalysis design depends on extensive literature reading and expert judgment; the difficulty is too much knowledge and too many combinations.'],
        ['LLM 辅助抽取全文信息，再经过清洗和实体消歧写入知识图谱；论文覆盖 15,881 篇文献与 27,760 个热催化反应。','LLM-assisted extraction is cleaned and disambiguated before entering the knowledge graph; the paper covers 15,881 publications and 27,760 thermocatalytic reactions.'],
        ['给定目标后，图查询先找候选路径，再用接力催化专家规则过滤和排序。','Given a target, graph queries find candidate paths and relay-catalysis expert rules filter and rank them.'],
        ['推荐结果保留 reaction / source ID，可以沿 Cat-KG 回到原始文献，而不是只相信一段生成文本。','Reaction and source IDs remain traceable through Cat-KG to the original papers rather than relying on generated prose alone.']
      ]
    },
    'case-nose':{
      no:'01N / CASE',k:['NOSE · 嗅觉多模态','NOSE · OLFACTORY MULTIMODAL'],
      t:['气味怎样连接分子、受体和语言？','How can odor connect molecules, receptors and language?'],
      l:['气味跨过化学结构、生物受体和人类描述。完整三元数据很少，所以要学会把分散的信息对齐起来。','Odor spans molecular structure, biological receptors and human descriptions. Complete triplets are scarce, so separate information sources must be aligned.'],
      labels:[['分子','Molecule'],['受体','Receptor'],['气味语义','Odor language'],['统一表示','Unified embedding']],
      copy:[
        ['分子是两类常见双模态数据的共同交点：分子—受体、分子—气味描述。','The molecule is the shared intersection of two more available bimodal datasets: molecule–receptor and molecule–odor description.'],
        ['受体序列提供生物层面的信息，它和“闻起来像什么”并不是同一种信号。','Receptor sequences provide biological information that is distinct from semantic odor descriptions.'],
        ['气味语言很稀疏，同一种感知还可能有多个近义词；模型需要避免把相近描述误当成完全无关。','Odor language is sparse and often synonymous; the model must avoid treating related descriptions as completely unrelated.'],
        ['对齐后的表示可以支持感知预测、跨模态检索和 zero-shot 等任务。','The aligned representation supports perception prediction, cross-modal retrieval and zero-shot tasks.']
      ]
    },
    'case-unixas':{
      no:'01O / CASE',k:['Uni-XAS · 光谱与结构','UNI-XAS · SPECTRUM & STRUCTURE'],
      t:['XAS 光谱，能反推局域 3D 结构吗？','Can an XAS spectrum recover local 3D structure?'],
      l:['实验看到的是一维谱线，真正想理解的是三维原子环境。这里把两种完全不同的数据放到同一个空间里。','The experiment gives a 1D spectrum while the scientific target is a 3D atomic environment. The two modalities are aligned in one space.'],
      labels:[['XAS 光谱','XAS spectrum'],['3D 结构','3D structure'],['共享空间','Shared space'],['双向任务','Both directions']],
      copy:[
        ['XAS 间接编码局域结构，但一条谱线并不会自动告诉我们唯一的三维答案。','XAS encodes local structure indirectly, but one spectrum does not automatically reveal a unique 3D answer.'],
        ['另一端是局域三维原子环境；两边的数据形态完全不同。','The other modality is local 3D atomic geometry, a fundamentally different data form.'],
        ['把光谱和结构映射到共享表示空间后，“这条谱更像哪个结构”就变成可计算的问题。','Mapping spectra and structures into a shared representation makes “which structure matches this spectrum?” computable.'],
        ['同一框架可以做检索、光谱预测，也可以以光谱为条件生成局域 3D 结构。','The same framework supports retrieval, spectrum prediction and spectrum-conditioned local 3D generation.']
      ]
    },
    'case-electroplating':{
      no:'01P / CASE',k:['Agent · 配方研发','AGENT · FORMULATION R&D'],
      t:['多个模型和实验，怎样串成研发流程？','How can models and experiments become one R&D workflow?'],
      l:['吸附、扩散、分子设计、CVS 响应和实验各有自己的工具。这里看的是“怎么协同”，不是让一个模型包办全部化学。','Adsorption, diffusion, molecular design, CVS response and experiments each need their own tools. The point is coordination, not one model doing all chemistry.'],
      labels:[['专业模型','Specialists'],['工作流','Workflow'],['候选与实验','Candidates + experiment'],['下一轮','Next round']],
      copy:[
        ['不同环节由不同专业模型负责：吸附、扩散、分子设计、实验响应并不是同一个任务。','Different specialist models handle adsorption, diffusion, molecular design and experimental response; they are not one task.'],
        ['Agent 更像流程组织者：理解目标、选择工具、安排调用顺序，再把中间结果接起来。','The agent acts as a workflow coordinator: interpret the goal, choose tools, order calls and connect intermediate results.'],
        ['候选经过预测与筛选以后进入实验，实验仍然是关键证据来源。','Candidates move through prediction and screening into experiments, which remain a key source of evidence.'],
        ['实验结果再回到数据和模型，下一轮从新的证据继续，而不是一次对话就结束。','Experimental results return to the data and models, so the next round starts from new evidence rather than ending after one conversation.']
      ]
    }
  };

  function elyteMarkup(){return `<div class="elyte-story-map" data-step="0">
    <div class="elyte-story-block elyte-story-problem"><strong>${bi('溶剂 × 盐 × 浓度 × 混合比例','solvent × salt × concentration × mixing ratio')}</strong><p>${bi('组合迅速膨胀，高精度计算不可能逐个覆盖。','The composition space grows rapidly; exhaustive high-fidelity calculations are impractical.')}</p></div>
    <div class="elyte-compose-row"><div class="elyte-story-node solvents"><small>${bi('溶剂库','SOLVENT LIBRARY')}</small><strong>&gt;2300</strong><span>carbonate · ether · nitrile · heterocycle · sulfone …</span></div><div class="elyte-symbol">+</div><div class="elyte-story-node salts"><small>${bi('盐库','SALT LIBRARY')}</small><strong>20</strong><span>LiPF₆ · LiFSI · LiTFSI · LiBF₄ …</span></div><div class="elyte-symbol">→</div><div class="elyte-story-node generator"><small>${bi('随机组合','RANDOMIZED SYSTEMS')}</small><strong>≈ 1,000,000</strong><span>${bi('从大空间取样','sample the composition space')}</span></div></div>
    <div class="elyte-learning-wrap"><div class="elyte-learning-loop"><span>${bi('训练','Train')}</span><span>${bi('探索','Explore')}</span><span>${bi('分歧筛选','Screen')}</span><span>${bi('DFT 标注','DFT label')}</span></div><div class="elyte-dft-note"><strong>${bi('DFT 用在模型最拿不准的地方','DFT where uncertainty is highest')}</strong><span>${bi('新数据再回到下一轮训练。','New labels return to training.')}</span></div></div>
    <div class="elyte-result-row"><div class="elyte-story-node"><small>MODEL</small><strong>uMLP</strong></div><div class="elyte-symbol">→</div><div class="elyte-story-node sim"><small>SIMULATION</small><strong>MLMD</strong></div><div class="elyte-symbol">→</div><div class="elyte-properties"><span>${bi('密度','density')}</span><span>${bi('溶剂化','solvation')}</span><span>${bi('黏度','viscosity')}</span><span>${bi('电导率','conductivity')}</span></div></div>
    <div class="elyte-paper-facts"><span>91 ${bi('轮','iterations')}</span><span>≈160k ${bi('构型','configurations')}</span></div>
  </div>`}

  function catMarkup(){return `<div class="cat-story-map" data-step="0">
    <div class="cat-story-problem"><strong>${bi('15,881 篇文献里的知识，先变成可查询的数据','Turn knowledge from 15,881 papers into queryable data')}</strong><p>${bi('把“读文献”和“找路线”拆成两个阶段。','Separate literature processing from route search.')}</p></div>
    <div class="cat-phase build"><div class="cat-phase-head"><b>A</b><strong>${bi('文献 → Cat-KG','Literature → Cat-KG')}</strong></div><div class="cat-phase-flow"><div class="cat-phase-node"><small>INPUT</small><strong>${bi('全文文献','full text')}</strong></div><div class="cat-phase-node"><small>LLM</small><strong>${bi('抽取反应与条件','extract reactions + conditions')}</strong></div><div class="cat-phase-node"><small>CLEAN</small><strong>${bi('清洗与实体消歧','clean + disambiguate')}</strong></div><div class="cat-phase-node"><small>KG</small><strong>27,760 reactions</strong></div></div></div>
    <div class="cat-phase route"><div class="cat-phase-head"><b>B</b><strong>${bi('目标 → 候选路线','Target → candidate routes')}</strong></div><div class="cat-phase-flow"><div class="cat-phase-node"><small>GOAL</small><strong>${bi('目标与约束','target + constraints')}</strong></div><div class="cat-phase-node"><small>QUERY</small><strong>${bi('图查询','graph query')}</strong></div><div class="cat-phase-node"><small>RULES</small><strong>${bi('专家规则筛选','expert-rule filtering')}</strong></div><div class="cat-phase-node"><small>OUTPUT</small><strong>${bi('可读路线','readable route')}</strong></div></div></div>
    <div class="cat-trace"><strong>${bi('推荐结果','recommendation')}</strong><span>→ reaction ID → Cat-KG → ${bi('原始文献','original paper')}</span></div>
  </div>`}

  function noseMarkup(){return `<div class="nose-paper-map" data-step="0">
    <div class="nose-hub-row"><div class="nose-paper-box nose-receptor-box"><strong>${bi('嗅觉受体','Olfactory receptor')}</strong><span>${bi('序列信息','sequence')}</span></div><div class="nose-in-arrow">→</div><div class="nose-paper-box nose-molecule-box"><strong>${bi('分子','Molecule')}</strong><span>${bi('共同枢纽','shared hub')}</span></div><div class="nose-in-arrow">←</div><div class="nose-paper-box nose-language-box"><strong>${bi('气味语言','Odor language')}</strong><span>${bi('自然语言描述','text description')}</span></div></div>
    <div class="nose-method-box"><strong>${bi('正交对齐 + 对比学习','orthogonal alignment + contrastive learning')}</strong><span>${bi('让受体信息和语义信息尽量保留各自贡献','keep receptor and semantic contributions distinct')}</span></div>
    <div class="nose-result-row"><span>${bi('感知预测','perception')}</span><span>${bi('跨模态检索','cross-modal retrieval')}</span><span>zero-shot</span></div>
  </div>`}

  function prepareVisual(section,id){
    const stage=$('.case-stage',section);if(!stage)return;
    if(id==='case-elyte'&&!$('.elyte-story-map',stage))stage.innerHTML=elyteMarkup();
    if(id==='case-catkg'&&!$('.cat-story-map',stage))stage.innerHTML=catMarkup();
    if(id==='case-nose'&&!$('.nose-paper-map',stage))stage.innerHTML=noseMarkup();
  }

  function visualStep(section,id,step){
    if(id==='case-nmrnet'){
      $$('.case-flow-node',section).forEach((n,i)=>n.classList.toggle('active',i===step));
      $$('.nmr-model-card',section).forEach((n,i)=>n.classList.toggle('active',(step===1&&i===0)||(step===2&&i===1)));
      const env=$('.nmr-env',section);if(env)env.className='nmr-env '+(step===0?'stage-1':'stage-2');
    }else if(id==='case-elyte'){$('.elyte-story-map',section)?.setAttribute('data-step',step)}
    else if(id==='case-catkg'){$('.cat-story-map',section)?.setAttribute('data-step',step)}
    else if(id==='case-nose'){$('.nose-paper-map',section)?.setAttribute('data-step',step)}
    else if(id==='case-unixas'){
      section.dataset.finalStep=String(step);
      $$('.xas-modality',section).forEach((n,i)=>n.classList.toggle('active',step===0?i===0:step>=1));
      $$('.xas-task',section).forEach((n,i)=>n.classList.toggle('active',step>=2&&i<=Math.min(step-2,2)));
    }else if(id==='case-electroplating'){
      section.dataset.finalStep=String(step);
      $$('.ep-specialist',section).forEach((n,i)=>n.classList.toggle('active',step===0?i===0:step>=1));
      $$('.ep-loop span',section).forEach((n,i)=>n.classList.toggle('active',step>=2&&i<=Math.min(step+1,4)));
    }
  }

  function ownButtons(section,id,c){
    const list=$('.case-step-list',section);if(!list)return;
    if(!list.dataset.finalOwned){
      [...list.children].forEach((old,i)=>{const clone=old.cloneNode(true);clone.dataset.caseStoryBound='1';clone.dataset.i=String(i);list.replaceChild(clone,old)});
      list.dataset.finalOwned='1';
      $$('.case-step-button',list).forEach(b=>b.addEventListener('click',()=>{section.dataset.finalStep=b.dataset.i;renderCase(section,id,c)}));
    }
  }

  function renderCase(section,id,c){
    const step=Math.max(0,Math.min(3,+section.dataset.finalStep||0));
    const kicker=$('.story-kicker',section),title=$('.story-copy h2',section),lead=$('.story-copy .lead',section),no=$('.section-no',section);
    if(no)no.textContent=c.no;if(kicker)kicker.textContent=zh()?c.k[0]:c.k[1];if(title)title.textContent=zh()?c.t[0]:c.t[1];if(lead)lead.textContent=zh()?c.l[0]:c.l[1];
    $('.case-question',section)?.remove();$('.case-visual-title',section)?.remove();$('.case-note',section)?.remove();
    $$('.case-step-button',section).forEach((b,i)=>{b.classList.toggle('active',i===step);const sm=$('small',b),st=$('strong',b);if(sm)sm.textContent=String(i+1).padStart(2,'0');if(st)st.textContent=zh()?c.labels[i][0]:c.labels[i][1]});
    const take=$('.case-takeaway',section);if(take)take.textContent=zh()?c.copy[step][0]:c.copy[step][1];
    visualStep(section,id,step);
  }

  function prepareCase(id,c){
    const section=$('#'+id);if(!section)return;
    section.dataset.caseLayout=id.replace('case-','');
    if(section.dataset.finalStep==null)section.dataset.finalStep='0';
    prepareVisual(section,id);ownButtons(section,id,c);renderCase(section,id,c);
  }

  function fitOne(section){
    if(!section||window.innerWidth<=900){section?.removeAttribute('data-case-fit');return}
    section.dataset.caseFit='normal';
    requestAnimationFrame(()=>{
      if(section.scrollHeight>section.clientHeight+5){section.dataset.caseFit='compact';requestAnimationFrame(()=>{if(section.scrollHeight>section.clientHeight+5)section.dataset.caseFit='scroll'})}
    });
  }

  function apply(){movePresentNav();Object.entries(cfg).forEach(([id,c])=>prepareCase(id,c));$$('.case-section').forEach(fitOne)}
  apply();[180,500,1000,1800,3000,4800].forEach(ms=>setTimeout(apply,ms));
  window.addEventListener('resize',()=>$$('.case-section').forEach(fitOne));
  window.visualViewport?.addEventListener('resize',()=>$$('.case-section').forEach(fitOne));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,110));
})();