"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSceneStore } from "@/stores/scene-store";

const MIN_DURATION_MS = 1200;

export function Preloader() {
  const t = useTranslations("Preloader");
  const isReady = useSceneStore((s) => s.isReady);
  const setMinTimeElapsed = useSceneStore((s) => s.setMinTimeElapsed);
  const setAssetsReady = useSceneStore((s) => s.setAssetsReady);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(setMinTimeElapsed, MIN_DURATION_MS);
    const fallback = setTimeout(setAssetsReady, MIN_DURATION_MS + 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, [setMinTimeElapsed, setAssetsReady]);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const simulated = Math.min(0.85, elapsed / MIN_DURATION_MS);
      const real = isReady ? 1 : simulated;
      setProgress((p) => Math.max(p, real));
      if (!isReady) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isReady]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          className="fixed inset-0 z-150 flex flex-col items-center justify-center gap-8 bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo-dark.png"
              alt="Haithem Mustafa"
              width={160}
              height={160}
              priority
              className="size-28 sm:size-36"
            />
          </motion.div>

          <div className="flex w-56 flex-col items-center gap-3">
            <div className="h-px w-full overflow-hidden bg-foreground/15">
              <motion.div
                className="h-full bg-foreground"
                animate={{ width: `${Math.round(progress * 100)}%` }}
                transition={{ duration: 0.18, ease: "linear" }}
              />
            </div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t("loading")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
