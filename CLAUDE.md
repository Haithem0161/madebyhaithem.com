# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Haithem Mustafa Portfolio** — a Next.js 16 + TypeScript portfolio site for Haithem Mustafa
(Full Stack Developer) with Arabic/English (RTL) support and per-project case-study pages.

**Always use pnpm** — do not use npm or yarn.

## Commands

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build (Turbopack)
pnpm start        # Run production server
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm cv           # rebuild both CV PDFs from cv/ (Chromium)
python3 -I scripts/relief.py public/logo-dark.png public/relief   # regenerate the wall tiles
```

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, RSC)
- **Language:** TypeScript 5.9 (strict)
- **Runtime:** React 19.2
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) + shadcn/ui (`base-nova` preset, `@base-ui/react` primitives, RTL enabled)
- **WebGL:** Three.js (pinned to 0.171.0) for the carved-wall background shader only, no React Three Fiber
- **Smooth scroll:** Lenis (touch + reduced-motion both fall back to native scroll)
- **i18n:** next-intl 4 (App Router, `[locale]` segment, `src/proxy.ts` middleware, `as-needed` locale prefix)
- **State:** Zustand v5 (`scene-store` for the preloader's ready signals, no persist)
- **Server State:** TanStack React Query v5 (SSR-safe singleton + Devtools in dev)
- **HTTP:** Axios (auth interceptors, env-driven base URL)
- **Animations:** Framer Motion (entrance + scroll reveals)
- **Validation:** Zod v4
- **Theme:** `next-themes` forced to light (v1)
- **Forms:** react-hook-form + `@hookform/resolvers`
- **Icons:** lucide-react
- **Fonts:** Fraunces (display, italic, variable opsz/SOFT) + Inter (body) via `next/font`; Noto Kufi Arabic for `ar`
- **Package Manager:** pnpm 10
- **Linting:** ESLint 9 flat config + `eslint-config-next` (core-web-vitals + typescript)

## Architecture

```
.
├── cv/                                # CV source (en.html, ar.html, print.mjs) -> public/*.pdf via `pnpm cv`
├── scripts/relief.py                  # carves the H logo into the wall tiles in public/relief (cv2, numpy, PIL)
├── messages/                          # next-intl message catalogs
│   ├── en.json
│   └── ar.json
├── public/
│   ├── logo.png                       # H logo mark (light); logo-dark.png is the dark one
│   ├── relief/                        # wall tiles: tile-{a,b,c}{,-half,-mask,-static}.webp (scripts/relief.py)
│   ├── projects/<slug>/               # case-study screenshots (webp), listed in projects.ts `shots`
│   ├── Haithem Mustafa CV.pdf         # CV download, English (built by `pnpm cv` from cv/)
│   └── Haithem Mustafa CV (Arabic).pdf  # CV download, Arabic (siteConfig.cvHref[locale])
├── next.config.ts                     # withNextIntl plugin + optimizePackageImports + transpilePackages: three
├── postcss.config.mjs                 # @tailwindcss/postcss
├── components.json                    # shadcn/ui (base-nova, RTL, RSC)
└── src/
    ├── proxy.ts                       # next-intl middleware (Next 16 renamed middleware to proxy)
    ├── app/
    │   ├── globals.css                # Tailwind v4 tokens (editorial light + warm; emerald, peach)
    │   ├── favicon.ico
    │   ├── not-found.tsx              # Root 404 (renders html)
    │   ├── global-error.tsx           # Top-level error boundary (renders html)
    │   ├── robots.ts                  # /robots.txt
    │   ├── sitemap.ts                 # /sitemap.xml (locale-aware)
    │   └── [locale]/
    │       ├── layout.tsx             # html lang+dir, Fraunces+Inter+Noto Kufi, providers, SiteShell
    │       ├── page.tsx               # Section composition (Hero/About/Projects/Skills/Contact/Footer)
    │       ├── projects/
    │       │   ├── page.tsx           # /projects listing (all projects)
    │       │   └── [slug]/
    │       │       ├── page.tsx       # /projects/[slug] case study (generateStaticParams + metadata)
    │       │       └── project-detail.tsx  # client reveal wrapper for a project case study
    │       ├── not-found.tsx          # Locale-scoped 404
    │       └── error.tsx              # Locale-scoped error boundary
    ├── components/
    │   ├── ui/                        # shadcn components (add via: pnpx shadcn@latest add <component>)
    │   ├── canvas/
    │   │   ├── wall.ts                # the carved H wall: full-screen shader + cursor/ghost flow map (ported from Lussano)
    │   │   └── wall-canvas.tsx        # mounts the wall behind the page; setWallDark(); html[data-gl=off] fallback
    │   ├── cursor/cursor.tsx          # custom dot + ring, magnetic on links/buttons/[data-cursor]
    │   ├── preloader/preloader.tsx    # cream splash, traced H, progress, fades on isReady
    │   ├── sections/
    │   │   ├── section-shell.tsx      # eyebrow + display title shared shell
    │   │   ├── hero.tsx               # "Hi, I'm Haithem." + CTAs
    │   │   ├── about.tsx              # lead paragraph, facts, where I've worked
    │   │   ├── projects.tsx           # home: 6 featured cards, then an index of the rest
    │   │   ├── project-card.tsx       # featured card with a big lead number
    │   │   ├── project-index.tsx      # compact project rows (home + /projects), exports rowReveal
    │   │   ├── projects-listing.tsx   # /projects: every project as index rows
    │   │   ├── skills.tsx             # Skills matrix grouped chips
    │   │   ├── contact.tsx            # Big mailto, phone, website, GitHub, LinkedIn, location, CV; turns the wall dark
    │   │   └── footer.tsx
    │   ├── site/
    │   │   ├── header.tsx             # Fixed wordmark + locale switcher
    │   │   └── site-shell.tsx         # Client wrapper: MotionConfig, Lenis, Cursor, Preloader, WallCanvas
    │   └── locale-switcher.tsx
    ├── hooks/
    │   ├── use-lenis.ts               # singleton Lenis smooth scroll (off for touch and reduced motion)
    │   ├── use-hash-scroll.ts         # scrolls to #section after cross-page nav (e.g. /#about)
    │   └── use-media-query.ts         # SSR-safe useSyncExternalStore wrapper
    ├── i18n/
    │   ├── routing.ts                 # defineRouting (en, ar) + localeDirection map
    │   ├── request.ts                 # getRequestConfig - async messages loader
    │   ├── navigation.ts              # createNavigation -> typed Link/redirect/usePathname/useRouter
    │   └── global.d.ts                # AppConfig augmentation for typed t() and Locale
    ├── lib/
    │   ├── api.ts                     # Axios instance (interceptors, env base URL)
    │   ├── env.ts                     # Zod-validated env (server/client schemas)
    │   ├── projects.ts                # Project[] data (slug/period/stack/link/shots) + featured/other/next; copy lives in messages
    │   ├── query-client.ts            # SSR-safe singleton QueryClient
    │   ├── site.ts                    # siteConfig (email/phone/socials/cv/keywords)
    │   └── utils.ts                   # cn() helper
    ├── providers/
    │   ├── index.tsx                  # Theme (forced light) + Query providers
    │   ├── query-provider.tsx
    │   └── theme-provider.tsx
    └── stores/
        └── scene-store.ts             # zustand: the preloader's ready signals (canvas, assets, min time)
