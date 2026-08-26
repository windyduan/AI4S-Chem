(function installFinalAlignment(){
  const $=(q,c=document)=>c.querySelector(q);
  const $$=(q,c=document)=>[...c.querySelectorAll(q)];
  const zh=()=>document.documentElement.lang!=='en';

  function ensureStyle(){
    if(document.querySelector('link[data-final-alignment]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='final-alignment.css?v=20260826a';
    link.dataset.finalAlignment='true';
    document.head.appendChild(link);
  }

  function cleanTerminal(text){
    return zh()?text.replace(/。+$/,''):text.replace(/\.+$/,'');
  }
  function stripTitlePunctuation(){
    $$('main section h2').forEach(h=>{
      const bilingual=h.querySelector('.story-zh,.story-en');
      if(bilingual){
        const target=zh()?h.querySelector('.story-zh'):h.querySelector('.story-en');
        if(target&&!target.querySelector('*')){
          const raw=target.textContent.trim(),clean=cleanTerminal(raw);
          if(raw!==clean)target.textContent=clean;
        }
        return;
      }
      const raw=h.textContent.trim();
      if(!raw)return;
      const clean=cleanTerminal(raw);
      if(raw!==clean)h.textContent=clean;
    });
  }

  function removeRetiredScreens(){
    ['prediction-loss-screen','data-split','generalization-curves','unseen-vocabulary'].forEach(id=>document.getElementById(id)?.remove());
  }

  function alignEvaluationTransition(){
    const s=document.getElementById('metric-lab-screen');
    if(!s)return;
    const kicker=s.querySelector('.story-kicker');
    const title=s.querySelector('.story-copy h2');
    if(zh()){
      if(kicker)kicker.textContent='数据划分和评估流程确认合理后，再看指标';
      if(title)title.textContent='评估流程确认以后，怎么衡量预测误差';
    }else{
      if(kicker)kicker.textContent='CHECK METRICS AFTER THE SPLIT AND EVALUATION PIPELINE ARE SOUND';
      if(title)title.textContent='Once the evaluation pipeline is sound, how should prediction error be measured';
    }
  }

  const summaryZhMap={
    'COURSE MAP · STATIC SUMMARY':'课程总览',
    'COURSE 01':'课程 01',
    'COURSE 02':'课程 02',
    '01 · BASICS':'01 · 基础概念',
    '02 · REPRESENTATION':'02 · 化学表示',
    '03 · CAPABILITY':'03 · 模型能力',
    '04 · PRACTICE':'04 · 科研案例',
    '01 · LEARN':'01 · 预测与更新',
    '02 · TRAINING':'02 · 训练过程',
    '03 · HOLD OUT':'03 · 数据划分',
    '04 · EVALUATE':'04 · 可信评估',
    'Sample · x · y · Model · Loss':'样本 · x · y · 模型 · Loss',
    'Descriptor · Fingerprint · SMILES':'描述符 · 指纹 · SMILES',
    'Graph · 3D':'分子图 · 3D',
    'Representation ≠ Model':'表示 ≠ 模型',
    'GNN · Message Passing':'GNN · 消息传递',
    'Multimodal':'多模态',
    'LLM + Tools · Scientific Agent':'LLM + 工具 · 科研智能体',
    'Prediction → Loss → Update':'预测 → Loss → 参数更新',
    'Gradient Descent · Learning Rate':'梯度下降 · 学习率',
    'Train · Validation · Test':'训练集 · 验证集 · 测试集',
    'Random · Scaffold · Time · External':'随机 · 骨架 / 系列 · 时间 · 外部测试'
  };
  function localizeSummaryMaps(){
    if(!zh())return;
    $$('#course-summary-map,#course-summary-map-2').forEach(s=>{
      $$('*',s).forEach(el=>{
        if(el.children.length)return;
        const raw=el.textContent.trim();
        if(summaryZhMap[raw])el.textContent=summaryZhMap[raw];
      });
      const no=s.querySelector('.section-no');
      if(no){
        if(s.id==='course-summary-map')no.textContent='课程 01 / 总结';
        if(s.id==='course-summary-map-2')no.textContent='课程 02 / 总结';
      }
    });
  }

  const resourceKindZh={
    'Course':'课程',
    'Video / Visual Math':'视频 / 数学可视化',
    'Documentary':'纪录片',
    'Interactive':'交互学习',
    'Book / GitHub':'开源书 / GitHub',
    'Course / GitHub':'课程 / GitHub',
    'Course / Knowledge Base':'课程 / 知识库',
    'Research Code / GitHub':'科研代码 / GitHub',
    'Curated Index / GitHub':'资源索引 / GitHub',
    'Library + Tutorials / GitHub':'工具库 + 教程 / GitHub',
    'Toolkit / GitHub':'工具箱 / GitHub',
    'Molecular ML / GitHub':'分子机器学习 / GitHub',
    'Atomistic ML / GitHub':'原子尺度机器学习 / GitHub',
    'Models & Data / GitHub':'模型与数据 / GitHub',
    'Notebooks / GitHub':'Notebook / GitHub',
    'Dataset / GitHub':'数据集 / GitHub',
    'Materials Toolkit / GitHub':'材料工具 / GitHub'
  };
  function localizeResourceMeta(){
    $$('#explore .resource-card .meta').forEach(meta=>{
      if(!meta.dataset.finalOriginal)meta.dataset.finalOriginal=meta.textContent;
      const original=meta.dataset.finalOriginal;
      if(!zh()){
        if(meta.textContent!==original)meta.textContent=original;
        return;
      }
      const parts=original.split(' · ');
      if(resourceKindZh[parts[0]])parts[0]=resourceKindZh[parts[0]];
      const localized=parts.join(' · ');
      if(meta.textContent!==localized)meta.textContent=localized;
    });
  }

  const reviewTypeZh={
    'Comment / Best Practices':'评论 / 最佳实践',
    'Primer':'入门综述',
    'Perspective':'观点 / 展望',
    'Survey / Agentic Science':'综述 / 科研智能体'
  };
  function localizeReviewMeta(){
    $$('#review-shelf-screen .review-card small').forEach(meta=>{
      if(!meta.dataset.finalOriginal)meta.dataset.finalOriginal=meta.textContent;
      const original=meta.dataset.finalOriginal;
      if(!zh()){
        if(meta.textContent!==original)meta.textContent=original;
        return;
      }
      const parts=original.split(' · ');
      if(reviewTypeZh[parts[0]])parts[0]=reviewTypeZh[parts[0]];
      const localized=parts.join(' · ');
      if(meta.textContent!==localized)meta.textContent=localized;
    });
  }

  const caseZhMap={
    'REDRAWN TEACHING WORKFLOW · BASED ON PAPER FIG. 1':'课程重绘流程 · 基于论文 Fig. 1',
    'REDRAWN TEACHING WORKFLOW · BASED ON PAPER FIG. 1c':'课程重绘流程 · 基于论文 Fig. 1c',
    'REDRAWN TEACHING WORKFLOW · BASED ON PAPER FIGS. 1 & 4':'课程重绘流程 · 基于论文 Figs. 1 & 4',
    'REDRAWN TEACHING WORKFLOW · BASED ON THE PUBLISHED METHOD':'课程重绘流程 · 基于论文方法',
    'REDRAWN TEACHING WORKFLOW · BASED ON THE PREPRINT METHOD':'课程重绘流程 · 基于预印本方法',
    'REDRAWN TEACHING WORKFLOW · BASED ON OFFICIAL PROJECT DESCRIPTION':'课程重绘流程 · 基于官方项目介绍',
    'chemical space':'配方空间',
    'concurrent learning':'并发学习',
    'properties + mechanism':'性质与机制',
    'literature':'文献',
    'extract + structure':'抽取并结构化',
    'KG + chemistry rules':'知识图谱 + 化学规则',
    'trace + verify':'追溯与验证',
    'three modalities':'三种模态',
    'align':'对齐表示',
    'use embedding':'使用共享表示',
    'takeaway':'核心认识',
    'two modalities':'两种模态',
    'bidirectional tasks':'双向任务',
    'evidence status':'证据层级',
    'specialists':'专业模型',
    'orchestrate':'组织工作流',
    'experiment loop':'实验闭环',
    'evidence label':'证据说明',
    'INPUT':'输入',
    'MODEL':'模型',
    'LEARNING':'学习',
    'OUTPUT':'输出',
    'SPACE':'空间',
    'DATA':'数据',
    'SCIENCE':'科学问题',
    'MODALITY 1':'模态 1',
    'MODALITY 2':'模态 2',
    'MODALITY 3':'模态 3',
    'MODALITY A':'模态 A',
    'MODALITY B':'模态 B',
    'SPECIALIST MODEL':'专业模型',
    'GENERAL MODEL + WORKFLOW ORCHESTRATION':'通用模型 + 工作流编排'
  };
  function localizeCaseUI(){
    $$('.case-section').forEach(s=>{
      $$('.case-visual-title,.case-step-button small,.case-step-button strong,.case-flow-node small,.nose-modal small,.xas-modality small,.ep-specialist small,.ep-orchestrator small',s).forEach(el=>{
        if(!el.dataset.finalOriginal)el.dataset.finalOriginal=el.textContent.trim();
        const original=el.dataset.finalOriginal;
        let next=original;
        if(zh()){
          const step=original.match(/^STEP\s+(\d+)$/i);
          next=step?`步骤 ${step[1]}`:(caseZhMap[original]||original);
        }
        if(el.textContent.trim()!==next)el.textContent=next;
      });
      const evidence=$('.ep-evidence',s);
      if(evidence){
        if(!evidence.dataset.finalOriginal)evidence.dataset.finalOriginal=evidence.textContent.trim();
        evidence.textContent=zh()
          ?'证据层级：官方项目结果。这里展示专业模型、智能体编排与实验迭代，不作为同行评审论文呈现。'
          :evidence.dataset.finalOriginal;
      }
    });
  }

  function markSemanticStates(){
    const play=document.getElementById('play');
    const fit=play?.querySelector('.p32-fit-explain article.active');
    if(play&&fit?.dataset.state)play.dataset.fitState=fit.dataset.state;

    const trust=document.getElementById('trust-zone-screen');
    const label=trust?.querySelector('.trust-label')?.textContent||'';
    if(trust){
      if(/外推|EXTRAPOLATION/i.test(label))trust.dataset.trustState='far';
      else if(/边界|EDGE/i.test(label))trust.dataset.trustState='border';
      else trust.dataset.trustState='near';
    }
  }

  function bindStateRefresh(){
    const degree=document.querySelector('#play #degree');
    if(degree&&!degree.dataset.finalAlignmentBound){
      degree.dataset.finalAlignmentBound='1';
      degree.addEventListener('input',()=>setTimeout(markSemanticStates,20));
    }
    const trust=document.querySelector('#trust-zone-screen .trust-slider');
    if(trust&&!trust.dataset.finalAlignmentBound){
      trust.dataset.finalAlignmentBound='1';
      trust.addEventListener('input',()=>setTimeout(markSemanticStates,20));
    }
  }

  function apply(){
    ensureStyle();
    removeRetiredScreens();
    stripTitlePunctuation();
    alignEvaluationTransition();
    localizeSummaryMaps();
    localizeResourceMeta();
    localizeReviewMeta();
    localizeCaseUI();
    markSemanticStates();
    bindStateRefresh();
  }

  apply();
  [180,620,1250,2200,3300,4700].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,180));

  const resources=document.getElementById('resource-grid');
  if(resources&&'MutationObserver'in window){
    new MutationObserver(()=>localizeResourceMeta()).observe(resources,{childList:true,subtree:true});
  }
})();
