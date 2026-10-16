// Reel 1 (17/10) "Healthy, Unhealthy, Fake Healthy?" — full talk, Notion 📅 17/10/2026 — Fake Healthy dan Side Project Jujur,
// IG REEL 1. Hook card = Notion cover; overlays = Notion list (HEALTHY? UNHEALTHY? FAKE HEALTHY? · MAKANAN JARANG SESIMPLE ITU ·
// TENGOK PORTION + INGREDIENTS · PATTERN KESELURUHAN); end card = Notion CTA (comment a claim). Guardrail: no named food called
// deceptive or inherently unhealthy. The take ends mid-sentence after "…daily lifestyle lah." (app cut), so the closing question
// goes on the end card.
// Media (local only, gitignored):
//   public/clips/R1710-label-full.mp4   Teleprompter 16/10 14:16:05 split in two by the app, joined, 23.7s: take 1 src 0.55–14.92,
//                                       take 2 src 0.62–2.10 + 3.60–11.36 (repeated "ataupun" at the seam and a 1.5s pause cut).
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { CENTER, Chip, CtaPill } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, LowerBand, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1710-label-full.mp4";
const CLIP_LEN = 711;
const ZOOM = 1.12; // with LowerBand: crops the lower chest out of frame
const END = 105;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.0, 0.7, "Healthy,"], [0.94, 1.4, "unhealthy,"], [1.76, 1.82, "fake"], [1.82, 2.32, "healthy."], [2.62, 2.8, "Label"], [2.8, 3.06, "mana"], [3.06, 3.3, "yang"], [3.3, 3.62, "paling"], [3.62, 4.18, "confusing?"], [4.84, 5.16, "Sekarang"],
  [5.16, 5.42, "memang"], [5.42, 5.68, "tengah"], [5.68, 5.86, "trend"], [5.86, 6.1, "kan"], [6.1, 6.34, "letak"], [6.34, 6.7, "makanan"], [6.7, 6.98, "dalam"], [6.98, 7.24, "tiga"], [7.24, 7.64, "kotak"], [7.64, 7.84, "tu."],
  [8.0, 8.24, "Tapi"], [8.24, 8.6, "bagi"], [8.6, 9.14, "saya,"], [9.44, 9.88, "makanan"], [9.88, 10.36, "jarang"], [10.36, 10.96, "sesimple"], [10.96, 11.42, "itulah."], [11.72, 11.82, "Satu"], [11.82, 12.2, "makanan"], [12.2, 12.36, "tak"],
  [12.36, 13.1, "automatik,"], [13.76, 14.24, "bagus"], [14.24, 14.8, "ataupun"], [15.0, 15.24, "tak"], [15.24, 15.58, "bagus."], [16.4, 16.72, "Saya"], [16.72, 16.92, "lebih"], [16.92, 17.14, "suka"], [17.14, 17.44, "tengok"], [17.44, 17.8, "portion,"],
  [18.06, 18.5, "ingredients,"], [18.74, 18.9, "berapa"], [18.9, 19.08, "kerap"], [19.08, 19.22, "awak"], [19.22, 19.56, "makan"], [19.56, 19.88, "and"], [19.88, 20.6, "pattern"], [20.6, 21.4, "keseluruhan"], [21.74, 22.24, "in"], [22.24, 22.38, "your"],
  [22.38, 22.68, "daily"], [22.68, 23.0, "lifestyle"], [23.0, 23.24, "lah."],
];

const BOXES: [string, string, number][] = [
  ["HEALTHY?", "#3E7D5A", 0.0],
  ["UNHEALTHY?", "#B5412E", 0.94],
  ["FAKE HEALTHY?", "#C9963F", 1.76],
];

const Box: React.FC<{ label: string; color: string; at: number; small?: boolean }> = ({ label, color, at, small }) => (
  <Pop delay={f(at)} rotate={at % 2 ? 2 : -2}>
    <div style={{ background: C.card, border: `5px solid ${color}`, color, borderRadius: 14, padding: small ? "4px 14px" : "8px 18px", fontSize: small ? 26 : 34, fontWeight: 800, whiteSpace: "nowrap", ...OVER_VIDEO }}>
      {label}
    </div>
  </Pop>
);

const Dark: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => (
  <Pop delay={f(at)} rotate={-1.5}>
    <div style={{ background: C.ink, color: C.paper, borderRadius: 18, padding: "12px 26px", fontSize: 42, fontWeight: 800, textAlign: "center", whiteSpace: "nowrap", ...OVER_VIDEO }}>{children}</div>
  </Pop>
);

const Col: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>{children}</div>
);

