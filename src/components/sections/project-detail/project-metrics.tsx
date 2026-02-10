import { motion } from "motion/react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import type { Project } from "@/lib/projects"

export function ProjectMetrics({ project }: { project: Project }) {
  if (!project.metrics?.length) return null

  return (
    <motion.section
      className="bg-linear-to-r from-primary/5 via-transparent to-secondary-purple/5 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cinematicStagger}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-12 md:justify-between md:gap-8">
        {project.metrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={cinematicReveal}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="font-display text-5xl italic text-ghost-white md:text-7xl">
              {metric.value}
            </span>
            <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/40">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
