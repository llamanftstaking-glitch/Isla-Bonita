"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cocktails = [
  {
    src: "/cocktail-lemon-boat.jpg",
    name: "Lemon Boat",
    desc: "Fresh lemon hollowed and filled with a citrus spritz — served on our iconic nautical prop.",
    tag: "Signature",
    tagStyle: "bg-[#c9a84c] text-black",
    span: "md:col-span-1 md:row-span-2",
    overlay: "bg-gradient-to-t from-black/90 via-black/20 to-transparent",
    textPos: "bottom",
  },
  {
    src: "/cocktail-shell-box.jpg",
    name: "Shell Cocktail",
    desc: "Served in a gold terrarium with starfish & sand.",
    tag: "House Special",
    tagStyle: "bg-white/10 border border-white/20 text-white backdrop-blur-sm",
    span: "md:col-span-1",
    overlay: "bg-gradient-to-t from-black/85 via-black/10 to-transparent",
    textPos: "bottom",
  },
  {
    src: "/cocktail-tiki-mugs.jpg",
    name: "Tiki Cocktails",
    desc: "Caribbean-inspired cocktails in hand-painted tiki mugs.",
    tag: "Tropical",
    tagStyle: "bg-[#1a6b8a]/80 border border-[#1a6b8a] text-white backdrop-blur-sm",
    span: "md:col-span-1",
    overlay: "bg-gradient-to-t from-black/85 via-black/10 to-transparent",
    textPos: "bottom",
  },
];

const extraCocktails = [
  { src: "/cocktail-aperol-spritz.jpg", name: "Aperol Spritz", desc: "Classic Italian refreshment" },
  { src: "/cocktail-foam-coupe.jpg", name: "Foam Coupe", desc: "Elevated presentation with foam finish" },
  { src: "/cocktail-blue-sugar.jpg", name: "Blue Sugar", desc: "House blue cocktail with sugar rim" },
];

export default function Drinks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="drinks" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805] via-[#0d0a04] to-[#0a0805]" />
      {/* Dual ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#c9a84c]/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-64 rounded-full bg-[#1a6b8a]/5 blur-[90px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Cocktails & Beverages
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl text-white"
          >
            Crafted with <span className="italic text-[#c9a84c]">Passion</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
          />
        </div>

        {/* Main bento grid */}
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 md:h-[680px] mb-4">
          {cocktails.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl overflow-hidden bg-[#130f09] border border-[#2a2010]/80 group cursor-pointer ${c.span}`}
            >
              <Image
                src={c.src}
                alt={c.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={`absolute inset-0 ${c.overlay}`} />
              {/* Hover shimmer */}
              <div className="absolute inset-0 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/5 transition-colors duration-500" />

              {/* Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold font-inter ${c.tagStyle}`}>
                {c.tag}
              </div>

              {/* Glass bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="rounded-xl p-4 transition-all duration-300 group-hover:bg-black/40"
                  style={{
                    background: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3 className="font-playfair text-xl text-white mb-0.5 group-hover:text-[#f0d060] transition-colors duration-300">
                    {c.name}
                  </h3>
                  <p className="font-inter text-xs text-[#c8b89a]/65 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary mini row */}
        <div className="grid grid-cols-3 gap-4">
          {extraCocktails.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.08 }}
              className="relative h-40 rounded-2xl overflow-hidden border border-[#2a2010]/80 group cursor-pointer"
            >
              <Image
                src={c.src}
                alt={c.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/6 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-playfair text-sm text-white group-hover:text-[#f0d060] transition-colors duration-300">{c.name}</p>
                <p className="font-inter text-[10px] text-[#c8b89a]/50 mt-0.5">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Happy Hour callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-6 flex items-center justify-between gap-4 p-4 rounded-2xl border border-[#1a6b8a]/25 bg-[#1a6b8a]/6"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#2e8fb0] animate-pulse" />
            <p className="font-inter text-sm text-[#c8b89a]/70">
              <span className="text-[#2e8fb0] font-medium">Happy Hour</span> · Mon–Sun · 4–7 PM · Premium Cocktails{" "}
              <span className="text-[#f0d060] font-semibold">$10</span>
            </p>
          </div>
          <button
            onClick={() => document.getElementById("happy-hour")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer flex-shrink-0 px-4 py-2 rounded-full bg-[#1a6b8a]/20 border border-[#1a6b8a]/30 text-[#2e8fb0] font-inter text-xs tracking-wide hover:bg-[#1a6b8a]/35 transition-all duration-200"
          >
            View Specials
          </button>
        </motion.div>
      </div>
    </section>
  );
}
