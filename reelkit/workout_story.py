"""Workout story/reel overlay on a montage from workout_cut.py: WDT logo + DAY n intro, corner badge, move counter, beat flashes, done card, music.

Usage: python3 workout_story.py <proj>   -> <proj>/hf/index.html (+ assets), then `npx hyperframes render <proj>/hf`
Reads <proj>/workout.json (bpm, segments, music {file, start}, title {day, sub, done}) and <proj>/work/montage.mp4.
The first segment carries the intro title, the last one the done card; the ones between are counted (1/N ... N/N).
"""
import json, shutil, subprocess, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent
GSAP = Path("/home/user/hf/node_modules/gsap/dist/gsap.min.js")

CSS = """
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:1080px; height:1920px; overflow:hidden; background:#000; font-family:Poppins, sans-serif; }
#root { position:relative; width:100%; height:100%; overflow:hidden; }
#vid { position:absolute; left:0; top:0; width:1080px; height:1920px; object-fit:cover; }
#flash { position:absolute; inset:0; background:#fff; opacity:0; z-index:15; pointer-events:none; }
.logo { background:#fff; border-radius:28px; padding:14px 26px; box-shadow:0 14px 40px rgba(0,0,0,.35); }
.logo img { height:120px; display:block; }
.day { margin-top:22px; font-size:190px; font-weight:900; line-height:.95; color:#fff; letter-spacing:-4px; -webkit-text-stroke:10px #111; paint-order:stroke fill; text-shadow:0 10px 30px rgba(0,0,0,.45); }
.day span { color:#FFD400; }
.sub { margin-top:14px; background:#E4002B; color:#fff; font-size:54px; font-weight:900; letter-spacing:6px; padding:8px 30px; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,.35); }
.badge { display:flex; align-items:center; gap:16px; background:rgba(255,255,255,.95); border-radius:22px; padding:10px 20px 10px 12px; box-shadow:0 10px 30px rgba(0,0,0,.3); }
.badge img { height:58px; display:block; }
.bd { font-size:38px; font-weight:900; color:#111; line-height:1; } .bs { font-size:20px; font-weight:800; color:#E4002B; letter-spacing:2px; }
.cnt { background:#111; color:#fff; font-size:34px; font-weight:700; border-radius:999px; padding:10px 26px; border:3px solid #FFD400; } .cnt b { color:#FFD400; font-size:44px; }
.done { font-size:88px; font-weight:900; color:#fff; -webkit-text-stroke:8px #111; paint-order:stroke fill; text-shadow:0 8px 24px rgba(0,0,0,.45); }
.done span { color:#3BD16F; }
.next { margin-top:12px; background:#fff; color:#111; font-size:44px; font-weight:800; padding:8px 28px; border-radius:16px; }
.handle { position:absolute; left:0; right:0; top:1590px; text-align:center; color:#fff; font-size:32px; font-weight:700; text-shadow:0 3px 10px rgba(0,0,0,.6); z-index:20; }
"""


