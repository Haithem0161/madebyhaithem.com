import { createFileRoute } from "@tanstack/react-router"
import { motion } from "motion/react"
import { staggerContainer, fadeInUp } from "@/lib/variants"
import { WorkShowcase } from "@/components/sections/work-showcase"
import { projectsQueryOptions } from "@/lib/queries"

function WorkPage() {
  return (
    <div className="relative z-10 min-h-screen px-6 pt-28 pb-16 md:px-12 lg:px-20">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Page header */}
        <motion.p
          variants={fadeInUp}
          className="font-mono-label mb-6 text-[10px] uppercase tracking-[0.2em] text-primary"
        >
          Portfolio
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="font-display text-ghost-white mb-4 text-5xl italic leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          Selected Work.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="font-body mb-16 max-w-lg text-lg text-white/40 md:mb-24"
        >
          A curated selection of projects that represent my approach to
          fullstack development.
        </motion.p>

        {/* Showcase */}
        <motion.div variants={fadeInUp}>
          <WorkShowcase />
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Route = createFileRoute("/work")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(projectsQueryOptions),
  component: WorkPage,
})
