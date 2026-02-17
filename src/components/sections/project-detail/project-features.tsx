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
          {project.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={cinematicReveal}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-white/6"
            >
              {/* Accent gradient bar */}
              <div className="h-px w-full bg-linear-to-r from-primary/0 via-primary/20 to-primary/0 transition-all duration-300 group-hover:via-primary/50" />
              <div className="p-8">
                <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-primary/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 mb-3 text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
