"""Beat-timed workout montage: centre the person in each clip and cut every clip to a whole number of beats.

Usage: python3 workout_cut.py <proj>   reads <proj>/workout.json, writes <proj>/work/montage.mp4 (1080x1920, 30 fps, no audio)
workout.json: {"bpm": 128, "segments": [{"file": "IMG_1.MOV", "start": 1.0, "beats": 8, "box": [x0, y0, x1, y1], "ty": 0.52}]}
box is the person's extent in the source (px); the crop centres it horizontally and puts its middle at ty of the frame height.
"""
import json, subprocess, sys
from pathlib import Path

W, H = 1080, 1920


def crop_for(box, ty, max_zoom=1.4):
    x0, y0, x1, y1 = box
    bx, by = (x0 + x1) / 2, (y0 + y1) / 2
    # zoom just enough to centre the body without showing an edge, never so much the body no longer fits
    need = max(1.0, abs(bx - W / 2) / (W / 2) + 1.0, abs(by - ty * H) / (H / 2) * 0.5 + 1.0)
    fit = min(W * 0.96 / max(1, x1 - x0), H * 0.9 / max(1, y1 - y0))
    s = max(1.0, min(need, fit, max_zoom))
    cw, ch = W / s, H / s
    cx = min(max(bx - cw / 2, 0), W - cw)
    cy = min(max(by - ch * ty, 0), H - ch)
    return int(cw) // 2 * 2, int(ch) // 2 * 2, int(cx), int(cy), s


def main(proj: Path) -> None:
    cfg = json.loads((proj / "workout.json").read_text())
    beat = 60 / cfg["bpm"]
    fc, ins, t = "", [], 0.0
    for i, sg in enumerate(cfg["segments"]):
        dur = sg["beats"] * beat
        cw, ch, cx, cy, s = crop_for(sg["box"], sg.get("ty", 0.55))
        ins += ["-ss", str(sg["start"]), "-t", f"{dur:.4f}", "-i", str(proj / "clips" / sg["file"])]
        fc += f"[{i}:v]fps=30,crop={cw}:{ch}:{cx}:{cy},scale={W}:{H}:flags=lanczos,setsar=1,format=yuv420p,trim=duration={dur:.4f},setpts=PTS-STARTPTS[v{i}];"
        print(f"{sg['file']}: {t:6.2f}-{t + dur:6.2f}s zoom {s:.2f}")
        t += dur
    fc += "".join(f"[v{i}]" for i in range(len(cfg["segments"]))) + f"concat=n={len(cfg['segments'])}:v=1:a=0[v]"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", fc, "-map", "[v]", "-c:v", "libx264", "-crf", "16", "-preset", "medium",
                    "-g", "30", "-movflags", "+faststart", str(proj / "work" / "montage.mp4")], check=True)
    print(f"total {t:.2f}s")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
