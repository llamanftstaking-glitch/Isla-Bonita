"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

// ─── DRINKS DATA ────────────────────────────────────────────────────────────
const drinkCategories = [
  {
    id: "signature",
    label: "Signature",
    items: [
      { name: "Lemon Boat", desc: "Fresh hollowed lemon filled with citrus spritz, served on our iconic nautical prop", price: "$14", img: "/cocktail-lemon-boat.jpg" },
      { name: "Shell Cocktail", desc: "Served in a gold terrarium with starfish & sand", price: "$14", img: "/cocktail-shell-box.jpg" },
      { name: "Tiki Cocktail", desc: "Caribbean-inspired cocktail in hand-painted tiki mug", price: "$13", img: "/cocktail-tiki-mugs.jpg" },
      { name: "Lemon Spritz", desc: "House Amalfi spritz with prosecco and fresh citrus", price: "$14", img: "/cocktail-aperol-spritz.jpg" },
    ],
  },
  {
    id: "cocktails",
    label: "Cocktails",
    items: [
      { name: "Blue Sugar", desc: "House blue cocktail with sugar rim and tropical notes", price: "$13", img: "/cocktail-blue-sugar.jpg" },
      { name: "Foam Coupe", desc: "Elevated presentation with silky foam finish", price: "$14", img: "/cocktail-foam-coupe.jpg" },
      { name: "Cucumber Coupe", desc: "Fresh cucumber, elderflower and citrus in a coupe glass", price: "$13", img: "/cocktail-cucumber-coupe.jpg" },
      { name: "Blue Margarita", desc: "House margarita with blue curaçao and tajin rim", price: "$13", img: "/cocktail-blue-margarita.jpg" },
      { name: "Teal Cup", desc: "Tropical teal cocktail with house citrus mix", price: "$12", img: "/cocktail-teal-cup.jpg" },
      { name: "Tequila Boats", desc: "Mini tequila shots served in lemon vessels", price: "$12", img: "/cocktail-tequila-boats.jpg" },
    ],
  },
  {
    id: "wine-beer",
    label: "Wine & Beer",
    items: [
      { name: "Copa de Vino", desc: "House red or white wine selection", price: "$12" },
      { name: "Beer", desc: "Domestic and imported selection", price: "$7" },
      { name: "Peroni", desc: "Crisp Italian lager", price: "$8" },
      { name: "Sangria", desc: "House sangria with seasonal fruit", price: "$12" },
    ],
  },
];

// ─── FOOD DATA ───────────────────────────────────────────────────────────────
const foodCategories = [
  {
    id: "starters",
    label: "Starters",
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
    items: [
      { name: "Caesar Salad", desc: "Crisp romaine, croutons, Parmesan & Caesar dressing", price: "$18" },
      { name: "Cobb Salad", desc: "Grilled chicken, bacon, hard-boiled eggs, avocado & tomatoes", price: "$18" },
      { name: "Greek Salad", desc: "Tomatoes, cucumbers, red onions, kalamata olives & feta", price: "$19" },
    ],
  },
  {
    id: "sides",
    label: "Sides",
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
    items: [
      { name: "Tres Leches", desc: "Light sponge cake soaked in three milks, whipped cream topping", price: "Ask server" },
      { name: "Flan", desc: "Classic Latin caramel custard with rich caramel sauce", price: "Ask server" },
    ],
  },
];

const orderLinks = [
  { name: "UberEats", href: "https://www.ubereats.com/store/isla-bonita/", color: "#06C167" },
  { name: "DoorDash", href: "https://www.doordash.com/store/isla-bonita-new-york/", color: "#FF3008" },
];

