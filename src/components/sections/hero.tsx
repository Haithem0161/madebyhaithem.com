"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, MoveUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { smoothScrollTo } from "@/hooks/use-lenis";
import { siteConfig } from "@/lib/site";

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.1 + i * 0.08,
    },
  }),
};

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-12 pt-32 sm:px-8 sm:pb-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <motion.span
          custom={0}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="text-xs uppercase tracking-[0.32em] text-muted-foreground"
        >
          {t("eyebrow")}
        </motion.span>

        <h1 className="font-display text-balance text-[clamp(3rem,11vw,9.5rem)] leading-[0.92] tracking-[-0.03em]">
          <motion.span
            custom={1}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="block"
          >
            {t("tagline1")}
          </motion.span>
          <motion.span
            custom={2}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="block italic font-light text-foreground/85"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
          >
            {t("tagline2")}
          </motion.span>
        </h1>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("intro")}
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#contact", -64);
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              data-cursor="magnetic"
            >
              {t("ctaContact")}
              <MoveUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <a
              href={siteConfig.cvHref[locale]}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium transition-colors hover:border-foreground/60"
              data-cursor="magnetic"
            >
              {t("ctaCV")}
              <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <motion.p
          custom={5}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground sm:flex"
      >
        <ArrowDown className="size-3 animate-bounce" />
      </motion.div>
    </section>
  );
}
