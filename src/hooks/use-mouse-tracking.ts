"use client";

import { useEffect } from "react";
import { useSceneStore } from "@/stores/scene-store";

export function useMouseTracking() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    let dirty = false;

    const flush = () => {
      if (dirty) {
        useSceneStore.getState().setMouse(pendingX, pendingY);
        dirty = false;
      }
      rafId = requestAnimationFrame(flush);
    };
    rafId = requestAnimationFrame(flush);

    const onMove = (e: PointerEvent) => {
      pendingX = (e.clientX / window.innerWidth) * 2 - 1;
      pendingY = -((e.clientY / window.innerHeight) * 2 - 1);
      dirty = true;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
}
