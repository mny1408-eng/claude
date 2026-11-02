"""Build a HyperFrames reel (IG or TikTok layout) from a cut talking head and a card spec.

Usage: hf_reel.py <proj> <ig|tt>   -> writes <proj>/hf-<variant>/index.html (+ assets), ready for `npx hyperframes render`.

<proj>/spec.json:
  series     small chip text (IG only)
  hook       {"a": line 1, "b": highlighted line 2, "b_at": phrase where line 2 pulses, "until": phrase that ends the hook}
  cards      [{"at": phrase, "html": inner html, "pops": [[id, phrase]], "stamps": [[id, phrase, rotation]], "lines": [[id, phrase]]}]
  cta        {"at": phrase, "big": html, "sub": text, "hold": seconds after the talk}
  punch      phrases that get a quick punch-in
  emphasis   words (lower case, no punctuation) highlighted in the captions
A phrase is matched against the words on the cut timeline; its first word's start is the time.
"""
import json, re, shutil, sys
from html import escape
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
GSAP = Path("/home/user/hf/node_modules/gsap/dist/gsap.min.js")
F = 1 / 30
PEAK = {"whoosh": 0.181, "swipe": 0.14, "pop": 0.005, "stamp": 0.001, "tick": 0.0, "scribble": 0.224}
LEN = {"whoosh": 0.38, "swipe": 0.26, "pop": 0.14, "stamp": 0.45, "tick": 0.07, "scribble": 0.5}

BASE_CSS = """
:root { --ink:#173C30; --paper:#F7F5ED; --gold:#EAD49C; --marker:#C0613E; --glass:rgba(23,60,48,.9); }
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:1080px; height:1920px; overflow:hidden; background:#000; font-family:Poppins, sans-serif; }
#root { position:relative; width:100%; height:100%; overflow:hidden; }
#cam { position:absolute; inset:0; }
#talk, #hold { position:absolute; left:0; top:0; width:1080px; height:1920px; object-fit:cover; }
#prog { position:absolute; left:0; top:0; width:1080px; height:9px; background:var(--gold); z-index:40; }
.chip { position:absolute; left:0; right:0; top:180px; display:flex; justify-content:center; z-index:30; }
.chip span { background:var(--ink); color:var(--paper); font-weight:700; font-size:28px; letter-spacing:4px; padding:8px 22px; border-radius:999px; border:3px solid var(--gold); }
.slot { position:absolute; left:60px; right:60px; top:252px; display:flex; flex-direction:column; align-items:center; z-index:20; }
.card { position:relative; background:var(--glass); color:#fff; border-radius:34px; padding:26px 40px; text-align:center; box-shadow:0 14px 40px rgba(0,0,0,.35); max-width:960px; }
.t1 { font-size:54px; font-weight:800; line-height:1.15; }
.t2 { font-size:42px; font-weight:700; line-height:1.2; margin-top:10px; color:#fff; }
.sm { font-size:28px; font-weight:700; letter-spacing:2px; color:var(--gold); margin-bottom:8px; }
.hl { background:var(--gold); color:var(--ink); border-radius:12px; padding:0 14px; }
.num { display:inline-flex; width:58px; height:58px; border-radius:50%; background:var(--gold); color:var(--ink); font-size:34px; font-weight:800; align-items:center; justify-content:center; margin-right:14px; vertical-align:middle; }
.hookA { font-size:72px; font-weight:800; color:#fff; line-height:1.05; }
.hookB { display:inline-block; font-size:76px; font-weight:800; color:var(--ink); background:var(--gold); border-radius:22px; padding:2px 26px; margin-top:12px; }
.stamp { position:absolute; font-size:56px; font-weight:800; color:var(--marker); border:7px solid var(--marker); border-radius:16px; padding:2px 22px; background:rgba(247,245,237,.95); letter-spacing:3px; white-space:nowrap; }
.chips { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:14px; }
.pill { background:var(--gold); color:var(--ink); font-size:38px; font-weight:800; border-radius:999px; padding:6px 24px; white-space:nowrap; }
.strike { position:absolute; left:-8px; right:-8px; top:52%; height:9px; background:var(--marker); border-radius:6px; transform-origin:0 50%; }
.note { font-size:24px; font-weight:600; color:var(--gold); margin-top:12px; opacity:.9; }
.photo { position:absolute; inset:0; z-index:22; overflow:hidden; }
.photo img { position:absolute; left:0; top:0; width:1080px; height:1920px; object-fit:cover; }
.cap { position:absolute; left:0; right:0; top:1395px; display:flex; justify-content:center; z-index:25; }
.capin { background:rgba(23,60,48,.88); color:#fff; font-size:56px; font-weight:800; border-radius:22px; padding:8px 26px; max-width:920px; text-align:center; line-height:1.3; }
.capin .hl { padding:0 10px; }
.cta { background:var(--paper); color:var(--ink); border-radius:34px; padding:28px 44px; text-align:center; border:5px solid var(--gold); box-shadow:0 14px 40px rgba(0,0,0,.35); }
.cta .big { font-size:66px; font-weight:800; }
.cta .sub { font-size:34px; font-weight:600; margin-top:6px; }
.cta .hd { font-size:30px; font-weight:700; color:var(--marker); margin-top:10px; }
"""

