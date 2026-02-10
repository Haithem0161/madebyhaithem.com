import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { scrollStagger, scrollReveal } from "@/lib/variants"

export function AboutBlurb() {
  return (
    <motion.section
      className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scrollStagger}
    >
      <div className="max-w-3xl">
        <motion.p
          variants={scrollReveal}
          className="font-mono-label mb-6 text-xs uppercase tracking-[0.2em] text-primary"
        >
          About
        </motion.p>

        <motion.h2
          variants={scrollReveal}
          className="font-display text-ghost-white mb-8 text-3xl italic leading-[1.1] md:text-5xl"
        >
          I build things for the web.
        </motion.h2>

        <motion.p
          variants={scrollReveal}
          className="font-body mb-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
        >
          Scalable backends, intuitive interfaces, and everything in between. I
          care about clean architecture and experiences that feel effortless.
        </motion.p>

        <motion.div variants={scrollReveal}>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
          >
            Learn more about me
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
