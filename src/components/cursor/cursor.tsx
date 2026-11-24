"use client";

import { motion, useMotionValue, useSpring, type Transition } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const ringSpring: Transition = { stiffness: 250, damping: 24, mass: 0.7 };
// --ease-out from globals.css
const stateTransition: Transition = { duration: 0.2, ease: [0.23, 1, 0.32, 1] };

/** A ring that trails the pointer and opens up over links. The native cursor always stays. */
export function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  // The ring is pure movement, so reduced motion gets none: the native cursor already says everything.
  const enabled = fine && !reduced;

  const [hover, setHover] = useState(false);
  const [shown, setShown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, ringSpring);
  const ringY = useSpring(y, ringSpring);

  useEffect(() => {
    if (!enabled) return;
    let inside = false;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (inside) return;
      // Coming in: start at the pointer instead of trailing in from a corner or the exit point.
      ringX.jump(e.clientX);
      ringY.jump(e.clientY);
      inside = true;
      setShown(true);
    };

    const isInteractive = (el: Element | null) => {
      if (!el) return false;
      return Boolean(
        el.closest(
          'a, button, [role="button"], [data-cursor="magnetic"], input, textarea, select, label',
        ),
      );
    };

    const onOver = (e: PointerEvent) => {
      setHover(isInteractive(e.target as Element));
    };
    const onOut = (e: PointerEvent) => {
      setHover(false);
      if (e.relatedTarget) return;
      inside = false; // the pointer left the window
      setShown(false);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [enabled, x, y, ringX, ringY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-200 size-9 rounded-full border-[1.5px] border-foreground"
      style={{
        x: ringX,
        y: ringY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{
        scale: hover ? 1.7 : 1,
        opacity: shown ? (hover ? 1 : 0.5) : 0,
        borderColor: hover ? "var(--primary)" : "var(--foreground)",
      }}
      transition={stateTransition}
    />
  );
}
