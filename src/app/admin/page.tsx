"use client";

import { useState, useEffect } from "react";
// 1. We added getDocs, query, and orderBy to fetch and sort the messages!
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth, googleProvider } from "@/lib/firebase";
import SectionHeader from "@/components/ui/SectionHeader";
// 2. Added the MessageSquare icon for the new tab
import { Calendar, Users, LogOut, ShieldAlert, MessageSquare } from "lucide-react";

// ==========================================
// THE WHITELIST
// ==========================================
const ALLOWED_EMAILS = [
    "manthanmd21@gmail.com",
];

// Interface for TypeScript to understand what a message looks like
interface ContactMessage {
    id: string;
    admissionNo: string;
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    createdAt: any;
}

export default function AdminDashboard() {
    // --- AUTHENTICATION STATE ---
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [authError, setAuthError] = useState("");

    // --- DASHBOARD STATE ---
    // 3. Upgraded activeTab to include "messages"
    const [activeTab, setActiveTab] = useState<"event" | "team" | "messages">("event");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // --- MESSAGE FETCHING STATE ---
    const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);

    // --- FORM STATES ---
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
    // AUTHENTICATION LOGIC
    // ==========================================
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
            if (!loggedInEmail || !ALLOWED_EMAILS.includes(loggedInEmail)) {
                await signOut(auth);
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
    // DATABASE FETCH & SUBMIT LOGIC
    // ==========================================

    // 4. Function to download messages from Firebase
    const fetchMessages = async () => {
        setIsFetchingMessages(true);
        try {
            // Query Firebase, ordering by newest first!
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const fetched = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ContactMessage[];

            setMessagesList(fetched);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsFetchingMessages(false);
        }
    };

    // 5. Automatically fetch messages when the user clicks the Messages tab
    useEffect(() => {
        if (activeTab === "messages") {
            fetchMessages();
        }
    }, [activeTab]);

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
    // UI RENDERERS
    // ==========================================

    if (isAuthLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-acm-bg-dark text-white"><div className="animate-pulse text-xl font-bold text-acm-accent">Verifying Security Clearance...</div></div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-acm-bg-dark px-4">
                <div className="bg-[#111111] p-10 rounded-2xl border border-acm-border/10 text-center max-w-md w-full shadow-2xl">
                    <ShieldAlert size={48} className="mx-auto text-acm-primary mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-acm-gray mb-8">Restricted access. Authorized executive committee members only.</p>
                    {authError && <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-sm">{authError}</div>}
                    <button onClick={handleLogin} className="w-full bg-white text-gray-900 hover:bg-gray-200 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" className="w-5 h-5" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-12 px-4 pb-24 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 bg-[#111111] p-4 rounded-xl border border-acm-border/10">
                <div className="text-sm text-acm-gray">Logged in as: <span className="text-white font-medium">{user.email}</span></div>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-semibold transition-colors"><LogOut size={16} /> Sign Out</button>
            </div>

            <SectionHeader title="Chapter" highlight="Admin" subtitle="Secure portal to manage Events, Team, and Student Inquiries." />

            <div className="bg-[#111111] p-8 rounded-2xl border border-acm-border/10 shadow-2xl">

                {/* --- 3-TAB NAVIGATION --- */}
                <div className="flex grid-cols-3 gap-2 sm:gap-4 mb-8 bg-acm-bg-dark p-2 rounded-xl flex-wrap sm:flex-nowrap">
                    <button onClick={() => { setActiveTab("event"); setSuccessMessage(""); }} className={`flex-1 min-w-[120px] py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${activeTab === "event" ? "bg-acm-primary text-white" : "text-gray-400 hover:text-white"}`}>
                        <Calendar size={18} /> <span className="hidden sm:inline">Add Event</span>
                    </button>
                    <button onClick={() => { setActiveTab("team"); setSuccessMessage(""); }} className={`flex-1 min-w-[120px] py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${activeTab === "team" ? "bg-acm-primary text-white" : "text-gray-400 hover:text-white"}`}>
                        <Users size={18} /> <span className="hidden sm:inline">Add Team</span>
                    </button>
                    <button onClick={() => { setActiveTab("messages"); setSuccessMessage(""); }} className={`flex-1 min-w-[120px] py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${activeTab === "messages" ? "bg-acm-primary text-white" : "text-gray-400 hover:text-white"}`}>
                        <MessageSquare size={18} /> <span className="hidden sm:inline">Messages</span>
                    </button>
                </div>

                {successMessage && <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 text-green-400 rounded-lg text-center font-medium">{successMessage}</div>}

                {/* --- DYNAMIC RENDERING --- */}
                {activeTab === "event" && (
                    <form onSubmit={handleEventSubmit} className="space-y-4 animate-in fade-in duration-500 max-w-3xl mx-auto">
                        <div><label className="block text-acm-gray text-sm font-medium mb-1">Event Title</label><input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-acm-gray text-sm font-medium mb-1">Date</label><input required type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                            <div><label className="block text-acm-gray text-sm font-medium mb-1">Time</label><input required type="text" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        </div>
                        <div><label className="block text-acm-gray text-sm font-medium mb-1">Location</label><input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none" /></div>
                        <div><label className="block text-acm-gray text-sm font-medium mb-1">Description</label><textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-acm-bg-dark border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-acm-accent focus:outline-none resize-none" /></div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-acm-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 disabled:opacity-50">{isSubmitting ? "Pushing..." : "Create Event"}</button>
                    </form>
                )}

                {activeTab === "team" && (
                    <form onSubmit={handleTeamSubmit} className="space-y-4 animate-in fade-in duration-500 max-w-3xl mx-auto">
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

                {/* --- NEW MESSAGES INBOX UI --- */}
                {activeTab === "messages" && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        {isFetchingMessages ? (
                            <div className="text-center text-acm-accent font-medium py-12 animate-pulse">Loading secure messages...</div>
                        ) : messagesList.length === 0 ? (
                            <div className="text-center text-acm-gray py-12">Inbox is empty. No messages found.</div>
                        ) : (
                            messagesList.map((msg) => (
                                <div key={msg.id} className="bg-acm-bg-dark border border-gray-800 p-6 rounded-xl relative hover:border-acm-accent/50 transition-colors">
                                    {/* Unread Badge */}
                                    {msg.status === "unread" && (
                                        <div className="absolute top-4 right-4 bg-acm-primary text-white text-xs font-bold px-3 py-1 rounded-full">NEW</div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b border-gray-800 pb-4">
                                        <div>
                                            <p className="text-xs text-acm-gray uppercase tracking-wider font-semibold mb-1">Student Info</p>
                                            <p className="text-white font-bold text-lg">{msg.fullName}</p>
                                            <p className="text-sm text-acm-accent">{msg.admissionNo}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-acm-gray uppercase tracking-wider font-semibold mb-1">Contact</p>
                                            <p className="text-sm text-gray-300">📧 {msg.email}</p>
                                            <p className="text-sm text-gray-300">📞 {msg.phone}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-white font-bold mb-2 text-lg">{msg.subject}</p>
                                        <p className="text-gray-400 text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}