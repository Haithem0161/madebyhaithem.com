export type ProjectLinkKind = "live" | "appstore" | "internal";

export type ProjectSlug =
  | "torch-core-backend"
  | "torch-business-os"
  | "beeb"
  | "tan"
  | "alshabaka"
  | "alhikma"
  | "studio-system"
  | "studio-client-portal"
  | "studio-website"
  | "alseraj";

export type Project = {
  /** URL slug and i18n key under Projects.items.* */
  slug: ProjectSlug;
  /** Show on the home page featured grid */
  featured: boolean;
  /** Non-translatable date range, e.g. "2024 — 2025" */
  year: string;
  /** Tech stack chips, shown as-is */
  stack: string[];
  /** External link; omitted for internal projects */
  link?: { href: string };
  linkKind: ProjectLinkKind;
};

export const projects: Project[] = [
  {
    slug: "torch-core-backend",
    featured: true,
    year: "2025 — Current",
    stack: [
      "Fastify 5",
      "TypeScript",
      "Nx Monorepo",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "WebSockets",
      "MinIO",
      "Docker",
      "OpenTelemetry",
    ],
    linkKind: "internal",
  },
  {
    slug: "torch-business-os",
    featured: false,
    year: "2025 — Current",
    stack: [
      "Tauri 2",
      "Rust",
      "React 19",
      "TypeScript",
      "SQLite",
      "MessagePack",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
    ],
    linkKind: "internal",
  },
  {
    slug: "tan",
    featured: true,
    year: "2025",
    stack: [
      "Fastify",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "WebSockets",
      "S3",
      "Bunny CDN",
      "FFmpeg / HLS",
    ],
    linkKind: "appstore",
  },
  {
    slug: "beeb",
    featured: false,
    year: "2025",
    stack: [
      "Rust",
      "Axum",
      "PostgreSQL",
      "PostGIS",
      "SQLx",
      "Redis",
      "WebSockets",
      "JWT",
      "FCM",
      "MinIO",
      "Docker",
    ],
    linkKind: "internal",
  },
  {
    slug: "alshabaka",
    featured: true,
    year: "2024 — 2025",
    stack: [
      "NestJS",
      "TypeScript",
      "Sequelize",
      "Socket.IO",
      "Redis",
      "Elasticsearch",
      "Kafka",
      "MinIO",
      "Next.js",
      "Docker",
    ],
    link: { href: "https://alshabaka.imn.iq" },
    linkKind: "live",
  },
  {
    slug: "alhikma",
    featured: false,
    year: "2024 — 2025",
    stack: [
      "Fastify 5",
      "TypeScript",
      "React 19",
      "Vite",
      "PostgreSQL",
      "Socket.IO",
      "Redis",
      "Tailwind CSS",
      "Stripe",
      "Tiptap",
    ],
    link: { href: "https://alhikmaakademie.com" },
    linkKind: "live",
  },
  {
    slug: "studio-system",
    featured: true,
    year: "2025 — Current",
    stack: [
      "Fastify 5",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "WebSockets",
      "React 19",
      "Vite 7",
      "TanStack Query",
      "shadcn/ui",
    ],
    linkKind: "internal",
  },
  {
    slug: "studio-client-portal",
    featured: false,
    year: "2025 — Current",
    stack: [
      "Fastify",
      "TypeScript",
      "React 19",
      "WebSockets",
      "Framer Motion",
      "i18n / RTL",
    ],
    link: { href: "https://client.thestudioiq.com" },
    linkKind: "live",
  },
  {
    slug: "studio-website",
    featured: false,
    year: "2025",
    stack: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Three.js / R3F",
      "GSAP",
      "Framer Motion",
      "Lenis",
      "i18n / RTL",
    ],
    link: { href: "https://thestudioiq.com" },
    linkKind: "live",
  },
  {
    slug: "alseraj",
    featured: false,
    year: "2024",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Lenis",
      "Technical SEO",
    ],
    link: { href: "https://alseraj.iq" },
    linkKind: "live",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const isProjectSlug = (slug: string): slug is ProjectSlug =>
  projects.some((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);
