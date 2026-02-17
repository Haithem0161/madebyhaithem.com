import { createRef, useMemo } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useActiveSection } from "@/lib/hooks/use-active-section"
import { projectsQueryOptions } from "@/lib/queries"
import { EmptyState } from "@/components/ui/empty-state"
import { DesktopSidebar, MobileSidebar } from "./work-sidebar"
import { WorkProjectSection } from "./work-project-section"

export function WorkShowcase() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions)

  const sectionRefs = useMemo(
    () => projects.map(() => createRef<HTMLElement>()),
    [projects],
  )

  const activeIndex = useActiveSection(sectionRefs, {
    threshold: 0.35,
    rootMargin: "-10% 0px -40% 0px",
  })

  const scrollToSection = (index: number) => {
    sectionRefs[index]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  if (projects.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="relative">
      {/* Mobile, sticky horizontal strip (outside flex to allow full-width breakout) */}
      <MobileSidebar
        projects={projects}
        activeIndex={activeIndex}
        onNavigate={scrollToSection}
      />

      {/* Desktop, sidebar + content in flex row */}
      <div className="flex gap-8 lg:gap-16">
        <DesktopSidebar
          projects={projects}
          activeIndex={activeIndex}
          onNavigate={scrollToSection}
        />

        {/* Project sections */}
        <div className="min-w-0 flex-1">
          {projects.map((project, index) => (
            <WorkProjectSection
              key={project.slug}
              ref={sectionRefs[index]}
              project={project}
              index={index}
              isLast={index === projects.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