export default function MenuPage() {
  const [section, setSection] = useState<"food" | "drinks">("food");
  const [activeFood, setActiveFood] = useState("starters");
  const [activeDrink, setActiveDrink] = useState("signature");

  const currentFoodCat = foodCategories.find((c) => c.id === activeFood)!;
  const currentDrinkCat = drinkCategories.find((c) => c.id === activeDrink)!;

  return (
    <div className="min-h-screen bg-[#0a0805]">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#130f09] to-[#0a0805]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#c9a84c]/4 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Chef Gus Moya
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl text-white mb-6"
          >
            Our <span className="italic text-[#c9a84c]">Menu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-[#c8b89a]/55 text-base max-w-xl mx-auto mb-8"
          >
            Caribbean soul meets Amalfi Coast warmth — bold dishes, signature cocktails, and flavors you won't forget.
          </motion.p>

          {/* Order online strip */}
          <motion.div
            id="order"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 flex-wrap justify-center"
          >
            <span className="font-inter text-xs text-[#c8b89a]/40 uppercase tracking-widest">Order via</span>
            {orderLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-[#2a2010] bg-[#130f09] font-inter text-sm font-medium hover:border-[#c9a84c]/30 hover:bg-[#1a1408] transition-all duration-200 hover:scale-105"
                style={{ color: l.color }}
              >
                {l.name}
              </a>
            ))}
            <Link
              href="/reserve"
              className="px-5 py-2.5 rounded-full bg-[#c9a84c] text-black font-semibold font-inter text-sm hover:bg-[#f0d060] transition-all duration-200 hover:scale-105"
            >
              Dine In — Reserve
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section toggle */}
      <div className="sticky top-20 z-30 px-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="inline-flex rounded-2xl p-1 gap-1"
            style={{
              background: "rgba(19,15,9,0.92)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            {(["food", "drinks"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={`cursor-pointer px-8 py-2.5 rounded-xl font-inter text-sm font-medium capitalize transition-all duration-200 ${
                  section === s
                    ? "bg-[#c9a84c] text-black"
                    : "text-[#c8b89a]/60 hover:text-[#c8b89a]"
                }`}
              >
                {s === "food" ? "Food" : "Drinks"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {section === "food" ? (
              <motion.div
                key="food"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Food category tabs */}
                <div className="flex gap-2 flex-wrap mb-8">
                  {foodCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFood(cat.id)}
                      className={`cursor-pointer px-5 py-2 rounded-full font-inter text-xs tracking-wider uppercase transition-all duration-200 ${
                        activeFood === cat.id
                          ? "bg-[#c9a84c] text-black font-semibold"
                          : "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/50 hover:border-[#c9a84c]/40 hover:text-[#c8b89a]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFood}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="grid md:grid-cols-2 gap-3"
                  >
                    {currentFoodCat.items.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-[#130f09]/70 border border-[#2a2010] hover:border-[#c9a84c]/30 hover:bg-[#130f09] transition-all duration-200"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-playfair text-white text-base group-hover:text-[#c9a84c] transition-colors duration-200 mb-1">
                            {item.name}
                          </h3>
                          <p className="font-inter text-xs text-[#c8b89a]/45 leading-relaxed">{item.desc}</p>
                        </div>
                        <div className="flex-shrink-0 font-playfair text-[#c9a84c] text-lg font-bold">{item.price}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Dinner special */}
                <div className="mt-6 p-5 rounded-2xl border border-[#f0d060]/20 bg-[#f0d060]/3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-inter text-[10px] text-[#f0d060]/70 tracking-[0.3em] uppercase mb-0.5">Dinner Special</p>
                    <p className="font-playfair text-white">Lemon Spritz + Pasta Gamberi</p>
                  </div>
                  <div className="font-playfair text-[#f0d060] text-2xl font-bold">$30</div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="drinks"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Drinks category tabs */}
                <div className="flex gap-2 flex-wrap mb-8">
                  {drinkCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveDrink(cat.id)}
                      className={`cursor-pointer px-5 py-2 rounded-full font-inter text-xs tracking-wider uppercase transition-all duration-200 ${
                        activeDrink === cat.id
                          ? "bg-[#c9a84c] text-black font-semibold"
                          : "bg-[#130f09] border border-[#2a2010] text-[#c8b89a]/50 hover:border-[#c9a84c]/40 hover:text-[#c8b89a]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDrink}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* If signature, show card grid with images */}
                    {activeDrink === "signature" ? (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {currentDrinkCat.items.map((item, i) => {
                          const imgSrc = "img" in item ? (item as { img: string }).img : undefined;
                          return (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, delay: i * 0.06 }}
                            className="group relative rounded-2xl overflow-hidden border border-[#2a2010] hover:border-[#c9a84c]/40 transition-all duration-300 cursor-pointer"
                          >
                            {imgSrc && (
                              <div className="relative h-48">
                                <Image src={imgSrc} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                              </div>
                            )}
                            <div className="p-4">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-playfair text-white text-base group-hover:text-[#c9a84c] transition-colors duration-200">{item.name}</h3>
                                  <p className="font-inter text-[11px] text-[#c8b89a]/45 mt-1 leading-relaxed">{item.desc}</p>
                                </div>
                                <span className="font-playfair text-[#c9a84c] font-bold flex-shrink-0">{item.price}</span>
                              </div>
                            </div>
                          </motion.div>
                        )})}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-3">
                        {currentDrinkCat.items.map((item, i) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.04 }}
                            className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-[#130f09]/70 border border-[#2a2010] hover:border-[#c9a84c]/30 hover:bg-[#130f09] transition-all duration-200"
                          >
                            <div>
                              <h3 className="font-playfair text-white text-base group-hover:text-[#c9a84c] transition-colors duration-200 mb-1">{item.name}</h3>
                              <p className="font-inter text-xs text-[#c8b89a]/45">{item.desc}</p>
                            </div>
                            <div className="font-playfair text-[#c9a84c] text-lg font-bold flex-shrink-0">{item.price}</div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Happy Hour note */}
                <div className="mt-6 p-5 rounded-2xl border border-[#1a6b8a]/25 bg-[#1a6b8a]/6 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#2e8fb0] animate-pulse flex-shrink-0" />
                  <p className="font-inter text-sm text-[#c8b89a]/70">
                    <span className="text-[#2e8fb0] font-medium">Happy Hour</span> Mon–Sun 4–7 PM ·
                    Cocktails <span className="text-[#f0d060]">$10</span> · Wine <span className="text-[#f0d060]">$6</span> ·
                    Beer <span className="text-[#f0d060]">$4</span> · Appetizers <span className="text-[#f0d060]">$6</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
