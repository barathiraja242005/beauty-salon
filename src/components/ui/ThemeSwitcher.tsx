"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, X } from "lucide-react";
import { useTheme, themes, ThemeId } from "./ThemeProvider";

const themeLabels: Record<ThemeId, string> = {
  champagne: "Champagne & Rose Gold",
  slate:     "Slate & Blush",
  sage:      "Sage & Ivory",
  plum:      "Plum & Gold",
};

const themeDesc: Record<ThemeId, string> = {
  champagne: "Warm luxury, terracotta & gold",
  slate:     "Clean professional, grey & blush",
  sage:      "Natural spa, forest & sand",
  plum:      "Rich royal, deep purple & gold",
};

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-3 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 w-64"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Choose Theme</span>
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Theme list */}
            <div className="space-y-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 text-left ${
                    theme === t.id ? "bg-gray-50 ring-2" : "hover:bg-gray-50"
                  }`}
                  style={theme === t.id ? { outline: `2px solid ${t.from}`, outlineOffset: "2px" } : {}}
                >
                  {/* Swatch */}
                  <div
                    className="w-9 h-9 rounded-xl shrink-0 shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
                  >
                    {theme === t.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{themeLabels[t.id]}</p>
                    <p className="text-xs text-gray-400 truncate">{themeDesc[t.id]}</p>
                  </div>
                  {/* Accent dot */}
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: t.accent }} />
                </button>
              ))}
            </div>

            <p className="text-center text-[10px] text-gray-300 mt-3">
              Selection is saved automatically
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(!open)}
        className="w-13 h-13 rounded-2xl g-primary text-white shadow-xl flex items-center justify-center cursor-pointer"
        style={{ width: 52, height: 52 }}
        title="Switch theme"
      >
        <Palette className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
