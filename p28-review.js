(function installP28Review(){
  const section=document.getElementById('training-playground-screen');
  if(!section)return;
  const zh=()=>document.documentElement.lang!=='en';

  function setText(el,cn,en){if(el)el.textContent=zh()?cn:en}

  function apply(){
    const title=section.querySelector('.story-copy h2');
    setText(title,'亲手看一次参数怎样真的动起来','Watch the model parameters move during training');
    section.querySelector('.story-copy .lead')?.remove();

    const head=section.querySelector('.foundation-playground-head');
    if(head){
      const oldNote=head.querySelector('.story-note');
      oldNote?.remove();
      const left=head.firstElementChild;
      if(left&&!left.children.length)left.remove();

      const controlBox=head.lastElementChild;
      if(controlBox){
        let explain=controlBox.querySelector('.p28-lr-explain');
        if(!explain){
          explain=document.createElement('p');
          explain.className='p28-lr-explain';
          controlBox.prepend(explain);
        }
        setText(explain,'学习率 η 决定每次参数更新走多大一步','Learning rate η controls the size of each parameter update');
      }
    }

    const labTitle=section.querySelector('.foundation-lab-title');
    setText(labTitle,'训练一条最简单的模型','Train the simplest possible model');

    const labLead=section.querySelector('.training-lab-head p');
    if(labLead)setText(labLead,'黑色点是真实数据，蓝线是当前模型。点击训练，观察参数变化和 MSE Loss 下降。','Black points are data and the blue line is the current model. Train it and watch the parameters and MSE loss change.');

    const equation=section.querySelector('.trainer-equation');
    if(equation)equation.setAttribute('aria-label',zh()?'当前模型公式':'Current model equation');

    const stats=[...section.querySelectorAll('.trainer-stats > div')];
    const labels=stats.map(x=>x.querySelector('small'));
    if(labels[0])setText(labels[0],'步数','STEP');
    if(labels[1])labels[1].textContent='w';
    if(labels[2])labels[2].textContent='b';
    if(labels[3])labels[3].textContent='MSE Loss';

    const stepBtn=section.querySelector('#trainer-step-btn');
    const autoBtn=section.querySelector('#trainer-auto-btn');
    const resetBtn=section.querySelector('#trainer-reset-btn');
    setText(stepBtn,'训练一步','Train one step');
    setText(autoBtn,'连续训练','Auto train');
    setText(resetBtn,'重置','Reset');
  }

  apply();
  [120,420,900,1600,2800].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,120));
})();
