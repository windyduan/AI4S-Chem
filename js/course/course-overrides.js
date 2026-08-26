(function installCourseOverrides(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';

  function ensureStyle(){
    if(document.querySelector('link[data-course-overrides]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='css/course/course-overrides.css?v=20260826a';
    link.dataset.courseOverrides='1';
    document.head.appendChild(link);
  }

  const numbering={
    'rep-vs-model':'01E',
    'gnn-story':'01F',
    'symmetry-story':'01G',
    'capability-map-screen':'01H',
    'chemistry':'01I',
    'discovery-story':'01J',
    'case-nmrnet':'01K',
    'case-elyte':'01L',
    'case-catkg':'01M',
    'case-nose':'01N',
    'case-unixas':'01O',
    'case-electroplating':'01P',
    'research':'01Q',
    'now':'01R',
    'review-shelf-screen':'01S'
  };

  function removeDuplicatePage(){
    document.getElementById('chem-task-map-screen')?.remove();
    const overview=document.getElementById('chemistry');
    const loop=document.getElementById('discovery-story');
    if(overview&&loop&&overview.nextElementSibling!==loop)overview.insertAdjacentElement('afterend',loop);
  }

  function applyNumbers(){
    Object.entries(numbering).forEach(([id,code])=>{
      const no=document.querySelector(`#${id} .section-no`);
      if(!no)return;
      const text=no.textContent.trim();
      no.textContent=text.includes('/')?text.replace(/^[^/]+(?=\s*\/)/,code):code;
    });
  }

  function rebuildChemistryOverview(){
    const s=$('#chemistry');if(!s)return;
    const title=$('h2',s);
    if(title)title.textContent=zh()?'从化学问题到科研决策':'From chemistry question to research decision';
    s.querySelector('.concept-grid')?.remove();
    s.querySelector('.compact-pipeline')?.remove();
    let flow=$('.p12-overview-flow',s);
    if(!flow){flow=document.createElement('div');flow.className='p12-overview-flow';s.appendChild(flow)}
    const items=zh()?[
      ['明确目标','要预测、解释还是优化什么'],
      ['准备数据','实验、计算或数据库记录'],
      ['选择表示','保留真正有用的化学信息'],
      ['训练模型','学习输入与目标之间的关系'],
      ['做出决策','筛候选，安排下一步实验或计算']
    ]:[
      ['Define the goal','Predict, explain, or optimize what?'],
      ['Prepare data','Experiments, computation, or databases'],
      ['Choose representation','Expose the useful chemical information'],
      ['Train the model','Learn the mapping from inputs to targets'],
      ['Make a decision','Select candidates and plan the next test']
    ];
    flow.innerHTML=items.map(([t,c],i)=>`${i?'<span class="p12-flow-arrow">→</span>':''}<article class="p12-flow-node"><strong>${t}</strong><p>${c}</p></article>`).join('');
  }

  function polishDiscoveryLoop(){
    const s=$('#discovery-story');if(!s)return;
    const kicker=$('.story-kicker',s),title=$('.story-copy h2',s),lead=$('.story-copy .lead',s),center=$('.discovery-center',s);
    if(kicker)kicker.textContent=zh()?'科研流程 · 循环':'RESEARCH WORKFLOW · LOOP';
    if(title)title.textContent=zh()?'科研流程不是直线，而是一轮接一轮':'Research moves in cycles, not a straight line';
    if(lead)lead.textContent=zh()?'模型给出候选以后，实验或计算会产生新证据；这些证据再回到数据和下一轮选择。':'After a model proposes candidates, experiments or computation create new evidence that returns to the data and the next round of choices.';
    if(center)center.innerHTML=zh()?'科研<br>决策':'Research<br>Decision';
    s.querySelector('.p14-loop-arrows')?.remove();
  }

  function rebuildP29(){
    const s=$('#batch-epoch-screen');if(!s)return;
    const kicker=$('.story-kicker',s),title=$('.story-copy h2',s);
    if(kicker)kicker.textContent='BATCH · UPDATE · EPOCH';
    if(title)title.textContent=zh()?'Batch、Update、Epoch 到底怎么对应？':'How do batch, update, and epoch relate?';
    s.querySelector('.batch-lab')?.setAttribute('hidden','');
    s.querySelector('.p29-story-lab')?.remove();

    let lab=$('.p29-compact',s);
    if(!lab){
      lab=document.createElement('div');
      lab.className='p29-compact story-reveal';
      lab.innerHTML=`
        <div class="p29-rule">
          <strong class="p29-total">350</strong><span class="p29-total-label"></span>
          <b>÷</b><strong class="p29-size">50</strong><span class="p29-size-label"></span>
          <b>=</b><strong class="p29-count">7</strong><span class="p29-count-label"></span>
        </div>
        <div class="p29-progress"></div>
        <div class="p29-summary">
          <div><strong class="p29-line1"></strong><span class="p29-line1-sub"></span></div>
          <div><strong class="p29-line2"></strong><span class="p29-line2-sub"></span></div>
        </div>
        <div class="p29-footer">
          <div class="p29-status"></div>
          <div class="p29-actions"><button type="button" class="story-button primary p29-next"></button><button type="button" class="story-button p29-reset"></button></div>
        </div>`;
      s.appendChild(lab);
      lab.dataset.step='0';
      $('.p29-next',lab).addEventListener('click',()=>{lab.dataset.step=String(Math.min(7,+lab.dataset.step+1));renderP29(lab)});
      $('.p29-reset',lab).addEventListener('click',()=>{lab.dataset.step='0';renderP29(lab)});
    }
    renderP29(lab);
  }

  function renderP29(lab){
    const step=Math.min(7,Math.max(0,+lab.dataset.step||0));
    $('.p29-total-label',lab).textContent=zh()?'个训练样本':'training samples';
    $('.p29-size-label',lab).textContent=zh()?'个 / Batch':'per batch';
    $('.p29-count-label',lab).textContent=zh()?'个 Batch':'batches';
    const progress=$('.p29-progress',lab);
    progress.innerHTML=Array.from({length:7},(_,i)=>`<span class="${i<step?'done':i===step&&step<7?'active':''}"><b>${i+1}</b><small>50</small></span>`).join('');
    $('.p29-line1',lab).textContent=zh()?'1 个 Batch → 1 次参数更新':'1 batch → 1 parameter update';
    $('.p29-line1-sub',lab).textContent=zh()?'一次更新只看当前这一批样本':'one update uses the current batch';
    $('.p29-line2',lab).textContent=zh()?'7 个 Batch 走完 → 约 1 个 Epoch':'7 batches complete → about 1 epoch';
    $('.p29-line2-sub',lab).textContent=zh()?'训练集大致完整遍历一次':'the training set is traversed roughly once';
    $('.p29-status',lab).innerHTML=step===0
      ?(zh()?'<strong>还没开始</strong><span>点击“下一批”，看更新次数怎样累积。</span>':'<strong>Not started</strong><span>Advance one batch and watch updates accumulate.</span>')
      :step<7
        ?(zh()?`<strong>已更新 ${step} / 7 次</strong><span>还没有完成 1 个 Epoch。</span>`:`<strong>${step} / 7 updates</strong><span>The epoch is not complete yet.</span>`)
        :(zh()?'<strong>7 / 7 次更新</strong><span>350 个样本走完一遍 ≈ 1 Epoch。</span>':'<strong>7 / 7 updates</strong><span>One pass through 350 samples ≈ 1 epoch.</span>');
    $('.p29-next',lab).textContent=zh()?'下一批 →':'Next batch →';
    $('.p29-reset',lab).textContent=zh()?'重置':'Reset';
  }

  const caseCopy={
    'case-nmrnet':{
      kicker:['NMRNet · 3D 谱学','NMRNET · 3D SPECTROSCOPY'],
      title:['NMR 化学位移能从局域 3D 结构直接预测吗？','Can local 3D structure predict NMR chemical shifts?'],
      lead:['局域三维环境会改变化学位移。看模型怎样把几何信息直接变成原子级预测。','Local 3D environments shift NMR signals. The model maps geometry directly to atom-level predictions.'],
      labels:[['为什么难','Why it is hard'],['三维环境','3D environment'],['迁移学习','Transfer learning'],['得到什么','What it gives']]
    },
    'case-elyte':{
      kicker:['uMLP · 电解液模拟','uMLP · ELECTROLYTE SIMULATION'],
      title:['电解液空间太大，怎样把高精度模拟做得更快？','How can high-fidelity electrolyte simulation scale up?'],
      lead:['组合空间太大，高精度计算太贵。关键是只把昂贵计算用在最需要补数据的地方。','The composition space is huge and high-fidelity calculations are expensive. Spend them only where new labels are most useful.'],
      labels:[['组合空间','Composition space'],['计算瓶颈','Compute bottleneck'],['并发学习','Concurrent learning'],['模拟与性质','Simulation & properties']]
    },
    'case-catkg':{
      kicker:['Cat-KG · 催化知识','CAT-KG · CATALYSIS KNOWLEDGE'],
      title:['催化文献太多，怎样从知识中找到可行路线？','How can catalytic routes be found across too much literature?'],
      lead:['真正的难点不是没有文献，而是文献太多、路线组合太多。先结构化，再检索和筛选。','The bottleneck is not missing literature but too much of it and too many route combinations: structure it first, then search and filter.'],
      labels:[['文献太多','Literature overload'],['结构化知识','Structured knowledge'],['路线搜索','Route search'],['可追溯结果','Traceable result']]
    },
    'case-nose':{
      kicker:['NOSE · 嗅觉多模态','NOSE · OLFACTORY MULTIMODAL'],
      title:['气味如何同时连接分子、受体和语言？','How can odor connect molecules, receptors, and language?'],
      lead:['气味同时连接结构、受体和语言，而完整三元数据很少。关键是把不同来源的信息对齐起来。','Odor connects structure, receptors, and language, but complete triplets are scarce. The task is to align information from separate sources.'],
      labels:[['三类信息','Three sources'],['数据缺口','Data gap'],['共同表示','Shared representation'],['能做什么','Capabilities']]
    },
    'case-unixas':{
      kicker:['Uni-XAS · 光谱与结构','UNI-XAS · SPECTRUM & STRUCTURE'],
      title:['一条 XAS 光谱能反推出局域 3D 结构吗？','Can one XAS spectrum recover local 3D structure?'],
      lead:['实验只给一条谱线，但我们想知道局域三维结构。把谱和结构放到同一个表示空间里，才能做双向匹配。','The experiment gives a spectrum while the target is local 3D structure. A shared representation enables matching in both directions.'],
      labels:[['光谱信号','Spectrum'],['逆问题','Inverse problem'],['跨模态对齐','Cross-modal alignment'],['双向任务','Bidirectional tasks']]
    },
    'case-electroplating':{
      kicker:['Agent · 配方研发','AGENT · FORMULATION R&D'],
      title:['多个模型和实验，怎样串成一条研发流程？','How can models and experiments become one R&D workflow?'],
      lead:['吸附、扩散、分子设计和实验各有专门工具。关键是把这些能力串成可以反复更新的流程。','Adsorption, diffusion, molecular design, and experiments need different tools. The goal is to connect them into an iterative workflow.'],
      labels:[['多个环节','Many stages'],['专业模型','Specialists'],['工作流编排','Orchestration'],['实验反馈','Experimental feedback']]
    }
  };

  function polishCases(){
    Object.entries(caseCopy).forEach(([id,cfg])=>{
      const s=$('#'+id);if(!s)return;
      const kicker=$('.story-kicker',s),title=$('.story-copy h2',s),lead=$('.story-copy .lead',s);
      if(kicker)kicker.textContent=zh()?cfg.kicker[0]:cfg.kicker[1];
      if(title)title.textContent=zh()?cfg.title[0]:cfg.title[1];
      if(lead)lead.textContent=zh()?cfg.lead[0]:cfg.lead[1];
      s.querySelector('.case-question')?.remove();
      s.querySelector('.case-visual-title')?.remove();
      const buttons=$$('.case-step-button',s);
      buttons.forEach((b,i)=>{
        const small=$('small',b),strong=$('strong',b),pair=cfg.labels[i];
        if(small)small.textContent=String(i+1).padStart(2,'0');
        if(strong&&pair)strong.textContent=zh()?pair[0]:pair[1];
      });
      const note=$('.case-note',s);
      if(note&&/课堂只保留|teaching|课程教学|redraw/i.test(note.textContent))note.remove();
    });
  }

  function apply(){
    ensureStyle();
    removeDuplicatePage();
    applyNumbers();
    rebuildChemistryOverview();
    polishDiscoveryLoop();
    rebuildP29();
    polishCases();
    window.dispatchEvent(new Event('resize'));
  }

  apply();
  [180,520,1100,2200,3600,5200].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,100));
})();
