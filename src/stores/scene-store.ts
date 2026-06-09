import { create } from "zustand";

interface SceneState {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  canvasReady: boolean;
  assetsReady: boolean;
  minTimeElapsed: boolean;
  isReady: boolean;
  setScrollProgress: (v: number) => void;
  setMouse: (x: number, y: number) => void;
  setCanvasReady: () => void;
  setAssetsReady: () => void;
  setMinTimeElapsed: () => void;
}

const computeReady = (s: Pick<SceneState, "canvasReady" | "assetsReady" | "minTimeElapsed">) =>
  s.canvasReady && s.assetsReady && s.minTimeElapsed;

export const useSceneStore = create<SceneState>((set, get) => ({
  scrollProgress: 0,
  mouseX: 0,
  mouseY: 0,
  canvasReady: false,
  assetsReady: false,
  minTimeElapsed: false,
  isReady: false,
  setScrollProgress: (v) => {
    if (Math.abs(get().scrollProgress - v) < 0.0005) return;
    set({ scrollProgress: v });
  },
  setMouse: (x, y) => {
    set({ mouseX: x, mouseY: y });
  },
  setCanvasReady: () => {
    if (get().canvasReady) return;
    const next = { canvasReady: true };
    set({ ...next, isReady: computeReady({ ...get(), ...next }) });
  },
  setAssetsReady: () => {
    if (get().assetsReady) return;
    const next = { assetsReady: true };
    set({ ...next, isReady: computeReady({ ...get(), ...next }) });
  },
  setMinTimeElapsed: () => {
    if (get().minTimeElapsed) return;
    const next = { minTimeElapsed: true };
    set({ ...next, isReady: computeReady({ ...get(), ...next }) });
  },
}));
