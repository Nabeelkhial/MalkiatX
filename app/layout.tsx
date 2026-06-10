import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces" });
const notoUrdu = Noto_Nastaliq_Urdu({ subsets: ["arabic"], variable: "--font-noto-urdu" });

export const metadata: Metadata = {
  title: {
    default: "MalkiatX — Halal wealth, built on real assets",
    template: "%s | MalkiatX",
  },
  description:
    "Shariah-compliant fractional ownership of property, gold, sukuk and screened equities for Pakistan. Start with PKR 5,000, pay with JazzCash or Easypaisa, and let Auto-Pilot grow your wealth.",
};

export const viewport: Viewport = {
  themeColor: "#062019",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${fraunces.variable} ${notoUrdu.variable} bg-cream font-sans text-ink antialiased`}
      >
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
