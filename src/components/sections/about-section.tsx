import { motion } from "motion/react"
import { staggerContainer, fadeInUp, slideInLeft } from "@/lib/variants"
import { Badge } from "@/components/ui/badge"
import ProfileCard from "@/components/ProfileCard"
import { AboutStats } from "./about-stats"
import { AboutTech } from "./about-tech"

export function AboutSection() {
  return (
    <motion.div
      className="w-full max-w-[1100px]"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Portrait card */}
        <motion.div
          variants={slideInLeft}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <ProfileCard
            avatarUrl="/Logo.png"
            name="Haithem"
            title="Fullstack Developer"
            handle="haithem"
            showUserInfo
            behindGlowColor="rgba(127, 19, 236, 0.5)"
            innerGradient="linear-gradient(145deg, #2a1b36cc 0%, #7f13ec33 100%)"
          />
        </motion.div>

        {/* Content */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <motion.div variants={fadeInUp} className="inline-flex">
            <Badge
              variant="outline"
              className="px-3 py-1 border-primary/30 text-primary text-xs font-bold uppercase tracking-wider"
            >
              Introduction
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.9]"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Me
            </span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="space-y-4 text-gray-300 text-lg leading-relaxed max-w-2xl"
          >
            <p>
              I'm Haithem, a fullstack developer with 4 years of experience
              delivering complete web solutions. From marketing sites and
              portfolios to ecommerce platforms, internal business tools, and
              scalable backend systems.
            </p>
            <p>
              I work across the full development lifecycle: UI/UX
              implementation, API design, database architecture, and deployment.
              Whether the project calls for a monolith or microservices, I build
              what fits.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <AboutStats />
          </motion.div>

          <AboutTech />
        </div>
      </div>
    </motion.div>
  )
}
