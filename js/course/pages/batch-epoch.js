(function refineBatchEpoch(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const section=$('#batch-epoch-screen');
  if(!section)return;

  if(!document.querySelector('link[data-p29-layout]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='css/course/pages/batch-epoch.css?v=20260826a';link.dataset.p29Layout='1';document.head.appendChild(link);
  }

  const title=$('.story-copy h2',section),lead=$('.story-copy .lead',section),kicker=$('.story-kicker',section);
  if(kicker)kicker.textContent='BATCH · UPDATE · EPOCH';
  if(title)title.textContent=zh()?'Batch、Update、Epoch 怎么对应？':'How do batch, update, and epoch relate?';
  lead?.remove();

  section.querySelector('.batch-lab')?.remove();
  section.querySelector('.p29-story-lab')?.remove();
  section.querySelector('.p29-compact')?.remove();

  let lab=$('.p29-mini',section);
  if(!lab){
    lab=document.createElement('div');lab.className='p29-mini story-reveal';lab.dataset.step='0';section.appendChild(lab);
  }

  function render(){
    const step=Math.max(0,Math.min(7,+lab.dataset.step||0));
    lab.innerHTML=`
      <div class="p29-equation-row">
        <span><strong>350</strong><small>${zh()?'训练样本':'training samples'}</small></span>
        <b>÷</b>
        <span><strong>50</strong><small>${zh()?'每个 Batch':'per batch'}</small></span>
        <b>=</b>
        <span><strong>7</strong><small>Batch</small></span>
      </div>
      <div class="p29-track">${Array.from({length:7},(_,i)=>`<button type="button" data-i="${i+1}" class="${i<step?'done':i===step&&step<7?'active':''}"><b>${i+1}</b><span>50</span></button>`).join('')}</div>
      <div class="p29-relations">
        <span><strong>1 Batch → 1 Update</strong><small>${zh()?'处理一批，参数更新一次':'one batch, one parameter update'}</small></span>
        <span><strong>7 Batch → ≈ 1 Epoch</strong><small>${zh()?'训练集大致走完一遍':'roughly one pass through the training set'}</small></span>
      </div>
      <div class="p29-bottom"><p></p><div><button type="button" class="story-button primary p29-next"></button><button type="button" class="story-button p29-reset"></button></div></div>`;
    const status=$('.p29-bottom p',lab);
    if(status)status.textContent=zh()?(step===0?'点“下一批”，看更新次数怎样累积。':step<7?`已经完成 ${step} 次更新，还没有走完 1 个 Epoch。`:'7 批全部完成：350 个样本大致完整走过一遍。'):(step===0?'Advance one batch and watch the updates accumulate.':step<7?`${step} updates are complete; the epoch is not finished yet.`:'All seven batches are complete: roughly one pass through the 350 samples.');
    $('.p29-next',lab).textContent=zh()?'下一批 →':'Next batch →';$('.p29-reset',lab).textContent=zh()?'重置':'Reset';
    $('.p29-next',lab).addEventListener('click',()=>{lab.dataset.step=String(Math.min(7,step+1));render()});
    $('.p29-reset',lab).addEventListener('click',()=>{lab.dataset.step='0';render()});
    $$('.p29-track button',lab).forEach(b=>b.addEventListener('click',()=>{lab.dataset.step=b.dataset.i;render()}));
  }
  render();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{if(title)title.textContent=zh()?'Batch、Update、Epoch 怎么对应？':'How do batch, update, and epoch relate?';render()},100));
})();