def main(proj: Path) -> None:
    cfg = json.loads((proj / "workout.json").read_text())
    beat = 60 / cfg["bpm"]
    segs = [s["beats"] for s in cfg["segments"]]
    starts, t = [], 0.0
    for b in segs:
        starts.append(t)
        t += b * beat
    end = t
    ti = cfg.get("title", {})
    day, sub, nxt = ti.get("day", "1"), ti.get("sub", "WDT WORKOUT"), ti.get("done", "")
    out = proj / "hf"
    (out / "assets").mkdir(parents=True, exist_ok=True)
    shutil.copy(proj / "work" / "montage.mp4", out / "assets" / "montage.mp4")
    shutil.copy(REPO / "assets" / "wdt-logo.png", out / "assets" / "wdt-logo.png")
    shutil.copy(GSAP, out / "assets" / "gsap.min.js")
    audio = ""
    if cfg.get("music"):
        m = cfg["music"]
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(m["start"]), "-t", f"{end:.3f}", "-i", str(proj / m["file"]),
                        "-af", f"afade=t=in:d=0.05,afade=t=out:st={max(0, end - 1.2):.3f}:d=1.2,loudnorm=I=-14:TP=-1.5",
                        "-c:a", "aac", "-b:a", "192k", str(out / "assets" / "music.m4a")], check=True)
        audio = f'<audio id="music" class="clip" src="assets/music.m4a" data-start="0" data-duration="{end:.3f}" data-volume="1" data-track-index="9"></audio>'

    html, js = [], []
    n = len(segs) - 2
    html.append(f'<div id="intro" class="clip" data-start="0" data-duration="{starts[1]:.3f}" data-track-index="2" style="position:absolute; left:0; right:0; top:1060px; z-index:20; display:flex; flex-direction:column; align-items:center">'
                f'<div id="logo" class="logo"><img src="assets/wdt-logo.png"/></div><div id="day" class="day">DAY <span>{day}</span></div><div id="sub" class="sub">{sub}</div></div>')
    js.append('tl.fromTo("#logo",{opacity:0,y:-40},{opacity:1,y:0,duration:0.3,ease:"expo.out"},0.02);')
    js.append(f'tl.fromTo("#day",{{opacity:0,scale:1.8}},{{opacity:1,scale:1,duration:0.25,ease:"power4.out"}},{beat * 2:.3f});')
    js.append(f'tl.fromTo("#sub",{{opacity:0,y:20}},{{opacity:1,y:0,duration:0.25,ease:"expo.out"}},{beat * 3:.3f});')
    js.append(f'tl.to("#intro",{{opacity:0,y:-30,duration:0.15}},{starts[1] - 0.15:.3f});')
    html.append(f'<div id="badge" class="clip" data-start="{starts[1]:.3f}" data-duration="{starts[-1] - starts[1]:.3f}" data-track-index="3" style="position:absolute; left:50px; top:270px; z-index:20">'
                f'<div id="badgei" class="badge"><img src="assets/wdt-logo.png"/><div><div class="bd">DAY {day}</div><div class="bs">{sub}</div></div></div></div>')
    js.append(f'tl.fromTo("#badgei",{{opacity:0,x:-60}},{{opacity:1,x:0,duration:0.3,ease:"expo.out"}},{starts[1]:.3f});')
    for i in range(n):
        s, d = starts[i + 1], segs[i + 1] * beat
        html.append(f'<div id="n{i}" class="clip" data-start="{s:.3f}" data-duration="{d:.3f}" data-track-index="{4 + i % 2}" style="position:absolute; right:60px; top:285px; z-index:20"><div id="n{i}i" class="cnt"><b>{i + 1}</b>/{n}</div></div>')
        js.append(f'tl.fromTo("#n{i}i",{{opacity:0,scale:1.6}},{{opacity:1,scale:1,duration:0.2,ease:"back.out(2)"}},{s:.3f});')
    for s in starts[1:]:  # a flash and a small punch on every cut (both start invisible, so nothing shows before the first cut)
        js.append(f'tl.fromTo("#flash",{{opacity:0.55}},{{opacity:0,duration:0.16,ease:"power2.out",immediateRender:false}},{s:.3f});')
        js.append(f'tl.fromTo("#vid",{{scale:1.06}},{{scale:1,duration:0.25,ease:"power3.out",immediateRender:false}},{s:.3f});')
    o = starts[-1]
    html.append(f'<div id="out" class="clip" data-start="{o:.3f}" data-duration="{end - o:.3f}" data-track-index="6" style="position:absolute; left:0; right:0; top:1250px; z-index:20; display:flex; flex-direction:column; align-items:center">'
                f'<div id="done" class="done">DAY {day} <span>✓</span> SELESAI</div>' + (f'<div id="next" class="next">{nxt}</div>' if nxt else "") + '</div>')
    js.append(f'tl.fromTo("#done",{{opacity:0,scale:1.6}},{{opacity:1,scale:1,duration:0.3,ease:"power4.out"}},{o + 0.05:.3f});')
    if nxt:
        js.append(f'tl.fromTo("#next",{{opacity:0,y:20}},{{opacity:1,y:0,duration:0.25,ease:"expo.out"}},{o + beat * 3:.3f});')

    doc = f"""<!doctype html>
<html><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<script src="assets/gsap.min.js"></script><style>{CSS}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{end:.3f}" data-width="1080" data-height="1920">
<video id="vid" class="clip" src="assets/montage.mp4" data-start="0" data-duration="{end:.3f}" data-track-index="0" muted playsinline></video>
<div id="flash"></div>
{chr(10).join(html)}
<div class="handle">@coachnas.pharmacist</div>
{audio}
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
{chr(10).join(js)}
window.__timelines = window.__timelines || {{}}; window.__timelines["main"] = tl;
</script></body></html>"""
    (out / "index.html").write_text(doc)
    print(f"{out / 'index.html'}: {end:.2f}s, cuts at " + ", ".join(f"{s:.2f}" for s in starts[1:]))


if __name__ == "__main__":
    main(Path(sys.argv[1]))
