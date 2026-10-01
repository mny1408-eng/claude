#!/usr/bin/env bash
set -euo pipefail

SOURCE="upload/IMG_5952.jpeg"
OUT_DIR="output"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
mkdir -p "$OUT_DIR"

# Crop the phone controls from the source, then create a silent 9:16 explainer.
base="crop=707:1000:0:230,scale=1080:1526:force_original_aspect_ratio=increase,crop=1080:1526,scale=1080:1920"

ffmpeg -y -loop 1 -i "$SOURCE" -t 4 -vf "$base,zoompan=z='min(zoom+0.00055,1.12)':d=120:s=1080x1920:fps=30,drawbox=x=0:y=0:w=1080:h=1920:color=0x073B2C@0.28:t=fill,drawbox=x=56:y=118:w=968:h=14:color=0xD4AF37:t=fill,drawtext=fontfile=$FONT:text='SHAKE CEPAT LAPAR?':fontcolor=white:fontsize=74:x=(w-text_w)/2:y=160,drawtext=fontfile=$FONT:text='Mungkin protein meal awak belum cukup.':fontcolor=white:fontsize=38:x=(w-text_w)/2:y=260" -an "$OUT_DIR/scene1.mp4"

ffmpeg -y -loop 1 -i "$SOURCE" -t 4 -vf "$base,zoompan=z='min(zoom+0.00070,1.18)':d=120:s=1080x1920:fps=30,drawbox=x=0:y=0:w=1080:h=1920:color=0x073B2C@0.30:t=fill,drawbox=x=56:y=118:w=968:h=14:color=0xD4AF37:t=fill,drawtext=fontfile=$FONT:text='FORMULA 3':fontcolor=0xD4AF37:fontsize=86:x=(w-text_w)/2:y=150,drawtext=fontfile=$FONT:text='Blended soy + whey protein':fontcolor=white:fontsize=46:x=(w-text_w)/2:y=260,drawtext=fontfile=$FONT:text='Bukan ubat. Ia sokongan nutrisi yang praktikal.':fontcolor=white:fontsize=34:x=(w-text_w)/2:y=1740" -an "$OUT_DIR/scene2.mp4"

ffmpeg -y -loop 1 -i "$SOURCE" -t 4 -vf "$base,zoompan=z='min(zoom+0.00045,1.10)':d=120:s=1080x1920:fps=30,drawbox=x=0:y=0:w=1080:h=1920:color=0x073B2C@0.30:t=fill,drawbox=x=56:y=118:w=968:h=14:color=0xD4AF37:t=fill,drawtext=fontfile=$FONT:text='1 SCOOP = 5 g PROTEIN':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=160,drawtext=fontfile=$FONT:text='Top-up mudah untuk shake, oats atau yogurt.':fontcolor=white:fontsize=38:x=(w-text_w)/2:y=260" -an "$OUT_DIR/scene3.mp4"

ffmpeg -y -loop 1 -i "$SOURCE" -t 4 -vf "$base,zoompan=z='min(zoom+0.00055,1.12)':d=120:s=1080x1920:fps=30,drawbox=x=0:y=0:w=1080:h=1920:color=0x073B2C@0.52:t=fill,drawbox=x=56:y=118:w=968:h=14:color=0xD4AF37:t=fill,drawtext=fontfile=$FONT:text='SOKONGAN, BUKAN MAGIC':fontcolor=white:fontsize=57:x=(w-text_w)/2:y=160,drawtext=fontfile=$FONT:text='Nak setup sarapan ikut lifestyle awak?':fontcolor=white:fontsize=40:x=(w-text_w)/2:y=290,drawtext=fontfile=$FONT:text='DM  \"PROTEIN\"':fontcolor=0xD4AF37:fontsize=72:x=(w-text_w)/2:y=1720" -an "$OUT_DIR/scene4.mp4"

ffmpeg -y -i "$OUT_DIR/scene1.mp4" -i "$OUT_DIR/scene2.mp4" -i "$OUT_DIR/scene3.mp4" -i "$OUT_DIR/scene4.mp4" \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.35:offset=3.65[v1];[v1][2:v]xfade=transition=fade:duration=0.35:offset=7.30[v2];[v2][3:v]xfade=transition=fade:duration=0.35:offset=10.95[v3]" \
  -map "[v3]" -t 15 -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart "$OUT_DIR/formula3-product-explainer-9x16.mp4"
