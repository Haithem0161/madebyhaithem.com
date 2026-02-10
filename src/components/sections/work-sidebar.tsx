import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/projects"

export function DesktopSidebar({
  projects,
  activeIndex,
  onNavigate,
}: {
  projects: Project[]
  activeIndex: number
  onNavigate: (index: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [barStyle, setBarStyle] = useState({ y: 0, height: 0 })

  const updateBar = useCallback(() => {
    const btn = buttonRefs.current[activeIndex]
    const container = containerRef.current
    if (!btn || !container) return

    const containerRect = container.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()

    setBarStyle({
      y: btnRect.top - containerRect.top,
      height: btnRect.height,
    })
  }, [activeIndex])

  useEffect(() => {
    updateBar()
  }, [updateBar])

  return (
    <aside className="sticky top-28 hidden h-fit w-56 shrink-0 self-start lg:block">
      <div ref={containerRef} className="relative">
        {/* Animated accent bar */}
        <motion.div
          className="absolute left-0 w-0.5 rounded-full bg-primary"
          animate={{ y: barStyle.y, height: barStyle.height }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {projects.map((project, i) => (
          <button
            key={project.slug}
            ref={(el) => { buttonRefs.current[i] = el }}
            type="button"
            onClick={() => onNavigate(i)}
            className={cn(
              "block w-full cursor-pointer py-4 pl-5 pr-2 text-left transition-colors duration-300",
              activeIndex === i
                ? "text-white"
                : "text-white/30 hover:text-white/50",
            )}
          >
            <span className="font-mono-label block text-[10px] uppercase tracking-[0.2em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-body mt-1 block text-sm">
              {project.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export function MobileSidebar({
  projects,
  activeIndex,
  onNavigate,
}: {
  projects: Project[]
  activeIndex: number
  onNavigate: (index: number) => void
}) {
  return (
    <div className="sticky top-20 z-30 -mx-6 border-b border-white/5 bg-background-dark/80 backdrop-blur-md md:-mx-12 lg:hidden">
      <div className="flex gap-2 overflow-x-auto px-6 py-3 md:px-12">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => onNavigate(i)}
            className={cn(
              "shrink-0 cursor-pointer rounded-full border px-4 py-1.5 font-mono-label text-[10px] uppercase tracking-[0.15em] transition-all duration-300",
              activeIndex === i
                ? "border-primary/30 bg-primary/15 text-primary"
                : "border-white/10 text-white/30 hover:text-white/50",
            )}
          >
            {String(i + 1).padStart(2, "0")} {project.title}
          </button>
        ))}
      </div>
    </div>
  )
}
