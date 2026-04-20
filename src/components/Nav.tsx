"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const links = ["About", "Drinks", "Food", "Happy Hour", "Gallery", "Reserve"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,8,5,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Isla Bonita" width={36} height={36} className="rounded-full object-cover" />
          <span className="font-playfair text-lg font-bold text-[#c9a84c] hidden sm:block">Isla Bonita</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="px-4 py-2 text-sm font-inter text-[#c8b89a] hover:text-[#c9a84c] transition-colors rounded-lg hover:bg-white/5"
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => scrollTo("Reserve")}
            className="ml-3 px-5 py-2 rounded-full text-sm font-semibold font-inter text-black bg-[#c9a84c] hover:bg-[#e8c96a] transition-colors"
          >
            Book a Table
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`block w-6 h-0.5 bg-[#c9a84c] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#c9a84c] transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#c9a84c] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a0805]/98 border-t border-[#c9a84c]/20 px-6 py-4 flex flex-col gap-2"
        >
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="text-left py-2 text-[#c8b89a] hover:text-[#c9a84c] font-inter text-sm">
              {l}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
