import { useRef } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { projectsQueryOptions } from "@/lib/queries"
import { motion, useScroll, useTransform } from "motion/react"
import FloatingLines from "@/components/FloatingLines"
import { HeroViewport } from "@/components/sections/hero-viewport"
import { AboutBlurb } from "@/components/sections/about-blurb"
import { FeaturedWork } from "@/components/sections/featured-work"
import { HomeCta } from "@/components/sections/home-cta"

function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // FloatingLines fades as user scrolls into content
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.15])

  return (
    <div ref={pageRef} className="relative">
      {/* Fixed WebGL background, persists across entire page */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ opacity: bgOpacity }}
      >
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
