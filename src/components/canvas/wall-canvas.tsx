"use client";

import { useEffect, useRef } from "react";
import { useSceneStore } from "@/stores/scene-store";
import { createWall, type Wall } from "./wall";

/** The running wall, so the contact section can darken it. */
let current: Wall | undefined;
const isDark = () => document.documentElement.hasAttribute("data-wall-dark");

/** Turns the wall to charcoal and flips the site's colours with it (globals.css), or back. */
export function setWallDark(dark: boolean) {
  document.documentElement.toggleAttribute("data-wall-dark", dark);
  current?.setDark(dark);
}

/** The carved H wall behind every page (wall.ts). Without WebGL2 the page shows a still picture of it (globals.css). */
export function WallCanvas() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const store = useSceneStore.getState();
    store.setCanvasReady();
    // A fresh canvas per mount: a context that an earlier mount disposed (strict mode runs effects twice) stays lost.
    const canvas = document.createElement("canvas");
    canvas.className = "wall";
    host.current?.append(canvas);
    const off = () => {
      document.documentElement.dataset.gl = "off";
    };
    let dead = false;
    let wall: Wall | null = null;
    createWall(canvas)
      .then((made) => {
        if (dead) return made?.dispose();
        if (!made) return off();
        wall = current = made;
        made.setDark(isDark());
      })
      .catch(off)
      // The preloader waits for the wall's tiles (and gives up on its own after 2.2 s).
      .finally(store.setAssetsReady);
    return () => {
      dead = true;
      wall?.dispose();
      if (current === wall) current = undefined;
      canvas.remove();
    };
  }, []);
  return <div ref={host} aria-hidden />;
}
