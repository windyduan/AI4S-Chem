(function installLectureRebuildPass(){
  const $=(q,c=document)=>c.querySelector(q), $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';

  function ensureStyle(){
    if(document.querySelector('link[data-lecture-rebuild-pass]'))return;
    const link=document.createElement('link');link.rel='stylesheet';link.href='lecture-rebuild-pass.css?v=20260826a';link.dataset.lectureRebuildPass='1';document.head.appendChild(link);
  }

  function rebuildP13(){
    const s=$('#chem-task-map-screen');if(!s)return;
    const title=$('.story-copy h2',s),lead=$('.story-copy .lead',s);
    if(title)title.textContent=zh()?'科研不是直线：每次决策都会进入下一轮':'Research is not linear: every decision starts the next round';
    if(lead)lead.textContent=zh()?'把“问题—数据—表示—模型—验证”看成围绕科研决策不断循环的系统。实验或计算产生的新证据，会回到下一轮问题定义与数据更新。':'Treat question, data, representation, model, and validation as a system cycling around research decisions. New evidence from experiments or computation returns to the next round of questions and data.';
    let shell=$('.p13-orbit-shell',s);
    if(!shell){shell=document.createElement('div');shell.className='p13-orbit-shell story-reveal';s.appendChild(shell)}
    const nodes=zh()?[
      ['01','定义问题','预测什么、解释什么、优化什么'],['02','准备数据','实验、计算、数据库记录'],['03','选择表示','让模型看到合适的化学信息'],['04','训练模型','学习输入到目标的关系'],['05','独立验证','检查未见数据上的可信度'],['06','产生新证据','实验 / 计算反馈下一轮']
    ]:[
      ['01','Define question','What should be predicted, explained or optimized?'],['02','Prepare data','Experiments, computation and databases'],['03','Choose representation','Expose the right chemical information'],['04','Train model','Learn the mapping from inputs to targets'],['05','Validate independently','Check credibility on unseen data'],['06','Create new evidence','Experiment / computation feeds the next round']
    ];
    shell.innerHTML=`<svg class="p13-orbit-svg" viewBox="0 0 920 460" aria-hidden="true"><defs><marker id="p13-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2f7683"/></marker></defs><path class="p13-orbit-path" d="M460 65 C650 65 805 160 805 230 C805 335 650 405 460 405"/><path class="p13-orbit-path" d="M460 405 C270 405 115 335 115 230 C115 160 270 65 460 65"/></svg><div class="p13-orbit-center"><div><small>${zh()?'中心不是“模型”':'CENTER IS NOT THE MODEL'}</small><strong>${zh()?'科研决策':'Scientific Decision'}</strong></div></div>${nodes.map((n,i)=>`<article class="p13-orbit-node n${i+1}"><b>${n[0]}</b><strong>${n[1]}</strong><span>${n[2]}</span></article>`).join('')}<div class="p13-orbit-note">${zh()?'新证据会改变下一轮问题与数据':'new evidence changes the next question and data'}</div>`;
  }

  function rebuildP29(){
    const s=$('#batch-epoch-screen');if(!s)return;
    const title=$('.story-copy h2',s),kicker=$('.story-kicker',s);
    if(kicker)kicker.textContent=zh()?'从样本到更新，再到一个 Epoch':'SAMPLES → UPDATES → ONE EPOCH';
    if(title)title.textContent=zh()?'350 个样本为什么会产生 7 次参数更新？':'Why do 350 samples produce 7 parameter updates?';
    let lab=$('.p29-story-lab',s);
    if(!lab){lab=document.createElement('div');lab.className='p29-story-lab story-reveal';s.appendChild(lab)}
    if(!lab.dataset.ready){
      lab.innerHTML=`<div class="p29-main"><div class="p29-storyline"></div><div class="p29-batches"></div><div class="p29-equation"></div></div><aside class="p29-side"><div class="p29-counter"><div><small class="p29-batch-label"></small><strong class="p29-batch-now">0 / 7</strong></div><div><small class="p29-update-label"></small><strong class="p29-update-now">0</strong></div></div><p class="p29-explain"></p><div class="p29-controls"><button class="story-button primary p29-next" type="button"></button><button class="story-button p29-reset" type="button"></button></div></aside>`;
      lab.dataset.ready='1';let step=0;
      const draw=()=>{
        const story=zh()?[["训练集","350 个样本"],["Batch size","每批 50 个"],["一次更新","处理完 1 批"],["一个 Epoch","7 批全部走完"]]:[["Training set","350 samples"],["Batch size","50 per batch"],["One update","after one batch"],["One epoch","after all 7 batches"]];
        $('.p29-storyline',lab).innerHTML=story.map((x,i)=>`<div class="p29-story-step"><small>0${i+1}</small><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('');
        const batches=$$('.p29-batch',lab);batches.forEach((b,i)=>{b.classList.toggle('done',i<step);b.classList.toggle('active',i===step&&step<7)});
        $('.p29-batch-label',lab).textContent=zh()?'当前批次':'CURRENT BATCH';$('.p29-update-label',lab).textContent=zh()?'参数更新':'UPDATES';
        $('.p29-batch-now',lab).textContent=`${Math.min(step,7)} / 7`;$('.p29-update-now',lab).textContent=String(Math.min(step,7));
        $('.p29-equation',lab).textContent=zh()?'350 ÷ 50 = 7 批 → 每批更新 1 次 → 1 Epoch ≈ 7 次参数更新':'350 ÷ 50 = 7 batches → 1 update per batch → 1 epoch ≈ 7 parameter updates';
        $('.p29-explain',lab).textContent=zh()?(step===0?'先抓住关系：Batch 决定“一次更新看多少样本”；Epoch 决定“训练数据整体走过多少遍”。':step<7?`第 ${step} 批处理完成，因此参数已经更新 ${step} 次；还没有完成一个 Epoch。`:'7 批全部走完，350 个样本大致完整遍历一次：这才是 1 个 Epoch。'):(step===0?'Batch controls how many samples contribute to one update; epoch counts how many times the training set is traversed.':step<7?`${step} batches are complete, so the parameters have been updated ${step} times; the epoch is not finished yet.`:'All 7 batches are complete, so the 350 samples have been traversed roughly once: one epoch.');
        $('.p29-next',lab).textContent=zh()?'下一批 →':'Next batch →';$('.p29-reset',lab).textContent=zh()?'重置':'Reset';
      };
      $('.p29-batches',lab).innerHTML=Array.from({length:7},(_,i)=>`<div class="p29-batch"><small>${zh()?'第 '+(i+1)+' 批':'Batch '+(i+1)}</small><div class="p29-dots">${'<i></i>'.repeat(10)}</div><strong>50</strong></div>`).join('');
      $('.p29-next',lab).addEventListener('click',()=>{step=Math.min(7,step+1);draw()});$('.p29-reset',lab).addEventListener('click',()=>{step=0;draw()});lab._drawP29=draw;draw();
    }else{$$('.p29-batch',lab).forEach((b,i)=>{const sm=$('small',b);if(sm)sm.textContent=zh()?`第 ${i+1} 批`:`Batch ${i+1}`});lab._drawP29?.()}
  }

  const caseNarratives={
    'case-nmrnet':{titleZh:'NMR 化学位移靠局域 3D 环境决定，人能不能靠规则把所有情况写完？',titleEn:'NMR shifts depend on local 3D environments — can hand-written rules cover every case?',labelsZh:['背景：结构决定谱学','传统方法：规则难统一','AI：学习 3D 局域环境','价值：跨体系预测'],labelsEn:['background: structure → spectrum','traditional: rules do not generalize','AI: learn local 3D environments','value: transfer across systems'],copyZh:['NMR chemical shift 对目标原子周围的局域化学环境非常敏感；液态与固态体系还会带来不同结构分布。','经验规则或简单描述符能覆盖部分情况，但很难把复杂三维几何与不同数据集统一起来。','SE(3)-aware 模型直接读取目标原子周围的 3D 环境，并通过预训练 + 微调学习更可迁移的结构—谱学关系。','最终输出原子级 chemical shift，并把液态与固态任务放到统一 benchmark 中比较。这体现了 3D representation 真正进入实验表征问题。'],copyEn:['NMR chemical shifts are highly sensitive to the target atom’s local environment, while liquid and solid systems bring different structural distributions.','Empirical rules and simple descriptors cover some cases, but they struggle to unify complex 3D geometry across datasets.','An SE(3)-aware model reads the local 3D environment directly and uses pretraining plus fine-tuning to learn more transferable structure–spectrum relations.','The model predicts atom-level shifts across liquid- and solid-state tasks, showing how 3D representation enters experimental characterization.']},
    'case-nose':{titleZh:'气味不是只看分子结构：结构、嗅觉受体和人类语言怎样被放到一起？',titleEn:'Odor is not structure alone — how can molecules, receptors and language be connected?',labelsZh:['背景：气味跨三种信息','传统方法：各自分开建模','AI：分子作为共同枢纽','价值：统一嗅觉表示'],labelsEn:['background: three information sources','traditional: modeled separately','AI: molecule as shared hub','value: unified olfactory representation'],copyZh:['气味感知同时涉及化学结构、生物受体响应和人类语言描述，任何单一模态都只看到链条的一部分。','过去常把分子—气味、分子—受体分别建模；真正同时包含三者的完整数据又很稀缺。','NOSE 让分子表示成为中心枢纽，分别接入受体序列与气味语义，并用正交约束减少两类信息相互覆盖。','得到的统一表示可以支持感知预测、跨模态检索与零样本泛化。AI 在这里解决的是“信息彼此割裂”的问题。'],copyEn:['Olfaction spans chemical structure, receptor response, and human language; any single modality sees only part of the chain.','Molecule–odor and molecule–receptor relations have often been modeled separately, while complete triplets are scarce.','NOSE uses the molecule as a shared hub, injecting receptor and odor-semantic information while orthogonal constraints keep the contributions distinct.','The unified representation supports perception prediction, cross-modal retrieval, and zero-shot generalization — addressing fragmented information rather than one isolated prediction task.']},
    'case-unixas':{titleZh:'XAS 给的是一条谱线，但真正想知道的是局域 3D 结构：这个逆问题怎么做？',titleEn:'XAS gives a spectrum, but we want local 3D structure — how can this inverse problem be solved?',labelsZh:['背景：谱线间接编码结构','传统方法：逆推不唯一','AI：跨模态共享空间','价值：谱 ↔ 结构双向'],labelsEn:['background: spectrum encodes structure indirectly','traditional: inverse mapping is ambiguous','AI: shared cross-modal space','value: spectrum ↔ structure'],copyZh:['XAS 是局域结构的实验投影，但观测到的是一维谱线，真正关心的却是三维原子环境。','从谱线直接逆推出结构通常并不唯一，还需要大量物理建模、候选假设与比较。','Uni-XAS 把 XAS 光谱和局域 3D 结构编码到共享表示空间，让相互检索、匹配与条件生成变成统一任务。','同一个表示框架可以做结构—光谱检索、光谱预测和光谱条件下的 3D 生成，让实验信号更直接地连接结构解释。'],copyEn:['XAS is an experimental projection of local structure: the observation is a 1D spectrum while the scientific target is a 3D atomic environment.','Inferring structure from a spectrum is generally non-unique and traditionally requires physical modeling, candidate hypotheses, and comparison.','Uni-XAS embeds spectra and local 3D structures into a shared space so retrieval, matching, and conditional generation become connected tasks.','One representation framework supports structure–spectrum retrieval, spectrum prediction, and spectrum-conditioned 3D generation.']},
    'case-electroplating':{titleZh:'配方研发同时需要多个模型、工具和实验，人怎样避免在流程之间来回搬运？',titleEn:'Formulation R&D needs many models, tools and experiments — how can the workflow be coordinated?',labelsZh:['背景：多任务耦合','传统方法：人工串流程','AI：Agent 编排专业模型','价值：形成实验闭环'],labelsEn:['background: coupled tasks','traditional: manual orchestration','AI: agent coordinates specialists','value: closed experimental loop'],copyZh:['电镀添加剂研发同时涉及吸附、扩散、分子设计、CVS 响应与实验验证，一个模型不可能包办所有问题。','传统做法需要研究者在不同模型、代码、数据库和实验之间手工搬运目标与结果，流程长且容易丢失上下文。','Agent 不替代物理化学模型，而是理解研发目标、选择专业模型与工具、组织调用顺序并保留中间证据。','候选经过预测与筛选进入实验，实验结果再反馈下一轮。价值在于让多个专业能力形成可迭代研发闭环。'],copyEn:['Electroplating additive R&D spans adsorption, diffusion, molecular design, CVS response, and experimental validation; no single model can cover the whole problem.','Researchers traditionally move goals and results manually between models, code, databases, and experiments, creating a long and fragile workflow.','The agent does not replace physical-chemistry models; it interprets the goal, selects specialist tools, orders calls, and preserves intermediate evidence.','Predicted and screened candidates enter experiments, whose results feed the next round — closing an iterative R&D loop across specialist capabilities.']}
  };

  function upgradeCases(){
    Object.entries(caseNarratives).forEach(([id,c])=>{
      const s=$('#'+id);if(!s)return;s.dataset.storyFocus='quick';
      const title=$('.story-copy h2',s);if(title)title.textContent=zh()?c.titleZh:c.titleEn;
      const buttons=$$('.case-step-button',s),labels=zh()?c.labelsZh:c.labelsEn,copies=zh()?c.copyZh:c.copyEn;
      buttons.forEach((b,i)=>{const sm=$('small',b),st=$('strong',b);if(sm)sm.textContent=zh()?`步骤 ${i+1}`:`STEP ${i+1}`;if(st)st.textContent=labels[i]||'';if(!b.dataset.rebuildNarrative){b.dataset.rebuildNarrative='1';b.addEventListener('click',()=>requestAnimationFrame(()=>{const t=$('.case-takeaway',s);if(t)t.textContent=(zh()?c.copyZh:c.copyEn)[i]||''}))}});
      const active=Math.max(0,buttons.findIndex(b=>b.classList.contains('active')));const take=$('.case-takeaway',s);if(take)take.textContent=copies[active]||copies[0];
    });
  }

  function apply(){ensureStyle();rebuildP13();rebuildP29();upgradeCases();window.dispatchEvent(new Event('resize'))}
  apply();[180,560,1200,2300,3600,5200].forEach(ms=>setTimeout(apply,ms));
  $('#lang-toggle')?.addEventListener('click',()=>setTimeout(apply,120));
})();
