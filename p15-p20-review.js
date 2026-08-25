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
      steps:['三维原子环境','SE(3) Transformer','预训练 → 微调','化学位移 δ'],
      flowSmall:['01 · 输入','02 · 模型','03 · 学习','04 · 输出']
    },
    'case-elyte':{
      kicker:['真实案例 · 电解液 uMLP','CASE STUDY · ELECTROLYTE uMLP'],
      title:['电解液 uMLP：AI 怎样进入分子模拟','Electrolyte uMLP: how AI enters molecular simulation'],
      steps:['化学空间','并发学习','uMLP + MLMD','性质与机理'],
      flowSmall:['01 · 化学空间','02 · 数据','03 · 模型','04 · 科学问题']
    },
    'case-catkg':{
      kicker:['真实案例 · Cat-KG + LLM','CASE STUDY · Cat-KG + LLM'],
      title:['Cat-KG + LLM：结构化知识怎样提高路线推理可靠性','Cat-KG + LLM: how structured knowledge improves pathway reasoning'],
      steps:['文献结构化','构建 Cat-KG','查询与规则筛选','可追溯结果']
    },
    'case-nose':{
      kicker:['真实案例 · NOSE 多模态学习','CASE STUDY · NOSE MULTIMODAL LEARNING'],
      title:['NOSE：分子、受体和语言怎样进入同一表示空间','NOSE: aligning molecules, receptors and language in one representation space'],
      steps:['三种模态','表示对齐','使用共享表示','核心认识']
    },
    'case-unixas':{
      kicker:['真实案例 · Uni-XAS','CASE STUDY · Uni-XAS'],
      title:['Uni-XAS：光谱与三维结构怎样双向关联','Uni-XAS: linking spectra and 3D structures in both directions'],
      steps:['两种模态','跨模态对齐','双向任务','证据状态']
    },
    'case-electroplating':{
      kicker:['真实案例 · 电子电镀研发智能体','CASE STUDY · ELECTROPLATING R&D AGENT'],
      title:['电子电镀研发智能体：多个专业模型怎样协同工作','Electroplating R&D agent: how specialist models work together'],
      steps:['专业模型','流程编排','实验迭代','证据层级']
    }
  };

  function setText(el,z,e){if(el)el.textContent=zh()?z:e}

  function localizeBadges(section){
    section.querySelectorAll('.case-badge').forEach(el=>{
      const raw=el.textContent.trim();
      if(!zh())return;
      const map={'Published':'已发表','Conference':'会议论文','Preprint':'预印本','Official Project':'官方项目','Official project':'官方项目'};
      if(map[raw])el.textContent=map[raw];
    });
  }

  function localizeLinks(section){
    section.querySelectorAll('.case-links a').forEach(a=>{
      if(!zh())return;
      let t=a.textContent.replace('↗','').trim();
      const replacements=[
        [/^Paper$/i,'论文'],[/^Code$/i,'代码'],[/^Data$/i,'数据'],[/^Dataset$/i,'数据集'],
        [/^Project$/i,'项目主页'],[/^Official Project$/i,'项目主页'],[/^APP$/i,'应用'],[/^Demo$/i,'演示']
      ];
      replacements.forEach(([r,v])=>{if(r.test(t))t=v});
      a.textContent=t+' ↗';
    });
  }

  function localizeStage(section,id){
    if(!zh())return;
    if(id==='case-nmrnet'){
      const strong=[...section.querySelectorAll('.case-flow-node strong')];
      ['三维原子环境','SE(3) Transformer','预训练 → 微调','化学位移 δ'].forEach((x,i)=>{if(strong[i])strong[i].textContent=x});
      const small=[...section.querySelectorAll('.nmr-model-card small')];
      ['三维几何','迁移学习'].forEach((x,i)=>{if(small[i])small[i].textContent=x});
      setText(section.querySelector('.nmr-output small'),'预测化学位移','PREDICTED SHIFT');
    }
    if(id==='case-elyte'){
      const strong=[...section.querySelectorAll('.case-flow-node strong')];
      ['随机电解液配方','并发学习 + DFT','uMLP → MLMD','结构与性质'].forEach((x,i)=>{if(strong[i])strong[i].textContent=x});
      const loop=[...section.querySelectorAll('.concurrent-step')];
      ['训练','探索','筛选','DFT 标注'].forEach((x,i)=>{if(loop[i])loop[i].textContent=x});
      const outputs=[...section.querySelectorAll('.elyte-output')];
      ['密度','溶剂化','黏度','离子电导率'].forEach((x,i)=>{if(outputs[i])outputs[i].textContent=x});
      const facts=[...section.querySelectorAll('.case-fact small')];
      ['溶剂数据库','盐类','并发学习轮数','构型数量'].forEach((x,i)=>{if(facts[i])facts[i].textContent=x});
      const strip=section.querySelector('.mlmd-strip span'); if(strip)strip.textContent='分子动力学轨迹';
    }
    if(id==='case-catkg'){
      const strong=[...section.querySelectorAll('.catkg-step strong')];
      ['文献','LLM 信息抽取','Cat-KG','查询 + 化学规则','可读结果'].forEach((x,i)=>{if(strong[i])strong[i].textContent=x});
      section.querySelectorAll('.kg-path span').forEach((el,i)=>el.textContent=['来源 ID','候选路径','化学评分'][i]||el.textContent);
    }
    if(id==='case-nose'){
      const mods=[...section.querySelectorAll('.nose-modal')];
      const vals=[['模态 1','分子','结构'],['模态 2','受体','序列'],['模态 3','气味语言','文本描述']];
      mods.forEach((m,i)=>{if(!vals[i])return; const s=m.querySelector('small'),b=m.querySelector('strong'),sp=m.querySelector('span'); if(s)s.textContent=vals[i][0];if(b)b.textContent=vals[i][1];if(sp)sp.textContent=vals[i][2]});
      const center=section.querySelector('.nose-center'); if(center)center.innerHTML='三模态<br>对齐表示';
      const tasks=[...section.querySelectorAll('.nose-task')]; ['感知预测','跨模态检索','零样本'].forEach((x,i)=>{if(tasks[i])tasks[i].textContent=x});
    }
    if(id==='case-unixas'){
      const mods=[...section.querySelectorAll('.xas-modality')];
      if(mods[0]){setText(mods[0].querySelector('small'),'模态 A','MODALITY A');setText(mods[0].querySelector('strong'),'XAS 光谱','XAS spectrum')}
      if(mods[1]){setText(mods[1].querySelector('small'),'模态 B','MODALITY B');setText(mods[1].querySelector('strong'),'局域三维结构','local 3D structure')}
      const latent=section.querySelector('.xas-latent');
      if(latent){setText(latent.querySelector('strong'),'共享表示空间','shared latent space');setText(latent.querySelector(':scope > span'),'跨模态对齐','cross-modal alignment')}
      const tasks=[...section.querySelectorAll('.xas-task')]; ['跨模态检索','光谱预测','条件三维生成'].forEach((x,i)=>{if(tasks[i])tasks[i].textContent=x});
    }
    if(id==='case-electroplating'){
      const specs=[...section.querySelectorAll('.ep-specialist')];
      const names=['吸附','扩散','分子设计','CVS 响应'];
      specs.forEach((m,i)=>{setText(m.querySelector('small'),'专业模型','SPECIALIST MODEL');if(m.querySelector('strong'))m.querySelector('strong').textContent=names[i]});
      const orch=section.querySelector('.ep-orchestrator');
      if(orch){setText(orch.querySelector('small'),'通用模型 + 工作流编排','GENERAL MODEL + WORKFLOW ORCHESTRATION');setText(orch.querySelector('strong'),'配方研发智能体','formulation R&D agent')}
      const loop=[...section.querySelectorAll('.ep-loop span')]; ['目标','预测','筛选','实验','更新'].forEach((x,i)=>{if(loop[i])loop[i].textContent=x});
      section.querySelector('.ep-evidence')?.remove();
      const caps=[...section.querySelectorAll('.case-capability-strip span')]; ['专业模型','工具','智能体','实验','人工验证'].forEach((x,i)=>{if(caps[i])caps[i].textContent=x});
    }
  }

  function reshape(section,id){
    const c=copy[id]; if(!c)return;
    const no=section.querySelector('.section-no'); if(no)no.textContent=numberById[id]+' / CASE';
    setText(section.querySelector('.story-kicker'),c.kicker[0],c.kicker[1]);
    setText(section.querySelector('.story-copy h2'),c.title[0],c.title[1]);
    section.querySelector('.story-copy .lead')?.remove();
    section.querySelector('.case-visual-title')?.remove();
    section.querySelector('.case-question')?.remove();
    section.querySelector('.case-note')?.remove();

    const buttons=[...section.querySelectorAll('.case-step-button')];
    buttons.forEach((b,i)=>{
      const small=b.querySelector('small'),strong=b.querySelector('strong');
      if(small)small.textContent=zh()?`步骤 ${i+1}`:`STEP ${i+1}`;
      if(strong&&c.steps[i])strong.textContent=c.steps[i];
    });
    const flowSmall=[...section.querySelectorAll('.case-flow-node small')];
    if(c.flowSmall)flowSmall.forEach((el,i)=>{if(c.flowSmall[i]&&zh())el.textContent=c.flowSmall[i]});

    // The active-step explanation belongs with the teaching diagram, not as tiny copy in the side panel.
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
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,120));
})();
