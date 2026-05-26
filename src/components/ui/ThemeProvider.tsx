"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeId = "champagne" | "slate" | "sage" | "plum";

export const themes: { id: ThemeId; name: string; from: string; to: string; accent: string }[] = [
  { id: "champagne", name: "Champagne",  from: "#C27A5A", to: "#A85C3A", accent: "#C9A96E" },
  { id: "slate",     name: "Slate",      from: "#4A5568", to: "#2D3748", accent: "#DA8A85" },
  { id: "sage",      name: "Sage",       from: "#5A7A5A", to: "#3D5A3D", accent: "#A89070" },
  { id: "plum",      name: "Plum",       from: "#7B4F8A", to: "#4E2E68", accent: "#C8A84B" },
];

interface ThemeCtx { theme: ThemeId; setTheme: (t: ThemeId) => void }
const Ctx = createContext<ThemeCtx>({ theme: "champagne", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("champagne");

  useEffect(() => {
    const saved = localStorage.getItem("gs-theme") as ThemeId | null;
    if (saved && themes.find((t) => t.id === saved)) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gs-theme", theme);
  }, [theme]);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
