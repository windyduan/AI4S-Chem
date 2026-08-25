(function installP10CO2SymmetryExample(){
  const section=document.getElementById('symmetry-story');
  const molecule=section?.querySelector('.sym-molecule');
  const stage=section?.querySelector('.sym-stage');
  if(!section||!molecule||!stage)return;

  // P10: use one chemically complete, simple molecule for the rotation demo.
  // Keep the existing .sym-molecule element so the original slider listener still rotates it.
  molecule.innerHTML=`
    <line class="sym-bond" x1="155" y1="153" x2="250" y2="153"/>
    <line class="sym-bond" x1="155" y1="167" x2="250" y2="167"/>
    <line class="sym-bond" x1="250" y1="153" x2="345" y2="153"/>
    <line class="sym-bond" x1="250" y1="167" x2="345" y2="167"/>

    <circle class="sym-atom" cx="155" cy="160" r="31" fill="#f4bea8"/>
    <circle class="sym-atom" cx="250" cy="160" r="31" fill="#b9dadf"/>
    <circle class="sym-atom" cx="345" cy="160" r="31" fill="#f4bea8"/>

    <circle cx="145" cy="149" r="7" fill="rgba(255,255,255,.46)" stroke="none"/>
    <circle cx="240" cy="149" r="7" fill="rgba(255,255,255,.46)" stroke="none"/>
    <circle cx="335" cy="149" r="7" fill="rgba(255,255,255,.46)" stroke="none"/>

    <text x="155" y="166" text-anchor="middle">O</text>
    <text x="250" y="166" text-anchor="middle">C</text>
    <text x="345" y="166" text-anchor="middle">O</text>

    <line class="sym-force" x1="345" y1="160" x2="421" y2="110"/>
  `;

  let label=stage.querySelector('.p10-molecule-label');
  if(!label){
    label=document.createElement('div');
    label.className='p10-molecule-label';
    label.textContent='CO₂ · O=C=O';
    stage.appendChild(label);
  }

  const style=document.createElement('style');
  style.textContent=`
    #symmetry-story .sym-stage{position:relative;overflow:hidden}
    #symmetry-story .sym-molecule{transform-origin:250px 160px}
    #symmetry-story .p10-molecule-label{position:absolute;left:16px;bottom:13px;padding:5px 9px;border:1.5px solid rgba(38,51,47,.46);border-radius:999px;background:rgba(255,250,240,.88);font-size:9px;font-weight:900;letter-spacing:.05em;color:var(--muted);pointer-events:none}
  `;
  document.head.appendChild(style);
})();
