import {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react"
import { Outlet, useLocation } from "@tanstack/react-router"
import { Footer } from "./footer"

const DURATION = 800
const BLUR_BAND = 120
const LINE_COLOR = "#7f13ec" // matches theme primary purple

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function WipeTransition() {
  const location = useLocation()

  // Only React state: whether the wipe overlay is visible.
  // All per-frame values are written directly to the DOM via refs
  // to avoid re-rendering the entire component tree (including Outlet) at 60fps.
  const [isActive, setIsActive] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const snapshotContainerRef = useRef<HTMLDivElement>(null)
  const blurBandOldRef = useRef<HTMLDivElement>(null)
  const blurBandNewRef = useRef<HTMLDivElement>(null)
  const sweepLineRef = useRef<HTMLDivElement>(null)
  const topDotRef = useRef<HTMLDivElement>(null)
  const bottomDotRef = useRef<HTMLDivElement>(null)

  const animatingRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const prevPathRef = useRef(location.pathname)

  const cleanupSnapshot = useCallback(() => {
    if (snapshotContainerRef.current) {
      snapshotContainerRef.current.innerHTML = ""
      snapshotContainerRef.current.style.filter = "none"
    }
    if (contentRef.current) {
      contentRef.current.style.clipPath = "none"
    }
    animatingRef.current = false
    setIsActive(false)
  }, [])

  // Capture DOM snapshot + start animation on pathname change.
  // With code splitting disabled, routes resolve synchronously —
  // useLayoutEffect fires before paint, so the old DOM is still in contentRef.
  useLayoutEffect(() => {
    if (location.pathname === prevPathRef.current) return
    if (animatingRef.current) {
      prevPathRef.current = location.pathname
      return
    }

    // Clone the current (old) page content before React paints the new route
    if (contentRef.current && snapshotContainerRef.current) {
      const clone = contentRef.current.cloneNode(true) as HTMLDivElement
      clone.style.position = "absolute"
      clone.style.inset = "0"
      clone.style.zIndex = "0"
      clone.style.pointerEvents = "none"
      snapshotContainerRef.current.innerHTML = ""
      snapshotContainerRef.current.appendChild(clone)
    }

    prevPathRef.current = location.pathname
    animatingRef.current = true
    setIsActive(true)

    const start = performance.now()

    // Direct DOM manipulation per frame — zero React re-renders during animation
    const animate = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      const progress = easeInOutCubic(t)
      const wipePos = progress * 100
      const blur = Math.sin(progress * Math.PI) * 28

      // Snapshot blur
      if (snapshotContainerRef.current) {
        snapshotContainerRef.current.style.filter = `blur(${blur * 0.3}px)`
      }

      // Blur band on old page side
      if (blurBandOldRef.current) {
        blurBandOldRef.current.style.left = `calc(${wipePos}% - ${BLUR_BAND}px)`
        blurBandOldRef.current.style.backdropFilter = `blur(${blur}px)`
        ;(blurBandOldRef.current.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = `blur(${blur}px)`
      }

      // Content clip
      if (contentRef.current) {
        contentRef.current.style.clipPath = `inset(0 ${100 - wipePos}% 0 0)`
      }

      // Blur band on new page side
      if (blurBandNewRef.current) {
        blurBandNewRef.current.style.left = `${wipePos}%`
        blurBandNewRef.current.style.backdropFilter = `blur(${blur}px)`
        ;(blurBandNewRef.current.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = `blur(${blur}px)`
      }

      // Sweep line
      if (sweepLineRef.current) {
        sweepLineRef.current.style.left = `${wipePos}%`
      }

      // Floating dots
      if (topDotRef.current) {
        topDotRef.current.style.top = `${20 + Math.sin(progress * Math.PI * 3) * 8}%`
        topDotRef.current.style.opacity = String(blur / 28)
      }
      if (bottomDotRef.current) {
        bottomDotRef.current.style.top = `${80 - Math.sin(progress * Math.PI * 2.5) * 8}%`
        bottomDotRef.current.style.opacity = String(blur / 28)
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        cleanupSnapshot()
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [location.pathname, cleanupSnapshot])

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: isActive ? "hidden" : undefined,
      }}
    >
      {/* Snapshot container, old page sits here during transition */}
      <div
        ref={snapshotContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          willChange: isActive ? "filter" : "auto",
          pointerEvents: "none",
        }}
      />

      {/* Blur band on old page side */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            ref={blurBandOldRef}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: BLUR_BAND,
              maskImage: "linear-gradient(to right, transparent, black)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black)",
              willChange: "left, backdrop-filter",
            }}
          />
        </div>
      )}

      {/* New page (current Outlet), clipped during transition */}
      <div
        ref={contentRef}
        style={{
          position: isActive ? "absolute" : "relative",
          inset: isActive ? 0 : undefined,
          zIndex: 2,
          willChange: isActive ? "clip-path" : "auto",
          minHeight: "100vh",
        }}
      >
        <Outlet />
        <Footer />

        {/* Blur band on new page side */}
        {isActive && (
          <div
            ref={blurBandNewRef}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: BLUR_BAND,
              maskImage: "linear-gradient(to left, transparent, black)",
              WebkitMaskImage: "linear-gradient(to left, transparent, black)",
              zIndex: 1,
              pointerEvents: "none",
              willChange: "left, backdrop-filter",
            }}
          />
        )}
      </div>

      {/* Sweeping line */}
      {isActive && (
        <div
          ref={sweepLineRef}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 2,
            background: LINE_COLOR,
            zIndex: 4,
            transform: "translateX(-50%)",
            willChange: "left",
            boxShadow: `
              0 0 40px 12px ${LINE_COLOR}70,
              0 0 100px 30px ${LINE_COLOR}30,
              0 0 160px 50px ${LINE_COLOR}15
            `,
          }}
        >
          {/* Center dot */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: LINE_COLOR,
              boxShadow: `0 0 24px 8px ${LINE_COLOR}`,
            }}
          />
          {/* Top floating dot */}
          <div
            ref={topDotRef}
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: LINE_COLOR,
              opacity: 0,
              boxShadow: `0 0 12px 4px ${LINE_COLOR}`,
            }}
          />
          {/* Bottom floating dot */}
          <div
            ref={bottomDotRef}
            style={{
              position: "absolute",
              top: "80%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: LINE_COLOR,
              opacity: 0,
              boxShadow: `0 0 12px 4px ${LINE_COLOR}`,
            }}
          />
        </div>
      )}
    </div>
  )
}
