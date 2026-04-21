"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

const hours = [
  { day: "Monday",    lunch: "—",           dinner: "5:00 PM – 11:00 PM", happy: "4–7 PM" },
  { day: "Tuesday",   lunch: "—",           dinner: "5:00 PM – 11:00 PM", happy: "4–7 PM" },
  { day: "Wednesday", lunch: "—",           dinner: "5:00 PM – 11:00 PM", happy: "4–7 PM" },
  { day: "Thursday",  lunch: "—",           dinner: "5:00 PM – 12:00 AM", happy: "4–7 PM" },
  { day: "Friday",    lunch: "—",           dinner: "5:00 PM – 1:00 AM",  happy: "4–7 PM" },
  { day: "Saturday",  lunch: "12:00 – 4 PM (Brunch)", dinner: "5:00 PM – 1:00 AM",  happy: "4–7 PM" },
  { day: "Sunday",    lunch: "11:00 AM – 4 PM (Brunch)", dinner: "5:00 PM – 11:00 PM", happy: "4–7 PM" },
];

const subway = [
  {
    lines: ["A", "C"],
    color: "#2850AD",
    station: "207th St Station",
    walk: "4 min walk",
    direction: "Take the A or C train to 207th St. Exit at 207th St & 10th Ave. Walk south on 10th Ave — Isla Bonita is on your right.",
  },
  {
    lines: ["1"],
    color: "#EE352E",
    station: "Dyckman St Station",
    walk: "8 min walk",
    direction: "Take the 1 train to Dyckman St. Walk west on Dyckman St to 10th Ave, then south. We're about 3 blocks down on 10th Ave.",
  },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export default function HoursPage() {
  return (
    <div className="min-h-screen bg-[#0a0805]">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#130f09] to-[#0a0805]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] rounded-full bg-[#c9a84c]/4 blur-[120px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Find Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl text-white mb-4"
          >
            Hours &{" "}
            <span className="italic text-[#c9a84c]">Location</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-[#c8b89a]/55 text-base"
          >
            3950 10th Ave Suite B · Inwood · New York, NY 10034
          </motion.p>

          {/* Quick contact pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            <a
              href="tel:+16465591222"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a2010] bg-[#130f09] hover:border-[#c9a84c]/30 transition-all duration-200 group"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span className="font-inter text-sm text-[#c8b89a]/70 group-hover:text-white transition-colors">(646) 559-1222</span>
            </a>
            <Link
              href="/reserve"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#c9a84c] text-black font-semibold font-inter text-sm hover:bg-[#f0d060] transition-all duration-200 hover:scale-105"
            >
              Reserve a Table
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_440px] gap-8 items-start">

          {/* Left column */}
          <div className="space-y-6">

            {/* Hours table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-[#2a2010] overflow-hidden"
              style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}
            >
              <div className="px-6 py-4 border-b border-[#2a2010] flex items-center justify-between">
                <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase">Hours of Operation</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#06C167] animate-pulse" />
                  <span className="font-inter text-xs text-[#c8b89a]/50">Open Today</span>
                </div>
              </div>

              <div className="divide-y divide-[#2a2010]/60">
                {hours.map((h) => {
                  const isToday = h.day === today;
                  return (
                    <div
                      key={h.day}
                      className={`px-6 py-3.5 flex items-center justify-between gap-4 transition-colors duration-200 ${
                        isToday ? "bg-[#c9a84c]/6" : "hover:bg-[#130f09]/50"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-[120px]">
                        {isToday && <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] flex-shrink-0" />}
                        <span className={`font-inter text-sm ${isToday ? "text-[#c9a84c] font-medium" : "text-[#c8b89a]/70"}`}>
                          {h.day}
                        </span>
                      </div>
                      <div className="flex-1 text-right">
                        {h.lunch !== "—" && (
                          <p className="font-inter text-xs text-[#f0d060]/70">{h.lunch}</p>
                        )}
                        <p className="font-inter text-sm text-white">{h.dinner}</p>
                      </div>
                      <div className="text-right min-w-[70px]">
                        <span className="font-inter text-[10px] text-[#2e8fb0]/70 bg-[#1a6b8a]/12 px-2 py-0.5 rounded-full">
                          HH {h.happy}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-6 py-4 border-t border-[#2a2010] bg-[#1a6b8a]/5">
                <p className="font-inter text-xs text-[#2e8fb0]/70">
                  🍹 <span className="text-[#2e8fb0]">Happy Hour every day 4–7 PM</span> · Cocktails $10 · Wine $6 · Beer $4 · Apps $6
                </p>
              </div>
            </motion.div>

            {/* Subway directions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-[#2a2010] overflow-hidden"
              style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}
            >
              <div className="px-6 py-4 border-b border-[#2a2010]">
                <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase">Getting Here · Subway</p>
              </div>
              <div className="divide-y divide-[#2a2010]/60">
                {subway.map((s) => (
                  <div key={s.station} className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {s.lines.map((l) => (
                        <span
                          key={l}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                          style={{ background: s.color }}
                        >
                          {l}
                        </span>
                      ))}
                      <div>
                        <p className="font-inter text-sm text-white font-medium">{s.station}</p>
                        <p className="font-inter text-xs text-[#c9a84c]">{s.walk}</p>
                      </div>
                    </div>
                    <p className="font-inter text-sm text-[#c8b89a]/55 leading-relaxed">{s.direction}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bus & other */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              <div className="p-5 rounded-2xl border border-[#2a2010] bg-[#130f09]/70">
                <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-3">By Bus</p>
                <div className="space-y-2">
                  {[
                    { line: "Bx12", desc: "10th Ave & 207th St" },
                    { line: "M100", desc: "Amsterdam Ave & 207th St" },
                  ].map((b) => (
                    <div key={b.line} className="flex items-center gap-2">
                      <span className="w-10 px-1.5 py-0.5 rounded font-bold text-white text-xs text-center" style={{ background: "#1D6320" }}>
                        {b.line}
                      </span>
                      <span className="font-inter text-xs text-[#c8b89a]/55">{b.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-[#2a2010] bg-[#130f09]/70">
                <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-3">Parking</p>
                <p className="font-inter text-sm text-[#c8b89a]/60 leading-relaxed">
                  Street parking available on 10th Ave and Dyckman St. Meters active until 7 PM. Several paid lots within a 3-minute walk.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column — Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24 space-y-4"
          >
            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-[#2a2010]" style={{ height: 360 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.7249874855!2d-73.92553!3d40.86750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f968de9e2123%3A0xe28aec8196098f0f!2s3950%2010th%20Ave%2C%20New%20York%2C%20NY%2010034!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) saturate(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Isla Bonita Location"
              />
            </div>

            {/* Address card */}
            <div
              className="rounded-2xl border border-[#2a2010] p-6 space-y-4"
              style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-inter text-[10px] text-[#c9a84c]/70 uppercase tracking-wider mb-0.5">Address</p>
                  <p className="font-inter text-sm text-white">3950 10th Ave Suite B</p>
                  <p className="font-inter text-sm text-white">New York, NY 10034</p>
                  <p className="font-inter text-xs text-[#c8b89a]/40 mt-0.5">Inwood</p>
                </div>
              </div>

              <div className="h-px bg-[#2a2010]" />

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/12 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="font-inter text-[10px] text-[#c9a84c]/70 uppercase tracking-wider mb-0.5">Phone</p>
                  <a href="tel:+16465591222" className="font-inter text-sm text-white hover:text-[#c9a84c] transition-colors">(646) 559-1222</a>
                </div>
              </div>

              <div className="h-px bg-[#2a2010]" />

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://maps.google.com/?q=3950+10th+Ave+New+York+NY+10034"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2a2010] text-[#c8b89a]/60 font-inter text-xs hover:border-[#c9a84c]/30 hover:text-[#c9a84c] transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                  Directions
                </a>
                <Link
                  href="/reserve"
                  className="flex items-center justify-center py-3 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter text-xs hover:bg-[#f0d060] transition-all duration-200"
                >
                  Reserve
                </Link>
              </div>
            </div>

            {/* Neighborhood note */}
            <div className="p-4 rounded-2xl border border-[#1a6b8a]/20 bg-[#1a6b8a]/5">
              <p className="font-inter text-xs text-[#2e8fb0]/80 leading-relaxed">
                <span className="text-[#2e8fb0] font-medium">Inwood tip:</span>{" "}
                We're steps from Inwood Hill Park and the A/C express stop. Plan to arrive by 4 PM to catch Happy Hour!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
