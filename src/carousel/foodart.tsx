// Flat top-down food illustrations for recipe carousels, in the muted style of src/food.tsx.
// MealBox: meal-prep container split ½ sayur / ¼ karbo / ¼ protein. MarinadeDish: glass dish of marinated chicken.
import React from "react";

const OL = "rgba(23,60,48,0.30)";

// ---------- small parts ----------
const Leaf: React.FC<{ x: number; y: number; r: number; c?: string; s?: number }> = ({ x, y, r, c = "#7E9A68", s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <ellipse rx={34} ry={18} fill={c} stroke={OL} strokeWidth={1.5} />
    <path d="M -28 0 L 28 0" stroke="#B9CDA5" strokeWidth={2.5} strokeLinecap="round" />
  </g>
);
const Tomato: React.FC<{ x: number; y: number; r?: number; half?: boolean }> = ({ x, y, r = 16, half }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#C8604A" stroke={OL} strokeWidth={1.5} />
    {half ? (
      <>
        <circle cx={x} cy={y} r={r * 0.68} fill="#D9806A" />
        {[0, 120, 240].map((a) => (
          <ellipse key={a} cx={x + Math.cos((a * Math.PI) / 180) * r * 0.36} cy={y + Math.sin((a * Math.PI) / 180) * r * 0.36} rx={r * 0.18} ry={r * 0.12} fill="#F1D9A8" />
        ))}
      </>
    ) : (
      <ellipse cx={x - r * 0.35} cy={y - r * 0.35} rx={r * 0.3} ry={r * 0.2} fill="#E39A86" />
    )}
  </g>
);
const Cucumber: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 17 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#6C8A58" stroke={OL} strokeWidth={1.5} />
    <circle cx={x} cy={y} r={r * 0.82} fill="#DCE8C6" />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <circle key={a} cx={x + Math.cos((a * Math.PI) / 180) * r * 0.42} cy={y + Math.sin((a * Math.PI) / 180) * r * 0.42} r={1.8} fill="#B5C79A" />
    ))}
  </g>
);
const Broccoli: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-10, -6], [8, -10], [0, 6], [14, 6], [-14, 8]].map(([a, b], i) => (
      <circle key={i} cx={a} cy={b} r={12} fill={i % 2 ? "#5F7E4E" : "#6C8A58"} stroke={OL} strokeWidth={1.2} />
    ))}
  </g>
);
const Carrot: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 0 }) => (
  <rect x={x - 11} y={y - 9} width={22} height={18} rx={5} fill="#D98B4E" stroke={OL} strokeWidth={1.2} transform={`rotate(${r} ${x} ${y})`} />
);
const Dots: React.FC<{ pts: [number, number][]; c: string; r?: number }> = ({ pts, c, r = 6 }) => (
  <>
    {pts.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={c} stroke={OL} strokeWidth={1} />
    ))}
  </>
);
const EggHalf: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 0 }) => (
  <g transform={`rotate(${r} ${x} ${y})`}>
    <ellipse cx={x} cy={y} rx={30} ry={22} fill="#FBF7EE" stroke={OL} strokeWidth={1.5} />
    <circle cx={x + 2} cy={y} r={12} fill="#E7B54A" />
    <circle cx={x - 2} cy={y - 3} r={4} fill="#F0CB72" />
  </g>
);

