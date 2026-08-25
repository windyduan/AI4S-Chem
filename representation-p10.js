(function installP10SpatialRotation(){
  const section=document.getElementById('symmetry-story');
  if(!section)return;

  const title=section.querySelector('.story-copy h2');
  const lead=section.querySelector('.story-copy .lead');
  if(lead)lead.remove();

  const lab=section.querySelector('.sym-lab');
  if(!lab)return;

  lab.innerHTML=`
    <div class="sym-stage p10-3d-stage">
      <canvas class="p10-3d-canvas" aria-label="可拖拽旋转的二氧化碳三维球棍模型"></canvas>
      <div class="p10-3d-hint">拖动分子 · 空间三维旋转</div>
      <div class="p10-molecule-label">CO₂ · O=C=O</div>
    </div>
    <aside class="sym-panel p10-panel">
      <div class="p10-card p10-orientation">
        <small>3D ORIENTATION</small>
        <strong class="p10-angle">X 18° · Y −24°</strong>
        <span>拖动左侧模型改变观察方向</span>
      </div>
      <div class="p10-card energy">
        <small>ENERGY · INVARIANT</small>
        <strong>E 保持不变</strong>
        <span>整体旋转不改变标量能量</span>
      </div>
      <div class="p10-card force">
        <small>FORCE VECTOR · EQUIVARIANT</small>
        <strong>方向随体系一起旋转</strong>
        <span>向量性质应与分子保持一致的空间变换</span>
      </div>
    </aside>`;

  const style=document.createElement('style');
  style.textContent=`
    #symmetry-story .story-copy{max-width:1040px}
    #symmetry-story .story-copy h2{
      max-width:1040px;
      font-size:clamp(34px,3.65vw,50px);
      line-height:1.06;
    }
    #symmetry-story .sym-lab{
      grid-template-columns:minmax(0,1.5fr) minmax(290px,.62fr);
      gap:28px;
      margin-top:clamp(18px,3dvh,30px);
      align-items:stretch;
      min-height:clamp(390px,56dvh,515px);
    }
    #symmetry-story .p10-3d-stage{
      position:relative;
      min-height:390px;
      padding:0;
      overflow:hidden;
      cursor:grab;
      touch-action:none;
      background:
        radial-gradient(circle at 50% 42%,rgba(185,218,223,.22),transparent 34%),
        rgba(255,250,240,.82);
    }
    #symmetry-story .p10-3d-stage:active{cursor:grabbing}
    #symmetry-story .p10-3d-canvas{display:block;width:100%;height:100%;min-height:390px}
    #symmetry-story .p10-3d-hint{
      position:absolute;top:16px;left:50%;transform:translateX(-50%);
      padding:6px 10px;border:1px solid rgba(38,51,47,.24);border-radius:999px;
      background:rgba(255,250,240,.8);font-size:10px;font-weight:850;color:var(--muted);
      pointer-events:none;
    }
    #symmetry-story .p10-molecule-label{
      position:absolute;left:17px;bottom:15px;padding:6px 10px;border:1.5px solid rgba(38,51,47,.44);
      border-radius:999px;background:rgba(255,250,240,.9);font-size:10px;font-weight:900;
      letter-spacing:.05em;color:var(--muted);pointer-events:none;
    }
    #symmetry-story .p10-panel{
      display:grid;
      grid-template-rows:repeat(3,1fr);
      gap:18px;
      padding:20px;
      min-height:390px;
      align-content:stretch;
    }
    #symmetry-story .p10-card{
      min-height:0;
      padding:17px 16px;
      border:1.5px solid var(--ink);
      border-radius:15px;
      background:var(--paper);
      display:flex;
      flex-direction:column;
      justify-content:center;
      gap:7px;
    }
    #symmetry-story .p10-card.energy{background:var(--yellow)}
    #symmetry-story .p10-card.force{background:var(--coral)}
    #symmetry-story .p10-card small{font-size:9px;letter-spacing:.1em;color:var(--muted);font-weight:900}
    #symmetry-story .p10-card strong{font-size:clamp(18px,1.8vw,24px);line-height:1.2}
    #symmetry-story .p10-card span{font-size:12px;line-height:1.45;color:var(--muted)}
    @media(max-height:760px) and (min-width:821px){
      #symmetry-story .story-copy h2{font-size:clamp(31px,3.35vw,44px)}
      #symmetry-story .sym-lab{min-height:350px;margin-top:15px}
      #symmetry-story .p10-3d-stage,#symmetry-story .p10-3d-canvas,#symmetry-story .p10-panel{min-height:350px}
      #symmetry-story .p10-panel{gap:13px;padding:16px}
      #symmetry-story .p10-card{padding:13px 14px}
      #symmetry-story .p10-card span{font-size:10.5px}
    }
    @media(max-width:820px){
      #symmetry-story .sym-lab{grid-template-columns:1fr;min-height:0;gap:14px}
      #symmetry-story .p10-3d-stage,#symmetry-story .p10-3d-canvas{min-height:300px}
      #symmetry-story .p10-panel{grid-template-columns:repeat(3,1fr);grid-template-rows:none;min-height:0;padding:12px;gap:8px}
      #symmetry-story .p10-card{padding:11px 10px}
      #symmetry-story .p10-card strong{font-size:14px}
      #symmetry-story .p10-card span{font-size:9px}
    }
  `;
  document.head.appendChild(style);

  const stage=section.querySelector('.p10-3d-stage');
  const canvas=section.querySelector('.p10-3d-canvas');
  const angleReadout=section.querySelector('.p10-angle');
  const ctx=canvas.getContext('2d');
  if(!ctx)return;

  const atoms=[
    {label:'O',p:[-1.35,0,0],r:.38,fill:['#fff8f4','#f3c0aa','#d98969']},
    {label:'C',p:[0,0,0],r:.34,fill:['#ffffff','#d7edf0','#91bbc4']},
    {label:'O',p:[1.35,0,0],r:.38,fill:['#fff8f4','#f3c0aa','#d98969']}
  ];
  const bonds=[[0,1],[1,2]];
  const force={from:[1.72,0,0],to:[2.28,.72,.42]};
  let pitch=18*Math.PI/180,yaw=-24*Math.PI/180;
  let dragging=false,lastX=0,lastY=0;

  function rotatePoint(p){
    let [x,y,z]=p;
    const cy=Math.cos(yaw),sy=Math.sin(yaw);
    [x,z]=[x*cy+z*sy,-x*sy+z*cy];
    const cx=Math.cos(pitch),sx=Math.sin(pitch);
    [y,z]=[y*cx-z*sx,y*sx+z*cx];
    return [x,y,z];
  }
  function project(p,w,h){
    const [x,y,z]=rotatePoint(p);
    const camera=5.8;
    const scale=Math.min(w,h)*.19;
    const f=camera/(camera-z);
    return {x:w/2+x*scale*f,y:h/2-y*scale*f,z,scale:f};
  }
  function drawSphere(a,w,h){
    const q=project(a.p,w,h);
    const radius=Math.max(18,a.r*Math.min(w,h)*.19*q.scale);
    const g=ctx.createRadialGradient(q.x-radius*.34,q.y-radius*.38,radius*.08,q.x,q.y,radius);
    g.addColorStop(0,a.fill[0]);g.addColorStop(.32,a.fill[1]);g.addColorStop(1,a.fill[2]);
    ctx.save();
    ctx.shadowColor='rgba(38,51,47,.2)';ctx.shadowBlur=10;ctx.shadowOffsetX=4;ctx.shadowOffsetY=6;
    ctx.beginPath();ctx.arc(q.x,q.y,radius,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
    ctx.shadowColor='transparent';ctx.lineWidth=2.5;ctx.strokeStyle='#26332f';ctx.stroke();
    ctx.fillStyle='#26332f';ctx.font=`800 ${Math.max(13,radius*.48)}px Inter, sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(a.label,q.x,q.y+1);
    ctx.restore();
  }
  function drawDoubleBond(a,b,w,h){
    const p1=project(atoms[a].p,w,h),p2=project(atoms[b].p,w,h);
    const dx=p2.x-p1.x,dy=p2.y-p1.y,len=Math.hypot(dx,dy)||1;
    const ox=-dy/len*5,oy=dx/len*5;
    ctx.save();ctx.strokeStyle='#26332f';ctx.lineWidth=5;ctx.lineCap='round';
    [-1,1].forEach(s=>{ctx.beginPath();ctx.moveTo(p1.x+ox*s,p1.y+oy*s);ctx.lineTo(p2.x+ox*s,p2.y+oy*s);ctx.stroke()});ctx.restore();
  }
  function drawArrow(w,h){
    const a=project(force.from,w,h),b=project(force.to,w,h);
    const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len;
    ctx.save();ctx.strokeStyle='#b6533f';ctx.fillStyle='#b6533f';ctx.lineWidth=5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
    const s=14;ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.x-ux*s-uy*s*.55,b.y-uy*s+ux*s*.55);ctx.lineTo(b.x-ux*s+uy*s*.55,b.y-uy*s-ux*s*.55);ctx.closePath();ctx.fill();ctx.restore();
  }
  function render(){
    const rect=canvas.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,2);
    const w=Math.max(1,rect.width),h=Math.max(1,rect.height);
    const rw=Math.round(w*dpr),rh=Math.round(h*dpr);
    if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh}
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);

    bonds.forEach(([a,b])=>drawDoubleBond(a,b,w,h));
    drawArrow(w,h);
    atoms
      .map(a=>({a,z:rotatePoint(a.p)[2]}))
      .sort((u,v)=>u.z-v.z)
      .forEach(({a})=>drawSphere(a,w,h));

    if(angleReadout){
      const px=Math.round(pitch*180/Math.PI),py=Math.round(yaw*180/Math.PI);
      angleReadout.textContent=`X ${px}° · Y ${py}°`;
    }
  }

  stage.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;stage.setPointerCapture?.(e.pointerId)});
  stage.addEventListener('pointermove',e=>{
    if(!dragging)return;
    const dx=e.clientX-lastX,dy=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;
    yaw+=dx*.009;pitch+=dy*.009;
    const cap=Math.PI*.48;pitch=Math.max(-cap,Math.min(cap,pitch));
    render();
  });
  stage.addEventListener('pointerup',()=>dragging=false);
  stage.addEventListener('pointercancel',()=>dragging=false);
  window.addEventListener('resize',render);
  render();
})();
