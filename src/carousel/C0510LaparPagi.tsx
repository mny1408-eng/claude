// PM Carousel 05/10/2026 — "Kenapa 10 Pagi Dah Lapar?"
// Source: Notion 📅 05/10/2026 — Breakfast Structure → PM CAROUSEL, QA reviewed.
// Notion production note: "7-slide educational carousel, one idea/slide, simple breakfast visual cues; Canva/Claude must not add claims."
// CTA: Save checklist + Scorecard dekat bio.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Bowl, Cup } from "../food";
import { B, BigNum, Body, Clock, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, StepStrip, T } from "./template";

const TOTAL = 7;
const KEYS = ["Protein", "Fibre", "Portion"];

const Check: React.FC<{ i: number; children: React.ReactNode }> = ({ i, children }) => (
  <Slide index={i + 2} total={TOTAL}>
    <BigNum>{i + 1}</BigNum>
    <Pad top={230}>
      <Kicker>Check #{i + 1}</Kicker>
      <Headline size={116}>{children}</Headline>
      <Rule style={{ margin: "48px 0 0" }} />
    </Pad>
    <div style={{ position: "absolute", top: 820, right: 104, display: "flex", alignItems: "flex-end", gap: 34 }}>
      <Bowl width={220} />
      <Cup width={100} />
    </div>
    <Pad top={1090}>
      <StepStrip items={KEYS} done={i} active={i} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <div style={{ position: "absolute", top: 170, right: 80 }}>
      <Clock hour={10} />
    </div>
    <Pad top={230}>
      <Kicker>Breakfast structure</Kicker>
      <Headline size={124}>
        Kenapa
        <br />
        10 pagi
        <br />
        <Sage>dah lapar?</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 40px" }} />
      <Body size={46}>
        Breakfast dah makan… tapi <B>10 pagi cari snack lagi?</B>
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 1040, left: 104, display: "flex", alignItems: "flex-end", gap: 40 }}>
      <Bowl width={240} />
      <Cup width={110} />
    </div>
  </Slide>
);

const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={320}>
      <Headline size={140}>
        Jangan terus
        <br />
        salahkan
        <br />
        <Sage>willpower.</Sage>
      </Headline>
      <Rule style={{ margin: "52px 0 0" }} />
    </Pad>
    <Pad top={1090}>
      <StepStrip items={KEYS} done={0} />
    </Pad>
  </Slide>
);

const S3: React.FC = () => (
  <Check i={0}>
    Ada sumber <Sage>protein</Sage> yang jelas?
  </Check>
);
const S4: React.FC = () => (
  <Check i={1}>
    Ada <Sage>fibre/
      <br />
      whole-food</Sage> option yang sesuai?
  </Check>
);
const S5: React.FC = () => (
  <Check i={2}>
    <Sage>Portion</Sage> cukup untuk keperluan dan rutin awak?
  </Check>
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={230}>
      <Headline size={124}>
        Tak perlu
        <br />
        breakfast
        <br />
        <Sage>‘perfect’.</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 40px" }} />
      <Body size={48}>
        Uji <B>satu struktur yang practical</B> selama beberapa hari.
      </Body>
    </Pad>
    <Pad top={1090}>
      <StepStrip items={KEYS} done={3} />
    </Pad>
  </Slide>
);

const ROWS = ["Ada sumber protein yang jelas?", "Ada fibre/whole-food option yang sesuai?", "Portion cukup untuk keperluan dan rutin awak?"];

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN CHECKLIST NI">
    <Pad top={180}>
      <Headline size={120}>
        Save <Sage>checklist ni.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 350, left: 84, right: 84, background: "#fff", border: `3px solid ${T.rule}`, borderRadius: 24, padding: "30px 40px 36px" }}>
      {ROWS.map((r, i) => (
        <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 22, marginTop: i ? 26 : 0 }}>
          <div style={{ width: 38, height: 38, flex: "none", borderRadius: 8, border: `3px solid ${T.sage}`, marginTop: 6 }} />
          <div style={{ fontSize: 36, lineHeight: 1.3 }}>
            <B sage>Check #{i + 1}:</B> {r}
          </div>
        </div>
      ))}
    </div>
    <Pad top={830} style={{ left: 84, right: 84 }}>
      <CtaBox>
        Kalau masalah sebenar awak ialah execution bila busy, <strong style={{ color: T.gold }}>Progress Scorecard</strong> ada dekat bio.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C0510_SLIDES = SLIDES.length;
export const C0510LaparPagi: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
