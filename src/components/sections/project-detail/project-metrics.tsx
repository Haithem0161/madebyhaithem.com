import { useRef, useEffect } from "react"
import { motion, useInView, useSpring, useTransform } from "motion/react"
import { cinematicStagger, cinematicReveal } from "@/lib/variants"
import type { Project } from "@/lib/projects"

function parseMetricValue(value: string) {
  const match = value.match(/^([^0-9]*)([0-9]+\.?[0-9]*)(.*)$/)
  if (!match) return { prefix: "", num: 0, suffix: value, decimals: 0, hasNum: false }
  const numStr = match[2]
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0
  return {
    prefix: match[1],
    num: parseFloat(numStr),
    suffix: match[3],
    decimals,
    hasNum: true,
  }
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const { prefix, num, suffix, decimals, hasNum } = parseMetricValue(value)

  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.01,
  })

  useEffect(() => {
    if (isInView) springValue.set(num)
  }, [isInView, num, springValue])

  const display = useTransform(springValue, (current) => {
    if (!hasNum) return value
    const formatted =
      decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString()
    return `${prefix}${formatted}${suffix}`
  })

  if (!hasNum) return <span ref={ref}>{value}</span>

  return <motion.span ref={ref}>{display}</motion.span>
}

export function ProjectMetrics({ project }: { project: Project }) {
  if (!project.metrics?.length) return null

  return (
    <motion.section
      className="bg-linear-to-r from-primary/5 via-transparent to-secondary-purple/5 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cinematicStagger}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-12 md:justify-between md:gap-8">
        {project.metrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={cinematicReveal}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="font-display text-5xl italic text-ghost-white md:text-7xl">
              <AnimatedValue value={metric.value} />
            </span>
            {/* Gradient underline */}
            <div className="mt-1 h-0.5 w-12 rounded-full bg-linear-to-r from-primary/0 via-primary/40 to-primary/0" />
            <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] text-white/40">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
