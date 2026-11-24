export const siteConfig = {
  name: "Haithem Mustafa",
  fullName: "Haithem Mustafa",
  shortName: "Haithem Mustafa Portfolio",
  role: "Full Stack Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://madebyhaithem.com",
  cvHref: { en: "/Haithem Mustafa CV.pdf", ar: "/Haithem Mustafa CV (Arabic).pdf" },
  email: "haithem.m.nadhir@gmail.com",
  phone: "+964 771 001 5981",
  phoneHref: "tel:+9647710015981",
  socials: {
    github: {
      label: "GitHub",
      handle: "github.com/Haithem0161",
      href: "https://github.com/Haithem0161",
    },
    linkedin: {
      label: "LinkedIn",
      handle: "linkedin.com/in/haithem-mustafa-dev",
      href: "https://www.linkedin.com/in/haithem-mustafa-dev/",
    },
    website: {
      label: "Website",
      handle: "madebyhaithem.com",
      href: "https://madebyhaithem.com",
    },
  },
  authors: [{ name: "Haithem Mustafa" }],
  keywords: [
    "Haithem Mustafa",
    "portfolio",
    "full stack engineer",
    "backend developer",
    "Fastify",
    "NestJS",
    "Rust",
    "React",
    "Next.js",
    "PostgreSQL",
    "TypeScript",
    "Baghdad",
    "Iraq",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
