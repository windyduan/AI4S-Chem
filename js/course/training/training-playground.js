(function refineTrainingPlayground(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const section=$('#training-playground-screen');
  if(!section)return;

  if(!document.querySelector('link[data-p28-layout]')){
    const link=document.createElement('link');
    link.rel='stylesheet';link.href='css/course/training/training-playground.css?v=20260826b';link.dataset.p28Layout='1';document.head.appendChild(link);
  }

  const title=$('.story-copy h2',section);
  const updateTitle=()=>{if(title)title.textContent=zh()?'模型参数，是怎样一步步更新的？':'How do model parameters change one update at a time?'};
  updateTitle();
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

  const labTitle=$('.foundation-lab-title',lab);
  labTitle?.remove();
  const labLead=$('.training-lab-head p',lab);
  if(labLead)labLead.textContent=zh()?'黑点是真实数据，蓝线是当前模型。':'Black points are data; the blue line is the current model.';
  const eyebrow=$('.training-lab-head .eyebrow',lab);if(eyebrow)eyebrow.textContent='GRADIENT DESCENT';

  const lrHead=$('.p28-lr-head strong',lab),hint=$('.p28-lr-hint',lab);
  function updateHint(){
    if(lrHead)lrHead.textContent=zh()?'Learning rate · 每次更新走多远':'Learning rate · update step size';
    const active=$('.lr-preset.active',lab);const v=Number(active?.dataset.lr||0.12);
    if(hint)hint.textContent=zh()?(v<.05?'小步走：慢，但容易看清':v>.5?'大步走：可能直接跨过':'中等步长：最容易看出靠近过程'):(v<.05?'Small steps: slow but easy to inspect':v>.5?'Large steps: may overshoot':'Moderate steps: easiest to see convergence');
    const stepBtn=$('#trainer-step-btn',lab),autoBtn=$('#trainer-auto-btn',lab),resetBtn=$('#trainer-reset-btn',lab);
    if(stepBtn)stepBtn.textContent=zh()?'更新一次':'One update';
    if(autoBtn)autoBtn.textContent=zh()?'连续训练':'Auto train';
    if(resetBtn)resetBtn.textContent=zh()?'重置':'Reset';
  }
  $$('.lr-preset',lab).forEach(b=>b.addEventListener('click',()=>setTimeout(updateHint,0)));
  ['#trainer-step-btn','#trainer-auto-btn','#trainer-reset-btn'].forEach(sel=>$(sel,lab)?.addEventListener('click',()=>{lab.classList.remove('p28-pulse');void lab.offsetWidth;lab.classList.add('p28-pulse')}));
  updateHint();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{updateTitle();if(labLead)labLead.textContent=zh()?'黑点是真实数据，蓝线是当前模型。':'Black points are data; the blue line is the current model.';updateHint()},100));
})();
