import { motion } from "motion/react"
import { fadeInUp } from "@/lib/variants"

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
  onRetry,
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <motion.div
      className="flex min-h-[40vh] flex-col items-center justify-center text-center"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <p className="font-mono-label mb-2 text-xs uppercase tracking-[0.2em] text-red-400">
        {title}
      </p>
      <p className="font-body mb-6 text-lg text-white/40">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="font-mono-label cursor-pointer text-[11px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
        >
          Try Again
        </button>
      )}
    </motion.div>
  )
}
