const icons={"政治":"🏛","金融":"📈","加密货币":"₿"};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>n>=10000?(n/10000).toFixed(1)+" 万":String(n);
async function load(f){
  const r=await fetch("data/"+f+"?t="+Date.now());if(!r.ok)throw new Error(r.status);const d=await r.json();
  document.getElementById("meta").textContent=`报告日期 ${d.date} · 生成于 ${d.generated_at} · 统计窗口 ${d.window}`;
  document.getElementById("tabs").innerHTML=d.categories.map((c,i)=>`<a href="#c${i}">${icons[c.name]||""} ${esc(c.name)}</a>`).join("");
  document.getElementById("content").innerHTML=d.categories.map((c,i)=>`<section id="c${i}"><h2>${icons[c.name]||""} ${esc(c.name)}</h2><ol>${
    c.items.map(it=>`<li><span class="rank">${it.rank}</span><div><div class="t"><a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.title)}</a></div>
    <div class="info">${esc(it.author)} · <span class="likes">❤ ${fmt(it.likes)}</span></div>${it.summary?`<div class="sum">${esc(it.summary)}</div>`:""}</div></li>`).join("")}</ol></section>`).join("");
}
(async()=>{
  const sel=document.getElementById("archive");
  try{const idx=await (await fetch("data/index.json?t="+Date.now())).json();
    sel.innerHTML=`<option value="latest.json">最新</option>`+idx.map(d=>`<option value="${d}.json">${d}</option>`).join("");}catch(e){}
  sel.onchange=()=>load(sel.value);
  load("latest.json").catch(e=>document.getElementById("meta").textContent="数据加载失败："+e.message);
})();
