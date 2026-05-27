"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection, { staggerContainer, fadeUp } from "@/components/ui/AnimatedSection";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Scissors, Sparkles, Star, Heart, Clock, ChevronRight, ArrowDown, Flower, Wind, CheckCircle } from "lucide-react";

const services = [
  { icon: Scissors, title: "Hair Styling",  desc: "Cuts, colour, keratin & more",  src: "/images/services/hair.jpg" },
  { icon: Sparkles, title: "Skin Care",     desc: "Facials, clean-ups & glow",     src: "/images/services/face.jpg" },
  { icon: Heart,    title: "Nail Art",      desc: "Manicure, pedicure & nail art", src: "/images/services/nails.jpg" },
  { icon: Flower,   title: "Body Spa",      desc: "Massage, wraps & relaxation",   src: "/images/services/body-spa.jpg" },
];

const stats = [
  { end: 500, suffix: "+", label: "Happy Clients" },
  { end: 10,  suffix: "+", label: "Expert Stylists" },
  { end: 50,  suffix: "+", label: "Services" },
  { end: 5,   suffix: "★", label: "Avg Rating" },
];

const testimonials = [
  { name: "Priya S.",   role: "Bridal Client",  text: "Best salon in Chennai! The bridal makeover was absolutely stunning.", stars: 5 },
  { name: "Deepa R.",   role: "Regular Client", text: "Love the ambience and the staff is so professional. My go-to place!", stars: 5 },
  { name: "Anitha M.",  role: "Hair & Spa",     text: "The keratin treatment changed my life. Highly recommend their hair spa!", stars: 5 },
];

const features = [
  "100% organic & skin-safe products",
  "Expert-trained stylists",
  "Hygienic & sanitised tools",
  "Relaxing premium ambience",
];

