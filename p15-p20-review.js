(function installP15P20CaseReview(){
  const zh=()=>document.documentElement.lang!=='en';
  const ids=['case-nmrnet','case-elyte','case-catkg','case-nose','case-unixas','case-electroplating'];
  const numberById={
    'case-nmrnet':'01L','case-elyte':'01M','case-catkg':'01N',
    'case-nose':'01O','case-unixas':'01P','case-electroplating':'01Q'
  };
  const copy={
    'case-nmrnet':{
      kicker:['真实案例 · NMRNet','CASE STUDY · NMRNet'],
      title:['NMRNet：三维几何怎样进入真实谱学任务','NMRNet: how 3D geometry enters a real spectroscopy task'],
      steps:[['三维原子环境','3D atomic environment'],['SE(3) Transformer','SE(3) Transformer'],['预训练 → 微调','pretrain → fine-tune'],['化学位移 δ','chemical shift δ']],
      flowSmall:[['01 · 输入','01 · INPUT'],['02 · 模型','02 · MODEL'],['03 · 学习','03 · LEARNING'],['04 · 输出','04 · OUTPUT']]
    },
    'case-elyte':{
      kicker:['真实案例 · 电解液 uMLP','CASE STUDY · ELECTROLYTE uMLP'],
      title:['电解液 uMLP：AI 怎样进入分子模拟','Electrolyte uMLP: how AI enters molecular simulation'],
      steps:[['化学空间','chemical space'],['并发学习','concurrent learning'],['uMLP + MLMD','uMLP + MLMD'],['性质与机理','properties + mechanism']],
      flowSmall:[['01 · 化学空间','01 · SPACE'],['02 · 数据','02 · DATA'],['03 · 模型','03 · MODEL'],['04 · 科学问题','04 · SCIENCE']]
    },
    'case-catkg':{
      kicker:['真实案例 · Cat-KG + LLM','CASE STUDY · Cat-KG + LLM'],
      title:['Cat-KG + LLM：结构化知识怎样提高路线推理可靠性','Cat-KG + LLM: how structured knowledge improves pathway reasoning'],
      steps:[['文献结构化','structure literature'],['构建 Cat-KG','build Cat-KG'],['查询与规则筛选','query + rule filtering'],['可追溯结果','traceable output']]
    },
    'case-nose':{
      kicker:['真实案例 · NOSE 多模态学习','CASE STUDY · NOSE MULTIMODAL LEARNING'],
      title:['NOSE：分子、受体和语言怎样进入同一表示空间','NOSE: aligning molecules, receptors and language in one representation space'],
      steps:[['三种模态','three modalities'],['表示对齐','align representations'],['使用共享表示','use shared embedding'],['核心认识','takeaway']]
    },
    'case-unixas':{
      kicker:['真实案例 · Uni-XAS','CASE STUDY · Uni-XAS'],
      title:['Uni-XAS：光谱与三维结构怎样双向关联','Uni-XAS: linking spectra and 3D structures in both directions'],
      steps:[['两种模态','two modalities'],['跨模态对齐','cross-modal alignment'],['双向任务','bidirectional tasks'],['证据状态','evidence status']]
    },
    'case-electroplating':{
      kicker:['真实案例 · 电子电镀研发智能体','CASE STUDY · ELECTROPLATING R&D AGENT'],
      title:['电子电镀研发智能体：多个专业模型怎样协同工作','Electroplating R&D agent: how specialist models work together'],
      steps:[['专业模型','specialist models'],['流程编排','orchestration'],['实验迭代','experiment loop'],['证据层级','evidence label']]
    }
  };

  function pair(el,z,e){if(el)el.textContent=zh()?z:e}
  function pairHTML(el,z,e){if(el)el.innerHTML=zh()?z:e}

  function localizeBadges(section){
    const zhMap={'Published':'已发表','Conference':'会议论文','Preprint':'预印本','Official Project':'官方项目','Official project':'官方项目'};
    const enMap={'已发表':'Published','会议论文':'Conference','预印本':'Preprint','官方项目':'Official Project'};
    section.querySelectorAll('.case-badge').forEach(el=>{
      const raw=el.textContent.trim();
      const map=zh()?zhMap:enMap;
      if(map[raw])el.textContent=map[raw];
    });
  }

  function localizeLinks(section){
    const zhMap={'Paper':'论文','Code':'代码','Data':'数据','Dataset':'数据集','Project':'项目主页','Official Project':'项目主页','APP':'应用','App':'应用','Demo':'演示'};
    const enMap={'论文':'Paper','代码':'Code','数据':'Data','数据集':'Dataset','项目主页':'Project','应用':'APP','演示':'Demo'};
    section.querySelectorAll('.case-links a').forEach(a=>{
      let t=a.textContent.replace('↗','').trim();
      const map=zh()?zhMap:enMap;
      if(map[t])t=map[t];
      a.textContent=t+' ↗';
    });
  }

  function localizeStage(section,id){
    if(id==='case-nmrnet'){
      const flow=[...section.querySelectorAll('.case-flow-node strong')];
      [['三维原子环境','3D atomic environment'],['SE(3) Transformer','SE(3) Transformer'],['预训练 → 微调','pretrain → fine-tune'],['化学位移 δ','chemical shift δ']].forEach((x,i)=>pair(flow[i],x[0],x[1]));
      const small=[...section.querySelectorAll('.nmr-model-card small')];
      [['三维几何','GEOMETRY'],['迁移学习','TRANSFER']].forEach((x,i)=>pair(small[i],x[0],x[1]));
      pair(section.querySelector('.nmr-output small'),'预测化学位移','PREDICTED SHIFT');
    }
    if(id==='case-elyte'){
      const flow=[...section.querySelectorAll('.case-flow-node strong')];
      [['随机电解液配方','random electrolyte compositions'],['并发学习 + DFT','concurrent learning + DFT'],['uMLP → MLMD','uMLP → MLMD'],['结构与性质','structure & properties']].forEach((x,i)=>pair(flow[i],x[0],x[1]));
      const loop=[...section.querySelectorAll('.concurrent-step')];
      [['训练','Train'],['探索','Explore'],['筛选','Screen'],['DFT 标注','Label / DFT']].forEach((x,i)=>pair(loop[i],x[0],x[1]));
      const outputs=[...section.querySelectorAll('.elyte-output')];
      [['密度','density'],['溶剂化','solvation'],['黏度','viscosity'],['离子电导率','conductivity']].forEach((x,i)=>pair(outputs[i],x[0],x[1]));
      const facts=[...section.querySelectorAll('.case-fact small')];
      [['溶剂数据库','SOLVENT DATABASE'],['盐类','SALTS'],['并发学习轮数','CONCURRENT-LEARNING ITERATIONS'],['构型数量','CONFIGURATIONS']].forEach((x,i)=>pair(facts[i],x[0],x[1]));
      const chips=[...section.querySelectorAll('.elyte-chip')];
      [['碳酸酯','carbonate'],['醚','ether'],['腈','nitrile'],['砜','sulfone'],['杂环','heterocycle']].forEach((x,i)=>pair(chips[i],x[0],x[1]));
      pair(section.querySelector('.mlmd-strip span'),'分子动力学轨迹','trajectory');
    }
    if(id==='case-catkg'){
      const strong=[...section.querySelectorAll('.catkg-step strong')];
      [['文献','Literature'],['LLM 信息抽取','LLM extraction'],['Cat-KG','Cat-KG'],['查询 + 化学规则','Query + rules'],['可读结果','Readable output']].forEach((x,i)=>pair(strong[i],x[0],x[1]));
      const nodes=[...section.querySelectorAll('.kg-node')];
      [['催化剂 A','Catalyst A'],['反应 1','Reaction 1'],['中间体','Intermediate'],['反应 2','Reaction 2'],['催化剂 B','Catalyst B'],['目标产物','Target']].forEach((x,i)=>pair(nodes[i],x[0],x[1]));
      const path=[...section.querySelectorAll('.kg-path span')];
      [['来源 ID','source IDs'],['候选路径','candidate path'],['化学评分','chemistry score']].forEach((x,i)=>pair(path[i],x[0],x[1]));
    }
    if(id==='case-nose'){
      const mods=[...section.querySelectorAll('.nose-modal')];
      const vals=[
        [['模态 1','MODALITY 1'],['分子','Molecule'],['结构','structure']],
        [['模态 2','MODALITY 2'],['受体','Receptor'],['序列','sequence']],
        [['模态 3','MODALITY 3'],['气味语言','Odor language'],['文本描述','text description']]
      ];
      mods.forEach((m,i)=>{if(!vals[i])return;pair(m.querySelector('small'),...vals[i][0]);pair(m.querySelector('strong'),...vals[i][1]);pair(m.querySelector('span'),...vals[i][2])});
      pairHTML(section.querySelector('.nose-center'),'三模态<br>对齐表示','Tri-modal<br>aligned<br>representation');
      const tasks=[...section.querySelectorAll('.nose-task')];
      [['感知预测','perception'],['跨模态检索','cross-modal retrieval'],['零样本','zero-shot']].forEach((x,i)=>pair(tasks[i],x[0],x[1]));
    }
    if(id==='case-unixas'){
      const mods=[...section.querySelectorAll('.xas-modality')];
      if(mods[0]){pair(mods[0].querySelector('small'),'模态 A','MODALITY A');pair(mods[0].querySelector('strong'),'XAS 光谱','XAS spectrum')}
      if(mods[1]){pair(mods[1].querySelector('small'),'模态 B','MODALITY B');pair(mods[1].querySelector('strong'),'局域三维结构','local 3D structure')}
      const latent=section.querySelector('.xas-latent');
      if(latent){pair(latent.querySelector('strong'),'共享表示空间','shared latent space');pair(latent.querySelector(':scope > span'),'跨模态对齐','cross-modal alignment')}
      const tasks=[...section.querySelectorAll('.xas-task')];
      [['跨模态检索','retrieval'],['光谱预测','spectrum prediction'],['条件三维生成','conditional 3D generation']].forEach((x,i)=>pair(tasks[i],x[0],x[1]));
    }
    if(id==='case-electroplating'){
      const specs=[...section.querySelectorAll('.ep-specialist')];
      const names=[['吸附','adsorption'],['扩散','diffusion'],['分子设计','molecular design'],['CVS 响应','CVS response']];
      specs.forEach((m,i)=>{pair(m.querySelector('small'),'专业模型','SPECIALIST MODEL');if(names[i])pair(m.querySelector('strong'),...names[i])});
      const orch=section.querySelector('.ep-orchestrator');
      if(orch){pair(orch.querySelector('small'),'通用模型 + 工作流编排','GENERAL MODEL + WORKFLOW ORCHESTRATION');pair(orch.querySelector('strong'),'配方研发智能体','formulation R&D agent')}
      const loop=[...section.querySelectorAll('.ep-loop span')];
      [['目标','Goal'],['预测','Predict'],['筛选','Screen'],['实验','Experiment'],['更新','Update']].forEach((x,i)=>pair(loop[i],x[0],x[1]));
      section.querySelector('.ep-evidence')?.remove();
      const caps=[...section.querySelectorAll('.case-capability-strip span')];
      [['专业模型','specialist models'],['工具','tools'],['智能体','agent'],['实验','experiment'],['人工验证','human validation']].forEach((x,i)=>pair(caps[i],x[0],x[1]));
    }
  }

  function reshape(section,id){
    const c=copy[id]; if(!c)return;
    const no=section.querySelector('.section-no'); if(no)no.textContent=numberById[id]+' / '+(zh()?'案例':'CASE');
    pair(section.querySelector('.story-kicker'),c.kicker[0],c.kicker[1]);
    pair(section.querySelector('.story-copy h2'),c.title[0],c.title[1]);
    section.querySelector('.story-copy .lead')?.remove();
    section.querySelector('.case-visual-title')?.remove();
    section.querySelector('.case-question')?.remove();
    section.querySelector('.case-note')?.remove();

    const buttons=[...section.querySelectorAll('.case-step-button')];
    buttons.forEach((b,i)=>{
      pair(b.querySelector('small'),`步骤 ${i+1}`,`STEP ${i+1}`);
      if(c.steps[i])pair(b.querySelector('strong'),c.steps[i][0],c.steps[i][1]);
    });
    const flowSmall=[...section.querySelectorAll('.case-flow-node small')];
    if(c.flowSmall)flowSmall.forEach((el,i)=>{if(c.flowSmall[i])pair(el,c.flowSmall[i][0],c.flowSmall[i][1])});

    const stage=section.querySelector('.case-stage');
    const takeaway=section.querySelector('.case-takeaway');
    if(stage&&takeaway&&!stage.contains(takeaway)){
      takeaway.classList.add('case-stage-detail');
      stage.appendChild(takeaway);
    }
    localizeBadges(section);
    localizeLinks(section);
    localizeStage(section,id);
  }

  function apply(){ids.forEach(id=>{const s=document.getElementById(id);if(s)reshape(s,id)})}
  apply();
  [120,420,900,1600,2600,4000].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,130));
})();
