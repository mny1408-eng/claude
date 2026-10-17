// Reel (17/10, extra) "Lose fat tanpa stop makan nasi — 4 step" — full talk from Coach Nas's own script (pasted in chat 17/10):
// hook, step 1 calories, step 2 protein + fibre, step 3 habits that fit, step 4 fallback plan, ending. He ad-libbed in rojak, so
// captions follow what was said (prompted Whisper, checked against unprompted EN/MS runs), not the script.
// Media (local only, gitignored):
//   public/clips/R1710b-nasi-full.mp4   7 Teleprompter takes (17/10 16:13–16:15) joined, 56.5s. Cuts: take 2 stumble "First kali,
//                                       know your needs." (src 7.0–8.75), take 3 gap before "Cukupkan", take 6 tail "Save this untuk
//                                       your next." (redone in take 7). An unclear word after "boleh start" is left uncaptioned.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { CENTER, Chip, CtaPill } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1710b-nasi-full.mp4";
const CLIP_LEN = 1695;
const END = 90;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.0, 1.1, "Kalau"], [1.1, 1.28, "nak"], [1.28, 1.44, "lose"], [1.44, 1.64, "fat,"], [1.82, 2.02, "takkan"], [2.02, 2.42, "sampai"], [2.42, 2.7, "kena"], [2.7, 2.98, "stop"], [2.98, 3.38, "makan"], [3.38, 3.76, "nasi"],
  [3.76, 4.08, "kot?"], [4.42, 4.72, "Actually,"], [4.96, 5.16, "ramai"], [5.16, 5.32, "je"], [5.32, 5.44, "orang"], [5.44, 5.7, "boleh"], [5.7, 6.1, "start,"], [6.18, 6.48, "tapi"], [6.48, 6.7, "step"], [6.7, 7.0, "4"],
  [7.0, 7.18, "is"], [7.18, 7.34, "what"], [7.34, 7.66, "helps"], [7.66, 8.06, "you"], [8.06, 8.26, "keep"], [8.26, 8.62, "going"], [8.62, 8.94, "bila"], [8.94, 9.16, "life"], [9.16, 9.44, "gets"], [9.44, 9.92, "busy."],
  [9.98, 10.54, "First,"], [10.72, 11.02, "kita"], [11.02, 11.28, "kena"], [11.28, 11.58, "faham"], [11.58, 11.84, "how"], [11.84, 12.3, "much"], [12.54, 12.8, "food"], [12.8, 13.04, "our"], [13.04, 13.24, "body"], [13.24, 13.7, "actually"],
  [13.7, 13.94, "needs."], [14.06, 14.34, "Jangan"], [14.34, 14.74, "simply"], [14.74, 14.92, "cut"], [14.92, 15.44, "everything"], [15.44, 15.74, "bila"], [15.74, 16.04, "kita"], [16.04, 16.26, "aware"], [16.26, 16.5, "on"], [16.5, 16.74, "our"],
  [16.74, 17.14, "calories."], [17.6, 17.82, "Senang"], [17.82, 18.12, "sikit"], [18.12, 18.4, "nak"], [18.4, 18.6, "make"], [18.6, 18.94, "better"], [18.94, 19.4, "choices."], [19.58, 19.98, "Number"], [19.98, 20.32, "2,"], [20.62, 20.92, "prioritize"],
  [20.92, 21.24, "protein"], [21.24, 21.52, "and"], [21.52, 21.94, "fibre."], [22.24, 22.54, "Cukupkan"], [22.54, 22.88, "protein"], [22.88, 23.12, "and"], [23.12, 23.42, "fibre,"], [23.46, 23.58, "you"], [23.58, 23.8, "can"], [23.8, 23.98, "still"],
  [23.98, 24.24, "makan"], [24.24, 24.56, "nasi,"], [24.7, 24.8, "but"], [24.8, 25.02, "make"], [25.02, 25.22, "sure"], [25.22, 25.44, "your"], [25.44, 25.64, "meals"], [25.64, 25.88, "are"], [25.88, 26.28, "structured"], [26.28, 26.68, "supaya"],
  [26.68, 26.94, "lebih"], [26.94, 27.4, "satisfied."], [27.6, 28.18, "Yang"], [28.18, 28.6, "ketiga,"], [28.74, 29.04, "build"], [29.04, 29.4, "habits"], [29.4, 29.74, "that"], [29.74, 29.98, "fit"], [29.98, 30.24, "your"], [30.24, 30.68, "routine."],
  [31.18, 31.66, "Kerja"], [31.66, 31.9, "busy,"], [31.92, 32.22, "family"], [32.22, 32.44, "dinner,"], [32.68, 32.8, "makan"], [32.8, 33.04, "luar,"], [33.18, 33.26, "semua"], [33.26, 33.62, "normal."], [33.86, 34.04, "Your"], [34.04, 34.26, "eating"],
  [34.26, 34.78, "habits"], [34.78, 35.04, "are"], [35.04, 35.44, "very"], [35.44, 35.94, "practical"], [35.94, 36.18, "in"], [36.18, 36.36, "your"], [36.36, 36.58, "life."], [37.2, 37.3, "Okay,"], [37.34, 37.48, "this"], [37.48, 37.64, "is"],
  [37.64, 37.84, "the"], [37.84, 38.16, "important"], [38.16, 38.4, "one."], [38.56, 39.02, "Motivation"], [39.02, 39.2, "won't"], [39.2, 39.56, "always"], [39.56, 39.82, "be"], [39.82, 40.24, "there."], [40.38, 40.54, "Bila"], [40.54, 40.74, "Raya"],
  [40.74, 41.1, "datang"], [41.1, 41.42, "ataupun"], [41.42, 41.74, "rutin"], [41.74, 41.94, "lari,"], [42.04, 42.12, "you"], [42.12, 42.3, "need"], [42.3, 42.7, "simple"], [42.7, 43.14, "habits"], [43.14, 43.52, "to"], [43.52, 43.7, "fall"],
  [43.7, 43.94, "back"], [43.94, 44.18, "on."], [44.44, 44.72, "So"], [44.72, 44.88, "you"], [44.88, 45.08, "can"], [45.08, 45.44, "continue"], [45.44, 45.76, "instead"], [45.76, 45.98, "of"], [45.98, 46.2, "starting"], [46.2, 46.48, "from"],
  [46.48, 46.76, "zero."], [47.38, 47.62, "I've"], [47.62, 47.68, "seen"], [47.68, 47.86, "a"], [47.86, 47.96, "lot"], [47.96, 48.14, "of"], [48.14, 48.28, "people"], [48.28, 48.52, "lose"], [48.52, 48.66, "fat"], [48.66, 48.9, "and"],
  [48.9, 49.18, "maintain"], [49.18, 49.38, "their"], [49.38, 49.62, "results"], [49.62, 49.92, "while"], [49.92, 50.12, "still"], [50.12, 50.54, "enjoying"], [50.54, 50.86, "their"], [50.86, 51.12, "food."], [51.94, 52.42, "Consistency"], [52.42, 52.66, "is"],
  [52.66, 52.84, "the"], [52.84, 52.96, "key,"], [53.06, 53.14, "it's"], [53.14, 53.26, "not"], [53.26, 53.84, "motivation."], [54.32, 54.56, "Save"], [54.56, 54.92, "this,"], [55.16, 55.18, "bila"], [55.18, 55.48, "next"], [55.48, 55.66, "time"],
  [55.66, 55.84, "your"], [55.84, 56.12, "routine"], [56.12, 56.46, "lari."],
];