/* ─── Hero ─── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY   = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2A1520]">
      {/* Parallax image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <Image
          src="/images/hero/banner.jpg"
          alt="Glamour Studio salon interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      {/* Layered overlay: dark + gold vignette */}
      <div className="absolute inset-0 bg-[#2A1520]/65" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,162,77,0.12),transparent_65%)]" />
      {/* Gold shimmer blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-10 g-blob-1 animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-8 g-blob-2 animate-float-delay" />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#C96B8A]/20 bg-[#C96B8A]/8 backdrop-blur text-[#C96B8A]/80 text-xs font-medium tracking-[0.2em] uppercase mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4789A] animate-pulse" />
          Premium Beauty & Wellness
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-light text-white mb-6 leading-[1.0] tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Where Beauty
          <br />
          <em className="gradient-text not-italic font-semibold">Meets Art</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base md:text-lg text-white/45 max-w-xl mx-auto mb-12 leading-relaxed tracking-wide"
        >
          Step into a world of luxury beauty and wellness. Our expert stylists craft
          personalised experiences that reveal your most radiant self.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/booking" className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full g-primary text-white text-sm font-semibold tracking-widest uppercase shadow-2xl hover:opacity-90 transition-opacity cursor-pointer">
              Book Your Session <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/services" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur text-white/70 text-sm font-medium tracking-wider hover:bg-white/10 hover:text-white transition-all cursor-pointer">
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
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
    <section className="bg-white border-b border-[#EDD0D8]">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#EDD0D8]"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="py-10 px-6 text-center">
              <div className="text-4xl md:text-5xl font-light gradient-text mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                <AnimatedCounter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-xs tracking-widest uppercase text-[#7A5A66]">{s.label}</div>
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
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4 t-accent">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-light mb-4 t-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Our <em className="gradient-text not-italic font-semibold">Services</em>
          </h2>
          <p className="t-muted max-w-xl mx-auto leading-relaxed">Indulge in our curated collection of beauty and wellness treatments</p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((svc) => (
            <motion.div key={svc.title} variants={fadeUp}>
              <Link href="/services" className="group block cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl bg-white border border-[#EDD0D8] hover:border-transparent hover:shadow-2xl card-shadow transition-all duration-500">
                  {/* Image thumbnail */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={svc.src}
                      alt={svc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[#2A1520]/20 group-hover:bg-[#2A1520]/30 transition-colors duration-300" />
                    <div className="absolute bottom-3 left-4">
                      <div className="w-9 h-9 rounded-xl g-primary flex items-center justify-center shadow-md">
                        <svc.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold mb-1.5 t-heading" style={{ fontFamily: "var(--font-heading)" }}>{svc.title}</h3>
                    <p className="text-sm t-muted leading-relaxed mb-3">{svc.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase gradient-text">
                      Explore <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#EDD0D8] font-medium text-sm tracking-wider uppercase t-heading hover:g-primary hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer"
          >
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

  const collage = [
    { label: "Hair Colour",  src: "/images/why-us/hair-colour.jpg",  h: "h-48" },
    { label: "Bridal Glow", src: "/images/why-us/bridal-glow.jpg",  h: "h-32" },
    { label: "Nail Art",    src: "/images/why-us/nail-art.jpg",     h: "h-32" },
    { label: "Body Spa",    src: "/images/why-us/body-spa.jpg",     h: "h-48" },
  ];

  return (
    <section ref={ref} className="relative py-28 g-dark overflow-hidden">
      <motion.div style={{ y: bY }} className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-10 g-blob-1" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4 t-accent">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              A Sanctuary for<br /><em className="gradient-text not-italic font-semibold">Your Beauty</em>
            </h2>
            <p className="text-white/45 leading-relaxed mb-10">
              At Glamour Studio, every treatment is a ritual. We combine ancient wellness
              traditions with modern techniques to deliver results that truly glow.
            </p>
            <div className="space-y-4">
              {features.map((f) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full g-primary flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white/60 text-sm">{f}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/booking" className="inline-flex items-center gap-2 px-7 py-4 rounded-full g-primary text-white text-sm font-semibold tracking-wider uppercase shadow-xl hover:opacity-90 transition-opacity cursor-pointer">
                Book Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {collage.map((item) => (
                <div key={item.label} className={`${item.h} rounded-2xl relative overflow-hidden group cursor-pointer`}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[#2A1520]/30 group-hover:bg-[#2A1520]/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="text-white/90 text-sm font-medium drop-shadow tracking-wide">{item.label}</span>
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
    { src: "/images/gallery/balayage.jpg",      span: "col-span-2 row-span-2", label: "Balayage Colour" },
    { src: "/images/gallery/bridal-makeup.jpg", span: "",                       label: "Bridal Glow" },
    { src: "/images/gallery/gel-nails.jpg",     span: "",                       label: "Nail Art" },
    { src: "/images/gallery/keratin.jpg",        span: "",                       label: "Hair Spa" },
    { src: "/images/gallery/spa.jpg",           span: "",                       label: "Body Wrap" },
    { src: "/images/gallery/gold-facial.jpg",   span: "col-span-2",             label: "Gold Facial" },
  ];
  return (
    <section className="relative py-28 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4 t-accent">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-light mb-4 t-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Our <em className="gradient-text not-italic font-semibold">Transformations</em>
          </h2>
          <p className="t-muted">Beautiful results that speak for themselves</p>
        </AnimatedSection>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-3 grid-rows-3 gap-4 h-[480px]"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`${item.span} relative rounded-2xl overflow-hidden group cursor-pointer`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#2A1520]/10 group-hover:bg-[#2A1520]/45 transition-all duration-300" />
              <div className="absolute inset-0 flex items-end p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-sm font-medium drop-shadow-lg tracking-wide">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <AnimatedSection className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#EDD0D8] font-medium text-sm tracking-wider uppercase t-heading hover:g-primary hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer"
          >
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,77,0.06),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4 t-accent">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            What Our Clients <em className="gradient-text not-italic font-semibold">Say</em>
          </h2>
        </AnimatedSection>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-3xl p-7 border border-white/8 bg-white/4 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="text-6xl font-serif text-[#C96B8A]/10 leading-none absolute top-4 left-6 select-none">&ldquo;</div>
              <div className="flex gap-1 mb-4 relative z-10">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4789A] text-[#D4789A]" />
                ))}
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-5 relative z-10">{t.text}</p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full g-primary flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/35 text-xs tracking-wide">{t.role}</p>
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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="w-16 h-16 rounded-full g-primary flex items-center justify-center mx-auto mb-6 shadow-xl"
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-5" style={{ fontFamily: "var(--font-heading)" }}>
              Ready for Your <em className="gradient-text not-italic font-semibold">Glow-Up?</em>
            </h2>
            <p className="text-white/40 mb-10 max-w-lg mx-auto leading-relaxed">
              Book your appointment today and let our expert team craft your perfect look.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/booking" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#2A1520] font-semibold text-sm tracking-widest uppercase hover:shadow-xl transition-shadow cursor-pointer">
                  Book Appointment <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-medium text-sm tracking-wider hover:bg-white/8 hover:text-white transition-all cursor-pointer">
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
