(function installP5P6GlossaryMerge(){
  const learn=document.getElementById('learn');
  const role=document.getElementById('role-map-screen');

  // P5: the five glossary pills duplicate the detailed role map on the next screen.
  learn?.querySelector('.glossary-row')?.remove();
  if(!role)return;

  const zh=()=>document.documentElement.lang!=='en';
  const repBtn=role.querySelector('[data-role="representation"]');
  const targetBtn=role.querySelector('[data-role="target"]');

  if(repBtn)repBtn.textContent='Feature / Representation x';
  if(targetBtn)targetBtn.textContent='Label / Target y';

  function enrichActiveTerm(){
    const active=role.querySelector('.role-chip.active')?.dataset.role;
    const title=role.querySelector('.role-copy strong');
    const copy=role.querySelector('.role-copy p');
    const symbol=role.querySelector('.role-symbol');
    if(!title||!copy||!symbol)return;

    if(active==='representation'){
      symbol.textContent='x';
      title.textContent=zh()?'Feature / Representation · 模型真正收到的输入':'Feature / Representation · what the model actually receives';
      copy.textContent=zh()
        ?'Feature 常指输入特征；这里用更宽泛的 Representation 表示模型实际收到的 x。它可以是 descriptor、fingerprint、SMILES、graph 或 3D geometry。'
        :'Feature usually refers to input features; here Representation is the broader term for the actual model input x, such as descriptors, fingerprints, SMILES, graphs, or 3D geometry.';
    }

    if(active==='target'){
      symbol.textContent='y';
      title.textContent=zh()?'Label / Target · 希望模型学会回答什么':'Label / Target · what we want the model to predict';
      copy.textContent=zh()
        ?'Label 是监督学习里常见的叫法；这里统一把模型要预测的真实量记作 Target y。在 logS 例子里，y 就是实验测得的溶解度。'
        :'Label is common terminology in supervised learning; here the quantity to predict is written as Target y. In the logS example, y is the experimentally measured solubility.';
    }
  }

  role.querySelectorAll('.role-chip').forEach(btn=>{
    btn.addEventListener('click',()=>requestAnimationFrame(enrichActiveTerm));
  });
  document.getElementById('lang-toggle')?.addEventListener('click',()=>requestAnimationFrame(enrichActiveTerm));
})();
