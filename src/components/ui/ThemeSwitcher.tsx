"use client";

import { useState, useEffect } from "react";
import { Palette, X } from "lucide-react";

const themes = [
  { id: "noir-gold",  label: "Black & Gold",  dot: "#C96B8A" },
  { id: "rose",       label: "Blush Rose",    dot: "#C96B8A" },
  { id: "sage",       label: "Sage Green",    dot: "#5F8A6B" },
  { id: "terracotta", label: "Terracotta",    dot: "#B5705A" },
  { id: "lavender",   label: "Lavender",      dot: "#8B72AA" },
  { id: "sky",        label: "Sky Blue",      dot: "#4A8CC4" },
  { id: "peach",      label: "Peach",         dot: "#E07A5A" },
  { id: "champagne",  label: "Champagne",     dot: "#C4A882" },
  { id: "teal",       label: "Deep Teal",     dot: "#3A8A8A" },
];

export default function ThemeSwitcher() {
  const [open, setOpen]     = useState(false);
  const [current, setCurrent] = useState("noir-gold");

  useEffect(() => {
    const saved = localStorage.getItem("gs-theme") || "noir-gold";
    setCurrent(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const apply = (id: string) => {
    setCurrent(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem("gs-theme", id);
    setOpen(false);
  };

  const active = themes.find(t => t.id === current)!;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-2">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-52">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">Color Theme</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="py-2">
            {themes.map(t => (
              <button key={t.id} onClick={() => apply(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer hover:bg-gray-50 ${current === t.id ? "bg-gray-50" : ""}`}>
                <span className="w-5 h-5 rounded-full shrink-0 shadow-sm ring-2 ring-white" style={{ background: t.dot }} />
                <span className={`text-sm ${current === t.id ? "font-semibold text-gray-800" : "text-gray-500"}`}>{t.label}</span>
                {current === t.id && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: t.dot }} />}
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} title="Change color theme"
        className="w-12 h-12 rounded-full shadow-xl ring-4 ring-white cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{ background: active?.dot || "#C96B8A" }}>
        <Palette className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
