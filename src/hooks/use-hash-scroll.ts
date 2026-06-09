"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { smoothScrollTo } from "@/hooks/use-lenis";

const NAV_OFFSET = -64;

/**
 * Scrolls to the section named by the URL hash after navigation.
 * Used so cross-page nav links (e.g. /#about from a project page) land on
 * the right section once the home page mounts.
 */
export function useHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    // Wait a frame so the target section is in the DOM and Lenis is ready.
    const id = window.setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) smoothScrollTo(hash, NAV_OFFSET);
    }, 120);

    return () => window.clearTimeout(id);
  }, [pathname]);
}
