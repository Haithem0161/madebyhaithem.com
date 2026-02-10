import { motion } from "motion/react"
import { fadeInUp } from "@/lib/variants"
import { Separator } from "@/components/ui/separator"
import { NodejsIcon, ReactIcon, RustIcon, PostgresqlIcon, PrismaIcon } from "@/components/icons"

const techIcons = [
  { icon: NodejsIcon, label: "Node.js" },
  { icon: ReactIcon, label: "React" },
  { icon: RustIcon, label: "Rust" },
  { icon: PostgresqlIcon, label: "PostgreSQL" },
  { icon: PrismaIcon, label: "Prisma" },
]

export function TechStack() {
  return (
    <motion.div variants={fadeInUp} className="mt-16 pt-8 w-full max-w-lg">
      <Separator className="mb-8 bg-white/5" />
      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">
        Tech Stack
      </p>
      <div className="flex justify-center gap-8">
        {techIcons.map((tech) => (
          <motion.div
            key={tech.label}
            className="flex flex-col items-center gap-2 cursor-default opacity-40 hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <tech.icon className="size-8" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
