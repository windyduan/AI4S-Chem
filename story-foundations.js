(function installFoundationStory(){
  const $=(q,c=document)=>c.querySelector(q), $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const bi=(a,b)=>`<span class="story-zh">${a}</span><span class="story-en">${b}</span>`;

  function makeSection(id,no,kicker,title,lead,body){
    const s=document.createElement('section');
    s.id=id;s.className='section snap-section story-section foundation-section';
    s.innerHTML=`<div class="section-no">${no}</div><div class="story-copy story-reveal"><div class="story-kicker">${kicker}</div><h2>${title}</h2>${lead?`<p class="lead compact">${lead}</p>`:''}</div>${body}`;
    return s;
  }
  function observe(el){
    if(!el)return;
    if('IntersectionObserver'in window){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.22});o.observe(el)}else el.classList.add('is-visible');
  }
  function insertAfter(anchor,el){anchor?.insertAdjacentElement('afterend',el);observe(el);return el}
  function insertBefore(anchor,el){anchor?.insertAdjacentElement('beforebegin',el);observe(el);return el}

  const home=$('#home'),learn=$('#learn'),train=$('#train');
  if(!home||!learn||!train)return;

  // 00B — Why this matters for chemistry newcomers.
  if(!$('#course-lens')){
    const s=makeSection('course-lens','00B / WHY','CHEMISTRY-FIRST · THREE QUESTIONS',bi('这门课不是教你“变成 AI 工程师”。','This course is not trying to turn you into an AI engineer.'),bi('对于刚进入化学科研的新生，更有用的是先学会三件事：看懂模型在做什么、判断结果靠不靠谱、知道它怎样进入真实科研流程。','For chemistry newcomers, three skills matter more: understand what a model is doing, judge whether its result is credible, and see how it enters a real research workflow.'),`
      <div class="course-lens-grid story-reveal">
        <article class="course-lens-card"><small>01 · READ</small><strong>${bi('模型到底在学什么？','What is the model learning?')}</strong><p>${bi('看到论文里的 x、y、loss、GNN、3D model 时，不再只剩下“这个很高级”。','When a paper mentions x, y, loss, GNNs, or 3D models, you should see roles rather than jargon.')}</p></article>
        <article class="course-lens-card"><small>02 · TRUST</small><strong>${bi('这个结果真的可靠吗？','Can I trust this result?')}</strong><p>${bi('训练分数漂亮不等于模型能预测未来分子。数据划分、泄漏和评价方式决定了数字代表什么。','A beautiful training score does not mean future molecules will be predicted well. Splits, leakage, and evaluation determine what the number means.')}</p></article>
        <article class="course-lens-card"><small>03 · USE</small><strong>${bi('它怎样帮助科研决策？','How can it help research decisions?')}</strong><p>${bi('AI 的价值不只是“预测一个数”，还可以帮助筛选候选、加速计算、连接数据和工具。','AI can do more than predict a number: it can rank candidates, accelerate computation, and connect data with tools.')}</p></article>
      </div>
      <div class="course-lens-path story-reveal"><span>Data</span>→<span>Model</span>→<span>Evaluation</span>→<span>Chemistry</span>→<span>Decision</span></div>`);
    insertAfter(home,s);
  }

  // Put #501 before the taxonomy screen: question first, terminology second.
  const molecule501=$('#molecule-501');
  if(molecule501&&molecule501.nextElementSibling!==learn){learn.insertAdjacentElement('beforebegin',molecule501)}

  // 01C — role map after AI / ML / DL.
  let roleSection=$('#role-map-screen');
  if(!roleSection){
    roleSection=makeSection('role-map-screen','01C / ROLES','SUPERVISED LEARNING · ROLE MAP',bi('别一次背八个词：把它们分成三组角色。','Do not memorize eight terms at once. Group them by role.'),bi('先问三件事：数据是什么？谁在做预测？错误怎样变成下一次更新？','Ask three questions: what is the data, who makes the prediction, and how does error drive the next update?'),`
      <div class="role-map story-reveal">
        <div class="role-group" data-group="data"><div class="role-group-head"><small>${bi('数据是什么？','WHAT IS THE DATA?')}</small><strong>Data</strong></div><div class="role-chip-row"><button class="role-chip active" data-role="sample">Sample</button><button class="role-chip" data-role="representation">Representation x</button><button class="role-chip" data-role="target">Target y</button></div></div>
        <div class="role-group" data-group="predict"><div class="role-group-head"><small>${bi('谁在预测？','WHO PREDICTS?')}</small><strong>Prediction</strong></div><div class="role-chip-row"><button class="role-chip" data-role="model">Model f</button><button class="role-chip" data-role="parameter">Parameter θ</button><button class="role-chip" data-role="prediction">Prediction ŷ</button></div></div>
        <div class="role-group" data-group="learn"><div class="role-group-head"><small>${bi('怎么利用错误？','HOW DOES IT LEARN?')}</small><strong>Learning</strong></div><div class="role-chip-row"><button class="role-chip" data-role="loss">Loss L</button><button class="role-chip" data-role="optimization">Optimization</button></div></div>
      </div>
      <div class="role-explain story-reveal"><div class="role-symbol">#1</div><div class="role-copy"><strong></strong><p></p></div></div>`);
    insertAfter(learn,roleSection);
    const defs={
      sample:{symbol:'#137',title:['Sample · 一条被建模的数据','Sample · one modeled example'],copy:['在溶解度任务里，一个 sample 可以是一条“分子 + 测量记录”。它是建模单位，不一定等于一个文件或一行 CSV。','In a solubility task, a sample can be one molecule plus its measurement record. It is a modeling unit, not necessarily one file or one CSV row.']},
      representation:{symbol:'x',title:['Representation · 模型真正收到的输入','Representation · what the model actually receives'],copy:['分子是研究对象；x 是我们选择给模型看的机器可读表示。可以是 descriptor、fingerprint、SMILES、graph 或 3D geometry。','The molecule is the scientific object; x is the machine-readable representation we choose, such as descriptors, fingerprints, SMILES, graphs, or 3D geometry.']},
      target:{symbol:'y',title:['Target · 希望模型学会回答什么','Target · what we want the model to predict'],copy:['在本课程的 logS 例子里，y 是记录下来的溶解度测量值。其他任务里也可能是计算能量、类别标签或其他定义好的量。','In the running logS example, y is the recorded solubility measurement. In other tasks it could be a computed energy, class label, or another defined quantity.']},
      model:{symbol:'f',title:['Model · 一个可学习的函数','Model · a learnable function'],copy:['模型不是答案仓库。它定义了怎样把输入 x 映射成 prediction ŷ。可以是一条直线，也可以是 GNN 或 3D neural network。','A model is not an answer store. It defines how x is mapped to prediction ŷ. It can be a line, a GNN, or a 3D neural network.']},
      parameter:{symbol:'θ',title:['Parameter · 训练会改的内部数值','Parameter · internal values changed by training'],copy:['线性模型里的 w、b 是 parameters；神经网络里会有更多参数。learning rate、batch size 等通常属于 hyperparameters。','w and b in a linear model are parameters; neural networks have many more. Learning rate and batch size are typically hyperparameters.']},
      prediction:{symbol:'ŷ',title:['Prediction · 模型此刻给出的估计','Prediction · the model’s current estimate'],copy:['ŷ 和 y 必须分开：ŷ 是模型估计，y 是数据里记录的 target。预测看起来很精确，不代表它就是真值。','Keep ŷ and y separate: ŷ is the model estimate, y is the recorded target. A precise-looking prediction is not automatically truth.']},
      loss:{symbol:'L',title:['Loss · 把“错多少”变成可优化的数字','Loss · turn error into an optimizable number'],copy:['Loss 定义训练时什么叫“更好”。它是数学目标，不等于科研价值，也不自动包含实验成本、适用域或安全性。','Loss defines what “better” means during training. It is a mathematical objective, not the whole scientific value, cost, applicability domain, or safety picture.']},
      optimization:{symbol:'↻',title:['Optimization · 利用 loss 调整 parameters','Optimization · use loss to adjust parameters'],copy:['训练不断重复 prediction → loss → update。优化的任务是寻找更合适的 parameters，而不是“让 AI 理解化学”这种模糊过程。','Training repeats prediction → loss → update. Optimization searches for better parameters rather than vaguely “making AI understand chemistry.”']}
    };
    function showRole(name){const d=defs[name];$$('.role-chip',roleSection).forEach(b=>b.classList.toggle('active',b.dataset.role===name));$('.role-symbol',roleSection).textContent=d.symbol;$('.role-copy strong',roleSection).textContent=zh()?d.title[0]:d.title[1];$('.role-copy p',roleSection).textContent=zh()?d.copy[0]:d.copy[1]}
    $$('.role-chip',roleSection).forEach(b=>b.addEventListener('click',()=>showRole(b.dataset.role)));showRole('sample');$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>showRole($('.role-chip.active',roleSection)?.dataset.role||'sample')));
  }

  // 01D — minimal equation + task transfer.
  let eqSection=$('#equation-screen');
  if(!eqSection){
    eqSection=makeSection('equation-screen','01D / MODEL','THE MINIMUM EQUATION',bi('整门课先记住一个公式就够了。','One equation is enough for now.'),bi('公式的价值不是推导，而是把四个角色钉在同一张图上。点公式里的符号，看它们在化学任务里分别是谁。','The point is not derivation. It pins four roles onto one diagram. Click the symbols to see who they are in chemistry tasks.'),`
      <div class="equation-lab story-reveal">
        <div class="equation-stage"><div class="equation-main"><span class="eq-token active" data-eq="pred">ŷ</span><span>=</span><span class="eq-token" data-eq="model">f</span><span>(</span><span class="eq-token" data-eq="input">x</span><span>;</span><span class="eq-token" data-eq="param">θ</span><span>)</span></div><div class="eq-target-row"><span class="eq-target">target y</span><span class="eq-loss-link">↕ compare → loss L</span></div><div class="eq-explain"><strong></strong><p></p></div></div>
        <aside class="task-stage"><div class="task-tabs"><button class="task-tab active" data-task="sol">Solubility</button><button class="task-tab" data-task="rxn">Reaction yield</button></div><div class="task-card"></div><p class="task-transfer-note">${bi('骨架不变，换的是科学问题、数据定义和表示。','The skeleton stays; the scientific question, data definition, and representation change.')}</p></aside>
      </div>`);
    insertAfter(roleSection,eqSection);
    const eqDefs={pred:[['ŷ · 模型预测','ŷ · model prediction'],['当前模型对新输入给出的估计。','The current model estimate for an input.']],model:[['f · 模型','f · model'],['把 representation 映射成输出的可学习函数。','The learnable function mapping a representation to an output.']],input:[['x · representation','x · representation'],['模型实际收到的输入，而不是“分子本身”。','The model input, not the molecule itself.']],param:[['θ · parameters','θ · parameters'],['训练过程中被更新的内部数值。','Internal values updated during training.']]};
    function showEq(k){$$('.eq-token',eqSection).forEach(x=>x.classList.toggle('active',x.dataset.eq===k));const d=eqDefs[k];$('.eq-explain strong',eqSection).textContent=zh()?d[0][0]:d[0][1];$('.eq-explain p',eqSection).textContent=zh()?d[1][0]:d[1][1]}
    $$('.eq-token',eqSection).forEach(x=>x.addEventListener('click',()=>showEq(x.dataset.eq)));
    const tasks={sol:{rows:[['SAMPLE','一个带测量记录的分子','a molecule with a measurement'],['x','descriptor / fingerprint / graph / 3D','descriptor / fingerprint / graph / 3D'],['y','measured logS','measured logS'],['ŷ','predicted logS','predicted logS']]},rxn:{rows:[['SAMPLE','一条反应记录','one reaction record'],['x','reactants + conditions representation','reactants + conditions representation'],['y','experimental yield','experimental yield'],['ŷ','predicted yield','predicted yield']]}};
    function drawTask(k){$$('.task-tab',eqSection).forEach(b=>b.classList.toggle('active',b.dataset.task===k));$('.task-card',eqSection).innerHTML=tasks[k].rows.map(r=>`<div class="task-row"><small>${r[0]}</small><strong>${zh()?r[1]:r[2]}</strong></div>`).join('')}
    $$('.task-tab',eqSection).forEach(b=>b.addEventListener('click',()=>drawTask(b.dataset.task)));showEq('pred');drawTask('sol');$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>{showEq($('.eq-token.active',eqSection)?.dataset.eq||'pred');drawTask($('.task-tab.active',eqSection)?.dataset.task||'sol')}));
  }

  // 02A — prediction vs target vs loss.
  let lossSection=$('#prediction-loss-screen');
  if(!lossSection){
    lossSection=makeSection('prediction-loss-screen','02A / ERROR','PREDICTION · TARGET · LOSS',bi('Prediction 不是答案；Loss 也不是“模型智商”。','A prediction is not the answer, and loss is not “model IQ”.'),bi('拖动模型预测值。你会看到 y、ŷ、error 和 squared error 各自扮演什么角色。','Drag the prediction. Watch the roles of y, ŷ, error, and squared error.'),`
      <div class="pred-loss-lab story-reveal"><div class="pred-loss-stage"><div class="loss-axis"><div class="loss-line"></div><div class="loss-gap"></div><div class="loss-marker target"><b>target y = −3.0</b><i></i></div><div class="loss-marker prediction"><b>prediction ŷ</b><i></i></div></div><div class="loss-caption">logS · ${bi('课堂数值示意','teaching numbers')}</div></div><aside class="pred-loss-panel"><label>${bi('拖动 prediction ŷ','Move prediction ŷ')} <strong class="pred-readout">−1.8</strong><input class="pred-slider" type="range" min="-4.5" max="-0.5" step="0.1" value="-1.8"></label><div class="loss-values"><div class="loss-value"><small>y</small><strong>−3.0</strong></div><div class="loss-value"><small>ŷ</small><strong class="pred-value">−1.8</strong></div><div class="loss-value"><small>(ŷ − y)²</small><strong class="sq-value">1.44</strong></div></div><p class="loss-teaching-note"></p></aside></div>`);
    insertAfter(eqSection,lossSection);
    const target=-3,slider=$('.pred-slider',lossSection),predMarker=$('.loss-marker.prediction',lossSection),targetMarker=$('.loss-marker.target',lossSection),gap=$('.loss-gap',lossSection);
    const map=v=>(v+4.5)/4*100;
    function updateLoss(){const p=+slider.value,e=p-target,sq=e*e,tp=map(target),pp=map(p);targetMarker.style.left=`${tp}%`;predMarker.style.left=`${pp}%`;gap.style.left=`${Math.min(tp,pp)}%`;gap.style.width=`${Math.abs(pp-tp)}%`;$('.pred-readout',lossSection).textContent=p.toFixed(1);$('.pred-value',lossSection).textContent=p.toFixed(1);$('.sq-value',lossSection).textContent=sq.toFixed(2);$('.loss-teaching-note',lossSection).textContent=zh()?`当前误差是 ${e.toFixed(1)} logS，squared error = ${sq.toFixed(2)}。这个数字只属于当前定义的目标与尺度，不是模型的“综合能力分”。`:`Current error is ${e.toFixed(1)} logS and squared error = ${sq.toFixed(2)}. This number belongs to the current target and scale; it is not a universal model-quality score.`}
    slider.addEventListener('input',updateLoss);updateLoss();$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(updateLoss));
  }

  // Enhance the existing training-loop screen and keep it as a compact conceptual page.
  const loop=$('#training-loop');
  if(loop&&!train.querySelector('.train-stage-note')){
    const note=document.createElement('div');note.className='train-stage-note';loop.insertAdjacentElement('afterend',note);
    const notes={data:['Data：取一批 (x, y)。训练时 target y 只用于比较，不会作为预测输入。','Data: take a batch of (x, y). Target y is used for comparison during training, not as the prediction input.'],prediction:['Prediction：用当前 parameters θ 计算 ŷ = f(x; θ)。','Prediction: use current parameters θ to compute ŷ = f(x; θ).'],loss:['Loss：把 prediction 与 target 的差异变成一个训练目标。','Loss: turn the difference between prediction and target into a training objective.'],update:['Update：优化算法利用 loss 的信息调整 θ，然后进入下一轮。','Update: the optimizer uses loss information to adjust θ, then the next round begins.']};
    function showStage(k){$$('.train-stage',train).forEach(x=>x.classList.toggle('active',x.dataset.stage===k));note.innerHTML=`<strong>${k.toUpperCase()}</strong> · ${zh()?notes[k][0]:notes[k][1]}`}
    $$('.train-stage',train).forEach(x=>x.addEventListener('click',()=>showStage(x.dataset.stage)));showStage('data');$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>showStage($('.train-stage.active',train)?.dataset.stage||'data')));
    // The three mini cards are redundant once the course is split into more screens; keep them in DOM but collapse visually.
    train.querySelector('.mini-grid')?.setAttribute('hidden','');
  }

  // Move the original playground out of #train into its own teaching screen. No component or logic is deleted.
  const lab=train.querySelector('.merged-training-lab')||train.querySelector('.training-lab');
  let playground=$('#training-playground-screen');
  if(lab&&!playground){
    playground=makeSection('training-playground-screen','02C / PLAYGROUND','GRADIENT DESCENT · LEARNING RATE',bi('亲手看一次参数怎样真的动起来。','Watch parameters actually move.'),bi('原来的 Gradient Descent Playground 完整保留，只是从“塞在训练页里”拆成独立一屏。先比较三种 learning rate，再连续训练。','The original Gradient Descent Playground is preserved intact, but moved to its own screen. Compare three learning rates, then train continuously.'),`<div class="foundation-playground-head story-reveal"><div><p class="story-note">${bi('learning rate 更像“这一步走多大”，不是“学了多少知识”。','Learning rate is closer to “how big this update step is,” not “how much knowledge was learned.”')}</p></div><div><div class="lr-presets"><button class="lr-preset" data-lr="0.02">η = 0.02 · ${bi('小','small')}</button><button class="lr-preset active" data-lr="0.12">η = 0.12 · ${bi('合适','moderate')}</button><button class="lr-preset" data-lr="0.75">η = 0.75 · ${bi('大','large')}</button></div><div class="lr-readout">current η = <strong>0.12</strong></div></div></div>`);
    train.insertAdjacentElement('afterend',playground);playground.appendChild(lab);observe(playground);
    // restore title now that the playground is no longer merged into the TRAIN screen
    const labHead=lab.querySelector('.training-lab-head > div');
    if(labHead&&!labHead.querySelector('.foundation-lab-title')){const h=document.createElement('h3');h.className='foundation-lab-title';h.textContent=zh()?'训练一条最简单的模型':'Train the simplest possible model';labHead.querySelector('.eyebrow')?.insertAdjacentElement('afterend',h)}
    function setLR(v,btn){try{lr=+v}catch(e){};$$('.lr-preset',playground).forEach(b=>b.classList.toggle('active',b===btn));$('.lr-readout strong',playground).textContent=(+v).toFixed(2);try{resetTrainer(true)}catch(e){}}
    $$('.lr-preset',playground).forEach(b=>b.addEventListener('click',()=>setLR(b.dataset.lr,b)));
  }

  // 02D — Batch / Epoch after playground.
  let batchSection=$('#batch-epoch-screen');
  if(playground&&!batchSection){
    const cards=Array.from({length:7},(_,i)=>`<div class="batch-card" data-i="${i}"><strong>Batch ${i+1}</strong><div class="batch-dots">${Array.from({length:15},()=>'<i></i>').join('')}</div><span>50 samples → 1 update</span></div>`).join('');
    batchSection=makeSection('batch-epoch-screen','02D / BATCH','BATCH · EPOCH · UPDATE',bi('一个 Epoch，并不是只更新一次。','One epoch is not one update.'),bi('假设 Train 有 350 个分子，batch size = 50。点“下一批”，数一遍完整 epoch 里到底发生多少次 parameter update。','Suppose Train has 350 molecules and batch size = 50. Step through the batches and count how many parameter updates occur in one epoch.'),`
      <div class="batch-lab story-reveal"><div class="batch-stage"><div class="batch-list">${cards}</div></div><aside class="batch-panel"><div class="batch-stats"><div class="batch-stat"><small>CURRENT BATCH</small><strong class="batch-now">0 / 7</strong></div><div class="batch-stat"><small>PARAMETER UPDATES</small><strong class="update-now">0</strong></div></div><p class="batch-explain"></p><button class="story-button primary batch-next" type="button">${bi('下一批 →','Next batch →')}</button> <button class="story-button batch-reset" type="button">Reset</button></aside></div>`);
    insertAfter(playground,batchSection);let step=0;
    function drawBatch(){const cards=$$('.batch-card',batchSection);cards.forEach((c,i)=>{c.classList.toggle('done',i<step);c.classList.toggle('active',i===step&&step<7)});$('.batch-now',batchSection).textContent=step===0?'0 / 7':`${Math.min(step,7)} / 7`;$('.update-now',batchSection).textContent=Math.min(step,7);$('.batch-explain',batchSection).textContent=zh()?(step<7?`一次 update 使用一个 batch。当前已经完成 ${step} 次 update；走完 7 个 batch 后，350 条 training samples 大致完整遍历一次。`:`7 个 batch 全部走完：这大致就是 1 epoch，同时发生了 7 次 parameter update。`):(step<7?`One update uses one batch. ${step} updates are complete; after 7 batches the 350 training samples have been traversed approximately once.`:`All 7 batches are complete: approximately 1 epoch, with 7 parameter updates.`)}
    $('.batch-next',batchSection).addEventListener('click',()=>{step=Math.min(7,step+1);drawBatch()});$('.batch-reset',batchSection).addEventListener('click',()=>{step=0;drawBatch()});drawBatch();$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(drawBatch));
  }

  // 02E — Why hold out data, immediately before existing data-split playground.
  const dataSplit=$('#data-split');
  if(dataSplit&&!$('#holdout-screen')){
    const s=makeSection('holdout-screen','02E / WHY SPLIT','TRAIN ≠ FINAL EXAM',bi('为什么不把 500 个分子全部拿去训练？','Why not train on all 500 molecules?'),bi('因为我们还需要一组没有参与开发的数据，来回答模型面对真正新样本时会怎样。','Because we still need data that did not guide development, so we can ask how the model behaves on genuinely new examples.'),`
      <div class="holdout-lab story-reveal"><div class="holdout-choices"><button class="holdout-choice active" data-mode="same">${bi('方案 A：全部训练，再在同样数据上打分','Plan A: train on everything, score on the same data')}</button><button class="holdout-choice" data-mode="split">${bi('方案 B：保留独立角色','Plan B: keep distinct data roles')}</button></div><div class="holdout-stage"><h3></h3><p></p><div class="holdout-flow"></div><div class="holdout-result"></div></div></div>`);
    insertBefore(dataSplit,s);
    const cfg={same:{title:['看起来分数很漂亮，但问题没回答','The score may look good, but the real question is unanswered'],copy:['如果同一批数据既负责调整模型，又负责最终打分，我们主要知道模型对“做过的题”表现怎样。','If the same data adjusts the model and provides the final score, we mostly learn how it performs on questions it has already seen.'],flow:`<div class="holdout-box"><small>500 molecules</small><strong>Train</strong></div><span class="holdout-arrow">→</span><div class="holdout-box"><small>same 500</small><strong>Score</strong></div>`,result:['这不能提供独立的泛化证据。','This does not provide independent evidence of generalization.']},split:{title:['让不同数据承担不同职责','Give different data different responsibilities'],copy:['Train 用来学 parameters；Validation 帮助开发选择；Test 在开发决定固定后提供独立评估。','Train learns parameters; Validation guides development choices; Test provides independent evaluation after development choices are fixed.'],flow:`<div class="holdout-box"><small>learn θ</small><strong>Train</strong></div><span class="holdout-arrow">→</span><div class="holdout-box validation"><small>choose / tune</small><strong>Validation</strong></div><span class="holdout-arrow">→</span><div class="holdout-box test"><small>independent check</small><strong>Test</strong></div>`,result:['关键不是背 70/15/15，而是保证 Test 信息没有被拿来反复调整系统。','The key is not memorizing 70/15/15; it is keeping Test information out of repeated system development.']}};
    function draw(mode){$$('.holdout-choice',s).forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));const d=cfg[mode];$('.holdout-stage h3',s).textContent=zh()?d.title[0]:d.title[1];$('.holdout-stage>p',s).textContent=zh()?d.copy[0]:d.copy[1];$('.holdout-flow',s).innerHTML=d.flow;$('.holdout-result',s).textContent=zh()?d.result[0]:d.result[1]}
    $$('.holdout-choice',s).forEach(b=>b.addEventListener('click',()=>draw(b.dataset.mode)));draw('same');$('#lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(()=>draw($('.holdout-choice.active',s)?.dataset.mode||'same')));
  }

  // Re-number only the early story labels for a readable lecture flow; existing section ids remain stable.
  const earlyNumbers={learn:'01B / AI · ML · DL','molecule-501':'01A / QUESTION','role-map-screen':'01C / ROLES','equation-screen':'01D / MODEL','prediction-loss-screen':'02A / ERROR',train:'02B / TRAINING LOOP','training-playground-screen':'02C / PLAYGROUND','batch-epoch-screen':'02D / BATCH & EPOCH','holdout-screen':'02E / WHY SPLIT','data-split':'03 / DATA SPLIT'};
  Object.entries(earlyNumbers).forEach(([id,text])=>{const el=$(`#${id} .section-no`);if(el)el.textContent=text});
})();