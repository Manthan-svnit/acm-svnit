"use client";

import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// The strict blueprint for our Lego Block
interface EventCardProps {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    isUpcoming?: boolean; // Optional: defaults to true
    delay?: number;       // Optional: for staggered animations
}

export default function EventCard({
    title,
    date,
    time,
    location,
    description,
    isUpcoming = true,
    delay = 0,
}: EventCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className="bg-[#111111] border border-acm-border/10 rounded-2xl overflow-hidden hover:border-acm-accent transition-all duration-300 group flex flex-col h-full"
        >
            {/* Top Banner / Image Placeholder */}
            <div className="h-40 relative overflow-hidden bg-gradient-to-br from-acm-bg-dark to-gray-900 border-b border-gray-800">
                {/* We use a colored div with an icon for now. Later, you can swap this for an <img /> tag when you upload real posters to Firebase! */}
                <div className="w-full h-full flex items-center justify-center bg-acm-primary/10 group-hover:bg-acm-primary/20 transition-colors duration-500">
                    <Calendar size={48} className="text-acm-accent opacity-40 group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Date Badge */}
                <div className="flex items-center gap-2 text-acm-accent text-sm font-semibold mb-3">
                    <Calendar size={16} />
                    <span>{date}</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
                <p className="text-acm-gray text-sm mb-6 flex-grow line-clamp-3">
                    {description}
                </p>

                {/* Details (Time & Location) */}
                <div className="space-y-2 mb-6 border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Clock size={16} />
                        <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin size={16} />
                        <span>{location}</span>
                    </div>
                </div>

                {/* Dynamic Action Button */}
                <button
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${isUpcoming
                            ? "bg-acm-primary hover:bg-blue-700 text-white"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        }`}
                >
                    {isUpcoming ? "RSVP Now" : "View Details"}
                    <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    );
}