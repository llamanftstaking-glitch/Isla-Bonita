"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    label: "Chicken Wings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 13.5V12a3 3 0 00-6 0v1.5m6 0v1.875c0 1.035-.841 1.875-1.875 1.875h-2.25A1.875 1.875 0 019 15.375V13.5m6 0H9" />
      </svg>
    ),
  },
  {
    label: "Chicken Tacos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
  },
  {
    label: "Mozzarella Sticks",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    label: "Salmon Croquettes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
      </svg>
    ),
  },
  {
    label: "Calamari",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    ),
  },
  {
    label: "Shrimp Flatbread",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
];

export default function HappyHour() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="happy-hour" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0805]" />
      {/* Amalfi dual glow — lemon + azure */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#c9a84c]/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1a6b8a]/6 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#f0d060]/5 blur-[90px] pointer-events-none" />
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(to right, #c9a84c 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Every Day
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl text-white mb-2"
          >
            Happy Hour
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="inline-flex items-center gap-3 mt-2"
          >
            <div className="h-px w-12 bg-[#c9a84c]/40" />
            <p className="font-playfair italic text-[#c9a84c] text-2xl">4 PM – 7 PM</p>
            <div className="h-px w-12 bg-[#c9a84c]/40" />
          </motion.div>
        </div>

        {/* Bento grid for items */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className="group relative bg-[#130f09]/80 border border-[#2a2010] rounded-2xl p-5 hover:border-[#c9a84c]/40 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/3 transition-colors duration-300 rounded-2xl" />
              <div className="relative">
                <div className="text-[#c9a84c]/50 group-hover:text-[#c9a84c] transition-colors duration-300 mb-3">
                  {item.icon}
                </div>
                <div className="font-inter text-sm text-[#c8b89a]/60 group-hover:text-[#c8b89a] transition-colors duration-300">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Glass feature card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="relative overflow-hidden rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/8 to-transparent" />
          <div className="relative px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#c9a84c]/15 border border-[#c9a84c]/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .23 2.798-1.144 2.798H3.942c-1.373 0-2.144-1.799-1.144-2.798l1.402-1.402" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-inter text-[10px] text-[#c9a84c] tracking-[0.35em] uppercase mb-1">
                Every Day · Dine-In Only
              </div>
              <div className="font-playfair text-white text-xl mb-3">Appetizers + Drinks Specials</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Appetizers", price: "$6" },
                  { label: "Premium Cocktails", price: "$10" },
                  { label: "Copa de Vino", price: "$6" },
                  { label: "Beer", price: "$4" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#130f09] border border-[#2a2010]">
                    <span className="font-inter text-[10px] text-[#c8b89a]/50 uppercase tracking-wider">{item.label}</span>
                    <span className="font-playfair text-[#f0d060] text-sm font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm:ml-auto flex-shrink-0">
              <div className="px-4 py-2 rounded-full bg-[#c9a84c] text-black font-semibold font-inter text-xs tracking-wide">
                Mon – Sun · 4–7 PM
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
