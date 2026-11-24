"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import {
  formatPeriod,
  nextProject,
  type Project,
  type Shot,
} from "@/lib/projects";

type Figure = { value: string; label: string };

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.05 + i * 0.06 },
  }),
};

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const now = useTranslations("Common")("now");
  const slug = project.slug;
  const built = t.raw(`items.${slug}.built`) as string[];
  const numbers = t.raw(`items.${slug}.numbers`) as Figure[];
  const captions = t.raw(`items.${slug}.shots`) as string[];
  // raw: Alseraj's is empty on purpose, and the section hides
  const hard = t.raw(`items.${slug}.hard`) as string;
  const next = nextProject(slug);

  const shots = (project.shots ?? []).map((shot, i) => ({
    ...shot,
    src: `/projects/${slug}/${shot.file}`,
    caption: captions[i] ?? "",
  }));
  const cover = shots[0] && !shots[0].phone ? shots[0] : undefined;
  const gallery = cover ? shots.slice(1) : shots;

  return (
    <article className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-16 px-5 pb-32 pt-32 sm:px-8 sm:pt-40 md:gap-20">
      <motion.header initial="hidden" animate="show">
        <motion.div custom={0} variants={reveal}>
          <Link
            href="/projects"
            data-cursor="magnetic"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft
              className="size-3.5 transition-[translate] duration-200 ease-out group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5"
              aria-hidden
            />
            {t("backToProjects")}
          </Link>
        </motion.div>

        <div className="mt-10 flex flex-col gap-5">
          <motion.span
            custom={1}
            variants={reveal}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="text-primary/80">{t(`items.${slug}.company`)}</span>
            {" · "}
            <span className="tabular-nums">{formatPeriod(project, now)}</span>
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
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor="magnetic"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform duration-150 ease-out active:scale-[0.97]"
              >
                {t("visitLabel")}
                <MoveUpRight
                  className="size-4 transition-[translate] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  aria-hidden
                />
              </a>
            )}
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/40 px-4 py-2 text-sm text-foreground/80 backdrop-blur-sm">
              <span
                className="size-1.5 rounded-full bg-primary"
                aria-hidden
              />
              {t(`items.${slug}.status`)}
            </span>
          </motion.div>
        </div>
      </motion.header>

      {cover && (
        <Screen shot={cover} priority className="-mt-4 md:-mt-8" />
      )}

      <Story label={t("summaryLabel")}>
        <p className="text-pretty text-xl leading-relaxed text-foreground/90 sm:text-2xl">
          {t(`items.${slug}.summary`)}
        </p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <Meta label={t("roleLabel")}>{t(`items.${slug}.role`)}</Meta>
          <Meta label={t("yearLabel")}>
            <span className="tabular-nums">{formatPeriod(project, now)}</span>
          </Meta>
        </dl>
      </Story>

      <Story label={t("usersLabel")}>
        <p className="text-pretty text-lg leading-relaxed text-foreground/85">
          {t(`items.${slug}.users`)}
        </p>
      </Story>

      <Story label={t("builtLabel")}>
        <ol className="flex flex-col gap-5">
          {built.map((item, i) => (
            <li
              key={i}
              className="flex gap-4 text-base leading-relaxed text-foreground/85 sm:text-lg"
            >
              <span className="mt-1 font-display text-sm text-primary/70 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ol>
      </Story>

      {hard && (
        <Story label={t("hardLabel")}>
          <p className="text-pretty border-s-2 border-primary ps-6 text-lg leading-relaxed text-foreground/85">
            {hard}
          </p>
        </Story>
      )}

      {numbers.length > 0 && (
        <Story label={t("numbersLabel")}>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {numbers.map((n) => (
              <div key={n.label} className="flex flex-col-reverse gap-2">
                <dt className="text-pretty text-sm leading-snug text-muted-foreground">
                  {n.label}
                </dt>
                <dd className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-none tracking-[-0.02em] text-primary tabular-nums">
                  {n.value}
                </dd>
              </div>
            ))}
          </dl>
        </Story>
      )}

      <Story label={t("stackLabel")}>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-foreground/15 bg-background/40 px-3 py-1.5 text-sm text-foreground/85 backdrop-blur-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Story>

      {gallery.length > 0 && (
        <Story label={t("screensLabel")} wide>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3">
            {gallery.map((shot) => (
              <Screen
                key={shot.file}
                shot={shot}
                className={shot.phone ? "" : "col-span-full"}
              />
            ))}
          </div>
        </Story>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="magnetic"
          className="group flex flex-col gap-3 border-t border-foreground/15 pt-10"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("nextLabel")}
          </span>
          <span className="flex items-center justify-between gap-6">
            <span className="font-display text-balance text-[clamp(2.25rem,6vw,4.5rem)] leading-none tracking-[-0.02em] transition-colors duration-200 group-hover:text-primary">
              {t(`items.${next.slug}.name`)}
            </span>
            <ArrowRight
              className="size-8 shrink-0 text-muted-foreground transition-[translate,color] duration-200 ease-out group-hover:translate-x-1 group-hover:text-foreground rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              aria-hidden
            />
          </span>
          <span className="text-pretty text-muted-foreground">
            {t(`items.${next.slug}.tagline`)}
          </span>
        </Link>
      </motion.div>
    </article>
  );
}

/** One part of the story: a small label on the side, the content beside it. */
function Story({
  label,
  wide,
  children,
}: {
  label: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, ease: EASE }}
      className={
        wide
          ? "flex flex-col gap-8 border-t border-foreground/15 pt-10"
          : "grid gap-6 border-t border-foreground/15 pt-10 md:grid-cols-[11rem_1fr] md:gap-12"
      }
    >
      <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground md:pt-1.5">
        {label}
      </h2>
      <div>{children}</div>
    </motion.section>
  );
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-base text-foreground/90 sm:text-lg">{children}</dd>
    </div>
  );
}

/** A screenshot that wipes in from the top once, with its caption. */
function Screen({
  shot,
  priority,
  className,
}: {
  shot: Shot & { src: string; caption: string };
  priority?: boolean;
  className?: string;
}) {
  // Reduced motion: a plain fade instead of the wipe.
  const reduce = useReducedMotion();
  return (
    <figure className={`flex flex-col gap-3 ${className ?? ""}`}>
      <motion.div
        initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
        whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        className={`overflow-hidden border border-foreground/10 bg-muted shadow-[0_24px_60px_-30px_rgba(35,29,24,0.35)] ${shot.phone ? "rounded-[1.75rem]" : "rounded-xl"}`}
      >
        <Image
          src={shot.src}
          alt={shot.caption}
          width={shot.phone ? 390 : 1440}
          height={shot.phone ? 844 : 900}
          priority={priority}
          sizes={shot.phone ? "(min-width: 640px) 18rem, 45vw" : "(min-width: 1024px) 60rem, 100vw"}
          className="h-auto w-full"
        />
      </motion.div>
      {shot.caption && (
        <figcaption className="text-pretty text-sm text-muted-foreground">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}
