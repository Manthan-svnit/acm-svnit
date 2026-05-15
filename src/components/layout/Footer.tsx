import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#111111] text-gray-400 border-t border-acm-border/10 pt-10 pb-6 md:pt-16 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:gap-12 md:mb-12">

                    {/* Brand Col */}
                    <div className="col-span-1 sm:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-white tracking-wider mb-4 block">
                            ACM <span className="text-acm-accent">SVNIT</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm mt-4">
                            Advancing Computing as a Science & Profession. We strive to foster a community of passionate computing enthusiasts at the National Institute of Technology, Surat.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold uppercase tracking-wider mb-4">Explore</h3>
                        <ul className="space-y-3">
                            <li><Link href="/events" className="hover:text-acm-accent transition-colors">Events & Hackathons</Link></li>
                            <li><Link href="/team" className="hover:text-acm-accent transition-colors">Executive Committee</Link></li>
                            <li><Link href="/about" className="hover:text-acm-accent transition-colors">Our Mission</Link></li>
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div>
                        <h3 className="text-white font-semibold uppercase tracking-wider mb-4">Connect</h3>
                        <ul className="space-y-3">
                            <li className="hover:text-acm-accent transition-colors cursor-pointer">LinkedIn</li>
                            <li className="hover:text-acm-accent transition-colors cursor-pointer">Instagram</li>
                            <li className="hover:text-acm-accent transition-colors cursor-pointer">GitHub</li>
                            <li className="mt-4 pt-4 border-t border-gray-800">
                                <a href="mailto:acm@svnit.ac.in" className="hover:text-white transition-colors">
                                    acm@svnit.ac.in
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs border-t border-gray-800 pt-8 mt-8">
                    <p>&copy; {currentYear} ACM SVNIT Student Chapter. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}