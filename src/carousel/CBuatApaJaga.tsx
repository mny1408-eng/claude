// PM Carousel — "Buat apa jaga makan? Orang jaga pun kena kanser." (carousel version of Reel-Kanser).
// WHO Cancer fact sheet: "between 30 and 50% of cancers can currently be prevented by avoiding risk factors
// and implementing existing evidence-based prevention strategies".
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, HEAD, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Box: React.FC<{ children: React.ReactNode; on?: boolean; style?: React.CSSProperties }> = ({ children, on, style }) => (
  <div style={{ background: on ? T.sageSoft : "#fff", border: `3px solid ${on ? T.sage : "#E6E5E0"}`, borderRadius: 22, padding: "26px 30px", ...style }}>{children}</div>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Pernah dengar?</Kicker>
      <Headline size={112}>
        “Buat apa jaga makan? Orang jaga pun <Sage>kena kanser.</Sage>”
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 900, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={190} />
      </div>
      <Body size={34}>
        Jawapan dari seorang <B>farmasis klinikal</B> yang bekerja dengan pesakit kanser.
      </Body>
    </div>
  </Slide>
);

const Row: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
    <div style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3 }}>{q}</div>
    <div style={{ flex: "none", fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: T.ring, textTransform: "uppercase" }}>{a}</div>
  </Box>
);

const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Jujur</Kicker>
      <Headline size={104}>
        Dua-dua ayat ni <Sage>betul.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 470, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 22 }}>
      <Row q="Jaga kesihatan, boleh kena kanser?" a="✓ Ya" />
      <Row q="Tak jaga, boleh hidup sampai 90?" a="✓ Ya" />
    </div>
    <Pad top={900}>
      <Body size={38}>
        Tapi adakah itu bermaksud jaga kesihatan <B sage>tak penting?</B>
      </Body>
    </Pad>
  </Slide>
);

const S3: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Ramai keliru</Kicker>
      <Headline size={140}>
        Risiko <Sage>≠</Sage> jaminan.
      </Headline>
    </Pad>
    <Pad top={600}>
      <Box on>
        <Body size={36}>
          Jaga kesihatan <B>kurangkan risiko</B>. Ia bukan jaminan 100% bebas penyakit.
        </Body>
      </Box>
      <Body size={34} style={{ marginTop: 34, color: T.textSoft }}>
        Sama macam pakai tali pinggang keledar. Tak jamin selamat, tapi peluang lebih baik.
      </Body>
    </Pad>
  </Slide>
);

const Col: React.FC<{ title: string; items: string[]; on?: boolean }> = ({ title, items, on }) => (
  <Box on={on} style={{ flex: 1 }}>
    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, color: on ? T.sage : "#9A9A9A", marginBottom: 16 }}>{title}</div>
    {items.map((x) => (
      <div key={x} style={{ fontSize: 33, fontWeight: 600, padding: "8px 0", lineHeight: 1.25 }}>
        {x}
      </div>
    ))}
  </Box>
);

const S4: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Kanser bukan satu faktor</Kicker>
      <Headline size={100}>
        Ada yang kita <Sage>boleh ubah.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 470, left: 84, right: 84, display: "flex", gap: 20 }}>
      <Col title="LUAR KAWALAN" items={["Umur", "Genetik"]} />
      <Col on title="BOLEH UBAH" items={["Merokok", "Pemakanan", "Aktiviti fizikal", "Berat badan", "Alkohol"]} />
    </div>
    <Pad top={1110}>
      <Body size={30} style={{ color: T.textSoft }}>
        Persekitaran & jangkitan pun main peranan. Sebahagiannya boleh dikurangkan (cth. vaksin HPV, Hepatitis B).
      </Body>
    </Pad>
  </Slide>
);

const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Data WHO</Kicker>
    </Pad>
    <Pad top={260}>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 260, lineHeight: 1, color: T.ring }}>30–50%</div>
      <Headline size={84} style={{ marginTop: 20 }}>
        kanser boleh <Sage>dicegah.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 30 }}>
        Dengan elak faktor risiko dan guna strategi pencegahan yang dah terbukti.
      </Body>
    </Pad>
    <Pad top={1170}>
      <div style={{ display: "inline-block", fontSize: 24, fontWeight: 600, color: T.textSoft, background: T.footer, borderRadius: 999, padding: "12px 26px" }}>Sumber: WHO, Cancer fact sheet</div>
    </Pad>
  </Slide>
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Tujuan sebenar</Kicker>
      <Headline size={100}>
        Bukan untuk hidup <Sage>selama-lamanya.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 26 }}>
        Kita nak tambah <B>peluang</B> untuk hidup:
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 700, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 18 }}>
      {["Lebih sihat", "Lebih lama", "Dengan kualiti hidup lebih baik"].map((x) => (
        <Box key={x} on style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 60, textTransform: "uppercase", color: T.ring, padding: "20px 32px" }}>
          {x}
        </Box>
      ))}
    </div>
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="KOMEN NAK">
    <Pad top={210}>
      <Kicker>Mula sekarang</Kicker>
      <Headline size={124}>
        Jangan tunggu <Sage>diagnosis.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 30 }}>
        Bina healthy lifestyle yang <B>sustainable</B>, tanpa extreme diet.
      </Body>
    </Pad>
    <Pad top={830}>
      <CtaBox>
        <span style={{ fontSize: 46, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya guide awak step by step.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const CBUATAPA_SLIDES = SLIDES.length;
export const CBuatApaJaga: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
