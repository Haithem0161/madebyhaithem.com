"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPeriod, type Project } from "@/lib/projects";

/** First-view entrance for list rows: short, staggered, capped so long lists don't drag. */
export const rowReveal = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
      delay: Math.min(i, 8) * 0.04,
    },
  }),
};

/** A compact list of projects: when, what, for whom. */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const now = useTranslations("Common")("now");

  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="border-b border-foreground/15"
    >
      {projects.map((project, i) => {
        const slug = project.slug;
        const company = t(`items.${slug}.company`);
        return (
          <motion.li
            key={slug}
            custom={i}
            variants={rowReveal}
            className="border-t border-foreground/15"
          >
            <Link
              href={`/projects/${slug}`}
              data-cursor="magnetic"
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1.5 py-5 md:grid-cols-[9rem_1fr_13rem_1.5rem] md:py-6"
            >
              <span className="col-start-1 row-start-1 text-xs uppercase tracking-[0.2em] text-muted-foreground tabular-nums md:text-sm md:normal-case md:tracking-normal">
                {formatPeriod(project, now)}
                <span className="md:hidden"> · {company}</span>
              </span>
              <span className="col-span-2 row-start-2 flex flex-col gap-1 md:col-span-1 md:col-start-2 md:row-start-1">
                <span className="font-display text-2xl tracking-[-0.01em] transition-colors duration-200 group-hover:text-primary sm:text-3xl">
                  {t(`items.${slug}.name`)}
                </span>
                <span className="text-pretty text-sm text-muted-foreground sm:text-base">
                  {t(`items.${slug}.tagline`)}
                </span>
              </span>
              <span className="hidden text-sm text-muted-foreground md:col-start-3 md:row-start-1 md:block">
                {company}
              </span>
              <ArrowRight
                className="col-start-2 row-start-1 size-4 justify-self-end text-muted-foreground transition-[translate,color] duration-200 ease-out group-hover:translate-x-1 group-hover:text-foreground md:col-start-4 md:size-5 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                aria-hidden
              />
            </Link>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
