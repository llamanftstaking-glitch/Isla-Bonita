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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#c9a84c]/4 blur-[140px] pointer-events-none" />

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
          className="font-inter text-[#c8b89a]/60 mb-12"
        >
          Reserve your table and let us take care of the rest.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#130f09] border border-[#c9a84c]/30 rounded-2xl p-12"
          >
            <div className="text-5xl mb-4">🏝️</div>
            <h3 className="font-playfair text-2xl text-white mb-2">We'll see you soon!</h3>
            <p className="font-inter text-sm text-[#c8b89a]/60">We'll confirm your reservation via email shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-[#130f09] border border-[#2a2010] rounded-2xl p-8 text-left"
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
              className="w-full py-4 rounded-xl bg-[#c9a84c] text-black font-semibold font-inter hover:bg-[#e8c96a] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Request Reservation
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
