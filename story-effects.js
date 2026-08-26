(function loadStoryModules(){
  const modules=[
    'story-effects-core.js?v=20260824b',
    'story-foundations.js?v=20260824a',
    'story-generalization.js?v=20260824a',
    'story-chemistry.js?v=20260825a',
    'story-cases.js?v=20260824a',
    'story-cases-extended.js?v=20260824a',
    'course-order.js?v=20260826a',
    'story-navigation.js?v=20260824b',
    'representation-p7.js?v=20260825d',
    'representation-p10.js?v=20260825c',
    'molecule501-p4.js?v=20260825b',
    'gnn-p9.js?v=20260825b',
    'evaluation-p34-p38.js?v=20260825a',
    'review-p40.js?v=20260825c',
    'summary-static.js?v=20260825b',
    'p1-review.js?v=20260825a',
    'p3-review.js?v=20260825a',
    'p5-review.js?v=20260825b',
    'p8-review.js?v=20260825a',
    'p11-review.js?v=20260825a',
    'p15-p20-review.js?v=20260825b',
    'content-tone-cleanup.js?v=20260825a',
    'p21-review.js?v=20260825a',
    'p22-review.js?v=20260825a',
    'p23-p24-review.js?v=20260825b',
    'p25-review.js?v=20260825a',
    'p26-p27-review.js?v=20260825a',
    'p28-review.js?v=20260825a',
    'p29-p39-review.js?v=20260825a',
    'final-alignment.js?v=20260826a',
    'case-layout-main-fix.js?v=20260826b',
    'js/course/case-story-reset.js?v=20260826a',
    'case-story-main.js?v=20260826a',
    'js/course/course-overrides.js?v=20260826a',
    'js/course/text-cleanup.js?v=20260826a'
  ];

  function load(src){
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src;
      s.onload=resolve;
      s.onerror=()=>reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(s);
    });
  }

  (async()=>{
    for(const src of modules){
      try{await load(src)}catch(error){console.error(error);break}
    }
  })();
})();
