"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

const values = [
  {
    icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 13.5V12a3 3 0 00-6 0v1.5m6 0v1.875c0 1.035-.841 1.875-1.875 1.875h-2.25A1.875 1.875 0 019 15.375V13.5m6 0H9",
    title: "Bold Flavors",
    desc: "Every dish is a conversation between two worlds — the citrus-bright coasts of Italy and the deep, soulful spices of the Caribbean.",
  },
  {
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    title: "Community First",
    desc: "Inwood is our home. We built Isla Bonita for this neighborhood — a place where everyone is welcome at the table.",
  },
  {
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    title: "Craft & Care",
    desc: "From handcrafted cocktails to slow-cooked mains, every detail is intentional. We don't cut corners — we add flavors.",
  },
];

const timeline = [
  { year: "The Vision", text: "Chef Gus Moya had a simple dream: create a space that felt like a warm evening in the Caribbean, with the sophistication of an Amalfi Coast trattoria — right in the heart of Inwood." },
  { year: "The Space", text: "We found a suite on 10th Avenue that felt like it was waiting for us. The cherry blossom decor, the intimate lighting, the open bar — every detail was designed to make you feel like you're somewhere special without leaving the city." },
  { year: "The Opening", text: "In 2025, Isla Bonita opened its doors. The neighborhood responded with an embrace that humbled us. Within weeks, the Happy Hour crowd became regulars. Weekend brunch became a ritual." },
  { year: "Today", text: "One year in, we're still cooking with the same fire we started with. New dishes, new cocktails, new memories — but the same soul. Inwood, this one's for you." },
];

export default function AboutPage() {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#0a0805]">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/interior-cherry-blossom.jpg"
            alt="Isla Bonita interior"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0a0805]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        </div>
        {/* Amalfi glows */}
        <div className="absolute bottom-0 left-0 w-96 h-64 bg-[#1a6b8a]/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-64 bg-[#f0d060]/6 blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 pb-20 pt-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
          >
            Est. 2025 · Inwood, NYC
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl text-white mb-6 leading-tight"
          >
            Our <span className="italic text-[#c9a84c]">Story</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-inter text-[#c8b89a]/65 text-lg max-w-2xl leading-relaxed"
          >
            "Where the lemon groves of the Amalfi Coast meet the bold spirit of the Caribbean — right here in New York City."
          </motion.p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 py-10 bg-[#0d0a04] border-y border-[#c9a84c]/8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "1",    label: "Year in Business",    sub: "Est. 2025"         },
            { num: "30+",  label: "Menu Items",           sub: "Rotating specials" },
            { num: "4 PM", label: "Happy Hour Daily",     sub: "Mon – Sun"         },
            { num: "100+", label: "Events Hosted",        sub: "Private & public"  },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="font-playfair text-3xl md:text-4xl font-bold text-[#c9a84c]">{s.num}</div>
              <div className="font-inter text-xs text-white/70 mt-1 uppercase tracking-widest">{s.label}</div>
              <div className="font-inter text-[10px] text-[#c8b89a]/30 mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story timeline */}
      <section ref={storyRef} className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-96 bg-[#c9a84c]/3 blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
            >
              How We Got Here
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-4xl md:text-5xl text-white"
            >
              Born from Two <span className="italic text-[#c9a84c]">Worlds</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={storyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c] mt-2 flex-shrink-0" />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-[#c9a84c]/15 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <p className="font-inter text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase mb-2">{t.year}</p>
                    <p className="font-inter text-sm text-[#c8b89a]/65 leading-relaxed">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { src: "/interior-spring-flowers.jpg", alt: "Isla Bonita interior", span: "col-span-2 h-56" },
                { src: "/food-steak-asparagus.jpg",    alt: "Signature steak",      span: "col-span-1 h-44" },
                { src: "/cocktail-lemon-boat.jpg",     alt: "Lemon boat cocktail",  span: "col-span-1 h-44" },
              ].map((img) => (
                <div key={img.src} className={`relative rounded-2xl overflow-hidden border border-[#2a2010] ${img.span}`}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="33vw" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef section */}
      <section className="py-20 px-6 bg-[#0d0a04] relative overflow-hidden">
        <div className="absolute inset-0 border-y border-[#c9a84c]/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#c9a84c]/4 blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative h-96 rounded-2xl overflow-hidden border border-[#2a2010]"
            >
              <Image src="/interior-dining-room.jpg" alt="Chef Gus Moya" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="font-playfair text-xl text-white">Chef Gus Moya</p>
                <p className="font-inter text-xs text-[#c9a84c]">Executive Chef & Co-Founder</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4">Meet the Chef</p>
              <h2 className="font-playfair text-4xl text-white mb-6">
                The Man Behind the <span className="italic text-[#c9a84c]">Kitchen</span>
              </h2>
              <div className="space-y-4 font-inter text-sm text-[#c8b89a]/60 leading-relaxed">
                <p>
                  Chef Gus Moya grew up surrounded by two culinary traditions — the bold, soulful cooking of the Caribbean and the refined, ingredient-driven cuisine of the Mediterranean coast. Both live in every dish he creates.
                </p>
                <p>
                  Before opening Isla Bonita, Chef Moya spent years perfecting his craft in New York City kitchens, learning to balance heat and brightness, boldness and restraint. His Black Angus Churrasco and Shrimp Fettuccine have already become neighborhood staples.
                </p>
                <p>
                  "I cook what I love," he says. "And I love both worlds. Why choose?"
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Caribbean Roots", "Amalfi Inspiration", "NYC Trained", "Farm to Table"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full font-inter text-[11px] text-[#c9a84c]/70 border border-[#c9a84c]/20 bg-[#c9a84c]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1a6b8a]/5 blur-[80px] pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4"
            >
              What Drives Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-playfair text-4xl md:text-5xl text-white"
            >
              Our <span className="italic text-[#c9a84c]">Philosophy</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="p-7 rounded-2xl bg-[#130f09]/80 border border-[#2a2010] hover:border-[#c9a84c]/25 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl text-white mb-3">{v.title}</h3>
                <p className="font-inter text-sm text-[#c8b89a]/55 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-16 px-6 bg-[#0d0a04] border-t border-[#c9a84c]/8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-inter text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-3">Loved the experience?</p>
          <h2 className="font-playfair text-3xl text-white mb-4">
            Share Your <span className="italic text-[#c9a84c]">Review</span>
          </h2>
          <p className="font-inter text-sm text-[#c8b89a]/50 mb-8">
            Your words help our community discover Isla Bonita. We read every single one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJIbeinWj2wokRD4GJYIHsiuI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#0a0805] font-semibold font-inter text-sm hover:bg-[#f0d060] transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Leave a Google Review
            </a>
            <Link
              href="/reserve"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#c9a84c]/25 text-[#c9a84c] font-inter text-sm font-medium hover:bg-[#c9a84c]/8 transition-all duration-200 hover:scale-105"
            >
              Reserve a Table
            </Link>
          </div>
          {/* 5 stars */}
          <div className="flex justify-center gap-1 mt-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="#f0d060" className="w-5 h-5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className="font-inter text-xs text-[#c8b89a]/30 mt-2">Rated 5 stars by our community</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
