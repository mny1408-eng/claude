const fs=require('fs');const {chromium}=require('playwright');
const days=JSON.parse(fs.readFileSync('days.json','utf8'));
const tpl=fs.readFileSync('poster.html','utf8');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const d of days){
 let h=tpl.replace(/Hari 1 · Daily Reminder/,`Hari ${d.day} · Daily Reminder`)
  .replace(/<div class="head">.*?<\/div>/s,`<div class="head">${esc(d.head).replace(/\*(.+?)\*/,'<span>$1</span>')}</div>`)
  .replace(/<div class="sub">.*?<\/div>/s,`<div class="sub">${esc(d.sub)}</div>`)
  .replace(/<div class="quote">.*?<\/b><\/div>/s,`<div class="quote">“${esc(d.quote)}”<b>James Clear</b></div>`);
 if(d.day===1) h=h.replace('<b>James Clear</b>','<b>James Clear, Atomic Habits</b>');
 const f=`posters/hari-${d.day}.html`;fs.writeFileSync(f,h);
 await p.goto('file://'+process.cwd()+'/'+f);await p.screenshot({path:`posters/hari-${d.day}.png`});
}
await b.close()})();
