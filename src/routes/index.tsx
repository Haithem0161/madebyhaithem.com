import { createFileRoute } from "@tanstack/react-router"
import FloatingLines from "@/components/FloatingLines"
import { HeroSection } from "@/components/sections/hero-section"

function HomePage() {
  return (
    <div className="relative flex h-screen min-h-[600px] w-full flex-col overflow-hidden">
      {/* WebGL animated lines background */}
      <div className="absolute inset-0 z-0">
        <FloatingLines
          linesGradient={["#7f13ec", "#52154e", "#4a0d85", "#9333ea"]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[4, 6, 4]}
          lineDistance={[5, 5, 5]}
          animationSpeed={0.8}
          interactive
          bendRadius={5.0}
          bendStrength={-0.5}
          parallax
          parallaxStrength={0.15}
          mixBlendMode="screen"
        />
      </div>
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <HeroSection />
      </main>
    </div>
  )
}

export const Route = createFileRoute("/")({
  component: HomePage,
})
