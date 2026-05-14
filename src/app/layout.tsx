import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import your new layout components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-acm-bg-dark`}>
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