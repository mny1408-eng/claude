"""Text-over-footage Reel: Coach Nas's own clip with timed on-screen text,
then an end card (e.g. a transformation photo) in the brand frame.

Usage: python3 render_broll_reel.py spec.json out.mp4
"""
import json
import os
import subprocess
import sys
import tempfile

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFilter

from music import make_bed
from render_reel import BAR, FPS, GOLD, H, IVORY, LOGO, W, ease, font, wrap

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
HEAVY = os.path.join(FONT_DIR, "plus-jakarta-sans-800-normal.ttf")
BOLD = os.path.join(FONT_DIR, "plus-jakarta-sans-700-normal.ttf")
ITAL = os.path.join(FONT_DIR, "plus-jakarta-sans-500-italic.ttf")
PAGE = (249, 246, 240)
LEFT, RIGHT = 80, W - 170


def shadowed_text(layer, xy, text, fnt, fill, alpha):
    """Text with a soft dark shadow so it reads over bright footage."""
    sh = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).text((xy[0] + 3, xy[1] + 4), text, font=fnt, fill=(0, 0, 0, int(150 * alpha)))
    layer.alpha_composite(sh.filter(ImageFilter.GaussianBlur(6)))
    ImageDraw.Draw(layer).text(xy, text, font=fnt, fill=fill + (int(255 * alpha),))


def overlay_for(seg, t, cache):
    key = (id(seg), round(min(1.0, (t - seg["start"]) / 0.3), 2))
    if key in cache:
        return cache[key]
    p = ease((t - seg["start"]) / 0.3)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    probe = ImageDraw.Draw(layer)
    y = seg.get("y", 260) + (1 - p) * 30
    if seg.get("number"):
        nf = font(HEAVY, 64)
        ImageDraw.Draw(layer).ellipse([LEFT, y, LEFT + 104, y + 104], fill=BAR + (int(240 * p),))
        num = str(seg["number"])
        ImageDraw.Draw(layer).text((LEFT + 52 - probe.textlength(num, font=nf) / 2, y + 12), num, font=nf, fill=GOLD + (int(255 * p),))
        y += 130
    for ln in seg["lines"]:
        f = font({"heavy": HEAVY, "bold": BOLD, "italic": ITAL}[ln.get("weight", "heavy")], ln.get("size", 80))
        col = tuple(ln.get("color", IVORY))
        for row in wrap(probe, ln["text"], f, RIGHT - LEFT):
            shadowed_text(layer, (LEFT, y), row, f, col, p)
            y += f.size * 1.16
        y += ln.get("gap", 6)
    cache[key] = layer
    return layer


