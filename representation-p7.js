(function installRepresentationP7Fixes(){
  const rep=document.getElementById('represent');
  const tabs=rep?.querySelector('.rep-tabs');
  const stage=document.getElementById('rep-stage');
  if(!tabs||!stage)return;

  const style=document.createElement('style');
  style.textContent=`
    #represent .descriptor-grid{grid-template-columns:repeat(4,minmax(105px,1fr));gap:10px;width:min(760px,100%)}
    #represent .descriptor-chip{display:grid;grid-template-columns:34px 1fr;grid-template-rows:auto auto;column-gap:9px;align-items:center;text-align:left;padding:12px 11px}
    #represent .descriptor-symbol{grid-row:1/3;display:grid;place-items:center;width:32px;height:32px;border:1.5px solid var(--ink);border-radius:50%;background:var(--paper);font-size:13px;font-weight:950;line-height:1}
    #represent .descriptor-chip small{font-size:8px;letter-spacing:.08em}.descriptor-chip strong{font-size:17px}
    #represent .rep-3d{width:min(620px,100%);height:270px;display:grid;place-items:center;perspective:800px}
    #represent .rep-3d-core{position:relative;width:430px;height:235px;transform-style:preserve-3d;animation:rep3dFloat 5.5s ease-in-out infinite}
    @keyframes rep3dFloat{0%,100%{transform:rotateX(8deg) rotateY(-7deg) translateY(0)}50%{transform:rotateX(13deg) rotateY(8deg) translateY(-5px)}}
    #represent .rep-atom{position:absolute;display:grid;place-items:center;border:2px solid var(--ink);border-radius:50%;font-weight:950;box-shadow:inset -6px -8px 12px rgba(38,51,47,.16),4px 5px 0 rgba(38,51,47,.12);z-index:3}
    #represent .rep-atom.c{width:58px;height:58px;background:var(--blue);font-size:15px}
    #represent .rep-atom.o{width:62px;height:62px;background:var(--coral);font-size:15px}
    #represent .rep-atom.h{width:34px;height:34px;background:var(--paper);font-size:10px}
    #represent .rep-bond{position:absolute;height:7px;background:var(--ink);border-radius:999px;transform-origin:left center;z-index:1;box-shadow:0 2px 0 rgba(255,255,255,.35)}
    #represent .rep-3d-caption{position:absolute;left:50%;bottom:0;transform:translateX(-50%);font-size:9px;font-weight:850;color:var(--muted);letter-spacing:.04em;white-space:nowrap}
    @media(max-width:760px){#represent .descriptor-grid{grid-template-columns:1fr 1fr}#represent .rep-3d-core{transform:scale(.8);animation:none}#represent .rep-3d{height:240px}}
  `;
  document.head.appendChild(style);

  const descriptor=tabs.querySelector('[data-rep="descriptor"]');
  const three=tabs.querySelector('[data-rep="three-d"]');
  if(!descriptor||!three)return;

  function activate(btn,html){
    tabs.querySelectorAll('.rep-tab').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    stage.innerHTML=html;
    stage.animate?.([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:230});
  }

  descriptor.addEventListener('click',e=>{
    e.stopImmediatePropagation();
    activate(descriptor,`<div class="descriptor-grid">
      <div class="descriptor-chip"><span class="descriptor-symbol">Σm</span><small>MW</small><strong>46.1</strong></div>
      <div class="descriptor-chip"><span class="descriptor-symbol">⇄</span><small>logP</small><strong>−0.3</strong></div>
      <div class="descriptor-chip"><span class="descriptor-symbol">H···</span><small>HBD</small><strong>1</strong></div>
      <div class="descriptor-chip"><span class="descriptor-symbol">◎</span><small>TPSA</small><strong>20.2</strong></div>
    </div>`);
  },true);

  three.addEventListener('click',e=>{
    e.stopImmediatePropagation();
    activate(three,`<div class="rep-3d"><div class="rep-3d-core" aria-label="Ethanol ball-and-stick schematic with explicit hydrogens">
      <i class="rep-bond" style="left:132px;top:111px;width:118px;transform:rotate(-5deg)"></i>
      <i class="rep-bond" style="left:248px;top:101px;width:96px;transform:rotate(-18deg)"></i>
      <i class="rep-bond" style="left:105px;top:106px;width:82px;transform:rotate(160deg)"></i>
      <i class="rep-bond" style="left:109px;top:118px;width:74px;transform:rotate(118deg)"></i>
      <i class="rep-bond" style="left:113px;top:104px;width:70px;transform:rotate(232deg)"></i>
      <i class="rep-bond" style="left:244px;top:104px;width:72px;transform:rotate(63deg)"></i>
      <i class="rep-bond" style="left:242px;top:111px;width:73px;transform:rotate(300deg)"></i>
      <i class="rep-bond" style="left:351px;top:77px;width:62px;transform:rotate(325deg)"></i>
      <span class="rep-atom c" style="left:92px;top:84px">C</span>
      <span class="rep-atom c" style="left:220px;top:80px">C</span>
      <span class="rep-atom o" style="left:329px;top:48px">O</span>
      <span class="rep-atom h" style="left:28px;top:72px">H</span>
      <span class="rep-atom h" style="left:65px;top:160px">H</span>
      <span class="rep-atom h" style="left:56px;top:25px">H</span>
      <span class="rep-atom h" style="left:268px;top:151px">H</span>
      <span class="rep-atom h" style="left:278px;top:35px">H</span>
      <span class="rep-atom h" style="left:391px;top:28px">H</span>
      <div class="rep-3d-caption">Ethanol · C₂H₆O · explicit H · ball-and-stick teaching schematic</div>
    </div></div>`);
  },true);
})();
