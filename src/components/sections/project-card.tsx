"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const t = useTranslations("Projects");
  const slug = project.slug;
  const stack = project.stack.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 2) * 0.08,
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="magnetic"
        className="group flex h-full flex-col gap-6 border-t border-foreground/15 pt-6 transition-colors hover:border-foreground/40"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {project.year}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/80">
              {t(`items.${slug}.company`)}
            </span>
          </div>
          <ArrowUpRight
            className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-3xl tracking-[-0.01em] sm:text-4xl">
            {t(`items.${slug}.name`)}
          </h3>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t(`items.${slug}.tagline`)}
          </p>
        </div>

        <p className="text-pretty text-sm leading-relaxed text-foreground/75 sm:text-base">
          {t(`items.${slug}.summary`)}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-foreground/15 bg-background/40 px-3 py-1 text-xs text-foreground/80 backdrop-blur-sm"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > stack.length && (
            <li className="rounded-full px-1 py-1 text-xs text-muted-foreground">
              +{project.stack.length - stack.length}
            </li>
          )}
        </ul>

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors group-hover:text-primary">
          {t("overviewLabel")}
          <MoveUpRight
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </motion.div>
  );
}
