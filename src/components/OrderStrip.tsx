"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const platforms = [
  {
    name: "UberEats",
    href: "https://www.ubereats.com/store/isla-bonita/",
    color: "#06C167",
    bg: "rgba(6,193,103,0.08)",
    border: "rgba(6,193,103,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    name: "DoorDash",
    href: "https://www.doordash.com/store/isla-bonita-new-york/",
    color: "#FF3008",
    bg: "rgba(255,48,8,0.08)",
    border: "rgba(255,48,8,0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

export default function OrderStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="relative py-14 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0a04]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/8 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-[#c9a84c]/3 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-2">Order Now</p>
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-2">
              Craving Isla Bonita?
            </h2>
            <p className="font-inter text-[#c8b89a]/50 text-sm max-w-xs">
              Get delivery or pickup straight to your door — available on your favorite platforms.
            </p>
          </motion.div>

          {/* Right — platform cards + dine-in CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3 items-center"
          >
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 min-w-[160px]"
                style={{
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                }}
              >
                <span style={{ color: p.color }} className="group-hover:scale-110 transition-transform duration-200">
                  {p.icon}
                </span>
                <div>
                  <p className="font-inter text-xs text-[#c8b89a]/40 uppercase tracking-wider leading-none mb-0.5">Order on</p>
                  <p className="font-inter text-sm font-semibold" style={{ color: p.color }}>{p.name}</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 ml-auto text-[#c8b89a]/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </motion.a>
            ))}

            {/* Divider */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-px h-12 bg-[#2a2010]" />
              <span className="font-inter text-xs text-[#c8b89a]/25">or</span>
              <div className="w-px h-12 bg-[#2a2010]" />
            </div>

            {/* Dine-in CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.42 }}
            >
              <Link
                href="/reserve"
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#c9a84c] text-black hover:bg-[#f0d060] transition-all duration-200 hover:scale-105 active:scale-95 min-w-[160px] group"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-wider leading-none mb-0.5 opacity-70">Dine In</p>
                  <p className="font-inter text-sm font-semibold">Reserve a Table</p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
