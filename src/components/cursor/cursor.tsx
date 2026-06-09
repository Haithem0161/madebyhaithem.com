"use client";

import { motion, useMotionValue, useSpring, type Transition } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const dotSpring: Transition = { stiffness: 900, damping: 32, mass: 0.2 };
const ringSpring: Transition = { stiffness: 250, damping: 24, mass: 0.7 };

export function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;

  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, dotSpring);
  const dotY = useSpring(y, dotSpring);
  const ringX = useSpring(x, ringSpring);
  const ringY = useSpring(y, ringSpring);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
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
    const onOut = () => setHover(false);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-200 size-2 rounded-full bg-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.5)]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hover ? 0.4 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-200 size-9 rounded-full border-[1.5px] border-foreground"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hover ? 1.7 : 1,
          opacity: hover ? 1 : 0.9,
          borderColor: hover ? "var(--primary)" : "var(--foreground)",
        }}
        transition={{ duration: 0.22 }}
      />
    </>
  );
}
