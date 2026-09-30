// PM Carousel 04/10/2026 — "10-Minute Weekly Review Untuk Routine"
// Source: Notion 📅 04/10/2026 — Reset + Reflection → PM CAROUSEL, QA reviewed 27/09.
// Notion production note: "7-slide checklist carousel; Premium Clinical; final slide designed as screenshot/save card."
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, BigNum, Body, Chips, Headline, Kicker, Pad, Rule, Sage, Slide, StepStrip, T, WriteLine } from "./template";

const TOTAL = 7;
const KEYS = ["Win", "Friction", "Meals", "Environment", "Recovery"];

const Item: React.FC<{ i: number; q: React.ReactNode; children?: React.ReactNode }> = ({ i, q, children }) => (
  <Slide index={i + 1} total={TOTAL}>
    <BigNum>{i + 1}</BigNum>
    <Pad top={200}>
      <Kicker>Check {i + 1} / 5</Kicker>
      <Headline size={128}>
        <Sage>{KEYS[i]}</Sage>
      </Headline>
      <Rule style={{ margin: "40px 0 36px" }} />
      <Body size={48}>{q}</Body>
      {children}
      <WriteLine label="Jawapan saya:" />
    </Pad>
    <Pad top={1090}>
      <StepStrip items={KEYS} done={i + 1} active={i} />
    </Pad>
  </Slide>
);

const Timer: React.FC = () => (
  <div style={{ position: "relative", width: 230, height: 230 }}>
    <svg viewBox="0 0 100 100" width={230} height={230}>
      <circle cx="50" cy="50" r="44" fill="none" stroke={T.sageSoft} strokeWidth="8" />
      <circle cx="50" cy="50" r="44" fill="none" stroke={T.sage} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 44 * 0.17} 999`} transform="rotate(-90 50 50)" />
    </svg>
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1 }}>10</div>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: T.sage }}>MINIT</div>
    </div>
  </div>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <div style={{ position: "absolute", top: 170, right: 80 }}>
      <Timer />
    </div>
    <Pad top={230}>
      <Kicker>Reset + reflection</Kicker>
      <Headline size={118}>
        10-minute
        <br />
        <Sage>weekly review</Sage>
        <br />
        untuk routine
      </Headline>
      <Rule style={{ margin: "48px 0 40px" }} />
      <Body size={46}>
        10 minit. <B>Bukan untuk judge diri</B> — untuk belajar.
      </Body>
    </Pad>
    <Pad top={1090}>
      <StepStrip items={KEYS} done={0} />
    </Pad>
  </Slide>
);

const S2: React.FC = () => <Item i={0} q={<>Apa <B>satu benda</B> yang menjadi minggu ni?</>} />;
const S3: React.FC = () => (
  <Item i={1} q={<>Bila routine <B>paling susah?</B></>}>
    <Chips items={["Pagi", "Shift", "Malam", "Weekend"]} style={{ marginTop: 30 }} />
  </Item>
);
const S4: React.FC = () => <Item i={2} q={<>Meal mana paling kerap jadi <B>reactive?</B></>} />;
const S5: React.FC = () => <Item i={3} q={<>Apa dalam rumah/kerja yang <B>membantu</B> atau <B>menyusahkan?</B></>} />;
const S6: React.FC = () => <Item i={4} q={<>Bila plan lari, <B>cepat tak</B> awak kembali ke routine?</>} />;

// Final slide: screenshot/save card with the whole review in one place.
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN / SCREENSHOT">
    <Pad top={170}>
      <Kicker>Next week</Kicker>
      <Headline size={96}>
        Pilih <Sage>satu</Sage> adjustment kecil.
      </Headline>
      <Body size={36} style={{ marginTop: 18, color: T.textSoft }}>
        Test seminggu. Review lagi.
      </Body>
    </Pad>
    <div
      style={{
        position: "absolute",
        top: 540,
        left: 84,
        right: 84,
        background: "#fff",
        border: `3px solid ${T.rule}`,
        borderRadius: 24,
        padding: "34px 40px",
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: T.sage, marginBottom: 8 }}>WEEKLY REVIEW · 10 MINIT</div>
      {KEYS.map((k) => (
        <div key={k} style={{ display: "flex", alignItems: "flex-end", gap: 16, marginTop: 20 }}>
          <div style={{ width: 34, height: 34, flex: "none", borderRadius: 7, border: `3px solid ${T.sage}` }} />
          <div style={{ fontSize: 32, fontWeight: 700, width: 210 }}>{k}</div>
          <div style={{ flex: 1, borderBottom: `3px dashed ${T.rule}`, height: 30 }} />
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginTop: 30, background: T.sageSoft, borderRadius: 14, padding: "18px 18px 22px" }}>
        <div style={{ fontSize: 30, fontWeight: 700, whiteSpace: "nowrap" }}>1 adjustment:</div>
        <div style={{ flex: 1, borderBottom: `3px dashed ${T.sage}`, height: 30 }} />
      </div>
    </div>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C04_SLIDES = SLIDES.length;
export const C04WeeklyReview: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
