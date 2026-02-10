import { motion } from "motion/react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import type { Project } from "@/lib/projects"

export function ProjectFeatures({ project }: { project: Project }) {
  if (!project.features?.length) return null

  return (
    <motion.section
      className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={cinematicStagger}
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          variants={cinematicReveal}
          className="font-mono-label mb-4 text-[10px] uppercase tracking-[0.2em] text-primary"
        >
          Key Features
        </motion.p>

        <motion.h2
          variants={cinematicReveal}
          className="font-display text-ghost-white mb-12 text-3xl italic leading-[1.1] md:mb-16 md:text-5xl"
        >
          What makes it tick.
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {project.features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cinematicReveal}
              className="rounded-2xl border border-white/5 bg-white/3 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-white/6"
            >
              <h3 className="mb-3 text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/50">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
