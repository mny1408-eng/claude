// Hand-drawn style food stickers (SVG, white die-cut border) for the "Healthy, unhealthy atau nampak je healthy?" game.
import React from "react";

const Die: React.FC<{ size: number; children: React.ReactNode }> = ({ size, children }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: "visible", filter: "drop-shadow(0 0 0 #fff) drop-shadow(0 10px 18px rgba(20,30,20,0.35))" }}>
    <g style={{ filter: "drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 5px 0 #fff) drop-shadow(0 -5px 0 #fff)" }}>{children}</g>
  </svg>
);

export const NasiLemak: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <Die size={size}>
    {/* banana leaf */}
    <ellipse cx={100} cy={118} rx={92} ry={62} fill="#3E8E4E" />
    <path d="M 12 118 Q 100 100 188 118" stroke="#2C6B39" strokeWidth={3} fill="none" />
    {/* rice dome */}
    <path d="M 52 120 Q 52 62 100 60 Q 148 62 148 120 Z" fill="#FBFAF4" />
    <path d="M 70 92 q 4 -3 8 0 M 96 78 q 4 -3 8 0 M 120 96 q 4 -3 8 0" stroke="#E7E3D4" strokeWidth={3} fill="none" />
    {/* sambal */}
    <ellipse cx={142} cy={128} rx={30} ry={16} fill="#C8321F" />
    <ellipse cx={136} cy={124} rx={10} ry={4} fill="#E2533B" />
    {/* egg half */}
    <ellipse cx={58} cy={134} rx={24} ry={16} fill="#fff" stroke="#EDE8DA" strokeWidth={2} />
    <circle cx={58} cy={134} r={9} fill="#F2B632" />
    {/* cucumber */}
    <circle cx={100} cy={150} r={11} fill="#BFD98A" stroke="#4E8A3A" strokeWidth={3} />
    <circle cx={122} cy={154} r={10} fill="#BFD98A" stroke="#4E8A3A" strokeWidth={3} />
    {/* anchovies & peanuts */}
    <path d="M 78 158 q 6 -4 12 0 M 82 166 q 6 -4 12 0" stroke="#B9852F" strokeWidth={4} strokeLinecap="round" fill="none" />
    <ellipse cx={150} cy={150} rx={5} ry={7} fill="#D9A45B" />
    <ellipse cx={160} cy={144} rx={5} ry={7} fill="#D9A45B" />
  </Die>
);

export const GranolaBar: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <Die size={size}>
    <g transform="rotate(-14 100 100)">
      {/* wrapper */}
      <rect x={18} y={70} width={164} height={64} rx={8} fill="#2F6E9E" />
      <path d="M 18 70 l -8 8 l 8 8 l -8 8 l 8 8 l -8 8 l 8 8 l -8 8 l 8 8 Z" fill="#2F6E9E" />
      <rect x={18} y={70} width={70} height={64} rx={6} fill="#2F6E9E" />
      {/* bar peeking out */}
      <rect x={88} y={76} width={98} height={52} rx={8} fill="#C9934D" />
      {[...Array(14)].map((_, i) => (
        <ellipse key={i} cx={96 + (i % 7) * 13} cy={88 + Math.floor(i / 7) * 22} rx={5} ry={3.5} fill={i % 3 ? "#E8C68B" : "#8A5A2B"} transform={`rotate(${i * 25} ${96 + (i % 7) * 13} ${88 + Math.floor(i / 7) * 22})`} />
      ))}
      <text x={52} y={108} textAnchor="middle" fontSize={20} fontWeight={800} fill="#fff" fontFamily="Poppins, sans-serif">
        GRANOLA
      </text>
    </g>
  </Die>
);

export const FruitJuice: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <Die size={size}>
    {/* glass */}
    <path d="M 62 52 L 138 52 L 128 180 L 72 180 Z" fill="#DDEEF3" />
    <path d="M 66 76 L 134 76 L 128 176 L 72 176 Z" fill="#F7A21B" />
    <path d="M 70 84 L 80 84 L 78 168 L 74 168 Z" fill="#FFD27A" opacity={0.8} />
    {/* straw */}
    <path d="M 112 76 L 128 18 L 150 18" stroke="#E2533B" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* orange slice */}
    <circle cx={140} cy={60} r={24} fill="#F7A21B" />
    <circle cx={140} cy={60} r={18} fill="#FFC85A" />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <line key={a} x1={140} y1={60} x2={140 + 18 * Math.cos((a * Math.PI) / 180)} y2={60 + 18 * Math.sin((a * Math.PI) / 180)} stroke="#F7A21B" strokeWidth={2} />
    ))}
  </Die>
);

export const OvernightOats: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <Die size={size}>
    {/* jar */}
    <rect x={52} y={44} width={96} height={20} rx={6} fill="#B9B4A6" />
    <path d="M 48 64 L 152 64 L 148 176 Q 148 184 140 184 L 60 184 Q 52 184 52 176 Z" fill="#E9F1F3" />
    {/* layers */}
    <path d="M 54 150 L 146 150 L 146 176 Q 146 180 140 180 L 60 180 Q 54 180 54 176 Z" fill="#F1E3C6" />
    <path d="M 54 116 L 146 116 L 146 150 L 54 150 Z" fill="#E7D2A8" />
    <path d="M 54 100 L 146 100 L 146 116 L 54 116 Z" fill="#B5305A" opacity={0.85} />
    <path d="M 54 80 L 146 80 L 146 100 L 54 100 Z" fill="#F4ECD8" />
    {/* toppings */}
    <circle cx={78} cy={76} r={9} fill="#4B3B8F" />
    <circle cx={96} cy={72} r={8} fill="#4B3B8F" />
    <circle cx={116} cy={76} r={9} fill="#D23A4B" />
    <path d="M 128 64 q 10 -18 20 0 q -10 6 -20 0 Z" fill="#F2D24B" />
    {[...Array(9)].map((_, i) => (
      <ellipse key={i} cx={64 + (i % 5) * 18} cy={128 + Math.floor(i / 5) * 14} rx={4} ry={2.5} fill="#C9A66B" />
    ))}
  </Die>
);
