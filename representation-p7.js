(function installRepresentationP7Fixes(){
  const rep=document.getElementById('represent');
  const tabs=rep?.querySelector('.rep-tabs');
  const stage=document.getElementById('rep-stage');
  if(!tabs||!stage)return;

  const style=document.createElement('style');
  style.textContent=`
    #represent .rep-example-label{margin-top:12px;font-size:10px;font-weight:850;letter-spacing:.05em;color:var(--muted);text-align:center}
    #represent .rep-explicit-smiles{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:clamp(16px,2.2vw,28px);line-height:1.55;word-break:break-all;max-width:860px}
    #represent .rep-explicit-smiles small{display:block;margin-bottom:8px;font-family:Inter,"Noto Sans SC",sans-serif;font-size:10px;color:var(--muted);letter-spacing:.08em}
    #represent .ethanol-graph{width:min(760px,100%);height:auto;display:block;margin:auto;overflow:visible}
    #represent .ethanol-graph line{stroke:var(--ink);stroke-width:4;stroke-linecap:round}
    #represent .ethanol-graph circle{stroke:var(--ink);stroke-width:2.5}
    #represent .ethanol-graph text{fill:var(--ink);font-family:Inter,"Noto Sans SC",sans-serif;font-weight:950;text-anchor:middle;dominant-baseline:middle}
    #represent .ethanol-graph .atom-c{fill:var(--blue)}#represent .ethanol-graph .atom-o{fill:var(--coral)}#represent .ethanol-graph .atom-h{fill:var(--paper)}
    #represent .descriptor-grid{grid-template-columns:repeat(4,minmax(105px,1fr));gap:10px;width:min(760px,100%)}
    #represent .descriptor-chip{display:grid;grid-template-columns:34px 1fr;grid-template-rows:auto auto;column-gap:9px;align-items:center;text-align:left;padding:12px 11px}
    #represent .descriptor-symbol{grid-row:1/3;display:grid;place-items:center;width:32px;height:32px;border:1.5px solid var(--ink);border-radius:50%;background:var(--paper);font-size:13px;font-weight:950;line-height:1}
    #represent .descriptor-chip small{font-size:8px;letter-spacing:.08em}#represent .descriptor-chip strong{font-size:17px}

    /* P7 3D must override the generic .rep-stage min-height/padding, otherwise the parent keeps growing. */
    #represent #rep-stage.p7-three-active{min-height:0;height:220px;padding:4px 10px;place-items:start center;overflow:hidden}
    #represent .representation-card.p7-three-card{overflow:hidden}
    #represent .rep-3d-wrap{position:relative;width:min(660px,100%);height:208px;margin:0 auto;display:grid;place-items:start center;overflow:hidden}
    #represent .rep-3d{width:100%;height:194px;display:grid;place-items:start center;overflow:hidden;padding-top:0;box-sizing:border-box}
    #represent .rep-3d svg{display:block;width:min(530px,86%);height:auto;max-height:176px;overflow:hidden;animation:rep3dFloat 6.5s ease-in-out infinite;transform-origin:center}
    @keyframes rep3dFloat{0%,100%{transform:translateY(-8px)}50%{transform:translateY(-10px)}}
    #represent .rep-3d .bond{stroke:var(--ink);stroke-width:10;stroke-linecap:round;opacity:.88}
    #represent .rep-3d .atom{stroke:var(--ink);stroke-width:3;filter:drop-shadow(3px 4px 2px rgba(38,51,47,.16))}
    #represent .rep-3d .atom-c{fill:url(#p7CarbonGloss)}#represent .rep-3d .atom-o{fill:url(#p7OxygenGloss)}#represent .rep-3d .atom-h{fill:url(#p7HydrogenGloss)}
    #represent .rep-3d .atom-shine{fill:rgba(255,255,255,.46);stroke:none;pointer-events:none}
    #represent .rep-3d text{fill:var(--ink);font-family:Inter,"Noto Sans SC",sans-serif;font-weight:950;text-anchor:middle;dominant-baseline:middle}
    #represent .rep-3d-caption{position:absolute;left:50%;bottom:7px;transform:translateX(-50%);width:min(400px,76%);margin:0;padding:3px 8px;box-sizing:border-box;border-radius:999px;background:rgba(255,250,240,.9);font-size:8px;line-height:1.2;font-weight:850;color:var(--muted);letter-spacing:.01em;text-align:center;white-space:normal;overflow-wrap:anywhere;z-index:4}
    @media(max-width:760px){#represent .descriptor-grid{grid-template-columns:1fr 1fr}#represent #rep-stage.p7-three-active{height:196px;padding:2px 6px}#represent .rep-3d-wrap{height:186px}#represent .rep-3d{height:174px}#represent .rep-3d svg{animation:none;width:88%;max-height:154px}#represent .rep-3d-caption{bottom:5px;width:80%;font-size:7.5px}}
  `;
  document.head.appendChild(style);

  const descriptor=tabs.querySelector('[data-rep="descriptor"]');
  const three=tabs.querySelector('[data-rep="three-d"]');
  if(!descriptor||!three)return;

  const molecule=tabs.querySelector('[data-rep="molecule"]');
  const smiles=tabs.querySelector('[data-rep="smiles"]');
  const fingerprint=tabs.querySelector('[data-rep="fingerprint"]');
  const graph=tabs.querySelector('[data-rep="graph"]');

  function activate(btn,html){
    tabs.querySelectorAll('.rep-tab').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const isThree=btn===three;
    stage.classList.toggle('p7-three-active',isThree);
    stage.closest('.representation-card')?.classList.toggle('p7-three-card',isThree);
    stage.innerHTML=html;
    stage.animate?.([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:230});
  }

  function intercept(btn,html){
    btn?.addEventListener('click',e=>{e.stopImmediatePropagation();activate(btn,html)},true);
  }

  const ethanolGraph=`<div><svg class="ethanol-graph" viewBox="0 0 760 330" role="img" aria-label="Ethanol molecular graph with all hydrogens shown">
    <g>
      <line x1="260" y1="165" x2="410" y2="165"/><line x1="410" y1="165" x2="545" y2="125"/>
      <line x1="260" y1="165" x2="155" y2="95"/><line x1="260" y1="165" x2="155" y2="165"/><line x1="260" y1="165" x2="155" y2="235"/>
      <line x1="410" y1="165" x2="420" y2="65"/><line x1="410" y1="165" x2="430" y2="265"/>
      <line x1="545" y1="125" x2="650" y2="85"/>
    </g>
    <g><circle class="atom-c" cx="260" cy="165" r="34"/><text x="260" y="165" font-size="20">C</text><circle class="atom-c" cx="410" cy="165" r="34"/><text x="410" y="165" font-size="20">C</text><circle class="atom-o" cx="545" cy="125" r="36"/><text x="545" y="125" font-size="20">O</text></g>
    <g><circle class="atom-h" cx="155" cy="95" r="22"/><text x="155" y="95" font-size="14">H</text><circle class="atom-h" cx="155" cy="165" r="22"/><text x="155" y="165" font-size="14">H</text><circle class="atom-h" cx="155" cy="235" r="22"/><text x="155" y="235" font-size="14">H</text><circle class="atom-h" cx="420" cy="65" r="22"/><text x="420" y="65" font-size="14">H</text><circle class="atom-h" cx="430" cy="265" r="22"/><text x="430" y="265" font-size="14">H</text><circle class="atom-h" cx="650" cy="85" r="22"/><text x="650" y="85" font-size="14">H</text></g>
  </svg><div class="rep-example-label">Ethanol · C₂H₆O · all atoms shown</div></div>`;

  intercept(molecule,`<div><div class="molecule-sketch">CH<sub>3</sub>—CH<sub>2</sub>—OH</div><div class="rep-example-label">Ethanol · C₂H₆O · condensed structural formula keeps all H counts explicit</div></div>`);
  intercept(smiles,`<div class="rep-explicit-smiles"><small>ETHANOL · explicit-hydrogen SMILES</small>[H]C([H])([H])C([H])([H])O[H]<div class="rep-example-label">Common shorthand: CCO</div></div>`);
  intercept(fingerprint,`<div><div class="fingerprint">00100101000110101010010001100101</div><div class="rep-example-label">Ethanol fingerprint · teaching schematic of a fixed-length bit vector</div></div>`);
  intercept(graph,ethanolGraph);

  intercept(descriptor,`<div><div class="descriptor-grid">
    <div class="descriptor-chip"><span class="descriptor-symbol">Σm</span><small>MW</small><strong>46.07</strong></div>
    <div class="descriptor-chip"><span class="descriptor-symbol">⇄</span><small>logP</small><strong>−0.31</strong></div>
    <div class="descriptor-chip"><span class="descriptor-symbol">H···</span><small>HBD</small><strong>1</strong></div>
    <div class="descriptor-chip"><span class="descriptor-symbol">◎</span><small>TPSA</small><strong>20.23</strong></div>
  </div><div class="rep-example-label">Ethanol · the same molecule summarized as numerical descriptors</div></div>`);

  intercept(three,`<div class="rep-3d-wrap"><div class="rep-3d"><svg viewBox="0 0 700 300" role="img" aria-label="Ethanol ball-and-stick model with all atoms and hydrogens shown">
    <defs>
      <radialGradient id="p7CarbonGloss" cx="30%" cy="24%" r="78%"><stop offset="0" stop-color="#ffffff"/><stop offset=".24" stop-color="#d7edf0"/><stop offset="1" stop-color="#91bbc4"/></radialGradient>
      <radialGradient id="p7OxygenGloss" cx="30%" cy="24%" r="78%"><stop offset="0" stop-color="#fff8f4"/><stop offset=".24" stop-color="#f3c0aa"/><stop offset="1" stop-color="#d98969"/></radialGradient>
      <radialGradient id="p7HydrogenGloss" cx="30%" cy="24%" r="78%"><stop offset="0" stop-color="#ffffff"/><stop offset=".28" stop-color="#fffaf0"/><stop offset="1" stop-color="#ddd6c6"/></radialGradient>
    </defs>
    <g>
      <line class="bond" x1="250" y1="160" x2="405" y2="145"/><line class="bond" x1="405" y1="145" x2="540" y2="105"/>
      <line class="bond" x1="250" y1="160" x2="145" y2="85"/><line class="bond" x1="250" y1="160" x2="135" y2="175"/><line class="bond" x1="250" y1="160" x2="185" y2="255"/>
      <line class="bond" x1="405" y1="145" x2="425" y2="55"/><line class="bond" x1="405" y1="145" x2="455" y2="235"/>
      <line class="bond" x1="540" y1="105" x2="625" y2="65"/>
    </g>
    <g><circle class="atom atom-c" cx="250" cy="160" r="38"/><circle class="atom-shine" cx="238" cy="147" r="9"/><text x="250" y="160" font-size="20">C</text><circle class="atom atom-c" cx="405" cy="145" r="38"/><circle class="atom-shine" cx="393" cy="132" r="9"/><text x="405" y="145" font-size="20">C</text><circle class="atom atom-o" cx="540" cy="105" r="41"/><circle class="atom-shine" cx="527" cy="91" r="10"/><text x="540" y="105" font-size="20">O</text></g>
    <g><circle class="atom atom-h" cx="145" cy="85" r="23"/><circle class="atom-shine" cx="138" cy="78" r="5"/><text x="145" y="85" font-size="13">H</text><circle class="atom atom-h" cx="135" cy="175" r="23"/><circle class="atom-shine" cx="128" cy="168" r="5"/><text x="135" y="175" font-size="13">H</text><circle class="atom atom-h" cx="185" cy="255" r="23"/><circle class="atom-shine" cx="178" cy="248" r="5"/><text x="185" y="255" font-size="13">H</text><circle class="atom atom-h" cx="425" cy="55" r="23"/><circle class="atom-shine" cx="418" cy="48" r="5"/><text x="425" y="55" font-size="13">H</text><circle class="atom atom-h" cx="455" cy="235" r="23"/><circle class="atom-shine" cx="448" cy="228" r="5"/><text x="455" y="235" font-size="13">H</text><circle class="atom atom-h" cx="625" cy="65" r="23"/><circle class="atom-shine" cx="618" cy="58" r="5"/><text x="625" y="65" font-size="13">H</text></g>
  </svg></div><div class="rep-3d-caption">Ethanol · C₂H₆O · all H shown · ball-and-stick</div></div>`);
})();
