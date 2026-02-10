import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { motion, AnimatePresence } from "motion/react"
import { Home, LayoutGrid, User, Mail } from "lucide-react"

const navItems = [
  { icon: Home, to: "/" as const },
  { icon: LayoutGrid, to: "/work" as const },
  { icon: User, to: "/about" as const },
  { icon: Mail, to: "/contact" as const },
]

export function FloatingNav() {
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState<Record<string, string>>({})
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateIndicatorPosition = useCallback(() => {
    if (navContainerRef.current && navItemRefs.current[activeIndex]) {
      const container = navContainerRef.current
      const activeItem = navItemRefs.current[activeIndex]!

      const containerRect = container.getBoundingClientRect()
      const activeItemRect = activeItem.getBoundingClientRect()

      const left = activeItemRect.left - containerRect.left
      const top = activeItemRect.top - containerRect.top

      setIndicatorStyle({
        left: `${left}px`,
        top: `${top}px`,
        width: `${activeItemRect.width}px`,
        height: `${activeItemRect.height}px`,
      })
    }
  }, [activeIndex])

  const debouncedUpdate = useCallback(() => {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current)
    updateTimeoutRef.current = setTimeout(() => updateIndicatorPosition(), 100)
  }, [updateIndicatorPosition])

  const immediateUpdate = useCallback(() => {
    for (const delay of [0, 50, 150, 300]) {
      setTimeout(() => updateIndicatorPosition(), delay)
    }
  }, [updateIndicatorPosition])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Route sync
  useEffect(() => {
    const path = location.pathname
    if (path.startsWith("/work")) {
      const idx = navItems.findIndex((item) => item.to === "/work")
      setActiveIndex(idx >= 0 ? idx : 0)
      return
    }
    const index = navItems.findIndex((item) => item.to === path)
    setActiveIndex(index >= 0 ? index : 0)
  }, [location.pathname])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)
        immediateUpdate()
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolled, immediateUpdate])

  // Update indicator on activeIndex change
  useEffect(() => {
    immediateUpdate()
  }, [activeIndex, immediateUpdate])

  // Update on resize
  useEffect(() => {
    const handleResize = () => debouncedUpdate()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [debouncedUpdate])

  // MutationObserver for DOM changes during animations
  useEffect(() => {
    if (!navContainerRef.current) return
    const observer = new MutationObserver(() => debouncedUpdate())
    observer.observe(navContainerRef.current, {
      attributes: true,
      attributeFilter: ["style", "class"],
      subtree: true,
    })
    return () => observer.disconnect()
  }, [debouncedUpdate])

  // ResizeObserver for nav item size changes
  useEffect(() => {
    if (!window.ResizeObserver || navItemRefs.current.length === 0) return
    const observer = new ResizeObserver(() => debouncedUpdate())
    navItemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [debouncedUpdate, activeIndex])

  // Cleanup
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current)
    }
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-auto w-full max-w-[100vw] z-1000 py-4"
      initial={false}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-[1fr_1fr_1fr] max-w-[100vw] items-center px-4 md:grid-cols-[1fr_1fr_1fr] max-md:flex max-md:flex-col max-md:pointer-events-none">
        {/* Logo */}
        <div className="z-1000">
          <Link to="/">
            <h1 className="font-holland text-ghost-white text-[2.5rem] font-normal m-0 leading-none select-none max-md:text-[3rem]">
              Haithem
            </h1>
          </Link>
        </div>

        {/* Nav */}
        <motion.nav
          className="relative top-2.5 flex items-center justify-center mx-auto w-full -left-[1.35%] max-md:fixed max-md:bottom-0 max-md:left-0 max-md:top-auto max-md:w-screen"
          initial={{
            opacity: 0,
            translateY: isMobile ? "100%" : "-100%",
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            duration: 0.6,
            spring: { stiffness: 200 },
            delay: 0.6,
          }}
        >
          <motion.div
            ref={navContainerRef}
            className="relative flex rounded-[50px] border-t border-l border-white/10 shadow-[rgba(0,0,0,0.5)_0px_8px_24px_0px] max-md:flex-row max-md:justify-evenly max-md:w-full max-md:mx-auto max-md:mb-[10%] max-md:pointer-events-none"
            initial={false}
            animate={{
              padding: isScrolled ? "0.4rem" : "0.5rem",
              backdropFilter: isScrolled ? "blur(30px)" : "blur(0px)",
              backgroundColor: isScrolled
                ? "rgba(30, 32, 25, 1.0)"
                : "rgba(30, 32, 25, 0.5)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onAnimationComplete={() => updateIndicatorPosition()}
          >
            {/* Active indicator */}
            <AnimatePresence>
              <motion.div
                layoutId="indicator"
                className="absolute rounded-full bg-palatinate z-1"
                initial={false}
                animate={indicatorStyle}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </AnimatePresence>

            {/* Nav items */}
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                ref={(el) => { navItemRefs.current[index] = el }}
                initial={false}
                animate={{
                  margin: isScrolled ? "0 0.4rem" : "0 0.75rem",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  if (index === activeIndex) updateIndicatorPosition()
                }}
              >
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setActiveIndex(index)}
                  className={`relative z-2 flex items-center justify-center p-3.5 rounded-full transition-colors duration-200 max-md:p-3 max-sm:p-2.5 max-md:pointer-events-auto ${
                    activeIndex === index
                      ? "text-white"
                      : "text-ghost-white"
                  }`}
                >
                  <item.icon size={20} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.nav>

        {/* Empty right column for grid balance */}
        <div className="max-md:hidden" />
      </div>
    </motion.header>
  )
}
