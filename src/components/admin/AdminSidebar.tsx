"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, CalendarCheck, Scissors, ImageIcon, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/bookings", icon: CalendarCheck, label: "Bookings" },
  { href: "/admin/services", icon: Scissors, label: "Services" },
  { href: "/admin/gallery", icon: ImageIcon, label: "Gallery" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-16 md:w-56 bg-pink-950 flex flex-col min-h-screen shrink-0">
      <div className="p-4 md:p-5 border-b border-pink-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-violet-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span
            className="hidden md:block text-sm font-bold text-white truncate"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Glamour Studio
          </span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer ${
                active
                  ? "bg-pink-800 text-white"
                  : "text-pink-300 hover:bg-pink-900 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="hidden md:block text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-pink-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-pink-300 hover:bg-pink-900 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden md:block text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
