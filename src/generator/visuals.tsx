// Simple flat SVG illustrations, coloured from the brand palette. No numbers or claims baked in.
import React from "react";
import type { Brand, Visual } from "./types";

type P = { c: Brand["colors"]; w: number };

const RiceBowl: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.86} viewBox="0 0 200 172">
    <path d="M60 30 q6 -14 0 -26 M100 26 q6 -14 0 -24 M140 30 q6 -14 0 -26" stroke={c.cream} strokeOpacity="0.5" strokeWidth="4" fill="none" strokeLinecap="round" />
    <ellipse cx="100" cy="74" rx="78" ry="34" fill="#FFFFFF" />
    {Array.from({ length: 34 }).map((_, i) => {
      const a = (i * 137.5 * Math.PI) / 180;
      const r = 8 + ((i * 7) % 60);
      const x = 100 + Math.cos(a) * r;
      const y = 70 + Math.sin(a) * r * 0.38;
      return <ellipse key={i} cx={x} cy={y} rx="5" ry="2.6" fill="#EFEADB" transform={`rotate(${(i * 40) % 180} ${x} ${y})`} />;
    })}
    <path d="M14 80 Q100 98 186 80 Q180 152 116 160 L84 160 Q20 152 14 80 Z" fill={c.orange} />
    <path d="M30 108 Q100 124 170 108" stroke={c.cream} strokeOpacity="0.55" strokeWidth="5" fill="none" />
    <rect x="70" y="158" width="60" height="10" rx="5" fill={c.orange} opacity="0.75" />
  </svg>
);

// Portion awareness gauge: kurang · cukup · lebih (no numbers on purpose).
const CalorieMeter: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 260 160">
    <path d="M30 140 A100 100 0 0 1 96 46" stroke={c.line} strokeWidth="26" fill="none" />
    <path d="M100 44 A100 100 0 0 1 160 44" stroke={c.green} strokeWidth="26" fill="none" />
    <path d="M164 46 A100 100 0 0 1 230 140" stroke={c.orange} strokeWidth="26" fill="none" />
    <line x1="130" y1="140" x2="136" y2="62" stroke={c.ink} strokeWidth="8" strokeLinecap="round" />
    <circle cx="130" cy="140" r="14" fill={c.ink} />
    <text x="40" y="158" fontSize="15" fontWeight="700" fill={c.muted} textAnchor="middle">kurang</text>
    <text x="130" y="22" fontSize="15" fontWeight="700" fill={c.ink} textAnchor="middle">cukup</text>
    <text x="222" y="158" fontSize="15" fontWeight="700" fill={c.muted} textAnchor="middle">lebih</text>
  </svg>
);

// Malaysian plate: ½ sayur, ¼ nasi, ¼ protein. Labels sit outside the rim.
const BalancedPlate: React.FC<P> = ({ c, w }) => {
  const R = 92;
  const cx = 120;
  const cy = 130;
  return (
    <svg width={w} height={(w * 262) / 240} viewBox="0 0 240 262">
      <circle cx={cx} cy={cy} r={R + 12} fill="#FFFFFF" stroke={c.line} strokeWidth="3" />
      <path d={`M${cx} ${cy} L${cx} ${cy - R} A${R} ${R} 0 0 0 ${cx} ${cy + R} Z`} fill={c.green} />
      <path d={`M${cx} ${cy} L${cx} ${cy - R} A${R} ${R} 0 0 1 ${cx + R} ${cy} Z`} fill="#F1ECDD" />
      <path d={`M${cx} ${cy} L${cx + R} ${cy} A${R} ${R} 0 0 1 ${cx} ${cy + R} Z`} fill={c.orange} />
      {[
        [72, 100],
        [84, 140],
        [62, 128],
        [94, 172],
        [70, 166],
      ].map(([x, y], i) => (
        <path key={i} transform={`translate(${x} ${y}) rotate(${i * 50})`} d="M-14 0 Q0 -10 14 0 Q0 10 -14 0 Z" fill="#5E9E4A" />
      ))}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 134 + ((i * 13) % 60);
        const y = 70 + ((i * 17) % 50);
        return <ellipse key={i} cx={x} cy={y} rx="5" ry="2.6" fill="#FFFFFF" transform={`rotate(${i * 30} ${x} ${y})`} />;
      })}
      <path d="M134 148 q30 -14 52 6 q-20 22 -52 -6 Z" fill="#C9692E" />
      <text x="196" y="18" fontSize="15" fontWeight="700" fill={c.ink} textAnchor="middle">¼ nasi</text>
      <text x="44" y="256" fontSize="15" fontWeight="700" fill={c.ink} textAnchor="middle">½ sayur</text>
      <text x="196" y="256" fontSize="15" fontWeight="700" fill={c.ink} textAnchor="middle">¼ protein</text>
    </svg>
  );
};

const Card: React.FC<{ c: Brand["colors"]; label: string; bg: string; children: React.ReactNode; s: number }> = ({ c, label, bg, children, s }) => (
  <div style={{ width: s, background: bg, borderRadius: 28, padding: "26px 10px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
    <svg width={s * 0.55} height={s * 0.55} viewBox="0 0 100 100">
      {children}
    </svg>
    <div style={{ fontSize: 26, fontWeight: 700, color: c.ink, textAlign: "center", lineHeight: 1.15 }}>{label}</div>
  </div>
);

const Lifestyle: React.FC<P> = ({ c, w }) => {
  const s = (w - 40) / 3;
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Card c={c} s={s} bg="#FFFFFF" label="Kerja busy">
        <rect x="14" y="22" width="72" height="46" rx="6" fill={c.ink} />
        <rect x="20" y="28" width="60" height="34" rx="3" fill={c.green} />
        <rect x="6" y="70" width="88" height="8" rx="4" fill={c.ink} />
      </Card>
      <Card c={c} s={s} bg="#FFFFFF" label="Family dinner">
        <circle cx="30" cy="34" r="12" fill={c.orange} />
        <circle cx="70" cy="34" r="12" fill={c.ink} />
        <circle cx="50" cy="48" r="9" fill={c.green} />
        <path d="M14 78 q16 -30 32 0 Z M54 78 q16 -30 32 0 Z" fill={c.ink} opacity="0.85" />
        <path d="M38 84 q12 -22 24 0 Z" fill={c.green} />
      </Card>
      <Card c={c} s={s} bg="#FFFFFF" label="Makan luar">
        <path d="M14 40 L86 40 L80 30 L20 30 Z" fill={c.orange} />
        <rect x="18" y="40" width="64" height="40" fill="#FFFFFF" stroke={c.ink} strokeWidth="4" />
        <rect x="40" y="56" width="20" height="24" fill={c.ink} />
        <path d="M14 30 h72 v-10 h-72 z" fill={c.ink} />
      </Card>
    </div>
  );
};

const Save: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill={c.orange} />
    <path d="M34 24 h32 a4 4 0 0 1 4 4 v48 l-20 -13 l-20 13 v-48 a4 4 0 0 1 4 -4 z" fill={c.cream} />
  </svg>
);

export const VisualArt: React.FC<{ v: Visual; c: Brand["colors"]; w: number }> = ({ v, c, w }) => {
  switch (v) {
    case "rice-bowl":
      return <RiceBowl c={c} w={w} />;
    case "calorie-meter":
      return <CalorieMeter c={c} w={w} />;
    case "balanced-plate":
      return <BalancedPlate c={c} w={w} />;
    case "lifestyle":
      return <Lifestyle c={c} w={w} />;
    case "save":
      return <Save c={c} w={w} />;
    default:
      throw new Error(`Unknown visual "${v as string}"`);
  }
};
