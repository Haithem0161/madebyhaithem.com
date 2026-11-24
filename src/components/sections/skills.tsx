"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "./section-shell";

type Group = { title: string; note: string; items: string[] };

export function Skills() {
  const t = useTranslations("Skills");
  const groups = t.raw("groups") as Group[];
  return (
    <SectionShell id="skills" eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:grid-cols-3">
        {groups.map((group, idx) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: (idx % 3) * 0.05,
            }}
            className="flex flex-col gap-4 border-t border-foreground/15 pt-5"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-xl italic tracking-tight text-foreground/80">
                {group.title}
              </h3>
              <p className="text-pretty text-sm text-muted-foreground">
                {group.note}
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-foreground/15 bg-background/40 px-3 py-1.5 text-sm text-foreground/85 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
