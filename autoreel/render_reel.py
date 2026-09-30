"""Render a faceless text Reel (1080x1920 MP4) from a JSON spec.

Follows the brand frame in docs/video-style-rotation.md: ivory background,
forest-green text, gold only on the key word, gold underline drawn under the
key word, the same green wipe between scenes, series tag top-left and the
handle in the same place for the whole video.

Usage: python3 render_reel.py spec.json out.mp4
"""
import json
import os
import subprocess
import sys

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30
WIPE = 0.4  # seconds of green wipe at the start of every scene after the first

IVORY = (247, 242, 231)
GREEN = (31, 61, 43)
GOLD = (184, 150, 62)
SOFT = (92, 110, 98)

FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
DISPLAY = os.path.join(FONT_DIR, "playfair-display-800.ttf")
SANS_BOLD = os.path.join(FONT_DIR, "montserrat-700.ttf")
SANS_HEAVY = os.path.join(FONT_DIR, "montserrat-800.ttf")
SANS = os.path.join(FONT_DIR, "montserrat-500.ttf")

# Keep text clear of Instagram's Reel UI (top bar, caption/buttons at bottom, right rail).
SAFE_LEFT, SAFE_RIGHT = 90, W - 170
SAFE_TOP, SAFE_BOTTOM = 280, 1480

_fonts = {}


def font(path, size):
    key = (path, size)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(path, size)
    return _fonts[key]


def ease(t):
    t = max(0.0, min(1.0, t))
    return 1 - (1 - t) ** 3


def fade(t, start, dur=0.45):
    return ease((t - start) / dur)


def wrap(draw, text, fnt, max_w):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            line = trial
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def rich_lines(img, lines, fnt, y, alpha, rise, highlight, t_underline, spacing=1.2):
    """Draw lines word by word; words in `highlight` go gold with an animated underline."""
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    a = int(255 * alpha)
    space = d.textlength(" ", font=fnt)
    hl = {w.strip(".,!?“”").upper() for w in highlight}
    for i, ln in enumerate(lines):
        x, ly = SAFE_LEFT, y + i * fnt.size * spacing + rise
        for word in ln.split():
            wlen = d.textlength(word, font=fnt)
            is_hl = word.strip(".,!?“”").upper() in hl
            d.text((x, ly), word, font=fnt, fill=(GOLD if is_hl else GREEN) + (a,))
            if is_hl and t_underline > 0:
                uy = ly + fnt.size * 1.08
                d.rectangle([x, uy, x + wlen * ease(t_underline), uy + 9], fill=GOLD + (a,))
            x += wlen + space
    img.alpha_composite(layer)
    return y + len(lines) * fnt.size * spacing


def plain_lines(img, lines, fnt, color, y, alpha, rise, spacing=1.25):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for i, ln in enumerate(lines):
        d.text((SAFE_LEFT, y + i * fnt.size * spacing + rise), ln, font=fnt, fill=color + (int(255 * alpha),))
    img.alpha_composite(layer)
    return y + len(lines) * fnt.size * spacing


def base_frame(spec):
    img = Image.new("RGBA", (W, H), IVORY + (255,))
    d = ImageDraw.Draw(img)
    tag = spec.get("series", "").upper()
    if tag:
        f = font(SANS_HEAVY, 30)
        tw = d.textlength(tag, font=f)
        d.rounded_rectangle([SAFE_LEFT, 190, SAFE_LEFT + tw + 44, 244], radius=27, fill=GREEN)
        d.text((SAFE_LEFT + 22, 201), tag, font=f, fill=IVORY)
    f = font(SANS_BOLD, 32)
    handle = spec.get("footer", "@coachnas.pharmacist")
    d.text((SAFE_LEFT, SAFE_BOTTOM + 30), handle, font=f, fill=SOFT)
    return img