const Dark: React.FC<{ at: number; children: React.ReactNode; size?: number }> = ({ at, children, size = 42 }) => (
  <Pop delay={f(at)} rotate={-1.5}>
    <div style={{ background: C.ink, color: C.paper, borderRadius: 18, padding: "12px 26px", fontSize: size, fontWeight: 800, textAlign: "center", whiteSpace: "nowrap", ...OVER_VIDEO }}>{children}</div>
  </Pop>
);

const Step: React.FC<{ n: number; at: number; children: React.ReactNode }> = ({ n, at, children }) => (
  <Pop delay={f(at)} rotate={-1}>
    <Card style={{ display: "flex", alignItems: "center", gap: 18, padding: "12px 26px 12px 14px", ...OVER_VIDEO }}>
      <div style={{ width: 74, height: 74, borderRadius: 18, background: C.ink, color: C.gold, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: 2 }}>STEP</span>
        <span style={{ fontSize: 40, fontWeight: 800 }}>{n}</span>
      </div>
      <span style={{ fontSize: 40, fontWeight: 800, whiteSpace: "nowrap" }}>{children}</span>
    </Card>
  </Pop>
);

const Col: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>{children}</div>
);

const Row: React.FC<{ items: [string, number][]; size?: number }> = ({ items, size = 32 }) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
    {items.map(([x, at], i) => (
      <Chip key={x} delay={f(at)} rotate={i % 2 ? 2 : -2} size={size}>
        {x}
      </Chip>
    ))}
  </div>
);

