(function installStoryEffects(){
  const $=(q,c=document)=>c.querySelector(q), $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const bi=(a,b)=>`<span class="story-zh">${a}</span><span class="story-en">${b}</span>`;

  function section(id,no,kicker,title,lead,body){
    const s=document.createElement('section');
    s.id=id;s.className='section snap-section story-section';
    s.innerHTML=`<div class="section-no">${no}</div><div class="story-copy story-reveal"><div class="story-kicker">${kicker}</div><h2>${title}</h2>${lead?`<p class="lead compact">${lead}</p>`:''}</div>${body}`;
    return s;
  }
  function observe(el){
    if(!el)return;
    if('IntersectionObserver'in window){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.25});o.observe(el)}else el.classList.add('is-visible');
  }
  function after(anchor,el){anchor?.insertAdjacentElement('afterend',el);observe(el);return el}
  function before(anchor,el){anchor?.insertAdjacentElement('beforebegin',el);observe(el);return el}

  // 1) Running-example screen: 500 measured molecules -> #501.
  const learn=$('#learn');
  if(learn&&!$('#molecule-501')){
    const dots=Array.from({length:50},(_,i)=>`<i class="m501-dot" style="--d:${(i%10)*18+Math.floor(i/10)*30}ms"></i>`).join('');
    const s=section('molecule-501','01B / QUESTION','RUNNING EXAMPLE · SOLUBILITY',bi('500 个已测分子，能不能帮我们预测第 501 个？','Can 500 measured molecules help us predict molecule #501?'),bi('把整门课先压成一个问题：已有结构和测得的性质，怎样得到一个对新分子可检验的预测？','Reduce the whole course to one question: with structures and measured properties, how do we obtain a testable prediction for a new molecule?'),`
      <div class="m501-layout story-reveal">
        <div class="m501-cloud">${dots}<div class="m501-label">${bi('50 个点代表“很多已测分子”（课堂示意）','50 dots stand for “many measured molecules”')}</div><div class="m501-target">#501</div></div>
        <div class="m501-machine"><div class="story-flow"><div class="story-flow-node"><small>INPUT</small><strong>x</strong><p>${bi('分子表示','representation')}</p></div><span class="story-arrow">→</span><div class="story-flow-node"><small>MODEL</small><strong>f(x; θ)</strong><p>${bi('可学习函数','learnable function')}</p></div><span class="story-arrow">→</span><div class="story-flow-node"><small>OUTPUT</small><strong>ŷ</strong><p>${bi('预测 logS','predicted logS')}</p></div></div><div class="m501-output">${bi('点击运行：让第 501 个分子走完整条预测链。','Run molecule #501 through the prediction chain.')}</div><button class="story-button primary m501-run" type="button">${bi('预测 #501 →','Predict #501 →')}</button></div>
      </div>`);
    after(learn,s);
    const machine=$('.m501-machine',s),out=$('.m501-output',s);
    $('.m501-run',s).addEventListener('click',()=>{machine.classList.remove('is-running');void machine.offsetWidth;machine.classList.add('is-running');out.textContent=zh()?'prediction ŷ = −2.7 logS（教学示意）':'prediction ŷ = −2.7 logS (teaching example)';});
  }

  // 2) Chemistry-aware split scenario screen after existing data-split playground.
  const dataSplit=$('#data-split');
  const play=$('#play');
  if(play&&!$('#split-scenarios')){
    const s=section('split-scenarios','04B / SPLIT','CHEMISTRY-AWARE EVALUATION',bi('“新分子”到底有多新？','How new is a “new molecule”?'),bi('同样叫 Test set，不同切法回答的是不同科研问题。点击四种未来场景，看考试应该怎样设计。','The same word “test set” can represent different scientific questions. Pick a future scenario and see what the evaluation is trying to simulate.'),`
      <div class="scenario-layout story-reveal"><div class="scenario-buttons">
        <button class="scenario-btn active" data-scenario="random"><strong>Random</strong><span>${bi('同一采样总体中的新样本','new samples from a similar sampled population')}</span></button>
        <button class="scenario-btn" data-scenario="scaffold"><strong>Scaffold / Series</strong><span>${bi('跨结构家族压力测试','transfer across structural families')}</span></button>
        <button class="scenario-btn" data-scenario="time"><strong>Time</strong><span>${bi('过去 → 未来','past → future')}</span></button>
        <button class="scenario-btn" data-scenario="external"><strong>External</strong><span>${bi('另一来源 / 实验室','another source / laboratory')}</span></button>
      </div><div class="scenario-stage"><h3></h3><p></p><span class="scenario-badge"></span><div class="scenario-viz"></div></div></div>`);
    if(dataSplit)after(dataSplit,s); else before(play,s);
    const cfg={
      random:{title:['Random split','Random split'],body:['适合回答“来自相似总体的新样本能否预测？”；但高度相似的分子可能同时出现在 Train 与 Test。','Useful for asking about new samples from a similar population; close analogues may appear on both sides.'],badge:['偏插值场景','interpolation-like'],mode:'mix'},
      scaffold:{title:['Scaffold / series-aware split','Scaffold / series-aware split'],body:['把结构家族成组留出，更接近“跨系列 / 新骨架”压力测试；它不是所有 OOD 问题的万能答案。','Hold out structural families as groups to stress-test transfer; this is not a universal definition of OOD.'],badge:['结构迁移','structural transfer'],mode:'cluster'},
      time:{title:['Time split','Time split'],body:['用较早数据开发，用较晚数据评估，更接近“过去预测未来”；同时也会把项目方向、实验条件等时间变化带进来。','Develop on earlier data and evaluate later data to mimic prospective use; project and experimental conditions may also drift over time.'],badge:['前瞻式','prospective-like'],mode:'time'},
      external:{title:['External test','External test'],body:['独立数据库、实验室或测量流程可以测试来源变化，但必须确认 target 定义、单位与条件可比较。','An independent database, lab, or measurement workflow tests source shift, provided targets, units, and conditions are comparable.'],badge:['来源迁移','source shift'],mode:'external'}
    };
    const stage=$('.scenario-stage',s),viz=$('.scenario-viz',s);let pts=[];
    for(let c=0;c<3;c++){const cluster=document.createElement('div');cluster.className='scenario-cluster';for(let i=0;i<10;i++){const p=document.createElement('i');p.className='scenario-point';p.style.left=`${14+(i*29+c*11)%72}%`;p.style.top=`${18+(i*37+c*17)%68}%`;cluster.appendChild(p);pts.push({p,c,i})}viz.appendChild(cluster)}
    function draw(name){const d=cfg[name];$('h3',stage).textContent=zh()?d.title[0]:d.title[1];$('p',stage).textContent=zh()?d.body[0]:d.body[1];$('.scenario-badge',stage).textContent=zh()?d.badge[0]:d.badge[1];pts.forEach(({p,c,i},idx)=>{p.className='scenario-point';if(d.mode==='mix'){if(idx%6===0)p.classList.add('test');else if(idx%7===0)p.classList.add('val')}if(d.mode==='cluster'){if(c===2)p.classList.add('test');else if(c===1&&i%4===0)p.classList.add('val')}if(d.mode==='time'){if(i>=7)p.classList.add('test');else if(i===6)p.classList.add('val')}if(d.mode==='external'){if(c===2)p.classList.add('test');else if(c===1&&i>=8)p.classList.add('val')}})}
    $$('.scenario-btn',s).forEach(b=>b.addEventListener('click',()=>{$$('.scenario-btn',s).forEach(x=>x.classList.remove('active'));b.classList.add('active');draw(b.dataset.scenario)}));draw('random');
    $('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>draw($('.scenario-btn.active',s)?.dataset.scenario||'random')));
  }

  // 3) Metric mini-lab after generalization playground.
  if(play&&!$('#metric-lab-screen')){
    const values=[.2,.2,.3,.9];
    const s=section('metric-lab-screen','04C / METRICS','MAE · RMSE · OUTLIERS',bi('同样是“平均误差”，为什么 MAE 和 RMSE 会给不同感觉？','Why can MAE and RMSE tell different stories about the same errors?'),bi('拖动最后一个样本的误差。RMSE 会因为平方项而对大误差更加敏感。','Drag the last error. RMSE responds more strongly to large errors because residuals are squared.'),`
      <div class="metric-lab story-reveal"><div class="metric-plot"><div class="metric-bars"></div><p class="story-note">${bi('关注最后一根 coral bar。','Watch the final coral bar.')}</p></div><aside class="metric-panel"><label><strong>${bi('样本 D 的绝对误差','Absolute error of sample D')}</strong><input class="metric-slider" type="range" min="0.1" max="1.8" step="0.1" value="0.9"></label><div class="metric-values"><div class="metric-value"><small>MAE</small><strong class="mae">—</strong></div><div class="metric-value"><small>RMSE</small><strong class="rmse">—</strong></div></div><p class="metric-gap"></p></aside></div>`);
    after(play,s);
    const bars=$('.metric-bars',s);values.forEach((v,i)=>{const w=document.createElement('div');w.className='metric-bar-wrap';w.innerHTML=`<div class="metric-bar ${i===3?'outlier':''}" style="--e:${v}"></div><small>${'ABCD'[i]} · <span>${v.toFixed(1)}</span></small>`;bars.appendChild(w)});
    const slider=$('.metric-slider',s);function calc(){values[3]=+slider.value;$$('.metric-bar',s).forEach((b,i)=>b.style.setProperty('--e',values[i]));$$('.metric-bar-wrap small span',s).forEach((e,i)=>e.textContent=values[i].toFixed(1));const mae=values.reduce((a,b)=>a+b,0)/4,rmse=Math.sqrt(values.reduce((a,b)=>a+b*b,0)/4);$('.mae',s).textContent=mae.toFixed(2);$('.rmse',s).textContent=rmse.toFixed(2);$('.metric-gap',s).textContent=zh()?`RMSE − MAE = ${(rmse-mae).toFixed(2)}。大误差越突出，两者差距通常越明显。`:`RMSE − MAE = ${(rmse-mae).toFixed(2)}. A larger outlier usually widens the gap.`}slider.addEventListener('input',calc);calc();$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(calc));
  }

  // 4) Extend existing representation tabs with Descriptor and 3D, while leaving old tabs intact.
  const rep=$('#represent'),tabs=rep?.querySelector('.rep-tabs'),stage=$('#rep-stage');
  if(tabs&&stage&&!tabs.querySelector('[data-rep="descriptor"]')){
    const descriptor=document.createElement('button');descriptor.className='rep-tab story-added';descriptor.dataset.rep='descriptor';descriptor.textContent='Descriptor';
    const three=document.createElement('button');three.className='rep-tab story-added';three.dataset.rep='three-d';three.textContent='3D';tabs.append(descriptor,three);
    const original=[...tabs.querySelectorAll('.rep-tab:not(.story-added)')];
    function activate(btn,html){[...tabs.querySelectorAll('.rep-tab')].forEach(x=>x.classList.remove('active'));btn.classList.add('active');stage.innerHTML=html;stage.animate?.([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:230})}
    descriptor.addEventListener('click',()=>activate(descriptor,`<div class="descriptor-grid"><div class="descriptor-chip"><small>MW</small><strong>46.1</strong></div><div class="descriptor-chip"><small>logP</small><strong>−0.3</strong></div><div class="descriptor-chip"><small>HBD</small><strong>1</strong></div><div class="descriptor-chip"><small>TPSA</small><strong>20.2</strong></div></div>`));
    three.addEventListener('click',()=>activate(three,`<div class="rep-3d"><div class="rep-3d-core"><i class="rep-bond ab"></i><i class="rep-bond bc"></i><span class="rep-atom a">C</span><span class="rep-atom b">C</span><span class="rep-atom c">O</span></div></div>`));
    original.forEach(b=>b.addEventListener('click',()=>{descriptor.classList.remove('active');three.classList.remove('active')}));
  }

  // 5) GNN message passing before chemistry applications.
  const chemistry=$('#chemistry');
  if(chemistry&&!$('#gnn-story')){
    const s=section('gnn-story','06B / GNN','MESSAGE PASSING · LOCAL ENVIRONMENT',bi('一个原子怎样逐层“看到”更远的化学环境？','How does an atom gradually “see” a larger chemical neighborhood?'),bi('点“下一层”。中心原子先看到一阶邻居，再看到邻居的邻居。这里只讲 message passing 的直觉。','Press “next layer”. The center atom first receives information from direct neighbors, then from neighbors-of-neighbors. This is message passing intuition, not an architecture derivation.'),`
      <div class="gnn-lab story-reveal"><div class="gnn-figure"><svg class="gnn-svg" viewBox="0 0 620 330"><g class="edges"><line class="gnn-edge" x1="310" y1="165" x2="210" y2="95"/><line class="gnn-edge" x1="310" y1="165" x2="430" y2="100"/><line class="gnn-edge" x1="310" y1="165" x2="205" y2="245"/><line class="gnn-edge" x1="210" y1="95" x2="100" y2="65"/><line class="gnn-edge" x1="210" y1="95" x2="175" y2="35"/><line class="gnn-edge" x1="430" y1="100" x2="535" y2="65"/><line class="gnn-edge" x1="205" y1="245" x2="105" y2="270"/><line class="gnn-edge" x1="205" y1="245" x2="250" y2="300"/></g><g class="nodes"></g><circle class="gnn-signal" cx="310" cy="165" r="18"/></svg></div><aside class="gnn-panel"><div class="gnn-step">0</div><strong>hop / layer</strong><p class="gnn-explain"></p><div class="gnn-tags"><span>atoms = nodes</span><span>bonds = edges</span><span>aggregate neighbors</span></div><button class="story-button primary gnn-next" type="button">${bi('下一层 →','Next layer →')}</button></aside></div>`);
    before(chemistry,s);
    const svg=$('.gnn-svg',s),ns='http://www.w3.org/2000/svg',defs=[['C',310,165,0],['C',210,95,1],['O',430,100,1],['H',205,245,1],['H',100,65,2],['H',175,35,2],['H',535,65,2],['H',105,270,2],['H',250,300,2]];defs.forEach(([label,x,y,d])=>{const g=document.createElementNS(ns,'g');g.setAttribute('class','gnn-node');g.dataset.depth=d;g.innerHTML=`<circle cx="${x}" cy="${y}" r="24"/><text x="${x}" y="${y+5}" text-anchor="middle">${label}</text>`;$('.nodes',svg).appendChild(g)});let step=0;function render(){const exp=zh()?['中心原子目前只有自己的特征。','第 1 层：聚合直接相邻原子与化学键信息。','第 2 层：邻居已经带着更远邻域的信息回来。'][step]:['The center atom starts with its own features.','Layer 1: aggregate direct-neighbor and bond information.','Layer 2: neighbors now carry information from a wider neighborhood.'][step];$('.gnn-step',s).textContent=step;$('.gnn-explain',s).textContent=exp;$$('.gnn-node',s).forEach(n=>{const d=+n.dataset.depth;n.classList.toggle('is-focus',d===0);n.classList.toggle('is-seen',d>0&&d<=step)});s.querySelector('.gnn-lab').classList.remove('signal');void s.offsetWidth;s.querySelector('.gnn-lab').classList.add('signal')}$('.gnn-next',s).addEventListener('click',()=>{step=(step+1)%3;render()});render();$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(render));
  }

  // 6) 3D symmetry interactive screen.
  if(chemistry&&!$('#symmetry-story')){
    const s=section('symmetry-story','06C / 3D','GEOMETRY · INVARIANCE · EQUIVARIANCE',bi('把整个分子旋转 90°，能量应该跟着变吗？','If we rotate the whole molecule by 90°, should its energy change?'),bi('拖动旋转角度：标量能量保持不变；向量性质（这里用 force arrow 示意）应与体系一致旋转。','Rotate the system: scalar energy stays invariant, while a vector quantity (illustrated by a force arrow) rotates consistently with the system.'),`
      <div class="sym-lab story-reveal"><div class="sym-stage"><svg class="sym-svg" viewBox="0 0 500 320"><defs><marker id="sym-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#d87558"/></marker></defs><g class="sym-molecule"><line class="sym-bond" x1="155" y1="180" x2="250" y2="130"/><line class="sym-bond" x1="250" y1="130" x2="345" y2="180"/><circle class="sym-atom" cx="155" cy="180" r="30" fill="#b9dadf"/><circle class="sym-atom" cx="250" cy="130" r="30" fill="#efd77e"/><circle class="sym-atom" cx="345" cy="180" r="30" fill="#f4bea8"/><text x="155" y="186" text-anchor="middle">C</text><text x="250" y="136" text-anchor="middle">C</text><text x="345" y="186" text-anchor="middle">O</text><line class="sym-force" x1="345" y1="180" x2="420" y2="130"/></g></svg></div><aside class="sym-panel"><label><strong>${bi('整体旋转','Rigid rotation')}</strong><input class="sym-slider" type="range" min="0" max="360" value="0"></label><div class="sym-readout"><div class="sym-card"><small>ANGLE</small><strong class="sym-angle">0°</strong></div><div class="sym-card energy"><small>ENERGY · INVARIANT</small><strong>−12.40 eV</strong></div><div class="sym-card force"><small>FORCE VECTOR</small><strong>${bi('跟着旋转','rotates with system')}</strong></div></div></aside></div>`);
    before(chemistry,s);
    const slider=$('.sym-slider',s),mol=$('.sym-molecule',s);function rotate(){const a=+slider.value;mol.style.transform=`rotate(${a}deg)`;$('.sym-angle',s).textContent=`${a}°`}slider.addEventListener('input',rotate);rotate();
  }

  // 7) Discovery loop after chemistry task cards.
  if(chemistry&&!$('#discovery-story')){
    const labels=[['Existing Data','已有数据'],['Train / Update','训练 / 更新'],['Search / Generate','搜索 / 生成'],['Predict / Rank','预测 / 排序'],['Select','选择候选'],['Experiment / Compute','实验 / 计算']];
    const s=section('discovery-story','06D / LOOP','FROM PREDICTION TO DECISION',bi('模型的价值，不止是给一个分数。','A model can do more than output a score.'),bi('点一下循环：数据 → 模型 → 候选 → 实验 / 计算 → 新数据。真正的科学价值来自它怎样改变下一步决策。','Step through the loop: data → model → candidates → experiment / computation → new data. Scientific value comes from how the model changes the next decision.'),`
      <div class="discovery-lab story-reveal"><div class="discovery-ring"><div class="discovery-center">${bi('Scientific<br>Decision','Scientific<br>Decision')}</div>${labels.map((l,i)=>`<button class="discovery-stage s${i+1}" data-i="${i}" type="button">${zh()?l[1]:l[0]}</button>`).join('')}</div><aside class="discovery-panel"><small>STEP <span class="discovery-step">1</span>/6</small><strong class="discovery-title"></strong><p class="discovery-copy"></p><div class="discovery-progress"><i></i></div><button class="story-button primary discovery-next" type="button">${bi('下一步 →','Next →')}</button></aside></div>`);
    after(chemistry,s);let step=0;const explainZh=['从已有实验、计算或数据库记录出发。','更新预测模型；不是所有循环都必须重新训练。','在候选空间里搜索，或由生成模型提出新候选。','预测性质、风险或效用，对候选进行筛选 / 排序。','根据科研目标、成本和不确定性选择下一批。','实验或高精度计算产生新证据，重新进入数据层。'],explainEn=['Start from existing experimental, computational, or database records.','Update the predictive model; not every cycle requires retraining.','Search candidate space or use a generative model to propose candidates.','Predict properties, risk, or utility and rank candidates.','Choose the next batch using scientific goals, cost, and uncertainty.','Experiments or high-fidelity calculations create new evidence that returns to the data layer.'];function render(){const stages=$$('.discovery-stage',s);stages.forEach((x,i)=>x.classList.toggle('active',i===step));$('.discovery-step',s).textContent=step+1;$('.discovery-title',s).textContent=zh()?labels[step][1]:labels[step][0];$('.discovery-copy',s).textContent=(zh()?explainZh:explainEn)[step];$('.discovery-progress i',s).style.width=`${(step+1)/6*100}%`}$$('.discovery-stage',s).forEach(b=>b.addEventListener('click',()=>{step=+b.dataset.i;render()}));$('.discovery-next',s).addEventListener('click',()=>{step=(step+1)%6;render()});render();$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>{$$('.discovery-stage',s).forEach((x,i)=>x.textContent=zh()?labels[i][1]:labels[i][0]);render()}));
  }

  // 8) Agent tool-chain builder inside existing NOW section.
  const now=$('#now');
  if(now&&!now.querySelector('.agent-builder')){
    const builder=document.createElement('div');builder.className='agent-builder';builder.innerHTML=`<div class="agent-builder-head"><div><div class="story-kicker">INTERACTIVE · TOOL ORCHESTRATION</div><strong>${bi('给 Agent 组一条科研辅助工作流','Build a research-support tool chain')}</strong></div><button class="story-button agent-reset" type="button">Reset</button></div><div class="agent-tools"><button class="agent-tool" data-tool="Literature">Literature</button><button class="agent-tool" data-tool="Database">Database</button><button class="agent-tool" data-tool="Code">Code</button><button class="agent-tool" data-tool="Specialist model">Specialist model</button><button class="agent-tool" data-tool="Simulation">Simulation</button><button class="agent-tool" data-tool="Human review">Human review</button></div><div class="agent-chain"><span class="agent-chip">Goal</span></div><div class="agent-evidence">${bi('点击工具加入链条。关键不在“工具越多越智能”，而在每一步输入、证据与中间结果是否可检查。','Add tools to the chain. More tools do not automatically mean more intelligence; inputs, evidence, and intermediate results must remain inspectable.')}</div>`;now.querySelector('.now-grid')?.insertAdjacentElement('afterend',builder);const chain=$('.agent-chain',builder);$$('.agent-tool',builder).forEach(b=>b.addEventListener('click',()=>{const a=document.createElement('span'),chip=document.createElement('span');a.className='story-arrow';a.textContent='→';chip.className='agent-chip';chip.textContent=b.dataset.tool;chain.append(a,chip)}));$('.agent-reset',builder).addEventListener('click',()=>chain.innerHTML='<span class="agent-chip">Goal</span>');
  }

  // 9) Presentation navigation: keyboard / buttons scroll between every snap-section.
  if(!$('.story-present-nav')){
    const nav=document.createElement('div');nav.className='story-present-nav';nav.innerHTML='<button type="button" class="story-prev" aria-label="Previous screen">↑</button><span class="story-counter">— / —</span><button type="button" class="story-next" aria-label="Next screen">↓</button>';document.body.appendChild(nav);
    const screens=()=>[...document.querySelectorAll('.snap-section')];
    function closestIndex(){const arr=screens();let best=0,dist=Infinity;arr.forEach((s,i)=>{const d=Math.abs(s.getBoundingClientRect().top);if(d<dist){dist=d;best=i}});return best}
    function updateCounter(){const arr=screens(),i=closestIndex();$('.story-counter',nav).textContent=`${String(i+1).padStart(2,'0')} / ${String(arr.length).padStart(2,'0')}`}
    function go(delta){const arr=screens(),i=Math.max(0,Math.min(arr.length-1,closestIndex()+delta));arr[i]?.scrollIntoView({behavior:'smooth',block:'start'})}
    $('.story-prev',nav).addEventListener('click',()=>go(-1));$('.story-next',nav).addEventListener('click',()=>go(1));
    addEventListener('scroll',updateCounter,{passive:true});addEventListener('resize',updateCounter);updateCounter();
    addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();go(1)}if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();go(-1)}});
  }

  // Keep dynamic story sections synchronized when language changes.
  $('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>{}));
})();
