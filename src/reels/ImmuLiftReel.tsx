// Product explainer reel: "ImmuLift — elderberry & EpiCor, apa kata kajian?" (recorded 08/10/2026 evening).
// Coach Nas talks to camera holding the box; design cutaways (with a face bubble) explain each point, and the two
// study screenshots he snapped appear as evidence cards. Media (local only, gitignored):
//   public/clips/IMMUNE-full.mp4   ten Teleprompter takes (08/10 20:54–20:57) trimmed and joined, 96.6s.
//   public/img/sr-elderberry.jpg   Wieland et al. 2021, BMC Complement Med Ther, systematic review (PMID 33827515).
//   public/img/rct-epicor.jpg      Pinheiro et al. 2017, BMC Complement Altern Med, pilot RCT (PMID 28870194).
// Evidence labels are kept to what those papers report: the review rates the evidence as uncertain; the RCT is a
// pilot (n=80, 6 weeks, 500 mg/day) on GI symptoms and the gut microbiome; the cold/flu line refers to separate EpiCor
// RCTs (Moyad 2008, 2010), not to the snapped trial. The label gives EpiCor 13.5% of a 3.7 g serving ≈ 500 mg, the
// dose used in those trials. Product wording stays "nutrition", never treatment.
import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Line, Mark, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, Stack } from "./formats/common";
import { Captions } from "./formats/Captions";
import { FaceCamOpener } from "./formats/FaceCamOpener";
import { IMMUNE_WORDS } from "./ImmuLiftWords";

const CLIP = "clips/IMMUNE-full.mp4";
const CLIP_LEN = 2873;
// The timings below were first measured on an earlier cut of the clip; that cut was re-edited (a clipped "menarik"
// restored, hesitation pauses removed). T maps an old-cut time to the new cut by interpolating between word anchors.
const ANCHORS: [number, number][] = [
  [0, 0], [37.2, 37.2], [39.94, 40.18], [50.26, 50.5], [58.66, 58.98], [59.84, 59.78], [61.4, 61.24], [70.54, 70.82],
  [78.68, 78.3], [83.78, 83.66], [88.02, 87.88], [89.48, 89.06], [90.8, 89.38], [91.76, 90.04], [93.46, 92.6], [95.32, 94.44], [96.7, 95.8],
];
const T = (old: number) => {
  const k = ANCHORS.findIndex(([o]) => o > old);
  if (k <= 0) return k === 0 ? old : old - ANCHORS[ANCHORS.length - 1][0] + ANCHORS[ANCHORS.length - 1][1];
  const [o0, n0] = ANCHORS[k - 1];
  const [o1, n1] = ANCHORS[k];
  return n0 + ((old - o0) * (n1 - n0)) / (o1 - o0);
};
const f = (sec: number) => Math.round(T(sec) * FPS) - 3;

// Cutaway windows (seconds on the joined clip), chosen on phrase boundaries.
const CUTS: Record<string, [number, number]> = {
  ingredients: [8.5, 13.9],
  elderberry: [16.2, 21.85],
  review: [21.85, 37.45],
  epicor: [39.9, 50.26],
  rct: [50.26, 61.3],
  gut: [61.3, 70.54],
  nutrients: [70.54, 78.62],
  basics: [78.62, 83.6],
};

// ---------- small illustrations ----------
const Elderberry: React.FC<{ size?: number }> = ({ size = 260 }) => {
  const berries: [number, number][] = [
    [100, 70], [78, 86], [122, 86], [60, 106], [100, 102], [140, 106], [80, 124], [120, 124], [100, 140], [62, 140], [138, 140], [100, 172],
  ];
  return (
    <svg viewBox="0 0 200 210" width={size} height={size * 1.05}>
      <path d="M 100 8 L 100 60 M 100 30 L 70 70 M 100 30 L 130 70 M 100 50 L 60 100 M 100 50 L 140 100" stroke="#5B7B45" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M 100 8 C 140 0, 168 18, 176 40 C 150 44, 120 34, 100 8 Z" fill="#6E9A4E" />
      {berries.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={15} fill="#3B1F4A" />
          <circle cx={x - 5} cy={y - 5} r={4} fill="#8E6AA8" opacity={0.7} />
        </g>
      ))}
    </svg>
  );
};

const Yeast: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size}>
    <ellipse cx={90} cy={110} rx={62} ry={52} fill="#F1DFA8" stroke={C.ink} strokeWidth={6} />
    <ellipse cx={150} cy={64} rx={30} ry={25} fill="#F1DFA8" stroke={C.ink} strokeWidth={6} />
    <circle cx={78} cy={104} r={14} fill="#E3C46F" />
    <circle cx={106} cy={126} r={8} fill="#E3C46F" />
  </svg>
);

