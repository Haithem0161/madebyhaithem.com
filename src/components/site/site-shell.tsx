"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Cursor } from "@/components/cursor/cursor";
import { Header } from "@/components/site/header";
import { Preloader } from "@/components/preloader/preloader";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { useLenis } from "@/hooks/use-lenis";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";

const Scene = dynamic(
  () => import("@/components/canvas/scene").then((m) => m.Scene),
  { ssr: false },
);

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  useLenis();
  useMouseTracking();
  useHashScroll();

  return (
    <>
      <Preloader />
      <Scene />
      <Header />
      {children}
      <Cursor />
    </>
  );
}
