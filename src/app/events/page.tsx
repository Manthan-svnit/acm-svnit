"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, MapPin, ChevronRight, ChevronLeft,
  Sparkles, Trophy, Users, Zap, Rocket, ArrowRight,
} from "lucide-react";
import HeroBanner from "@/components/ui/HeroBanner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ACMEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrls?: string[];
  imageUrl?: string;
  status?: string;
  isUpcoming?: boolean;
}

type EventStatus = "ongoing" | "upcoming" | "past";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function resolveStatus(event: ACMEvent): EventStatus {
  if (event.status === "ongoing" || event.status === "upcoming" || event.status === "past") {
    return event.status;
  }
  return event.isUpcoming ? "upcoming" : "past";
}

function getImageUrls(event: ACMEvent): string[] {
  if (event.imageUrls && event.imageUrls.length > 0) return event.imageUrls;
  if (event.imageUrl) return [event.imageUrl];
  return [];
}

// ─── Stats Data ───────────────────────────────────────────────────────────────
const STATS = [
  { icon: Trophy, value: "100+", label: "Events Hosted", color: "#FFD700" },
  { icon: Users, value: "1000+", label: "Participants", color: "#00BFFF" },
  { icon: Zap, value: "20+", label: "Hackathons", color: "#A855F7" },
];

