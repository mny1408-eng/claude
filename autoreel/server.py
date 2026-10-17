#!/usr/bin/env python3
"""AutoReel web UI — upload or pick a video, run the pipeline, watch the result. Local only (binds 127.0.0.1).

  python3 autoreel/server.py            # then open http://127.0.0.1:8787
"""
from __future__ import annotations

import html
import json
import subprocess
import sys
import threading
import time
import urllib.parse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
INPUT, OUTPUT, PROJECTS = ROOT / "input", ROOT / "output", ROOT / "projects"
JOBS: dict[str, dict] = {}
VIDEO_EXT = {".mp4", ".mov", ".m4v"}


def run_job(job_id: str, args: list[str]) -> None:
    job = JOBS[job_id]
    log = PROJECTS / f"job-{job_id}.log"
    with log.open("w") as fh:
        p = subprocess.Popen([sys.executable, str(ROOT / "autoreel.py"), *args], cwd=ROOT.parent, stdout=fh, stderr=subprocess.STDOUT)
        job["pid"] = p.pid
        p.wait()
    job["status"] = "done" if p.returncode == 0 else f"failed ({p.returncode})"
    job["log"] = log.read_text()[-4000:]


def start(args: list[str], label: str) -> str:
    job_id = time.strftime("%H%M%S")
    JOBS[job_id] = {"label": label, "status": "running", "started": time.strftime("%H:%M:%S"), "log": ""}
    threading.Thread(target=run_job, args=(job_id, args), daemon=True).start()
    return job_id


PAGE = """<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AutoReel</title><style>
body{{font-family:system-ui,sans-serif;background:#F7F5ED;color:#173C30;margin:0;padding:24px;max-width:980px}}
h1{{margin:0 0 4px}} .card{{background:#fff;border-radius:14px;padding:18px;margin:16px 0;box-shadow:0 4px 14px rgba(0,0,0,.06)}}
button{{background:#173C30;color:#F7F5ED;border:0;border-radius:10px;padding:10px 18px;font-weight:700;cursor:pointer}}
select,input[type=file]{{padding:8px;font-size:15px}} .muted{{color:#5d6b63;font-size:14px}} pre{{white-space:pre-wrap;font-size:12px;background:#f3f1ea;padding:10px;border-radius:8px;max-height:240px;overflow:auto}}
.reel{{display:flex;gap:18px;flex-wrap:wrap}} video{{width:270px;border-radius:12px;background:#000}} a{{color:#C0613E}}
</style></head><body>
<h1>AutoReel</h1><div class="muted">Raw talking-head video → edited 9:16 reel. Everything stays on this computer.</div>
<div class="card"><b>1 · Upload a video</b><br><br>
<input type="file" id="f" accept=".mp4,.mov,.m4v,video/*"> Topic: <select id="topic">{topics}</select>
<button onclick="up()">Upload &amp; make reel</button><div id="msg" class="muted"></div></div>
<div class="card"><b>Or pick one already in <code>autoreel/input/</code></b><br><br>{inputs}</div>
<div class="card"><b>Jobs</b>{jobs}</div>
<div class="card"><b>Reels</b>{reels}</div>
<script>
async function up(){{const f=document.getElementById('f').files[0];if(!f)return;const t=document.getElementById('topic').value;
document.getElementById('msg').textContent='Uploading '+f.name+'…';
const r=await fetch('/upload?name='+encodeURIComponent(f.name)+'&topic='+t,{{method:'POST',body:f}});
document.getElementById('msg').textContent=(await r.json()).message;setTimeout(()=>location.reload(),1500);}}
async function run(file){{const t=document.getElementById('topic').value;await fetch('/run?file='+encodeURIComponent(file)+'&topic='+t,{{method:'POST'}});location.reload();}}
async function rer(p){{await fetch('/rerender?project='+encodeURIComponent(p),{{method:'POST'}});location.reload();}}
{refresh}
</script></body></html>"""


