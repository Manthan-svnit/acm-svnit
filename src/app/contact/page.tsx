// "use client";

// import { useState } from "react";
// import SectionHeader from "@/components/ui/SectionHeader";
// import { Mail, Phone, MapPin, Send } from "lucide-react";
// // 1. Import your Firebase tools!
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default function ContactPage() {
//     // --- FORM STATE ---
//     const [formData, setFormData] = useState({
//         admissionNo: "",
//         fullName: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//     });

//     const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
//     const [errorMessage, setErrorMessage] = useState("");

//     // Handle input changes dynamically
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // --- SUBMIT HANDLER ---
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setStatus("submitting");
//         setErrorMessage("");

//         try {
//             // 2. Save directly to Firebase from the frontend!
//             const messagesCollection = collection(db, "messages");

//             await addDoc(messagesCollection, {
//                 admissionNo: formData.admissionNo || "N/A",
//                 fullName: formData.fullName,
//                 email: formData.email,
//                 phone: formData.phone || "N/A",
//                 subject: formData.subject || "General Inquiry",
//                 message: formData.message,
//                 status: "unread",
//                 createdAt: new Date(),
//             });

//             // (Phase 3: We will add the Nodemailer API trigger here later!)

//             setStatus("success");
//             setFormData({ admissionNo: "", fullName: "", email: "", phone: "", subject: "", message: "" });

//         } catch (error) {
//             console.error("Error saving message:", error);
//             setStatus("error");
//             setErrorMessage("Database permission denied or network error. Please check Firebase rules.");
//         }
//     };

//     return (
//         <div className="min-h-screen pt-12 px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto">
//             <SectionHeader
//                 title="Get in"
//                 highlight="Touch"
//                 subtitle="Have a question about upcoming events or want to join the chapter? Send us a message."
//             />

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">

//                 {/* --- LEFT COLUMN: CONTACT INFO --- */}
//                 <div className="bg-[#111111] p-8 rounded-2xl border border-acm-border/10 flex flex-col gap-8 h-fit">
//                     <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>

//                     <div className="flex items-start gap-4 text-acm-gray hover:text-white transition-colors">
//                         <MapPin className="text-acm-accent mt-1 flex-shrink-0" size={24} />
//                         <div>
//                             <p className="font-semibold text-white">Location</p>
//                             <p>National Institute of Technology (NIT)</p>
//                             <p>Surat, Gujarat, India</p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-4 text-acm-gray hover:text-white transition-colors">
//                         <Mail className="text-acm-accent flex-shrink-0" size={24} />
//                         <div>
//                             <p className="font-semibold text-white">Email Us</p>
//                             <p>acm@svnit.ac.in</p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-4 text-acm-gray hover:text-white transition-colors">
//                         <Phone className="text-acm-accent flex-shrink-0" size={24} />
//                         <div>
//                             <p className="font-semibold text-white">Phone</p>
//                             <p>+91 (Chapter Contact Number)</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- RIGHT COLUMN: THE FORM --- */}
//                 <div className="lg:col-span-2 bg-[#111111] p-8 rounded-2xl border border-acm-border/10 shadow-2xl">
//                     <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>

//                     {status === "success" && (
//                         <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 text-green-400 rounded-lg text-center font-medium">
//                             ✅ Message sent successfully! We will get back to you soon.
//                         </div>
//                     )}

//                     {status === "error" && (
//                         <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-center font-medium">
//                             ❌ {errorMessage}
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-6">

//                         {/* ROW 1: Admission No & Name */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-2">Admission Number</label>
//                                 <input required type="text" name="admissionNo" value={formData.admissionNo} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., U20CS001" />
//                             </div>
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-2">Full Name</label>
//                                 <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., Manthan Dhangar" />
//                             </div>
//                         </div>

//                         {/* ROW 2: Email & Phone */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-2">Student Email</label>
//                                 <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., yourname@svnit.ac.in" />
//                             </div>
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-2">Phone Number</label>
//                                 <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., +91 98765 43210" />
//                             </div>
//                         </div>

//                         {/* ROW 3: Subject */}
//                         <div>
//                             <label className="block text-acm-gray text-sm font-medium mb-2">Subject</label>
//                             <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., Joining the Web Development Team" />
//                         </div>

//                         {/* ROW 4: Message */}
//                         <div>
//                             <label className="block text-acm-gray text-sm font-medium mb-2">Message</label>
//                             <textarea required rows={5} name="message" value={formData.message} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors resize-none" placeholder="Write your message here..." />
//                         </div>

//                         {/* SUBMIT BUTTON */}
//                         <button
//                             type="submit"
//                             disabled={status === "submitting"}
//                             className="w-full bg-acm-primary hover:bg-blue-700 text-white font-bold py-4 rounded-lg mt-4 disabled:opacity-50 flex justify-center items-center gap-2 transition-colors"
//                         >
//                             {status === "submitting" ? "Sending..." : "Send Message"}
//                             <Send size={18} />
//                         </button>
//                     </form>

//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
    // --- FORM STATE ---
    const [formData, setFormData] = useState({
        admissionNo: "",
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle input changes dynamically
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- SUBMIT HANDLER ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            // 1. Save directly to Firebase from the frontend
            const messagesCollection = collection(db, "messages");

            await addDoc(messagesCollection, {
                admissionNo: formData.admissionNo || "N/A",
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone || "N/A",
                subject: formData.subject || "General Inquiry",
                message: formData.message,
                status: "unread",
                createdAt: new Date(),
            });

            // 2. Trigger the automated Nodemailer email via our backend API
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    fullName: formData.fullName
                }),
            });

            // If both succeed, clear the form and show success
            setStatus("success");
            setFormData({ admissionNo: "", fullName: "", email: "", phone: "", subject: "", message: "" });

        } catch (error) {
            console.error("Error saving message or sending email:", error);
            setStatus("error");
            setErrorMessage("Something went wrong. Please check your connection and try again.");
        }
    };

    return (
        <div className="min-h-screen pt-8 md:pt-12 px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 max-w-7xl mx-auto">
            <SectionHeader
                title="Get in"
                highlight="Touch"
                subtitle="Have a question about upcoming events or want to join the chapter? Send us a message."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">

                {/* --- LEFT COLUMN: CONTACT INFO --- */}
                <div className="bg-[#111111] p-5 sm:p-6 md:p-8 rounded-2xl border border-acm-border/10 flex flex-col gap-6 md:gap-8 h-fit">
                    <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>

                    <div className="flex items-start gap-4 text-acm-gray hover:text-white transition-colors">
                        <MapPin className="text-acm-accent mt-1 flex-shrink-0" size={24} />
                        <div>
                            <p className="font-semibold text-white">Location</p>
                            <p>National Institute of Technology (NIT)</p>
                            <p>Surat, Gujarat, India</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-acm-gray hover:text-white transition-colors">
                        <Mail className="text-acm-accent flex-shrink-0" size={24} />
                        <div>
                            <p className="font-semibold text-white">Email Us</p>
                            <p>acm@svnit.ac.in</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-acm-gray hover:text-white transition-colors">
                        <Phone className="text-acm-accent flex-shrink-0" size={24} />
                        <div>
                            <p className="font-semibold text-white">Phone</p>
                            <p>+91 9316564230</p>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: THE FORM --- */}
                <div className="lg:col-span-2 bg-[#111111] p-5 sm:p-6 md:p-8 rounded-2xl border border-acm-border/10 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>

                    {status === "success" && (
                        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 text-green-400 rounded-lg text-center font-medium">
                            ✅ Message sent successfully! Check your email for a confirmation.
                        </div>
                    )}

                    {status === "error" && (
                        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-center font-medium">
                            ❌ {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* ROW 1: Admission No & Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-acm-gray text-sm font-medium mb-2">Admission Number</label>
                                <input required type="text" name="admissionNo" value={formData.admissionNo} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., U20CS001" />
                            </div>
                            <div>
                                <label className="block text-acm-gray text-sm font-medium mb-2">Full Name</label>
                                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., Manthan Dhangar" />
                            </div>
                        </div>

                        {/* ROW 2: Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-acm-gray text-sm font-medium mb-2">Student Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., yourname@svnit.ac.in" />
                            </div>
                            <div>
                                <label className="block text-acm-gray text-sm font-medium mb-2">Phone Number</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., +91 98765 43210" />
                            </div>
                        </div>

                        {/* ROW 3: Subject */}
                        <div>
                            <label className="block text-acm-gray text-sm font-medium mb-2">Subject</label>
                            <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors" placeholder="e.g., Joining the Web Development Team" />
                        </div>

                        {/* ROW 4: Message */}
                        <div>
                            <label className="block text-acm-gray text-sm font-medium mb-2">Message</label>
                            <textarea required rows={5} name="message" value={formData.message} onChange={handleChange} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-acm-accent focus:outline-none transition-colors resize-none" placeholder="Write your message here..." />
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-acm-primary hover:bg-blue-700 text-white font-bold py-4 rounded-lg mt-4 disabled:opacity-50 flex justify-center items-center gap-2 transition-colors"
                        >
                            {status === "submitting" ? "Sending..." : "Send Message"}
                            <Send size={18} />
                        </button>
                    </form>

                </div>
            </div>

            {/* ── VISIT OUR CAMPUS — MAP SECTION ────────────────────────────────── */}
            <section className="mt-12 md:mt-20">
                {/* Section heading */}
                <div className="text-center mb-8 md:mb-12">
                    <p className="text-[#00BFFF] text-sm font-semibold tracking-[0.3em] uppercase mb-2">Find Us</p>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-white">
                        Visit Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A2] to-[#00BFFF]">
                            Campus
                        </span>
                    </h2>
                </div>

                {/* Map card */}
                <div className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-[#0055A2]/60 transition-all duration-500 bg-[#111111]">
                    {/* Hover glow */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none z-20"
                        style={{
                            background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,85,162,0.1) 0%, transparent 70%)",
                        }}
                    />

                    {/* Google Maps iframe — standard white map */}
                    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[420px] lg:h-[480px]">
                        <iframe
                            title="SVNIT Campus Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0172870078!2d72.78270287476476!3d21.16289098053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x70456898f3a3a0b2!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology%20(SVNIT)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        {/* Clickable overlay — opens Google Maps directions in new tab */}
                        <a
                            href="https://www.google.com/maps/dir//Sardar+Vallabhbhai+National+Institute+of+Technology+(SVNIT),+Ichchhanath,+Surat,+Gujarat+395007/@21.16289,72.7852778,17z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10"
                            aria-label="Get directions to SVNIT on Google Maps"
                        />
                    </div>

                    {/* Floating location card */}
                    <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-20 pointer-events-none">
                        <div className="bg-[#0d1117]/90 backdrop-blur-md border border-gray-700/60 rounded-xl p-4 sm:p-5 pointer-events-auto">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#0055A2]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin size={16} className="text-[#00BFFF]" />
                                </div>
                                <div>
                                    <p className="font-heading text-white font-bold text-sm sm:text-base">SVNIT, Surat</p>
                                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                                        Ichchhanath, Dumas Road, Keval Chowk,<br />
                                        Surat, Gujarat 395007
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Open in Google Maps button */}
                <div className="flex justify-center mt-6">
                    <a
                        href="https://www.google.com/maps/dir//Sardar+Vallabhbhai+National+Institute+of+Technology+(SVNIT),+Ichchhanath,+Surat,+Gujarat+395007/@21.16289,72.7852778,17z"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-sm tracking-wide
                                   text-white border border-[#0055A2]/50 bg-[#0055A2]/10 hover:bg-[#0055A2]/25
                                   hover:border-[#0055A2] transition-all duration-300"
                    >
                        <MapPin size={16} />
                        Open in Google Maps
                        <ExternalLink size={14} className="opacity-60" />
                    </a>
                </div>
            </section>
        </div>
    );
}