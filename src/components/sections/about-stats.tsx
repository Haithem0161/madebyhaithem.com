import { motion } from "motion/react"
import { Clock, Rocket, SmilePlus } from "lucide-react"
import { scaleIn } from "@/lib/variants"

const stats = [
  { icon: Clock, value: "5+", label: "Years Experience" },
  { icon: Rocket, value: "20+", label: "Projects Shipped" },
  { icon: SmilePlus, value: "100%", label: "Client Satisfaction" },
]

export function AboutStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={scaleIn}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="group relative overflow-hidden rounded-xl bg-[#2a1b36]/40 border border-white/5 p-5 transition-all hover:bg-[#2a1b36]/60 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(127,19,236,0.15)] backdrop-blur-sm"
        >
          <div className="absolute -right-4 -top-4 size-20 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all" />
          <div className="relative flex flex-col gap-1">
            <div className="mb-2 text-primary">
              <stat.icon className="size-6" />
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              {stat.value}
            </h3>
            <p className="text-sm font-medium text-gray-400">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
