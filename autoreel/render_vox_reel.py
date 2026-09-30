"""Vox-style explainer Reel: paper collage boards timed to Coach Nas's voice.

Each script line gets a board of paper cutouts (torn clippings, sticky notes,
quote cards), gold marker highlights, rubber stamps, sticker icons and
hand-drawn arrows / strike-throughs, with a slow camera push and a pan between
boards. Brand frame stays fixed on top: kicker, date, green footer bar + handle.

The voice is edited first (cuts + shortened pauses, see voice_edit.py); each
line's "at" is its start time in the RAW recording.

Usage: python3 render_vox_reel.py spec.json out.mp4
"""
import json
import math
import os
import random
import subprocess
import sys
import tempfile

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

from music import make_bed
from render_reel import BAR, FPS, GOLD, GOLD_TEXT, GREEN, H, IVORY, SAFE_LEFT, SAFE_TOP, W, base_frame, ease, font, wrap
from voice_edit import edit_voice, raw_to_edited

FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
WEIGHTS = {
    "heavy": os.path.join(FONT_DIR, "plus-jakarta-sans-800-normal.ttf"),
    "bold": os.path.join(FONT_DIR, "plus-jakarta-sans-700-normal.ttf"),
    "medium": os.path.join(FONT_DIR, "plus-jakarta-sans-500-normal.ttf"),
    "italic": os.path.join(FONT_DIR, "plus-jakarta-sans-500-italic.ttf"),
}
PAPER = (239, 233, 219)
CARD = (251, 248, 242)
STICKY = (243, 227, 176)
MARKER = (228, 196, 110)
INK = (35, 43, 38)
MUTED = (96, 108, 100)
CAM_CENTER = (500, 860)

rng = random.Random(7)


# ---------- sprites ----------

