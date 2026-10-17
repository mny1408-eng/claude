// PM Carousel — "10 tahun diet tak jadi" (Coach Nas personal story; copy written by Coach Nas, 17/10/2026).
// Dark dimmed-photo style (same family as CGoalSistem). Photos: public/img/st-*.jpg (local only, gitignored).
// Edits made before use: ID card blurred (st-office), Google Meet screen blurred (st-laptop),
// lockscreen clock/notification cropped out (st-family). Result slide keeps "Hasil tidak tipikal" disclaimer.
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { BODY } from "./template";
import { POPPINS } from "../theme";

const INK = "#ECE8E1";
const GOLD = "#EAD49C";
const TOTAL = 10;

type Photo = { src: string; pos?: string; dim?: number };

const Bg: React.FC<{ photo: Photo; i: number; children: React.ReactNode }> = ({ photo, i, children }) => (
  <AbsoluteFill style={{ background: "#0d0d0c", fontFamily: BODY, color: INK, overflow: "hidden" }}>
    <Img
      src={staticFile(`img/${photo.src}`)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: photo.pos ?? "50% 50%", filter: "saturate(0.5) contrast(1.05)" }}
    />
    <AbsoluteFill style={{ background: `rgba(12,11,10,${photo.dim ?? 0.72})` }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)" }} />
    {children}
    <div style={{ position: "absolute", bottom: 54, left: 104, right: 104, display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 2, opacity: 0.6 }}>
      <span>@coachnas.pharmacist</span>
      <span>
        {i + 1}/{TOTAL}
      </span>
    </div>
  </AbsoluteFill>
);

const Big: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 96, style }) => (
  <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.05, letterSpacing: -size * 0.03, ...style }}>{children}</div>
);

const Lines: React.FC<{ items: React.ReactNode[]; size?: number; gap?: number }> = ({ items, size = 44, gap = 18 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap, marginTop: 40 }}>
    {items.map((t, k) => (
      <div key={k} style={{ fontSize: size, fontWeight: 600, lineHeight: 1.28 }}>
        {t}
      </div>
    ))}
  </div>
);

const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: GOLD }}>{children}</span>;

const Story: React.FC<{ i: number; photo: Photo; title: React.ReactNode; items: React.ReactNode[]; top?: number; size?: number }> = ({ i, photo, title, items, top = 300, size }) => (
  <Bg photo={photo} i={i}>
    <div style={{ position: "absolute", left: 104, right: 104, top }}>
      <Big>{title}</Big>
      <Lines items={items} size={size} />
    </div>
  </Bg>
);

const S1: React.FC = () => (
  <Bg photo={{ src: "st-before.jpg", pos: "50% 30%", dim: 0.66 }} i={0}>
    <div style={{ position: "absolute", left: 104, right: 104, top: 420 }}>
      <Big size={240} style={{ color: GOLD }}>
        10 tahun.
      </Big>
      <Lines
        size={50}
        items={[
          <>10 tahun saya pasang target yang sama.</>,
          <>
            <b>Nak turun berat.</b>
          </>,
          <>Tapi setiap tahun, masih struggle dengan benda yang sama.</>,
        ]}
      />
    </div>
  </Bg>
);

const S2: React.FC = () => (
  <Story
    i={1}
    photo={{ src: "st-yoyo.jpg", pos: "50% 40%" }}
    title={<>Setiap kali, cerita <G>sama.</G></>}
    items={[<>Start diet.</>, <>Berat turun sikit.</>, <>Lepas tu naik balik.</>, <>Then repeat.</>, <>Sampai satu tahap, rasa macam dah biasa dengan cycle ni.</>]}
  />
);

const S3: React.FC = () => (
  <Story
    i={2}
    photo={{ src: "st-laptop.jpg", pos: "45% 50%", dim: 0.76 }}
    title={<>Masa sambung master’s, <G>lagi teruk.</G></>}
    items={[<>Classes. Assignments. Deadlines.</>, <>Balik pun dah penat.</>, <>Nak jaga makan sendiri pun rasa macam tak sempat.</>, <>Asyik fikir benda lain dulu.</>]}
  />
);

const S4: React.FC = () => (
  <Story
    i={3}
    photo={{ src: "st-soup.jpg", pos: "40% 40%", dim: 0.8 }}
    title={<>Malam jadi waktu saya <G>‘release stress’.</G></>}
    items={[<>Bila stress, saya makan.</>, <>Kadang sampai terlebih makan.</>, <>Lepas tu mula rasa guilty.</>, <>Dan ayat yang sama keluar lagi:</>, <G>“Takpelah, Monday start balik.”</G>]}
    top={260}
  />
);

