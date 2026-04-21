"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

const offerings = [
  {
    icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 13.5V12a3 3 0 00-6 0v1.5m6 0v1.875c0 1.035-.841 1.875-1.875 1.875h-2.25A1.875 1.875 0 019 15.375V13.5m6 0H9",
    title: "Corporate Catering",
    desc: "Office lunches, boardroom dinners, and team celebrations — delivered fresh with full setup.",
  },
  {
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    title: "Private Events",
    desc: "Birthdays, weddings, baby showers — our full menu and signature cocktails brought to you.",
  },
  {
    icon: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
    title: "Cocktail Receptions",
    desc: "Passed appetizers, signature cocktail stations, and full bar service for any occasion.",
  },
  {
    icon: "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
    title: "Full-Service Buffet",
    desc: "Hot and cold stations featuring our Caribbean-Mediterranean fusion menu for large groups.",
  },
  {
    icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z",
    title: "Stations & Displays",
    desc: "Live cooking stations, carving stations, and chef-attended spreads for immersive experiences.",
  },
  {
    icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
    title: "Brunch Packages",
    desc: "Weekend brunch spreads featuring our Latin-inspired brunch menu and bottomless options.",
  },
];

const eventTypes = ["Corporate Lunch/Dinner", "Wedding Reception", "Birthday Party", "Baby Shower", "Cocktail Reception", "Holiday Party", "Other"];
const guestRanges = ["Under 25", "25 – 50", "50 – 100", "100 – 200", "200+"];
const budgetRanges = ["Under $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000+", "Flexible / Discuss"];

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  date: string;
  guests: string;
  budget: string;
  venue: string;
  notes: string;
};

export default function CateringPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", company: "",
    eventType: "", date: "", guests: "", budget: "",
    venue: "On-site (your location)", notes: "",
  });

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls = "w-full bg-[#0a0805] border border-[#2a2010] rounded-xl px-4 py-3 font-inter text-sm text-white placeholder-[#4a3a20] focus:outline-none focus:border-[#c9a84c]/50 transition-colors";

  return (
    <div className="min-h-screen bg-[#0a0805]">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/event-balloon-party.jpg" alt="Catering event" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805]/70 via-[#0a0805]/80 to-[#0a0805]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#c9a84c]/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Chef Gus Moya
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl text-white mb-6"
          >
            Catering &{" "}
            <span className="italic text-[#c9a84c]">Off-Site</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-[#c8b89a]/55 text-base max-w-xl mx-auto"
          >
            Bring the Isla Bonita experience to your event. We cater everything from intimate gatherings to large corporate celebrations.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex justify-center gap-8 mt-10"
          >
            {[
              { num: "10+", label: "Years Catering" },
              { num: "200+", label: "Max Guests" },
              { num: "50+", label: "Menu Items" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-playfair text-2xl font-bold text-[#c9a84c]">{s.num}</div>
                <div className="font-inter text-xs text-white/40 tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Offerings grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4">What We Offer</p>
            <h2 className="font-playfair text-4xl text-white">
              Catering <span className="italic text-[#c9a84c]">Packages</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {offerings.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group p-6 rounded-2xl bg-[#130f09]/80 border border-[#2a2010] hover:border-[#c9a84c]/35 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center mb-4 group-hover:bg-[#c9a84c]/15 transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={o.icon} />
                  </svg>
                </div>
                <h3 className="font-playfair text-white text-lg mb-2 group-hover:text-[#c9a84c] transition-colors duration-200">{o.title}</h3>
                <p className="font-inter text-sm text-[#c8b89a]/50 leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Inquiry form */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4">Get a Quote</p>
              <h2 className="font-playfair text-4xl text-white">
                Catering <span className="italic text-[#c9a84c]">Inquiry</span>
              </h2>
              <p className="font-inter text-[#c8b89a]/50 mt-3 text-sm">We'll get back to you within 24 hours with a custom proposal.</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-14 text-center border border-[#c9a84c]/25 bg-[#130f09]/70"
              >
                <div className="w-16 h-16 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-playfair text-2xl text-white mb-2">Inquiry Received!</h3>
                <p className="font-inter text-sm text-[#c8b89a]/60">
                  Thank you, {form.name}. We'll reach out to {form.email} within 24 hours with a custom catering proposal.
                </p>
                <p className="font-inter text-xs text-[#c8b89a]/35 mt-3">
                  Questions? Call us at <a href="tel:+16465591222" className="text-[#c9a84c]">(646) 559-1222</a>
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 border border-[#2a2010] space-y-4"
                style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}
              >
                {/* Contact info */}
                <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase">Contact Information</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Full Name *</label>
                    <input type="text" required placeholder="Your name" value={form.name} onChange={set("name")} className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Email *</label>
                    <input type="email" required placeholder="your@email.com" value={form.email} onChange={set("email")} className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Phone *</label>
                    <input type="tel" required placeholder="(000) 000-0000" value={form.phone} onChange={set("phone")} className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Company / Organization</label>
                    <input type="text" placeholder="Optional" value={form.company} onChange={set("company")} className={inputCls} />
                  </div>
                </div>

                {/* Event details */}
                <div className="h-px bg-[#2a2010] my-2" />
                <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase">Event Details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Event Type *</label>
                    <select required value={form.eventType} onChange={set("eventType")} className={inputCls}>
                      <option value="">Select type...</option>
                      {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Event Date *</label>
                    <input type="date" required value={form.date} onChange={set("date")} className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Expected Guests *</label>
                    <select required value={form.guests} onChange={set("guests")} className={inputCls}>
                      <option value="">Select range...</option>
                      {guestRanges.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Budget Range</label>
                    <select value={form.budget} onChange={set("budget")} className={inputCls}>
                      <option value="">Select range...</option>
                      {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Event Venue / Location</label>
                  <input type="text" placeholder="Address or venue name" value={form.venue} onChange={set("venue")} className={inputCls} />
                </div>
                <div>
                  <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Additional Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Dietary restrictions, theme, special requests, menu preferences..."
                    value={form.notes}
                    onChange={set("notes")}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full py-4 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter hover:bg-[#f0d060] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c9a84c]/15"
                >
                  Submit Catering Inquiry
                </button>
                <p className="font-inter text-[10px] text-center text-[#c8b89a]/30">
                  Or call us directly at <a href="tel:+16465591222" className="text-[#c9a84c]">(646) 559-1222</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
