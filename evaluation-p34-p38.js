(function installEvaluationReviewFixes(){
  const bi=(zh,en)=>`<span class="story-zh">${zh}</span><span class="story-en">${en}</span>`;

  // P34 — make color semantics explicit in the unseen-data diagram.
  const unseen=document.getElementById('unseen-vocabulary');
  if(unseen){
    const spectrum=unseen.querySelector('.unseen-spectrum');
    if(spectrum&&!unseen.querySelector('.unseen-legend')){
      const legend=document.createElement('div');
      legend.className='unseen-legend';
      legend.innerHTML=`
        <span><i class="legend-dot train"></i>${bi('蓝色：训练数据中的样本','Blue: samples in the training data')}</span>
        <span><i class="legend-dot query"></i>${bi('红色：当前未见样本','Coral: the current unseen sample')}</span>
      `;
      spectrum.insertAdjacentElement('beforebegin',legend);
    }
  }

  // P37 — show how MAE and RMSE are actually calculated.
  const metric=document.getElementById('metric-lab-screen');
  if(metric){
    const panel=metric.querySelector('.metric-panel');
    const values=metric.querySelector('.metric-values');
    if(panel&&values&&!panel.querySelector('.metric-formulas')){
      const formulas=document.createElement('div');
      formulas.className='metric-formulas';
      formulas.innerHTML=`
        <div class="metric-formula-card">
          <small>MAE · Mean Absolute Error</small>
          <strong>MAE = (1/n) Σ |y<sub>i</sub> − ŷ<sub>i</sub>|</strong>
          <p>${bi('把每个样本的绝对误差取平均。','Average the absolute error across samples.')}</p>
        </div>
        <div class="metric-formula-card">
          <small>RMSE · Root Mean Squared Error</small>
          <strong>RMSE = √[(1/n) Σ (y<sub>i</sub> − ŷ<sub>i</sub>)²]</strong>
          <p>${bi('误差先平方再平均、最后开根号，因此大误差会被放大。','Square errors, average them, then take the square root; large errors receive more weight.')}</p>
        </div>
        <div class="metric-symbol-note">${bi('yᵢ = 实测值，ŷᵢ = 预测值，n = 样本数','yᵢ = observed value, ŷᵢ = prediction, n = number of samples')}</div>
      `;
      panel.insertBefore(formulas,values);
    }
  }

  // P38 — show R² as a comparison with the mean-prediction baseline.
  const r2=document.getElementById('r2-baseline-screen');
  if(r2){
    const panel=r2.querySelector('.r2-panel');
    const values=r2.querySelector('.r2-values');
    if(panel&&values&&!panel.querySelector('.r2-formula-box')){
      const formula=document.createElement('div');
      formula.className='r2-formula-box';
      formula.innerHTML=`
        <small>R² · coefficient of determination</small>
        <strong>R² = 1 − <span class="r2-frac"><span>Σ (y<sub>i</sub> − ŷ<sub>i</sub>)²</span><span>Σ (y<sub>i</sub> − ȳ)²</span></span></strong>
        <p>${bi('分子：模型的残差平方和；分母：永远预测样本均值 ȳ 时的平方误差。R² = 1 最好，≈ 0 与均值基线相近，< 0 比均值基线还差。','Numerator: model residual sum of squares. Denominator: squared error from always predicting the sample mean ȳ. R² = 1 is ideal, ≈ 0 is near the mean baseline, and < 0 is worse than that baseline.')}</p>
      `;
      panel.insertBefore(formula,values);
    }
  }

  const style=document.createElement('style');
  style.textContent=`
    #unseen-vocabulary .unseen-legend{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin-top:10px;font-size:9px;font-weight:850;color:var(--muted)}
    #unseen-vocabulary .unseen-legend span{display:flex;align-items:center;gap:6px}
    #unseen-vocabulary .legend-dot{display:inline-block;width:13px;height:13px;border:1.5px solid var(--ink);border-radius:50%;flex:none}
    #unseen-vocabulary .legend-dot.train{background:var(--blue)}
    #unseen-vocabulary .legend-dot.query{width:17px;height:17px;background:var(--coral);box-shadow:2px 2px 0 rgba(38,51,47,.12)}
    #unseen-vocabulary .unseen-spectrum{margin-top:8px}

    #metric-lab-screen .metric-formulas{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:12px}
    #metric-lab-screen .metric-formula-card{padding:8px 9px;border:1.5px solid var(--ink);border-radius:10px;background:var(--paper)}
    #metric-lab-screen .metric-formula-card:nth-child(2){background:color-mix(in srgb,var(--coral) 24%,var(--paper))}
    #metric-lab-screen .metric-formula-card small{display:block;font-size:6.8px;font-weight:950;letter-spacing:.05em;color:var(--muted)}
    #metric-lab-screen .metric-formula-card strong{display:block;margin-top:3px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;line-height:1.35;letter-spacing:-.02em}
    #metric-lab-screen .metric-formula-card p{margin:4px 0 0;font-size:7.8px;line-height:1.35;color:var(--muted)}
    #metric-lab-screen .metric-symbol-note{grid-column:1/-1;font-size:7.5px;line-height:1.3;color:var(--muted);text-align:center}
    #metric-lab-screen .metric-values{margin-top:8px}

    #r2-baseline-screen .r2-formula-box{margin-top:12px;padding:9px 10px;border:1.5px solid var(--ink);border-radius:11px;background:color-mix(in srgb,var(--yellow) 40%,var(--paper))}
    #r2-baseline-screen .r2-formula-box>small{display:block;font-size:7px;font-weight:950;letter-spacing:.06em;color:var(--muted)}
    #r2-baseline-screen .r2-formula-box>strong{display:flex;align-items:center;gap:5px;margin-top:4px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;line-height:1.2}
    #r2-baseline-screen .r2-frac{display:inline-grid;grid-template-rows:auto auto;text-align:center;font-size:8.5px;line-height:1.25}
    #r2-baseline-screen .r2-frac span:first-child{border-bottom:1px solid var(--ink);padding:0 3px 2px}
    #r2-baseline-screen .r2-frac span:last-child{padding:2px 3px 0}
    #r2-baseline-screen .r2-formula-box p{margin:6px 0 0;font-size:7.8px;line-height:1.4;color:var(--muted)}
    #r2-baseline-screen .r2-values{margin-top:8px}

    @media(max-width:760px){
      #metric-lab-screen .metric-formulas{grid-template-columns:1fr}
      #metric-lab-screen .metric-symbol-note{grid-column:auto}
      #r2-baseline-screen .r2-formula-box>strong{align-items:flex-start;flex-wrap:wrap}
    }
  `;
  document.head.appendChild(style);
})();
