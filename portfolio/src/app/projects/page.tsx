"use client";

import { GlassCard } from "@/components/ui/glassCard";
import Link from "next/link";

interface Technology {
  name: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: Technology[];
  devpostUrl?: string;
  liveUrl?: string;
  highlights: string[];
  hackathon: string;
}

const projects: Project[] = [
  {
    id: "foresight",
    title: "Foresight",
    description: "A real-time missing children detection platform that leverages advanced AI technologies to analyze CCTV streams and match against Amber Alert databases.",
    technologies: [
      { name: "Google Gemini", color: "text-blue-400" },
      { name: "MongoDB", color: "text-green-400" },
      { name: "Next.js", color: "text-white" },
      { name: "OpenCV", color: "text-blue-300" },
      { name: "YOLOv11", color: "text-yellow-400" }
    ],
    devpostUrl: "https://devpost.com/software/watchdog-24cj5r",
    highlights: [
      "Real-time CCTV stream analysis using YOLOv11",
      "Integration with national Amber Alert database",
      "Google Gemini for enhanced detection accuracy"
    ],
    hackathon: "SfHacks"
  },
  {
    id: "scammerjammer",
    title: "ScammerJammer",
    description: "An anti-scam platform designed to counter phone scammers by engaging them in automated calls and analyzing their emotional responses in real-time.",
    technologies: [
      { name: "Hume API", color: "text-purple-400" },
      { name: "Next.js", color: "text-white" },
      { name: "Tailwind CSS", color: "text-cyan-400" },
      { name: "Vercel", color: "text-blue-400" }
    ],
    devpostUrl: "https://devpost.com/software/scammer-jammer",
    highlights: [
      "Real-time emotion analysis using Hume.ai",
      "Quantitative anger level tracking",
      "Efficient scammer time-wasting algorithms"
    ],
    hackathon: "CalHacks 11.0"
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen pb-20">
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

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-12">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <GlassCard key={project.id} className="p-6 flex flex-col h-full">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p className="text-sm text-purple-300 mt-1">
                  {project.hackathon}
                </p>
              </div>

              <p className="text-gray-300 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech.name}
                    className={`px-3 py-1 rounded-full bg-white/5 ${tech.color} text-sm`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 mt-auto">
                {project.devpostUrl && (
                  <a 
                    href={project.devpostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    View on DevPost
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
} 