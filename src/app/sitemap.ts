import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projectSlugs } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const localePrefix = (locale: string) =>
  locale === routing.defaultLocale ? "" : `/${locale}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Routes shared across every locale: home, the projects listing, and each
  // project detail page.
  const routes = ["", "/projects", ...projectSlugs.map((s) => `/projects/${s}`)];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}${localePrefix(locale)}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${siteConfig.url}${localePrefix(l)}${route}`,
          ]),
        ),
      },
    })),
  );
}
