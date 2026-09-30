// PM Carousel 02/10/2026 — "Coaching Bukan Sekadar Bagi Meal Plan"
// Source: Notion 📅 02/10/2026 — Personal Story × Coaching → PM CAROUSEL, QA reviewed 27/09.
// Notion production note: "7-slide Premium Clinical; process-flow visual; no outcome guarantee." CTA: DM STRUCTURE.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, BigNum, Body, Chip, Chips, CtaBox, Headline, Kicker, Pad, Portrait, Rule, Sage, Slide, StepStrip, T } from "./template";

const TOTAL = 7;
const FLOW = ["Assess", "Structure", "Practise", "Feedback", "Adjust"];

const Step: React.FC<{ i: number; title: string; line: React.ReactNode; children?: React.ReactNode }> = ({ i, title, line, children }) => (
  <Slide index={i + 1} total={TOTAL}>
    <BigNum>{i + 1}</BigNum>
    <Pad top={200}>
      <Kicker>Langkah {i + 1} / 5</Kicker>
      <Headline size={132}>
        <Sage>{title}</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 40px" }} />
      <Body size={46}>{line}</Body>
      {children}
    </Pad>
    <Pad top={1080}>
      <StepStrip items={FLOW} done={i + 1} active={i} flow />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <div style={{ position: "absolute", top: 170, right: 90 }}>
      <Portrait size={200} />
    </div>
    <Pad top={250}>
      <Kicker>Personal story × coaching</Kicker>
      <Headline size={124}>
        Coaching
        <br />
        bukan sekadar
        <br />
        bagi <Sage>meal plan</Sage>
      </Headline>
      <Rule style={{ margin: "52px 0 44px" }} />
      <Body size={46}>
        Kalau meal plan sahaja cukup,
        <br />
        <B>kenapa ramai masih restart?</B>
      </Body>
    </Pad>
    <Pad top={1080}>
      <StepStrip items={FLOW} done={0} flow />
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Step i={0} title="Assess" line={<>Apa <B>barrier sebenar</B>: knowledge, execution atau system?</>}>
    <Chips items={["Knowledge?", "Execution?", "System?"]} style={{ marginTop: 44 }} />
  </Step>
);

const S3: React.FC = () => <Step i={1} title="Structure" line={<>Bina beberapa <B>keputusan asas</B> yang jelas.</>} />;

const S4: React.FC = () => (
  <Step i={2} title="Practise" line={<>Test masa kerja, makan luar, weekend dan hari busy.</>}>
    <Chips items={["Masa kerja", "Makan luar", "Weekend", "Hari busy"]} style={{ marginTop: 44 }} />
  </Step>
);

const S5: React.FC = () => (
  <Step i={3} title="Feedback" line={<>Tengok apa yang <B>actually berlaku</B>, bukan apa yang “patut” berlaku.</>}>
    <div style={{ display: "flex", gap: 18, marginTop: 44, flexWrap: "wrap" }}>
      <Chip on>✓ Actually berlaku</Chip>
      <Chip muted>“Patut” berlaku</Chip>
    </div>
  </Step>
);

const S6: React.FC = () => (
  <Step i={4} title="Adjust + accountability" line={<>Ubah plan berdasarkan <B>pattern</B> dan teruskan.</>} />
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="DM STRUCTURE">
    <Pad top={200}>
      <Kicker>Goal</Kicker>
      <Headline size={116}>
        Makin pandai urus
        <br />
        <Sage>routine sendiri</Sage>
      </Headline>
      <Body size={44} style={{ marginTop: 30 }}>
        bukan bergantung pada plan perfect.
      </Body>
    </Pad>
    <Pad top={760}>
      <StepStrip items={FLOW} done={5} flow />
    </Pad>
    <Pad top={920}>
      <CtaBox>
        DM <strong style={{ color: T.gold }}>STRUCTURE</strong> kalau nak tahu flow coaching.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C02_SLIDES = SLIDES.length;
export const C02Coaching: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
