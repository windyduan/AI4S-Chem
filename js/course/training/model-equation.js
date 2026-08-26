(function installModelEquationPage(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const section=$('#equation-screen');if(!section)return;
  const set=(el,cn,en)=>{if(el)el.textContent=zh()?cn:en};

  if(!document.querySelector('link[data-model-equation]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='css/course/training/model-equation.css?v=20260826b';link.dataset.modelEquation='1';document.head.appendChild(link);
  }

  function rebuildLossFlow(){
    let flow=$('.model-loss-flow',section);
    if(!flow){const old=$('.eq-target-row',section)||$('.p25-loss-flow',section);flow=document.createElement('div');flow.className='model-loss-flow';old?.replaceWith(flow)}
    if(!flow)return;
    flow.innerHTML=zh()?`
      <div class="model-target-pair"><div class="model-role-card target"><strong>y</strong><b>真实目标</b><span>数据里记录的正确值</span></div><div class="model-compare-sign">↔</div><div class="model-role-card prediction"><strong>ŷ</strong><b>模型预测</b><span>当前模型给出的估计</span></div></div>
      <div class="model-loss-down">↓ <span>比较</span></div>
      <div class="model-error-to-loss"><div class="model-error-card"><b>预测误差</b><span>e = ŷ − y</span></div><div class="model-loss-arrow">→</div><div class="model-final-loss"><b>Loss L</b><span>把误差变成训练要最小化的数值</span></div></div>`:`
      <div class="model-target-pair"><div class="model-role-card target"><strong>y</strong><b>Target</b><span>Recorded ground-truth value</span></div><div class="model-compare-sign">↔</div><div class="model-role-card prediction"><strong>ŷ</strong><b>Prediction</b><span>The model's current estimate</span></div></div>
      <div class="model-loss-down">↓ <span>compare</span></div>
      <div class="model-error-to-loss"><div class="model-error-card"><b>Prediction error</b><span>e = ŷ − y</span></div><div class="model-loss-arrow">→</div><div class="model-final-loss"><b>Loss L</b><span>Turns error into the quantity minimized during training</span></div></div>`;
  }

  function localizeEquationExplanation(){
    const active=$('.eq-token.active',section)?.dataset.eq||'pred';
    const defs={pred:{cn:['ŷ · 模型预测','当前模型根据输入 x 给出的估计值。'],en:['ŷ · model prediction','The current model estimate for input x.']},model:{cn:['f · 模型','把输入表示 x 映射成预测结果的可学习函数。'],en:['f · model','The learnable function mapping representation x to an output.']},input:{cn:['x · 输入表示','模型真正收到的机器可读输入，例如描述符、分子指纹、分子图或三维结构。'],en:['x · representation','The machine-readable input: descriptors, fingerprints, molecular graphs, 3D structure, and so on.']},param:{cn:['θ · 模型参数','训练过程中不断被更新的内部数值。'],en:['θ · parameters','Internal values updated during training.']}};
    const d=defs[active]||defs.pred,v=zh()?d.cn:d.en;set($('.eq-explain strong',section),v[0],v[0]);set($('.eq-explain p',section),v[1],v[1]);
  }

  function localizeTaskPanel(){
    const tabs=$$('.task-tab',section);if(tabs[0])set(tabs[0],'溶解度','Solubility');if(tabs[1])set(tabs[1],'反应产率','Reaction yield');
    const active=$('.task-tab.active',section)?.dataset.task||'sol';
    const rows=active==='rxn'?(zh()?[["样本","一条反应记录"],["输入 x","反应物 + 反应条件的表示"],["真实目标 y","实验测得的反应产率"],["模型预测 ŷ","模型预测的反应产率"]]:[["Sample","one reaction record"],["Input x","representation of reactants + conditions"],["Target y","experimentally measured yield"],["Prediction ŷ","model-predicted yield"]]):(zh()?[["样本","一个带溶解度测量记录的分子"],["输入 x","描述符 / 分子指纹 / 分子图 / 三维结构"],["真实目标 y","实验测得的 logS"],["模型预测 ŷ","模型预测的 logS"]]:[["Sample","a molecule with a solubility measurement"],["Input x","descriptor / fingerprint / graph / 3D structure"],["Target y","measured logS"],["Prediction ŷ","predicted logS"]]);
    const card=$('.task-card',section);if(card)card.innerHTML=rows.map(([a,b])=>`<div class="task-row"><small>${a}</small><strong>${b}</strong></div>`).join('');
    set($('.task-transfer-note',section),'公式不变；变化的是科学问题、输入表示和要预测的目标。','The equation stays the same; the scientific question, representation, and target change.');
  }

  function apply(){set($('.section-no',section),'02A / MODEL','02A / MODEL');set($('.story-kicker',section),'模型训练 · 最小公式','MODEL TRAINING · MINIMUM EQUATION');set($('.story-copy h2',section),'先用一个公式看清模型训练里的四个角色','Use one equation to see the four roles in model training');$('.story-copy .lead',section)?.remove();rebuildLossFlow();localizeEquationExplanation();localizeTaskPanel()}
  $$('.eq-token',section).forEach(el=>{if(el.dataset.modelEquationBound)return;el.dataset.modelEquationBound='1';el.addEventListener('click',()=>requestAnimationFrame(localizeEquationExplanation))});
  $$('.task-tab',section).forEach(el=>{if(el.dataset.modelEquationBound)return;el.dataset.modelEquationBound='1';el.addEventListener('click',()=>requestAnimationFrame(localizeTaskPanel))});
  apply();document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
