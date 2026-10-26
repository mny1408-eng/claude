// Hero reel (19/10) "Saya paksa anak makan" — Coach Nas's full story: the night he forced his 5-year-old to eat, 10 years of
// yo-yo weight, chest pain in the car, posting away from family, the du'a in Raudhah, texting his coach, 20 kg in 8 months,
// and his child saying "Baba dah kurang garang". 15 Teleprompter takes (19/10 18:06–18:15) in story order, the cleaner retake
// kept where he re-recorded (h07 over h06, h15 over h14, h19 over h18; h11 starts after the line h11b already says).
// Layout C (story overlay): video plays throughout, his own photos as plain cards, a yo-yo weight line drawn from the numbers
// he says, KISAH COACH series tag, pop captions, standard end card. No SFX.
// Captions: Whisper (BM+EN) checked against EN/unprompted runs and Coach's corrections (chest pain; "bila balik rumah lapar,
// senang naik angin"; "lima bulan lepas pergi umrah"). Still unconfirmed: "paksa telan", "guide ringkas", "kitaran yo-yo yang
// tak berkesudahan", "Eh, Herbalife ke?" — listed in the chat review. One unclear word after "jumpa doktor" is left out.
import React from "react";
import { AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS } from "../theme";
import { Card } from "../kit";
import { SceneDef } from "../Reel";
import { chunkWords, EndCardStd, HookTitle, Overlay, PopWords, SeriesTag, Wd } from "./formats/LayoutA";

const CLIP = "clips/R-hero-full.mp4";
const TALK = 162.75;
const CLIP_LEN = Math.round(TALK * FPS);
const END = 105;

