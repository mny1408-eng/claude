// Reel 2 (07/10) "Air Manis" with Coach Nas's footage and voice.
// Media (local only, gitignored):
//   public/clips/R0710-airmanis-opener.mp4   FluentCue export, src 1.25–7.40s: "Bila makan luar ramai terus fokus dekat nasi. Tapi
//                                            kadang perubahan paling senang bukan dekat nasi pun." (720p upscaled)
//   public/voice/R0710-airmanis/source.mp3   Teleprompter 04/10 18:48, src 1.95–21.60s: "Tengok minuman awak…" through "Start
//                                            satu perubahan yang awak boleh ulang." CTA not recorded: on screen only.
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { C } from "../theme";
import { Card, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0710Timing, r0710Scenes } from "./R0710AirManis";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R0710-airmanis-opener.mp4";
const AUDIO = "voice/R0710-airmanis/source.mp3";
const CLIP_LEN = 186;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 1.25, voiceFrom: 1.95 });

// The 1-second "Tengok minuman awak." is folded into the week scene as its title instead of a scene of its own.
const starts = { week: CLIP_LEN, racun: tl.start(11.01), close: tl.start(18.66), end: tl.end(21.36) };
const w = tl.w;

const T: R0710Timing = {
  nasi: { strike: 0, line2: 0, minuman: 0, hl: 0, tag: 0 }, // not used: folded into the opener and the week title
  week: {
    intro: w(starts.week, 2.08), // "Tengok minuman awak."
    header: w(starts.week, 3.1), // "Kalau hampir setiap meal ada minuman bergula"
    meals: [3.24, 3.6, 3.88, 4.26, 4.68].map((s) => w(starts.week, s)), // "hampir setiap meal ada minuman bergula"
    swaps: [7.5, 7.86].map((s) => w(starts.week, s)), // "air kosong"
    line2: w(starts.week, 5.34), // "cuba tukar sebahagian occasion…"
  },
  racun: { stamp: w(starts.racun, 11.38), strike: w(starts.racun, 11.84), tag: w(starts.racun, 12.2), line2: w(starts.racun, 12.56), hl: w(starts.racun, 15.88) },
  close: { hl: w(starts.close, 18.9), tag: w(starts.close, 20.0), pill: w(starts.close, 21.6) },
};

const LINE1_AT = tl.clipW(2.66); // "terus fokus dekat nasi"
const STRIKE_AT = tl.clipW(4.02);
const LINE2_AT = tl.clipW(4.54); // "Tapi kadang perubahan paling senang…"

const Opener: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>KADANG BUKAN <span style={{ color: C.marker }}>NASI</span> YANG MUDAH DIUBAH</>} hookSize={56}>
    <Pop delay={LINE1_AT} rotate={-1.5}>
      <Card style={{ padding: "22px 40px", ...OVER_VIDEO }}>
        <span style={{ position: "relative", display: "inline-block", fontSize: 56, fontWeight: 800, whiteSpace: "nowrap" }}>
          fokus potong nasi
          <Strike delay={STRIKE_AT} width={6} />
        </span>
      </Card>
    </Pop>
    <Pop delay={LINE2_AT} rotate={1.5}>
      <Card style={{ padding: "22px 40px", textAlign: "center", fontSize: 44, fontWeight: 700, lineHeight: 1.2, ...OVER_VIDEO }}>
        perubahan paling senang
        <br />
        bukan dekat nasi pun.
      </Card>
    </Pop>
  </FaceCamOpener>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, v]) => [f, s, v * k]);

export const R0710_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[LINE1_AT, "pop", 0.45], [STRIKE_AT, "scribble", 0.55], [LINE2_AT, "pop", 0.45]], 0.5) },
  ...r0710Scenes(T, { nasi: 0, week: starts.racun - starts.week, racun: starts.close - starts.racun, close: starts.end - starts.close })
    .filter((s) => s.id !== "nasi")
    .map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0710Voice: React.FC = () => (
  <Sequence from={tl.voiceFrame} layout="none">
    <Audio src={staticFile(AUDIO)} />
  </Sequence>
);
