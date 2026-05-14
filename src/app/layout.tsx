import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── Heading / Display font ────────────────────────────────────────────────────
// Space Grotesk: geometric, modern, perfect for a futuristic tech chapter.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",   // prevents FOUC — shows fallback font until loaded
});

// ── Body font ─────────────────────────────────────────────────────────────────
// Plus Jakarta Sans: clean, warm, highly legible at all sizes.
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACM SVNIT | Student Chapter",
  description: "Advancing Computing as a Science & Profession at SVNIT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plusJakarta.variable} font-sans antialiased min-h-screen flex flex-col bg-acm-bg-dark`}>
        {/* 2. Drop the Navbar at the very top */}
        <Navbar />

        {/* 3. The <main> tag wraps the unique content of each page. 
            We add pt-20 (padding-top) so the content isn't hidden behind the fixed Navbar */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* 4. Drop the Footer at the bottom */}
        <Footer />
      </body>
    </html>
  );
}