(function bootstrapCourse(){
  const root=document.documentElement;
  if(document.body)document.body.style.visibility='hidden';

  // Keep module execution deterministic, but let the browser download the files in parallel.
  // Page builders run first; final cleanup/order/navigation runs only after the page set exists.
  const modules=[
    'story-effects-core.js?v=20260828c',
    'story-foundations.js?v=20260828c',
    'story-generalization.js?v=20260828c',
    'story-chemistry.js?v=20260828c',
    'story-cases.js?v=20260828c',
    'story-cases-extended.js?v=20260828c',
    'representation-p7.js?v=20260828c',
    'representation-p10.js?v=20260828c',
    'molecule501-p4.js?v=20260828c',
    'gnn-p9.js?v=20260828c',
    'review-p40.js?v=20260828c',
    'summary-static.js?v=20260828c',
    'p5-review.js?v=20260828c',
    'p21-review.js?v=20260828c',
    'js/course/training/model-equation.js?v=20260828e',
    'js/course/training/train-loop.js?v=20260828c',
    'js/course/pages/research-orbit.js?v=20260828c',
    'js/course/training/training-playground.js?v=20260828c',
    'js/course/training/batch-epoch.js?v=20260828c',
    'js/course/training/holdout.js?v=20260828c',
    'js/course/training/generalization.js?v=20260828c',
    'js/course/training/split-scenarios.js?v=20260828c',
    'js/course/training/evaluation-traps.js?v=20260828c',
    'js/course/training/metrics.js?v=20260828c',
    'js/course/training/r2.js?v=20260828c',
    'js/course/training/trust-zone.js?v=20260828c',
    'js/course/cases/cases.js?v=20260828c',
    'js/course/course01/continuity.js?v=20260828c',
    'final-alignment.js?v=20260828c',
    'story-navigation.js?v=20260828c',
    'content-tone-cleanup.js?v=20260828c',
    'course-order.js?v=20260828d',
    'js/course/layout/title-fit.js?v=20260828c',
    'js/course/layout/structure-sync.js?v=20260828e'
  ];

  const failures=[];
  function inject(src){
    return new Promise(resolve=>{
      const s=document.createElement('script');
      s.src=src;
      s.async=false;
      s.onload=resolve;
      s.onerror=()=>{failures.push(src);console.error(`Failed to load ${src}`);resolve()};
      document.body.appendChild(s);
    });
  }

  function stylesReady(){
    return [...document.querySelectorAll('link[rel="stylesheet"]')].every(link=>Boolean(link.sheet));
  }

  function waitForFinalState(timeout=2600){
    const started=performance.now();
    return new Promise(resolve=>{
      function check(){
        const count=document.querySelectorAll('main .snap-section').length;
        if((count>=40&&stylesReady())||performance.now()-started>=timeout){resolve();return}
        requestAnimationFrame(check);
      }
      check();
    });
  }

  const jobs=modules.map(inject);
  Promise.all(jobs)
    .then(()=>waitForFinalState())
    .finally(()=>{
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('course:structure-changed'));
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        if(document.body)document.body.style.visibility='';
        root.classList.remove('course-booting');
        root.dataset.courseReady='1';
        if(failures.length)console.warn('Course loaded with missing modules:',failures);
      }));
    });
})();
