import type { Metadata } from "next";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Isla Bonita | Caribbean & Amalfi Restaurant in Inwood, NYC",
  description:
    "Caribbean soul meets Amalfi Coast warmth in Inwood, NYC. Signature cocktails, bold Caribbean flavors, happy hour daily at 4 PM. Reserve your table at 3950 10th Ave.",
  alternates: { canonical: "https://islabonita.nyc" },
};
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import Drinks from "@/components/Drinks";
import Food from "@/components/Food";
import HappyHour from "@/components/HappyHour";
import Gallery from "@/components/Gallery";
import Reserve from "@/components/Reserve";
import NewsletterStrip from "@/components/NewsletterStrip";
import SiteFooter from "@/components/SiteFooter";
import OrderStrip from "@/components/OrderStrip";

export default function Page() {
  return (
    <>
      <JsonLd />
      <Nav />
      <Hero />

      {/* About strip */}
      <section id="about" className="relative py-24 px-6 bg-[#0d0a04] overflow-hidden">
        <div className="absolute inset-0 border-y border-[#c9a84c]/8" />
        {/* Amalfi azure + lemon gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a6b8a]/5 via-transparent to-[#f0d060]/4" />
        {/* Lemon grove glow */}
        <div className="absolute top-0 right-1/4 w-64 h-40 bg-[#f0d060]/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-40 bg-[#1a6b8a]/5 blur-[80px] pointer-events-none" />

        {/* Decorative lemon slices */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 60 60" className="w-20 h-20" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#f0d060" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="20" stroke="#f0d060" strokeWidth="1" />
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <line key={i} x1="30" y1="10" x2="30" y2="30" stroke="#f0d060" strokeWidth="1"
                transform={`rotate(${deg} 30 30)`} />
            ))}
          </svg>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 60 60" className="w-16 h-16" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#f0d060" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="20" stroke="#f0d060" strokeWidth="1" />
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <line key={i} x1="30" y1="10" x2="30" y2="30" stroke="#f0d060" strokeWidth="1"
                transform={`rotate(${deg} 30 30)`} />
            ))}
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Amalfi label */}
          <p className="font-inter text-[11px] tracking-[0.4em] uppercase text-center mb-4 text-[#1a6b8a]">
            Amalfi Meets Caribbean
          </p>
          <blockquote className="font-playfair italic text-2xl md:text-3xl lg:text-4xl text-[#c8b89a]/70 leading-relaxed text-center mb-12">
            "Where the lemon groves of the Amalfi Coast meet the{" "}
            <span className="text-[#c9a84c] not-italic">bold spirit of the Caribbean</span>{" "}
            — right here in New York City."
          </blockquote>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "1 Year", label: "Est. 2025", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", accent: "#c9a84c" },
              { num: "30+", label: "Menu Items", icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 13.5V12a3 3 0 00-6 0v1.5m6 0v1.875c0 1.035-.841 1.875-1.875 1.875h-2.25A1.875 1.875 0 019 15.375V13.5m6 0H9", accent: "#f0d060" },
              { num: "4 PM", label: "Happy Hour Daily", icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .23 2.798-1.144 2.798H3.942c-1.373 0-2.144-1.799-1.144-2.798l1.402-1.402", accent: "#2e8fb0" },
            ].map((s) => (
              <div
                key={s.label}
                className="group text-center p-6 rounded-2xl bg-[#130f09]/60 border border-[#2a2010] hover:border-[#c9a84c]/30 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto mb-3" style={{ color: s.accent + "80" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
                <div className="font-playfair text-3xl md:text-4xl font-bold" style={{ color: s.accent }}>{s.num}</div>
                <div className="font-inter text-xs text-[#c8b89a]/40 mt-2 tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Experiences />
      <OrderStrip />
      <Drinks />
      <Food />
      <HappyHour />
      <Gallery />
      <Reserve />
      <NewsletterStrip />
      <SiteFooter />
    </>
  );
}
