// Resource rendering override: keep the "All" view balanced across AI, AI4Science, and chemistry/materials.
function renderResources(items){
  const root=document.querySelector('#resource-grid');
  const filters=document.querySelector('#filters');
  if(!root||!filters||!items?.length)return;

  const label=x=>currentLang==='zh'?(x.categoryZh||x.category):x.category;
  const categories=[...new Set(items.map(label))];

  filters.innerHTML=['All',...categories].map((c,i)=>
    `<button class="filter ${i===0?'active':''}" data-cat="${c}">${c==='All'?t('all'):c}</button>`
  ).join('');

  function balancedAll(){
    const preferredOrder=currentLang==='zh'
      ? ['AI 基础','数学与直觉','大模型与智能体','AI for Science','AI × 化学 / 材料']
      : ['AI Foundations','Math & Intuition','LLM & Agents','AI for Science','AI for Chemistry & Materials'];
    const picked=[];
    const seen=new Set();
    for(const cat of preferredOrder){
      const group=items.filter(x=>label(x)===cat);
      const featured=group.filter(x=>x.featured);
      [...featured,...group].slice(0,2).forEach(x=>{
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
    root.innerHTML=shown.map(x=>`<article class="resource-card tone-${x.tone||'blue'}">
      <div class="meta">${x.kind} · ${x.source}</div>
      <h3>${x.name}</h3>
      <p>${currentLang==='zh'?x.descriptionZh:x.descriptionEn}</p>
      <span class="resource-level">${currentLang==='zh'?x.levelZh:x.levelEn}</span><br>
      <a href="${x.url}" target="_blank" rel="noopener">${t('official')}</a>
    </article>`).join('')
  }

  draw('All');
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    draw(btn.dataset.cat);
  }));
}

// If app.js has already loaded its JSON by the time this override executes, redraw immediately.
if(window.__resources?.length) renderResources(window.__resources);