const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 1.2) return null;
  if (t < 4.4)
    return (
      <Pop delay={f(1.28)} rotate={-1.5}>
        <span style={{ position: "relative", display: "inline-block", fontSize: 40, fontWeight: 800, padding: "10px 24px", borderRadius: 16, background: C.card, ...OVER_VIDEO }}>
          🍚 stop makan nasi?
          <Strike delay={f(3.5)} width={6} />
        </span>
      </Pop>
    );
  if (t < 9.98)
    return (
      <Col>
        <Chip delay={f(4.96)} rotate={1.5} size={34}>
          ramai boleh start…
        </Chip>
        <Dark at={6.48} size={36}>
          tapi <span style={{ color: C.gold }}>STEP 4</span> yang buat awak terus jalan
        </Dark>
      </Col>
    );
  if (t < 19.58)
    return (
      <Col>
        <Step n={1} at={9.98}>
          FAHAM KALORI
        </Step>
        <Row items={[["jangan main cut semua", 14.06], ["pilihan lebih baik", 17.6]]} />
      </Col>
    );
  if (t < 27.5)
    return (
      <Col>
        <Step n={2} at={19.58}>
          PROTEIN + FIBRE
        </Step>
        <Chip delay={f(23.98)} rotate={2} size={34}>
          🍚 masih boleh makan nasi
        </Chip>
      </Col>
    );
  if (t < 37.2)
    return (
      <Col>
        <Step n={3} at={27.6}>
          HABIT IKUT LIFESTYLE
        </Step>
        <Row items={[["kerja busy", 31.18], ["family dinner", 31.92], ["makan luar", 32.68]]} />
      </Col>
    );
  if (t < 47.38)
    return (
      <Col>
        <Step n={4} at={37.2}>
          BACKUP PLAN
        </Step>
        {t < 44.44 ? (
          <Row items={[["Raya datang", 40.38], ["rutin lari", 41.42]]} />
        ) : (
          <Chip delay={f(44.72)} rotate={2} size={34}>
            sambung, bukan mula dari zero
          </Chip>
        )}
      </Col>
    );
  if (t < 54.32)
    return t < 51.94 ? (
      <Chip delay={f(47.38)} rotate={-1.5} size={34}>
        lose fat + masih enjoy makanan
      </Chip>
    ) : (
      <Dark at={51.94}>
        CONSISTENCY <span style={{ color: C.gold }}>&gt;</span> MOTIVATION
      </Dark>
    );
  return (
    <div style={{ transform: "scale(0.85)" }}>
      <CtaPill icon="save" delay={f(54.32)}>
        Save video ni
      </CtaPill>
    </div>
  );
};

const Hook = (
  <>
    LOSE FAT = <span style={{ color: C.marker }}>KENA STOP MAKAN NASI?</span>
  </>
);

const End: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} muted startFrom={CLIP_LEN - 4} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "rgba(23,60,48,0.45)" }} />
    <div style={{ position: "absolute", top: 820, left: CENTER.left, right: CENTER.right, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {([[1, "FAHAM KALORI"], [2, "PROTEIN + FIBRE"], [3, "HABIT IKUT LIFESTYLE"], [4, "BACKUP PLAN"]] as [number, string][]).map(([n, l], i) => (
        <Pop key={n} delay={i * 4} rotate={i % 2 ? 1 : -1}>
          <Card style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 22px 8px 10px", ...OVER_VIDEO }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: C.ink, color: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800 }}>{n}</div>
            <span style={{ fontSize: 36, fontWeight: 800, whiteSpace: "nowrap" }}>{l}</span>
          </Card>
        </Pop>
      ))}
      <div style={{ transform: "scale(0.85)", marginTop: 10 }}>
        <CtaPill icon="save" delay={20}>
          Save untuk bila rutin lari
        </CtaPill>
      </div>
    </div>
  </AbsoluteFill>
);

export const R1710B_NASI_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <FaceCamOpener clip={CLIP} hook={Hook} hookSize={52} />
        <div style={{ position: "absolute", top: 1335, left: CENTER.left, right: CENTER.right, display: "flex", justifyContent: "center" }}>
          <Lower />
        </div>
        <Captions words={WORDS} top={1100} size={58} left={CENTER.left} right={CENTER.right} />
      </>
    ),
    cues: [
      [f(1.28), "pop", 0.3],
      [f(3.5), "scribble", 0.3],
      [f(9.98), "pop", 0.35],
      [f(19.58), "pop", 0.35],
      [f(27.6), "pop", 0.35],
      [f(37.2), "pop", 0.35],
      [f(51.94), "pop", 0.3],
      [f(54.32), "pop", 0.3],
    ],
  },
  { id: "end", dur: END, el: <End />, cues: [[2, "pop", 0.3], [20, "chime", 0.3]] },
];
