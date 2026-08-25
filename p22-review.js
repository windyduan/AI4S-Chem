(function installP22Review(){
  const research=document.getElementById('research');
  if(!research)return;
  const zh=()=>document.documentElement.lang!=='en';

  const projects=[
    {
      methodZh:'SE(3) Transformer 对三维原子局域环境建模；先预训练，再针对具体 NMR 数据集微调。',
      methodEn:'An SE(3) Transformer models 3D local atomic environments, followed by pretraining and dataset-specific fine-tuning.',
      problemZh:'统一预测液态与固态体系的原子级 NMR 化学位移，并建立跨不同化学体系可比较的结构—谱学评测。',
      problemEn:'Predict atom-level NMR chemical shifts across liquid- and solid-state systems and support comparable structure–spectrum evaluation across diverse chemical systems.',
      flowZh:['三维原子环境','SE(3) Transformer','预训练 → 微调','化学位移 δ'],
      flowEn:['3D atomic environment','SE(3) Transformer','pretrain → fine-tune','chemical shift δ']
    },
    {
      methodZh:'DeepPot-SE 机器学习势 + 并发学习（训练 → 探索 → 筛选 → DFT 标注），得到面向电解液的 uMLP，并驱动 MLMD。',
      methodEn:'DeepPot-SE machine-learning potentials with concurrent learning (train → explore → screen → DFT label) build an electrolyte-oriented uMLP that drives MLMD.',
      problemZh:'在更广的电解液化学空间中进行长时间尺度原子模拟，并从轨迹计算密度、溶剂化结构、黏度和离子电导率等关键性质。',
      problemEn:'Run long-timescale atomistic simulations across broader electrolyte chemical space and compute density, solvation structure, viscosity, ionic conductivity, and related properties from trajectories.',
      flowZh:['电解液化学空间','并发学习 + DFT','DeepPot-SE / uMLP','MLMD → 关键性质'],
      flowEn:['electrolyte chemical space','concurrent learning + DFT','DeepPot-SE / uMLP','MLMD → properties']
    },
    {
      methodZh:'LLM 辅助文献抽取 → Cat-KG → 知识图谱查询 + 催化专家规则 → LLM 整理可读结果。',
      methodEn:'LLM-assisted literature extraction → Cat-KG → graph queries plus catalysis-informed rules → LLM rendering of readable results.',
      problemZh:'从大量催化文献中快速找到、筛选和排序多步接力催化路线，同时保留反应条件与原始文献来源的可追溯性。',
      problemEn:'Rapidly find, filter, and rank multistep relay-catalysis pathways from large literature collections while keeping reaction conditions and original sources traceable.',
      flowZh:['催化文献','LLM 信息抽取','Cat-KG + 专家规则','可追溯路径'],
      flowEn:['catalysis literature','LLM extraction','Cat-KG + expert rules','traceable pathway']
    },
    {
      methodZh:'三模态正交对比学习，对分子结构、嗅觉受体序列和自然语言气味描述分别编码并对齐。',
      methodEn:'Tri-modal orthogonal contrastive learning separately encodes and aligns molecular structures, olfactory-receptor sequences, and natural-language odor descriptions.',
      problemZh:'把化学结构—生物受体—人类气味语义放到同一个表示空间，支持嗅觉感知预测、跨模态检索和零样本泛化。',
      problemEn:'Place chemical structure, biological receptors, and human odor semantics in one representation space for olfactory prediction, cross-modal retrieval, and zero-shot generalization.',
      flowZh:['分子结构','受体序列','气味语言','三模态对齐表示'],
      flowEn:['molecular structure','receptor sequence','odor language','aligned tri-modal space']
    },
    {
      methodZh:'XASLip 跨模态对齐 + 检索增强光谱生成 + Permutation-Rectified Flow Matching 条件三维生成。',
      methodEn:'XASLip cross-modal alignment plus retrieval-augmented spectrum generation and Permutation-Rectified Flow Matching for conditional 3D generation.',
      problemZh:'在一个框架中同时处理“局域三维结构 → XAS 光谱”和“XAS 光谱 → 局域三维结构”两个方向的建模。',
      problemEn:'Handle both local-3D-structure → XAS-spectrum and XAS-spectrum → local-3D-structure modeling within one framework.',
      flowZh:['XAS 光谱','XASLip 跨模态对齐','共享表示空间','光谱 ↔ 三维结构'],
      flowEn:['XAS spectrum','XASLip alignment','shared representation space','spectrum ↔ 3D structure']
    },
    {
      methodZh:'机器学习势、吸附与扩散预测、分子设计、CVS 响应预测等电镀垂域模型 + 智能体工作流编排。',
      methodEn:'Electroplating specialist models for machine-learning potentials, adsorption and diffusion prediction, molecular design, and CVS response, connected through agent workflow orchestration.',
      problemZh:'对先进封装电子电镀添加剂和配方进行高通量预测、筛选、实验验证与迭代优化，减少传统研发对经验试错的依赖。',
      problemEn:'Support high-throughput prediction, screening, experimental validation, and iterative optimization of advanced-packaging electroplating additives and formulations.',
      flowZh:['数据 / 模拟','电镀垂域模型','智能体编排','筛选 → 实验 → 迭代'],
      flowEn:['data / simulation','specialist models','agent orchestration','screen → experiment → iterate']
    }
  ];

  const linkZh={
    'Paper':'论文','ACL Paper':'ACL 论文','Dataset':'数据集','APP':'应用','Dataset / model':'数据集 / 模型',
    'Group research page':'课题组研究页','Shanghai AI Lab':'上海 AI Lab'
  };

  function activeIndex(){
    const btn=research.querySelector('.research-index-btn.active');
    const i=Number(btn?.dataset.i||0);
    return Number.isFinite(i)?i:0;
  }

  function localizeLinks(){
    research.querySelectorAll('.research-links a').forEach(a=>{
      if(!a.dataset.p22Original)a.dataset.p22Original=a.textContent.replace('↗','').trim();
      const original=a.dataset.p22Original;
      if(zh()){
        let label=linkZh[original]||original;
        if(label==='GitHub'||label==='arXiv'||label==='AI4EC 解读'||label==='Chem-Brain'||label==='OP-Elyte APP'||label==='BatElyte DB'||label==='ai²-kit'){}
        a.textContent=label+' ↗';
      }else{
        a.textContent=original+' ↗';
      }
    });
  }

  function renderDetail(){
    const detail=research.querySelector('.research-detail');
    if(!detail)return;
    const item=projects[activeIndex()]||projects[0];

    detail.querySelector('.research-summary')?.remove();
    detail.querySelector('.research-meaning')?.remove();
    detail.querySelector('.research-evidence-note')?.remove();

    const question=detail.querySelector('.research-question');
    if(question){
      question.classList.add('p22-question');
      question.innerHTML=zh()
        ? `<div><strong>AI 方法</strong><span>${item.methodZh}</span></div><div><strong>科学问题</strong><span>${item.problemZh}</span></div>`
        : `<div><strong>AI method</strong><span>${item.methodEn}</span></div><div><strong>Scientific problem</strong><span>${item.problemEn}</span></div>`;
    }

    const nodes=[...detail.querySelectorAll('.research-flow-node')];
    const labels=zh()?item.flowZh:item.flowEn;
    nodes.forEach((node,i)=>{if(labels[i]&&node.textContent!==labels[i])node.textContent=labels[i]});
    localizeLinks();
  }

  function bindIndex(){
    research.querySelectorAll('.research-index-btn').forEach(btn=>{
      if(btn.dataset.p22Bound==='1')return;
      btn.dataset.p22Bound='1';
      btn.addEventListener('click',()=>setTimeout(renderDetail,0));
    });
  }

  function apply(){
    const now=document.getElementById('now');
    if(now&&research.nextElementSibling!==now)now.insertAdjacentElement('beforebegin',research);

    const researchNo=research.querySelector('.section-no');
    const nowNo=now?.querySelector('.section-no');
    if(researchNo)researchNo.textContent='01R / RESEARCH';
    if(nowNo)nowNo.textContent='01S / NOW';

    const title=research.querySelector('h2');
    if(title)title.textContent=zh()?'我们组如何用 AI 解决化学问题':'How our group uses AI to solve chemistry problems';
    research.querySelector('.lead')?.remove();

    bindIndex();
    renderDetail();
    window.dispatchEvent(new Event('resize'));
  }

  apply();
  [120,420,900,1600,2800,4200].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,120));
})();
