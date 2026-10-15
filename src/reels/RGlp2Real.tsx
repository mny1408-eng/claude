// Reel GLP-1 Part 2 "Apa jadi bila berhenti ubat GLP-1?" — hybrid: hook, then voice + drawn charts.
// Script agreed in chat 14/10. Facts (PubMed): Wilding 2022 Diabetes Obes Metab (STEP 1 extension: about two-thirds of the
// weight lost regained one year after stopping; cardiometabolic gains reverted toward baseline) and Rubino 2021 JAMA (STEP 4:
// continue vs switch to placebo, both with lifestyle counselling — continued group kept losing, switched group regained).
// Charts are schematic (shape only, no axis numbers). No brand names, no Herbalife link.
// Media (local only, gitignored):
//   public/voice/R-glp2/source.mp3   TeleCue 15/10 08:36 (src 1.55–58.02) + 08:35 (src 0.95–33.90): one read the app split at
//                                    60s; the repeated "Jangan berhenti ataupun tukar dos…" at the seam is taken from 08:35 only.
// Times below are seconds in the joined voice file (Whisper medium, unprompted, per take).
// HOOK: placeholder title card until the face-cam hook is recorded.
import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, SAFE, Stack } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { voiceTimeline } from "./formats/voiceTimeline";
import { Envelope, Otak } from "./RGlp1Real";

const AUDIO = "voice/R-glp2/source.mp3";
const OPEN = 105;
const tl = voiceTimeline({ clipLen: OPEN, clipFrom: 0, voiceFrom: 0 });
const w = tl.w;

const starts = {
  kajian: OPEN,
  bacaan: tl.start(17.75),
  kajian2: tl.start(24.27),
  kenapa: tl.start(39.53),
  selamanya: tl.start(49.37),
  asas: tl.start(60.16),
  ubat: tl.start(77.66),
  cta: tl.start(85.16),
  end: tl.end(88.4, 2.6),
};

const RED = "#B5412E";
const GREY = "#9CB8A9";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const draw = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });

// ---------- opener (placeholder) ----------

const Opener: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={4} rotate={-4} size={130}>
        PART 2
      </BoxStamp>
    </div>
    <Stack top={600} gap={12}>
      <Line delay={14} size={58} weight={700} color={C.inkSoft}>
        Apa jadi bila
      </Line>
      <Line delay={22} size={80} weight={800}>
        <Highlight delay={30}>berhenti</Highlight> ubat GLP-1?
      </Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- chart frame ----------

const CW = 830;
const CH = 500;
const Axes: React.FC = () => (
  <>
    <line x1={20} y1={10} x2={20} y2={CH - 20} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
    <line x1={20} y1={CH - 20} x2={CW - 10} y2={CH - 20} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
    <text x={34} y={36} fontSize={28} fontWeight={700} fill={C.inkSoft}>
      berat
    </text>
    <text x={CW - 14} y={CH - 34} fontSize={28} fontWeight={700} fill={C.inkSoft} textAnchor="end">
      masa →
    </text>
  </>
);

const Seg: React.FC<{ d: string; p: number; color: string; dash?: boolean; width?: number }> = ({ d, p, color, dash, width = 10 }) =>
  p <= 0 ? null : dash ? (
    <g style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}>
      <path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" strokeDasharray="18 16" />
    </g>
  ) : (
    <path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
  );

// ---------- scenes ----------

