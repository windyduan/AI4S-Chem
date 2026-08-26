(function installMetricsPage(){
  const $=(q,c=document)=>c.querySelector(q),$$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const text=(el,cn,en)=>{if(el)el.textContent=zh()?cn:en};
  const s=$('#metric-lab-screen');
  if(!s)return;
  if(!document.querySelector('link[data-metrics-page]')){
    const l=document.createElement('link');
    l.rel='stylesheet';l.href='css/course/training/metrics.css?v=20260826d';l.dataset.metricsPage='1';document.head.appendChild(l);
  }

  const sumTerm=()=>'<span class="math-sum"><span class="math-sigma">∑</span><span class="math-sum-limits"><sup>n</sup><sub>i=1</sub></span></span>';
  const fracOneN=()=>'<span class="math-frac"><span class="math-num">1</span><span class="math-den"><i>n</i></span></span>';
  const errorTerm=(squared=false)=>`<span class="math-paren">${squared?'(':'|'}</span><i>y</i><sub>i</sub><span class="math-op">−</span><span>ŷ</span><sub>i</sub><span class="math-paren">${squared?')':'|'}</span>${squared?'<sup>2</sup>':''}`;
  const maeFormula=()=>`<div class="course-math course-math-display metric-equation" role="img" aria-label="MAE equals one over n times the sum from i equals 1 to n of the absolute error"><span class="math-name">MAE</span><span class="math-op">=</span>${fracOneN()}${sumTerm()}${errorTerm(false)}</div>`;
  const rmseFormula=()=>`<div class="course-math course-math-display metric-equation" role="img" aria-label="RMSE equals the square root of one over n times the sum from i equals 1 to n of squared errors"><span class="math-name">RMSE</span><span class="math-op">=</span><span class="math-root"><span class="math-radical">√</span><span class="math-radicand">${fracOneN()}${sumTerm()}${errorTerm(true)}</span></span></div>`;

  function ensureFormulas(){
    const panel=$('.metric-panel',s),values=$('.metric-values',s);
    if(!panel||!values)return;
    let box=$('.metric-formulas',panel);
    if(!box){box=document.createElement('div');box.className='metric-formulas';panel.insertBefore(box,values)}
    if(box.dataset.mathReady==='1')return;
    box.innerHTML=`<div class="metric-formula-card"><small></small>${maeFormula()}<p></p></div><div class="metric-formula-card"><small></small>${rmseFormula()}<p></p></div><div class="metric-symbol-note"></div>`;
    box.dataset.mathReady='1';
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
    text($('.metric-symbol-note',s),'yᵢ = 实测值，ŷᵢ = 预测值，n = 样本数','yᵢ = observed value, ŷᵢ = prediction, n = number of samples');
  }
  apply();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(apply)));
})();
