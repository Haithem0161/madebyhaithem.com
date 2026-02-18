import { motion } from "motion/react"
import { ArrowRight, Download } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { scrollStagger, scrollReveal } from "@/lib/variants"
import { useAnalytics } from "@/lib/hooks/use-analytics"

export function HomeCta() {
  const { trackEvent } = useAnalytics()
  return (
    <motion.section
      className="px-6 py-24 text-center md:px-12 md:py-40 lg:px-20"
      variants={scrollStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="mx-auto max-w-2xl">
        <motion.h2
          variants={scrollReveal}
          className="font-display text-ghost-white mb-4 text-3xl italic leading-[1.1] md:text-5xl"
        >
          Let's work together.
        </motion.h2>

        <motion.p
          variants={scrollReveal}
          className="mb-10 text-lg text-white/40"
        >
          Have a project in mind? I'd love to hear about it.
        </motion.p>

        <motion.div
          variants={scrollReveal}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group relative h-14 w-full overflow-hidden rounded-full bg-primary px-8 text-base font-bold tracking-wide text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/40 sm:w-auto"
          >
            <Link to="/contact" onClick={() => trackEvent("click", "cta", "get_in_touch")}>
              <span>Get in Touch</span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 w-full rounded-full border-white/10 bg-white/5 px-8 text-base font-medium text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 sm:w-auto"
          >
            <a href="/Haithem Mustafa CV.pdf" download onClick={() => trackEvent("click", "cta", "download_cv")}>
              <span>Download CV</span>
              <Download className="size-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
