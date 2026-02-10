import { motion } from "motion/react"
import { fadeIn } from "@/lib/variants"

export function ScrollIndicator() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-white/20 z-10"
    >
      <span className="text-xs font-mono tracking-widest">SCROLL</span>
      <div className="h-10 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
    </motion.div>
  )
}
