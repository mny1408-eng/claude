// Flat editorial food illustrations for the Food Editorial reels. Muted, desaturated colours
// so food reads as imagery, not as extra accent colours. No numbers or labels baked in.
import React from "react";

type P = { width?: number; style?: React.CSSProperties };

const OUTLINE = "rgba(23,60,48,0.35)";

export const Drumstick: React.FC<P> = ({ width = 220, style }) => (
  <svg viewBox="0 0 220 130" width={width} style={style}>
    <path d="M 150 62 L 192 44" stroke="#EFE6D6" strokeWidth={16} strokeLinecap="round" />
    <circle cx={198} cy={36} r={12} fill="#F4ECDF" stroke={OUTLINE} strokeWidth={2} />
    <circle cx={206} cy={50} r={11} fill="#F4ECDF" stroke={OUTLINE} strokeWidth={2} />
    <path d="M 14 72 C 10 30, 90 8, 138 38 C 160 52, 162 76, 144 90 C 110 118, 22 116, 14 72 Z" fill="#B97A45" stroke={OUTLINE} strokeWidth={2} />
    <path d="M 36 60 C 48 40, 92 30, 118 44" fill="none" stroke="#D39A62" strokeWidth={8} strokeLinecap="round" opacity={0.8} />
    {[[40, 84], [62, 96], [88, 92], [110, 80], [70, 70], [96, 62], [50, 72]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={4} fill="#98602F" opacity={0.7} />
    ))}
  </svg>
);

export const Greens: React.FC<P> = ({ width = 220, style }) => {
  const leaves: [number, number, number, string][] = [
    [70, 70, -30, "#7E9A68"],
    [120, 58, 10, "#6C8A58"],
    [160, 80, 40, "#8BA873"],
    [96, 100, -5, "#6C8A58"],
    [140, 108, 25, "#7E9A68"],
  ];
  return (
    <svg viewBox="0 0 220 160" width={width} style={style}>
      {leaves.map(([x, y, r, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx={46} ry={24} fill={c} stroke={OUTLINE} strokeWidth={2} />
          <path d="M -40 0 L 40 0" stroke="#B9CDA5" strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
};

// Rice mound; `amount` 0..1 scales it from nothing to a full-plate heap.
export const Rice: React.FC<P & { amount?: number }> = ({ width = 300, amount = 1, style }) => {
  const grains: [number, number, number][] = [];
  for (let i = 0; i < 46; i++) {
    const a = (i * 137.5 * Math.PI) / 180;
    const rr = Math.sqrt(i / 46);
    grains.push([150 + Math.cos(a) * rr * 110, 95 + Math.sin(a) * rr * 58, (i * 47) % 180]);
  }
  return (
    <svg viewBox="0 0 300 190" width={width} style={{ overflow: "visible", ...style }}>
      <g style={{ transform: `scale(${amount})`, transformOrigin: "150px 95px" }}>
        <ellipse cx={150} cy={95} rx={132} ry={76} fill="#FFFDF6" stroke="#D3C8B0" strokeWidth={4} />
        {grains.map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx={7} ry={3} fill="#E3D9C3" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
};

export const Plate: React.FC<{ size?: number; children?: React.ReactNode }> = ({ size = 600, children }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: "#FFFFFF",
        boxShadow: "0 18px 40px rgba(40,40,20,0.20), inset 0 0 0 3px #EEE9DD",
      }}
    />
    <div style={{ position: "absolute", inset: "9%", borderRadius: "50%", boxShadow: "inset 0 0 0 3px #EEE9DD" }} />
    {children}
  </div>
);

// Stainless-steel lauk tray with simple contents.
type Lauk = "ayam" | "sayur" | "kari" | "telur" | "ikan" | "sambal";

const TrayFill: React.FC<{ kind: Lauk }> = ({ kind }) => {
  switch (kind) {
    case "ayam":
      return (
        <>
          <g transform="translate(18 34) scale(0.5)"><Drumstick /></g>
          <g transform="translate(120 70) scale(0.45) rotate(-14)"><Drumstick /></g>
        </>
      );
    case "sayur":
      return <g transform="translate(40 20) scale(0.85)"><Greens /></g>;
    case "kari":
      return (
        <>
          <ellipse cx={130} cy={92} rx={110} ry={62} fill="#C98B45" />
          {[[90, 80], [140, 100], [170, 72], [110, 112]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={30} height={22} rx={8} fill="#E3C28F" />
          ))}
        </>
      );
    case "telur":
      return (
        <>
          {[[70, 80], [150, 70], [110, 118], [190, 116]].map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx={34} ry={26} fill="#FBF7EE" stroke={OUTLINE} strokeWidth={2} />
              <circle cx={x} cy={y} r={13} fill="#E7B54F" />
            </g>
          ))}
        </>
      );
    case "ikan":
      return (
        <>
          {[[60, 70], [70, 120]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <ellipse cx={70} cy={0} rx={70} ry={22} fill="#A07A58" stroke={OUTLINE} strokeWidth={2} />
              <path d="M 136 0 L 168 -20 L 168 20 Z" fill="#8C6A4B" />
              <circle cx={24} cy={-4} r={4} fill="#3A2A1C" />
            </g>
          ))}
        </>
      );
    case "sambal":
      return (
        <>
          <ellipse cx={130} cy={92} rx={110} ry={62} fill="#A94A34" />
          {[[80, 80], [130, 100], [175, 78], [110, 70]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx={16} ry={9} fill="#C66A4B" />
          ))}
        </>
      );
  }
};

export const Tray: React.FC<{ kind: Lauk; width?: number }> = ({ kind, width = 270 }) => (
  <svg viewBox="0 0 260 184" width={width}>
    <rect x={2} y={2} width={256} height={180} rx={22} fill="#CDD1D1" stroke="#AEB4B4" strokeWidth={3} />
    <rect x={14} y={14} width={232} height={156} rx={16} fill="#DDE0E0" />
    <TrayFill kind={kind} />
  </svg>
);

export const Cup: React.FC<P> = ({ width = 90, style }) => (
  <svg viewBox="0 0 90 120" width={width} style={style}>
    <path d="M 58 4 L 50 40" stroke="#C0613E" strokeWidth={6} strokeLinecap="round" />
    <path d="M 12 30 L 78 30 L 70 114 L 20 114 Z" fill="#D9B58A" stroke={OUTLINE} strokeWidth={2} />
    <path d="M 16 50 L 74 50" stroke="#F2E6D2" strokeWidth={6} />
  </svg>
);

export const Bowl: React.FC<P> = ({ width = 110, style }) => (
  <svg viewBox="0 0 110 80" width={width} style={style}>
    <ellipse cx={55} cy={22} rx={50} ry={14} fill="#C98B45" />
    <path d="M 5 22 C 8 70, 102 70, 105 22" fill="#FFFFFF" stroke={OUTLINE} strokeWidth={2} />
    <ellipse cx={55} cy={22} rx={50} ry={14} fill="none" stroke={OUTLINE} strokeWidth={2} />
  </svg>
);
