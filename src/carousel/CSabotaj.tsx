// PM Carousel — "Kenapa saya suka sabotaj diri sendiri?" (from the Mindset & Habit infographic).
// Six causes, one per slide, each with a small "Cuba ni" action. Sleep/ghrelin line is hedged ("boleh").
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, BigNum, Body, CtaBox, Headline, Kicker, NumDots, Pad, Portrait, Sage, Slide, T } from "./template";

const TOTAL = 8;

const Try: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: T.sageSoft, borderLeft: `8px solid ${T.sage}`, borderRadius: 14, padding: "24px 32px" }}>
    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4, color: T.sage, marginBottom: 10 }}>CUBA NI</div>
    <div style={{ fontSize: 34, lineHeight: 1.38, fontWeight: 600 }}>{children}</div>
  </div>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Mindset & habit</Kicker>
      <Headline size={124}>
        Kenapa saya suka <Sage>sabotaj</Sage> diri sendiri?
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 900, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={190} />
      </div>
      <Body size={36}>
        Realitinya, bukan sebab kita malas. <B sage>Ada punca yang lebih dalam.</B>
      </Body>
    </div>
  </Slide>
);

const Cause: React.FC<{ i: number; title: React.ReactNode; body: React.ReactNode; tip: React.ReactNode }> = ({ i, title, body, tip }) => (
  <Slide index={i} total={TOTAL}>
    <BigNum>{i}</BigNum>
    <Pad top={220}>
      <Kicker>Punca {i} / 6</Kicker>
      <Headline size={104}>{title}</Headline>
      <Body size={36} style={{ marginTop: 34, color: T.textSoft }}>
        {body}
      </Body>
    </Pad>
    <Pad top={830}>
      <Try>{tip}</Try>
    </Pad>
    <Pad top={1160}>
      <NumDots total={6} active={i - 1} />
    </Pad>
  </Slide>
);

const CAUSES = [
  {
    title: (
      <>
        Mindset <Sage>semua atau tiada.</Sage>
      </>
    ),
    body: "Satu slip, terus rasa gagal. Padahal yang kira ialah konsisten, bukan sempurna.",
    tip: "Satu meal lari? Next meal sambung macam biasa. Tak perlu tunggu Isnin.",
  },
  {
    title: (
      <>
        Emosi <Sage>tak ditangani.</Sage>
      </>
    ),
    body: "Stress, bosan, sedih. Kita cari makanan sebagai “ubat” sementara.",
    tip: "Sebelum makan, tanya: lapar perut atau lapar emosi?",
  },
  {
    title: (
      <>
        Tenaga & tidur <Sage>tak cukup.</Sage>
      </>
    ),
    body: "Kurang tidur boleh naikkan rasa lapar (hormon ghrelin) dan kurangkan kawalan diri.",
    tip: "Betulkan waktu tidur dulu, sebelum tambah rules makan.",
  },
  {
    title: (
      <>
        Expectation <Sage>tak realistik.</Sage>
      </>
    ),
    body: "Nak hasil cepat tanpa proses. Bila tak jadi, terus give up.",
    tip: "Nilai trend mingguan, bukan nombor timbang setiap pagi.",
  },
  {
    title: (
      <>
        Persekitaran <Sage>tak menyokong.</Sage>
      </>
    ),
    body: "Kawan, keluarga, tempat kerja. Semua main peranan.",
    tip: "Ubah satu benda je dulu. Contoh: snek manis keluar dari meja kerja.",
  },
  {
    title: (
      <>
        Tak jelas <Sage>“kenapa”.</Sage>
      </>
    ),
    body: "Bila tujuan tak jelas, cabaran kecil pun cukup untuk buat kita berhenti.",
    tip: "Tulis satu sebab awak nak berubah yang bukan nombor timbang.",
  },
];

const CauseSlides = CAUSES.map((c, k) => {
  const C: React.FC = () => <Cause i={k + 1} title={c.title} body={c.body} tip={c.tip} />;
  return C;
});

const S8: React.FC = () => (
  <Slide index={7} total={TOTAL} last lastLabel="SHARE POST NI">
    <Pad top={200}>
      <Kicker>Tip Coach Nas</Kicker>
      <Headline size={112}>
        Kenal punca, <Sage>bukan salahkan diri.</Sage>
      </Headline>
      <Body size={38} style={{ marginTop: 34 }}>
        Dari situ baru kita boleh <B sage>berubah secara kekal.</B>
      </Body>
    </Pad>
    <Pad top={790}>
      <CtaBox>
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          <span style={{ color: T.gold }}>Share</span> dengan seseorang
        </span>
        <br />
        yang selalu rasa diri sendiri musuh terbesar.
      </CtaBox>
      <div style={{ marginTop: 40, fontFamily: "inherit", fontSize: 34, fontWeight: 700, letterSpacing: 3, color: T.ring }}>
        YOU VS YOU. <span style={{ color: T.sage }}>CHOOSE YOU, EVERYDAY.</span>
      </div>
    </Pad>
  </Slide>
);

const SLIDES = [S1, ...CauseSlides, S8];
export const CSABOTAJ_SLIDES = SLIDES.length;
export const CSabotaj: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
