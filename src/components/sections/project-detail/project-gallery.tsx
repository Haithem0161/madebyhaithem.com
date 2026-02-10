import { motion } from "motion/react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import { getMediaUrl } from "@/lib/api"
import type { Project } from "@/lib/projects"

export function ProjectGallery({ project }: { project: Project }) {
  if (!project.gallery?.length) return null

  return (
    <motion.section
      className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={cinematicStagger}
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={cinematicReveal}
          className="font-mono-label mb-4 text-[10px] uppercase tracking-[0.2em] text-primary"
        >
          Gallery
        </motion.p>

        <motion.h2
          variants={cinematicReveal}
          className="font-display text-ghost-white mb-12 text-3xl italic leading-[1.1] md:mb-16 md:text-5xl"
        >
          A closer look.
        </motion.h2>

        <div className="flex flex-col gap-8">
          {project.gallery.map((item, i) => (
            <motion.div key={i} variants={cinematicReveal}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5">
                {item.id ? (
                  <img
                    src={getMediaUrl(item.id, {
                      w: 1200,
                      h: 750,
                      fit: "cover",
                      format: "webp",
                      quality: 85,
                    })}
                    alt={item.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${project.gradient}`}
                    />
                    <div className="circuit-bg absolute inset-0 opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono-label text-xs uppercase tracking-[0.3em] text-white/20">
                        {item.alt}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Caption */}
              {item.caption && (
                <p className="mt-3 font-mono-label text-[10px] uppercase tracking-[0.15em] text-white/30">
                  {item.caption}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
