import Link from "next/link";
import { ArrowRight, Calendar, Users, Info, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-acm-bg-dark text-white flex flex-col items-center">

      {/* 1. Hero Section */}
      <section className="w-full flex flex-col items-center justify-center pt-32 pb-20 px-4">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Welcome to <span className="text-acm-accent">ACM SVNIT</span>
          </h1>
          <p className="text-lg md:text-2xl text-acm-gray mb-10 max-w-2xl mx-auto">
            Advancing Computing as a Science & Profession. Explore our initiatives, meet the team, and join the community.
          </p>

          {/* Main Call to Action Button */}
          <div className="flex justify-center">
            <Link
              href="/about"
              className="bg-acm-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 flex items-center gap-2"
            >
              Discover Our Mission <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Explore Chapter Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Events Card */}
          <Link href="/events" className="group p-8 rounded-2xl bg-[#111111] border border-acm-border/10 hover:border-acm-accent transition-all duration-300 flex flex-col items-center text-center">
            <div className="bg-acm-bg-dark p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="text-acm-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Events</h3>
            <p className="text-acm-gray text-sm">Join our upcoming hackathons and technical workshops.</p>
          </Link>

          {/* Team Card */}
          <Link href="/team" className="group p-8 rounded-2xl bg-[#111111] border border-acm-border/10 hover:border-acm-accent transition-all duration-300 flex flex-col items-center text-center">
            <div className="bg-acm-bg-dark p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="text-acm-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Team</h3>
            <p className="text-acm-gray text-sm">Meet the executive committee driving the chapter forward.</p>
          </Link>

          {/* About Card */}
          <Link href="/about" className="group p-8 rounded-2xl bg-[#111111] border border-acm-border/10 hover:border-acm-accent transition-all duration-300 flex flex-col items-center text-center">
            <div className="bg-acm-bg-dark p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <Info className="text-acm-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p className="text-acm-gray text-sm">Learn about our history, vision, and core values at SVNIT.</p>
          </Link>

          {/* Contact Card */}
          <Link href="/contact" className="group p-8 rounded-2xl bg-[#111111] border border-acm-border/10 hover:border-acm-accent transition-all duration-300 flex flex-col items-center text-center">
            <div className="bg-acm-bg-dark p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="text-acm-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <p className="text-acm-gray text-sm">Reach out for collaborations, sponsorships, or general queries.</p>
          </Link>

        </div>
      </section>

    </div>
  );
}