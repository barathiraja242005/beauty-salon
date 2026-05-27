"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Clock, ChevronRight, Scissors, Sparkles, Heart, Wind, Feather, Eye, Gem, Waves, Palette, Zap, Droplets, Sun, Crown, RefreshCw, Star, Layers, Paintbrush, Activity, Leaf, Flame, Shield, Flower2 } from "lucide-react";
import { fadeUp } from "@/components/ui/AnimatedSection";

type IC = React.ComponentType<{ className?: string }>;

const categories = ["All", "Hair", "Face", "Nails", "Body & Spa", "Waxing"];

const categoryMeta: Record<string, { icon: IC; image: string; tagline: string }> = {
  Hair:        { icon: Scissors, image: "/images/services/hair.jpg",     tagline: "Cut, colour & care" },
  Face:        { icon: Eye,      image: "/images/services/face.jpg",     tagline: "Glow & radiance" },
  Nails:       { icon: Gem,      image: "/images/services/nails.jpg",    tagline: "Manicure & artistry" },
  "Body & Spa":{ icon: Waves,    image: "/images/services/body-spa.jpg", tagline: "Relax & restore" },
  Waxing:      { icon: Feather,  image: "/images/services/waxing.jpg",   tagline: "Smooth & silky" },
};

const services = [
  { category: "Hair",      name: "Haircut & Styling",  icon: Scissors,   price: 400,  duration: 45,  desc: "Expert cut and blow-dry for all hair types",         popular: true },
  { category: "Hair",      name: "Hair Color",          icon: Palette,    price: 1200, duration: 120, desc: "Full color, highlights, balayage & ombre" },
  { category: "Hair",      name: "Keratin Treatment",   icon: Zap,        price: 2500, duration: 150, desc: "Frizz-free smoothening treatment for silky locks",   popular: true },
  { category: "Hair",      name: "Hair Spa",            icon: Droplets,   price: 800,  duration: 60,  desc: "Deep conditioning & scalp nourishment" },
  { category: "Face",      name: "Classic Facial",      icon: Sun,        price: 600,  duration: 60,  desc: "Deep cleansing & skin brightening",                  popular: true },
  { category: "Face",      name: "Gold Facial",         icon: Crown,      price: 1200, duration: 75,  desc: "Luxury gold-infused anti-aging treatment" },
  { category: "Face",      name: "Clean-Up",            icon: RefreshCw,  price: 350,  duration: 45,  desc: "Quick skin cleansing & toning" },
  { category: "Face",      name: "Bridal Makeup",       icon: Sparkles,   price: 4000, duration: 180, desc: "Complete bridal look with a full trial session",     popular: true },
  { category: "Nails",     name: "Manicure",            icon: Star,       price: 300,  duration: 30,  desc: "Classic nail care & polish" },
  { category: "Nails",     name: "Pedicure",            icon: Heart,      price: 400,  duration: 45,  desc: "Relaxing foot care & nail polish" },
  { category: "Nails",     name: "Gel Nails",           icon: Layers,     price: 800,  duration: 60,  desc: "Long-lasting gel nail application",                  popular: true },
  { category: "Nails",     name: "Nail Art",            icon: Paintbrush, price: 600,  duration: 60,  desc: "Custom nail art designs" },
  { category: "Body & Spa",name: "Full Body Massage",   icon: Activity,   price: 1500, duration: 90,  desc: "Relaxing Swedish or deep-tissue massage",            popular: true },
  { category: "Body & Spa",name: "Body Scrub",          icon: Leaf,       price: 1200, duration: 60,  desc: "Exfoliating full-body scrub treatment" },
  { category: "Body & Spa",name: "Aromatherapy",        icon: Flame,      price: 1800, duration: 90,  desc: "Essential oil therapy for mind & body" },
  { category: "Waxing",    name: "Full Arms Waxing",    icon: Wind,       price: 250,  duration: 30,  desc: "Smooth hair removal for arms" },
  { category: "Waxing",    name: "Full Legs Waxing",    icon: Flower2,    price: 350,  duration: 45,  desc: "Full leg hair removal" },
  { category: "Waxing",    name: "Full Body Waxing",    icon: Shield,     price: 1200, duration: 120, desc: "Complete body hair removal",                        popular: true },
];

/* ── Icon — soft warm circle, white card variant ── */
function IconSm({ icon: Icon }: { icon: IC }) {
  return (
    <div className="w-11 h-11 mb-5 shrink-0 rounded-full bg-gradient-to-br from-[#FDF0F4] to-[#F5DEE6] border border-[#C96B8A]/25 flex items-center justify-center group-hover:border-[#C96B8A]/55 group-hover:from-[#FAE8EE] group-hover:to-[#E8C0CC]/50 transition-all duration-300">
      <Icon className="w-[18px] h-[18px] text-[#C96B8A] group-hover:text-[#A84E6E] transition-colors duration-300" />
    </div>
  );
}

