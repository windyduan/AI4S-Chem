(function installCaseLayoutMainFix(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';

  function ensureStyle(){
    if(document.querySelector('link[data-case-layout-main-fix]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='case-layout-main-fix.css?v=20260826b';
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

  const linkZh={
    'Paper':'原文',
    'ACL Paper':'原文',
    'arXiv':'原文',
    'AI4EC 解读':'中文解读',
    'GitHub':'代码',
    'Dataset':'数据',
    'Dataset / model':'数据 / 模型',
    'Shanghai AI Lab':'官方介绍',
    'Group research page':'课题组页面'
  };
  function localizeLinks(){
    $$('.case-section .case-links a').forEach(a=>{
      if(!a.dataset.caseLinkOriginal)a.dataset.caseLinkOriginal=a.textContent.replace(/\s*↗\s*$/,'').trim();
      const original=a.dataset.caseLinkOriginal;
      const label=zh()?(linkZh[original]||original):original;
      a.textContent=`${label} ↗`;
    });
  }

  const noseCopyZh=[
    '科学问题：气味感知不是单一的结构分类问题。分子结构、嗅觉受体响应和人类气味语言属于同一条感知链，但过去常被分开建模。',
    '关键思路：以分子表示作为中心枢纽，分别接入受体序列信息和气味语义信息，从稀缺三元组问题转为可利用的两类双模态数据。',
    '方法重点：受体信息与语义信息通过正交约束进入不同方向，尽量避免互相覆盖；同时用弱正样本缓解气味描述稀疏带来的错误负样本。',
    '最终能力：得到更统一的嗅觉表示，用于感知预测、跨模态检索和零样本泛化。课堂不展开具体 encoder 与 loss 推导。'
  ];
  const noseCopyEn=[
    'Scientific question: olfaction is not a structure-only classification problem. Molecular structure, receptor response and human odor language belong to one perceptual chain but have often been modeled separately.',
    'Key idea: use the molecular representation as the hub and connect receptor-sequence information and odor semantics through two available bimodal data sources rather than relying on scarce full triplets.',
    'Method focus: orthogonal constraints keep receptor and semantic contributions from overwriting each other, while weak positives reduce false negatives caused by sparse odor-language annotations.',
    'Resulting capability: a more unified olfactory representation for perception prediction, cross-modal retrieval and zero-shot generalization. The course does not derive the detailed encoders or losses.'
  ];
  const noseLabelsZh=['科学问题','分子作为枢纽','正交对齐','得到的能力'];
  const noseLabelsEn=['scientific question','molecule as hub','orthogonal alignment','what it enables'];

  function noseMarkup(){
    return `<div class="nose-paper-map" data-step="0">
      <div class="nose-paper-box nose-problem-box">
        <small><span class="story-zh">科学问题</span><span class="story-en">SCIENTIFIC QUESTION</span></small>
        <strong><span class="story-zh">结构、生物受体与气味语义长期被分开建模</span><span class="story-en">Structure, receptors and odor semantics are often modeled separately</span></strong>
        <p><span class="story-zh">NOSE 关注的是完整嗅觉链，而不是只把“floral / fruity”当作互相独立的分类标签。</span><span class="story-en">NOSE targets the olfactory pathway rather than treating odor descriptors as isolated class labels.</span></p>
      </div>
      <div class="nose-hub-row">
        <div class="nose-paper-box nose-receptor-box"><small><span class="story-zh">生物信息</span><span class="story-en">BIOLOGICAL SIGNAL</span></small><strong><span class="story-zh">嗅觉受体序列</span><span class="story-en">Receptor sequence</span></strong><p>ESM-2 → receptor feature</p></div>
        <div class="nose-in-arrow">→</div>
        <div class="nose-paper-box nose-molecule-box"><small><span class="story-zh">中心枢纽</span><span class="story-en">CENTRAL HUB</span></small><strong><span class="story-zh">分子表示</span><span class="story-en">Molecular representation</span></strong><p><span class="story-zh">分子是两类数据共同的交点</span><span class="story-en">the shared intersection of both data sources</span></p></div>
        <div class="nose-in-arrow">←</div>
        <div class="nose-paper-box nose-language-box"><small><span class="story-zh">人类语义</span><span class="story-en">HUMAN SEMANTICS</span></small><strong><span class="story-zh">气味描述</span><span class="story-en">Odor description</span></strong><p>text embedding → semantic feature</p></div>
      </div>
      <div class="nose-paper-box nose-method-box">
        <small><span class="story-zh">怎么解决</span><span class="story-en">HOW IT IS SOLVED</span></small>
        <strong><span class="story-zh">正交注入 + 对比学习</span><span class="story-en">Orthogonal injection + contrastive learning</span></strong>
        <p><span class="story-zh">让受体信息和气味语义作为相互独立的增量进入分子表示；弱正样本进一步校准相近气味词之间的语义关系。</span><span class="story-en">Receptor and semantic information enter as independent increments; weak positives calibrate similarity among related odor words.</span></p>
        <span class="nose-orthogonal-mark"><span class="story-zh">受体信息</span><span class="story-en">receptor</span><b>⊥</b><span class="story-zh">气味语义</span><span class="story-en">odor semantics</span></span>
      </div>
      <div class="nose-result-row">
        <div class="nose-paper-box nose-result-box"><span class="story-zh">感知预测</span><span class="story-en">perception prediction</span></div>
        <div class="nose-paper-box nose-result-box"><span class="story-zh">跨模态检索</span><span class="story-en">cross-modal retrieval</span></div>
        <div class="nose-paper-box nose-result-box"><span class="story-zh">零样本泛化</span><span class="story-en">zero-shot generalization</span></div>
      </div>
    </div>`;
  }

  function upgradeNose(){
    const s=$('#case-nose');
    if(!s)return;
    const old=$('.nose-triad',s);
    if(old&&!s.dataset.nosePaperRedraw){
      const holder=document.createElement('div');
      holder.innerHTML=noseMarkup();
      old.replaceWith(holder.firstElementChild);
      $('.nose-task-row',s)?.remove();
      s.dataset.nosePaperRedraw='1';
    }
    if(!s.dataset.noseGuideBound){
      const buttons=$$('.case-step-button',s);
      buttons.forEach((b,i)=>b.addEventListener('click',()=>setNoseStep(s,i)));
      s.dataset.noseGuideBound='1';
    }
    const q=$('.case-question',s);
    if(q)q.innerHTML='<span class="story-zh">科学问题：气味感知同时涉及分子结构、嗅觉受体和人类语言，但已有方法常只建模其中一段，难以得到兼具生物依据与语义解释的统一表示。</span><span class="story-en">Scientific question: olfaction links molecular structure, olfactory receptors and human language, but existing methods often model only fragments of this pathway.</span>';
    const note=$('.case-note',s);
    if(note)note.innerHTML='<span class="story-zh">课堂只保留科学问题、关键解决思路和能做什么；具体 encoder、损失函数与 benchmark 请回到 ACL 原文和代码。</span><span class="story-en">The course keeps the scientific question, core solution and resulting capabilities; see the ACL paper and code for encoder, loss and benchmark details.</span>';
    const active=Math.max(0,$$('.case-step-button',s).findIndex(b=>b.classList.contains('active')));
    setNoseStep(s,active);
  }

  function setNoseStep(s,step){
    const map=$('.nose-paper-map',s);if(map)map.dataset.step=String(step);
    const labels=zh()?noseLabelsZh:noseLabelsEn;
    $$('.case-step-button',s).forEach((b,i)=>{
      const strong=$('strong',b);if(strong)strong.textContent=labels[i]||labels[labels.length-1];
    });
    const take=$('.case-takeaway',s);if(take)take.textContent=(zh()?noseCopyZh:noseCopyEn)[step]||'';
  }

  function apply(){
    ensureStyle();
    localizeBoxes();
    localizeLinks();
    upgradeNose();
  }

  apply();
  [250,700,1350,2300,3400,5000].forEach(ms=>setTimeout(apply,ms));
  $('#lang-toggle')?.addEventListener('click',()=>setTimeout(apply,250));
})();
