import { api } from "./axios"
import type {
  CmsCollectionResponse,
  CmsProject,
  ContactPayload,
  ContactResponse,
  MediaTransformOptions,
} from "./api-types"

// ── Projects ────────────────────────────────────────────────────────

// The CMS public API nests collection fields inside a `data` object.
// We flatten it so transformCmsProject can read fields at the top level.
type RawCmsItem = {
  id: string
  slug: string
  data: Record<string, unknown>
  published_at: string | null
  seo_title?: string | null
  seo_description?: string | null
}

function flattenCmsItem(raw: RawCmsItem): CmsProject {
  const { data: fields, ...rest } = raw
  return { ...rest, ...fields } as CmsProject
}

export async function fetchProjects(params?: {
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) {
  const { data } = await api.get<{
    collection: CmsCollectionResponse<CmsProject>["collection"]
    items: RawCmsItem[]
    total: number
  }>("/collections/_api/content/projects", { params })
  return {
    ...data,
    items: data.items.map(flattenCmsItem),
  } as CmsCollectionResponse<CmsProject>
}

export async function fetchProjectBySlug(slug: string) {
  const { data } = await api.get<RawCmsItem>(
    `/collections/_api/content/projects/${slug}`,
  )
  return flattenCmsItem(data)
}

// ── Contact ─────────────────────────────────────────────────────────

export async function submitContact(payload: ContactPayload) {
  const { data } = await api.post<ContactResponse>("/contacts/", payload)
  return data
}

// ── Media ───────────────────────────────────────────────────────────

const API_BASE =
  import.meta.env.VITE_API_URL || "https://api.madebyhaithem.com"

export function getMediaUrl(
  id: string,
  options?: MediaTransformOptions,
): string {
  const params = new URLSearchParams()
  if (options?.w) params.set("w", String(options.w))
  if (options?.h) params.set("h", String(options.h))
  if (options?.fit) params.set("fit", options.fit)
  if (options?.format) params.set("format", options.format)
  if (options?.quality) params.set("quality", String(options.quality))
  if (options?.blur) params.set("blur", String(options.blur))
  if (options?.sharpen) params.set("sharpen", "true")

  const qs = params.toString()
  return `${API_BASE}/media/${id}/transform${qs ? `?${qs}` : ""}`
}
