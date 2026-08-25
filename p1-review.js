(function installP1Review(){
  const zh=()=>document.documentElement.lang!=='en';

  function apply(){
    const home=document.getElementById('home');
    if(!home)return;

    const title=home.querySelector('h1');
    if(title){
      title.innerHTML=zh()
        ? '<span class="p1-title-line">人工智能技术入门</span><span class="hero-title-b"><span class="p1-title-line">先认识 AI</span><span class="p1-title-line">再拆开模型训练</span></span>'
        : '<span class="p1-title-line">Introduction to AI</span><span class="hero-title-b"><span class="p1-title-line">Understand AI first</span><span class="p1-title-line">then open model training</span></span>';
    }

    home.querySelector('.hero-copy>.lead')?.remove();

    const start=home.querySelector('.hero-copy .primary');
    if(start){
      start.setAttribute('href','#course-1-divider');
      start.textContent=zh()?'开始课程 →':'Start course →';
    }
  }

  apply();
  [180,720,1500,2750].forEach(ms=>setTimeout(apply,ms));
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,80));
})();
