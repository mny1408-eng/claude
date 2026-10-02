// T3 Reactive Reel: "Kopi Is Part of the Solution" (International Coffee Day, 01/10/2026)
// Style (docs/video-style-rotation.md): kinetic type hook (wildcard for reactive topics) → Resit harian
// → end card. Silent visual reel; the caption carries the sources and the HPPC disclaimer.
// Facts used:
// - ICO 2026 campaign "Coffee is Part of the Solution"; ~12.5 million coffee-farming families (ICO).
// - UNGA A/RES/80/248 (10 Mar 2026) made 1 Oct the UN International Coffee Day.
// - Drink sugar: Homage Malaysia (secondary source, not MyFCD), so every line is marked "anggaran".
// - HPPC per serving: 15 g protein, 80 kcal, < 1/4 tsp sugar (Herbalife Malaysia launch, Aug 2022).
//   Check against the current tub label before posting.
import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, HAND } from "../theme";
import { Card, Highlight, Line, Mark, Note, Pop, Stamp, Strike, Underline } from "../kit";
import { SceneDef } from "../Reel";
import { Cue } from "../sound";

const CTA_WORD = "KOPI";

const Stack: React.FC<{ top: number; children: React.ReactNode; gap?: number }> = ({ top, children, gap = 10 }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap }}>
    {children}
  </div>
);

// Series tag, top-left (brand frame rule).
const SeriesTag: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", top: 250, left: 80, padding: "8px 20px", border: `4px solid ${C.ink}`, borderRadius: 8, fontSize: 30, fontWeight: 800, letterSpacing: 3 }}>
    {text}
  </div>
);

const BoxStamp: React.FC<{ children: React.ReactNode; delay?: number; rotate?: number; size?: number }> = ({ children, delay = 0, rotate = -6, size = 80 }) => (
  <Stamp delay={delay} rotate={rotate}>
    <div
      style={{
        border: `8px solid ${C.marker}`,
        borderRadius: 14,
        padding: "14px 34px",
        color: C.marker,
        fontSize: size,
        fontWeight: 800,
        letterSpacing: 2,
        lineHeight: 1.05,
        textAlign: "center",
        opacity: 0.92,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  </Stamp>
);

// Simple coffee cup drawn in brand colours (no stock imagery needed).
const Cup: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const f = useCurrentFrame();
  const steam = (i: number) => interpolate((f + i * 14) % 42, [0, 42], [0, -40]);
  return (
    <Pop delay={delay}>
      <svg viewBox="0 0 220 200" width={260} height={236} style={{ overflow: "visible" }}>
        {[70, 110, 150].map((x, i) => (
          <path
            key={x}
            d={`M ${x} 60 C ${x - 14} 44, ${x + 14} 30, ${x} 12`}
            fill="none"
            stroke={C.inkSoft}
            strokeWidth={7}
            strokeLinecap="round"
            opacity={0.45}
            transform={`translate(0 ${steam(i)})`}
          />
        ))}
        <path d="M 30 80 H 190 L 176 180 Q 174 192 160 192 H 60 Q 46 192 44 180 Z" fill={C.ink} />
        <path d="M 188 100 C 230 100, 230 160, 180 158" fill="none" stroke={C.ink} strokeWidth={14} />
        <rect x={30} y={80} width={160} height={16} rx={6} fill={C.gold} />
      </svg>
    </Pop>
  );
};

// ---------- 1. Hook: the day ----------
const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={360} gap={18}>
      <BoxStamp delay={4} rotate={-4} size={110}>
        1 OKTOBER
      </BoxStamp>
      <div style={{ height: 30 }} />
      <Line delay={22} size={92} weight={800}>
        <Highlight delay={34}>Hari Kopi</Highlight>
      </Line>
      <Line delay={28} size={92} weight={800}>
        Sedunia
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1050, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Cup delay={40} />
    </div>
    <Note delay={60} size={64} rotate={-3} style={{ position: "absolute", top: 1330, left: 0, right: 0, textAlign: "center" }}>
      tahun ni, pertama kali diiktiraf PBB
    </Note>
  </AbsoluteFill>
);

