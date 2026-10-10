// Coded replica of the Canva "Coach Nas — Educational Carousel Master Template v2":
// ivory page, "COACH NAS | CLINICAL PHARMACIST" header + handle, condensed charcoal headline with
// sage emphasis, round portrait, footer bar with SIMPAN · SWIPE, page dots and the WDT logo.
// Size follows the Notion production lock: portrait 3:4, 1080 × 1440.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadBarlow } from "@remotion/google-fonts/BarlowCondensed";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const { fontFamily: HEAD } = loadBarlow("normal", { weights: ["600", "700"], subsets: ["latin"] });
export const { fontFamily: BODY } = loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });

// Sampled from the exported template.
export const T = {
  page: "#FDFCF8",
  text: "#2F2F2F",
  textSoft: "#5A5A5A",
  sage: "#7C967C",
  sageSoft: "#E8EEE6",
  rule: "#ADBBAC",
  footer: "#F3F2EF",
  dot: "#D6D5D2",
  dotOn: "#7D9C85",
  ring: "#1F4A3A",
  gold: "#EAD49C",
};

// True when a slide is rendered inside a Reel (no swiping in video).
export const ReelMode = React.createContext(false);

export const W = 1080;
export const H = 1440;
const FOOTER = 162;

// WDT logo (footer size 226 × 104), cropped from a rendered master-template slide kept in git history.
const WdtLogo: React.FC = () => <Img src={staticFile("brand/wdt-logo.png")} style={{ width: 226, height: 104, display: "block" }} />;

export const Portrait: React.FC<{ size?: number }> = ({ size = 190 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", border: `5px solid ${T.ring}`, overflow: "hidden", background: "#fff" }}>
    <Img src={staticFile("img/coach-nas.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%" }} />
  </div>
);

export const Slide: React.FC<{ index: number; total: number; children: React.ReactNode; last?: boolean; lastLabel?: string; saveLabel?: string }> = ({
  index,
  total,
  children,
  last,
  lastLabel = "SIMPAN POST NI",
  saveLabel = "SIMPAN",
}) => (
  <AbsoluteFill style={{ background: T.page, fontFamily: BODY, color: T.text }}>
    {/* Header */}
    <div style={{ position: "absolute", top: 58, left: 52, right: 52, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <div style={{ fontSize: 27, letterSpacing: 0.5 }}>
        <span style={{ color: T.sage, fontWeight: 700 }}>COACH NAS</span>
        <span style={{ color: T.text, fontWeight: 500 }}> | CLINICAL PHARMACIST</span>
      </div>
      <div style={{ fontSize: 24, color: "#9A9A9A" }}>@coachnas.pharmacist</div>
    </div>
    <div style={{ position: "absolute", top: 112, left: 52, right: 52, height: 2, background: "#E6E5E0" }} />

    {children}

    {/* Footer */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: FOOTER, background: T.footer, display: "flex", alignItems: "center", padding: "0 30px 0 64px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 23, letterSpacing: 3, color: "#444", width: 400, whiteSpace: "nowrap" }}>
        {last ? (
          <>
            <svg viewBox="0 0 24 30" width={20} height={26}>
              <path d="M 2 2 H 22 V 28 L 12 20 L 2 28 Z" fill={T.sage} />
            </svg>
            {lastLabel}
          </>
        ) : (
          <>
            {saveLabel} <span style={{ color: T.dot }}>•</span> <SwipeOrFollow />
            <svg viewBox="0 0 40 20" width={38} height={20}>
              <path d="M 2 10 H 36 M 28 3 L 36 10 L 28 17" fill="none" stroke={T.sage} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </div>
      <div style={{ flex: 1, display: "flex", gap: 18, justifyContent: "center", alignItems: "center" }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 20 : 16,
              height: i === index ? 20 : 16,
              borderRadius: "50%",
              background: i === index ? T.dotOn : T.dot,
              boxShadow: i === index ? `0 0 0 6px ${T.sageSoft}` : undefined,
            }}
          />
        ))}
      </div>
      <WdtLogo />
    </div>
  </AbsoluteFill>
);

export const Headline: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 112, style }) => (
  <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: size, lineHeight: 1.0, textTransform: "uppercase", letterSpacing: 0.5, color: T.text, ...style }}>
    {children}
  </div>
);

export const Sage: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: T.sage }}>{children}</span>;

