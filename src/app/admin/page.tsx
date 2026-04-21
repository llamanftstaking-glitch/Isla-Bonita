"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_RESERVATIONS = [
  { id: "R001", name: "Maria Garcia",    lastName: "Garcia",    phone: "(917) 555-0101", email: "mgarcia@email.com",   date: "2025-06-14", time: "5:00 PM", party: 4, occasion: "Anniversary",  status: "seated",    notes: "Window table preferred",   tableId: "T5",  spend: 180 },
  { id: "R002", name: "James Wilson",    lastName: "Wilson",    phone: "(646) 555-0182", email: "jwilson@email.com",   date: "2025-06-14", time: "5:30 PM", party: 2, occasion: "Date Night",   status: "seated",    notes: "",                          tableId: "T1",  spend: 95  },
  { id: "R003", name: "Sofia Chen",      lastName: "Chen",      phone: "(212) 555-0233", email: "schen@email.com",     date: "2025-06-14", time: "6:00 PM", party: 6, occasion: "Birthday",     status: "confirmed", notes: "Birthday cake — chocolate", tableId: "P1",  spend: 0   },
  { id: "R004", name: "Marcus Brown",    lastName: "Brown",     phone: "(718) 555-0344", email: "mbrown@email.com",    date: "2025-06-14", time: "6:30 PM", party: 3, occasion: "",             status: "confirmed", notes: "Vegetarian option needed",  tableId: "T6",  spend: 0   },
  { id: "R005", name: "Elena Rodriguez", lastName: "Rodriguez", phone: "(347) 555-0455", email: "erodriguez@email.com",date: "2025-06-14", time: "7:00 PM", party: 2, occasion: "Date Night",   status: "confirmed", notes: "",                          tableId: "B4",  spend: 0   },
  { id: "R006", name: "David Kim",       lastName: "Kim",       phone: "(516) 555-0566", email: "dkim@email.com",      date: "2025-06-14", time: "7:30 PM", party: 8, occasion: "Birthday",     status: "confirmed", notes: "Large booth if possible",   tableId: "P2",  spend: 0   },
  { id: "R007", name: "Priya Patel",     lastName: "Patel",     phone: "(212) 555-0777", email: "ppatel@email.com",    date: "2025-06-14", time: "8:00 PM", party: 4, occasion: "",             status: "confirmed", notes: "",                          tableId: "T8",  spend: 0   },
  { id: "R008", name: "Carlos Ortiz",    lastName: "Ortiz",     phone: "(718) 555-0888", email: "cortiz@email.com",    date: "2025-06-14", time: "8:30 PM", party: 2, occasion: "",             status: "pending",   notes: "",                          tableId: "T3",  spend: 0   },
  // Next day
  { id: "R009", name: "Tanya Lee",       lastName: "Lee",       phone: "(212) 555-0991", email: "tlee@email.com",      date: "2025-06-15", time: "6:00 PM", party: 3, occasion: "",             status: "confirmed", notes: "",                          tableId: "T5",  spend: 0   },
  { id: "R010", name: "Omar Hassan",     lastName: "Hassan",    phone: "(646) 555-1010", email: "ohassan@email.com",   date: "2025-06-15", time: "7:00 PM", party: 5, occasion: "Anniversary",  status: "confirmed", notes: "Flowers on table",          tableId: "T9",  spend: 0   },
  { id: "R011", name: "Nina Park",       lastName: "Park",      phone: "(917) 555-1111", email: "npark@email.com",     date: "2025-06-16", time: "7:30 PM", party: 2, occasion: "Date Night",   status: "confirmed", notes: "",                          tableId: "T2",  spend: 0   },
  { id: "R012", name: "Luis Vega",       lastName: "Vega",      phone: "(718) 555-1212", email: "lvega@email.com",     date: "2025-06-17", time: "8:00 PM", party: 4, occasion: "",             status: "pending",   notes: "",                          tableId: "T6",  spend: 0   },
];

const MOCK_WAITLIST = [
  { id: "W1", name: "T. Johnson",  party: 3, waitMins: 25 },
  { id: "W2", name: "L. Reyes",    party: 2, waitMins: 15 },
  { id: "W3", name: "M. Thompson", party: 5, waitMins: 40 },
];

const MOCK_EVENTS = [
  { id: "E001", name: "Sandra Lopez",  phone: "(917) 555-1001", email: "slopez@email.com",    date: "2025-07-04", eventType: "Full Buyout",      guests: 80, budget: "$5,000+", status: "new",       notes: "July 4th celebration, full buyout + DJ"      },
  { id: "E002", name: "TechCorp NYC",  phone: "(212) 555-1002", email: "events@techcorp.com", date: "2025-07-20", eventType: "Corporate Dinner", guests: 40, budget: "$3,000",  status: "follow-up", notes: "Annual team dinner, private room + AV setup"  },
  { id: "E003", name: "Ana Hernandez", phone: "(646) 555-1003", email: "ahernandez@email.com",date: "2025-08-01", eventType: "Bridal Shower",    guests: 25, budget: "$1,500",  status: "new",       notes: "Brunch hours preferred, mimosa packages"      },
];

const MOCK_CATERING = [
  { id: "C001", name: "Bright Futures Org", phone: "(212) 555-2001", email: "hello@brightfutures.org",  date: "2025-06-28", eventType: "Gala Dinner", guests: 120, budget: "$8,000+", status: "new",       notes: "Non-profit fundraiser gala, need full service" },
  { id: "C002", name: "Rachel Kim",          phone: "(917) 555-2002", email: "rkim@email.com",           date: "2025-07-12", eventType: "Home Party",  guests: 30,  budget: "$1,200",  status: "follow-up", notes: "Backyard birthday party, drop-off catering ok" },
  { id: "C003", name: "City Media Inc",      phone: "(646) 555-2003", email: "production@citymedia.com", date: "2025-06-22", eventType: "Film Shoot",  guests: 15,  budget: "$600",    status: "confirmed", notes: "Craft services for 2-day shoot"                },
];

// ─── FLOOR PLAN DATA ─────────────────────────────────────────────────────────

type TableStatus = "available" | "reserved" | "seated" | "closed";
type TableShape  = "round" | "rect";

interface FloorTable {
  id: string; label: string; seats: number; section: string;
  shape: TableShape; x: number; y: number; w: number; h: number;
  status: TableStatus;
}