def end_card(spec):
    ec = spec["end_card"]
    img = Image.new("RGBA", (W, H), PAGE + (255,))
    d = ImageDraw.Draw(img)
    photo = Image.open(os.path.join(spec["_base"], ec["image"])).convert("RGB")
    photo.thumbnail((W - 120, 960), Image.LANCZOS)
    px, py = (W - photo.width) // 2, 330
    shadow = Image.new("RGBA", (photo.width + 60, photo.height + 60), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle([30, 36, photo.width + 30, photo.height + 36], fill=(40, 30, 20, 90))
    img.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(14)), (px - 30, py - 30))
    img.paste(photo, (px, py))
    lf = font(HEAVY, 40)
    for label, cx in zip(ec.get("labels", []), (px + photo.width // 4, px + 3 * photo.width // 4)):
        tw = d.textlength(label, font=lf)
        d.rounded_rectangle([cx - tw / 2 - 22, py + photo.height - 80, cx + tw / 2 + 22, py + photo.height - 22], radius=10, fill=BAR)
        d.text((cx - tw / 2, py + photo.height - 76), label, font=lf, fill=IVORY)
    tf = font(HEAVY, 64)
    y = 170
    for row in wrap(d, ec.get("title", ""), tf, W - 160):
        d.text((80, y), row, font=tf, fill=BAR)
        y += 74
    sf = font(ITAL, 44)
    y = py + photo.height + 50
    for row in wrap(d, ec.get("sub", ""), sf, W - 160):
        d.text((80, y), row, font=sf, fill=(77, 107, 96))
        y += 56
    # footer: WDT logo + handle, same as other renderers
    d.rectangle([0, 1450, W, 1570], fill=BAR)
    x = 80
    if os.path.exists(LOGO):
        logo = Image.open(LOGO).convert("RGBA")
        logo.thumbnail((200, 90))
        img.alpha_composite(logo, (x, 1450 + (120 - logo.height) // 2))
        x += logo.width + 30
    d.text((x, 1490), spec.get("footer", "@coachnas.pharmacist"), font=font(BOLD, 34), fill=IVORY)
    return img


def photo_sprite(po, base):
    """Photo card with white border, drop shadow and optional DULU/SEKARANG-style labels."""
    photo = Image.open(os.path.join(base, po["image"])).convert("RGB")
    photo.thumbnail((po.get("w", 820), po.get("w", 820)), Image.LANCZOS)
    b = 14
    card = Image.new("RGBA", (photo.width + 2 * b, photo.height + 2 * b), (255, 255, 255, 255))
    card.paste(photo, (b, b))
    d = ImageDraw.Draw(card)
    lf = font(HEAVY, 36)
    for label, cx in zip(po.get("labels", []), (b + photo.width // 4, b + 3 * photo.width // 4)):
        tw = d.textlength(label, font=lf)
        y = b + photo.height - 70
        d.rounded_rectangle([cx - tw / 2 - 20, y, cx + tw / 2 + 20, y + 52], radius=10, fill=BAR)
        d.text((cx - tw / 2, y + 3), label, font=lf, fill=IVORY)
    pad = 40
    out = Image.new("RGBA", (card.width + 2 * pad, card.height + 2 * pad), (0, 0, 0, 0))
    sh = Image.new("RGBA", card.size, (0, 0, 0, 120))
    out.alpha_composite(sh, (pad + 8, pad + 14))
    out = out.filter(ImageFilter.GaussianBlur(14))
    out.alpha_composite(card, (pad, pad))
    return out.rotate(po.get("rot", -2), expand=True, resample=Image.BICUBIC)


def draw_photo(img, spr, po, t):
    dt = t - po["start"]
    if dt < 0 or t >= po.get("end", 1e9):
        return
    p = ease(dt / 0.35)
    s = spr.resize((max(1, int(spr.width * (0.85 + 0.15 * p))), max(1, int(spr.height * (0.85 + 0.15 * p)))), Image.BILINEAR)
    if p < 1:
        s.putalpha(s.split()[3].point(lambda a: int(a * p)))
    img.alpha_composite(s, (int(W / 2 - 45 - s.width / 2), int(po.get("y", 980) - s.height / 2 + (1 - p) * 40)))


def watermark(spec):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    if os.path.exists(LOGO):
        logo = Image.open(LOGO).convert("RGBA")
        logo.thumbnail((150, 70))
        layer.alpha_composite(logo, (LEFT, 1440))
    shadowed_text(layer, (LEFT + 170, 1458), spec.get("footer", "@coachnas.pharmacist"), font(BOLD, 32), IVORY, 0.9)
    return layer


def main(spec_path, out_path):
    with open(spec_path, encoding="utf-8") as fh:
        spec = json.load(fh)
    spec["_base"] = os.path.dirname(os.path.abspath(spec_path))
    video = os.path.join(spec["_base"], spec["video"])
    probe = subprocess.run([FFMPEG, "-hide_banner", "-i", video], capture_output=True, text=True).stderr
    import re
    hh, mm, ss = re.search(r"Duration: (\d+):(\d+):([\d.]+)", probe).groups()
    vdur = int(hh) * 3600 + int(mm) * 60 + float(ss)
    end_dur = spec["end_card"]["duration"] if spec.get("end_card") else 0.0
    total = vdur + end_dur

    dec = subprocess.Popen(
        [FFMPEG, "-loglevel", "error", "-i", video, "-vf",
         f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS}",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        stdout=subprocess.PIPE,
    )
    fade = f"afade=t=out:st={total - 1.5:.2f}:d=1.5"
    if spec.get("music", "auto") == "none" and not end_dur:
        bed = None
        audio_inputs = ["-i", video]
        filt = f"[1:a]aresample=44100,{fade}[aout]"
    elif spec.get("music", "auto") == "none":
        # The clip already carries its own music: keep it at full level and, to cover
        # the end card, crossfade the clip's audio back into its own start.
        bed = None
        audio_inputs = ["-i", video, "-i", video]
        filt = (f"[1:a]aresample=44100[a1];[2:a]aresample=44100[a2];[a1][a2]acrossfade=d=1[x];"
                f"[x]atrim=0:{total:.2f},{fade}[aout]")
    else:
        bed = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
        make_bed(total, bed, seed=sum(map(ord, spec.get("date", ""))))
        audio_inputs = ["-i", video, "-i", bed]
        filt = (
            f"[1:a]volume={spec.get('clip_gain', 0.35)},aresample=44100,apad[c];"
            f"[2:a]volume={spec.get('music_gain', 0.9)}[m];"
            f"[c][m]amix=inputs=2:duration=shortest:normalize=0,{fade}[aout]"
        )
    enc = subprocess.Popen(
        [FFMPEG, "-y", "-loglevel", "error",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
         *audio_inputs, "-filter_complex", filt, "-map", "0:v", "-map", "[aout]", "-t", f"{total:.2f}",
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "22",
         "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out_path],
        stdin=subprocess.PIPE,
    )
    wm, cache, frame_bytes, f = watermark(spec), {}, W * H * 3, 0
    po = spec.get("photo_overlay")
    po_spr = photo_sprite(po, spec["_base"]) if po else None
    while True:
        raw = dec.stdout.read(frame_bytes)
        if len(raw) < frame_bytes:
            break
        t = f / FPS
        img = Image.frombytes("RGB", (W, H), raw).convert("RGBA")
        # gentle top gradient keeps text readable over bright sky
        if not hasattr(main, "_grad"):
            g = Image.new("L", (1, H))
            for yy in range(H):
                g.putpixel((0, yy), int(120 * max(0.0, 1 - yy / 900)))
            main._grad = Image.merge("RGBA", [Image.new("L", (W, H), 0)] * 3 + [g.resize((W, H))])
        img.alpha_composite(main._grad)
        for seg in spec["segments"]:
            if seg["start"] <= t < seg["end"]:
                img.alpha_composite(overlay_for(seg, t, cache))
        if po:
            draw_photo(img, po_spr, po, t)
        img.alpha_composite(wm)
        enc.stdin.write(img.convert("RGB").tobytes())
        f += 1
    dec.wait()
    card = end_card(spec) if end_dur else None
    last = img
    for k in range(int(end_dur * FPS)):
        p = ease(k / (0.4 * FPS))
        frame = Image.blend(last, card, p) if p < 1 else card
        enc.stdin.write(frame.convert("RGB").tobytes())
    enc.stdin.close()
    code = enc.wait()
    if bed:
        os.unlink(bed)
    if code != 0:
        sys.exit("ffmpeg failed")
    print(f"video {vdur:.2f}s + end card {end_dur}s = {total:.2f}s")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
