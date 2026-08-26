(function installCaseLayoutMainFix(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';

  function ensureStyle(){
    if(document.querySelector('link[data-case-layout-main-fix]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='case-layout-main-fix.css?v=20260826a';
    link.dataset.caseLayoutMainFix='true';
    document.head.appendChild(link);
  }

  const zhMap={
    '3D atomic environment':'3D 原子环境',
    'pretrain → fine-tune':'预训练 → 微调',
    'chemical shift δ':'化学位移 δ',
    'GEOMETRY':'几何',
    'local environment':'局域环境',
    'TRANSFER':'迁移学习',
    'PREDICTED SHIFT':'预测位移',

    'random electrolyte compositions':'电解液配方空间',
    'concurrent learning + DFT':'并发学习 + DFT',
    'structure & properties':'结构与性质',
    'Train':'训练',
    'Explore':'探索',
    'Screen':'筛选',
    'Label / DFT':'标注 / DFT',
    'trajectory':'轨迹',
    'density':'密度',
    'solvation':'溶剂化',
    'viscosity':'黏度',
    'conductivity':'电导率',
    'SOLVENT DATABASE':'溶剂数据库',
    'SALTS':'盐类',
    'CONCURRENT-LEARNING ITERATIONS':'并发学习轮次',
    'CONFIGURATIONS':'构型数',

    'Literature':'文献',
    'LLM extraction':'LLM 抽取',
    'Query + rules':'查询 + 规则',
    'Readable output':'可读输出',
    'source IDs':'来源 ID',
    'candidate path':'候选路径',
    'chemistry score':'化学规则评分',

    'Molecule':'分子',
    'structure':'结构',
    'Receptor':'受体',
    'sequence':'序列',
    'Odor language':'气味语言',
    'text description':'文本描述',
    'perception':'感知预测',
    'cross-modal retrieval':'跨模态检索',
    'zero-shot':'零样本',

    'XAS spectrum':'XAS 光谱',
    'shared latent space':'共享潜空间',
    'cross-modal alignment':'跨模态对齐',
    'retrieval':'检索',
    'spectrum prediction':'光谱预测',
    'conditional 3D generation':'条件 3D 生成',
    'local 3D structure':'局域 3D 结构',

    'adsorption':'吸附',
    'diffusion':'扩散',
    'molecular design':'分子设计',
    'CVS response':'CVS 响应',
    'formulation R&D agent':'配方研发智能体',
    'Goal':'目标',
    'Predict':'预测',
    'Experiment':'实验',
    'Update':'更新',
    'specialist models':'专业模型',
    'tools':'工具',
    'agent':'智能体',
    'experiment':'实验',
    'human validation':'人工验证'
  };

  const selectors=[
    '.case-flow-node strong',
    '.nmr-model-card small','.nmr-model-card strong','.nmr-output small',
    '.concurrent-step','.mlmd-strip strong','.mlmd-strip span','.elyte-output','.case-fact small',
    '.catkg-step strong','.kg-path span',
    '.nose-modal strong','.nose-modal span','.nose-task',
    '.xas-modality strong','.xas-latent strong','.xas-latent span','.xas-task',
    '.ep-specialist strong','.ep-orchestrator strong','.ep-loop span','.case-capability-strip span'
  ].join(',');

  function localizeBoxes(){
    $$('.case-section').forEach(section=>{
      $$(selectors,section).forEach(el=>{
        if(!el.dataset.caseFixOriginal)el.dataset.caseFixOriginal=el.textContent.trim();
        const original=el.dataset.caseFixOriginal;
        const next=zh()?(zhMap[original]||original):original;
        if(el.textContent.trim()!==next)el.textContent=next;
      });
    });
  }

  function apply(){
    ensureStyle();
    localizeBoxes();
  }

  apply();
  [250,700,1350,2300,3400,4900].forEach(ms=>setTimeout(apply,ms));
  $('#lang-toggle')?.addEventListener('click',()=>setTimeout(apply,250));
})();