// ---------- carbs (drawn into a ~150 × 130 cell, origin top-left) ----------
const Rice: React.FC = () => (
  <g>
    <ellipse cx={75} cy={65} rx={68} ry={56} fill="#F6F1E4" stroke={OL} strokeWidth={1.5} />
    {Array.from({ length: 46 }, (_, i) => {
      const a = i * 2.4;
      const d = 8 + ((i * 37) % 48);
      return <ellipse key={i} cx={75 + Math.cos(a) * d} cy={65 + Math.sin(a) * d * 0.8} rx={5} ry={2.4} fill="#FFFFFF" stroke="#E2DACA" strokeWidth={0.8} transform={`rotate(${(i * 47) % 180} ${75 + Math.cos(a) * d} ${65 + Math.sin(a) * d * 0.8})`} />;
    })}
  </g>
);
const Bread: React.FC = () => (
  <g>
    {[0, 1].map((k) => (
      <g key={k} transform={`translate(${8 + k * 26} ${10 + k * 18})`}>
        <path d="M 6 100 L 60 6 L 114 100 Z" fill="#C79A63" stroke={OL} strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M 18 92 L 60 18 L 102 92 Z" fill="#E6CDA2" />
        {k === 1 && (
          <>
            <path d="M 22 94 L 98 94" stroke="#7E9A68" strokeWidth={7} strokeLinecap="round" />
            <ellipse cx={46} cy={86} rx={13} ry={8} fill="#FBF7EE" />
            <circle cx={46} cy={86} r={5} fill="#E7B54A" />
            <ellipse cx={74} cy={86} rx={13} ry={8} fill="#FBF7EE" />
            <circle cx={74} cy={86} r={5} fill="#E7B54A" />
          </>
        )}
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={40 + ((i * 23) % 44)} cy={48 + ((i * 17) % 36)} r={1.6} fill="#B48852" />
        ))}
      </g>
    ))}
  </g>
);
const Potato: React.FC = () => (
  <g>
    <ellipse cx={75} cy={65} rx={64} ry={46} fill="#A9784A" stroke={OL} strokeWidth={1.5} />
    <path d="M 30 62 C 50 40, 100 40, 120 62 C 100 84, 50 84, 30 62 Z" fill="#F1D58E" />
    <path d="M 44 62 L 106 62" stroke="#E2B95C" strokeWidth={3} strokeLinecap="round" />
    {[[56, 54], [80, 70], [96, 56], [66, 72]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={2.4} fill="#5F7E4E" />
    ))}
  </g>
);
const Wrap: React.FC = () => (
  <g>
    {[0, 1].map((k) => (
      <g key={k} transform={`translate(${6 + k * 58} ${16 + k * 30})`}>
        <circle cx={40} cy={40} r={38} fill="#E8D3A8" stroke={OL} strokeWidth={1.5} />
        <circle cx={40} cy={40} r={30} fill="#7E9A68" />
        <circle cx={40} cy={40} r={22} fill="#D8B9A2" />
        <circle cx={32} cy={34} r={6} fill="#C8604A" />
        <circle cx={48} cy={46} r={5} fill="#DCE8C6" />
        <circle cx={46} cy={30} r={3} fill="#E7C24F" />
        {[[30, 50], [52, 36], [38, 44]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.6} fill="#B98F79" />
        ))}
      </g>
    ))}
  </g>
);

