"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// All nav links in order — matches Fandi Mata flat layout
const navItems = [
  { label: "About",                 type: "scroll", id: "about"      },
  { label: "Hours & Location",      type: "scroll", id: "footer"     },
  { label: "Menu",                  type: "page",   href: "/menu"    },
  { label: "Events & Private Dining", type: "page", href: "/events"  },
  { label: "Happy Hour",            type: "scroll", id: "happy-hour" },
  { label: "Catering",              type: "page",   href: "/catering"},
  { label: "Order Online",          type: "page",   href: "/menu#order"},
] as const;

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const pathname                  = usePathname();
  const router                    = useRouter();
  const isHome                    = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (id: string) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  const isActive = (item: typeof navItems[number]) => {
    if (item.type === "page" && "href" in item) {
      return pathname === item.href.split("#")[0];
    }
    return false;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,6,3,0.94)" : "rgba(8,6,3,0.60)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(201,168,76,0.18)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="cursor-pointer flex items-center gap-2.5 flex-shrink-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#c9a84c]/30">
              <Image src="/logo.jpg" alt="Isla Bonita" fill className="object-cover" />
            </div>
            <span className="font-playfair text-base font-bold text-[#c9a84c] hidden lg:block tracking-wide whitespace-nowrap">
              Isla Bonita
            </span>
          </Link>

          {/* Desktop — flat link row */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map((item) => {
              const active = isActive(item);
              if (item.type === "scroll") {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleScroll(item.id)}
                    className={`cursor-pointer whitespace-nowrap px-3 py-1.5 text-[12.5px] font-inter rounded-lg transition-colors duration-200 hover:text-[#c9a84c] hover:bg-[#c9a84c]/8 ${
                      active ? "text-[#c9a84c]" : "text-[#c8b89a]/65"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap px-3 py-1.5 text-[12.5px] font-inter rounded-lg transition-colors duration-200 hover:text-[#c9a84c] hover:bg-[#c9a84c]/8 ${
                    active ? "text-[#c9a84c] font-medium" : "text-[#c8b89a]/65"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Reserve — solid block button */}
          <Link
            href="/reserve"
            className="hidden lg:flex flex-shrink-0 items-center px-6 py-2.5 rounded-xl font-semibold font-inter text-[13px] tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#c9a84c]/20"
            style={{
              background: pathname === "/reserve" ? "#f0d060" : "#c9a84c",
              color: "#000",
            }}
          >
            Reserve
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer lg:hidden flex flex-col gap-1.5 p-2 -mr-1 ml-auto"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#c9a84c] transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#c9a84c] transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#c9a84c] transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8,6,3,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {item.type === "scroll" ? (
                    <button
                      onClick={() => handleScroll(item.id)}
                      className="cursor-pointer w-full text-left py-2.5 px-3 rounded-xl text-[#c8b89a]/80 hover:text-[#c9a84c] hover:bg-[#c9a84c]/8 font-inter text-sm transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block py-2.5 px-3 rounded-xl font-inter text-sm transition-all duration-200 hover:bg-[#c9a84c]/8 ${
                        isActive(item) ? "text-[#c9a84c]" : "text-[#c8b89a]/80 hover:text-[#c9a84c]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <div className="h-px bg-[#c9a84c]/15 my-1" />
              <Link
                href="/reserve"
                onClick={() => setOpen(false)}
                className="block w-full py-3 rounded-xl text-black font-semibold font-inter text-sm text-center transition-all duration-200 hover:opacity-90"
                style={{ background: "#c9a84c" }}
              >
                Reserve a Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
