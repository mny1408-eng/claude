// Carousel draft 10/10/2026 — "Stability is the foundation, not the whole building" (English, for pharmacists).
// Prompted by the MPS press statement of 9 Oct 2026 (Budget 2027: contract pharmacists must not be left behind).
// Angle agreed with Coach Nas: grateful for his permanent post, stands with MPS, speaks to every pharmacist
// (contract or permanent). Pure thought leadership: no WDT logo, no product, engagement CTA only (the WDT/GROWTH
// recruitment message goes in a separate follow-up reel with full disclosure). Never "just a job".
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, Headline, Kicker, Pad, Portrait, Rule, Sage, Slide, T } from "./template";

const TOTAL = 8;

const S: React.FC<{ i: number; children: React.ReactNode; last?: boolean }> = ({ i, children, last }) => (
  <Slide index={i} total={TOTAL} saveLabel="SAVE" last={last} lastLabel="SHARE WITH A PHARMACIST" logo={false}>
    {children}
  </Slide>
);

const Ticks: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 40 }}>
    {items.map((x, k) => (
      <div key={k} style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 40, fontWeight: 600 }}>
        <svg viewBox="0 0 20 20" width={40} height={40} style={{ flex: "none" }}>
          <path d="M4 10.5 L8.5 15 L16 5.5" fill="none" stroke={T.sage} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {x}
      </div>
    ))}
  </div>
);

const S1: React.FC = () => (
  <S i={0}>
    <div style={{ position: "absolute", top: 170, right: 90 }}>
      <Portrait size={200} />
    </div>
    <Pad top={260}>
      <Kicker>To every pharmacist</Kicker>
      <Headline size={128}>
        Stability is
        <br />
        the <Sage>foundation.</Sage>
        <br />
        Not the whole
        <br />
        building.
      </Headline>
      <Rule style={{ margin: "52px 0 40px" }} />
      <Body size={42}>A note after this week’s Budget 2027 news, for contract and permanent pharmacists alike.</Body>
    </Pad>
  </S>
);

const S2: React.FC = () => (
  <S i={1}>
    <Pad top={220}>
      <Kicker>This week</Kicker>
      <Headline size={112}>
        <Sage>9,000+</Sage> contract doctors
        <br />
        offered permanent posts
      </Headline>
      <Rule style={{ margin: "48px 0 40px" }} />
      <Body size={46}>
        Congratulations to our medical colleagues.
        <br />
        <br />
        But <B>contract pharmacists are still waiting</B> for clarity on their future.
      </Body>
    </Pad>
    <Pad top={1150}>
      <div style={{ fontSize: 26, color: T.textSoft }}>Source: Malaysian Pharmacists Society press statement, 9 Oct 2026</div>
    </Pad>
  </S>
);

const S3: React.FC = () => (
  <S i={2}>
    <Pad top={220}>
      <Kicker>Where I stand</Kicker>
      <Headline size={120}>
        They deserve
        <br />
        <Sage>clarity too.</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 20px" }} />
      <Body size={40}>I stand with MPS in calling for:</Body>
      <Ticks items={["A clear plan for contract pharmacists", "A transparent timeline for permanent posts", "Real engagement with the profession"]} />
    </Pad>
  </S>
);

const S4: React.FC = () => (
  <S i={3}>
    <Pad top={220}>
      <Kicker>Full honesty</Kicker>
      <Headline size={116}>
        I’m a permanent
        <br />
        pharmacist.
        <br />
        <Sage>And I’m grateful.</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 40px" }} />
      <Body size={44}>
        I don’t take that stability for granted.
        <br />
        Many of my colleagues are still waiting for it.
      </Body>
    </Pad>
  </S>
);

const S5: React.FC = () => (
  <S i={4}>
    <Pad top={220}>
      <Kicker>What that stability taught me</Kicker>
      <Headline size={112}>
        A post gives you
        <br />
        <Sage>security.</Sage>
        <br />
        Your future is
        <br />
        still <Sage>yours</Sage> to build.
      </Headline>
      <Rule style={{ margin: "48px 0 40px" }} />
      <Body size={44}>
        Contract or permanent, no appointment letter builds your growth for you. <B>That part is on us.</B>
      </Body>
    </Pad>
  </S>
);

const SKILLS = [
  "Medicines expertise",
  "Clinical skills",
  "Trusted access to the community",
  "Evidence appraisal",
  "Counselling & communication",
  "Behaviour change & MI",
  "Drug–supplement interactions",
  "Chronic disease support",
  "Preventive health & screening",
];

const S6: React.FC = () => (
  <S i={5}>
    <Pad top={200}>
      <Kicker>Our real asset</Kicker>
      <Headline size={104}>
        We hold what
        <br />
        most people <Sage>don’t</Sage>
      </Headline>
      <Rule style={{ margin: "36px 0 32px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 18px" }}>
        {SKILLS.map((s, k) => (
          <div key={s} style={{ gridColumn: k === SKILLS.length - 1 && SKILLS.length % 2 ? "1 / -1" : undefined, display: "flex", alignItems: "center", gap: 14, background: T.sageSoft, border: `2px solid ${T.sage}`, borderRadius: 18, padding: "16px 20px", fontSize: 29, fontWeight: 600, lineHeight: 1.2 }}>
            <svg viewBox="0 0 20 20" width={28} height={28} style={{ flex: "none" }}>
              <path d="M4 10.5 L8.5 15 L16 5.5" fill="none" stroke={T.sage} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {s}
          </div>
        ))}
      </div>
      <Body size={36} style={{ marginTop: 34 }}>
        People need this and don’t know who to ask. <B>It can reach further than one job title.</B>
      </Body>
    </Pad>
  </S>
);

const BUILD = ["Skills", "Network", "Platform", "Impact"];

const S7: React.FC = () => (
  <S i={6}>
    <Pad top={220}>
      <Kicker>Ask yourself</Kicker>
      <Headline size={118}>
        What am I building
        <br />
        that <Sage>no one</Sage>
        <br />
        can take away?
      </Headline>
      <Rule style={{ margin: "48px 0 40px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {BUILD.map((b) => (
          <div key={b} style={{ background: "#fff", border: `2px solid ${T.rule}`, borderRadius: 20, padding: "30px 32px", fontSize: 44, fontWeight: 700 }}>
            {b}
          </div>
        ))}
      </div>
    </Pad>
  </S>
);

const S8: React.FC = () => (
  <S i={7} last>
    <Pad top={220}>
      <Kicker>Both can be true</Kicker>
      <Headline size={124}>
        Fight for a
        <br />
        fair system.
        <br />
        <Sage>And build your own.</Sage>
      </Headline>
    </Pad>
    <Pad top={860}>
      <CtaBox>
        What are you building beyond your job title? <strong style={{ color: T.gold }}>Tell me in the comments.</strong>
      </CtaBox>
      <Body size={32} style={{ marginTop: 30, color: T.textSoft }}>
        Know a pharmacist who needs this today? Share it with them.
      </Body>
    </Pad>
  </S>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8];
export const C05_SLIDES = SLIDES.length;
export const C05Foundation: React.FC = () => {
  const Cur = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <Cur />;
};
