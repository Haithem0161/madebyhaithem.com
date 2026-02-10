import { motion } from "motion/react"
import { Code2, Globe, Palette, Database, Cloud } from "lucide-react"
import { fadeInUp } from "@/lib/variants"
import { Separator } from "@/components/ui/separator"

const techIcons = [
  { icon: Code2, label: "JavaScript" },
  { icon: Globe, label: "Web" },
  { icon: Palette, label: "CSS" },
  { icon: Database, label: "Database" },
  { icon: Cloud, label: "Cloud" },
]

export function TechStack() {
  return (
    <motion.div variants={fadeInUp} className="mt-16 pt-8 w-full max-w-lg">
      <Separator className="mb-8 bg-white/5" />
      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">
        Tech Stack
      </p>
      <div className="flex justify-center gap-8 text-white/30">
        {techIcons.map((tech) => (
          <motion.div
            key={tech.label}
            className="flex flex-col items-center gap-2 cursor-default"
            whileHover={{ color: "rgba(255,255,255,1)", scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <tech.icon className="size-8" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
