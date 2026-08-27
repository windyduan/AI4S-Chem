(function installP21Review(){
  const section=document.getElementById('now');
  if(!section)return;
  const zh=()=>document.documentElement.lang!=='en';

  const toolLabels={
    Literature:['文献','Literature'],
    Database:['数据库','Database'],
    Code:['代码','Code'],
    'Specialist model':['专业模型','Specialist model'],
    Simulation:['模拟','Simulation'],
    'Human review':['人工复核','Human review']
  };

  const copy={
    zh:{
      title:'AI 正在从“回答问题”走向“调用工具完成任务”',
      lead:'Agent 可以把模型、检索、代码、文件和外部工具串成工作流，用来辅助完成需要多个步骤配合的科研任务。',
      accelerateTitle:'可以加速什么？',
      accelerateBody:'文献初筛、信息整理、代码草拟、数据处理、工具调用，以及多个重复步骤之间的衔接。',
      verifyTitle:'哪些地方仍然需要人来判断？',
      verifyBody:'引用是否准确、代码是否可靠、数据处理是否合理、实验结果是否支持结论，都需要研究者核查。'
    },
    en:{
      title:'AI is moving from answering questions to using tools to complete tasks',
      lead:'Agents can connect models, retrieval, code, files, and external tools to support research tasks that require several coordinated steps.',
      accelerateTitle:'What can it accelerate?',
      accelerateBody:'Literature screening, information organization, code drafting, data processing, tool use, and repetitive multi-step workflows.',
      verifyTitle:'What still requires human judgment?',
      verifyBody:'Researchers still need to verify references, code, data processing, experimental evidence, and whether conclusions are supported.'
    }
  };

  function ensureParagraph(card,text){
    if(!card)return;
    let p=card.querySelector('p');
    if(!p){p=document.createElement('p');card.appendChild(p)}
    p.textContent=text;
  }

  function apply(){
    const c=zh()?copy.zh:copy.en;
    const title=section.querySelector('h2');
    if(title)title.textContent=c.title;

    let lead=section.querySelector('.lead');
    if(!lead&&title){lead=document.createElement('p');lead.className='lead compact';title.insertAdjacentElement('afterend',lead)}
    if(lead)lead.textContent=c.lead;

    const cards=[...section.querySelectorAll('.now-card')];
    if(cards[0]){
      const small=cards[0].querySelector('small');
      const h3=cards[0].querySelector('h3');
      if(small)small.textContent=zh()?'可以加速':'ACCELERATE';
      if(h3)h3.textContent=c.accelerateTitle;
      ensureParagraph(cards[0],c.accelerateBody);
    }
    if(cards[1]){
      const small=cards[1].querySelector('small');
      const h3=cards[1].querySelector('h3');
      if(small)small.textContent=zh()?'需要核查':'VERIFY';
      if(h3)h3.textContent=c.verifyTitle;
      ensureParagraph(cards[1],c.verifyBody);
    }

    section.querySelectorAll('a.source-inline,.p21-reference-links').forEach(el=>el.remove());

    const builder=section.querySelector('.agent-builder');
    if(builder){
      builder.querySelector('.agent-evidence')?.remove();
      const kicker=builder.querySelector('.story-kicker');
      if(kicker)kicker.textContent=zh()?'工具编排':'TOOL ORCHESTRATION';
      const heading=builder.querySelector('.agent-builder-head strong');
      if(heading)heading.textContent=zh()?'组合一条科研辅助工作流':'Build a research-support tool chain';
      const reset=builder.querySelector('.agent-reset');
      if(reset)reset.textContent=zh()?'重置':'Reset';

      builder.querySelectorAll('.agent-tool').forEach(btn=>{
        if(!btn.dataset.p21ToolEn)btn.dataset.p21ToolEn=btn.dataset.tool||btn.textContent.trim();
        const en=btn.dataset.p21ToolEn;
        const pair=toolLabels[en]||[en,en];
        btn.textContent=zh()?pair[0]:pair[1];
        btn.dataset.tool=zh()?pair[0]:pair[1];
      });

      const chips=[...builder.querySelectorAll('.agent-chip')];
      chips.forEach((chip,i)=>{
        const t=chip.textContent.trim();
        if(i===0||t==='Goal'||t==='任务')chip.textContent=zh()?'任务':'Goal';
        Object.entries(toolLabels).forEach(([en,pair])=>{
          if(t===en||t===pair[0])chip.textContent=zh()?pair[0]:pair[1];
        });
      });
    }
  }

  apply();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
