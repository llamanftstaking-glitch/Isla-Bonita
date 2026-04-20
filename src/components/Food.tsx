"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Food() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="food" className="py-28 px-6 bg-[#100d06]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-[#2a2010]">
              <Image
                src="/food-pasta.jpg"
                alt="Pasta Gamberi"
                fill
                className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-[#c9a84c] text-black rounded-2xl px-6 py-4 text-center shadow-2xl"
            >
              <div className="font-playfair text-3xl font-bold">$30</div>
              <div className="font-inter text-xs font-semibold tracking-wide">Dinner Special</div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-inter mb-4"
            >
              Chef's Special
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-playfair text-4xl md:text-5xl text-white mb-6"
            >
              Pasta{" "}
              <span className="italic text-[#c9a84c]">Gamberi</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-px w-16 bg-[#c9a84c]/60 mb-8 origin-left"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-inter text-[#c8b89a]/70 leading-relaxed mb-6"
            >
              Succulent shrimp tossed in a bright lemon butter sauce over al dente pasta,
              finished with fresh herbs and a squeeze of Amalfi lemon. A taste of the
              Mediterranean coast, right here in New York.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="font-inter text-[#c8b89a]/50 text-sm leading-relaxed mb-10"
            >
              Dinner Special includes a glass of our house{" "}
              <span className="text-[#c9a84c]">Lemon Spritz</span> — the perfect pairing.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              onClick={() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-full bg-[#c9a84c] text-black font-semibold font-inter text-sm hover:bg-[#e8c96a] transition-all hover:scale-105 active:scale-95"
            >
              Reserve Your Seat
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
