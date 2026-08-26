(function enforceCourseOrder(){
  const $=q=>document.querySelector(q);
  const main=$('main');if(!main)return;
  const zh=()=>document.documentElement.lang!=='en';
  const dividerData={
    course1:{id:'course-1-divider',course:'COURSE 01',titleZh:'人工智能技术入门',titleEn:'Introduction to Artificial Intelligence',leadZh:'模型能处理什么输入、现代方法为什么需要图和三维几何、这些能力怎样进入真实化学问题。',leadEn:'What inputs can models process, why do modern methods use graphs and 3D geometry, and how do these capabilities enter real chemical problems?',stepsZh:['AI、ML、DL 是什么关系？','分子怎样变成模型能处理的表示？','GNN、3D、多模态与 Agent 怎样进入真实化学科研，并得到可验证结果？'],stepsEn:['How do AI, ML and DL relate?','How does a molecule become a representation a model can process?','How do GNNs, 3D methods, multimodality and agents enter real chemistry research and produce verifiable results?']},
    course2:{id:'course-2-divider',course:'COURSE 02',titleZh:'AI 模型训练',titleEn:'AI Model Training',leadZh:'第二门课把“模型会做什么”进一步拆开：预测怎样产生、Loss 怎样驱动参数更新，以及我们怎样知道模型不是只记住训练数据。',leadEn:'The second course opens the training black box: how predictions are produced, how loss drives parameter updates, and how we know the model did more than memorize training data.',stepsZh:['ŷ = f(x; θ) 里每个符号是谁？','Prediction → Loss → Update 怎样循环？','Learning rate、batch、epoch 控制什么？','Train / Validation / Test 怎样支持可信泛化？','化学数据为什么需要任务匹配的 split 与评估？'],stepsEn:['Who is who in ŷ = f(x; θ)?','How does Prediction → Loss → Update repeat?','What do learning rate, batch and epoch control?','How do Train / Validation / Test support credible generalization?','Why must chemical splits and metrics match intended use?']}
  };

  function ensureDivider(d){let s=$('#'+d.id);if(!s){s=document.createElement('section');s.id=d.id;s.className='section snap-section course-divider';main.appendChild(s)}return s}
  const course1=ensureDivider(dividerData.course1),course2=ensureDivider(dividerData.course2);

  function renderDivider(s,d,second=false){
    const steps=zh()?d.stepsZh:d.stepsEn;
    s.innerHTML=`<div class="course-divider-copy"><small>${d.course}</small><h2>${zh()?d.titleZh:d.titleEn}</h2><p>${zh()?d.leadZh:d.leadEn}</p><span class="course-divider-tag">${second?(zh()?'从“会用”走向“会判断训练与泛化”':'From use to training and generalization'):(zh()?'从基本概念走到化学科研':'From core concepts to chemistry research')}</span></div><aside class="course-divider-map"><strong>${zh()?'这一门课回答':'This course answers'}</strong><ol>${steps.map(x=>`<li>${x}</li>`).join('')}</ol></aside>`;
  }

  function renderChrome(){
    const nav=document.querySelector('.topbar nav');
    if(nav)nav.innerHTML='<a href="#course-1-divider">AI INTRO</a><a href="#represent">CHEMISTRY</a><a href="#research">CASES</a><a href="#course-2-divider">TRAINING</a><a href="#play">GENERALIZE</a><a href="#explore">RESOURCES</a>';
    const heroB=document.querySelector('#home [data-i18n="heroTitleB"]'),lead=document.querySelector('#home [data-i18n="heroLead"]'),note=document.querySelector('#home [data-i18n="heroNote"]');
    if(heroB)heroB.textContent=zh()?'先认识 AI，再拆开模型训练。':'understand AI first, then open the training black box.';
    if(lead)lead.textContent=zh()?'第一门先建立 AI × Chemistry 的整体地图与真实案例；第二门再深入模型训练、数据划分、泛化与可信评估。':'Course 01 builds the AI × Chemistry map through real cases; Course 02 then dives into model training, data splits, generalization and credible evaluation.';
    if(note)note.textContent=zh()?'课程 01：AI 入门 → 课程 02：模型训练':'Course 01: AI intro → Course 02: model training';
  }

  const firstIds=['course-lens','molecule-501','learn','role-map-screen','represent','rep-vs-model','gnn-story','symmetry-story','capability-map-screen','chemistry','chem-task-map-screen','case-nmrnet','case-elyte','case-catkg','case-nose','case-unixas','case-electroplating','research','now','review-shelf-screen'];
  const secondIds=['equation-screen','prediction-loss-screen','train','training-playground-screen','batch-epoch-screen','holdout-screen','data-split','play','generalization-curves','unseen-vocabulary','split-scenarios','evaluation-traps','metric-lab-screen','r2-baseline-screen','trust-zone-screen','generalization-review','generalization-checkpoint'];
  const sharedIds=['course-summary-map','course-summary-map-2','explore','group','finish'];

  function placeAfter(anchor,ids){
    let cursor=anchor;
    ids.forEach(id=>{
      const el=$('#'+id);if(!el)return;
      if(cursor.nextElementSibling!==el)cursor.insertAdjacentElement('afterend',el);
      cursor=el;
    });
    return cursor;
  }

  let applying=false;
  function apply(){
    if(applying)return;
    const home=$('#home');if(!home)return;
    applying=true;
    renderChrome();
    renderDivider(course1,dividerData.course1,false);
    renderDivider(course2,dividerData.course2,true);
    if(home.nextElementSibling!==course1)home.insertAdjacentElement('afterend',course1);
    const end1=placeAfter(course1,firstIds);
    if(end1.nextElementSibling!==course2)end1.insertAdjacentElement('afterend',course2);
    const end2=placeAfter(course2,secondIds);
    placeAfter(end2,sharedIds);
    applying=false;
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
  }

  let pending=false;
  function queueApply(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{pending=false;apply()});
  }

  apply();
  if('MutationObserver'in window)new MutationObserver(queueApply).observe(main,{childList:true});
  $('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
