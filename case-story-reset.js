(function detachLegacyCaseStoryHandlers(){
  function reset(id){
    const section=document.getElementById(id),list=section?.querySelector('.case-step-list');
    if(!list||list.dataset.storyLegacyDetached)return;
    [...list.children].forEach(old=>{
      const clone=old.cloneNode(true);
      delete clone.dataset.caseStoryBound;
      list.replaceChild(clone,old);
    });
    list.dataset.storyLegacyDetached='1';
  }
  function releaseLegacyHeights(){
    document.querySelectorAll('.case-section .case-stage').forEach(stage=>stage.style.setProperty('min-height','0','important'));
  }
  function apply(){
    reset('case-elyte');
    reset('case-catkg');
    releaseLegacyHeights();
  }
  apply();
  [120,420,820,1320,2200,3300,4800].forEach(ms=>setTimeout(apply,ms));
  window.addEventListener('resize',releaseLegacyHeights,{passive:true});
})();
