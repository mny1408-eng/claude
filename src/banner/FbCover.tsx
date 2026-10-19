// Facebook page cover, 1640×624 (Facebook's recommended upload size).
// Phones crop the sides and show roughly the middle 1110 px, so every key element sits inside SAFE_X.
// The photo lives in public/img (gitignored); swap PHOTO to use another one.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { font } from "../generator/fonts";

export const FB_COVER = { width: 1640, height: 624 };
const SAFE_X = [270, 1370];
const PHOTO = "img/goal-blazer.png";

const C = { forest: "#1C4A3E", deep: "#143A30", ivory: "#F9F6F0", gold: "#C9A84C", goldLight: "#E3C770" };

export const FbCover: React.FC = () => {
  const head = font("Poppins");
  const body = font("Inter");
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 70% 40%, ${C.forest} 0%, ${C.deep} 75%)`, fontFamily: body, color: C.ivory, overflow: "hidden" }}>
      {/* Decorative rings, mostly outside the mobile-safe zone */}
      <div style={{ position: "absolute", left: -180, top: -220, width: 620, height: 620, borderRadius: "50%", border: `2px solid ${C.gold}`, opacity: 0.22 }} />
      <div style={{ position: "absolute", right: -140, bottom: -260, width: 640, height: 640, borderRadius: "50%", border: `2px solid ${C.gold}`, opacity: 0.22 }} />
      <div style={{ position: "absolute", right: -60, top: 60, width: 220, height: 220, borderRadius: "50%", background: C.gold, opacity: 0.08 }} />

      {/* Text block */}
      <div style={{ position: "absolute", left: SAFE_X[0] + 30, top: 96, width: 680 }}>
        <div style={{ fontFamily: head, fontWeight: 700, fontSize: 20, letterSpacing: 3.5, color: C.goldLight, whiteSpace: "nowrap" }}>CLINICAL PHARMACIST · WELLNESS COACH</div>
        <div style={{ fontFamily: head, fontWeight: 800, fontSize: 104, lineHeight: 1, letterSpacing: -2, marginTop: 16, whiteSpace: "nowrap" }}>
          COACH <span style={{ color: C.goldLight }}>NAS</span>
        </div>
        <div style={{ width: 120, height: 5, borderRadius: 3, background: C.gold, margin: "22px 0 20px" }} />
        <div style={{ fontSize: 28, lineHeight: 1.35, fontWeight: 500, opacity: 0.95 }}>
          Urus berat badan dengan cara <b style={{ color: C.goldLight, fontWeight: 700 }}>tersusun</b>, untuk orang Malaysia yang busy.
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 26, alignItems: "center" }}>
          <div style={{ background: C.ivory, color: C.forest, borderRadius: 999, padding: "12px 26px", fontFamily: head, fontWeight: 700, fontSize: 24 }}>WeDo Transformations</div>
          <div style={{ border: `2px solid ${C.gold}`, color: C.goldLight, borderRadius: 999, padding: "10px 24px", fontFamily: head, fontWeight: 700, fontSize: 24 }}>#misifightobesiti</div>
        </div>
      </div>

      {/* Photo in a gold-edged arch */}
      <div style={{ position: "absolute", left: 1000, top: 52, width: 360, height: 572, borderRadius: "180px 180px 0 0", border: `3px solid ${C.gold}`, borderBottom: "none", padding: 12, boxSizing: "border-box" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "168px 168px 0 0", overflow: "hidden", background: "#DCDCD8" }}>
          <Img src={staticFile(PHOTO)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 0%", transform: "scale(1.45)", transformOrigin: "50% 4%" }} />
        </div>
      </div>

      <div style={{ position: "absolute", left: SAFE_X[0] + 30, top: 488, fontSize: 21, fontWeight: 600, letterSpacing: 1, opacity: 0.7 }}>@coachnas.pharmacist</div>
    </AbsoluteFill>
  );
};
