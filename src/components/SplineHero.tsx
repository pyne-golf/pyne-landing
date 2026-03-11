import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"

export function SplineHero() {
  return (
    <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-[#194a30]/20">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#194a30"
      />

      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: '#194a30' }}>
            PRECISION REDEFINED
          </p>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Your Game.<br />Elevated.
          </h1>
          <p className="mt-4 text-neutral-400 max-w-sm text-sm md:text-base leading-relaxed">
            Built for golfers who demand more. Track your swing, own your course, master every shot.
          </p>
          <div className="mt-8 flex flex-col gap-3 items-start">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
              Get Started
            </Button>
            <span className="text-neutral-500 text-sm cursor-pointer hover:text-neutral-300 transition-colors">
              See how it works →
            </span>
          </div>
        </div>

        {/* Right content - Spline scene */}
        <div className="flex-1 relative min-h-[300px]">
          <SplineScene
            scene="https://my.spline.design/nexbotrobotcharacterconcept-mpmpoDpEaRsKDsbIwFdAAnaB/"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
