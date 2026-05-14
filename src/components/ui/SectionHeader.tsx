import React from "react";

// TypeScript Interface defining the "Lego Block" inputs
interface SectionHeaderProps {
    title: string;
    highlight: string;
    subtitle?: string; // The '?' makes this optional
}

export default function SectionHeader({ title, highlight, subtitle }: SectionHeaderProps) {
    return (
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {title} <span className="text-acm-accent">{highlight}</span>
            </h2>

            {/* If a subtitle is provided, render this paragraph */}
            {subtitle && (
                <p className="text-lg text-acm-gray max-w-3xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}