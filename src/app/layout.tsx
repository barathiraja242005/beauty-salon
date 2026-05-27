import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glamour Studio | Luxury Beauty Salon & Spa",
  description: "Premium beauty salon and spa services. Book appointments for hair, skin, nails, and body treatments.",
  keywords: "beauty salon, spa, hair salon, skin care, nail care, luxury beauty parlour",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased site-bg">
        {children}
      </body>
    </html>
  );
}
