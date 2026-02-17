import { motion } from "motion/react"
import { fadeInUp } from "@/lib/variants"
import {
  NodejsIcon,
  ReactIcon,
  TypescriptIcon,
  NestjsIcon,
  RustIcon,
  PostgresqlIcon,
  PrismaIcon,
} from "@/components/icons"

const techIcons = [
  { icon: ReactIcon, label: "React" },
  { icon: TypescriptIcon, label: "TypeScript" },
  { icon: NodejsIcon, label: "Node.js" },
  { icon: NestjsIcon, label: "NestJS" },
  { icon: RustIcon, label: "Rust" },
  { icon: PostgresqlIcon, label: "PostgreSQL" },
  { icon: PrismaIcon, label: "Prisma" },
]

export function AboutTech() {
  return (
    <motion.div variants={fadeInUp} className="mt-4 pt-6 border-t border-white/5">
      <p className="text-xs font-semibold uppercase text-gray-500 mb-4 tracking-widest">
        Core Technologies
      </p>
      <div className="flex flex-wrap gap-4">
        {techIcons.map((tech) => (
          <motion.div
            key={tech.label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 cursor-default hover:bg-white/10 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <tech.icon className="size-4" />
            <span className="text-xs font-medium text-gray-300">
              {tech.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
