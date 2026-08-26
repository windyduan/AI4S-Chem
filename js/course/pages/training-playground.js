(function refineTrainingPlayground(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const section=$('#training-playground-screen');
  if(!section)return;

  if(!document.querySelector('link[data-p28-layout]')){
    const link=document.createElement('link');
    link.rel='stylesheet';link.href='css/course/pages/training-playground.css?v=20260826a';link.dataset.p28Layout='1';document.head.appendChild(link);
  }

  const title=$('.story-copy h2',section);
  if(title)title.textContent=zh()?'亲手看参数怎样一步步移动':'Watch the parameters move, one update at a time';
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
  if(labTitle)labTitle.textContent=zh()?'训练一条最简单的模型':'Train the simplest possible model';
  const labLead=$('.training-lab-head p',lab);
  if(labLead)labLead.textContent=zh()?'黑点是真实数据，蓝线是当前模型。':'Black points are data; the blue line is the current model.';
  const eyebrow=$('.training-lab-head .eyebrow',lab);if(eyebrow)eyebrow.textContent='GRADIENT DESCENT';

  const lrHead=$('.p28-lr-head strong',lab),hint=$('.p28-lr-hint',lab);
  function updateHint(){
    if(lrHead)lrHead.textContent=zh()?'Learning rate · 每次更新走多远':'Learning rate · update step size';
    const active=$('.lr-preset.active',lab);const v=Number(active?.dataset.lr||0.12);
    if(hint)hint.textContent=zh()?(v<.05?'步子小：慢一点，但变化容易看清':v>.5?'步子很大：可能越过合适位置':'中等步长：更容易看到逐步靠近'): (v<.05?'Small steps: slower, easier to inspect':v>.5?'Large steps: may overshoot':'Moderate steps: easier to see convergence');
    const stepBtn=$('#trainer-step-btn',lab),autoBtn=$('#trainer-auto-btn',lab),resetBtn=$('#trainer-reset-btn',lab);
    if(stepBtn)stepBtn.textContent=zh()?'走一步':'One update';
    if(autoBtn)autoBtn.textContent=zh()?'连续走':'Auto train';
    if(resetBtn)resetBtn.textContent=zh()?'重置':'Reset';
  }
  $$('.lr-preset',lab).forEach(b=>b.addEventListener('click',()=>setTimeout(updateHint,0)));
  ['#trainer-step-btn','#trainer-auto-btn','#trainer-reset-btn'].forEach(sel=>$(sel,lab)?.addEventListener('click',()=>{lab.classList.remove('p28-pulse');void lab.offsetWidth;lab.classList.add('p28-pulse')}));
  updateHint();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{if(title)title.textContent=zh()?'亲手看参数怎样一步步移动':'Watch the parameters move, one update at a time';if(labTitle)labTitle.textContent=zh()?'训练一条最简单的模型':'Train the simplest possible model';if(labLead)labLead.textContent=zh()?'黑点是真实数据，蓝线是当前模型。':'Black points are data; the blue line is the current model.';updateHint()},100));
})();
