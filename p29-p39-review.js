(function installP29P39Review(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const text=(el,cn,en)=>{if(el)el.textContent=zh()?cn:en};

  function setHeader(section,no,kicker,cnTitle,enTitle){
    if(!section)return;
    text($('.section-no',section),no,no);
    text($('.story-kicker',section),kicker[0],kicker[1]);
    text($('.story-copy h2',section)||section.querySelector('h2'),cnTitle,enTitle);
    section.querySelector('.story-copy .lead')?.remove();
  }

  function removeRedundantScreens(){
    document.getElementById('data-split')?.remove();
    document.getElementById('generalization-curves')?.remove();
    document.getElementById('unseen-vocabulary')?.remove();
  }

  // P29 — connect one update to Batch / Epoch.
  function applyP29(){
    const s=document.getElementById('batch-epoch-screen');
    if(!s)return;
    setHeader(s,'02D / 小批次',['从一次更新到一轮训练','FROM ONE UPDATE TO ONE EPOCH'],'一轮 Epoch 里会发生多少次参数更新','How many parameter updates happen in one epoch');

    $$('.batch-card',s).forEach((card,i)=>{
      const strong=card.querySelector('strong');
      const span=card.querySelector('span');
      text(strong,`第 ${i+1} 批`,`Batch ${i+1}`);
      text(span,'50 个样本 → 更新 1 次','50 samples → 1 update');
    });
    const statLabels=$$('.batch-stat small',s);
    text(statLabels[0],'当前批次','CURRENT BATCH');
    text(statLabels[1],'参数更新次数','PARAMETER UPDATES');
    text($('.batch-next',s),'下一批 →','Next batch →');
    text($('.batch-reset',s),'重置','Reset');

    const renderExplain=()=>{
      const step=Number(($('.update-now',s)?.textContent||'0').trim())||0;
      const p=$('.batch-explain',s);
      if(!p)return;
      if(zh()){
        if(step===0)p.textContent='上一页每点一次“训练一步”，就是一次参数更新。现在把 350 个训练样本分成 7 批：每处理 1 批更新 1 次参数，7 批全部走完，才大致完成 1 个 Epoch。';
        else if(step<7)p.textContent=`已经处理 ${step} 批，也完成了 ${step} 次参数更新。还要继续处理剩余批次，才算把这 350 个训练样本大致完整走一遍。`;
        else p.textContent='7 批全部处理完成：350 个训练样本大致完整遍历一次，这就是 1 个 Epoch；这一轮里一共发生了 7 次参数更新。';
      }else{
        if(step===0)p.textContent='One “training step” on the previous page was one parameter update. Here 350 training samples are divided into 7 batches: one update per batch, and all 7 batches make roughly one epoch.';
        else if(step<7)p.textContent=`${step} batches and ${step} parameter updates are complete. Continue through the remaining batches to traverse the 350 training samples roughly once.`;
        else p.textContent='All 7 batches are complete: the 350 training samples have been traversed roughly once, giving 1 epoch and 7 parameter updates.';
      }
    };
    if(!s.dataset.p29Bound){
      s.dataset.p29Bound='1';
      $('.batch-next',s)?.addEventListener('click',()=>setTimeout(renderExplain,0));
      $('.batch-reset',s)?.addEventListener('click',()=>setTimeout(renderExplain,0));
    }
    renderExplain();
  }

  // P30 + P31 — meaning of splitting + one 100-sample visualization.
  const splitOrder=Array.from({length:100},(_,i)=>(i*37)%100);
  function ensureP30(){
    const s=document.getElementById('holdout-screen');
    if(!s)return null;
    let lab=s.querySelector('.p30-merged-split');
    if(!lab){
      s.querySelector('.holdout-lab')?.remove();
      lab=document.createElement('div');
      lab.className='p30-merged-split story-reveal';
      lab.innerHTML=`
        <div class="p30-plan-tabs">
          <button type="button" class="p30-plan active" data-mode="all"><strong></strong><span></span></button>
          <button type="button" class="p30-plan" data-mode="split"><strong></strong><span></span></button>
        </div>
        <div class="p30-board-panel">
          <div class="p30-plan-copy"><strong></strong><p></p></div>
          <div class="p30-board" aria-label="100 samples"></div>
          <div class="p30-legend">
            <span><i class="train"></i><b class="train-label"></b><em class="train-count">100</em></span>
            <span><i class="val"></i><b class="val-label"></b><em class="val-count">0</em></span>
            <span><i class="test"></i><b class="test-label"></b><em class="test-count">0</em></span>
          </div>
          <div class="p30-conclusion"></div>
        </div>`;
      s.appendChild(lab);
      const board=$('.p30-board',lab);
      for(let i=0;i<100;i++){
        const dot=document.createElement('i');
        dot.className='p30-dot train';
        dot.style.setProperty('--delay',`${(i%10)*10+Math.floor(i/10)*7}ms`);
        board.appendChild(dot);
      }
      $$('.p30-plan',lab).forEach(b=>b.addEventListener('click',()=>renderP30(b.dataset.mode,true)));
    }
    return s;
  }
  function renderP30(mode,animate=false){
    const s=document.getElementById('holdout-screen');
    const lab=s?.querySelector('.p30-merged-split');
    if(!lab)return;
    s.dataset.p30Mode=mode;
    const plans=$$('.p30-plan',lab);
    plans.forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
    text(plans[0]?.querySelector('strong'),'方案 A · 全部用于训练','Plan A · train on everything');
    text(plans[0]?.querySelector('span'),'100 个样本全部进入训练集','All 100 samples enter training');
    text(plans[1]?.querySelector('strong'),'方案 B · 8 : 1 : 1 划分','Plan B · 8 : 1 : 1 split');
    text(plans[1]?.querySelector('span'),'训练集 80 · 验证集 10 · 测试集 10','Train 80 · validation 10 · test 10');
    text($('.train-label',lab),'训练集','Train');
    text($('.val-label',lab),'验证集','Validation');
    text($('.test-label',lab),'测试集','Test');

    const dots=$$('.p30-dot',lab);
    dots.forEach(d=>{d.classList.remove('train','val','test','pop');d.classList.add('train')});
    if(mode==='split'){
      splitOrder.forEach((idx,pos)=>{
        const d=dots[idx];
        d.classList.remove('train');
        d.classList.add(pos<80?'train':pos<90?'val':'test');
        if(animate)d.classList.add('pop');
      });
      $('.train-count',lab).textContent='80';$('.val-count',lab).textContent='10';$('.test-count',lab).textContent='10';
      text($('.p30-plan-copy strong',lab),'让不同数据承担不同职责','Give different data different roles');
      text($('.p30-plan-copy p',lab),'训练集用来学习参数；验证集用来选择模型和超参数；测试集尽量留到最后，只做一次独立检查。','Training learns parameters; validation guides model and hyperparameter choices; the test set is kept for the final independent check.');
      text($('.p30-conclusion',lab),'这样才能回答：模型面对没有参与训练和调参的新数据时，还能不能工作','This lets us ask whether the model still works on data that did not participate in fitting or tuning');
    }else{
      $('.train-count',lab).textContent='100';$('.val-count',lab).textContent='0';$('.test-count',lab).textContent='0';
      text($('.p30-plan-copy strong',lab),'全部训练，看起来数据利用率最高','Using everything for training looks efficient');
      text($('.p30-plan-copy p',lab),'但如果最后还在这 100 个样本上打分，我们只知道模型对“做过的题”表现怎样，无法得到独立的泛化证据。','But scoring on the same 100 samples only shows performance on questions already used for training; it gives no independent generalization evidence.');
      text($('.p30-conclusion',lab),'问题：没有独立验证集和测试集，就无法可靠判断模型对真正新样本的表现','Problem: without held-out validation and test data, we cannot reliably assess genuinely new samples');
    }
  }
  function applyP30(){
    const s=ensureP30();if(!s)return;
    setHeader(s,'02E / 数据划分',['为什么必须留出数据','WHY HOLD OUT DATA'],'为什么训练数据还要分成训练集、验证集和测试集','Why split data into training, validation, and test sets');
    renderP30(s.dataset.p30Mode||'all',false);
  }

  // P32 + P33 — keep one fitting visualization and explain under/overfitting.
  function applyP32(){
    const s=document.getElementById('play');if(!s)return;
    const no=s.querySelector('.section-no');if(no)no.textContent='02F / 泛化';
    const title=s.querySelector('h2');text(title,'欠拟合和过拟合，差别到底在哪里','What is the difference between underfitting and overfitting');
    s.querySelector('.lead')?.remove();
    s.querySelector('.hand')?.remove();
    if(!s.querySelector('.p32-kicker')){
      const k=document.createElement('div');k.className='story-kicker p32-kicker';title?.insertAdjacentElement('beforebegin',k);
    }
    text(s.querySelector('.p32-kicker'),'模型不只要拟合训练数据，还要对留出数据有效','A model must work beyond its training data');

    const pg=s.querySelector('.compact-playground');
    if(pg){
      const label=pg.querySelector('label span');text(label,'模型复杂度','Model complexity');
      const metrics=pg.querySelector('.metrics');
      if(metrics&&!metrics.dataset.p32Ready){
        const deg=s.querySelector('#degree')?.value||'2';
        metrics.innerHTML=`<span class="p32-degree">${zh()?'模型复杂度':'Model complexity'} <strong id="degree-value">${deg}</strong></span><span id="fit-status"></span>`;
        metrics.dataset.p32Ready='1';
      }else if(metrics){
        const labelEl=metrics.querySelector('.p32-degree');
        if(labelEl)labelEl.childNodes[0].nodeValue=(zh()?'模型复杂度 ':'Model complexity ');
      }
      if(!pg.querySelector('.p32-fit-legend')){
        const legend=document.createElement('div');legend.className='p32-fit-legend';
        legend.innerHTML='<span><i class="train"></i><b></b></span><span><i class="heldout"></i><b></b></span><span><i class="curve"></i><b></b></span>';
        pg.appendChild(legend);
      }
      const legend=pg.querySelector('.p32-fit-legend');
      const lbs=$$('b',legend);text(lbs[0],'训练样本','Training samples');text(lbs[1],'留出样本','Held-out samples');text(lbs[2],'当前模型','Current model');
    }

    if(!s.querySelector('.p32-fit-explain')){
      const box=document.createElement('div');box.className='p32-fit-explain';
      box.innerHTML='<article data-state="under"><strong></strong><p></p><b></b></article><article data-state="good"><strong></strong><p></p><b></b></article><article data-state="over"><strong></strong><p></p><b></b></article>';
      pg?.insertAdjacentElement('afterend',box);
    }
    const cards=$$('.p32-fit-explain article',s);
    const content=zh()?[
      ['欠拟合','模型太简单、表示信息不足或训练不充分，连训练数据里的主要规律都没有学好。','处理：增加有效表示或模型能力，并确认训练充分'],
      ['较合适','模型能拟合训练数据，同时在留出数据上也保持相近表现，说明学到的规律更可能迁移。','目标：训练误差合理，留出误差也低且差距不过大'],
      ['过拟合','模型对训练数据越来越好，但对留出数据反而变差。常见于模型过于灵活、数据太少或训练过久。','处理：更多数据、降低复杂度、正则化或早停']
    ]:[
      ['Underfitting','The model is too simple, the representation lacks useful information, or training is insufficient, so even the main training patterns are not learned.','Fix: improve the representation or model capacity and train sufficiently'],
      ['Reasonable fit','Training performance is good and held-out performance remains similar, suggesting that the learned pattern transfers.','Goal: low held-out error without a large train–held-out gap'],
      ['Overfitting','Training performance keeps improving while held-out performance worsens. Common causes include excess flexibility, too little data, or training too long.','Fix: more data, lower complexity, regularization, or early stopping']
    ];
    cards.forEach((c,i)=>{c.querySelector('strong').textContent=content[i][0];c.querySelector('p').textContent=content[i][1];c.querySelector('b').textContent=content[i][2]});

    const update=()=>{
      const deg=Number(s.querySelector('#degree')?.value||2);
      const state=deg<=1?'under':deg<=4?'good':'over';
      cards.forEach(c=>c.classList.toggle('active',c.dataset.state===state));
      const status=s.querySelector('#fit-status');
      if(zh())status.textContent=state==='under'?'当前：欠拟合':state==='good'?'当前：泛化较好':'当前：过拟合风险';
      else status.textContent=state==='under'?'Current: underfitting':state==='good'?'Current: reasonable generalization':'Current: overfitting risk';
    };
    if(!s.dataset.p32Bound){s.dataset.p32Bound='1';s.querySelector('#degree')?.addEventListener('input',()=>setTimeout(update,0))}
    update();
  }

  // P34 + P35 — define “new data” through the split that simulates future use.
  const scenarioCopy={
    random:{cn:['随机划分','未来样本与现有数据分布相近','回答：来自相似总体的新样本能不能预测？','适合常规插值式评估；但相似分子可能同时出现在训练集和测试集。'],en:['Random split','Future samples resemble the current sampled population','Question: can we predict new samples from a similar population?','Useful for interpolation-like evaluation, but close analogues may appear in both train and test.']},
    scaffold:{cn:['骨架 / 系列划分','检验能否跨结构家族','回答：遇到训练中没有覆盖的新骨架或新系列时还能不能预测？','把同一骨架或系列成组留出，更适合新骨架发现或跨系列迁移。'],en:['Scaffold / series split','Test transfer across structural families','Question: can the model handle scaffolds or series absent from training?','Hold structural families out as groups for scaffold discovery or cross-series transfer.']},
    time:{cn:['时间划分','用过去的数据预测未来','回答：用较早时期的数据开发模型，能不能预测后来真正产生的数据？','适合模拟前瞻使用，也会同时包含项目方向、实验条件和测量流程随时间变化带来的偏移。'],en:['Time split','Use past data to predict future data','Question: can a model developed on earlier data predict data generated later?','Useful for prospective evaluation and naturally includes temporal changes in projects, conditions, and measurement workflows.']},
    external:{cn:['外部测试','检验跨实验室或数据来源迁移','回答：换一个实验室、数据库或测量流程后，模型还能不能工作？','适合检验来源变化；前提是目标定义、单位和实验条件具有可比性。'],en:['External test','Test transfer across labs or data sources','Question: does the model still work for another lab, database, or measurement workflow?','Useful for source shift, provided targets, units, and conditions are comparable.']}
  };
  function renderScenario(key){
    const s=document.getElementById('split-scenarios');if(!s)return;
    const d=scenarioCopy[key]||scenarioCopy.random;
    const v=zh()?d.cn:d.en;
    const stage=s.querySelector('.scenario-stage');
    if(!stage)return;
    stage.querySelector('h3').textContent=v[0];
    stage.querySelector('p').textContent=v[3];
    stage.querySelector('.scenario-badge').textContent=v[2];
  }
  function applyP34(){
    const s=document.getElementById('split-scenarios');if(!s)return;
    setHeader(s,'02G / 划分策略',['测试集应该模拟真正的未来数据','THE TEST SET SHOULD MATCH FUTURE USE'],'不同的科研目标，需要不同的数据划分方式','Different research goals require different data splits');
    if(!s.querySelector('.p34-split-rule')){
      const rule=document.createElement('div');rule.className='p34-split-rule';
      rule.textContent='';
      s.querySelector('.story-copy')?.insertAdjacentElement('afterend',rule);
    }
    text(s.querySelector('.p34-split-rule'),'上一页说明模型可能只在“熟悉的数据”上表现好。这一页要决定：测试集里的“新数据”到底应该新在哪里。划分方式不是越难越好，而是要和模型未来真正的使用场景一致。','The previous page showed that a model may only work on familiar data. Here we decide what “new” should mean in the test set. A split is useful when it matches intended future use, not merely when it is harder.');

    $$('.scenario-btn',s).forEach(b=>{
      const d=scenarioCopy[b.dataset.scenario];if(!d)return;const v=zh()?d.cn:d.en;
      b.innerHTML=`<strong>${v[0]}</strong><span>${v[1]}</span>`;
      if(!b.dataset.p34Bound){b.dataset.p34Bound='1';b.addEventListener('click',()=>setTimeout(()=>renderScenario(b.dataset.scenario),0))}
    });
    const stage=s.querySelector('.scenario-stage');
    if(stage&&!stage.querySelector('.p34-split-legend')){
      const legend=document.createElement('div');legend.className='p34-split-legend';
      legend.innerHTML='<span><i class="train"></i><b></b></span><span><i class="val"></i><b></b></span><span><i class="test"></i><b></b></span>';
      stage.insertBefore(legend,stage.querySelector('.scenario-viz'));
    }
    const legend=stage?.querySelector('.p34-split-legend');
    if(legend){const b=$$('b',legend);text(b[0],'训练集','Train');text(b[1],'验证集','Validation');text(b[2],'测试集','Test')}
    renderScenario(s.querySelector('.scenario-btn.active')?.dataset.scenario||'random');
  }

  // P36 — evaluation traps plus explicit fixes.
  const trapCases=[
    {cat:'leak',cn:['划分前用全体数据做标准化','测试集的分布信息提前进入了预处理，最终评估不再独立。','先划分数据；只用训练集拟合标准化、特征选择等预处理，再把同一个变换应用到验证集和测试集。'],en:['Fit preprocessing on all data before splitting','Information from the test distribution leaks into preprocessing, so final evaluation is no longer independent.','Split first. Fit scaling, feature selection, and other preprocessing only on training data, then apply the same transform to validation and test.']},
    {cat:'depend',cn:['同一化合物的重复测量被分到不同集合','高度相关的重复测量跨越训练集和测试集，会让测试样本并不真正独立。','先按化合物、实验系列或其他依赖关系分组，再以组为单位划分，避免相关样本跨集合。'],en:['Repeated measurements of one compound are split apart','Strongly related measurements cross train and test, so test samples are not truly independent.','Group by compound, experimental series, or other dependency first, then split by groups.']},
    {cat:'weak',cn:['随机划分让近邻结构同时进入训练集和测试集','如果真正目标是发现新骨架，这种测试会偏容易；但如果未来就是预测相似分子，随机划分并不一定错。','先明确未来场景；新骨架任务用骨架/系列分组划分，相似总体预测可以保留随机划分。'],en:['Random split puts close analogues in both train and test','If the real goal is new-scaffold discovery, the test is too easy; for future samples from a similar population, random splitting may still be appropriate.','Match the split to intended use: use scaffold/series grouping for new-scaffold tasks and random splitting for similar-population prediction.']},
    {cat:'leak',cn:['看完测试集结果后继续调整模型','测试集一旦参与调参、选模型或选报告方式，就不再是独立的最终评估。','测试集只在开发方案固定后使用；如果已经根据测试结果改过模型，就需要重新保留一个新的独立测试集。'],en:['Tune the model after looking at test results','Once test feedback changes tuning, model choice, or reporting, the test set is no longer an independent final evaluation.','Use test only after development choices are fixed. If it already influenced the model, reserve a new independent test set.']}
  ];
  function renderTrap(i){
    const s=document.getElementById('evaluation-traps');if(!s)return;
    const c=trapCases[i]||trapCases[0],v=zh()?c.cn:c.en;
    const panel=s.querySelector('.trap-panel');if(!panel)return;
    panel.querySelector('h3').textContent=v[0];
    panel.querySelector('p').textContent=v[1];
    let fix=panel.querySelector('.p36-fix');
    if(!fix){fix=document.createElement('div');fix.className='p36-fix';panel.querySelector('p')?.insertAdjacentElement('afterend',fix)}
    fix.innerHTML=`<strong>${zh()?'怎么处理':'How to fix it'}</strong><span>${v[2]}</span>`;
    $$('.trap-category',panel).forEach(x=>x.classList.toggle('active',x.dataset.cat===c.cat));
  }
  function applyP36(){
    const s=document.getElementById('evaluation-traps');if(!s)return;
    setHeader(s,'02H / 评估检查',['数据分好以后，还要检查评估流程','AUDIT THE EVALUATION PIPELINE'],'数据已经分好，还要避免这些评估问题','After splitting the data, avoid these evaluation problems');
    const buttons=$$('.trap-card',s);
    buttons.forEach((b,i)=>{
      const c=trapCases[i],v=zh()?c.cn:c.en;
      b.innerHTML=`<small>${zh()?`情况 ${i+1}`:`CASE ${i+1}`}</small><strong>${v[0]}</strong><span>${v[1]}</span>`;
      if(!b.dataset.p36Bound){b.dataset.p36Bound='1';b.addEventListener('click',()=>setTimeout(()=>renderTrap(i),0))}
    });
    const cats=$$('.trap-category',s);
    text(cats[0],'信息泄漏 / 污染','Leakage / contamination');
    text(cats[1],'样本不独立 / 分组问题','Dependence / grouping');
    text(cats[2],'划分与科研目标不匹配','Split mismatched to intended use');
    const active=Math.max(0,buttons.findIndex(b=>b.classList.contains('active')));
    renderTrap(active);
  }

  // P37 — metrics only after the split and evaluation protocol are sound.
  function applyP37(){
    const s=document.getElementById('metric-lab-screen');if(!s)return;
    setHeader(s,'02I / 指标',['划分正确以后，才轮到看分数','METRICS COME AFTER A SOUND SPLIT'],'数据划分好了，接下来怎么评价预测误差','Once the split is sound, how should prediction error be measured');
    const label=s.querySelector('.metric-panel label strong');
    text(label,'调大最后一个样本的绝对误差','Increase the absolute error of the final sample');
    s.querySelector('.metric-plot .story-note')?.remove();
    const formulas=$$('.metric-formula-card',s);
    if(formulas[0]){text(formulas[0].querySelector('small'),'MAE · 平均绝对误差','MAE · Mean Absolute Error');text(formulas[0].querySelector('p'),'把每个样本的绝对误差取平均，数值和目标变量保持同一单位。','Average the absolute error across samples; the result stays in the target variable’s units.')}
    if(formulas[1]){text(formulas[1].querySelector('small'),'RMSE · 均方根误差','RMSE · Root Mean Squared Error');text(formulas[1].querySelector('p'),'误差先平方再平均、最后开根号，因此少数大误差会被更明显地放大。','Square errors, average them, then take the square root, so a few large errors have more influence.')}
    text(s.querySelector('.metric-symbol-note'),'yᵢ = 实测值，ŷᵢ = 预测值，n = 样本数','yᵢ = observed value, ŷᵢ = prediction, n = number of samples');
  }

  // P38 — R² follows MAE/RMSE as a baseline-relative view.
  function applyP38(){
    const s=document.getElementById('r2-baseline-screen');if(!s)return;
    setHeader(s,'02J / R²',['误差之外，再和简单基线比较','COMPARE AGAINST A SIMPLE BASELINE'],'R² 回答的是模型比均值基线好多少','R² asks how much better the model is than the mean baseline');
    const subs=$$('.r2-svg .gen-curve-sub',s);
    text(subs[0],'理想线 y = ŷ','ideal y = ŷ');
    text(subs[1],'均值基线','mean baseline');
    text(subs[2],'实测值 y →','observed y →');
    text(subs[3],'预测值 ŷ →','predicted ŷ →');
    const zhSpan=s.querySelector('.r2-panel label .story-zh'),enSpan=s.querySelector('.r2-panel label .story-en');
    if(zhSpan)zhSpan.textContent='拖动预测结果，比较模型与均值基线';
    if(enSpan)enSpan.textContent='Move the predictions and compare the model with the mean baseline';
    const smalls=$$('.r2-value small',s);
    text(smalls[0],'模型 MSE / 均值基线 MSE','Model MSE / mean-baseline MSE');
    text(smalls[1],'R²','R²');
    const box=s.querySelector('.r2-formula-box');
    if(box){text(box.querySelector('small'),'R² · 决定系数','R² · coefficient of determination');text(box.querySelector('p'),'分子是模型残差平方和，分母是始终预测样本均值时的平方误差。R² = 1 最好，接近 0 表示与均值基线相近，小于 0 表示比均值基线还差。','The numerator is model residual sum of squares; the denominator is the squared error from always predicting the sample mean. R² = 1 is ideal, near 0 is similar to the mean baseline, and below 0 is worse.')}
  }

  // P39 — applicability: aggregate metrics do not guarantee every single prediction.
  function renderTrust(){
    const s=document.getElementById('trust-zone-screen');if(!s)return;
    const d=Number(s.querySelector('.trust-distance')?.textContent||0);
    const state=d<12?'near':d<25?'border':'far';
    const label=s.querySelector('.trust-label'),status=s.querySelector('.trust-status'),action=s.querySelector('.p39-action');
    if(zh()){
      label.textContent=state==='near'?'已有数据附近':state==='border'?'接近覆盖边界':'明显外推';
      status.textContent=state==='near'?'候选靠近已有数据覆盖区，模型对这类样本相对更熟悉，但仍不代表一定准确。':state==='border'?'候选接近已有数据覆盖边界，整体测试集指标已经不能充分说明这个点是否可靠。':'候选明显远离已有数据覆盖区，这个预测属于更强的外推，风险显著增加。';
      action.innerHTML=`<strong>怎么处理</strong><span>${state==='near'?'检查相似验证样本的实际误差和不确定性，再把预测作为常规参考。':state==='border'?'检查近邻样本、误差分布和模型稳定性；重要候选应增加计算或实验验证。':'不要直接把点预测当成可靠答案；优先补充这一化学区域的数据，或先用高精度计算 / 实验验证，再决定是否重新训练模型。'}</span>`;
    }else{
      label.textContent=state==='near'?'NEAR COVERED DATA':state==='border'?'COVERAGE EDGE':'STRONG EXTRAPOLATION';
      status.textContent=state==='near'?'The candidate is near covered data. This is more familiar, but not guaranteed to be accurate.':state==='border'?'The candidate approaches the edge of data coverage, where aggregate test metrics say less about this individual prediction.':'The candidate is far from covered data, making the prediction a stronger extrapolation with higher risk.';
      action.innerHTML=`<strong>What to do</strong><span>${state==='near'?'Check errors and uncertainty on similar validation examples, then use the prediction as ordinary evidence.':state==='border'?'Inspect neighbours, error distributions, and model stability; validate important candidates with additional computation or experiment.':'Do not treat the point prediction as a reliable answer. Add data in this region or validate with high-fidelity computation / experiment before retraining or acting.'}</span>`;
    }
  }
  function applyP39(){
    const s=document.getElementById('trust-zone-screen');if(!s)return;
    setHeader(s,'02K / 适用范围',['整体指标不错，不等于每个候选都可靠','GOOD AGGREGATE METRICS DO NOT GUARANTEE EVERY PREDICTION'],'模型整体表现不错，这个新样本还能直接信吗','The model looks good overall, but can we trust this new sample');
    const zhSpan=s.querySelector('.trust-panel label .story-zh'),enSpan=s.querySelector('.trust-panel label .story-en');
    if(zhSpan)zhSpan.textContent='拖动候选样本，观察它与已有数据覆盖区的关系';
    if(enSpan)enSpan.textContent='Move the candidate and compare it with covered data regions';
    const labels=$$('.trust-stat small',s);
    text(labels[0],'最近数据距离（示意）','Nearest-data distance (schematic)');
    text(labels[1],'位置状态','Coverage status');
    s.querySelector('.trust-caution')?.remove();
    const panel=s.querySelector('.trust-panel');
    if(panel&&!panel.querySelector('.p39-action')){
      const action=document.createElement('div');action.className='p39-action';panel.appendChild(action);
    }
    const stage=s.querySelector('.trust-stage');
    if(stage&&!stage.querySelector('.p39-legend')){
      const legend=document.createElement('div');legend.className='p39-legend';legend.innerHTML='<span><i class="data"></i><b></b></span><span><i class="query"></i><b></b></span>';stage.appendChild(legend);
    }
    const legend=stage?.querySelector('.p39-legend');
    if(legend){const bs=$$('b',legend);text(bs[0],'已有训练 / 验证数据','Existing train / validation data');text(bs[1],'当前候选','Current candidate')}
    if(!s.dataset.p39Bound){s.dataset.p39Bound='1';s.querySelector('.trust-slider')?.addEventListener('input',()=>setTimeout(renderTrust,0))}
    renderTrust();
  }

  function apply(){
    removeRedundantScreens();
    applyP29();applyP30();applyP32();applyP34();applyP36();applyP37();applyP38();applyP39();
    window.dispatchEvent(new Event('resize'));
  }

  apply();
  [160,520,1100,1900,3000,4300].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,150));
})();
