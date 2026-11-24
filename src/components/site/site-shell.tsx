"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { WallCanvas } from "@/components/canvas/wall-canvas";
import { Cursor } from "@/components/cursor/cursor";
import { Header } from "@/components/site/header";
import { Preloader } from "@/components/preloader/preloader";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { useLenis } from "@/hooks/use-lenis";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  useLenis();
  useHashScroll();

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <WallCanvas />
      <Header />
      {children}
      <Cursor />
    </MotionConfig>
  );
}
