"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Your secure database bridge
import SectionHeader from "@/components/ui/SectionHeader";
import EventCard from "@/components/ui/EventCard";

// 1. Define what an Event looks like so TypeScript is happy
interface ACMEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    isUpcoming: boolean;
}

export default function EventsPage() {
    // 2. State to hold our live database events
    const [events, setEvents] = useState<ACMEvent[]>([]);
    const [loading, setLoading] = useState(true);

    // 3. Fetch data from Firebase when the page loads
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Go to the "events" collection in Firestore
                const querySnapshot = await getDocs(collection(db, "events"));

                // Map through the database documents and push them into an array
                const fetchedEvents: ACMEvent[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedEvents.push({
                        id: doc.id,
                        ...doc.data(),
                    } as ACMEvent);
                });

                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen pt-12 px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto">
            <SectionHeader
                title="Chapter"
                highlight="Events"
                subtitle="Discover our latest hackathons, technical workshops, and guest speaker sessions at SVNIT."
            />

            {/* Loading State */}
            {loading ? (
                <div className="text-center text-acm-accent font-bold text-xl mt-20 animate-pulse">
                    Loading events from database...
                </div>
            ) : events.length === 0 ? (
                <div className="text-center text-acm-gray mt-20">
                    No events found. Add some from the Admin panel!
                </div>
            ) : (
                /* The Dynamic Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <EventCard
                            key={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            location={event.location}
                            description={event.description}
                            isUpcoming={event.isUpcoming}
                            delay={index * 0.15}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}