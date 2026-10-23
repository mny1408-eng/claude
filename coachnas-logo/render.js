const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+process.argv[2]+'/logos.html');await p.waitForTimeout(300);
for(const id of ['primary','badge','avatar','mono']){await p.locator('#'+id).screenshot({path:process.argv[2]+'/coachnas-'+id+'.png'});}
await b.close();})();
