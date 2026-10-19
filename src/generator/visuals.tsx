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

const Label: React.FC<{ x: number; y: number; c: Brand["colors"]; children: string }> = ({ x, y, c, children }) => (
  <text x={x} y={y} fontSize="15" fontWeight="700" fill={c.ink} textAnchor="middle">
    {children}
  </text>
);

// Milk, yogurt, ikan bilis — everyday calcium sources (labels only, no amounts).
const CalciumFoods: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 260 182">
    <ellipse cx="130" cy="150" rx="120" ry="12" fill={c.line} />
    <path d="M28 40 h44 l-6 108 h-32 z" fill="#FFFFFF" stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
    <path d="M31 70 h38 l-4 78 h-30 z" fill="#FFFFFF" />
    <path d="M31 70 q19 -8 38 0" stroke={c.line} strokeWidth="4" fill="none" />
    <path d="M100 92 h60 l-6 56 h-48 z" fill="#FFFFFF" stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
    <rect x="96" y="82" width="68" height="12" rx="4" fill={c.orange} />
    <path d="M118 112 q12 -10 24 0" stroke={c.green} strokeWidth="5" fill="none" strokeLinecap="round" />
    <ellipse cx="212" cy="138" rx="40" ry="12" fill="#FFFFFF" stroke={c.ink} strokeWidth="4" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} transform={`translate(${192 + i * 9} ${128 + (i % 2) * 6}) rotate(${-20 + i * 12})`} d="M-10 0 q8 -5 18 0 l4 -3 v6 l-4 -3 q-10 5 -18 0 z" fill={c.muted} />
    ))}
    <Label x={50} y={176} c={c}>
      susu
    </Label>
    <Label x={130} y={176} c={c}>
      yogurt
    </Label>
    <Label x={212} y={176} c={c}>
      ikan bilis
    </Label>
  </svg>
);

// Stairs + walking figure: weight-bearing movement in daily life.
const WalkStairs: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 260 182">
    <path d="M20 170 h60 v-30 h50 v-30 h50 v-30 h60 v90 z" fill={c.green} opacity="0.35" />
    <path d="M20 170 h60 v-30 h50 v-30 h50 v-30 h60" stroke={c.ink} strokeWidth="5" fill="none" strokeLinejoin="round" />
    <circle cx="150" cy="40" r="13" fill={c.ink} />
    <path d="M150 54 l-6 34 M146 64 l-18 14 M148 64 l18 8 M144 88 l-14 22 M144 88 l12 20 l14 -2" stroke={c.ink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M70 70 h26 M62 84 h26 M74 98 h20" stroke={c.orange} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// Dumbbell + balance: strength and stability.
const StrengthBalance: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 260 182">
    <rect x="22" y="60" width="16" height="56" rx="5" fill={c.ink} />
    <rect x="40" y="70" width="12" height="36" rx="4" fill={c.ink} />
    <rect x="52" y="83" width="64" height="10" rx="5" fill={c.muted} />
    <rect x="116" y="70" width="12" height="36" rx="4" fill={c.ink} />
    <rect x="130" y="60" width="16" height="56" rx="5" fill={c.ink} />
    <circle cx="208" cy="36" r="13" fill={c.ink} />
    <path d="M208 50 v52 M208 62 l-30 -8 M208 62 l30 -8 M208 102 v52 M208 102 l24 18 l-6 18" stroke={c.ink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M160 160 h96" stroke={c.orange} strokeWidth="6" strokeLinecap="round" />
    <Label x={84} y={150} c={c}>
      kekuatan
    </Label>
    <Label x={208} y={180} c={c}>
      imbangan
    </Label>
  </svg>
);

// Quiet night: moon, stars, a lamp left on.
const Moon: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.8} viewBox="0 0 220 176">
    <path d="M120 24 a62 62 0 1 0 64 82 a50 50 0 1 1 -64 -82 z" fill={c.orange} />
    {[
      [40, 30],
      [196, 34],
      [28, 110],
      [170, 150],
    ].map(([x, y], i) => (
      <path key={i} transform={`translate(${x} ${y})`} d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill={c.cream} opacity="0.85" />
    ))}
  </svg>
);

// 30-second pause.
const Pause: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 220 154">
    <circle cx="110" cy="80" r="64" fill="#FFFFFF" stroke={c.ink} strokeWidth="6" />
    <path d="M110 80 L110 16 A64 64 0 0 1 110 144 Z" fill={c.green} opacity="0.55" />
    <rect x="100" y="4" width="20" height="10" rx="3" fill={c.ink} />
    <rect x="90" y="56" width="12" height="48" rx="4" fill={c.ink} />
    <rect x="118" y="56" width="12" height="48" rx="4" fill={c.ink} />
  </svg>
);

