export type ProjectSlug =
  | "wfis"
  | "rdood"
  | "lst"
  | "tan"
  | "beeb"
  | "news-auditor"
  | "lussano"
  | "iraqview"
  | "heidi"
  | "netaudit"
  | "asiabank"
  | "ar-card"
  | "alhikma"
  | "studio-platform"
  | "torch"
  | "alshabaka"
  | "studio-website"
  | "alseraj";

/** A screenshot in public/projects/<slug>/; desktop shots are 1440x900, phone shots 390x844. */
export type Shot = { file: string; phone?: boolean };

export type Project = {
  /** URL slug and i18n key under Projects.items.* */
  slug: ProjectSlug;
  /** Shown as a big card on the home page; the rest sit in the index below */
  featured: boolean;
  /** First year, and the last one or "now" while it's ongoing */
  from: number;
  to?: number | "now";
  /** Tech chips, shown as-is */
  stack: string[];
  /** Public address, when there is one worth visiting */
  link?: string;
  /** Screenshots, the first one leads the case study; alt texts live in Projects.items.<slug>.shots */
  shots?: Shot[];
};

// Featured first in their home-page order, then everything else, newest first.
export const projects: Project[] = [
  {
    slug: "wfis",
    featured: true,
    from: 2026,
    to: "now",
    stack: ["Rust", "Axum", "SQLx", "PostgreSQL", "React 19", "Capacitor", "ORY Kratos", "Vault", "MinIO", "ClamAV", "OpenTelemetry", "Pacemaker", "DRBD"],
  },
  {
    slug: "rdood",
    featured: true,
    from: 2026,
    to: "now",
    stack: ["Rust", "Axum", "SQLx", "PostgreSQL", "pgvector", "Redis", "WebSockets", "Python", "Kotlin", "Swift", "React", "Astro", "GSAP"],
    shots: [{ file: "home.webp" }, { file: "chat.webp" }, { file: "home-phone.webp", phone: true }],
    link: "https://rdoodplatform.com",
  },
  {
    slug: "lst",
    featured: true,
    from: 2026,
    to: "now",
    stack: ["Fastify 5", "TypeScript", "Prisma", "PostgreSQL", "Next.js 16", "React 19", "Vitest"],
    shots: [{ file: "dashboard.webp" }, { file: "er-arrival.webp" }, { file: "warehouse.webp" }, { file: "roles.webp" }],
  },
  {
    slug: "tan",
    featured: true,
    from: 2025,
    to: "now",
    stack: ["Fastify", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "WebSockets", "S3", "Bunny CDN", "FFmpeg", "HLS"],
    shots: [{ file: "listings.webp" }, { file: "reels.webp" }, { file: "dashboard.webp" }],
  },
  {
    slug: "beeb",
    featured: true,
    from: 2025,
    to: 2026,
    stack: ["Rust", "Axum", "SQLx", "PostgreSQL", "PostGIS", "OSRM", "Redis", "WebSockets", "MinIO", "Firebase", "Docker"],
  },
  {
    slug: "news-auditor",
    featured: true,
    from: 2026,
    to: "now",
    stack: ["Rust", "Axum", "SQLx", "PostgreSQL", "Python", "FastAPI", "Whisper", "InsightFace", "pyannote", "React", "hls.js"],
  },
  {
    slug: "lussano",
    featured: false,
    from: 2026,
    to: "now",
    stack: ["Rust", "Axum", "SQLx", "PostgreSQL", "TanStack Start", "React", "Three.js", "GSAP", "FFmpeg", "HLS", "Wayl"],
    shots: [{ file: "home.webp" }, { file: "programs.webp" }, { file: "home-phone.webp", phone: true }],
  },
  {
    slug: "iraqview",
    featured: false,
    from: 2026,
    stack: ["Laravel 13", "PHP", "Inertia", "Vue 3", "PostgreSQL", "Redis", "MinIO", "Reverb", "Pest", "Wayl"],
    shots: [{ file: "home.webp" }, { file: "home-phone.webp", phone: true }],
    link: "https://iraqview.com",
  },
  {
    slug: "heidi",
    featured: false,
    from: 2026,
    stack: ["Fastify 5", "TypeScript", "Prisma", "PostgreSQL", "Next.js 16", "Stripe"],
    shots: [{ file: "home.webp" }, { file: "home-phone.webp", phone: true }],
    link: "https://heidimindcare.co.uk",
  },
  {
    slug: "netaudit",
    featured: false,
    from: 2026,
    to: "now",
    stack: ["Tauri 2", "Rust", "React", "TypeScript", "Python"],
  },
  {
    slug: "asiabank",
    featured: false,
    from: 2026,
    stack: ["Astro", "Cloudflare Workers", "TypeScript"],
    shots: [{ file: "home.webp" }, { file: "home-phone.webp", phone: true }],
    link: "https://asiabank.iq",
  },
  {
    slug: "ar-card",
    featured: false,
    from: 2026,
    stack: ["Rust", "WebAssembly", "SIMD", "WebGL2", "TypeScript"],
  },
  {
    slug: "alhikma",
    featured: false,
    from: 2025,
    to: "now",
    stack: ["Fastify 5", "TypeScript", "React 19", "PostgreSQL", "Socket.IO", "Redis", "FFmpeg", "Stripe"],
    shots: [{ file: "home.webp" }, { file: "home-phone.webp", phone: true }],
    link: "https://alhikmaakademie.com",
  },
  {
    slug: "studio-platform",
    featured: false,
    from: 2025,
    to: "now",
    stack: ["Fastify 5", "TypeScript", "Prisma", "PostgreSQL", "WebSockets", "React 19", "TanStack Query", "shadcn/ui"],
    link: "https://client.thestudioiq.com",
  },
  {
    slug: "torch",
    featured: false,
    from: 2025,
    to: 2026,
    stack: ["Fastify 5", "TypeScript", "Nx", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Tauri 2", "Rust", "React 19", "OpenTelemetry", "Prometheus"],
  },
  {
    slug: "alshabaka",
    featured: false,
    from: 2025,
    to: 2026,
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Socket.IO", "Kafka", "Elasticsearch", "MinIO"],
    shots: [{ file: "browse.webp" }, { file: "sign-in-phone.webp", phone: true }],
    link: "https://alshabaka.imn.iq",
  },
  {
    slug: "studio-website",
    featured: false,
    from: 2025,
    stack: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Lenis"],
    shots: [{ file: "home.webp" }, { file: "home-phone.webp", phone: true }],
    link: "https://thestudioiq.com",
  },
  {
    slug: "alseraj",
    featured: false,
    from: 2024,
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Lenis"],
    shots: [{ file: "home.webp" }, { file: "home-phone.webp", phone: true }],
    link: "https://alseraj.iq",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/** The project after this one, wrapping around, for the "Next project" link. */
export const nextProject = (slug: ProjectSlug): Project =>
  projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

export const projectSlugs = projects.map((p) => p.slug);

/** "2024", "2025 – 2026" or "2026 – now" (`now` is the translated word). */
export const formatPeriod = (p: Project, now: string) =>
  p.to === undefined || p.to === p.from
    ? `${p.from}`
    : `${p.from} – ${p.to === "now" ? now : p.to}`;