// ---------- proteins (cell ~150 × 130) ----------
const Eggs: React.FC = () => (
  <g>
    <EggHalf x={46} y={40} r={-12} />
    <EggHalf x={104} y={56} r={10} />
    <EggHalf x={56} y={96} r={6} />
  </g>
);
const Chicken: React.FC = () => (
  <g>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${10 + i * 6} ${10 + i * 27}) rotate(${-6 + i * 3} 65 18)`}>
        <path d="M 4 18 C 4 4, 30 0, 70 2 C 112 4, 132 10, 130 20 C 128 32, 100 38, 64 36 C 26 34, 4 30, 4 18 Z" fill="#A86A3C" stroke={OL} strokeWidth={1.5} />
        <path d="M 12 18 C 14 10, 40 8, 70 9 C 104 10, 120 14, 120 20 C 118 27, 96 30, 64 29 C 32 28, 12 25, 12 18 Z" fill="#EBD8BE" />
        {[30, 56, 82, 106].map((x) => (
          <path key={x} d={`M ${x} 6 L ${x + 12} 32`} stroke="#5E3A1E" strokeWidth={3.4} strokeLinecap="round" opacity={0.8} />
        ))}
      </g>
    ))}
  </g>
);
const Tuna: React.FC = () => (
  <g>
    <path d="M 18 70 C 10 30, 60 12, 96 22 C 140 34, 142 86, 112 104 C 80 124, 26 112, 18 70 Z" fill="#D9B9A6" stroke={OL} strokeWidth={1.5} />
    {Array.from({ length: 16 }, (_, i) => (
      <path key={i} d={`M ${30 + ((i * 29) % 90)} ${36 + ((i * 19) % 66)} q 6 -4 12 0`} stroke="#B98F79" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    ))}
    <Dots pts={[[50, 60], [96, 84]]} c="#E7C24F" r={4} />
    <Dots pts={[[80, 46], [60, 92]]} c="#9A6A86" r={4} />
  </g>
);
const Sardine: React.FC = () => (
  <g>
    <path d="M 10 70 C 8 26, 70 6, 118 24 C 150 38, 146 96, 112 112 C 70 128, 14 112, 10 70 Z" fill="#B94C36" stroke={OL} strokeWidth={1.5} />
    {[0, 1].map((k) => (
      <g key={k} transform={`translate(${26} ${38 + k * 36}) rotate(${-8 + k * 10})`}>
        <path d="M 0 12 C 20 -4, 70 -4, 92 12 C 70 28, 20 28, 0 12 Z" fill="#8C8F93" stroke={OL} strokeWidth={1.2} />
        <path d="M 6 10 C 30 4, 64 4, 86 10" stroke="#C7CBCF" strokeWidth={3} fill="none" />
        <path d="M 92 12 L 104 2 L 104 22 Z" fill="#8C8F93" />
      </g>
    ))}
    <Dots pts={[[30, 100], [112, 40], [124, 88], [66, 104]]} c="#D9806A" r={5} />
  </g>
);

const CARBS = { rice: Rice, bread: Bread, potato: Potato, wrap: Wrap };
const PROTEINS = { egg: Eggs, chicken: Chicken, tuna: Tuna, sardine: Sardine };

// Veg half (~ 300 × 270 cell).
const Veg: React.FC<{ kind: "salad" | "mixed" | "cuke" }> = ({ kind }) =>
  kind === "mixed" ? (
    <g>
      {[[60, 70], [190, 60], [120, 150], [240, 170], [70, 210]].map(([x, y], i) => (
        <Broccoli key={i} x={x} y={y} s={1.3} />
      ))}
      {[[120, 70, 20], [220, 110, -15], [60, 140, 40], [170, 220, 5], [260, 230, -30], [130, 220, 60]].map(([x, y, r], i) => (
        <Carrot key={i} x={x} y={y} r={r} />
      ))}
      <Dots pts={[[160, 110], [90, 110], [200, 160], [40, 180], [150, 180], [110, 250], [250, 90], [230, 40]]} c="#E7C24F" r={7} />
      <Dots pts={[[180, 120], [100, 180], [210, 200], [60, 100], [270, 140], [140, 110]]} c="#8BA873" r={7} />
    </g>
  ) : (
    <g>
      {[[70, 60, -20], [170, 50, 15], [250, 80, 50], [60, 160, 30], [150, 140, -10], [240, 190, -35], [110, 230, 10], [200, 240, 25]].map(([x, y, r], i) => (
        <Leaf key={i} x={x} y={y} r={r} c={i % 2 ? "#6C8A58" : "#8BA873"} s={1.1} />
      ))}
      {(kind === "salad"
        ? [[120, 90], [210, 130], [80, 200], [250, 240]]
        : [[90, 100], [200, 110], [140, 200], [250, 220], [60, 230]]
      ).map(([x, y], i) => (
        <Cucumber key={i} x={x} y={y} r={kind === "cuke" ? 22 : 18} />
      ))}
      {(kind === "salad" ? [[170, 70], [160, 200], [60, 110], [240, 160]] : [[150, 60], [250, 150], [100, 160]]).map(([x, y], i) => (
        <Tomato key={i} x={x} y={y} r={18} half={i % 2 === 0} />
      ))}
    </g>
  );

export type Meal = { carb: keyof typeof CARBS; protein: keyof typeof PROTEINS; veg: "salad" | "mixed" | "cuke" };

// Glass meal-prep container, top-down. Layout 640 × 360: left half sayur, right top karbo, right bottom protein.
export const MealBox: React.FC<{ meal: Meal; width?: number; labels?: boolean }> = ({ meal, width = 640, labels = true }) => {
  const Carb = CARBS[meal.carb];
  const Prot = PROTEINS[meal.protein];
  return (
    <svg viewBox="0 0 640 380" width={width} style={{ overflow: "visible" }}>
      <rect x={10} y={22} width={620} height={340} rx={46} fill="rgba(23,60,48,0.10)" />
      <rect x={4} y={10} width={620} height={340} rx={46} fill="#FFFFFF" stroke="#BFD0D6" strokeWidth={6} />
      <rect x={20} y={26} width={588} height={308} rx={34} fill="#F6F7F4" />
      <line x1={322} y1={36} x2={322} y2={324} stroke="#D7DFDE" strokeWidth={5} strokeLinecap="round" />
      <line x1={334} y1={180} x2={598} y2={180} stroke="#D7DFDE" strokeWidth={5} strokeLinecap="round" />
      <g transform="translate(20 34)">
        <Veg kind={meal.veg} />
      </g>
      <g transform="translate(392 30) scale(0.98)">
        <Carb />
      </g>
      <g transform="translate(392 186) scale(0.98)">
        <Prot />
      </g>
      {labels && (
        <g fontFamily="Inter, sans-serif" fontWeight={700} fontSize={19} letterSpacing={2}>
          {[
            [164, 382, "½ SAYUR"],
            [470, 382, "¼ KARBO · ¼ PROTEIN"],
          ].map(([x, y, t]) => (
            <text key={t as string} x={x as number} y={y as number} textAnchor="middle" fill="#7C967C">
              {t}
            </text>
          ))}
        </g>
      )}
    </svg>
  );
};

// ---------- marinade dish ----------
export type Glaze = { base: string; mid: string; speck: string; extra?: "lemon" | "chili" };

const Breast: React.FC<{ x: number; y: number; r: number; g: Glaze; seed: number }> = ({ x, y, r, g, seed }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <path d="M 0 40 C -4 8, 50 -6, 104 8 C 150 20, 172 50, 150 70 C 120 92, 10 84, 0 40 Z" fill={g.base} stroke={OL} strokeWidth={1.5} />
    <path d="M 0 40 C -4 8, 50 -6, 104 8 C 150 20, 160 56, 132 72 C 100 90, 10 84, 0 40 Z" fill="none" stroke={g.mid} strokeWidth={7} opacity={0.9} />
    <path d="M 26 26 C 50 12, 92 10, 120 22" stroke="#FFFFFF" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.35} />
    <path d="M 40 64 C 70 72, 110 70, 134 58" stroke={g.mid} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.6} />
    {Array.from({ length: 22 }, (_, i) => (
      <circle key={i} cx={14 + ((i * 41 + seed * 13) % 130)} cy={18 + ((i * 23 + seed * 7) % 54)} r={1.9} fill={g.speck} />
    ))}
    {Array.from({ length: 5 }, (_, i) => (
      <circle key={`g${i}`} cx={24 + ((i * 53 + seed * 11) % 110)} cy={26 + ((i * 31 + seed * 5) % 40)} r={4.2} fill="#F3E6C4" stroke={OL} strokeWidth={0.8} />
    ))}
  </g>
);

export const MarinadeDish: React.FC<{ glaze: Glaze; width?: number }> = ({ glaze, width = 360 }) => (
  <svg viewBox="0 0 400 330" width={width}>
    <rect x={12} y={22} width={380} height={300} rx={34} fill="rgba(23,60,48,0.10)" />
    <rect x={4} y={10} width={380} height={300} rx={34} fill="#FFFFFF" stroke="#BFD0D6" strokeWidth={6} />
    <rect x={20} y={26} width={348} height={268} rx={24} fill={glaze.mid} opacity={0.35} />
    <Breast x={36} y={40} r={-6} g={glaze} seed={1} />
    <Breast x={196} y={36} r={8} g={glaze} seed={2} />
    <Breast x={30} y={170} r={6} g={glaze} seed={3} />
    <Breast x={200} y={168} r={-8} g={glaze} seed={4} />
    {glaze.extra === "lemon" &&
      [[170, 150], [330, 260], [70, 270]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={22} fill="#E9C84A" stroke={OL} strokeWidth={1.5} />
          <circle cx={x} cy={y} r={17} fill="#F6E49A" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1={x} y1={y} x2={x + Math.cos((a * Math.PI) / 180) * 16} y2={y + Math.sin((a * Math.PI) / 180) * 16} stroke="#E9C84A" strokeWidth={2} />
          ))}
        </g>
      ))}
    {glaze.extra === "chili" &&
      [[170, 150], [340, 270], [60, 280]].map(([x, y], i) => (
        <path key={i} d={`M ${x - 20} ${y} C ${x - 10} ${y - 14}, ${x + 14} ${y - 12}, ${x + 22} ${y + 4} C ${x + 10} ${y + 6}, ${x - 8} ${y + 8}, ${x - 20} ${y} Z`} fill="#B94C36" stroke={OL} strokeWidth={1.2} />
      ))}
    {glaze.extra === undefined &&
      [[175, 152], [340, 270], [62, 282]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={16} ry={11} fill="#F3E6C4" stroke={OL} strokeWidth={1.2} />
          <path d={`M ${x} ${y - 10} L ${x} ${y + 10}`} stroke="#E0CFA2" strokeWidth={2} />
        </g>
      ))}
  </svg>
);

// Little spice bowl used as an ingredient icon.
export const SpiceBowl: React.FC<{ c: string; size?: number; speck?: string }> = ({ c, size = 46, speck }) => (
  <svg viewBox="0 0 50 50" width={size} height={size}>
    <circle cx={25} cy={25} r={22} fill="#FFFFFF" stroke="#D9D6CE" strokeWidth={2.5} />
    <circle cx={25} cy={25} r={15} fill={c} />
    {speck && [[20, 20], [30, 22], [24, 30], [31, 30], [18, 28]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.8} fill={speck} />)}
  </svg>
);
