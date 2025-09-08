"use client";

import { GlassCard } from "@/components/ui/glassCard";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <GlassCard className="text-center space-y-4">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold">Projects</h1>
          <div className="w-[52px]"></div> {/* Spacer for alignment */}
        </div>
        {/* Add your projects content here */}
      </GlassCard>
    </div>
  );
} 