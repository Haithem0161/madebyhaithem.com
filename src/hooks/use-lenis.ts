"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function smoothScrollTo(target: string | number | HTMLElement, offset = 0) {
  const lenis = lenisInstance;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  // Fallbacks for reduced-motion / touch
  if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target + offset, behavior: "smooth" });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduced || touch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let rafId = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
