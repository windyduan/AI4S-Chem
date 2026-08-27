(function enforceCourseOrder(){
  const $=q=>document.querySelector(q);
  const main=$('main');if(!main)return;
  const zh=()=>document.documentElement.lang!=='en';
  const dividerData={
    course1:{id:'course-1-divider',course:'COURSE 01',titleZh:'人工智能技术入门',titleEn:'Introduction to Artificial Intelligence',leadZh:'先认识基本概念，再看这些方法怎样进入化学问题。',leadEn:'Start with the basic ideas, then see how they enter chemistry problems.',stepsZh:['AI、ML、DL 是什么关系？','分子怎样变成模型能处理的数据？','这些方法怎样进入真实化学问题？'],stepsEn:['How do AI, ML and DL relate?','How does a molecule become model-ready data?','How do these methods enter real chemistry problems?']},
    course2:{id:'course-2-divider',course:'COURSE 02',titleZh:'AI 模型训练',titleEn:'AI Model Training',leadZh:'接下来拆开一个模型到底是怎么训练出来的。',leadEn:'Next, open up how a model is trained.',stepsZh:['x、y、ŷ 和 θ 分别是什么？','Prediction → Loss → Update 怎样循环？','Learning rate、batch、epoch 控制什么？','为什么要分 Train / Validation / Test？','怎样判断模型是否能泛化？'],stepsEn:['What are x, y, ŷ and θ?','How does Prediction → Loss → Update repeat?','What do learning rate, batch and epoch control?','Why split Train / Validation / Test?','How do we judge generalization?']}
  };

  function ensureDivider(d){let s=$('#'+d.id);if(!s){s=document.createElement('section');s.id=d.id;s.className='section snap-section course-divider';main.appendChild(s)}return s}
  const course1=ensureDivider(dividerData.course1),course2=ensureDivider(dividerData.course2);

  function renderDivider(s,d,second=false){
    const steps=zh()?d.stepsZh:d.stepsEn;
    s.innerHTML=`<div class="course-divider-copy"><small>${zh()?d.course.replace('COURSE','课程'):d.course}</small><h2>${zh()?d.titleZh:d.titleEn}</h2><p>${zh()?d.leadZh:d.leadEn}</p><span class="course-divider-tag">${second?(zh()?'模型训练与评估':'Training and evaluation'):(zh()?'基本概念与化学应用':'Core ideas and chemistry applications')}</span></div><aside class="course-divider-map"><strong>${zh()?'这一部分包括':'This part covers'}</strong><ol>${steps.map(x=>`<li>${x}</li>`).join('')}</ol></aside>`;
  }

  function renderChrome(){
    const nav=document.querySelector('.topbar nav');
    if(nav)nav.innerHTML=zh()?'<a href="#course-1-divider">AI 入门</a><a href="#represent">化学</a><a href="#case-nmrnet">案例</a><a href="#course-2-divider">模型训练</a><a href="#play">泛化</a><a href="#explore">资源</a>':'<a href="#course-1-divider">AI Intro</a><a href="#represent">Chemistry</a><a href="#case-nmrnet">Cases</a><a href="#course-2-divider">Training</a><a href="#play">Generalization</a><a href="#explore">Resources</a>';
  }

  const firstIds=['course-lens','molecule-501','learn','role-map-screen','represent','rep-vs-model','gnn-story','symmetry-story','capability-map-screen','chemistry','case-nmrnet','case-elyte','case-catkg','case-nose','case-unixas','case-electroplating','research','now','review-shelf-screen'];
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
