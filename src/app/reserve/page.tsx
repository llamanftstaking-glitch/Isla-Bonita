"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

// ─── FLOOR PLAN DATA ─────────────────────────────────────────────────────────
type TableStatus = "available" | "reserved" | "selected";

interface FloorTable {
  id: string;
  label: string;
  seats: number;
  section: string;
  shape: "rect" | "round";
  x: number;
  y: number;
  w: number;
  h: number;
  status: TableStatus;
}

const BASE_TABLES: FloorTable[] = [
  // Bar stools (round, small)
  { id: "B1", label: "B1", seats: 2, section: "Bar", shape: "round", x: 48,  y: 52,  w: 28, h: 28, status: "available" },
  { id: "B2", label: "B2", seats: 2, section: "Bar", shape: "round", x: 84,  y: 52,  w: 28, h: 28, status: "reserved"  },
  { id: "B3", label: "B3", seats: 2, section: "Bar", shape: "round", x: 120, y: 52,  w: 28, h: 28, status: "available" },
  { id: "B4", label: "B4", seats: 2, section: "Bar", shape: "round", x: 156, y: 52,  w: 28, h: 28, status: "available" },

  // 2-tops (dining room left)
  { id: "T1", label: "T1", seats: 2, section: "Dining", shape: "round", x: 48,  y: 140, w: 44, h: 44, status: "available" },
  { id: "T2", label: "T2", seats: 2, section: "Dining", shape: "round", x: 110, y: 140, w: 44, h: 44, status: "reserved"  },
  { id: "T3", label: "T3", seats: 2, section: "Dining", shape: "round", x: 48,  y: 210, w: 44, h: 44, status: "available" },
  { id: "T4", label: "T4", seats: 2, section: "Dining", shape: "round", x: 110, y: 210, w: 44, h: 44, status: "available" },

  // 4-tops (center dining)
  { id: "T5", label: "T5", seats: 4, section: "Dining", shape: "rect", x: 220, y: 130, w: 64, h: 50, status: "available" },
  { id: "T6", label: "T6", seats: 4, section: "Dining", shape: "rect", x: 300, y: 130, w: 64, h: 50, status: "reserved"  },
  { id: "T7", label: "T7", seats: 4, section: "Dining", shape: "rect", x: 220, y: 200, w: 64, h: 50, status: "available" },
  { id: "T8", label: "T8", seats: 4, section: "Dining", shape: "rect", x: 300, y: 200, w: 64, h: 50, status: "available" },

  // 6-tops (back section)
  { id: "T9",  label: "T9",  seats: 6, section: "Patio", shape: "rect", x: 420, y: 130, w: 80, h: 56, status: "available" },
  { id: "T10", label: "T10", seats: 6, section: "Patio", shape: "rect", x: 420, y: 206, w: 80, h: 56, status: "reserved"  },

  // Private booths
  { id: "P1", label: "P1", seats: 6, section: "Private", shape: "rect", x: 220, y: 290, w: 80, h: 50, status: "available" },
  { id: "P2", label: "P2", seats: 8, section: "Private", shape: "rect", x: 320, y: 290, w: 90, h: 50, status: "available" },
];

// Simulate availability based on date+time
function getTablesForSlot(date: string, time: string): FloorTable[] {
  const seed = (date + time).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return BASE_TABLES.map((t, i) => {
    if (t.status === "reserved") return t;
    const taken = (seed + i * 7) % 5 === 0;
    return { ...t, status: taken ? "reserved" : "available" };
  });
}

// ─── GUEST ENTRY ──────────────────────────────────────────────────────────────
interface Guest {
  name: string;
  email: string;
  phone: string;
}

const TIME_SLOTS = ["12:00 PM","12:30 PM","1:00 PM","1:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"];