```

- **Path alias:** `@/*` → `src/*` (`tsconfig.json`)
- **Locale routing:** `localePrefix: 'as-needed'` — English at `/`, Arabic at `/ar`. Direction is set via `<html dir="rtl|ltr">` in the locale layout.
- **Server vs client:** prefer Server Components. Mark client islands with `"use client"` (providers, switchers, anything using hooks/context/state).

## Key Patterns

- **Translations (server):** `const t = await getTranslations(namespace?)` after `setRequestLocale(locale)`.
- **Translations (client):** `const t = useTranslations(namespace?)` inside a `"use client"` component, descended from `<NextIntlClientProvider>`.
- **Navigation:** import `Link, useRouter, usePathname` from `@/i18n/navigation` — never from `next/link` or `next/navigation` for locale-aware routes.
- **Metadata:** `generateMetadata` in `[locale]/layout.tsx` uses `getTranslations` + `siteConfig`. Per-page metadata can override.
- **Env vars:** add to `.env.local`, mirror in `.env.example`, declare in `src/lib/env.ts`. Server-only vars must NOT be prefixed with `NEXT_PUBLIC_`.
- **Adding shadcn components:** `pnpx shadcn@latest add <component>` — installs into `src/components/ui/`. The active preset is `base-nova` with `@base-ui/react` (not Radix), so `asChild` is not available — wrap children in `Link`/etc. directly or use `buttonVariants({...})` as a className.

## Reference Guides

- [REACT.md](REACT.md) — React 19 patterns
- [REACT-QUERY.md](REACT-QUERY.md) — TanStack React Query
- [FRAMER-MOTION.md](FRAMER-MOTION.md) — Framer Motion
- [SHADCN.md](SHADCN.md) — shadcn/ui
- [REACT-BITS.md](REACT-BITS.md) — animated components
- [ZOD.md](ZOD.md) — schema validation
- [ZUSTAND.md](ZUSTAND.md) — state management
- [AXIOS.md](AXIOS.md) — HTTP client

<!-- MEMORY:START -->
# Portfoliolio

_Last updated: 2026-06-09 | 34 active memories, 237 total_

## Architecture
- Added `@types/three` as a dev dependency to resolve TypeScript type declaration issues for the Three.js library [typescript, dependencies]
- Redesigned featured work section with a dynamic sticky scroll mechanism that translates vertical scroll progress into... [ui, layout, interaction]
- Portfolio project with comprehensive modular architecture using Vite and modern web technologies. Project structure i... [portfolio, modular-architecture, web-technologies, component-design]

## Key Decisions
- Planned to dynamically calculate years of experience from September 2022 start date and project count from CMS query [stats, automation]
- Implemented a route loader in `about.tsx` to prefetch project query data, ensuring smoother initial page load and imm... [data-fetching, performance]
- Resolved Plasma background rendering and positioning challenges by investigating multiple strategies including fixed ... [UI, Component, Rendering]
- Plan to add 5 projects from CV to CMS collection, marking all as featured, with 8 additional metadata fields includin... [project-management, cms-integration]
- Plan to enhance existing project detail page by upgrading 7 section components with more impressive design techniques... [design, ui-enhancement]
- Need to implement a more performance-friendly fallback background strategy for project detail pages, potentially repl... [optimization, rendering]
- Planned to use a frontend API layer to transform raw CMS image field strings into fully resolved media objects for pr... [cms, api-layer, data-transformation]
- Planned to modify backend media transform endpoint to use cross-origin resource policy that allows loading images fro... [cors, images, backend]
- Selected 7 high-quality screenshots for project documentation, deliberately excluding 404 pages and text-only homepag... [media-selection, project-documentation]
- Transformed CMS data handling strategy to use snake_case for field names, ensuring consistent API data conversion and... [CMS, data-transformation, API]
- Implemented performance optimizations for WebGL and scroll-based components, including IntersectionObserver to pause ... [performance, WebGL, rendering]
- Optimized project image handling with compression, format conversion, and normalization strategies to reduce file siz... [images, optimization, media]
- Enhanced project presentation with dynamic layout and scroll strategies, including horizontal carousel, grid layouts,... [layout, scrolling, UX]

## Patterns & Conventions
- Designed about page with a 12-column grid layout using a 5/7 split between portrait and content areas, maintaining a ... [layout, design-system]
- Added `pointer-events-none` to Plasma wrapper to prevent canvas from intercepting mouse interactions with page content [interaction, design]
- Frontend optimization encompassing multiple performance and design strategies: Code-splitting, responsive design, SEO... [optimization, frontend, performance, design]
- Scroll and navigation management using custom hooks like `use-scroll-to-top.ts` that integrate `useLenis` and `useLoc... [hooks, navigation, scroll-management]

## Gotchas & Pitfalls
- PillNav remains left-aligned due to absolute positioning and left-0 class, requiring explicit centering adjustments i... [layout, navigation]
- PillNav's default white background is controlled by the `baseColor` prop, which affects both the logo circle and nav ... [ui, styling]
- Featured work section experienced uneven card heights due to unconstrained description text length and lack of height... [ui, layout]
- TanStack Router can create implicit layout routes with shared prefixes, causing unexpected routing behavior when file... [routing, tanstack-router]
- Identified and fixed potential error propagation issue in contact form submission by avoiding `throw undefined` which... [error-handling, form-submission]
- Discovered that the Arabic language project image filename includes non-standard characters (السراج-حلول-تكنولوجيا-ال... [internationalization, file-naming]
- CMS media handling involves complex challenges including: multiple image upload formats, token management for uploads... [CMS, media, uploads, integration]
- WebGL/Plasma background components present significant performance challenges: high shader computation (60 iterations... [performance, WebGL, rendering]
- Animation stagger techniques can create visual flickering when parent and child components simultaneously animate opa... [animation, UI, performance]

_For deeper context, use memory_search, memory_related, or memory_ask tools._
<!-- MEMORY:END -->
