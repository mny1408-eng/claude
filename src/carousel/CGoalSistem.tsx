// PM Carousel — "Ada goal VS Ada sistem" (dark photo style: Coach Nas photo full-bleed, heavy dark overlay,
// off-white bold sans text, left aligned). Photos live in public/img/ (local only, not in git):
// goal-stage.jpg, goal-bow.jpg, goal-sign.jpg, goal-blazer.png.
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { BODY } from "./template";

const INK = "#ECE8E1";

type Photo = { src: string; pos?: string; zoom?: number; dim?: number; shade?: boolean };

const Bg: React.FC<{ photo: Photo; children: React.ReactNode }> = ({ photo, children }) => (
  <AbsoluteFill style={{ background: "#0d0d0c", fontFamily: BODY, color: INK, overflow: "hidden" }}>
    <Img
      src={staticFile(`img/${photo.src}`)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: photo.pos ?? "50% 50%",
        transform: `scale(${photo.zoom ?? 1})`,
        transformOrigin: photo.pos ?? "50% 50%",
        filter: "saturate(0.45) contrast(1.05)",
      }}
    />
    <AbsoluteFill style={{ background: `rgba(12,11,10,${photo.dim ?? 0.74})` }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.45) 100%)" }} />
    {photo.shade && <AbsoluteFill style={{ background: "linear-gradient(110deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 70%)" }} />}
    {children}
    <div style={{ position: "absolute", bottom: 54, left: 0, right: 0, textAlign: "center", fontSize: 24, letterSpacing: 2, color: INK, opacity: 0.55 }}>
      @coachnas.pharmacist
    </div>
  </AbsoluteFill>
);

const Big: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 112, style }) => (
  <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.02, letterSpacing: -size * 0.035, ...style }}>{children}</div>
);

const Small: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 50, style }) => (
  <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.18, letterSpacing: -size * 0.012, ...style }}>{children}</div>
);

const Pair: React.FC<{ photo: Photo; goal: string; system: React.ReactNode }> = ({ photo, goal, system }) => (
  <Bg photo={photo}>
    <div style={{ position: "absolute", left: 104, right: 120, top: 400 }}>
      <Big>Goal:</Big>
      <Small style={{ marginTop: 34 }}>{goal}</Small>
      <Big style={{ marginTop: 130 }}>Sistem:</Big>
      <Small style={{ marginTop: 34 }}>{system}</Small>
    </div>
  </Bg>
);

const STAGE: Photo = { src: "goal-stage.jpg" };
const BOW: Photo = { src: "goal-bow.jpg", pos: "40% 50%" };
const BLAZER: Photo = { src: "goal-blazer.png", pos: "50% 30%" };
const SIGN: Photo = { src: "goal-sign.jpg", pos: "20% 40%", zoom: 1.3, dim: 0.8, shade: true };

const S1: React.FC = () => (
  <Bg photo={{ ...STAGE, dim: 0.7 }}>
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <Big size={120}>Ada goal</Big>
      <Big size={120} style={{ margin: "18px 0" }}>VS</Big>
      <Big size={120}>Ada sistem</Big>
    </AbsoluteFill>
  </Bg>
);

const S2: React.FC = () => (
  <Pair
    photo={BOW}
    goal="Saya nak turun berat."
    system={
      <>
        Protein setiap hidangan.
        <br />
        Jalan 15 minit lepas makan malam.
      </>
    }
  />
);

const S3: React.FC = () => (
  <Pair
    photo={BLAZER}
    goal="Saya nak berhenti air manis."
    system={
      <>
        Bawa botol air sendiri.
        <br />
        Order “kosong” dulu, baru fikir.
      </>
    }
  />
);

const S4: React.FC = () => <Pair photo={SIGN} goal="Saya nak tidur cukup." system="Phone jauh dari katil sebelum pukul 11." />;

const S5: React.FC = () => (
  <Pair
    photo={{ src: "goal-stage.jpg", pos: "45% 25%", zoom: 1.35 }}
    goal="Saya nak sihat untuk family."
    system={
      <>
        Timbang & check BP
        <br />
        seminggu sekali.
        <br />
        Catat, jangan teka.
      </>
    }
  />
);

const S6: React.FC = () => (
  <Bg photo={{ src: "goal-bow.jpg", pos: "35% 60%", zoom: 1.4, dim: 0.7 }}>
    <div style={{ position: "absolute", left: 104, right: 120, top: 520 }}>
      <Big size={104}>Goal tentukan destinasi.</Big>
      <Small style={{ marginTop: 60 }}>Sistem tentukan apa awak buat hari ni.</Small>
    </div>
  </Bg>
);

const S7: React.FC = () => (
  <Bg photo={{ src: "goal-blazer.png", pos: "50% 20%", zoom: 1.25, dim: 0.72 }}>
    <div style={{ position: "absolute", left: 104, right: 120, top: 440 }}>
      <Big size={96}>Awak mungkin tak perlukan goal baru.</Big>
      <Small style={{ marginTop: 56 }}>Awak perlukan rutin yang boleh diulang, walaupun hari tu tak rasa nak.</Small>
      <Small size={36} style={{ marginTop: 90, fontWeight: 600, opacity: 0.8 }}>
        Komen SISTEM, saya bantu susun ikut rutin awak.
      </Small>
    </div>
  </Bg>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const CGOAL_SLIDES = SLIDES.length;
export const CGoalSistem: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
