import { forwardRef } from "react"
import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Badge } from "@/components/ui/badge"
import { GithubIcon } from "@/components/icons"
import { getMediaUrl } from "@/lib/api"
import { scrollStagger, scrollReveal } from "@/lib/variants"
import type { Project } from "@/lib/projects"

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] text-white/30">
        {label}
      </span>
      <span className="font-body text-sm text-white">{value}</span>
    </div>
  )
}

export const WorkProjectSection = forwardRef<
  HTMLElement,
  { project: Project; index: number; isLast: boolean }
>(function WorkProjectSection({ project, index, isLast }, ref) {
  return (
    <section
      ref={ref}
      className="flex min-h-[90vh] flex-col gap-10 py-16 lg:py-24"
    >
      {/* Preview area */}
      <motion.div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {project.images?.[0] ? (
          <img
            src={getMediaUrl(project.images[0].id, { w: 1200, h: 750, fit: "cover", format: "webp" })}
            alt={project.images[0].alt ?? project.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <>
            <div
              className={`absolute inset-0 bg-linear-to-br ${project.gradient}`}
            />
            <div className="circuit-bg absolute inset-0 opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono-label text-xs uppercase tracking-[0.3em] text-white/20">
                Preview
              </span>
            </div>
          </>
        )}
      </motion.div>

      {/* Project info */}
      <motion.div
        className="flex flex-col gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollStagger}
      >
        {/* Number + label */}
        <motion.p
          variants={scrollReveal}
          className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-primary"
        >
          {String(index + 1).padStart(2, "0")} — Project
        </motion.p>

        {/* Title */}
        <motion.h2
          variants={scrollReveal}
          className="font-display text-ghost-white text-3xl italic leading-[1.1] md:text-5xl lg:text-6xl"
        >
          {project.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={scrollReveal}
          className="font-body max-w-xl text-lg text-white/40"
        >
          {project.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={scrollReveal}
          className="font-body max-w-2xl text-base leading-relaxed text-white/60"
        >
          {project.description}
        </motion.p>

        {/* Metadata row */}
        {(project.role || project.year || project.client) && (
          <motion.div
            variants={scrollReveal}
            className="flex flex-wrap gap-x-12 gap-y-4 pt-2"
          >
            {project.role && <MetaField label="Role" value={project.role} />}
            {project.year && <MetaField label="Year" value={project.year} />}
            {project.client && (
              <MetaField label="Client" value={project.client} />
            )}
          </motion.div>
        )}

        {/* Tech badges */}
        <motion.div
          variants={scrollReveal}
          className="flex flex-wrap gap-2 pt-2"
        >
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-white/10 text-xs text-white/40"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>

        {/* Action links */}
        <motion.div
          variants={scrollReveal}
          className="flex items-center gap-6 pt-4"
        >
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            className="group inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-primary"
          >
            View Details
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
            >
              Live Site
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
            >
              <GithubIcon className="size-4" />
              Source
            </a>
          )}
        </motion.div>
      </motion.div>

      {/* Divider (except last) */}
      {!isLast && (
        <div className="mt-auto pt-8">
          <div className="h-px w-full bg-linear-to-r from-white/5 via-white/10 to-white/5" />
        </div>
      )}
    </section>
  )
})
