// PM Carousel — "5 makanan bantu kurangkan craving manis" (adapted from a 10-item infographic; own copy, cut to 5).
// Kept items with the clearest rationale (protein/fibre → satiety) and local, affordable examples.
// Dropped from the source: kayu manis, dark chocolate, chia, avokado, "probiotik seimbangkan bakteria" — weak or
// overstated for craving. No food is framed as a cure; slide 7 covers non-food drivers (tidur, skip meal, stress, cue).
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, Chips, CtaBox, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";
import { RecipeSlide, TipBox } from "./recipe";

const TOTAL = 8;
const WARN_SOFT = "#F6E3DC";
const WARN = "#5A2418";

const Emoji: React.FC<{ e: string; size?: number }> = ({ e, size = 200 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: T.sageSoft, border: `4px solid ${T.rule}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5, flex: "none" }}>{e}</div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, color: T.sage, marginBottom: 10 }}>{children}</div>
);

const Warn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: WARN_SOFT, borderRadius: 14, padding: "16px 24px", fontSize: 27, lineHeight: 1.35, color: WARN }}>
    <b>Jaga-jaga:</b> {children}
  </div>
);

// 1 — Cover
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Selalu teringin manis?</Kicker>
      <Headline size={118}>
        5 makanan bantu kurangkan <Sage>craving manis.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 26 }}>
        Bukan magic. Tapi bila perut <B>kenyang betul</B>, craving lebih senang dikawal.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 820, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22 }}>
      {["🥚", "🥜", "🥣", "🌾", "🍎"].map((e) => (
        <Emoji key={e} e={e} size={150} />
      ))}
    </div>
    <div style={{ position: "absolute", top: 1050, left: 104, right: 104, display: "flex", alignItems: "center", gap: 32 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={130} />
      </div>
      <Body size={30} style={{ color: T.textSoft }}>
        Versi pharmacist: yang ada sebab, dan senang cari kat Malaysia.
      </Body>
    </div>
  </Slide>
);

const ITEMS: { e: string; n: string; title: React.ReactNode; sub: string; why: React.ReactNode; eg: string[]; tip: React.ReactNode; warn: React.ReactNode }[] = [
  {
    e: "🥚",
    n: "01",
    title: <>Protein <Sage>setiap kali makan</Sage></>,
    sub: "Paling penting dalam senarai ni.",
    why: <>Protein buat <B>kenyang lebih lama</B> berbanding makan karbo je.</>,
    eg: ["Telur", "Ayam", "Ikan", "Tauhu / tempe"],
    tip: <>Ramai craving manis petang sebab pagi makan <B>roti + teh tarik je</B>. Tambah telur atau protein kat sarapan dulu.</>,
    warn: <>Pilih rebus, panggang atau masak sup. Kurangkan yang goreng tepung.</>,
  },
  {
    e: "🥜",
    n: "02",
    title: <>Kekacang <Sage>segenggam</Sage></>,
    sub: "Snek petang yang lebih mengenyangkan.",
    why: <>Ada <B>protein, lemak & serat</B>. Lebih kenyang daripada biskut manis.</>,
    eg: ["Kacang tanah", "Badam", "Gajus", "Walnut"],
    tip: <>Ganti kuih petang dengan <B>segenggam kecil</B>. Simpan satu bekas kecil dalam beg atau laci ofis.</>,
    warn: <>Kalori tinggi, jadi kawal portion. Elak yang bersalut gula, madu atau garam tebal.</>,
  },
  {
    e: "🥣",
    n: "03",
    title: <>Yogurt <Sage>plain</Sage></>,
    sub: "Rasa macam dessert, tapi ada protein.",
    why: <>Greek yogurt plain <B>tinggi protein</B>. Sesuai bila teringin benda sejuk & creamy.</>,
    eg: ["Greek yogurt plain", "Yogurt plain", "+ buah potong"],
    tip: <>Nak manis? Tambah <B>buah sendiri</B>, bukan beli yang dah berperisa.</>,
    warn: <>Yogurt berperisa selalunya ada gula tambahan. Baca label dulu.</>,
  },
  {
    e: "🌾",
    n: "04",
    title: <>Oat <Sage>biasa</Sage></>,
    sub: "Sarapan yang tahan sampai tengah hari.",
    why: <>Ada <B>serat larut (beta-glucan)</B> yang buat pencernaan lebih perlahan & lebih kenyang.</>,
    eg: ["Rolled oats", "Quick oats plain", "Overnight oats"],
    tip: <>Masak dengan susu, tambah <B>telur atau yogurt</B> untuk protein, dan buah untuk rasa manis.</>,
    warn: <>Oat 3-in-1 atau berperisa banyak gula tambahan. Pilih yang plain.</>,
  },
  {
    e: "🍎",
    n: "05",
    title: <>Buah <Sage>segar</Sage></>,
    sub: "Bila memang nak rasa manis.",
    why: <>Manis semula jadi, tapi datang dengan <B>serat & air</B>. Lebih baik daripada kuih atau air manis.</>,
    eg: ["Jambu batu", "Epal", "Oren", "Betik", "Pisang"],
    tip: <>Makan buah, <B>bukan jus</B>. Satu hidangan ≈ 1 biji sederhana atau 1 cawan potong.</>,
    warn: <>Ada diabetes? Bincang portion buah dengan doktor, dietitian atau pharmacist awak.</>,
  },
];

const ItemSlides = ITEMS.map((it, i) => {
  const I: React.FC = () => (
    <RecipeSlide index={i + 1} total={TOTAL} n={it.n} kicker={`Makanan ${it.n} / 05`} title={it.title} sub={it.sub}>
      <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 10 }}>
        <Emoji e={it.e} />
        <div style={{ flex: 1, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 20, padding: "22px 26px" }}>
          <Label>KENAPA MEMBANTU</Label>
          <div style={{ fontSize: 31, lineHeight: 1.35 }}>{it.why}</div>
        </div>
      </div>
      <div>
        <Label>CONTOH</Label>
        <Chips items={it.eg} />
      </div>
      <TipBox>{it.tip}</TipBox>
      <Warn>{it.warn}</Warn>
    </RecipeSlide>
  );
  return I;
});

// 7 — Honest part: craving is not only about food
const DRIVERS: [string, string, React.ReactNode][] = [
  ["😴", "Tidur tak cukup", <>Bila penat, badan lebih cenderung cari makanan manis & tinggi tenaga.</>],
  ["⏰", "Skip makan", <>Lapar sangat = craving paling kuat. Makan ikut waktu.</>],
  ["😮‍💨", "Stress", <>Kadang yang kita cari bukan gula, tapi rehat.</>],
  ["🍪", "Stok depan mata", <>Nampak, ingat, ambil. Simpan jauh dari pandangan.</>],
  ["💧", "Haus", <>Minum air kosong dulu, tunggu sekejap.</>],
];
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Jujur dari pharmacist</Kicker>
      <Headline size={84}>
        Craving bukan <Sage>semua pasal makanan.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 450, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 12 }}>
      {DRIVERS.map(([e, k, v]) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 20, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 16, padding: "16px 22px" }}>
          <div style={{ fontSize: 46, flex: "none" }}>{e}</div>
          <div>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{k}</div>
            <div style={{ fontSize: 26, color: T.textSoft, lineHeight: 1.3 }}>{v}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 1110, left: 84, right: 84, background: T.ring, color: T.page, borderRadius: 18, padding: "20px 28px", fontSize: 30, lineHeight: 1.3 }}>
      Makanan bantu. Tapi <span style={{ color: T.gold, fontWeight: 800 }}>rutin</span> yang buat ia kekal.
    </div>
  </Slide>
);

// 8 — CTA
const S8: React.FC = () => (
  <Slide index={7} total={TOTAL} last lastLabel="KOMEN NAK">
    <Pad top={210}>
      <Kicker>Mula kecil</Kicker>
      <Headline size={108}>
        Pilih <Sage>satu</Sage> je dulu minggu ni.
      </Headline>
      <Body size={36} style={{ marginTop: 28 }}>
        Contoh: tambah telur kat sarapan, atau tukar kuih petang dengan buah. Satu habit yang jalan lebih baik daripada lima yang separuh jalan.
      </Body>
    </Pad>
    <Pad top={880}>
      <CtaBox>
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya bantu susun menu ikut rutin & craving awak.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, ...ItemSlides, S7, S8];
export const CCRAVING_SLIDES = SLIDES.length;
export const CCravingManis: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
