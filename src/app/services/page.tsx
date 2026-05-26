"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Clock, ChevronRight, Scissors, Sparkles, Heart, Star, Wind, Flower } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/ui/AnimatedSection";

const categories = ["All", "Hair", "Face", "Nails", "Body & Spa", "Waxing"];

const categoryMeta: Record<string, { icon: React.ComponentType<{ className?: string }>; gradient: string; color: string }> = {
  Hair: { icon: Scissors, gradient: "from-pink-500 to-rose-500", color: "text-pink-600" },
  Face: { icon: Sparkles, gradient: "from-violet-500 to-purple-600", color: "text-violet-600" },
  Nails: { icon: Heart, gradient: "from-fuchsia-500 to-pink-500", color: "text-fuchsia-600" },
  "Body & Spa": { icon: Flower, gradient: "from-amber-500 to-orange-500", color: "text-amber-600" },
  Waxing: { icon: Wind, gradient: "from-teal-500 to-cyan-500", color: "text-teal-600" },
};

const services = [
  { category: "Hair", name: "Haircut & Styling", price: 400, duration: 45, desc: "Expert cut and blow-dry for all hair types", popular: true },
  { category: "Hair", name: "Hair Color", price: 1200, duration: 120, desc: "Full color, highlights, balayage & ombre" },
  { category: "Hair", name: "Keratin Treatment", price: 2500, duration: 150, desc: "Frizz-free smoothening treatment", popular: true },
  { category: "Hair", name: "Hair Spa", price: 800, duration: 60, desc: "Deep conditioning & scalp nourishment" },
  { category: "Face", name: "Classic Facial", price: 600, duration: 60, desc: "Deep cleansing & skin brightening", popular: true },
  { category: "Face", name: "Gold Facial", price: 1200, duration: 75, desc: "Luxury gold-infused anti-aging treatment" },
  { category: "Face", name: "Clean-Up", price: 350, duration: 45, desc: "Quick skin cleansing & toning" },
  { category: "Face", name: "Bridal Makeup", price: 4000, duration: 180, desc: "Complete bridal look with trial session", popular: true },
  { category: "Nails", name: "Manicure", price: 300, duration: 30, desc: "Classic nail care & polish" },
  { category: "Nails", name: "Pedicure", price: 400, duration: 45, desc: "Relaxing foot care & nail polish" },
  { category: "Nails", name: "Gel Nails", price: 800, duration: 60, desc: "Long-lasting gel nail application", popular: true },
  { category: "Nails", name: "Nail Art", price: 600, duration: 60, desc: "Custom nail art designs" },
  { category: "Body & Spa", name: "Full Body Massage", price: 1500, duration: 90, desc: "Relaxing Swedish or deep-tissue massage", popular: true },
  { category: "Body & Spa", name: "Body Scrub", price: 1200, duration: 60, desc: "Exfoliating body scrub treatment" },
  { category: "Body & Spa", name: "Aromatherapy", price: 1800, duration: 90, desc: "Essential oil therapy for mind & body" },
  { category: "Waxing", name: "Full Arms Waxing", price: 250, duration: 30, desc: "Smooth hair removal for arms" },
  { category: "Waxing", name: "Full Legs Waxing", price: 350, duration: 45, desc: "Full leg hair removal" },
  { category: "Waxing", name: "Full Body Waxing", price: 1200, duration: 120, desc: "Complete body hair removal" },
];

export default function ServicesPage() {
  const [active, setActive] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const filtered = active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {/* Parallax Hero */}
        <section ref={heroRef} className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: bgY }} className="absolute inset-0 g-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.2),transparent_70%)]" />
          <motion.div
            className="absolute top-8 right-8 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          <div className="relative z-10 text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-3"
            >
              Premium Treatments
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-6xl font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our <span className="gradient-text">Services</span>
            </motion.h1>
          </div>
        </section>

        {/* Category tabs */}
        <section className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur-xl border-b border-pink-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const meta = cat !== "All" ? categoryMeta[cat] : null;
              return (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActive(cat)}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    active === cat
                      ? "bg-gradient-to-r g-primary text-white shadow-md shadow-pink-300/30"
                      : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                >
                  {meta && <meta.icon className="w-3.5 h-3.5" />}
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Services grid */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((svc) => {
                const meta = categoryMeta[svc.category];
                return (
                  <motion.div key={`${svc.category}-${svc.name}`} variants={fadeUp}>
                    <div className="group relative bg-white rounded-3xl p-6 border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-pink-100/60 transition-all duration-400 overflow-hidden">
                      {svc.popular && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r g-primary text-white text-xs font-semibold">
                          <Star className="w-3 h-3 fill-white" /> Popular
                        </div>
                      )}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center mb-4 shadow-md`}>
                        <meta.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-1.5 pr-20" style={{ fontFamily: "var(--font-heading)" }}>
                        {svc.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-5 leading-relaxed">{svc.desc}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold gradient-text">₹{svc.price.toLocaleString()}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                            <Clock className="w-3 h-3" /> {svc.duration} min
                          </div>
                        </div>
                        <Link
                          href={`/booking?service=${encodeURIComponent(svc.name)}`}
                          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold ${meta.color} bg-gray-50 hover:bg-gradient-to-r hover:${meta.gradient} hover:text-white transition-all duration-200 cursor-pointer`}
                        >
                          Book <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      {/* Hover bottom glow */}
                      <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-8 blur-2xl transition-opacity duration-500`} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </>
  );
}
