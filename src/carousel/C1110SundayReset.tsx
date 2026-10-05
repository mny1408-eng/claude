// PM Carousel 11/10/2026 — "Sunday Reset Tanpa 'Start Over'"
// Source: Notion 📅 11/10/2026 — Weekly Review → PM CAROUSEL, QA reviewed.
// Notion production note: "reflective premium design, no motivational clichés."
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, Headline, Kicker, Pad, Rule, Sage, Slide, StepStrip, T } from "./template";

const TOTAL = 7;
const FLOW = ["Review", "Adjust", "Sambung"];

const Ask: React.FC<{ i: number; children: React.ReactNode }> = ({ i, children }) => (
  <Slide index={i} total={TOTAL}>
    <Pad top={280}>
      <Kicker>Review</Kicker>
      <div style={{ borderLeft: `10px solid ${T.sage}`, paddingLeft: 40, marginTop: 20 }}>
        <Headline size={124}>{children}</Headline>
      </div>
    </Pad>
    <Pad top={1090}>
      <StepStrip items={FLOW} done={0} active={0} flow />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={210}>
      <Kicker>Weekly review</Kicker>
      <Headline size={132}>
        Sunday reset
        <br />
        tanpa
        <br />
        <Sage>“start over”</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 44px" }} />
      <Body size={52}>
        Minggu baru <B>tak perlukan diri baru.</B>
      </Body>
    </Pad>
    <Pad top={1090}>
      <StepStrip items={FLOW} done={0} flow />
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Ask i={1}>
    Apa <Sage>1 benda</Sage> yang menjadi minggu ni?
  </Ask>
);
const S3: React.FC = () => (
  <Ask i={2}>
    Apa <Sage>1 barrier</Sage> yang paling kerap muncul?
  </Ask>
);
const S4: React.FC = () => (
  <Ask i={3}>
    Apa yang <Sage>terlalu complicated?</Sage>
  </Ask>
);
const S5: React.FC = () => (
  <Ask i={4}>
    Apa <Sage>fallback</Sage> yang patut disediakan?
  </Ask>
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={230}>
      <Kicker>Adjust</Kicker>
      <Headline size={116}>
        Pilih <Sage>1
        <br />
        adjustment</Sage> untuk
        <br />
        diuji 7 hari.
      </Headline>
    </Pad>
    <Pad top={770} style={{ display: "flex", gap: 14 }}>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ flex: 1, height: 112, borderRadius: 16, background: "#fff", border: `3px solid ${T.rule}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700, color: T.sage }}>
          {i + 1}
        </div>
      ))}
    </Pad>
    <Pad top={1090}>
      <StepStrip items={FLOW} done={1} active={1} flow />
    </Pad>
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Pad top={250}>
      <Headline size={120} style={{ color: "#9A9A9A" }}>
        Bukan restart.
      </Headline>
      <Rule style={{ margin: "48px 0 48px" }} />
      <Headline size={164}>
        Review,
        <br />
        adjust,
        <br />
        <Sage>sambung.</Sage>
      </Headline>
    </Pad>
    <Pad top={1090}>
      <StepStrip items={FLOW} done={3} flow />
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1110_SLIDES = SLIDES.length;
export const C1110SundayReset: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
