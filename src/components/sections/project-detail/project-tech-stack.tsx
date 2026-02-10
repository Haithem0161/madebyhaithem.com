import { motion } from "motion/react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import type { Project } from "@/lib/projects"

export function ProjectTechStack({ project }: { project: Project }) {
  if (!project.techStack?.length) return null

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
          Technology
        </motion.p>

        <motion.h2
          variants={cinematicReveal}
          className="font-display text-ghost-white mb-12 text-3xl italic leading-[1.1] md:mb-16 md:text-5xl"
        >
          Built with.
        </motion.h2>

        <div className="flex flex-col gap-10">
          {project.techStack.map((group) => (
            <motion.div key={group.category} variants={cinematicReveal}>
              <p className="font-mono-label mb-4 text-xs uppercase tracking-[0.2em] text-primary/70">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-body text-sm text-white/60 transition-colors duration-200 hover:border-white/20 hover:text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
