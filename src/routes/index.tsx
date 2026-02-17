import { createFileRoute } from "@tanstack/react-router"
import { projectsQueryOptions } from "@/lib/queries"
import { motion, useScroll, useTransform } from "motion/react"
import FloatingLines from "@/components/FloatingLines"
import { HeroViewport } from "@/components/sections/hero-viewport"
import { AboutBlurb } from "@/components/sections/about-blurb"
import { FeaturedWork } from "@/components/sections/featured-work"
import { HomeCta } from "@/components/sections/home-cta"

// Stable references — prevents FloatingLines WebGL scene from tearing down and
// rebuilding on every parent re-render due to new array/object identity.
const LINES_GRADIENT = ["#7f13ec", "#52154e", "#4a0d85", "#9333ea"]
const ENABLED_WAVES: Array<"top" | "middle" | "bottom"> = ["top", "middle", "bottom"]
const LINE_COUNT = [4, 6, 4]
const LINE_DISTANCE = [5, 5, 5]

function HomePage() {
  const { scrollYProgress } = useScroll()

  // FloatingLines fades as user scrolls into content
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.15])

  return (
    <div className="relative">
      {/* Fixed WebGL background, persists across entire page */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ opacity: bgOpacity }}
      >
        <FloatingLines
          linesGradient={LINES_GRADIENT}
          enabledWaves={ENABLED_WAVES}
          lineCount={LINE_COUNT}
          lineDistance={LINE_DISTANCE}
          animationSpeed={0.8}
          interactive
          bendRadius={5.0}
          bendStrength={-0.5}
          parallax
          parallaxStrength={0.15}
          mixBlendMode="screen"
        />
      </motion.div>

      {/* Page content */}
      <main className="relative">
        {/* Hero, full viewport, transparent bg, lines shine through */}
        <HeroViewport />

        {/* Gradient fade from transparent to dark bg */}
        <div className="relative z-20 h-32 bg-linear-to-b from-transparent to-background-dark" />

        {/* Content sections, semi-transparent so lines peek through */}
        <div className="relative z-20 bg-background-dark/80 backdrop-blur-sm">
          <AboutBlurb />
          <FeaturedWork />
          <HomeCta />
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(projectsQueryOptions),
  component: HomePage,
})
