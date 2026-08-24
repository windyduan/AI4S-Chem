(function loadStoryModules(){
  function load(src,onload){
    const s=document.createElement('script');
    s.src=src;
    s.onload=onload||null;
    s.onerror=()=>console.error('Failed to load',src);
    document.body.appendChild(s);
  }
  load('story-effects-core.js?v=20260824b',()=>
    load('story-foundations.js?v=20260824a',()=>
      load('story-generalization.js?v=20260824a',()=>
        load('story-chemistry.js?v=20260824a'))));
})();
