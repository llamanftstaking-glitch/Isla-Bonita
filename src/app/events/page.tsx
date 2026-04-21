"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

const eventTypes = [
  {
    title: "Birthdays",
    desc: "Make it unforgettable. Private dining, custom décor, bottle service, and a dedicated events team.",
    img: "/event-balloon-party.jpg",
    accent: "#c9a84c",
  },
  {
    title: "Weddings",
    desc: "Rehearsal dinners, receptions, and intimate ceremonies with our full culinary experience.",
    img: "/event-candles-setup.jpg",
    accent: "#f0d060",
  },
  {
    title: "Live Music",
    desc: "Private performances, DJ nights, and live entertainment packages for any occasion.",
    img: "/event-live-music.jpg",
    accent: "#2e8fb0",
  },
];

const venueFeatures = [
  { icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21", label: "Private Dining Room", desc: "Up to 40 guests" },
  { icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .23 2.798-1.144 2.798H3.942c-1.373 0-2.144-1.799-1.144-2.798l1.402-1.402", label: "Full Bar Buyout", desc: "Signature cocktail stations" },
  { icon: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m1.125 2.625h7.5", label: "AV & Lighting", desc: "Custom ambiance setup" },
  { icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z", label: "Dedicated Events Team", desc: "Full planning support" },
  { icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5", label: "Custom Menus", desc: "Chef-curated for your event" },
  { icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z", label: "Flexible Pricing", desc: "Packages for every budget" },
];

type FormState = {
  name: string; email: string; phone: string;
  eventType: string; date: string; startTime: string;
  guests: string; occasion: string;
  addOns: string[]; notes: string;
};

const eventTypeOptions = ["Birthday Party", "Wedding / Reception", "Anniversary", "Baby Shower", "Graduation", "Corporate Event", "Live Music Night", "Holiday Party", "Other"];
const addOnOptions = ["Bottle Service", "Live Music", "DJ Setup", "Custom Cake", "Balloon Décor", "Photographer", "Dedicated Server"];
const guestOptions = ["Under 10", "10 – 20", "20 – 40", "40 – 60", "60 – 100", "100+"];
const timeOptions = ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

export default function EventsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "",
    eventType: "", date: "", startTime: "",
    guests: "", occasion: "", addOns: [], notes: "",
  });

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleAddOn = (item: string) =>
    setForm((f) => ({
      ...f,
      addOns: f.addOns.includes(item) ? f.addOns.filter((a) => a !== item) : [...f.addOns, item],
    }));

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
          <Image src="/event-candles-setup.jpg" alt="Private events" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805]/60 via-[#0a0805]/75 to-[#0a0805]" />
        </div>
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] rounded-full bg-[#c9a84c]/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Private Events
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl text-white mb-6"
          >
            Host Your{" "}
            <span className="italic text-[#c9a84c]">Celebration</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-[#c8b89a]/55 text-base max-w-xl mx-auto"
          >
            Birthdays, weddings, baby showers, corporate nights — we host it all with Caribbean warmth and Amalfi elegance.
          </motion.p>
        </div>
      </section>

      {/* Event type showcase */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5 mb-20">
            {eventTypes.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-[#2a2010] hover:border-[#c9a84c]/30 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-56">
                  <Image src={e.img} alt={e.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-playfair text-xl text-white mb-2" style={{ color: undefined }}>
                    <span className="group-hover:text-[#c9a84c] transition-colors duration-200">{e.title}</span>
                  </h3>
                  <p className="font-inter text-sm text-[#c8b89a]/50 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Venue features */}
          <div className="text-center mb-10">
            <p className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4">Venue Features</p>
            <h2 className="font-playfair text-4xl text-white">
              Everything <span className="italic text-[#c9a84c]">Included</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-20">
            {venueFeatures.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-[#130f09]/80 border border-[#2a2010]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-inter text-sm text-white font-medium">{f.label}</p>
                  <p className="font-inter text-xs text-[#c8b89a]/40 mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Events inquiry form */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4">Plan Your Event</p>
              <h2 className="font-playfair text-4xl text-white">
                Event <span className="italic text-[#c9a84c]">Inquiry</span>
              </h2>
              <p className="font-inter text-[#c8b89a]/50 mt-3 text-sm">Tell us about your celebration and we'll be in touch within 24 hours.</p>
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
                <h3 className="font-playfair text-2xl text-white mb-2">We'll be in touch!</h3>
                <p className="font-inter text-sm text-[#c8b89a]/60">
                  Thank you, {form.name}. Our events team will reach out to {form.email} within 24 hours to plan your {form.eventType || "event"}.
                </p>
                <p className="font-inter text-xs text-[#c8b89a]/35 mt-3">
                  Urgent? Call <a href="tel:+16465591222" className="text-[#c9a84c]">(646) 559-1222</a>
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 border border-[#2a2010] space-y-5"
                style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}
              >
                <div>
                  <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-4">Your Information</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Full Name *</label>
                      <input type="text" required placeholder="Your name" value={form.name} onChange={set("name")} className={inputCls} />
                    </div>
                    <div>
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Email *</label>
                      <input type="email" required placeholder="your@email.com" value={form.email} onChange={set("email")} className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Phone *</label>
                      <input type="tel" required placeholder="(000) 000-0000" value={form.phone} onChange={set("phone")} className={inputCls} />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#2a2010]" />

                <div>
                  <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-4">Event Details</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Event Type *</label>
                      <select required value={form.eventType} onChange={set("eventType")} className={inputCls}>
                        <option value="">Select type...</option>
                        {eventTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Date *</label>
                      <input type="date" required value={form.date} onChange={set("date")} className={inputCls} />
                    </div>
                    <div>
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Start Time</label>
                      <select value={form.startTime} onChange={set("startTime")} className={inputCls}>
                        <option value="">Select time...</option>
                        {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Expected Guests *</label>
                      <select required value={form.guests} onChange={set("guests")} className={inputCls}>
                        <option value="">Select range...</option>
                        {guestOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Occasion / Theme</label>
                      <input type="text" placeholder="e.g. 30th Birthday, Quinceanera, Anniversary..." value={form.occasion} onChange={set("occasion")} className={inputCls} />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#2a2010]" />

                {/* Add-ons */}
                <div>
                  <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-4">Add-Ons (optional)</p>
                  <div className="flex flex-wrap gap-2">
                    {addOnOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAddOn(item)}
                        className={`cursor-pointer px-4 py-2 rounded-full font-inter text-xs transition-all duration-200 ${
                          form.addOns.includes(item)
                            ? "bg-[#c9a84c] text-black font-semibold"
                            : "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/50 hover:border-[#c9a84c]/40"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-inter text-xs text-[#c8b89a]/50 mb-2">Additional Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Anything else we should know..."
                    value={form.notes}
                    onChange={set("notes")}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full py-4 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter hover:bg-[#f0d060] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit Event Request
                </button>
                <p className="font-inter text-[10px] text-center text-[#c8b89a]/30">
                  Or call us at <a href="tel:+16465591222" className="text-[#c9a84c]">(646) 559-1222</a>
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