/* ── Icon — soft warm circle, dark card variant ── */
function IconLg({ icon: Icon }: { icon: IC }) {
  return (
    <div className="w-14 h-14 shrink-0 rounded-full bg-[#C96B8A]/10 border border-[#C96B8A]/20 flex items-center justify-center group-hover:bg-[#C96B8A]/18 group-hover:border-[#C96B8A]/45 transition-all duration-400">
      <Icon className="w-6 h-6 text-[#C96B8A]/70 group-hover:text-[#D4789A] transition-colors duration-300" />
    </div>
  );
}

/* ── Dark "Signature" card ── */
function SignatureCard({ svc, num }: { svc: typeof services[0]; num: number }) {
  return (
    <motion.div variants={fadeUp}>
      <div className="group relative bg-[#3D2030] rounded-3xl border border-[#C96B8A]/10 hover:border-[#C96B8A]/30 p-7 md:p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#C96B8A]/12">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-[0.06] g-blob-1 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-2xl opacity-[0.04] g-blob-2 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-6 md:gap-10">
          <IconLg icon={svc.icon} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-medium tracking-[0.25em] text-[#C96B8A]/50 uppercase">{svc.category}</span>
              <span className="w-1 h-1 rounded-full bg-[#C96B8A]/25" />
              <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.2em] text-[#D4789A]/60 uppercase">
                <span className="w-1 h-1 rounded-full bg-[#D4789A]/60 animate-pulse" />Signature
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-white mb-2 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {svc.name}
            </h3>
            <p className="text-white/30 text-sm leading-relaxed mb-6 max-w-md">{svc.desc}</p>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <div className="text-2xl font-light gradient-text" style={{ fontFamily: "var(--font-heading)" }}>
                  ₹{svc.price.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-white/25 text-xs mt-0.5">
                  <Clock className="w-3 h-3" /> {svc.duration} min
                </div>
              </div>
              <Link href={`/booking?service=${encodeURIComponent(svc.name)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full g-primary text-white text-xs font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-rose-900/30">
                Reserve <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block shrink-0 self-center">
            <span className="text-[5.5rem] font-light italic leading-none text-white/[0.04] select-none" style={{ fontFamily: "var(--font-heading)" }}>
              {String(num).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-8 right-8 h-px g-primary opacity-0 group-hover:opacity-25 transition-opacity duration-400 rounded-full" />
      </div>
    </motion.div>
  );
}

/* ── White "Standard" card ── */
function StandardCard({ svc, num }: { svc: typeof services[0]; num: number }) {
  return (
    <motion.div variants={fadeUp}>
      <div className="group relative bg-white rounded-3xl p-6 border border-[#EDD0D8] hover:border-[#C96B8A]/20 hover:shadow-xl hover:shadow-pink-50/30 transition-all duration-400 overflow-hidden h-full">
        <span className="absolute top-3 right-4 text-[5rem] font-light italic leading-none text-[#2A1520]/[0.04] select-none pointer-events-none" style={{ fontFamily: "var(--font-heading)" }}>
          {String(num).padStart(2, "0")}
        </span>
        <IconSm icon={svc.icon} />
        <h3 className="text-base font-semibold text-[#2A1520] mb-1.5 pr-10" style={{ fontFamily: "var(--font-heading)" }}>{svc.name}</h3>
        <p className="text-[#7A5A66] text-xs leading-relaxed mb-5">{svc.desc}</p>
        <div className="w-full border-t border-dashed border-[#C96B8A]/15 mb-4" />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold gradient-text" style={{ fontFamily: "var(--font-heading)" }}>₹{svc.price.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[#A89098] text-[11px] mt-0.5"><Clock className="w-3 h-3" /> {svc.duration} min</div>
          </div>
          <Link href={`/booking?service=${encodeURIComponent(svc.name)}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#C96B8A]/30 text-[#C96B8A] text-[11px] font-medium tracking-wider uppercase hover:g-primary hover:text-white hover:border-transparent transition-all duration-200 cursor-pointer">
            Book <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="absolute bottom-0 left-5 right-5 h-px g-primary opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function ServicesPage() {
  const [active, setActive] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const filtered   = active === "All" ? services : services.filter(s => s.category === active);
  const signature  = filtered.filter(s => s.popular);
  const standard   = filtered.filter(s => !s.popular);
  const activeMeta = active !== "All" ? categoryMeta[active] : null;

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">

        {/* Hero */}
        <section ref={heroRef} className="relative h-[60vh] md:h-[65vh] flex items-end justify-center overflow-hidden bg-[#2A1520]">
          <motion.div style={{ y: bgY }} className="absolute inset-0">
            <Image src="/images/hero/banner.jpg" alt="Services" fill className="object-cover opacity-35" sizes="100vw" priority />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A1520]/40 via-[#2A1520]/50 to-[#2A1520]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,77,0.08),transparent_65%)]" />
          <motion.div className="absolute top-16 right-16 w-72 h-72 rounded-full blur-3xl opacity-10 g-blob-1"
            animate={{ scale:[1,1.15,1], opacity:[0.08,0.14,0.08] }} transition={{ repeat:Infinity, duration:7, ease:"easeInOut" }} />
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#FDF5F8] to-transparent" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16 w-full">
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-[#D4789A] text-xs font-medium tracking-[0.35em] uppercase mb-4">
              Premium Treatments
            </motion.p>
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.12 }}
              className="text-6xl md:text-8xl font-light text-white leading-none" style={{ fontFamily:"var(--font-heading)" }}>
              Our <em className="gradient-text not-italic font-semibold">Services</em>
            </motion.h1>
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }}
              className="text-white/35 mt-3 text-sm tracking-wide max-w-sm">
              {services.length} curated treatments across {Object.keys(categoryMeta).length} categories
            </motion.p>
          </div>
        </section>

        {/* Category Selector */}
        <section className="bg-white border-b border-[#EDD0D8] shadow-sm sticky top-16 md:top-20 z-30">
          <div className="max-w-6xl mx-auto px-4 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map(cat => {
              const meta     = cat !== "All" ? categoryMeta[cat] : null;
              const count    = cat === "All" ? services.length : services.filter(s => s.category === cat).length;
              const isActive = active === cat;
              return (
                <motion.button key={cat} onClick={() => setActive(cat)} whileTap={{ scale:0.97 }}
                  className={`relative shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isActive ? "ring-2 ring-[#C96B8A] shadow-lg shadow-pink-100/20" : "opacity-55 hover:opacity-85"}`}
                  style={{ width:108, height:128 }}>
                  {meta ? <Image src={meta.image} alt={cat} fill className="object-cover" sizes="108px" /> : <div className="absolute inset-0 g-dark" />}
                  <div className={`absolute inset-0 transition-all duration-300 ${isActive ? "bg-[#3D2030]/52" : "bg-[#3D2030]/65"}`} />
                  {isActive && <div className="absolute top-0 left-0 right-0 h-0.5 g-primary" />}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-2">
                    {meta && (
                      <div className="w-8 h-8 mb-0.5 rounded-full bg-white/10 border border-[#C96B8A]/30 flex items-center justify-center">
                        <meta.icon className={`w-[13px] h-[13px] text-[#C96B8A] ${isActive ? "opacity-100" : "opacity-70"}`} />
                      </div>
                    )}
                    <span className="text-white font-semibold text-[11px] tracking-widest uppercase text-center leading-tight">{cat}</span>
                    <span className={`text-[10px] font-medium ${isActive ? "text-[#D4789A]" : "text-white/35"}`}>{count}</span>
                  </div>
                  {isActive && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-r border-b border-[#C96B8A]/20" />}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Category Banner */}
        <AnimatePresence mode="wait">
          {activeMeta && (
            <motion.section key={active} initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.3 }} className="relative h-24 overflow-hidden">
              <Image src={activeMeta.image} alt={active} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-[#3D2030]/72" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D2030]/60 to-transparent" />
              <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex items-center gap-4">
                <span className="text-3xl font-light italic gradient-text" style={{ fontFamily:"var(--font-heading)" }}>{active}</span>
                <div className="w-px h-8 bg-[#C96B8A]/30" />
                <span className="text-white/40 text-xs tracking-widest uppercase">{activeMeta.tagline}</span>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Services */}
        <section className="max-w-6xl mx-auto px-4 py-14">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}>
              {signature.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#C96B8A]">Signature Treatments</p>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#C96B8A]/30 to-transparent" />
                  </div>
                  <motion.div className="grid grid-cols-1 gap-4" initial="hidden" animate="show" variants={{ show:{ transition:{ staggerChildren:0.08 } }, hidden:{} }}>
                    {signature.map((svc,i) => <SignatureCard key={svc.name} svc={svc} num={i+1} />)}
                  </motion.div>
                </div>
              )}
              {standard.length > 0 && (
                <div>
                  {signature.length > 0 && (
                    <div className="flex items-center gap-4 mb-6">
                      <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#7A5A66]">All Treatments</p>
                      <div className="flex-1 h-px bg-[#EDD0D8]" />
                    </div>
                  )}
                  <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" initial="hidden" animate="show" variants={{ show:{ transition:{ staggerChildren:0.06 } }, hidden:{} }}>
                    {standard.map((svc,i) => <StandardCard key={svc.name} svc={svc} num={signature.length+i+1} />)}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

      </main>
      <Footer />
    </>
  );
}
