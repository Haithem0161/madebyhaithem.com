"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project, ProjectSlug } from "@/lib/projects";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.05 + i * 0.06,
    },
  }),
};

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const slug: ProjectSlug = project.slug;
  const build = t.raw(`items.${slug}.build`) as string[];
  const highlights = t.raw(`items.${slug}.highlights`) as string[];

  return (
    <article className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-16 px-5 pb-32 pt-32 sm:px-8 sm:pt-40 md:gap-20">
      <motion.div initial="hidden" animate="show">
        <motion.div custom={0} variants={reveal}>
          <Link
            href="/projects"
            data-cursor="magnetic"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden
            />
            {t("backToProjects")}
          </Link>
        </motion.div>

        <div className="mt-10 flex flex-col gap-5">
          <motion.span
            custom={1}
            variants={reveal}
            className="text-xs uppercase tracking-[0.3em] text-primary/80"
          >
            {t(`items.${slug}.company`)} · {project.year}
          </motion.span>
          <motion.h1
            custom={2}
            variants={reveal}
            className="font-display text-balance text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] tracking-[-0.03em]"
          >
            {t(`items.${slug}.name`)}
          </motion.h1>
          <motion.p
            custom={3}
            variants={reveal}
            className="max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl"
          >
            {t(`items.${slug}.tagline`)}
          </motion.p>

          <motion.div
            custom={4}
            variants={reveal}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            {project.linkKind === "internal" ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm text-muted-foreground">
                {t("internalLabel")}
              </span>
            ) : (
              project.link && (
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="magnetic"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  {project.linkKind === "appstore"
                    ? t("appStoreLabel")
                    : t("visitLabel")}
                  <MoveUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              )
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Overview + meta */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-10 border-t border-foreground/15 pt-10 md:grid-cols-[1.5fr_1fr] md:gap-16"
      >
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("overviewLabel")}
          </span>
          <p className="text-pretty text-lg leading-relaxed text-foreground/85 sm:text-xl">
            {t(`items.${slug}.summary`)}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Meta label={t("roleLabel")}>{t(`items.${slug}.role`)}</Meta>
          <Meta label={t("yearLabel")}>{project.year}</Meta>
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {t("stackLabel")}
            </span>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-foreground/15 bg-background/40 px-3 py-1 text-xs text-foreground/85 backdrop-blur-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* The build */}
      <section className="flex flex-col gap-8 border-t border-foreground/15 pt-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.7 }}
          className="font-display text-2xl italic tracking-tight text-foreground/70"
        >
          {t("buildLabel")}
        </motion.span>
        <ol className="flex flex-col gap-5">
          {build.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 4) * 0.05,
              }}
              className="flex gap-4 text-base leading-relaxed text-foreground/85 sm:text-lg"
            >
              <span className="mt-1 font-display text-sm text-primary/70 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty">{item}</span>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Highlights */}
      <section className="flex flex-col gap-8 border-t border-foreground/15 pt-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.7 }}
          className="font-display text-2xl italic tracking-tight text-foreground/70"
        >
          {t("highlightsLabel")}
        </motion.span>
        <ul className="grid gap-4 sm:grid-cols-2">
          {highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 2) * 0.06,
              }}
              className="flex items-start gap-3 rounded-2xl border border-foreground/12 bg-background/40 p-5 text-base text-foreground/85 backdrop-blur-sm"
            >
              <span
                className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <span className="text-pretty">{h}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="border-t border-foreground/15 pt-10"
      >
        <Link
          href="/projects"
          data-cursor="magnetic"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden
          />
          {t("backToProjects")}
        </Link>
      </motion.div>
    </article>
  );
}

function Meta({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <span className="text-base text-foreground/90 sm:text-lg">{children}</span>
    </div>
  );
}
