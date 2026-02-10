import { createFileRoute } from "@tanstack/react-router"
import { LiquidChrome } from "@/components/LiquidChrome"
import { AboutSection } from "@/components/sections/about-section"

function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background — fixed to viewport, always behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <LiquidChrome
          baseColor={[0.1, 0.0, 0.2]}
          speed={0.15}
          amplitude={0.4}
          frequencyX={3}
          frequencyY={2}
          interactive={false}
        />
      </div>

      {/* Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-32 pb-20">
        <AboutSection />
      </main>
    </div>
  )
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
})