interface FloorPlan {
  id: string; name: string; tables: FloorTable[]; active: boolean;
}

const BASE_TABLES: FloorTable[] = [
  { id: "B1",  label: "B1",  seats: 2, section: "Bar",     shape: "round", x: 60,  y: 55,  w: 34, h: 34, status: "available" },
  { id: "B2",  label: "B2",  seats: 2, section: "Bar",     shape: "round", x: 104, y: 55,  w: 34, h: 34, status: "seated"    },
  { id: "B3",  label: "B3",  seats: 2, section: "Bar",     shape: "round", x: 148, y: 55,  w: 34, h: 34, status: "available" },
  { id: "B4",  label: "B4",  seats: 2, section: "Bar",     shape: "round", x: 192, y: 55,  w: 34, h: 34, status: "reserved"  },
  { id: "T1",  label: "T1",  seats: 2, section: "Dining",  shape: "round", x: 60,  y: 140, w: 50, h: 50, status: "seated"    },
  { id: "T2",  label: "T2",  seats: 2, section: "Dining",  shape: "round", x: 130, y: 140, w: 50, h: 50, status: "available" },
  { id: "T3",  label: "T3",  seats: 2, section: "Dining",  shape: "round", x: 60,  y: 215, w: 50, h: 50, status: "reserved"  },
  { id: "T4",  label: "T4",  seats: 2, section: "Dining",  shape: "round", x: 130, y: 215, w: 50, h: 50, status: "available" },
  { id: "T5",  label: "T5",  seats: 4, section: "Dining",  shape: "rect",  x: 240, y: 130, w: 70, h: 54, status: "seated"    },
  { id: "T6",  label: "T6",  seats: 4, section: "Dining",  shape: "rect",  x: 326, y: 130, w: 70, h: 54, status: "reserved"  },
  { id: "T7",  label: "T7",  seats: 4, section: "Dining",  shape: "rect",  x: 240, y: 204, w: 70, h: 54, status: "available" },
  { id: "T8",  label: "T8",  seats: 4, section: "Dining",  shape: "rect",  x: 326, y: 204, w: 70, h: 54, status: "reserved"  },
  { id: "T9",  label: "T9",  seats: 6, section: "Patio",   shape: "rect",  x: 450, y: 130, w: 85, h: 58, status: "available" },
  { id: "T10", label: "T10", seats: 6, section: "Patio",   shape: "rect",  x: 450, y: 208, w: 85, h: 58, status: "available" },
  { id: "P1",  label: "P1",  seats: 6, section: "Private", shape: "rect",  x: 240, y: 295, w: 85, h: 54, status: "reserved"  },
  { id: "P2",  label: "P2",  seats: 8, section: "Private", shape: "rect",  x: 342, y: 295, w: 95, h: 54, status: "reserved"  },
];

const INITIAL_PLANS: FloorPlan[] = [
  { id: "plan-1", name: "Main Dining",       active: true,  tables: BASE_TABLES },
  { id: "plan-2", name: "Happy Hour Layout", active: false, tables: BASE_TABLES.filter((t) => t.section !== "Private").map((t) => ({ ...t, status: "available" as TableStatus })) },
  { id: "plan-3", name: "Event Buyout",      active: false, tables: BASE_TABLES.map((t) => ({ ...t, status: t.section === "Private" ? "reserved" as TableStatus : "available" as TableStatus })) },
];

// ─── TYPES ────────────────────────────────────────────────────────────────────

type MainTab     = "reservations" | "events" | "catering" | "floor-editor" | "create-event";
type ResView     = "floorplan" | "daily" | "weekly" | "availability";

const WEEK_DATES = [
  { label: "Sat", date: "Jun 14", full: "2025-06-14" },
  { label: "Sun", date: "Jun 15", full: "2025-06-15" },
  { label: "Mon", date: "Jun 16", full: "2025-06-16" },
  { label: "Tue", date: "Jun 17", full: "2025-06-17" },
  { label: "Wed", date: "Jun 18", full: "2025-06-18" },
  { label: "Thu", date: "Jun 19", full: "2025-06-19" },
  { label: "Fri", date: "Jun 20", full: "2025-06-20" },
];

const TIME_SLOTS = ["12:00 PM","12:30 PM","1:00 PM","1:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"];
const SERVICES   = ["Brunch", "Lunch", "Dinner"];

