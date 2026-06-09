import type { Metadata } from "next";
import { Fraunces, Inter, Noto_Kufi_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "@/providers";
import { SiteShell } from "@/components/site/site-shell";
import { routing, localeDirection, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const arabic = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: { default: t("title"), template: `%s · ${siteConfig.name}` },
    description: t("description"),
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: "/",
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l === routing.defaultLocale ? "" : l}`]),
      ),
    },
    keywords: [...siteConfig.keywords],
    authors: [...siteConfig.authors],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const dir = localeDirection[locale];
  const rtl = dir === "rtl";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${arabic.variable} antialiased`}
      style={{ fontFamily: rtl ? "var(--font-arabic)" : "var(--font-sans)" }}
    >
      <body
        suppressHydrationWarning
        className="text-foreground min-h-svh"
      >
        <NextIntlClientProvider>
          <Providers>
            <SiteShell>{children}</SiteShell>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
