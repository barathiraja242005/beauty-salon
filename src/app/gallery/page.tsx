"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { X } from "lucide-react";
import { staggerContainer, fadeIn } from "@/components/ui/AnimatedSection";

const categories = ["All", "Hair", "Face", "Nails", "Body", "Bridal"];

const galleryItems = [
  { id: 1,  category: "Hair",   label: "Balayage Colour",  desc: "Sun-kissed hair colouring",    src: "/images/gallery/balayage.jpg",        span: "col-span-2 row-span-2" },
  { id: 2,  category: "Bridal", label: "Bridal Makeup",    desc: "Complete bridal glam",          src: "/images/gallery/bridal-makeup.jpg",   span: "" },
  { id: 3,  category: "Nails",  label: "Gel Art Design",   desc: "Custom gel nail art",           src: "/images/gallery/gel-nails.jpg",       span: "" },
  { id: 4,  category: "Hair",   label: "Keratin Smooth",   desc: "Frizz-free keratin",            src: "/images/gallery/keratin.jpg",         span: "" },
  { id: 5,  category: "Body",   label: "Relaxing Spa",     desc: "Full body massage",             src: "/images/gallery/spa.jpg",             span: "" },
  { id: 6,  category: "Face",   label: "Gold Facial",      desc: "Anti-aging gold treatment",     src: "/images/gallery/gold-facial.jpg",     span: "col-span-2" },
  { id: 7,  category: "Nails",  label: "French Manicure",  desc: "Classic French tips",           src: "/images/gallery/french-manicure.jpg", span: "" },
  { id: 8,  category: "Hair",   label: "Ombre Style",      desc: "Gradient hair colouring",       src: "/images/gallery/ombre.jpg",           span: "" },
  { id: 9,  category: "Face",   label: "Skin Clean-up",    desc: "Deep pore cleansing",           src: "/images/gallery/skin-cleanup.jpg",    span: "" },
  { id: 10, category: "Bridal", label: "Reception Look",   desc: "Stunning reception makeup",     src: "/images/gallery/reception-look.jpg",  span: "col-span-2" },
  { id: 11, category: "Body",   label: "Aromatherapy",     desc: "Essential oil therapy",         src: "/images/gallery/aromatherapy.jpg",    span: "" },
  { id: 12, category: "Nails",  label: "Nail Extension",   desc: "Acrylic nail extension",        src: "/images/gallery/nail-extension.jpg",  span: "" },
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
        <section ref={heroRef} className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[#2A1520]">
          <motion.div style={{ y: bgY }} className="absolute inset-0">
            <Image src="/images/hero/banner.jpg" alt="Gallery" fill className="object-cover opacity-40" sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 g-dark opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_70%)]" />
          <motion.div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDF5F8] to-transparent" />
          <div className="relative z-10 text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#D4789A] text-xs font-medium tracking-[0.3em] uppercase mb-4"
            >
              Our Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-6xl font-light text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Beautiful <em className="gradient-text not-italic font-semibold">Work</em>
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
                className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? "g-primary text-white shadow-md"
                    : "bg-white text-[#7A5A66] border border-[#EDD0D8] hover:border-pink-200 hover:text-rose-700"
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
                  className={`${item.span} relative rounded-2xl overflow-hidden group cursor-pointer bg-[#3D2030]`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[#2A1520]/10 group-hover:bg-[#2A1520]/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-sm font-medium drop-shadow tracking-wide">{item.label}</span>
                    <span className="text-white/60 text-xs">{item.desc}</span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-medium text-white bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm tracking-wider">
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
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
              >
                <div className="relative h-[420px] bg-[#3D2030]">
                  <Image
                    src={selected.src}
                    alt={selected.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1520]/80 via-transparent to-transparent" />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                    <span className="text-xs font-medium text-[#D4789A] uppercase tracking-[0.2em] mb-1">{selected.category}</span>
                    <h3 className="text-2xl font-semibold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                      {selected.label}
                    </h3>
                    <p className="text-white/60 text-sm">{selected.desc}</p>
                  </div>
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
