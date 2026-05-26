"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/",        label: "Home" },
  { href: "/services",label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/85 backdrop-blur-2xl shadow-md border-b" : "bg-transparent"
      }`}
      style={scrolled ? { borderColor: "var(--border)" } : {}}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-9 h-9 rounded-xl g-primary flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${scrolled ? "t-heading" : "text-white drop-shadow-sm"}`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Glamour Studio
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 cursor-pointer group ${
                  scrolled
                    ? pathname === link.href ? "t-heading" : "text-gray-500 hover:text-gray-900"
                    : pathname === link.href ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-0.5 rounded-full g-primary transition-all duration-300"
                  style={{ width: pathname === link.href ? "100%" : "0" }}
                />
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/booking"
                className="px-6 py-2.5 rounded-full g-primary text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity duration-200 cursor-pointer"
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer ${
              scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t rounded-b-2xl"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-3 rounded-xl text-sm font-medium transition-colors cursor-pointer text-gray-700 hover:bg-gray-50"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Link
                    href="/booking"
                    onClick={() => setIsOpen(false)}
                    className="block mt-2 py-3 rounded-full g-primary text-white text-sm font-semibold text-center cursor-pointer"
                  >
                    Book Appointment
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
