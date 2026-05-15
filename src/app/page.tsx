"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Star,
  Award,
  Medal,
  ArrowRight,
  Calendar,
  Users,
  Info,
  Mail,
  Zap,
  Globe,
  Code2,
} from "lucide-react";

// ─── PRELOADER ───────────────────────────────────────────────────────────────
function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f1e]"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Animated glow ring */}
      <motion.div
        className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,85,162,0.35) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG Logo line-draw animation */}
      <svg
        viewBox="0 0 200 200"
        className="w-32 h-32 sm:w-44 sm:h-44 relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="95"
          stroke="#0055A2"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {/* Inner circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="78"
          stroke="#00BFFF"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />
        {/* Lambda shape */}
        <motion.path
          d="M72 140 L90 90 L108 120 M90 90 L115 60"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        />
        {/* Network dots */}
        {[
          { cx: 60, cy: 110, r: 3 },
          { cx: 48, cy: 88, r: 2.5 },
          { cx: 65, cy: 72, r: 2.5 },
          { cx: 80, cy: 95, r: 2 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="#00BFFF"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.0 + i * 0.1 }}
          />
        ))}
        {/* Network lines */}
        <motion.path
          d="M60 110 L48 88 L65 72 L80 95 L60 110"
          stroke="#00BFFF"
          strokeWidth="1"
          opacity="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
      </svg>

      {/* ACM Text */}
      <motion.div
        className="mt-6 text-center relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <p className="font-heading text-white text-2xl font-bold tracking-[0.3em]">ACM</p>
        <p className="text-[#00BFFF] text-sm tracking-[0.5em] mt-1 uppercase">
          SVNIT
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div className="absolute bottom-8 sm:bottom-12 w-36 sm:w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0055A2] to-[#00BFFF]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── AWARDS CAROUSEL DATA ──────────────────────────────────────────────────
const awards = [
  {
    icon: Trophy,
    title: "NIT SURAT",
    body: "Recognized nationally by ACM India for outstanding technical contributions and community impact.",
    color: "#FFD700",
    bg: "from-yellow-900/30 to-transparent",
  },
  {
    icon: Star,
    title: "Excellence in Innovation",
    body: "Top-ranked chapter in Gujarat for organizing 20+ workshops, hackathons, and coding competitions.",
    color: "#00BFFF",
    bg: "from-blue-900/30 to-transparent",
  },
  {
    icon: Award,
    title: "National Hackathon Champions",
    body: "Our members secured 1st place at Smart India Hackathon 2025 in the software category.",
    color: "#C0C0C0",
    bg: "from-slate-700/30 to-transparent",
  },
  {
    icon: Medal,
    title: "Community Leadership Award",
    body: "Awarded by SVNIT for highest student engagement and mentorship programs across all technical clubs.",
    color: "#CD7F32",
    bg: "from-orange-900/30 to-transparent",
  },
  {
    icon: Trophy,
    title: "Best Technical Club 2025",
    body: "Voted best technical club by SVNIT student body for three consecutive years running.",
    color: "#FFD700",
    bg: "from-yellow-900/30 to-transparent",
  },
];

