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
        load('story-chemistry.js?v=20260825a',()=>
          load('story-cases.js?v=20260824a',()=>
            load('story-cases-extended.js?v=20260824a',()=>
              load('course-order.js?v=20260825a',()=>
                load('story-navigation.js?v=20260824b',()=>
                  load('representation-p7.js?v=20260825c',()=>
                    load('representation-p10.js?v=20260825b',()=>
                      load('molecule501-p4.js?v=20260825b',()=>
                        load('gnn-p9.js?v=20260825a',()=>
                          load('evaluation-p34-p38.js?v=20260825a',()=>
                            load('review-p40.js?v=20260825a',()=>
                              load('summary-static.js?v=20260825b',()=>
                                load('p1-review.js?v=20260825a',()=>
                                  load('p3-review.js?v=20260825a',()=>
                                    load('p5-review.js?v=20260825a'))))))))))))))))));
})();
