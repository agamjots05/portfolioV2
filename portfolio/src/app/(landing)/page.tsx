"use client"
import {GlassCard as DevGlassCard} from '@developer-hub/liquid-glass'
import { GlassCard } from "@/components/ui/glassCard";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <section className="flex justify-center items-center h-screen">
        <GlassCard paddingX={40} paddingY={20}>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              Agamjot Singh
            </h3>
            <p className="text-lg">
              cs @ sjsu
            </p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
    

