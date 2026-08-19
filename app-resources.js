// Resource rendering override: keep "All" balanced across inspiration, AI, AI4Science, and chemistry/materials.
function renderResources(items){
  const root=document.querySelector('#resource-grid');
  const filters=document.querySelector('#filters');
  if(!root||!filters||!items?.length)return;

  const label=x=>currentLang==='zh'?(x.categoryZh||x.category):x.category;
  const categories=[...new Set(items.map(label))];

  filters.innerHTML=['All',...categories].map((c,i)=>
    `<button class="filter ${i===0?'active':''}" data-cat="${c}">${c==='All'?t('all'):c}</button>`
  ).join('');

  function uniqueTake(group,count=2){
    const ordered=[...group.filter(x=>x.featured),...group];
    const seen=new Set();
    const out=[];
    for(const item of ordered){
      if(seen.has(item.name))continue;
      seen.add(item.name);out.push(item);
      if(out.length>=count)break;
    }
    return out;
  }

  function balancedAll(){
    const preferredOrder=currentLang==='zh'
      ? ['灵感与直觉','AI 基础','AI for Science','AI × 化学 / 材料','大模型与智能体']
      : ['Inspiration & Intuition','AI Foundations','AI for Science','AI for Chemistry & Materials','LLM & Agents'];
    const picked=[];
    const seen=new Set();
    for(const cat of preferredOrder){
      uniqueTake(items.filter(x=>label(x)===cat),2).forEach(x=>{
        if(!seen.has(x.name)){picked.push(x);seen.add(x.name)}
      });
    }
    for(const x of items){
      if(picked.length>=12)break;
      if(!seen.has(x.name)){picked.push(x);seen.add(x.name)}
    }
    return picked.slice(0,12);
  }

  function draw(cat='All'){
    const shown=cat==='All'?balancedAll():items.filter(x=>label(x)===cat);
    root.innerHTML=shown.map(x=>{
      const inspiration=['灵感与直觉','Inspiration & Intuition'].includes(label(x));
      return `<article class="resource-card tone-${x.tone||'blue'} ${inspiration?'resource-inspiration':''}">
        <div class="meta">${x.kind} · ${x.source}</div>
        <h3>${x.name}</h3>
        <p>${currentLang==='zh'?x.descriptionZh:x.descriptionEn}</p>
        <span class="resource-level">${currentLang==='zh'?x.levelZh:x.levelEn}</span><br>
        <a href="${x.url}" target="_blank" rel="noopener">${t('official')}</a>
      </article>`
    }).join('');
  }

  draw('All');
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    draw(btn.dataset.cat);
  }));
}

if(window.__resources?.length) renderResources(window.__resources);

