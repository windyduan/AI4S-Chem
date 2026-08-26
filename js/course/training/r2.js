(function installR2Page(){
  const $=(q,c=document)=>c.querySelector(q),$$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const text=(el,cn,en)=>{if(el)el.textContent=zh()?cn:en};
  const s=$('#r2-baseline-screen');
  if(!s)return;
  if(!document.querySelector('link[data-r2-page]')){
    const l=document.createElement('link');l.rel='stylesheet';l.href='css/course/training/r2.css?v=20260826c';l.dataset.r2Page='1';document.head.appendChild(l);
  }
  function ensureFormula(){
    const panel=$('.r2-panel',s),values=$('.r2-values',s);
    if(!panel||!values||$('.r2-formula-box',panel))return;
    const box=document.createElement('div');
    box.className='r2-formula-box';
    box.innerHTML='<small></small><strong>R² = 1 − SSE / SST</strong><p></p>';
    panel.insertBefore(box,values);
  }
  function apply(){
    ensureFormula();
    text($('.section-no',s),'02J / R²','02J / R²');
    text($('.story-kicker',s),'误差之外，再和简单基线比较','COMPARE AGAINST A SIMPLE BASELINE');
    text($('.story-copy h2',s),'R² 到底比“均值预测”好多少？','How much better is R² than the mean baseline?');
    $('.story-copy .lead',s)?.remove();
    const svg=$('.r2-svg',s);if(svg)svg.setAttribute('viewBox','8 35 585 310');
    const subs=$$('.r2-svg .gen-curve-sub',s);
    text(subs[0],'理想线 y = ŷ','ideal y = ŷ');text(subs[1],'均值基线','mean baseline');text(subs[2],'实测值 y →','observed y →');text(subs[3],'预测值 ŷ →','predicted ŷ →');
    const z=$('.r2-panel label .story-zh',s),e=$('.r2-panel label .story-en',s);
    if(z)z.textContent='拖动预测结果，和均值基线比较';if(e)e.textContent='Move predictions and compare with the mean baseline';
    const sm=$$('.r2-value small',s);text(sm[0],'模型 MSE / 均值基线 MSE','Model MSE / mean-baseline MSE');text(sm[1],'R²','R²');
    const box=$('.r2-formula-box',s);if(box){text($('small',box),'R² · 决定系数','R² · coefficient of determination');text($('p',box),'R² = 1 最好；接近 0 表示与均值基线相近；小于 0 表示还不如直接预测均值。','R² = 1 is ideal; near 0 is similar to the mean baseline; below 0 is worse than always predicting the mean.')}
  }
  apply();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
