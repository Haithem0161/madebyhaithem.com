import { useState } from "react"
import { motion } from "motion/react"
import { Expand } from "lucide-react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { getMediaUrl } from "@/lib/api"
import type { Project } from "@/lib/projects"

type GalleryItem = { id: string; alt: string; caption?: string }

export function ProjectGallery({ project }: { project: Project }) {
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null)

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
            <motion.div
              key={i}
              variants={cinematicReveal}
              className="group cursor-pointer"
              onClick={() => item.id && setLightboxImage(item)}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5 transition-all duration-500 group-hover:border-white/10 group-hover:shadow-lg group-hover:shadow-primary/5">
                {item.id ? (
                  <>
                    <img
                      src={getMediaUrl(item.id, {
                        w: 1200,
                        h: 750,
                        fit: "cover",
                        format: "webp",
                        quality: 85,
                      })}
                      alt={item.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay with expand hint */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background-dark/0 transition-colors duration-500 group-hover:bg-background-dark/30">
                      <div className="scale-75 rounded-full border border-white/20 bg-white/10 p-3 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <Expand className="size-5 text-white" />
                      </div>
                    </div>
                  </>
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
                <p className="mt-3 font-mono-label text-[10px] uppercase tracking-[0.15em] text-white/30 transition-colors group-hover:text-white/50">
                  {item.caption}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox — only mounted when active to avoid idle portal + event listeners */}
      {lightboxImage && (
        <Dialog
          open
          onOpenChange={(open) => { if (!open) setLightboxImage(null) }}
        >
          <DialogContent className="max-w-5xl border-white/5 bg-background-dark/95 p-2 backdrop-blur-xl">
            <DialogTitle className="sr-only">
              {lightboxImage.alt}
            </DialogTitle>
            <div>
              <img
                src={getMediaUrl(lightboxImage.id, {
                  w: 1920,
                  h: 1200,
                  fit: "contain",
                  format: "webp",
                  quality: 90,
                })}
                alt={lightboxImage.alt}
                className="w-full rounded-lg"
              />
              {lightboxImage.caption && (
                <p className="mt-3 text-center font-mono-label text-xs text-white/40">
                  {lightboxImage.caption}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.section>
  )
}
