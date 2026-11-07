"""Find the best short window in each workout clip: the person moving (no idle setup) and facing the camera.

Usage: /home/user/mpenv/bin/python pick_moments.py <len_seconds> <clip>[:headx:heady]...
(headx/heady: rough head position in the 1080x1920 source; the face check runs on a 640 px crop there, as far-away faces are too small otherwise)
Prints, per clip, the window start with the best score, plus the share of frames facing the camera and the motion level there.
Face direction comes from MediaPipe's face landmarker (head yaw/pitch from its transformation matrix, and the irises inside the eyes).
"""
import math, subprocess, sys
import numpy as np
import mediapipe as mp
from mediapipe.tasks.python import vision
from mediapipe.tasks.python.core.base_options import BaseOptions

FPS, W, H = 10, 540, 960
lm = vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(
    base_options=BaseOptions(model_asset_path="/home/user/models/face_landmarker.task"),
    output_facial_transformation_matrixes=True, num_faces=1, min_face_detection_confidence=0.3))


def facing(img):
    r = lm.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(img)))
    if not r.face_landmarks:
        return 0.0
    m = np.array(r.facial_transformation_matrixes[0])[:3, :3]
    yaw = math.degrees(math.atan2(-m[2, 0], math.hypot(m[2, 1], m[2, 2])))
    pitch = math.degrees(math.atan2(m[2, 1], m[2, 2]))
    p = r.face_landmarks[0]
    # iris centre within the eye corners (0.5 = looking straight ahead): left eye 33/133 + iris 468, right eye 362/263 + iris 473
    def ratio(a, b, i):
        return (p[i].x - p[a].x) / max(1e-6, p[b].x - p[a].x)
    gaze = abs(ratio(33, 133, 468) - 0.5) + abs(ratio(362, 263, 473) - 0.5)
    head = max(0.0, 1 - (abs(yaw) / 25) ** 2 - (abs(pitch) / 30) ** 2)
    return head * max(0.0, 1 - gaze / 0.35)


def main(L, clips):
    for spec in clips:
        f, *hp = spec.split(":")
        raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vf", f"fps={FPS},scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
        fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3)
        g = fr.mean(axis=3)
        if hp:
            hx, hy = int(hp[0]), int(hp[1])
            x = min(max(hx - 320, 0), 1080 - 640); y = min(max(hy - 320, 0), 1920 - 640)
            raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vf", f"fps={FPS},crop=640:640:{x}:{y}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
            faces = np.frombuffer(raw, np.uint8).reshape(-1, 640, 640, 3)[:len(fr)]
        else:
            faces = fr
        mot = np.r_[0, np.abs(np.diff(g, axis=0)).mean(axis=(1, 2))]
        fac = np.array([facing(x) for x in faces]); fac = np.r_[fac, np.zeros(len(fr) - len(fac))]
        n = int(L * FPS)
        mn = mot / (np.percentile(mot, 90) + 1e-6)
        best = None
        for s in range(0, max(1, len(fr) - n)):
            sc = 0.6 * fac[s:s + n].mean() + 0.4 * min(1, mn[s:s + n].mean())
            if best is None or sc > best[0]:
                best = (sc, s)
        sc, s = best
        print(f"{f.split('/')[-1]}: start {s / FPS:.1f}s  score {sc:.2f}  facing {fac[s:s + n].mean():.2f} (clip max {fac.max():.2f})  motion {mn[s:s + n].mean():.2f}")


if __name__ == "__main__":
    main(float(sys.argv[1]), sys.argv[2:])
