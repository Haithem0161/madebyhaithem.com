import { create } from "zustand";

interface SceneState {
  canvasReady: boolean;
  assetsReady: boolean;
  minTimeElapsed: boolean;
  isReady: boolean;
  setCanvasReady: () => void;
  setAssetsReady: () => void;
  setMinTimeElapsed: () => void;
}

const computeReady = (s: Pick<SceneState, "canvasReady" | "assetsReady" | "minTimeElapsed">) =>
  s.canvasReady && s.assetsReady && s.minTimeElapsed;

export const useSceneStore = create<SceneState>((set, get) => ({
  canvasReady: false,
  assetsReady: false,
  minTimeElapsed: false,
  isReady: false,
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