const WORDS: Wd[] = [
  [0.0, 0.53, "Saya", 0], [0.53, 0.67, "ingat", 0], [0.67, 0.83, "hari", 0], [0.83, 1.17, "malam", 0], [1.17, 2.17, "tu", 0], [2.17, 3.05, "saya", 0],
  [3.05, 3.51, "paksa", 1], [3.51, 3.67, "anak", 0], [3.67, 3.81, "saya", 0], [3.81, 4.33, "makan", 0], [4.33, 5.03, "padahal", 0], [5.03, 5.27, "saya", 0],
  [5.27, 5.47, "sendiri", 1], [5.47, 5.63, "tak", 0], [5.63, 5.91, "makan", 0], [5.91, 6.21, "daripada", 0], [6.21, 6.79, "pagi.", 1], [7.09, 7.62, "Masa", 0],
  [7.62, 7.92, "tu", 0], [7.92, 8.16, "anak", 0], [8.16, 8.34, "saya", 0], [8.34, 8.46, "baru", 0], [8.46, 8.72, "5", 1], [8.72, 9.22, "tahun.", 0],
  [9.86, 9.96, "Dia", 0], [9.92, 10.06, "tak", 0], [10.06, 10.16, "nak", 0], [10.16, 10.62, "makan.", 0], [10.82, 11.02, "Tapi", 0], [11.02, 11.26, "saya", 0],
  [11.26, 11.56, "penat", 0], [11.56, 11.72, "sangat", 0], [11.72, 11.92, "masa", 0], [11.92, 12.06, "tu", 0], [12.06, 12.22, "nak", 0], [12.22, 12.8, "cepat-cepat", 0],
  [12.8, 13.22, "settle", 0], [13.22, 13.78, "kan.", 0], [14.08, 14.18, "Saya", 0], [14.18, 15.12, "marah", 1], [15.12, 15.66, "dan", 0], [15.66, 15.94, "dia", 0],
  [15.94, 16.1, "pun", 0], [16.1, 16.4, "takut", 0], [16.4, 16.76, "sampai", 0], [16.76, 16.98, "dia", 0], [16.98, 17.5, "paksa", 1], [17.9, 18.0, "telan.", 0],
  [19.2, 19.3, "Saya", 0], [19.3, 19.5, "tak", 0], [19.5, 19.68, "nak", 0], [19.68, 19.94, "anak", 0], [19.94, 20.2, "saya", 0], [20.2, 20.78, "membesar", 0],
  [20.78, 21.22, "ingat", 0], [21.22, 21.58, "Baba", 0], [21.58, 21.68, "dia", 0], [21.68, 21.92, "orang", 0], [21.92, 22.72, "yang", 0], [22.72, 23.06, "garang.", 1],
  [23.36, 23.89, "Masa", 0], [23.89, 23.99, "tu", 0], [23.97, 24.19, "saya", 0], [24.19, 24.51, "skip", 0], [24.51, 25.33, "breakfast.", 1], [26.05, 26.63, "Sampai", 0],
  [26.63, 27.01, "hospital", 0], [27.01, 27.25, "pun", 0], [27.25, 27.57, "terus", 0], [27.57, 27.93, "pergi", 0], [27.93, 28.09, "walk", 0], [28.09, 28.63, "round.", 0],
  [29.09, 29.19, "Balik", 0], [29.17, 29.43, "rumah,", 0], [29.43, 29.63, "bila", 0], [29.65, 29.79, "saya", 0], [29.79, 29.97, "lapar,", 1], [29.97, 30.85, "senang", 0],
  [31.29, 31.47, "naik", 0], [31.47, 31.79, "angin.", 1], [32.09, 32.62, "10", 0], [32.62, 32.86, "tahun", 0], [32.86, 33.16, "saya", 0], [33.16, 33.42, "berat", 0],
  [33.42, 34.16, "yo-yo.", 1], [34.16, 34.86, "95,", 1], [35.4, 36.24, "85,", 1], [36.48, 36.58, "naik", 0], [36.56, 36.72, "balik", 0], [36.72, 37.18, "94,", 1],
  [37.44, 38.1, "83,", 1], [38.42, 38.56, "naik", 0], [38.56, 38.8, "balik", 0], [38.8, 39.64, "92.", 1], [40.26, 40.58, "Buat", 0], [40.58, 41.08, "IF,", 0],
  [41.08, 41.8, "OMAD,", 0], [42.24, 42.54, "Atkins.", 0], [43.24, 43.6, "Lepas", 0], [43.6, 44.48, "tu", 0], [44.48, 44.88, "Raya", 0], [44.88, 45.42, "seminggu", 0],
  [45.42, 45.86, "habis", 0], [45.86, 46.1, "semua", 0], [46.1, 46.34, "diet", 0], [46.34, 46.8, "rosak.", 1], [47.1, 47.63, "Dan", 0], [47.63, 47.75, "ada", 0],
  [47.75, 47.91, "satu", 0], [47.91, 48.25, "petang", 0], [48.25, 48.41, "tu", 0], [48.41, 48.61, "masa", 0], [48.61, 48.89, "tengah", 0], [48.89, 49.01, "buat", 0],
  [49.01, 49.35, "IF", 0], [49.35, 50.05, "kan.", 0], [50.17, 50.37, "Dalam", 0], [50.37, 50.69, "kereta", 0], [50.69, 50.93, "macam", 0], [50.93, 51.05, "ni", 0],
  [51.05, 51.47, "lah", 0], [51.47, 51.79, "balik", 0], [51.79, 52.47, "kerja,", 0], [52.79, 53.01, "tiba-tiba", 0], [53.01, 53.39, "saya", 0], [53.39, 53.61, "jadi", 0],
  [53.61, 53.93, "chest", 0], [53.93, 54.35, "pain.", 1], [54.83, 54.99, "Saya", 0], [54.99, 55.73, "terduduk", 1], [55.73, 56.19, "dan", 0], [56.19, 56.41, "saya", 0],
  [56.41, 56.59, "tunggu.", 0], [56.68, 57.02, "sampai", 0], [57.02, 57.44, "chest pain", 0], [57.44, 57.6, "tu", 0], [57.6, 58.7, "hilang.", 0],
  [58.94, 59.04, "Lepas", 0], [59.02, 59.58, "tu", 0], [59.58, 60.28, "pergi", 0], [60.28, 60.54, "jumpa", 0], [60.54, 60.86, "doktor.", 0], [60.9, 61.1, "tak", 0],
  [61.26, 61.36, "ada", 0], [61.36, 61.92, "apa-apalah.", 0], [62.19, 62.63, "Tapi", 0], [62.63, 62.83, "ada", 0], [62.83, 62.97, "satu", 0], [62.97, 63.25, "benda", 0],
  [63.25, 63.45, "yang", 0], [63.45, 64.23, "saya", 0], [64.23, 64.53, "tiba-tiba", 0], [64.53, 65.47, "teringat.", 1], [65.69, 65.95, "Anak-anak", 0], [65.95, 66.05, "saya", 0],
  [66.03, 66.25, "masih", 0], [66.25, 66.59, "kecil", 1], [66.59, 66.83, "lagi.", 0], [67.13, 67.66, "Saya", 0], [67.66, 67.8, "ingat", 0], [67.8, 67.92, "tu", 0],
  [67.92, 68.04, "dah", 0], [68.04, 68.28, "teruk", 0], [68.28, 68.64, "dah.", 0], [68.82, 69.14, "Rupanya", 0], [69.14, 69.8, "belum.", 0], [70.56, 70.86, "Lepas", 0],
  [70.86, 71.14, "habis", 0], [71.14, 71.5, "master", 0], [71.5, 71.86, "saya", 0], [71.86, 72.08, "kena", 0], [72.08, 72.36, "posting", 0], [72.36, 72.76, "jauh", 1],
  [72.76, 72.86, "dari", 0], [72.86, 73.72, "family.", 1], [74.14, 74.4, "Isteri", 0], [74.4, 74.72, "jaga", 0], [74.72, 74.96, "anak", 0], [74.96, 75.22, "seorang-seorang.", 0],
  [76.22, 76.38, "Saya", 0], [76.38, 76.54, "posting", 0], [76.54, 76.74, "seorang-seorang", 0], [77.3, 77.88, "berat", 0], [77.88, 78.06, "pun", 0], [78.06, 78.74, "pasti", 0],
  [78.74, 79.14, "turun", 0], [79.14, 79.24, "naik", 0], [79.22, 79.5, "turun", 0], [79.5, 79.76, "naik.", 0], [80.11, 80.59, "Masa", 0], [80.59, 80.83, "teman", 0],
  [80.83, 80.97, "mak", 0], [80.97, 81.19, "saya", 0], [81.19, 81.35, "buat", 0], [81.35, 81.85, "umrah,", 0], [82.05, 82.21, "dalam", 0], [82.21, 82.51, "Raudhah", 0],
  [82.51, 82.73, "saya", 0], [82.73, 83.09, "berdoa,", 1], [83.87, 83.97, "Ya", 0], [83.93, 84.05, "Allah", 0], [84.05, 84.19, "untuk", 0], [84.19, 84.43, "aku,", 0],
  [84.51, 84.65, "kalau", 0], [84.65, 84.89, "ada", 0], [84.89, 85.23, "rezeki", 0], [85.23, 85.39, "untuk", 0], [85.39, 85.71, "aku,", 0], [85.79, 86.27, "tunjukkanlah", 0],
  [86.27, 86.91, "jalan", 0], [86.91, 87.61, "untuk", 0], [87.61, 88.01, "keluar", 0], [88.01, 88.35, "daripada", 0], [88.35, 89.27, "kancah", 0], [89.27, 89.89, "kegemukan.", 1],
  [90.2, 90.72, "Lima", 0], [90.72, 91.14, "bulan", 0], [91.14, 91.48, "lepas", 0], [91.48, 91.66, "pergi", 0], [91.66, 91.82, "umrah", 0], [91.82, 92.14, "tu,", 0],
  [93.34, 93.44, "satu", 0], [93.42, 93.58, "hari", 0], [93.58, 93.7, "dalam", 0], [93.7, 93.98, "bilik", 0], [93.98, 94.32, "sewa", 0], [94.32, 94.62, "saya", 0],
  [94.62, 95.24, "scrolling,", 0], [95.44, 95.7, "terjumpa", 0], [96.24, 96.64, "story", 0], [96.64, 96.92, "coach", 0], [96.92, 97.52, "saya.", 0], [97.78, 97.96, "Lama", 0],
  [97.96, 98.12, "juga", 0], [98.12, 98.36, "saya", 0], [98.36, 98.98, "tenung.", 0], [99.2, 99.44, "Kali", 0], [99.44, 99.66, "ini", 0], [99.66, 100.14, "saya", 0],
  [100.14, 100.4, "serah", 0], [100.4, 100.58, "diri,", 0], [100.62, 100.82, "saya", 0], [100.82, 101.12, "text", 1], [101.12, 101.32, "saja", 0], [101.32, 101.52, "dia.", 0],
  [101.83, 102.35, "So", 0], [102.35, 102.61, "lepas", 0], [102.61, 103.15, "decide", 0], [103.15, 103.49, "untuk", 0], [103.49, 103.63, "join", 0], [103.63, 104.61, "program,", 0],
  [105.05, 105.23, "Kit", 0], [105.23, 105.65, "Nutrition", 0], [105.65, 105.83, "pun", 0], [105.83, 106.45, "sampai,", 0], [106.97, 107.07, "benda", 0], [107.05, 107.35, "pertama", 0],
  [107.35, 107.53, "keluar", 0], [107.53, 107.67, "daripada", 0], [107.67, 107.91, "mulut", 0], [107.91, 108.03, "saya,", 0], [108.03, 108.25, "“Eh,", 0], [108.75, 109.13, "Herbalife", 0],
  [109.13, 109.37, "ke?”?", 0], [110.51, 110.61, "Saya", 0], [110.59, 110.69, "ni", 0], [110.69, 111.23, "pharmacist", 0], [111.23, 111.55, "memang", 0], [111.55, 111.81, "sangat", 0],
  [111.81, 112.39, "skeptikal,", 1], [112.39, 112.83, "tapi", 0], [112.83, 113.07, "sebab", 0], [113.07, 113.33, "desperate", 1], [113.33, 113.53, "saya", 0], [113.53, 113.85, "follow", 0],
  [113.85, 113.97, "je", 0], [113.97, 114.15, "lah.", 0], [114.45, 114.98, "Lapan", 1], [114.98, 115.24, "bulan", 0], [115.24, 115.54, "slow", 0], [115.54, 115.68, "slow", 0],
  [115.68, 116.16, "progress,", 0], [116.34, 116.7, "Alhamdulillah", 0], [116.7, 116.88, "dua", 0], [116.88, 117.02, "puluh", 0], [117.02, 117.3, "kilo", 1], [117.3, 118.26, "turun.", 0],
  [118.3, 118.56, "Dulu", 0], [118.56, 118.8, "balik", 0], [118.8, 119.06, "kerja", 0], [119.06, 119.64, "mengantuk", 0], [119.64, 119.98, "sangat.", 0], [120.38, 121.0, "Sekarang", 0],
  [121.0, 121.36, "saya", 0], [121.36, 122.0, "naik", 0], [122.0, 122.5, "lapan", 0], [122.5, 122.9, "tingkat", 0], [122.9, 123.4, "tangga", 1], [123.4, 123.84, "hari-hari", 0],
  [123.84, 123.96, "pergi", 0], [123.96, 124.74, "kerja.", 0], [125.12, 125.22, "So", 0], [125.18, 125.38, "Raya", 0], [125.38, 125.74, "lepas", 0], [125.74, 125.96, "saya", 0],
  [125.96, 126.28, "makan", 0], [126.28, 126.64, "tanpa", 0], [126.64, 126.9, "rasa", 0], [126.9, 127.3, "guilty", 1], [127.3, 127.7, "pun", 0], [127.7, 128.26, "and", 0],
  [128.26, 128.56, "berat", 0], [128.56, 129.04, "saya", 0], [129.04, 129.34, "boleh", 0], [129.34, 129.7, "maintain.", 1], [130.0, 130.52, "So", 0], [130.52, 130.84, "baru-baru", 0],
  [130.84, 131.0, "ni", 0], [131.0, 131.22, "saya", 0], [131.22, 131.36, "ada", 0], [131.36, 131.62, "tanya", 0], [131.62, 131.82, "anak", 0], [131.82, 132.56, "saya,", 0],
  [133.96, 134.06, "ada", 0], [134.06, 134.3, "rasa", 0], [134.3, 134.56, "Baba", 0], [134.56, 134.9, "garang", 0], [134.9, 135.18, "lagi", 0], [135.18, 135.6, "tak?", 0],
  [136.74, 136.88, "So", 0], [136.88, 137.02, "dia", 0], [137.02, 137.84, "jawab,", 0], [138.3, 138.4, "tak", 0], [138.38, 138.72, "lah,", 0], [138.86, 139.1, "Baba", 0],
  [139.1, 139.28, "dah", 0], [139.28, 139.9, "kurang", 1], [139.9, 140.3, "garang", 0], [140.3, 140.58, "dah.", 0], [140.88, 141.41, "So", 0], [141.41, 141.79, "sekarang", 0],
  [141.79, 142.09, "lepas", 0], [142.09, 142.31, "saya", 0], [142.31, 142.47, "dah", 0], [142.47, 142.65, "dapat", 0], [142.65, 143.11, "result,", 0], [143.55, 143.75, "saya", 0],
  [143.75, 143.93, "nak", 0], [143.93, 144.43, "bantu", 0], [144.43, 144.89, "parents", 0], [144.89, 145.15, "yang", 0], [145.15, 145.53, "busy,", 1], [145.77, 145.87, "yang", 0],
  [145.83, 146.09, "kerja", 0], [146.09, 146.57, "shift,", 1], [147.11, 147.21, "kita", 0], [147.19, 147.31, "nak", 0], [147.31, 147.63, "keluar", 0], [147.63, 147.97, "daripada", 0],
  [147.97, 148.55, "kancah", 0], [148.65, 148.83, "kitaran", 0], [148.83, 148.99, "yo-yo", 0], [149.47, 149.83, "yang", 0], [149.83, 150.15, "tak", 0], [150.15, 150.33, "berkesudahan.", 0],
  [151.26, 151.79, "Tak", 0], [151.79, 152.07, "payahlah", 0], [152.07, 152.25, "nak", 0], [152.25, 152.67, "terantuk", 0], [152.67, 153.01, "dinding", 0], [153.01, 153.41, "banyak", 0],
  [153.41, 153.63, "kali", 0], [153.63, 153.87, "macam", 0], [153.87, 154.35, "saya,", 0], [154.77, 154.87, "kalau", 0], [154.85, 155.15, "korang", 0], [155.15, 155.31, "pun", 0],
  [155.31, 155.59, "selalu", 0], [155.59, 155.93, "cari", 0], [155.93, 156.79, "snacking", 0], [156.79, 157.23, "lepas", 0], [157.23, 157.47, "anak", 0], [157.47, 158.09, "tidur,", 0],
  [158.25, 158.35, "saya", 0], [158.33, 158.53, "ada", 0], [158.53, 158.69, "guide", 1], [158.69, 159.13, "ringkas", 0], [159.13, 159.41, "untuk", 0], [159.41, 159.79, "parents", 0],
  [159.79, 160.09, "yang", 0], [160.09, 160.49, "busy.", 1], [160.97, 161.27, "DM", 0], [161.27, 161.85, "guide", 1], [161.85, 162.25, "free", 1], [162.25, 162.45, "je.", 0],
];
const CHUNKS = chunkWords(WORDS);

