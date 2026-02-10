import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ChevronDown } from "lucide-react"

export function HeroViewport() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Name transforms
  const nameOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const nameScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9])
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Tagline transforms
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const taglineY = useTransform(scrollYProgress, [0, 0.5], [0, -40])

  // Scroll indicator
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative z-10 flex h-screen min-h-[600px] flex-col justify-end px-6 pb-[12vh] md:px-12 lg:px-20 max-md:items-center max-md:pb-[16vh]"
    >
      {/* Name */}
      <motion.div
        style={{ opacity: nameOpacity, scale: nameScale, y: nameY }}
        className="origin-bottom-left max-md:origin-bottom"
      >
        <motion.h1
          className="font-display text-ghost-white text-[clamp(3.5rem,15vw,20rem)] italic leading-[0.85] tracking-tight max-md:text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
            delay: 0.4,
          }}
        >
          Haithem
        </motion.h1>
      </motion.div>

      {/* Tagline */}
      <motion.div style={{ opacity: taglineOpacity, y: taglineY }}>
        <motion.p
          className="font-mono-label mt-4 text-xs uppercase tracking-[0.2em] text-white/40 md:mt-6 md:text-sm max-md:text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
        >
          fullstack developer — react · node · rust
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="size-5 text-white/20" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
