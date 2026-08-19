(function installDataSplitPlayground(){
  const train=document.querySelector('#train');
  const play=document.querySelector('#play');
  if(!train||!play||document.querySelector('#data-split'))return;

  const section=document.createElement('section');
  section.id='data-split';
  section.className='section snap-section data-split-section';
  section.innerHTML=`
    <div class="section-no">03 / DATA SPLIT</div>
    <div class="split-heading">
      <div>
        <div class="eyebrow">PLAYGROUND · TRAIN / VALIDATION / TEST</div>
        <h2><span class="split-zh">别把所有数据都拿来训练。</span><span class="split-en">Don't use every sample for training.</span></h2>
        <p class="lead compact"><span class="split-zh">训练集用来学习，验证集帮助选择设置；测试集应该尽量留到最后，检查模型对真正未见数据的表现。</span><span class="split-en">Training data learns parameters, validation data helps choose settings, and the test set should stay untouched until the end.</span></p>
      </div>
      <div class="split-rule"><span class="split-zh">先调模型，最后才打开 Test。</span><span class="split-en">Tune first. Open Test last.</span></div>
    </div>

    <div class="split-lab">
      <div class="split-board-wrap">
        <div class="split-board" id="split-board" aria-label="100 dataset samples"></div>
        <div class="split-legend">
          <span><i class="legend-train"></i>Train <b id="train-count">70</b></span>
          <span><i class="legend-val"></i>Validation <b id="val-count">15</b></span>
          <span class="test-legend locked"><i class="legend-test"></i>Test <b id="test-count">15</b> <em>LOCKED</em></span>
        </div>
      </div>

      <aside class="split-controls">
        <div class="split-control-card">
          <label for="train-ratio"><span class="split-zh">Training Data</span><span class="split-en">Training Data</span> <strong id="train-ratio-value">70%</strong></label>
          <input id="train-ratio" type="range" min="55" max="80" value="70" step="5">
          <div class="ratio-track"><span>55%</span><span>80%</span></div>
        </div>

        <button id="split-dataset-btn" class="split-button primary-small" type="button"><span class="split-zh">Split Dataset</span><span class="split-en">Split Dataset</span></button>
        <button id="evaluate-test-btn" class="split-button" type="button" disabled><span class="split-zh">打开 Test Set</span><span class="split-en">Open Test Set</span></button>

        <div id="split-message" class="split-message">
          <strong>100 samples</strong>
          <span class="split-zh">现在它们还只是一个完整数据集。</span>
          <span class="split-en">Right now they are still one complete dataset.</span>
        </div>
      </aside>
    </div>
  `;
  train.insertAdjacentElement('afterend',section);

  const langSync=()=>{
    const zh=(document.documentElement.lang||'zh').startsWith('zh');
    section.classList.toggle('lang-zh',zh);
  };
  langSync();
  document.querySelector('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(langSync));

  // Renumber the course now that DATA SPLIT has its own complete teaching screen.
  const numbers={play:'04 / GENERALIZATION',represent:'05 / AI × CHEMISTRY',chemistry:'06 / CHEMISTRY',now:'07 / NOW',research:'08 / OUR RESEARCH',explore:'09 / RESOURCES',group:'10 / GROUP'};
  Object.entries(numbers).forEach(([id,text])=>{const n=document.querySelector(`#${id} .section-no`);if(n)n.textContent=text});

  const board=section.querySelector('#split-board');
  const ratio=section.querySelector('#train-ratio');
  const ratioValue=section.querySelector('#train-ratio-value');
  const trainCount=section.querySelector('#train-count');
  const valCount=section.querySelector('#val-count');
  const testCount=section.querySelector('#test-count');
  const splitBtn=section.querySelector('#split-dataset-btn');
  const testBtn=section.querySelector('#evaluate-test-btn');
  const message=section.querySelector('#split-message');
  const testLegend=section.querySelector('.test-legend');
  let splitDone=false,testOpen=false,order=[];

  const points=Array.from({length:100},(_,i)=>{
    const dot=document.createElement('button');
    dot.type='button';dot.className='data-dot';dot.setAttribute('aria-label',`sample ${i+1}`);
    dot.style.setProperty('--delay',`${(i%20)*7+Math.floor(i/20)*12}ms`);
    board.appendChild(dot);return dot;
  });

  function shuffled(){
    const a=Array.from({length:100},(_,i)=>i);
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
    return a;
  }

  function counts(){
    const tr=+ratio.value;
    const remaining=100-tr;
    const val=Math.round(remaining/2);
    const test=remaining-val;
    return {tr,val,test};
  }

  function updateCounts(){
    const c=counts();ratioValue.textContent=`${c.tr}%`;trainCount.textContent=c.tr;valCount.textContent=c.val;testCount.textContent=c.test;
    if(splitDone)applySplit(false);
  }

  function applySplit(animate=true){
    const c=counts();
    if(!order.length)order=shuffled();
    points.forEach(dot=>dot.classList.remove('train-dot','val-dot','test-dot','test-hidden','revealed'));
    order.forEach((idx,pos)=>{
      const dot=points[idx];
      if(pos<c.tr)dot.classList.add('train-dot');
      else if(pos<c.tr+c.val)dot.classList.add('val-dot');
      else dot.classList.add('test-dot',testOpen?'revealed':'test-hidden');
      if(animate)dot.classList.add('split-pop');
    });
    splitDone=true;
    testBtn.disabled=false;
    testBtn.classList.toggle('ready',!testOpen);
    testLegend.classList.toggle('locked',!testOpen);
    testLegend.classList.toggle('open',testOpen);
    message.innerHTML=testOpen
      ? `<strong>Test set opened.</strong><span class="split-zh">现在才用它做最终检查——不要再根据 Test 结果回头调模型。</span><span class="split-en">Use it for the final check now — don't tune the model again from test performance.</span>`
      : `<strong>Dataset split.</strong><span class="split-zh">Train 和 Validation 可以参与建模；Test 仍然锁住。</span><span class="split-en">Train and Validation can guide modeling; Test stays locked.</span>`;
    langSync();
  }

  function splitDataset(){
    order=shuffled();testOpen=false;applySplit(true);
  }

  function revealTest(){
    if(!splitDone)return;
    testOpen=true;
    points.filter(p=>p.classList.contains('test-dot')).forEach((dot,i)=>setTimeout(()=>{dot.classList.remove('test-hidden');dot.classList.add('revealed')},i*24));
    testBtn.classList.remove('ready');testBtn.disabled=true;
    testLegend.classList.remove('locked');testLegend.classList.add('open');
    message.innerHTML=`<strong>Test set opened.</strong><span class="split-zh">现在才用它做最终检查——不要再根据 Test 结果回头调模型。</span><span class="split-en">Use it for the final check now — don't tune the model again from test performance.</span>`;
    langSync();
  }

  ratio.addEventListener('input',updateCounts);
  splitBtn.addEventListener('click',splitDataset);
  testBtn.addEventListener('click',revealTest);
  updateCounts();

  // Enter animation for dynamically inserted screen.
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.28});
    observer.observe(section);
  }else section.classList.add('is-visible');
})();