// -----------------------------------------------------------------------------
// Rich in-slide motion layer. "One screen, one idea" should not mean "static".
// -----------------------------------------------------------------------------
(function installCourseEffects(){
  // Load the interaction stylesheet without changing the page skeleton.
  if(!document.querySelector('link[data-course-effects]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='course-effects.css';
    link.dataset.courseEffects='true';
    document.head.appendChild(link);
  }

  // 1) Restore entrance animation per screen.
  const sections=[...document.querySelectorAll('.snap-section')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    },{threshold:.28});
    sections.forEach(section=>observer.observe(section));
  }else{
    sections.forEach(section=>section.classList.add('is-visible'));
  }

  // Hero should not wait for an observer tick.
  document.querySelector('#home')?.classList.add('is-visible');

  // 2) Add a neural-network data-flow visualization to the chemistry/model screen.
  const chemistry=document.querySelector('#chemistry');
  if(chemistry && !chemistry.querySelector('.model-flow-demo')){
    const demo=document.createElement('div');
    demo.className='model-flow-demo';
    demo.innerHTML=`
      <div class="model-flow-head">
        <div>
          <div class="eyebrow">MODEL VIEW · DATA FLOW</div>
          <strong class="flow-title-zh">不同化学表示 → 神经网络 → 属性预测</strong>
          <strong class="flow-title-en" hidden>Different representations → neural network → property prediction</strong>
        </div>
        <p class="model-flow-note flow-note-zh">这些表示是不同的建模选择；真实项目不一定同时使用全部输入。</p>
        <p class="model-flow-note flow-note-en" hidden>These are alternative modeling choices; a real project does not necessarily use every input at once.</p>
      </div>
      <div class="model-flow-stage">
        <div class="flow-inputs">
          <div class="flow-chip"><small>STRING</small>SMILES</div>
          <div class="flow-chip"><small>VECTOR</small>Fingerprint</div>
          <div class="flow-chip"><small>TOPOLOGY</small>Molecular Graph</div>
          <div class="flow-chip"><small>GEOMETRY</small>3D Structure</div>
        </div>
        <div class="neural-net" aria-label="animated neural network">
          <div class="nn-layer"><i class="nn-node"></i><i class="nn-node"></i><i class="nn-node"></i></div>
          <div class="nn-layer"><i class="nn-node"></i><i class="nn-node"></i><i class="nn-node"></i><i class="nn-node"></i></div>
          <div class="nn-layer"><i class="nn-node"></i><i class="nn-node"></i><i class="nn-node"></i><i class="nn-node"></i></div>
          <div class="nn-layer"><i class="nn-node"></i><i class="nn-node"></i><i class="nn-node"></i></div>
        </div>
        <div class="flow-outputs">
          <div class="flow-chip"><small>PROPERTY</small>Solubility</div>
          <div class="flow-chip"><small>PROPERTY</small>Energy</div>
          <div class="flow-chip"><small>PROPERTY</small>pK<sub>a</sub></div>
          <div class="flow-chip"><small>PROPERTY</small>Spectrum</div>
        </div>
        <div class="flow-lines" aria-hidden="true">
          <svg viewBox="0 0 800 180" preserveAspectRatio="none">
            <path d="M0 25 C160 25 205 35 330 75 S520 25 800 25"/>
            <path d="M0 65 C150 65 225 90 345 90 S570 65 800 65"/>
            <path d="M0 110 C155 110 235 90 360 95 S565 110 800 110"/>
            <path d="M0 150 C170 150 240 115 370 105 S600 150 800 150"/>
            <path d="M0 25 C170 25 230 120 380 115 S615 65 800 65"/>
            <path d="M0 150 C180 150 240 55 390 70 S620 110 800 110"/>
          </svg>
        </div>
        <i class="data-packet p1"></i><i class="data-packet p2"></i><i class="data-packet p3"></i><i class="data-packet p4"></i><i class="data-packet p5"></i>
        <div class="flow-caption flow-caption-zh">representation → learned features → prediction</div>
        <div class="flow-caption flow-caption-en" hidden>representation → learned features → prediction</div>
      </div>`;

    const cards=chemistry.querySelector('.concept-grid');
    if(cards) chemistry.insertBefore(demo,cards); else chemistry.appendChild(demo);

    if('IntersectionObserver' in window){
      const flowObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>entry.target.classList.toggle('is-active',entry.isIntersecting));
      },{threshold:.45});
      flowObserver.observe(demo);
    }else demo.classList.add('is-active');
  }

  // 3) Add animated paper ribbons to the final screen.
  const finish=document.querySelector('#finish');
  if(finish && !finish.querySelector('.ribbon-stage')){
    const stage=document.createElement('div');
    stage.className='ribbon-stage';
    const ribbons=[
      ['6%','-.6s','4.8s','190deg','28px'],['13%','-2.3s','5.6s','145deg','-20px'],['21%','-1.2s','4.9s','210deg','30px'],
      ['29%','-3.8s','6.2s','165deg','-24px'],['37%','-.1s','5.1s','205deg','22px'],['45%','-2.7s','5.8s','150deg','-34px'],
      ['53%','-1.5s','4.7s','215deg','28px'],['61%','-4.1s','6.1s','175deg','-28px'],['69%','-.8s','5.3s','200deg','34px'],
      ['77%','-3.2s','5.9s','155deg','-26px'],['85%','-1.9s','4.9s','225deg','22px'],['93%','-4.5s','6.3s','170deg','-30px'],
      ['17%','-5.2s','6.5s','190deg','18px'],['58%','-5.7s','6.7s','210deg','-22px'],['82%','-6.1s','6.8s','160deg','26px']
    ];
    ribbons.forEach((cfg,i)=>{
      const el=document.createElement('i');
      el.className=`ribbon r${i+1}`;
      el.style.setProperty('--x',cfg[0]);el.style.setProperty('--delay',cfg[1]);el.style.setProperty('--duration',cfg[2]);el.style.setProperty('--rot',cfg[3]);el.style.setProperty('--drift',cfg[4]);
      stage.appendChild(el);
    });
    finish.prepend(stage);
  }

  // Keep the injected labels synchronized with the existing language toggle.
  function syncEffectLanguage(){
    const zh=currentLang==='zh';
    document.querySelectorAll('.flow-title-zh,.flow-note-zh,.flow-caption-zh').forEach(el=>el.hidden=!zh);
    document.querySelectorAll('.flow-title-en,.flow-note-en,.flow-caption-en').forEach(el=>el.hidden=zh);
  }
  syncEffectLanguage();
  document.querySelector('#lang-toggle')?.addEventListener('click',()=>setTimeout(syncEffectLanguage,0));
})();
