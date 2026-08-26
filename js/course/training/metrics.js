(function installMetricsPage(){
  const $=(q,c=document)=>c.querySelector(q),$$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const text=(el,cn,en)=>{if(el)el.textContent=zh()?cn:en};
  const s=$('#metric-lab-screen');
  if(!s)return;
  if(!document.querySelector('link[data-metrics-page]')){
    const l=document.createElement('link');
    l.rel='stylesheet';l.href='css/course/training/metrics.css?v=20260826b';l.dataset.metricsPage='1';document.head.appendChild(l);
  }
  function ensureFormulas(){
    const panel=$('.metric-panel',s),values=$('.metric-values',s);
    if(!panel||!values||$('.metric-formulas',panel))return;
    const box=document.createElement('div');
    box.className='metric-formulas';
    box.innerHTML='<div class="metric-formula-card"><small></small><strong>MAE = (1/n) Σ |yi - yhat_i|</strong><p></p></div><div class="metric-formula-card"><small></small><strong>RMSE = sqrt[(1/n) Σ (yi - yhat_i)^2]</strong><p></p></div><div class="metric-symbol-note"></div>';
    panel.insertBefore(box,values);
  }
  function apply(){
    ensureFormulas();
    const no=$('.section-no',s);if(no)no.textContent='02I / METRICS';
    text($('.story-kicker',s),'划分正确以后，才轮到看分数','METRICS COME AFTER A SOUND SPLIT');
    text($('.story-copy h2',s),'MAE 和 RMSE，分别在惩罚什么？','What do MAE and RMSE penalize differently?');
    $('.story-copy .lead',s)?.remove();
    text($('.metric-panel label strong',s),'调大最后一个样本的绝对误差','Increase the absolute error of the final sample');
    $('.metric-plot .story-note',s)?.remove();
    const f=$$('.metric-formula-card',s);
    if(f[0]){text($('small',f[0]),'MAE · 平均绝对误差','MAE · Mean Absolute Error');text($('p',f[0]),'每个样本的绝对误差取平均，结果和目标变量保持同一单位。','Average absolute error across samples; the result stays in the target units.')}
    if(f[1]){text($('small',f[1]),'RMSE · 均方根误差','RMSE · Root Mean Squared Error');text($('p',f[1]),'误差先平方再平均，因此少数大误差会被更明显地放大。','Square errors before averaging, so a few large errors have more influence.')}
    text($('.metric-symbol-note',s),'yi = 实测值，yhat_i = 预测值，n = 样本数','yi = observed value, yhat_i = prediction, n = number of samples');
  }
  apply();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,100));
})();
