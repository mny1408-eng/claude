// PM Carousel 07/10/2026 — "Makan Mamak: 5 Keputusan Yang Lebih Berguna"
// Source: Notion 📅 07/10/2026 — Mamak Decisions → PM CAROUSEL, QA reviewed.
// Notion production note: "food photography/illustration cues only; no fake plate quantities."
// CTA: Save.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Bowl, Cup, Drumstick, Plate, Rice, Tray } from "../food";
import { B, BigNum, Body, Chip, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, StepStrip, T } from "./template";

const TOTAL = 7;
const STEPS = ["Minuman", "Protein", "Portion", "Lauk/kuah", "Rutin"];

const Step: React.FC<{ i: number; title: React.ReactNode; line?: React.ReactNode; children?: React.ReactNode }> = ({ i, title, line, children }) => (
  <Slide index={i + 1} total={TOTAL}>
    <BigNum>{i + 1}</BigNum>
    <Pad top={200}>
      <Kicker>Keputusan {i + 1} / 5</Kicker>
      <Headline size={116}>{title}</Headline>
      <Rule style={{ margin: "40px 0 34px" }} />
      {line && <Body size={46}>{line}</Body>}
    </Pad>
    {children && <div style={{ position: "absolute", top: 780, left: 104, right: 104, height: 280, display: "flex", alignItems: "center", justifyContent: "center", gap: 50 }}>{children}</div>}
    <Pad top={1090}>
      <StepStrip items={STEPS} done={i} active={i} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Makan luar</Kicker>
      <Headline size={112}>
        Makan mamak:
        <br />
        <Sage>5 keputusan</Sage>
        <br />
        yang lebih
        <br />
        berguna
      </Headline>
      <Rule style={{ margin: "40px 0 36px" }} />
      <Body size={46}>
        Tak perlu cari menu <B>‘diet’.</B>
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 960, left: 104, right: 104, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
      <Cup width={150} />
      <Plate size={270}>
        <div style={{ position: "absolute", left: 28, top: 44, transform: "rotate(-14deg)" }}>
          <Drumstick width={140} />
        </div>
        <div style={{ position: "absolute", left: 96, top: 138 }}>
          <Rice width={140} amount={0.9} />
        </div>
      </Plate>
      <Bowl width={230} />
    </div>
  </Slide>
);

const S2: React.FC = () => (
  <Step i={0} title={<>Decide <Sage>minuman</Sage> dulu.</>}>
    <Cup width={190} />
  </Step>
);

const S3: React.FC = () => (
  <Step i={1} title={<>Cari sumber <Sage>protein</Sage> yang jelas.</>}>
    <Drumstick width={400} />
  </Step>
);

const S4: React.FC = () => (
  <Step i={2} title={<>Pilih <Sage>portion</Sage> yang sesuai,</>} line={<>bukan automatik <B>‘zero carb’.</B></>}>
    <Plate size={270}>
      <div style={{ position: "absolute", left: 45, top: 78 }}>
        <Rice width={180} amount={0.9} />
      </div>
    </Plate>
  </Step>
);

const S5: React.FC = () => (
  <Step i={3} title={<>Enjoy <Sage>lauk/kuah</Sage></>} line={<>dalam konteks <B>keseluruhan meal.</B></>}>
    <Tray kind="kari" width={330} />
    <Bowl width={250} />
  </Step>
);

const S6: React.FC = () => (
  <Step i={4} title={<>Lepas makan, <Sage>sambung rutin.</Sage></>} line={<B>Tak perlu compensate.</B>}>
    <Chip on>sambung rutin</Chip>
    <Chip muted>compensate</Chip>
  </Step>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Pad top={200}>
      <Headline size={130}>
        Save untuk
        <br />
        <Sage>next mamak.</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 0" }} />
    </Pad>
    <Pad top={700}>
      <StepStrip items={STEPS} done={5} />
    </Pad>
    <Pad top={880}>
      <CtaBox>
        Consistency dibina daripada <strong style={{ color: T.gold }}>keputusan yang boleh diulang.</strong>
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C0710_SLIDES = SLIDES.length;
export const C0710Mamak: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
