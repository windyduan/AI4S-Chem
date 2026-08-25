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
    #represent .rep-3d{width:min(700px,100%);height:300px;display:grid;place-items:center;overflow:hidden}
    #represent .rep-3d svg{display:block;width:min(620px,94%);height:auto;max-height:255px;overflow:visible;animation:rep3dFloat 5.5s ease-in-out infinite;transform-origin:center}
    @keyframes rep3dFloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-4px) rotate(1deg)}}
    #represent .rep-3d .bond{stroke:var(--ink);stroke-width:10;stroke-linecap:round}
    #represent .rep-3d .atom{stroke:var(--ink);stroke-width:3}
    #represent .rep-3d .atom-c{fill:var(--blue)}#represent .rep-3d .atom-o{fill:var(--coral)}#represent .rep-3d .atom-h{fill:var(--paper)}
    #represent .rep-3d text{fill:var(--ink);font-family:Inter,"Noto Sans SC",sans-serif;font-weight:950;text-anchor:middle;dominant-baseline:middle}
    #represent .rep-3d-caption{margin-top:-14px;font-size:9px;font-weight:850;color:var(--muted);letter-spacing:.04em;text-align:center}
    @media(max-width:760px){#represent .descriptor-grid{grid-template-columns:1fr 1fr}#represent .rep-3d{height:250px}#represent .rep-3d svg{animation:none;width:100%}}
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

  intercept(three,`<div><div class="rep-3d"><svg viewBox="0 0 700 300" role="img" aria-label="Ethanol ball-and-stick model with all atoms and hydrogens shown">
    <g>
      <line class="bond" x1="250" y1="160" x2="405" y2="145"/><line class="bond" x1="405" y1="145" x2="540" y2="105"/>
      <line class="bond" x1="250" y1="160" x2="145" y2="85"/><line class="bond" x1="250" y1="160" x2="135" y2="175"/><line class="bond" x1="250" y1="160" x2="185" y2="255"/>
      <line class="bond" x1="405" y1="145" x2="425" y2="55"/><line class="bond" x1="405" y1="145" x2="455" y2="235"/>
      <line class="bond" x1="540" y1="105" x2="625" y2="65"/>
    </g>
    <g><circle class="atom atom-c" cx="250" cy="160" r="38"/><text x="250" y="160" font-size="20">C</text><circle class="atom atom-c" cx="405" cy="145" r="38"/><text x="405" y="145" font-size="20">C</text><circle class="atom atom-o" cx="540" cy="105" r="41"/><text x="540" y="105" font-size="20">O</text></g>
    <g><circle class="atom atom-h" cx="145" cy="85" r="23"/><text x="145" y="85" font-size="13">H</text><circle class="atom atom-h" cx="135" cy="175" r="23"/><text x="135" y="175" font-size="13">H</text><circle class="atom atom-h" cx="185" cy="255" r="23"/><text x="185" y="255" font-size="13">H</text><circle class="atom atom-h" cx="425" cy="55" r="23"/><text x="425" y="55" font-size="13">H</text><circle class="atom atom-h" cx="455" cy="235" r="23"/><text x="455" y="235" font-size="13">H</text><circle class="atom atom-h" cx="625" cy="65" r="23"/><text x="625" y="65" font-size="13">H</text></g>
  </svg></div><div class="rep-3d-caption">Ethanol · C₂H₆O · explicit H · ball-and-stick teaching schematic</div></div>`);
})();
