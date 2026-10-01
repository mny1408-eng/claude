const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
(async()=>{
  const mode=process.argv[2]||'preview';
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1080,height:1920}});
  await p.goto('file://'+__dirname+'/'+(process.argv[3]||'reel.html')+'');
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(500);
  if(mode==='preview'){
    for(const t of [4.5,9,14.5,19,25.5,31.5,38,44.5]){
      await p.evaluate(t=>render(t),t);
      await p.screenshot({path:`${process.argv[4]||'prev'}_${t}.png`});
    }
  } else {
    fs.mkdirSync((process.argv[4]||'frames'),{recursive:true});
    const fps=30, dur=46;
    for(let f=0;f<fps*dur;f++){
      await p.evaluate(t=>render(t),f/fps);
      await p.screenshot({path:`${process.argv[4]||'frames'}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});
    }
  }
  await b.close();
})();
