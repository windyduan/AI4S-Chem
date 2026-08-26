(function refineTrainingPlayground(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const section=$('#training-playground-screen');
  if(!section)return;

  let layoutLink=document.querySelector('link[data-p28-layout]');
  if(!layoutLink){layoutLink=document.createElement('link');layoutLink.rel='stylesheet';layoutLink.href='css/course/training/training-playground.css?v=20260826i';layoutLink.dataset.p28Layout='1';document.head.appendChild(layoutLink)}

  const title=$('.story-copy h2',section);
  const updateTitle=()=>{if(title)title.textContent=zh()?'模型参数，怎样一步步更新？':'How do model parameters update step by step?'};
  updateTitle();section.querySelector('.story-copy .lead')?.remove();

  const lab=$('.merged-training-lab',section);if(!lab)return;lab.classList.add('p28-refined');
  const head=$('.foundation-playground-head',section),presets=head?.querySelector('.lr-presets'),readout=head?.querySelector('.lr-readout'),bottom=$('.trainer-bottom',lab);
  if(bottom&&!$('.p28-learning-rate',bottom)){const box=document.createElement('div');box.className='p28-learning-rate';box.innerHTML='<div class="p28-lr-head"><strong></strong><span class="p28-lr-hint"></span></div>';if(presets)box.appendChild(presets);if(readout)box.appendChild(readout);bottom.prepend(box)}
  head?.remove();

  const equation=$('.trainer-equation',lab),canvas=$('#train-canvas',lab);let plot=$('.p28-plot',lab);
  if(canvas&&!plot){plot=document.createElement('div');plot.className='p28-plot';canvas.replaceWith(plot);plot.innerHTML='<p class="p28-plot-note"></p>';plot.appendChild(canvas)}
  if(equation&&bottom&&!bottom.contains(equation))bottom.prepend(equation);$('.training-lab-head',lab)?.remove();

  const plotNote=$('.p28-plot-note',lab);const updatePlotNote=()=>{if(plotNote)plotNote.textContent=zh()?'黑点是真实数据，蓝线是当前模型。':'Black points are data; the blue line is the current model.'};updatePlotNote();
  const lrHead=$('.p28-lr-head strong',lab),hint=$('.p28-lr-hint',lab);
  function updateHint(){if(lrHead)lrHead.textContent=zh()?'Learning rate · 每次更新走多远':'Learning rate · update step size';const active=$('.lr-preset.active',lab);const v=Number(active?.dataset.lr||0.12);if(hint)hint.textContent=zh()?(v<.05?'小步走：慢，但容易看清':v>.5?'大步走：可能直接跨过':'中等步长：最容易看出靠近过程'):(v<.05?'Small steps: slow but easy to inspect':v>.5?'Large steps: may overshoot':'Moderate steps: easiest to see convergence');const stepBtn=$('#trainer-step-btn',lab),autoBtn=$('#trainer-auto-btn',lab),resetBtn=$('#trainer-reset-btn',lab);if(stepBtn)stepBtn.textContent=zh()?'更新一次':'One update';if(autoBtn&&!autoBtn.classList.contains('running'))autoBtn.textContent=zh()?'连续训练':'Auto train';if(resetBtn)resetBtn.textContent=zh()?'重置':'Reset'}

  function fitLab(){if(window.innerWidth<=900){lab.style.removeProperty('--p28-fit-height');return}const viewportHeight=window.visualViewport?.height||window.innerHeight;const top=lab.getBoundingClientRect().top;const sectionStyle=getComputedStyle(section);const bottomGap=Math.max(8,parseFloat(sectionStyle.paddingBottom)||0);const available=Math.floor(viewportHeight-top-bottomGap);const height=Math.max(385,Math.min(620,available));lab.style.setProperty('--p28-fit-height',`${height}px`)}

  function polishedTrainer(){
    try{
      if(!canvas||typeof trainPts==='undefined'||typeof tw==='undefined'||typeof tb==='undefined')return;
      const c=canvas.getContext('2d'),W=canvas.width,H=canvas.height,X=x=>52+(x+1)/2*(W-104),Y=y=>H-42-(y+1.5)/3*(H-84);
      c.clearRect(0,0,W,H);c.fillStyle='#fffdf7';c.fillRect(0,0,W,H);
      c.save();c.strokeStyle='rgba(38,51,47,.075)';c.lineWidth=1;c.setLineDash([2,8]);for(let i=1;i<5;i++){const y=34+i*(H-68)/5;c.beginPath();c.moveTo(44,y);c.lineTo(W-34,y);c.stroke()}for(let i=1;i<6;i++){const x=44+i*(W-78)/6;c.beginPath();c.moveTo(x,28);c.lineTo(x,H-30);c.stroke()}c.restore();
      c.save();c.strokeStyle='rgba(47,118,131,.14)';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(X(-1),Y(tw*(-1)+tb));c.lineTo(X(1),Y(tw+tb));c.stroke();c.restore();
      c.save();c.strokeStyle='#2f7683';c.lineWidth=4.5;c.lineCap='round';c.beginPath();c.moveTo(X(-1),Y(tw*(-1)+tb));c.lineTo(X(1),Y(tw+tb));c.stroke();c.restore();
      trainPts.forEach(([x,y])=>{const px=X(x),py=Y(y);c.beginPath();c.arc(px,py,8.5,0,Math.PI*2);c.fillStyle='rgba(255,250,240,.94)';c.fill();c.beginPath();c.arc(px,py,5.3,0,Math.PI*2);c.fillStyle='#26332f';c.fill()});
    }catch(e){}
  }

  function queuePolish(){requestAnimationFrame(()=>requestAnimationFrame(polishedTrainer))}
  $$('.lr-preset',lab).forEach(b=>b.addEventListener('click',()=>{setTimeout(updateHint,0);queuePolish()}));
  ['#trainer-step-btn','#trainer-auto-btn','#trainer-reset-btn'].forEach(sel=>$(sel,lab)?.addEventListener('click',()=>{lab.classList.remove('p28-pulse');void lab.offsetWidth;lab.classList.add('p28-pulse');queuePolish()}));
  if('MutationObserver'in window){const stat=$('#trainer-step',lab);if(stat)new MutationObserver(queuePolish).observe(stat,{childList:true,characterData:true,subtree:true})}
  updateHint();layoutLink?.addEventListener('load',()=>{fitLab();queuePolish()},{once:true});requestAnimationFrame(()=>requestAnimationFrame(()=>{fitLab();polishedTrainer()}));window.addEventListener('resize',()=>{fitLab();queuePolish()});window.visualViewport?.addEventListener('resize',()=>{fitLab();queuePolish()});if('ResizeObserver'in window){new ResizeObserver(()=>requestAnimationFrame(()=>{fitLab();polishedTrainer()})).observe($('.story-copy',section)||section)}
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{updateTitle();updatePlotNote();updateHint();fitLab();queuePolish()},100));
})();
