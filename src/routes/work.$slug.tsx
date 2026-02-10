import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
  projectsQueryOptions,
  projectDetailQueryOptions,
} from "@/lib/queries"
import {
  ProjectHero,
  ProjectOverview,
  ProjectFeatures,
  ProjectMetrics,
  ProjectTechStack,
  ProjectGallery,
  ProjectNav,
} from "@/components/sections/project-detail"

function ProjectDetailPage() {
  const { slug } = Route.useParams()
  const { data: project } = useSuspenseQuery(projectDetailQueryOptions(slug))
  const { data: allProjects } = useSuspenseQuery(projectsQueryOptions)
  const projectIndex = allProjects.findIndex((p) => p.slug === project.slug)

  return (
    <div className="relative">
      {/* Hero — full viewport with parallax */}
      <ProjectHero project={project} index={projectIndex} />

      {/* Gradient transition from hero to content */}
      <div className="relative z-20 h-32 bg-linear-to-b from-transparent to-background-dark" />

      {/* Content sections */}
      <div className="relative z-20 bg-background-dark">
        <ProjectOverview project={project} />
        <ProjectFeatures project={project} />
        <ProjectMetrics project={project} />
        <ProjectTechStack project={project} />
        <ProjectGallery project={project} />
        <ProjectNav currentSlug={project.slug} projects={allProjects} />
      </div>
    </div>
  )
}

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params, context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(
        projectDetailQueryOptions(params.slug),
      ),
      context.queryClient.ensureQueryData(projectsQueryOptions),
    ])
  },
  component: ProjectDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="font-mono-label text-sm uppercase tracking-[0.2em] text-white/40">
        Project not found
      </p>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="font-mono-label text-sm uppercase tracking-[0.2em] text-white/40">
        Project not found
      </p>
    </div>
  ),
})
