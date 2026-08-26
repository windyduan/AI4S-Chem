(function installP23P24Review(){
  const zh=()=>document.documentElement.lang!=='en';

  function applyP23(){
    const section=document.getElementById('review-shelf-screen');
    if(!section)return;
    const kicker=section.querySelector('.story-kicker');
    const title=section.querySelector('.story-copy h2');
    if(kicker)kicker.textContent=zh()?'综述与进展':'REVIEWS & PROGRESS';
    if(title)title.textContent=zh()?'了解 AI × Chemistry 方向目前的进展':'Where AI × Chemistry stands today';
    section.querySelector('.story-copy .lead')?.remove();
    section.querySelector('.course-bridge')?.remove();

    const cards=[...section.querySelectorAll('.review-card')];
    if(zh()&&cards[3]){
      const p=cards[3].querySelector('p');
      if(p)p.textContent='上海人工智能实验室等团队梳理了科学智能体的核心能力、科研流程，以及生命科学、化学、材料和物理中的自主科学发现案例。';
    }
  }

  function applyP24(){
    document.getElementById('course-2-divider')?.querySelector('.course-divider-copy > p')?.remove();
  }

  function apply(){applyP23();applyP24()}
  apply();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
