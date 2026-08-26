(function installP40ReviewFix(){
  const zh=()=>document.documentElement.lang!=='en';
  const section=document.getElementById('generalization-review');
  if(!section)return;

  const copy={
    zh:{
      no:'02L / REVIEW',
      title:'先养成三个问题，比记住十种指标更有价值',
      cards:[
        ['01 · 数据划分','测试集代表怎样的未来数据','随机划分、骨架 / 系列划分、时间划分和外部测试回答的是不同问题。先让划分方式和真实使用场景一致。'],
        ['02 · 误差与指标','模型错多少，又是怎么错的','结合 MAE、RMSE、R² 和误差分布判断表现，也要留意少数严重失败样本。'],
        ['03 · 适用范围','当前候选是否超出已有数据覆盖','整体指标不错并不保证每个候选都可靠。越接近外推区域，越需要额外计算、实验或新数据验证。']
      ],
      rule:'先确认数据划分和评估方式，再解读指标'
    },
    en:{
      no:'02L / REVIEW',
      title:'Three good questions matter more than memorizing ten metrics',
      cards:[
        ['01 · DATA SPLIT','What future data does the test set represent?','Random, scaffold / series, time, and external tests answer different questions. Match the split to the intended use.'],
        ['02 · ERROR & METRICS','How much does the model miss, and how?','Read MAE, RMSE, R² and the error distribution together, including severe failure cases.'],
        ['03 · APPLICABILITY','Is the candidate outside covered data?','Good aggregate metrics do not guarantee every candidate. Stronger extrapolation needs additional computation, experiments, or new data.']
      ],
      rule:'Confirm the split and evaluation protocol before interpreting the metrics'
    }
  };

  function apply(){
    const c=zh()?copy.zh:copy.en;
    const number=section.querySelector('.section-no');
    if(number)number.textContent=c.no;

    section.querySelector('.story-kicker')?.remove();
    section.querySelector('.story-copy .lead')?.remove();

    const title=section.querySelector('.story-copy h2');
    if(title)title.textContent=c.title;

    const cards=[...section.querySelectorAll('.gen-review-card')];
    cards.forEach((card,i)=>{
      const d=c.cards[i];if(!d)return;
      const small=card.querySelector('small'),strong=card.querySelector('strong'),p=card.querySelector('p');
      if(small)small.textContent=d[0];
      if(strong)strong.textContent=d[1];
      if(p)p.textContent=d[2];
    });
    const rule=section.querySelector('.gen-review-rule');
    if(rule)rule.textContent=c.rule;
  }

  if(!document.getElementById('p40-review-style')){
    const style=document.createElement('style');
    style.id='p40-review-style';
    style.textContent=`
      #generalization-review .story-copy{width:100%;max-width:none}
      #generalization-review .story-copy h2{max-width:none;font-size:clamp(34px,3.8vw,50px);line-height:1.08;letter-spacing:-.035em;white-space:nowrap}
      #generalization-review .gen-review-grid{gap:18px;margin-top:clamp(28px,4.5dvh,44px)}
      #generalization-review .gen-review-card{min-height:220px;padding:22px 21px;display:flex;flex-direction:column;justify-content:center}
      #generalization-review .gen-review-card small{font-size:clamp(11px,.9vw,13px);line-height:1.25;color:#35413d;font-weight:950;letter-spacing:.07em}
      #generalization-review .gen-review-card strong{font-size:clamp(20px,1.9vw,25px);line-height:1.28;margin-top:9px;color:var(--ink)}
      #generalization-review .gen-review-card p{font-size:clamp(14px,1.22vw,16px);line-height:1.58;color:#35413d;font-weight:650;margin-top:11px}
      #generalization-review .gen-review-rule{margin-top:22px;font-size:clamp(15px,1.35vw,18px);font-weight:750;color:#5c463d}
      @media(max-height:760px) and (min-width:821px){
        #generalization-review .story-copy h2{font-size:clamp(31px,3.5vw,44px)}
        #generalization-review .gen-review-grid{margin-top:22px}
        #generalization-review .gen-review-card{min-height:180px;padding:18px}
        #generalization-review .gen-review-card p{font-size:13px}
      }
      @media(max-width:820px){
        #generalization-review .story-copy h2{white-space:normal;font-size:clamp(28px,7vw,38px)}
        #generalization-review .gen-review-card{min-height:0}
      }
    `;
    document.head.appendChild(style);
  }

  apply();
  document.getElementById('lang-toggle')?.addEventListener('click',()=>setTimeout(apply,100));
})();
