import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { Home, LayoutGrid, User, Mail } from "lucide-react"
import { navSlideDown } from "@/lib/variants"

const navItems = [
  { to: "/" as const, label: "Home", icon: Home },
  { to: "/work" as const, label: "Work", icon: LayoutGrid },
  { to: "/about" as const, label: "About", icon: User },
  { to: "/contact" as const, label: "Contact", icon: Mail },
]

export function FloatingNav() {
  return (
    <motion.div
      className="fixed top-8 w-full z-50 flex justify-center px-4"
      variants={navSlideDown}
      initial="hidden"
      animate="visible"
    >
      <nav className="glass-nav flex items-center gap-1 px-2 py-2 rounded-full shadow-2xl shadow-black/20">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium [&.active]:text-white [&.active]:bg-white/10"
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </Link>
        ))}
      </nav>
    </motion.div>
  )
}
