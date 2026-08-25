(function installContentToneCleanup(){
  const zh=()=>document.documentElement.lang!=='en';
  const caseIds=['case-nmrnet','case-elyte','case-catkg','case-nose','case-unixas','case-electroplating'];

  const details={
    'case-nmrnet':{
      zh:[
        '先把目标原子周围的三维局域环境作为模型输入。',
        'SE(3) Transformer 用适合三维旋转与平移的方式处理原子环境。',
        '先在较大数据上预训练，再针对具体 NMR 数据集进行微调。',
        '最终输出原子级化学位移；相关工作同时建立了覆盖液态与固态数据的评测基准。'
      ],
      en:[
        'Represent the 3D local environment around the target atom as model input.',
        'Use an SE(3) Transformer to handle atomic environments with 3D rotation and translation in mind.',
        'Pretrain on larger data, then fine-tune for specific NMR datasets.',
        'Predict atom-level chemical shifts and evaluate them on benchmarks covering liquid- and solid-state data.'
      ]
    },
    'case-elyte':{
      zh:[
        '从大规模电解液组成空间出发，组合不同溶剂与盐类形成候选体系。',
        '并发学习反复进行训练、探索、筛选和 DFT 标注，把新增计算集中到模型最需要的构型。',
        '训练面向电解液体系的 uMLP，并用它驱动机器学习分子动力学模拟。',
        '从模拟轨迹中计算密度、溶剂化结构、黏度和离子电导率等性质，并分析 Li⁺ 配位动力学。'
      ],
      en:[
        'Start from a large electrolyte-composition space built from different solvents and salts.',
        'Concurrent learning cycles through training, exploration, screening, and DFT labeling so new calculations target the most useful configurations.',
        'Train a domain-oriented uMLP and use it to drive machine-learning molecular dynamics.',
        'Compute density, solvation structure, viscosity, ionic conductivity, and Li+ coordination dynamics from the trajectories.'
      ]
    },
    'case-catkg':{
      zh:[
        '先定义催化知识结构，再用 LLM 辅助从文献中抽取反应、反应物、催化剂、溶剂和产物等信息。',
        '把结构化信息写入 Cat-KG，形成可以查询和关联的催化知识图谱。',
        '针对目标产物查询候选多步路径，再结合催化领域规则进行筛选和排序。',
        'LLM 最后把结构化路径和条件转成化学家可读的描述，关键来源仍可回溯到知识图谱和原始文献。'
      ],
      en:[
        'Define a catalysis schema, then use LLM-assisted extraction for reactions, reactants, catalysts, solvents, and products.',
        'Store the structured information in Cat-KG so catalytic knowledge can be queried and connected.',
        'Query candidate multistep pathways for a target product, then filter and rank them with catalysis rules.',
        'Use the LLM to render structured pathways and conditions in readable form while keeping sources traceable to the knowledge graph and literature.'
      ]
    },
    'case-nose':{
      zh:[
        '一个样本可以同时包含分子结构、嗅觉受体序列和自然语言气味描述。',
        '三种模态分别编码，再通过对比学习对齐到可比较的表示空间。',
        '对齐后的表示可以支持嗅觉预测、跨模态检索和零样本任务。',
        '多模态学习的关键不是简单拼接不同文件，而是学习不同科学模态之间可比较、可对齐的表示。'
      ],
      en:[
        'A sample can include molecular structure, olfactory receptor sequences, and natural-language odor descriptions.',
        'Encode the three modalities separately and align them into a comparable representation space with contrastive learning.',
        'The aligned representations support olfactory prediction, cross-modal retrieval, and zero-shot tasks.',
        'Multimodal learning is not simply concatenating file types; it learns comparable, aligned representations across different scientific modalities.'
      ]
    },
    'case-unixas':{
      zh:[
        'XAS 光谱与局域三维原子结构属于两种不同的数据形态。',
        'Uni-XAS 把光谱和结构映射到共享表示空间，通过跨模态对齐建立对应关系。',
        '统一表示后，可以进行结构—光谱检索、光谱预测，以及以光谱为条件的局域三维结构生成。',
        '这类方法适合处理实验信号与结构信息之间的双向映射问题。'
      ],
      en:[
        'XAS spectra and local 3D atomic structures are two different data modalities.',
        'Uni-XAS maps spectra and structures into a shared representation space through cross-modal alignment.',
        'The unified representation supports structure–spectrum retrieval, spectrum prediction, and spectrum-conditioned local 3D generation.',
        'This type of method is useful when experimental signals and structural information must be mapped in both directions.'
      ]
    },
    'case-electroplating':{
      zh:[
        '真实配方研发通常需要多个专业模型分别处理吸附、扩散、分子设计和 CVS 响应等环节。',
        '研发智能体负责理解任务，并在专业模型、数据和工具之间组织工作流，而不是用一个模型替代所有物理化学计算。',
        '候选经过预测和筛选后进入实验验证，实验结果再回到数据与模型环节形成下一轮迭代。',
        '关键候选最终仍要通过实验结果和研究者判断确认是否可用。'
      ],
      en:[
        'Real formulation R&D usually needs different specialist models for adsorption, diffusion, molecular design, CVS response, and related tasks.',
        'The R&D agent interprets the task and orchestrates specialist models, data, and tools rather than replacing all physical and chemical calculations with one model.',
        'Candidates move from prediction and screening to experiments, and experimental results feed the next iteration of data and models.',
        'Important candidates still need experimental evidence and researcher judgment before they are accepted.'
      ]
    }
  };

  const statusZh={
    'Published':'已发表',
    'Conference':'会议论文',
    'Preprint':'预印本',
    'Official Project':'官方项目',
    'Official project':'官方项目'
  };

  function cleanResearch(){
    const research=document.getElementById('research');
    if(research){
      research.querySelectorAll('.research-evidence-note').forEach(el=>el.remove());
      research.querySelectorAll('.research-meaning strong').forEach(el=>{
        el.textContent=zh()?'研究意义：':'Research significance: ';
      });
      if(zh()){
        research.querySelectorAll('.research-status').forEach(el=>{
          const t=el.textContent.trim();
          if(statusZh[t])el.textContent=statusZh[t];
        });
        research.querySelectorAll('.research-index-btn small').forEach(el=>{
          let t=el.textContent;
          Object.entries(statusZh).forEach(([en,cn])=>{if(t.startsWith(en+' ·'))t=cn+t.slice(en.length)});
          el.textContent=t;
        });
      }

      const gallery=research.querySelector('#verified-research-gallery');
      if(gallery&&gallery.dataset.cleanToneObserved!=='1'){
        gallery.dataset.cleanToneObserved='1';
        const observer=new MutationObserver(()=>queueMicrotask(cleanResearch));
        observer.observe(gallery,{childList:true,subtree:true,characterData:true});
      }
    }

    const reviews=document.getElementById('review-shelf-screen');
    if(reviews){
      const lead=reviews.querySelector('.story-copy .lead');
      if(lead)lead.textContent=zh()
        ?'这些综述、Primer 和 Perspective 可以帮助继续系统了解相关方向。'
        :'These reviews, primers, and perspectives are useful for exploring the field in more depth.';
    }
  }

  function desiredCaseDetail(section,id){
    const bank=details[id];
    if(!bank)return'';
    const buttons=[...section.querySelectorAll('.case-step-button')];
    let i=buttons.findIndex(b=>b.classList.contains('active'));
    if(i<0)i=0;
    return (zh()?bank.zh:bank.en)[i]||'';
  }

  function syncCaseDetail(section,id){
    const takeaway=section.querySelector('.case-takeaway');
    if(!takeaway)return;
    const desired=desiredCaseDetail(section,id);
    if(takeaway.textContent!==desired)takeaway.textContent=desired;
  }

  function cleanCase(section,id){
    section.querySelector('.story-copy .lead')?.remove();
    section.querySelector('.case-visual-title')?.remove();
    section.querySelector('.case-question')?.remove();
    section.querySelector('.case-note')?.remove();
    section.querySelector('.ep-evidence')?.remove();

    section.querySelectorAll('.case-step-button').forEach(button=>{
      if(button.dataset.cleanToneBound==='1')return;
      button.dataset.cleanToneBound='1';
      button.addEventListener('click',()=>setTimeout(()=>syncCaseDetail(section,id),0));
    });

    const takeaway=section.querySelector('.case-takeaway');
    if(takeaway&&takeaway.dataset.cleanToneObserved!=='1'){
      takeaway.dataset.cleanToneObserved='1';
      const observer=new MutationObserver(()=>queueMicrotask(()=>syncCaseDetail(section,id)));
      observer.observe(takeaway,{childList:true,subtree:true,characterData:true});
    }
    syncCaseDetail(section,id);
  }

  function apply(){
    cleanResearch();
    caseIds.forEach(id=>{
      const section=document.getElementById(id);
      if(section)cleanCase(section,id);
    });
  }

  apply();
  [120,420,900,1600,2600,4200].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,160));
})();
