// Usage: node render.js <content.json> [out-dir]
// Renders each slide in the JSON to a PNG (1080x1350 for 4x5, 1080x1440 for 3x4).
const {chromium} = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const [src, outArg] = process.argv.slice(2);
  if (!src) { console.error('Usage: node render.js <content.json> [out-dir]'); process.exit(1); }
  const data = JSON.parse(fs.readFileSync(src, 'utf8'));
  const out = path.resolve(outArg || path.join(path.dirname(src), 'out'));
  fs.mkdirSync(out, {recursive: true});
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'template.html'));
  await page.evaluate(d => window.render(d), data);
  await page.evaluate(() => document.fonts.ready);
  const name = path.basename(src, '.json');
  for (let i = 1; i <= data.slides.length; i++) {
    const file = path.join(out, `${name}-${String(i).padStart(2, '0')}.png`);
    await page.locator('#s' + i).screenshot({path: file});
    console.log(file);
  }
  await browser.close();
})();
