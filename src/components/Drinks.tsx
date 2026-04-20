"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cocktails = [
  {
    src: "/cocktail-1.jpg",
    name: "Limone Spritz",
    desc: "Our house signature. Fresh lemon hollowed and filled with a citrus spritz — light, bright, and unforgettable.",
    tag: "Signature",
    price: "$14",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    src: "/cocktail-2.jpg",
    name: "Lemon Boat",
    desc: "Same iconic vessel, garnished with a glass straw and dehydrated citrus wheel. Served on our nautical prop.",
    tag: "Fan Favorite",
    price: "$14",
    span: "md:col-span-1",
  },
];

export default function Drinks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="drinks" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805] via-[#0d0a04] to-[#0a0805]" />
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#c9a84c]/4 blur-[100px] pointer-events-none" />

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

        {/* Bento grid */}
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 md:h-[680px]">
          {/* Tall left card — Limone Spritz */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden bg-[#130f09] border border-[#2a2010]/80 group cursor-pointer md:row-span-2"
          >
            <Image
              src="/cocktail-1.jpg"
              alt="Limone Spritz"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            {/* Glass badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-[#c9a84c] text-black font-inter">
              Signature
            </div>
            <div className="absolute top-4 right-4 font-playfair text-xl text-white/90">$14</div>
            {/* Bottom glass card */}
            <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-sm bg-black/20 border-t border-white/5">
              <h3 className="font-playfair text-2xl text-white mb-1">Limone Spritz</h3>
              <p className="font-inter text-sm text-[#c8b89a]/70 leading-relaxed">
                Fresh lemon hollowed and filled with a citrus spritz — light, bright, and unforgettable.
              </p>
            </div>
          </motion.div>

          {/* Top right — Lemon Boat */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden bg-[#130f09] border border-[#2a2010]/80 group cursor-pointer"
          >
            <Image
              src="/cocktail-2.jpg"
              alt="Lemon Boat"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white font-inter backdrop-blur-sm">
              Fan Favorite
            </div>
            <div className="absolute top-4 right-4 font-playfair text-xl text-white/90">$14</div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-playfair text-xl text-white mb-1">Lemon Boat</h3>
              <p className="font-inter text-xs text-[#c8b89a]/60">Nautical presentation, dehydrated citrus wheel.</p>
            </div>
          </motion.div>

          {/* Bottom right — Peroni glass card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-2xl overflow-hidden bg-[#130f09] border border-[#2a2010]/80 group cursor-pointer"
          >
            <Image
              src="/peroni.jpg"
              alt="Peroni Happy Hour"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6">
              <div>
                <p className="font-inter text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase mb-2">On Draft & Bottle</p>
                <h3 className="font-playfair text-2xl text-white mb-1">Peroni Nastro Azzurro</h3>
                <p className="font-inter text-xs text-[#c8b89a]/60 max-w-[200px]">Premium Italian lager. Perfect for happy hour.</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                  <span className="font-inter text-[#c9a84c] text-[10px] tracking-wider uppercase">Happy Hour 4–7 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
