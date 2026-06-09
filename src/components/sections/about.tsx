"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "./section-shell";

export function About() {
  const t = useTranslations("About");
  return (
    <SectionShell id="about" eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex flex-col gap-4 border-t border-foreground/15 pt-6"
        >
          <span className="font-display text-2xl tracking-tight text-primary italic">
            {t("backendLabel")}
          </span>
          <p className="text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
            {t("backendBody")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col gap-4 border-t border-foreground/15 pt-6"
        >
          <span className="font-display text-2xl tracking-tight italic">
            {t("frontendLabel")}
          </span>
          <p className="text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
            {t("frontendBody")}
          </p>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="font-display text-balance text-2xl italic text-foreground/60 sm:text-3xl"
      >
        {t("footnote")}
      </motion.p>
    </SectionShell>
  );
}
