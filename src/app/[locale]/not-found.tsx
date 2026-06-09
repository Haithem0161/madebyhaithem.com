import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-7xl font-semibold tracking-tight">{t("NotFound.title")}</p>
      <p className="max-w-md text-muted-foreground">{t("NotFound.description")}</p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        {t("Common.backHome")}
      </Link>
    </div>
  );
}
