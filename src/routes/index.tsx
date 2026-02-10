import { createFileRoute } from "@tanstack/react-router"
import { BackgroundOrbs } from "@/components/sections/background-orbs"
import { HeroSection } from "@/components/sections/hero-section"
import { ScrollIndicator } from "@/components/layout/scroll-indicator"

function HomePage() {
  return (
    <div className="relative flex h-screen min-h-[600px] w-full flex-col overflow-hidden">
      <BackgroundOrbs />
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <HeroSection />
      </main>
      <ScrollIndicator />
    </div>
  )
}

export const Route = createFileRoute("/")({
  component: HomePage,
})
