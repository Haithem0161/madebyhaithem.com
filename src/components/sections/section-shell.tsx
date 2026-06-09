"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-5 py-24 sm:px-8 sm:py-32 md:py-40",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3"
        >
          <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            {eyebrow}
          </span>
          <h2 className="font-display text-balance text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.025em]">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
