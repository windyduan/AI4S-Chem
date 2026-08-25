(function installP4Molecule501Fix(){
  const section=document.getElementById('molecule-501');
  if(!section)return;
  const bi=(zh,en)=>`<span class="story-zh">${zh}</span><span class="story-en">${en}</span>`;

  const title=section.querySelector('.story-copy h2');
  const lead=section.querySelector('.story-copy .lead');
  if(title)title.innerHTML=bi(
    '500 个已测分子的结构和溶解度，能不能帮我们预测第 501 个分子的水溶解度？',
    'Can 500 molecules with measured solubility help us predict the aqueous solubility of molecule #501?'
  );
  if(lead)lead.innerHTML=bi(
    '这里把任务说具体：前 500 个分子都有结构和实验测得的水溶解度 logS。模型学习“分子结构 → logS”的关系，再对一个从未见过的第 501 个分子预测 logS。',
    'Here the task is explicit: the first 500 molecules have structures and experimentally measured aqueous-solubility values (logS). The model learns structure → logS, then predicts logS for an unseen molecule #501.'
  );

  const cloud=section.querySelector('.m501-cloud');
  if(cloud){
    const dot=(i)=>`<i class="m501-dot" style="--d:${(i%10)*18+Math.floor(i/10)*30}ms"></i>`;
    const before=Array.from({length:24},(_,i)=>dot(i)).join('');
    const after=Array.from({length:24},(_,i)=>dot(i+24)).join('');
    cloud.innerHTML=`${before}<div class="m501-ellipsis" aria-label="middle samples omitted">…</div>${after}<div class="m501-label">${bi('共 500 个已测分子 · 每个都有结构 + 实验 logS · 中间用 … 省略部分样本','500 measured molecules · each has structure + experimental logS · … omits intermediate samples')}</div><div class="m501-target">#501</div>`;
  }

  const nodes=[...section.querySelectorAll('.m501-machine .story-flow-node')];
  if(nodes[0]){
    const p=nodes[0].querySelector('p');
    if(p)p.innerHTML=bi('第 501 个分子的结构表示','representation of molecule #501');
  }
  if(nodes[2]){
    const p=nodes[2].querySelector('p');
    if(p)p.innerHTML=bi('预测水溶解度 logS','predicted aqueous solubility logS');
  }

  const output=section.querySelector('.m501-output');
  if(output)output.innerHTML=bi(
    '目标：预测第 501 个分子的水溶解度 logS。点击运行，看它经过“表示 → 模型 → logS”这条链。',
    'Goal: predict aqueous-solubility logS for molecule #501. Run it through representation → model → logS.'
  );

  const button=section.querySelector('.m501-run');
  if(button)button.innerHTML=bi('预测 #501 的 logS →','Predict #501 logS →');

  const style=document.createElement('style');
  style.textContent=`
    #molecule-501 .m501-cloud{grid-template-columns:repeat(10,1fr);align-items:center}
    #molecule-501 .m501-ellipsis{grid-column:5 / span 2;display:grid;place-items:center;min-height:24px;font-family:Georgia,serif;font-size:25px;font-weight:900;line-height:1;color:var(--muted);letter-spacing:.12em}
    #molecule-501 .m501-label{font-size:9.5px;line-height:1.35;letter-spacing:.035em}
    #molecule-501 .m501-output{line-height:1.45}
    @media(max-width:760px){#molecule-501 .m501-ellipsis{font-size:20px}#molecule-501 .m501-label{font-size:8.5px}}
  `;
  document.head.appendChild(style);
})();
