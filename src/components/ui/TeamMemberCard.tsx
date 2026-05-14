"use client";

import { User } from "lucide-react";

// Inline brand SVGs — lucide-react v1.x removed all social/brand icons
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);
import { motion } from "framer-motion";

// The blueprint for our Team Member card
interface TeamMemberCardProps {
    name: string;
    role: string;
    imageUrl?: string; // Optional: We will use a placeholder if they don't have a photo yet
    linkedinUrl?: string;
    githubUrl?: string;
    delay?: number;
}

export default function TeamMemberCard({
    name,
    role,
    imageUrl,
    linkedinUrl,
    githubUrl,
    delay = 0,
}: TeamMemberCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className="bg-[#111111] border border-acm-border/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-acm-accent hover:-translate-y-2 transition-all duration-300 group"
        >
            {/* Avatar / Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-acm-bg-dark shadow-xl relative bg-gray-800 flex items-center justify-center group-hover:border-acm-primary transition-colors duration-300">
                {imageUrl ? (
                    // If we have an image, show it
                    <img
                        src={imageUrl}
                        alt={`${name} profile`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    // If no image, show a professional placeholder icon
                    <User size={48} className="text-gray-500 group-hover:text-acm-accent transition-colors duration-300" />
                )}
            </div>

            {/* Name and Role */}
            <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
            <p className="text-acm-accent font-medium text-sm mb-6">{role}</p>

            {/* Social Links */}
            <div className="flex gap-4 mt-auto">
                {linkedinUrl && (
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-acm-bg-dark flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0077b5] transition-all duration-300"
                    >
                        <LinkedinIcon size={18} />
                    </a>
                )}

                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-acm-bg-dark flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                    >
                        <GithubIcon size={18} />
                    </a>
                )}
            </div>
        </motion.div>
    );
}