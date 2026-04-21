"use client";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  {
    id: "starters",
    label: "Starters",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    items: [
      { name: "Montadito De Churrasco", desc: "Steak, baguette croutons & manchego cheese fondue", price: "$18" },
      { name: "Short Ribs Mini Arepas", desc: "Cheese fondue & roasted peppers", price: "$18" },
      { name: "Mar & Tierra Yuca Arepita", desc: "Steak, shrimp & shallots jam", price: "$18" },
      { name: "Pulpo Y Chorizo Skewers", desc: "Olives chimichurri & potato", price: "$18" },
      { name: "Pastelitos", desc: "Ropa vieja, red pepper piquillo mayo", price: "$14" },
      { name: "Maduro Relleno", desc: "Stuffed sweet plantains with chorizo & cheese fondue", price: "$15" },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 13.5V12a3 3 0 00-6 0v1.5m6 0v1.875c0 1.035-.841 1.875-1.875 1.875h-2.25A1.875 1.875 0 019 15.375V13.5m6 0H9",
    items: [
      { name: "Grilled Black Angus Churrasco", desc: "Chimichurri, demi-glace & yuca au gratin", price: "$38" },
      { name: "Grilled Salmon", desc: "Red & olives chimichurri, yuca fries", price: "$25" },
      { name: "Surf & Turf Chowfan", desc: "Shrimp, chicken and churrasco fried rice", price: "$24" },
      { name: "Shrimp Fettuccine", desc: "Creamy white sauce, sautéed shrimp & Parmesan", price: "$24" },
      { name: "Suprema Al Limón", desc: "Chicken breast, lemon-butter-garlic beurre blanc sauce", price: "$22" },
      { name: "Mezzi Rigatoni All'Amatriciana", desc: "Guanciale, shallots & Parmesan cheese", price: "$18" },
      { name: "Cheeseburger", desc: "8 oz sirloin, lettuce, tomato, bacon jam & brioche bun", price: "$18" },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    icon: "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
    items: [
      { name: "Caesar Salad", desc: "Crisp romaine, croutons, Parmesan & Caesar dressing", price: "$18" },
      { name: "Cobb Salad", desc: "Grilled chicken, bacon, hard-boiled eggs, avocado & tomatoes", price: "$18" },
      { name: "Greek Salad", desc: "Tomatoes, cucumbers, red onions, kalamata olives & feta", price: "$19" },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
    items: [
      { name: "Tostones", desc: "Crispy twice-fried green plantains, lightly salted", price: "$7" },
      { name: "Yuca Fries", desc: "Thick-cut yuca with crisp exterior & tender center", price: "$7" },
      { name: "Yuca Mash", desc: "Smooth mashed yuca topped with chives", price: "$7" },
      { name: "French Fries", desc: "Crispy golden potato fries, lightly salted", price: "$7" },
      { name: "Mashed Potatoes", desc: "Classic creamy mashed potatoes", price: "$7" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636",
    items: [
      { name: "Tres Leches", desc: "Light sponge cake soaked in three milks, whipped cream topping", price: "Ask server" },
      { name: "Flan", desc: "Classic Latin caramel custard with rich caramel sauce", price: "Ask server" },
    ],
  },
];

const heroImages: Record<string, string> = {
  starters: "/food-tostones.jpg",
  mains: "/food-steak-asparagus.jpg",
  salads: "/food-shrimp-caesar.jpg",
  sides: "/food-arepas-tostones.jpg",
  desserts: "/food-rigatoni.jpg",
};

export default function Food() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("starters");

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <section id="food" className="py-28 px-6 relative overflow-hidden bg-[#0d0a04]">
      {/* Amalfi ambient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f0d060]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1a6b8a]/4 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/15 to-transparent" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Chef Gus Moya
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl text-white"
          >
            Our <span className="italic text-[#c9a84c]">Menu</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent"
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
          {/* Left — tabs + items */}
          <div>
            {/* Category tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-2 flex-wrap mb-8"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full font-inter text-xs tracking-wider uppercase transition-all duration-200 ${
                    activeTab === cat.id
                      ? "bg-[#c9a84c] text-black font-semibold"
                      : "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/50 hover:border-[#c9a84c]/40 hover:text-[#c8b89a]"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                  </svg>
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Menu items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {activeCategory.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group flex items-start justify-between gap-4 p-4 rounded-xl bg-[#130f09]/70 border border-[#2a2010] hover:border-[#c9a84c]/30 hover:bg-[#130f09] transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-playfair text-white text-base group-hover:text-[#c9a84c] transition-colors duration-200">
                          {item.name}
                        </h3>
                      </div>
                      <p className="font-inter text-xs text-[#c8b89a]/45 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex-shrink-0 font-playfair text-[#c9a84c] text-lg font-bold pt-0.5">
                      {item.price}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Dinner special callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 p-4 rounded-xl border border-[#f0d060]/20 bg-[#f0d060]/3 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-inter text-[10px] text-[#f0d060]/70 tracking-[0.3em] uppercase mb-0.5">Dinner Special</p>
                <p className="font-playfair text-white text-sm">Lemon Spritz + Pasta Gamberi</p>
              </div>
              <div className="font-playfair text-[#f0d060] text-2xl font-bold">$30</div>
            </motion.div>
          </div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block sticky top-24"
          >
            <div className="relative h-[520px] rounded-2xl overflow-hidden border border-[#2a2010]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[activeTab]}
                    alt={activeCategory.label}
                    fill
                    className="object-cover"
                    sizes="420px"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.35em] uppercase mb-1">{activeCategory.label}</p>
                <p className="font-playfair text-white text-xl">{activeCategory.items.length} items</p>
              </div>
            </div>

            {/* Reserve CTA under image */}
            <button
              onClick={() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" })}
              className="cursor-pointer mt-4 w-full py-4 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter text-sm tracking-wide hover:bg-[#f0d060] transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              Reserve Your Table
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
