"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "./section-shell";

export function Education() {
  const t = useTranslations("Education");
  const certs = t.raw("certs") as string[];
  return (
    <SectionShell id="education" eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3 border-t border-foreground/15 pt-6"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("period")}
          </span>
          <h3 className="font-display text-3xl tracking-[-0.01em] sm:text-4xl">
            {t("degree")}
          </h3>
          <p className="text-sm uppercase tracking-[0.2em] text-foreground/70">
            {t("school")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col gap-4 border-t border-foreground/15 pt-6"
        >
          <span className="font-display text-xl italic text-foreground/70">
            {t("certsLabel")}
          </span>
          <ul className="flex flex-col gap-2">
            {certs.map((c) => (
              <li
                key={c}
                className="text-sm leading-relaxed text-foreground/80 sm:text-base"
              >
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionShell>
  );
}
