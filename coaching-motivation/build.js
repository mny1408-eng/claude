const fs=require('fs');const {chromium}=require('playwright');
const DIR=process.env.DIR||'.';const LABEL=process.env.LABEL||'Hari';
const days=JSON.parse(fs.readFileSync(DIR+'/days.json','utf8'));
let tpl=fs.readFileSync('poster.html','utf8');
const THEMES={nov:'body{background:linear-gradient(160deg,#1b1f45 0%,#2a2f6b 55%,#3b3f8f 100%)}.tag,.head span,.quote b,.foot em{color:#ffb38a}.quote{border-left-color:#ffb38a}.circle2{background:rgba(255,179,138,.08)}'};
if(process.env.THEME&&THEMES[process.env.THEME])tpl=tpl.replace('</style>',THEMES[process.env.THEME]+'</style>');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const d of days){
 let h=tpl.replace(/Hari 1 · Daily Reminder/,`${LABEL} ${d.day} · Daily Reminder`)
  .replace(/<div class="head">.*?<\/div>/s,`<div class="head">${esc(d.head).replace(/\*(.+?)\*/,'<span>$1</span>')}</div>`)
  .replace(/<div class="sub">.*?<\/div>/s,`<div class="sub">${esc(d.sub)}</div>`)
  .replace(/<div class="quote">.*?<\/b><\/div>/s,`<div class="quote">“${esc(d.quote)}”<b>${esc(d.by||'James Clear')}</b></div>`);
 if(DIR==='.'&&d.day===1) h=h.replace('<b>James Clear</b>','<b>James Clear, Atomic Habits</b>');
 const f=`${DIR}/posters/hari-${d.day}.html`;fs.writeFileSync(f,h);
 await p.goto('file://'+process.cwd()+'/'+f);await p.screenshot({path:`${DIR}/posters/hari-${d.day}.png`});
}
await b.close()})();
