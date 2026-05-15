"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
                        <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white tracking-wider">
                            <Image
                                src="/ACM-logo.png"
                                alt="ACM SVNIT Logo"
                                width={40}
                                height={40}
                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                                priority
                            />
                            ACM <span className="text-acm-accent">SVNIT</span>
                        </Link>
                    </div>

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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-acm-bg-dark/95 backdrop-blur-md border-b border-acm-border/20 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-300 hover:text-acm-accent block px-3 py-3 rounded-md text-base font-medium transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}