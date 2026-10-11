// PM Carousel 14/10/2026 — "5 minit baca label tanpa jadi food police"
// Source: Notion 📅 14/10/2026 — Baca Label → PM CAROUSEL (READY FOR PRODUCTION, QA gate waived by Coach Nas).
// Notion production note: no invented label values; no brand names. The label mock-up below has
// placeholder bars only, no numbers, so nothing can be read as a real value.
// Layout: a blank label card with the row being discussed highlighted. CTA: Save.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Body, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;
const ROWS = ["Serving size", "Ingredients", "Serat", "Gula", "Protein"];

const Bar: React.FC<{ w: number; on?: boolean }> = ({ w, on }) => (
  <div style={{ width: `${w}%`, height: 16, borderRadius: 8, background: on ? T.sage : "#E3E2DD" }} />
);

const LabelCard: React.FC<{ on: number[]; width?: number; tag?: string }> = ({ on, width = 872, tag }) => (
  <div style={{ width, background: "#fff", border: `4px solid ${T.text}`, borderRadius: 14, padding: "20px 28px" }}>
    <div style={{ fontSize: tag ? 30 : 34, fontWeight: 700, borderBottom: `6px solid ${T.text}`, paddingBottom: 12, marginBottom: 6 }}>{tag ?? "Label di belakang bungkus"}</div>
    {ROWS.map((r, i) => {
      const lit = on.includes(i);
      return (
        <div key={r} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: tag ? "10px 12px" : "14px 14px", margin: "6px 0", borderRadius: 10, background: lit ? T.sageSoft : "transparent", border: lit ? `2px solid ${T.sage}` : "2px solid transparent" }}>
          <div style={{ fontSize: tag ? 26 : 32, fontWeight: lit ? 700 : 500, color: lit ? T.text : "#9A9A9A" }}>{r}</div>
          <div style={{ width: tag ? 90 : 200 }}>
            <Bar w={100} on={lit} />
          </div>
        </div>
      );
    })}
  </div>
);

const Step: React.FC<{ i: number; kicker: string; head: React.ReactNode; line?: React.ReactNode; on: number[] }> = ({ i, kicker, head, line, on }) => (
  <Slide index={i} total={TOTAL}>
    <Pad top={190}>
      <Kicker>{kicker}</Kicker>
      <Headline size={116}>{head}</Headline>
      {line && (
        <>
          <Rule style={{ margin: "30px 0 26px" }} />
          <Body size={42}>{line}</Body>
        </>
      )}
    </Pad>
    <Pad top={line ? 800 : 700}>
      <LabelCard on={on} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Baca label</Kicker>
      <Headline size={124}>
        5 minit baca label
        <br />
        tanpa jadi
        <br />
        <Sage>food police.</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 36px" }} />
      <Body size={46}>Claim depan bungkus bukan cerita penuh.</Body>
    </Pad>
    <div style={{ position: "absolute", top: 860, left: 104, right: 104, display: "flex", gap: 30, alignItems: "stretch" }}>
      <div style={{ flex: 1, background: "#fff", border: `4px solid ${T.text}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 700, color: T.sage, padding: 24, textAlign: "center" }}>Depan bungkus</div>
      <div style={{ flex: 1.3 }}>
        <LabelCard on={[]} width={460} tag="Belakang" />
      </div>
    </div>
  </Slide>
);

const S2: React.FC = () => (
  <Step i={1} kicker="Semak 1" head={<><Sage>Serving size</Sage> dulu.</>} line="Nombor di belakang ikut hidangan, bukan satu bungkus." on={[0]} />
);
const S3: React.FC = () => <Step i={2} kicker="Semak 2" head={<><Sage>Ingredients:</Sage> tengok apa yang disenaraikan awal.</>} on={[1]} />;
const S4: React.FC = () => <Step i={3} kicker="Semak 3" head={<><Sage>Serat:</Sage> satu bahagian daripada gambaran, bukan satu-satunya.</>} on={[2]} />;
const S5: React.FC = () => <Step i={4} kicker="Semak 4" head={<><Sage>Gula dan protein:</Sage> lihat bersama serat dan konteks meal.</>} on={[2, 3, 4]} />;

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Banding</Kicker>
      <Headline size={116}>
        Banding dua produk guna <Sage>serving size</Sage> yang sama.
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 760, left: 104, right: 104, display: "flex", gap: 32 }}>
      <LabelCard on={[0]} width={420} tag="Produk A" />
      <LabelCard on={[0]} width={420} tag="Produk B" />
    </div>
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Pad top={210}>
      <Headline size={116}>
        Pilih yang sesuai dengan <Sage>makanan, bajet</Sage> dan selera awak.
      </Headline>
      <Rule style={{ margin: "48px 0 36px" }} />
      <Body size={50}>Tak perlu sempurna.</Body>
    </Pad>
    <Pad top={900}>
      <CtaBox>
        <strong style={{ color: T.gold }}>Save.</strong>
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1410_SLIDES = SLIDES.length;
export const C1410BacaLabel: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
