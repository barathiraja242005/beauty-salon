import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Glamour Studio | Beauty Parlour, Salon & Spa",
  description: "Premium beauty salon and spa services. Book appointments for hair, skin, nails, and body treatments.",
  keywords: "beauty salon, spa, hair salon, skin care, nail care, beauty parlour",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`} data-theme="champagne">
      <body className="min-h-full flex flex-col antialiased site-bg">
        <ThemeProvider>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
