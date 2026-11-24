"use client";

import { motion, useInView } from "framer-motion";
import { Download, MoveUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { setWallDark } from "@/components/canvas/wall-canvas";
import { siteConfig } from "@/lib/site";
import { SectionShell } from "./section-shell";

export function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const common = useTranslations("Common");
  const [user, domain] = siteConfig.email.split("@");
  // The wall turns to charcoal once this section reaches the top half of the screen, and back when it leaves.
  const ref = useRef<HTMLElement>(null);
  const dark = useInView(ref, { margin: "0px 0px -50% 0px" });
  useEffect(() => setWallDark(dark), [dark]);
  useEffect(() => () => setWallDark(false), []);
  return (
    <SectionShell
      ref={ref}
      id="contact"
      eyebrow={t("eyebrow")}
      title={t("title")}
      className="md:pb-48"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {t("intro")}
      </motion.p>

      <motion.a
        href={`mailto:${siteConfig.email}`}
        dir="ltr"
        data-cursor="magnetic"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="group inline-flex items-end gap-3 self-start font-display text-balance text-[clamp(1.75rem,6vw,5.25rem)] leading-[0.95] tracking-tight underline-offset-[0.2em] decoration-1 transition-colors hover:text-primary hover:decoration-primary"
      >
        <span className="inline-flex items-baseline gap-3">
          {/* On narrow screens the address wraps after the @, not mid-word. */}
          <span>
            {user}@<wbr />
            {domain}
          </span>
          <MoveUpRight
            className="size-[0.5em] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid gap-8 border-t border-foreground/15 pt-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ContactRow label={t("phoneLabel")}>
          <a
            href={siteConfig.phoneHref}
            dir="ltr"
            className="inline-block text-foreground transition-colors hover:text-primary"
            data-cursor="magnetic"
          >
            {siteConfig.phone}
          </a>
        </ContactRow>
        <ContactRow label={t("websiteLabel")}>
          <a
            href={siteConfig.socials.website.href}
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            className="text-foreground transition-colors hover:text-primary"
            data-cursor="magnetic"
          >
            {siteConfig.socials.website.handle}
          </a>
        </ContactRow>
        <ContactRow label={t("githubLabel")}>
          <a
            href={siteConfig.socials.github.href}
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            className="text-foreground transition-colors hover:text-primary"
            data-cursor="magnetic"
          >
            {siteConfig.socials.github.handle}
          </a>
        </ContactRow>
        <ContactRow label={t("linkedinLabel")}>
          <a
            href={siteConfig.socials.linkedin.href}
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            className="text-foreground transition-colors hover:text-primary"
            data-cursor="magnetic"
          >
            {siteConfig.socials.linkedin.handle}
          </a>
        </ContactRow>
        <ContactRow label={t("locationLabel")}>{t("location")}</ContactRow>
      </motion.div>

      <motion.a
        href={siteConfig.cvHref[locale]}
        download
        data-cursor="magnetic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="group inline-flex items-center gap-2 self-start rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium transition-colors hover:border-foreground/60"
      >
        <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        {common("downloadCV")}
      </motion.a>
    </SectionShell>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <span className="text-base sm:text-lg">{children}</span>
    </div>
  );
}
