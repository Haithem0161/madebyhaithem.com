# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 + TypeScript website built with Vite. The React Compiler is enabled for automatic performance optimizations.

**Always use pnpm** - do not use npm or yarn.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Tech Stack

- **Framework:** React 19 with React Compiler (babel-plugin-react-compiler)
- **Build Tool:** Vite with Rolldown
- **Language:** TypeScript (strict mode, ES2022 target)
- **Package Manager:** pnpm
- **Linting:** ESLint 9 with flat config, typescript-eslint, react-hooks plugin

## Architecture

Standard Vite React app structure:

- `src/main.tsx` - React entry point (StrictMode wrapper)
- `src/App.tsx` - Main application component
- `src/index.css` - Global styles (supports light/dark mode)
- `public/` - Static assets served as-is

## Key Configuration

- **vite.config.ts** - React plugin with Babel and React Compiler enabled
- **tsconfig.app.json** - Strict TypeScript with no unused variables/parameters
- **eslint.config.js** - Flat config format (ESLint 9+)

## Reference Guides

- [REACT.md](REACT.md) - React patterns, architecture, and best practices
- [REACT-QUERY.md](REACT-QUERY.md) - TanStack React Query patterns and best practices
- [FRAMER-MOTION.md](FRAMER-MOTION.md) - Framer Motion animation patterns and best practices
- [TAILWIND.md](TAILWIND.md) - Tailwind CSS utilities and patterns
- [I18N.md](I18N.md) - i18n (react-i18next) for Arabic/English translations with RTL support
- [SHADCN.md](SHADCN.md) - shadcn/ui component library and patterns
- [REACT-BITS.md](REACT-BITS.md) - React Bits animated components
- [ZOD.md](ZOD.md) - Zod schema validation and TypeScript types
- [REACT-ROUTER.md](REACT-ROUTER.md) - React Router client-side routing
- [ZUSTAND.md](ZUSTAND.md) - Zustand state management
- [REACT-HELMET.md](REACT-HELMET.md) - React Helmet SEO and meta tags
- [AXIOS.md](AXIOS.md) - Axios HTTP client

<!-- MEMORY:START -->
# Portfoliolio

_Last updated: 2026-02-17 | 68 active memories, 139 total_

## Architecture
- Portfolio project architecture using Vite with comprehensive tech stack: TanStack Router, Framer Motion, shadcn/ui, T... [project-structure, technology-stack]
- Created modular about page components including about-stats, about-tech, and about-section to compose the full page e... [component-design, page-structure]
- Added `@types/three` as a dev dependency to resolve TypeScript type declaration issues for the Three.js library [typescript, dependencies]
- Redesigned featured work section with a dynamic sticky scroll mechanism that translates vertical scroll progress into... [ui, layout, interaction]
- Discovered existing project detail section components at `/src/components/sections/project-detail/`, including Projec... [routing, components]
- Expanded technology tagging system for CMS projects, with predefined tag options growing from initial 10 to 24 differ... [cms, project-management, data-handling]
- Enhanced project tag system to support 10+ additional technology tags including `stripe`, `socketio`, `ai`, `i18n`, a... [tagging, metadata]
- Extended project collection in CMS to include new JSON field types for features, metrics, pullQuote, and gallery, all... [cms, metadata]
- Expanded technology tagging system to include new project tags like 'docker', 'seo', 'rtl', and 'i18n', further enric... [cms, tags]
- Expanded technology tagging system to include security-specific technologies like zero-knowledge authentication, encr... [technology-tags, cms]

