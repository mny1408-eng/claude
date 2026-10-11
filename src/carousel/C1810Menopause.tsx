// PM Carousel 18/10/2026 — "Menopause, sakit sendi dan weight management: 7 soalan"
// Source: Notion 📅 18/10/2026 — World Menopause Day dan Maintain Berat → PM CAROUSEL (READY FOR PRODUCTION, QA gate waived by Coach Nas).
// Notion production note: calm, respectful visual; no body-shaming or before/after imagery.
// Layout: a vertical rail of seven numbered questions on the left, current one lit. CTA: Save.
// Count check: "7 soalan" = all 7 slides are numbered questions (S1 carries Soalan 1, as the Notion page states).
// Wording stays as written: "bukan semua sakit midlife berpunca daripada menopause", not a diagnostic checklist.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Body, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;
const LEFT = 104;
const RAIL = 96;

const Rail: React.FC<{ active: number }> = ({ active }) => (
  <div style={{ position: "absolute", top: 190, left: LEFT, width: RAIL, height: 1010 }}>
    <div style={{ position: "absolute", left: RAIL / 2 - 2, top: 40, bottom: 40, width: 4, background: T.dot }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: i * 160,
          left: 0,
          width: RAIL,
          height: RAIL,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 42,
          fontWeight: 700,
          background: i === active ? T.ring : i < active ? T.sageSoft : "#fff",
          color: i === active ? T.page : i < active ? T.sage : "#9A9A9A",
          border: `4px solid ${i === active ? T.ring : i < active ? T.sage : T.dot}`,
        }}
      >
        {i + 1}
      </div>
    ))}
  </div>
);

const Q: React.FC<{ i: number; head: React.ReactNode; line?: React.ReactNode }> = ({ i, head, line }) => (
  <Slide index={i} total={TOTAL}>
    <Rail active={i} />
    <div style={{ position: "absolute", top: 230, left: LEFT + RAIL + 60, right: 90 }}>
      <Kicker>Soalan {i + 1}</Kicker>
      <Headline size={104}>{head}</Headline>
      {line && (
        <>
          <Rule style={{ margin: "36px 0 30px" }} />
          <Body size={42}>{line}</Body>
        </>
      )}
    </div>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Rail active={0} />
    <div style={{ position: "absolute", top: 200, left: LEFT + RAIL + 60, right: 90 }}>
      <Kicker>7 soalan</Kicker>
      <Headline size={96}>
        Menopause, sakit sendi dan <Sage>weight management:</Sage> 7 soalan.
      </Headline>
      <Rule style={{ margin: "40px 0 34px" }} />
      <div style={{ fontSize: 30, fontWeight: 700, color: T.sage, letterSpacing: 3, marginBottom: 14 }}>SOALAN 1</div>
      <Body size={50} style={{ fontWeight: 600 }}>
        Apa konteks awak sekarang?
      </Body>
    </div>
  </Slide>
);

const S2: React.FC = () => <Q i={1} head={<>Apa <Sage>gejala</Sage> yang awak rasa?</>} line="Catat di mana, bila dan bagaimana." />;
const S3: React.FC = () => <Q i={2} head={<>Dah <Sage>berapa lama?</Sage></>} line="Sakit berpanjangan patut dinilai." />;
const S4: React.FC = () => <Q i={3} head={<>Apa yang <Sage>sukar dibuat</Sage> sekarang?</>} line="Berjalan, naik tangga, tidur?" />;
const S5: React.FC = () => <Q i={4} head={<>Ada <Sage>punca lain?</Sage></>} line="Bukan semua sakit midlife berpunca daripada menopause." />;
const S6: React.FC = () => <Q i={5} head={<>Siapa <Sage>pasukan penjagaan</Sage> awak?</>} line="Doktor, pharmacist dan profesional lain." />;

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Rail active={6} />
    <div style={{ position: "absolute", top: 230, left: LEFT + RAIL + 60, right: 90 }}>
      <Kicker>Soalan 7</Kicker>
      <Headline size={104}>
        Apa <Sage>langkah seterusnya?</Sage>
      </Headline>
      <Rule style={{ margin: "36px 0 30px" }} />
      <Body size={42}>Bawa catatan ini kepada doktor.</Body>
    </div>
    <div style={{ position: "absolute", top: 900, left: LEFT + RAIL + 60, right: 90 }}>
      <CtaBox>
        <strong style={{ color: T.gold }}>Save.</strong>
      </CtaBox>
    </div>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1810_SLIDES = SLIDES.length;
export const C1810Menopause: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