const Shield: React.FC<{ size?: number }> = ({ size = 150 }) => (
  <svg viewBox="0 0 100 110" width={size} height={size * 1.1}>
    <path d="M 50 6 L 90 20 L 86 62 C 82 84, 66 98, 50 104 C 34 98, 18 84, 14 62 L 10 20 Z" fill="#8E2F5E" stroke={C.ink} strokeWidth={4} />
  </svg>
);

const Gut: React.FC<{ size?: number }> = ({ size = 170 }) => (
  <svg viewBox="0 0 120 120" width={size} height={size}>
    <path d="M 20 30 C 20 10, 100 10, 100 30 C 100 50, 30 40, 30 60 C 30 80, 95 70, 95 90 C 95 108, 40 110, 30 100" fill="none" stroke="#C0613E" strokeWidth={13} strokeLinecap="round" />
  </svg>
);

// ---------- cutaway frame: paper, content, and a live face bubble ----------
const Bubble: React.FC = () => (
  <div style={{ position: "absolute", right: 50, top: 1350, width: 240, height: 240, borderRadius: "50%", overflow: "hidden", border: `8px solid ${C.card}`, boxShadow: "0 12px 30px rgba(20,30,20,0.3)" }}>
    <OffthreadVideo src={staticFile(CLIP)} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%" }} />
  </div>
);

const Title: React.FC<{ children: React.ReactNode; delay: number; kicker?: string }> = ({ children, delay, kicker }) => (
  <Stack top={190} gap={10}>
    {kicker && (
      <Line delay={delay} size={34} weight={800} color={C.marker} style={{ letterSpacing: 4 }}>
        {kicker}
      </Line>
    )}
    <Line delay={delay + 3} size={68} weight={800}>
      {children}
    </Line>
  </Stack>
);

