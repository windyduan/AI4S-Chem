(function installResearchOrbit(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const section=$('#chem-task-map-screen');
  if(!section)return;

  if(!document.querySelector('link[data-research-orbit]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='css/course/pages/research-orbit.css?v=20260826a';style.dataset.researchOrbit='1';document.head.appendChild(style);
  }

  document.getElementById('discovery-story')?.remove();

  const no=$('.section-no',section),kicker=$('.story-kicker',section),title=$('.story-copy h2',section),lead=$('.story-copy .lead',section);
  if(no)no.textContent='01J / RESEARCH LOOP';
  const old=section.querySelector('.chem-task-flow');
  let orbit=section.querySelector('.research-orbit');
  if(!orbit){orbit=document.createElement('div');orbit.className='research-orbit story-reveal';if(old)old.replaceWith(orbit);else section.appendChild(orbit)}

  const getItems=()=>zh()?[
    ['问题','现在最值得回答什么？'],
    ['数据','我们手里有哪些证据？'],
    ['表示','哪些信息应该交给模型？'],
    ['模型','用什么方式学习关系？'],
    ['验证','结果在新数据上还成立吗？'],
    ['新证据','下一次实验或计算告诉了我们什么？']
  ]:[
    ['Question','What is worth asking now?'],
    ['Data','What evidence do we have?'],
    ['Representation','What information should the model see?'],
    ['Model','How should the relationship be learned?'],
    ['Validation','Does it still work on new data?'],
    ['New evidence','What did the next experiment or calculation teach us?']
  ];

  orbit.innerHTML=`
    <svg class="research-orbit-svg" viewBox="0 0 920 440" aria-hidden="true"><defs><marker id="research-orbit-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z"/></marker></defs><path d="M460 58 C650 58 810 150 810 220 C810 330 650 392 460 392"/><path d="M460 392 C270 392 110 330 110 220 C110 150 270 58 460 58"/></svg>
    <div class="research-orbit-center"><strong></strong><span></span></div>
    ${Array.from({length:6},(_,i)=>`<button type="button" class="research-orbit-node n${i+1}" data-i="${i}"><small>${String(i+1).padStart(2,'0')}</small><strong></strong><span></span></button>`).join('')}`;

  let step=0;
  function render(){
    const items=getItems(),current=items[step];
    if(kicker)kicker.textContent=zh()?'科研流程 · 可交互':'RESEARCH WORKFLOW · INTERACTIVE';
    if(title)title.textContent=zh()?'科研不是直线，而是一轮接一轮':'Research moves in cycles, not a straight line';
    if(lead)lead.textContent=zh()?'点一圈看看：问题、数据、表示、模型、验证和新证据，会怎样重新回到下一轮决策。':'Explore the loop: questions, data, representations, models, validation and new evidence keep feeding the next decision.';
    const centerStrong=$('.research-orbit-center strong',orbit),centerNote=$('.research-orbit-center span',orbit);
    if(centerStrong)centerStrong.textContent=zh()?'科研决策':'Research decision';if(centerNote)centerNote.textContent=current[1];
    $$('.research-orbit-node',orbit).forEach((b,i)=>{b.classList.toggle('active',i===step);$('strong',b).textContent=items[i][0];$('span',b).textContent=items[i][1]});
    orbit.dataset.step=String(step);
  }
  $$('.research-orbit-node',orbit).forEach(b=>b.addEventListener('click',()=>{step=+b.dataset.i;render()}));
  render();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(render,100));
  setTimeout(()=>window.dispatchEvent(new Event('resize')),80);
})();
