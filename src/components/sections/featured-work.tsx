import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Badge } from "@/components/ui/badge"
import { scrollStagger, scrollReveal } from "@/lib/variants"

const projects = [
  {
    title: "Torch Business OS",
    description:
      "A comprehensive business management platform with HR, finance, and project modules. Built for scale with microservices architecture.",
    tags: ["React", "Node.js", "PostgreSQL", "Prisma"],
    gradient: "from-primary/20 to-secondary-purple/20",
    hoverGradient: "group-hover:from-primary/30 group-hover:to-secondary-purple/30",
  },
  {
    title: "The Studio",
    description:
      "A modern creative agency website with fluid animations, dynamic content, and a custom CMS integration.",
    tags: ["React", "TypeScript", "Motion", "Tailwind"],
    gradient: "from-secondary-purple/20 to-palatinate/20",
    hoverGradient: "group-hover:from-secondary-purple/30 group-hover:to-palatinate/30",
  },
  {
    title: "CLI Toolkit",
    description:
      "High-performance command-line tools for developer workflows. Parallel task execution, smart caching, and plugin system.",
    tags: ["Rust", "CLI", "Performance"],
    gradient: "from-palatinate/20 to-primary/20",
    hoverGradient: "group-hover:from-palatinate/30 group-hover:to-primary/30",
  },
]

function WorkCard({
  project,
}: {
  project: (typeof projects)[number]
}) {
  return (
    <motion.article
      variants={scrollReveal}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.06]"
    >
      <div
        className={`mb-6 h-48 rounded-xl bg-gradient-to-br ${project.gradient} ${project.hoverGradient} transition-colors duration-300`}
      />

      <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/50">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="border-white/10 text-xs text-white/40"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <ArrowRight className="absolute right-8 top-8 size-5 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-primary" />
    </motion.article>
  )
}

export function FeaturedWork() {
  return (
    <motion.section
      className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={scrollStagger}
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={scrollReveal}
          className="font-mono-label mb-6 text-xs uppercase tracking-[0.2em] text-primary"
        >
          Selected Work
        </motion.p>

        <motion.div
          variants={scrollReveal}
          className="mb-10 flex items-end justify-between"
        >
          <h2 className="font-display text-ghost-white text-3xl italic leading-[1.1] md:text-5xl">
            Recent projects.
          </h2>
          <Link
            to="/work"
            className="group hidden items-center gap-2 font-medium text-white/40 transition-colors hover:text-white md:flex"
          >
            View all
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <WorkCard key={project.title} project={project} />
          ))}
        </div>

        <motion.div variants={scrollReveal} className="mt-8 md:hidden">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-medium text-white/40 transition-colors hover:text-white"
          >
            View all projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
