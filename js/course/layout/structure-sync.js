(function installCourseStructureSync(){
  const main=document.querySelector('main');
  if(!main)return;

  let raf=0;
  const screens=()=>[...document.querySelectorAll('main .snap-section')];

  function closestIndex(arr){
    let best=0,dist=Infinity;
    arr.forEach((screen,i)=>{
      const d=Math.abs(screen.getBoundingClientRect().top);
      if(d<dist){dist=d;best=i}
    });
    return best;
  }

  function refresh(){
    raf=0;
    const arr=screens();
    document.documentElement.dataset.courseScreenCount=String(arr.length);
    const counter=document.querySelector('.story-present-nav .story-counter');
    if(counter&&arr.length){
      const i=closestIndex(arr);
      counter.textContent=`${String(i+1).padStart(2,'0')} / ${String(arr.length).padStart(2,'0')}`;
    }
  }

  function schedule(){
    if(raf)return;
    raf=requestAnimationFrame(refresh);
  }

  new MutationObserver(records=>{
    const changed=records.some(record=>[...record.addedNodes,...record.removedNodes].some(node=>
      node.nodeType===1&&(node.matches?.('.snap-section')||node.querySelector?.('.snap-section'))
    ));
    if(changed)schedule();
  }).observe(main,{childList:true});

  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  addEventListener('course:structure-changed',schedule);
  [0,250,700,1400,2600,4200].forEach(ms=>setTimeout(schedule,ms));
})();