// Egg, yogurt, fruit with a few nuts — filling examples, no portions.
const SnackOptions: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.76} viewBox="0 0 260 198">
    <ellipse cx="130" cy="146" rx="120" ry="12" fill={c.line} />
    <ellipse cx="48" cy="112" rx="28" ry="36" fill="#FFFFFF" stroke={c.ink} strokeWidth="4" />
    <circle cx="48" cy="118" r="14" fill={c.orange} />
    <path d="M100 92 h60 l-6 52 h-48 z" fill="#FFFFFF" stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
    <rect x="96" y="82" width="68" height="12" rx="4" fill={c.green} />
    <circle cx="210" cy="112" r="28" fill="#D9534F" />
    <path d="M210 84 q4 -12 14 -14" stroke={c.ink} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M214 80 q14 -8 20 4 q-12 6 -20 -4 z" fill={c.green} />
    {[0, 1, 2].map((i) => (
      <ellipse key={i} cx={180 + i * 14} cy={142} rx="6" ry="4" fill="#B07A45" />
    ))}
    <Label x={48} y={174} c={c}>
      telur
    </Label>
    <Label x={130} y={174} c={c}>
      yogurt
    </Label>
    <Label x={210} y={174} c={c}>
      buah +
    </Label>
    <Label x={210} y={192} c={c}>
      kacang
    </Label>
  </svg>
);

// Warm drink + toothbrush: non-food ways to close the night.
const Tea: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 260 182">
    <path d="M70 40 q8 -14 0 -28 M96 40 q8 -14 0 -28" stroke={c.muted} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M40 54 h86 v58 a30 30 0 0 1 -30 30 h-26 a30 30 0 0 1 -30 -30 z" fill="#FFFFFF" stroke={c.ink} strokeWidth="5" />
    <path d="M126 70 h12 a18 18 0 0 1 0 36 h-12" stroke={c.ink} strokeWidth="5" fill="none" />
    <path d="M44 72 h78 v40 a26 26 0 0 1 -26 26 h-26 a26 26 0 0 1 -26 -26 z" fill={c.orange} opacity="0.6" />
    <rect x="182" y="40" width="14" height="110" rx="7" fill={c.green} transform="rotate(14 189 95)" />
    <rect x="186" y="30" width="22" height="30" rx="6" fill="#FFFFFF" stroke={c.ink} strokeWidth="4" transform="rotate(14 197 45)" />
    <ellipse cx="130" cy="164" rx="110" ry="10" fill={c.line} />
  </svg>
);

// Notepad with a blank line to fill in.
const Notepad: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 260 182">
    <rect x="50" y="14" width="150" height="160" rx="14" fill="#FFFFFF" stroke={c.ink} strokeWidth="5" />
    <rect x="50" y="14" width="150" height="26" rx="12" fill={c.green} />
    {[66, 94, 122].map((y) => (
      <line key={y} x1="70" y1={y} x2="180" y2={y} stroke={c.line} strokeWidth="5" strokeLinecap="round" />
    ))}
    <line x1="70" y1="150" x2="150" y2="150" stroke={c.orange} strokeWidth="5" strokeLinecap="round" strokeDasharray="8 8" />
    <rect x="196" y="70" width="14" height="96" rx="4" fill={c.orange} transform="rotate(28 203 118)" />
    <path d="M178 158 l10 14 l6 -16 z" fill={c.ink} transform="rotate(0)" />
  </svg>
);

// Kuih on a small plate: pick the dessert you really want.
const Dessert: React.FC<P> = ({ c, w }) => (
  <svg width={w} height={w * 0.7} viewBox="0 0 260 182">
    <ellipse cx="130" cy="140" rx="112" ry="26" fill="#FFFFFF" stroke={c.ink} strokeWidth="5" />
    <rect x="56" y="98" width="46" height="34" rx="6" fill={c.green} />
    <rect x="56" y="98" width="46" height="10" rx="4" fill="#FFFFFF" />
    <path d="M118 128 q0 -40 26 -40 q26 0 26 40 z" fill={c.orange} />
    <circle cx="144" cy="84" r="6" fill="#D9534F" />
    <rect x="180" y="100" width="40" height="30" rx="6" fill="#7A4A2A" />
    <path d="M180 108 h40 M180 118 h40" stroke="#E8C79A" strokeWidth="3" />
  </svg>
);

export const VisualArt: React.FC<{ v: Visual; c: Brand["colors"]; w: number }> = ({ v, c, w }) => {
  switch (v) {
    case "calcium-foods":
      return <CalciumFoods c={c} w={w} />;
    case "walk-stairs":
      return <WalkStairs c={c} w={w} />;
    case "strength-balance":
      return <StrengthBalance c={c} w={w} />;
    case "moon":
      return <Moon c={c} w={w} />;
    case "pause":
      return <Pause c={c} w={w} />;
    case "snack-options":
      return <SnackOptions c={c} w={w} />;
    case "tea":
      return <Tea c={c} w={w} />;
    case "notepad":
      return <Notepad c={c} w={w} />;
    case "dessert":
      return <Dessert c={c} w={w} />;
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
