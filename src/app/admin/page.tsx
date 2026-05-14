// "use client";

// import { useState } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import SectionHeader from "@/components/ui/SectionHeader";
// import { Calendar, Users } from "lucide-react"; // Importing icons for our tabs

// export default function AdminDashboard() {
//     // --- 1. GLOBAL STATE ---
//     const [activeTab, setActiveTab] = useState<"event" | "team">("event");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [successMessage, setSuccessMessage] = useState("");

//     // --- 2. EVENT FORM STATE ---
//     const [title, setTitle] = useState("");
//     const [date, setDate] = useState("");
//     const [time, setTime] = useState("");
//     const [location, setLocation] = useState("");
//     const [description, setDescription] = useState("");

//     // --- 3. TEAM FORM STATE ---
//     const [name, setName] = useState("");
//     const [role, setRole] = useState("");
//     const [imageUrl, setImageUrl] = useState("");
//     const [linkedinUrl, setLinkedinUrl] = useState("");
//     const [githubUrl, setGithubUrl] = useState("");

//     // --- 4. SUBMIT HANDLERS ---
//     const handleEventSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setSuccessMessage("");

//         try {
//             await addDoc(collection(db, "events"), {
//                 title, date, time, location, description,
//                 isUpcoming: true,
//                 createdAt: new Date(),
//             });
//             setSuccessMessage("✅ Event successfully added to database!");
//             // Clear form
//             setTitle(""); setDate(""); setTime(""); setLocation(""); setDescription("");
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Failed to add event.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleTeamSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setSuccessMessage("");

//         try {
//             // Notice how we just point to "team" and Firebase handles the rest!
//             await addDoc(collection(db, "team"), {
//                 name, role, imageUrl, linkedinUrl, githubUrl,
//                 createdAt: new Date(),
//             });
//             setSuccessMessage("✅ Team Member successfully added to database!");
//             // Clear form
//             setName(""); setRole(""); setImageUrl(""); setLinkedinUrl(""); setGithubUrl("");
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Failed to add team member.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen pt-12 px-4 pb-24 max-w-3xl mx-auto">
//             <SectionHeader
//                 title="Chapter"
//                 highlight="Admin"
//                 subtitle="Secure portal to manage Events and Executive Committee members."
//             />

//             <div className="bg-[#111111] p-8 rounded-2xl border border-acm-border/10 shadow-2xl">

//                 {/* --- TABS --- */}
//                 <div className="flex grid-cols-2 gap-4 mb-8 bg-acm-bg-dark p-2 rounded-xl">
//                     <button
//                         onClick={() => { setActiveTab("event"); setSuccessMessage(""); }}
//                         className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${activeTab === "event" ? "bg-acm-primary text-white" : "text-gray-400 hover:text-white"
//                             }`}
//                     >
//                         <Calendar size={18} /> Add Event
//                     </button>
//                     <button
//                         onClick={() => { setActiveTab("team"); setSuccessMessage(""); }}
//                         className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${activeTab === "team" ? "bg-acm-primary text-white" : "text-gray-400 hover:text-white"
//                             }`}
//                     >
//                         <Users size={18} /> Add Team Member
//                     </button>
//                 </div>

//                 {/* Success Message Banner */}
//                 {successMessage && (
//                     <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 text-green-400 rounded-lg text-center font-medium">
//                         {successMessage}
//                     </div>
//                 )}

//                 {/* --- DYNAMIC FORM RENDERING --- */}
//                 {activeTab === "event" ? (

