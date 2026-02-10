import { motion } from "motion/react"

export function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Large purple orb — top left */}
      <motion.div
        className="floating-shape w-[500px] h-[500px] bg-primary/30 top-[-100px] left-[-100px]"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Dark accent orb — bottom right */}
      <motion.div
        className="floating-shape w-[600px] h-[600px] bg-secondary-purple/20 bottom-[-150px] right-[-100px]"
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Central subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px]" />
      {/* 3D Abstract background image */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        aria-hidden="true"
      />
    </div>
  )
}