TT_CSS = """
.chip { display:none; }
.slot { left:70px; right:200px; top:300px; }
.card { background:#fff; color:var(--ink); border:5px solid var(--ink); box-shadow:8px 8px 0 var(--ink); padding:22px 30px; max-width:810px; }
.t1 { font-size:48px; } .t2 { font-size:36px; color:var(--ink); } .sm { color:var(--marker); font-size:26px; } .note { color:var(--marker); }
.pill { font-size:32px; border:3px solid var(--ink); padding:5px 18px; } .num { border:3px solid var(--ink); }
.hookA { color:var(--ink); font-size:62px; } .hookB { font-size:62px; border:4px solid var(--ink); }
#hooki { border-radius:44px 44px 44px 10px; }
.cap { left:70px; right:200px; top:1290px; }
.capin { background:#fff; color:var(--ink); font-size:50px; max-width:800px; box-shadow:0 8px 24px rgba(0,0,0,.25); }
.cta { max-width:810px; }
"""


def norm(t: str) -> str:
    return re.sub(r"[^\w-]", "", t.lower())


def main(proj: Path, variant: str) -> None:
    spec = json.loads((proj / "spec.json").read_text())
    words = json.loads((proj / "work" / "words.json").read_text())
    toks = [norm(w[2]) for w in words]

    def at(phrase: str, after: float = -1) -> float:
        p = [norm(x) for x in phrase.split()]
        for i in range(len(toks) - len(p) + 1):
            if toks[i:i + len(p)] == p and words[i][0] > after:
                return words[i][0]
        raise SystemExit(f"phrase not found: {phrase!r}")

    talk = float(spec["talk_len"])
    end = talk + spec["cta"].get("hold", 1.2)
    out = proj / f"hf-{variant}"
    (out / "assets").mkdir(parents=True, exist_ok=True)
    shutil.copy(proj / "work" / "talk.mp4", out / "assets" / "talk.mp4")
    shutil.copy(proj / "work" / "last.jpg", out / "assets" / "last.jpg")
    shutil.copy(GSAP, out / "assets" / "gsap.min.js")
    for f in PEAK:
        shutil.copy(REPO / "public" / "sfx" / f"{f}.wav", out / "assets" / f"{f}.wav")

    sfx, js, html = [], [], []
    hook = spec["hook"]
    hook_end = at(hook["until"])
    hb = at(hook["b_at"]) if hook.get("b_at") else None
    qa, qb = ("“", "”") if variant == "tt" else ("", "")
    html.append(f'<div id="hook" class="slot clip" data-start="0" data-duration="{hook_end:.2f}" data-track-index="3" style="top:230px">'
                f'<div id="hooki" class="card" style="padding:30px 46px"><div class="hookA">{qa}{hook["a"]}</div><div id="hookB" class="hookB">{hook["b"]}{qb}</div></div></div>')
    js.append('tl.set("#hookB", {rotation:-2}, 0);')
    if hb:
        js.append(f'tl.fromTo("#hookB", {{scale:1}}, {{scale:1.12, duration:0.12, ease:"power3.out", yoyo:true, repeat:1}}, {hb:.2f});')
        sfx.append((hb, "pop", 0.5))
    js.append(f'OUT("#hooki", {hook_end:.2f});')

    cta_t = at(spec["cta"]["at"])
    starts = [at(c["at"]) for c in spec["cards"]]
    for k, c in enumerate(spec["cards"]):
        st = starts[k]
        en = (starts[k + 1] if k + 1 < len(starts) else cta_t) - 0.02
        cid = f"k{k}"
        html.append(f'<div id="{cid}" class="slot clip" data-start="{st:.2f}" data-duration="{en - st:.2f}" data-track-index="{3 + k % 2}"><div id="{cid}i" class="card">{c["html"]}</div></div>')
        js.append(f'IN("#{cid}i", {st:.2f}); OUT("#{cid}i", {en:.2f});')
        sfx.append((st, "swipe" if k % 2 == 0 else "whoosh", 0.42))
        for el, ph in c.get("pops", []):
            t = at(ph, st - 0.05)
            js.append(f'POP("#{el}", {t:.2f});')
            sfx.append((t, "pop", 0.5))
        for el, ph in c.get("lines", []):
            t = at(ph, st - 0.05)
            js.append(f'tl.fromTo("#{el}", {{opacity:0, x:-40}}, {{opacity:1, x:0, duration:0.3, ease:"expo.out"}}, {t:.2f});')
            sfx.append((t, "tick", 0.55))
        for el, ph, rot in c.get("stamps", []):
            t = at(ph, st - 0.05)
            js.append(f'STAMP("#{el}", {t:.2f}, {rot});')
            sfx.append((t, "stamp", 0.35))
        for el, ph in c.get("strikes", []):
            t = at(ph, st - 0.05)
            js.append(f'tl.fromTo("#{el}", {{scaleX:0}}, {{scaleX:1, duration:0.24, ease:"power2.out"}}, {t:.2f});')
            sfx.append((t, "scribble", 0.45))

    # photo cutaways: full frame, slow push-in, voice keeps playing underneath
    for i, ph in enumerate(spec.get("photos", [])):
        st, en = at(ph["at"]), at(ph["until"])
        name = f"photo{i}.jpg"
        shutil.copy(proj / ph["src"], out / "assets" / name)
        html.append(f'<div id="ph{i}" class="clip photo" data-start="{st:.2f}" data-duration="{en - st:.2f}" data-track-index="6"><img id="ph{i}i" src="assets/{name}" /></div>')
        js.append(f'tl.fromTo("#ph{i}i", {{opacity:0, scale:1.12}}, {{opacity:1, scale:1.04, duration:0.25, ease:"power3.out"}}, {st:.2f});')
        js.append(f'tl.to("#ph{i}i", {{scale:1.14, duration:{max(0.3, en - st - 0.25):.2f}, ease:"none"}}, {st + 0.25:.2f});')
        js.append(f'tl.to("#ph{i}i", {{opacity:0, duration:0.15, ease:"power2.in"}}, {en - 0.15:.2f});')
        sfx.append((st, "whoosh", 0.4))

    cta = spec["cta"]
    html.append(f'<div id="cta" class="slot clip" data-start="{cta_t:.2f}" data-duration="{end - cta_t:.2f}" data-track-index="5" style="top:262px">'
                f'<div id="ctai" class="cta"><div class="big">{cta["big"]}</div><div class="sub">{cta["sub"]}</div><div class="hd">@coachnas.pharmacist</div></div></div>')
    js.append(f'tl.fromTo("#ctai", {{opacity:0, scale:0.85, y:30}}, {{opacity:1, scale:1, y:0, duration:0.45, ease:"back.out(1.4)"}}, {cta_t:.2f});')
    sfx.append((cta_t, "pop", 0.5))

    # camera punch-ins, back out after 1.3 s
    js.append('tl.set("#cam", {transformOrigin:"50% 35%", scale:1}, 0);')
    for ph in spec.get("punch", []):
        t = at(ph)
        js.append(f'tl.to("#cam", {{scale:1.09, duration:0.14, ease:"power4.out"}}, {t:.2f}); tl.to("#cam", {{scale:1, duration:0.3, ease:"power2.inOut"}}, {t + 1.3:.2f});')

    # captions: 3-word groups, none while the hook card is up
    emph = set(spec.get("emphasis", []))
    cw = [w for w in words if w[0] >= hook_end - 0.05]
    groups, cur = [], []
    for i, w in enumerate(cw):
        cur.append(w)
        n = cw[i + 1] if i + 1 < len(cw) else None
        if not n or len(cur) >= 3 or w[2][-1] in ".,?!" or n[0] - w[1] >= 0.15:
            groups.append(cur)
            cur = []
    for gi, g in enumerate(groups):
        st = max(0.0, g[0][0] - 0.05)
        nxt = groups[gi + 1][0][0] - 0.05 if gi + 1 < len(groups) else talk
        en = min(nxt, g[-1][1] + 0.4, talk)
        spans = []
        for wi, w in enumerate(g):
            cls = "w hl" if norm(w[2]) in emph else "w"
            spans.append(f'<span id="c{gi}w{wi}" class="{cls}">{escape(w[2])}</span>')
            js.append(f'tl.fromTo("#c{gi}w{wi}", {{opacity:0.4}}, {{opacity:1, duration:0.08}}, {w[0]:.2f});')
        html.append(f'<div id="cap{gi}" class="clip cap" data-start="{st:.2f}" data-duration="{max(0.1, en - st):.2f}" data-track-index="9"><div id="cap{gi}i" class="capin">{" ".join(spans)}</div></div>')
        js.append(f'tl.fromTo("#cap{gi}i", {{y:16, opacity:0}}, {{y:0, opacity:1, duration:0.14, ease:"power3.out"}}, {st:.2f});')

    sfx_html = "\n".join(
        f'<audio id="sfx{i}" class="clip" src="assets/{f}.wav" data-start="{max(0, t + F - PEAK[f]):.3f}" data-duration="{LEN[f]}" data-volume="{v}" data-track-index="{20 + i % 4}"></audio>'
        for i, (t, f, v) in enumerate(sorted(sfx)))
    chip = f'<div id="chip" class="chip clip" data-start="{hook_end:.2f}" data-duration="{cta_t - hook_end:.2f}" data-track-index="2"><span id="chipi">{spec["series"]}</span></div>'
    css = BASE_CSS + (TT_CSS if variant == "tt" else "")
    doc = f"""<!doctype html>
<html lang="ms" data-resolution="portrait">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<script src="assets/gsap.min.js"></script>
<style>{css}</style></head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{end:.2f}" data-width="1080" data-height="1920">
<div id="cam">
<video id="talk" class="clip" src="assets/talk.mp4" data-start="0" data-duration="{talk - 0.04:.2f}" data-track-index="0" playsinline data-has-audio="true" data-volume="1"></video>
<img id="hold" class="clip" src="assets/last.jpg" data-start="{talk - 0.04:.2f}" data-duration="{end - talk + 0.04:.2f}" data-track-index="1" />
</div>
<div id="prog"></div>
{chip}
{chr(10).join(html)}
{sfx_html}
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
const IN = (sel, t) => tl.fromTo(sel, {{opacity:0, y:-30, scale:0.94, filter:"blur(8px)"}}, {{opacity:1, y:0, scale:1, filter:"blur(0px)", duration:0.4, ease:"expo.out"}}, t);
const OUT = (sel, t) => tl.to(sel, {{opacity:0, y:-16, filter:"blur(6px)", duration:0.16, ease:"power3.in"}}, t - 0.17);
const POP = (sel, t, s=1.6) => tl.fromTo(sel, {{opacity:0, scale:s}}, {{opacity:1, scale:1, duration:0.26, ease:"back.out(1.6)"}}, t);
const STAMP = (sel, t, r) => tl.fromTo(sel, {{opacity:0, scale:2.4, rotation:r*1.6}}, {{opacity:1, scale:1, rotation:r, duration:0.2, ease:"power4.out"}}, t);
tl.fromTo("#prog", {{scaleX:0, transformOrigin:"0 50%"}}, {{scaleX:1, duration:{end:.2f}, ease:"none"}}, 0);
tl.fromTo("#chipi", {{opacity:0, y:-12}}, {{opacity:1, y:0, duration:0.3, ease:"expo.out"}}, {hook_end:.2f});
{chr(10).join(js)}
window.__timelines = window.__timelines || {{}};
window.__timelines["main"] = tl;
</script>
</body></html>
"""
    (out / "index.html").write_text(doc)
    print(f"{out / 'index.html'}: {end:.1f}s, {len(spec['cards'])} cards, {len(groups)} caption groups, {len(sfx)} sfx")


if __name__ == "__main__":
    main(Path(sys.argv[1]), sys.argv[2])
