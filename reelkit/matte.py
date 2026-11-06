"""Cut the speaker out of a stretch of video, so a title can sit behind their head.

Usage: /home/user/mpenv/bin/python matte.py <in.mp4> <start> <dur> <out.webm>
Writes a VP9 webm with alpha (person only, soft edge) at 1080x1920, 30 fps, no audio.
Needs MediaPipe's selfie segmenter at /home/user/models/selfie_segmenter.tflite
(storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite).
"""
import subprocess, sys
import cv2
import numpy as np
import mediapipe as mp
from mediapipe.tasks.python import vision
from mediapipe.tasks.python.core.base_options import BaseOptions

W, H, FPS = 1080, 1920, 30
MODEL = "/home/user/models/selfie_segmenter.tflite"


def main(src: str, start: float, dur: float, dst: str) -> None:
    seg = vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(
        base_options=BaseOptions(model_asset_path=MODEL), running_mode=vision.RunningMode.VIDEO, output_confidence_masks=True))
    dec = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", str(start), "-t", str(dur), "-i", src,
                            "-vf", f"fps={FPS},scale={W}:{H},format=rgb24", "-f", "rawvideo", "-"], stdout=subprocess.PIPE, bufsize=10 ** 8)
    enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                            "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "6M", "-auto-alt-ref", "0", dst], stdin=subprocess.PIPE)
    prev, n = None, 0
    while True:
        buf = dec.stdout.read(W * H * 3)
        if len(buf) < W * H * 3:
            break
        rgb = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
        small = cv2.resize(rgb, (W // 2, H // 2), interpolation=cv2.INTER_AREA)
        res = seg.segment_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(small)), int(n * 1000 / FPS))
        m = res.confidence_masks[0].numpy_view().astype(np.float32)
        if m.ndim == 3:
            m = m[..., 0]
        m = cv2.resize(m, (W, H), interpolation=cv2.INTER_LINEAR)
        m = np.clip((m - 0.35) / 0.4, 0, 1)            # firm up the edge
        m = cv2.GaussianBlur(m, (0, 0), 3)            # then feather it
        if prev is not None:                           # calm frame-to-frame flicker
            m = 0.6 * m + 0.4 * prev
        prev = m
        rgba = np.dstack([rgb, (m * 255).astype(np.uint8)])
        enc.stdin.write(rgba.tobytes())
        n += 1
    enc.stdin.close()
    enc.wait()
    print(f"{dst}: {n} frames")


if __name__ == "__main__":
    main(sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4])
