// Reel A (GLP-1) "Macam mana ubat GLP-1 berfungsi" — hybrid: face-cam hook, then voice + drawn scenes.
// Script: final safe version agreed in chat (no brand names, no regulator claims, no Herbalife link; "doktor yang tentukan").
// Mechanism wording kept to what the script says (Drucker 2018 Cell Metab; side effects / slow titration: Wilding 2021 NEJM).
// Media (local only, gitignored):
//   public/clips/R-glp1-opener.mp4   Teleprompter 14/10 10:01, src 0.55–8.55: "Semua orang tengah hype tentang ubat GLP-1…"
//   public/voice/R-glp1/source.mp3   Teleprompter 14/10 10:09, src 0.70–end, with a dead pause and a breath (68.60–70.35) cut.
// Times below are seconds in the original voice recording (Whisper medium, unprompted); v() maps them past the cut.
import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, SAFE, Stack, Typed } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener } from "./formats/FaceCamOpener";
import { PaperTear } from "./formats/PaperTear";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R-glp1-opener.mp4";
const AUDIO = "voice/R-glp1/source.mp3";
const CLIP_FROM = 0.55;
const CLIP_LEN = 240;
const ZOOM = 1.1; // also pushes the lanyard badge out of frame
const TEAR = 16;
const CUT = { at: 68.6, len: 1.75 };
const v = (t: number) => (t > CUT.at ? t - CUT.len : t);

const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: CLIP_FROM, voiceFrom: 0.7 });
const w = (s: number, t: number) => tl.w(s, v(t));
const st = (t: number) => tl.start(v(t));

const starts = {
  usus: CLIP_LEN,
  mesej: st(6.74),
  hilang: st(19.44),
  k3: st(32.06),
  bentuk: st(37.9),
  kesan: st(46.3),
  dos: st(52.68),
  alat: st(59.92),
  asas: st(72.58),
  cta: st(83.86),
  end: tl.end(v(87.6), 2.4),
};

const RED = "#B5412E";

// ---------- drawn organs & icons (original SVG) ----------

const Face: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={-14} cy={0} r={5} fill={C.ink} />
    <circle cx={14} cy={0} r={5} fill={C.ink} />
    <path d="M -10 12 Q 0 20 10 12" stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

const Usus: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: "visible" }}>
    <path d="M 44 46 H 156 Q 182 46 182 72 Q 182 98 156 98 H 44 Q 18 98 18 124 Q 18 150 44 150 H 156" stroke="#D9837A" strokeWidth={36} fill="none" strokeLinecap="round" />
    <path d="M 44 46 H 156 Q 182 46 182 72 Q 182 98 156 98 H 44 Q 18 98 18 124 Q 18 150 44 150 H 156" stroke="#EDA79D" strokeWidth={22} fill="none" strokeLinecap="round" />
    <Face x={100} y={96} s={1.1} />
    <circle cx={74} cy={110} r={6} fill="#E8857A" opacity={0.7} />
    <circle cx={126} cy={110} r={6} fill="#E8857A" opacity={0.7} />
  </svg>
);

const Pankreas: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 200 200" width={size} height={size}>
    <path d="M 18 118 Q 30 74 96 84 Q 146 90 170 66 Q 194 74 182 100 Q 150 128 104 130 Q 50 140 18 118 Z" fill="#EFC27A" stroke="#C9963F" strokeWidth={4} />
    {[40, 66, 92, 118, 144].map((x, i) => (
      <circle key={x} cx={x} cy={112 - i * 4} r={5} fill="#D9A653" />
    ))}
    <Face x={76} y={104} s={0.7} />
  </svg>
);

const Perut: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 200 200" width={size} height={size}>
    <path d="M 70 22 L 98 22 Q 96 58 124 64 Q 178 70 176 122 Q 172 178 112 178 Q 56 176 70 128 Q 78 96 70 22 Z" fill="#E98C86" stroke="#C56A63" strokeWidth={4} />
    <Face x={124} y={114} s={0.8} />
  </svg>
);

const Otak: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 200 200" width={size} height={size}>
    <path d="M 30 112 Q 18 70 56 56 Q 70 28 104 36 Q 140 26 160 56 Q 190 70 178 112 Q 182 150 140 152 Q 104 168 70 152 Q 32 152 30 112 Z" fill="#F2AEBB" stroke="#CF7F8F" strokeWidth={4} />
    <path d="M 104 40 Q 96 80 106 150 M 58 80 Q 80 74 84 96 M 150 76 Q 128 76 128 100 M 60 128 Q 78 118 92 132 M 142 130 Q 128 120 118 132" stroke="#CF7F8F" strokeWidth={4} fill="none" strokeLinecap="round" />
    <Face x={104} y={102} s={0.7} />
  </svg>
);

