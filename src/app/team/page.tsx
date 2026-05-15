"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  motion,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { Mail, Users, User } from "lucide-react";
import HeroBanner from "@/components/ui/HeroBanner";

// ─── Brand SVG icons (lucide-react v1 dropped brand icons) ────────────────────
function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Conditionally rendered social icon link. */
function SocialLink({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-9 h-9 rounded-full flex items-center justify-center
        border border-gray-700/60 text-gray-500
        hover:border-[#0055A2] hover:text-[#00BFFF] hover:bg-[#0055A2]/15
        hover:scale-110 active:scale-95
        transition-all duration-300
      "
    >
      {children}
    </a>
  );
}

/** Circular profile card with hover glow. */
function MemberCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !member.imageUrl || imgError;

  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col items-center text-center px-4 py-8"
    >
      {/* ── Circular Avatar ── */}
      <div className="relative mb-5">
        {/* Glow ring on hover */}
        <div
          className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100
                     transition-opacity duration-500 blur-md pointer-events-none"
          style={{
            background:
              "conic-gradient(from 180deg, #0055A2, #00BFFF, #0055A2)",
          }}
        />

        {/* Image container */}
        <motion.div
          className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-800
                     group-hover:border-[#0055A2] transition-colors duration-400 bg-[#1a1a1a]"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {showFallback ? (
            /* Fallback avatar when image is missing or broken */
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0055A2]/20 to-[#111111]">
              <User size={56} className="text-gray-600" strokeWidth={1.5} />
            </div>
          ) : (
            <img
              src={member.imageUrl}
              alt={`Photo of ${member.name}`}
              className="w-full h-full object-cover object-top"
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>
      </div>

      {/* ── Name & Role ── */}
      <h3 className="font-heading text-lg font-bold text-white leading-snug tracking-tight">
        {member.name}
      </h3>
      <p className="text-[#00BFFF] text-sm font-medium mt-1 mb-4">
        {member.role}
      </p>

      {/* ── Conditional Social Links ── */}
      <div className="flex items-center justify-center gap-2.5 min-h-[36px]">
        <SocialLink
          href={member.linkedinUrl}
          label={`${member.name} on LinkedIn`}
        >
          <LinkedinIcon size={15} />
        </SocialLink>

        <SocialLink
          href={member.githubUrl}
          label={`${member.name} on GitHub`}
        >
          <GithubIcon size={15} />
        </SocialLink>
      </div>
    </motion.div>
  );
}

/** Skeleton placeholder while data loads. */
function SkeletonCard() {
  return (
    <div className="flex flex-col items-center text-center px-4 py-8 animate-pulse">
      {/* Circle skeleton */}
      <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gray-800/60 mb-5" />
      {/* Name skeleton */}
      <div className="h-5 w-32 rounded-full bg-gray-800/60 mb-2" />
      {/* Role skeleton */}
      <div className="h-4 w-24 rounded-full bg-gray-800/40 mb-4" />
      {/* Social icons skeleton */}
      <div className="flex gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gray-800/40" />
        <div className="w-9 h-9 rounded-full bg-gray-800/40" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);



  // ── Fetch team from Firebase ──
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team"));
        const fetched: TeamMember[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TeamMember[];
        setTeam(fetched);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">

      {/* ══════════════════════════════════════════════════════════════════════
           1. CINEMATIC HEADER (Shared HeroBanner — change bg in HeroBanner.tsx)
         ══════════════════════════════════════════════════════════════════════ */}
      <HeroBanner
        pillLabel="Executive Committee"
        pillIcon={<Users size={12} />}
        titleStart="Meet the"
        titleHighlight="Minds"
        titleEnd="Behind ACM SVNIT"
        subtitle="A passionate team of students driving innovation, learning, and technical excellence at SVNIT's premier computing chapter."
        breadcrumb={["ACM SVNIT", "Executive Committee"]}
      />

      {/* ══════════════════════════════════════════════════════════════════════
           2. TEAM GRID — CIRCULAR PROFILES
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-16 md:pb-28 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            /* ── Loading Skeleton Grid ── */
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 sm:gap-x-4"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : team.length === 0 ? (
            /* ── Empty State ── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-full bg-[#111111] border border-gray-800 flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-gray-600" />
              </div>
              <p className="text-gray-500 text-lg">
                No team members found yet.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Add team members from the Admin panel to see them here.
              </p>
            </motion.div>
          ) : (
            /* ── Staggered Member Grid ── */
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 sm:gap-x-4"
            >
              {team.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        {!loading && team.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center text-gray-600 text-sm mt-16"
          >
            Interested in joining?{" "}
            <a
              href="/contact"
              className="text-[#00BFFF] hover:text-white transition-colors duration-200 underline underline-offset-4"
            >
              Get in touch with us.
            </a>
          </motion.p>
        )}
      </section>
    </div>
  );
}