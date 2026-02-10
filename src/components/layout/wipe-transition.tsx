import {
  useRef,
  useCallback,
  useLayoutEffect,
  useReducer,
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

  const [wipeState, dispatch] = useReducer(
    (_: { progress: number; isAnimating: boolean }, action: { type: "start" } | { type: "tick"; progress: number } | { type: "reset" }) => {
      switch (action.type) {
        case "start": return { progress: 0, isAnimating: true }
        case "tick": return { progress: action.progress, isAnimating: true }
        case "reset": return { progress: 0, isAnimating: false }
      }
    },
    { progress: 0, isAnimating: false },
  )

  const contentRef = useRef<HTMLDivElement>(null)
  const snapshotContainerRef = useRef<HTMLDivElement>(null)
  const animatingRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const prevPathRef = useRef(location.pathname)

  const cleanupSnapshot = useCallback(() => {
    if (snapshotContainerRef.current) {
      snapshotContainerRef.current.innerHTML = ""
    }
    dispatch({ type: "reset" })
    animatingRef.current = false
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
    dispatch({ type: "start" })

    const start = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      dispatch({ type: "tick", progress: easeInOutCubic(t) })

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

  const isActive = wipeState.isAnimating
  const wipePos = wipeState.progress * 100
  const blur = Math.sin(wipeState.progress * Math.PI) * 28

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: isActive ? "hidden" : undefined,
      }}
    >
      {/* Snapshot container — old page sits here during transition */}
      <div
        ref={snapshotContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          filter: isActive ? `blur(${blur * 0.3}px)` : "none",
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
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `calc(${wipePos}% - ${BLUR_BAND}px)`,
              width: BLUR_BAND,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: "linear-gradient(to right, transparent, black)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black)",
              willChange: "left, backdrop-filter",
            }}
          />
        </div>
      )}

      {/* New page (current Outlet) — clipped during transition */}
      <div
        ref={contentRef}
        style={{
          position: isActive ? "absolute" : "relative",
          inset: isActive ? 0 : undefined,
          clipPath: isActive ? `inset(0 ${100 - wipePos}% 0 0)` : "none",
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
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `calc(${wipePos}%)`,
              width: BLUR_BAND,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
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
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${wipePos}%`,
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
            style={{
              position: "absolute",
              top: `${20 + Math.sin(wipeState.progress * Math.PI * 3) * 8}%`,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: LINE_COLOR,
              opacity: blur / 28,
              boxShadow: `0 0 12px 4px ${LINE_COLOR}`,
            }}
          />
          {/* Bottom floating dot */}
          <div
            style={{
              position: "absolute",
              top: `${80 - Math.sin(wipeState.progress * Math.PI * 2.5) * 8}%`,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: LINE_COLOR,
              opacity: blur / 28,
              boxShadow: `0 0 12px 4px ${LINE_COLOR}`,
            }}
          />
        </div>
      )}
    </div>
  )
}