const Envelope: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 120 84" width={size} height={(size * 84) / 120}>
    <rect x={4} y={4} width={112} height={76} rx={10} fill={C.gold} stroke={C.ink} strokeWidth={5} />
    <path d="M 8 10 L 60 48 L 112 10" stroke={C.ink} strokeWidth={5} fill="none" strokeLinejoin="round" />
  </svg>
);

const Bubble: React.FC<{ size: number; label?: string }> = ({ size, label = "GLP-1" }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #DDEFE6 45%, #9CCDB6 100%)", border: `5px solid ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.24, fontWeight: 800, color: C.ink }}>
    {label}
  </div>
);

const Clock: React.FC<{ size: number; delay: number }> = ({ size, delay }) => {
  const f = useCurrentFrame();
  const a = Math.max(0, f - delay) * 18;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx={50} cy={50} r={44} fill={C.card} stroke={C.ink} strokeWidth={6} />
      <line x1={50} y1={50} x2={50 + 30 * Math.sin((a * Math.PI) / 180)} y2={50 - 30 * Math.cos((a * Math.PI) / 180)} stroke={C.marker} strokeWidth={6} strokeLinecap="round" />
      <line x1={50} y1={50} x2={50 + 20 * Math.sin((a * Math.PI) / 2160)} y2={50 - 20 * Math.cos((a * Math.PI) / 2160)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx={50} cy={50} r={5} fill={C.ink} />
    </svg>
  );
};

const Calendar: React.FC<{ size: number; daily?: boolean }> = ({ size, daily }) => (
  <svg viewBox="0 0 120 120" width={size} height={size}>
    <rect x={8} y={16} width={104} height={96} rx={12} fill={C.card} stroke={C.ink} strokeWidth={5} />
    <rect x={8} y={16} width={104} height={24} rx={10} fill={C.ink} />
    {[...Array(7)].map((_, i) => {
      const x = 22 + (i % 4) * 25;
      const y = 58 + Math.floor(i / 4) * 28;
      const on = daily || i === 0;
      return on ? <path key={i} d={`M ${x - 7} ${y} l 5 6 l 10 -12`} stroke={C.marker} strokeWidth={5} fill="none" strokeLinecap="round" /> : <circle key={i} cx={x} cy={y} r={4} fill="#CFCABB" />;
    })}
  </svg>
);

const Pill: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 120 120" width={size} height={size}>
    <g transform="rotate(-35 60 60)">
      <rect x={14} y={40} width={92} height={40} rx={20} fill={C.card} stroke={C.ink} strokeWidth={5} />
      <path d="M 60 40 H 86 A 20 20 0 0 1 86 80 H 60 Z" fill={C.marker} />
      <rect x={14} y={40} width={92} height={40} rx={20} fill="none" stroke={C.ink} strokeWidth={5} />
    </g>
  </svg>
);

type Mood = "loya" | "muntah" | "cirit" | "sembelit";
const SideFace: React.FC<{ mood: Mood; size: number }> = ({ mood, size }) => {
  const skin = mood === "loya" ? "#CFE3B4" : "#F6D7A7";
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ overflow: "visible" }}>
      <circle cx={60} cy={60} r={50} fill={skin} stroke={C.ink} strokeWidth={5} />
      {mood === "sembelit" ? (
        <path d="M 30 44 l 14 6 l -14 6 M 90 44 l -14 6 l 14 6" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <>
          <circle cx={42} cy={50} r={6} fill={C.ink} />
          <circle cx={78} cy={50} r={6} fill={C.ink} />
        </>
      )}
      {mood === "loya" && <path d="M 36 82 q 8 -8 16 0 t 16 0 t 16 0" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />}
      {mood === "muntah" && (
        <>
          <ellipse cx={60} cy={84} rx={14} ry={12} fill={C.ink} />
          <circle cx={30} cy={74} r={9} fill="#E8A08F" opacity={0.7} />
          <circle cx={90} cy={74} r={9} fill="#E8A08F" opacity={0.7} />
        </>
      )}
      {mood === "cirit" && (
        <>
          <path d="M 40 84 l 8 -6 l 8 6 l 8 -6 l 8 6 l 8 -6" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 98 18 q 10 16 0 22 q -10 -6 0 -22 Z" fill="#7FB6E0" />
        </>
      )}
      {mood === "sembelit" && <path d="M 42 84 H 78" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />}
    </svg>
  );
};

