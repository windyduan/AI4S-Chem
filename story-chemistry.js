(function installChemistryStory(){
  const $=(q,c=document)=>c.querySelector(q), $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const bi=(a,b)=>`<span class="story-zh">${a}</span><span class="story-en">${b}</span>`;
  function section(id,no,kicker,title,lead,body){const s=document.createElement('section');s.id=id;s.className='section snap-section story-section chemistry-story-section';s.innerHTML=`<div class="section-no">${no}</div><div class="story-copy story-reveal"><div class="story-kicker">${kicker}</div><h2>${title}</h2>${lead?`<p class="lead compact">${lead}</p>`:''}</div>${body}`;return s}
  function observe(el){if(!el)return;if('IntersectionObserver'in window){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.22});o.observe(el)}else el.classList.add('is-visible')}
  function after(anchor,el){anchor?.insertAdjacentElement('afterend',el);observe(el);return el}
  function before(anchor,el){anchor?.insertAdjacentElement('beforebegin',el);observe(el);return el}

  const rep=$('#represent'),chemistry=$('#chemistry'),research=$('#research');

  // Representation is the input language; model is the learnable mapping.
  if(rep&&!$('#rep-vs-model')){
    const s=section('rep-vs-model','06A / CONCEPT','REPRESENTATION ≠ MODEL',bi('“分子怎么表示”和“用什么模型”是两次不同选择。','How we represent a molecule and which model we train are two different choices.'),bi('同一种 representation 可以交给不同模型；同一种模型家族也可能接收不同 representation。不要把 Graph 和 GNN 当成同一个词。','The same representation can feed different models, and model families can accept different representations. A molecular graph is not the same thing as a GNN.'),`
      <div class="repmodel-grid story-reveal">
        <article class="repmodel-card"><small>WHAT INFORMATION?</small><strong>Representation · x</strong><p>${bi('决定模型拿到什么信息，以及这些信息如何编码。','Defines what information is exposed to the model and how it is encoded.')}</p><div class="repmodel-examples"><span>Descriptor</span><span>Fingerprint</span><span>SMILES</span><span>Graph</span><span>3D</span></div></article>
        <div class="repmodel-arrow">→</div>
        <article class="repmodel-card"><small>HOW TO LEARN?</small><strong>Model · f(x; θ)</strong><p>${bi('决定怎样从输入学习映射关系。复杂模型不自动等于更合适。','Defines how a mapping is learned from the input. More complex does not automatically mean more appropriate.')}</p><div class="repmodel-examples"><span>Linear / RF</span><span>MLP</span><span>GNN</span><span>Transformer</span><span>Equivariant model</span></div></article>
      </div>`);
    after(rep,s);
  }

  // Non-linear capability map: graph, 3D, multimodal and tool-using systems coexist.
  if(chemistry&&!$('#capability-map-screen')){
    const s=section('capability-map-screen','06D / FRONTIER','MODERN AI × CHEMISTRY',bi('前沿不是一条“越往后越高级”的直线。','The frontier is not one linear ladder of ever-more-advanced methods.'),bi('Graph、3D atomistic、multimodal 和 LLM + tools 是并行能力方向，真实项目常把它们组合起来。','Graph models, 3D atomistic learning, multimodality, and LLM-plus-tools are parallel capabilities that can be combined in real projects.'),`
      <div class="capability-map story-reveal"><div class="capability-root">${bi('Scientific data<br>+ representations','Scientific data<br>+ representations')}</div><div class="capability-branches">
        <article class="capability-card"><small>MOLECULAR GRAPH</small><strong>GNN / Message Passing</strong><p>${bi('局域化学环境 → 分子或原子性质','local chemical environments → molecular / atomic properties')}</p></article>
        <article class="capability-card"><small>3D ATOMS + GEOMETRY</small><strong>Geometric / Equivariant ML</strong><p>${bi('能量、力、结构、原子级模拟','energies, forces, structures, atomistic simulation')}</p></article>
        <article class="capability-card"><small>MULTIMODAL DATA</small><strong>Structure ↔ Spectrum ↔ Language</strong><p>${bi('跨模态对齐、检索、预测与生成','cross-modal alignment, retrieval, prediction and generation')}</p></article>
        <article class="capability-card"><small>KNOWLEDGE + TOOLS</small><strong>LLM / Scientific Agent</strong><p>${bi('文献、数据库、代码与专业模型的工作流编排','orchestrating literature, databases, code and specialist models')}</p></article>
        <div class="capability-note">${bi('它们不是替代关系。例如一个 Agent 可以调用 3D 模型；一个 multimodal 模型也可以把图结构和光谱一起编码。','These are not replacement stages. An agent can call a 3D model; a multimodal model can jointly encode molecular graphs and spectra.')}</div>
      </div></div>`);
    before(chemistry,s);
  }

  // Keep original chemistry task cards and add one framing screen before discovery loop.
  if(chemistry&&!$('#chem-task-map-screen')){
    const s=section('chem-task-map-screen','06E / TASKS','FROM QUESTION TO SCIENTIFIC DECISION',bi('AI × Chemistry 的任务很多，但先问：它改变科研流程的哪一步？','AI × Chemistry contains many tasks; first ask which step of the scientific workflow the model changes.'),bi('对新生最够用的三类：预测、模拟、搜索/设计。最后都要回到可验证的科学决策。','For beginners, three broad modes are enough: predict, simulate, and search/design. All must return to a verifiable scientific decision.'),`
      <div class="chem-task-flow story-reveal">
        <article class="chem-task-card"><small>PREDICT</small><strong>${bi('结构 / 反应 → 性质','structure / reaction → property')}</strong><p>${bi('溶解度、光谱、产率、选择性、稳定性……','solubility, spectra, yield, selectivity, stability…')}</p></article>
        <article class="chem-task-card"><small>SIMULATE</small><strong>${bi('势能面 → 动力学','potential energy surface → dynamics')}</strong><p>${bi('机器学习势把高精度参考数据转成可扩展的原子级模拟。','ML potentials turn high-fidelity reference data into scalable atomistic simulation.')}</p></article>
        <article class="chem-task-card"><small>SEARCH / DESIGN</small><strong>${bi('目标 → 候选 → 验证','goal → candidates → validation')}</strong><p>${bi('筛选、生成、主动学习或多步骤工具工作流。','screening, generation, active learning, or multi-step tool workflows.')}</p></article>
      </div>`);
    after(chemistry,s);
  }

  // Verified group research gallery. Render from data/research.json so every claim/link is editable in one place.
  async function buildResearch(){
    if(!research||$('#verified-research-gallery'))return;
    let items=[];try{items=await fetch('data/research.json?v=20260824c').then(r=>r.json())}catch(e){console.warn('research gallery load failed',e);return}
    const wrapper=document.createElement('div');wrapper.id='verified-research-gallery';wrapper.className='verified-research-gallery';wrapper.innerHTML='<div class="research-index"></div><article class="research-detail"></article>';research.appendChild(wrapper);
    const index=$('.research-index',wrapper),detail=$('.research-detail',wrapper);
    items.forEach((it,i)=>{const b=document.createElement('button');b.type='button';b.className='research-index-btn'+(i===0?' active':'');b.dataset.i=i;b.innerHTML=`<small>${it.status} · ${it.venue}</small><strong>${zh()?(it.title||''):(it.titleEn||it.title||'')}</strong>`;index.appendChild(b)});
    function render(i){const it=items[i];if(!it)return;$$('.research-index-btn',wrapper).forEach((b,j)=>b.classList.toggle('active',j===i));const title=zh()?(it.title||''):(it.titleEn||it.title||'');const question=zh()?(it.question||''):(it.questionEn||it.question||'');const summary=zh()?(it.summary||''):(it.summaryEn||it.summary||'');const meaning=zh()?(it.meaning||''):(it.meaningEn||it.meaning||'');detail.innerHTML=`<span class="research-status">${it.status}</span><h3>${title}</h3><div class="research-venue">${it.venue}</div><div class="research-question"><strong>${zh()?'科研问题':'Scientific question'}</strong> · ${question}</div><div class="research-flow">${(it.flow||[]).map((x,k)=>`${k?'<span class="research-flow-arrow">→</span>':''}<span class="research-flow-node">${x}</span>`).join('')}</div><p class="research-summary">${summary}</p><p class="research-meaning"><strong>${zh()?'为什么放进这门课：':'Why it is in this course: '}</strong>${meaning}</p><div class="research-links">${(it.links||[]).map(l=>`<a class="research-link" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join('')}</div><div class="research-evidence-note">${zh()?'这里严格按证据类型标注：Published / Conference / Preprint / Official Project。机构新闻不会被写成“论文”；预印本也不会被写成“已正式发表”。':'Evidence level is explicit: Published / Conference / Preprint / Official Project. Institutional news is not presented as a paper, and a preprint is not presented as a peer-reviewed publication.'}</div>`}
    $$('.research-index-btn',wrapper).forEach(b=>b.addEventListener('click',()=>render(+b.dataset.i)));render(0);
    $('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>{items.forEach((it,i)=>{const b=$(`.research-index-btn[data-i="${i}"]`,wrapper);if(b)b.innerHTML=`<small>${it.status} · ${it.venue}</small><strong>${zh()?(it.title||''):(it.titleEn||it.title||'')}</strong>`});const active=+($('.research-index-btn.active',wrapper)?.dataset.i||0);render(active)}));
  }
  buildResearch();

  // Review / perspective shelf after research: broad context, not group-project evidence.
  async function buildReviews(){
    if(!research||$('#review-shelf-screen'))return;let items=[];try{items=await fetch('data/reviews.json?v=20260824a').then(r=>r.json())}catch(e){console.warn('review shelf load failed',e);return}
    const s=section('review-shelf-screen','08B / REVIEWS','READ THE FIELD, NOT ONLY THE CASE STUDIES',bi('案例看“怎么做”，综述看“这个方向整体走到哪里”。','Case studies show how one problem was solved; reviews show where the field as a whole stands.'),bi('把几篇高质量综述 / Primer / Perspective 放在组内案例后面，方便新生继续系统阅读。','A few high-quality reviews, primers and perspectives sit next to the project gallery for structured follow-up reading.'),`<div class="review-shelf story-reveal">${items.map(x=>`<article class="review-card tone-${x.tone||'blue'}"><small>${x.type} · ${x.venue}</small><strong>${x.title}</strong><p>${x.description}</p><div class="review-links"><a href="${x.url}" target="_blank" rel="noopener">Paper / Review ↗</a>${x.secondary?`<a href="${x.secondary}" target="_blank" rel="noopener">AI4EC ↗</a>`:''}</div></article>`).join('')}</div>`);after(research,s)
  }
  buildReviews();

  // Update research heading to make evidence-first design explicit.
  if(research){const title=research.querySelector('h2'),lead=research.querySelector('.lead');if(title)title.textContent=zh()?'我们组正在怎么把 AI 用进真实化学问题？':'How are we using AI in real chemistry problems?';if(lead)lead.textContent=zh()?'每项工作都从科研问题出发，并保留论文、代码、数据、APP 或项目主页的真实入口。':'Each project starts from a scientific question and keeps direct links to papers, code, data, apps, or official project pages.';$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>{if(title)title.textContent=zh()?'我们组正在怎么把 AI 用进真实化学问题？':'How are we using AI in real chemistry problems?';if(lead)lead.textContent=zh()?'每项工作都从科研问题出发，并保留论文、代码、数据、APP 或项目主页的真实入口。':'Each project starts from a scientific question and keeps direct links to papers, code, data, apps, or official project pages.'}))}

  // A newly loaded module changes the total number of snap screens.
  setTimeout(()=>window.dispatchEvent(new Event('resize')),80);
})();
