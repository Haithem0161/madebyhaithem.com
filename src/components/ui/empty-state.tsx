import { motion } from "motion/react"
import { fadeInUp } from "@/lib/variants"

export function EmptyState({
  title = "No projects yet",
  description = "Check back soon for new work.",
}: {
  title?: string
  description?: string
}) {
  return (
    <motion.div
      className="flex min-h-[40vh] flex-col items-center justify-center text-center"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <p className="font-mono-label mb-2 text-xs uppercase tracking-[0.2em] text-primary">
        {title}
      </p>
      <p className="font-body text-lg text-white/40">{description}</p>
    </motion.div>
  )
}