// ─── Section Config ───────────────────────────────────────────────────────────
const SECTION_META: Record<EventStatus, { title: string; accent: string; badge: string; icon: React.ElementType }> = {
  ongoing: {
    title: "Happening Now",
    accent: "#22C55E",
    badge: "LIVE",
    icon: Sparkles,
  },
  upcoming: {
    title: "Upcoming Events",
    accent: "#00BFFF",
    badge: "UPCOMING",
    icon: Rocket,
  },
  past: {
    title: "Past Events",
    accent: "#6B7280",
    badge: "COMPLETED",
    icon: Trophy,
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Cinematic full-width image carousel. */
function CinematicCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const hasMultiple = images.length > 1;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[420px] overflow-hidden bg-[#0d0d0d]">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} — image ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 50%), linear-gradient(to top, rgba(17,17,17,0.5) 0%, transparent 30%)",
        }}
      />

      {/* Carousel controls */}
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md
                       border border-white/10 flex items-center justify-center text-white/60 hover:text-white
                       hover:bg-black/60 hover:border-white/20 transition-all duration-300 z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md
                       border border-white/10 flex items-center justify-center text-white/60 hover:text-white
                       hover:bg-black/60 hover:border-white/20 transition-all duration-300 z-10"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dot indicators — bottom-center */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-400 ${
                  i === current
                    ? "bg-[#00BFFF] w-7"
                    : "bg-white/25 w-2 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Image counter */}
          <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm
                         text-white/60 text-xs font-medium tracking-wide">
            {current + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

/** Immersive horizontal event showcase block. */
function EventShowcase({ event, status, isReversed }: { event: ACMEvent; status: EventStatus; isReversed: boolean }) {
  const images = getImageUrls(event);
  const meta = SECTION_META[status];
  const hasImages = images.length > 0;
  const isActive = status === "ongoing" || status === "upcoming";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl bg-[#111111] border border-gray-800 overflow-hidden
                 hover:border-[#0055A2]/50 transition-all duration-500"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${isReversed ? "100%" : "0%"} 50%, rgba(0,85,162,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Split layout: Image (60%) + Details (40%) */}
      <div className={`relative flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>

        {/* ── Carousel Side ── */}
        <div className="lg:w-[60%] relative">
          {hasImages ? (
            <CinematicCarousel images={images} title={event.title} />
          ) : (
            <div className="w-full h-full min-h-[280px] md:min-h-[420px] bg-gradient-to-br from-[#0055A2]/8 to-[#111111] flex items-center justify-center">
              <Calendar size={64} className="text-gray-800" strokeWidth={1} />
            </div>
          )}
        </div>

        {/* ── Details Side ── */}
        <div className="lg:w-[40%] p-8 md:p-10 flex flex-col justify-center relative z-10">

          {/* Status badge */}
          <div className="mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border"
              style={{
                background: `${meta.accent}12`,
                borderColor: `${meta.accent}30`,
                color: meta.accent,
              }}
            >
              {status === "ongoing" && (
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: meta.accent }}
                />
              )}
              {meta.badge}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-2xl md:text-3xl font-black text-white leading-tight mb-5
                         group-hover:text-[#00BFFF] transition-colors duration-400">
            {event.title}
          </h3>

          {/* Meta details */}
          <div className="space-y-2.5 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-[#0055A2]/10 flex items-center justify-center flex-shrink-0">
                <Calendar size={14} className="text-[#0055A2]" />
              </div>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-[#0055A2]/10 flex items-center justify-center flex-shrink-0">
                <Clock size={14} className="text-[#0055A2]" />
              </div>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-[#0055A2]/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="text-[#0055A2]" />
              </div>
              <span>{event.location}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#0055A2]/40 via-[#0055A2]/10 to-transparent mb-5" />

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-7 line-clamp-4">
            {event.description}
          </p>

          {/* CTA Button */}
          <button
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-sm tracking-wide
                       transition-all duration-300 group/btn w-full sm:w-auto"
            style={{
              background: isActive
                ? "linear-gradient(135deg, #0055A2 0%, #003d75 100%)"
                : "transparent",
              color: isActive ? "#ffffff" : "#6B7280",
              border: isActive ? "1px solid rgba(0,85,162,0.5)" : "1px solid #2a2a2a",
            }}
          >
            {isActive ? (
              <>RSVP Now <ArrowRight size={15} className="group-hover/btn:translate-x-0.5 transition-transform" /></>
            ) : (
              <>View Recap <ArrowRight size={15} className="group-hover/btn:translate-x-0.5 transition-transform" /></>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/** Section header for each event group. */
function EventSectionHeader({ status }: { status: EventStatus }) {
  const meta = SECTION_META[status];
  const Icon = meta.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-10"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${meta.accent}15` }}
      >
        <Icon size={20} style={{ color: meta.accent }} />
      </div>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
        {meta.title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent ml-3" />
    </motion.div>
  );
}

/** Skeleton loading placeholder (wide format). */
function SkeletonShowcase() {
  return (
    <div className="rounded-2xl bg-[#111111] border border-gray-800 overflow-hidden animate-pulse">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[60%] min-h-[280px] md:min-h-[420px] bg-gray-800/40" />
        <div className="lg:w-[40%] p-8 md:p-10 space-y-4">
          <div className="h-6 w-24 bg-gray-800/50 rounded-full" />
          <div className="h-8 w-3/4 bg-gray-800/60 rounded-lg" />
          <div className="space-y-3 mt-4">
            <div className="h-4 w-1/2 bg-gray-800/40 rounded-full" />
            <div className="h-4 w-2/5 bg-gray-800/40 rounded-full" />
            <div className="h-4 w-1/3 bg-gray-800/40 rounded-full" />
          </div>
          <div className="h-px bg-gray-800/40 my-4" />
          <div className="h-4 w-full bg-gray-800/30 rounded-full" />
          <div className="h-4 w-5/6 bg-gray-800/30 rounded-full" />
          <div className="h-12 w-40 bg-gray-800/40 rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const [events, setEvents] = useState<ACMEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetched: ACMEvent[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ACMEvent[];
        setEvents(fetched);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Group events by status
  const grouped: Record<EventStatus, ACMEvent[]> = { ongoing: [], upcoming: [], past: [] };
  events.forEach((event) => {
    const status = resolveStatus(event);
    grouped[status].push(event);
  });

  const sectionOrder: EventStatus[] = ["ongoing", "upcoming", "past"];
  const hasAnyEvents = events.length > 0;

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">

      {/* ══════════════════════════════════════════════════════════════════════
           1. CINEMATIC HERO (Shared HeroBanner — change bg in HeroBanner.tsx)
         ══════════════════════════════════════════════════════════════════════ */}
      <HeroBanner
        pillLabel="Chapter Events"
        pillIcon={<Calendar size={12} />}
        titleStart="Chapter"
        titleHighlight="Events"
        subtitle="Discover our hackathons, technical workshops, and speaker sessions that power SVNIT's computing community."
      />

      {/* ══════════════════════════════════════════════════════════════════════
           2. ACHIEVEMENT STATS
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[#00BFFF] text-sm font-semibold tracking-[0.3em] uppercase mb-2">Our Impact</p>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-white">
            Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">Milestones</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STATS.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-7 rounded-2xl bg-[#111111] border border-gray-800
                         hover:border-[#0055A2]/50 transition-all duration-300 text-center overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${color}10 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <p className="font-heading text-4xl font-black text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                  {value}
                </p>
                <p className="text-gray-500 text-sm uppercase tracking-widest">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
           3. EVENT SHOWCASE SECTIONS (Ongoing → Upcoming → Past)
              Stacked vertically — each event is a wide, immersive block
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-6xl mx-auto">
        {loading ? (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonShowcase key={i} />
            ))}
          </div>
        ) : !hasAnyEvents ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-full bg-[#111111] border border-gray-800 flex items-center justify-center mx-auto mb-6">
              <Calendar size={32} className="text-gray-600" />
            </div>
            <p className="text-gray-500 text-lg font-heading font-bold">No events found yet.</p>
            <p className="text-gray-600 text-sm mt-2">Add events from the Admin panel to see them here.</p>
          </motion.div>
        ) : (
          sectionOrder.map((status) => {
            const sectionEvents = grouped[status];
            if (status === "past" && sectionEvents.length === 0) return null;
            if (status === "ongoing" && sectionEvents.length === 0) return null;

            return (
              <div key={status} className="mb-20 last:mb-0">
                <EventSectionHeader status={status} />

                {sectionEvents.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative p-12 rounded-2xl bg-[#111111] border border-dashed border-gray-700 text-center"
                  >
                    <Rocket size={40} className="text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-400 font-heading font-bold text-lg mb-1">
                      We&apos;re brewing something awesome.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Stay tuned — exciting events are on the way!
                    </p>
                  </motion.div>
                ) : (
                  /* ── Vertically stacked showcase blocks — alternating layout ── */
                  <div className="space-y-8">
                    {sectionEvents.map((event, i) => (
                      <EventShowcase
                        key={event.id}
                        event={event}
                        status={status}
                        isReversed={i % 2 !== 0}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Bottom CTA */}
        {!loading && hasAnyEvents && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center text-gray-600 text-sm mt-20"
          >
            Want to organize an event with us?{" "}
            <a
              href="/contact"
              className="text-[#00BFFF] hover:text-white transition-colors duration-200 underline underline-offset-4"
            >
              Let&apos;s collaborate.
            </a>
          </motion.p>
        )}
      </section>
    </div>
  );
}