const Row: React.FC<{ items: [string, number][]; size?: number }> = ({ items, size = 34 }) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
    {items.map(([x, at], i) => (
      <Chip key={x} delay={f(at)} rotate={i % 2 ? 2 : -2} size={size}>
        {x}
      </Chip>
    ))}
  </div>
);

const Struck: React.FC<{ at: number; strikeAt: number; children: React.ReactNode }> = ({ at, strikeAt, children }) => (
  <Pop delay={f(at)} rotate={-1.5}>
    <span style={{ position: "relative", display: "inline-block", fontSize: 36, fontWeight: 800, padding: "10px 22px", borderRadius: 16, background: C.card, color: C.inkSoft, ...OVER_VIDEO }}>
      {children}
      <Strike delay={f(strikeAt)} width={5} />
    </span>
  </Pop>
);

const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 4.8)
    return (
      <div style={{ display: "flex", gap: 12 }}>
        {BOXES.map(([l, c, at]) => (
          <Box key={l} label={l} color={c} at={at} />
        ))}
      </div>
    );
  if (t < 8.0)
    return (
      <Col>
        <Chip delay={f(4.84)} rotate={-1.5} size={36}>
          trend: letak makanan dalam 3 kotak
        </Chip>
        <div style={{ display: "flex", gap: 8 }}>
          {BOXES.map(([l, c], i) => (
            <Box key={l} label={l} color={c} at={6.98 + i * 0.12} small />
          ))}
        </div>
      </Col>
    );
  if (t < 11.72) return <Dark at={9.44}>MAKANAN JARANG SESIMPLE ITU</Dark>;
  if (t < 16.4)
    return (
      <Col>
        <Chip delay={f(11.72)} rotate={1.5} size={36}>
          satu makanan tak automatik…
        </Chip>
        <div style={{ display: "flex", gap: 12 }}>
          <Struck at={13.76} strikeAt={15.6}>
            bagus
          </Struck>
          <Struck at={15.0} strikeAt={15.8}>
            tak bagus
          </Struck>
        </div>
      </Col>
    );
  if (t < 19.56)
    return (
      <Col>
        <Dark at={16.72}>TENGOK PORTION + INGREDIENTS</Dark>
        <Row items={[["portion", 17.44], ["ingredients", 18.06], ["berapa kerap", 18.74]]} />
      </Col>
    );
  return (
    <Col>
      <Dark at={19.88}>PATTERN KESELURUHAN</Dark>
      <Chip delay={f(22.38)} rotate={2} size={34}>
        dalam rutin harian awak
      </Chip>
    </Col>
  );
};

const Hook = (
  <>
    HEALTHY, UNHEALTHY, <span style={{ color: C.marker }}>FAKE HEALTHY?</span>
  </>
);

const End: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} muted startFrom={CLIP_LEN - 4} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${ZOOM})`, transformOrigin: "50% 0%" }} />
    <AbsoluteFill style={{ background: "rgba(23,60,48,0.35)" }} />
    <LowerBand />
    <div style={{ position: "absolute", top: 1050, left: CENTER.left, right: CENTER.right, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <Pop delay={2} rotate={-1}>
        <Card style={{ padding: "16px 30px", fontSize: 44, fontWeight: 800, textAlign: "center", lineHeight: 1.2, ...OVER_VIDEO }}>
          Claim mana yang
          <br />
          <span style={{ color: C.marker }}>paling mengelirukan?</span>
        </Card>
      </Pop>
      <div style={{ transform: "scale(0.85)", marginTop: 8 }}>
        <CtaPill icon="comment" delay={20}>
          Comment kat bawah
        </CtaPill>
      </div>
    </div>
  </AbsoluteFill>
);

export const R1710_LABEL_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <FaceCamOpener clip={CLIP} hook={Hook} hookSize={54} zoom={ZOOM} />
        <LowerBand />
        <div style={{ position: "absolute", top: 1335, left: CENTER.left, right: CENTER.right, display: "flex", justifyContent: "center" }}>
          <Lower />
        </div>
        <Captions words={WORDS} top={1100} size={58} left={CENTER.left} right={CENTER.right} />
      </>
    ),
    cues: [
      [f(0.0) + 3, "pop", 0.3],
      [f(0.94), "pop", 0.3],
      [f(1.76), "pop", 0.3],
      [f(9.44), "pop", 0.3],
      [f(15.6), "scribble", 0.3],
      [f(16.72), "pop", 0.3],
      [f(19.88), "pop", 0.3],
    ],
  },
  { id: "end", dur: END, el: <End />, cues: [[2, "pop", 0.35], [20, "chime", 0.3]] },
];
