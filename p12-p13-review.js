(function installP12P14Review(){
  const zh=()=>document.documentElement.lang!=='en';

  const numbering={
    'rep-vs-model':'01E',
    'gnn-story':'01F',
    'symmetry-story':'01G',
    'capability-map-screen':'01H',
    'chemistry':'01I',
    'discovery-story':'01J',
    'chem-task-map-screen':'01K',
    'case-nmrnet':'01L',
    'case-elyte':'01M',
    'case-catkg':'01N',
    'case-nose':'01O',
    'case-unixas':'01P',
    'case-electroplating':'01Q',
    'research':'01R',
    'now':'01S',
    'review-shelf-screen':'01T'
  };

  function ensureOrder(){
    const overview=document.getElementById('chemistry');
    const loop=document.getElementById('discovery-story');
    const synthesis=document.getElementById('chem-task-map-screen');
    if(overview&&loop&&overview.nextElementSibling!==loop)overview.insertAdjacentElement('afterend',loop);
    if(loop&&synthesis&&loop.nextElementSibling!==synthesis)loop.insertAdjacentElement('afterend',synthesis);
  }

  function applyNumbers(){
    Object.entries(numbering).forEach(([id,code])=>{
      const no=document.querySelector(`#${id} .section-no`);
      if(!no)return;
      const text=no.textContent.trim();
      no.textContent=text.includes('/') ? text.replace(/^[^/]+(?=\s*\/)/,code) : code;
    });
  }

  function applyP12(){
    const section=document.getElementById('chemistry');
    if(!section)return;
    const title=section.querySelector('h2');
    if(title)title.textContent=zh()?'AI 怎样进入一项化学研究':'How AI enters a chemistry research workflow';

    section.querySelector('.concept-grid')?.remove();
    section.querySelector('.compact-pipeline')?.remove();

    let flow=section.querySelector('.p12-overview-flow');
    if(!flow){
      flow=document.createElement('div');
      flow.className='p12-overview-flow';
      section.appendChild(flow);
    }
    const items=zh()?[
      ['科研问题','先明确要预测、解释或优化什么'],
      ['数据','实验、计算或数据库记录'],
      ['表示','把化学对象变成模型能处理的输入'],
      ['模型','学习输入与目标之间的关系'],
      ['科研决策','筛选候选，安排下一步实验或计算']
    ]:[
      ['Research question','Define what should be predicted, explained, or optimized'],
      ['Data','Experimental, computational, or database records'],
      ['Representation','Convert chemistry into model-ready inputs'],
      ['Model','Learn the mapping from inputs to targets'],
      ['Research decision','Select candidates and plan the next experiment or calculation']
    ];
    flow.innerHTML=items.map(([t,c],i)=>`${i?'<span class="p12-flow-arrow">→</span>':''}<article class="p12-flow-node"><strong>${t}</strong><p>${c}</p></article>`).join('');
  }

  function applyP14(){
    const section=document.getElementById('discovery-story');
    if(!section)return;
    const title=section.querySelector('.story-copy h2');
    const lead=section.querySelector('.story-copy .lead');
    if(title)title.textContent=zh()?'一次预测之后，科研流程还会继续':'Research continues after one prediction';
    if(lead)lead.textContent=zh()
      ?'上一页把过程画成一条线；真实科研更像一个循环。实验或计算产生新证据，再回到数据、模型和下一轮候选选择。'
      :'The previous page drew the process as a line; real research is closer to a loop. Experiments or calculations create new evidence that returns to data, models, and the next round of candidate selection.';

    const ring=section.querySelector('.discovery-ring');
    if(ring&&!ring.querySelector('.p14-loop-arrows')){
      const arrows=document.createElement('div');
      arrows.className='p14-loop-arrows';
      arrows.setAttribute('aria-hidden','true');
      arrows.innerHTML='<i class="a1">→</i><i class="a2">→</i><i class="a3">→</i><i class="a4">→</i><i class="a5">→</i><i class="a6">→</i>';
      ring.prepend(arrows);
    }
  }

  function applyP13Final(){
    const section=document.getElementById('chem-task-map-screen');
    if(!section)return;
    const title=section.querySelector('.story-copy h2');
    const lead=section.querySelector('.story-copy .lead');
    if(title)title.textContent=zh()?'把化学任务放进完整科研流程':'Put chemistry tasks into a complete research workflow';
    if(lead)lead.textContent=zh()
      ?'项目做的事情可以不同，但都要经过问题、数据、表示、模型、验证和决策。下一页开始看课题组项目时，就用这张图来读。'
      :'Projects can do different things, but they still pass through question, data, representation, model, validation, and decision. Use this map to read the group projects on the following pages.';

    let taskStrip=section.querySelector('.p13-task-strip');
    if(!taskStrip){
      taskStrip=document.createElement('div');
      taskStrip.className='p13-task-strip story-reveal';
      const old=section.querySelector('.chem-task-flow,.p13-workflow-grid');
      old?.insertAdjacentElement('beforebegin',taskStrip);
    }
    const tasks=zh()?[
      ['性质预测','从结构、组成或条件出发，预测溶解度、能量、光谱、pKa 等性质。'],
      ['反应与实验','预测产物、产率、选择性或实验条件，帮助缩小需要实际尝试的范围。'],
      ['发现与设计','筛选或生成候选，把昂贵的实验和计算集中到更值得验证的对象上。']
    ]:[
      ['Property prediction','Predict solubility, energy, spectra, pKa, or other properties from structures, compositions, or conditions.'],
      ['Reaction and experiment','Predict products, yields, selectivity, or conditions to narrow the experimental search space.'],
      ['Discovery and design','Screen or generate candidates so expensive experiments and calculations focus on the most promising options.']
    ];
    taskStrip.innerHTML=tasks.map(([t,c])=>`<article><strong>${t}</strong><p>${c}</p></article>`).join('');

    let flow=section.querySelector('.p13-workflow-grid')||section.querySelector('.chem-task-flow');
    if(!flow){
      flow=document.createElement('div');
      taskStrip.insertAdjacentElement('afterend',flow);
    }
    const steps=zh()?[
      ['01','定义问题'],['02','准备数据'],['03','选择表示'],['04','训练模型'],['05','独立验证'],['06','科研决策']
    ]:[
      ['01','Define question'],['02','Prepare data'],['03','Choose representation'],['04','Train model'],['05','Validate independently'],['06','Make research decision']
    ];
    flow.className='p13-workflow-grid story-reveal';
    flow.innerHTML=steps.map(([n,t],i)=>`<article class="p13-step"><span>${n}</span><strong>${t}</strong>${i<steps.length-1?'<b aria-hidden="true">→</b>':''}</article>`).join('');
  }

  function apply(){
    ensureOrder();
    applyNumbers();
    applyP12();
    applyP14();
    applyP13Final();
    window.dispatchEvent(new Event('resize'));
  }
  apply();
  [120,520,1200,2200,3200,4300].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,90));
})();
