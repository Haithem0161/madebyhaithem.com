import { useRef, lazy, Suspense } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Badge } from "@/components/ui/badge"
import { GithubIcon } from "@/components/icons"
import { getMediaUrl } from "@/lib/api"
import { useAnalytics } from "@/lib/hooks/use-analytics"
import type { Project } from "@/lib/projects"

// Lazy-load Plasma — defers OGL bundle until needed (only when no CMS image exists)
const Plasma = lazy(() => import("@/components/Plasma"))

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] text-white/30">
        {label}
      </span>
      <span className="font-body text-sm text-white">{value}</span>
    </div>
  )
}

export function ProjectHero({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const { trackExternalClick } = useAnalytics()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative z-10 flex h-screen min-h-[700px] flex-col overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {project.images?.[0] ? (
          <>
            <img
              src={getMediaUrl(project.images[0].id, {
                w: 1920,
                h: 1080,
                fit: "cover",
                format: "webp",
                quality: 85,
              })}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-background-dark/60 via-background-dark/20 to-background-dark" />
          </>
        ) : (
          <>
            {/* Plasma WebGL — ambient, slow-moving purple (lazy-loaded, half-res) */}
            <div className="absolute inset-0 pointer-events-none">
              <Suspense fallback={null}>
                <Plasma
                  color="#7f13ec"
                  speed={0.3}
                  scale={1.2}
                  opacity={0.35}
                  mouseInteractive={false}
                  dpr={0.5}
                />
              </Suspense>
            </div>
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-40`}
            />
            {/* Circuit dot texture */}
            <div className="circuit-bg absolute inset-0 opacity-10" />
            {/* Content legibility gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-background-dark/60 via-background-dark/20 to-background-dark" />
          </>
        )}
      </motion.div>

      {/* Back link */}
      <motion.div
        className="relative z-20 px-6 pt-28 md:px-12 lg:px-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          to="/work"
          className="group inline-flex items-center gap-2 font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Work
        </Link>
      </motion.div>

      {/* Main content, pushed to bottom */}
      <div className="relative z-20 mt-auto px-6 pb-[10vh] md:px-12 lg:px-20">
        {/* Project number */}
        <motion.p
          className="font-mono-label mb-4 text-[10px] uppercase tracking-[0.2em] text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ opacity: contentOpacity }}
        >
          {String(index + 1).padStart(2, "0")}, Project
        </motion.p>

        {/* Title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
          className="origin-bottom-left"
        >
          <motion.h1
            className="font-display text-ghost-white text-[clamp(3rem,10vw,8rem)] italic leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.4 }}
          >
            {project.title}
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-body mt-4 max-w-xl text-lg text-white/50 md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ opacity: contentOpacity }}
        >
          {project.subtitle}
        </motion.p>

        {/* Metadata + badges + links */}
        <motion.div
          className="mt-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ opacity: contentOpacity }}
        >
          {/* Meta row */}
          {(project.role || project.year || project.client) && (
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              {project.role && (
                <MetaField label="Role" value={project.role} />
              )}
              {project.year && (
                <MetaField label="Year" value={project.year} />
              )}
              {project.client && (
                <MetaField label="Client" value={project.client} />
              )}
            </div>
          )}

          {/* Tags + links row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-white/10 text-xs text-white/40"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono-label text-[10px] uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-white"
                  onClick={() => trackExternalClick(project.liveUrl!, `live_site:${project.slug}`)}
                >
                  Live Site
                  <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/30 transition-colors hover:text-white/60"
                  onClick={() => trackExternalClick(project.repoUrl!, `github_repo:${project.slug}`)}
                >
                  <GithubIcon className="size-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="size-5 text-white/20" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
