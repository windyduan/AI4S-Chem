(function installCaseStoryMain(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';
  const bi=(a,b)=>`<span class="story-zh">${a}</span><span class="story-en">${b}</span>`;

  function ensureStyle(){
    if(document.querySelector('link[data-case-story-main]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='case-story-main.css?v=20260826a';
    link.dataset.caseStoryMain='true';
    document.head.appendChild(link);
  }

  function movePresentNav(){
    const topbar=$('.topbar'),nav=$('.story-present-nav');
    if(!topbar||!nav)return;
    const anchor=$('#chapter-trigger')||$('#course-info-button');
    if(anchor&&nav.previousElementSibling!==anchor)anchor.insertAdjacentElement('afterend',nav);
    nav.classList.add('story-present-nav-inline');
  }

  function setText(el,zhText,enText){
    if(!el)return;
    el.innerHTML=bi(zhText,enText);
  }

  function activeStep(section){
    const buttons=$$('.case-step-button',section);
    const i=buttons.findIndex(b=>b.classList.contains('active'));
    return i<0?0:i;
  }

  function bindStorySteps(section,labelsZh,labelsEn,copyZh,copyEn,onStep){
    if(!section)return;
    const buttons=$$('.case-step-button',section);
    buttons.forEach((b,i)=>{
      b.dataset.storyStep=String(i);
      const small=$('small',b);if(small)small.textContent=zh()?`步骤 ${i+1}`:`STEP ${i+1}`;
      const strong=$('strong',b);if(strong)strong.textContent=(zh()?labelsZh:labelsEn)[i]||'';
      if(!b.dataset.caseStoryBound){
        b.dataset.caseStoryBound='1';
        b.addEventListener('click',()=>{
          const step=+b.dataset.storyStep;
          requestAnimationFrame(()=>renderStoryStep(section,step,labelsZh,labelsEn,copyZh,copyEn,onStep));
        });
      }
    });
    renderStoryStep(section,activeStep(section),labelsZh,labelsEn,copyZh,copyEn,onStep);
  }

  function renderStoryStep(section,step,labelsZh,labelsEn,copyZh,copyEn,onStep){
    const buttons=$$('.case-step-button',section),labels=zh()?labelsZh:labelsEn;
    buttons.forEach((b,i)=>{
      const small=$('small',b);if(small)small.textContent=zh()?`步骤 ${i+1}`:`STEP ${i+1}`;
      const strong=$('strong',b);if(strong)strong.textContent=labels[i]||'';
    });
    const take=$('.case-takeaway',section);if(take)take.textContent=(zh()?copyZh:copyEn)[step]||'';
    onStep?.(step);
  }

  function upgradeCaseIntro(){
    const s=$('#discovery-story');if(!s)return;
    const kicker=$('.story-kicker',s),title=$('.story-copy h2',s),lead=$('.story-copy .lead',s);
    if(kicker)kicker.textContent=zh()?'真实案例 · 从科研瓶颈开始':'REAL CASES · START FROM THE BOTTLENECK';
    setText(title,'为什么有些化学问题，到了 AI 这里才突然“做得动”？','Why do some chemistry problems suddenly become tractable with AI?');
    setText(lead,
      '接下来不按模型名字背六篇论文。先找科研瓶颈：组合空间太大、第一性原理太贵、文献太多、不同模态彼此割裂、多个模型与实验难协同。电解液 uMLP 和 Cat-KG 细讲，其余案例只抓“问题 → AI 解法 → 为什么有用”。',
      'Do not memorize six model names. Start from scientific bottlenecks: combinatorial spaces, expensive first-principles calculations, literature overload, disconnected modalities, and workflows that require many models and experiments. We will go deeper on electrolyte uMLP and Cat-KG, and keep the other cases to problem → AI solution → why it matters.'
    );
  }

  const elyteZh=[
    '背景：电解液不是“挑一个最好分子”。溶剂、盐、浓度、混合比例一起形成高维组合空间；论文从 >2300 种溶剂候选和盐库出发，并随机生成大量不同组成的电解液体系。',
    '传统方法的矛盾很直接：经典 MD 很快，但精度受力场参数限制；AIMD 更接近第一性原理，却昂贵到很难覆盖大量配方和长时间尺度。论文指出 AIMD 常受限于约千原子、百皮秒以内。',
    'AI 的关键不是把所有组合都做 DFT。模型先用 MLMD 探索，利用模型分歧找到“最不确定、最值得标注”的构型，再调用 DFT 补数据，循环更新；91 轮后得到约 16 万个训练构型。',
    '为什么重要：训练好的 uMLP 把昂贵势能计算变成可扩展的 MLMD，可从轨迹计算密度、溶剂化、黏度和离子电导率。AI 在这里不是猜一个数字，而是在加速高精度模拟。'
  ];
  const elyteEn=[
    'Background: an electrolyte is not one “best molecule”. Solvents, salts, concentration and mixing ratios create a high-dimensional composition space. The paper starts from >2300 solvent candidates plus a salt database and generates many randomized electrolyte systems.',
    'The conventional trade-off is sharp: classical MD is fast but depends on force-field quality; AIMD is higher fidelity but too expensive to cover many formulations and long times. The paper notes typical AIMD limits around a thousand atoms and below 100 ps.',
    'The AI idea is not to run DFT on every formulation. MLMD explores first, model disagreement selects the most informative configurations, and only those are labeled with DFT before the potential is updated. After 91 concurrent-learning iterations, about 160k configurations are collected.',
    'Why it matters: the resulting uMLP turns expensive potential-energy calculations into scalable MLMD, from which density, solvation, viscosity and ionic conductivity can be computed. AI is accelerating high-fidelity simulation rather than merely guessing one property.'
  ];
  const elyteLabelsZh=['背景：组合空间爆炸','传统方法：准确与速度两难','AI：按需做 DFT','价值：把模拟做大做长'];
  const elyteLabelsEn=['background: combinatorial space','traditional accuracy–cost trade-off','AI: DFT only where needed','value: scalable simulation'];

  function elyteMarkup(){
    return `<div class="case-visual-title">课程重绘流程 · 依据论文 Fig. 1b–c</div>
      <div class="elyte-story-map" data-step="0">
        <div class="elyte-story-block elyte-story-problem">
          <small>${bi('科学瓶颈','SCIENTIFIC BOTTLENECK')}</small>
          <strong>${bi('电解液设计 = 溶剂 × 盐 × 浓度 × 混合比例，不是逐个分子试一遍','Electrolyte design = solvent × salt × concentration × mixing ratio')}</strong>
          <p>${bi('候选数随组合迅速膨胀；高精度计算若逐个覆盖，成本也跟着爆炸。','The candidate space grows combinatorially, while exhaustive high-fidelity calculations become prohibitively expensive.')}</p>
        </div>
        <div class="elyte-compose-row">
          <div class="elyte-story-node solvents"><small>${bi('溶剂候选库','SOLVENT LIBRARY')}</small><strong>&gt;2300 ${bi('种溶剂','solvents')}</strong><span>carbonate · ether · nitrile · heterocycle · sulfone …</span></div>
          <div class="elyte-symbol">+</div>
          <div class="elyte-story-node salts"><small>${bi('盐库','SALT LIBRARY')}</small><strong>20 ${bi('种常用盐','common salts')}</strong><span>LiPF₆ · LiFSI · LiTFSI · LiBF₄ …</span></div>
          <div class="elyte-symbol">→</div>
          <div class="elyte-story-node generator"><small>${bi('随机配方生成器','RANDOM COMPOSITION GENERATOR')}</small><strong>${bi('约 100 万个组合 / 浓度起点','~1 million randomized compositions')}</strong><span>${bi('从组合空间取样，而不是逐个配方做 DFT','sample the space instead of running DFT on every formulation')}</span></div>
        </div>
        <div class="elyte-learning-wrap">
          <div class="elyte-learning-loop"><span>${bi('训练势函数','Train MLP')}</span><span>${bi('MLMD 探索','Explore')}</span><span>${bi('模型分歧筛选','Screen by disagreement')}</span><span>${bi('DFT 标注','DFT label')}</span></div>
          <div class="elyte-dft-note"><strong>${bi('昂贵计算只用在“模型最拿不准”的地方','Spend DFT where the model is uncertain')}</strong><span>${bi('新标注回到训练集，再进入下一轮。','New labels return to the training set for the next round.')}</span></div>
        </div>
        <div class="elyte-result-row">
          <div class="elyte-story-node"><small>${bi('得到','RESULT')}</small><strong>uMLP</strong><span>${bi('学习原子能量与力','learn energies and forces')}</span></div>
          <div class="elyte-symbol">→</div>
          <div class="elyte-story-node sim"><small>${bi('驱动','DRIVE')}</small><strong>MLMD</strong><span>${bi('更大体系 / 更长时间','larger systems / longer time')}</span></div>
          <div class="elyte-symbol">→</div>
          <div class="elyte-properties"><span>${bi('密度','density')}</span><span>${bi('溶剂化','solvation')}</span><span>${bi('黏度','viscosity')}</span><span>${bi('电导率','conductivity')}</span></div>
        </div>
        <div class="elyte-paper-facts"><span>91 ${bi('轮并发学习','iterations')}</span><span>≈160k ${bi('训练构型','configurations')}</span><span>${bi('轨迹 → 性质与机制','trajectory → properties & mechanism')}</span></div>
      </div>`;
  }

  function upgradeElyte(){
    const s=$('#case-elyte');if(!s)return;
    s.dataset.storyFocus='detail';
    const kicker=$('.story-kicker',s),title=$('.story-copy h2',s),lead=$('.story-copy .lead',s),q=$('.case-question',s),note=$('.case-note',s),stage=$('.case-stage',s);
    if(kicker)kicker.textContent=zh()?'重点案例 1 · 电解液模拟':'DEEP DIVE 1 · ELECTROLYTE SIMULATION';
    setText(title,'电解液空间太大、第一性原理太贵，AI 能不能把“算不动”变成“算得动”？','The electrolyte space is huge and first-principles simulation is expensive — can AI make it tractable?');
    setText(lead,'一瓶电解液背后不是一个分子，而是大量溶剂、盐、浓度和混合比例的组合。这个案例最适合看清：AI 怎样从“预测器”变成“模拟加速器”。','An electrolyte is a combination of solvents, salts, concentrations and mixing ratios. This case shows clearly how AI can become a simulation accelerator rather than just a predictor.');
    setText(q,'论文的关键不是让 AI 直接猜电导率，而是学习可迁移的原子势能面，用少量按需 DFT 标注换取大规模 MLMD。','The key idea is not to predict conductivity directly, but to learn a transferable atomistic potential and trade selective DFT labels for scalable MLMD.');
    if(note)setText(note,'数字与流程来自 Nature Communications 论文正文；本页为课程教学重绘，不复制原论文图。','Numbers and workflow follow the Nature Communications paper; this is a teaching redraw rather than a reproduced figure.');
    if(stage&&!s.dataset.elyteStoryRedraw){stage.innerHTML=elyteMarkup();s.dataset.elyteStoryRedraw='1'}
    bindStorySteps(s,elyteLabelsZh,elyteLabelsEn,elyteZh,elyteEn,step=>{const map=$('.elyte-story-map',s);if(map)map.dataset.step=String(step)});
  }

  const catZh=[
    '背景：接力催化把多个反应连成一条路线。真正的困难不是“没有文献”，而是路线设计漫长、组合复杂，还高度依赖有经验研究者在大量论文里寻找催化剂、条件和中间体。',
    '第一步先解决“文献看不完”：LLM 做全文抽取，把反应物、产物、催化剂、条件等整理成结构化数据，再经过清洗和实体消歧写入 Cat-KG。论文规模达到 15,881 篇文献、27,760 个热催化反应。',
    '第二步解决“路线组合不完”：给定目标产物后，图查询先生成候选多步路径，再用接力催化专家规则评分、过滤和排序。论文报告单次路线搜索与推荐可以在分钟级完成。',
    '为什么可靠：LLM 最后才把结构化路线变成可读反应式和文字，不负责凭空编路线；每一步保留 reaction / source ID，可以沿知识图谱回到原始文献，重要结果仍由化学家验证。'
  ];
  const catEn=[
    'Background: relay catalysis chains multiple catalytic reactions. The bottleneck is not a lack of papers, but lengthy pathway design, combinatorial possibilities, and heavy dependence on experienced researchers reading the literature for catalysts, conditions and intermediates.',
    'First solve “too much literature”: an LLM extracts full-text reaction information, then cleaning and entity disambiguation turn it into structured data stored in Cat-KG. The paper covers 15,881 publications and 27,760 thermocatalytic reactions.',
    'Then solve “too many pathways”: for a target product, graph queries generate candidate multistep routes and relay-catalysis expert rules score, filter and rank them. The paper reports pathway search and recommendation within minutes.',
    'Why it is more reliable: the LLM is used last to render structured routes as readable equations and prose rather than inventing routes from scratch. Reaction/source IDs remain traceable to the KG and original literature, with chemists still validating consequential results.'
  ];
  const catLabelsZh=['背景：知识太多太散','文献 → 结构化知识','知识 → 候选路线','规则 + 追溯保证可信'];
  const catLabelsEn=['background: knowledge overload','literature → structured knowledge','knowledge → candidate routes','rules + traceability'];

  function catMarkup(){
    return `<div class="case-visual-title">课程重绘流程 · 依据论文 Figs. 1, 3 & 4</div>
      <div class="cat-story-map" data-step="0">
        <div class="cat-story-problem"><small>${bi('科学瓶颈','SCIENTIFIC BOTTLENECK')}</small><strong>${bi('上万篇文献里有知识，但人很难系统读完；多步路线还会产生大量组合。','The knowledge exists across thousands of papers, but humans cannot systematically read and combine it all.')}</strong><p>${bi('论文把“自动读文献”和“自动找路线”拆成两个受约束阶段。','The paper separates automated literature processing from constrained pathway search.')}</p></div>
        <div class="cat-phase build">
          <div class="cat-phase-head"><b>A</b><strong>${bi('先把文献变成可查询的知识','Turn literature into queryable knowledge')}</strong></div>
          <div class="cat-phase-flow"><div class="cat-phase-node"><small>INPUT</small><strong>${bi('催化论文全文','full-text papers')}</strong><span>15,881 publications</span></div><div class="cat-phase-node"><small>LLM</small><strong>${bi('抽取反应与条件','extract reactions + conditions')}</strong><span>${bi('跨摘要 / 正文 / 图表信息','across full-text sections')}</span></div><div class="cat-phase-node"><small>CLEAN</small><strong>${bi('结构化 + 实体消歧','structure + disambiguate')}</strong><span>JSON · rules</span></div><div class="cat-phase-node"><small>KNOWLEDGE</small><strong>Cat-KG</strong><span>27,760 reactions</span></div></div>
        </div>
        <div class="cat-phase route">
          <div class="cat-phase-head"><b>B</b><strong>${bi('再从知识里找可行的接力催化路线','Then search the knowledge for relay-catalysis routes')}</strong></div>
          <div class="cat-phase-flow"><div class="cat-phase-node"><small>GOAL</small><strong>${bi('目标产物 / 路径约束','target + path constraints')}</strong><span>${bi('化学家定义问题','chemist defines the task')}</span></div><div class="cat-phase-node"><small>QUERY</small><strong>${bi('图查询找候选路径','graph query candidates')}</strong><span>${bi('先广搜','broad search')}</span></div><div class="cat-phase-node"><small>RULES</small><strong>${bi('催化专家规则评分','expert-rule scoring')}</strong><span>${bi('筛选 / 排序','filter / rank')}</span></div><div class="cat-phase-node"><small>LLM</small><strong>${bi('整理成可读路线','render readable route')}</strong><span>${bi('反应式 + 条件','equations + conditions')}</span></div></div>
        </div>
        <div class="cat-trace"><strong>${bi('可信链','TRACEABILITY')}</strong><span>${bi('推荐结果 → reaction ID → Cat-KG 条目 → 原始文献；LLM 不直接“拍脑袋”给答案。','recommendation → reaction ID → Cat-KG entry → original paper; the LLM is not the source of truth.')}</span></div>
      </div>`;
  }

  function upgradeCatKG(){
    const s=$('#case-catkg');if(!s)return;
    s.dataset.storyFocus='detail';
    const kicker=$('.story-kicker',s),title=$('.story-copy h2',s),lead=$('.story-copy .lead',s),q=$('.case-question',s),note=$('.case-note',s),stage=$('.case-stage',s);
    if(kicker)kicker.textContent=zh()?'重点案例 2 · 文献与知识图谱':'DEEP DIVE 2 · LITERATURE & KNOWLEDGE GRAPH';
    setText(title,'催化文献太多、路线组合太多，AI 怎样帮化学家找多步路径？','Too much catalysis literature and too many route combinations — how can AI help chemists find multistep pathways?');
    setText(lead,'这里最值得记住的不是“用了 LLM”，而是 LLM 被放进一条受约束的链：先抽取文献、再建知识图谱、再用化学规则筛路线，最后才生成可读答案。','The important point is not simply “using an LLM”. The LLM sits inside a constrained chain: extract literature, build a knowledge graph, filter routes with chemistry rules, and only then render a readable answer.');
    setText(q,'这项工作解决的是“知识很多但人无法系统组合”的问题，而不是让大模型替代催化专家。','This work addresses the problem of abundant but difficult-to-combine knowledge; it does not replace catalysis expertise with an unconstrained language model.');
    if(note)setText(note,'课程重点保留“文献 → Cat-KG → 图查询 → 专家规则 → 可追溯输出”；细节与候选路线请回到 NSR 原文。','The course keeps the core chain: literature → Cat-KG → graph query → expert rules → traceable output. See the NSR paper for implementation and pathway details.');
    if(stage&&!s.dataset.catStoryRedraw){stage.innerHTML=catMarkup();s.dataset.catStoryRedraw='1'}
    bindStorySteps(s,catLabelsZh,catLabelsEn,catZh,catEn,step=>{const map=$('.cat-story-map',s);if(map)map.dataset.step=String(step)});
  }

  const quickCases={
    'case-nmrnet':{
      kickerZh:'快速案例 · 3D 谱学',kickerEn:'QUICK CASE · 3D SPECTROSCOPY',
      titleZh:'同一个原子，周围 3D 环境一变，NMR 化学位移为什么也会变？',titleEn:'Why does an NMR chemical shift change when the atom’s 3D environment changes?',
      leadZh:'科学问题是“结构怎样对应光谱”。AI 的作用是直接学习局域三维环境与原子级 chemical shift 之间的关系，并通过预训练 + 微调跨不同 NMR 数据集迁移。',leadEn:'The scientific problem is structure–spectrum mapping. AI learns the relationship between local 3D atomic environments and atom-level chemical shifts, then transfers across NMR datasets through pretraining and fine-tuning.',
      questionZh:'这页只记住一件事：当目标量依赖三维局域环境时，representation 与几何对称性本身就是科学问题的一部分。',questionEn:'Remember one point: when the target depends on a local 3D environment, representation and geometric symmetry are part of the scientific problem.',
      labelsZh:['科学问题','3D 局域环境','预训练 + 微调','为什么有用'],labelsEn:['scientific question','3D local environment','pretrain + fine-tune','why it matters'],
      copyZh:['NMR chemical shift 对局域化学环境敏感；不同液态、固态体系之间的结构—谱学关系很难靠一个简单规则统一描述。','把目标原子周围的 3D 原子环境交给 SE(3)-aware 模型，让旋转 / 平移下的几何关系被更合适地处理。','先学习更通用的结构规律，再针对具体数据集微调，减少每个谱学任务都从零开始的代价。','模型最终输出原子级 chemical shift，并把液态与固态 NMR 数据放进统一 benchmark；对新生来说，这是“3D representation 真正进入实验表征任务”的例子。'],
      copyEn:['NMR chemical shifts are sensitive to local chemical environments, and structure–spectrum relationships across liquid and solid systems are difficult to capture with one simple rule.','Represent the target atom’s 3D neighborhood and use an SE(3)-aware model so rotations and translations are handled appropriately.','Learn more general structural patterns first, then fine-tune to specific datasets instead of starting every spectroscopy task from scratch.','The model predicts atom-level chemical shifts and places liquid- and solid-state NMR data in a unified benchmark — a concrete example of 3D representation entering experimental characterization.']
    },
    'case-unixas':{
      kickerZh:'快速案例 · 光谱 ↔ 结构',kickerEn:'QUICK CASE · SPECTRUM ↔ STRUCTURE',
      titleZh:'实验给我们一条 XAS 光谱，能不能反过来推局域三维结构？',titleEn:'Given an XAS spectrum, can we infer the local 3D structure?',
      leadZh:'这是典型的“逆问题”：光谱是观测信号，局域结构是三维几何。Uni-XAS 把二者放进共享表示空间，同时支持 structure → spectrum 和 spectrum → structure。',leadEn:'This is an inverse problem: a spectrum is an observed signal while local structure is 3D geometry. Uni-XAS aligns both in a shared representation and supports structure → spectrum as well as spectrum → structure.',
      questionZh:'重点不是记住生成模型名字，而是理解：跨模态表示可以把“实验信号”和“原子结构”变成可相互检索、预测与生成的对象。',questionEn:'Do not memorize the generator name; understand that cross-modal representation can connect experimental signals and atomic structures for retrieval, prediction and generation.',
      labelsZh:['科学问题','两种模态','共享表示','双向能力'],labelsEn:['scientific question','two modalities','shared representation','bidirectional capability'],
      copyZh:['XAS 间接编码局域原子环境，但从一条谱线反推出具体 3D 结构并不直接。','一端是一维 XAS 光谱，一端是局域三维原子结构；它们的数据形态完全不同。','模型把两种模态对齐到共享空间，让“这条光谱更像哪个结构”变成可计算的问题。','统一表示后，可以做结构—光谱检索、光谱预测，也可以以光谱为条件生成局域 3D 结构。'],
      copyEn:['XAS indirectly encodes local atomic environments, but mapping one spectrum back to a concrete 3D structure is not direct.','One modality is a 1D XAS spectrum and the other is local 3D atomic geometry — fundamentally different data forms.','The model aligns both modalities in a shared space so “which structure matches this spectrum?” becomes computable.','The shared representation supports structure–spectrum retrieval, spectrum prediction and spectrum-conditioned local 3D generation.']
    },
    'case-electroplating':{
      kickerZh:'收口案例 · 科研智能体',kickerEn:'CLOSING CASE · SCIENTIFIC AGENT',
      titleZh:'真实配方研发需要很多模型、工具和实验，谁来把它们串起来？',titleEn:'Real formulation R&D needs many models, tools and experiments — who coordinates them?',
      leadZh:'一个 LLM 不会替代吸附、扩散、分子设计和实验。这里的 Agent 更像“流程组织者”：理解任务、调用专业模型、筛候选、进入实验，再把新证据送回下一轮。',leadEn:'One LLM does not replace adsorption, diffusion, molecular design or experiments. The agent acts as a workflow coordinator: understand the task, call specialist models, screen candidates, run experiments and feed new evidence into the next iteration.',
      questionZh:'科学价值来自“多个专业能力形成闭环”，不是一个聊天模型包办物理化学。',questionEn:'The scientific value comes from closing the loop across specialist capabilities, not asking one chat model to replace physical chemistry.',
      labelsZh:['科研问题','专业模型','智能体编排','实验闭环'],labelsEn:['scientific problem','specialist models','agent orchestration','experimental loop'],
      copyZh:['电镀添加剂与配方研发同时涉及吸附、扩散、分子设计、CVS 响应等不同问题，单模型很难覆盖完整流程。','每个专业模型只负责自己擅长的物理化学任务；数据、模拟工具和实验也仍然保留各自角色。','Agent 负责理解目标、选择工具、组织调用顺序并汇总中间结果，而不是替代专业模型。','候选经过预测和筛选进入实验；实验结果再反馈到数据和模型，形成可迭代的研发闭环。当前证据层级明确标为官方项目结果。'],
      copyEn:['Electroplating additive and formulation R&D spans adsorption, diffusion, molecular design, CVS response and other distinct problems; no single model covers the whole workflow.','Each specialist model handles the physical or chemical task it is built for, while data, simulation tools and experiments retain their own roles.','The agent interprets the goal, chooses tools, orders calls and summarizes intermediate results rather than replacing specialist models.','Candidates move through prediction and screening into experiments; experimental results return to data and models for the next iteration. The evidence layer here is explicitly an official project result.']
    }
  };

  function upgradeQuickCases(){
    Object.entries(quickCases).forEach(([id,cfg])=>{
      const s=$('#'+id);if(!s)return;
      const kicker=$('.story-kicker',s),title=$('.story-copy h2',s),lead=$('.story-copy .lead',s),q=$('.case-question',s);
      if(kicker)kicker.textContent=zh()?cfg.kickerZh:cfg.kickerEn;
      setText(title,cfg.titleZh,cfg.titleEn);setText(lead,cfg.leadZh,cfg.leadEn);setText(q,cfg.questionZh,cfg.questionEn);
      bindStorySteps(s,cfg.labelsZh,cfg.labelsEn,cfg.copyZh,cfg.copyEn);
    });
  }

  function upgradeNoseNarrative(){
    const s=$('#case-nose');if(!s)return;
    const kicker=$('.story-kicker',s),title=$('.story-copy h2',s),lead=$('.story-copy .lead',s);
    if(kicker)kicker.textContent=zh()?'快速案例 · 分子—受体—气味语义':'QUICK CASE · MOLECULE–RECEPTOR–ODOR SEMANTICS';
    setText(title,'“闻起来像什么”不只取决于分子结构，AI 怎样把受体和语言一起接进来？','Odor is not determined by molecular structure alone — how can AI connect receptors and language?');
    setText(lead,'气味横跨化学结构、生物受体和人类语义。NOSE 的核心不是“把三种文件拼起来”，而是让两类信息通过分子这个共同枢纽进入统一表示，并尽量避免互相覆盖。','Olfaction spans chemical structure, biological receptors and human semantics. NOSE does not simply concatenate three file types; it uses the molecule as a shared hub and injects receptor and semantic information into a unified representation while keeping their contributions distinct.');
  }

  function fitOneCase(s){
    if(!s||window.innerWidth<=900){s?.removeAttribute('data-case-fit');return}
    s.dataset.caseFit='normal';
    requestAnimationFrame(()=>{
      const overflow=s.scrollHeight-s.clientHeight;
      if(overflow>6)s.dataset.caseFit='compact';
      requestAnimationFrame(()=>{
        if(s.scrollHeight-s.clientHeight>8)s.dataset.caseFit='scroll';
      });
    });
  }

  function fitCaseSections(){
    $$('.case-section').forEach(fitOneCase);
  }

  let resizeTimer=0;
  function scheduleFit(){clearTimeout(resizeTimer);resizeTimer=setTimeout(fitCaseSections,90)}

  function apply(){
    ensureStyle();
    movePresentNav();
    upgradeCaseIntro();
    upgradeElyte();
    upgradeCatKG();
    upgradeQuickCases();
    upgradeNoseNarrative();
    scheduleFit();
  }

  apply();
  [180,520,950,1550,2500,3600,5200].forEach(ms=>setTimeout(apply,ms));
  $('#lang-toggle')?.addEventListener('click',()=>setTimeout(apply,180));
  window.addEventListener('resize',scheduleFit,{passive:true});
  window.visualViewport?.addEventListener('resize',scheduleFit,{passive:true});
})();
