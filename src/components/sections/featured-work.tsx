import { useRef, useState, useLayoutEffect } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { projectsQueryOptions } from "@/lib/queries"
import { getMediaUrl } from "@/lib/api"
import { useAnalytics } from "@/lib/hooks/use-analytics"
import type { Project } from "@/lib/projects"

const hoverGradients: Record<string, string> = {
  "from-primary/20 to-secondary-purple/20":
    "group-hover:from-primary/30 group-hover:to-secondary-purple/30",
  "from-secondary-purple/20 to-palatinate/20":
    "group-hover:from-secondary-purple/30 group-hover:to-palatinate/30",
  "from-palatinate/20 to-primary/20":
    "group-hover:from-palatinate/30 group-hover:to-primary/30",
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const { trackEvent } = useAnalytics()
  const hoverGradient = hoverGradients[project.gradient] ?? ""
  const thumbnail = project.images?.[0]

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="block shrink-0"
      onClick={() => trackEvent("click", "project_card", project.slug)}
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
        className="group relative flex h-[420px] w-[340px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-white/6 sm:w-[380px]"
      >
        {/* Image */}
        <div
          className={`relative h-44 shrink-0 overflow-hidden bg-linear-to-br ${project.gradient} ${hoverGradient} transition-colors duration-300`}
        >
          {thumbnail && (
            <img
              src={getMediaUrl(thumbnail.id, { w: 600, h: 400, fit: "cover", format: "webp" })}
              alt={thumbnail.alt ?? project.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}

          {/* Index chip */}
          <span className="absolute left-4 top-4 font-mono-label text-[10px] uppercase tracking-widest text-white/30">
            {String(index + 1).padStart(2, "0")}
          </span>

          <ArrowUpRight className="absolute right-4 top-4 size-4 text-white/0 transition-all duration-300 group-hover:text-white/60" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-1.5 text-lg font-bold leading-snug text-white">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mb-2 text-xs font-medium text-primary/70">{project.subtitle}</p>
          )}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/40">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-white/8 bg-white/3 px-2 py-0.5 text-[10px] text-white/35"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge
                variant="outline"
                className="border-white/8 bg-white/3 px-2 py-0.5 text-[10px] text-white/25"
              >
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

function ViewAllCard({ count }: { count: number }) {
  const { trackEvent } = useAnalytics()
  return (
    <Link to="/work" className="block shrink-0" onClick={() => trackEvent("click", "cta", "view_all_projects")}>
      <div className="group flex h-[420px] w-[280px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-white/2 transition-all duration-300 hover:border-primary/30 hover:bg-white/5 sm:w-[300px]">
        <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
          <ArrowRight className="size-6 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white/60 transition-colors group-hover:text-white">
            View all projects
          </p>
          <p className="mt-1 font-mono-label text-xs text-white/25">
            {count} project{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </Link>
  )
}

export function FeaturedWork() {
  const { data: allProjects } = useSuspenseQuery(projectsQueryOptions)
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState(0)

  const featuredProjects = allProjects.filter((p) => p.featured)
  const featured = featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 5)

  // Measure actual overflow: how far the track extends beyond the viewport.
  // useLayoutEffect ensures measurement happens before paint to avoid flicker.
  useLayoutEffect(() => {
    function measure() {
      if (!trackRef.current) return
      const trackW = trackRef.current.scrollWidth
      const viewportW = window.innerWidth
      setOverflow(Math.max(0, trackW - viewportW + 80)) // 80px right padding
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [featured.length])

  // Track scroll progress through the tall outer container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Map vertical scroll 0→1 to horizontal translateX
  const x = useTransform(scrollYProgress, [0, 1], [0, -overflow])

  if (allProjects.length === 0) {
    return (
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
        <EmptyState />
      </section>
    )
  }

  return (
    // Height = 100vh (sticky viewport) + overflow (the extra scroll distance)
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${overflow}px)` }}
    >
      {/* Sticky viewport — pins to the top while user scrolls */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="mb-10 px-6 md:px-12 lg:px-20">
          <p className="font-mono-label mb-4 text-xs uppercase tracking-[0.2em] text-primary">
            Selected Work
          </p>
          <h2 className="font-display text-ghost-white text-3xl italic leading-[1.1] md:text-5xl">
            Recent projects.
          </h2>
        </div>

        {/* Horizontal track that moves with scroll */}
        <div className="relative">
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background-dark to-transparent" />

          <motion.div
            ref={trackRef}
            className="flex gap-5 pl-6 md:pl-12 lg:pl-20"
            style={{ x }}
          >
            {featured.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} />
            ))}

            <ViewAllCard count={allProjects.length} />
          </motion.div>
        </div>

        {/* Scroll progress indicator */}
        <div className="mt-8 px-6 md:px-12 lg:px-20">
          <div className="h-px w-full max-w-xs bg-white/10">
            <motion.div
              className="h-full bg-primary"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