//                     /* EVENT FORM */
//                     <form onSubmit={handleEventSubmit} className="space-y-4 animate-in fade-in duration-500">
//                         <div>
//                             <label className="block text-acm-gray text-sm font-medium mb-1">Event Title</label>
//                             <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="e.g., Hacktoberfest Sprint" />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-1">Date</label>
//                                 <input required type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="e.g., Oct 22, 2026" />
//                             </div>
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-1">Time</label>
//                                 <input required type="text" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="e.g., 10:00 AM" />
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-acm-gray text-sm font-medium mb-1">Location</label>
//                             <input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="e.g., Lab 4" />
//                         </div>
//                         <div>
//                             <label className="block text-acm-gray text-sm font-medium mb-1">Description</label>
//                             <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none resize-none" placeholder="Event details..." />
//                         </div>
//                         <button type="submit" disabled={isSubmitting} className="w-full bg-acm-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 disabled:opacity-50">
//                             {isSubmitting ? "Pushing..." : "Create Event"}
//                         </button>
//                     </form>

//                 ) : (

//                     /* TEAM FORM */
//                     <form onSubmit={handleTeamSubmit} className="space-y-4 animate-in fade-in duration-500">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-1">Full Name</label>
//                                 <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="e.g., Manthan Dhangar" />
//                             </div>
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-1">Chapter Role</label>
//                                 <input required type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="e.g., Web Developer" />
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-acm-gray text-sm font-medium mb-1">Profile Image URL (Optional)</label>
//                             <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="https://imgur.com/... (Leave blank for default avatar)" />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-1">LinkedIn URL (Optional)</label>
//                                 <input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="https://linkedin.com/in/..." />
//                             </div>
//                             <div>
//                                 <label className="block text-acm-gray text-sm font-medium mb-1">GitHub URL (Optional)</label>
//                                 <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" placeholder="https://github.com/..." />
//                             </div>
//                         </div>
//                         <button type="submit" disabled={isSubmitting} className="w-full bg-acm-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 disabled:opacity-50">
//                             {isSubmitting ? "Pushing..." : "Add Team Member"}
//                         </button>
//                     </form>

//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth, googleProvider } from "@/lib/firebase";
import SectionHeader from "@/components/ui/SectionHeader";
import { Calendar, Users, LogOut, ShieldAlert } from "lucide-react";

// ==========================================
// 1. THE WHITELIST (Only these emails can enter)
// ==========================================
const ALLOWED_EMAILS = [
    "manthanmd21@gmail.com"
];