def render_scene(spec, scene, t):
    img = base_frame(spec)
    d = ImageDraw.Draw(img)
    max_w = SAFE_RIGHT - SAFE_LEFT
    kind = scene["type"]
    hl = scene.get("highlight", [])

    if kind == "hook":
        hf = font(DISPLAY, 112)
        lines = wrap(d, scene["text"], hf, max_w)
        y = SAFE_TOP + 170
        if scene.get("kicker"):
            a = fade(t, 0.0)
            y = plain_lines(img, [scene["kicker"].upper()], font(SANS_HEAVY, 38), GOLD, y, a, (1 - a) * 30) + 36
        a = fade(t, 0.2, 0.55)
        rich_lines(img, lines, hf, y, a, (1 - a) * 50, hl, (t - 0.9) / 0.5)

    elif kind == "steps":
        y = SAFE_TOP + 120
        tf = font(SANS_BOLD, 54)
        a = fade(t, 0.0)
        y = plain_lines(img, wrap(d, scene["title"], tf, max_w), tf, SOFT, y, a, (1 - a) * 30) + 60
        nf, sf, notef = font(DISPLAY, 62), font(SANS_HEAVY, scene.get("step_size", 70)), font(SANS, 40)
        gap = scene.get("step_gap", 0.8)
        notes = scene.get("notes", [])
        row_h = 290 if notes else 190
        text_w = SAFE_RIGHT - SAFE_LEFT - 160
        for i, step in enumerate(scene["steps"]):
            a = fade(t, 0.4 + i * gap)
            if a <= 0:
                continue
            layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
            ld = ImageDraw.Draw(layer)
            cy, off, al = y + i * row_h, (1 - a) * 60, int(255 * a)
            last = i == len(scene["steps"]) - 1
            ld.ellipse([SAFE_LEFT + off, cy, SAFE_LEFT + 120 + off, cy + 120], fill=(GOLD if last else GREEN) + (al,))
            num = str(i + 1)
            ld.text((SAFE_LEFT + 60 + off - ld.textlength(num, font=nf) / 2, cy + 18), num, font=nf, fill=IVORY + (al,))
            ld.text((SAFE_LEFT + 160 + off, cy + 26), step, font=sf, fill=GREEN + (al,))
            if i < len(notes):
                for j, ln in enumerate(wrap(ld, notes[i], notef, text_w)):
                    ld.text((SAFE_LEFT + 160 + off, cy + 118 + j * 50), ln, font=notef, fill=SOFT + (al,))
            img.alpha_composite(layer)

    elif kind == "statement":
        bf = font(DISPLAY, 88)
        lines = wrap(d, scene["text"], bf, max_w)
        sf = font(SANS, 50)
        sub = wrap(d, scene["sub"], sf, max_w) if scene.get("sub") else []
        block_h = len(lines) * bf.size * 1.2 + (40 + len(sub) * sf.size * 1.25 if sub else 0)
        y = (SAFE_TOP + SAFE_BOTTOM) / 2 - block_h / 2
        a = fade(t, 0.0, 0.6)
        y = rich_lines(img, lines, bf, y, a, (1 - a) * 40, hl, (t - 0.7) / 0.5) + 40
        if sub:
            a2 = fade(t, 0.8)
            plain_lines(img, sub, sf, SOFT, y, a2, (1 - a2) * 30)

    elif kind == "cta":
        cf = font(DISPLAY, 100)
        y = (SAFE_TOP + SAFE_BOTTOM) / 2 - 200
        a = fade(t, 0.0)
        y = rich_lines(img, wrap(d, scene["text"], cf, max_w), cf, y, a, (1 - a) * 40, hl, (t - 0.6) / 0.5) + 40
        if scene.get("sub"):
            a2 = fade(t, 0.6)
            sf = font(SANS, 50)
            plain_lines(img, wrap(d, scene["sub"], sf, max_w), sf, SOFT, y, a2, (1 - a2) * 30)

    return img


def apply_wipe(img, t):
    """Forest-green panel sweeps left to right, revealing the new scene."""
    if t >= WIPE:
        return img
    p = t / WIPE
    lead = int(W * ease(min(1, p * 1.6)))  # panel's leading edge covers first
    trail = int(W * ease(max(0, p * 1.6 - 0.6)))  # then its trailing edge uncovers
    d = ImageDraw.Draw(img)
    if lead > trail:
        d.rectangle([trail, 0, lead, H], fill=GREEN)
    return img


def main(spec_path, out_path):
    with open(spec_path, encoding="utf-8") as fh:
        spec = json.load(fh)

    cmd = [
        imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        # Silent audio track: IG accepts it, and trending audio is added in-app.
        "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
        "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
        "-c:a", "aac", "-movflags", "+faststart", out_path,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for n, scene in enumerate(spec["scenes"]):
        for f in range(int(scene["duration"] * FPS)):
            t = f / FPS
            img = render_scene(spec, scene, t)
            if n > 0:
                img = apply_wipe(img, t)
            proc.stdin.write(img.convert("RGB").tobytes())
    proc.stdin.close()
    if proc.wait() != 0:
        sys.exit("ffmpeg failed")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
