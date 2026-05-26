"use client";

import { useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, Loader2, Sparkles } from "lucide-react";

const serviceList = [
  "Haircut & Styling", "Hair Color", "Keratin Treatment", "Hair Spa",
  "Classic Facial", "Gold Facial", "Clean-Up", "Bridal Makeup",
  "Manicure", "Pedicure", "Gel Nails", "Nail Art",
  "Full Body Massage", "Body Scrub", "Aromatherapy",
  "Full Arms Waxing", "Full Legs Waxing", "Full Body Waxing",
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM",
];

const perks = [
  { icon: CheckCircle, text: "Instant confirmation via phone" },
  { icon: Clock, text: "Flexible rescheduling" },
  { icon: Sparkles, text: "Premium experience guaranteed" },
];

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all placeholder:text-gray-400";
const inputWithIcon = "pl-11 " + inputCls;

function BookingForm() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    service: params.get("service") ?? "",
    date: "", time: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-14 px-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: 2, duration: 0.5 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-300/30"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-pink-950 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Booking Confirmed!
        </h2>
        <p className="text-gray-500 mb-2">Thank you, <strong>{form.name}</strong>! We&apos;ve received your request.</p>
        <p className="text-gray-400 text-sm">We&apos;ll call you at {form.phone} to confirm your slot.</p>
        <button
          onClick={() => { setForm({ name:"",phone:"",email:"",service:"",date:"",time:"",notes:"" }); setStatus("idle"); }}
          className="mt-8 px-7 py-3.5 rounded-full bg-gradient-to-r g-primary text-white font-semibold cursor-pointer hover:shadow-lg hover:shadow-pink-300/30 transition-shadow duration-300"
        >
          Book Another Appointment
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" required>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" required value={form.name} onChange={set("name")} placeholder="Your full name" className={inputWithIcon} />
          </div>
        </Field>
        <Field label="Phone Number" required>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="tel" required value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={inputWithIcon} />
          </div>
        </Field>
      </div>

      <Field label="Email Address">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputWithIcon} />
        </div>
      </Field>

      <Field label="Select Service" required>
        <select required value={form.service} onChange={set("service")} className={inputCls + " cursor-pointer appearance-none"}>
          <option value="">Choose a service...</option>
          {serviceList.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Preferred Date" required>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="date" required value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} className={inputWithIcon + " cursor-pointer"} />
          </div>
        </Field>
        <Field label="Preferred Time" required>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select required value={form.time} onChange={set("time")} className={inputWithIcon + " cursor-pointer appearance-none"}>
              <option value="">Select time...</option>
              {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </Field>
      </div>

      <Field label="Special Requests">
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
          <textarea rows={3} value={form.notes} onChange={set("notes")} placeholder="Any allergies or special requests..." className={inputWithIcon + " resize-none"} />
        </div>
      </Field>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-2xl bg-gradient-to-r g-primary text-white font-semibold text-base shadow-xl shadow-pink-300/30 hover:shadow-pink-400/40 disabled:opacity-60 disabled:cursor-not-allowed transition-shadow duration-300 cursor-pointer flex items-center justify-center gap-2"
      >
        {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</> : "Confirm Appointment"}
      </motion.button>
    </form>
  );
}

export default function BookingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {/* Parallax Hero */}
        <section ref={heroRef} className="relative h-60 md:h-80 flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: bgY }} className="absolute inset-0 g-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.2),transparent_70%)]" />
          <motion.div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDF2F8] to-transparent" />
          <div className="relative z-10 text-center px-4">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Book Your <span className="gradient-text">Session</span>
            </motion.h1>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left perks */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-pink-950 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Why Book With Us?
                </h2>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  Reserve your spot with our premium stylists and experience beauty at its finest.
                </p>
                <div className="space-y-4 mb-10">
                  {perks.map((p) => (
                    <div key={p.text} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-pink-100 shadow-sm">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br g-primary flex items-center justify-center shrink-0">
                        <p.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{p.text}</span>
                    </div>
                  ))}
                </div>
                {/* Decorative card */}
                <div className="relative rounded-3xl overflow-hidden h-40 bg-gradient-to-br from-pink-400 to-violet-600 p-6 flex flex-col justify-end">
                  <div className="absolute top-4 right-4">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                      <Sparkles className="w-8 h-8 text-white/30" />
                    </motion.div>
                  </div>
                  <p className="text-white/70 text-xs uppercase tracking-wider">Walk-in also welcome</p>
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>Mon – Sun, 9 AM to 8 PM</p>
                </div>
              </motion.div>
            </div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-pink-100/60 border border-pink-100"
            >
              <h3 className="text-xl font-bold text-pink-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Appointment Details
              </h3>
              <Suspense fallback={<div className="py-10 text-center text-gray-400 text-sm">Loading form...</div>}>
                <BookingForm />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
