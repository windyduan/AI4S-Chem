(function installCourseTitleFit(){
  const selector='main section .story-copy > h2';
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  let frame=0;

  function clearFit(h){
    h.style.removeProperty('font-size');
    h.style.removeProperty('white-space');
    h.style.removeProperty('max-width');
    h.style.removeProperty('text-wrap');
  }

  function fitOne(h){
    clearFit(h);
    if(window.innerWidth<=900)return;
    const parent=h.parentElement;
    if(!parent)return;
    const room=Math.floor(parent.getBoundingClientRect().width);
    if(room<320)return;

    h.style.setProperty('white-space','nowrap','important');
    h.style.setProperty('max-width','none','important');
    const base=parseFloat(getComputedStyle(h).fontSize)||42;
    const natural=h.scrollWidth;
    if(natural<=room)return;

    const fitted=Math.max(28,Math.floor(base*(room/natural)*.965));
    h.style.setProperty('font-size',`${fitted}px`,'important');

    if(h.scrollWidth>room&&fitted<=28){
      h.style.setProperty('white-space','normal','important');
      h.style.setProperty('text-wrap','balance','important');
    }
  }

  function fitAll(){
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>$$ (selector).forEach(fitOne));
  }

  fitAll();
  [180,650,1400,2600,4500].forEach(ms=>setTimeout(fitAll,ms));
  window.addEventListener('resize',fitAll,{passive:true});
  window.visualViewport?.addEventListener('resize',fitAll,{passive:true});
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(fitAll,140));

  const main=document.querySelector('main');
  if(main&&'MutationObserver'in window){
    new MutationObserver(fitAll).observe(main,{childList:true,subtree:true,characterData:true});
  }
})();
