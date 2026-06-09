import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Haithem Mustafa — Full Stack Developer";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });

  // Dark logo embedded as a data URI so Satori can render it without a network fetch.
  const logo = await readFile(join(process.cwd(), "public", "logo-dark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#f7efe2",
          color: "#231d18",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#7a6e63",
          }}
        >
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 124,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
            }}
          >
            {t("tagline1")}
          </div>
          <div
            style={{
              fontSize: 124,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#3a322a",
            }}
          >
            {t("tagline2")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#7a6e63",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>{t("subtitle")}</span>
          <img src={logoSrc} width={72} height={72} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
