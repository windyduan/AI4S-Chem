(function installStaticCourseMaps(){
  const zh=()=>document.documentElement.lang!=='en';
  const bi=(a,b)=>zh()?a:b;

  function branch(kicker,title,items,tone='blue'){
    return `<article class="static-map-branch tone-${tone}"><small>${kicker}</small><strong>${title}</strong><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></article>`;
  }

  function courseOne(){
    const s=document.createElement('section');
    s.id='course-summary-map';
    s.className='section snap-section story-section static-course-map is-visible';
    s.innerHTML=`
      <div class="section-no">FINAL 01 / COURSE 01</div>
      <div class="static-map-head">
        <div class="story-kicker">COURSE MAP · STATIC SUMMARY</div>
        <h2>${bi('Course 01：人工智能技术入门','Course 01: Introduction to AI')}</h2>
        <p class="lead compact">${bi('从“AI 是什么”到真实化学科研，用一张图把主线收回来。','One static map from AI basics to real chemistry research.')}</p>
      </div>
      <div class="static-map-shell course-one-map">
        <div class="static-map-root">
          <small>COURSE 01</small>
          <strong>${bi('人工智能技术入门','Introduction to AI')}</strong>
          <span>${bi('先看懂对象、表示、模型与科研任务之间的关系','Understand objects, representations, models, and scientific tasks')}</span>
        </div>
        <div class="static-map-stem"></div>
        <div class="static-map-branches">
          ${branch('01 · BASICS',bi('建立心智模型','Mental model'),[
            'AI ⊃ ML ⊃ DL',
            bi('Sample · x · y · Model · Loss','Sample · x · y · Model · Loss'),
            bi('模型学的是输入到目标的映射','Model learns a mapping from input to target')
          ],'blue')}
          ${branch('02 · REPRESENTATION',bi('化学怎样进入模型','Chemistry as model input'),[
            bi('分子 → 机器可读表示','Molecule → machine-readable representation'),
            'Descriptor · Fingerprint · SMILES',
            'Graph · 3D',
            'Representation ≠ Model'
          ],'yellow')}
          ${branch('03 · CAPABILITY',bi('现代 AI × Chemistry','Modern AI × Chemistry'),[
            'GNN · Message Passing',
            bi('3D · 几何 · 对称性','3D · geometry · symmetry'),
            'Multimodal',
            'LLM + Tools · Scientific Agent'
          ],'sage')}
          ${branch('04 · PRACTICE',bi('真实科研案例','Real research cases'),[
            'NMRNet · Electrolyte uMLP',
            'Cat-KG + LLM · NOSE',
            'Uni-XAS · Electroplating Agent',
            bi('问题 → 数据 → 模型 → 验证','Question → data → model → validation')
          ],'coral')}
        </div>
        <div class="static-map-footer"><strong>${bi('科研主线','Scientific spine')}</strong><span>${bi('问题 → 数据 → 表示 → 模型 / 工具 → 输出 → 验证 → 决策','Question → Data → Representation → Model / Tools → Output → Validation → Decision')}</span></div>
      </div>`;
    return s;
  }

  function courseTwo(){
    const s=document.createElement('section');
    s.id='course-summary-map-2';
    s.className='section snap-section story-section static-course-map is-visible';
    s.innerHTML=`
      <div class="section-no">FINAL 02 / COURSE 02</div>
      <div class="static-map-head">
        <div class="story-kicker">COURSE MAP · STATIC SUMMARY</div>
        <h2>${bi('Course 02：AI 模型训练','Course 02: AI Model Training')}</h2>
        <p class="lead compact">${bi('从预测、Loss 和参数更新，到数据划分、泛化和可信评估。','From prediction, loss, and parameter updates to data splits, generalization, and credible evaluation.')}</p>
      </div>
      <div class="static-map-shell course-two-map">
        <div class="static-map-root">
          <small>COURSE 02</small>
          <strong>${bi('AI 模型训练','AI Model Training')}</strong>
          <span>ŷ = f(x; θ)</span>
        </div>
        <div class="static-map-stem"></div>
        <div class="static-map-branches">
          ${branch('01 · LEARN',bi('模型怎样学','How a model learns'),[
            'Prediction → Loss → Update',
            bi('用误差调整参数 θ','Use error to update parameters θ'),
            'Gradient Descent · Learning Rate'
          ],'blue')}
          ${branch('02 · TRAINING',bi('训练怎样推进','How training proceeds'),[
            'Batch · Epoch',
            bi('训练误差下降不等于泛化更好','Lower train error ≠ better generalization'),
            bi('关注 Validation 的变化','Track validation performance')
          ],'yellow')}
          ${branch('03 · HOLD OUT',bi('为什么要留出数据','Why hold out data'),[
            'Train · Validation · Test',
            'Random · Scaffold · Time · External',
            bi('避免泄漏，匹配真实使用场景','Avoid leakage; match intended use')
          ],'sage')}
          ${branch('04 · EVALUATE',bi('怎样判断可信','How to judge credibility'),[
            'MAE · RMSE · R²',
            bi('看严重失败样本和误差分布','Inspect severe failures and error distribution'),
            bi('检查适用范围 / 外推风险','Check applicability / extrapolation risk')
          ],'coral')}
        </div>
        <div class="static-map-footer"><strong>${bi('判断顺序','Evaluation order')}</strong><span>${bi('先看数据怎么切 → 再看指标怎么算 → 最后问预测对象是否在验证范围内','Check the split → understand the metric → ask whether the target lies in a validated regime')}</span></div>
      </div>`;
    return s;
  }

  function install(){
    const explore=document.getElementById('explore');
    if(!explore)return;
    document.getElementById('course-summary-map')?.remove();
    document.getElementById('course-summary-map-2')?.remove();
    const one=courseOne(),two=courseTwo();
    explore.insertAdjacentElement('beforebegin',one);
    explore.insertAdjacentElement('beforebegin',two);
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
  }

  if(!document.getElementById('static-course-map-style')){
    const style=document.createElement('style');
    style.id='static-course-map-style';
    style.textContent=`
      .static-course-map{max-width:1240px!important;padding-top:68px!important;padding-bottom:22px!important;justify-content:center!important}
      .static-course-map .static-map-head{width:100%;max-width:1100px;margin:0 auto 12px}
      .static-course-map .static-map-head h2{font-size:clamp(31px,4vw,52px);line-height:1.04;margin:.06em 0;letter-spacing:-.035em}
      .static-course-map .static-map-head .lead{font-size:14px;line-height:1.42;margin:5px 0 0;max-width:940px}
      .static-map-shell{width:100%;max-width:1100px;height:clamp(465px,62dvh,570px);margin:0 auto;padding:16px 18px 14px;box-sizing:border-box;border:2px solid var(--ink);border-radius:21px 27px 18px 24px;background:rgba(255,250,240,.86);box-shadow:7px 8px 0 rgba(38,51,47,.11);overflow:hidden;display:flex;flex-direction:column;align-items:stretch}
      .static-map-root{align-self:center;width:min(390px,75%);padding:12px 18px;border:2px solid var(--ink);border-radius:16px 21px 14px 19px;background:var(--paper);box-shadow:4px 5px 0 rgba(38,51,47,.1);text-align:center;z-index:2}
      .course-one-map .static-map-root{background:color-mix(in srgb,var(--blue) 52%,var(--paper))}
      .course-two-map .static-map-root{background:color-mix(in srgb,var(--yellow) 58%,var(--paper))}
      .static-map-root small{display:block;font-size:9px;font-weight:950;letter-spacing:.13em;color:var(--blue-strong)}
      .static-map-root strong{display:block;font-size:21px;line-height:1.18;margin-top:2px}
      .static-map-root span{display:block;margin-top:4px;font-size:11px;line-height:1.35;color:var(--muted)}
      .static-map-stem{height:18px;width:0;border-left:2px solid rgba(38,51,47,.55);align-self:center;flex:none}
      .static-map-branches{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;padding-top:18px;flex:1;min-height:0}
      .static-map-branches:before{content:"";position:absolute;left:12.5%;right:12.5%;top:0;border-top:2px solid rgba(38,51,47,.55)}
      .static-map-branch{position:relative;min-width:0;padding:13px 13px 11px;border:1.7px solid var(--ink);border-radius:13px 17px 12px 15px;background:var(--paper);box-shadow:3px 4px 0 rgba(38,51,47,.08)}
      .static-map-branch:before{content:"";position:absolute;left:50%;top:-19px;height:18px;border-left:2px solid rgba(38,51,47,.55)}
      .static-map-branch.tone-blue{background:color-mix(in srgb,var(--blue) 42%,var(--paper))}.static-map-branch.tone-yellow{background:color-mix(in srgb,var(--yellow) 48%,var(--paper))}.static-map-branch.tone-sage{background:color-mix(in srgb,var(--sage) 48%,var(--paper))}.static-map-branch.tone-coral{background:color-mix(in srgb,var(--coral) 34%,var(--paper))}
      .static-map-branch small{display:block;font-size:8.5px;font-weight:950;letter-spacing:.09em;color:var(--blue-strong)}
      .static-map-branch strong{display:block;font-size:16px;line-height:1.22;margin-top:4px}
      .static-map-branch ul{margin:9px 0 0;padding:0;list-style:none;display:grid;gap:7px}
      .static-map-branch li{position:relative;padding-left:12px;font-size:11.2px;line-height:1.38;color:var(--muted);font-weight:760}
      .static-map-branch li:before{content:"";position:absolute;left:0;top:.46em;width:6px;height:6px;border:1px solid var(--ink);border-radius:50%;background:var(--paper)}
      .static-map-footer{margin-top:10px;display:flex;align-items:center;justify-content:center;gap:12px;padding:9px 13px;border:1.5px solid rgba(38,51,47,.55);border-radius:11px;background:rgba(255,250,240,.9);text-align:center;flex:none}
      .static-map-footer strong{font-size:10px;letter-spacing:.08em;color:var(--blue-strong);white-space:nowrap}.static-map-footer span{font-size:11.2px;line-height:1.35;font-weight:800}
      @media(max-height:760px) and (min-width:901px){.static-course-map{padding-top:62px!important}.static-map-shell{height:clamp(430px,61dvh,490px);padding-top:11px}.static-map-root{padding:9px 14px}.static-map-root strong{font-size:19px}.static-map-root span{font-size:10px}.static-map-stem{height:13px}.static-map-branches{padding-top:13px}.static-map-branch:before{top:-14px;height:13px}.static-map-branch{padding:10px 11px}.static-map-branch small{font-size:8px}.static-map-branch strong{font-size:14px}.static-map-branch ul{gap:4px;margin-top:6px}.static-map-branch li{font-size:10px;line-height:1.3}.static-map-footer{margin-top:7px;padding:6px 10px}.static-map-footer span{font-size:10px}}
      @media(max-width:900px){.static-course-map{height:auto!important;max-height:none!important;min-height:100dvh!important;overflow:visible!important}.static-map-shell{height:auto;overflow:visible}.static-map-branches{grid-template-columns:repeat(2,1fr);padding-top:0}.static-map-branches:before,.static-map-branch:before,.static-map-stem{display:none}.static-map-footer{flex-direction:column;gap:3px}.static-map-root{margin-bottom:12px}.static-map-branch li{font-size:12px}}
      @media(max-width:560px){.static-map-branches{grid-template-columns:1fr}.static-map-root{width:90%}}
    `;
    document.head.appendChild(style);
  }

  install();
  [220,760,1580,2750].forEach(ms=>setTimeout(install,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(install,100));
})();
