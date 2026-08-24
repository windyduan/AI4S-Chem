(function enforceCourseOrder(){
  const $=q=>document.querySelector(q);
  const main=$('main'); if(!main)return;
  const zh=()=>document.documentElement.lang!=='en';
  function divider(id,course,titleZh,titleEn,leadZh,leadEn,stepsZh,stepsEn){
    let s=$('#'+id);if(!s){s=document.createElement('section');s.id=id;s.className='section snap-section course-divider';main.appendChild(s)}
    const steps=zh()?stepsZh:stepsEn;s.innerHTML=`<div class="course-divider-copy"><small>${course}</small><h2>${zh()?titleZh:titleEn}</h2><p>${zh()?leadZh:leadEn}</p><span class="course-divider-tag">${zh()?'面向化学新生 · 先建立心智模型':'Chemistry-first · build the mental model first'}</span></div><aside class="course-divider-map"><strong>${zh()?'这一门课回答':'This course answers'}</strong><ol>${steps.map(x=>`<li>${x}</li>`).join('')}</ol></aside>`;return s
  }
  const course1=divider('course-1-divider','COURSE 01','人工智能技术入门','Introduction to Artificial Intelligence','先建立一张“化学研究者够用”的 AI 地图：模型能处理什么输入、现代方法为什么需要图和三维几何、这些能力怎样进入真实化学问题。','Build a chemistry-useful map of AI: what models receive, why graphs and 3D geometry matter, and how these capabilities enter real chemical problems.',['AI / ML / DL 到底是什么关系？','分子怎样变成 representation？','GNN、3D、multimodal、Agent 分别解决什么问题？','真实 AI×Chemistry 工作怎样从问题走到可验证结果？'],['How do AI, ML and DL relate?','How does chemistry become a representation?','What do GNNs, 3D models, multimodality and agents actually do?','How do real AI×Chemistry projects go from question to verifiable output?']);
  const course2=divider('course-2-divider','COURSE 02','AI 模型训练','AI Model Training','第二门课把“模型会做什么”进一步拆开：预测怎样产生、Loss 怎样驱动参数更新，以及我们怎样知道模型不是只记住训练数据。','The second course opens the training black box: how predictions are produced, how loss drives parameter updates, and how we know the model did more than memorize training data.',['ŷ = f(x; θ) 里每个符号是谁？','Prediction → Loss → Update 怎样循环？','Learning rate、batch、epoch 控制什么？','Train / Validation / Test 怎样支持可信泛化？','化学数据为什么需要任务匹配的 split 与评估？'],['Who is who in ŷ = f(x; θ)?','How does Prediction → Loss → Update repeat?','What do learning rate, batch and epoch control?','How do Train / Validation / Test support credible generalization?','Why must chemical splits and metrics match intended use?']);

  const firstIds=['course-lens','molecule-501','learn','role-map-screen','represent','rep-vs-model','gnn-story','symmetry-story','capability-map-screen','chemistry','chem-task-map-screen','discovery-story','case-nmrnet','case-elyte','case-catkg','case-nose','case-unixas','case-electroplating','now','research','review-shelf-screen'];
  const secondIds=['equation-screen','prediction-loss-screen','train','training-playground-screen','batch-epoch-screen','holdout-screen','data-split','play','generalization-curves','unseen-vocabulary','split-scenarios','evaluation-traps','metric-lab-screen','r2-baseline-screen','trust-zone-screen','generalization-review','generalization-checkpoint'];
  const sharedIds=['explore','group','finish'];
  function moveAfter(anchor,ids){let cursor=anchor;ids.forEach(id=>{const el=$('#'+id);if(el){cursor.insertAdjacentElement('afterend',el);cursor=el}});return cursor}
  function apply(){
    const home=$('#home');if(!home)return;
    home.insertAdjacentElement('afterend',course1);let end1=moveAfter(course1,firstIds);end1.insertAdjacentElement('afterend',course2);let end2=moveAfter(course2,secondIds);moveAfter(end2,sharedIds);
    const c1last=$('#review-shelf-screen')||$('#research')||$('#now');if(c1last&&!c1last.querySelector('.course-bridge')){const b=document.createElement('div');b.className='course-bridge';b.innerHTML=zh()?'<strong>第一门课到这里先收住：</strong>我们已经知道 AI 可以怎样表示、预测、模拟和组织科研工作流。下一门课开始追问更基础也更关键的问题：这些模型究竟是怎样训练出来的，以及结果为什么值得相信？':'<strong>End of Course 01:</strong> we now know how AI can represent, predict, simulate and orchestrate research workflows. Course 02 asks the deeper question: how are these models trained, and why should we trust the result?';c1last.appendChild(b)}
    window.dispatchEvent(new Event('resize'));window.dispatchEvent(new Event('scroll'));
  }
  // Dynamic case/review screens load asynchronously. Re-apply order a few times; moving nodes is idempotent.
  [120,650,1400,2600].forEach(ms=>setTimeout(apply,ms));apply();
  $('#lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{course1.remove();course2.remove();document.querySelectorAll('.course-bridge').forEach(x=>x.remove());enforceCourseOrder?.();},0));
})();
