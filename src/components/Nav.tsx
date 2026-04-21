"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const pageLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "Events", href: "/events" },
];

const homeScrollLinks = [
  { label: "About", id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Happy Hour", id: "happy-hour" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHomeScroll = (id: string) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,6,3,0.92)" : "rgba(8,6,3,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(201,168,76,0.18)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="cursor-pointer flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#c9a84c]/30">
              <Image src="/logo.jpg" alt="Isla Bonita" fill className="object-cover" />
            </div>
            <span className="font-playfair text-base font-bold text-[#c9a84c] hidden sm:block tracking-wide">
              Isla Bonita
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {/* Page links */}
            {pageLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3.5 py-1.5 text-[13px] font-inter transition-colors duration-200 rounded-lg hover:bg-[#c9a84c]/8 ${
                  pathname === l.href
                    ? "text-[#c9a84c] font-medium"
                    : "text-[#c8b89a]/70 hover:text-[#c9a84c]"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Home scroll links */}
            {homeScrollLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => handleHomeScroll(l.id)}
                className="cursor-pointer px-3.5 py-1.5 text-[13px] font-inter text-[#c8b89a]/70 hover:text-[#c9a84c] transition-colors duration-200 rounded-lg hover:bg-[#c9a84c]/8"
              >
                {l.label}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-4 bg-[#c9a84c]/20 mx-1" />

            {/* Order Online */}
            <Link
              href="/menu#order"
              className="px-3.5 py-1.5 text-[13px] font-inter text-[#2e8fb0]/80 hover:text-[#2e8fb0] transition-colors duration-200 rounded-lg hover:bg-[#1a6b8a]/10"
            >
              Order Online
            </Link>

            {/* Reserve CTA */}
            <Link
              href="/reserve"
              className={`ml-2 px-5 py-2 rounded-full text-[13px] font-semibold font-inter transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#c9a84c]/20 ${
                pathname === "/reserve"
                  ? "bg-[#f0d060] text-black"
                  : "bg-[#c9a84c] text-black hover:bg-[#f0d060]"
              }`}
            >
              Reserve
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer md:hidden flex flex-col gap-1.5 p-2 -mr-1"
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
              background: "rgba(8,6,3,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {pageLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 px-3 rounded-xl font-inter text-sm transition-all duration-200 hover:bg-[#c9a84c]/8 ${
                      pathname === l.href ? "text-[#c9a84c]" : "text-[#c8b89a]/80 hover:text-[#c9a84c]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              {homeScrollLinks.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (pageLinks.length + i) * 0.04 }}
                  onClick={() => handleHomeScroll(l.id)}
                  className="cursor-pointer text-left py-2.5 px-3 rounded-xl text-[#c8b89a]/80 hover:text-[#c9a84c] hover:bg-[#c9a84c]/8 font-inter text-sm transition-all duration-200"
                >
                  {l.label}
                </motion.button>
              ))}
              <div className="h-px bg-[#c9a84c]/15 my-1" />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link
                  href="/menu#order"
                  onClick={() => setOpen(false)}
                  className="block py-2.5 px-3 rounded-xl font-inter text-sm text-[#2e8fb0]/80 hover:text-[#2e8fb0] hover:bg-[#1a6b8a]/10 transition-all duration-200"
                >
                  Order Online
                </Link>
              </motion.div>
              <Link
                href="/reserve"
                onClick={() => setOpen(false)}
                className="block w-full py-3 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter text-sm text-center hover:bg-[#f0d060] transition-all duration-200"
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
