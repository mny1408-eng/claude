"""Build a HyperFrames reel (IG or TikTok layout) from a cut talking head and a card spec.

Usage: hf_reel.py <proj> <ig|tt>   -> writes <proj>/hf-<variant>/index.html (+ assets), ready for `npx hyperframes render`.

<proj>/spec.json:
  series     (unused: the chip sat in IG's top danger zone)
  eye_y      optional: eye level (px) in talk.mp4; the picture is reframed so the eyes sit on the upper third (y 640)
  hook       {"a": text, "b": highlighted words (one short pill at the top), "b_at": phrase where line 2 pulses, "until": phrase that ends the hook}
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
.hookwrap { top:190px; }
.card { position:relative; background:var(--glass); color:#fff; border-radius:34px; padding:26px 40px; text-align:center; box-shadow:0 14px 40px rgba(0,0,0,.35); max-width:960px; }
.t1 { font-size:54px; font-weight:800; line-height:1.15; }
.t2 { font-size:42px; font-weight:700; line-height:1.2; margin-top:10px; color:#fff; }
.sm { font-size:28px; font-weight:700; letter-spacing:2px; color:var(--gold); margin-bottom:8px; }
.hl { background:var(--gold); color:var(--ink); border-radius:12px; padding:0 14px; }
.num { display:inline-flex; width:58px; height:58px; border-radius:50%; background:var(--gold); color:var(--ink); font-size:34px; font-weight:800; align-items:center; justify-content:center; margin-right:14px; vertical-align:middle; }
.hookpill { background:var(--ink); color:#fff; border:3px solid var(--gold); border-radius:999px; padding:10px 30px; font-size:40px; font-weight:800; line-height:1.25; text-align:center; max-width:860px; box-shadow:0 10px 30px rgba(0,0,0,.35); }
.hookB { display:inline-block; color:var(--ink); background:var(--gold); border-radius:999px; padding:0 16px; }
.stamp { position:absolute; font-size:56px; font-weight:800; color:var(--marker); border:7px solid var(--marker); border-radius:16px; padding:2px 22px; background:rgba(247,245,237,.95); letter-spacing:3px; white-space:nowrap; }
.chips { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:14px; }
.pill { background:var(--gold); color:var(--ink); font-size:38px; font-weight:800; border-radius:999px; padding:6px 24px; white-space:nowrap; }
.strike { position:absolute; left:-8px; right:-8px; top:52%; height:9px; background:var(--marker); border-radius:6px; transform-origin:0 50%; }
.note { font-size:24px; font-weight:600; color:var(--gold); margin-top:12px; opacity:.9; }
.photo { position:absolute; inset:0; z-index:22; overflow:hidden; }
.photo img { position:absolute; left:0; top:0; width:1080px; height:1920px; object-fit:cover; }
.polaroid { background:#fff; padding:14px 14px 10px; border-radius:6px; box-shadow:0 18px 40px rgba(0,0,0,.4); }
.polaroid img { width:100%; object-fit:cover; display:block; border-radius:3px; }
.pcap { font-size:28px; font-weight:700; color:var(--ink); text-align:center; padding-top:6px; }
.sheet { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
.ftitle { font-size:84px; font-weight:800; color:var(--paper); text-align:center; line-height:1.1; padding:0 80px; }
.ftitle .hl { color:var(--ink); }
.plab { position:absolute; font-size:40px; font-weight:800; color:#173C30; text-align:center; line-height:1.05; }
.plab span { font-size:64px; }
.doc-desat { position:absolute; inset:0; background:#808080; mix-blend-mode:saturation; opacity:.6; }
.doc-warm { position:absolute; inset:0; background:rgba(120,80,30,.08); mix-blend-mode:multiply; }
.doc-vig { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 50%, rgba(0,0,0,.45) 100%); }
.doc-grain { position:absolute; inset:0; opacity:.16; mix-blend-mode:overlay; background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>"); }
.doc-bar { position:absolute; left:0; right:0; height:220px; background:#0b0b0b; display:flex; align-items:flex-end; justify-content:center; padding-bottom:30px; }
.doc-label { color:#d9cfb8; font-size:26px; font-weight:600; letter-spacing:8px; text-transform:uppercase; }
.doc-quote { position:absolute; left:80px; right:80px; top:1230px; text-align:center; font-family:'Playfair Display', serif; font-style:italic; color:#fff; font-size:64px; line-height:1.25; text-shadow:0 3px 18px rgba(0,0,0,.7); }
.doc-q2 { margin-top:14px; color:#EAD49C; }
.lower3 { border-left:8px solid var(--gold); background:rgba(11,11,11,.72); padding:14px 26px 14px 22px; }
.l3n { color:#fff; font-size:40px; font-weight:800; letter-spacing:2px; } .l3r { color:#EAD49C; font-size:28px; font-weight:600; }
.gdot { position:absolute; top:782px; width:52px; height:52px; border-radius:50%; border:6px solid #fff; box-shadow:0 4px 12px rgba(0,0,0,.25); }
.glab { position:absolute; top:860px; width:220px; text-align:center; font-size:34px; font-weight:800; color:#173C30; line-height:1.15; }
.gtag { position:absolute; font-size:30px; font-weight:800; border-radius:999px; padding:8px 22px; }
.rolec { position:absolute; top:560px; width:420px; height:380px; border-radius:36px; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 20px 50px rgba(0,0,0,.4); }
.ri { font-size:110px; line-height:1.1; } .rn { font-size:46px; font-weight:800; margin-top:8px; } .rs { font-size:32px; font-weight:700; margin-top:4px; }
.endcard { position:absolute; inset:0; background:#F7F4EC; }
.ec-photo { position:absolute; left:370px; top:190px; width:340px; height:340px; border-radius:50%; object-fit:cover; object-position:50% 20%; border:12px solid #C9A86A; box-sizing:border-box; }
.ec-name { position:absolute; left:0; right:0; top:548px; text-align:center; font-size:84px; font-weight:800; color:#173C30; }
.ec-role { position:absolute; left:0; right:0; top:662px; text-align:center; font-size:38px; font-weight:600; color:#3A3A36; }
.ec-misi { position:absolute; left:310px; right:310px; top:740px; text-align:center; background:#173C30; color:#EAD49C; font-size:40px; font-weight:800; border-radius:999px; padding:14px 0; }
.ec-rows { position:absolute; left:130px; right:130px; top:860px; display:flex; flex-direction:column; gap:22px; }
.ec-row { display:flex; align-items:center; gap:30px; background:#fff; border:3px solid #173C30; border-radius:26px; padding:16px 32px; }
.ec-row.ec-on { background:#173C30; }
.ec-ic { font-size:62px; width:80px; text-align:center; }
.ec-k { font-size:44px; font-weight:800; color:#173C30; } .ec-v { font-size:34px; font-weight:700; color:#173C30; margin-top:2px; }
.ec-on .ec-k { color:#fff; } .ec-on .ec-v { color:#EAD49C; }
.ec-note { position:absolute; left:130px; right:130px; top:1460px; text-align:center; font-size:28px; font-weight:600; color:#7A7A72; }
.ec-handle { position:absolute; left:0; right:0; top:1395px; text-align:center; font-size:40px; font-weight:800; color:#3A3A36; }
.cap { position:absolute; left:90px; right:200px; top:1130px; display:flex; justify-content:center; z-index:25; }
.capin { color:#fff; font-size:78px; font-weight:800; text-align:center; line-height:1.2; letter-spacing:.5px;
  -webkit-text-stroke:12px #10241C; paint-order:stroke fill; text-shadow:0 6px 18px rgba(0,0,0,.45); }
.capin .w { display:inline-block; }
.capin .hl { -webkit-text-stroke:0; text-shadow:none; color:var(--ink); background:var(--gold); border-radius:16px; padding:0 16px; box-shadow:0 6px 18px rgba(0,0,0,.35); }
.cta { background:var(--paper); color:var(--ink); border-radius:34px; padding:28px 44px; text-align:center; border:5px solid var(--gold); box-shadow:0 14px 40px rgba(0,0,0,.35); }
.cta .big { font-size:66px; font-weight:800; }
.cta .sub { font-size:34px; font-weight:600; margin-top:6px; }
.cta .hd { font-size:30px; font-weight:700; color:var(--marker); margin-top:10px; }
"""

