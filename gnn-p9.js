(function installP9GNNFix(){
  const section=document.getElementById('gnn-story');
  if(!section)return;

  // P9 review: the visual already explains the hop-by-hop idea; remove the redundant lead.
  section.querySelector('.story-copy .lead')?.remove();

  // The old expanding blue pulse did not map clearly to an edge or message path.
  // Remove it and let hop-by-hop node highlighting carry the message-passing explanation.
  section.querySelector('.gnn-signal')?.remove();

  const style=document.createElement('style');
  style.textContent=`
    #gnn-story .gnn-tags{
      display:grid;
      grid-template-columns:max-content;
      justify-items:start;
      gap:7px;
      margin-top:12px;
    }
    #gnn-story .gnn-tags span{
      width:max-content;
      max-width:100%;
      font-size:10px;
      line-height:1.25;
    }
    #gnn-story .gnn-next{
      display:block;
      margin-top:20px;
    }
    @media(max-height:760px) and (min-width:721px){
      #gnn-story .gnn-tags{gap:5px;margin-top:8px}
      #gnn-story .gnn-next{margin-top:14px}
    }
  `;
  document.head.appendChild(style);
})();
