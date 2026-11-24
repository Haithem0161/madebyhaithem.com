"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { rowReveal } from "./project-index";
import { SectionShell } from "./section-shell";

type Fact = { label: string; value: string };
type Job = { years: string; role: string; company: string };

export function About() {
  const t = useTranslations("About");
  const [lead, ...paragraphs] = t.raw("paragraphs") as string[];
  const facts = t.raw("facts") as Fact[];
  const jobs = t.raw("jobs") as Job[];

  return (
    <SectionShell id="about" eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex flex-col gap-6"
        >
          <p className="font-display text-pretty text-2xl leading-snug tracking-[-0.01em] sm:text-3xl">
            {lead}
          </p>
          {paragraphs.map((p) => (
            <p
              key={p}
              className="text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg"
            >
              {p}
            </p>
          ))}
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col self-start"
        >
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-1 border-t border-foreground/15 py-4"
            >
              <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="text-pretty text-base text-foreground/90">
                {fact.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="flex flex-col gap-6 pt-4">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl italic tracking-tight text-foreground/70 sm:text-3xl"
        >
          {t("workTitle")}
        </motion.h3>
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="border-b border-foreground/15"
        >
          {jobs.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.years}`}
              custom={i}
              variants={rowReveal}
              className="grid gap-x-6 gap-y-1 border-t border-foreground/15 py-5 md:grid-cols-[9rem_1fr_16rem] md:items-baseline"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground tabular-nums md:text-sm md:normal-case md:tracking-normal">
                {job.years}
              </span>
              <span className="text-lg text-foreground/90 sm:text-xl">
                {job.role}
              </span>
              <span className="text-sm text-primary/80 md:text-base">
                {job.company}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </SectionShell>
  );
}
