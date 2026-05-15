"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Target, Eye, BookOpen, Cpu, Users, TrendingUp,
    Trophy, Star, Quote, ChevronRight,
} from "lucide-react";
import HeroBanner from "@/components/ui/HeroBanner";

// ─── helpers ──────────────────────────────────────────────────────────────────
// FIX 1: Added ': any' so TypeScript doesn't complain about spreading this into Framer Motion
function fadeUp(delay = 0) {
    return {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <motion.p {...fadeUp()} className="text-[#00BFFF] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            {children}
        </motion.p>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <motion.h2 {...fadeUp(0.08)} className="font-heading text-4xl md:text-5xl font-black text-white mb-4">
            {children}
        </motion.h2>
    );
}

function Divider() {
    return (
        <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="h-1 w-20 bg-gradient-to-r from-[#0055A2] to-[#00BFFF] rounded-full mx-auto mb-16"
        />
    );
}

// ─── data ─────────────────────────────────────────────────────────────────────
const focusAreas = [
    { icon: BookOpen, title: "Educational Excellence", desc: "Workshops, bootcamps, and curated learning paths covering the latest in CS fundamentals and emerging tech." },
    { icon: Cpu, title: "Technical Innovation", desc: "Hackathons, project labs, and open-source contributions that push the boundaries of what students can build." },
    { icon: Users, title: "Community Building", desc: "A welcoming, diverse network of 500+ members who collaborate, mentor, and grow together." },
    { icon: TrendingUp, title: "Career Growth", desc: "Industry talks, resume reviews, mock interviews, and direct connections to top tech recruiters." },
];

const timeline = [
    {
        year: "2026 – Present", name: "Purv Kabaria", role: "Chapter President",
        photo: "/Leader-About.jpg",
    },
    {
        year: "2025 – 2026", name: "Purv Kabaria", role: "Chapter President",
        photo: "/Leader-About.jpg",
    },
    {
        year: "2024 – 2025", name: "Purv Kabaria", role: "Chapter President",
        photo: "/Leader-About.jpg"
    },
    {
        year: "2023 – 2024", name: "Purv Kabaria", role: "Chapter President",
        photo: "/Leader-About.jpg",
    },
];

const stats = [
    { value: "2018", label: "Year Founded" },
    { value: "500+", label: "Active Members" },
    { value: "50+", label: "Events Hosted" },
    { value: "10+", label: "Hackathons" },
];

const testimonials = [
    { name: "Aisha Khan", role: "Core Committee Member", initials: "AK", color: "#0055A2", quote: "ACM SVNIT gave me the platform to build real projects and connect with industry mentors. It genuinely shaped my career path." },
    { name: "Dev Prajapati", role: "Technical Head 2025", initials: "DP", color: "#0077cc", quote: "The community here is unlike any other. Hackathons, workshops, peer learning — every semester brought something new and exciting." },
    { name: "Sneha Gupta", role: "Events Coordinator", initials: "SG", color: "#00BFFF", quote: "Being part of ACM SVNIT taught me leadership, collaboration, and how to execute ideas at scale. I owe so much to this chapter." },
];

