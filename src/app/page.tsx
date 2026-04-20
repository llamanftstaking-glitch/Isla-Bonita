import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Drinks from "@/components/Drinks";
import Food from "@/components/Food";
import HappyHour from "@/components/HappyHour";
import Gallery from "@/components/Gallery";
import Reserve from "@/components/Reserve";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />

      {/* About strip */}
      <section id="about" className="relative py-24 px-6 bg-[#0d0a04] overflow-hidden">
        <div className="absolute inset-0 border-y border-[#c9a84c]/8" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/3 via-transparent to-[#c9a84c]/3" />
        <div className="relative max-w-5xl mx-auto">
          <blockquote className="font-playfair italic text-2xl md:text-3xl lg:text-4xl text-[#c8b89a]/70 leading-relaxed text-center mb-12">
            "A corner of the Caribbean in the heart of New York City —{" "}
            <span className="text-[#c9a84c] not-italic">bold flavors, warm hospitality,</span>{" "}
            and drinks that tell a story."
          </blockquote>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "10+", label: "Years of Service", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
              { num: "50+", label: "Signature Dishes", icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 13.5V12a3 3 0 00-6 0v1.5m6 0v1.875c0 1.035-.841 1.875-1.875 1.875h-2.25A1.875 1.875 0 019 15.375V13.5m6 0H9" },
              { num: "4 PM", label: "Happy Hour Daily", icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .23 2.798-1.144 2.798H3.942c-1.373 0-2.144-1.799-1.144-2.798l1.402-1.402" },
            ].map((s) => (
              <div
                key={s.label}
                className="group text-center p-6 rounded-2xl bg-[#130f09]/60 border border-[#2a2010] hover:border-[#c9a84c]/30 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[#c9a84c]/50 mx-auto mb-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
                <div className="font-playfair text-3xl md:text-4xl text-[#c9a84c] font-bold">{s.num}</div>
                <div className="font-inter text-xs text-[#c8b89a]/40 mt-2 tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Drinks />
      <Food />
      <HappyHour />
      <Gallery />
      <Reserve />

      {/* Footer */}
      <footer className="relative bg-[#080604] border-t border-[#c9a84c]/10 py-16 px-6 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#c9a84c]/5 blur-[80px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-playfair text-2xl text-[#c9a84c] mb-1">Isla Bonita</p>
            <p className="font-inter text-xs text-[#c8b89a]/35 tracking-widest uppercase">New York City</p>
          </div>
          <div className="flex gap-8 text-center">
            {["About", "Menu", "Gallery", "Reserve"].map((l) => (
              <span key={l} className="font-inter text-xs text-[#c8b89a]/35 hover:text-[#c9a84c]/70 transition-colors cursor-pointer tracking-wider uppercase">{l}</span>
            ))}
          </div>
          <div className="text-right">
            <p className="font-inter text-xs text-[#c8b89a]/25">Happy Hour · Mon – Sun · 4–7 PM</p>
            <p className="font-inter text-xs text-[#c8b89a]/20 mt-1">© {new Date().getFullYear()} Isla Bonita. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
