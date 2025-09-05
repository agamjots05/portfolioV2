import { GlassCard } from "@/components/ui/glassCard";


export default function Landing() {
  return (
      <section className="flex justify-center items-center min-h-screen">
        <GlassCard paddingX={100} paddingY={80}>
          <div className="text-center p-10">
            <h3 className="">
              AGAMJOT SINGH
            </h3>
            <p className="text-3xl font-bold">
              CS @ SJSU
            </p>
          </div>
        </GlassCard>
      </section>
  );
}
    

