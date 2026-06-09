"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-foreground/15 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:flex-row sm:items-center">
        <span>
          © {year} {siteConfig.name}. {t("rights")}.
        </span>
        <span>{t("builtWith")}</span>
      </div>
    </footer>
  );
}