## Key Decisions
- Replaced `process.env.NODE_ENV` with `import.meta.env.DEV` to align with Vite's idiomatic environment variable access... [vite, typescript]
- Updated Framer Motion animation configuration to use top-level `type: 'spring'` instead of nested `spring` key for sp... [animation, framer-motion]
- Planned to dynamically calculate years of experience from September 2022 start date and project count from CMS query [stats, automation]
- Implemented a route loader in `about.tsx` to prefetch project query data, ensuring smoother initial page load and imm... [data-fetching, performance]
- Resolved Plasma background rendering and positioning challenges by investigating multiple strategies including fixed ... [UI, Component, Rendering]
- Plan to add 5 projects from CV to CMS collection, marking all as featured, with 8 additional metadata fields includin... [project-management, cms-integration]
- Decided to convert camelCase CMS field slugs to snake_case (`liveUrl` → `live_url`, `repoUrl` → `repo_url`, `techStac... [cms, api]
- Chose to handle CMS data transformation at the API layer by spreading nested `data` object, maintaining a clean separ... [api, data-architecture]
- Chose to use flex layout with `h-full` to normalize card heights across featured work section, ensuring consistent vi... [layout, design-system]
- Redesigned featured work section from grid to horizontal scroll carousel with a terminal 'View All Projects' card, im... [ui, ux, projects]
- Modified featured work section scroll tracking to dynamically calculate section height based on viewport plus actual ... [performance, scroll, layout]
- Plan to enhance existing project detail page by upgrading 7 section components with more impressive design techniques... [design, ui-enhancement]
- Chose to layer the Plasma WebGL shader as a fallback atmospheric background behind the hero gradient, providing a sub... [design-system, visual-enhancement]
- Chose to use TanStack Router's directory-based routing convention over flat file naming to ensure clean, predictable ... [routing, architecture]
- Replaced window resize event listeners with ResizeObserver in LiquidChrome component to improve event handling effici... [performance, web-apis]
- Implemented performance optimizations for page transitions using direct DOM manipulation and refs instead of 60fps Re... [performance, react, optimization]
- Need to implement a more performance-friendly fallback background strategy for project detail pages, potentially repl... [optimization, rendering]
- Implemented performance optimizations for WebGL components by adding IntersectionObserver to pause rendering when com... [performance, webgl]
- Chose to maintain existing tag label mapping strategy when adding new project tags, ensuring consistent human-readabl... [metadata, consistency]
- Continued using snake_case for new CMS field transformations (pull_quote, features) to maintain consistent API data h... [api, naming-convention]

## Patterns & Conventions
- Implemented a barrel export (index.ts) in the icons directory to enable clean, centralized imports for technology sta... [import-pattern, exports]
- Designed about page with a 12-column grid layout using a 5/7 split between portrait and content areas, maintaining a ... [layout, design-system]
- Added `pointer-events-none` to Plasma wrapper to prevent canvas from intercepting mouse interactions with page content [interaction, design]
- Comprehensive responsive design strategy with sophisticated UI/UX techniques: Navigation components (PillNav for desk... [responsive-design, ui-ux, navigation, metadata]
- Systematic CV data integration across website components, dynamically computing professional experience metrics and f... [cv-data, dynamic-content, tanstack-query]
- Implemented a tag label mapping in projects configuration to convert raw tag values (e.g., 'node-js') into human-read... [ui, projects]
- Implemented text truncation strategy using Tailwind's `line-clamp-3` utility to restrict description text to 3 lines ... [tailwind, responsive-design]
- Added `no-scrollbar` custom utility to Tailwind CSS configuration to enable horizontal scrolling without visible scro... [css, tailwind]
- Implemented 'View All' card as the last item in project carousel, providing clear navigation to full project collection [navigation, ui]
- Implemented a scroll-driven horizontal carousel for featured work section using Framer Motion's `useScroll` and `useT... [animation, scroll, performance]
- Implemented a performance optimization strategy targeting high-frequency re-renders by using refs for direct DOM mani... [performance, optimization]
- Added performance best practices to image loading including `loading='lazy'`, `decoding='async'`, and `{ passive: tru... [web-performance, images, event-listeners]
- Restructured route files into a directory-based routing approach with `/routes/work/index.tsx` and `/routes/work/$slu... [routing, project structure]
- Enhanced project detail page with a modular component approach, creating dedicated components for Hero, Overview, Fea... [component design, project structure]
- Used React.lazy and Suspense for code-splitting Plasma WebGL component, reducing initial bundle size and enabling con... [react, performance, code-splitting]
- Updated CMS data transformation logic to handle snake_case field `pull_quote` instead of camelCase `pullQuote` in the... [data-mapping, naming-conventions]
- Updated CMS data transformation logic to handle snake_case field naming for new metadata fields, converting from came... [data-mapping, api-transformation]

## Gotchas & Pitfalls
- PillNav remains left-aligned due to absolute positioning and left-0 class, requiring explicit centering adjustments i... [layout, navigation]
- PillNav's default white background is controlled by the `baseColor` prop, which affects both the logo circle and nav ... [ui, styling]
- Featured work section experienced uneven card heights due to unconstrained description text length and lack of height... [ui, layout]
- TanStack Router can create implicit layout routes with shared prefixes, causing unexpected routing behavior when file... [routing, tanstack-router]
- Identified that MutationObserver in floating-nav was firing excessively on every motion animation style change, creat... [performance, debugging]
- Plasma background component had extensive rendering complexities including positioning constraints, performance issue... [rendering, performance, component]
- Horizontal scroll section encountered height calculation errors, with section height incorrectly set to total track w... [scrolling, layout, calculation]
- Project detail page performance is severely impacted by the Plasma WebGL shader running as a fallback background, whi... [performance, webgl]
- Discovered that WebGL components like Plasma were consuming significant GPU resources by running 60 shader iterations... [performance, webgl, gpu]

## Current Progress
- Successfully added Torch Password Manager as the 8th project in the CMS with comprehensive enterprise security softwa... [project-cms, projects]
- Added Jerash Oil Field Services project to CMS with comprehensive metadata including bilingual support, monorepo arch... [project-cms, metadata]
- Successfully populated 6 projects in the CMS with comprehensive metadata including features, metrics, and pull quotes [cms, project-data]
- Successfully added Alhikma Akademie project to the CMS, capturing full details of the e-learning platform including c... [project-management, cms]
- Successfully created 5 new project entries in the CMS, updating project data and metadata [cms, content]
- Rewrote personal biography text in about section to better reflect professional background and personal narrative [bio, about-page]
- Updated contact page with personal contact information, including changing email to personal Gmail, location to Baghd... [contact, personal-info]
- Project setup and initialization completed, including Vite configuration, library installations (Tailwind, shadcn), p... [project-setup, assets, initialization]
- Added a 'Download CV' button with an <a> tag pointing to `/Haithem Mustafa CV.pdf` in the public directory [ui, cv]

## Context
- CMS credentials set for admin@madebyhaithem.com with specific password, preparing to populate projects collection via... [cms, authentication]

_For deeper context, use memory_search, memory_related, or memory_ask tools._
<!-- MEMORY:END -->
