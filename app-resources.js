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
    </article>`).join('');
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
