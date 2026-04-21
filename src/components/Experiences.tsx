"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const experiences = [
  {
    id: "brunch",
    label: "Sunday Brunch",
    time: "11 AM – 3 PM",
    timeLabel: "Sun",
    desc: "Start your weekend right. Latin-inspired brunch plates, bottomless mimosas, and the full bar — all in our vibrant dining room.",
    highlights: ["Eggs & Churrasco", "Steak & Egg Plates", "Bottomless Mimosas", "Full Bar"],
    img: "/food-steak-egg-brunch.jpg",
    accent: "#f0d060",
    accentBg: "rgba(240,208,96,0.06)",
    accentBorder: "rgba(240,208,96,0.15)",
    cta: "Reserve Brunch",
    href: "/reserve",
  },
  {
    id: "happyhour",
    label: "Happy Hour",
    time: "4 PM – 7 PM",
    timeLabel: "Mon – Sun",
    desc: "Every single day. Premium cocktails, cold beer, and $6 appetizers. The best hour in Washington Heights.",
    highlights: ["Cocktails $10", "Wine $6", "Beer $4", "Appetizers $6"],
    img: "/interior-happy-hour-wall.jpg",
    accent: "#2e8fb0",
    accentBg: "rgba(46,143,176,0.06)",
    accentBorder: "rgba(46,143,176,0.18)",
    cta: "See Specials",
    href: "/#happy-hour",
  },
  {
    id: "dinner",
    label: "Dinner Service",
    time: "5 PM – Close",
    timeLabel: "Mon – Sun",
    desc: "Where Caribbean soul meets Amalfi Coast warmth. Chef Gus Moya's full menu — bold mains, signature cocktails, and an unforgettable night.",
    highlights: ["Churrasco $38", "Shrimp Fettuccine", "Signature Cocktails", "Desserts"],
    img: "/food-steak-asparagus.jpg",
    accent: "#c9a84c",
    accentBg: "rgba(201,168,76,0.06)",
    accentBorder: "rgba(201,168,76,0.18)",
    cta: "View Full Menu",
    href: "/menu",
  },
];

export default function Experiences() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 px-6 relative overflow-hidden bg-[#0a0805]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/12 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#c9a84c]/3 blur-[140px] pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Three Ways to Experience Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl text-white"
          >
            Every Visit is an <span className="italic text-[#c9a84c]">Experience</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
          />
        </div>

        {/* Experience cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{
                background: exp.accentBg,
                borderColor: exp.accentBorder,
              }}
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={exp.img}
                  alt={exp.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Time badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${exp.accent}30`,
                  }}
                >
                  <p className="font-inter text-[9px] tracking-[0.3em] uppercase" style={{ color: exp.accent }}>
                    {exp.timeLabel}
                  </p>
                  <p className="font-playfair text-white text-sm font-bold leading-tight">{exp.time}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p
                  className="font-inter text-[10px] tracking-[0.35em] uppercase mb-2"
                  style={{ color: exp.accent }}
                >
                  {exp.label}
                </p>
                <p className="font-inter text-sm text-[#c8b89a]/60 leading-relaxed mb-5">
                  {exp.desc}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-full font-inter text-[10px]"
                      style={{
                        background: `${exp.accent}12`,
                        border: `1px solid ${exp.accent}25`,
                        color: exp.accent,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={exp.href}
                  className="flex items-center gap-2 font-inter text-sm font-medium transition-all duration-200 group-hover:gap-3"
                  style={{ color: exp.accent }}
                >
                  {exp.cta}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ background: `linear-gradient(to right, ${exp.accent}80, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center font-inter text-xs text-[#c8b89a]/30 mt-10"
        >
          3950 10th Ave Suite B, New York · Open 7 days a week ·{" "}
          <a href="tel:+16465591222" className="text-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors duration-200">
            (646) 559-1222
          </a>
        </motion.p>
      </div>
    </section>
  );
}
