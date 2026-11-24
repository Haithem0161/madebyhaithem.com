"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPeriod, type Project } from "@/lib/projects";

type Figure = { value: string; label: string };

/** A featured project on the home page: one big number up front, then what it is. */
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const t = useTranslations("Projects");
  const now = useTranslations("Common")("now");
  const slug = project.slug;
  const lead = (t.raw(`items.${slug}.numbers`) as Figure[])[0];
  const stack = project.stack.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.08,
      }}
    >
      <Link
        href={`/projects/${slug}`}
        data-cursor="magnetic"
        className="group flex h-full flex-col gap-6 border-t border-foreground/15 pt-6 transition-colors duration-200 hover:border-foreground/40"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-primary/80">{t(`items.${slug}.company`)}</span>
            {" · "}
            <span className="tabular-nums">{formatPeriod(project, now)}</span>
          </span>
          <ArrowUpRight
            className="size-5 shrink-0 text-muted-foreground transition-[translate,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
            aria-hidden
          />
        </div>

        {lead && (
          <p className="flex flex-col gap-1">
            <span className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none tracking-[-0.03em] text-primary tabular-nums">
              {lead.value}
            </span>
            <span className="text-sm text-muted-foreground">{lead.label}</span>
          </p>
        )}

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-3xl tracking-[-0.01em] transition-colors duration-200 group-hover:text-primary sm:text-4xl">
            {t(`items.${slug}.name`)}
          </h3>
          <p className="text-pretty text-base text-muted-foreground sm:text-lg">
            {t(`items.${slug}.tagline`)}
          </p>
        </div>

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
      </Link>
    </motion.div>
  );
}
