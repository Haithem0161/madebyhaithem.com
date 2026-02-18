import type { CmsProject, CmsMediaField } from "./api-types"

/** Normalize CMS image field into an array of media refs.
 *  Handles: single object, array of objects, media ID string, or comma-separated IDs. */
function normalizeImages(raw: unknown): CmsMediaField[] | undefined {
  if (!raw) return undefined
  if (Array.isArray(raw)) return raw
  if (typeof raw === "object") return [raw as CmsMediaField]
  if (typeof raw === "string") {
    // Could be a JSON string of array, or comma-separated media IDs
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
      if (typeof parsed === "object") return [parsed as CmsMediaField]
    } catch {
      // Comma-separated media IDs
      return raw.split(",").map((id) => ({ id: id.trim() }))
    }
  }
  return undefined
}

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

// Map CMS multiselect values to display labels
const TAG_LABELS: Record<string, string> = {
  react: "React",
  rust: "Rust",
  fastify: "Fastify",
  "node-js": "Node.js",
  nestjs: "NestJS",
  prisma: "Prisma",
  microservice: "Microservice",
  tauri: "Tauri",
  postgresql: "PostgreSQL",
  typescript: "TypeScript",
  nextjs: "Next.js",
  docker: "Docker",
  redis: "Redis",
  socketio: "Socket.IO",
  hls: "HLS",
  ai: "AI",
  seo: "SEO",
  devops: "DevOps",
  websocket: "WebSocket",
  "framer-motion": "Framer Motion",
  rtl: "RTL",
  i18n: "i18n",
  expressjs: "Express.js",
  kafka: "Kafka",
  drizzle: "Drizzle",
  bullmq: "BullMQ",
  opentelemetry: "OpenTelemetry",
  webauthn: "WebAuthn",
  saml: "SAML",
  stripe: "Stripe",
  twilio: "Twilio",
  minio: "MinIO",
  ddd: "DDD",
}

function formatTag(value: string): string {
  return TAG_LABELS[value] ?? value
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
    tags: (raw.tags ?? []).map(formatTag),
    gradient:
      raw.gradient ?? DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length],
    featured: raw.featured ?? false,
    liveUrl: raw.live_url ?? undefined,
    repoUrl: raw.repo_url ?? undefined,
    overview: parseOverview(raw.overview),
    pullQuote: raw.pull_quote ?? raw.pullQuote ?? undefined,
    features: safeJsonParse(raw.features),
    metrics: safeJsonParse(raw.metrics),
    techStack: safeJsonParse(raw.tech_stack),
    gallery: normalizeImages(raw.gallery)?.map((img) => ({
      id: img.id,
      alt: img.alt ?? img.filename ?? "Project image",
      caption: img.caption,
    })),
    images: normalizeImages(raw.images),
  }
}
