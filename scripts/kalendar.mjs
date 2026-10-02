// Monthly group-coaching calendar (Misi Fight Obesiti).
// Rules + coaches + topics live in group-coaching/config.json; this file only applies them.
//
//   node scripts/kalendar.mjs 2026-11            → schedule JSON + WhatsApp text
//   node scripts/kalendar.mjs 2026-11 --render   → also renders the 4:5 PNG
//   node scripts/kalendar.mjs next --render      → next calendar month (used by the GitHub Action)
// Anything after "--" is passed to `remotion still` (e.g. -- --browser-executable=/path/chrome).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "group-coaching");
const config = JSON.parse(fs.readFileSync(path.join(DIR, "config.json"), "utf8"));

export const BULAN = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
const HARI = ["Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Ahd"];

// Dates are UTC-only so the runner's timezone never shifts a day.
const mkDate = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
const addDays = (dt, n) => new Date(dt.getTime() + n * 86400000);
const iso = (dt) => dt.toISOString().slice(0, 10);
const dow = (dt) => (dt.getUTCDay() + 6) % 7; // 0 = Isnin … 6 = Ahad
const FRI = 4;
const SAT = 5;
const SUN = 6;

function parseMonth(s) {
  if (s === "next") {
    const now = new Date();
    const n = mkDate(now.getUTCFullYear(), now.getUTCMonth() + 2, 1);
    return [n.getUTCFullYear(), n.getUTCMonth() + 1];
  }
  const m = /^(\d{4})-(\d{2})$/.exec(s ?? "");
  if (!m) throw new Error(`Month must be YYYY-MM or "next", got: ${s}`);
  return [Number(m[1]), Number(m[2])];
}

// Opening slots (briefing + Day 1) go to the main coaches, one each, shifting by one every month.
// Every other slot is round-robin over all coaches, carried over from the month before
// (rot = { p, pending }). A coach is never given two content slots in a row: if it's their turn
// again straight away, the next coach goes first and they take the following slot.
function buildMonth(y, m, rot, openShift) {
  const coaches = config.coaches;
  const mains = coaches.filter((c) => c.main).map((c) => c.name);
  let p = rot.p;
  let pending = rot.pending;
  let last = null;
  const general = () => {
    let pick;
    if (pending && pending !== last) [pick, pending] = [pending, null];
    else {
      pick = coaches[p++ % coaches.length].name;
      if (pick === last && !pending) [pending, pick] = [pick, coaches[p++ % coaches.length].name];
    }
    return (last = pick);
  };
  let opened = 0;
  const opening = () => (last = mains[(openShift + opened++) % mains.length]);
  const entries = [];
  const warnings = [];
  const add = (dt, e) => entries.push({ date: iso(dt), dow: dow(dt), ...e, ...(config.imageLabels?.[e.topic] && { label: config.imageLabels[e.topic] }) });

  // Briefing: fixed dates, fixed order.
  config.briefing.forEach((topic, i) => {
    const dt = mkDate(y, m, config.briefingStartDay + i);
    add(dt, { kind: "briefing", topic, coach: opening(), bell: dow(dt) === FRI, scale: dow(dt) === SAT });
  });

  // Day 1 → Day 21. Topics Mon–Fri; last Friday is reminder only, last Saturday is Timbang Akhir.
  const day1 = mkDate(y, m, config.day1);
  const run = Array.from({ length: config.runDays }, (_, i) => addDays(day1, i));
  const lastFri = iso(run.filter((d) => dow(d) === FRI).at(-1));
  const lastSat = iso(run.filter((d) => dow(d) === SAT).at(-1));
  const topics = [...config.knowledge];
  run.forEach((dt, i) => {
    const day = i + 1;
    const wd = dow(dt);
    if (wd === SUN) add(dt, { kind: "rest", day });
    else if (wd === SAT) add(dt, { kind: iso(dt) === lastSat ? "timbangAkhir" : "timbang", day, scale: true });
    else if (iso(dt) === lastFri) add(dt, { kind: "reminder", topic: "Reminder Timbang Akhir", day, bell: true });
    else if (topics.length) {
      const first = topics.length === config.knowledge.length; // Day 1 topic opens the run
      add(dt, { kind: "topic", day, topic: topics.shift(), coach: first ? opening() : general(), bell: wd === FRI });
    }
    else {
      add(dt, { kind: "free", day, bell: wd === FRI });
      warnings.push(`${iso(dt)} (Day ${day}) has no topic left to fill it.`);
    }
  });
  if (topics.length) warnings.push(`Not enough topic slots: ${topics.join(", ")} not scheduled.`);

  // Wrap-up: the days right after Day 21.
  const runEnd = run.at(-1);
  config.wrapUp.forEach((topic, i) => add(addDays(runEnd, i + 1), { kind: "wrapup", topic, coach: general() }));

  // Close Group: 1st of next month, pushed back if the wrap-up already uses that date.
  const lastUsed = mkDate(...entries.at(-1).date.split("-").map(Number));
  let close = mkDate(y, m + 1, 1);
  if (close <= lastUsed) {
    close = addDays(lastUsed, 1);
    warnings.push(`Wrap-up runs into ${iso(lastUsed)}, so Close Group moves to ${iso(close)}.`);
  }
  add(close, { kind: "close", topic: "Close Group", coach: "Semua Coach" });

  for (const e of entries) {
    const [ey, em] = e.date.split("-").map(Number);
    if (e.kind !== "close" && (ey !== y || em !== m)) warnings.push(`${e.date} (${e.topic ?? e.kind}) falls outside ${BULAN[m - 1]}.`);
  }
  const coached = entries.filter((e) => coaches.some((c) => c.name === e.coach));
  for (let i = 1; i < coached.length; i++)
    if (coached[i].coach === coached[i - 1].coach) warnings.push(`Coach ${coached[i].coach} has two content days in a row (${coached[i].date}).`);

  return { entries, warnings, rot: { p: p % coaches.length, pending } };
}

