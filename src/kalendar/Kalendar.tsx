// Monthly group-coaching calendar, 4:5 (1080 × 1350). Team brand: Misi Fight Obesiti.
// Data comes from scripts/kalendar.mjs (group-coaching/<YYYY-MM>/schedule.json) via --props.
import React from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile } from "remotion";
import sample from "../../group-coaching/2026-10/schedule.json";

// Poppins is bundled in public/fonts (OFL) so rendering never depends on Google Fonts being reachable.
const FONT = "KalendarPoppins";
if (typeof document !== "undefined") {
  const handle = delayRender("Poppins");
  Promise.all(
    ["500", "600", "700", "800"].map((w) =>
      new FontFace(FONT, `url(${staticFile(`fonts/Poppins-${w}.woff2`)}) format("woff2")`, { weight: w }).load().then((f) => document.fonts.add(f)),
    ),
  ).then(() => continueRender(handle));
}

type Entry = {
  date: string;
  dow: number;
  kind: "briefing" | "topic" | "timbang" | "timbangAkhir" | "reminder" | "rest" | "wrapup" | "close" | "free";
  day?: number;
  topic?: string;
  label?: string; // shorter text for the image (config.imageLabels)
  coach?: string;
  bell?: boolean;
  scale?: boolean;
};
export type KalendarProps = {
  title: string;
  team: string;
  programme: string;
  hashtag: string;
  year: number;
  monthIndex: number;
  coaches: { name: string; colour: string }[];
  coachee?: boolean; // coachee version: no coach names

  entries: Entry[];
};
export const KALENDAR_SAMPLE = sample as KalendarProps;

export const W = 1080;
export const H = 1350;
const PAD = 40;

const K = {
  page: "#FFFFFF",
  ink: "#173C30",
  soft: "#5E6E66",
  line: "#E3E8E5",
  muted: "#F4F6F5",
  accent: "#1F7A55",
  akhir: "#C8332B",
};
const HARI = ["ISNIN", "SELASA", "RABU", "KHAMIS", "JUMAAT", "SABTU", "AHAD"];

const Bell: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = "#D99A00" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6z" fill={color} />
    <circle cx="12" cy="19.5" r="2.2" fill={color} />
  </svg>
);
const Scale: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = K.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="17" rx="4" fill={color} />
    <rect x="7" y="7" width="10" height="5" rx="1.5" fill="#fff" />
    <path d="M12 9.5l2-1.6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const NoEntry: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#9AA5A0" />
    <rect x="6" y="10.4" width="12" height="3.2" rx="1" fill="#fff" />
  </svg>
);

const utc = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const isoOf = (d: Date) => d.toISOString().slice(0, 10);

const CoachTag: React.FC<{ name: string; colour: string }> = ({ name, colour }) => (
  <div
    style={{
      alignSelf: "flex-start",
      flexShrink: 0,
      background: colour,
      color: "#fff",
      fontSize: 15,
      fontWeight: 700,
      lineHeight: "24px",
      padding: "0 9px",
      borderRadius: 12,
      whiteSpace: "nowrap",
    }}
  >
    {name}
  </div>
);

const Cell: React.FC<{ date: Date; inMonth: boolean; e?: Entry; colourOf: (n: string) => string; height: number; names: boolean }> = ({
  date,
  inMonth,
  e,
  colourOf,
  height,
  names,
}) => {
  const rest = e?.kind === "rest" || (!e && date.getUTCDay() === 0 && inMonth);
  const akhir = e?.kind === "timbangAkhir";
  const close = e?.kind === "close";
  const bg = !inMonth && !e ? "transparent" : rest ? K.muted : close ? "#EAF5EF" : "#fff";
  const badge =
    e?.kind === "briefing" ? "BRIEFING" : e?.kind === "wrapup" ? "WRAP-UP" : e?.day ? `DAY ${e.day}` : close ? "PENUTUP" : null;
  const label =
    e?.kind === "timbang" ? "Timbang" : akhir ? "TIMBANG AKHIR" : rest ? "Tiada Topik" : e?.kind === "reminder" ? "Reminder Timbang Akhir" : e?.label ?? e?.topic;
  const long = (label?.length ?? 0) > 34;
  const tight = height < 170; // 6-row months
  const size = tight ? (long ? 12.5 : 15) : long ? 14 : 16;
  return (
    <div
      style={{
        height,
        background: bg,
        border: !inMonth && !e ? "none" : `1.5px solid ${akhir ? K.akhir : K.line}`,
        borderRadius: 12,
        padding: tight ? "6px 8px" : "8px 9px",
        display: "flex",
        flexDirection: "column",
        gap: tight ? 3 : 5,
        overflow: "hidden",
        opacity: !inMonth && !e ? 0.35 : 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: inMonth ? K.ink : K.soft }}>{date.getUTCDate()}</span>
        <span style={{ display: "flex", gap: 3 }}>
          {e?.bell && <Bell size={20} />}
          {e?.scale && <Scale size={20} color={akhir ? K.akhir : K.accent} />}
          {rest && <NoEntry size={20} />}
        </span>
      </div>
      {badge && (
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1, color: e?.day ? K.accent : K.soft }}>{badge}</div>
      )}
      {label && (
        <div
          style={{
            fontSize: size,
            fontWeight: akhir || e?.kind === "topic" ? 700 : 600,
            lineHeight: 1.2,
            minHeight: 0,
            overflow: "hidden",
            color: akhir ? K.akhir : rest ? K.soft : K.ink,
          }}
        >
          {label}
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0 }} />
      {names && e?.coach && (close ? <CoachTag name="Semua Coach" colour={K.ink} /> : <CoachTag name={e.coach} colour={colourOf(e.coach)} />)}
    </div>
  );
};

