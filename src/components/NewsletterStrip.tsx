"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function NewsletterStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0805]" />
      {/* Amalfi glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/8 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] rounded-full bg-[#c9a84c]/4 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-40 bg-[#1a6b8a]/5 blur-[80px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-[#c9a84c]/12 border border-[#c9a84c]/20 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <p className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-3">Stay in the Loop</p>
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-3">
            Join the Isla Bonita <span className="italic text-[#c9a84c]">Inner Circle</span>
          </h2>
          <p className="font-inter text-[#c8b89a]/50 text-sm max-w-md mx-auto mb-8">
            Be first to know about new menu items, special events, happy hour deals, and exclusive offers — straight to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-[#c9a84c]/30 bg-[#c9a84c]/8"
            >
              <div className="w-6 h-6 rounded-full bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.5" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="font-inter text-sm text-white">
                You're in! Welcome to the <span className="text-[#c9a84c]">Inner Circle</span>.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div
                className="flex-1 relative rounded-2xl transition-all duration-200"
                style={{
                  background: "rgba(19,15,9,0.8)",
                  border: `1px solid ${focused ? "rgba(201,168,76,0.5)" : "rgba(42,32,16,1)"}`,
                  boxShadow: focused ? "0 0 0 3px rgba(201,168,76,0.08)" : "none",
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Your email address"
                  className="w-full bg-transparent px-5 py-3.5 font-inter text-sm text-white placeholder-[#4a3a20] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer px-7 py-3.5 rounded-2xl bg-[#c9a84c] text-black font-semibold font-inter text-sm hover:bg-[#f0d060] transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap shadow-lg shadow-[#c9a84c]/15"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="font-inter text-[10px] text-[#c8b89a]/25 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8"
        >
          {[
            "Exclusive specials",
            "New menu alerts",
            "Event invites",
            "Happy Hour deals",
          ].map((perk) => (
            <div key={perk} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-[#c9a84c]/50" />
              <span className="font-inter text-[11px] text-[#c8b89a]/35">{perk}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