// ─── AWARDS CAROUSEL ───────────────────────────────────────────────────────
function AwardsCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = awards.length;

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActive((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => paginate(1), 4000);
    return () => clearInterval(id);
  }, [paginate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const award = awards[active];
  const Icon = award.icon;

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl min-h-[240px] sm:min-h-[280px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-br ${award.bg} border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center text-center justify-center`}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mb-5 p-4 rounded-full"
              style={{ background: `${award.color}20` }}
            >
              <Icon size={42} style={{ color: award.color }} />
            </motion.div>
            <h3 className="font-heading text-white text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
              {award.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed">
              {award.body}
            </p>
          </motion.div>
        </AnimatePresence>
        {/* Invisible spacer to hold height */}
        <div className="invisible p-6 sm:p-8 md:p-10">
          <div className="mb-5 p-4">
            <div className="w-[42px] h-[42px]" />
          </div>
          <h3 className="text-2xl font-bold mb-3">placeholder</h3>
          <p className="text-base max-w-md">placeholder body text here for height</p>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-5 bg-white/10 hover:bg-[#0055A2] text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200 z-10"
        aria-label="Previous award"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-5 bg-white/10 hover:bg-[#0055A2] text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200 z-10"
        aria-label="Next award"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {awards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > active ? 1 : -1);
              setActive(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${i === active
              ? "w-8 bg-[#0055A2]"
              : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            aria-label={`Go to award ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── STAT COUNTER ──────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center p-5 sm:p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0055A2]/60 transition-all duration-300 hover:bg-[#0055A2]/10 group"
    >
      <div className="mb-4 p-3 rounded-full bg-[#0055A2]/20 group-hover:bg-[#0055A2]/40 transition-colors duration-300">
        <Icon className="text-[#00BFFF]" size={28} />
      </div>
      <span className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight">
        {value}
      </span>
      <span className="text-gray-400 mt-2 text-sm uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────
function FeatureCard({
  href,
  icon: Icon,
  title,
  desc,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={href}
        className="group block p-5 sm:p-6 md:p-8 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#0055A2] transition-all duration-300 text-center"
      >
        <div className="bg-[#0055A2]/10 p-4 rounded-full w-fit mx-auto mb-5 group-hover:scale-110 group-hover:bg-[#0055A2]/30 transition-all duration-300">
          <Icon className="text-[#00BFFF]" size={32} />
        </div>
        <h3 className="font-heading text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        <div className="mt-5 flex items-center justify-center gap-1 text-[#00BFFF] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Explore <ArrowRight size={14} />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-[#0d1117] text-white">
      {/* Preloader */}
      <AnimatePresence>{!loaded && <Preloader onComplete={() => setLoaded(true)} />}</AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center -mt-20 overflow-hidden">
        {/* Video background — PASTE YOUR CLOUDINARY URL BELOW */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-[4px] scale-105"
          src="https://res.cloudinary.com/dgjlnl7sh/video/upload/v1778836822/hero-bg_o3deka.mp4"
        />

        {/* Uniform dark overlay for text readability (no blue gradient) */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,85,162,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,85,162,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20"
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 backdrop-blur-sm"
          >
            <Trophy size={14} className="text-yellow-400" />
            <span className="text-yellow-300 text-sm font-semibold tracking-wide">
              NIT SURAT PRESENTS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-4"
          >
            <span className="text-white">ACM </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #0055A2 0%, #00BFFF 50%, #0055A2 100%)",
                backgroundSize: "200% 200%",
              }}
            >
              SVNIT
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-gray-300 text-base md:text-lg tracking-[0.4em] uppercase mb-6 font-light"
          >
            Student Chapter
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Advancing Computing as a Science &amp; Profession through
            innovation, collaboration, and excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white text-white font-semibold transition-all duration-300 hover:bg-white hover:text-[#0d1117] backdrop-blur-sm"
              >
                Learn More <Info size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #0055A2, #0077cc)",
                  boxShadow: "0 0 24px rgba(0,85,162,0.5)",
                }}
              >
                View Events <Calendar size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/50" />
          <span className="text-white/40 text-xs tracking-widest uppercase">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-[#0d1117]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <StatCard value="500+" label="Members" icon={Users} />
          <StatCard value="50+" label="Events Hosted" icon={Calendar} />
          <StatCard value="20+" label="Awards Won" icon={Trophy} />
          <StatCard value="10+" label="Years Active" icon={Globe} />
        </div>
      </section>

      {/* ── AWARDS CAROUSEL ── */}
      <section className="py-16 md:py-24 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-10 md:mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-[#00BFFF] text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Recognition
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-white"
            >
              Awards &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">
                Achievements
              </span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-[#0055A2] to-[#00BFFF] rounded-full mx-auto mt-5"
            />
          </div>

          <AwardsCarousel />
        </div>
      </section>

      {/* ── EXPLORE CHAPTER ── */}
      <section className="py-16 md:py-24 px-4 bg-[#0d1117]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-[#00BFFF] text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Explore
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-white"
            >
              Everything{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">
                We Offer
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              href="/events"
              icon={Calendar}
              title="Events"
              desc="Join hackathons, workshops, and coding competitions organized throughout the year."
              delay={0}
            />
            <FeatureCard
              href="/team"
              icon={Users}
              title="Our Team"
              desc="Meet the passionate executive committee driving innovation at SVNIT."
              delay={0.1}
            />
            <FeatureCard
              href="/about"
              icon={Info}
              title="About Us"
              desc="Learn about our history, vision, and core values as an ACM chapter."
              delay={0.2}
            />
            <FeatureCard
              href="/contact"
              icon={Mail}
              title="Contact"
              desc="Reach out for collaborations, sponsorships, or general enquiries."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── MISSION BANNER ── */}
      <section className="py-16 md:py-24 px-4 bg-[#111111] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] md:w-[600px] md:h-[300px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #0055A2 0%, transparent 70%)" }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-center gap-6 mb-10 text-[#00BFFF]/60">
              <Zap size={20} />
              <Code2 size={20} />
              <Globe size={20} />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
              Aspire. Commit.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">
                Manifest.
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto">
              We are the Association for Computing Machinery student chapter at
              NIT Surat — building the next generation of computing
              professionals, one line of code at a time.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 md:px-10 md:py-4 rounded-full text-white font-bold text-base md:text-lg transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #0055A2, #0099dd)",
                  boxShadow: "0 0 32px rgba(0,85,162,0.45)",
                }}
              >
                Discover Our Mission <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}