export default function ReservePage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [date, setDate]   = useState("");
  const [time, setTime]   = useState("");
  const [partySize, setPartySize] = useState(2);
  const [tables, setTables] = useState<FloorTable[]>(BASE_TABLES);
  const [selectedTable, setSelectedTable] = useState<FloorTable | null>(null);
  const [guests, setGuests] = useState<Guest[]>([{ name: "", email: "", phone: "" }]);
  const [specialReq, setSpecialReq] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  // Update floor when date/time changes
  useEffect(() => {
    if (date && time) {
      const updated = getTablesForSlot(date, time);
      setTables(updated);
      setSelectedTable(null);
    }
  }, [date, time]);

  const selectTable = (t: FloorTable) => {
    if (t.status === "reserved") return;
    if (t.seats < partySize) return;
    setSelectedTable(t);
    setTables((prev) => prev.map((tbl) => ({
      ...tbl,
      status: tbl.id === t.id ? "selected" : tbl.status === "selected" ? "available" : tbl.status,
    })));
  };

  const updateGuest = (i: number, field: keyof Guest, val: string) =>
    setGuests((prev) => prev.map((g, idx) => idx === i ? { ...g, [field]: val } : g));

  const addGuest = () => {
    if (guests.length < partySize) setGuests((prev) => [...prev, { name: "", email: "", phone: "" }]);
  };

  const tableColor = (t: FloorTable, hovered: boolean) => {
    if (t.status === "selected") return { fill: "#c9a84c", stroke: "#f0d060", text: "#000" };
    if (t.status === "reserved") return { fill: "#2a1818", stroke: "#4a2020", text: "#6b4040" };
    if (t.seats < partySize && date && time) return { fill: "#1a1408", stroke: "#2a2010", text: "#4a3a20" };
    if (hovered) return { fill: "#1e1a0c", stroke: "#c9a84c", text: "#c9a84c" };
    return { fill: "#130f09", stroke: "#3a2e18", text: "#c8b89a" };
  };

  const sectionColors: Record<string, string> = {
    Bar: "#1a6b8a",
    Dining: "#c9a84c",
    Patio: "#2e8fb0",
    Private: "#c2603a",
  };

  const canProceedStep1 = date && time && partySize > 0;
  const canProceedStep2 = !!selectedTable;
  const canProceedStep3 = guests[0].name && guests[0].email && guests[0].phone;

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls = "w-full bg-[#0a0805] border border-[#2a2010] rounded-xl px-4 py-3 font-inter text-sm text-white placeholder-[#4a3a20] focus:outline-none focus:border-[#c9a84c]/50 transition-colors";

  const steps = ["Date & Time", "Choose Table", "Guest Info", "Confirm"];

  return (
    <div className="min-h-screen bg-[#0a0805]">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 pb-14 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#130f09] to-[#0a0805]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] rounded-full bg-[#c9a84c]/4 blur-[120px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4">
            3950 10th Ave Suite B · New York
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl text-white mb-4">
            Reserve Your <span className="italic text-[#c9a84c]">Table</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="font-inter text-[#c8b89a]/55 text-base">
            Select your date, choose your table from our floor plan, and add your guests.
          </motion.p>
        </div>
      </section>

      {/* Step progress */}
      <div className="px-6 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-inter text-sm font-semibold transition-all duration-300 ${
                    step > i + 1 ? "bg-[#c9a84c] text-black" :
                    step === i + 1 ? "bg-[#c9a84c]/20 border-2 border-[#c9a84c] text-[#c9a84c]" :
                    "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/30"
                  }`}>
                    {step > i + 1 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`font-inter text-[10px] tracking-wider uppercase hidden sm:block ${
                    step === i + 1 ? "text-[#c9a84c]" : "text-[#c8b89a]/30"
                  }`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-colors duration-300 ${step > i + 1 ? "bg-[#c9a84c]/50" : "bg-[#2a2010]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">

            {/* STEP 1 — Date, Time, Party Size */}
            {step === 1 && !submitted && (
              <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="max-w-xl mx-auto rounded-2xl p-8 border border-[#2a2010]" style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}>
                  <h2 className="font-playfair text-2xl text-white mb-6">When are you joining us?</h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-2">Date</label>
                      <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className={inputCls} />
                    </div>

                    <div>
                      <label className="block font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-2">Time</label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            className={`cursor-pointer px-2 py-2 rounded-xl font-inter text-xs text-center transition-all duration-200 ${
                              time === t
                                ? "bg-[#c9a84c] text-black font-semibold"
                                : "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/60 hover:border-[#c9a84c]/40 hover:text-[#c8b89a]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-2">Party Size</label>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setPartySize(Math.max(1, partySize - 1))}
                          className="cursor-pointer w-10 h-10 rounded-xl border border-[#2a2010] bg-[#130f09] text-white text-lg font-bold hover:border-[#c9a84c]/40 transition-colors flex items-center justify-center">−</button>
                        <span className="font-playfair text-3xl text-white w-12 text-center">{partySize}</span>
                        <button type="button" onClick={() => setPartySize(Math.min(20, partySize + 1))}
                          className="cursor-pointer w-10 h-10 rounded-xl border border-[#2a2010] bg-[#130f09] text-white text-lg font-bold hover:border-[#c9a84c]/40 transition-colors flex items-center justify-center">+</button>
                        <span className="font-inter text-sm text-[#c8b89a]/40 ml-1">{partySize === 1 ? "guest" : "guests"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                    className={`cursor-pointer mt-8 w-full py-4 rounded-xl font-semibold font-inter text-sm transition-all duration-200 ${
                      canProceedStep1
                        ? "bg-[#c9a84c] text-black hover:bg-[#f0d060] hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#2a2010] text-[#4a3a20] cursor-not-allowed"
                    }`}
                  >
                    See Available Tables →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Floor Plan */}
            {step === 2 && !submitted && (
              <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h2 className="font-playfair text-2xl text-white">Choose Your Table</h2>
                    <p className="font-inter text-sm text-[#c8b89a]/50 mt-1">
                      {date} · {time} · {partySize} {partySize === 1 ? "guest" : "guests"}
                    </p>
                  </div>
                  <button onClick={() => setStep(1)} className="cursor-pointer font-inter text-xs text-[#c8b89a]/50 hover:text-[#c9a84c] transition-colors flex items-center gap-1">
                    ← Change date/time
                  </button>
                </div>

                {/* Legend */}
                <div className="flex gap-4 flex-wrap mb-4">
                  {[
                    { color: "#3a2e18", stroke: "#3a2e18", label: "Available" },
                    { color: "#c9a84c", stroke: "#f0d060", label: "Selected" },
                    { color: "#2a1818", stroke: "#4a2020", label: "Reserved" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm" style={{ background: l.color, border: `1px solid ${l.stroke}` }} />
                      <span className="font-inter text-xs text-[#c8b89a]/50">{l.label}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ background: "#1a1408", border: "1px solid #2a2010", opacity: 0.5 }} />
                    <span className="font-inter text-xs text-[#c8b89a]/50">Too small for party</span>
                  </div>
                </div>

                {/* Section labels */}
                <div className="flex gap-3 flex-wrap mb-4">
                  {Object.entries(sectionColors).map(([sec, col]) => (
                    <div key={sec} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#2a2010]">
                      <div className="w-2 h-2 rounded-full" style={{ background: col }} />
                      <span className="font-inter text-[10px] text-[#c8b89a]/50 uppercase tracking-wider">{sec}</span>
                    </div>
                  ))}
                </div>

                {/* SVG Floor Plan */}
                <div
                  className="rounded-2xl overflow-hidden border border-[#2a2010] mb-6"
                  style={{ background: "rgba(12,10,6,0.95)" }}
                >
                  <svg viewBox="0 0 560 380" className="w-full h-auto" style={{ minHeight: 260 }}>
                    {/* Room outline */}
                    <rect x="20" y="20" width="520" height="340" rx="12" fill="none" stroke="#2a2010" strokeWidth="1.5" />

                    {/* Section backgrounds */}
                    <rect x="28" y="28" width="230" height="60" rx="8" fill="#1a6b8a" fillOpacity="0.06" />
                    <text x="36" y="45" fill="#1a6b8a" fontSize="9" fontFamily="system-ui" opacity="0.7" letterSpacing="2">BAR AREA</text>

                    <rect x="28" y="108" width="190" height="200" rx="8" fill="#c9a84c" fillOpacity="0.04" />
                    <text x="36" y="124" fill="#c9a84c" fontSize="9" fontFamily="system-ui" opacity="0.5" letterSpacing="2">DINING ROOM</text>

                    <rect x="210" y="108" width="175" height="170" rx="8" fill="#c9a84c" fillOpacity="0.03" />

                    <rect x="400" y="108" width="130" height="180" rx="8" fill="#2e8fb0" fillOpacity="0.05" />
                    <text x="408" y="124" fill="#2e8fb0" fontSize="9" fontFamily="system-ui" opacity="0.6" letterSpacing="2">PATIO</text>

                    <rect x="210" y="275" width="205" height="75" rx="8" fill="#c2603a" fillOpacity="0.06" />
                    <text x="218" y="291" fill="#c2603a" fontSize="9" fontFamily="system-ui" opacity="0.6" letterSpacing="2">PRIVATE ROOM</text>

                    {/* Host stand */}
                    <rect x="470" y="28" width="50" height="28" rx="6" fill="#130f09" stroke="#3a2e18" strokeWidth="1" />
                    <text x="495" y="45" textAnchor="middle" fill="#c8b89a" fontSize="7" fontFamily="system-ui" opacity="0.6">HOST</text>

                    {/* Entry arrow */}
                    <path d="M495 300 L495 340 L535 340 L535 300" fill="none" stroke="#2a2010" strokeWidth="1" />
                    <text x="515" y="355" textAnchor="middle" fill="#4a3a20" fontSize="8" fontFamily="system-ui">ENTRY</text>

                    {/* Tables */}
                    {tables.map((t) => {
                      const hovered = hoveredTable === t.id;
                      const tooSmall = t.seats < partySize && date && time && t.status !== "reserved";
                      const c = tableColor(t, hovered);
                      const isClickable = t.status !== "reserved" && !tooSmall;

                      return (
                        <g
                          key={t.id}
                          onClick={() => isClickable && selectTable(t)}
                          onMouseEnter={() => isClickable && setHoveredTable(t.id)}
                          onMouseLeave={() => setHoveredTable(null)}
                          style={{ cursor: isClickable ? "pointer" : "not-allowed" }}
                        >
                          {t.shape === "round" ? (
                            <circle
                              cx={t.x + t.w / 2}
                              cy={t.y + t.h / 2}
                              r={t.w / 2}
                              fill={c.fill}
                              stroke={c.stroke}
                              strokeWidth={t.status === "selected" ? 2 : 1.5}
                              opacity={tooSmall ? 0.4 : 1}
                            />
                          ) : (
                            <rect
                              x={t.x}
                              y={t.y}
                              width={t.w}
                              height={t.h}
                              rx="6"
                              fill={c.fill}
                              stroke={c.stroke}
                              strokeWidth={t.status === "selected" ? 2 : 1.5}
                              opacity={tooSmall ? 0.4 : 1}
                            />
                          )}
                          {/* Table label */}
                          <text
                            x={t.x + t.w / 2}
                            y={t.y + t.h / 2 - 3}
                            textAnchor="middle"
                            fill={c.text}
                            fontSize="9"
                            fontFamily="system-ui"
                            fontWeight={t.status === "selected" ? "bold" : "normal"}
                          >
                            {t.label}
                          </text>
                          <text
                            x={t.x + t.w / 2}
                            y={t.y + t.h / 2 + 8}
                            textAnchor="middle"
                            fill={c.text}
                            fontSize="7"
                            fontFamily="system-ui"
                            opacity="0.7"
                          >
                            {t.seats}p
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Selected table info */}
                <AnimatePresence>
                  {selectedTable && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mb-5 p-4 rounded-2xl border border-[#c9a84c]/30 bg-[#c9a84c]/8 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-playfair text-white text-sm">Table {selectedTable.label} — {selectedTable.section}</p>
                          <p className="font-inter text-xs text-[#c8b89a]/50">{selectedTable.seats} seats · {date} at {time}</p>
                        </div>
                      </div>
                      <span className="font-inter text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-3 py-1 rounded-full border border-[#c9a84c]/20">Selected</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)}
                    className="cursor-pointer flex-1 py-3.5 rounded-xl border border-[#2a2010] text-[#c8b89a]/60 font-inter text-sm hover:border-[#c9a84c]/30 hover:text-[#c8b89a] transition-all duration-200">
                    ← Back
                  </button>
                  <button
                    disabled={!canProceedStep2}
                    onClick={() => {
                      setGuests(Array.from({ length: Math.min(partySize, 8) }, (_, i) => guests[i] || { name: "", email: "", phone: "" }));
                      setStep(3);
                    }}
                    className={`cursor-pointer flex-1 py-3.5 rounded-xl font-semibold font-inter text-sm transition-all duration-200 ${
                      canProceedStep2
                        ? "bg-[#c9a84c] text-black hover:bg-[#f0d060] hover:scale-[1.01]"
                        : "bg-[#2a2010] text-[#4a3a20] cursor-not-allowed"
                    }`}
                  >
                    Continue → Add Guest Info
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Guest Info */}
            {step === 3 && !submitted && (
              <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="max-w-2xl mx-auto">
                  <div className="mb-6 p-4 rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/15 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-inter text-xs text-[#c9a84c] uppercase tracking-wider">Reservation Summary</p>
                      <p className="font-playfair text-white text-sm">
                        Table {selectedTable?.label} · {selectedTable?.section} · {date} at {time} · {partySize} guests
                      </p>
                    </div>
                  </div>

                  <h2 className="font-playfair text-2xl text-white mb-6">Guest Information</h2>

                  <div className="space-y-4">
                    {guests.map((g, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-5 rounded-2xl border border-[#2a2010] bg-[#130f09]/60"
                      >
                        <p className="font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-4">
                          {i === 0 ? "Primary Guest (you)" : `Guest ${i + 1}`}
                        </p>
                        <div className="grid sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-inter text-[10px] text-[#c8b89a]/40 mb-1.5">Name {i === 0 && "*"}</label>
                            <input
                              type="text"
                              required={i === 0}
                              placeholder={i === 0 ? "Your name" : "Guest name"}
                              value={g.name}
                              onChange={(e) => updateGuest(i, "name", e.target.value)}
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <label className="block font-inter text-[10px] text-[#c8b89a]/40 mb-1.5">Email {i === 0 && "*"}</label>
                            <input
                              type="email"
                              required={i === 0}
                              placeholder="email@example.com"
                              value={g.email}
                              onChange={(e) => updateGuest(i, "email", e.target.value)}
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <label className="block font-inter text-[10px] text-[#c8b89a]/40 mb-1.5">Phone {i === 0 && "*"}</label>
                            <input
                              type="tel"
                              required={i === 0}
                              placeholder="(000) 000-0000"
                              value={g.phone}
                              onChange={(e) => updateGuest(i, "phone", e.target.value)}
                              className={inputCls}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {guests.length < partySize && partySize <= 8 && (
                      <button
                        type="button"
                        onClick={addGuest}
                        className="cursor-pointer w-full py-3 rounded-2xl border border-dashed border-[#2a2010] text-[#c8b89a]/40 font-inter text-sm hover:border-[#c9a84c]/30 hover:text-[#c8b89a]/70 transition-all duration-200"
                      >
                        + Add guest {guests.length + 1} of {partySize}
                      </button>
                    )}

                    <div>
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Special Requests</label>
                      <textarea
                        rows={3}
                        placeholder="Dietary restrictions, high chair, special occasion, seating preference..."
                        value={specialReq}
                        onChange={(e) => setSpecialReq(e.target.value)}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(2)}
                      className="cursor-pointer flex-1 py-3.5 rounded-xl border border-[#2a2010] text-[#c8b89a]/60 font-inter text-sm hover:border-[#c9a84c]/30 transition-all duration-200">
                      ← Back
                    </button>
                    <button
                      disabled={!canProceedStep3}
                      onClick={() => setStep(4)}
                      className={`cursor-pointer flex-1 py-3.5 rounded-xl font-semibold font-inter text-sm transition-all duration-200 ${
                        canProceedStep3
                          ? "bg-[#c9a84c] text-black hover:bg-[#f0d060]"
                          : "bg-[#2a2010] text-[#4a3a20] cursor-not-allowed"
                      }`}
                    >
                      Review Reservation →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4 — Confirm */}
            {step === 4 && !submitted && (
              <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="max-w-2xl mx-auto">
                  <h2 className="font-playfair text-2xl text-white mb-8">Confirm Reservation</h2>

                  <div
                    className="rounded-2xl border border-[#c9a84c]/20 mb-6 overflow-hidden"
                    style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}
                  >
                    <div className="px-6 py-5 border-b border-[#2a2010]">
                      <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-1">Reservation Details</p>
                      <div className="grid sm:grid-cols-2 gap-4 mt-3">
                        {[
                          { label: "Date", val: date },
                          { label: "Time", val: time },
                          { label: "Table", val: `${selectedTable?.label} — ${selectedTable?.section} (${selectedTable?.seats} seats)` },
                          { label: "Party Size", val: `${partySize} ${partySize === 1 ? "guest" : "guests"}` },
                        ].map((r) => (
                          <div key={r.label}>
                            <p className="font-inter text-[10px] text-[#c8b89a]/35 uppercase tracking-wider">{r.label}</p>
                            <p className="font-inter text-sm text-white mt-0.5">{r.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="px-6 py-5 border-b border-[#2a2010]">
                      <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-3">Guest List</p>
                      <div className="space-y-2">
                        {guests.filter((g) => g.name).map((g, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#c9a84c]/15 flex items-center justify-center flex-shrink-0">
                              <span className="font-inter text-[9px] text-[#c9a84c] font-bold">{g.name[0]?.toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="font-inter text-sm text-white">{g.name} {i === 0 && <span className="text-[#c9a84c]/60 text-xs">(primary)</span>}</p>
                              <p className="font-inter text-[10px] text-[#c8b89a]/35">{g.email} · {g.phone}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {specialReq && (
                      <div className="px-6 py-4">
                        <p className="font-inter text-[10px] text-[#c8b89a]/40 uppercase tracking-wider">Special Requests</p>
                        <p className="font-inter text-sm text-[#c8b89a]/70 mt-1">{specialReq}</p>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleFinalSubmit} className="space-y-3">
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(3)}
                        className="cursor-pointer flex-1 py-3.5 rounded-xl border border-[#2a2010] text-[#c8b89a]/60 font-inter text-sm hover:border-[#c9a84c]/30 transition-all duration-200">
                        ← Edit
                      </button>
                      <button type="submit"
                        className="cursor-pointer flex-1 py-4 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter hover:bg-[#f0d060] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c9a84c]/20">
                        Confirm Reservation
                      </button>
                    </div>
                    <p className="font-inter text-[10px] text-center text-[#c8b89a]/25">
                      Questions? <a href="tel:+16465591222" className="text-[#c9a84c]">(646) 559-1222</a>
                    </p>
                  </form>
                </div>
              </motion.div>
            )}

            {/* CONFIRMED */}
            {submitted && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-[#c9a84c]/15 border-2 border-[#c9a84c]/40 flex items-center justify-center mx-auto mb-8"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>

                <h2 className="font-playfair text-4xl text-white mb-3">You're Confirmed!</h2>
                <p className="font-inter text-[#c8b89a]/60 mb-8 leading-relaxed">
                  Table {selectedTable?.label} in the {selectedTable?.section} is reserved for {guests[0].name} on {date} at {time}.<br />
                  A confirmation has been sent to {guests[0].email}.
                </p>

                <div className="rounded-2xl border border-[#c9a84c]/20 bg-[#130f09]/70 p-6 mb-8 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { l: "Table", v: `${selectedTable?.label} · ${selectedTable?.section}` },
                      { l: "Date", v: date },
                      { l: "Time", v: time },
                      { l: "Guests", v: `${guests.filter((g) => g.name).length} confirmed` },
                    ].map((r) => (
                      <div key={r.l}>
                        <p className="font-inter text-[10px] text-[#c8b89a]/35 uppercase tracking-wider">{r.l}</p>
                        <p className="font-inter text-sm text-white mt-0.5">{r.v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+16465591222"
                    className="flex-1 py-3.5 rounded-xl border border-[#2a2010] text-[#c8b89a]/60 font-inter text-sm text-center hover:border-[#c9a84c]/30 hover:text-[#c8b89a] transition-all duration-200">
                    Call Us · (646) 559-1222
                  </a>
                  <button
                    onClick={() => { setStep(1); setSubmitted(false); setSelectedTable(null); setDate(""); setTime(""); setPartySize(2); setGuests([{ name:"",email:"",phone:"" }]); }}
                    className="cursor-pointer flex-1 py-3.5 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter text-sm hover:bg-[#f0d060] transition-all duration-200"
                  >
                    Make Another Reservation
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
