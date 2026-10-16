// Reel 1 (16/10) "World Food Day: makan berkhasiat tak perlu troli mahal" — full talk, Notion 📅 16/10/2026 — World Food Day:
// Makan Sihat Bajet, IG REEL 1. Hook card = Notion cover; overlays = Notion list (MAKANAN BIASA PUN BOLEH · PROTEIN IKUT BAJET ·
// SAYUR YANG AWAK GUNA · KURANGKAN PEMBAZIRAN); end card = Notion CTA (Save). Guardrail: no prices, no "healthy is always cheap".
// The take ends mid-sentence ("And cuba kurangkan makanan ni…" is cut off by the app), so the reel stops at "…lebih baik." and
// the last scripted beat (kurangkan pembaziran, beli ikut keperluan) goes on the end card instead.
// Media (local only, gitignored):
//   public/clips/R1610-wfd-full.mp4   Teleprompter 16/10 14:15:19 split in two by the app, joined, 28.5s: take 1 src 0.90–14.95
//                                     (its cut-off "roti ikut" dropped), take 2 src 0.00–14.40.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Mark, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { CENTER, Chip, CtaPill } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, LowerBand, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1610-wfd-full.mp4";
const CLIP_LEN = 855;
const ZOOM = 1; // no zoom: keeps the head centred (Coach Nas, 17/10); LowerBand alone crops the chest
const END = 105;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.0, 0.64, "Makanan"], [0.64, 0.84, "yang"], [0.84, 1.18, "healthy"], [1.18, 1.46, "tak"], [1.46, 1.94, "semestinya"], [1.94, 2.36, "perlukan"], [2.36, 2.74, "trolley"], [2.74, 2.92, "yang"], [2.92, 3.4, "mahal."], [3.56, 3.84, "Jadi"],
  [3.84, 4.06, "tak"], [4.06, 4.26, "payah"], [4.26, 4.48, "kena"], [4.48, 5.0, "fikir"], [5.2, 5.38, "nak"], [5.38, 5.62, "beli"], [5.62, 5.94, "benda-benda"], [5.94, 6.08, "yang"], [6.08, 6.58, "pelik-pelik"], [6.58, 6.84, "kan."],
  [6.94, 7.26, "Mula"], [7.26, 7.46, "dengan"], [7.46, 7.84, "makanan"], [7.84, 8.02, "yang"], [8.02, 8.2, "memang"], [8.2, 8.5, "kita"], [8.5, 8.86, "biasa"], [8.86, 9.3, "beli."], [9.54, 10.02, "Contohnya"], [10.02, 10.5, "nasi,"],
  [10.6, 11.1, "roti,"], [11.76, 12.18, "sayur-sayuran,"], [12.4, 12.44, "apa"], [12.44, 12.6, "yang"], [12.6, 12.9, "keluarga"], [12.9, 13.0, "awak"], [13.0, 13.22, "selalu"], [13.22, 13.6, "makan."], [13.6, 13.96, "Lepas"], [13.96, 14.1, "tu"],
  [14.1, 14.42, "protein"], [14.42, 14.66, "ikut"], [14.66, 15.06, "bajet,"], [15.06, 15.34, "macam"], [15.34, 15.8, "tauhu,"], [15.96, 16.2, "ikan,"], [16.5, 17.0, "tempe,"], [17.26, 17.86, "kekacang."], [17.86, 18.28, "Sayur"], [18.28, 18.46, "pula,"],
  [18.46, 18.8, "pilih"], [18.8, 19.02, "awak"], [19.02, 19.28, "yang"], [19.28, 19.68, "memang"], [19.68, 20.0, "boleh"], [20.0, 20.6, "habiskan."], [20.8, 21.06, "Saya"], [21.06, 21.18, "tak"], [21.18, 21.36, "cakap"], [21.36, 21.62, "makan"],
  [21.62, 21.84, "sihat"], [21.84, 22.02, "tu"], [22.02, 22.28, "selalu"], [22.28, 22.6, "murah"], [22.6, 22.74, "tau,"], [22.74, 22.96, "sebab"], [22.96, 23.26, "akses"], [23.26, 23.46, "dan"], [23.46, 23.74, "bajet"], [23.74, 24.02, "setiap"],
  [24.02, 24.24, "orang"], [24.24, 24.48, "ni"], [24.48, 25.1, "lain-lain."], [25.26, 25.6, "Tapi"], [25.6, 26.02, "pilihan"], [26.02, 26.16, "yang"], [26.16, 26.6, "biasa"], [26.6, 26.78, "pun"], [26.78, 26.98, "boleh"], [26.98, 27.24, "kita"],
  [27.24, 27.56, "susun"], [27.56, 27.8, "dengan"], [27.8, 28.02, "lebih"], [28.02, 28.3, "baik."],
];

const Trolley: React.FC<{ size?: number }> = ({ size = 70 }) => (
  <svg viewBox="0 0 100 90" width={size * 1.1} height={size}>
    <path d="M 4 10 H 20 L 32 62 H 84 L 94 26 H 26" fill="none" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
    <circle cx={40} cy={78} r={7} fill={C.ink} />
    <circle cx={76} cy={78} r={7} fill={C.ink} />
  </svg>
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
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, maxWidth: 830 }}>
    {items.map(([x, at], i) => (
      <Chip key={x} delay={f(at)} rotate={i % 2 ? 2 : -2} size={size}>
        {x}
      </Chip>
    ))}
  </div>
);