const Kajian: React.FC = () => {
  const s = starts.kajian;
  const f = useCurrentFrame();
  const down = draw(f, w(s, 5.0), w(s, 7.6));
  const stopAt = w(s, 8.97);
  const up = draw(f, w(s, 13.2), w(s, 16.9));
  // drop of 320px, regain of two-thirds of it
  const lossPath = "M 40 70 C 160 90, 260 320, 420 390";
  const regainPath = "M 420 390 C 560 380, 680 200, 810 177";
  return (
    <AbsoluteFill>
      <Stack top={220} gap={6}>
        <Line delay={w(s, 0.15)} size={50} weight={700} color={C.inkSoft}>
          Satu clinical trial besar:
        </Line>
        <Line delay={w(s, 3.0)} size={56} weight={800}>
          ubat ±setahun → <Highlight delay={w(s, 7.0)}>berat turun</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 440, left: SAFE.left }}>
        <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} style={{ overflow: "visible" }}>
          <Axes />
          <Seg d={lossPath} p={down} color={C.ink} />
          {f >= stopAt && (
            <g opacity={interpolate(f, [stopAt, stopAt + 6], [0, 1], clamp)}>
              <line x1={420} y1={60} x2={420} y2={CH - 20} stroke={RED} strokeWidth={5} strokeDasharray="12 10" />
              <rect x={350} y={20} width={140} height={52} rx={12} fill={RED} />
              <text x={420} y={56} fontSize={30} fontWeight={800} fill="#fff" textAnchor="middle">
                STOP
              </text>
            </g>
          )}
          <Seg d={regainPath} p={up} color={RED} />
          {up > 0.95 && (
            <g>
              <line x1={790} y1={390} x2={790} y2={182} stroke={C.marker} strokeWidth={4} />
              <line x1={776} y1={390} x2={804} y2={390} stroke={C.marker} strokeWidth={4} />
            </g>
          )}
        </svg>
      </div>
      <div style={{ position: "absolute", top: 1000, left: SAFE.left, width: CW, display: "flex", justifyContent: "center" }}>
        <Pop delay={w(s, 14.01)} rotate={-2}>
          <div style={{ background: C.ink, color: C.paper, borderRadius: 20, padding: "16px 34px", fontSize: 46, fontWeight: 800, textAlign: "center" }}>
            setahun lepas stop:
            <br />
            <span style={{ color: C.gold }}>±⅔ naik balik</span>
          </div>
        </Pop>
      </div>
    </AbsoluteFill>
  );
};

