"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════════
// SINGLE SOURCE OF TRUTH — change this path to update all pages at once.
// Place your image at: public/About-bg-image.jpg
// ══════════════════════════════════════════════════════════════════════════════
const HERO_BG_IMAGE = "/About-bg-image.jpg";

interface HeroBannerProps {
  /** Small pill label text (e.g. "Our Story", "Executive Committee") */
  pillLabel: string;
  /** Icon rendered inside the pill badge */
  pillIcon?: React.ReactNode;
  /** The title — everything before the highlighted word */
  titleStart: string;
  /** The gradient-highlighted word(s) in the title */
  titleHighlight: string;
  /** Optional text after the highlight (on a new line if desired) */
  titleEnd?: string;
  /** Subtitle paragraph below the title */
  subtitle: string;
  /** Optional breadcrumb segments — e.g. ["ACM SVNIT", "Executive Committee"] */
  breadcrumb?: string[];
}

export default function HeroBanner({
  pillLabel,
  pillIcon,
  titleStart,
  titleHighlight,
  titleEnd,
  subtitle,
  breadcrumb,
}: HeroBannerProps) {
  return (
    <section className="relative h-[65vh] min-h-[420px] flex items-center justify-center overflow-hidden">
      {/* ── Background image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_BG_IMAGE}')` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Blue radial glow accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,85,162,0.4) 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,191,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.6) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-4">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[#0055A2]/50 bg-[#0055A2]/10 text-[#00BFFF] text-xs font-semibold tracking-widest uppercase"
        >
          {pillIcon || <ChevronRight size={12} />}
          {pillLabel}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-5"
        >
          {titleStart}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">
            {titleHighlight}
          </span>
          {titleEnd && (
            <>
              <br className="hidden sm:block" />
              {" "}{titleEnd}
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-[#0055A2] to-[#00BFFF] origin-center mx-auto"
        />

        {/* Optional breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-600"
          >
            {breadcrumb.map((segment, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                <span className={i === breadcrumb.length - 1 ? "text-[#00BFFF]" : ""}>
                  {segment}
                </span>
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