const STATUS_PILL: Record<string, string> = {
  confirmed:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  pending:     "bg-amber-50  text-amber-700  border border-amber-200",
  seated:      "bg-orange-50 text-orange-700 border border-orange-200",
  new:         "bg-blue-50   text-blue-700   border border-blue-200",
  "follow-up": "bg-violet-50 text-violet-700 border border-violet-200",
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [mainTab, setMainTab]   = useState<MainTab>("reservations");
  const [resView, setResView]   = useState<ResView>("floorplan");

  // Reservations state
  const [liveTables, setLiveTables]   = useState<FloorTable[]>(BASE_TABLES);
  const [selectedTable, setSelectedTable] = useState<FloorTable | null>(null);
  const [selectedRes, setSelectedRes]   = useState<string | null>(null);
  const [service, setService]           = useState("Dinner");
  const [dateIdx, setDateIdx]           = useState(0);
  const [draggingLive, setDraggingLive] = useState<string | null>(null);
  const [dragOffsetLive, setDragOffsetLive] = useState({ x: 0, y: 0 });
  const livesvgRef = useRef<SVGSVGElement>(null);

  // Availability state
  const [blockedDays, setBlockedDays]     = useState<string[]>([]);
  const [blockedSlots, setBlockedSlots]   = useState<string[]>([]); // "date|time"

  // Floor editor state
  const [plans, setPlans]         = useState<FloorPlan[]>(INITIAL_PLANS);
  const [activePlanId, setActivePlanId] = useState("plan-1");
  const [editingPlanId, setEditingPlanId] = useState("plan-1");
  const [savedMsg, setSavedMsg]   = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [draggingEditor, setDraggingEditor] = useState<string | null>(null);
  const [dragOffsetEditor, setDragOffsetEditor] = useState({ x: 0, y: 0 });
  const editorSvgRef = useRef<SVGSVGElement>(null);

  // Create event
  const [eventForm, setEventForm] = useState({ title: "", date: "", time: "", type: "Dinner", capacity: "", description: "", featured: false });
  const [eventSaved, setEventSaved] = useState(false);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const getResForTable = (tableId: string) => MOCK_RESERVATIONS.find((r) => r.tableId === tableId && r.date === WEEK_DATES[dateIdx].full);
  const totalGuests = MOCK_RESERVATIONS.filter((r) => r.date === WEEK_DATES[dateIdx].full).reduce((s, r) => s + r.party, 0);

  const counts = {
    res:      { seated: liveTables.filter((t) => t.status === "seated").length, pending: MOCK_RESERVATIONS.filter((r) => r.status === "pending").length },
    events:   { new: MOCK_EVENTS.filter((e) => e.status === "new").length },
    catering: { new: MOCK_CATERING.filter((c) => c.status === "new").length },
    floor:    { available: liveTables.filter((t) => t.status === "available").length, seated: liveTables.filter((t) => t.status === "seated").length },
  };

  const tableVisual = (status: TableStatus, selected: boolean) => {
    if (selected)               return { fill: "#1e293b", stroke: "#c9a84c", lbl: "#f0d060", sub: "#c9a84c99" };
    if (status === "seated")    return { fill: "#f97316", stroke: "#ea580c", lbl: "#fff",    sub: "#ffffff99" };
    if (status === "reserved")  return { fill: "#7c3aed", stroke: "#6d28d9", lbl: "#fff",    sub: "#ffffff99" };
    if (status === "closed")    return { fill: "#374151", stroke: "#4b5563", lbl: "#9ca3af", sub: "#6b728099" };
    return                             { fill: "#166534", stroke: "#15803d", lbl: "#fff",    sub: "#ffffff99" };
  };

  // Live floor drag
  const liveMouseDown = (e: React.MouseEvent, id: string) => {
    const svg = livesvgRef.current; if (!svg) return;
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const sp = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    const t = liveTables.find((x) => x.id === id)!;
    setDraggingLive(id); setDragOffsetLive({ x: sp.x - t.x, y: sp.y - t.y }); e.preventDefault();
  };
  const liveMouseMove = (e: React.MouseEvent) => {
    if (!draggingLive || !livesvgRef.current) return;
    const svg = livesvgRef.current; const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const sp = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    setLiveTables((prev) => prev.map((t) => t.id === draggingLive ? { ...t, x: Math.max(20, Math.min(510, sp.x - dragOffsetLive.x)), y: Math.max(30, Math.min(330, sp.y - dragOffsetLive.y)) } : t));
  };
  const cycleLiveStatus = (id: string) => {
    const order: TableStatus[] = ["available","reserved","seated","closed"];
    setLiveTables((prev) => prev.map((t) => t.id === id ? { ...t, status: order[(order.indexOf(t.status) + 1) % order.length] } : t));
    setSelectedTable((prev) => { if (!prev || prev.id !== id) return prev; const order: TableStatus[] = ["available","reserved","seated","closed"]; return { ...prev, status: order[(order.indexOf(prev.status) + 1) % order.length] }; });
  };

  // Editor drag
  const editPlan = plans.find((p) => p.id === editingPlanId)!;
  const editorMouseDown = (e: React.MouseEvent, id: string) => {
    const svg = editorSvgRef.current; if (!svg) return;
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const sp = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    const t = editPlan.tables.find((x) => x.id === id)!;
    setDraggingEditor(id); setDragOffsetEditor({ x: sp.x - t.x, y: sp.y - t.y }); e.preventDefault();
  };
  const editorMouseMove = (e: React.MouseEvent) => {
    if (!draggingEditor || !editorSvgRef.current) return;
    const svg = editorSvgRef.current; const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const sp = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    setPlans((prev) => prev.map((p) => p.id !== editingPlanId ? p : { ...p, tables: p.tables.map((t) => t.id === draggingEditor ? { ...t, x: Math.max(20, Math.min(510, sp.x - dragOffsetEditor.x)), y: Math.max(30, Math.min(330, sp.y - dragOffsetEditor.y)) } : t) }));
  };
  const removeTableFromPlan = (tableId: string) => setPlans((prev) => prev.map((p) => p.id !== editingPlanId ? p : { ...p, tables: p.tables.filter((t) => t.id !== tableId) }));
  const savePlan = () => { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000); };
  const setAsActive = (planId: string) => { setPlans((prev) => prev.map((p) => ({ ...p, active: p.id === planId }))); setActivePlanId(planId); setLiveTables(plans.find((p) => p.id === planId)!.tables); };
  const createNewPlan = () => {
    if (!newPlanName.trim()) return;
    const id = `plan-${Date.now()}`;
    setPlans((prev) => [...prev, { id, name: newPlanName.trim(), active: false, tables: JSON.parse(JSON.stringify(BASE_TABLES)) }]);
    setEditingPlanId(id); setNewPlanName("");
  };

  // Availability toggles
  const toggleBlockDay = (d: string) => setBlockedDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  const toggleBlockSlot = (d: string, t: string) => { const key = `${d}|${t}`; setBlockedSlots((prev) => prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]); };

  const inputCls = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all";
  const labelCls = "block font-inter text-[11px] text-gray-500 tracking-[0.2em] uppercase mb-1.5 font-medium";

  const mainTabs: { key: MainTab; label: string; badge?: number }[] = [
    { key: "reservations",  label: "Reservations",    badge: counts.res.pending    },
    { key: "events",        label: "Event Leads",     badge: counts.events.new     },
    { key: "catering",      label: "Catering Leads",  badge: counts.catering.new   },
    { key: "floor-editor",  label: "Floor Plan Editor"                             },
    { key: "create-event",  label: "Create Event"                                  },
  ];

  const resViews: { key: ResView; label: string; icon: string }[] = [
    { key: "floorplan",   label: "Floor Plan", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
    { key: "daily",       label: "Daily View", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" },
    { key: "weekly",      label: "Weekly",     icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
    { key: "availability",label: "Availability", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#c9a84c" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <div>
            <h1 className="font-playfair font-bold text-gray-900 text-base leading-tight">Isla Bonita</h1>
            <p className="font-inter text-[10px] text-gray-400 tracking-widest uppercase">Admin Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-inter text-[11px] text-emerald-700 font-medium">Live</span>
          </div>
          <a href="/" target="_blank" className="font-inter text-xs text-gray-400 hover:text-[#c9a84c] transition-colors flex items-center gap-1">
            View Site
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
          </a>
        </div>
      </header>

      {/* ── Summary cards ─────────────────────────────────────────────────── */}
      <div className="px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Today's Covers",   val: totalGuests,            sub: `${counts.res.seated} seated now`,   accent: "#c9a84c", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
          { label: "Event Leads",      val: MOCK_EVENTS.length,     sub: `${counts.events.new} new`,           accent: "#3b82f6", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
          { label: "Catering Leads",   val: MOCK_CATERING.length,   sub: `${counts.catering.new} new`,         accent: "#a855f7", icon: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" },
          { label: "Tables Available", val: counts.floor.available,  sub: `${counts.floor.seated} occupied`,   accent: "#22c55e", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c.accent + "18" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d={c.icon} /></svg>
            </div>
            <div>
              <p className="font-inter text-[11px] text-gray-400 font-medium leading-none mb-0.5">{c.label}</p>
              <p className="font-inter text-xl font-bold text-gray-900 leading-none">{c.val}</p>
              <p className="font-inter text-[11px] text-gray-400 mt-0.5">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main tabs ─────────────────────────────────────────────────────── */}
      <div className="px-6 pb-10">
        <div className={`bg-white border border-gray-200 shadow-sm overflow-hidden ${mainTab === "reservations" && resView === "floorplan" ? "rounded-t-2xl" : "rounded-2xl"}`}>
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {mainTabs.map((t) => (
              <button key={t.key} onClick={() => setMainTab(t.key)}
                className={`cursor-pointer flex-shrink-0 flex items-center gap-2 px-5 py-3.5 font-inter text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  mainTab === t.key ? "text-[#c9a84c] border-[#c9a84c] bg-[#c9a84c]/4" : "text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t.label}
                {t.badge != null && t.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold min-w-[18px] text-center" style={{ background: "#c9a84c", color: "#000" }}>{t.badge}</span>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ════════════════════════════════════════════════════════════
                RESERVATIONS TAB
            ════════════════════════════════════════════════════════════ */}
            {mainTab === "reservations" && (
              <motion.div key="reservations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>

                {/* Sub-view selector */}
                <div className="flex items-center gap-1 px-5 py-2.5 border-b border-gray-100 bg-gray-50 overflow-x-auto">
                  {resViews.map((v) => (
                    <button key={v.key} onClick={() => setResView(v.key)}
                      className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-inter text-xs font-medium whitespace-nowrap transition-all ${
                        resView === v.key ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                      </svg>
                      {v.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">

                  {/* ── FLOOR PLAN VIEW ────────────────────────────────── */}
                  {resView === "floorplan" && (
                    <motion.div key="fp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Controls */}
                      <div className="flex items-center gap-3 px-5 py-2.5 border-b border-gray-100 flex-wrap" style={{ background: "#111827" }}>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setDateIdx((i) => Math.max(0, i - 1))}
                            className="cursor-pointer w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                          </button>
                          <span className="font-inter text-sm font-semibold text-white min-w-[100px] text-center">{WEEK_DATES[dateIdx].label}, {WEEK_DATES[dateIdx].date}</span>
                          <button onClick={() => setDateIdx((i) => Math.min(WEEK_DATES.length - 1, i + 1))}
                            className="cursor-pointer w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                          </button>
                        </div>
                        <div className="flex gap-1 bg-white/10 border border-white/20 rounded-xl p-1">
                          {SERVICES.map((s) => (
                            <button key={s} onClick={() => setService(s)}
                              className={`cursor-pointer px-3 py-1 rounded-lg font-inter text-xs font-medium transition-all ${service === s ? "bg-white text-gray-900" : "text-gray-300 hover:text-white"}`}>{s}</button>
                          ))}
                        </div>
                        <div className="ml-auto flex items-center gap-3">
                          <span className="font-inter text-sm font-semibold text-white">{totalGuests} <span className="text-gray-400 font-normal text-xs">covers</span></span>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-inter text-[11px] font-semibold text-emerald-400">LIVE</span>
                          </div>
                        </div>
                      </div>

                      {/* Split: sidebar + map */}
                      <div className="flex" style={{ background: "#111827", minHeight: 580 }}>
                        {/* Sidebar */}
                        <div className="w-60 flex-shrink-0 border-r border-white/10 flex flex-col">
                          {/* Waitlist */}
                          <div className="px-3 py-2.5 border-b border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-inter text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Waitlist</span>
                              <span className="font-inter text-xs text-gray-400">{MOCK_WAITLIST.length}</span>
                            </div>
                            <div className="flex gap-1.5 overflow-x-auto pb-1">
                              {MOCK_WAITLIST.map((w) => (
                                <div key={w.id} className="flex-shrink-0 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 cursor-pointer hover:bg-white/10 transition-all">
                                  <p className="font-inter text-[10px] text-gray-400">{w.waitMins}m</p>
                                  <p className="font-inter text-xs text-white font-semibold">{w.party}p</p>
                                  <p className="font-inter text-[10px] text-gray-400 truncate max-w-[50px]">{w.name}</p>
                                </div>
                              ))}
                              <button className="flex-shrink-0 w-8 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/40 transition-all cursor-pointer text-lg font-light">+</button>
                            </div>
                          </div>

                          {/* Reservations list */}
                          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
                            <span className="font-inter text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Reservations</span>
                            <span className="font-inter text-xs text-gray-400">{MOCK_RESERVATIONS.filter((r) => r.date === WEEK_DATES[dateIdx].full).length}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto">
                            {MOCK_RESERVATIONS.filter((r) => r.date === WEEK_DATES[dateIdx].full).map((r) => (
                              <div key={r.id} onClick={() => setSelectedRes(selectedRes === r.id ? null : r.id)}
                                className={`flex items-center gap-2 px-3 py-2.5 border-b border-white/5 cursor-pointer transition-all ${
                                  selectedRes === r.id ? "bg-[#c9a84c]/15 border-l-2 border-l-[#c9a84c]" : "hover:bg-white/5"
                                }`}
                              >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  r.status === "seated" ? "border-orange-400 bg-orange-400" : r.status === "confirmed" ? "border-emerald-400" : "border-gray-500"
                                }`}>
                                  {(r.status === "seated" || r.status === "confirmed") && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke={r.status === "seated" ? "white" : "#4ade80"} strokeWidth="3" className="w-2 h-2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                  )}
                                </div>
                                <span className="font-inter text-[11px] text-gray-400 w-4 text-center flex-shrink-0">{r.party}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-inter text-[10px] text-gray-400">{r.time}</p>
                                  <p className="font-inter text-xs text-white font-medium truncate">{r.name}</p>
                                </div>
                                {r.spend > 0 && <span className="font-inter text-[10px] text-emerald-400 font-semibold flex-shrink-0">${r.spend}</span>}
                                {r.notes && <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="w-3 h-3 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>}
                              </div>
                            ))}
                          </div>

                          {/* Legend */}
                          <div className="px-3 py-2.5 border-t border-white/10 grid grid-cols-2 gap-1.5">
                            {[{ col: "#166534", l: "Open" }, { col: "#7c3aed", l: "Reserved" }, { col: "#f97316", l: "Seated" }, { col: "#374151", l: "Closed" }].map((x) => (
                              <div key={x.l} className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: x.col }} /><span className="font-inter text-[10px] text-gray-400">{x.l}</span></div>
                            ))}
                          </div>
                        </div>

                        {/* Floor map */}
                        <div className="flex-1 relative overflow-hidden">
                          <svg ref={livesvgRef} viewBox="0 0 600 400" className="w-full h-full" style={{ minHeight: 520, cursor: draggingLive ? "grabbing" : "default" }}
                            onMouseMove={liveMouseMove} onMouseUp={() => setDraggingLive(null)} onMouseLeave={() => setDraggingLive(null)}
                          >
                            <rect x="20" y="20" width="560" height="360" rx="14" fill="none" stroke="#ffffff06" strokeWidth="1" />
                            <text x="36" y="42"  fill="#3b82f6" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="2" opacity="0.6">BAR</text>
                            <text x="36" y="128" fill="#c9a84c" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="2" opacity="0.4">DINING</text>
                            <text x="452" y="120" fill="#10b981" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="2" opacity="0.4">PATIO</text>
                            <text x="246" y="285" fill="#a855f7" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="2" opacity="0.4">PRIVATE</text>

                            {liveTables.map((t) => {
                              const res = getResForTable(t.id);
                              const isSel = selectedTable?.id === t.id;
                              const isHi  = !!(selectedRes && res?.id === selectedRes);
                              const v = tableVisual(t.status, isSel || isHi);
                              const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
                              return (
                                <g key={t.id} onMouseDown={(e) => liveMouseDown(e, t.id)}
                                  onClick={() => setSelectedTable(isSel ? null : t)}
                                  onDoubleClick={() => cycleLiveStatus(t.id)}
                                  style={{ cursor: draggingLive === t.id ? "grabbing" : "grab" }}
                                >
                                  {t.shape === "round"
                                    ? <circle cx={cx} cy={cy} r={t.w / 2} fill={v.fill} stroke={v.stroke} strokeWidth={isSel || isHi ? 2.5 : 1.5} />
                                    : <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="8" fill={v.fill} stroke={v.stroke} strokeWidth={isSel || isHi ? 2.5 : 1.5} />
                                  }
                                  {res && res.spend > 0 && (
                                    <><rect x={cx - 16} y={t.y - 14} width="32" height="13" rx="6" fill="#111827" stroke={v.stroke} strokeWidth="1" />
                                    <text x={cx} y={t.y - 4} textAnchor="middle" fill={v.lbl} fontSize="7.5" fontFamily="system-ui" fontWeight="700">${res.spend}</text></>
                                  )}
                                  {res && t.status === "seated" && <text x={cx} y={cy - 4} textAnchor="middle" fill={v.lbl} fontSize="8.5" fontFamily="system-ui" fontWeight="700">{res.lastName}</text>}
                                  <text x={cx} y={res && t.status === "seated" ? cy + 7 : cy + 3} textAnchor="middle" fill={v.sub} fontSize={res && t.status === "seated" ? "7" : "9"} fontFamily="system-ui" fontWeight="600">{t.label}</text>
                                  {!(res && t.status === "seated") && <text x={cx} y={cy + 14} textAnchor="middle" fill={v.sub} fontSize="6.5" fontFamily="system-ui" opacity="0.7">{t.seats}p</text>}
                                </g>
                              );
                            })}
                          </svg>

                          <AnimatePresence>
                            {selectedTable && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-gray-900/95 backdrop-blur-sm p-4 flex items-center justify-between flex-wrap gap-3"
                              >
                                <div>
                                  <p className="font-inter text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Table {selectedTable.label} · {selectedTable.section} · {selectedTable.seats} seats</p>
                                  {getResForTable(selectedTable.id) && <p className="font-inter text-sm text-white font-medium">{getResForTable(selectedTable.id)!.name} · {getResForTable(selectedTable.id)!.time} · {getResForTable(selectedTable.id)!.party}p</p>}
                                </div>
                                <div className="flex gap-2">
                                  {(["available","reserved","seated","closed"] as TableStatus[]).map((s) => (
                                    <button key={s} onClick={() => { setLiveTables((prev) => prev.map((t) => t.id === selectedTable.id ? { ...t, status: s } : t)); setSelectedTable((prev) => prev ? { ...prev, status: s } : null); }}
                                      className={`cursor-pointer px-3 py-1.5 rounded-lg font-inter text-xs font-medium border capitalize transition-all ${selectedTable.status === s ? "bg-white text-gray-900 border-white" : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"}`}>{s}</button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── DAILY VIEW ─────────────────────────────────────── */}
                  {resView === "daily" && (
                    <motion.div key="daily" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-6">
                      <div className="flex items-center gap-3 mb-5 flex-wrap">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setDateIdx((i) => Math.max(0, i - 1))} className="cursor-pointer w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:border-gray-300">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                          </button>
                          <span className="font-inter text-sm font-semibold text-gray-900">{WEEK_DATES[dateIdx].label}, {WEEK_DATES[dateIdx].date}</span>
                          <button onClick={() => setDateIdx((i) => Math.min(WEEK_DATES.length - 1, i + 1))} className="cursor-pointer w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:border-gray-300">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                          </button>
                        </div>
                        <span className="font-inter text-sm text-gray-400">{MOCK_RESERVATIONS.filter((r) => r.date === WEEK_DATES[dateIdx].full).length} reservations · {MOCK_RESERVATIONS.filter((r) => r.date === WEEK_DATES[dateIdx].full).reduce((s, r) => s + r.party, 0)} covers</span>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2">
                        {TIME_SLOTS.map((slot) => {
                          const slotRes = MOCK_RESERVATIONS.filter((r) => r.date === WEEK_DATES[dateIdx].full && r.time === slot);
                          return (
                            <div key={slot} className="flex gap-3 items-start">
                              <span className="font-inter text-xs text-gray-400 w-16 flex-shrink-0 pt-3">{slot}</span>
                              <div className="flex-1">
                                {slotRes.length === 0 ? (
                                  <div className="h-10 rounded-lg border border-dashed border-gray-200 flex items-center px-3">
                                    <span className="font-inter text-xs text-gray-300">No reservations</span>
                                  </div>
                                ) : (
                                  <div className="flex gap-2 flex-wrap">
                                    {slotRes.map((r) => (
                                      <div key={r.id} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border font-inter text-sm ${STATUS_PILL[r.status] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
                                        <span className="font-semibold">{r.name}</span>
                                        <span className="text-xs opacity-70">· {r.party}p</span>
                                        {r.occasion && <span className="text-xs opacity-60">· {r.occasion}</span>}
                                        {r.notes && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 opacity-60"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ── WEEKLY VIEW ────────────────────────────────────── */}
                  {resView === "weekly" && (
                    <motion.div key="weekly" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-6">
                      <h2 className="font-playfair text-xl text-gray-900 mb-4">Week of Jun 14 – Jun 20</h2>
                      <div className="grid grid-cols-7 gap-2">
                        {WEEK_DATES.map((day, idx) => {
                          const dayRes = MOCK_RESERVATIONS.filter((r) => r.date === day.full);
                          const covers = dayRes.reduce((s, r) => s + r.party, 0);
                          const isBlocked = blockedDays.includes(day.full);
                          return (
                            <div key={day.full} onClick={() => setDateIdx(idx)}
                              className={`rounded-xl border p-3 cursor-pointer transition-all min-h-[140px] ${
                                dateIdx === idx ? "border-[#c9a84c] bg-[#c9a84c]/5" : isBlocked ? "border-red-200 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                            >
                              <p className={`font-inter text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${dateIdx === idx ? "text-[#c9a84c]" : isBlocked ? "text-red-400" : "text-gray-400"}`}>{day.label}</p>
                              <p className="font-playfair text-lg font-bold text-gray-900">{day.date.split(" ")[1]}</p>
                              {isBlocked ? (
                                <div className="mt-2 px-2 py-1 rounded-lg bg-red-100 border border-red-200 text-center">
                                  <p className="font-inter text-[10px] text-red-600 font-semibold">CLOSED</p>
                                </div>
                              ) : (
                                <>
                                  <p className="font-playfair text-xl font-bold mt-2" style={{ color: "#c9a84c" }}>{dayRes.length}</p>
                                  <p className="font-inter text-[10px] text-gray-400">reservations</p>
                                  <p className="font-inter text-[11px] text-gray-500 mt-1">{covers} covers</p>
                                  <div className="mt-2 space-y-0.5">
                                    {dayRes.slice(0, 3).map((r) => (
                                      <div key={r.id} className="flex items-center gap-1">
                                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.status === "seated" ? "bg-orange-400" : r.status === "confirmed" ? "bg-emerald-400" : "bg-amber-400"}`} />
                                        <p className="font-inter text-[10px] text-gray-500 truncate">{r.name.split(" ")[1]} · {r.time}</p>
                                      </div>
                                    ))}
                                    {dayRes.length > 3 && <p className="font-inter text-[10px] text-gray-400">+{dayRes.length - 3} more</p>}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ── AVAILABILITY VIEW ──────────────────────────────── */}
                  {resView === "availability" && (
                    <motion.div key="avail" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-6">
                      <div className="flex items-start gap-2 mb-5">
                        <div>
                          <h2 className="font-playfair text-xl text-gray-900">Availability Manager</h2>
                          <p className="font-inter text-xs text-gray-400 mt-0.5">Block days or specific time slots to prevent online reservations</p>
                        </div>
                      </div>

                      {/* Day blocks */}
                      <div className="mb-6">
                        <p className={labelCls}>Block Full Days</p>
                        <div className="flex gap-2 flex-wrap">
                          {WEEK_DATES.map((day) => {
                            const isBlocked = blockedDays.includes(day.full);
                            return (
                              <button key={day.full} onClick={() => toggleBlockDay(day.full)}
                                className={`cursor-pointer px-4 py-2.5 rounded-xl font-inter text-sm font-medium border transition-all ${
                                  isBlocked ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-600"
                                }`}
                              >
                                {isBlocked && "✕ "}{day.label} {day.date.split(" ")[1]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slot blocks */}
                      <div>
                        <p className={labelCls}>Block Time Slots by Day</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr>
                                <th className="text-left font-inter text-[11px] text-gray-400 uppercase tracking-wider pb-2 pr-3 w-24">Time</th>
                                {WEEK_DATES.map((d) => (
                                  <th key={d.full} className="font-inter text-[11px] text-gray-500 uppercase tracking-wider pb-2 px-1 text-center w-20">{d.label}<br /><span className="text-gray-400 normal-case font-normal">{d.date.split(" ")[1]}</span></th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {TIME_SLOTS.map((slot) => (
                                <tr key={slot} className="border-t border-gray-100">
                                  <td className="font-inter text-xs text-gray-500 py-1.5 pr-3">{slot}</td>
                                  {WEEK_DATES.map((day) => {
                                    const key = `${day.full}|${slot}`;
                                    const isDayBlocked = blockedDays.includes(day.full);
                                    const isBlocked = blockedSlots.includes(key) || isDayBlocked;
                                    return (
                                      <td key={day.full} className="px-1 py-1 text-center">
                                        <button
                                          disabled={isDayBlocked}
                                          onClick={() => toggleBlockSlot(day.full, slot)}
                                          title={isBlocked ? "Blocked" : "Available"}
                                          className={`cursor-pointer w-6 h-6 rounded-md border mx-auto flex items-center justify-center transition-all ${
                                            isDayBlocked ? "bg-red-100 border-red-200 cursor-not-allowed" :
                                            isBlocked    ? "bg-red-500 border-red-500 text-white" :
                                                           "bg-emerald-50 border-emerald-200 hover:border-red-300"
                                          }`}
                                        >
                                          {isBlocked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="font-inter text-xs text-gray-400 mt-3">Green = available · Red = blocked · Click to toggle</p>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                EVENTS
            ════════════════════════════════════════════════════════════ */}
            {mainTab === "events" && (
              <motion.div key="events" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-6">
                <h2 className="font-playfair text-xl text-gray-900 mb-5">Event Inquiries</h2>
                <div className="space-y-3">
                  {MOCK_EVENTS.map((e, i) => (
                    <motion.div key={e.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-5 hover:border-blue-200 hover:bg-white transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0"><span className="font-playfair font-bold text-blue-700 text-sm">{e.name[0]}</span></div>
                          <div><p className="font-inter text-sm font-semibold text-gray-900">{e.name}</p><p className="font-inter text-xs text-gray-400">{e.phone} · {e.email}</p></div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-inter font-medium capitalize ${STATUS_PILL[e.status]}`}>{e.status}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {[{ l: "Date", v: e.date }, { l: "Event Type", v: e.eventType }, { l: "Guests", v: `${e.guests}+` }, { l: "Budget", v: e.budget }].map((d) => (
                          <div key={d.l} className="bg-white rounded-lg p-2.5 border border-gray-100"><p className="font-inter text-[10px] text-gray-400 uppercase tracking-wider">{d.l}</p><p className="font-inter text-sm text-gray-800 font-medium mt-0.5">{d.v}</p></div>
                        ))}
                      </div>
                      <p className="font-inter text-xs text-gray-500 italic bg-white border border-gray-100 rounded-lg px-3 py-2 mb-4">{e.notes}</p>
                      <div className="flex gap-2">
                        <button className="cursor-pointer px-3 py-1.5 rounded-lg font-inter text-xs bg-violet-600 text-white hover:bg-violet-700 font-medium">Follow Up</button>
                        <button className="cursor-pointer px-3 py-1.5 rounded-lg font-inter text-xs bg-emerald-600 text-white hover:bg-emerald-700 font-medium">Confirm</button>
                        <a href={`mailto:${e.email}`} className="px-3 py-1.5 rounded-lg font-inter text-xs bg-white text-gray-600 border border-gray-200 hover:border-gray-300">Email Lead</a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                CATERING
            ════════════════════════════════════════════════════════════ */}
            {mainTab === "catering" && (
              <motion.div key="catering" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-6">
                <h2 className="font-playfair text-xl text-gray-900 mb-5">Catering Inquiries</h2>
                <div className="space-y-3">
                  {MOCK_CATERING.map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-5 hover:border-violet-200 hover:bg-white transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0"><span className="font-playfair font-bold text-violet-700 text-sm">{c.name[0]}</span></div>
                          <div><p className="font-inter text-sm font-semibold text-gray-900">{c.name}</p><p className="font-inter text-xs text-gray-400">{c.phone} · {c.email}</p></div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-inter font-medium capitalize ${STATUS_PILL[c.status]}`}>{c.status}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {[{ l: "Date", v: c.date }, { l: "Event Type", v: c.eventType }, { l: "Guests", v: `${c.guests}` }, { l: "Budget", v: c.budget }].map((d) => (
                          <div key={d.l} className="bg-white rounded-lg p-2.5 border border-gray-100"><p className="font-inter text-[10px] text-gray-400 uppercase tracking-wider">{d.l}</p><p className="font-inter text-sm text-gray-800 font-medium mt-0.5">{d.v}</p></div>
                        ))}
                      </div>
                      <p className="font-inter text-xs text-gray-500 italic bg-white border border-gray-100 rounded-lg px-3 py-2 mb-4">{c.notes}</p>
                      <div className="flex gap-2">
                        <button className="cursor-pointer px-3 py-1.5 rounded-lg font-inter text-xs bg-violet-600 text-white hover:bg-violet-700 font-medium">Follow Up</button>
                        <button className="cursor-pointer px-3 py-1.5 rounded-lg font-inter text-xs bg-emerald-600 text-white hover:bg-emerald-700 font-medium">Confirm</button>
                        <a href={`mailto:${c.email}`} className="px-3 py-1.5 rounded-lg font-inter text-xs bg-white text-gray-600 border border-gray-200 hover:border-gray-300">Email Lead</a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                FLOOR PLAN EDITOR
            ════════════════════════════════════════════════════════════ */}
            {mainTab === "floor-editor" && (
              <motion.div key="editor" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-6">
                <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                  <div>
                    <h2 className="font-playfair text-xl text-gray-900">Floor Plan Editor</h2>
                    <p className="font-inter text-xs text-gray-400 mt-0.5">Create and save layouts. Set one as active to use in Reservations.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {savedMsg && <span className="font-inter text-xs text-emerald-600 font-medium animate-pulse">Saved!</span>}
                    <button onClick={savePlan} className="cursor-pointer px-4 py-2 rounded-xl font-inter text-sm font-medium text-black hover:opacity-90 transition-all shadow-sm" style={{ background: "#c9a84c" }}>
                      Save Layout
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* Plan list */}
                  <div className="w-48 flex-shrink-0 space-y-2">
                    <p className={labelCls}>Saved Layouts</p>
                    {plans.map((p) => (
                      <div key={p.id}
                        onClick={() => setEditingPlanId(p.id)}
                        className={`rounded-xl border p-3 cursor-pointer transition-all ${editingPlanId === p.id ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-gray-200 bg-white hover:border-gray-300"}`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-inter text-sm font-medium text-gray-900 truncate">{p.name}</p>
                          {p.active && <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" title="Active" />}
                        </div>
                        <p className="font-inter text-[11px] text-gray-400 mt-0.5">{p.tables.length} tables</p>
                        {p.active
                          ? <span className="font-inter text-[10px] text-emerald-600 font-semibold">● Active</span>
                          : <button onClick={(e) => { e.stopPropagation(); setAsActive(p.id); }}
                              className="cursor-pointer font-inter text-[10px] text-gray-400 hover:text-[#c9a84c] transition-colors mt-0.5 block">
                              Set as active →
                            </button>
                        }
                      </div>
                    ))}

                    {/* New plan */}
                    <div className="rounded-xl border border-dashed border-gray-300 p-3 space-y-2">
                      <input type="text" placeholder="New layout name" value={newPlanName} onChange={(e) => setNewPlanName(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 font-inter text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#c9a84c] transition-all" />
                      <button onClick={createNewPlan} disabled={!newPlanName.trim()}
                        className={`cursor-pointer w-full py-1.5 rounded-lg font-inter text-xs font-medium transition-all ${newPlanName.trim() ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                        + Create
                      </button>
                    </div>
                  </div>

                  {/* Editor canvas */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-inter text-sm font-semibold text-gray-700">{editPlan.name}</p>
                      <p className="font-inter text-xs text-gray-400">Drag tables · Double-click to remove</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50 select-none">
                      <svg ref={editorSvgRef} viewBox="0 0 600 400" className="w-full h-auto" style={{ minHeight: 320, cursor: draggingEditor ? "grabbing" : "default" }}
                        onMouseMove={editorMouseMove} onMouseUp={() => setDraggingEditor(null)} onMouseLeave={() => setDraggingEditor(null)}
                      >
                        <rect x="20" y="20" width="560" height="360" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />

                        {/* Section zones */}
                        <rect x="28" y="28" width="240" height="74" rx="8" fill="#eff6ff" fillOpacity="0.8" />
                        <text x="36" y="46" fill="#3b82f6" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="2">BAR AREA</text>
                        <rect x="28" y="110" width="200" height="210" rx="8" fill="#fffbeb" fillOpacity="0.6" />
                        <text x="36" y="128" fill="#b45309" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="2">DINING ROOM</text>
                        <rect x="430" y="110" width="140" height="190" rx="8" fill="#ecfdf5" fillOpacity="0.8" />
                        <text x="438" y="128" fill="#059669" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="2">PATIO</text>
                        <rect x="220" y="280" width="220" height="80" rx="8" fill="#fdf4ff" fillOpacity="0.8" />
                        <text x="228" y="296" fill="#9333ea" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="2">PRIVATE ROOM</text>

                        {editPlan.tables.map((t) => {
                          const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
                          return (
                            <g key={t.id} onMouseDown={(e) => editorMouseDown(e, t.id)} onDoubleClick={() => removeTableFromPlan(t.id)}
                              style={{ cursor: draggingEditor === t.id ? "grabbing" : "grab" }}
                            >
                              {t.shape === "round"
                                ? <circle cx={cx} cy={cy} r={t.w / 2} fill="#f9fafb" stroke="#9ca3af" strokeWidth="1.5" />
                                : <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="6" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1.5" />
                              }
                              <text x={cx} y={cy - 2} textAnchor="middle" fill="#374151" fontSize="9" fontFamily="system-ui" fontWeight="700">{t.label}</text>
                              <text x={cx} y={cy + 9} textAnchor="middle" fill="#9ca3af" fontSize="7" fontFamily="system-ui">{t.seats}p</text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                    <p className="font-inter text-xs text-gray-400 text-center mt-2">Double-click a table to remove it from this layout</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                CREATE EVENT
            ════════════════════════════════════════════════════════════ */}
            {mainTab === "create-event" && (
              <motion.div key="create" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-6">
                <div className="max-w-2xl">
                  <h2 className="font-playfair text-xl text-gray-900 mb-1">Create Event</h2>
                  <p className="font-inter text-xs text-gray-400 mb-6">Featured events appear on the public Events page.</p>
                  <AnimatePresence mode="wait">
                    {!eventSaved ? (
                      <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-5">
                        <div><label className={labelCls}>Event Title *</label><input type="text" placeholder="e.g. Tropical Brunch Series" value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} className={inputCls} /></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className={labelCls}>Date *</label><input type="date" value={eventForm.date} onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))} className={inputCls} /></div>
                          <div><label className={labelCls}>Time *</label><input type="time" value={eventForm.time} onChange={(e) => setEventForm((p) => ({ ...p, time: e.target.value }))} className={inputCls} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className={labelCls}>Event Type</label><select value={eventForm.type} onChange={(e) => setEventForm((p) => ({ ...p, type: e.target.value }))} className={`${inputCls} cursor-pointer`}>{["Brunch","Happy Hour","Dinner","Live Music","Private Buyout","Holiday","Other"].map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
                          <div><label className={labelCls}>Capacity</label><input type="number" placeholder="e.g. 80" value={eventForm.capacity} onChange={(e) => setEventForm((p) => ({ ...p, capacity: e.target.value }))} className={inputCls} /></div>
                        </div>
                        <div><label className={labelCls}>Description</label><textarea rows={4} placeholder="Describe the event..." value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} className={`${inputCls} resize-none`} /></div>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div onClick={() => setEventForm((p) => ({ ...p, featured: !p.featured }))} className={`w-10 h-6 rounded-full border-2 transition-all flex items-center ${eventForm.featured ? "border-[#c9a84c]" : "bg-gray-200 border-gray-200"}`} style={eventForm.featured ? { background: "#c9a84c" } : {}}>
                            <div className={`w-4 h-4 rounded-full bg-white shadow mx-0.5 transition-transform ${eventForm.featured ? "translate-x-4" : ""}`} />
                          </div>
                          <span className="font-inter text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Feature on Events page</span>
                        </label>
                        <button disabled={!eventForm.title || !eventForm.date || !eventForm.time} onClick={() => setEventSaved(true)}
                          className={`cursor-pointer w-full py-3.5 rounded-xl font-semibold font-inter text-sm transition-all ${eventForm.title && eventForm.date && eventForm.time ? "text-black hover:opacity-90 shadow-md" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                          style={eventForm.title && eventForm.date && eventForm.time ? { background: "#c9a84c" } : {}}>
                          Publish Event
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div key="saved" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto mb-4">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="font-playfair text-2xl text-gray-900 mb-2">Event Published!</h3>
                        <p className="font-inter text-sm text-gray-600 mb-6"><span className="font-semibold">{eventForm.title}</span> is now live{eventForm.featured ? " and featured" : ""}.</p>
                        <button onClick={() => { setEventSaved(false); setEventForm({ title: "", date: "", time: "", type: "Dinner", capacity: "", description: "", featured: false }); }}
                          className="cursor-pointer px-6 py-3 rounded-xl font-semibold font-inter text-sm text-black hover:opacity-90 shadow-md" style={{ background: "#c9a84c" }}>
                          Create Another
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
