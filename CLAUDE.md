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

_Last updated: 2026-02-10 | 33 active memories, 67 total_

## Architecture
- Portfolio project architecture using Vite with comprehensive tech stack: TanStack Router, Framer Motion, shadcn/ui, T... [project-structure, technology-stack]
- Created modular about page components including about-stats, about-tech, and about-section to compose the full page e... [component-design, page-structure]
- Added `@types/three` as a dev dependency to resolve TypeScript type declaration issues for the Three.js library [typescript, dependencies]

## Key Decisions
- Replaced previous tech stack representation with individual, composable SVG icon components for each technology [modularity, ui-components]
- Added dynamic device pixel ratio (DPR) control to Plasma component to reduce raymarching computational complexity fro... [performance, optimization]
- Refined Plasma background component positioning strategy, initially using fixed positioning for full viewport coverag... [layout, component, performance]
- Focused on modular development approach, including porting existing design patterns, using composable components, and... [architecture, design, modularity]
- Resolved Plasma background rendering issue by switching to `fixed` positioning to ensure full viewport coverage behin... [layout, background]
- Investigate potential solutions to make Plasma background visible: making page background transparent or adjusting st... [debugging, visual-layers]
- Need to adjust Plasma canvas rendering strategy to stretch dynamically with full page content height, potentially usi... [canvas, responsive, layout]
- Added console logging and debug backgrounds to diagnose exact viewport sizing and rendering issues in Plasma component [debugging, performance]
- Planned to add vertical offset in shader to shift plasma effect upward and ensure full viewport visual coverage [graphics, optimization]
- Abandoned Plasma background component and decided to replace it with LiquidChrome component as an alternative backgro... [background, rendering]
- Replaced `process.env.NODE_ENV` with `import.meta.env.DEV` to align with Vite's idiomatic environment variable access... [vite, typescript]
- Updated Framer Motion animation configuration to use top-level `type: 'spring'` instead of nested `spring` key for sp... [animation, framer-motion]

## Patterns & Conventions
- Implemented a barrel export (index.ts) in the icons directory to enable clean, centralized imports for technology sta... [import-pattern, exports]
- Designed about page with a 12-column grid layout using a 5/7 split between portrait and content areas, maintaining a ... [layout, design-system]
- Added `pointer-events-none` to Plasma wrapper to prevent canvas from intercepting mouse interactions with page content [interaction, design]
- Navigation and UI components designed with responsive techniques: PillNav for desktop, Dock for mobile, using precise... [ui, responsive, styling, navigation]
- Enhanced HTML metadata for improved SEO and sharing, including favicons, meta descriptions, Open Graph, and Twitter C... [seo, metadata]

## Gotchas & Pitfalls
- Navigation icon color on active state needed explicit Tailwind class to maintain white color instead of defaulting to... [ui, navigation, state]
- PillNav remains left-aligned due to absolute positioning and left-0 class, requiring explicit centering adjustments i... [layout, navigation]
- PillNav's default white background is controlled by the `baseColor` prop, which affects both the logo circle and nav ... [ui, styling]
- Plasma background component had multiple rendering issues including low intensity values causing near-invisible shade... [performance, rendering, component]
- Plasma background rendering is blocked by the root layout's opaque background, causing it to be invisible when using ... [rendering, positioning, background]
- Plasma background container renders only at viewport height, not full content height, causing partial visual coverage... [rendering, canvas, layout]
- Plasma background component's ResizeObserver is not accurately capturing full viewport height dynamically, causing pa... [rendering, canvas, responsive]
- Plasma background shader renders visible plasma concentrated in lower viewport, producing near-transparent output in ... [rendering, shader, graphics]

## Current Progress
- Project initialization and setup completed, including comprehensive phases: library research, Tailwind/shadcn setup, ... [project-setup, initialization]
- Refined Plasma background visual parameters including DPR reduction to 0.5, opacity increased to 0.8, animation speed... [performance, visual-design]
- Successfully built about page with a production bundle size of 19.20 kB (6.66 kB gzipped) [build, performance]
- Copied logo from old website to public directory, replacing the default Vite SVG with a 690x690 PNG monogram logo [assets, migration]
- Downloaded hero background image from hero.html and added it to the project's public/images directory as hero-bg.png [assets, hero]

_For deeper context, use memory_search, memory_related, or memory_ask tools._
<!-- MEMORY:END -->
