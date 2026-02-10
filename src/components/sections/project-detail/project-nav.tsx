import { motion } from "motion/react"
import { Link } from "@tanstack/react-router"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import type { Project } from "@/lib/projects"

export function ProjectNav({
  currentSlug,
  projects,
}: {
  currentSlug: string
  projects: Project[]
}) {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug)
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <motion.section
      className="px-6 py-16 md:px-12 md:py-20 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cinematicStagger}
    >
      <div className="mx-auto max-w-6xl">
        {/* Divider */}
        <div className="mb-12 h-px w-full bg-linear-to-r from-white/5 via-white/10 to-white/5" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Previous */}
          {prevProject && (
            <motion.div variants={cinematicReveal}>
              <Link
                to="/work/$slug"
                params={{ slug: prevProject.slug }}
                className="group flex flex-col gap-3"
              >
                <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/30">
                  <ArrowLeft className="mr-2 inline size-3" />
                  Previous Project
                </span>
                <span className="font-display text-2xl italic text-ghost-white transition-colors group-hover:text-primary md:text-3xl">
                  {prevProject.title}
                </span>

                {/* Mini gradient preview */}
                <div
                  className={`mt-2 h-1.5 w-16 rounded-full bg-linear-to-r ${prevProject.gradient} opacity-50 transition-opacity group-hover:opacity-100`}
                />
              </Link>
            </motion.div>
          )}

          {/* Next */}
          {nextProject && (
            <motion.div
              variants={cinematicReveal}
              className="md:text-right"
            >
              <Link
                to="/work/$slug"
                params={{ slug: nextProject.slug }}
                className="group flex flex-col items-start gap-3 md:items-end"
              >
                <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Next Project
                  <ArrowRight className="ml-2 inline size-3" />
                </span>
                <span className="font-display text-2xl italic text-ghost-white transition-colors group-hover:text-primary md:text-3xl">
                  {nextProject.title}
                </span>

                {/* Mini gradient preview */}
                <div
                  className={`mt-2 h-1.5 w-16 rounded-full bg-linear-to-r ${nextProject.gradient} opacity-50 transition-opacity group-hover:opacity-100`}
                />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
