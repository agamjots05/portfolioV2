"use client"
import {GlassCard} from '@developer-hub/liquid-glass'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <section className="flex justify-center items-center h-screen">
        <GlassCard 
          displacementScale={50}
          blurAmount={0}
          cornerRadius={20}
          padding="2rem"
          className=""
        >
          <div className="text-center">
            <h3 className="">
              Agamjot Singh
            </h3>
            <p className="">
              cs @ sjsu
            </p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
    