// ---------- 2. ICO theme ----------
const Theme: React.FC = () => (
  <AbsoluteFill>
    <Stack top={380} gap={12}>
      <Line size={54} weight={600} color={C.inkSoft}>
        Tema 2026:
      </Line>
      <Line delay={8} size={96} weight={800}>
        “Coffee is
      </Line>
      <Line delay={14} size={96} weight={800}>
        Part of the
      </Line>
      <Line delay={20} size={110} weight={800}>
        <span style={{ position: "relative" }}>
          Solution”
          <Underline delay={40} width={6} />
        </span>
      </Line>
      <Line delay={30} size={36} weight={600} color={C.inkSoft} style={{ marginTop: 18 }}>
        International Coffee Organization (ICO)
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1180, left: 120, right: 120 }}>
      <Pop delay={60} rotate={-1.5}>
        <Card style={{ padding: "30px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.2 }}>
            Kopi = rezeki untuk
            <br />
            <Highlight delay={76}>~12.5 juta</Highlight> keluarga petani
          </div>
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

// ---------- 3. Turn ----------
export const Turn: React.FC = () => (
  <AbsoluteFill>
    <Stack top={460} gap={14}>
      <Line size={60} weight={600} color={C.inkSoft}>
        Untuk berat badan pula…
      </Line>
      <Line delay={14} size={92} weight={800}>
        Kopi <Highlight delay={28}>bukan</Highlight> masalah.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={50} rotate={-5} size={74}>
        GULA DALAM
        <br />
        KOPI TU MASALAH
      </BoxStamp>
    </div>
  </AbsoluteFill>
);

// ---------- Receipt ----------
type Row = { item: string; value: string; strike?: boolean; good?: boolean };

const Receipt: React.FC<{ title: string; rows: Row[]; total?: Row; rowEvery: number; start: number; footnote: string }> = ({
  title,
  rows,
  total,
  rowEvery,
  start,
  footnote,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - 2, fps, config: { damping: 14, stiffness: 140 } });
  const shown = (i: number) => f >= start + i * rowEvery;
  const totalAt = start + rows.length * rowEvery + 10;
  const mono = { fontFamily: "'Courier New', monospace" };
  return (
    <div style={{ position: "absolute", top: 380, left: 130, width: 820, transform: `translateY(${(1 - s) * -300}px) rotate(-1deg)`, opacity: f < 2 ? 0 : 1 }}>
      <div
        style={{
          background: C.card,
          padding: "40px 48px 34px",
          boxShadow: "0 16px 40px rgba(40,40,20,0.18), 0 2px 6px rgba(40,40,20,0.1)",
          // torn bottom edge
          clipPath: "polygon(0 0, 100% 0, 100% 97%, 95% 100%, 90% 97%, 85% 100%, 80% 97%, 75% 100%, 70% 97%, 65% 100%, 60% 97%, 55% 100%, 50% 97%, 45% 100%, 40% 97%, 35% 100%, 30% 97%, 25% 100%, 20% 97%, 15% 100%, 10% 97%, 5% 100%, 0 97%)",
        }}
      >
        <div style={{ ...mono, textAlign: "center", fontSize: 44, fontWeight: 800, letterSpacing: 4 }}>{title}</div>
        <div style={{ ...mono, textAlign: "center", fontSize: 26, color: C.inkSoft, marginTop: 6 }}>sudu teh gula · anggaran</div>
        <div style={{ borderTop: "4px dashed #CFC8B6", margin: "26px 0 18px" }} />
        {rows.map((r, i) => (
          <div
            key={r.item}
            style={{
              ...mono,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontSize: 44,
              fontWeight: 700,
              padding: "12px 0",
              opacity: shown(i) ? 1 : 0,
              color: r.good ? C.ink : C.ink,
            }}
          >
            <span style={{ position: "relative" }}>
              {r.item}
              {r.strike && shown(i) && <Strike delay={start + i * rowEvery + 30} />}
            </span>
            <span style={{ fontWeight: 800, color: r.good ? C.ink : C.marker }}>{r.value}</span>
          </div>
        ))}
        {total && (
          <>
            <div style={{ borderTop: "4px dashed #CFC8B6", margin: "18px 0 12px", opacity: f >= totalAt ? 1 : 0 }} />
            <div style={{ ...mono, display: "flex", justifyContent: "space-between", fontSize: 54, fontWeight: 800, opacity: f >= totalAt ? 1 : 0 }}>
              <span>{total.item}</span>
              <span style={{ color: total.good ? C.ink : C.marker }}>
                <Highlight delay={totalAt + 6}>{total.value}</Highlight>
              </span>
            </div>
          </>
        )}
        <div style={{ ...mono, fontSize: 24, color: C.inkSoft, marginTop: 28, textAlign: "center" }}>{footnote}</div>
      </div>
    </div>
  );
};

// ---------- 4. Resit: a normal kopi day ----------
const RESIT_ROW = 40;
export const ResitBefore: React.FC = () => (
  <AbsoluteFill>
    <SeriesTag text="RESIT #01" />
    <Receipt
      title="RESIT KOPI HARIAN"
      rows={[
        { item: "Teh tarik (pagi)", value: "~4.5" },
        { item: "Kopi ais (ptg)", value: "~4" },
      ]}
      total={{ item: "JUMLAH", value: "~8.5 sudu" }}
      rowEvery={RESIT_ROW}
      start={20}
      footnote="anggaran, ikut kedai & saiz gelas"
    />
    <Note delay={150} size={72} rotate={-4} style={{ position: "absolute", top: 1040, left: 0, right: 0, textAlign: "center" }}>
      2 gelas je tu…
    </Note>
  </AbsoluteFill>
);

// ---------- 5. Resit: the swap ----------
const SWAP_ROW = 50;
const SWAPS = [
  { item: "Kopi O kosong", value: "~0" },
  { item: "Protein coffee*", value: "< ¼" },
];

// pack: product photo in public/img/ (not in git). Without it the scene is text only.
export const ResitSwap: React.FC<{ pack?: string }> = ({ pack }) => {
  const f = useCurrentFrame();
  const textTop = pack ? 1290 : 900;
  return (
    <AbsoluteFill>
      <SeriesTag text="RESIT #01" />
      <Receipt
        title="VERSI SWAP"
        rows={SWAPS.map((r) => ({ ...r, good: true }))}
        rowEvery={SWAP_ROW}
        start={20}
        footnote="*HPPC: 15g protein · 80 kcal / serving"
      />
      {SWAPS.map((_, i) =>
        f >= 20 + i * SWAP_ROW ? (
          <div key={i} style={{ position: "absolute", top: 610 + i * 74, left: 40 }}>
            <Mark kind="check" delay={20 + i * SWAP_ROW + 8} size={64} />
          </div>
        ) : null,
      )}
      {pack && (
        <div style={{ position: "absolute", top: 790, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <Pop delay={96} rotate={-4}>
            <Img src={staticFile(`img/${pack}`)} style={{ height: 460, filter: "drop-shadow(0 16px 24px rgba(40,40,20,0.28))" }} />
          </Pop>
        </div>
      )}
      <Stack top={textTop} gap={8}>
        <Line delay={140} size={64} weight={800}>
          Masih dapat <Highlight delay={152}>kopi</Highlight>.
        </Line>
        <Line delay={150} size={64} weight={800}>
          Gula jauh lebih sikit.
        </Line>
      </Stack>
      <Note delay={175} size={44} rotate={0} color={C.inkSoft} style={{ position: "absolute", top: textTop + 230, left: 0, right: 0, textAlign: "center" }}>
        sokongan nutrisi, bukan ubat · ada kafein
      </Note>
    </AbsoluteFill>
  );
};

// ---------- 6. Tips ----------
const TIPS = [
  { t: "Turun level gula", s: "manis → kurang manis → kosong" },
  { t: "Elak kopi lewat petang", s: "jaga tidur" },
  { t: "Kopi + protein", s: "bukan kopi + kuih" },
];
const TIP_EVERY = 50;

// tipAt: frame each card pops in (defaults to an even rhythm).
export const Tips: React.FC<{ tipAt?: number[] }> = ({ tipAt = TIPS.map((_, i) => 20 + i * TIP_EVERY) }) => (
  <AbsoluteFill>
    <Stack top={320}>
      <Line size={70} weight={800}>
        <Highlight delay={10}>3 tips</Highlight> kopi lebih tersusun
      </Line>
    </Stack>
    {TIPS.map((tip, i) => (
      <div key={tip.t} style={{ position: "absolute", top: 560 + i * 250, left: 110, right: 110 }}>
        <Pop delay={tipAt[i]} rotate={i % 2 ? 1 : -1}>
          <Card style={{ padding: "28px 36px", display: "flex", alignItems: "center", gap: 28 }}>
            <div style={{ width: 84, height: 84, borderRadius: "50%", background: C.ink, color: C.paper, fontSize: 48, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1 }}>{tip.t}</div>
              <div style={{ fontFamily: HAND, fontSize: 50, fontWeight: 700, color: C.marker, marginTop: 6 }}>{tip.s}</div>
            </div>
          </Card>
        </Pop>
      </div>
    ))}
  </AbsoluteFill>
);

// ---------- 7. CTA ----------
// pillAt: frame the comment pill pops in.
export const CTA: React.FC<{ pillAt?: number }> = ({ pillAt = 50 }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Cup delay={2} />
    </div>
    <Stack top={660} gap={8}>
      <Line delay={8} size={70} weight={600}>
        Kopi pun boleh jadi
      </Line>
      <Line delay={16} size={92} weight={800}>
        <Highlight delay={28}>part of the solution</Highlight>
      </Line>
      <Line delay={22} size={70} weight={600}>
        untuk berat badan awak.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1090, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={pillAt}>
        <div style={{ background: C.ink, color: C.paper, borderRadius: 999, padding: "26px 60px", fontSize: 56, fontWeight: 800 }}>
          Komen “{CTA_WORD}”
        </div>
      </Pop>
    </div>
    <Note delay={pillAt + 14} size={56} rotate={-2} style={{ position: "absolute", top: 1260, left: 0, right: 0, textAlign: "center" }}>
      saya guide step by step
    </Note>
  </AbsoluteFill>
);

const t3Scenes = (hook: SceneDef, pack?: string): SceneDef[] => [
  hook,
  { id: "theme", dur: 150, el: <Theme />, cues: [[4, "whoosh", 0.45], [40, "scribble", 0.4], [60, "pop", 0.5], [76, "swipe", 0.45]] },
  { id: "turn", dur: 110, el: <Turn />, cues: [[4, "whoosh", 0.4], [28, "swipe", 0.45], [50, "stamp", 0.85]] },
  {
    id: "resit",
    dur: 200,
    el: <ResitBefore />,
    cues: [[2, "whoosh", 0.5], [20, "tick", 0.5], [60, "tick", 0.5], [110, "pop", 0.5], [116, "swipe", 0.5], [150, "scribble", 0.35]],
  },
  {
    id: "swap",
    dur: 220,
    el: <ResitSwap pack={pack} />,
    cues: [[2, "whoosh", 0.5], [28, "tick", 0.6], [78, "tick", 0.6], ...(pack ? ([[96, "pop", 0.5]] as Cue[]) : []), [140, "pop", 0.45], [152, "swipe", 0.45]],
  },
  { id: "tips", dur: 200, el: <Tips />, cues: [[10, "swipe", 0.45], [20, "pop", 0.5], [70, "pop", 0.5], [120, "pop", 0.5]] },
  { id: "cta", dur: 150, el: <CTA />, cues: [[2, "pop", 0.45], [28, "swipe", 0.45], [50, "pop", 0.55], [54, "chime", 0.45], [64, "scribble", 0.35]] },
];

const TEXT_HOOK: SceneDef = { id: "hook", dur: 120, el: <Hook />, cues: [[4, "stamp", 0.85], [22, "whoosh", 0.4], [34, "swipe", 0.45], [40, "pop", 0.45], [60, "scribble", 0.35]] };

export const T3_SCENES = t3Scenes(TEXT_HOOK);

// HPPC pack shot, cut out from the reference poster. Lives in public/img/ (not in git).
export const T3_PACK_FILE = "hppc-pack.png";

// ---------- Clip version: Coach Nas making coffee opens the reel ----------
// Real footage as the hook, with the day stamped over it, then the same reel from scene 2.
// The clip lives in public/clips/ on the production PC (not in git). Vertical, 4–6 s, no music.
export const T3_CLIP_FILE = "coffee-bancuh.mp4";
const CLIP_DUR = 150;

const ClipHook: React.FC<{ file: string }> = ({ file }) => {
  const f = useCurrentFrame();
  // Fade the paper back in over the last half-second so the cut into scene 2 is soft.
  const out = interpolate(f, [CLIP_DUR - 15, CLIP_DUR], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: out }}>
        <OffthreadVideo src={staticFile(`clips/${file}`)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* top shade so the handle and text stay readable on any footage */}
        <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(247,245,237,0.85) 0%, rgba(247,245,237,0) 45%)" }} />
      </AbsoluteFill>
      <Stack top={250} gap={14}>
        <BoxStamp delay={10} rotate={-4} size={92}>
          1 OKTOBER
        </BoxStamp>
        <div style={{ height: 10 }} />
        <Pop delay={28}>
          <div style={{ background: C.paper, borderRadius: 14, padding: "14px 34px", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}>
            <Line delay={28} size={76} weight={800}>
              <Highlight delay={40}>Hari Kopi</Highlight> Sedunia
            </Line>
          </div>
        </Pop>
      </Stack>
    </AbsoluteFill>
  );
};

// Stock footage works here too (e.g. a Pexels/Pixabay pour shot): save it under the same name.
export const t3ClipScenes = (file: string = T3_CLIP_FILE, pack: string = T3_PACK_FILE): SceneDef[] =>
  t3Scenes({ id: "clip-hook", dur: CLIP_DUR, el: <ClipHook file={file} />, cues: [[10, "stamp", 0.85], [28, "pop", 0.45], [40, "swipe", 0.45]] }, pack);

// ---------- Animated version: drawn scoop → shake → pour, no footage needed ----------
const LATTE = "#C9A27E";
const ANIM_DUR = 150;

export const AnimHook: React.FC = () => {
  const f = useCurrentFrame();
  const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  // 0–34 scoop drops in · 34–74 shake · 74–92 tilt over the glass · 92–135 pour
  const scoopY = interpolate(f, [4, 24], [-260, 0], c);
  const scoopTip = interpolate(f, [24, 32], [0, 70], c);
  const powder = interpolate(f, [26, 40], [0, 1], c);
  const shaking = f >= 34 && f < 74;
  const shakeRot = shaking ? Math.sin((f - 34) * 0.9) * 9 : 0;
  const shakeY = shaking ? Math.sin((f - 34) * 1.8) * 12 : 0;
  const tilt = interpolate(f, [74, 92], [0, 1], c);
  const pour = interpolate(f, [92, 135], [0, 1], c);
  const streamOn = f >= 90 && f < 138;
  const fill = 300 * pour; // liquid height in the glass
  const level = 130 * (pour > 0 ? 1 - pour : powder); // liquid height in the shaker
  return (
    <AbsoluteFill>
      <Stack top={250} gap={14}>
        <BoxStamp delay={6} rotate={-4} size={92}>
          1 OKTOBER
        </BoxStamp>
        <div style={{ height: 6 }} />
        <Line delay={20} size={76} weight={800}>
          <Highlight delay={32}>Hari Kopi</Highlight> Sedunia
        </Line>
      </Stack>
      <svg viewBox="0 0 800 820" width={1000} height={1025} style={{ position: "absolute", top: 560, left: 40, overflow: "visible" }}>
        {/* glass with ice */}
        <g transform="translate(470 360)">
          <clipPath id="glass">
            <path d="M 0 0 H 220 L 200 380 Q 198 400 178 400 H 42 Q 22 400 20 380 Z" />
          </clipPath>
          <g clipPath="url(#glass)">
            <rect x={0} y={400 - fill} width={220} height={fill} fill={LATTE} />
            {[[34, 322], [104, 330], [64, 258], [134, 266], [90, 196]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width={58} height={58} rx={10} fill="#FFFFFF" opacity={0.8} stroke={C.ink} strokeWidth={3} transform={`rotate(${(i % 2 ? 8 : -6)} ${x + 29} ${y + 29})`} />
            ))}
          </g>
          <path d="M 0 0 H 220 L 200 380 Q 198 400 178 400 H 42 Q 22 400 20 380 Z" fill="none" stroke={C.ink} strokeWidth={8} />
        </g>
        {/* pour stream */}
        {/* from the tilted shaker mouth (≈ 651, 315) down to the liquid */}
        {streamOn && <rect x={630} y={315} width={22} height={interpolate(f, [90, 96], [0, 445 - fill], c)} rx={11} fill={LATTE} />}
        {/* shaker: shakes, then tilts over the glass */}
        <g transform={`translate(${170 + tilt * 300} ${400 - tilt * 170 + shakeY}) rotate(${shakeRot + tilt * 115})`}>
          <rect x={-90} y={-170} width={180} height={340} rx={24} fill={C.card} stroke={C.ink} strokeWidth={8} />
          <rect x={-100} y={-200} width={200} height={44} rx={12} fill={C.ink} />
          {/* liquid sits at the base, then runs to the mouth once the shaker tips */}
          <rect x={-82} y={tilt > 0.5 ? -156 : 162 - level} width={164} height={level} rx={18} fill={LATTE} />
          <text x={0} y={30} textAnchor="middle" fontSize={34} fontWeight={800} fill={C.ink} opacity={0.5}>
            SHAKE
          </text>
        </g>
        {/* scoop */}
        {f < 40 && (
          <g transform={`translate(170 ${120 + scoopY}) rotate(${scoopTip})`} opacity={interpolate(f, [32, 40], [1, 0], c)}>
            <rect x={-10} y={-150} width={20} height={130} rx={10} fill={C.ink} />
            <path d="M -50 -30 H 50 Q 50 30 0 30 Q -50 30 -50 -30 Z" fill={C.ink} />
            <ellipse cx={0} cy={-30} rx={46} ry={12} fill={LATTE} opacity={1 - powder} />
          </g>
        )}
      </svg>
      <Note delay={36} size={60} rotate={-3} style={{ position: "absolute", top: 1540, left: 0, right: 0, textAlign: "center" }}>
        {f < 80 ? "2 scoop · air · shake" : "tuang atas ais"}
      </Note>
    </AbsoluteFill>
  );
};

export const t3AnimScenes = (pack: string = T3_PACK_FILE): SceneDef[] =>
  t3Scenes(
    {
      id: "anim-hook",
      dur: ANIM_DUR,
      el: <AnimHook />,
      cues: [[6, "stamp", 0.85], [24, "pop", 0.45], [36, "swipe", 0.4], [50, "swipe", 0.4], [62, "swipe", 0.4], [76, "whoosh", 0.45], [92, "scribble", 0.35]],
    },
    pack,
  );
