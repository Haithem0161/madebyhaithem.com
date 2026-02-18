import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { projectsQueryOptions } from "@/lib/queries"
import { getMediaUrl } from "@/lib/api"
import { useAnalytics } from "@/lib/hooks/use-analytics"
import type { Project } from "@/lib/projects"

function WorkGridCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const { trackEvent } = useAnalytics()
  const thumbnail = project.images?.[0]

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="block"
      onClick={() => trackEvent("click", "project_card", project.slug)}
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.45,
          delay: index * 0.05,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="group relative flex h-[440px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-white/5"
      >
        {/* Image / Gradient area */}
        <div className="relative h-[55%] shrink-0 overflow-hidden">
          {thumbnail ? (
            <>
              <img
                src={getMediaUrl(thumbnail.id, {
                  w: 800,
                  h: 500,
                  fit: "cover",
                  format: "webp",
                  quality: 80,
                })}
                alt={thumbnail.alt ?? project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Bottom gradient for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />
            </>
          ) : (
            <img
              src="/placeholder.webp"
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Index chip */}
          <span className="absolute left-4 top-4 font-mono-label text-[10px] uppercase tracking-widest text-white/30">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Hover arrow */}
          <ArrowUpRight className="absolute right-4 top-4 size-4 text-white/0 transition-all duration-300 group-hover:text-white/60" />
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1 text-lg font-bold leading-snug text-white">
            {project.title}
          </h3>

          {project.subtitle && (
            <p className="mb-2 text-xs font-medium text-primary/70">
              {project.subtitle}
            </p>
          )}

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/40">
            {project.description}
          </p>

          {/* Meta row */}
          {(project.year || project.role) && (
            <p className="mb-3 font-mono-label text-[10px] uppercase tracking-[0.12em] text-white/25">
              {[project.year, project.role].filter(Boolean).join(" · ")}
            </p>
          )}

          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-white/8 bg-white/3 px-2 py-0.5 text-[10px] text-white/35"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge
                variant="outline"
                className="border-white/8 bg-white/3 px-2 py-0.5 text-[10px] text-white/25"
              >
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

export function WorkGrid() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions)

  if (projects.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {projects.map((project, index) => (
        <WorkGridCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  )
}
