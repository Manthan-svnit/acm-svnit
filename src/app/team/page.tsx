"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamMemberCard from "@/components/ui/TeamMemberCard";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    imageUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
}

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "team"));

                const fetchedTeam: TeamMember[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedTeam.push({
                        id: doc.id,
                        ...doc.data(),
                    } as TeamMember);
                });

                setTeam(fetchedTeam);
            } catch (error) {
                console.error("Error fetching team:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    return (
        <div className="min-h-screen pt-12 px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto">
            <SectionHeader
                title="Executive"
                highlight="Committee"
                subtitle="Meet the dedicated students and faculty members who make ACM SVNIT a thriving tech community."
            />

            {loading ? (
                <div className="text-center text-acm-accent font-bold text-xl mt-20 animate-pulse">
                    Loading team members...
                </div>
            ) : team.length === 0 ? (
                <div className="text-center text-acm-gray mt-20">
                    No team members found. Add some from the Admin panel!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <TeamMemberCard
                            key={member.id}
                            name={member.name}
                            role={member.role}
                            imageUrl={member.imageUrl}
                            linkedinUrl={member.linkedinUrl}
                            githubUrl={member.githubUrl}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}