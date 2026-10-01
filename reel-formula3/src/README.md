# Formula 3 reel – source

Re-render (from this folder):

    node render916.js full reel916.html frames916   # 9:16 (1080x1920)
    node render916.js full reel.html frames45       # 4:5  (edit viewport height to 1350 first)
    ffmpeg -framerate 30 -i frames916/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 18 F3_reel_9x16.mp4

Scene timings live in each element's `data-t="in,out"` (seconds).
MP4 outputs are git-ignored by the repo.
