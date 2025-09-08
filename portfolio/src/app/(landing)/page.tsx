import { GlassCard } from "@/components/ui/glassCard";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="flex justify-center items-center min-h-screen">
        <GlassCard 
          paddingX={100} 
          paddingY={80}
          className="text-center space-y-4"
        >
          <h1 className="font-bold">AGAMJOT SINGH</h1>
          <GooeyText
            texts={[" ","CS @ SJSU", "Open-Source Contributor", "Software Engineer", "Discus Thrower Enthusiast"]}
            morphTime={5}
            cooldownTime={5}
          />
          <div className="flex flex-row gap-10">
            <Link
              href="/resume" 
              className="relative group transition-all duration-300"
            >
              <span className="relative">
                Resume
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link 
              href="/experience" 
              className="relative group transition-all duration-300"
            >
              <span className="relative">
                Experience
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link 
              href="/projects" 
              className="relative group transition-all duration-300"
            >
              <span className="relative">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}