"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

const TIME_SLOTS = [
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM",
  "5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM",
  "7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM",
];

const PARTY_SIZES = [1,2,3,4,5,6,7,8];

const OCCASIONS = [
  "No special occasion",
  "Birthday",
  "Anniversary",
  "Date Night",
  "Business Dinner",
  "Bridal / Baby Shower",
  "Graduation",
  "Holiday Celebration",
  "Other",
];

interface FormData {
  partySize: number;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occasion: string;
  notes: string;
}

export default function ReservePage() {
  const [form, setForm] = useState<FormData>({
    partySize: 2,
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    occasion: "No special occasion",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData, val: string | number) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const canSubmit =
    form.date && form.time && form.firstName && form.lastName &&
    form.phone && form.email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) setSubmitted(true);
  };

  const inputCls =
    "w-full bg-[#0d0a04] border border-[#2a2010] rounded-xl px-4 py-3.5 font-inter text-sm text-white placeholder-[#4a3a20] focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/20 transition-all duration-200";

  const labelCls = "block font-inter text-[11px] text-[#c9a84c] tracking-[0.25em] uppercase mb-2";

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#080603]">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#130f09] to-[#080603]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/15 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#c9a84c]/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-inter text-[11px] tracking-[0.4em] uppercase text-[#c9a84c] mb-4"
          >
            3950 10th Ave Suite B · Inwood, NY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl text-white mb-4"
          >
            Reserve Your{" "}
            <span className="italic text-[#c9a84c]">Table</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-[#c8b89a]/50 text-sm leading-relaxed"
          >
            For parties larger than 8, please call us at{" "}
            <a href="tel:+16465591222" className="text-[#c9a84c] hover:underline">
              (646) 559-1222
            </a>{" "}
            or inquire about{" "}
            <Link href="/events" className="text-[#c9a84c] hover:underline">
              private dining
            </Link>
            .
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 pb-28">
        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#2a2010] overflow-hidden"
                style={{ background: "rgba(13,10,4,0.85)", backdropFilter: "blur(12px)" }}
              >
                {/* Party size & date */}
                <div className="p-8 border-b border-[#2a2010] space-y-6">
                  <div>
                    <label className={labelCls}>Party Size</label>
                    <div className="flex gap-2 flex-wrap">
                      {PARTY_SIZES.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => set("partySize", n)}
                          className={`cursor-pointer w-11 h-11 rounded-xl font-inter text-sm font-medium transition-all duration-200 ${
                            form.partySize === n
                              ? "bg-[#c9a84c] text-black"
                              : "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/60 hover:border-[#c9a84c]/40 hover:text-[#c8b89a]"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                      <div className="flex items-center gap-1.5 ml-1">
                        <span className="font-inter text-xs text-[#c8b89a]/35">up to 8</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Date</label>
                      <input
                        type="date"
                        required
                        min={today}
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Time</label>
                      <select
                        required
                        value={form.time}
                        onChange={(e) => set("time", e.target.value)}
                        className={`${inputCls} cursor-pointer`}
                      >
                        <option value="" disabled>Select time</option>
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time chips (quick pick) */}
                  {form.date && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-inter text-[11px] text-[#c8b89a]/30 uppercase tracking-widest mb-2">Quick select</p>
                      <div className="flex gap-2 flex-wrap">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => set("time", t)}
                            className={`cursor-pointer px-3 py-1.5 rounded-lg font-inter text-xs transition-all duration-200 ${
                              form.time === t
                                ? "bg-[#c9a84c] text-black font-medium"
                                : "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/50 hover:border-[#c9a84c]/30 hover:text-[#c8b89a]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Guest info */}
                <div className="p-8 border-b border-[#2a2010] space-y-5">
                  <h3 className="font-playfair text-lg text-white">Your Information</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="First name"
                        value={form.firstName}
                        onChange={(e) => set("firstName", e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={(e) => set("lastName", e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(212) 000-0000"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Occasion & notes */}
                <div className="p-8 space-y-5">
                  <div>
                    <label className={labelCls}>Occasion</label>
                    <select
                      value={form.occasion}
                      onChange={(e) => set("occasion", e.target.value)}
                      className={`${inputCls} cursor-pointer`}
                    >
                      {OCCASIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Special Requests</label>
                    <textarea
                      rows={3}
                      placeholder="Dietary restrictions, accessibility needs, seating preference, celebrations..."
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`cursor-pointer w-full py-4 rounded-xl font-semibold font-inter text-sm tracking-wide transition-all duration-200 ${
                      canSubmit
                        ? "bg-[#c9a84c] text-black hover:bg-[#f0d060] hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#c9a84c]/20"
                        : "bg-[#2a2010] text-[#4a3a20] cursor-not-allowed"
                    }`}
                  >
                    Confirm Reservation
                  </button>

                  <p className="font-inter text-[10px] text-center text-[#c8b89a]/25 mt-3">
                    Need help?{" "}
                    <a href="tel:+16465591222" className="text-[#c9a84c]">
                      Call (646) 559-1222
                    </a>
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                  className="w-24 h-24 rounded-full bg-[#c9a84c]/15 border-2 border-[#c9a84c]/40 flex items-center justify-center mx-auto mb-8"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-11 h-11">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>

                <h2 className="font-playfair text-4xl text-white mb-3">
                  See you soon, {form.firstName}!
                </h2>
                <p className="font-inter text-[#c8b89a]/55 mb-10 leading-relaxed">
                  Your reservation has been received. We'll confirm via{" "}
                  <span className="text-[#c9a84c]">{form.email}</span>.
                </p>

                <div
                  className="rounded-2xl border border-[#c9a84c]/20 p-6 mb-8 text-left mx-auto max-w-sm"
                  style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}
                >
                  <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-4">Reservation Summary</p>
                  <div className="space-y-3">
                    {[
                      { label: "Name", val: `${form.firstName} ${form.lastName}` },
                      { label: "Date", val: form.date },
                      { label: "Time", val: form.time },
                      { label: "Party", val: `${form.partySize} ${form.partySize === 1 ? "guest" : "guests"}` },
                      ...(form.occasion !== "No special occasion" ? [{ label: "Occasion", val: form.occasion }] : []),
                    ].map((r) => (
                      <div key={r.label} className="flex justify-between">
                        <span className="font-inter text-xs text-[#c8b89a]/35 uppercase tracking-wider">{r.label}</span>
                        <span className="font-inter text-sm text-white">{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                  <a
                    href="tel:+16465591222"
                    className="flex-1 py-3.5 rounded-xl border border-[#2a2010] text-[#c8b89a]/60 font-inter text-sm text-center hover:border-[#c9a84c]/30 hover:text-[#c8b89a] transition-all duration-200"
                  >
                    Call Us
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="cursor-pointer flex-1 py-3.5 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter text-sm hover:bg-[#f0d060] transition-all duration-200"
                  >
                    New Reservation
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
