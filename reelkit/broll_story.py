"""B-roll reel with on-screen text only (no voice): cut clips, lay text beats over them.

Usage: python3 broll_story.py <proj>   reads <proj>/broll.json, writes <proj>/work/montage.mp4 and <proj>/hf/index.html
broll.json: {"segments": [{"file": "clips/x.mov", "start": 0.0, "dur": 2.8}],
             "beats": [{"at": 0.0, "until": 2.8, "kind": "hook|tip|line|end", "html": "...", "num": "1"}],
             "fit": "cover"}
Timing of beats is on the montage timeline. Palette: ivory #F9F6F0, forest #1C4A3E, gold #C9A84C.
"""
import json, shutil, subprocess, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent
GSAP = Path("/home/user/hf/node_modules/gsap/dist/gsap.min.js")
W, H = 1080, 1920

CSS = """
:root { --ivory:#F9F6F0; --forest:#1C4A3E; --gold:#C9A84C; }
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:1080px; height:1920px; overflow:hidden; background:#000; font-family:Poppins, sans-serif; }
#root { position:relative; width:100%; height:100%; overflow:hidden; }
#vid { position:absolute; left:0; top:0; width:1080px; height:1920px; object-fit:cover; }
.shade { position:absolute; left:0; right:0; top:0; height:760px; background:linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,0)); z-index:5; }
.beat { position:absolute; left:70px; right:200px; display:flex; flex-direction:column; align-items:flex-start; z-index:20; }
.hook { top:300px; }
.hook .h1 { font-size:96px; font-weight:900; line-height:1.02; color:#fff; -webkit-text-stroke:10px #10241C; paint-order:stroke fill; text-shadow:0 8px 28px rgba(0,0,0,.5); }
.hook .h2 { margin-top:16px; background:var(--gold); color:var(--forest); font-size:50px; font-weight:800; border-radius:16px; padding:6px 22px; }
.tip { top:290px; }
.tipcard { background:var(--ivory); border-radius:28px; padding:22px 28px 24px; box-shadow:0 16px 44px rgba(0,0,0,.35); border-left:12px solid var(--gold); max-width:810px; }
.tk { display:flex; align-items:center; gap:14px; font-size:30px; font-weight:800; letter-spacing:3px; color:var(--forest); }
.tk b { display:inline-flex; width:52px; height:52px; border-radius:50%; background:var(--forest); color:var(--gold); align-items:center; justify-content:center; font-size:30px; letter-spacing:0; }
.tt { margin-top:10px; font-size:52px; font-weight:800; color:var(--forest); line-height:1.12; }
.ts { margin-top:8px; font-size:32px; font-weight:600; color:#3A3A36; line-height:1.25; }
.hl { background:var(--gold); color:var(--forest); border-radius:12px; padding:0 12px; }
.line { top:1180px; left:60px; right:200px; align-items:center; text-align:center; }
.line .l1 { font-size:76px; font-weight:900; color:#fff; line-height:1.1; -webkit-text-stroke:10px #10241C; paint-order:stroke fill; text-shadow:0 8px 24px rgba(0,0,0,.45); }
.line .l1 .hl { -webkit-text-stroke:0; }
.end { top:1100px; left:60px; right:60px; align-items:center; text-align:center; }
.endcard { background:var(--forest); color:var(--ivory); border-radius:30px; padding:26px 36px; border:5px solid var(--gold); box-shadow:0 16px 44px rgba(0,0,0,.4); }
.endcard .e1 { font-size:58px; font-weight:900; } .endcard .e2 { margin-top:8px; font-size:34px; font-weight:700; color:var(--gold); }
.handle { position:absolute; left:0; right:0; top:1590px; text-align:center; color:#fff; font-size:32px; font-weight:700; text-shadow:0 3px 10px rgba(0,0,0,.6); z-index:20; }
"""


