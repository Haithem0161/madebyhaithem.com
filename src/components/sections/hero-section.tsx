import { motion } from "motion/react"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/variants"
import { TechStack } from "./tech-stack"

export function HeroSection() {
  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center max-w-4xl w-full gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >

      {/* Typography */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-4">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
          Haithem
          <span className="block text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 mt-2">
            Fullstack Developer
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed font-light mt-4">
          Building scalable web applications with pixel-perfect precision.
          Bridging the gap between engineering and design.
        </p>
      </motion.div>

      {/* CTA Actions */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
      >
        <Button
          asChild
          size="lg"
          className="group relative h-14 px-8 rounded-full bg-primary text-white text-base font-bold tracking-wide shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto overflow-hidden"
        >
          <Link to="/work">
            <span>See My Work</span>
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-14 px-8 rounded-full bg-white/5 text-white border-white/10 text-base font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200 w-full sm:w-auto"
        >
          <span>Download CV</span>
          <Download className="size-5" />
        </Button>
      </motion.div>

      {/* Tech Stack */}
      <TechStack />
    </motion.div>
  )
}