def with_shadow(sprite, offset=(10, 14), blur=14, strength=90):
    pad = blur * 3
    out = Image.new("RGBA", (sprite.width + pad * 2, sprite.height + pad * 2), (0, 0, 0, 0))
    alpha = sprite.split()[3]
    sh = Image.new("RGBA", sprite.size, (40, 30, 20, 0))
    sh.putalpha(alpha.point(lambda a: a * strength // 255))
    out.alpha_composite(sh, (pad + offset[0], pad + offset[1]))
    out = out.filter(ImageFilter.GaussianBlur(blur))
    out.alpha_composite(sprite, (pad, pad))
    return out


def torn_mask(w, h, torn=True, seed=0):
    r = random.Random(seed)
    m = Image.new("L", (w, h), 0)
    pts = []
    step = 14
    for x in range(0, w + step, step):
        pts.append((min(x, w), r.randint(0, 9) if torn else 0))
    for y in range(0, h + step, step):
        pts.append((w - (r.randint(0, 3) if torn else 0), min(y, h)))
    for x in range(w, -step, -step):
        pts.append((max(x, 0), h - (r.randint(0, 9) if torn else 0)))
    for y in range(h, -step, -step):
        pts.append(((r.randint(0, 3) if torn else 0), max(y, 0)))
    ImageDraw.Draw(m).polygon(pts, fill=255)
    return m


def layout_blocks(blocks, width):
    """Wrap text blocks; return drawable lines with fonts, colours and highlight words."""
    probe = ImageDraw.Draw(Image.new("L", (1, 1)))
    lines, y = [], 0
    for b in blocks:
        f = font(WEIGHTS[b.get("weight", "bold")], b.get("size", 60))
        col = tuple(b["color"]) if "color" in b else None
        hl = {w.strip(".,!?:;“”‘’").lower() for w in b.get("highlight", [])}
        for ln in wrap(probe, b["text"], f, width):
            lines.append((ln, f, y, col, hl))
            y += int(f.size * 1.22)
        y += b.get("gap", 14)
    return lines, y


def card_sprite(el, progress):
    """Paper card with text; `progress` 0..1 animates the marker behind highlight words."""
    style = el.get("style", "clip")
    w = el.get("w", 800)
    padx, pady = 56, 50
    top = 118 if style == "quote" else pady
    lines, text_h = layout_blocks(el["blocks"], w - 2 * padx)
    h = text_h + top + pady
    bg = {"clip": CARD, "quote": CARD, "sticky": STICKY, "dark": BAR}[style]
    default_ink = IVORY if style == "dark" else INK
    img = Image.new("RGBA", (w, h), bg + (255,))
    grain = Image.effect_noise((w, h), 18).convert("L").point(lambda v: 128 + (v - 128) // 3)
    img = Image.composite(img, Image.new("RGBA", (w, h), tuple(max(0, c - 10) for c in bg) + (255,)), grain)
    d = ImageDraw.Draw(img)
    if style == "quote":
        d.text((padx - 20, 4), "“", font=font(WEIGHTS["heavy"], 150), fill=GOLD)
    # marker pass (behind text)
    for ln, f, y, col, hl in lines:
        x = padx
        space = d.textlength(" ", font=f)
        for word in ln.split():
            wl = d.textlength(word, font=f)
            if word.strip(".,!?:;“”‘’").lower() in hl and progress > 0:
                ty = top + y + f.size * 0.18
                d.rounded_rectangle([x - 8, ty, x - 8 + (wl + 16) * progress, ty + f.size * 0.95], radius=6,
                                    fill=MARKER if style != "dark" else GOLD)
            x += wl + space
    for ln, f, y, col, hl in lines:
        x = padx
        space = d.textlength(" ", font=f)
        for word in ln.split():
            marked = progress > 0.5 and word.strip(".,!?:;\u201c\u201d\u2018\u2019").lower() in hl
            # on dark cards a highlighted word flips to green ink so it reads on the gold marker
            ink = BAR if (marked and style == "dark") else (col or default_ink)
            d.text((x, top + y), word, font=f, fill=ink)
            x += d.textlength(word, font=f) + space
    mask = torn_mask(w, h, torn=style in ("clip", "quote"), seed=hash(el.get("id", "")) & 0xFFFF)
    img.putalpha(ImageChops.multiply(img.split()[3], mask))
    if style in ("clip", "quote"):  # tape
        for tx in (w * 0.12, w * 0.78):
            tape = Image.new("RGBA", (130, 44), (236, 226, 196, 170))
            tape = tape.rotate(rng.uniform(-12, 12), expand=True, resample=Image.BICUBIC)
            img.alpha_composite(tape, (int(tx), 0))
    return img


def stamp_sprite(el):
    f = font(WEIGHTS["heavy"], el.get("size", 50))
    probe = ImageDraw.Draw(Image.new("L", (1, 1)))
    text = el["text"].upper()
    tw = int(probe.textlength(text, font=f))
    w, h = tw + 80, int(f.size * 1.9)
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    col = GREEN + (235,)
    d.rounded_rectangle([4, 4, w - 5, h - 5], radius=14, outline=col, width=7)
    d.rounded_rectangle([16, 16, w - 17, h - 17], radius=8, outline=col, width=3)
    d.text((40, (h - f.size) / 2 - 6), text, font=f, fill=col)
    # ink wear
    a = np.array(img)
    noise = np.random.default_rng(3).random(a.shape[:2])
    a[..., 3] = np.where(noise < 0.12, a[..., 3] * 0.35, a[..., 3]).astype(np.uint8)
    return Image.fromarray(a)


def sticker(icon, size):
    """Cut-out sticker: icon with a thick white paper border."""
    alpha = icon.split()[3]
    border = alpha.filter(ImageFilter.MaxFilter(25))
    base = Image.new("RGBA", icon.size, CARD + (0,))
    base.putalpha(border)
    base.alpha_composite(icon)
    base.thumbnail((size, size), Image.LANCZOS)
    return base


def icon_sprite(el):
    name, S = el["name"], 600
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if name == "drumstick":
        d.rounded_rectangle([300, 300, 470, 350], radius=25, fill=(246, 240, 226))
        for cx, cy in [(470, 305), (478, 350)]:
            d.ellipse([cx - 34, cy - 34, cx + 34, cy + 34], fill=(246, 240, 226))
        d.ellipse([90, 150, 360, 420], fill=(196, 136, 58))
        d.ellipse([110, 165, 340, 380], fill=(214, 158, 74))
        for _ in range(26):
            x, y = rng.randint(130, 320), rng.randint(180, 390)
            d.ellipse([x, y, x + rng.randint(8, 18), y + rng.randint(6, 14)], fill=(170, 112, 44))
        img = img.rotate(-20, resample=Image.BICUBIC)
    elif name == "drop":
        d.polygon([(300, 70), (430, 300), (170, 300)], fill=GOLD)
        d.ellipse([160, 200, 440, 480], fill=GOLD)
        d.ellipse([220, 260, 280, 330], fill=(245, 225, 160))
    elif name == "pan":
        d.ellipse([90, 190, 430, 470], fill=(60, 66, 62))
        d.ellipse([115, 212, 405, 448], fill=(86, 94, 88))
        d.rounded_rectangle([400, 300, 580, 350], radius=22, fill=(60, 66, 62))
        for x, y in [(200, 280), (270, 330), (320, 260), (230, 380)]:
            d.ellipse([x, y, x + 34, y + 34], fill=(232, 196, 96))
    elif name == "glass":
        d.polygon([(190, 120), (410, 120), (380, 480), (220, 480)], fill=(214, 232, 226))
        d.polygon([(200, 240), (400, 240), (380, 480), (220, 480)], fill=(222, 160, 70))
    return sticker(img, el.get("size", 240))


def calendar_sprite(el, progress):
    days = el.get("days", ["Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Aha"])
    w, h = el.get("w", 820), 300
    img = Image.new("RGBA", (w, h), CARD + (255,))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, w, 64], fill=BAR)
    d.text((28, 12), el.get("title", "MINGGU INI").upper(), font=font(WEIGHTS["heavy"], 34), fill=IVORY)
    cw = (w - 40) / 7
    f = font(WEIGHTS["bold"], 30)
    for i, day in enumerate(days):
        x = 20 + i * cw
        d.rectangle([x + 4, 84, x + cw - 4, h - 20], outline=(206, 198, 180), width=2)
        d.text((x + 14, 94), day, font=f, fill=MUTED)
    mark = el.get("mark_day")
    if mark is not None and progress > 0:
        x = 20 + mark * cw
        dr = icon_sprite({"name": "drumstick", "size": int(cw * 0.95)})
        img.alpha_composite(dr, (int(x + (cw - dr.width) / 2), int(150 + (1 - ease(progress)) * 20)))
    return img


# ---------- per-element animation ----------

class Element:
    def __init__(self, el, board_start):
        self.el = el
        self.t0 = board_start + el.get("at", 0.0)
        self.kind = el["type"]
        self._cache = {}

    def sprite(self, t):
        el, k = self.el, self.kind
        if k == "card":
            step = round(10 * ease((t - self.t0 - el.get("hl_at", 0.8)) / 0.5)) / 10
            key = ("card", step)
            if key not in self._cache:
                self._cache[key] = with_shadow(card_sprite(el, step).rotate(el.get("rot", 0), expand=True, resample=Image.BICUBIC))
        elif k == "calendar":
            step = round(8 * ease((t - self.t0 - el.get("mark_at", 0.6)) / 0.4)) / 8
            key = ("cal", step)
            if key not in self._cache:
                self._cache[key] = with_shadow(calendar_sprite(el, step).rotate(el.get("rot", 0), expand=True, resample=Image.BICUBIC))
        elif k == "stamp":
            key = "stamp"
            if key not in self._cache:
                self._cache[key] = stamp_sprite(el).rotate(el.get("rot", -8), expand=True, resample=Image.BICUBIC)
        elif k == "icon":
            key = "icon"
            if key not in self._cache:
                self._cache[key] = with_shadow(icon_sprite(el).rotate(el.get("rot", 0), expand=True, resample=Image.BICUBIC), blur=10)
        elif k == "label":
            key = "label"
            if key not in self._cache:
                f = font(WEIGHTS[el.get("weight", "italic")], el.get("size", 46))
                probe = ImageDraw.Draw(Image.new("L", (1, 1)))
                lines = wrap(probe, el["text"], f, el.get("w", 800))
                img = Image.new("RGBA", (el.get("w", 800), int(len(lines) * f.size * 1.3) + 10), (0, 0, 0, 0))
                dd = ImageDraw.Draw(img)
                for i, ln in enumerate(lines):
                    dd.text((0, i * f.size * 1.3), ln, font=f, fill=tuple(el.get("color", MUTED)))
                self._cache[key] = img.rotate(el.get("rot", 0), expand=True, resample=Image.BICUBIC)
        else:
            return None
        return self._cache[key]

    def draw(self, canvas, t, boards):
        dt = t - self.t0
        if dt < 0:
            return
        k, el = self.kind, self.el
        if k in ("arrow", "strike"):
            self.draw_stroke(canvas, ease(dt / el.get("dur", 0.45)), boards)
            return
        spr = self.sprite(t)
        p = ease(dt / 0.35)
        if k == "stamp":
            scale = 1.0 + 0.6 * (1 - ease(dt / 0.18))
            alpha = min(1.0, dt / 0.12)
        else:
            scale = 0.9 + 0.1 * p
            alpha = min(1.0, dt / 0.2)
        if scale != 1.0:
            spr = spr.resize((max(1, int(spr.width * scale)), max(1, int(spr.height * scale))), Image.BILINEAR)
        if alpha < 1:
            spr = spr.copy()
            spr.putalpha(spr.split()[3].point(lambda a: int(a * alpha)))
        rise = 0 if k == "stamp" else int((1 - p) * 40)
        canvas.alpha_composite(spr, (int(el["x"] - spr.width / 2), int(el["y"] - spr.height / 2 + rise)))

    def draw_stroke(self, canvas, p, boards):
        el = self.el
        d = ImageDraw.Draw(canvas)
        col = tuple(el.get("color", GOLD)) + (215,)
        if self.kind == "arrow":
            (x0, y0), (x1, y1) = el["from"], el["to"]
            bend = el.get("bend", 0.25)
            mx, my = (x0 + x1) / 2 - (y1 - y0) * bend, (y0 + y1) / 2 + (x1 - x0) * bend
            n = max(2, int(40 * p))
            pts = [((1 - s) ** 2 * x0 + 2 * (1 - s) * s * mx + s * s * x1,
                    (1 - s) ** 2 * y0 + 2 * (1 - s) * s * my + s * s * y1) for s in [i / 40 for i in range(n)]]
            d.line(pts, fill=col, width=12, joint="curve")
            if p >= 1:
                ang = math.atan2(y1 - pts[-2][1], x1 - pts[-2][0])
                for da in (2.6, -2.6):
                    d.line([(x1, y1), (x1 + 50 * math.cos(ang + da), y1 + 50 * math.sin(ang + da))], fill=col, width=12)
        else:  # strike: hand-drawn X over a box
            x0, y0, x1, y1 = el["box"]
            first, second = min(1, p * 2), max(0, p * 2 - 1)
            d.line([(x0, y0), (x0 + (x1 - x0) * first, y0 + (y1 - y0) * first)], fill=col, width=9)
            if second > 0:
                d.line([(x1, y0), (x1 - (x1 - x0) * second, y0 + (y1 - y0) * second)], fill=col, width=9)


# ---------- scene assembly ----------

def paper_background():
    base = Image.new("RGBA", (W, H), PAPER + (255,))
    noise = Image.effect_noise((W, H), 28).convert("L").filter(ImageFilter.GaussianBlur(0.6))
    dark = Image.new("RGBA", (W, H), tuple(c - 18 for c in PAPER) + (255,))
    base = Image.composite(base, dark, noise.point(lambda v: min(255, 150 + v // 2)))
    vig = Image.new("L", (W, H), 0)
    ImageDraw.Draw(vig).ellipse([-300, -200, W + 300, H + 200], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(160))
    return Image.composite(base, Image.new("RGBA", (W, H), (205, 196, 176, 255)), vig)


def static_overlay(spec):
    ov = base_frame(spec)
    # base_frame paints the ivory page; keep only brand marks by knocking out the page colour
    a = np.array(ov)
    page = np.all(np.abs(a[..., :3].astype(int) - np.array((249, 246, 240))) < 3, axis=-1)
    a[page, 3] = 0
    ov = Image.fromarray(a)
    if spec.get("kicker"):
        d = ImageDraw.Draw(ov)
        f = font(WEIGHTS["bold"], 34)
        tw = d.textlength(spec["kicker"].upper(), font=f)
        d.rounded_rectangle([SAFE_LEFT - 16, SAFE_TOP - 88, SAFE_LEFT + tw + 16, SAFE_TOP - 36], radius=8, fill=BAR)
        d.text((SAFE_LEFT, SAFE_TOP - 82), spec["kicker"].upper(), font=f, fill=IVORY)
    return ov


def render_board(bg, elements, t, t_start, dur, boards):
    canvas = bg.copy()
    for e in elements:
        e.draw(canvas, t, boards)
    z = 1.0 + 0.05 * ease(max(0.0, (t - t_start)) / max(dur, 0.1))
    if z > 1.001:
        cw, ch = W / z, H / z
        cx, cy = CAM_CENTER
        box = (cx - cw * cx / W, cy - ch * cy / H, cx - cw * cx / W + cw, cy - ch * cy / H + ch)
        canvas = canvas.crop(tuple(int(v) for v in box)).resize((W, H), Image.BILINEAR)
    return canvas


def main(spec_path, out_path):
    with open(spec_path, encoding="utf-8") as fh:
        spec = json.load(fh)
    base = os.path.dirname(os.path.abspath(spec_path))
    audio = os.path.join(base, spec["audio"])

    voice = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
    segs, _, voice_len, mapping = edit_voice(audio, spec.get("cuts", []), spec.get("max_pause", 0.35), 0.2, voice)
    starts = [raw_to_edited(ln["at"], mapping) for ln in spec["lines"]]
    starts[0] = 0.0
    speech_end = segs[-1][1]
    end_card = spec.get("end_card")
    boards = []  # (start, end, [Element], keep_previous)
    for i, ln in enumerate(spec["lines"]):
        b_start = starts[i]
        b_end = starts[i + 1] if i + 1 < len(starts) else speech_end + 0.4
        els = [Element(el, b_start) for el in ln["board"]]
        if ln.get("keep") and boards:
            els = boards[-1][2] + els
        boards.append([b_start, b_end, els, ln.get("keep", False)])
    total = speech_end + 0.4
    if end_card:
        els = [Element(el, total) for el in end_card["board"]]
        boards.append([total, total + end_card["duration"], els, False])
        total += end_card["duration"]
    # a kept board inherits its predecessor's camera start so the push stays continuous
    cam_start = []
    for i, b in enumerate(boards):
        cam_start.append(cam_start[i - 1] if b[3] and i else b[0])
    cam_end = [0.0] * len(boards)
    for i in range(len(boards) - 1, -1, -1):
        cam_end[i] = cam_end[i + 1] if i + 1 < len(boards) and boards[i + 1][3] else boards[i][1]

    bg = paper_background()
    overlay = static_overlay(spec)

    with open(os.path.splitext(out_path)[0] + ".timing.json", "w", encoding="utf-8") as fh:
        json.dump([{"line": ln["text"], "start": round(s, 2)} for ln, s in zip(spec["lines"], starts)], fh, ensure_ascii=False, indent=1)

    bed = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
    make_bed(total, bed, seed=sum(map(ord, spec.get("date", ""))))
    fade_st = max(0.0, total - 1.5)
    filt = (
        "[1:a]highpass=f=80,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100,aformat=channel_layouts=stereo[v];"
        f"[2:a]volume={spec.get('music_gain', 0.45)}[m];"
        f"[v][m]amix=inputs=2:duration=longest:normalize=0,afade=t=out:st={fade_st:.2f}:d=1.5[aout]"
    )
    cmd = [
        imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-i", voice, "-i", bed, "-filter_complex", filt, "-map", "0:v", "-map", "[aout]", "-t", f"{total:.2f}",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
        "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out_path,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    PAN = 0.4
    for f in range(int(total * FPS)):
        t = f / FPS
        bi = max(i for i, b in enumerate(boards) if b[0] <= t + 1e-9)
        b = boards[bi]
        frame = render_board(bg, b[2], t, cam_start[bi], cam_end[bi] - cam_start[bi], boards)
        if bi > 0 and not b[3] and t - b[0] < PAN:
            p = ease((t - b[0]) / PAN)
            prev = boards[bi - 1]
            old = render_board(bg, prev[2], t, cam_start[bi - 1], cam_end[bi - 1] - cam_start[bi - 1], boards)
            mix = Image.new("RGBA", (W, H))
            mix.paste(old, (int(-W * p), 0))
            mix.paste(frame, (int(W * (1 - p)), 0))
            frame = mix
        frame.alpha_composite(overlay)
        proc.stdin.write(frame.convert("RGB").tobytes())
    proc.stdin.close()
    code = proc.wait()
    os.unlink(bed)
    os.unlink(voice)
    if code != 0:
        sys.exit("ffmpeg failed")
    for ln, s in zip(spec["lines"], starts):
        print(f"{s:6.2f}  {ln['text']}")
    print(f"total {total:.2f}s")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