const Stairs: React.FC<{ delays: number[] }> = ({ delays }) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 400 220" width={640} height={352}>
      {delays.map((d, i) => {
        const p = interpolate(f, [d, d + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
        const h = 40 + i * 40;
        return <rect key={i} x={20 + i * 92} y={210 - h * p} width={84} height={h * p} rx={8} fill={i === delays.length - 1 ? C.ink : "#5E7D6E"} />;
      })}
      <line x1={10} y1={212} x2={390} y2={212} stroke={C.ink} strokeWidth={4} />
    </svg>
  );
};

// ---------- opener ----------

const Opener: React.FC = () => (
  <FaceCamOpener clip={CLIP} zoom={ZOOM} hookSize={56} hook={<>Ubat GLP-1: <span style={{ color: C.marker }}>macam mana ia sebenarnya berfungsi?</span></>} />
);

// frozen last frame of the clip, torn away to reveal the first drawn scene
const TearAway: React.FC = () => (
  <PaperTear at={0} dur={TEAR}>
    <AbsoluteFill style={{ background: C.paper }}>
      <OffthreadVideo src={staticFile(CLIP)} muted startFrom={CLIP_LEN - 1} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${ZOOM})`, transformOrigin: "50% 0%" }} />
    </AbsoluteFill>
  </PaperTear>
);

// ---------- scenes ----------

const Usus1: React.FC = () => {
  const s = starts.usus;
  return (
    <AbsoluteFill>
      <Stack top={230} gap={8}>
        <Line delay={w(s, 0.85)} size={54} weight={700} color={C.inkSoft}>
          Bila kita makan…
        </Line>
        <Line delay={w(s, 1.92)} size={74} weight={800}>
          <Highlight delay={w(s, 2.2)}>usus</Highlight> keluarkan hormon
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Pop delay={w(s, 1.92)}>
          <Usus size={440} />
        </Pop>
      </div>
      <div style={{ position: "absolute", top: 420, left: 640 }}>
        <Pop delay={w(s, 3.82)} rotate={8}>
          <Bubble size={220} />
        </Pop>
      </div>
      <div style={{ position: "absolute", top: 1010, left: SAFE.left, right: SAFE.right, textAlign: "center", fontSize: 44, fontWeight: 700, color: C.inkSoft, fontStyle: "italic" }}>
        <Typed text="glucagon-like peptide-1" delay={w(s, 3.82)} cps={18} />
      </div>
    </AbsoluteFill>
  );
};

const Courier: React.FC<{ at: number; organ: React.ReactNode; title: string; text: React.ReactNode }> = ({ at, organ, title, text }) => {
  const f = useCurrentFrame();
  const fly = interpolate(f, [at, at + 14], [-260, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <Pop delay={at}>
      <Card style={{ width: 830, padding: "20px 28px", display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ transform: `translateX(${fly}px)`, opacity: f < at ? 0 : 1 }}>
          <Envelope size={92} />
        </div>
        <div style={{ fontSize: 50, fontWeight: 800, color: C.marker }}>→</div>
        {organ}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 3, color: C.marker }}>{title}</div>
          <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.18 }}>{text}</div>
        </div>
      </Card>
    </Pop>
  );
};

const Mesej: React.FC = () => {
  const s = starts.mesej;
  return (
    <AbsoluteFill>
      <Stack top={230} gap={8}>
        <Line delay={w(s, 6.74)} size={54} weight={700} color={C.inkSoft}>
          GLP-1 ni macam…
        </Line>
        <Line delay={w(s, 7.52)} size={92} weight={800}>
          <Highlight delay={w(s, 7.7)}>MESEJ</Highlight> untuk badan
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 500, left: SAFE.left, display: "flex", flexDirection: "column", gap: 30 }}>
        <Courier at={w(s, 9.8)} organ={<Pankreas size={150} />} title="PANKREAS" text={<>keluar lebih <Highlight delay={w(s, 11.46)}>insulin</Highlight> bila gula naik</>} />
        <Courier at={w(s, 13.58)} organ={<Perut size={150} />} title="PERUT" text={<>makanan keluar <Highlight delay={w(s, 13.9)}>perlahan</Highlight></>} />
        <Courier at={w(s, 17.54)} organ={<Otak size={150} />} title="OTAK" text={<>isyarat <Highlight delay={w(s, 17.88)}>kenyang</Highlight></>} />
      </div>
    </AbsoluteFill>
  );
};

const Hilang: React.FC = () => {
  const s = starts.hilang;
  const f = useCurrentFrame();
  const popAt = w(s, 21.76);
  const pop = interpolate(f, [popAt, popAt + 5, popAt + 9], [1, 1.25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar = (at: number, to: number) => interpolate(f, [at, at + 24], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <Stack top={230} gap={8}>
        <Line delay={w(s, 19.44)} size={54} weight={700} color={C.inkSoft}>
          Tapi GLP-1 semula jadi…
        </Line>
        <Line delay={w(s, 21.52)} size={78} weight={800}>
          <Highlight delay={w(s, 21.76)}>cepat hilang</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 450, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 60, height: 230 }}>
        <div style={{ transform: `scale(${pop})`, position: "relative" }}>
          <Bubble size={200} />
        </div>
        {f >= popAt && f < popAt + 14 && (
          <svg viewBox="-100 -100 200 200" width={240} height={240} style={{ position: "absolute", left: 420, opacity: interpolate(f, [popAt, popAt + 14], [1, 0]) }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line key={a} x1={60 * Math.cos((a * Math.PI) / 180)} y1={60 * Math.sin((a * Math.PI) / 180)} x2={90 * Math.cos((a * Math.PI) / 180)} y2={90 * Math.sin((a * Math.PI) / 180)} stroke={C.marker} strokeWidth={8} strokeLinecap="round" />
            ))}
          </svg>
        )}
        <Pop delay={w(s, 22.38)}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Clock size={150} delay={w(s, 22.38)} />
            <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1 }}>
              beberapa
              <br />
              minit je
            </div>
          </div>
        </Pop>
      </div>
      <Stack top={760} gap={14}>
        <Line delay={w(s, 24.66)} size={70} weight={800}>
          Ubat GLP-1?
        </Line>
        <Chip delay={w(s, 25.98)} rotate={-1.5} size={48}>
          tiru mesej yang sama
        </Chip>
      </Stack>
      <div style={{ position: "absolute", top: 1030, left: SAFE.left, width: 830, display: "flex", flexDirection: "column", gap: 18 }}>
        {[
          ["semula jadi", 0.14, w(s, 29.74), "#9CB8A9"],
          ["ubat", 1, w(s, 30.78), C.ink],
        ].map(([label, to, at, col]) => (
          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 18, opacity: f < (at as number) ? 0 : 1 }}>
            <div style={{ width: 230, fontSize: 38, fontWeight: 700, color: C.inkSoft, textAlign: "right" }}>{label}</div>
            <div style={{ height: 56, width: 560 * bar(at as number, to as number), borderRadius: 14, background: col as string }} />
          </div>
        ))}
        <Line delay={w(s, 31.26)} size={56} weight={800} style={{ textAlign: "center" }}>
          kesan <Highlight delay={w(s, 31.4)}>tahan lebih lama</Highlight>
        </Line>
      </div>
    </AbsoluteFill>
  );
};

const K3: React.FC = () => {
  const s = starts.k3;
  const ks: [string, string, number][] = [
    ["K", "Kawal gula", 34.14],
    ["K", "Kosongkan perut perlahan", 34.78],
    ["K", "Kenyang lebih lama", 36.72],
  ];
  return (
    <AbsoluteFill>
      <Stack top={240} gap={6}>
        <Line delay={w(s, 32.06)} size={54} weight={700} color={C.inkSoft}>
          Senang nak ingat:
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={w(s, 33.1)} rotate={-4} size={150}>
          3K
        </BoxStamp>
      </div>
      <div style={{ position: "absolute", top: 640, left: SAFE.left, display: "flex", flexDirection: "column", gap: 28 }}>
        {ks.map(([k, text, at], i) => (
          <Pop key={text} delay={w(s, at)} rotate={i % 2 ? 1 : -1}>
            <Card style={{ width: 830, padding: "22px 30px", display: "flex", alignItems: "center", gap: 28 }}>
              <div style={{ width: 96, height: 96, flexShrink: 0, borderRadius: 20, background: C.ink, color: C.gold, fontSize: 62, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{k}</div>
              <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.15 }}>{text}</div>
            </Card>
          </Pop>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Bentuk: React.FC = () => {
  const s = starts.bentuk;
  const forms: [React.ReactNode, string, number][] = [
    [<Calendar size={150} />, "seminggu sekali", 38.82],
    [<Calendar size={150} daily />, "harian", 40.1],
    [<Pill size={150} />, "pil", 41.58],
  ];
  return (
    <AbsoluteFill>
      <Stack top={240} gap={6}>
        <Line delay={w(s, 37.9)} size={64} weight={800}>
          Ada beberapa <Highlight delay={w(s, 38.3)}>bentuk</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 420, left: SAFE.left, width: 830, display: "flex", justifyContent: "space-between" }}>
        {forms.map(([icon, label, at], i) => (
          <Pop key={label} delay={w(s, at)} rotate={i === 1 ? 0 : i ? 3 : -3}>
            <Card style={{ width: 250, height: 290, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 16 }}>
              {icon}
              <div style={{ fontSize: 36, fontWeight: 800, textAlign: "center", lineHeight: 1.1 }}>{label}</div>
            </Card>
          </Pop>
        ))}
      </div>
      <Stack top={800} gap={10}>
        <Line delay={w(s, 42.38)} size={56} weight={700} color={C.inkSoft}>
          Jenis & dos?
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={w(s, 43.38)} rotate={-3} size={74}>
          DOKTOR TENTUKAN
        </BoxStamp>
      </div>
    </AbsoluteFill>
  );
};

const MOODS: [Mood, string, number][] = [
  ["loya", "loya", 48.1],
  ["muntah", "muntah", 48.9],
  ["cirit", "cirit-birit", 49.34],
  ["sembelit", "sembelit", 49.96],
];

const Kesan: React.FC = () => {
  const s = starts.kesan;
  return (
    <AbsoluteFill>
      <Stack top={230} gap={6}>
        <Line delay={w(s, 46.58)} size={54} weight={700} color={C.inkSoft}>
          Kesan sampingan
        </Line>
        <Line delay={w(s, 47.26)} size={74} weight={800}>
          <Highlight delay={w(s, 47.5)}>paling biasa</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 430, left: SAFE.left, width: 830, display: "flex", flexWrap: "wrap", justifyContent: "space-between", rowGap: 26 }}>
        {MOODS.map(([mood, label, at], i) => (
          <Pop key={mood} delay={w(s, at)} rotate={i % 2 ? 2 : -2}>
            <Card style={{ width: 400, height: 250, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <SideFace mood={mood} size={150} />
              <div style={{ fontSize: 42, fontWeight: 800 }}>{label}</div>
            </Card>
          </Pop>
        ))}
      </div>
      <div style={{ position: "absolute", top: 1010, left: SAFE.left, width: 830, display: "flex", justifyContent: "center" }}>
        <Pop delay={w(s, 50.4)} rotate={-1}>
          <div style={{ background: C.ink, color: C.paper, borderRadius: 20, padding: "18px 34px", fontSize: 42, fontWeight: 800, textAlign: "center", lineHeight: 1.2 }}>
            terutama masa <span style={{ color: C.gold }}>mula</span>
            <br />& masa <span style={{ color: C.gold }}>naik dos</span>
          </div>
        </Pop>
      </div>
    </AbsoluteFill>
  );
};

const Dos: React.FC = () => {
  const s = starts.dos;
  return (
    <AbsoluteFill>
      <Stack top={230} gap={6}>
        <Line delay={w(s, 52.68)} size={54} weight={700} color={C.inkSoft}>
          Sebab tu biasanya
        </Line>
        <Line delay={w(s, 53.82)} size={74} weight={800}>
          dos naik <Highlight delay={w(s, 55.22)}>slow-slow</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 450, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Stairs delays={[w(s, 53.82), w(s, 54.3), w(s, 54.78), w(s, 55.26)]} />
      </div>
      <div style={{ position: "absolute", top: 900, left: SAFE.left, width: 830 }}>
        <Pop delay={w(s, 56.18)} rotate={-1}>
          <div style={{ background: "#FBE9E4", border: `6px solid ${RED}`, borderRadius: 24, padding: "26px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 46, fontWeight: 800, color: RED, lineHeight: 1.15 }}>⚠ Sakit perut teruk yang tak hilang?</div>
            <Line delay={w(s, 58.48)} size={52} weight={800}>
              → terus jumpa doktor
            </Line>
          </div>
        </Pop>
      </div>
    </AbsoluteFill>
  );
};

const Wrench: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <path d="M 70 8 A 22 22 0 0 0 52 40 L 12 80 A 8 8 0 0 0 22 90 L 62 50 A 22 22 0 0 0 94 32 L 80 40 L 66 34 L 62 20 Z" fill={C.gold} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
  </svg>
);

const Alat: React.FC = () => {
  const s = starts.alat;
  return (
    <AbsoluteFill>
      <Stack top={230} gap={6}>
        <Line delay={w(s, 59.92)} size={50} weight={700} color={C.inkSoft}>
          Satu benda, sebagai seorang
        </Line>
        <Line delay={w(s, 62.22)} size={74} weight={800}>
          <Highlight delay={w(s, 62.56)}>coach</Highlight>:
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
        <Pop delay={w(s, 64.08)} rotate={-8}>
          <Wrench size={180} />
        </Pop>
        <Line delay={w(s, 64.08)} size={88} weight={800}>
          ubat = <Highlight delay={w(s, 64.34)}>ALAT</Highlight>
        </Line>
      </div>
      <Stack top={760} gap={10}>
        <Line delay={w(s, 64.9)} size={64} weight={800} color={C.inkSoft}>
          <span style={{ position: "relative", display: "inline-block" }}>
            shortcut
            <Strike delay={w(s, 65.5)} width={8} />
          </span>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 880, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={w(s, 66.38)} rotate={-3} size={60}>
          BUKAN JALAN PINTAS
        </BoxStamp>
      </div>
    </AbsoluteFill>
  );
};

const Asas: React.FC = () => {
  const s = starts.asas;
  const rows: [React.ReactNode, number][] = [
    [<>protein yang <Highlight delay={w(s, 73.86)}>cukup</Highlight></>, 73.38],
    [<>latihan <Highlight delay={w(s, 74.86)}>kekuatan</Highlight> (jaga otot)</>, 74.34],
    [<>tabiat yang awak <Highlight delay={w(s, 79.2)}>bina sekarang</Highlight></>, 78.38],
  ];
  return (
    <AbsoluteFill>
      <Stack top={230} gap={6}>
        <Line delay={w(s, 72.58)} size={80} weight={800}>
          Asasnya:
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 380, left: SAFE.left, display: "flex", flexDirection: "column", gap: 24 }}>
        {rows.map(([text, at], i) => (
          <Pop key={i} delay={w(s, at)} rotate={i % 2 ? 1 : -1}>
            <Card style={{ width: 830, padding: "24px 30px", display: "flex", alignItems: "center", gap: 24 }}>
              <Mark kind="check" delay={w(s, at) + 4} size={64} />
              <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.15 }}>{text}</div>
            </Card>
          </Pop>
        ))}
      </div>
      <div style={{ position: "absolute", top: 990, left: SAFE.left, width: 830, textAlign: "center" }}>
        <Line delay={w(s, 80.34)} size={50} weight={700} color={C.inkSoft}>
          yang tentukan apa jadi
        </Line>
        <Line delay={w(s, 82.1)} size={70} weight={800}>
          <Highlight delay={w(s, 82.4)}>bila ubat stop</Highlight>
        </Line>
      </div>
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => {
  const s = starts.cta;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={w(s, 84.36)} rotate={-4} size={120}>
          PART 2
        </BoxStamp>
      </div>
      <Stack top={560} gap={8}>
        <Line delay={w(s, 85.12)} size={54} weight={700} color={C.inkSoft}>
          Apa jadi bila
        </Line>
        <Line delay={w(s, 85.66)} size={72} weight={800}>
          <Highlight delay={w(s, 85.66)}>berhenti</Highlight> ubat GLP-1?
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <CtaPill icon="comment" delay={w(s, 87.06)}>
          Komen “PART 2”
        </CtaPill>
      </div>
    </AbsoluteFill>
  );
};

// ---------- captions ----------

// [start, text]; ends are taken from the next word (capped), times in the original recordings.
const toWords = (list: [number, string][], map: (t: number) => number): Word[] =>
  list.map(([t, text], i) => {
    const next = list[i + 1]?.[0] ?? t + 0.6;
    return [map(t), map(Math.min(next, t + 0.7)), text];
  });

const CLIP_WORDS: [number, string][] = [
  [0.78, "Semua"], [1.5, "orang"], [1.64, "tengah"], [2.06, "hype"], [2.36, "tentang"], [2.76, "ubat"], [3.42, "GLP-1."],
  [4.2, "Tapi"], [4.6, "ramai"], [5.08, "yang"], [5.2, "tak"], [5.38, "tahu"], [5.54, "macam"], [5.86, "mana"],
  [6.18, "sebenarnya"], [6.96, "GLP-1"], [7.58, "ini"], [7.72, "berfungsi."],
];

// "bukan … sendiri" (44.38–45.6) is left uncaptioned: Whisper could not make out the middle words.
const VOICE_WORDS: [number, string][] = [
  [0.85, "Bila"], [1.1, "kita"], [1.32, "makan,"], [1.92, "usus"], [2.22, "kita"], [2.56, "keluarkan"], [2.78, "satu"], [3.08, "hormon,"],
  [3.52, "nama"], [3.66, "dia"], [3.82, "glucagon-like"], [4.64, "peptide-1,"], [5.34, "ataupun"], [5.76, "GLP-1."],
  [6.74, "Hormon"], [7.14, "ni"], [7.24, "macam"], [7.52, "mesej"], [7.92, "untuk"], [8.24, "badan"], [8.46, "kita."],
  [9.1, "Dia"], [9.44, "bagi"], [9.66, "tahu"], [9.8, "pankreas"], [10.22, "untuk"], [10.4, "keluarkan"], [11.0, "lebih"], [11.3, "banyak"], [11.46, "insulin"], [11.82, "bila"], [12.04, "gula"], [12.3, "naik."],
  [12.96, "Dia"], [13.3, "juga"], [13.58, "perlahankan"], [14.16, "makanan"], [14.64, "keluar"], [14.94, "daripada"], [15.22, "perut."],
  [16.24, "Dan"], [16.82, "dia"], [17.06, "juga"], [17.32, "bagi"], [17.54, "isyarat"], [17.88, "kenyang"], [18.32, "kepada"], [18.68, "otak."],
  [19.44, "Tapi"], [19.9, "GLP-1"], [20.58, "yang"], [20.84, "natural"], [21.2, "ni,"], [21.38, "dia"], [21.52, "cepat"], [21.76, "hilang"], [22.04, "dalam"], [22.38, "beberapa"], [22.72, "minit"], [23.04, "je."],
  [23.34, "So,"], [24.38, "apa"], [24.52, "yang"], [24.66, "ubat"], [24.8, "GLP-1"], [25.48, "buat"], [25.66, "ni?"],
  [25.82, "Dia"], [25.98, "tiru"], [26.32, "mesej"], [26.76, "yang"], [26.96, "sama,"], [27.5, "signal"], [27.76, "yang"], [28.0, "sama"], [28.18, "kepada"], [28.95, "otak."],
  [29.74, "Tapi"], [30.1, "kesan"], [30.6, "dia"], [30.78, "tahan"], [31.26, "lebih"], [31.64, "lama."],
  [32.06, "Senang"], [32.78, "nak"], [32.9, "ingat,"], [33.1, "3K."], [34.14, "Kawal"], [34.38, "gula,"], [34.78, "kosongkan"], [35.28, "perut"], [35.5, "perlahan,"], [36.4, "dan"], [36.72, "kenyang"], [36.96, "lebih"], [37.26, "lama."],
  [37.9, "Ada"], [38.26, "yang"], [38.46, "cucuk"], [38.82, "seminggu"], [39.22, "sekali,"], [39.76, "ada"], [39.86, "yang"], [40.1, "harian,"], [40.42, "ada"], [40.64, "juga"], [40.88, "dalam"], [41.12, "bentuk"], [41.58, "pil."],
  [42.38, "Jenis"], [42.82, "dan"], [43.0, "dos,"], [43.38, "doktor"], [43.62, "yang"], [43.78, "tentukan"], [44.18, "tau."],
  [46.58, "Kesan"], [46.9, "sampingan"], [47.26, "paling"], [47.5, "biasa,"], [48.1, "loya,"], [48.9, "muntah,"], [49.34, "cirit-birit"], [49.76, "ataupun"], [49.96, "sembelit."],
  [50.4, "Terutamanya"], [50.98, "masa"], [51.24, "mula"], [51.52, "ataupun"], [51.88, "masa"], [52.18, "naik"], [52.32, "dos."],
  [52.68, "Sebab"], [53.36, "tu"], [53.44, "biasanya"], [53.82, "dos"], [53.98, "akan"], [54.7, "dinaikkan"], [55.22, "slow-slow"], [55.72, "lah."],
  [56.18, "Kalau"], [56.42, "sakit"], [56.66, "perut"], [56.92, "teruk"], [57.28, "yang"], [57.52, "tak"], [57.74, "hilang,"], [58.48, "terus"], [58.74, "jumpa"], [59.18, "doktor."],
  [59.92, "Tapi"], [60.22, "satu"], [60.46, "benda"], [60.72, "je"], [60.96, "yang"], [61.1, "saya"], [61.28, "nak"], [61.36, "awak"], [61.54, "ingat"], [61.82, "sebagai"], [62.22, "seorang"], [62.56, "coach."],
  [63.08, "Ubat"], [63.52, "ni"], [63.74, "is"], [63.94, "just"], [64.08, "a"], [64.34, "tool,"], [64.68, "dia"], [64.9, "bukannya"], [65.28, "shortcut,"],
  [65.95, "dia"], [66.18, "bukannya"], [66.38, "jalan"], [66.64, "pintas"], [67.5, "untuk"], [68.0, "kita"], [70.44, "tak"], [70.6, "nak"], [70.7, "jaga"], [70.98, "kesihatan."],
  [72.58, "Asasnya,"], [73.38, "protein"], [73.74, "yang"], [73.86, "cukup"], [74.16, "dan"], [74.34, "latihan"], [74.86, "strength"], [75.18, "training"], [75.46, "masih"], [75.86, "penting"], [76.28, "untuk"], [76.5, "jaga"], [77.02, "kita"], [77.16, "punya"], [77.32, "muscle."],
  [77.86, "And"], [78.38, "habit"], [78.72, "yang"], [78.94, "awak"], [79.2, "bina"], [79.54, "sekarang"], [80.02, "yang"], [80.34, "akan"], [80.58, "tentukan"], [81.08, "apa"], [81.58, "yang"], [81.92, "jadi"], [82.1, "bila"], [82.4, "ubat"], [82.72, "tu"], [82.98, "stop."],
  [83.86, "Nak"], [84.36, "part"], [84.52, "2?"], [85.12, "Apa"], [85.2, "jadi"], [85.46, "bila"], [85.66, "berhenti"], [86.0, "ubat"], [86.24, "GLP-1,"], [87.06, "komen"], [87.22, "part"], [87.46, "2."],
];

const WORDS: Word[] = [
  ...toWords(CLIP_WORDS, (t) => t - CLIP_FROM),
  // the word before the cut must not run across it
  ...toWords(VOICE_WORDS, (t) => tl.reel(v(t))).map(([a, b, x]): Word => [a, Math.max(a + 0.2, b), x]),
];

export const RGlp1Overlay: React.FC = () => (
  <>
    <Sequence from={CLIP_LEN} durationInFrames={TEAR} layout="none">
      <TearAway />
    </Sequence>
    <Sequence from={tl.voiceFrame} layout="none">
      <Audio src={staticFile(AUDIO)} />
    </Sequence>
    <Captions words={WORDS} top={1335} size={50} max={4} plate left={SAFE.left} right={SAFE.right} />
  </>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, x]) => [f, s, x * k]);
const at = (s: number, list: [number, Cue[1], number][]): Cue[] => list.map(([t, sfx, vol]) => [w(s, t), sfx, vol]);

export const RGLP1_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[CLIP_LEN - 4, "whoosh", 0.7]], 0.6) },
  { id: "usus", dur: starts.mesej - starts.usus, el: <Usus1 />, cues: soft(at(starts.usus, [[1.92, "pop", 0.45], [3.82, "pop", 0.5]])) },
  { id: "mesej", dur: starts.hilang - starts.mesej, el: <Mesej />, cues: soft(at(starts.mesej, [[9.8, "whoosh", 0.35], [13.58, "whoosh", 0.35], [17.54, "whoosh", 0.35]])) },
  { id: "hilang", dur: starts.k3 - starts.hilang, el: <Hilang />, cues: soft(at(starts.hilang, [[21.76, "pop", 0.6], [22.38, "tick", 0.4], [25.98, "pop", 0.4]])) },
  { id: "k3", dur: starts.bentuk - starts.k3, el: <K3 />, cues: soft(at(starts.k3, [[33.1, "stamp", 0.6], [34.14, "pop", 0.4], [34.78, "pop", 0.4], [36.72, "pop", 0.4]])) },
  { id: "bentuk", dur: starts.kesan - starts.bentuk, el: <Bentuk />, cues: soft(at(starts.bentuk, [[38.82, "pop", 0.4], [40.1, "pop", 0.4], [41.58, "pop", 0.4], [43.38, "stamp", 0.6]])) },
  { id: "kesan", dur: starts.dos - starts.kesan, el: <Kesan />, cues: soft(at(starts.kesan, MOODS.map(([, , t]): [number, Cue[1], number] => [t, "pop", 0.4]))) },
  { id: "dos", dur: starts.alat - starts.dos, el: <Dos />, cues: soft(at(starts.dos, [[56.18, "pop", 0.5]])) },
  { id: "alat", dur: starts.asas - starts.alat, el: <Alat />, cues: soft(at(starts.alat, [[64.08, "pop", 0.45], [65.5, "scribble", 0.5], [66.38, "stamp", 0.6]])) },
  { id: "asas", dur: starts.cta - starts.asas, el: <Asas />, cues: soft(at(starts.asas, [[73.38, "tick", 0.5], [74.34, "tick", 0.5], [78.38, "tick", 0.5]])) },
  { id: "cta", dur: starts.end - starts.cta, el: <Cta />, cues: soft(at(starts.cta, [[84.36, "stamp", 0.6], [87.06, "chime", 0.45]])) },
];
