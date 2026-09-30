// PM Carousel 01/10/2026 — "4 Soalan Sebelum Ikut Satu Diet Rule"
// Source: Notion 📅 01/10/2026 — Clinical Pharmacist Lens → PM CAROUSEL (7 slides), QA reviewed 27/09.
// Notion production note: "7-slide Premium Clinical; question-led design; minimal copy emphasis."
// Layout varies per slide (Design Brain §11); a small Rx semakan strip tracks progress across #1–#4.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, Callout, CheckIcon, Headline, Portrait, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;
const KEYS = ["Evidence", "Sesuai", "Sustain", "Gantikan"];

// Rx semakan strip: which of the 4 checks are done.
const RxStrip: React.FC<{ done: number; active?: number }> = ({ done, active }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18, background: "#fff", border: "2px solid #E6E5E0", borderRadius: 16, padding: "18px 24px" }}>
    <div style={{ fontFamily: "serif", fontStyle: "italic", fontWeight: 700, fontSize: 44, color: T.ring, lineHeight: 1, marginRight: 6 }}>
      R<span style={{ fontSize: 28 }}>x</span>
    </div>
    {KEYS.map((k, i) => {
      const ticked = i < done;
      return (
        <div
          key={k}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 10,
            background: i === active ? T.sageSoft : "transparent",
          }}
        >
          <div style={{ width: 34, height: 34, borderRadius: 7, border: `3px solid ${ticked || i === active ? T.sage : T.dot}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {ticked && (
              <svg viewBox="0 0 20 20" width={24} height={24}>
                <path d="M4 10.5 L8.5 15 L16 5.5" fill="none" stroke={T.sage} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div style={{ fontSize: 25, fontWeight: 600, color: ticked || i === active ? T.text : "#9A9A9A" }}>{k}</div>
        </div>
      );
    })}
  </div>
);

const Pad: React.FC<{ top: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ top, children, style }) => (
  <div style={{ position: "absolute", top, left: 104, right: 104, ...style }}>{children}</div>
);

// Big faint number for the question slides.
const Num: React.FC<{ n: number }> = ({ n }) => (
  <div style={{ position: "absolute", top: 150, right: 70, fontFamily: "inherit", fontSize: 360, fontWeight: 700, color: T.sageSoft, lineHeight: 1 }}>
    #{n}
  </div>
);

// 1 — Big Hook + portrait
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <div style={{ position: "absolute", top: 170, right: 90 }}>
      <Portrait size={200} />
    </div>
    <Pad top={250}>
      <div style={{ fontSize: 28, fontWeight: 700, color: T.sage, letterSpacing: 4, marginBottom: 26 }}>CLINICAL PHARMACIST LENS</div>
      <Headline size={128}>
        4 soalan
        <br />
        sebelum ikut
        <br />
        satu <Sage>diet rule</Sage>
      </Headline>
      <Rule style={{ margin: "52px 0 44px" }} />
      <Body size={46}>
        Nampak satu diet rule online?
        <br />
        <B>Jangan terus ikut.</B>
      </Body>
    </Pad>
    <Pad top={1050}>
      <RxStrip done={0} />
    </Pad>
  </Slide>
);

// 2–5 — Question → answer, each with its own supporting visual
const Question: React.FC<{ n: number; q: React.ReactNode; children: React.ReactNode }> = ({ n, q, children }) => (
  <Slide index={n} total={TOTAL}>
    <Num n={n} />
    <Pad top={200}>
      <div style={{ fontSize: 28, fontWeight: 700, color: T.sage, letterSpacing: 4, marginBottom: 22 }}>SOALAN #{n}</div>
      <Headline size={104}>{q}</Headline>
      <Rule style={{ margin: "44px 0 40px" }} />
      {children}
    </Pad>
    <Pad top={1070}>
      <RxStrip done={n} active={n - 1} />
    </Pad>
  </Slide>
);

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: "18px 30px", borderRadius: 999, background: "#fff", border: `2px solid ${T.rule}`, fontSize: 34, fontWeight: 600 }}>{children}</div>
);

const S2: React.FC = () => (
  <Question n={1} q={<>Apa <Sage>evidence</Sage> sebenar di belakang rule ni?</>}>
    <Body size={44}>
      Testimonial <B sage>bukan sama</B> dengan bukti.
    </Body>
  </Question>
);

const S3: React.FC = () => (
  <Question n={2} q={<>Sesuai tak dengan <Sage>keadaan</Sage> dan <Sage>goal</Sage> aku?</>}>
    <Body size={44}>
      <B>Context individu</B> matters.
    </Body>
  </Question>
);

const S4: React.FC = () => (
  <Question n={3} q={<>Boleh <Sage>sustain</Sage> dalam real life?</>}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
      {["Shift", "Family", "Budget", "Makan luar"].map((c) => (
        <Chip key={c}>{c}</Chip>
      ))}
    </div>
    <Body size={40} style={{ marginTop: 30 }}>
      …<B>tetap wujud.</B>
    </Body>
  </Question>
);

const Box: React.FC<{ label: string; children: React.ReactNode; dashed?: boolean }> = ({ label, children, dashed }) => (
  <div style={{ flex: 1, background: "#fff", border: `3px ${dashed ? "dashed" : "solid"} ${dashed ? T.sage : "#E6E5E0"}`, borderRadius: 18, padding: "26px 28px" }}>
    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3, color: T.sage, marginBottom: 10 }}>{label}</div>
    <div style={{ fontSize: 36, fontWeight: 600 }}>{children}</div>
  </div>
);

const S5: React.FC = () => (
  <Question n={4} q={<>Apa yang rule ni <Sage>gantikan?</Sage></>}>
    <Body size={44}>
      Bila <B>buang</B> sesuatu, apa <B sage>masuk tempatnya?</B>
    </Body>
    <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 50 }}>
      <Box label="BUANG">sesuatu</Box>
      <svg viewBox="0 0 40 20" width={56} height={28}>
        <path d="M 2 10 H 36 M 28 3 L 36 10 L 28 17" fill="none" stroke={T.sage} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Box label="MASUK" dashed>
        ?
      </Box>
    </div>
  </Question>
);

// 6 — Myth → reality comparison
const Row: React.FC<{ tag: string; children: React.ReactNode }> = ({ tag, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 34, background: "#fff", border: "2px solid #E6E5E0", borderRadius: 20, padding: "38px 40px" }}>
    <div style={{ fontFamily: "inherit", width: 210, flex: "none" }}>
      <Headline size={76}>
        <Sage>{tag}</Sage>
      </Headline>
    </div>
    <div style={{ fontSize: 42, lineHeight: 1.3 }}>{children}</div>
  </div>
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={200}>
      <Headline size={104}>
        Rule yang
        <br />
        <Sage>simple</Sage> vs <Sage>strict</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 50px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <Row tag="Simple">
          Rule yang simple <B>belum tentu salah.</B>
        </Row>
        <Row tag="Strict">
          Rule yang strict <B>belum tentu lebih bagus.</B>
        </Row>
      </div>
      <Callout style={{ marginTop: 60 }} icon={<CheckIcon />}>
        Jangan confuse <B sage>“strict”</B> dengan <B sage>“better”</B>.
      </Callout>
    </Pad>
  </Slide>
);

// 7 — Recap + CTA
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last>
    <Pad top={200}>
      <Headline size={112}>
        Cari structure yang
        <br />
        <Sage>evidence-informed</Sage>
        <br />
        dan <Sage>practical</Sage>
        <br />
        untuk hidup awak.
      </Headline>
    </Pad>
    <Pad top={800}>
      <RxStrip done={4} />
    </Pad>
    <div style={{ position: "absolute", top: 960, left: 104, right: 104, display: "flex", alignItems: "center", gap: 30 }}>
      <Portrait size={140} />
      <Body size={34}>
        <B>Coach Nas</B>
        <br />
        <span style={{ color: T.textSoft }}>Clinical Pharmacist · Wellness Coach</span>
      </Body>
    </div>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];

export const C01_DIET_RULE_SLIDES = SLIDES.length;

export const C01DietRule: React.FC = () => {
  const f = useCurrentFrame();
  const S = SLIDES[Math.min(SLIDES.length - 1, f)];
  return <S />;
};
