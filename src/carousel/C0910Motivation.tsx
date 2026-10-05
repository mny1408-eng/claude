// PM Carousel 09/10/2026 — "5 Tanda Plan Awak Terlalu Bergantung Pada Motivation"
// Source: Notion 📅 09/10/2026 — Restart Cycle → PM CAROUSEL, QA reviewed.
// Notion production note: "clean diagnostic-style visual but explicitly label 'self-check', not medical diagnosis."
// "Ini bukan diagnosis." is taken from the approved caption. CTA: Scorecard dekat bio.
import React from "react";
import { useCurrentFrame } from "remotion";
import { ArrowDown, BigNum, CtaBox, HEAD, Headline, Kicker, NumDots, Pad, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Note: React.FC = () => (
  <div style={{ display: "inline-block", fontSize: 26, fontWeight: 600, color: T.textSoft, background: T.footer, borderRadius: 999, padding: "12px 26px" }}>Self-check · Ini bukan diagnosis.</div>
);

// Cause → effect, stacked.
const Flow: React.FC<{ from: string; to: string; size?: number }> = ({ from, to, size = 96 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: size, lineHeight: 1, textTransform: "uppercase", background: "#fff", border: `3px solid ${T.rule}`, borderRadius: 20, padding: "22px 34px" }}>{from}</div>
    <div style={{ marginLeft: 40 }}>
      <ArrowDown size={size * 0.8} />
    </div>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: size, lineHeight: 1, textTransform: "uppercase", background: T.sageSoft, border: `3px solid ${T.sage}`, borderRadius: 20, padding: "22px 34px", color: T.ring }}>{to}</div>
  </div>
);

const Sign: React.FC<{ i: number; children: React.ReactNode }> = ({ i, children }) => (
  <Slide index={i} total={TOTAL}>
    <BigNum>{i + 1}</BigNum>
    <Pad top={230}>
      <Kicker>Self-check · Tanda {i + 1} / 5</Kicker>
      {children}
    </Pad>
    <Pad top={1150}>
      <NumDots total={5} active={i} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Self-check</Kicker>
      <Headline size={92}>
        5 tanda plan awak terlalu bergantung pada <Sage>motivation</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 650, left: 84, right: 84, background: T.page, border: `3px solid #E6E5E0`, borderRadius: 24, padding: "30px 36px 36px" }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: T.sage, marginBottom: 22 }}>TANDA 1 / 5</div>
      <Flow from="Busy sikit" to="plan terus hilang." size={78} />
    </div>
    <Pad top={1180}>
      <Note />
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Sign i={1}>
    <div style={{ marginTop: 90 }}>
      <Flow from="Satu meal lari" to="tunggu Isnin." size={120} />
    </div>
  </Sign>
);
const S3: React.FC = () => (
  <Sign i={2}>
    <Headline size={136} style={{ marginTop: 50 }}>
      Tak ada <Sage>backup</Sage> bila routine berubah.
    </Headline>
  </Sign>
);
const S4: React.FC = () => (
  <Sign i={3}>
    <Headline size={136} style={{ marginTop: 50 }}>
      Rules <Sage>terlalu banyak</Sage> sampai susah execute.
    </Headline>
  </Sign>
);
const S5: React.FC = () => (
  <Sign i={4}>
    <Headline size={136} style={{ marginTop: 50 }}>
      Progress hanya rasa ‘berjaya’ bila <Sage>perfect.</Sage>
    </Headline>
  </Sign>
);

const FIX = ["simplify", "fallback", "review", "adjust"];

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={200}>
      <Headline size={150}>
        <Sage>Fix:</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 400, left: 104, right: 104, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {FIX.map((f, i) => (
        <React.Fragment key={f}>
          {i > 0 && <ArrowDown size={54} />}
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              fontFamily: HEAD,
              fontWeight: 700,
              fontSize: 84,
              lineHeight: 1,
              textTransform: "uppercase",
              textAlign: "center",
              padding: "24px 0",
              borderRadius: 20,
              background: i === FIX.length - 1 ? T.ring : "#fff",
              color: i === FIX.length - 1 ? T.page : T.text,
              border: `3px solid ${i === FIX.length - 1 ? T.ring : T.rule}`,
            }}
          >
            {f}
          </div>
        </React.Fragment>
      ))}
    </div>
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SCORECARD DEKAT BIO">
    <Pad top={210}>
      <Kicker>Self-check</Kicker>
      <Headline size={116}>
        Kalau awak tak pasti <Sage>gap awak</Sage> dekat mana,
      </Headline>
    </Pad>
    <Pad top={790}>
      <CtaBox>
        <span style={{ fontSize: 50, fontWeight: 700 }}>
          <span style={{ color: T.gold }}>Progress Scorecard</span> ada dekat bio.
        </span>
      </CtaBox>
    </Pad>
    <Pad top={1100}>
      <Note />
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C0910_SLIDES = SLIDES.length;
export const C0910Motivation: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
