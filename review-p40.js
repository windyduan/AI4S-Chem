(function installP40ReviewFix(){
  const section=document.getElementById('generalization-review');
  if(!section)return;

  const number=section.querySelector('.section-no');
  if(number)number.textContent='08 / CHECKPOINT';

  const title=section.querySelector('.story-copy h2');
  if(title){
    title.innerHTML=`
      <span class="story-zh"><span class="p40-title-line">看到一个 AI × Chemistry benchmark</span><span class="p40-title-line">先别急着看谁第一</span></span>
      <span class="story-en"><span class="p40-title-line">When you see an AI × Chemistry benchmark</span><span class="p40-title-line">do not start with the leaderboard</span></span>
    `;
  }

  const cards=[...section.querySelectorAll('.gen-review-card')];
  const copy=[
    ['Random、scaffold、time、external','回答的不是同一个问题','Random, scaffold, time, and external tests','answer different questions.'],
    ['看单位、MAE / RMSE / R²','也看严重失败样本和误差分布','Inspect units, MAE / RMSE / R²,','then severe failures and the error distribution.'],
    ['相似度只是线索','真正重要的是模型是否在相关分布变化下被验证','Similarity is only a clue;','validation under relevant distribution shifts matters more.']
  ];
  cards.forEach((card,i)=>{
    const p=card.querySelector('p');
    const c=copy[i];
    if(!p||!c)return;
    p.innerHTML=`<span class="story-zh">${c[0]}<br>${c[1]}</span><span class="story-en">${c[2]}<br>${c[3]}</span>`;
  });

  const style=document.createElement('style');
  style.textContent=`
    #generalization-review .story-copy{width:100%;max-width:none}
    #generalization-review .story-copy h2{max-width:none;font-size:clamp(31px,4vw,54px);line-height:1.04;letter-spacing:-.04em}
    #generalization-review .p40-title-line{display:block;white-space:nowrap}
    #generalization-review .gen-review-card p{line-height:1.55}
    @media(max-width:760px){
      #generalization-review .story-copy h2{font-size:clamp(27px,7vw,38px)}
      #generalization-review .p40-title-line{white-space:normal}
    }
  `;
  document.head.appendChild(style);
})();
