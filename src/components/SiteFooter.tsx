"use client";
import Link from "next/link";

const orderLinks = [
  {
    name: "UberEats",
    href: "https://www.ubereats.com/store/isla-bonita/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v5.586l-2.293-2.293-1.414 1.414L12 16.414l4.707-4.707-1.414-1.414L13 12.586V7h-2z" />
      </svg>
    ),
    color: "#06C167",
  },
  {
    name: "DoorDash",
    href: "https://www.doordash.com/store/isla-bonita-new-york/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 11.5H10v-3h6.5v3z" />
      </svg>
    ),
    color: "#FF3008",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/islabonitanyc1/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "#E1306C",
  },
];

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "Events", href: "/events" },
  { label: "Reserve", href: "/reserve" },
  { label: "Gallery", href: "/#gallery" },
];

export default function SiteFooter() {
  return (
    <footer className="relative bg-[#080604] border-t border-[#c9a84c]/10 pt-14 pb-8 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#c9a84c]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-32 bg-[#1a6b8a]/4 blur-[70px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Order Online strip */}
        <div className="mb-10 p-5 rounded-2xl border border-[#2a2010] bg-[#0d0a04]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.35em] uppercase mb-1">Order Now</p>
              <p className="font-playfair text-white text-lg">Craving Isla Bonita? Order delivery or pickup.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {orderLinks.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2a2010] bg-[#130f09] hover:border-[#c9a84c]/30 transition-all duration-200 hover:scale-105 group"
                >
                  <span style={{ color: l.color }} className="group-hover:scale-110 transition-transform duration-200">
                    {l.icon}
                  </span>
                  <span className="font-inter text-sm text-[#c8b89a]/70 group-hover:text-white transition-colors duration-200">
                    {l.name}
                  </span>
                </a>
              ))}
              <Link
                href="/menu"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter text-sm hover:bg-[#f0d060] transition-all duration-200 hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Full Menu
              </Link>
            </div>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-playfair text-2xl text-[#c9a84c] mb-2">Isla Bonita</p>
            <p className="font-inter text-xs text-[#c8b89a]/35 tracking-widest uppercase mb-3">Amalfi Meets Caribbean</p>
            <p className="font-inter text-xs text-[#c8b89a]/40 leading-relaxed max-w-xs">
              Caribbean soul meets Amalfi Coast warmth — bold flavors, signature cocktails, and unforgettable ambiance in New York City.
            </p>
            {/* Social links */}
            <div className="flex gap-2 mt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#2a2010] flex items-center justify-center text-[#c8b89a]/40 hover:border-[#c9a84c]/40 transition-all duration-200 hover:scale-110"
                  style={{ color: undefined }}
                  aria-label={s.name}
                >
                  <span className="hover:text-white transition-colors" style={{}}>
                    {s.icon}
                  </span>
                </a>
              ))}
              {/* Phone */}
              <a
                href="tel:+16465591222"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2a2010] text-[#c8b89a]/40 hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="font-inter text-xs">(646) 559-1222</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-4">Explore</p>
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="font-inter text-sm text-[#c8b89a]/45 hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div>
            <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-4">Visit Us</p>
            <div className="space-y-2">
              <p className="font-inter text-xs text-[#c8b89a]/40 leading-relaxed">
                3950 10th Ave Suite B<br />New York, NY 10034
              </p>
              <div className="h-px bg-[#2a2010] my-3" />
              <p className="font-inter text-[10px] text-[#c8b89a]/30 uppercase tracking-wider">Hours</p>
              <p className="font-inter text-xs text-[#c8b89a]/40">Mon – Sun · Open Daily</p>
              <p className="font-inter text-xs text-[#2e8fb0]/60">Happy Hour · 4–7 PM</p>
              <div className="h-px bg-[#2a2010] my-3" />
              <a
                href="https://maps.google.com/?q=3950+10th+Ave+New+York+NY+10034"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-inter text-xs text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#c9a84c]/8">
          <p className="font-inter text-xs text-[#c8b89a]/20">© {new Date().getFullYear()} Isla Bonita. All rights reserved.</p>
          <p className="font-inter text-[10px] text-[#1a6b8a]/40 italic">Amalfi Meets Caribbean · Est. 2014</p>
        </div>
      </div>
    </footer>
  );
}
