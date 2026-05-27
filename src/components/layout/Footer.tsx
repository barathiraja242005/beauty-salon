import Link from "next/link";
import { Gem, Phone, Mail, MapPin, Share2, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden g-dark pt-16 pb-8">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10 g-blob-1" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-8 g-blob-2" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl g-primary flex items-center justify-center shadow-lg">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                Glamour Studio
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Your sanctuary for beauty and wellness. Premium services tailored to
              make you look and feel extraordinary.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Social" className="w-10 h-10 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center hover:bg-white/12 hover:border-[#C96B8A]/30 transition-all cursor-pointer">
                <Share2 className="w-4 h-4 text-white/50" />
              </a>
              <a href="#" aria-label="Website" className="w-10 h-10 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center hover:bg-white/12 hover:border-[#C96B8A]/30 transition-all cursor-pointer">
                <Globe className="w-4 h-4 text-white/50" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white/50 font-medium mb-5 text-xs tracking-[0.25em] uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/services", label: "Our Services" },
                { href: "/gallery",  label: "Gallery" },
                { href: "/booking",  label: "Book Appointment" },
                { href: "/contact",  label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-white/40 text-sm hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C96B8A]/40 group-hover:w-2 group-hover:bg-[#D4789A] transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/50 font-medium mb-5 text-xs tracking-[0.25em] uppercase">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#C96B8A]/50" />
                <span>123 Beauty Lane, Chennai, Tamil Nadu 600001</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-[#C96B8A]/50" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors cursor-pointer">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-[#C96B8A]/50" />
                <a href="mailto:hello@glamourstudio.in" className="hover:text-white transition-colors cursor-pointer">hello@glamourstudio.in</a>
              </li>
            </ul>
            <div className="mt-5 p-4 rounded-2xl bg-white/4 border border-white/8">
              <p className="text-[10px] text-[#D4789A]/60 mb-1 font-medium uppercase tracking-[0.2em]">Hours</p>
              <p className="text-white text-sm font-medium">Mon – Sat: 9 AM – 8 PM</p>
              <p className="text-white/35 text-xs">Sunday: 10 AM – 6 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} Glamour Studio. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4789A] animate-pulse" />
            <p className="text-xs text-white/25">Open today · 9 AM – 8 PM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