def cut(proj: Path, cfg: dict) -> float:
    ins, fc, t = [], "", 0.0
    for i, s in enumerate(cfg["segments"]):
        ins += ["-ss", str(s["start"]), "-t", f"{s['dur']:.3f}", "-i", str(proj / s["file"])]
        fc += (f"[{i}:v]fps=30,scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1,format=yuv420p,"
               f"trim=duration={s['dur']:.3f},setpts=PTS-STARTPTS[v{i}];")
        t += s["dur"]
    fc += "".join(f"[v{i}]" for i in range(len(cfg["segments"]))) + f"concat=n={len(cfg['segments'])}:v=1:a=0[v]"
    (proj / "work").mkdir(exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", fc, "-map", "[v]", "-c:v", "libx264", "-crf", "16",
                    "-preset", "medium", "-g", "30", "-movflags", "+faststart", str(proj / "work" / "montage.mp4")], check=True)
    return t


def main(proj: Path) -> None:
    cfg = json.loads((proj / "broll.json").read_text())
    end = cut(proj, cfg)
    starts, t = [], 0.0
    for s in cfg["segments"]:
        starts.append(t)
        t += s["dur"]
    out = proj / "hf"
    (out / "assets").mkdir(parents=True, exist_ok=True)
    shutil.copy(proj / "work" / "montage.mp4", out / "assets" / "montage.mp4")
    shutil.copy(GSAP, out / "assets" / "gsap.min.js")
    html, js = [], []
    for i, b in enumerate(cfg["beats"]):
        a, u, k = b["at"], b.get("until", end), b["kind"]
        if k == "hook":
            inner = f'<div class="h1">{b["html"]}</div>' + (f'<div id="b{i}s" class="h2">{b["sub"]}</div>' if b.get("sub") else "")
        elif k == "tip":
            inner = (f'<div class="tipcard"><div class="tk"><b>{b.get("num", "")}</b>{b.get("label", "")}</div>'
                     f'<div class="tt">{b["html"]}</div>' + (f'<div id="b{i}s" class="ts">{b["sub"]}</div>' if b.get("sub") else "") + '</div>')
        elif k == "line":
            inner = f'<div class="l1">{b["html"]}</div>'
        else:
            inner = f'<div class="endcard"><div class="e1">{b["html"]}</div>' + (f'<div class="e2">{b["sub"]}</div>' if b.get("sub") else "") + '</div>'
        html.append(f'<div id="b{i}" class="clip beat {k}" data-start="{a:.3f}" data-duration="{u - a:.3f}" data-track-index="{2 + i % 3}"><div id="b{i}i">{inner}</div></div>')
        js.append(f'tl.fromTo("#b{i}i",{{opacity:0,y:30,scale:0.94}},{{opacity:1,y:0,scale:1,duration:0.35,ease:"expo.out"}},{a + 0.02:.3f});')
        if b.get("sub"):
            js.append(f'tl.fromTo("#b{i}s",{{opacity:0,x:-30}},{{opacity:1,x:0,duration:0.3,ease:"expo.out"}},{a + b.get("sub_delay", 0.6):.3f});')
        if u < end - 0.05:
            js.append(f'tl.to("#b{i}i",{{opacity:0,y:-16,duration:0.15,ease:"power2.in"}},{u - 0.15:.3f});')
    for s in starts[1:]:
        js.append(f'tl.fromTo("#vid",{{scale:1.05}},{{scale:1,duration:0.3,ease:"power3.out",immediateRender:false}},{s:.3f});')
    doc = f"""<!doctype html>
<html><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<script src="assets/gsap.min.js"></script><style>{CSS}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{end:.3f}" data-width="1080" data-height="1920">
<video id="vid" class="clip" src="assets/montage.mp4" data-start="0" data-duration="{end:.3f}" data-track-index="0" muted playsinline></video>
<div class="shade"></div>
{chr(10).join(html)}
<div class="handle">@coachnas.pharmacist</div>
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
