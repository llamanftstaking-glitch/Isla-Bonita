"use client";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const photos = [
  {
    src: "/interior-cherry-blossom.jpg",
    alt: "Isla Bonita dining room with cherry blossom decor",
    label: "The Ambiance",
    category: "Interior",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/cocktail-shell-box.jpg",
    alt: "Shell cocktail in gold terrarium",
    label: "Signature Cocktails",
    category: "Drinks",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/food-steak-asparagus.jpg",
    alt: "Steak with asparagus and rosemary",
    label: "Prime Steak",
    category: "Food",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/cocktail-tiki-mugs.jpg",
    alt: "Tiki mug cocktails",
    label: "Tiki Cocktails",
    category: "Drinks",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/food-shrimp-fettuccine.jpg",
    alt: "Shrimp fettuccine pasta",
    label: "Shrimp Fettuccine",
    category: "Food",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/event-balloon-party.jpg",
    alt: "Private event setup with balloons and decor",
    label: "Private Events",
    category: "Events",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/food-tostones.jpg",
    alt: "Crispy tostones",
    label: "Tostones",
    category: "Food",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/cocktail-lemon-boat.jpg",
    alt: "Lemon boat cocktail",
    label: "Lemon Boat",
    category: "Drinks",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/interior-spring-flowers.jpg",
    alt: "Restaurant interior with spring flowers",
    label: "Spring Blooms",
    category: "Interior",
    span: "col-span-2 row-span-1",
  },
];

const categories = ["All", "Food", "Drinks", "Interior", "Events"];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<{ src: string; alt: string; label: string } | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? photos : photos.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="py-28 px-6 bg-[#0d0a04] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-64 h-96 bg-[#c9a84c]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-[#1a6b8a]/4 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            The Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl text-white"
          >
            Our <span className="italic text-[#c9a84c]">Gallery</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
          />
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex gap-2 flex-wrap justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`cursor-pointer px-4 py-1.5 rounded-full font-inter text-xs tracking-wider uppercase transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-[#c9a84c] text-black font-semibold"
                  : "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/50 hover:border-[#c9a84c]/30 hover:text-[#c8b89a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Bento grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group border border-[#2a2010]/60 hover:border-[#c9a84c]/35 transition-all duration-300 ${p.span}`}
                onClick={() => setSelected({ src: p.src, alt: p.alt, label: p.label })}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
                {/* Category tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-inter text-[9px] text-[#c9a84c] tracking-[0.3em] uppercase">{p.category}</span>
                </div>
                {/* Glass label — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
                  <div
                    className="px-4 py-2.5 rounded-xl flex items-center justify-between"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span className="font-inter text-white text-xs font-medium">{p.label}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#c9a84c] flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 p-6 rounded-2xl border border-[#c9a84c]/15 bg-[#c9a84c]/4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.35em] uppercase mb-1">Private Events</p>
            <p className="font-playfair text-white text-lg">Weddings · Birthdays · Baby Showers · Corporate</p>
            <p className="font-inter text-xs text-[#c8b89a]/45 mt-1">We host it all — reach out to book your private celebration</p>
          </div>
          <button
            onClick={() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer flex-shrink-0 px-6 py-3 rounded-full bg-[#c9a84c] text-black font-semibold font-inter text-sm hover:bg-[#f0d060] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Inquire Now
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(16px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(201,168,76,0.2)" }}
              >
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  width={1400}
                  height={900}
                  className="object-contain w-full h-full max-h-[80vh]"
                />
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-playfair text-white text-lg">{selected.label}</p>
                </div>
              </div>
            </motion.div>

            <button
              onClick={() => setSelected(null)}
              className="cursor-pointer absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
