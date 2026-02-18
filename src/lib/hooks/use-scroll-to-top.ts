import { useEffect } from "react"
import { useLocation } from "@tanstack/react-router"
import { useLenis } from "lenis/react"

export function useScrollToTop() {
  const lenis = useLenis()
  const { pathname } = useLocation()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])
}
