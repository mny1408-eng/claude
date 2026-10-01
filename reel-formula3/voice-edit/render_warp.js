const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');
const W=JSON.parse(fs.readFileSync(__dirname+'/warp.json'));
const A=W.anchors;
function warp(T){ for(let i=1;i<A.length;i++){ if(T<=A[i][0]){const[a0,h0]=A[i-1],[a1,h1]=A[i]; return h0+(h1-h0)*(T-a0)/(a1-a0);} } return A[A.length-1][1]; }
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920}});
  await p.goto('file://'+__dirname+'/../reel/reel916.html'); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(400);
  fs.mkdirSync(__dirname+'/fr',{recursive:true});
  const N=Math.round(W.dur*30);
  for(let f=0;f<N;f++){ await p.evaluate(t=>render(t),warp(f/30)); await p.screenshot({path:`${__dirname}/fr/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:92}); }
  await b.close(); console.log('frames',N);
})();
