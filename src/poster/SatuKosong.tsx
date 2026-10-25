// Poster: "Tanpa 1, semua jadi 0". Health is the "1"; work, money, family and dreams are the zeros.
// 1080×1440 (3:4). Drawn digits and icons, no photos.
import React from "react";
import { AbsoluteFill } from "remotion";
import { font } from "../generator/fonts";

export const SATU_KOSONG = { width: 1080, height: 1440 };

const C = { forest: "#1C4A3E", deep: "#12332A", ivory: "#F9F6F0", gold: "#C9A84C", goldLight: "#E3C770", leaf: "#7DB36B" };
const DIGIT = { w: 172, h: 300 };

const Plant: React.FC = () => (
  <svg width="120" height="110" viewBox="0 0 120 110" style={{ position: "absolute", left: 8, top: -96 }}>
    <path d="M60 108 V52" stroke={C.leaf} strokeWidth="7" strokeLinecap="round" />
    <path d="M60 64 C30 64 14 44 12 18 C40 18 58 34 60 64 Z" fill={C.leaf} />
    <path d="M60 54 C86 54 104 34 108 6 C78 8 62 26 60 54 Z" fill="#9BCB84" />
    <ellipse cx="60" cy="106" rx="34" ry="6" fill="#5A3E2B" />
  </svg>
);

const Briefcase = () => (
  <svg width="86" height="74" viewBox="0 0 86 74">
    <rect x="28" y="4" width="30" height="16" rx="5" fill="none" stroke={C.goldLight} strokeWidth="6" />
    <rect x="4" y="18" width="78" height="52" rx="8" fill={C.goldLight} />
    <rect x="4" y="36" width="78" height="6" fill={C.deep} opacity="0.35" />
  </svg>
);
const Coins = () => (
  <svg width="86" height="80" viewBox="0 0 86 80">
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={i} cx="32" cy={66 - i * 13} rx="26" ry="9" fill={C.goldLight} stroke={C.deep} strokeOpacity="0.3" strokeWidth="2" />
    ))}
    {[0, 1].map((i) => (
      <ellipse key={i} cx="66" cy={66 - i * 13} rx="18" ry="7" fill={C.gold} stroke={C.deep} strokeOpacity="0.3" strokeWidth="2" />
    ))}
  </svg>
);
const Family = () => (
  <svg width="92" height="80" viewBox="0 0 92 80">
    <circle cx="22" cy="29" r="11" fill={C.goldLight} />
    <path d="M4 78 C4 30 40 30 40 78 Z" fill={C.goldLight} />
    <circle cx="70" cy="32" r="10" fill={C.goldLight} />
    <path d="M54 78 C54 34 86 34 86 78 Z" fill={C.goldLight} />
    <circle cx="47" cy="52" r="7" fill={C.ivory} />
    <path d="M36 78 C36 54 58 54 58 78 Z" fill={C.ivory} />
  </svg>
);
const Summit = () => (
  <svg width="92" height="84" viewBox="0 0 92 84">
    <path d="M4 80 L40 24 L58 50 L66 40 L88 80 Z" fill={C.goldLight} />
    <path d="M40 24 L48 36 L40 40 L32 36 Z" fill={C.ivory} />
    <path d="M40 24 V2" stroke={C.ivory} strokeWidth="4" />
    <path d="M40 2 L60 8 L40 14 Z" fill="#D9534F" />
  </svg>
);

// The "1": solid gold, with a growing plant on top.
const One: React.FC = () => (
  <div style={{ position: "relative", width: DIGIT.w, height: DIGIT.h }}>
    <svg width={DIGIT.w} height={DIGIT.h} viewBox={`0 0 ${DIGIT.w} ${DIGIT.h}`}>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.goldLight} />
          <stop offset="1" stopColor={C.gold} />
        </linearGradient>
      </defs>
      <path d="M64 6 H118 V294 H64 V70 L30 92 V40 Z" fill="url(#g1)" />
    </svg>
    <Plant />
  </div>
);

// A "0": an outlined ring with the thing it stands for inside.
const Zero: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "relative", width: DIGIT.w, height: DIGIT.h }}>
    <svg width={DIGIT.w} height={DIGIT.h} viewBox={`0 0 ${DIGIT.w} ${DIGIT.h}`} style={{ position: "absolute", inset: 0 }}>
      <rect x="18" y="18" width={DIGIT.w - 36} height={DIGIT.h - 36} rx={(DIGIT.w - 36) / 2} fill="none" stroke={C.ivory} strokeOpacity="0.9" strokeWidth="30" />
    </svg>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
  </div>
);

const ITEMS: { label: string; el: React.ReactNode }[] = [
  { label: "KERJA", el: <Briefcase /> },
  { label: "DUIT", el: <Coins /> },
  { label: "FAMILY", el: <Family /> },
  { label: "IMPIAN", el: <Summit /> },
];

export const SatuKosong: React.FC = () => {
  const head = font("Poppins");
  const body = font("Inter");
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 55%, ${C.forest} 0%, ${C.deep} 80%)`, color: C.ivory, fontFamily: body }}>
      <div style={{ position: "absolute", top: 56, left: 72, right: 72, fontSize: 24, fontWeight: 600, letterSpacing: 1 }}>
        <span style={{ color: C.goldLight, fontFamily: head, fontWeight: 700 }}>COACH NAS</span>
        <span style={{ opacity: 0.7 }}> · Clinical Pharmacist · Wellness Coach</span>
      </div>

      <div style={{ position: "absolute", top: 170, left: 0, right: 0, textAlign: "center", fontFamily: head, fontWeight: 800, fontSize: 92, lineHeight: 1.1, letterSpacing: -1 }}>
        Tanpa <span style={{ color: C.goldLight }}>“1”</span>,
        <br />
        semua jadi <span style={{ color: C.goldLight }}>“0”</span>.
      </div>

      {/* 1 0 0 0 0 */}
      <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <One />
          <div style={{ fontFamily: head, fontWeight: 800, fontSize: 26, letterSpacing: 1, color: C.goldLight }}>KESIHATAN</div>
        </div>
        {ITEMS.map((it) => (
          <div key={it.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
            <Zero>{it.el}</Zero>
            <div style={{ fontFamily: head, fontWeight: 700, fontSize: 26, letterSpacing: 1 }}>{it.label}</div>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", top: 1000, left: 96, right: 96, textAlign: "center", fontSize: 34, lineHeight: 1.45, fontWeight: 500 }}>
        Kerja, duit, family, impian. Semua ada nilai
        <br />
        bila <b style={{ color: C.goldLight }}>“1”</b> tu masih ada.
      </div>

      <div style={{ position: "absolute", top: 1150, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ background: C.gold, color: C.deep, borderRadius: 999, padding: "20px 44px", fontFamily: head, fontWeight: 800, fontSize: 38 }}>Jaga yang “1” dulu.</div>
      </div>

      <div style={{ position: "absolute", bottom: 52, left: 72, right: 72, display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 600 }}>
        <span style={{ opacity: 0.8 }}>@coachnas.pharmacist</span>
        <span style={{ opacity: 0.6 }}>#misifightobesiti</span>
      </div>
    </AbsoluteFill>
  );
};
