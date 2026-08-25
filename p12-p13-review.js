(function installP12P13Review(){
  const zh=()=>document.documentElement.lang!=='en';

  const numbering={
    'rep-vs-model':'01E',
    'gnn-story':'01F',
    'symmetry-story':'01G',
    'capability-map-screen':'01H',
    'chemistry':'01I',
    'chem-task-map-screen':'01J',
    'discovery-story':'01K',
    'case-nmrnet':'01L',
    'case-elyte':'01M',
    'case-catkg':'01N',
    'case-nose':'01O',
    'case-unixas':'01P',
    'case-electroplating':'01Q',
    'now':'01R',
    'research':'01S',
    'review-shelf-screen':'01T'
  };

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
    if(title)title.textContent=zh()?'AI 在化学科研里主要能做什么':'What can AI mainly do in chemistry research';
    section.querySelector('.compact-pipeline')?.remove();
  }

  function applyP13(){
    const section=document.getElementById('chem-task-map-screen');
    if(!section)return;
    const title=section.querySelector('.story-copy h2');
    const lead=section.querySelector('.story-copy .lead');
    if(title)title.textContent=zh()?'一项 AI × Chemistry 工作怎样从问题走到决策':'How an AI × Chemistry project moves from question to decision';
    if(lead)lead.textContent=zh()
      ?'把任务放进真实科研流程里：从问题定义开始，经过数据、表示、模型和验证，最后回到实验或计算决策。'
      :'Put the task into a real research workflow: define the question, prepare data and representations, build the model, validate it, and return to an experimental or computational decision.';

    const flow=section.querySelector('.chem-task-flow');
    if(!flow)return;
    const steps=zh()?[
      ['01','定义问题','先说清楚要预测、解释或优化什么，输出必须对应一个明确的化学问题。'],
      ['02','准备数据','整理实验、计算或数据库记录，确认测量条件、单位和目标定义能够比较。'],
      ['03','选择表示','把分子、反应或材料转换成描述符、图、三维结构或其他模型可处理的表示。'],
      ['04','训练模型','让模型从输入与目标之间学习规律，模型复杂度要和任务、数据量相匹配。'],
      ['05','独立验证','用没有参与训练的数据检查泛化能力，确认结果不是只记住训练样本。'],
      ['06','科研决策','把结果用于筛选候选、安排实验或计算；新证据再回到下一轮数据与模型。']
    ]:[
      ['01','Define the question','State clearly what should be predicted, explained, or optimized, and connect the output to a chemical question.'],
      ['02','Prepare data','Organize experimental, computational, or database records and make target definitions and conditions comparable.'],
      ['03','Choose a representation','Convert molecules, reactions, or materials into descriptors, graphs, 3D structures, or other model-ready representations.'],
      ['04','Train the model','Learn the mapping between inputs and targets with model complexity matched to the task and amount of data.'],
      ['05','Validate independently','Use data excluded from training to test generalization rather than memorization.'],
      ['06','Make a research decision','Use results to select candidates or plan experiments and calculations, then feed new evidence into the next cycle.']
    ];
    flow.className='p13-workflow-grid story-reveal';
    flow.innerHTML=steps.map(([n,t,c])=>`<article class="p13-step"><span>${n}</span><strong>${t}</strong><p>${c}</p></article>`).join('');
  }

  function apply(){applyNumbers();applyP12();applyP13()}
  apply();
  [120,520,1200,2200].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,90));
})();
