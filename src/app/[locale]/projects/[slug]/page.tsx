import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectDetail } from "./project-detail";
import { getProject, projects } from "@/lib/projects";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "Projects" });
  const name = t(`items.${project.slug}.name`);
  const tagline = t(`items.${project.slug}.tagline`);

  return {
    title: name,
    description: `${name} — ${tagline}. ${t(`items.${project.slug}.summary`)}`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
