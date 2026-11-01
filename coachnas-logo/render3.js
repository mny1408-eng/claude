const {chromium}=require('playwright');
(async()=>{const d=process.argv[2];const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+d+'/pack.html');await p.waitForTimeout(300);
for(const id of ['avatar-dark','avatar-light','profile-pic','horizontal-light','horizontal-dark','mark-transparent','mark-transparent-teal'])
 await p.locator('#'+id).screenshot({path:d+'/cn-'+id+'.png',omitBackground:true});
await b.close();})();
