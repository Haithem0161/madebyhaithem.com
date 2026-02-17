// CMS generic response from GET /collections/_api/content/{collection}
export interface CmsCollectionResponse<T> {
  collection: {
    name: string
    slug: string
    description: string | null
  }
  items: T[]
  total: number
}

// Raw project item as returned by the CMS.
// Fields are optional because CMS fields can be added gradually.
export interface CmsProject {
  id: string
  slug: string
  status: string
  created_at: string
  updated_at: string
  published_at: string | null

  // Current CMS fields
  title: string
  description?: string // richtext, may be HTML
  images?: CmsMediaField[] // image field returns media references
  tags?: string[] // multiselect
  featured?: boolean

  // Future CMS fields (added via admin panel)
  subtitle?: string
  role?: string
  year?: string
  client?: string
  gradient?: string
  live_url?: string
  repo_url?: string
  overview?: string // richtext
  pull_quote?: string
  pullQuote?: string // legacy alias
  features?: string | object // JSON string or parsed, {title, description}[]
  metrics?: string | object // JSON string or parsed, {value, label}[]
  tech_stack?: string // JSON string, {category, items[]}[]
  gallery?: CmsMediaField[]

  // Allow any additional CMS fields
  [key: string]: unknown
}

// Media reference from CMS image fields
export interface CmsMediaField {
  id: string
  filename?: string
  mimeType?: string
  alt?: string
  caption?: string
  width?: number
  height?: number
}

// Contact form payload for POST /contacts/
export interface ContactPayload {
  name: string
  email: string
  subject?: string
  message: string
}

// Contact API response
export interface ContactResponse {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  status: string
  created_at: string
}

// Media transform URL params
export interface MediaTransformOptions {
  w?: number
  h?: number
  fit?: "cover" | "contain" | "fill" | "inside" | "outside"
  format?: "webp" | "avif" | "auto" | "jpeg" | "png"
  quality?: number
  blur?: number
  sharpen?: boolean
}