export default function AdminDashboard() {
    // --- AUTHENTICATION STATE ---
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [authError, setAuthError] = useState("");

    // --- DASHBOARD STATE ---
    const [activeTab, setActiveTab] = useState<"event" | "team">("event");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");

    // ==========================================
    // 2. AUTHENTICATION LOGIC
    // ==========================================

    // Listen for login/logout changes automatically
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        setAuthError("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const loggedInEmail = result.user.email;

            // THE GATEKEEPER: Check if their email is in our Whitelist
            if (!loggedInEmail || !ALLOWED_EMAILS.includes(loggedInEmail)) {
                await signOut(auth); // Kick them out immediately
                setAuthError("Unauthorized access. Your email is not on the admin whitelist.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setAuthError("An error occurred during login. Please try again.");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    // ==========================================
    // 3. DATABASE SUBMIT LOGIC (From previous step)
    // ==========================================
    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "events"), {
                title, date, time, location, description, isUpcoming: true, createdAt: new Date(),
            });
            setSuccessMessage("✅ Event successfully added!");
            setTitle(""); setDate(""); setTime(""); setLocation(""); setDescription("");
        } catch (error) {
            alert("Failed to add event.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTeamSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "team"), {
                name, role, imageUrl, linkedinUrl, githubUrl, createdAt: new Date(),
            });
            setSuccessMessage("✅ Team Member successfully added!");
            setName(""); setRole(""); setImageUrl(""); setLinkedinUrl(""); setGithubUrl("");
        } catch (error) {
            alert("Failed to add team member.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ==========================================
    // 4. UI RENDERER
    // ==========================================

    // UI State 1: Checking authentication status
    if (isAuthLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-acm-bg-dark text-white">
                <div className="animate-pulse text-xl font-bold text-acm-accent">Verifying Security Clearance...</div>
            </div>
        );
    }

    // UI State 2: User is NOT logged in (Show Login Screen)
    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-acm-bg-dark px-4">
                <div className="bg-[#111111] p-10 rounded-2xl border border-acm-border/10 text-center max-w-md w-full shadow-2xl">
                    <ShieldAlert size={48} className="mx-auto text-acm-primary mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-acm-gray mb-8">Restricted access. Authorized executive committee members only.</p>

                    {authError && (
                        <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-sm">
                            {authError}
                        </div>
                    )}

                    <button
                        onClick={handleLogin}
                        className="w-full bg-white text-gray-900 hover:bg-gray-200 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" className="w-5 h-5" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    // UI State 3: User IS logged in AND Authorized (Show Dashboard)
    return (
        <div className="min-h-screen pt-12 px-4 pb-24 max-w-3xl mx-auto">
            {/* Top Bar with Logout */}
            <div className="flex justify-between items-center mb-8 bg-[#111111] p-4 rounded-xl border border-acm-border/10">
                <div className="text-sm text-acm-gray">
                    Logged in as: <span className="text-white font-medium">{user.email}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                    <LogOut size={16} /> Sign Out
                </button>
            </div>

            <SectionHeader title="Chapter" highlight="Admin" subtitle="Secure portal to manage Events and Executive Committee members." />

            <div className="bg-[#111111] p-8 rounded-2xl border border-acm-border/10 shadow-2xl">
                {/* --- TABS --- */}
                <div className="flex grid-cols-2 gap-4 mb-8 bg-acm-bg-dark p-2 rounded-xl">
                    <button onClick={() => { setActiveTab("event"); setSuccessMessage(""); }} className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${activeTab === "event" ? "bg-acm-primary text-white" : "text-gray-400 hover:text-white"}`}>
                        <Calendar size={18} /> Add Event
                    </button>
                    <button onClick={() => { setActiveTab("team"); setSuccessMessage(""); }} className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${activeTab === "team" ? "bg-acm-primary text-white" : "text-gray-400 hover:text-white"}`}>
                        <Users size={18} /> Add Team Member
                    </button>
                </div>

                {/* Success Message Banner */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 text-green-400 rounded-lg text-center font-medium">
                        {successMessage}
                    </div>
                )}

                {/* --- DYNAMIC FORM RENDERING --- */}
                {activeTab === "event" ? (
                    /* EVENT FORM */
                    <form onSubmit={handleEventSubmit} className="space-y-4 animate-in fade-in duration-500">
                        <div><label className="block text-acm-gray text-sm font-medium mb-1">Event Title</label><input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-acm-gray text-sm font-medium mb-1">Date</label><input required type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                            <div><label className="block text-acm-gray text-sm font-medium mb-1">Time</label><input required type="text" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        </div>
                        <div><label className="block text-acm-gray text-sm font-medium mb-1">Location</label><input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        <div><label className="block text-acm-gray text-sm font-medium mb-1">Description</label><textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none resize-none" /></div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-acm-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 disabled:opacity-50">{isSubmitting ? "Pushing..." : "Create Event"}</button>
                    </form>
                ) : (
                    /* TEAM FORM */
                    <form onSubmit={handleTeamSubmit} className="space-y-4 animate-in fade-in duration-500">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-acm-gray text-sm font-medium mb-1">Full Name</label><input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                            <div><label className="block text-acm-gray text-sm font-medium mb-1">Chapter Role</label><input required type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        </div>
                        <div><label className="block text-acm-gray text-sm font-medium mb-1">Profile Image URL (Optional)</label><input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-acm-gray text-sm font-medium mb-1">LinkedIn URL (Optional)</label><input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                            <div><label className="block text-acm-gray text-sm font-medium mb-1">GitHub URL (Optional)</label><input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-acm-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 disabled:opacity-50">{isSubmitting ? "Pushing..." : "Add Team Member"}</button>
                    </form>
                )}
            </div>
        </div>
    );
}