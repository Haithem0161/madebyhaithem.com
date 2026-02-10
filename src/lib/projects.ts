import type { CmsProject, CmsMediaField } from "./api-types"

export type Project = {
  id: string
  slug: string
  title: string

  subtitle?: string
  description?: string
  role?: string
  year?: string
  client?: string
  tags: string[]
  gradient: string
  featured?: boolean
  liveUrl?: string
  repoUrl?: string

  // Detail page fields
  overview?: string[]
  pullQuote?: string
  features?: { title: string; description: string }[]
  metrics?: { value: string; label: string }[]
  techStack?: { category: string; items: string[] }[]
  gallery?: { id: string; alt: string; caption?: string }[]

  // Raw image references for hero/thumbnail
  images?: CmsMediaField[]
}

const DEFAULT_GRADIENTS = [
  "from-primary/20 to-secondary-purple/20",
  "from-secondary-purple/20 to-palatinate/20",
  "from-palatinate/20 to-primary/20",
]

function safeJsonParse<T>(value: unknown): T | undefined {
  if (!value) return undefined
  if (typeof value === "string") {
    try {
      return JSON.parse(value)
    } catch {
      return undefined
    }
  }
  if (Array.isArray(value) || typeof value === "object") return value as T
  return undefined
}

function parseOverview(raw: unknown): string[] | undefined {
  if (!raw) return undefined
  if (Array.isArray(raw)) return raw
  if (typeof raw === "string") {
    if (raw.includes("<p>")) {
      return raw
        .split(/<\/?p[^>]*>/)
        .map((s) => s.replace(/<[^>]+>/g, "").trim())
        .filter(Boolean)
    }
    return raw
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return undefined
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim()
}

export function transformCmsProject(
  raw: CmsProject,
  index: number,
): Project {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle ?? undefined,
    description:
      typeof raw.description === "string"
        ? stripHtml(raw.description)
        : undefined,
    role: raw.role ?? undefined,
    year: raw.year ?? undefined,
    client: raw.client ?? undefined,
    tags: raw.tags ?? [],
    gradient:
      raw.gradient ?? DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length],
    featured: raw.featured ?? false,
    liveUrl: raw.liveUrl ?? undefined,
    repoUrl: raw.repoUrl ?? undefined,
    overview: parseOverview(raw.overview),
    pullQuote: raw.pullQuote ?? undefined,
    features: safeJsonParse(raw.features),
    metrics: safeJsonParse(raw.metrics),
    techStack: safeJsonParse(raw.techStack),
    gallery: raw.gallery?.map((img) => ({
      id: img.id,
      alt: img.alt ?? img.filename ?? "Project image",
      caption: img.caption,
    })),
    images: raw.images,
  }
}
