"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className="flex items-center gap-1 text-xs uppercase tracking-[0.25em]"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc, i) => (
        <button
          key={loc}
          type="button"
          disabled={isPending || loc === locale}
          onClick={() =>
            startTransition(() => {
              router.replace(pathname, { locale: loc });
            })
          }
          className={cn(
            "px-1.5 py-1 transition-colors",
            loc === locale
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-current={loc === locale ? "true" : undefined}
        >
          {t(loc)}
          {i === 0 && (
            <span aria-hidden className="mx-1 text-muted-foreground/50">
              /
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
