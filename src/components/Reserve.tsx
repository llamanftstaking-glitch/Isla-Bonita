"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Reserve() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reserve" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0805]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      {/* Dual ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#c9a84c]/4 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1a6b8a]/5 blur-[90px] pointer-events-none" />

      <div ref={ref} className="relative max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-inter mb-4"
        >
          Join Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-4xl md:text-5xl text-white mb-6"
        >
          Make a <span className="italic text-[#c9a84c]">Reservation</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-[#c8b89a]/60 mb-3"
        >
          Reserve your table and let us take care of the rest.
        </motion.p>
        {/* Phone CTA */}
        <motion.a
          href="tel:+16465591222"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-[#c9a84c]/25 bg-[#c9a84c]/6 hover:bg-[#c9a84c]/12 transition-all duration-200 group"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-[#c9a84c]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span className="font-inter text-xs text-[#c9a84c] group-hover:text-[#f0d060] transition-colors duration-200">
            (646) 559-1222
          </span>
        </motion.a>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-12 border border-[#c9a84c]/25"
            style={{
              background: "rgba(19,15,9,0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="w-16 h-16 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-playfair text-2xl text-white mb-2">We'll see you soon!</h3>
            <p className="font-inter text-sm text-[#c8b89a]/60">We'll confirm your reservation shortly. You can also call us at (646) 559-1222.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 text-left border border-[#2a2010]"
            style={{ background: "rgba(19,15,9,0.7)", backdropFilter: "blur(8px)" }}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-2">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full bg-[#0a0805] border border-[#2a2010] rounded-xl px-4 py-3 font-inter text-sm text-white placeholder-[#4a3a20] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-[#0a0805] border border-[#2a2010] rounded-xl px-4 py-3 font-inter text-sm text-white placeholder-[#4a3a20] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-2">Date</label>
                <input
                  type="date"
                  required
                  className="w-full bg-[#0a0805] border border-[#2a2010] rounded-xl px-4 py-3 font-inter text-sm text-white focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-2">Guests</label>
                <select
                  className="w-full bg-[#0a0805] border border-[#2a2010] rounded-xl px-4 py-3 font-inter text-sm text-white focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-inter text-xs text-[#c9a84c] tracking-widest uppercase mb-2">Special Requests</label>
              <textarea
                rows={3}
                placeholder="Dietary needs, special occasion, seating preference..."
                className="w-full bg-[#0a0805] border border-[#2a2010] rounded-xl px-4 py-3 font-inter text-sm text-white placeholder-[#4a3a20] focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full py-4 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter hover:bg-[#f0d060] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c9a84c]/15"
            >
              Request Reservation
            </button>
          </motion.form>
        )}

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 flex flex-wrap justify-center gap-6 text-center"
        >
          {[
            { icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", label: "3950 10th Ave, Suite B · NY 10034" },
            { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", label: "Mon – Sun · Open Daily" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-[#c9a84c]/60 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="font-inter text-xs text-[#c8b89a]/40">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