(function installCourseEffects(){
  function injectStyle(href,key){
    if(document.querySelector(`link[data-${key}]`))return;
    const link=document.createElement('link');
    link.rel='stylesheet';link.href=href;link.dataset[key]='true';document.head.appendChild(link);
  }
  injectStyle('course-effects.css?v=20260819c','courseEffects');
  injectStyle('layout-fixes.css?v=20260819e','layoutFixes');
  injectStyle('homepage-final.css?v=20260819a','homepageFinal');

  // Page-internal motion: scrolling changes the page, entering a page starts its explanation.
  const sections=[...document.querySelectorAll('.snap-section')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting)entry.target.classList.add('is-visible');
    }),{threshold:.28});
    sections.forEach(section=>observer.observe(section));
  }else sections.forEach(section=>section.classList.add('is-visible'));
  document.querySelector('#home')?.classList.add('is-visible');

  // Restore the handwritten closing line under GROUP links.
  const group=document.querySelector('#group');
  if(group&&!group.querySelector('.group-hand-note')){
    const note=document.createElement('p');
    note.className='group-hand-note';
    const updateGroupNote=()=>{
      note.textContent=currentLang==='zh'
        ? '课程到这里结束，但真正有意思的问题，往往从回到自己的科研之后才开始。'
        : 'The course ends here, but the interesting questions usually begin when you return to your own research.';
    };
    updateGroupNote();
    group.appendChild(note);
    document.querySelector('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(updateGroupNote));
  }

  // Make the training playground feel like a real dataset rather than a tiny toy scatter.
  try{
    if(typeof trainPts!=='undefined' && typeof resetTrainer==='function' && typeof drawTrainer==='function'){
      const targetSlope=1.08;
      const targetIntercept=.06;
      trainPts=Array.from({length:32},(_,i)=>{
        const baseX=-.94+i*(1.88/31);
        const x=baseX+(Math.random()-.5)*.025;
        const structuredNoise=Math.sin(i*1.7)*.055+(Math.random()-.5)*.15;
        return [x,targetSlope*x+targetIntercept+structuredNoise];
      });
      if(typeof tcv!=='undefined'&&tcv){tcv.height=430;tcv.width=1000}
      resetTrainer(false);
    }
  }catch(err){console.warn('trainer enhancement skipped',err)}

  // Redesigned scientific data-flow diagram.
  const chemistry=document.querySelector('#chemistry');
  if(chemistry&&!chemistry.querySelector('.model-flow-demo')){
    const demo=document.createElement('div');
    demo.className='model-flow-demo';
    demo.innerHTML=`
      <div class="model-flow-head">
        <div>
          <div class="eyebrow">MODEL VIEW · DATA FLOW</div>
          <strong><span class="only-zh">化学表示 → 神经网络 → 属性预测</span><span class="only-en">Chemical representation → neural network → property prediction</span></strong>
        </div>
        <p class="model-flow-note">
          <span class="only-zh">不同表示代表不同建模选择；真实项目通常选择其中一种或少数组合，而不是全部同时输入。</span>
          <span class="only-en">Representations are modeling choices; real projects usually use one or a small combination rather than every input at once.</span>
        </p>
      </div>
      <div class="flow-figure">
        <svg class="model-flow-svg" viewBox="0 0 1000 330" role="img" aria-label="Chemical representations flowing through a neural network to property predictions">
          <defs><filter id="paper-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="2" dy="3" stdDeviation="0" flood-color="#26332f" flood-opacity="0.16"/></filter></defs>
          <g class="flow-headings"><text x="110" y="20" text-anchor="middle">CHEMICAL REPRESENTATION</text><text x="505" y="20" text-anchor="middle">LEARNED MODEL</text><text x="890" y="20" text-anchor="middle">PROPERTY PREDICTION</text></g>
          <g class="flow-boxes flow-input-boxes">
            <g transform="translate(24 38)"><rect width="176" height="46" rx="11"/><text x="88" y="20" text-anchor="middle">SMILES</text><text class="box-sub" x="88" y="35" text-anchor="middle">CCO · string</text></g>
            <g transform="translate(24 102)"><rect width="176" height="46" rx="11"/><text x="88" y="20" text-anchor="middle">Fingerprint</text><text class="box-sub" x="88" y="35" text-anchor="middle">010011… · vector</text></g>
            <g transform="translate(24 166)"><rect width="176" height="46" rx="11"/><text x="88" y="20" text-anchor="middle">Molecular graph</text><text class="box-sub" x="88" y="35" text-anchor="middle">atoms + bonds</text></g>
            <g transform="translate(24 230)"><rect width="176" height="46" rx="11"/><text x="88" y="20" text-anchor="middle">3D structure</text><text class="box-sub" x="88" y="35" text-anchor="middle">Z + coordinates</text></g>
          </g>
          <g class="flow-boxes flow-output-boxes">
            <g transform="translate(800 38)"><rect width="176" height="46" rx="11"/><text x="88" y="28" text-anchor="middle">Solubility</text></g>
            <g transform="translate(800 102)"><rect width="176" height="46" rx="11"/><text x="88" y="28" text-anchor="middle">Energy</text></g>
            <g transform="translate(800 166)"><rect width="176" height="46" rx="11"/><text x="88" y="28" text-anchor="middle">pK<tspan baseline-shift="sub" font-size="9">a</tspan></text></g>
            <g transform="translate(800 230)"><rect width="176" height="46" rx="11"/><text x="88" y="28" text-anchor="middle">Spectrum</text></g>
          </g>
          <g class="nn-intake"></g><g class="nn-edges"></g><g class="nn-outtake"></g>
          <g class="flow-tracks">
            <path id="track-a" d="M200 61 C245 61 270 67 315 72 C365 78 392 115 440 117 C495 119 520 151 565 156 C620 163 644 124 690 125 C746 126 768 65 800 61"/>
            <path id="track-b" d="M200 125 C250 125 270 127 315 133 C370 140 392 154 440 157 C493 160 521 117 565 116 C618 115 645 157 690 160 C742 164 770 129 800 125"/>
            <path id="track-c" d="M200 189 C248 189 271 190 315 193 C365 197 396 207 440 207 C492 207 519 190 565 188 C620 187 646 194 690 193 C744 192 769 189 800 189"/>
            <path id="track-d" d="M200 253 C245 253 274 248 315 246 C366 243 394 223 440 222 C494 221 520 245 565 247 C619 249 646 247 690 248 C742 249 770 252 800 253"/>
          </g>
          <g class="nn-nodes"></g>
          <g class="flow-particles" aria-hidden="true">
            <circle class="particle particle-a" r="5"><animateMotion dur="4.3s" begin="0s" repeatCount="indefinite"><mpath href="#track-a"/></animateMotion></circle>
            <circle class="particle particle-b" r="5"><animateMotion dur="4.3s" begin="0.9s" repeatCount="indefinite"><mpath href="#track-b"/></animateMotion></circle>
            <circle class="particle particle-c" r="5"><animateMotion dur="4.3s" begin="1.8s" repeatCount="indefinite"><mpath href="#track-c"/></animateMotion></circle>
            <circle class="particle particle-d" r="5"><animateMotion dur="4.3s" begin="2.7s" repeatCount="indefinite"><mpath href="#track-d"/></animateMotion></circle>
          </g>
          <g class="flow-annotations"><path d="M390 301 C455 313 548 313 620 300"/><text x="505" y="321" text-anchor="middle">learned latent features</text></g>
        </svg>
      </div>
      <div class="flow-caption">representation → learned features → prediction</div>`;

    const cards=chemistry.querySelector('.concept-grid');
    cards?chemistry.insertBefore(demo,cards):chemistry.appendChild(demo);

    const svg=demo.querySelector('.model-flow-svg');
    const ns='http://www.w3.org/2000/svg';
    const layers=[{x:315,ys:[72,132,192,252]},{x:440,ys:[57,107,157,207,257]},{x:565,ys:[57,107,157,207,257]},{x:690,ys:[72,132,192,252]}];
    const edgeGroup=svg.querySelector('.nn-edges'),nodeGroup=svg.querySelector('.nn-nodes'),intake=svg.querySelector('.nn-intake'),outtake=svg.querySelector('.nn-outtake');
    layers.slice(0,-1).forEach((layer,li)=>{const next=layers[li+1];layer.ys.forEach(y1=>next.ys.forEach(y2=>{const line=document.createElementNS(ns,'line');line.setAttribute('x1',layer.x);line.setAttribute('y1',y1);line.setAttribute('x2',next.x);line.setAttribute('y2',y2);line.setAttribute('class',`nn-edge edge-layer-${li+1}`);edgeGroup.appendChild(line)}))});
    const inputYs=[61,125,189,253];
    inputYs.forEach((y,i)=>{const targetYs=i===0?[72,132]:i===1?[72,132,192]:i===2?[132,192,252]:[192,252];targetYs.forEach(ty=>{const path=document.createElementNS(ns,'path');path.setAttribute('d',`M200 ${y} C245 ${y} 270 ${ty} 303 ${ty}`);path.setAttribute('class','peripheral-edge');intake.appendChild(path)})});
    const outputYs=[61,125,189,253];
    outputYs.forEach((y,i)=>{const sourceYs=i===0?[72,132]:i===1?[72,132,192]:i===2?[132,192,252]:[192,252];sourceYs.forEach(sy=>{const path=document.createElementNS(ns,'path');path.setAttribute('d',`M702 ${sy} C744 ${sy} 768 ${y} 800 ${y}`);path.setAttribute('class','peripheral-edge');outtake.appendChild(path)})});
    layers.forEach((layer,li)=>layer.ys.forEach((y,ni)=>{const node=document.createElementNS(ns,'circle');node.setAttribute('cx',layer.x);node.setAttribute('cy',y);node.setAttribute('r','8.5');node.setAttribute('class',`nn-svg-node node-layer-${li+1}`);node.style.setProperty('--node-delay',`${li*.28+ni*.035}s`);nodeGroup.appendChild(node)}));
    if('IntersectionObserver'in window){const flowObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-active',entry.isIntersecting)),{threshold:.42});flowObserver.observe(demo)}else demo.classList.add('is-active');
  }

  // Falling paper streamers for the final page.
  const finish=document.querySelector('#finish');
  if(finish&&!finish.querySelector('.ribbon-stage')){
    const stage=document.createElement('div');stage.className='ribbon-stage';
    const widths=[6,8,5,10,7,6,9,5,8,6,10,5,7,9,6,8,5,10,7,6,9,5,8,6];
    const heights=[78,116,92,64,126,88,104,72,132,84,112,68,122,96,76,128,86,108,70,118,94,80,124,100];
    for(let i=0;i<24;i++){
      const el=document.createElement('i');el.className='ribbon';
      const x=3+i*(94/23)+(Math.random()-.5)*2.2;
      const delay=-(Math.random()*6.5).toFixed(2)+'s';
      const duration=(5.2+Math.random()*2.8).toFixed(2)+'s';
      const drift=((Math.random()-.5)*78).toFixed(1)+'px';
      const rotation=(340+Math.random()*360).toFixed(0)+'deg';
      el.style.setProperty('--x',x.toFixed(2)+'%');
      el.style.setProperty('--delay',delay);
      el.style.setProperty('--duration',duration);
      el.style.setProperty('--drift',drift);
      el.style.setProperty('--rot',rotation);
      el.style.setProperty('--w',widths[i]+'px');
      el.style.setProperty('--h',heights[i]+'px');
      stage.appendChild(el);
    }
    finish.prepend(stage);
  }
})();