// [start, end, image, side] in reel seconds — photo cards over the playing video, sitting high so the face stays visible.
const PHOTOS: [number, number, string, "left" | "right" | "center"][] = [
  [9.2, 14.6, "hero/p2.jpg", "right"], // "Dia tak nak makan…"
  [64.4, 67.1, "hero/p4.jpg", "right"], // "Anak-anak saya masih kecil lagi."
  [74.0, 77.0, "hero/p3.jpg", "left"], // "Isteri jaga anak seorang-seorang."
  [77.1, 80.0, "hero/p5.jpg", "right"], // "berat pun pasti turun naik turun naik"
  [80.3, 89.9, "hero/umrah.jpg", "center"], // "Masa teman mak saya buat umrah, dalam Raudhah saya berdoa…"
  [93.6, 98.9, "hero/bilik-sewa.jpg", "right"], // "satu hari dalam bilik sewa saya scrolling, terjumpa story coach saya"
  [115.3, 118.2, "kisah/st-ba.jpg", "center"], // "Alhamdulillah dua puluh kilo turun" (his card, with its hasil-tidak-tipikal note)
  [118.3, 122.4, "hero/p1.jpg", "left"], // "Dulu balik kerja mengantuk sangat."
];

const Photo: React.FC<{ src: string; dur: number; side: "left" | "right" | "center" }> = ({ src, dur, side }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f, fps, config: { damping: 16, stiffness: 140 } });
  const out = interpolate(f, [dur - 6, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const box = side === "center" ? { left: 240, width: 600, maxH: 700 } : side === "left" ? { left: 30, width: 400, maxH: 560 } : { left: 650, width: 400, maxH: 560 };
  return (
    <div style={{ position: "absolute", top: 230, left: box.left, width: box.width, display: "flex", justifyContent: "center", opacity: Math.min(p * 1.5, 1) * out, transform: `translateY(${(1 - p) * 40}px)` }}>
      <Img src={staticFile(`img/${src}`)} style={{ maxWidth: "100%", maxHeight: box.maxH, objectFit: "contain", border: "8px solid #fff", borderRadius: 10, boxShadow: "0 14px 34px rgba(0,0,0,0.4)" }} />
    </div>
  );
};

// The yo-yo line: only the five weights he says (kg), each point appearing as he says it. No dates on the axis.
const YOYO: [number, number][] = [[34.16, 95], [35.4, 85], [36.72, 94], [37.44, 83], [38.8, 92]];
const YoYo: React.FC<{ dur: number; from: number }> = ({ dur, from }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = from + f / fps;
  const out = interpolate(f, [dur - 6, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const W = 760, H = 330, x = (i: number) => 60 + i * ((W - 120) / 4), y = (kg: number) => 50 + ((96 - kg) / 14) * (H - 100);
  const shown = YOYO.filter(([s]) => t >= s - 0.05);
  const pts = shown.map(([, kg], i) => `${x(i)},${y(kg)}`).join(" ");
  return (
    <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: out }}>
      <Card style={{ padding: "22px 26px 10px", width: W }}>
        <div style={{ fontSize: 34, fontWeight: 800, color: C.ink, textAlign: "center" }}>10 tahun berat <span style={{ background: C.gold, padding: "0 10px", borderRadius: 8 }}>yo-yo</span></div>
        <svg width={W - 52} height={H} viewBox={`0 0 ${W} ${H}`}>
          <polyline points={pts} fill="none" stroke={C.marker} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
          {shown.map(([s, kg], i) => {
            const p = spring({ frame: Math.round((t - s) * fps), fps, config: { damping: 12, stiffness: 200 } });
            return (
              <g key={i} transform={`translate(${x(i)},${y(kg)}) scale(${p})`}>
                <circle r={13} fill={C.ink} />
                <text y={i % 2 ? 58 : -26} textAnchor="middle" fontSize={40} fontWeight={800} fill={C.ink}>{kg}</text>
              </g>
            );
          })}
        </svg>
      </Card>
    </div>
  );
};

const note: React.CSSProperties = { background: "rgba(255,255,255,0.94)", color: C.inkSoft, borderRadius: 14, padding: "10px 22px", fontSize: 30, fontWeight: 700, textAlign: "center" };
const cta: React.CSSProperties = { background: C.ink, color: C.paper, borderRadius: 999, padding: "16px 34px", fontSize: 44, fontWeight: 800 };

const Talk: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <Sequence durationInFrames={Math.round(5.5 * FPS)} layout="none">
      <SeriesTag series="KISAH COACH" />
      <HookTitle lines={[["SAYA PAKSA", false], ["ANAK MAKAN", true]]} tone="dark" hookSec={99} />
    </Sequence>
    {PHOTOS.map(([a, b, src, side]) => (
      <Sequence key={src} from={Math.round(a * FPS)} durationInFrames={Math.round((b - a) * FPS)} layout="none">
        <Photo src={src} dur={Math.round((b - a) * FPS)} side={side} />
      </Sequence>
    ))}
    <Sequence from={Math.round(33.9 * FPS)} durationInFrames={Math.round(7.4 * FPS)} layout="none">
      <YoYo dur={Math.round(7.4 * FPS)} from={33.9} />
    </Sequence>
    <Sequence from={Math.round(122.5 * FPS)} durationInFrames={Math.round(7.4 * FPS)} layout="none">
      <Overlay dur={Math.round(7.4 * FPS)} top={240}><div style={note}>Pengalaman peribadi · hasil berbeza ikut individu</div></Overlay>
    </Sequence>
    <Sequence from={Math.round(160.9 * FPS)} durationInFrames={CLIP_LEN - Math.round(160.9 * FPS)} layout="none">
      <Overlay dur={CLIP_LEN - Math.round(160.9 * FPS)} top={1390}><div style={cta}>DM “GUIDE”</div></Overlay>
    </Sequence>
    <PopWords chunks={CHUNKS} top={1230} />
  </AbsoluteFill>
);

export const R_HERO_SCENES: SceneDef[] = [
  { id: "talk", dur: CLIP_LEN, el: <Talk /> },
  { id: "end", dur: END, el: <EndCardStd cta="DM “GUIDE”" icon="comment" note="Guide ringkas untuk parents yang busy" /> },
];