const Meter: React.FC<{ label: string; icon: React.ReactNode; at: number; back: number }> = ({ label, icon, at, back }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [back, back + 16], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <Pop delay={at}>
      <Card style={{ width: 830, padding: "22px 30px", display: "flex", alignItems: "center", gap: 26 }}>
        {icon}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 44, fontWeight: 800 }}>{label}</div>
          <div style={{ position: "relative", height: 26, borderRadius: 13, background: "#E7E3D4" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${30 + p * 45}%`, borderRadius: 13, background: p > 0.5 ? RED : "#5E7D6E" }} />
          </div>
        </div>
      </Card>
    </Pop>
  );
};

const Drop: React.FC = () => (
  <svg viewBox="0 0 100 100" width={100} height={100}>
    <path d="M 50 8 C 30 40, 18 56, 18 68 A 32 32 0 0 0 82 68 C 82 56, 70 40, 50 8 Z" fill="#F2D9A7" stroke={C.ink} strokeWidth={5} />
    <text x={50} y={78} fontSize={26} fontWeight={800} textAnchor="middle" fill={C.ink}>
      gula
    </text>
  </svg>
);
const Gauge: React.FC = () => (
  <svg viewBox="0 0 100 100" width={100} height={100}>
    <circle cx={50} cy={54} r={40} fill={C.card} stroke={C.ink} strokeWidth={5} />
    <path d="M 50 54 L 76 34" stroke={RED} strokeWidth={6} strokeLinecap="round" />
    <circle cx={50} cy={54} r={6} fill={C.ink} />
    <text x={50} y={84} fontSize={20} fontWeight={800} textAnchor="middle" fill={C.ink}>
      BP
    </text>
  </svg>
);

const Bacaan: React.FC = () => {
  const s = starts.bacaan;
  return (
    <AbsoluteFill>
      <Stack top={230} gap={6}>
        <Line delay={w(s, 17.75)} size={66} weight={800}>
          Bukan setakat <span style={{ position: "relative", display: "inline-block" }}>berat<Strike delay={w(s, 18.9)} width={6} /></span>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 440, left: SAFE.left, display: "flex", flexDirection: "column", gap: 28 }}>
        <Meter label="gula" icon={<Drop />} at={w(s, 20.15)} back={w(s, 21.79)} />
        <Meter label="tekanan darah" icon={<Gauge />} at={w(s, 20.87)} back={w(s, 22.0)} />
      </div>
      <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={w(s, 23.07)} rotate={-3} size={56}>
          CENDERUNG KEMBALI ASAL
        </BoxStamp>
      </div>
    </AbsoluteFill>
  );
};

const Kajian2: React.FC = () => {
  const s = starts.kajian2;
  const f = useCurrentFrame();
  const runIn = draw(f, w(s, 24.27), w(s, 25.4));
  const cont = draw(f, w(s, 35.45), w(s, 37.0));
  const plac = draw(f, w(s, 37.67), w(s, 39.0));
  return (
    <AbsoluteFill>
      <Stack top={220} gap={6}>
        <Line delay={w(s, 24.27)} size={50} weight={700} color={C.inkSoft}>
          Satu lagi kajian:
        </Line>
        <Line delay={w(s, 25.4)} size={58} weight={800}>
          <Highlight delay={w(s, 26.47)}>teruskan</Highlight> vs <Highlight delay={w(s, 28.33)} color="#F3C7BC">tukar ke placebo</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 420, left: SAFE.left }}>
        <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} style={{ overflow: "visible" }}>
          <Axes />
          <Seg d="M 40 70 C 120 90, 200 200, 300 250" p={runIn} color={C.ink} />
          <Seg d="M 300 250 C 450 300, 600 380, 640 410" p={cont} color={C.ink} />
          <Seg d="M 300 250 C 430 240, 540 150, 640 120" p={plac} color={RED} />
          {cont > 0.9 && (
            <text x={660} y={420} fontSize={32} fontWeight={800} fill={C.ink}>
              teruskan ↓
            </text>
          )}
          {plac > 0.9 && (
            <text x={660} y={130} fontSize={32} fontWeight={800} fill={RED}>
              berhenti ↑
            </text>
          )}
        </svg>
      </div>
      <div style={{ position: "absolute", top: 980, left: SAFE.left, width: CW, display: "flex", justifyContent: "center" }}>
        <Chip delay={w(s, 31.45)} rotate={-1.5} size={42}>
          dua-dua dapat kaunseling gaya hidup
        </Chip>
      </div>
    </AbsoluteFill>
  );
};

const Kenapa: React.FC = () => {
  const s = starts.kenapa;
  const f = useCurrentFrame();
  const gone = interpolate(f, [w(s, 44.6), w(s, 44.6) + 12], [1, 0], clamp);
  return (
    <AbsoluteFill>
      <Stack top={230} gap={6}>
        <Line delay={w(s, 39.53)} size={86} weight={800}>
          Kenapa?
        </Line>
        <Line delay={w(s, 41.0)} size={50} weight={700} color={C.inkSoft}>
          ubat stop → <Highlight delay={w(s, 42.05)}>mesej kenyang</Highlight> hilang
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
        <div style={{ opacity: gone, transform: `translateY(${(1 - gone) * -40}px) rotate(${(1 - gone) * -20}deg)` }}>
          <Envelope size={170} />
        </div>
        <Pop delay={w(s, 41.0)}>
          <Otak size={300} />
        </Pop>
      </div>
      <div style={{ position: "absolute", top: 560, left: 640 }}>
        <Pop delay={w(s, 44.01)} rotate={6}>
          <div style={{ background: C.card, border: `5px solid ${C.ink}`, borderRadius: 26, padding: "10px 24px", fontSize: 44, fontWeight: 800, color: RED }}>lapar!</div>
        </Pop>
      </div>
      <Stack top={790} gap={10}>
        <Line delay={w(s, 44.01)} size={52} weight={700}>
          selera makan datang balik
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 880, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={w(s, 46.89)} rotate={-3} size={56}>
          BIOLOGI, BUKAN LEMAH
        </BoxStamp>
      </div>
    </AbsoluteFill>
  );
};

const Selamanya: React.FC = () => {
  const s = starts.selamanya;
  return (
    <AbsoluteFill>
      <Stack top={240} gap={8}>
        <Line delay={w(s, 49.57)} size={54} weight={700} color={C.inkSoft}>
          Jadi kena makan ubat
        </Line>
        <Line delay={w(s, 51.27)} size={84} weight={800}>
          selama-lamanya?
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 520, left: SAFE.left, width: CW, display: "flex", justifyContent: "center" }}>
        <Pop delay={w(s, 53.21)} rotate={-1}>
          <Card style={{ padding: "26px 36px", fontSize: 50, fontWeight: 800, textAlign: "center", lineHeight: 1.2 }}>
            keputusan <Highlight delay={w(s, 54.21)}>awak</Highlight>
            <br />+ <Highlight delay={w(s, 55.95)}>doktor</Highlight>
          </Card>
        </Pop>
      </div>
      <div style={{ position: "absolute", top: 860, left: SAFE.left, width: CW }}>
        <Pop delay={w(s, 56.64)} rotate={1}>
          <div style={{ background: "#FBE9E4", border: `6px solid ${RED}`, borderRadius: 24, padding: "24px 32px", fontSize: 50, fontWeight: 800, color: RED, textAlign: "center", lineHeight: 1.2 }}>
            ⚠ Jangan berhenti atau
            <br />
            tukar dos sendiri
          </div>
        </Pop>
      </div>
    </AbsoluteFill>
  );
};

const ASAS: [React.ReactNode, number][] = [
  [<>protein yang cukup</>, 68.38],
  [<>latihan kekuatan, jaga otot</>, 69.66],
  [<>rutin makan yang boleh diteruskan</>, 71.8],
];

const Asas: React.FC = () => {
  const s = starts.asas;
  return (
    <AbsoluteFill>
      <Stack top={220} gap={6}>
        <Line delay={w(s, 60.16)} size={52} weight={700} color={C.inkSoft}>
          Yang awak boleh kawal:
        </Line>
        <Line delay={w(s, 62.58)} size={58} weight={800}>
          masa ambil ubat, <Highlight delay={w(s, 65.5)}>bina asas</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 440, left: SAFE.left, display: "flex", flexDirection: "column", gap: 24 }}>
        {ASAS.map(([text, at], i) => (
          <Pop key={i} delay={w(s, at)} rotate={i % 2 ? 1 : -1}>
            <Card style={{ width: CW, padding: "24px 30px", display: "flex", alignItems: "center", gap: 24 }}>
              <Mark kind="check" delay={w(s, at) + 4} size={64} />
              <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.15 }}>{text}</div>
            </Card>
          </Pop>
        ))}
      </div>
      <div style={{ position: "absolute", top: 1000, left: SAFE.left, width: CW, textAlign: "center" }}>
        <Line delay={w(s, 74.46)} size={50} weight={700} color={C.inkSoft}>
          …bila <Highlight delay={w(s, 74.92)}>selera datang balik</Highlight>
        </Line>
      </div>
    </AbsoluteFill>
  );
};

const Ubat: React.FC = () => {
  const s = starts.ubat;
  const row = (tag: string, text: React.ReactNode, at: number, dark: boolean) => (
    <Pop delay={w(s, at)} rotate={dark ? 1 : -1}>
      <div style={{ width: CW, boxSizing: "border-box", padding: "28px 34px", borderRadius: 24, background: dark ? C.ink : C.card, color: dark ? C.paper : C.ink, boxShadow: "0 12px 28px rgba(20,30,20,0.14)" }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 3, color: dark ? C.gold : C.marker }}>{tag}</div>
        <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.18 }}>{text}</div>
      </div>
    </Pop>
  );
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 300, left: SAFE.left, display: "flex", flexDirection: "column", gap: 34 }}>
        {row("UBAT", <>bantu turunkan berat</>, 77.98, false)}
        {row("TABIAT", <>bantu awak hadapi hari bila ubat dah stop</>, 79.34, true)}
      </div>
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => {
  const s = starts.cta;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 360, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <CtaPill icon="save" delay={w(s, 85.16)}>
          Save video ni
        </CtaPill>
      </div>
      <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <CtaPill icon="share" delay={w(s, 86.44)}>
          Share pada kawan
        </CtaPill>
      </div>
      <Stack top={760} gap={8}>
        <Line delay={w(s, 87.0)} size={46} weight={700} color={C.inkSoft}>
          yang tengah ambil ubat GLP-1
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 1180, left: SAFE.left, width: CW, textAlign: "center", fontSize: 26, fontWeight: 600, color: C.inkSoft, opacity: 0.85 }}>
        Sumber: Wilding et al. 2022, Diabetes Obes Metab · Rubino et al. 2021, JAMA
      </div>
    </AbsoluteFill>
  );
};

// ---------- captions ----------

const VOICE_WORDS: [number, string][] = [
  [0.15, "Dalam"], [0.79, "satu"], [1.11, "clinical"], [1.45, "trial"], [1.85, "yang"], [2.31, "besar,"], [2.93, "orang"], [2.99, "dewasa"], [4.07, "yang"], [4.31, "ambil"],
  [4.51, "ubat"], [4.75, "ni"], [4.97, "selama"], [5.19, "lebih"], [5.43, "kurang"], [5.67, "setahun"], [6.63, "berjaya"], [7.03, "turunkan"], [7.47, "berat."], [8.03, "Lepas"],
  [8.29, "tu"], [8.39, "ubat"], [8.65, "tu"], [8.97, "dihentikan."], [10.39, "Setahun"], [10.67, "selepas"], [11.47, "stop"], [12.29, "ubat"], [12.61, "tu,"], [12.83, "secara"],
  [13.21, "purata,"], [14.01, "dua"], [14.41, "pertiga"], [14.75, "berat"], [15.13, "yang"], [15.29, "dah"], [15.43, "turun,"], [16.37, "dia"], [16.43, "naik"], [16.61, "balik."],
  [17.75, "Bukan"], [17.99, "setakat"], [18.45, "berat,"], [19.13, "tapi"], [19.47, "bacaan"], [19.89, "macam"], [20.15, "gula"], [20.65, "dan"], [20.87, "tekanan"], [21.19, "darah"],
  [21.55, "pun"], [21.79, "cenderung"], [22.25, "kembali"], [23.07, "macam"], [23.35, "asal."], [24.27, "Ada"], [24.49, "satu"], [24.67, "lagi"], [24.87, "kajian,"], [25.39, "satu"],
  [25.53, "kumpulan"], [25.93, "dia"], [26.23, "terus"], [26.47, "continue"], [26.85, "ubat,"], [27.61, "satu"], [27.75, "kumpulan"], [28.07, "lagi"], [28.33, "ditukar"], [28.81, "kepada"],
  [29.09, "ubat"], [29.33, "kosong"], [29.69, "ataupun"], [30.03, "placebo,"], [30.47, "dan"], [31.45, "dua-dua"], [31.75, "kumpulan"], [32.11, "dapat"], [32.47, "kaunseling"], [33.35, "tentang"],
  [33.73, "gaya"], [33.97, "hidup."], [35.37, "Yang"], [35.45, "teruskan"], [35.89, "ubat,"], [36.17, "berat"], [36.51, "dia"], [36.73, "terus"], [36.95, "turun."], [37.45, "Yang"],
  [37.67, "berhenti,"], [38.11, "berat"], [38.45, "naik"], [38.65, "balik."], [39.53, "Kenapa?"], [40.43, "Sebab"], [40.83, "bila"], [41.07, "ubat"], [41.33, "tu"], [41.53, "stop,"],
  [42.05, "mesej"], [42.37, "kenyang"], [42.71, "tu"], [42.93, "pun"], [43.05, "hilang."], [43.85, "So"], [44.01, "selera"], [44.33, "makan"], [44.69, "dia"], [44.95, "dah"],
  [45.31, "datang"], [45.55, "balik."], [46.19, "So"], [46.47, "this"], [46.67, "is"], [46.89, "biology,"], [47.49, "bukannya"], [47.69, "sebab"], [48.01, "awak"], [48.17, "ni"],
  [48.35, "lemah."], [49.37, "Jadi"], [49.57, "maksudnya"], [49.95, "kena"], [50.17, "makan"], [50.71, "ubat"], [51.27, "selama-lamanya"], [51.97, "ke?"], [52.61, "So"], [52.67, "itu"],
  [52.95, "adalah"], [53.21, "keputusan"], [54.21, "awak"], [54.85, "selepas"], [55.37, "berbincang"], [55.77, "dengan"], [55.95, "doktor."], [56.64, "Jangan"], [57.24, "berhenti"], [57.76, "ataupun"],
  [58.18, "tukar"], [58.60, "dos"], [58.76, "awak"], [59.00, "sendiri."], [60.16, "Tapi"], [60.40, "apa"], [60.72, "yang"], [60.86, "awak"], [61.00, "boleh"], [61.28, "kontrol?"],
  [62.58, "So"], [62.68, "masa"], [62.92, "tengah"], [63.64, "ambil"], [63.94, "ubat,"], [64.94, "you"], [64.98, "have"], [65.18, "to"], [65.50, "build"], [65.66, "your"],
  [65.90, "foundation."], [66.96, "Asas"], [67.04, "tu"], [67.18, "paling"], [67.34, "penting,"], [68.38, "protein"], [68.60, "yang"], [68.76, "cukup,"], [69.66, "strength"], [69.80, "training"],
  [70.10, "untuk"], [70.38, "jaga"], [70.70, "otot,"], [71.54, "and"], [71.80, "rutin"], [72.06, "makan"], [72.48, "yang"], [72.74, "awak"], [72.92, "boleh"], [73.48, "continue"],
  [74.46, "bila"], [74.92, "selera"], [75.44, "tu"], [75.64, "dah"], [75.78, "datang"], [76.04, "balik."], [77.66, "Ubat"], [77.78, "boleh"], [77.98, "bantu"], [78.26, "turunkan"],
  [78.74, "berat,"], [78.92, "tapi"], [79.34, "habit"], [79.96, "dan"], [80.58, "lifestyle"], [81.00, "awak"], [81.48, "yang"], [82.04, "bantu"], [82.38, "awak"], [82.82, "hadapi"],
  [83.32, "bila"], [83.74, "hari-hari"], [84.16, "ubat"], [84.46, "tu"], [84.58, "kita"], [84.78, "dah"], [84.94, "stop."], [85.16, "Save"], [85.84, "video"], [86.08, "ni"],
  [86.20, "and"], [86.44, "share"], [86.76, "kepada"], [87.08, "kawan"], [87.42, "yang"], [87.62, "tengah"], [87.84, "ambil"], [88.08, "ubat"], [88.38, "GLP-1."],
];

const WORDS: Word[] = VOICE_WORDS.map(([t, text], i) => {
  const next = VOICE_WORDS[i + 1]?.[0] ?? t + 0.6;
  return [tl.reel(t), tl.reel(Math.min(next, t + 0.7)), text];
});

export const RGlp2Overlay: React.FC = () => (
  <>
    <Sequence from={tl.voiceFrame} layout="none">
      <Audio src={staticFile(AUDIO)} />
    </Sequence>
    <Captions words={WORDS} top={1335} size={50} max={4} plate left={SAFE.left} right={SAFE.right} />
  </>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, x]) => [f, s, x * k]);
const at = (s: number, list: [number, Cue[1], number][]): Cue[] => list.map(([t, sfx, vol]) => [w(s, t), sfx, vol]);

export const RGLP2_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: OPEN, el: <Opener />, cues: soft([[4, "stamp", 0.6], [OPEN - 6, "whoosh", 0.6]]) },
  { id: "kajian", dur: starts.bacaan - starts.kajian, el: <Kajian />, cues: soft(at(starts.kajian, [[8.97, "stamp", 0.5], [14.01, "pop", 0.45]])) },
  { id: "bacaan", dur: starts.kajian2 - starts.bacaan, el: <Bacaan />, cues: soft(at(starts.bacaan, [[18.9, "scribble", 0.45], [20.15, "pop", 0.4], [20.87, "pop", 0.4], [23.07, "stamp", 0.55]])) },
  { id: "kajian2", dur: starts.kenapa - starts.kajian2, el: <Kajian2 />, cues: soft(at(starts.kajian2, [[31.45, "pop", 0.4], [35.45, "swipe", 0.35], [37.67, "swipe", 0.35]])) },
  { id: "kenapa", dur: starts.selamanya - starts.kenapa, el: <Kenapa />, cues: soft(at(starts.kenapa, [[44.01, "pop", 0.45], [46.89, "stamp", 0.6]])) },
  { id: "selamanya", dur: starts.asas - starts.selamanya, el: <Selamanya />, cues: soft(at(starts.selamanya, [[53.21, "pop", 0.45], [56.64, "pop", 0.5]])) },
  { id: "asas", dur: starts.ubat - starts.asas, el: <Asas />, cues: soft(at(starts.asas, ASAS.map(([, t]): [number, Cue[1], number] => [t, "tick", 0.5]))) },
  { id: "ubat", dur: starts.cta - starts.ubat, el: <Ubat />, cues: soft(at(starts.ubat, [[77.98, "pop", 0.45], [79.34, "pop", 0.45]])) },
  { id: "cta", dur: starts.end - starts.cta, el: <Cta />, cues: soft(at(starts.cta, [[85.16, "pop", 0.5], [86.44, "chime", 0.45]])) },
];