// Rotation continues month to month from the anchor, so every month is reproducible.
export function schedule(y, m) {
  const [ay, am] = config.rotationAnchor.month.split("-").map(Number);
  const { openingStart, generalStart } = config.rotationAnchor;
  const mains = config.coaches.filter((c) => c.main).map((c) => c.name);
  const openShift = mains.indexOf(openingStart);
  let rot = { p: config.coaches.findIndex((c) => c.name === generalStart), pending: null };
  if (mains.length < config.briefing.length + 1) throw new Error("Need at least 4 coaches marked main (3 briefing + Day 1)");
  if (openShift < 0) throw new Error(`rotationAnchor.openingStart "${openingStart}" is not a main coach`);
  if (rot.p < 0) throw new Error(`rotationAnchor.generalStart "${generalStart}" is not in coaches`);
  const start = ay * 12 + am - 1;
  if (y * 12 + m - 1 < start) throw new Error(`${y}-${m} is before the rotation anchor ${config.rotationAnchor.month}`);
  for (let k = start; k < y * 12 + m - 1; k++) rot = buildMonth(Math.floor(k / 12), (k % 12) + 1, rot, openShift + k - start).rot;
  const { entries, warnings } = buildMonth(y, m, rot, openShift + y * 12 + m - 1 - start);
  return {
    month: `${y}-${String(m).padStart(2, "0")}`,
    year: y,
    monthIndex: m,
    title: `KALENDAR TOPIK ${BULAN[m - 1].toUpperCase()} ${y}`,
    team: config.team,
    programme: config.programme,
    hashtag: config.hashtag,
    coaches: config.coaches,
    entries,
    warnings,
  };
}

const short = (date) => {
  const [, mm, dd] = date.split("-").map(Number);
  return `${dd}/${mm}`;
};

export function whatsapp(s) {
  const line = (e) => `${HARI[e.dow]} ${short(e.date)}`;
  const coach = (e) => (e.coach === "Semua Coach" ? "Semua Coach" : `Coach ${e.coach}`);
  const out = [`*${s.title}*`, `_${s.programme} · ${s.team}_`, ""];
  out.push("*BRIEFING*");
  for (const e of s.entries.filter((e) => e.kind === "briefing")) out.push(`${line(e)} · ${e.topic} · ${coach(e)}`);
  out.push("", "*DAY 1 – 21*");
  for (const e of s.entries.filter((e) => e.day)) {
    if (e.kind === "rest") continue;
    const what =
      e.kind === "timbang" ? "⚖️ Timbang" : e.kind === "timbangAkhir" ? "⚖️ *Timbang Akhir*" : e.kind === "reminder" ? `🔔 ${e.topic}` : e.topic ?? "–";
    out.push(`${line(e)} · D${e.day} · ${what}${e.coach ? ` · ${coach(e)}` : ""}${e.kind === "topic" && e.bell ? " · 🔔 Reminder Timbang" : ""}`);
  }
  out.push("", "*WRAP-UP*");
  for (const e of s.entries.filter((e) => e.kind === "wrapup")) out.push(`${line(e)} · ${e.topic} · ${coach(e)}`);
  const close = s.entries.find((e) => e.kind === "close");
  out.push("", `*CLOSE GROUP* · ${line(close)} · Semua Coach`, "", "*Giliran coach*");
  for (const c of s.coaches) {
    const dates = s.entries.filter((e) => e.coach === c.name).map((e) => short(e.date));
    out.push(`Coach ${c.name}: ${dates.join(", ") || "–"}`);
  }
  out.push("", s.hashtag);
  return out.join("\n") + "\n";
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dash = process.argv.indexOf("--");
  const args = dash < 0 ? process.argv.slice(2) : process.argv.slice(2, dash);
  const passthrough = dash < 0 ? [] : process.argv.slice(dash + 1);
  const [y, m] = parseMonth(args.find((a) => !a.startsWith("--")));
  const s = schedule(y, m);

  const outDir = path.join(DIR, s.month);
  fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, "schedule.json");
  fs.writeFileSync(jsonPath, JSON.stringify(s, null, 2) + "\n");
  fs.writeFileSync(path.join(outDir, "whatsapp.txt"), whatsapp(s));
  console.log(`Wrote ${path.relative(ROOT, outDir)}/schedule.json + whatsapp.txt`);
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `month=${s.month}\ndir=group-coaching/${s.month}\n`);

  if (args.includes("--render")) {
    const png = path.join(outDir, "kalendar.png");
    execFileSync("npx", ["remotion", "still", "src/kalendar/index.tsx", "Kalendar", png, `--props=${jsonPath}`, ...passthrough], { cwd: ROOT, stdio: "inherit" });
  }
  if (s.warnings.length) {
    console.log("\nCHECK BEFORE POSTING:");
    for (const w of s.warnings) console.log(`- ${w}`);
  }
}
