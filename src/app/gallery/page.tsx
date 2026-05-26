"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { X } from "lucide-react";
import { staggerContainer, fadeIn } from "@/components/ui/AnimatedSection";

const categories = ["All", "Hair", "Face", "Nails", "Body", "Bridal"];

const galleryItems = [
  { id: 1, category: "Hair", label: "Balayage Color", desc: "Sun-kissed hair coloring", bg: "from-pink-300 to-rose-400", span: "col-span-2 row-span-2" },
  { id: 2, category: "Bridal", label: "Bridal Makeup", desc: "Complete bridal glam", bg: "from-violet-300 to-purple-400", span: "" },
  { id: 3, category: "Nails", label: "Gel Art Design", desc: "Custom gel nail art", bg: "from-fuchsia-300 to-pink-400", span: "" },
  { id: 4, category: "Hair", label: "Keratin Smooth", desc: "Frizz-free keratin", bg: "from-pink-400 to-rose-500", span: "" },
  { id: 5, category: "Body", label: "Relaxing Spa", desc: "Full body massage", bg: "from-amber-300 to-orange-400", span: "" },
  { id: 6, category: "Face", label: "Gold Facial", desc: "Anti-aging gold treatment", bg: "from-yellow-300 to-amber-400", span: "col-span-2" },
  { id: 7, category: "Nails", label: "French Manicure", desc: "Classic French tips", bg: "from-pink-200 to-rose-300", span: "" },
  { id: 8, category: "Hair", label: "Ombre Style", desc: "Gradient hair coloring", bg: "from-rose-300 to-pink-500", span: "" },
  { id: 9, category: "Face", label: "Skin Clean-up", desc: "Deep pore cleansing", bg: "from-violet-200 to-purple-300", span: "" },
  { id: 10, category: "Bridal", label: "Reception Look", desc: "Stunning reception makeup", bg: "from-fuchsia-400 to-violet-500", span: "col-span-2" },
  { id: 11, category: "Body", label: "Aromatherapy", desc: "Essential oil therapy", bg: "from-teal-300 to-cyan-400", span: "" },
  { id: 12, category: "Nails", label: "Nail Extension", desc: "Acrylic nail extension", bg: "from-purple-300 to-violet-400", span: "" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<typeof galleryItems[0] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const filtered = activeFilter === "All" ? galleryItems : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {/* Parallax Hero */}
        <section ref={heroRef} className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: bgY }} className="absolute inset-0 g-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_70%)]" />
          <motion.div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDF2F8] to-transparent" />
          <div className="relative z-10 text-center px-4">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Our Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-6xl font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Beautiful <span className="gradient-text">Work</span>
            </motion.h1>
          </div>
        </section>

        {/* Filter */}
        <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-gradient-to-r g-primary text-white shadow-md shadow-pink-300/30"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-pink-300 hover:text-pink-600"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Masonry grid */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-3"
            >
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeIn}
                  onClick={() => setSelected(item)}
                  className={`${item.span} bg-gradient-to-br ${item.bg} rounded-2xl relative overflow-hidden group cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-sm font-bold drop-shadow">{item.label}</span>
                    <span className="text-white/70 text-xs">{item.desc}</span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-medium text-white bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-lg h-80 rounded-3xl bg-gradient-to-br ${selected.bg} relative overflow-hidden shadow-2xl`}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">{selected.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {selected.label}
                  </h3>
                  <p className="text-white/70 text-sm">{selected.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
