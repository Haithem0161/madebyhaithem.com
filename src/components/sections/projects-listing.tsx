"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects } from "@/lib/projects";
import { ProjectIndex } from "./project-index";
import { SectionShell } from "./section-shell";

export function ProjectsListing() {
  const t = useTranslations("Projects");
  const nav = useTranslations("Common");
  return (
    <SectionShell
      id="projects"
      eyebrow={t("allEyebrow")}
      title={t("allTitle")}
      className="pt-32 sm:pt-40"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7 }}
        className="-mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {t("allSubtitle")}
      </motion.p>

      <ProjectIndex projects={projects} />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <Link
          href="/"
          data-cursor="magnetic"
          className="group inline-flex items-center gap-2 self-start text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <ArrowLeft
            className="size-4 transition-[translate] duration-200 ease-out group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5"
            aria-hidden
          />
          {nav("backHome")}
        </Link>
      </motion.div>
    </SectionShell>
  );
}
