(function installP3Review(){
  function apply(){
    const section=document.getElementById('course-lens');
    if(!section)return;

    const title=section.querySelector('.story-copy h2');
    const lead=section.querySelector('.story-copy .lead');
    const cards=section.querySelectorAll('.course-lens-card');

    if(title){
      title.innerHTML='<span class="story-zh">这门课不是教你“变成 AI 工程师”</span><span class="story-en">This course is not trying to turn you into an AI engineer</span>';
    }
    if(lead){
      lead.innerHTML='<span class="story-zh">对于我们新生来说，最重要的是要先学会三件事</span><span class="story-en">For us as newcomers, the most important thing is to learn three things first</span>';
    }
    if(cards[1]){
      const p=cards[1].querySelector('p');
      if(p){
        p.innerHTML='<span class="story-zh">训练分数漂亮不等于模型能预测未来分子，数据划分、泄漏和评价方式决定了数字代表什么。</span><span class="story-en">A beautiful training score does not mean future molecules will be predicted well; splits, leakage, and evaluation determine what the number means.</span>';
      }
    }
  }

  apply();
  [180,720,1480,2700].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,80));
})();
