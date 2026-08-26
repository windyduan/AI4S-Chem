(function installTrainLoopPage(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const train=$('#train');if(!train)return;

  if(!document.querySelector('link[data-train-loop-page]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='css/course/training/train-loop.css?v=20260826a';link.dataset.trainLoopPage='1';document.head.appendChild(link);
  }

  const stageCopy={
    data:{zh:['数据','取一批 (x, y)。x 是模型输入，真实目标 y 留给后面计算误差。'],en:['Data','Take a batch of (x, y). x is the model input; target y is kept for the later error calculation.']},
    prediction:{zh:['预测','用当前参数 θ 计算预测值 ŷ = f(x; θ)。'],en:['Prediction','Use the current parameters θ to compute ŷ = f(x; θ).']},
    loss:{zh:['Loss','比较预测 ŷ 和真实目标 y，把差异变成训练要最小化的 Loss。'],en:['Loss','Compare prediction ŷ with target y and turn the difference into the loss minimized during training.']},
    update:{zh:['更新','优化算法根据 Loss 调整参数 θ，然后进入下一轮预测。'],en:['Update','The optimizer adjusts θ using the loss, then the next prediction round begins.']}
  };

  function localizeLoop(){
    const stages=$$('.train-stage',train);
    stages.forEach(stage=>{
      const key=stage.dataset.stage,copy=stageCopy[key];
      if(copy)stage.textContent=(zh()?copy.zh:copy.en)[0];
      if(stage.dataset.trainLoopBound!=='1'){
        stage.dataset.trainLoopBound='1';
        stage.addEventListener('click',()=>requestAnimationFrame(localizeLoop));
      }
    });
    const active=$('.train-stage.active',train)?.dataset.stage||'data';
    const note=$('.train-stage-note',train),copy=stageCopy[active];
    if(note&&copy){const pair=zh()?copy.zh:copy.en;note.innerHTML=`<strong>${pair[0]}</strong> · ${pair[1]}`}
  }

  function ensureDemo(){
    let demo=$('.p27-error-demo',train);
    if(!demo){
      demo=document.createElement('div');demo.className='p27-error-demo';demo.innerHTML=`
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
      ($('.train-stage-note',train)||$('#training-loop',train))?.insertAdjacentElement('afterend',demo);
      $('input',demo)?.addEventListener('input',renderDemo);
    }
    return demo;
  }

  function renderDemo(){
    const demo=ensureDemo(),slider=$('input',demo);if(!slider)return;
    const target=-3.0,prediction=Number(slider.value),error=Math.abs(prediction-target),map=v=>(v+4.5)/4*100;
    const tp=map(target),pp=map(prediction),left=Math.min(tp,pp),right=Math.max(tp,pp);
    const targetMarker=$('.p27-marker.target',demo),predictionMarker=$('.p27-marker.prediction',demo),gap=$('.p27-gap',demo),gapLabel=$('.p27-gap-label',demo);
    targetMarker.style.left=`${tp}%`;predictionMarker.style.left=`${pp}%`;gap.style.left=`${left}%`;gap.style.width=`${right-left}%`;gapLabel.style.left=`${(left+right)/2}%`;
    $('output',demo).textContent=prediction.toFixed(1).replace('-', '−');
    $('.p27-demo-title',demo).textContent=zh()?'拖动预测值，直接看预测与真实值之间的距离':'Move the prediction and see its distance from the target';
    $('.p27-slider-label span',demo).textContent=zh()?'模型预测 ŷ':'Prediction ŷ';
    $('b',targetMarker).textContent=zh()?'真实目标 y = −3.0':'Target y = −3.0';
    $('b',predictionMarker).textContent=(zh()?'模型预测 ŷ = ':'Prediction ŷ = ')+prediction.toFixed(1).replace('-', '−');
    gapLabel.textContent=(zh()?'差值 |ŷ − y| = ':'Difference |ŷ − y| = ')+error.toFixed(1);
  }

  function apply(){
    $('#prediction-loss-screen')?.remove();
    document.querySelectorAll('a[href="#prediction-loss-screen"]').forEach(el=>el.remove());
    const no=$('.section-no',train);if(no)no.textContent='02B / TRAIN LOOP';
    const title=$('h2',train);if(title)title.textContent=zh()?'一个模型，到底是怎么“学会”的？':'How does a model actually learn?';
    train.querySelector('.mini-grid')?.remove();
    localizeLoop();renderDemo();window.dispatchEvent(new Event('resize'));
  }

  apply();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
