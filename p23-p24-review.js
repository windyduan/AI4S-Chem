(function installP23P24Review(){
  const zh=()=>document.documentElement.lang!=='en';

  function applyP23(){
    const section=document.getElementById('review-shelf-screen');
    if(!section)return;

    const kicker=section.querySelector('.story-kicker');
    const title=section.querySelector('.story-copy h2');
    if(kicker)kicker.textContent=zh()?'综述与进展':'REVIEWS & PROGRESS';
    if(title)title.textContent=zh()
      ?'了解 AI × Chemistry 方向目前的进展'
      :'Where AI × Chemistry stands today';
    section.querySelector('.story-copy .lead')?.remove();

    let summary=section.querySelector('.course-bridge');
    if(!summary){
      summary=document.createElement('div');
      summary.className='course-bridge';
      section.appendChild(summary);
    }
    summary.classList.add('p23-course-summary');
    summary.innerHTML=zh()
      ?'<strong>第一堂课小结</strong><p>我们先认识了 AI、ML、DL 和一个机器学习问题里的基本角色，再看化学对象怎样变成描述符、指纹、图和三维结构；随后通过 GNN、三维几何、多模态、知识图谱和 Agent 等例子，理解不同模型能力怎样进入性质预测、分子模拟、发现设计和真实科研流程。</p><b>下一堂课把这些“模型会做什么”进一步拆开：模型怎样从数据产生预测，Loss 怎样推动参数更新，以及我们怎样判断它对新数据仍然有效。</b>'
      :'<strong>Course 01 recap</strong><p>We started with AI, ML, DL and the basic roles in a machine-learning problem, then followed how chemical objects become descriptors, fingerprints, graphs and 3D structures. Through GNNs, 3D geometry, multimodality, knowledge graphs and agents, we saw how different model capabilities enter property prediction, molecular simulation, discovery and real research workflows.</p><b>Course 02 opens the training process: how models turn data into predictions, how loss drives parameter updates, and how we test whether the result still works on unseen data.</b>';
  }

  function applyP24(){
    const divider=document.getElementById('course-2-divider');
    if(!divider)return;
    divider.querySelector('.course-divider-copy > p')?.remove();
  }

  function apply(){applyP23();applyP24()}
  apply();
  [120,420,760,1500,2700,3600].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,120));
})();
