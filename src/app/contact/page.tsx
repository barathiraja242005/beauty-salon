"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/ui/AnimatedSection";

const contactCards = [
  { icon: Phone,  title: "Call Us",   lines: ["+91 98765 43210", "+91 87654 32109"], action: "tel:+919876543210",              gradient: "from-rose-500 to-yellow-600" },
  { icon: Mail,   title: "Email Us",  lines: ["hello@glamourstudio.in"],             action: "mailto:hello@glamourstudio.in", gradient: "from-[#3D2030] to-[#2A1520]" },
  { icon: MapPin, title: "Visit Us",  lines: ["123 Beauty Lane", "Chennai, TN 600001"],                                       gradient: "from-rose-600 to-rose-800" },
  { icon: Clock,  title: "Hours",     lines: ["Mon–Sat: 9 AM – 8 PM", "Sunday: 10 AM – 6 PM"],                                gradient: "from-[#3D2030] to-rose-700" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const inputCls = "w-full px-4 py-3.5 rounded-2xl border border-[#EDD0D8] bg-white text-[#2A1520] text-sm focus:outline-none focus:ring-2 focus:ring-[#C96B8A]/40 focus:border-[#C96B8A] transition-all placeholder:text-[#A89098]";

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {/* Parallax Hero */}
        <section ref={heroRef} className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: bgY }} className="absolute inset-0 g-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.08),transparent_70%)]" />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute top-12 right-24 w-48 h-48 rounded-full g-blob-1 blur-3xl"
          />
          <motion.div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDF5F8] to-transparent" />
          <div className="relative z-10 text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#D4789A] text-xs font-medium tracking-[0.3em] uppercase mb-4"
            >
              We&apos;d Love to Hear From You
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-6xl font-light text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get In <em className="gradient-text not-italic font-semibold">Touch</em>
            </motion.h1>
          </div>
        </section>

        {/* Contact cards */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {contactCards.map((card) => (
              <motion.div key={card.title} variants={fadeUp}>
                <div className="group p-6 rounded-3xl bg-white border border-[#EDD0D8] hover:shadow-xl hover:shadow-pink-50/40 hover:border-transparent transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#2A1520] mb-2 tracking-wide">{card.title}</h3>
                  {card.lines.map((line, i) =>
                    card.action ? (
                      <a key={i} href={card.action} className="block text-sm text-[#7A5A66] hover:text-[#A84E6E] transition-colors cursor-pointer">{line}</a>
                    ) : (
                      <p key={i} className="text-sm text-[#7A5A66]">{line}</p>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative overflow-hidden rounded-3xl h-80 bg-gradient-to-br from-pink-50 to-rose-50 border border-[#EDD0D8] flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full g-primary flex items-center justify-center mx-auto mb-3 shadow-xl">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-[#2A1520] font-semibold text-lg" style={{ fontFamily: "var(--font-heading)" }}>Glamour Studio</p>
                  <p className="text-[#7A5A66] text-sm mt-1">123 Beauty Lane, Chennai</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 px-4 py-2 rounded-full g-primary text-white text-xs font-semibold tracking-wider cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    Get Directions
                  </a>
                </motion.div>
                {/* Pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5 + i * 0.3, 1], opacity: [0.2, 0, 0.2] }}
                      transition={{ repeat: Infinity, duration: 3, delay: i * 0.8 }}
                      className="absolute w-16 h-16 rounded-full border border-[#C96B8A]"
                    />
                  ))}
                </div>
              </div>

              {/* Hours card */}
              <div className="mt-4 p-6 rounded-3xl g-dark text-white">
                <h3 className="text-base font-semibold mb-3 tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>Working Hours</h3>
                <div className="space-y-2">
                  {[
                    { day: "Monday – Friday", hours: "9:00 AM – 8:00 PM" },
                    { day: "Saturday",        hours: "9:00 AM – 8:00 PM" },
                    { day: "Sunday",          hours: "10:00 AM – 6:00 PM" },
                  ].map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-sm">
                      <span className="text-white/50">{h.day}</span>
                      <span className="text-[#D4789A] font-medium">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-pink-50/30 border border-[#EDD0D8]"
            >
              <h2 className="text-2xl font-light text-[#2A1520] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Send a <em className="gradient-text not-italic font-semibold">Message</em>
              </h2>

              {status === "success" ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-300/30">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-[#2A1520] font-semibold text-lg">Message sent!</p>
                  <p className="text-[#7A5A66] text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-[#4A3040] mb-1.5 tracking-wider uppercase">Name <span className="text-[#C96B8A]">*</span></label>
                    <input type="text" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A3040] mb-1.5 tracking-wider uppercase">Phone <span className="text-[#C96B8A]">*</span></label>
                    <input type="tel" required value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A3040] mb-1.5 tracking-wider uppercase">Message <span className="text-[#C96B8A]">*</span></label>
                    <textarea rows={5} required value={form.message} onChange={set("message")} placeholder="How can we help you?" className={inputCls + " resize-none"} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-2xl g-primary text-white font-semibold text-sm tracking-widest uppercase shadow-xl disabled:opacity-60 transition-opacity duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
