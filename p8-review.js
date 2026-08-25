(function installP8Review(){
  const section=document.getElementById('rep-vs-model');
  if(!section)return;
  const bi=(zh,en)=>`<span class="story-zh">${zh}</span><span class="story-en">${en}</span>`;

  const title=section.querySelector('.story-copy h2');
  if(title)title.innerHTML=bi(
    '“分子怎么表示”和“用什么模型”是两次不同选择',
    'How we represent a molecule and which model we train are two different choices'
  );

  // The gray lead repeats the card content; keep the page focused on the comparison itself.
  section.querySelector('.story-copy .lead')?.remove();

  const cards=section.querySelectorAll('.repmodel-card');
  const modelText=cards[1]?.querySelector('p');
  if(modelText)modelText.innerHTML=bi(
    '模型越复杂，通常自由度越高；数据有限时更容易把噪声也学进去。训练集分数更高，不代表对新分子预测更准，最后还是要看独立验证或测试结果。',
    'More complex models usually have more flexibility. With limited data they can fit noise more easily. A better training score does not guarantee better predictions on new molecules; independent validation or test performance is what matters.'
  );
})();
