(function refineBatchEpoch(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const section=$('#batch-epoch-screen');
  if(!section)return;

  if(!document.querySelector('link[data-p29-layout]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='css/course/training/batch-epoch.css?v=20260826f';link.dataset.p29Layout='1';document.head.appendChild(link);
  }

  const title=$('.story-copy h2',section),lead=$('.story-copy .lead',section),kicker=$('.story-kicker',section),sectionNo=$('.section-no',section);
  const updateHeader=()=>{
    if(sectionNo)sectionNo.textContent='02D / BATCH · EPOCH';
    if(kicker)kicker.textContent='BATCH SIZE · UPDATE · EPOCH';
    if(title)title.textContent=zh()?'350 个样本：7 次更新为什么是 1 个 Epoch？':'350 samples: why do 7 updates make 1 epoch?';
  };
  updateHeader();
  lead?.remove();

  section.querySelector('.batch-lab')?.remove();
  section.querySelector('.p29-story-lab')?.remove();
  section.querySelector('.p29-compact')?.remove();
  section.querySelector('.p29-mini')?.remove();

  let lab=$('.epoch-flow-lab',section);
  if(!lab){lab=document.createElement('div');lab.className='epoch-flow-lab story-reveal';lab.dataset.step='0';section.appendChild(lab)}
  const dots=()=>'<i></i>'.repeat(5);
  function render(){
    const step=Math.max(0,Math.min(7,+lab.dataset.step||0));
    const degree=(step/7)*360;
    lab.innerHTML=`
      <div class="epoch-train-set"><div class="epoch-set-head"><div><small>TRAIN SET</small><strong>350 ${zh()?'个样本':'samples'}</strong></div><span>batch size = 50</span></div><div class="epoch-batches">${Array.from({length:7},(_,i)=>`<button type="button" data-step="${i+1}" class="epoch-batch ${i<step?'done':i===step&&step<7?'next':''}"><small>Batch ${i+1}</small><div>${dots()}</div><strong>50</strong></button>`).join('')}</div></div>
      <div class="epoch-arrow epoch-arrow-in"><span>→</span></div>
      <div class="epoch-update-stage"><div class="epoch-current ${step?'has-batch':''}"><small>${zh()?'当前送进模型':'CURRENT BATCH'}</small><strong>${step?`Batch ${step}`:'—'}</strong><span>${step?`50 ${zh()?'个样本':'samples'}`:(zh()?'点下一批开始':'start with the next batch')}</span></div><div class="epoch-down-arrow">↓</div><div class="epoch-model ${step?'pulse':''}"><small>MODEL · θ</small><strong>${zh()?'参数更新':'parameter update'} ${step?`#${step}`:'—'}</strong><span>${zh()?'每处理 1 个 Batch，更新 1 次':'1 batch processed = 1 update'}</span></div></div>
      <div class="epoch-arrow epoch-arrow-out"><span>→</span></div>
      <div class="epoch-gauge-wrap"><div class="epoch-gauge" style="--epoch-progress:${degree}deg"><div><small>EPOCH</small><strong>${step} / 7</strong><span>${step===7?(zh()?'完整走完一遍':'one full pass'):(zh()?'训练集进度':'dataset progress')}</span></div></div><p>${step===0?(zh()?'7 个 Batch 正在排队。':'Seven batches are waiting.'):step<7?(zh()?`已经处理 ${step} 批，也更新了 ${step} 次。`:`${step} batches processed = ${step} updates.`):(zh()?'7 批全部处理完：1 个 Epoch 完成。':'All 7 batches are done: 1 epoch complete.')}</p></div>
      <div class="epoch-footer"><div class="epoch-rule"><span><b>batch size = 50</b><small>${zh()?'一次拿多少样本':'samples per update'}</small></span><span><b>1 Batch = 1 Update</b><small>${zh()?'参数更新一次':'one parameter update'}</small></span><span><b>7 Batch = 1 Epoch</b><small>${zh()?'训练集走完一遍':'one pass through the set'}</small></span></div><div class="epoch-actions"><button type="button" class="story-button primary epoch-next"></button><button type="button" class="story-button epoch-reset"></button></div></div>`;
    $('.epoch-next',lab).textContent=zh()?'下一批 →':'Next batch →';$('.epoch-reset',lab).textContent=zh()?'重置':'Reset';
    $('.epoch-next',lab).addEventListener('click',()=>{lab.dataset.step=String(Math.min(7,step+1));render()});$('.epoch-reset',lab).addEventListener('click',()=>{lab.dataset.step='0';render()});$$('.epoch-batch',lab).forEach(b=>b.addEventListener('click',()=>{lab.dataset.step=b.dataset.step;render()}));
  }
  render();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(()=>{updateHeader();render()},100));
})();
