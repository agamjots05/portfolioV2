"use client";

import { GlassCard } from "@/components/ui/glassCard";
import Link from "next/link";

interface PullRequest {
  number: string;
  url: string;
  description: string;
  status: "merged" | "in_progress";
}

interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  description?: string;
  pullRequests?: PullRequest[];
  projectUrl?: string;
  skills: string[];
}

const experiences: Experience[] = [
  {
    id: "huggingFace",
    title: "Open Source Contributor",
    company: "Hugging Face",
    date: "Summer 2025",
    pullRequests: [
      {
        number: "36978",
        url: "https://github.com/huggingface/transformers/pull/39592",
        description: "Implemented a faster ImageGPT processor increasing overall speed by 20.1X times utilizing CUDA GPU acceleration",
        status: "merged"
      }
    ],
    projectUrl: "https://huggingface.co/docs/transformers/en/index",
    skills: ["Python", "Pytorch", "TensorFlow"]
  },
  {
    id: "keyshade",
    title: "Open Source Contributor",
    company: "Keyshade",
    date: "Summer 2025",
    pullRequests: [
      {
        number: "1003",
        url: "https://github.com/keyshade-xyz/keyshade/pull/1105",
        description: "Adding an on-delete hook to Keyshade CLI and Platform to cleanup all integrations and resources when the user deletes an integration",
        status: "in_progress"
      },
      {
        number: "1009",
        url: "https://github.com/keyshade-xyz/keyshade/pull/1051",
        description: "Added an --environment flag to CLI to override the environment at run time",
        status: "merged"
      }
    ],
    projectUrl: "https://keyshade.xyz/",
    skills: ["Typescript", "Next.js", "PostreSQL"]
  },
  {
    id: "playwright",
    title: "Open Source Contributor",
    company: "Microsoft Playwright",
    date: "Summer 2025",
    pullRequests: [
      {
        number: "34052",
        url: "https://github.com/microsoft/playwright/pull/36464  ",
        description: "Created a new parameter to the playright config allowing users to disable/enable snippets being shown in the HTML report.",
        status: "merged"
      },
    ],
    projectUrl: "https://playwright.dev/",
    skills: ["Typescript", "Next.js"]
  },
  {
    id: "safe-inbox",
    title: "Software Engineer",
    company: "SafeInbox",
    date: "Spring 2024",
    description: "Developed a Gmail Chrome extension leveraging XGBoost and Logistic Regression models to detect phishing attempts in emails and URLs in real-time",
    projectUrl: "https://github.com/Esmosaku/AI4ALL_6D", 
    skills: ["Python", "ML", "Chrome Extensions"]
  },
  {
    id: "acm-website",
    title: "Software Engineer",
    company: "ACM @ SJSU",
    date: "Fall 2023",
    description: "Contributed to the development of the ACM @ SJSU website, a platform for students to connect with each other and collaborate on projects",
    projectUrl: "https://www.acmsjsu.org/", 
    skills: ["Typescript", "Next.js", "Web Development"]
  }
];

export default function Experience() {
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

      <div className="pt-20 px-4 max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-white mb-12">Experience</h1>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <GlassCard key={exp.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    {exp.projectUrl ? (
                      <a 
                        href={exp.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1"
                      >
                        <h2 className="text-xl font-bold">
                          {exp.company}
                        </h2>
                        <svg 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          className="text-white/50 transition-colors duration-300 group-hover:text-white"
                        >
                          <path 
                            d="M5 19V5h7v2H7v10h10v-5h2v7H5Z M21 3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8Z" 
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    ) : (
                      <h2 className="text-xl font-bold">{exp.company}</h2>
                    )}
                    <p className="text-gray-300">{exp.title}</p>
                    <p className="text-sm text-gray-400">{exp.date}</p>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-200">{exp.description}</p>
                  )}

                  {exp.pullRequests && (
                    <ul className="space-y-2 text-gray-200 list-none">
                      {exp.pullRequests.map((pr) => (
                        <li key={pr.number} className="flex items-start">
                          <span className="mr-2">•</span>
                          <div className="flex-1">
                            <span>{pr.status === "merged" ? "Merged" : "Working on"} </span>
                            <a 
                              href={pr.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400"
                            >
                              #{pr.number}
                            </a>
                            <span>: </span>
                            <span>{pr.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  
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