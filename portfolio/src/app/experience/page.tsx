"use client";

import { GlassCard } from "@/components/ui/glassCard";
import Link from "next/link";
import Image from "next/image";

const experiences = [
  {
    id: "huggingFace",
    title: "Open Source Contributor",
    company: "Meta",
    date: "Summer 2024",
    description: "Incoming Software Engineer Intern at Meta, working on the Instagram team to develop and improve user experiences.",
    image: "/meta.png",
    skills: ["React", "TypeScript", "GraphQL"]
  },
  {
    id: "playwright",
    title: "Open Source Contributor",
    company: "San Jose State University",
    date: "2021 - Present",
    description: "Pursuing B.S. in Computer Science with focus on Software Engineering. Relevant coursework includes Data Structures, Algorithms, and Software Engineering.",
    image: "/sjsu.png",
    skills: ["Java", "Python", "Data Structures"]
  },
  {
    id: "open-source",
    title: "Open Source Contributor",
    company: "Various Projects",
    date: "2022 - Present",
    description: "Contributing to open source projects and building developer tools. Active contributor to several popular repositories.",
    image: "/github.png",
    skills: ["Git", "Open Source", "Collaboration"]
  }
];

export default function Experience() {
  return (
    <div className="min-h-screen pb-20">
      {/* Fixed Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 p-4 z-10 bg-black/20 backdrop-blur-sm">
        <Link 
          href="/" 
          className="relative group transition-all duration-300 text-white"
        >
          <span className="relative">
            ← Back
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>
      </div>

      <div className="pt-20 px-4 max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-white mb-12">Experience</h1>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <GlassCard key={exp.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={exp.image}
                    alt={exp.company}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h2 className="text-xl font-bold">{exp.title}</h2>
                    <p className="text-gray-300">{exp.company}</p>
                    <p className="text-sm text-gray-400">{exp.date}</p>
                  </div>
                  
                  <p className="text-gray-200">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {exp.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
} 