// ─── page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
    return (
        <div className="bg-[#0a0a0a] text-white">

            {/* 1 ── HERO (Shared HeroBanner — change bg image in HeroBanner.tsx) ── */}
            <HeroBanner
                pillLabel="Our Story"
                pillIcon={<ChevronRight size={12} />}
                titleStart="About"
                titleHighlight="Us"
                subtitle="Empowering Tomorrow's Tech Leaders Through Innovation, Learning, and Community."
            />

            {/* 2 ── MISSION & VISION ──────────────────────────────────────────────── */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto text-center mb-4">
                    <SectionLabel>Our Purpose</SectionLabel>
                    <SectionTitle>Mission & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">Vision</span></SectionTitle>
                    <Divider />
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            icon: Target, delay: 0, title: "Our Mission",
                            body: "To advance computing as a science and profession at SVNIT by fostering technical excellence, innovation, and a culture of continuous learning among students.",
                        },
                        {
                            icon: Eye, delay: 0.12, title: "Our Vision",
                            body: "To be the most impactful student chapter in India — a launchpad for future tech leaders who solve real-world problems with creativity and collaboration.",
                        },
                    ].map(({ icon: Icon, delay, title, body }) => (
                        <motion.div key={title} {...fadeUp(delay)}
                            className="group relative p-8 rounded-2xl bg-[#111111] border border-gray-800 hover:border-[#0055A2] transition-all duration-400 overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                                style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,85,162,0.12) 0%, transparent 70%)" }}
                            />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-[#0055A2]/20 flex items-center justify-center mb-5 group-hover:bg-[#0055A2]/40 transition-colors duration-300">
                                    <Icon className="text-[#00BFFF]" size={24} />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-white mb-3">{title}</h3>
                                <p className="text-gray-400 leading-relaxed">{body}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3 ── WHAT WE DO ────────────────────────────────────────────────────── */}
            <section className="py-24 px-4 bg-[#0d1117]">
                <div className="max-w-6xl mx-auto text-center mb-4">
                    <SectionLabel>Focus Areas</SectionLabel>
                    <SectionTitle>What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">Do</span></SectionTitle>
                    <Divider />
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {focusAreas.map(({ icon: Icon, title, desc }, i) => (
                        <motion.div key={title}
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="group p-6 rounded-2xl bg-[#111111] border border-gray-800 hover:border-[#0055A2]/60 transition-all duration-300 hover:bg-[#0055A2]/5"
                        >
                            <div className="w-10 h-10 rounded-lg bg-[#0055A2]/15 flex items-center justify-center mb-4 group-hover:bg-[#0055A2]/35 transition-colors duration-300">
                                <Icon className="text-[#00BFFF]" size={20} />
                            </div>
                            <h3 className="font-heading font-bold text-white text-lg mb-2">{title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4 ── LEADERSHIP TIMELINE ───────────────────────────────────────────── */}
            <section className="py-24 px-4">
                <div className="max-w-3xl mx-auto text-center mb-4">
                    <SectionLabel>Our Leaders</SectionLabel>
                    <SectionTitle>Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">Timeline</span></SectionTitle>
                    <Divider />
                </div>
                <div className="max-w-2xl mx-auto relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0055A2] via-[#00BFFF] to-transparent" />

                    {timeline.map(function ({ year, name, role, photo }, i) {
                        const isRight = i % 2 === 0;
                        const initials = name.split(" ").map((w) => w[0]).join("");
                        const colors = ["#0055A2", "#0077cc", "#0099dd", "#00BFFF"];
                        const color = colors[i % colors.length];
                        return (
                            <motion.div key={year}
                                initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: i * 0.1 }}
                                className={`relative flex items-center gap-5 mb-10 ${isRight ? "md:flex-row" : "md:flex-row-reverse"} pl-16 md:pl-0`}
                            >
                                {/* Dot */}
                                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#00BFFF] bg-[#0a0a0a] z-10" />

                                {/* Card */}
                                <div className={`flex-1 ${isRight ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                                    <div className={`inline-flex items-center gap-4 p-4 rounded-xl bg-[#111111] border border-gray-800 hover:border-[#0055A2]/60 transition-all duration-300 ${isRight ? "md:flex-row-reverse" : ""}`}>
                                        {/* Photo avatar with initials fallback */}
                                        <div className="relative w-16 h-16 rounded-full flex-shrink-0 overflow-hidden border-2 border-[#0055A2]/40"
                                            style={{ background: color }}>
                                            <img
                                                src={photo}
                                                alt={name}
                                                className="absolute inset-0 w-full h-full object-cover object-top rounded-full z-10"
                                                onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).style.display = "none";
                                                }} />
                                            {/* Initials fallback — only visible when photo fails to load */}
                                            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg select-none">
                                                {initials}
                                            </span>
                                        </div>
                                        <div className={isRight ? "md:text-right" : ""}>
                                            <p className="text-[#00BFFF] text-xs font-semibold tracking-wider">{year}</p>
                                            <p className="text-white font-bold">{name}</p>
                                            <p className="text-gray-500 text-xs">{role}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 5 ── STATS ─────────────────────────────────────────────────────────── */}
            <section className="py-20 px-4 bg-[#0d1117]">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(({ value, label }, i) => (
                        <motion.div key={label}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center p-6 rounded-2xl bg-[#111111] border border-gray-800 hover:border-[#0055A2]/60 transition-all duration-300 group"
                        >
                            <p className="font-heading text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0055A2] to-[#00BFFF] mb-2 group-hover:scale-105 transition-transform duration-300">{value}</p>
                            <p className="text-gray-400 text-sm uppercase tracking-widest">{label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 6 ── TESTIMONIALS ──────────────────────────────────────────────────── */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto text-center mb-4">
                    <SectionLabel>Member Voices</SectionLabel>
                    <SectionTitle>What Our Members <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">Say</span></SectionTitle>
                    <Divider />
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map(({ name, role, initials, color, quote }, i) => (
                        <motion.div key={name}
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                            className="relative p-6 rounded-2xl bg-[#111111] border border-gray-800 hover:border-[#0055A2]/50 transition-all duration-300 flex flex-col"
                        >
                            <Quote className="text-[#0055A2]/40 mb-4" size={28} />
                            <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">"{quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                    style={{ background: color }}>
                                    {initials}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{name}</p>
                                    <p className="text-gray-500 text-xs">{role}</p>
                                </div>
                                <div className="ml-auto flex gap-0.5">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}