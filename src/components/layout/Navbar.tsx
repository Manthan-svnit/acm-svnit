"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detect scroll to apply glassmorphism effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Events", path: "/events" },
        { name: "Team", path: "/team" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
                ? "bg-acm-bg-dark/80 backdrop-blur-md border-acm-border/20 shadow-lg"
                : "bg-acm-bg-dark border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-white tracking-wider">
                            ACM <span className="text-acm-accent">SVNIT</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-gray-300 hover:text-acm-accent transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="bg-acm-primary hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">
                            Join Us
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden bg-acm-bg-dark border-b border-acm-border/20"
                >
                    <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 hover:text-acm-accent block px-3 py-3 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="mt-4 w-full bg-acm-primary hover:bg-blue-700 text-white px-5 py-3 rounded-md text-base font-semibold transition-colors">
                            Join Us
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}