class H(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(ROOT), **k)

    def log_message(self, *a):
        pass

    def _json(self, obj: dict, code: int = 200) -> None:
        b = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            topics = "".join(f'<option value="{p.stem}"{" selected" if p.stem == "fat-loss-4-steps" else ""}>{p.stem}</option>' for p in sorted((ROOT / "topics").glob("*.json")))
            vids = sorted(p for p in INPUT.iterdir() if p.suffix.lower() in VIDEO_EXT)
            inputs = "".join(f'<div>{html.escape(p.name)} <button onclick="run(\'{html.escape(p.name)}\')">Make reel</button></div>' for p in vids) or '<span class="muted">empty</span>'
            jobs = "".join(f'<div><b>{html.escape(j["label"])}</b> · {j["started"]} · {j["status"]}<pre>{html.escape(j["log"] or self._tail(k))}</pre></div>' for k, j in sorted(JOBS.items(), reverse=True)) or '<div class="muted">none yet</div>'
            reels = ""
            for d in sorted(OUTPUT.glob("*/reel.mp4"), reverse=True):
                n = d.parent.name
                cap = html.escape((d.parent / "caption.txt").read_text()) if (d.parent / "caption.txt").exists() else ""
                rev = html.escape((d.parent / "review.md").read_text()) if (d.parent / "review.md").exists() else ""
                reels += (f'<div class="reel"><video controls src="/output/{n}/reel.mp4"></video><div style="flex:1;min-width:280px"><b>{n}</b><br>'
                          f'<a href="/output/{n}/reel.mp4" download>MP4</a> · <a href="/output/{n}/reel.srt" download>SRT</a> · '
                          f'<a href="/output/{n}/caption.txt">caption</a> · <a href="/output/{n}/review.md">review</a> · '
                          f'<button onclick="rer(\'{n}\')">Rerender after edits</button>'
                          f'<details><summary>Caption</summary><pre>{cap}</pre></details><details open><summary>Review</summary><pre>{rev}</pre></details></div></div><hr>')
            running = any(j["status"] == "running" for j in JOBS.values())
            body = PAGE.format(topics=topics, inputs=inputs, jobs=jobs, reels=reels or '<div class="muted">none yet</div>',
                               refresh="setTimeout(()=>location.reload(),5000);" if running else "").encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if self.path.startswith("/output/"):
            return super().do_GET()
        self.send_error(404)

    def _tail(self, job_id: str) -> str:
        p = PROJECTS / f"job-{job_id}.log"
        return p.read_text()[-2000:] if p.exists() else ""

    def do_POST(self):
        u = urllib.parse.urlparse(self.path)
        q = {k: v[0] for k, v in urllib.parse.parse_qs(u.query).items()}
        topic = q.get("topic", "fat-loss-4-steps")
        if not (ROOT / "topics" / f"{topic}.json").exists():
            return self._json({"message": "unknown topic"}, 400)
        if u.path == "/upload":
            name = Path(q.get("name", "upload.mp4")).name
            if Path(name).suffix.lower() not in VIDEO_EXT:
                return self._json({"message": "Only .mp4 / .mov / .m4v"}, 400)
            dst = INPUT / name
            left = int(self.headers.get("Content-Length", 0))
            with dst.open("wb") as fh:  # streamed to disk, so long recordings don't sit in memory
                while left > 0:
                    chunk = self.rfile.read(min(left, 1 << 20))
                    if not chunk:
                        break
                    fh.write(chunk)
                    left -= len(chunk)
            start(["run", str(dst), "--topic", topic], name)
            return self._json({"message": f"Uploaded {name}. Processing started — this page refreshes until the reel is ready."})
        if u.path == "/run":
            f = INPUT / Path(q.get("file", "")).name
            if not f.exists():
                return self._json({"message": "file not found"}, 404)
            start(["run", str(f), "--topic", topic], f.name)
            return self._json({"message": "started"})
        if u.path == "/rerender":
            p = PROJECTS / Path(q.get("project", "")).name
            if not (p / "project.json").exists():
                return self._json({"message": "project not found"}, 404)
            start(["rerender", str(p)], f"rerender {p.name}")
            return self._json({"message": "started"})
        self.send_error(404)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8787
    print(f"AutoReel UI on http://127.0.0.1:{port}  (Ctrl+C to stop)")
    ThreadingHTTPServer(("127.0.0.1", port), H).serve_forever()
