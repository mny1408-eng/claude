// Reel 1 (05/10) "10 Pagi Dah Lapar?" — full talk (R1): Coach Nas's own recording, light overlays only.
// Media (local only, gitignored):
//   public/clips/R0510-lapar-full.mp4   four Teleprompter takes (05/10 17:50–17:51) trimmed and joined:
//     0.00–5.90  "Breakfast dah makan… kurang disiplin."   (take 1, src 0.00–5.90)
//     5.90–14.35 "Check structure breakfast… yang sesuai." (take 2, src 0.85–9.30)
//    14.35–22.30 "Portion cukup… untuk semua orang."      (take 3, src 0.00–7.95)
//    22.30–27.75 "Cuba audit breakfast… restriction."     (take 4, src 0.00–5.45)
// The CTA was not recorded, so it is an end card. Times below are output seconds (Whisper medium word starts).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Line, Mark, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { CtaPill, Stack } from "./formats/common";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R0510-lapar-full.mp4";
const CLIP_LEN = 834;
const s = (sec: number) => Math.round(sec * FPS);

const CHECKS = [
  { label: "CHECK PROTEIN", at: s(9.09) }, // "Ada sumber protein yang jelas"
  { label: "CHECK FIBRE", at: s(10.69) }, // "ada fibre daripada buah, whole grains…"
  { label: "CHECK PORTION", at: s(14.35) }, // "Portion cukup tak…"
];
const AUDIT_AT = s(22.3); // "Cuba audit breakfast awak tiga hari…"

const Talk: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <FaceCamOpener clip={CLIP} hook={<><span style={{ color: C.marker }}>10 PAGI</span> DAH LAPAR LEPAS BREAKFAST?</>} hookSize={58} lowerTop={1180}>
      {f < AUDIT_AT ? (
        <Pop delay={CHECKS[0].at}>
          <Card style={{ width: 640, padding: "26px 40px", display: "flex", flexDirection: "column", gap: 16, ...OVER_VIDEO }}>
            {CHECKS.filter((c) => f >= c.at).map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Mark kind="check" delay={c.at + 4} size={44} />
                <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: 2 }}>{c.label}</span>
              </div>
            ))}
          </Card>
        </Pop>
      ) : (
        <Pop delay={AUDIT_AT}>
          <Card style={{ padding: "26px 50px", ...OVER_VIDEO }}>
            <span style={{ fontSize: 64, fontWeight: 800 }}>
              <Highlight delay={s(24.68)}>AUDIT 3 HARI</Highlight>
            </span>
          </Card>
        </Pop>
      )}
    </FaceCamOpener>
  );
};

const End: React.FC = () => (
  <AbsoluteFill>
    <Stack top={560} gap={16}>
      <Line size={60} weight={800}>
        Audit dulu,
      </Line>
      <Line delay={6} size={60} weight={800}>
        sebelum tambah <Highlight delay={14}>restriction.</Highlight>
      </Line>
    </Stack>
    <Stack top={900} gap={22}>
      <CtaPill icon="save" delay={18}>
        Save
      </CtaPill>
      <Line delay={24} size={46} weight={700} color={C.inkSoft}>
        dan check breakfast esok.
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0510_LAPAR_REAL_SCENES: SceneDef[] = [
  { id: "talk", dur: CLIP_LEN, el: <Talk />, cues: [...CHECKS.map((c): [number, "tick", number] => [c.at + 4, "tick", 0.3]), [AUDIT_AT, "pop", 0.3]] },
  { id: "end", dur: 90, el: <End />, cues: [[14, "swipe", 0.35], [18, "pop", 0.4], [22, "chime", 0.35]] },
];
