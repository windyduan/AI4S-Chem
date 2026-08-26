(function cleanCourseMetaPrompts(){
  const prefixes=[
    /^科学问题\s*[：:]\s*/,
    /^关键思路\s*[：:]\s*/,
    /^方法重点\s*[：:]\s*/,
    /^最终能力\s*[：:]\s*/,
    /^Scientific question\s*:\s*/i,
    /^Key idea\s*:\s*/i,
    /^Method focus\s*:\s*/i,
    /^Resulting capability\s*:\s*/i
  ];
  function clean(){
    document.querySelectorAll('.case-section .case-takeaway').forEach(el=>{
      let text=el.textContent.trim();
      prefixes.forEach(re=>{text=text.replace(re,'')});
      if(el.textContent.trim()!==text)el.textContent=text;
    });
  }
  document.addEventListener('click',e=>{
    if(e.target.closest('.case-step-button'))setTimeout(clean,0);
  });
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(clean,140));
  clean();
  [220,620,1200,2400,3800,5400].forEach(ms=>setTimeout(clean,ms));
})();