COMPACT_CSS = """
.slot { top:228px; }
.card { padding:16px 28px; border-radius:26px; max-width:880px; }
.t1 { font-size:42px; } .t2 { font-size:32px; margin-top:6px; } .sm { font-size:22px; margin-bottom:4px; }
.pill { font-size:30px; padding:4px 18px; } .num { width:46px; height:46px; font-size:26px; }
.stamp { font-size:44px; border-width:5px; }
"""

TT_CSS = """
.chip { display:none; }
.slot { left:70px; right:200px; top:300px; }
.card { background:#fff; color:var(--ink); border:5px solid var(--ink); box-shadow:8px 8px 0 var(--ink); padding:22px 30px; max-width:810px; }
.t1 { font-size:48px; } .t2 { font-size:36px; color:var(--ink); } .sm { color:var(--marker); font-size:26px; } .note { color:var(--marker); }
.pill { font-size:32px; border:3px solid var(--ink); padding:5px 18px; } .num { border:3px solid var(--ink); }
.hookpill { background:#fff; color:var(--ink); border:4px solid var(--ink); } .hookwrap { left:70px; right:200px; top:250px; }
.cap { left:70px; right:200px; top:1180px; }
.capin { font-size:72px; }
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
    doc = spec.get("documentary")
    if doc:
        # documentary hook: letterbox bars, desaturated warm picture, vignette, grain, a quote typed in serif
        d_end = hook_end + 0.35
        html.append(f'<div id="doc" class="clip" data-start="0" data-duration="{d_end:.2f}" data-track-index="3" style="position:absolute; inset:0; z-index:24">'
                    f'<div class="doc-desat"></div><div class="doc-warm"></div><div class="doc-vig"></div><div class="doc-grain"></div>'
                    f'<div id="docT" class="doc-bar" style="top:0"><div id="docL" class="doc-label">{doc.get("label", "")}</div></div>'
                    f'<div id="docB" class="doc-bar" style="bottom:0"></div>'
                    f'<div class="doc-quote"><div id="docQ1">{hook["a"]}</div><div id="docQ2" class="doc-q2">{hook["b"]}</div></div></div>')
        js.append('tl.set(["#docT", "#docB"], {scaleY:1}, 0);')
        js.append('tl.fromTo("#docL", {opacity:0, letterSpacing:"18px"}, {opacity:1, letterSpacing:"8px", duration:1.2, ease:"power2.out"}, 0);')
        js.append('tl.set("#docQ1", {opacity:1}, 0);')
        if hb:
            js.append(f'tl.fromTo("#docQ2", {{opacity:0, y:16, filter:"blur(6px)"}}, {{opacity:1, y:0, filter:"blur(0px)", duration:0.5, ease:"power2.out"}}, {hb:.2f});')
        js.append(f'tl.to(["#docQ1","#docQ2","#docL"], {{opacity:0, duration:0.25}}, {hook_end - 0.2:.2f});')
        js.append(f'tl.to("#docT", {{y:-220, duration:0.35, ease:"power3.in"}}, {hook_end - 0.1:.2f});')
        js.append(f'tl.to("#docB", {{y:220, duration:0.35, ease:"power3.in"}}, {hook_end - 0.1:.2f});')
        js.append(f'tl.to("#doc .doc-desat, #doc .doc-warm, #doc .doc-vig, #doc .doc-grain", {{opacity:0, duration:0.35}}, {hook_end - 0.1:.2f});')
        for lt in ([doc["lower"]] if doc.get("lower") else []):
            ls, le = at(lt["at"]), at(lt["until"])
            html.append(f'<div id="ldoc" class="clip" data-start="{ls:.2f}" data-duration="{le - ls:.2f}" data-track-index="4" style="position:absolute; left:60px; top:1330px; z-index:24">'
                        f'<div id="ldi" class="lower3"><div class="l3n">{lt["name"]}</div><div class="l3r">{lt["role"]}</div></div></div>')
            js.append(f'tl.fromTo("#ldi", {{opacity:0, x:-50}}, {{opacity:1, x:0, duration:0.45, ease:"expo.out"}}, {ls:.2f}); tl.to("#ldi", {{opacity:0, duration:0.2}}, {le - 0.2:.2f});')
            sfx.append((ls, "tick", 0.5))
    else:
        html.append(f'<div id="hook" class="slot hookwrap clip" data-start="0" data-duration="{hook_end:.2f}" data-track-index="3">'
                    f'<div id="hooki" class="hookpill">{qa}{hook["a"]} <span id="hookB" class="hookB">{hook["b"]}{qb}</span></div></div>')
        js.append('tl.fromTo("#hooki", {opacity:0, y:-20}, {opacity:1, y:0, duration:0.35, ease:"expo.out"}, 0);')
        if hb:
            js.append(f'tl.fromTo("#hookB", {{scale:1}}, {{scale:1.1, duration:0.12, ease:"power3.out", yoyo:true, repeat:1}}, {hb:.2f});')
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

    # stickers: a tilted photo card popping in beside the speaker
    for i, sk in enumerate(spec.get("stickers", [])):
        st, en = at(sk["at"]), at(sk["until"])
        name = f"sticker{i}.jpg"
        shutil.copy(proj / sk["src"], out / "assets" / name)
        x, y, w = sk.get("x", 640), sk.get("y", 720), sk.get("w", 360)
        x = min(x, 1080 - 200 - w)  # keep clear of the right-hand buttons (IG and TikTok)
        if variant == "tt":
            x, y = sk.get("tt_x", x), sk.get("tt_y", y)
        html.append(f'<div id="sk{i}" class="clip" data-start="{st:.2f}" data-duration="{en - st:.2f}" data-track-index="7" style="position:absolute; left:{x}px; top:{y}px; width:{w}px; z-index:21">'
                    f'<div id="sk{i}i" class="polaroid"><img src="assets/{name}" style="height:{int(w * sk.get("ratio", 1.15))}px" /><div class="pcap">{sk.get("label", "")}</div></div></div>')
        js.append(f'tl.fromTo("#sk{i}i", {{opacity:0, scale:0.5, rotation:{sk.get("rot", 6) * 3}}}, {{opacity:1, scale:1, rotation:{sk.get("rot", 6)}, duration:0.35, ease:"back.out(1.6)"}}, {st:.2f});')
        js.append(f'tl.to("#sk{i}i", {{opacity:0, scale:0.8, duration:0.15, ease:"power2.in"}}, {en - 0.15:.2f});')
        sfx.append((st, "pop", 0.5))

    # paper flip between the hook and the content: a forest-green sheet flips over the cut and away
    if spec.get("transition"):
        tr = spec["transition"]
        t0 = at(tr["at"]) - 0.25
        hold = tr.get("hold", 0.33)  # how long the title stays readable
        html.append(f'<div id="flip" class="clip" data-start="{t0:.2f}" data-duration="{0.52 + hold:.2f}" data-track-index="8" style="position:absolute; inset:0; z-index:35">'
                    f'<div id="flipg" class="sheet" style="background:var(--gold)"></div>'
                    f'<div id="flipi" class="sheet" style="background:var(--ink)"><div class="ftitle">{tr["title"]}</div></div></div>')
        js.append(f'tl.fromTo("#flipg", {{scaleX:0, transformOrigin:"100% 50%"}}, {{scaleX:1, duration:0.2, ease:"power3.in"}}, {t0:.2f});')
        js.append(f'tl.fromTo("#flipi", {{scaleX:0, transformOrigin:"100% 50%"}}, {{scaleX:1, duration:0.22, ease:"power3.in"}}, {t0 + 0.06:.2f});')
        js.append(f'tl.fromTo("#flipi .ftitle", {{opacity:0, y:20}}, {{opacity:1, y:0, duration:0.15, ease:"power2.out"}}, {t0 + 0.22:.2f});')
        js.append(f'tl.to("#flipi", {{scaleX:0, transformOrigin:"0% 50%", duration:0.22, ease:"power3.out"}}, {t0 + 0.22 + hold:.2f});')
        js.append(f'tl.to("#flipg", {{scaleX:0, transformOrigin:"0% 50%", duration:0.22, ease:"power3.out"}}, {t0 + 0.27 + hold:.2f});')
        sfx.append((t0, "swipe", 0.5))
        sfx.append((t0 + 0.22 + hold, "whoosh", 0.4))

    cta = spec["cta"]
    if cta.get("endcard"):
        # standard end card: ivory sheet, round lab-coat photo in a gold ring, name + title, #MisiFightObesiti, SAVE / SHARE / KOMEN rows
        shutil.copy(Path(__file__).parent / "assets" / "coach-nas.jpg", out / "assets" / "coach-nas.jpg")
        rows = [(None, *r) for r in cta["rows"]] if cta.get("rows") else [("save", "📌", "SAVE", cta["save"]), ("share", "📤", "SHARE", cta["share"]), ("komen", "💬", "KOMEN", cta["komen"])]
        rows_html = "".join(f'<div id="ecr{i}" class="ec-row{" ec-on" if i == 0 else ""}"><div class="ec-ic">{ic}</div><div><div class="ec-k">{k}</div><div class="ec-v">{v}</div></div></div>'
                            for i, (_, ic, k, v) in enumerate(rows))
        html.append(f'<div id="cta" class="clip" data-start="{cta_t:.2f}" data-duration="{end - cta_t:.2f}" data-track-index="5" style="position:absolute; inset:0; z-index:38">'
                    f'<div id="ctai" class="endcard"><img id="ecp" class="ec-photo" src="assets/coach-nas.jpg" />'
                    f'<div id="ecn" class="ec-name">Coach Nas</div><div id="ect" class="ec-role">Clinical Pharmacist &amp; Wellness Coach</div>'
                    f'<div id="ecm" class="ec-misi">#MisiFightObesiti</div><div class="ec-rows">{rows_html}</div>'
                    f'<div id="ech" class="ec-handle">@coachnas.pharmacist</div>' + (f'<div class="ec-note">{cta["note"]}</div>' if cta.get("note") else "") + '</div></div>')
        js.append(f'tl.fromTo("#ctai", {{opacity:0}}, {{opacity:1, duration:0.25, ease:"power2.out"}}, {cta_t:.2f});')
        js.append(f'tl.fromTo("#ecp", {{opacity:0, scale:0.6}}, {{opacity:1, scale:1, duration:0.4, ease:"back.out(1.6)"}}, {cta_t + 0.05:.2f});')
        js.append(f'tl.fromTo(["#ecn","#ect","#ecm"], {{opacity:0, y:20}}, {{opacity:1, y:0, duration:0.3, stagger:0.08, ease:"power3.out"}}, {cta_t + 0.2:.2f});')
        js.append(f'tl.fromTo(["#ecr0","#ecr1","#ecr2","#ech"], {{opacity:0, x:-60}}, {{opacity:1, x:0, duration:0.3, stagger:0.12, ease:"expo.out"}}, {cta_t + 0.4:.2f});')
        sfx.append((cta_t, "swipe", 0.5))
        for i in range(3):
            sfx.append((cta_t + 0.4 + 0.12 * i, "tick", 0.5))
    else:
        html.append(f'<div id="cta" class="slot clip" data-start="{cta_t:.2f}" data-duration="{end - cta_t:.2f}" data-track-index="5" style="top:262px">'
                    f'<div id="ctai" class="cta"><div class="big">{cta["big"]}</div><div class="sub">{cta["sub"]}</div><div class="hd">@coachnas.pharmacist</div></div></div>')
        js.append(f'tl.fromTo("#ctai", {{opacity:0, scale:0.85, y:30}}, {{opacity:1, scale:1, y:0, duration:0.45, ease:"back.out(1.4)"}}, {cta_t:.2f});')
        sfx.append((cta_t, "pop", 0.5))

    # custom overlays (e.g. an animated infographic): html/js with {@phrase} replaced by that phrase's time
    def fill(text: str) -> str:
        text = re.sub(r"\{dur:([^|}]+)\|([^}]+)\}", lambda m: f"{at(m.group(2)) - at(m.group(1)):.2f}", text)  # {dur:a|b} = time(b) - time(a)
        return re.sub(r"\{@([^}]+)\}", lambda m: f"{at(m.group(1)):.2f}", text)
    for c in spec.get("custom", []):
        html.append(fill(c["html"]))
        js.append(fill(c["js"]))
        for ph, name, vol in c.get("sfx", []):
            sfx.append((at(ph), name, vol))

    # camera punch-ins, back out after 1.3 s
    eye = 672.0  # 35 %
    if spec.get("eye_y"):
        ey = float(spec["eye_y"])
        s = min(1.15, max(1.0, 1280 / (1920 - ey)))  # scale from the bottom edge so the eyes land on y 640 with no gap
        eye = 1920 - s * (1920 - ey)
        js.append(f'tl.set("#frame", {{transformOrigin:"50% 100%", scale:{s:.3f}}}, 0);')
    js.append(f'tl.set("#cam", {{transformOrigin:"50% {eye:.0f}px", scale:1}}, 0);')
    for ph in spec.get("punch", []):
        t = at(ph)
        js.append(f'tl.to("#cam", {{scale:1.09, duration:0.14, ease:"power4.out"}}, {t:.2f}); tl.to("#cam", {{scale:1, duration:0.3, ease:"power2.inOut"}}, {t + 1.3:.2f});')

    # captions: 1-2 word groups at chest level; the small hook pill leaves room for them, the documentary quote does not
    emph = set(spec.get("emphasis", []))
    cw = [w for w in words if not doc or w[0] >= hook_end - 0.05]
    groups, cur = [], []
    for i, w in enumerate(cw):
        cur.append(w)
        n = cw[i + 1] if i + 1 < len(cw) else None
        if not n or len(cur) >= 2 or len(w[2]) + len(n[2]) > 13 or w[2][-1] in ".,?!" or n[0] - w[1] >= 0.15:
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
            if cls == "w hl":  # keyword pill pops in when it is said
                js.append(f'tl.fromTo("#c{gi}w{wi}", {{opacity:0, scale:0.7}}, {{opacity:1, scale:1, duration:0.16, ease:"back.out(2)"}}, {w[0]:.2f});')
            else:
                js.append(f'tl.fromTo("#c{gi}w{wi}", {{opacity:0.45}}, {{opacity:1, duration:0.08}}, {w[0]:.2f});')
        html.append(f'<div id="cap{gi}" class="clip cap" data-start="{st:.2f}" data-duration="{max(0.1, en - st):.2f}" data-track-index="9"><div id="cap{gi}i" class="capin">{" ".join(spans)}</div></div>')
        js.append(f'tl.fromTo("#cap{gi}i", {{y:16, opacity:0}}, {{y:0, opacity:1, duration:0.14, ease:"power3.out"}}, {st:.2f});')

    sfx_html = "\n".join(
        f'<audio id="sfx{i}" class="clip" src="assets/{f}.wav" data-start="{max(0, t + F - PEAK[f]):.3f}" data-duration="{LEN[f]}" data-volume="{v}" data-track-index="{20 + i % 4}"></audio>'
        for i, (t, f, v) in enumerate(sorted(sfx)))
    css = BASE_CSS + (COMPACT_CSS if spec.get("compact", True) else "") + (TT_CSS if variant == "tt" else "")
    doc = f"""<!doctype html>
<html lang="ms" data-resolution="portrait">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<script src="assets/gsap.min.js"></script>
<style>{css}</style></head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{end:.2f}" data-width="1080" data-height="1920">
<div id="cam"><div id="frame" style="position:absolute; inset:0">
<video id="talk" class="clip" src="assets/talk.mp4" data-start="0" data-duration="{talk - 0.04:.2f}" data-track-index="0" playsinline data-has-audio="true" data-volume="1"></video>
<img id="hold" class="clip" src="assets/last.jpg" data-start="{talk - 0.04:.2f}" data-duration="{end - talk + 0.04:.2f}" data-track-index="1" />
</div></div>
<div id="prog"></div>
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
