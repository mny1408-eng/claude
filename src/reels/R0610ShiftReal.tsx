// Reel 1 (06/10) "Lunch Pukul 4" — full talk (R1): Coach Nas's own recording, light overlays only.
// Media (local only, gitignored):
//   public/clips/R0610-shift-full.mp4   three Teleprompter takes (06/10 17:47) trimmed and joined:
//     0.00–5.85   "Healthcare worker boleh jaga orang… pukul 4 petang."        (src 0.00–5.85)
//     5.85–18.90  "Kalau rutin awak macam ni… next meal kembali normal."       (src 0.00–13.05)
//    18.90–27.65  "Bukan nak compensate… Tag geng shift awak kat sini."        (src 0.00–8.75)
// The CTA is recorded, so the pill lands on it over the video. Times below are output seconds (Whisper medium word starts).
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Mark, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { CtaPill } from "./formats/common";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R0610-shift-full.mp4";
const CLIP_LEN = 825;
const s = (sec: number) => Math.round(sec * FPS) - 3;

const BACKUP = [
  { label: "1 backup snack", at: s(5.85 + 7.02) },
  { label: "1 protein option senang", at: s(5.85 + 8.0) },
  { label: "NEXT MEAL NORMAL", at: s(5.85 + 11.92) },
];
const SHIFT_AT = s(18.9 + 2.96); // "shift tak semestinya predictable"
const FLEX_AT = s(18.9 + 6.04); // "flexible"
const CTA_AT = s(18.9 + 6.76); // "Tag geng shift awak kat sini"

const Talk: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <FaceCamOpener clip={CLIP} hook={<>LUNCH <span style={{ color: C.marker }}>PUKUL 4?</span> PLAN KENA BERUBAH.</>} hookSize={58} lowerTop={1180}>
      {f < SHIFT_AT ? (
        <Pop delay={BACKUP[0].at}>
          <Card style={{ padding: "26px 40px", display: "flex", flexDirection: "column", gap: 16, ...OVER_VIDEO }}>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 3, color: C.marker }}>ADA BACKUP</div>
            {BACKUP.filter((b) => f >= b.at).map((b) => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <Mark kind="check" delay={b.at + 4} size={42} />
                <span style={{ fontSize: 44, fontWeight: 800 }}>{b.label}</span>
              </div>
            ))}
          </Card>
        </Pop>
      ) : f < CTA_AT ? (
        <Pop delay={SHIFT_AT}>
          <Card style={{ padding: "24px 44px", textAlign: "center", ...OVER_VIDEO }}>
            <div style={{ fontSize: 50, fontWeight: 800 }}>SHIFT TAK PREDICTABLE</div>
            <div style={{ fontSize: 46, fontWeight: 700, marginTop: 6 }}>
              plan kena cukup <Highlight delay={FLEX_AT}>flexible.</Highlight>
            </div>
          </Card>
        </Pop>
      ) : (
        <CtaPill icon="comment" delay={CTA_AT}>
          Tag geng shift
        </CtaPill>
      )}
    </FaceCamOpener>
  );
};

export const R0610_SHIFT_REAL_SCENES: SceneDef[] = [
  { id: "talk", dur: CLIP_LEN, el: <Talk />, cues: [...BACKUP.map((b): [number, "tick", number] => [b.at + 4, "tick", 0.3]), [SHIFT_AT, "pop", 0.3], [FLEX_AT, "swipe", 0.3], [CTA_AT, "pop", 0.35]] },
];
