import { motion } from "motion/react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import type { Project } from "@/lib/projects"

export function ProjectOverview({ project }: { project: Project }) {
  if (!project.overview?.length) return null

  const [first, ...rest] = project.overview
  // Insert pull quote after the first body paragraph (index 0 of rest)
  const pullQuoteAfter = 0

  return (
    <motion.section
      className="px-6 py-24 md:px-12 md:py-36 lg:px-20 lg:py-48"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cinematicStagger}
    >
      <div className="mx-auto max-w-3xl">
        {/* Lead paragraph, larger, italic */}
        <motion.p
          variants={cinematicReveal}
          className="font-display text-2xl italic leading-relaxed text-ghost-white md:text-3xl"
        >
          {first}
        </motion.p>

        {/* Remaining paragraphs with pull quote interspersed */}
        {rest.map((paragraph, i) => (
          <div key={i}>
            {/* Pull quote after first body paragraph */}
            {i === pullQuoteAfter && project.pullQuote && (
              <motion.blockquote
                variants={cinematicReveal}
                className="relative my-16 py-8 pl-10 md:my-24 md:pl-12"
              >
                {/* Thick gradient border */}
                <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-linear-to-b from-primary via-secondary-purple to-primary/20" />
                {/* Decorative quotation mark */}
                <span
                  className="absolute -left-2 -top-6 font-display text-8xl italic leading-none text-primary/15 select-none md:-left-4 md:-top-8 md:text-9xl"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="font-display text-2xl italic leading-relaxed text-white/80 md:text-3xl lg:text-4xl">
                  {project.pullQuote}
                </p>
              </motion.blockquote>
            )}

            <motion.p
              variants={cinematicReveal}
              className="mt-8 font-body text-lg leading-relaxed text-white/60 md:text-xl"
            >
              {paragraph}
            </motion.p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
