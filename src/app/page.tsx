"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection, { staggerContainer, fadeUp } from "@/components/ui/AnimatedSection";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Scissors, Sparkles, Star, Heart, Clock, ChevronRight, ArrowDown, Flower, Wind, CheckCircle } from "lucide-react";

const services = [
  { icon: Scissors, title: "Hair Styling",  desc: "Cuts, color, keratin & more",        grad: "from-rose-400 to-pink-500" },
  { icon: Sparkles, title: "Skin Care",     desc: "Facials, clean-ups & glow",          grad: "from-violet-400 to-purple-500" },
  { icon: Heart,    title: "Nail Art",      desc: "Manicure, pedicure & nail art",      grad: "from-fuchsia-400 to-pink-500" },
  { icon: Flower,   title: "Body Spa",      desc: "Massage, wraps & relaxation",        grad: "from-amber-400 to-orange-500" },
];

const stats = [
  { end: 500, suffix: "+", label: "Happy Clients" },
  { end: 10,  suffix: "+", label: "Expert Stylists" },
  { end: 50,  suffix: "+", label: "Services" },
  { end: 5,   suffix: "★", label: "Avg Rating" },
];

const testimonials = [
  { name: "Priya S.",  role: "Bridal Client",   text: "Best salon in Chennai! The bridal makeover was absolutely stunning.", stars: 5 },
  { name: "Deepa R.", role: "Regular Client",  text: "Love the ambience and the staff is so professional. My go-to place!", stars: 5 },
  { name: "Anitha M.",role: "Hair & Spa",      text: "The keratin treatment changed my life. Highly recommend their hair spa!", stars: 5 },
];

const features = [
  "100% organic & skin-safe products",
  "Expert-trained stylists",
  "Hygienic & sanitized tools",
  "Relaxing premium ambience",
];

