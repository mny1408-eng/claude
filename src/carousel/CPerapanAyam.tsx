// PM Carousel — "5 perapan ayam supaya tak bosan" (adapted from a marinade carousel; own copy and layout).
// Food safety (USDA FSIS): raw marinated chicken in the fridge 1–2 days; cooked chicken 3–4 days; freeze for longer.
// Marinate in the fridge, never on the counter; discard used marinade unless boiled.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";
import { Ingredients, RecipeSlide, TipBox } from "./recipe";

const TOTAL = 8;

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Bosan makan ayam?</Kicker>
      <Headline size={128}>
        5 perapan <Sage>ayam.</Sage>
      </Headline>
      <Body size={38} style={{ marginTop: 28 }}>
        Satu batch ayam, <B>5 rasa berbeza</B>. Sedap, simple, tak jemu.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 880, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={190} />
      </div>
      <Body size={34}>
        Semua sukatan untuk <B>500g dada / peha ayam tanpa kulit.</B>
      </Body>
    </div>
  </Slide>
);

const RECIPES: { n: string; title: React.ReactNode; sub: string; items: [string, string][]; tip: React.ReactNode }[] = [
  {
    n: "01",
    title: <>Garlic <Sage>black pepper</Sage></>,
    sub: "Simple tapi penuh rasa.",
    items: [["Bawang putih cincang", "3 ulas"], ["Lada hitam tumbuk", "1 sudu besar"], ["Minyak zaitun", "1 sudu besar"], ["Garam", "½ sudu kecil"], ["Mixed herbs", "1 sudu kecil"]],
    tip: <>Paling selamat untuk mula. Sesuai dengan nasi, wrap atau salad.</>,
  },
  {
    n: "02",
    title: <>Soy <Sage>garlic</Sage></>,
    sub: "Manis, masin, berbau harum.",
    items: [["Kicap rendah garam", "2 sudu besar"], ["Bawang putih cincang", "3 ulas"], ["Madu", "1 sudu kecil"], ["Minyak zaitun", "1 sudu besar"], ["Lada hitam", "1 sudu kecil"], ["Serbuk halia", "½ sudu kecil"]],
    tip: <>Kicap dah masin, jadi <B>tak perlu tambah garam</B>. Ada darah tinggi? Kurangkan kicap.</>,
  },
  {
    n: "03",
    title: <>Paprika <Sage>spicy</Sage></>,
    sub: "Pedas, buka selera.",
    items: [["Serbuk paprika", "1 sudu besar"], ["Bawang putih cincang", "3 ulas"], ["Serbuk cili", "½ sudu besar*"], ["Minyak zaitun", "1 sudu besar"], ["Mixed herbs", "1 sudu kecil"], ["Garam", "½ sudu kecil"]],
    tip: <>*Ikut tahap pedas. Mula sikit dulu, boleh tambah lepas rasa.</>,
  },
  {
    n: "04",
    title: <>Kunyit <Sage>rempah</Sage></>,
    sub: "Rasa Malaysia, aroma rempah.",
    items: [["Serbuk kunyit", "1 sudu besar"], ["Bawang putih cincang", "3 ulas"], ["Halia parut", "1 sudu kecil"], ["Serbuk ketumbar", "1 sudu kecil"], ["Serbuk jintan manis", "1 sudu kecil"], ["Minyak zaitun", "1 sudu besar"], ["Garam", "½ sudu kecil"]],
    tip: <>Paling dekat dengan rasa ayam goreng kampung, tapi <B>air fryer</B>. Geng tak suka rasa “western”, cuba ni.</>,
  },
  {
    n: "05",
    title: <>Lemon <Sage>herb</Sage></>,
    sub: "Segar dan ringan.",
    items: [["Jus lemon", "3 sudu besar"], ["Parutan kulit lemon", "1 sudu kecil"], ["Bawang putih cincang", "3 ulas"], ["Minyak zaitun", "1 sudu besar"], ["Mixed herbs", "1 sudu besar"], ["Garam", "½ sudu kecil"]],
    tip: <>Asid lemon buat ayam lembik kalau perap terlalu lama. <B>Cukup 30 minit – 2 jam.</B></>,
  },
];

const RecipeSlides = RECIPES.map((r, i) => {
  const R: React.FC = () => (
    <RecipeSlide index={i + 1} total={TOTAL} n={r.n} kicker={`Perapan ${r.n} / 05`} title={r.title} sub={r.sub}>
      <Ingredients items={r.items} />
      <TipBox>{r.tip}</TipBox>
    </RecipeSlide>
  );
  return R;
});

const Rule: React.FC<{ k: string; v: React.ReactNode }> = ({ k, v }) => (
  <div style={{ display: "flex", gap: 22, alignItems: "flex-start", background: "#fff", border: "3px solid #E6E5E0", borderRadius: 18, padding: "18px 26px" }}>
    <div style={{ flex: "none", width: 210, fontSize: 24, fontWeight: 700, letterSpacing: 2, color: T.sage, paddingTop: 4 }}>{k}</div>
    <div style={{ fontSize: 29, lineHeight: 1.35, fontWeight: 500 }}>{v}</div>
  </div>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Meal prep yang selamat</Kicker>
      <Headline size={92}>
        Perap, simpan, <Sage>masak.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 400, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 14 }}>
      <Rule k="PERAP" v={<>Dalam peti sejuk, <B>bukan atas meja</B>. Minimum 30 minit.</>} />
      <Rule k="AYAM MENTAH" v={<>Dah perap: peti sejuk <B>1–2 hari</B> je. Lebih lama, simpan dalam freezer.</>} />
      <Rule k="AYAM MASAK" v={<>Bekas kedap udara, peti sejuk <B>3–4 hari</B>.</>} />
      <Rule k="CAIR BEKU" v={<>Dalam peti sejuk semalaman, bukan suhu bilik.</>} />
      <Rule k="MASAK" v={<>Air fryer, grill pan, oven atau kuali non-stick. Pastikan <B>masak sampai ke tengah</B>.</>} />
    </div>
    <Pad top={1170}>
      <div style={{ display: "inline-block", fontSize: 22, fontWeight: 600, color: T.textSoft, background: T.footer, borderRadius: 999, padding: "10px 24px" }}>Rujukan: USDA Food Safety & Inspection Service</div>
    </Pad>
  </Slide>
);

const S8: React.FC = () => (
  <Slide index={7} total={TOTAL} last lastLabel="KOMEN NAK">
    <Pad top={210}>
      <Kicker>Simpan & cuba</Kicker>
      <Headline size={112}>
        Bukan ayam yang bosan. <Sage>Perapan yang sama.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 28 }}>
        Tukar rasa setiap minggu, struktur pinggan kekal sama.
      </Body>
    </Pad>
    <Pad top={850}>
      <CtaBox>
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya bantu susun meal prep ikut rutin awak.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, ...RecipeSlides, S7, S8];
export const CPERAPAN_SLIDES = SLIDES.length;
export const CPerapanAyam: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
