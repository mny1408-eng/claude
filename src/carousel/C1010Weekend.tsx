// PM Carousel 10/10/2026 — "Weekend Tanpa All-or-Nothing"
// Source: Notion 📅 10/10/2026 — Weekend Flexibility → PM CAROUSEL, QA reviewed.
// Notion production note: "lifestyle weekend visuals, not before/after body imagery."
import React from "react";
import { useCurrentFrame } from "remotion";
import { Bowl, Cup, Drumstick, Plate } from "../food";
import { ArrowDown, B, BigNum, Body, HEAD, Headline, Kicker, Pad, Rule, Sage, Slide, StepStrip, T } from "./template";

const TOTAL = 7;
const ANCHORS = ["Anchor 1", "Anchor 2", "Anchor 3"];
const DAYS = ["Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Ahd"];

// Week strip: `lit` says which days are highlighted.
const Week: React.FC<{ lit: (i: number) => boolean }> = ({ lit }) => (
  <div style={{ display: "flex", gap: 12 }}>
    {DAYS.map((d, i) => (
      <div
        key={d}
        style={{
          flex: 1,
          height: 112,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          fontWeight: 700,
          background: lit(i) ? T.sageSoft : "#fff",
          border: `3px solid ${lit(i) ? T.sage : "#E6E5E0"}`,
          color: lit(i) ? T.ring : "#9A9A9A",
        }}
      >
        {d}
      </div>
    ))}
  </div>
);

const Anchor: React.FC<{ i: number; children: React.ReactNode; cue: React.ReactNode }> = ({ i, children, cue }) => (
  <Slide index={i + 1} total={TOTAL}>
    <BigNum>{i + 1}</BigNum>
    <Pad top={210}>
      <Kicker>Anchor {i + 1}</Kicker>
      <Headline size={108}>{children}</Headline>
      <Rule style={{ margin: "40px 0 0" }} />
    </Pad>
    <div style={{ position: "absolute", top: 740, left: 104, right: 104, height: 320, display: "flex", alignItems: "center", justifyContent: "center", gap: 50 }}>{cue}</div>
    <Pad top={1090}>
      <StepStrip items={ANCHORS} done={i} active={i} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Weekend flexibility</Kicker>
      <Headline size={128}>
        Weekend
        <br />
        tanpa
        <br />
        <Sage>all-or-nothing</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 40px" }} />
      <Body size={48}>
        Weekend tak perlu jadi <B>2 hari ‘off’.</B>
      </Body>
    </Pad>
    <Pad top={1060} style={{ left: 84, right: 84 }}>
      <Week lit={(i) => i >= 5} />
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Anchor
    i={0}
    cue={
      <>
        <Bowl width={260} />
        <Cup width={130} />
      </>
    }
  >
    Kekalkan satu struktur <Sage>breakfast/&#8203;lunch</Sage> yang familiar.
  </Anchor>
);

const S3: React.FC = () => (
  <Anchor
    i={1}
    cue={
      <Plate size={270}>
        <div style={{ position: "absolute", left: 40, top: 76, transform: "rotate(-12deg)" }}>
          <Drumstick width={200} />
        </div>
      </Plate>
    }
  >
    Cari <Sage>protein</Sage> dekat main meal.
  </Anchor>
);

const S4: React.FC = () => (
  <Anchor i={2} cue={<Cup width={190} />}>
    Pilih <Sage>minuman</Sage> dengan sedar.
  </Anchor>
);

const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={250}>
      <Headline size={124}>
        Makan benda yang awak <Sage>memang nak</Sage>
      </Headline>
      <Rule style={{ margin: "52px 0 44px" }} />
      <Body size={56}>
        — bukan semua sebab <B>‘cheat day’.</B>
      </Body>
    </Pad>
    <Pad top={1090}>
      <StepStrip items={ANCHORS} done={3} />
    </Pad>
  </Slide>
);

const Block: React.FC<{ on?: boolean; children: React.ReactNode }> = ({ on, children }) => (
  <div
    style={{
      fontFamily: HEAD,
      fontWeight: 700,
      fontSize: 112,
      lineHeight: 1,
      textTransform: "uppercase",
      padding: "30px 40px",
      borderRadius: 22,
      background: on ? T.sageSoft : "#fff",
      border: `3px solid ${on ? T.sage : T.rule}`,
      color: on ? T.ring : T.text,
    }}
  >
    {children}
  </div>
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={300} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 26 }}>
      <Block>Kalau meal lari,</Block>
      <div style={{ marginLeft: 50 }}>
        <ArrowDown size={96} />
      </div>
      <Block on>next meal normal.</Block>
    </Pad>
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Pad top={230}>
      <Headline size={160}>
        Enjoy
        <br />
        <Sage>weekend.</Sage>
      </Headline>
      <Rule style={{ margin: "52px 0 44px" }} />
      <Body size={56}>
        Jangan tunggu Isnin <B>untuk sambung.</B>
      </Body>
    </Pad>
    <Pad top={1040} style={{ left: 84, right: 84 }}>
      <Week lit={() => true} />
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1010_SLIDES = SLIDES.length;
export const C1010Weekend: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
