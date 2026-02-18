import { useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { projectsQueryOptions } from "@/lib/queries"
import { motion, useScroll, useTransform } from "motion/react"
import FloatingLines from "@/components/FloatingLines"
import { HeroViewport } from "@/components/sections/hero-viewport"
import { AboutBlurb } from "@/components/sections/about-blurb"
import { FeaturedWork } from "@/components/sections/featured-work"
import { HomeCta } from "@/components/sections/home-cta"
import { useAnalytics } from "@/lib/hooks/use-analytics"

// Stable references — prevents FloatingLines WebGL scene from tearing down and
// rebuilding on every parent re-render due to new array/object identity.
const LINES_GRADIENT = ["#7f13ec", "#52154e", "#4a0d85", "#9333ea"]
const ENABLED_WAVES: Array<"top" | "middle" | "bottom"> = ["top", "middle", "bottom"]
const LINE_COUNT = [4, 6, 4]
const LINE_DISTANCE = [5, 5, 5]

const SCROLL_SECTIONS = ["hero", "about-blurb", "featured-work", "home-cta"]

function HomePage() {
  const { scrollYProgress } = useScroll()
  const { trackEvent } = useAnalytics()

  // FloatingLines fades as user scrolls into content
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.15])

  // Track scroll depth — fire once per section when it enters viewport
  useEffect(() => {
    const tracked = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !tracked.has(entry.target.id)) {
            tracked.add(entry.target.id)
            trackEvent("scroll", "section_view", entry.target.id)
          }
        }
      },
      { threshold: 0.3 },
    )

    for (const id of SCROLL_SECTIONS) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }

    return () => io.disconnect()
  }, [trackEvent])

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
        <div id="hero">
          <HeroViewport />
        </div>

        {/* Gradient fade from transparent to dark bg */}
        <div className="relative z-20 h-32 bg-linear-to-b from-transparent to-background-dark" />

        {/* Content sections, semi-transparent so lines peek through */}
        <div className="relative z-20 bg-background-dark/80 backdrop-blur-sm">
          <div id="about-blurb">
            <AboutBlurb />
          </div>
          <div id="featured-work">
            <FeaturedWork />
          </div>
          <div id="home-cta">
            <HomeCta />
          </div>
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
