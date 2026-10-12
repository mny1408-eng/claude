// PM Carousel — "5 menu malas masak untuk orang busy" (adapted from a menu carousel; own copy and layout).
// No weight-loss rate claim. Portions are plate-model guidance, not calorie prescriptions.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, HEAD, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";
import { Chip, RecipeSlide, TipBox } from "./recipe";

const TOTAL = 8;

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Untuk orang busy</Kicker>
      <Headline size={128}>
        5 menu <Sage>malas masak.</Sage>
      </Headline>
      <Body size={38} style={{ marginTop: 28 }}>
        Siap dalam <B>10–15 minit</B>. Ada protein, karbo & sayur.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 880, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={190} />
      </div>
      <Body size={36}>
        Tak rajin masak <B sage>tak bermaksud</B> tak boleh jaga makan.
      </Body>
    </div>
  </Slide>
);

const MENUS = [
  { n: "01", title: <>Sandwich <Sage>telur</Sage></>, sub: "Roti wholemeal + telur rebus + sayur", p: "2 biji telur", k: "2 keping roti wholemeal", s: "Lettuce + timun", tip: <>Rebus telur <B>4–6 biji sekali gus</B> hujung minggu. Simpan dalam peti sejuk, tinggal ambil.</>, when: "Sarapan · Bekal" },
  { n: "02", title: <>Wrap <Sage>tuna</Sage></>, sub: "Tuna + tortilla wholemeal + sayur", p: "Tuna dalam air", k: "1 tortilla wholemeal", s: "Lettuce + tomato + timun", tip: <>Pilih tuna <B>dalam air</B>, bukan dalam minyak. Ganti mayo dengan yogurt tanpa gula.</>, when: "Bekal · Lunch · Dinner" },
  { n: "03", title: <>Nasi ayam <Sage>panggang</Sage></>, sub: "Nasi + ayam panggang siap beli + sayur frozen", p: "Ayam panggang (buang kulit)", k: "Nasi ikut portion", s: "Mixed vegetables frozen", tip: <>Guna konsep <B>suku-suku-separuh</B>: ¼ nasi, ¼ ayam, ½ sayur. Sayur frozen tinggal panaskan.</>, when: "Lunch · Dinner" },
  { n: "04", title: <>Kentang <Sage>microwave</Sage></>, sub: "Kentang + telur + salad", p: "2 biji telur", k: "1 kentang sederhana", s: "Salad + timun + tomato", tip: <>Cucuk kentang dengan garpu, microwave <B>5–8 minit</B> ikut saiz. Makan dengan kulit untuk serat.</>, when: "Lunch · Dinner" },
  { n: "05", title: <>Rice bowl <Sage>sardin</Sage></>, sub: "Nasi + sardin + timun + tomato", p: "Sardin dalam tin", k: "Nasi ikut portion", s: "Timun + tomato", tip: <>Sardin dimakan <B>dengan tulang</B> ada kalsium. Kuah tin agak masin, jadi ambil sikit je kuahnya.</>, when: "Lunch · Dinner · Menu cepat" },
];

const MenuSlides = MENUS.map((m, i) => {
  const M: React.FC = () => (
    <RecipeSlide index={i + 1} total={TOTAL} n={m.n} kicker={`Menu ${m.n} / 05 · ${m.when}`} title={m.title} sub={m.sub}>
      <div style={{ display: "flex", gap: 14 }}>
        <Chip label="PROTEIN" value={m.p} />
        <Chip label="KARBO" value={m.k} />
      </div>
      <Chip label="SAYUR" value={m.s} />
      <div style={{ marginTop: 18 }}>
        <TipBox>{m.tip}</TipBox>
      </div>
    </RecipeSlide>
  );
  return M;
});

const STOCK = ["Telur", "Tuna / sardin tin", "Roti wholemeal / oats", "Sayur frozen", "Yogurt / susu", "Buah + kekacang"];

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Rahsia malas masak</Kicker>
      <Headline size={100}>
        Stok <Sage>penyelamat</Sage> di rumah.
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 450, left: 84, right: 84, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {STOCK.map((s) => (
        <div key={s} style={{ background: "#fff", border: `3px solid ${T.rule}`, borderRadius: 16, padding: "20px 22px", fontSize: 30, fontWeight: 600 }}>
          ✓ {s}
        </div>
      ))}
    </div>
    <Pad top={900}>
      <TipBox title="BILA PETI KOSONG">
        Yang buat kita lari ialah <B>tiada pilihan</B>, bukan tiada disiplin. Ada stok = ada plan B.
      </TipBox>
    </Pad>
  </Slide>
);

const S8: React.FC = () => (
  <Slide index={7} total={TOTAL} last lastLabel="KOMEN NAK">
    <Pad top={210}>
      <Kicker>Ingat</Kicker>
      <Headline size={112}>
        Menu simple lagi senang <Sage>konsisten.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 28 }}>
        Tak perlu fancy. Perlu ada stok, ada pilihan dan ikut struktur pinggan.
      </Body>
    </Pad>
    <Pad top={830}>
      <CtaBox>
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya bantu susun menu ikut rutin awak.
      </CtaBox>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, letterSpacing: 2, color: T.textSoft, marginTop: 26 }}>SIMPAN POST NI UNTUK MINGGU NI</div>
    </Pad>
  </Slide>
);

const SLIDES = [S1, ...MenuSlides, S7, S8];
export const CMALAS_SLIDES = SLIDES.length;
export const CMalasMasak: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