/* ─── Hero ─── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY1   = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blobY2   = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const textY    = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden g-dark">
      {/* Parallax blobs */}
      <motion.div style={{ y: blobY1 }} className="absolute top-0 right-0 w-[650px] h-[650px] rounded-full blur-3xl pointer-events-none opacity-20 g-blob-1 animate-float-slow" />
      <motion.div style={{ y: blobY2 }} className="absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none opacity-15 g-blob-2 animate-float-delay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur text-white/70 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
          Premium Beauty & Wellness Experience
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Where Beauty
          <br />
          <span className="gradient-text">Meets Art</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Step into a world of luxury beauty and wellness. Our expert stylists craft
          personalised experiences that reveal your most radiant self.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/booking" className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full g-primary text-white text-base font-semibold shadow-2xl hover:opacity-90 transition-opacity cursor-pointer">
              Book Your Session <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/services" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 bg-white/8 backdrop-blur text-white text-base font-medium hover:bg-white/14 transition-colors cursor-pointer">
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Stats ─── */
function StatsSection() {
  return (
    <section className="bg-white border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="py-10 px-6 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                <AnimatedCounter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-sm t-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Services ─── */
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 site-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 t-accent">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 t-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="t-muted max-w-xl mx-auto text-lg">Indulge in our curated collection of beauty and wellness treatments</p>
        </AnimatedSection>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((svc) => (
            <motion.div key={svc.title} variants={fadeUp}>
              <Link href="/services" className="group block cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl p-7 bg-white border hover:border-transparent hover:shadow-2xl card-shadow transition-all duration-500" style={{ borderColor: "var(--border)" }}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.grad} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svc.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 t-heading" style={{ fontFamily: "var(--font-heading)" }}>{svc.title}</h3>
                  <p className="text-sm t-muted leading-relaxed mb-4">{svc.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold gradient-text">
                    Explore <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="text-center mt-12">
          <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 font-semibold t-heading hover:g-primary hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer" style={{ borderColor: "var(--border)" }}>
            View All Services <ChevronRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Why Us ─── */
function WhyUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={ref} className="relative py-28 g-dark overflow-hidden">
      <motion.div style={{ y: bY }} className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-10 g-blob-1" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4 t-accent">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              A Sanctuary for<br /><span className="gradient-text">Your Beauty</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              At Glamour Studio, every treatment is a ritual. We combine ancient wellness
              traditions with modern techniques to deliver results that truly glow.
            </p>
            <div className="space-y-4">
              {features.map((f) => (
                <motion.div key={f} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full g-primary flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white/65 text-sm">{f}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/booking" className="inline-flex items-center gap-2 px-7 py-4 rounded-full g-primary text-white font-semibold shadow-xl hover:opacity-90 transition-opacity cursor-pointer">
                Book Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Hair Colour",  bg: "from-rose-400 to-pink-500",    h: "h-48" },
                { label: "Bridal Glow", bg: "from-violet-400 to-purple-500", h: "h-32" },
                { label: "Nail Art",    bg: "from-fuchsia-400 to-pink-500",  h: "h-32" },
                { label: "Body Spa",    bg: "from-amber-400 to-orange-500",  h: "h-48" },
              ].map((item) => (
                <div key={item.label} className={`${item.h} rounded-2xl bg-gradient-to-br ${item.bg} relative overflow-hidden group cursor-pointer`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="text-white/90 text-sm font-semibold drop-shadow">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ─── */
function GallerySection() {
  const items = [
    { bg: "from-rose-300 to-pink-400",       span: "col-span-2 row-span-2", label: "Balayage Color" },
    { bg: "from-violet-300 to-purple-400",   span: "",                       label: "Bridal Glow" },
    { bg: "from-fuchsia-300 to-pink-400",    span: "",                       label: "Nail Art" },
    { bg: "from-amber-300 to-orange-400",    span: "",                       label: "Hair Spa" },
    { bg: "from-teal-300 to-cyan-400",       span: "",                       label: "Body Wrap" },
    { bg: "from-purple-300 to-violet-400",   span: "col-span-2",             label: "Facial Treatment" },
  ];
  return (
    <section className="relative py-28 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 t-accent">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 t-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Our <span className="gradient-text">Transformations</span>
          </h2>
          <p className="t-muted text-lg">Beautiful results that speak for themselves</p>
        </AnimatedSection>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-3 grid-rows-3 gap-4 h-[480px]"
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={fadeUp}
              className={`${item.span} bg-gradient-to-br ${item.bg} rounded-2xl relative overflow-hidden group cursor-pointer`}
              whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute inset-0 flex items-end p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-sm font-semibold drop-shadow-lg">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <AnimatedSection className="text-center mt-12">
          <Link href="/gallery" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 font-semibold t-heading hover:g-primary hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer" style={{ borderColor: "var(--border)" }}>
            View Full Gallery <ChevronRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  return (
    <section className="relative py-28 g-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 t-accent">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </AnimatedSection>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}
              className="rounded-3xl p-7 border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="text-6xl font-serif text-white/10 leading-none absolute top-4 left-6 select-none">&ldquo;</div>
              <div className="flex gap-1 mb-4 relative z-10">
                {Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-5 relative z-10">{t.text}</p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full g-primary flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale   = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-28 px-4 bg-white">
      <motion.div style={{ scale, opacity }} className="max-w-3xl mx-auto">
        <div className="relative g-primary rounded-[2rem] p-px shadow-2xl card-shadow-lg">
          <div className="rounded-[calc(2rem-2px)] g-dark p-12 md:p-16 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-16 h-16 rounded-full g-primary flex items-center justify-center mx-auto mb-6 shadow-xl"
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-heading)" }}>
              Ready for Your <span className="gradient-text">Glow-Up?</span>
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
              Book your appointment today and let our expert team craft your perfect look.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/booking" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white t-heading font-bold hover:shadow-xl transition-shadow cursor-pointer">
                  Book Appointment <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors cursor-pointer">
                  <Wind className="w-4 h-4" /> Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <WhyUsSection />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
