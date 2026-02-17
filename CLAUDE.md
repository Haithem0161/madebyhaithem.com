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

_Last updated: 2026-02-17 | 23 active memories, 80 total_

## Architecture
- Portfolio project architecture using Vite with comprehensive tech stack: TanStack Router, Framer Motion, shadcn/ui, T... [project-structure, technology-stack]
- Created modular about page components including about-stats, about-tech, and about-section to compose the full page e... [component-design, page-structure]
- Added `@types/three` as a dev dependency to resolve TypeScript type declaration issues for the Three.js library [typescript, dependencies]
- Added TypeScript and NestJS as new technology icons in the /components/icons directory, expanding the tech stack visu... [icons, tech-stack]

## Key Decisions
- Replaced `process.env.NODE_ENV` with `import.meta.env.DEV` to align with Vite's idiomatic environment variable access... [vite, typescript]
- Updated Framer Motion animation configuration to use top-level `type: 'spring'` instead of nested `spring` key for sp... [animation, framer-motion]
- Planned to dynamically calculate years of experience from September 2022 start date and project count from CMS query [stats, automation]
- Implemented a route loader in `about.tsx` to prefetch project query data, ensuring smoother initial page load and imm... [data-fetching, performance]
- Resolved Plasma background rendering and positioning challenges by investigating multiple strategies including fixed ... [UI, Component, Rendering]

## Patterns & Conventions
- Implemented a barrel export (index.ts) in the icons directory to enable clean, centralized imports for technology sta... [import-pattern, exports]
- Designed about page with a 12-column grid layout using a 5/7 split between portrait and content areas, maintaining a ... [layout, design-system]
- Added `pointer-events-none` to Plasma wrapper to prevent canvas from intercepting mouse interactions with page content [interaction, design]
- Comprehensive responsive design strategy with sophisticated UI/UX techniques: Navigation components (PillNav for desk... [responsive-design, ui-ux, navigation, metadata]
- Systematic CV data integration across website components, dynamically computing professional experience metrics and f... [cv-data, dynamic-content, tanstack-query]

## Gotchas & Pitfalls
- PillNav remains left-aligned due to absolute positioning and left-0 class, requiring explicit centering adjustments i... [layout, navigation]
- PillNav's default white background is controlled by the `baseColor` prop, which affects both the logo circle and nav ... [ui, styling]
- Plasma background component had complex rendering issues including: 1) Low intensity values causing near-invisible sh... [plasma, rendering, shader, performance]

## Current Progress
- Rewrote personal biography text in about section to better reflect professional background and personal narrative [bio, about-page]
- Updated contact page with personal contact information, including changing email to personal Gmail, location to Baghd... [contact, personal-info]
- Project setup and initialization completed, including Vite configuration, library installations (Tailwind, shadcn), p... [project-setup, assets, initialization]
- Added a 'Download CV' button with an <a> tag pointing to `/Haithem Mustafa CV.pdf` in the public directory [ui, cv]

_For deeper context, use memory_search, memory_related, or memory_ask tools._
<!-- MEMORY:END -->