const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 0.3) return null;
  if (t < 3.56)
    return (
      <Pop delay={f(0.3)} rotate={-1}>
        <Card style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 24px", ...OVER_VIDEO }}>
          <span style={{ position: "relative", display: "inline-flex" }}>
            <Trolley size={58} />
            <Strike delay={f(2.92)} width={8} />
          </span>
          <span style={{ fontSize: 38, fontWeight: 800 }}>tak perlu troli mahal</span>
        </Card>
      </Pop>
    );
  if (t < 6.9)
    return (
      <span style={{ position: "relative", display: "inline-block" }}>
        <Chip delay={f(4.48)} rotate={1.5} size={38}>
          benda-benda pelik
        </Chip>
        <Strike delay={f(6.1)} width={6} />
      </span>
    );
  if (t < 13.6)
    return (
      <Col>
        <Dark at={6.94}>MAKANAN BIASA PUN BOLEH</Dark>
        <Row items={[["nasi", 10.02], ["roti", 10.6], ["sayur-sayuran", 11.76]]} />
      </Col>
    );
  if (t < 17.86)
    return (
      <Col>
        <Dark at={14.1}>PROTEIN IKUT BAJET</Dark>
        <Row items={[["tauhu", 15.34], ["ikan", 15.96], ["tempe", 16.5], ["kekacang", 17.26]]} />
      </Col>
    );
  if (t < 20.8)
    return (
      <Col>
        <Dark at={17.86}>SAYUR YANG AWAK GUNA</Dark>
        <Pop delay={f(19.68)} rotate={1.5}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 34, fontWeight: 800, padding: "8px 22px", borderRadius: 16, background: C.card, ...OVER_VIDEO }}>
            <Mark kind="check" delay={f(20.0)} size={32} /> yang memang boleh habis
          </span>
        </Pop>
      </Col>
    );
  if (t < 25.26)
    return (
      <Col>
        <Pop delay={f(21.62)} rotate={-1.5}>
          <span style={{ position: "relative", display: "inline-block", fontSize: 36, fontWeight: 800, padding: "10px 22px", borderRadius: 16, background: C.card, color: C.inkSoft, ...OVER_VIDEO }}>
            makan sihat = selalu murah
            <Strike delay={f(22.3)} width={5} />
          </span>
        </Pop>
        <Chip delay={f(22.96)} rotate={2} size={34}>
          akses &amp; bajet setiap orang lain-lain
        </Chip>
      </Col>
    );
  return (
    <Pop delay={f(25.6)} rotate={-1}>
      <Card style={{ padding: "14px 28px", fontSize: 40, fontWeight: 800, textAlign: "center", ...OVER_VIDEO }}>
        pilihan biasa pun boleh
        <br />
        <span style={{ color: C.marker }}>disusun lebih baik</span>
      </Card>
    </Pop>
  );
};

const Hook = (
  <>
    WORLD FOOD DAY: <span style={{ color: C.marker }}>MAKAN BERKHASIAT TAK PERLU TROLI MAHAL</span>
  </>
);

const End: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} muted startFrom={CLIP_LEN - 4} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${ZOOM})`, transformOrigin: "50% 0%" }} />
    <AbsoluteFill style={{ background: "rgba(23,60,48,0.35)" }} />
    <LowerBand from={1780} fade={40} />
    <div style={{ position: "absolute", top: 1050, left: CENTER.left, right: CENTER.right, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <Pop delay={2} rotate={-1.5}>
        <div style={{ background: C.ink, color: C.paper, borderRadius: 18, padding: "12px 26px", fontSize: 44, fontWeight: 800, whiteSpace: "nowrap", ...OVER_VIDEO }}>KURANGKAN PEMBAZIRAN</div>
      </Pop>
      <Chip delay={10} rotate={1.5} size={36}>
        beli ikut keperluan
      </Chip>
      <div style={{ transform: "scale(0.85)", marginTop: 8 }}>
        <CtaPill icon="save" delay={24}>
          Save untuk ke pasar raya
        </CtaPill>
      </div>
    </div>
  </AbsoluteFill>
);

export const R1610_WFD_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <FaceCamOpener clip={CLIP} hook={Hook} hookSize={50} zoom={ZOOM} />
        <LowerBand from={1780} fade={40} />
        <div style={{ position: "absolute", top: 1335, left: CENTER.left, right: CENTER.right, display: "flex", justifyContent: "center" }}>
          <Lower />
        </div>
        <Captions words={WORDS} top={1100} size={58} left={CENTER.left} right={CENTER.right} />
      </>
    ),
    cues: [
      [f(0.3), "pop", 0.3],
      [f(2.92), "scribble", 0.3],
      [f(6.94), "pop", 0.3],
      [f(14.1), "pop", 0.3],
      [f(17.86), "pop", 0.3],
      [f(22.3), "scribble", 0.3],
      [f(25.6), "pop", 0.3],
    ],
  },
  { id: "end", dur: END, el: <End />, cues: [[2, "pop", 0.35], [24, "chime", 0.3]] },
];
