(function installP9GNNFix(){
  const section=document.getElementById('gnn-story');
  if(!section)return;

  const lead=section.querySelector('.story-copy .lead');
  if(lead){
    lead.innerHTML='<span class="story-zh">点“下一层”。中心原子先看到一阶邻居，再看到邻居的邻居。</span><span class="story-en">Press “next layer”. The center atom first receives information from direct neighbors, then from neighbors-of-neighbors.</span>';
  }

  // The old expanding blue pulse did not map clearly to an edge or message path.
  // Remove it and let hop-by-hop node highlighting carry the message-passing explanation.
  section.querySelector('.gnn-signal')?.remove();
})();