export const Rule: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ width: 80, height: 4, background: T.rule, ...style }} />
);

export const Body: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 40, style }) => (
  <div style={{ fontSize: size, lineHeight: 1.35, color: T.text, ...style }}>{children}</div>
);

export const B: React.FC<{ children: React.ReactNode; sage?: boolean }> = ({ children, sage }) => (
  <strong style={{ fontWeight: 700, color: sage ? T.sage : T.text }}>{children}</strong>
);

// Callout row like the template's shield note: soft circle icon + text.
export const Callout: React.FC<{ icon: React.ReactNode; children: React.ReactNode; style?: React.CSSProperties }> = ({ icon, children, style }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 30, ...style }}>
    <div style={{ width: 104, height: 104, flex: "none", borderRadius: "50%", background: "#EEF0EA", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
    <div style={{ fontSize: 32, lineHeight: 1.4, color: T.text }}>{children}</div>
  </div>
);

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 52, color = T.sage }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2 L20 5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5 Z" fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M8.5 12 L11 14.5 L15.5 9.5" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------- Shared blocks for daily carousels ----------

export const Pad: React.FC<{ top: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ top, children, style }) => (
  <div style={{ position: "absolute", top, left: 104, right: 104, ...style }}>{children}</div>
);

export const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 28, fontWeight: 700, color: T.sage, letterSpacing: 4, marginBottom: 24, textTransform: "uppercase" }}>{children}</div>
);

// Big faint number behind a step/question headline.
export const BigNum: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", top: 150, right: 70, fontSize: 340, fontWeight: 700, color: T.sageSoft, lineHeight: 1 }}>{children}</div>
);

export const Chip: React.FC<{ children: React.ReactNode; on?: boolean; muted?: boolean }> = ({ children, on, muted }) => (
  <div
    style={{
      padding: "18px 30px",
      borderRadius: 999,
      background: on ? T.sageSoft : "#fff",
      border: `2px solid ${on ? T.sage : T.rule}`,
      fontSize: 34,
      fontWeight: 600,
      color: muted ? "#9A9A9A" : T.text,
      textDecoration: muted ? "line-through" : undefined,
    }}
  >
    {children}
  </div>
);

export const Chips: React.FC<{ items: string[]; style?: React.CSSProperties }> = ({ items, style }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 18, ...style }}>
    {items.map((c) => (
      <Chip key={c}>{c}</Chip>
    ))}
  </div>
);

// Progress strip across the value slides: ticks for done steps, soft highlight on the current one.
export const StepStrip: React.FC<{ items: string[]; done: number; active?: number; flow?: boolean }> = ({ items, done, active, flow }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "2px solid #E6E5E0", borderRadius: 16, padding: "16px 20px" }}>
    {items.map((k, i) => {
      const ticked = i < done;
      const lit = ticked || i === active;
      return (
        <React.Fragment key={k}>
          {flow && i > 0 && (
            <svg viewBox="0 0 20 20" width={18} height={18}>
              <path d="M 4 10 H 15 M 11 6 L 15 10 L 11 14" fill="none" stroke={lit ? T.sage : T.dot} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: i === active ? T.sageSoft : "transparent" }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, border: `3px solid ${lit ? T.sage : T.dot}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {ticked && (
                <svg viewBox="0 0 20 20" width={22} height={22}>
                  <path d="M4 10.5 L8.5 15 L16 5.5" fill="none" stroke={T.sage} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div style={{ fontSize: 23, fontWeight: 600, color: lit ? T.text : "#9A9A9A" }}>{k}</div>
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

// Highlighted action box for the final CTA slide.
export const CtaBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: T.ring, color: T.page, borderRadius: 22, padding: "38px 44px", fontSize: 38, lineHeight: 1.35 }}>{children}</div>
);

// Blank writing line for screenshot/save cards.
export const WriteLine: React.FC<{ label?: string }> = ({ label }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginTop: 26 }}>
    {label && <div style={{ fontSize: 28, fontWeight: 600, color: T.textSoft, whiteSpace: "nowrap" }}>{label}</div>}
    <div style={{ flex: 1, borderBottom: `3px dashed ${T.rule}`, height: 40 }} />
  </div>
);

const SwipeOrFollow: React.FC = () => (React.useContext(ReelMode) ? <>FOLLOW</> : <>SWIPE</>);
