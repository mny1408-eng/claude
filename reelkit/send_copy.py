"""Two-pass x264 copy sized under the chat limit: send_copy.py <in.mp4> [max_mb]"""
import subprocess, sys
from pathlib import Path
src = Path(sys.argv[1]); mb = float(sys.argv[2]) if len(sys.argv) > 2 else 28.0
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(src)], capture_output=True, text=True).stdout)
vk = int(mb * 8192 / dur - 160)
out = src.with_name(src.stem + "-send.mp4")
log = f"/tmp/x264-{src.stem}"
common = ["-c:v", "libx264", "-preset", "slow", "-b:v", f"{vk}k", "-pix_fmt", "yuv420p", "-passlogfile", log]
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(src), *common, "-pass", "1", "-an", "-f", "mp4", "/dev/null"], check=True)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(src), *common, "-pass", "2", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", str(out)], check=True)
print(out, round(out.stat().st_size / 1e6, 1), "MB")
