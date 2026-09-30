"""Render a faceless text Reel (1080x1920 MP4) from a JSON spec.

Usage: python3 render_reel.py spec.json out.mp4
"""
import json
import subprocess
import sys

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30

IVORY = (247, 242, 231)
GREEN = (31, 61, 43)
GOLD = (184, 150, 62)
SOFT = (92, 110, 98)

SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

# Keep text clear of Instagram's Reel UI (top bar, caption/buttons at bottom, right rail).
SAFE_LEFT, SAFE_RIGHT = 90, W - 160
SAFE_TOP, SAFE_BOTTOM = 260, 1500


def font(path, size):
    return ImageFont.truetype(path, size)


def ease(t):
    t = max(0.0, min(1.0, t))
    return 1 - (1 - t) ** 3


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


def draw_text_block(img, lines, fnt, color, y, alpha, rise, align="left", spacing=1.18):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    size = fnt.size
    for i, ln in enumerate(lines):
        x = SAFE_LEFT
        if align == "center":
            x = (W - d.textlength(ln, font=fnt)) / 2
        d.text((x, y + i * size * spacing + rise), ln, font=fnt, fill=color + (int(255 * alpha),))
    img.alpha_composite(layer)
    return y + len(lines) * size * spacing


def base_frame(footer):
    img = Image.new("RGBA", (W, H), IVORY + (255,))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 18], fill=GREEN)
    d.line([(SAFE_LEFT, SAFE_TOP - 60), (SAFE_LEFT + 120, SAFE_TOP - 60)], fill=GOLD, width=6)
    f = font(SANS_BOLD, 34)
    d.text(((W - d.textlength(footer, font=f)) / 2, SAFE_BOTTOM + 40), footer, font=f, fill=SOFT)
    return img


def fade(t, start, dur=0.45):
    return ease((t - start) / dur)


def render_scene(scene, t, footer):
    img = base_frame(footer)
    d = ImageDraw.Draw(img)
    max_w = SAFE_RIGHT - SAFE_LEFT
    kind = scene["type"]

    if kind == "hook":
        y = SAFE_TOP + 180
        if scene.get("kicker"):
            a = fade(t, 0.0)
            y = draw_text_block(img, [scene["kicker"].upper()], font(SANS_BOLD, 40), GOLD, y, a, (1 - a) * 30) + 30
        hf = font(SERIF_BOLD, 104)
        for i, part in enumerate(scene["lines"]):
            a = fade(t, 0.25 + i * 0.5)
            color = GREEN if i == 0 else GOLD
            y = draw_text_block(img, wrap(d, part, hf, max_w), hf, color, y, a, (1 - a) * 50) + 10

    elif kind == "steps":
        y = SAFE_TOP + 60
        tf = font(SANS_BOLD, 56)
        a = fade(t, 0.0)
        y = draw_text_block(img, wrap(d, scene["title"], tf, max_w), tf, GREEN, y, a, (1 - a) * 30) + 50
        nf, sf = font(SERIF_BOLD, 64), font(SANS_BOLD, 72)
        gap = scene.get("step_gap", 0.9)
        for i, step in enumerate(scene["steps"]):
            a = fade(t, 0.5 + i * gap)
            if a <= 0:
                continue
            layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
            ld = ImageDraw.Draw(layer)
            cy, off = y + i * 190, (1 - a) * 60
            ld.ellipse([SAFE_LEFT + off, cy, SAFE_LEFT + 120 + off, cy + 120], fill=GREEN + (int(255 * a),))
            num = str(i + 1)
            ld.text((SAFE_LEFT + 60 + off - ld.textlength(num, font=nf) / 2, cy + 22), num, font=nf, fill=IVORY + (int(255 * a),))
            ld.text((SAFE_LEFT + 160 + off, cy + 22), step, font=sf, fill=GREEN + (int(255 * a),))
            img.alpha_composite(layer)

    elif kind == "statement":
        bf = font(SERIF_BOLD, 84)
        lines = wrap(d, scene["text"], bf, max_w)
        y = (SAFE_TOP + SAFE_BOTTOM) / 2 - len(lines) * bf.size * 1.18 / 2
        a = fade(t, 0.0, 0.6)
        draw_text_block(img, lines, bf, GREEN, y, a, (1 - a) * 40)

    elif kind == "cta":
        cf = font(SERIF_BOLD, 96)
        lines = wrap(d, scene["text"], cf, max_w)
        y = (SAFE_TOP + SAFE_BOTTOM) / 2 - 160
        a = fade(t, 0.0)
        y = draw_text_block(img, lines, cf, GREEN, y, a, (1 - a) * 40) + 40
        if scene.get("sub"):
            a2 = fade(t, 0.6)
            draw_text_block(img, wrap(d, scene["sub"], font(SANS, 52), max_w), font(SANS, 52), SOFT, y, a2, (1 - a2) * 30)

    return img.convert("RGB")


def main(spec_path, out_path):
    with open(spec_path, encoding="utf-8") as fh:
        spec = json.load(fh)
    footer = spec.get("footer", "@coachnas.pharmacist")

    cmd = [
        imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        # Silent audio track: IG accepts it, and trending audio is added in-app.
        "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
        "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
        "-c:a", "aac", "-movflags", "+faststart", out_path,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for scene in spec["scenes"]:
        for f in range(int(scene["duration"] * FPS)):
            proc.stdin.write(render_scene(scene, f / FPS, footer).tobytes())
    proc.stdin.close()
    if proc.wait() != 0:
        sys.exit("ffmpeg failed")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
