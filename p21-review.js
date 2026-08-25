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

  function apply(){
    const title=section.querySelector('h2');
    if(title)title.textContent=zh()
      ?'AI 正在从“回答问题”走向“调用工具完成任务”'
      :'AI is moving from answering questions to using tools to complete tasks';

    section.querySelector('.lead')?.remove();
    section.querySelectorAll('.now-card p').forEach(el=>el.remove());

    const cards=[...section.querySelectorAll('.now-card')];
    if(cards[0]){
      const small=cards[0].querySelector('small');
      if(small)small.textContent=zh()?'可以加速':'ACCELERATE';
    }
    if(cards[1]){
      const small=cards[1].querySelector('small');
      if(small)small.textContent=zh()?'需要验证':'VERIFY';
    }

    section.querySelectorAll('a.source-inline').forEach(a=>a.remove());

    const builder=section.querySelector('.agent-builder');
    if(builder){
      builder.querySelector('.agent-evidence')?.remove();
      const kicker=builder.querySelector('.story-kicker');
      if(kicker)kicker.textContent=zh()?'交互 · 工具编排':'INTERACTIVE · TOOL ORCHESTRATION';
      const heading=builder.querySelector('.agent-builder-head strong');
      if(heading)heading.textContent=zh()?'给 Agent 组一条科研辅助工作流':'Build a research-support tool chain';
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

    let refs=section.querySelector('.p21-reference-links');
    if(!refs){
      refs=document.createElement('div');
      refs.className='p21-reference-links';
      section.appendChild(refs);
    }
    refs.innerHTML=zh()
      ?'<a href="https://www.bohrium.com/bohrscience" target="_blank" rel="noopener">深势科技 · 玻尔科研智能体 ↗</a><a href="https://github.com/InternLM/lagent" target="_blank" rel="noopener">上海 AI Lab · Lagent 开源框架 ↗</a>'
      :'<a href="https://www.bohrium.com/bohrscience" target="_blank" rel="noopener">DP Technology · Bohrium scientific agents ↗</a><a href="https://github.com/InternLM/lagent" target="_blank" rel="noopener">Shanghai AI Lab · Lagent ↗</a>';
  }

  apply();
  [120,420,900,1600].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,100));
})();