const Ingredients: React.FC = () => (
  <>
    <Title delay={f(8.5)} kicker="2 INGREDIENT">
      Yang saya nak <Highlight delay={f(9.96)}>highlight</Highlight>
    </Title>
    <div style={{ position: "absolute", top: 520, left: 60, right: 60, display: "flex", justifyContent: "center", gap: 40 }}>
      <Pop delay={f(11.8)} rotate={-2}>
        <Card style={{ width: 430, padding: "36px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <Elderberry size={220} />
          <div style={{ fontSize: 54, fontWeight: 800 }}>Elderberry</div>
        </Card>
      </Pop>
      <Pop delay={f(12.84)} rotate={2}>
        <Card style={{ width: 430, padding: "36px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ height: 231, display: "flex", alignItems: "center" }}>
            <Yeast size={200} />
          </div>
          <div style={{ fontSize: 54, fontWeight: 800 }}>EpiCor®</div>
        </Card>
      </Pop>
    </div>
  </>
);

const ElderberryScene: React.FC = () => (
  <>
    <Title delay={f(16.2)} kicker="INGREDIENT 1">
      Elderberry
    </Title>
    <div style={{ position: "absolute", top: 430, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={f(16.8)}>
        <Elderberry size={420} />
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1070, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Line delay={f(20.2)} size={44} weight={700} color={C.inkSoft}>
        (sejenis antioksidan)
      </Line>
    </div>
    <div style={{ position: "absolute", top: 930, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 20 }}>
      <Chip delay={f(17.4)} size={48}>sejenis buah berry</Chip>
      <Chip delay={f(18.6)} rotate={-2} size={48}>
        kaya <span style={{ color: C.marker }}>anthocyanins</span>
      </Chip>
    </div>
  </>
);

// A study screenshot shown as a tilted evidence card with a label strip.
const Evidence: React.FC<{ img: string; label: string; delay: number; crop: number }> = ({ img, label, delay, crop }) => (
  <Pop delay={delay} rotate={-1.5}>
    <div style={{ width: 860, background: C.card, borderRadius: 22, overflow: "hidden", boxShadow: "0 18px 40px rgba(20,30,20,0.22)" }}>
      <div style={{ background: C.ink, color: C.paper, fontSize: 30, fontWeight: 800, letterSpacing: 2, padding: "14px 26px" }}>{label}</div>
      <div style={{ height: crop, overflow: "hidden" }}>
        <Img src={staticFile(img)} style={{ width: "100%", display: "block" }} />
      </div>
    </div>
  </Pop>
);

const Review: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 170, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Evidence img="img/sr-elderberry.jpg" label="SYSTEMATIC REVIEW · 2021 · 5 RCT" delay={f(22.4)} crop={560} />
    </div>
    <Stack top={880} gap={18}>
      <Chip delay={f(24.6)} size={44}>simptom selesema &amp; jangkitan pernafasan</Chip>
      <Line delay={f(28.4)} size={54} weight={800} style={{ marginTop: 10 }}>
        <Highlight delay={f(29.2)}>Potensi ↓ tempoh &amp; keterukan</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1110, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={f(32.6)} rotate={-3} size={54}>
        EVIDENCE MASIH
        <br />
        TAK CUKUP KUAT
      </BoxStamp>
    </div>
  </>
);

const Epicor: React.FC = () => {
  const node = (label: string, at: number, icon?: React.ReactNode) => (
    <Pop delay={at}>
      <Card style={{ width: 260, padding: "22px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {icon}
        <div style={{ fontSize: 38, fontWeight: 800 }}>{label}</div>
      </Card>
    </Pop>
  );
  const arrow = (at: number) => (
    <Pop delay={at}>
      <span style={{ fontSize: 60, fontWeight: 800, color: C.marker }}>→</span>
    </Pop>
  );
  return (
    <>
      <Title delay={f(39.9)} kicker="INGREDIENT 2">
        EpiCor® = <Highlight delay={f(41.6)}>postbiotic</Highlight>
      </Title>
      <div style={{ position: "absolute", top: 470, left: 30, right: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        {node("yis", f(43.3), <Yeast size={90} />)}
        {arrow(f(43.7))}
        {node("fermentasi", f(43.9), <svg viewBox="0 0 90 90" width={90} height={90}><circle cx={30} cy={56} r={18} fill="none" stroke={C.ink} strokeWidth={5} /><circle cx={60} cy={34} r={13} fill="none" stroke={C.ink} strokeWidth={5} /><circle cx={64} cy={68} r={8} fill="none" stroke={C.ink} strokeWidth={5} /></svg>)}
        {arrow(f(44.9))}
        {node("postbiotic", f(45.2), <svg viewBox="0 0 90 90" width={90} height={90}><circle cx={45} cy={45} r={30} fill={C.gold} stroke={C.ink} strokeWidth={5} /><path d="M 32 46 L 42 56 L 60 34" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" /></svg>)}
      </div>
      <div style={{ position: "absolute", top: 860, left: 60, right: 60, display: "flex", justifyContent: "center", gap: 30 }}>
        <Pop delay={f(46.6)} rotate={-1.5}>
          <Card style={{ width: 430, padding: "26px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: C.inkSoft, letterSpacing: 2 }}>PROBIOTIC</div>
            <div style={{ fontSize: 46, fontWeight: 800, marginTop: 8 }}>bakteria hidup</div>
          </Card>
        </Pop>
        <Pop delay={f(47.9)} rotate={1.5}>
          <Card style={{ width: 430, padding: "26px 24px", textAlign: "center", border: `5px solid ${C.marker}` }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: C.marker, letterSpacing: 2 }}>POSTBIOTIC</div>
            <div style={{ fontSize: 46, fontWeight: 800, marginTop: 8 }}>
              <Highlight delay={f(49.3)}>bukan</Highlight> bakteria hidup
            </div>
          </Card>
        </Pop>
      </div>
    </>
  );
};

const Rct: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 170, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Evidence img="img/rct-epicor.jpg" label="RCT · PILOT · n=80 · 6 MINGGU · 2017" delay={f(51.0)} crop={520} />
    </div>
    <div style={{ position: "absolute", top: 860, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
      <Chip delay={f(55.3)} rotate={-2} size={46}>gut microbiome</Chip>
      <Chip delay={f(57.0)} rotate={2} size={46}>digestive comfort</Chip>
    </div>
    <Stack top={1000} gap={8}>
      <Line delay={f(58.2)} size={40} weight={700} color={C.inkSoft}>
        + simptom cold &amp; flu: RCT EpiCor lain (2008, 2010)
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1110, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <Pop delay={f(59.6)} rotate={-1}>
        <div style={{ background: C.ink, color: C.paper, borderRadius: 18, padding: "16px 30px", fontSize: 38, fontWeight: 800, textAlign: "center" }}>
          Kajian: 500 mg/hari · ImmuLift: <span style={{ color: C.gold }}>≈500 mg sehidang</span>
        </div>
      </Pop>
    </div>
  </>
);

const GutImmune: React.FC = () => (
  <>
    <Title delay={f(61.4)}>
      Kenapa cerita pasal <Highlight delay={f(62.5)}>gut?</Highlight>
    </Title>
    <div style={{ position: "absolute", top: 470, left: 40, right: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
      <Pop delay={f(63.4)}>
        <Card style={{ width: 360, padding: "26px 18px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Gut size={170} />
          <div style={{ fontSize: 48, fontWeight: 800 }}>usus</div>
        </Card>
      </Pop>
      <Pop delay={f(67.7)}>
        <span style={{ fontSize: 90, fontWeight: 800, color: C.marker }}>⇄</span>
      </Pop>
      <Pop delay={f(69.8)}>
        <Card style={{ width: 360, padding: "26px 18px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Shield size={150} />
          <div style={{ fontSize: 48, fontWeight: 800 }}>sistem imun</div>
        </Card>
      </Pop>
    </div>
    <Stack top={900} gap={10}>
      <Line delay={f(63.98)} size={48} weight={700}>
        bukan <Highlight delay={f(64.6)}>sekadar</Highlight> tempat digest makanan
      </Line>
      <Line delay={f(67.7)} size={48} weight={700} color={C.inkSoft}>
        hubungan sangat rapat dengan imun
      </Line>
    </Stack>
  </>
);

// Amounts per 3.7 g serving, from the Malaysian box label (Nutrition Facts, ©2023 Herbalife Nutrition, SKU145K).
const NUTRIENTS: [string, string, number][] = [
  ["Vitamin C", "40 mg", 72.38],
  ["Vitamin D", "2.9 µg", 73.26],
  ["Zinc", "4.4 mg", 74.18],
  ["Selenium", "17.4 µg", 74.86],
];

const Nutrients: React.FC = () => (
  <>
    <Title delay={f(70.6)} kicker="DALAM IMMULIFT">
      Turut ada
    </Title>
    <div style={{ position: "absolute", top: 470, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 26 }}>
      {NUTRIENTS.map(([n, amt, at], i) => (
        <Pop key={n} delay={f(at)} rotate={i % 2 ? 2 : -2}>
          <Card style={{ width: 420, padding: "24px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 52, fontWeight: 800 }}>{n}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.marker, marginTop: 4 }}>{amt} / hidangan</div>
          </Card>
        </Pop>
      ))}
    </div>
    <Stack top={900} gap={8}>
      <Line delay={f(75.9)} size={48} weight={700}>
        menyumbang kepada fungsi
      </Line>
      <Line delay={f(76.6)} size={58} weight={800}>
        <Highlight delay={f(77.2)}>normal sistem imun</Highlight>
      </Line>
    </Stack>
  </>
);

const BASICS: [string, number][] = [
  ["makanan seimbang", 80.56],
  ["tidur cukup", 81.56],
  ["vaksinasi", 82.48],
];

const Basics: React.FC = () => (
  <>
    <Title delay={f(78.7)} kicker="TAPI KENA INGAT">
      Supplement <Highlight delay={f(79.9)}>bukan pengganti</Highlight>
    </Title>
    <Stack top={500} gap={24}>
      {BASICS.map(([b, at], i) => (
        <Pop key={b} delay={f(at)} rotate={i % 2 ? 1 : -1}>
          <Card style={{ width: 760, padding: "26px 36px", display: "flex", alignItems: "center", gap: 24 }}>
            <Mark kind="check" delay={f(at) + 5} size={56} />
            <span style={{ fontSize: 54, fontWeight: 800 }}>{b}</span>
          </Card>
        </Pop>
      ))}
    </Stack>
  </>
);

const SCENES: Record<string, React.FC> = { ingredients: Ingredients, elderberry: ElderberryScene, review: Review, epicor: Epicor, rct: Rct, gut: GutImmune, nutrients: Nutrients, basics: Basics };

const Layers: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  const cut = Object.entries(CUTS).find(([, [a, b]]) => t >= T(a) && t < T(b));
  const Cut = cut ? SCENES[cut[0]] : null;
  return (
    <>
      <FaceCamOpener clip={CLIP} hook={<>ELDERBERRY &amp; EPICOR: <span style={{ color: C.marker }}>APA KATA KAJIAN?</span></>} hookSize={56} lowerTop={1530}>
        <CtaPill icon="comment" delay={f(95.3)}>
          PM saya, kita sembang
        </CtaPill>
      </FaceCamOpener>
      {Cut && (
        <AbsoluteFill style={{ background: C.paper }}>
          <div style={{ position: "absolute", inset: 0, transform: "translateY(90px) scale(1.05)", transformOrigin: "50% 0%" }}>
            <Cut />
          </div>
          <Bubble />
        </AbsoluteFill>
      )}
      <Captions words={IMMUNE_WORDS} top={Cut ? 1650 : 1130} size={Cut ? 54 : 62} plate={!!Cut} />
    </>
  );
};

export const IMMULIFT_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: <Layers />,
    cues: [
      ...Object.values(CUTS).map(([a]): [number, "whoosh", number] => [Math.round(T(a) * FPS), "whoosh", 0.25]),
      [f(32.6), "stamp", 0.35],
      [f(95.3), "pop", 0.3],
    ],
  },
];
