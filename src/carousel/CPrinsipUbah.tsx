// PM Carousel — "10 prinsip mengenal diri untuk berubah" (adapted from a photo-background personal-development carousel;
// own copy, reframed around health/habit change, Coach Nas brand colours instead of red).
// Photos: public/img/pd-*.jpg (local only, gitignored). Bottom half is a frosted blur of the same photo.
// Business CTA follows the Notion recruit rules: no income claim, disclaimer shown, keyword MISI.
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { POPPINS } from "../theme";

const W = 1080;
const H = 1440;
const INK = "#173C30";
const INK_SOFT = "#4A5650";
const ACCENT = "#2F6B4F";
const GOLD = "#B8913A";
const TOTAL = 7;

type Photo = { src: string; top: number; panel: number };
const STAGE: Photo = { src: "img/pd-stage.jpg", top: -170, panel: 640 };
const AWARD: Photo = { src: "img/pd-award.jpg", top: 0, panel: 640 };
const EXPO: Photo = { src: "img/pd-expo.jpg", top: 0, panel: 640 };
const OFFICE: Photo = { src: "img/pd-office.jpg", top: -420, panel: 640 };

const PhotoBg: React.FC<{ p: Photo; panel?: number }> = ({ p, panel = p.panel }) => {
  const img = (extra?: React.CSSProperties) => (
    <Img src={staticFile(p.src)} style={{ position: "absolute", left: 0, top: p.top, width: W, height: H - p.top, objectFit: "cover", objectPosition: "50% 0%", ...extra }} />
  );
  const mask = `linear-gradient(to bottom, transparent ${panel - 160}px, black ${panel + 20}px)`;
  return (
    <>
      {img()}
      <div style={{ position: "absolute", inset: 0, WebkitMaskImage: mask, maskImage: mask }}>
        {img({ filter: "blur(30px) saturate(1.05)", transform: "scale(1.08)" })}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, rgba(247,245,237,0) ${panel - 170}px, rgba(247,245,237,0.78) ${panel + 10}px, rgba(247,245,237,0.88) ${H}px)`,
        }}
      />
    </>
  );
};

const Frame: React.FC<{ p: Photo; panel?: number; i: number; children: React.ReactNode }> = ({ p, panel, i, children }) => (
  <div style={{ position: "relative", width: W, height: H, overflow: "hidden", background: "#F7F5ED", fontFamily: POPPINS, color: INK }}>
    <PhotoBg p={p} panel={panel} />
    <div style={{ position: "absolute", top: 44, left: 44, background: "rgba(30,40,35,0.55)", color: "#fff", borderRadius: 999, padding: "12px 26px", fontSize: 24, fontWeight: 600, letterSpacing: 0.5 }}>
      COACH NAS · CLINICAL PHARMACIST
    </div>
    {children}
    <div style={{ position: "absolute", bottom: 44, left: 72, right: 72, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 600 }}>
      <span style={{ color: ACCENT }}>@coachnas.pharmacist</span>
      <span style={{ color: "#8C948F" }}>
        {String(i + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
      </span>
    </div>
  </div>
);

const Kick: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, fontWeight: 700, color: ACCENT, letterSpacing: 1 }}>
    <div style={{ width: 56, height: 5, background: GOLD, borderRadius: 3 }} />
    {children}
  </div>
);

const Item: React.FC<{ n: string; t: string; d: React.ReactNode }> = ({ n, t, d }) => (
  <div>
    <div style={{ fontSize: 42, fontWeight: 800, color: GOLD, lineHeight: 1 }}>{n}</div>
    <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.12, marginTop: 10, letterSpacing: -0.5 }}>{t}</div>
    <div style={{ fontSize: 32, lineHeight: 1.45, color: INK_SOFT, marginTop: 10, fontWeight: 500 }}>{d}</div>
  </div>
);

const Pair: React.FC<{ p: Photo; i: number; a: [string, string, React.ReactNode]; b: [string, string, React.ReactNode] }> = ({ p, i, a, b }) => (
  <Frame p={p} i={i}>
    <div style={{ position: "absolute", top: 650, left: 72, right: 72, display: "flex", flexDirection: "column", gap: 30 }}>
      <Item n={a[0]} t={a[1]} d={a[2]} />
      <div style={{ height: 2, background: "rgba(23,60,48,0.12)" }} />
      <Item n={b[0]} t={b[1]} d={b[2]} />
    </div>
  </Frame>
);

const S1: React.FC = () => (
  <Frame p={STAGE} i={0} panel={760}>
    <div style={{ position: "absolute", top: 800, left: 72, right: 72 }}>
      <Kick>10 PRINSIP</Kick>
      <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.05, marginTop: 26, letterSpacing: -1.5 }}>
        Kenal diri dulu, baru <span style={{ color: ACCENT }}>boleh berubah.</span>
      </div>
      <div style={{ fontSize: 34, lineHeight: 1.45, color: INK_SOFT, marginTop: 26, fontWeight: 500 }}>
        Kadang yang paling halang kita bukan orang lain, bukan keadaan. Tapi diri kita sendiri.
      </div>
    </div>
  </Frame>
);

const S2: React.FC = () => (
  <Pair
    p={EXPO}
    i={1}
    a={["01", "Awareness ≠ Change", <>Tahu kena kurang manis tak sama dengan kurang manis. Perubahan bermula bila kita buat langkah pertama, walau kecil.</>]}
    b={["02", "We Love Certainty", <>Rutin lama rasa selesa, walaupun tak bawa kita ke mana. Rasa janggal bila cuba benda baru tu normal.</>]}
  />
);

const S3: React.FC = () => (
  <Pair
    p={AWARD}
    i={2}
    a={["03", "We Repeat What We Don’t Confront", <>Diet gagal berulang kali? Selagi punca sebenar tak dihadapi (tidur, stress, emosi), kitaran tu akan ulang.</>]}
    b={["04", "The Story You Tell Yourself", <>“Aku memang susah kurus.” Kadang ayat ni lebih berat daripada berat badan sendiri.</>]}
  />
);

const S4: React.FC = () => (
  <Pair
    p={OFFICE}
    i={3}
    a={["05", "Old Habits, Same Results", <>Menu sama, waktu tidur sama, rutin sama. Hasil pun akan sama.</>]}
    b={["06", "Blame Prevents Learning", <>Kerja, genetik, kenduri. Ada betulnya. Tapi tanya: apa <b style={{ color: INK }}>satu benda</b> yang masih dalam kawalan aku?</>]}
  />
);

const S5: React.FC = () => (
  <Pair
    p={STAGE}
    i={4}
    a={["07", "Everyone Wants the Summit, Not the Climb", <>Semua nak hasil 3 bulan. Tak ramai sanggup lalu minggu ke-3 yang membosankan.</>]}
    b={["08", "Emotions vs Rational Thinking", <>Lepas hari teruk, keputusan makan selalu datang dari emosi. Pause 10 minit sebelum decide.</>]}
  />
);

const S6: React.FC = () => (
  <Pair
    p={EXPO}
    i={5}
    a={["09", "Growth Requires Letting Go", <>Lepaskan mentaliti all-or-nothing, ego “aku boleh sorang”, dan takut nampak bodoh bila baru mula.</>]}
    b={["10", "Learn to Respond Differently", <>Kenduri, stress, penat akan datang lagi. Yang boleh berubah: cara kita respond.</>]}
  />
);

const S7: React.FC = () => (
  <Frame p={AWARD} i={6} panel={600}>
    <div style={{ position: "absolute", top: 610, left: 72, right: 72 }}>
      <Kick>PENUTUP</Kick>
      <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.08, marginTop: 22, letterSpacing: -1 }}>
        Real change starts <span style={{ color: ACCENT }}>with&nbsp;you.</span>
      </div>
      <div style={{ fontSize: 31, lineHeight: 1.45, color: INK_SOFT, marginTop: 18, fontWeight: 500 }}>
        Kita tak boleh kawal semua keadaan. Tapi kita boleh ubah cara berfikir, bertindak dan respond.
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: ACCENT, marginTop: 18 }}>Keep learning. Keep growing. Keep becoming better.</div>
      <div style={{ height: 2, background: "rgba(23,60,48,0.12)", margin: "30px 0" }} />
      <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.25 }}>Suka personal growth & nak belajar bina bisnes wellness secara part-time?</div>
      <div style={{ fontSize: 50, fontWeight: 800, color: ACCENT, marginTop: 12 }}>
        DM “<span style={{ color: GOLD }}>MISI</span>”.
      </div>
      <div style={{ fontSize: 22, color: "#7A827D", marginTop: 12 }}>*Pendapatan bergantung pada usaha & tidak dijamin.</div>
    </div>
  </Frame>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const CPRINSIP_SLIDES = SLIDES.length;
export const CPrinsipUbah: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