const S5: React.FC = () => (
  <Story
    i={4}
    photo={{ src: "st-side-before.jpg", pos: "50% 40%", dim: 0.78 }}
    title={<>Tapi Monday pun <G>tak ubah apa-apa.</G></>}
    items={[<>Mula makan terlalu sikit.</>, <>Cut macam-macam makanan.</>, <>Cuba jadi strict.</>, <>Tahan beberapa hari.</>, <>Bila tak mampu ikut, rasa gagal lagi.</>]}
    top={260}
  />
);

const S6: React.FC = () => (
  <Story
    i={5}
    photo={{ src: "st-office.jpg", pos: "50% 30%", dim: 0.74 }}
    title={<>Yang paling frustrating… <G>saya ni pharmacist.</G></>}
    items={[<>Saya tahu pasal kesihatan.</>, <>Tahu apa yang patut dibuat.</>, <>Tapi bila melibatkan diri sendiri, nak konsisten tu memang struggle.</>, <b>Ilmu ada. Routine tak menjadi.</b>]}
    top={260}
  />
);

const S7: React.FC = () => (
  <Story
    i={6}
    photo={{ src: "st-helmet.jpg", pos: "50% 40%", dim: 0.74 }}
    title={<>Sampai satu hari, <G>saya tersedar.</G></>}
    items={[
      <>Lepas habis master’s, saya kena posting jauh daripada family.</>,
      <>Masa tu saya mula reflect balik.</>,
      <>Dah lebih 10 tahun saya ulang cara yang sama.</>,
      <>Tapi masih berharap result yang berbeza.</>,
    ]}
    top={260}
  />
);

const S8: React.FC = () => (
  <Story
    i={7}
    photo={{ src: "st-side-after.jpg", pos: "50% 35%", dim: 0.74 }}
    title={<>Rupanya, saya kena <G>ubah approach.</G></>}
    items={[
      <>Bukan semata-mata makan lagi sikit.</>,
      <>Bukan kena buang semua makanan favourite.</>,
      <>Saya kena faham cara makan dan bina habit yang saya boleh maintain.</>,
      <b>Even bila hidup busy.</b>,
    ]}
    top={260}
  />
);

const S9: React.FC = () => (
  <Bg photo={{ src: "st-family.jpg", pos: "50% 20%", dim: 0.68 }} i={8}>
    <div style={{ position: "absolute", left: 104, right: 104, top: 200 }}>
      <Big size={84}>
        Saya berhenti anggap weekend sebagai <G>‘cheat’.</G>
      </Big>
      <Lines
        size={40}
        gap={14}
        items={[
          <>Makan dengan family? Enjoy.</>,
          <>Pergi kenduri? Enjoy.</>,
          <>Outstation atau conference? Masih boleh makan.</>,
          <>Yang penting, tahu macam mana nak balance dan sambung routine selepas tu.</>,
          <G>Bukan tunggu Monday lagi.</G>,
        ]}
      />
    </div>
    <div style={{ position: "absolute", right: 90, bottom: 140, width: 250, height: 330, borderRadius: 22, overflow: "hidden", border: `5px solid ${INK}`, transform: "rotate(4deg)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
      <Img src={staticFile("img/st-meekari.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} />
    </div>
  </Bg>
);

const S10: React.FC = () => (
  <AbsoluteFill style={{ background: "#141412", fontFamily: BODY, color: INK }}>
    <div style={{ position: "absolute", top: 70, left: 140, right: 140 }}>
      <Img src={staticFile("img/st-ba.jpg")} style={{ width: "100%", borderRadius: 24, display: "block" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 669, height: 96, background: "#FFE81A", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: "#111", fontFamily: POPPINS, fontWeight: 700, fontSize: 24, lineHeight: 1.2, padding: "0 30px" }}>
        Nasri, 37 Tahun, Pharmacist, Turun lebih 20kg setelah 10 tahun diet tak jadi2
      </div>
    </div>
    <div style={{ position: "absolute", top: 900, left: 104, right: 104 }}>
      <Big size={64}>
        Mula 2023. Hari ni, <G>lebih 20kg</G> dah turun & masih maintain.
      </Big>
      <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.35, marginTop: 18 }}>Masih makan nasi. Masih enjoy dessert. Masih makan dengan family.</div>
      <div style={{ fontSize: 30, lineHeight: 1.35, marginTop: 18, opacity: 0.9 }}>
        Busy kerja, urus anak, asyik restart diet setiap Monday? Follow <G>@coachnas.pharmacist</G>. Saya share cara bina habit yang realistic.
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 54, right: 104, fontSize: 24, letterSpacing: 2, opacity: 0.6 }}>10/10</div>
  </AbsoluteFill>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];
export const CKISAH_SLIDES = SLIDES.length;
export const CKisah10Tahun: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
