import { useState, useEffect, type RefObject } from "react"

export function useActiveSection(
  refs: RefObject<HTMLElement | null>[],
  options?: { threshold?: number; rootMargin?: string },
): number {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = refs.findIndex(
              (ref) => ref.current === entry.target,
            )
            if (index !== -1) setActiveIndex(index)
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.35,
        // Bias detection toward upper viewport — section is "active" when
        // its top region enters roughly the upper half of the screen
        rootMargin: options?.rootMargin ?? "-10% 0px -40% 0px",
      },
    )

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [refs, options?.threshold, options?.rootMargin])

  return activeIndex
}
