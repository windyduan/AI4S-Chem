(function detachLegacyCaseStoryHandlers(){
  const $=(q,c=document)=>c.querySelector(q);
  function reset(id){
    const section=document.getElementById(id),list=section?.querySelector('.case-step-list');
    if(!list||list.dataset.storyLegacyDetached)return;
    [...list.children].forEach(old=>list.replaceChild(old.cloneNode(true),old));
    list.dataset.storyLegacyDetached='1';
  }
  function apply(){reset('case-elyte');reset('case-catkg')}
  apply();
  [120,420,820,1320,2200,3300,4800].forEach(ms=>setTimeout(apply,ms));
})();
