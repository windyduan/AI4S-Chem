(function installP26P27Merge(){
  const zh=()=>document.documentElement.lang!=='en';
  const train=document.getElementById('train');
  if(!train)return;

  const stageCopy={
    data:{zh:['数据','取一批 (x, y)。x 是模型输入，真实目标 y 留给后面计算误差。'],en:['Data','Take a batch of (x, y). x is the model input; target y is kept for the later error calculation.']},
    prediction:{zh:['预测','用当前参数 θ 计算预测值 ŷ = f(x; θ)。'],en:['Prediction','Use the current parameters θ to compute ŷ = f(x; θ).']},
    loss:{zh:['Loss','比较预测 ŷ 和真实目标 y，把差异变成训练要最小化的 Loss。'],en:['Loss','Compare prediction ŷ with target y and turn the difference into the loss minimized during training.']},
    update:{zh:['更新','优化算法根据 Loss 调整参数 θ，然后进入下一轮预测。'],en:['Update','The optimizer adjusts θ using the loss, then the next prediction round begins.']}
  };

  function localizeLoop(){
    const stages=[...train.querySelectorAll('.train-stage')];
    stages.forEach(stage=>{
      const key=stage.dataset.stage;
      const copy=stageCopy[key];
      if(copy)stage.textContent=zh()?copy.zh[0]:copy.en[0];
      if(stage.dataset.p27Bound!=='1'){
        stage.dataset.p27Bound='1';
        stage.addEventListener('click',()=>setTimeout(localizeLoop,0));
      }
    });
    const active=train.querySelector('.train-stage.active')?.dataset.stage||'data';
    const note=train.querySelector('.train-stage-note');
    const copy=stageCopy[active];
    if(note&&copy){
      const pair=zh()?copy.zh:copy.en;
      note.innerHTML=`<strong>${pair[0]}</strong> · ${pair[1]}`;
    }
  }

  function ensureDemo(){
    let demo=train.querySelector('.p27-error-demo');
    if(!demo){
      demo=document.createElement('div');
      demo.className='p27-error-demo';
      demo.innerHTML=`
        <div class="p27-demo-head">
          <strong class="p27-demo-title"></strong>
          <label class="p27-slider-label"><span></span><output>−1.8</output><input type="range" min="-4.5" max="-0.5" step="0.1" value="-1.8"></label>
        </div>
        <div class="p27-axis">
          <div class="p27-axis-line"></div>
          <div class="p27-gap"></div>
          <div class="p27-gap-label"></div>
          <div class="p27-marker target"><b></b><i></i></div>
          <div class="p27-marker prediction"><b></b><i></i></div>
        </div>`;
      (train.querySelector('.train-stage-note')||train.querySelector('#training-loop'))?.insertAdjacentElement('afterend',demo);
      demo.querySelector('input')?.addEventListener('input',renderDemo);
    }
    return demo;
  }

  function renderDemo(){
    const demo=ensureDemo();
    const slider=demo.querySelector('input');
    if(!slider)return;
    const target=-3.0;
    const prediction=Number(slider.value);
    const error=Math.abs(prediction-target);
    const map=v=>(v+4.5)/4*100;
    const tp=map(target),pp=map(prediction);
    const left=Math.min(tp,pp),right=Math.max(tp,pp);

    const targetMarker=demo.querySelector('.p27-marker.target');
    const predictionMarker=demo.querySelector('.p27-marker.prediction');
    const gap=demo.querySelector('.p27-gap');
    const gapLabel=demo.querySelector('.p27-gap-label');
    targetMarker.style.left=`${tp}%`;
    predictionMarker.style.left=`${pp}%`;
    gap.style.left=`${left}%`;
    gap.style.width=`${right-left}%`;
    gapLabel.style.left=`${(left+right)/2}%`;

    demo.querySelector('output').textContent=prediction.toFixed(1).replace('-', '−');
    demo.querySelector('.p27-demo-title').textContent=zh()?'拖动预测值，观察预测与真实值之间的误差':'Move the prediction and watch the error change';
    demo.querySelector('.p27-slider-label span').textContent=zh()?'模型预测 ŷ':'Prediction ŷ';
    targetMarker.querySelector('b').textContent=zh()?'真实目标 y = −3.0':'Target y = −3.0';
    predictionMarker.querySelector('b').textContent=(zh()?'模型预测 ŷ = ':'Prediction ŷ = ')+prediction.toFixed(1).replace('-', '−');
    gapLabel.textContent=(zh()?'差值 |ŷ − y| = ':'Difference |ŷ − y| = ')+error.toFixed(1);
  }

  function apply(){
    // P26 is now part of the training-loop page rather than a standalone slide.
    document.getElementById('prediction-loss-screen')?.remove();
    document.querySelectorAll('a[href="#prediction-loss-screen"]').forEach(el=>el.remove());

    const no=train.querySelector('.section-no');
    if(no)no.textContent='02B / TRAIN';

    // These three cards repeat material taught on later dedicated pages.
    train.querySelector('.mini-grid')?.remove();

    localizeLoop();
    renderDemo();
    window.dispatchEvent(new Event('resize'));
  }

  apply();
  [120,420,900,1600,2800,4200].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,140));
})();
