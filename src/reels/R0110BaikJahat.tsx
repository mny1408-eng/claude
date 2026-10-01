// Reel 1 — "Baik vs Jahat" (01/10/2026)
// Source: Notion 📅 01/10/2026 — Clinical Pharmacist Lens, 🎥 REEL 1 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: Mitos vs Fakta mechanic (label struck out → what to look at instead). The script never calls this a
// "mitos", so the stamps use its own words (“baik” / “jahat”) and no MITOS/FAKTA label is added. Food is not moralised.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={420} gap={8}>
      <Line size={64} weight={700}>SAYA TAK SUKA</Line>
      <Line delay={8} size={76} weight={800}>LABEL MAKANAN</Line>
    </Stack>
    <Stack top={690} gap={26}>
      <BoxStamp delay={26} rotate={-5} size={130}>“BAIK”</BoxStamp>
      <Line delay={40} size={56} weight={700} color={C.inkSoft}>ATAU</Line>
      <BoxStamp delay={50} rotate={4} size={130}>“JAHAT”.</BoxStamp>
    </Stack>
  </AbsoluteFill>
);

const Label: React.FC<{ children: React.ReactNode; delay: number; strikeAt: number; rotate: number }> = ({ children, delay, strikeAt, rotate }) => (
  <Pop delay={delay} rotate={rotate}>
    <Card style={{ padding: "32px 50px" }}>
      <span style={{ position: "relative", display: "inline-block", fontSize: 72, fontWeight: 800, whiteSpace: "nowrap" }}>
        {children}
        <Strike delay={strikeAt} width={5} />
      </span>
    </Card>
  </Pop>
);

const STRIKE_A = 150;
const STRIKE_B = 162;

const Labels: React.FC = () => (
  <AbsoluteFill>
    <Stack top={270} gap={8}>
      <Line size={50} weight={600} color={C.inkSoft}>
        Sebagai clinical pharmacist
        <br />
        dan coach,
      </Line>
      <Line delay={12} size={66} weight={800}>
        saya berhati-hati
        <br />
        bila orang cakap
      </Line>
    </Stack>
    <Stack top={690} gap={44}>
      <Label delay={40} strikeAt={STRIKE_A} rotate={-2}>makanan ni ‘baik’,</Label>
      <Label delay={56} strikeAt={STRIKE_B} rotate={1.5}>makanan tu ‘jahat’.</Label>
    </Stack>
    <Stack top={1150} gap={8}>
      <Line delay={116} size={58} weight={700}>
        Sebab nutrition
        <br />
        jarang sesimple
      </Line>
      <Line delay={124} size={88} weight={800}>
        <Highlight delay={134}>satu label.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const LOOK = ["amount", "frequency", "keseluruhan diet", "tujuan individu", "konteks kesihatan"];
const LOOK_AT = (i: number) => 70 + i * 22;
const OVERLAYS = ["Context", "Amount", "Frequency", "Overall pattern"];

const Tengok: React.FC = () => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={84} weight={800}>
        Kita kena <Highlight delay={12}>tengok</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 450, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
      {OVERLAYS.map((o, i) => (
        <Tag key={o} delay={26 + i * 8}>{o}</Tag>
      ))}
    </div>
    <div style={{ position: "absolute", top: 660, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={60}>
        <Card style={{ width: 920, padding: "40px 50px", display: "flex", flexDirection: "column", gap: 24 }}>
          {LOOK.map((a, i) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 26 }}>
              <div style={{ width: 64, height: 64, flexShrink: 0, border: `4px solid ${C.ink}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mark kind="check" delay={LOOK_AT(i)} size={48} />
              </div>
              <div style={{ fontSize: 54, fontWeight: 800, whiteSpace: "nowrap" }}>{a}</div>
            </div>
          ))}
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

const Auto: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 400, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={4} rotate={-1.5}>
        <Card style={{ width: 920, padding: "46px 50px", textAlign: "center" }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.22 }}>
            Buang satu makanan <Highlight delay={22}>tak automatik</Highlight> jadikan diet bagus.
          </div>
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 850, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={80} rotate={1.5}>
        <Card style={{ width: 920, padding: "46px 50px", textAlign: "center" }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.22 }}>
            Dan makan satu makanan tertentu pun <Highlight delay={100}>tak automatik</Highlight> jadikan diet gagal.
          </div>
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

const ASK = ["apa peranan makanan ni\ndalam pattern aku,", "berapa kerap,", "berapa banyak,", "dan adakah structure\nkeseluruhan membantu goal aku?"];
const ASK_AT = (i: number) => 34 + i * 34;

const Tanya: React.FC = () => (
  <AbsoluteFill>
    <Stack top={300} gap={8}>
      <Line size={54} weight={600} color={C.inkSoft}>Lebih berguna</Line>
      <Line delay={8} size={80} weight={800}>
        kalau kita <Highlight delay={18}>tanya:</Highlight>
      </Line>
    </Stack>
    <Stack top={620} gap={30}>
      {ASK.map((q, i) => (
        <Pop key={q} delay={ASK_AT(i)} rotate={i % 2 ? 1 : -1}>
          <Card style={{ width: 920, padding: "30px 44px", textAlign: "center", fontSize: 46, fontWeight: 800, lineHeight: 1.2, whiteSpace: "pre-line" }}>{q}</Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

const CTA: React.FC = () => (
  <AbsoluteFill>
    <Stack top={520} gap={10}>
      <Line size={56} weight={600} color={C.inkSoft}>Context · Amount · Frequency</Line>
      <Line delay={10} size={84} weight={800}>
        <Highlight delay={20}>Overall pattern</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 960, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="save" delay={44}>Follow/save.</CtaPill>
    </div>
  </AbsoluteFill>
);

export const R0110_SCENES: SceneDef[] = [
  { id: "hook", dur: 115, el: <Hook />, cues: [[0, "whoosh", 0.4], [26, "stamp", 0.85], [50, "stamp", 0.85]] },
  { id: "labels", dur: 225, el: <Labels />, cues: [[40, "pop", 0.45], [56, "pop", 0.45], [134, "swipe", 0.5], [STRIKE_A, "scribble", 0.55], [STRIKE_B, "scribble", 0.55]] },
  { id: "tengok", dur: 225, el: <Tengok />, cues: [[12, "swipe", 0.45], ...OVERLAYS.map((_, i): Cue => [26 + i * 8, "pop", 0.4]), ...LOOK.map((_, i): Cue => [LOOK_AT(i), "tick", 0.55])] },
  { id: "auto", dur: 195, el: <Auto />, cues: [[4, "pop", 0.45], [22, "swipe", 0.45], [80, "pop", 0.45], [100, "swipe", 0.45]] },
  { id: "tanya", dur: 215, el: <Tanya />, cues: [[18, "swipe", 0.45], ...ASK.map((_, i): Cue => [ASK_AT(i), "pop", 0.45])] },
  { id: "cta", dur: 120, el: <CTA />, cues: [[20, "swipe", 0.45], [44, "pop", 0.5], [48, "chime", 0.45]] },
];
