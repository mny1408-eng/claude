// Render Coach Nas PM carousel slides (1080x1440) to JPG.
// Usage: node render.js <slides.json> <outDir>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [, , specPath, outDir] = process.argv;
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const fontCss = fs.readFileSync(path.join(__dirname, 'fonts', 'embedded.css'), 'utf8');
const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'wdt-logo.png')).toString('base64');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// **word** -> sage highlight
const hl = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<span class="hl">$1</span>');

function checklist(items, active, doneAll) {
  return `<div class="rx"><span class="rxmark">R<sub>x</sub></span>${items
    .map((it, i) => {
      const on = doneAll || i === active;
      return `<span class="item${on ? ' on' : ''}"><span class="box">${on ? '✓' : ''}</span>${esc(it)}</span>`;
    })
    .join('')}</div>`;
}

function slideHtml(s, idx, total) {
  const dots = Array.from({ length: total }, (_, i) => `<span class="dot${i === idx ? ' act' : ''}"></span>`).join('');
  const cta = idx === total - 1 ? 'SIMPAN' : 'SIMPAN <span class="sep">•</span> SWIPE <span class="arrow">⟶</span>';
  return `<!doctype html><html><head><meta charset="utf-8">
<style>${fontCss}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1440px;background:#FDFCF8;font-family:Inter,sans-serif;color:#2F2F2F;position:relative;overflow:hidden}
.top{position:absolute;top:56px;left:52px;right:52px;display:flex;justify-content:space-between;align-items:center;font-size:27px}
.brand b{color:#7D967C;font-weight:600}.brand span{color:#2F2F2F;font-weight:500}
.brand i{display:inline-block;width:2px;height:30px;background:#2F2F2F;margin:0 12px;vertical-align:-5px}
.handle{color:#A6A6A6;font-size:24px}
.rule{position:absolute;top:112px;left:52px;right:52px;height:2px;background:#E6E5E0}
.ghost{position:absolute;top:150px;right:80px;font-family:'Barlow Condensed';font-weight:800;font-size:380px;line-height:1;color:#E8ECE6;letter-spacing:-6px}
.content{position:absolute;left:105px;right:100px;top:${s.top || 200}px}
.kicker{font-size:29px;font-weight:700;letter-spacing:.2em;color:#7D967C;margin-bottom:26px}
h1{font-family:'Barlow Condensed';font-weight:800;font-size:${s.size || 128}px;line-height:1.02;text-transform:uppercase;color:#2F2F2F;letter-spacing:-.5px;position:relative}
.hl{color:#7D967C}
.short{width:80px;height:4px;background:#ADBBAC;margin:48px 0 44px}
.sub{font-size:44px;line-height:1.35;font-weight:400}
.sub b{color:#7D967C;font-weight:600}
.rx{position:absolute;left:105px;right:105px;top:1072px;height:88px;border:2px solid #E6E5E0;border-radius:18px;background:#fff;display:flex;align-items:center;gap:26px;padding:0 24px;font-size:27px;font-weight:600;color:#A6A6A6}
.rxmark{font-family:Georgia,serif;font-style:italic;font-weight:700;font-size:40px;color:#1F4A3A}.rxmark sub{font-size:26px}
.item{display:flex;align-items:center;gap:12px;padding:8px 14px;border-radius:10px}
.item.on{background:#EDF1EA;color:#2F2F2F}
.box{width:32px;height:32px;border:2px solid #C9C9C6;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:22px;color:#4E7A5E}
.item.on .box{border-color:#7D9C85}
.foot{position:absolute;left:0;right:0;bottom:0;height:162px;background:#F3F2EF}
.cta{position:absolute;left:65px;bottom:64px;font-size:24px;letter-spacing:.16em;color:#2F2F2F}
.cta .sep{color:#C9C9C6;margin:0 18px;letter-spacing:0}.cta .arrow{margin-left:18px;letter-spacing:0;font-size:30px}
.dots{position:absolute;left:512px;bottom:72px;display:flex;gap:18px;align-items:center}
.dot{width:16px;height:16px;border-radius:50%;background:#D6D5D2}
.dot.act{width:20px;height:20px;background:#7D9C85;box-shadow:0 0 0 7px #E8EEE6}
.logo{position:absolute;right:30px;bottom:28px;width:230px}
</style></head><body>
<div class="top"><div class="brand"><b>COACH NAS</b><i></i><span>CLINICAL PHARMACIST</span></div><div class="handle">@coachnas.pharmacist</div></div>
<div class="rule"></div>
${s.ghost ? `<div class="ghost">${esc(s.ghost)}</div>` : ''}
<div class="content">
${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ''}
<h1>${s.headline.map(hl).join('<br>')}</h1>
${s.sub ? `<div class="short"></div><div class="sub">${esc(s.sub).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</div>` : ''}
</div>
${s.checklist ? checklist(spec.checklist, s.checklist.active, s.checklist.all) : ''}
<div class="foot"></div>
<div class="cta">${cta}</div>
<div class="dots">${dots}</div>
<img class="logo" src="${logo}">
</body></html>`;
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1440 } });
  for (let i = 0; i < spec.slides.length; i++) {
    await page.setContent(slideHtml(spec.slides[i], i, spec.slides.length), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const missing = await page.evaluate(() => ['800 20px "Barlow Condensed"', '400 20px Inter'].filter((f) => !document.fonts.check(f)));
    if (missing.length) throw new Error('fonts not loaded: ' + missing.join(', '));
    // Fail loudly if any text block runs past the checklist/footer zone.
    const overflow = await page.evaluate(() => {
      const c = document.querySelector('.content').getBoundingClientRect();
      const limit = document.querySelector('.rx') ? 1050 : 1250;
      return c.bottom > limit ? Math.round(c.bottom) : 0;
    });
    if (overflow) console.warn(`WARN slide ${i + 1}: content bottom at ${overflow}px`);
    const file = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 92 });
    console.log('wrote', file);
  }
  await browser.close();
})();
