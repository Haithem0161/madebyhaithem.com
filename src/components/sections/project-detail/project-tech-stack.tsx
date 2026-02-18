import { motion } from "motion/react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/projects"

export function ProjectTechStack({ project }: { project: Project }) {
  if (!project.techStack?.length) return null

  return (
    <motion.section
      className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      variants={cinematicStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
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

        <div className="flex flex-col gap-0">
          {project.techStack.map((group, i) => (
            <motion.div
              key={group.category}
              variants={cinematicReveal}
              className={cn(
                "grid grid-cols-1 gap-4 py-8 md:grid-cols-[180px_1fr] md:items-center md:gap-12",
                i !== 0 && "border-t border-white/5",
              )}
            >
              {/* Category label */}
              <p className="font-mono-label text-xs uppercase tracking-[0.2em] text-primary/70">
                {group.category}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-body text-sm text-white/60 transition-colors duration-200 hover:border-primary/20 hover:bg-primary/5 hover:text-white/80"
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
