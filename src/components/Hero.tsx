"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/* Lemon branch SVG — purely decorative */
function LemonBranch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" fill="none" className={className} aria-hidden="true">
      {/* main stem */}
      <path d="M60 155 Q55 120 50 90 Q44 60 35 30" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* side branch left */}
      <path d="M50 90 Q30 80 18 65" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* side branch right */}
      <path d="M44 60 Q62 50 72 35" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* leaves */}
      <ellipse cx="16" cy="63" rx="10" ry="6" transform="rotate(-30 16 63)" fill="#c9a84c" opacity="0.15" />
      <ellipse cx="73" cy="33" rx="10" ry="6" transform="rotate(20 73 33)" fill="#c9a84c" opacity="0.15" />
      <ellipse cx="34" cy="27" rx="9" ry="5" transform="rotate(-15 34 27)" fill="#c9a84c" opacity="0.15" />
      {/* lemons */}
      <ellipse cx="24" cy="57" rx="7" ry="5" transform="rotate(-20 24 57)" fill="#f0d060" opacity="0.55" />
      <ellipse cx="66" cy="28" rx="6" ry="4.5" transform="rotate(15 66 28)" fill="#f0d060" opacity="0.55" />
      <ellipse cx="46" cy="85" rx="5.5" ry="4" transform="rotate(-10 46 85)" fill="#f0d060" opacity="0.45" />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={ref} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/interior-cherry-blossom.jpg"
          alt="Isla Bonita dining room"
          fill
          className="object-cover object-center scale-110"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-[#0a0805]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        {/* Amalfi azure glow — bottom left */}
        <div className="absolute bottom-0 left-0 w-96 h-64 bg-[#1a6b8a]/10 blur-[100px] pointer-events-none" />
        {/* Lemon warmth glow — top right */}
        <div className="absolute top-0 right-0 w-80 h-64 bg-[#f0d060]/6 blur-[100px] pointer-events-none" />
      </motion.div>

      {/* Decorative lemon branches */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="absolute left-4 md:left-10 bottom-24 pointer-events-none"
      >
        <LemonBranch className="w-16 md:w-24 opacity-60" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="absolute right-4 md:right-10 top-24 pointer-events-none rotate-180"
      >
        <LemonBranch className="w-14 md:w-20 opacity-50" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Floating glass badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#c9a84c]/30 bg-black/30 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f0d060] animate-pulse" />
          <span className="font-inter text-xs text-[#c9a84c] tracking-[0.3em] uppercase">New York City · Est. 2025</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-6xl sm:text-7xl md:text-9xl font-bold text-white leading-none mb-6 tracking-tight"
        >
          Isla{" "}
          <span className="italic text-[#c9a84c] relative">
            Bonita
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f0d060]/60 to-transparent origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-inter text-lg md:text-xl text-[#c8b89a]/75 max-w-xl mx-auto mb-3 leading-relaxed font-light"
        >
          Caribbean soul meets Amalfi Coast warmth.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-inter text-sm text-[#c8b89a]/45 max-w-md mx-auto mb-12 leading-relaxed font-light tracking-wide"
        >
          Bold flavors · Signature cocktails · Unforgettable ambiance
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("reserve")}
            className="cursor-pointer px-9 py-4 rounded-full bg-[#c9a84c] text-black font-semibold font-inter text-sm tracking-wide hover:bg-[#f0d060] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#c9a84c]/25"
          >
            Reserve a Table
          </button>
          <button
            onClick={() => scrollTo("drinks")}
            className="cursor-pointer px-9 py-4 rounded-full border border-white/20 text-white font-inter text-sm tracking-wide hover:border-[#c9a84c]/60 hover:bg-white/5 transition-all duration-200 backdrop-blur-sm"
          >
            Explore the Menu
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 flex justify-center gap-10 sm:gap-16"
        >
          {[
            { num: "1 Yr", label: "In Business" },
            { num: "4 PM", label: "Happy Hour" },
            { num: "30+", label: "Dishes" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-playfair text-2xl font-bold text-[#c9a84c]">{s.num}</div>
              <div className="font-inter text-xs text-white/40 tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("about")}
      >
        <span className="font-inter text-[#c9a84c]/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#c9a84c]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
