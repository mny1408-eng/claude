const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+process.argv[2]+'/letters.html');await p.waitForTimeout(300);
for(const id of ['mono-cn','wordmark','stacked']){await p.locator('#'+id).screenshot({path:process.argv[2]+'/letter-'+id+'.png'});}
await b.close();})();
