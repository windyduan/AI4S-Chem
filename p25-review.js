(function installP25Review(){
  const zh=()=>document.documentElement.lang!=='en';
  const section=document.getElementById('equation-screen');
  if(!section)return;

  function setText(el,cn,en){if(el)el.textContent=zh()?cn:en}

  function rebuildLossFlow(){
    const old=section.querySelector('.eq-target-row');
    if(!old)return;
    let flow=section.querySelector('.p25-loss-flow');
    if(!flow){
      flow=document.createElement('div');
      flow.className='p25-loss-flow';
      old.replaceWith(flow);
    }
    flow.innerHTML=zh()
      ?'<div class="p25-compare-pair"><span><b>真实目标 y</b><small>数据里记录的正确值</small></span><span><b>模型预测 ŷ</b><small>上面公式给出的估计</small></span></div><i>→</i><div class="p25-error-box"><b>计算预测误差</b><small>例如 e = ŷ − y</small></div><i>→</i><div class="p25-loss-box"><b>Loss L</b><small>把误差变成训练要最小化的数值</small></div>'
      :'<div class="p25-compare-pair"><span><b>Target y</b><small>Recorded ground-truth value</small></span><span><b>Prediction ŷ</b><small>Estimate from the model above</small></span></div><i>→</i><div class="p25-error-box"><b>Compute prediction error</b><small>For example e = ŷ − y</small></div><i>→</i><div class="p25-loss-box"><b>Loss L</b><small>Turns error into the quantity minimized during training</small></div>';
  }

  function localizeEquationExplanation(){
    const active=section.querySelector('.eq-token.active')?.dataset.eq||'pred';
    const defs={
      pred:['ŷ · 模型预测','当前模型根据输入 x 给出的估计值'],
      model:['f · 模型','把输入表示 x 映射成预测结果的可学习函数'],
      input:['x · 输入表示','模型真正收到的机器可读输入，例如描述符、分子指纹、分子图或三维结构'],
      param:['θ · 模型参数','训练过程中不断被更新的内部数值']
    };
    if(!zh())return;
    const d=defs[active];
    if(!d)return;
    const strong=section.querySelector('.eq-explain strong');
    const p=section.querySelector('.eq-explain p');
    if(strong)strong.textContent=d[0];
    if(p)p.textContent=d[1];
  }

  function localizeTaskPanel(){
    const tabs=[...section.querySelectorAll('.task-tab')];
    if(tabs[0])setText(tabs[0],'溶解度','Solubility');
    if(tabs[1])setText(tabs[1],'反应产率','Reaction yield');

    if(!zh())return;
    const active=section.querySelector('.task-tab.active')?.dataset.task||'sol';
    const rows=active==='rxn' ? [
      ['样本','一条反应记录'],
      ['输入 x','反应物 + 反应条件的表示'],
      ['真实目标 y','实验测得的反应产率'],
      ['模型预测 ŷ','模型预测的反应产率']
    ] : [
      ['样本','一个带溶解度测量记录的分子'],
      ['输入 x','描述符 / 分子指纹 / 分子图 / 三维结构'],
      ['真实目标 y','实验测得的 logS'],
      ['模型预测 ŷ','模型预测的 logS']
    ];
    const card=section.querySelector('.task-card');
    if(card)card.innerHTML=rows.map(([a,b])=>`<div class="task-row"><small>${a}</small><strong>${b}</strong></div>`).join('');
    const note=section.querySelector('.task-transfer-note');
    if(note)note.textContent='公式不变；变化的是科学问题、输入表示和要预测的目标。';
  }

  function apply(){
    const no=section.querySelector('.section-no');
    if(no)no.textContent='02A / MODEL';
    const nextNo=document.querySelector('#prediction-loss-screen .section-no');
    if(nextNo)nextNo.textContent='02B / ERROR';

    const kicker=section.querySelector('.story-kicker');
    setText(kicker,'模型训练 · 最小公式','MODEL TRAINING · MINIMUM EQUATION');
    const title=section.querySelector('.story-copy h2');
    setText(title,'先用一个公式看清模型训练里的四个角色','Use one equation to see the four roles in model training');
    section.querySelector('.story-copy .lead')?.remove();

    rebuildLossFlow();
    localizeEquationExplanation();
    localizeTaskPanel();
  }

  section.querySelectorAll('.eq-token').forEach(el=>el.addEventListener('click',()=>setTimeout(()=>{localizeEquationExplanation();},0)));
  section.querySelectorAll('.task-tab').forEach(el=>el.addEventListener('click',()=>setTimeout(()=>{localizeTaskPanel();},0)));
  apply();
  [120,420,900,1600,2800].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,120));
})();
