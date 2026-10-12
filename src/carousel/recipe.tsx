// Shared pieces for recipe / menu carousels (ivory template).
import React from "react";
import { HEAD, Headline, Kicker, Pad, Sage, Slide, T } from "./template";

export const Chip: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ flex: 1, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 18, padding: "16px 18px" }}>
    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 3, color: T.sage }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 600, marginTop: 6, lineHeight: 1.25 }}>{value}</div>
  </div>
);

export const TipBox: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title = "TIP COACH NAS" }) => (
  <div style={{ background: T.sageSoft, borderLeft: `8px solid ${T.sage}`, borderRadius: 14, padding: "22px 30px" }}>
    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, color: T.sage, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 31, lineHeight: 1.38, fontWeight: 600 }}>{children}</div>
  </div>
);

export const Ingredients: React.FC<{ items: [string, string][] }> = ({ items }) => (
  <div style={{ background: "#fff", border: "3px solid #E6E5E0", borderRadius: 20, padding: "8px 30px" }}>
    {items.map(([name, qty], i) => (
      <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, padding: "13px 0", borderTop: i ? `2px dashed ${T.rule}` : undefined }}>
        <div style={{ fontSize: 30, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 28, color: T.textSoft, whiteSpace: "nowrap" }}>{qty}</div>
      </div>
    ))}
  </div>
);

export const BigIndex: React.FC<{ n: string }> = ({ n }) => (
  <div style={{ position: "absolute", top: 150, right: 70, fontFamily: HEAD, fontWeight: 700, fontSize: 300, color: T.sageSoft, lineHeight: 1 }}>{n}</div>
);

export const RecipeSlide: React.FC<{
  index: number;
  total: number;
  n?: string;
  kicker: string;
  title: React.ReactNode;
  sub: string;
  children: React.ReactNode;
}> = ({ index, total, n, kicker, title, sub, children }) => (
  <Slide index={index} total={total}>
    <Pad top={170}>
      <Kicker>{kicker}</Kicker>
      <Headline size={96}>{title}</Headline>
      <div style={{ fontSize: 30, color: T.textSoft, marginTop: 14 }}>{sub}</div>
    </Pad>
    <div style={{ position: "absolute", top: 470, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 18 }}>{children}</div>
  </Slide>
);

export { Sage };
