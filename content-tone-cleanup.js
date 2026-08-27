(function installContentToneCleanup(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const set=(el,cn,en)=>{if(el)el.textContent=zh()?cn:en};
  const remove=q=>document.querySelectorAll(q).forEach(el=>el.remove());

  const caseIds=['case-nmrnet','case-elyte','case-catkg','case-nose','case-unixas','case-electroplating'];
  const caseTitles={
    'case-nmrnet':['NMRNet：从三维原子环境预测 NMR 化学位移','NMRNet: predicting NMR chemical shifts from local 3D environments'],
    'case-elyte':['电解液 uMLP：用机器学习势做分子动力学模拟','Electrolyte uMLP: molecular dynamics with a machine-learning potential'],
    'case-catkg':['Cat-KG + LLM：用知识图谱和化学规则推荐催化路线','Cat-KG + LLM: recommending catalytic routes with a knowledge graph and chemistry rules'],
    'case-nose':['NOSE：联合表示分子、嗅觉受体和气味描述','NOSE: jointly representing molecules, olfactory receptors and odor descriptions'],
    'case-unixas':['Uni-XAS：连接 XAS 光谱与局域三维结构','Uni-XAS: connecting XAS spectra with local 3D structures'],
    'case-electroplating':['电子电镀研发智能体：把专业模型接进研发流程','Electroplating R&D agent: connecting specialist models in an R&D workflow']
  };
  const caseNumbers={
    'case-nmrnet':'案例 1 / 6','case-elyte':'案例 2 / 6','case-catkg':'案例 3 / 6',
    'case-nose':'案例 4 / 6','case-unixas':'案例 5 / 6','case-electroplating':'案例 6 / 6'
  };
  const details={
    'case-nmrnet':{
      zh:['先把目标原子周围的三维局域环境作为模型输入。','SE(3) Transformer 用适合三维旋转与平移的方式处理原子环境。','先在较大数据上预训练，再针对具体 NMR 数据集进行微调。','最终输出原子级化学位移，并在液态与固态数据上进行评测。'],
      en:['Represent the 3D local environment around the target atom as model input.','Use an SE(3) Transformer to process atomic environments while respecting 3D rotations and translations.','Pretrain on larger data, then fine-tune for a specific NMR dataset.','Predict atom-level chemical shifts and evaluate them on liquid- and solid-state data.']
    },
    'case-elyte':{
      zh:['从大规模电解液组成空间出发，组合不同溶剂与盐形成候选体系。','并发学习反复进行训练、探索、筛选和 DFT 标注，把计算集中到模型最需要的构型。','训练面向电解液体系的 uMLP，并用它驱动机器学习分子动力学模拟。','从模拟轨迹中计算密度、溶剂化结构、黏度和离子电导率等性质。'],
      en:['Start from a large electrolyte-composition space built from different solvents and salts.','Concurrent learning cycles through training, exploration, screening and DFT labeling so calculations focus on useful configurations.','Train an electrolyte uMLP and use it to drive machine-learning molecular dynamics.','Compute density, solvation structure, viscosity and ionic conductivity from the trajectories.']
    },
    'case-catkg':{
      zh:['先定义催化知识结构，再用 LLM 辅助从文献中抽取反应、催化剂、溶剂和产物等信息。','把结构化信息写入 Cat-KG，形成可以查询和关联的催化知识图谱。','针对目标产物查询候选多步路径，再结合催化领域规则筛选和排序。','最后把结构化结果整理成可读描述，同时保留回到知识图谱和原始文献的路径。'],
      en:['Define a catalysis schema, then use LLM-assisted extraction for reactions, catalysts, solvents and products.','Store the structured information in Cat-KG so catalytic knowledge can be queried and connected.','Query candidate multistep pathways for a target product, then filter and rank them with catalysis rules.','Render the structured result in readable form while keeping the route traceable to the graph and source literature.']
    },
    'case-nose':{
      zh:['一个样本可以同时包含分子结构、嗅觉受体序列和自然语言气味描述。','三种模态分别编码，再通过对比学习对齐到可比较的表示空间。','对齐后的表示可以支持嗅觉预测、跨模态检索和零样本任务。','重点在于学习不同科学模态之间可比较、可对齐的表示。'],
      en:['A sample can include molecular structure, olfactory receptor sequences and natural-language odor descriptions.','Encode the three modalities separately and align them into a comparable representation space with contrastive learning.','The aligned representations support olfactory prediction, cross-modal retrieval and zero-shot tasks.','The key is learning comparable, aligned representations across different scientific modalities.']
    },
    'case-unixas':{
      zh:['XAS 光谱与局域三维原子结构属于两种不同的数据形态。','Uni-XAS 把光谱和结构映射到共享表示空间，通过跨模态对齐建立对应关系。','统一表示后，可以进行结构—光谱检索、光谱预测，以及以光谱为条件的局域三维结构生成。','这类方法可以处理实验信号与结构信息之间的双向映射问题。'],
      en:['XAS spectra and local 3D atomic structures are two different data modalities.','Uni-XAS maps spectra and structures into a shared representation space through cross-modal alignment.','The unified representation supports structure-spectrum retrieval, spectrum prediction and spectrum-conditioned local 3D generation.','This type of method addresses bidirectional mapping between experimental signals and structural information.']
    },
    'case-electroplating':{
      zh:['真实配方研发通常需要多个专业模型分别处理吸附、扩散、分子设计和 CVS 响应等环节。','研发智能体负责理解任务，并在专业模型、数据和工具之间组织工作流。','候选经过预测和筛选后进入实验验证，实验结果再回到数据与模型环节形成下一轮迭代。','关键候选最终仍要通过实验结果和研究者判断确认是否可用。'],
      en:['Real formulation R&D usually needs different specialist models for adsorption, diffusion, molecular design, CVS response and related tasks.','The R&D agent interprets the task and organizes a workflow across specialist models, data and tools.','Candidates move from prediction and screening to experiments, and experimental results feed the next iteration.','Important candidates still need experimental evidence and researcher judgment before they are accepted.']
    }
  };

  const statusZh={'Published':'已发表','Conference':'会议论文','Accepted':'已接收','Preprint':'预印本','Accepted / Preprint':'已接收 / 预印本','Conference / Preprint':'已接收 / 预印本','Official Project':'项目','Official project':'项目'};
  const statusEn={'Conference / Preprint':'Accepted / Preprint'};

  function cleanHome(){
    const home=$('#home');if(!home)return;
    const h1=$('h1',home);
    if(h1)h1.innerHTML=zh()?'人工智能技术入门<br><em>AI 模型训练</em>':'Introduction to Artificial Intelligence<br><em>AI Model Training</em>';
    $('.hero-copy > .eyebrow',home)?.remove();
    $('.hero-copy > .lead',home)?.remove();
    $('.hero-sketch .hand-note',home)?.remove();
    const start=$('.hero-copy .primary',home);if(start){start.setAttribute('href','#course-1-divider');set(start,'开始课程 →','Start course →')}
  }

  function cleanTopbar(){
    const links=$$('.topbar nav a');
    const labels=zh()?['AI 入门','化学','案例','模型训练','泛化','资源']:['AI Intro','Chemistry','Cases','Training','Generalization','Resources'];
    links.forEach((a,i)=>{if(labels[i])a.textContent=labels[i]});
    const trigger=$('#chapter-trigger');
    set($('.chapter-trigger-copy small',trigger),'目录','CHAPTERS');
  }

  function cleanCourseOne(){
    const divider=$('#course-1-divider');
    set($('.course-divider-tag',divider),'从基本概念到实际应用','From core concepts to practical use');
    set($('.course-divider-copy > p',divider),'先认识基本概念，再看这些方法怎样进入化学问题。','Start with the basic ideas, then see how they enter chemistry problems.');

    const lens=$('#course-lens');
    set($('.story-copy h2',lens),'为什么要懂一点 AI？','Why learn some AI?');
    set($('.story-copy .lead',lens),'先看懂模型在做什么、结果怎么判断，再了解它能怎样进入实际科研。','First understand what a model does, how to judge its result, and how it can be used in research.');
    const lensCards=$$('.course-lens-card',lens);['01','02','03'].forEach((x,i)=>set($('small',lensCards[i]),x,x));

    set($('#learn h2'),'AI、机器学习和深度学习是什么关系？','How are AI, machine learning and deep learning related?');
    $('#learn .lead')?.remove();

    const roles=$('#role-map-screen');
    set($('.story-copy h2',roles),'一个机器学习问题里，都有哪些角色？','What are the main roles in a machine-learning problem?');
    $('.story-copy .lead',roles)?.remove();

    set($('#represent h2'),'化学对象，怎样变成模型能处理的数据？','How do chemical objects become model-ready data?');

    const rv=$('#rep-vs-model');
    set($('.story-copy h2',rv),'“分子怎么表示”和“用什么模型”是两次不同选择','Representation and model choice are two different decisions');
    const repCards=$$('.repmodel-card',rv);set($('small',repCards[0]),'输入表示','Input representation');set($('small',repCards[1]),'模型','Model');

    const sym=$('#symmetry-story');
    const symCards=$$('.p10-card',sym);set($('small',symCards[0]),'当前方向','Orientation');set($('small',symCards[1]),'能量','Energy');set($('small',symCards[2]),'力的方向','Force direction');

    const choice=$('#capability-map-screen');
    set($('.story-copy h2',choice),'不同的化学数据，适合什么模型？','Which models fit different kinds of chemistry data?');

    set($('#chemistry h2'),'AI 在化学里通常用来做什么？','What is AI commonly used for in chemistry?');

    $('#chem-task-map-screen')?.remove();
    $('#discovery-story')?.remove();
  }

  function desiredCaseDetail(section,id){
    const bank=details[id];if(!bank)return'';
    const buttons=$$('.case-step-button',section);let i=buttons.findIndex(b=>b.classList.contains('active'));if(i<0)i=0;
    return (zh()?bank.zh:bank.en)[i]||'';
  }
  function syncCaseDetail(section,id){const takeaway=$('.case-takeaway',section);if(takeaway)takeaway.textContent=desiredCaseDetail(section,id)}
  function cleanCase(section,id){
    set($('.section-no',section),caseNumbers[id],caseNumbers[id].replace('案例','Case'));
    const title=caseTitles[id];if(title)set($('.story-copy h2',section),title[0],title[1]);
    $('.story-copy .lead',section)?.remove();
    $('.case-visual-title',section)?.remove();
    $('.case-question',section)?.remove();
    $('.case-note',section)?.remove();
    $('.ep-evidence',section)?.remove();
    $$('.case-step-button',section).forEach((button,i)=>{
      const small=$('small',button);set(small,`步骤 ${i+1}`,`Step ${i+1}`);
      if(button.dataset.cleanToneBound==='1')return;button.dataset.cleanToneBound='1';button.addEventListener('click',()=>setTimeout(()=>syncCaseDetail(section,id),0));
    });
    syncCaseDetail(section,id);
  }

  function cleanAfterCases(){
    const research=$('#research');
    if(research){
      set($('h2',research),'六个案例，分别用了什么数据、模型和工具？','What data, models and tools did the six cases use?');
      $('.lead',research)?.remove();
      $('.course01-recap-kicker',research)?.remove();
      $$('.research-evidence-note',research).forEach(el=>el.remove());
      $$('.research-meaning strong',research).forEach(el=>set(el,'研究意义：','Research significance: '));
      $$('.research-status',research).forEach(el=>{const t=el.textContent.trim();el.textContent=zh()?(statusZh[t]||t):(statusEn[t]||t)});
      $$('.research-index-btn small',research).forEach(el=>{let t=el.textContent;if(zh())Object.entries(statusZh).forEach(([en,cn])=>{if(t.startsWith(en+' ·'))t=cn+t.slice(en.length)});else Object.entries(statusEn).forEach(([oldv,newv])=>{if(t.startsWith(oldv+' ·'))t=newv+t.slice(oldv.length)});el.textContent=t});
    }

    const now=$('#now');
    set($('h2',now),'Agent：让模型调用检索、代码和专业工具','Agents: connecting models with search, code and specialist tools');
    set($('.lead',now),'一个任务往往不只需要一个模型。Agent 可以把检索、数据库、代码、文件和专业工具串成工作流。','A task often needs more than one model. An agent can connect search, databases, code, files and specialist tools into a workflow.');
    const nowCards=$$('.now-card',now);set($('small',nowCards[0]),'适合做什么','Useful for');set($('small',nowCards[1]),'需要检查什么','What to verify');
    $('.agent-builder .story-kicker',now)?.remove();
    set($('.agent-builder-head strong',now),'组合一条科研辅助工作流','Build a research-support workflow');
    set($('.agent-evidence',now),'每一步的输入、证据和中间结果都应该能够检查。','Inputs, evidence and intermediate results should remain inspectable at every step.');

    const reviews=$('#review-shelf-screen');
    set($('.story-copy h2',reviews),'想继续了解 AI × Chemistry，可以从这些综述开始','For further reading on AI × Chemistry, start with these reviews');
    $('.story-copy .lead',reviews)?.remove();
  }

  function cleanCourseTwo(){
    const divider=$('#course-2-divider');
    set($('.course-divider-tag',divider),'接下来拆开一个模型到底是怎么训练出来的','Next, open up how a model is trained');
    $('.course-divider-copy > p',divider)?.remove();

    const eq=$('#equation-screen');set($('.story-copy h2',eq),'先认清 x、y、ŷ 和 θ 分别是什么','First identify x, y, ŷ and θ');
    $('#train .lead')?.remove();
    $('#training-playground-screen .story-copy .lead')?.remove();
    const batch=$('#batch-epoch-screen');set($('.story-copy h2',batch),'Batch size 和 epoch 分别表示什么？','What do batch size and epoch mean?');
    const hold=$('#holdout-screen');set($('.story-copy h2',hold),'训练数据为什么要分三份？','Why split training data into three parts?');
    const play=$('#play');set($('h2',play),'欠拟合和过拟合，差别在哪里？','What is the difference between underfitting and overfitting?');
    const split=$('#split-scenarios');set($('.story-copy h2',split),'科研目标不同，数据该怎么划分？','How should the split change with the research goal?');
    const traps=$('#evaluation-traps');set($('.story-copy h2',traps),'数据分好了，还会有哪些评估陷阱？','What evaluation traps remain after splitting?');
    const metrics=$('#metric-lab-screen');set($('.story-copy h2',metrics),'MAE 和 RMSE 有什么区别？','What is the difference between MAE and RMSE?');
    const r2=$('#r2-baseline-screen');set($('.story-copy h2',r2),'R²：模型相对均值基线表现如何？','R²: how does the model compare with the mean baseline?');
    const trust=$('#trust-zone-screen');set($('.story-copy h2',trust),'这个新样本的预测可靠吗？','Can we trust the prediction for this new sample?');
  }

  function cleanSummaries(){
    const one=$('#course-summary-map'),two=$('#course-summary-map-2');
    set($('.static-map-head h2',one),'第一部分回顾：AI 怎样进入化学科研','Part 1 review: how AI enters chemistry research');
    $('.static-map-head .lead',one)?.remove();
    $('.static-map-root small',one)?.remove();
    set($('.static-map-root span',one),'化学问题 → 数据表示 → 模型 → 科研应用','Chemistry question → representation → model → application');

    set($('.static-map-head h2',two),'第二部分回顾：模型怎样训练，又怎样判断结果可信','Part 2 review: how models train and how results are evaluated');
    $('.static-map-head .lead',two)?.remove();
    $('.static-map-root small',two)?.remove();
  }

  function cleanAfterClass(){
    const explore=$('#explore');
    set($('h2',explore),'课后学习资源','Learning resources');
    $('.lead',explore)?.remove();
    $('.stamp',explore)?.remove();
    $$('#resource-grid .resource-card p').forEach(el=>el.remove());

    const group=$('#group');set($('h2',group),'课题组相关链接','Group links');$('.group-hand-note',group)?.remove();

    const finish=$('#finish');
    $('.finish-card .eyebrow',finish)?.remove();
    set($('.finish-card h2',finish),'谢谢大家！','Thank you!');
    set($('.finish-card .lead',finish),'以后看到一个 AI 模型，可以先问三件事：数据是什么？模型学了什么？结果是怎么验证的？','When you see an AI model, first ask three things: what is the data, what did the model learn, and how was the result validated?');
    set($('.finish-card .hand',finish),'谢谢大家，祝大家科研顺利，也祝大家玩得开心。','Thank you, and best wishes for your research and everything beyond it.');
  }

  function cleanSectionLabels(){
    const map={
      'course-lens':'课程 01','molecule-501':'01A','learn':'01B','role-map-screen':'01C','represent':'01D','rep-vs-model':'01E','gnn-story':'01F','symmetry-story':'01G','capability-map-screen':'01H','chemistry':'01I','research':'案例回顾','now':'Agent','review-shelf-screen':'延伸阅读',
      'equation-screen':'02A','train':'02B','training-playground-screen':'02C','batch-epoch-screen':'02D','holdout-screen':'02E','play':'02F','split-scenarios':'02G','evaluation-traps':'02H','metric-lab-screen':'02I','r2-baseline-screen':'02J','trust-zone-screen':'02K','generalization-review':'02L','explore':'课后资源','group':'相关链接'
    };
    Object.entries(map).forEach(([id,label])=>{const el=$(`#${id} .section-no`);if(el)el.textContent=label});
  }

  function cleanDrawer(){
    const drawer=$('#chapter-drawer');if(!drawer)return;
    set($('.chapter-drawer-head small',drawer),'课程目录','COURSE CONTENTS');
    const courseSmall=$$('.chapter-course-title small',drawer);set(courseSmall[0],'课程 01','COURSE 01');set(courseSmall[1],'课程 02','COURSE 02');set(courseSmall[2],'课后','AFTER CLASS');
  }

  function removeKickers(){
    $$('main .story-kicker').forEach(el=>el.remove());
  }

  function apply(){
    cleanHome();cleanTopbar();removeKickers();cleanCourseOne();caseIds.forEach(id=>{const s=$('#'+id);if(s)cleanCase(s,id)});cleanAfterCases();cleanCourseTwo();cleanSummaries();cleanAfterClass();cleanSectionLabels();cleanDrawer();
  }

  apply();
  [120,520,1200,2400,4200,6000].forEach(ms=>setTimeout(apply,ms));
  $('#lang-toggle')?.addEventListener('click',()=>setTimeout(apply,180));
  $('#chapter-trigger')?.addEventListener('click',()=>setTimeout(cleanDrawer,20));

  const main=$('main');
  if(main&&'MutationObserver'in window){let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply()})}).observe(main,{childList:true,subtree:false})}
  const resourceGrid=$('#resource-grid');
  if(resourceGrid&&'MutationObserver'in window)new MutationObserver(()=>$$('#resource-grid .resource-card p').forEach(el=>el.remove())).observe(resourceGrid,{childList:true});
})();