export const Kalendar: React.FC<KalendarProps> = (p) => {
  const byDate = new Map(p.entries.map((e) => [e.date, e]));
  const colourOf = (n: string) => p.coaches.find((c) => c.name === n)?.colour ?? K.ink;

  // Grid: Monday on/before the 1st → Sunday on/after the last day used (month end or last entry).
  const first = new Date(Date.UTC(p.year, p.monthIndex - 1, 1));
  const monthEnd = new Date(Date.UTC(p.year, p.monthIndex, 0));
  const lastEntry = utc(p.entries[p.entries.length - 1].date);
  const end = lastEntry > monthEnd ? lastEntry : monthEnd;
  const start = new Date(first.getTime() - ((first.getUTCDay() + 6) % 7) * 86400000);
  const days: Date[] = [];
  for (let d = start; d <= end || days.length % 7 !== 0; d = new Date(d.getTime() + 86400000)) days.push(d);
  const rows = days.length / 7;

  const HEADER = 214;
  const WEEKDAYS = 38;
  const FOOTER = 120;
  const GAP = 7;
  const gridH = H - HEADER - WEEKDAYS - FOOTER - 18;
  const cellH = Math.floor((gridH - GAP * (rows - 1)) / rows);

  return (
    <AbsoluteFill style={{ background: K.page, fontFamily: FONT, color: K.ink }}>
      {/* Header */}
      <div style={{ position: "absolute", top: 40, left: PAD, right: PAD }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, background: K.accent }} />
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 3, color: K.accent }}>
            {p.team.toUpperCase()} · {p.programme.toUpperCase()}
          </div>
        </div>
        <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.1, marginTop: 10, letterSpacing: -0.5 }}>{p.title}</div>
        {/* Legend */}
        <div style={{ display: "flex", gap: 28, marginTop: 18, fontSize: 17, fontWeight: 600, color: K.soft }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Bell /> Reminder Timbang
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Scale /> Timbang
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <NoEntry /> Tiada Topik
          </span>
        </div>
      </div>

      {/* Weekday header */}
      <div style={{ position: "absolute", top: HEADER, left: PAD, right: PAD, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: GAP }}>
        {HARI.map((h) => (
          <div key={h} style={{ textAlign: "center", fontSize: 15, fontWeight: 700, letterSpacing: 1.5, color: K.soft, lineHeight: `${WEEKDAYS - 8}px` }}>
            {h}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          top: HEADER + WEEKDAYS,
          left: PAD,
          right: PAD,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: GAP,
        }}
      >
        {days.map((d) => (
          <Cell key={isoOf(d)} date={d} inMonth={d.getUTCMonth() === p.monthIndex - 1} e={byDate.get(isoOf(d))} colourOf={colourOf} height={cellH} names={!p.coachee} />
        ))}
      </div>

      {/* Coach key (coach version only) + footer */}
      <div style={{ position: "absolute", bottom: 34, left: PAD, right: PAD }}>
        {!p.coachee && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 16 }}>
            {p.coaches.map((c) => (
              <CoachTag key={c.name} name={`Coach ${c.name}`} colour={c.colour} />
            ))}
          </div>
        )}
        <div style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: K.accent, letterSpacing: 0.5 }}>{p.hashtag}</div>
      </div>
    </AbsoluteFill>
  );
};
