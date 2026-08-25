(function installP11CapabilityReview(){
  const section=document.getElementById('capability-map-screen');
  if(!section)return;
  const zh=()=>document.documentElement.lang!=='en';

  function render(){
    const title=section.querySelector('.story-copy h2');
    const kicker=section.querySelector('.story-kicker');
    const no=section.querySelector('.section-no');
    const lead=section.querySelector('.story-copy .lead');
    const root=section.querySelector('.capability-root');
    const branches=section.querySelector('.capability-branches');
    if(!title||!root||!branches)return;

    if(no)no.textContent=zh()?'06D / 模型选择':'06D / MODEL CHOICE';
    if(kicker)kicker.textContent=zh()?'数据与任务决定模型':'DATA AND TASK GUIDE MODEL CHOICE';
    title.textContent=zh()?'化学问题中，模型应该怎么选':'How should we choose a model for a chemistry problem?';
    lead?.remove();

    root.innerHTML=zh()
      ? '<strong>先看问题和数据，再选模型</strong><p>先问要预测什么，再看数据里真正有哪些信息：二维分子图、三维结构、多种模态，还是需要外部知识与工具。数据提供什么、怎样表示这些信息，决定模型需要具备什么能力。模型选择看任务与数据是否匹配，不按“越复杂越高级”来排。</p><div class="choice-path"><span>科研问题</span>→<span>数据</span>→<span>表示</span>→<span>模型</span></div>'
      : '<strong>Start from the question and data, then choose the model</strong><p>Ask what must be predicted, then inspect what information the data actually contain: molecular graphs, 3D structures, multiple modalities, or external knowledge and tools. The available information and its representation determine the capabilities the model needs. Model choice is about task-data fit, not a ladder from simple to advanced.</p><div class="choice-path"><span>Question</span>→<span>Data</span>→<span>Representation</span>→<span>Model</span></div>';

    const cards=zh()?[
      ['分子图模型','当原子和化学键是主要信息时，用图结构学习局部化学环境，适合预测分子性质或原子性质。'],
      ['三维几何模型','当空间构型、距离和方向会影响结果时，需要显式利用三维几何，例如能量、力、结构和原子级模拟。'],
      ['多模态模型','当一个问题同时包含结构、光谱、文本等不同信息时，需要把多种数据放到同一模型或同一表示空间中联合学习。'],
      ['科学智能体','当任务需要查文献、调数据库、运行代码或调用专业模型时，重点不是单一预测器，而是把知识和工具组织成可检查的科研流程。']
    ]:[
      ['Molecular graph models','Use graph structure when atoms and bonds carry the main information, especially for molecular or atomic property prediction.'],
      ['3D geometric models','Use explicit 3D geometry when conformation, distance, and direction affect the target, such as energies, forces, structures, or atomistic simulation.'],
      ['Multimodal models','Use multimodal learning when a problem combines structures, spectra, text, or other data that must be learned jointly.'],
      ['Scientific agents','Use tool-oriented systems when the workflow must search literature, query databases, run code, or call specialist models in an inspectable sequence.']
    ];

    branches.innerHTML=cards.map(([name,copy])=>`<article class="capability-card"><strong>${name}</strong><p>${copy}</p></article>`).join('');
  }

  render();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(render,60));
})();
