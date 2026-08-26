(function refineTrainingPlayground(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const section=$('#training-playground-screen');
  if(!section)return;

  let layoutLink=document.querySelector('link[data-p28-layout]');
  if(!layoutLink){
    layoutLink=document.createElement('link');
    layoutLink.rel='stylesheet';
    layoutLink.href='css/course/training/training-playground.css?v=20260826l';
    layoutLink.dataset.p28Layout='1';
    document.head.appendChild(layoutLink);
  }

  const title=$('.story-copy h2',section);
  const kicker=$('.story-kicker',section);
  const sectionNo=$('.section-no',section);
  function updateHeader(){
    if(sectionNo)sectionNo.textContent='02C / PLAYGROUND';
    if(kicker)kicker.textContent='GRADIENT DESCENT · LEARNING RATE';
    if(title)title.textContent=zh()?'模型参数，怎样一步步更新？':'How do model parameters update step by step?';
  }
  updateHeader();
  section.querySelector('.story-copy .lead')?.remove();

  const lab=$('.merged-training-lab',section);
  if(!lab)return;
  lab.classList.add('p28-refined');

  const head=$('.foundation-playground-head',section);
  const presets=head?.querySelector('.lr-presets');
  const readout=head?.querySelector('.lr-readout');
  const bottom=$('.trainer-bottom',lab);
  if(bottom&&!$('.p28-learning-rate',bottom)){
    const box=document.createElement('div');
    box.className='p28-learning-rate';
    box.innerHTML='<div class="p28-lr-head"><strong></strong><span class="p28-lr-hint"></span></div>';
    if(presets)box.appendChild(presets);
    if(readout)box.appendChild(readout);
    bottom.prepend(box);
  }
  head?.remove();

  const equation=$('.trainer-equation',lab);
  if(equation)equation.classList.add('course-math');
  const canvas=$('#train-canvas',lab);
  let plot=$('.p28-plot',lab);
  if(canvas&&!plot){
    plot=document.createElement('div');
    plot.className='p28-plot';
    canvas.replaceWith(plot);
    plot.innerHTML='<p class="p28-plot-note"></p>';
    plot.appendChild(canvas);
  }
  if(equation&&bottom&&!bottom.contains(equation))bottom.prepend(equation);
  $('.training-lab-head',lab)?.remove();

  let lossPanel=$('.p28-loss-panel',lab);
  if(plot&&!lossPanel){
    lossPanel=document.createElement('div');
    lossPanel.className='p28-loss-panel';
    lossPanel.innerHTML='<div class="p28-loss-head"><strong></strong><span><i></i> Loss · <b class="p28-loss-now">—</b></span></div><canvas id="loss-history-canvas" aria-label="training loss history"></canvas>';
    plot.appendChild(lossPanel);
  }
  const lossCanvas=$('#loss-history-canvas',lab);

  const plotNote=$('.p28-plot-note',lab);
  function updateCopy(){
    if(plotNote)plotNote.textContent=zh()?'上图看拟合线怎样靠近数据；下图看同一过程里的 Loss 怎样下降。':'Top: watch the fitted line move toward the data. Bottom: watch loss fall during the same updates.';
    const lossTitle=$('.p28-loss-head strong',lab);
    if(lossTitle)lossTitle.textContent=zh()?'训练曲线':'TRAINING CURVE';
  }
  updateCopy();

  const lrHead=$('.p28-lr-head strong',lab);
  const hint=$('.p28-lr-hint',lab);
  function updateHint(){
    if(lrHead)lrHead.textContent=zh()?'Learning rate · 每次更新走多远':'Learning rate · update step size';
    const active=$('.lr-preset.active',lab);
    const v=Number(active?.dataset.lr||0.12);
    if(hint)hint.textContent=zh()?(v<.05?'小步走：慢，但容易看清':v>.5?'大步走：可能直接跨过':'中等步长：最容易看出靠近过程'):(v<.05?'Small steps: slow but easy to inspect':v>.5?'Large steps: may overshoot':'Moderate steps: easiest to see convergence');
    const stepBtn=$('#trainer-step-btn',lab),autoBtn=$('#trainer-auto-btn',lab),resetBtn=$('#trainer-reset-btn',lab);
    if(stepBtn)stepBtn.textContent=zh()?'更新一次':'One update';
    if(autoBtn&&!autoBtn.classList.contains('running'))autoBtn.textContent=zh()?'连续训练':'Auto train';
    if(resetBtn)resetBtn.textContent=zh()?'重置':'Reset';
  }

  function fitLab(){
    if(window.innerWidth<=900){lab.style.removeProperty('--p28-fit-height');return;}
    const viewportHeight=window.visualViewport?.height||window.innerHeight;
    const top=lab.getBoundingClientRect().top;
    const sectionStyle=getComputedStyle(section);
    const bottomGap=Math.max(8,parseFloat(sectionStyle.paddingBottom)||0);
    const available=Math.floor(viewportHeight-top-bottomGap);
    const height=Math.max(340,Math.min(680,available));
    lab.style.setProperty('--p28-fit-height',`${height}px`);
  }

  let lossHistory=[];
  let lastLossStep=null;
  function currentLoss(){try{return typeof trainLoss==='function'?Number(trainLoss()):Number($('#trainer-loss',lab)?.textContent)}catch(e){return Number($('#trainer-loss',lab)?.textContent)}}
  function currentStep(){try{return typeof tstep!=='undefined'?Number(tstep):Number($('#trainer-step',lab)?.textContent||0)}catch(e){return Number($('#trainer-step',lab)?.textContent||0)}}
  function sampleLoss(){
    const step=currentStep(),loss=currentLoss();
    if(!Number.isFinite(step)||!Number.isFinite(loss))return;
    if(step===0&&lastLossStep!==0)lossHistory=[];
    if(step!==lastLossStep){lossHistory.push({step,loss});if(lossHistory.length>181)lossHistory.shift();lastLossStep=step;}
    const now=$('.p28-loss-now',lab);if(now)now.textContent=loss.toFixed(4);
  }

  function canvasBox(c){
    if(!c)return null;
    const r=c.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,2);
    const w=Math.max(320,Math.round(r.width||700));
    const h=Math.max(72,Math.round(r.height||100));
    const rw=Math.round(w*dpr),rh=Math.round(h*dpr);
    if(c.width!==rw||c.height!==rh){c.width=rw;c.height=rh;}
    const ctx=c.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);
    return{ctx,W:w,H:h};
  }

  function drawLossHistory(){
    if(!lossCanvas)return;
    sampleLoss();
    const box=canvasBox(lossCanvas);if(!box)return;
    const {ctx:c,W,H}=box;
    c.clearRect(0,0,W,H);c.fillStyle='#fffdf7';c.fillRect(0,0,W,H);
    const L=38,R=16,T=13,B=22,pw=W-L-R,ph=H-T-B;
    c.save();c.strokeStyle='rgba(38,51,47,.085)';c.lineWidth=1;c.setLineDash([2,7]);
    for(let i=0;i<=3;i++){const y=T+i*ph/3;c.beginPath();c.moveTo(L,y);c.lineTo(W-R,y);c.stroke();}
    for(let i=0;i<=4;i++){const x=L+i*pw/4;c.beginPath();c.moveTo(x,T);c.lineTo(x,H-B);c.stroke();}
    c.restore();
    if(!lossHistory.length)return;
    const maxLoss=Math.max(.05,...lossHistory.map(d=>d.loss))*1.08,xMax=160;
    const X=s=>L+Math.max(0,Math.min(1,s/xMax))*pw,Y=v=>T+(1-Math.max(0,Math.min(1,v/maxLoss)))*ph;
    c.save();const grad=c.createLinearGradient(0,T,0,H-B);grad.addColorStop(0,'rgba(216,117,88,.18)');grad.addColorStop(1,'rgba(216,117,88,.012)');c.beginPath();lossHistory.forEach((d,i)=>{const x=X(d.step),y=Y(d.loss);i?c.lineTo(x,y):c.moveTo(x,y)});c.lineTo(X(lossHistory[lossHistory.length-1].step),H-B);c.lineTo(X(lossHistory[0].step),H-B);c.closePath();c.fillStyle=grad;c.fill();c.restore();
    c.save();c.strokeStyle='rgba(216,117,88,.15)';c.lineWidth=8;c.lineCap='round';c.lineJoin='round';c.beginPath();lossHistory.forEach((d,i)=>{const x=X(d.step),y=Y(d.loss);i?c.lineTo(x,y):c.moveTo(x,y)});c.stroke();c.restore();
    c.save();c.strokeStyle='#c9785d';c.lineWidth=3;c.lineCap='round';c.lineJoin='round';c.beginPath();lossHistory.forEach((d,i)=>{const x=X(d.step),y=Y(d.loss);i?c.lineTo(x,y):c.moveTo(x,y)});c.stroke();c.restore();
    const last=lossHistory[lossHistory.length-1],lx=X(last.step),ly=Y(last.loss);c.beginPath();c.arc(lx,ly,7,0,Math.PI*2);c.fillStyle='#fffaf0';c.fill();c.beginPath();c.arc(lx,ly,4.2,0,Math.PI*2);c.fillStyle='#c9785d';c.fill();
    c.fillStyle='rgba(38,51,47,.58)';c.font='10px ui-monospace, SFMono-Regular, Menlo, monospace';c.textBaseline='middle';c.fillText('0',L-3,H-9);c.textAlign='right';c.fillText('160 step',W-R,H-9);c.textAlign='left';
  }

  function drawTrainerPolished(){
    try{
      if(!canvas||typeof trainPts==='undefined'||typeof tw==='undefined'||typeof tb==='undefined')return;
      const c=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
      const X=x=>52+(x+1)/2*(W-104),Y=y=>H-42-(y+1.5)/3*(H-84);
      c.clearRect(0,0,W,H);c.fillStyle='#fffdf7';c.fillRect(0,0,W,H);
      c.save();c.strokeStyle='rgba(38,51,47,.075)';c.lineWidth=1;c.setLineDash([2,8]);for(let i=1;i<5;i++){const y=34+i*(H-68)/5;c.beginPath();c.moveTo(44,y);c.lineTo(W-34,y);c.stroke();}for(let i=1;i<6;i++){const x=44+i*(W-78)/6;c.beginPath();c.moveTo(x,28);c.lineTo(x,H-30);c.stroke();}c.restore();
      c.save();c.strokeStyle='rgba(52,118,129,.13)';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(X(-1),Y(tw*(-1)+tb));c.lineTo(X(1),Y(tw+tb));c.stroke();c.restore();
      c.save();c.strokeStyle='#347681';c.lineWidth=4.5;c.lineCap='round';c.beginPath();c.moveTo(X(-1),Y(tw*(-1)+tb));c.lineTo(X(1),Y(tw+tb));c.stroke();c.restore();
      trainPts.forEach(([x,y])=>{const px=X(x),py=Y(y);c.beginPath();c.arc(px,py,8.5,0,Math.PI*2);c.fillStyle='rgba(255,250,240,.95)';c.fill();c.beginPath();c.arc(px,py,5.3,0,Math.PI*2);c.fillStyle='#26332f';c.fill();});
      if(typeof updateTrainerUI==='function')updateTrainerUI();drawLossHistory();
    }catch(e){}
  }

  try{if(typeof drawTrainer==='function')drawTrainer=drawTrainerPolished}catch(e){}
  function queueDraw(){requestAnimationFrame(()=>requestAnimationFrame(()=>{drawTrainerPolished();drawLossHistory()}));}
  $$('.lr-preset',lab).forEach(b=>b.addEventListener('click',()=>{setTimeout(updateHint,0);queueDraw();}));
  ['#trainer-step-btn','#trainer-auto-btn','#trainer-reset-btn'].forEach(sel=>$(sel,lab)?.addEventListener('click',()=>{lab.classList.remove('p28-pulse');void lab.offsetWidth;lab.classList.add('p28-pulse');}));
  updateHint();
  layoutLink?.addEventListener('load',()=>{fitLab();queueDraw();},{once:true});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{fitLab();drawTrainerPolished();}));
  window.addEventListener('resize',()=>{fitLab();queueDraw();});
  window.visualViewport?.addEventListener('resize',()=>{fitLab();queueDraw();});
  if('ResizeObserver'in window){new ResizeObserver(()=>requestAnimationFrame(()=>{fitLab();drawTrainerPolished();})).observe($('.story-copy',section)||section);}
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{updateHeader();updateCopy();updateHint();fitLab();queueDraw();},100));
})();
