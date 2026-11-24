"use client";

import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { featuredProjects, otherProjects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { ProjectIndex } from "./project-index";
import { SectionShell } from "./section-shell";

export function Projects() {
  const t = useTranslations("Projects");
  return (
    <SectionShell id="projects" eyebrow={t("eyebrow")} title={t("title")}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7 }}
        className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {t("subtitle")}
      </motion.p>

      <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-3">
        {featuredProjects.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} index={idx} />
        ))}
      </div>

      <div className="flex flex-col gap-6 pt-8">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl italic tracking-tight text-foreground/70 sm:text-3xl"
        >
          {t("indexTitle")}
        </motion.h3>
        <ProjectIndex projects={otherProjects} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <Link
          href="/projects"
          data-cursor="magnetic"
          className="group inline-flex items-center gap-2 self-start rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium transition-colors duration-200 hover:border-foreground/60"
        >
          {t("viewAll")}
          <MoveUpRight
            className="size-4 transition-[translate] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
            aria-hidden
          />
        </Link>
      </motion.div>
    </SectionShell>
  );
}
