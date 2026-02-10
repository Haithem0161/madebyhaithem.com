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

_Last updated: 2026-02-10 | 24 active memories, 24 total_

## Architecture
- Portfolio project will use Vite with TanStack Router, Framer Motion, shadcn/ui, Tailwind CSS v4, TanStack Query, Axio... [frontend, libraries, react]
- Project structure created with organized directories for routes, components, lib, hooks, and types in the Portfolioli... [project-setup, structure]
- Header will be reimplemented using TypeScript, TanStack Router, and Framer Motion to match original design's spring-a... [routing, animation]
- Replaced hero background image and BackgroundOrbs component with FloatingLines WebGL shader component in the index route [background, webgl, theme]
- Created a dedicated /components/icons directory to house individual SVG icon components for Node.js, React, Rust, Pos... [component-structure, icons]

## Key Decisions
- Chose to use pre-built libraries and components instead of custom code, with a focus on rapid development using Conte... [development-strategy, libraries]
- Removed default App.tsx and restructured main.tsx to use a more modular routing approach with TanStack Router [routing, cleanup]
- Decided to remove the search feature from the floating navigation component to simplify the user interface [navigation, ui-simplification]
- Plan to port existing React header design from old Portfolio project into new Portfoliolio project, maintaining core ... [redesign, migration]
- Replaced previous tech stack representation with individual, composable SVG icon components for each technology [modularity, ui-components]

## Patterns & Conventions
- Project uses shadcn/ui with oklch color variables and a purple theme, initialized with `rsc: false` configuration [ui, theming]
- Background image uses opacity-40 and mix-blend-overlay CSS classes for subtle visual integration [styling, background]
- Updated index.html with comprehensive SEO tags including favicons, meta descriptions, Open Graph, and Twitter Card me... [seo, metadata]
- Old website header uses a font-based logo with Holland font, custom CSS font-face with multiple font formats (woff2, ... [typography, fonts]
- Tailwind classes were corrected on hero section and floating nav to ensure proper vertical centering and viewport hei... [layout, tailwind, responsive]
- FloatingLines component configured with a purple gradient spanning 4 color stops matching the project's theme [color, theme]
- FloatingLines background features 3 wave layers with 4/6/4 lines, mouse interactivity, and parallax effect [interactions, animation]
- Implemented a barrel export (index.ts) in the icons directory to enable clean, centralized imports for technology sta... [import-pattern, exports]

## Gotchas & Pitfalls
- Navigation icon color on active state needed explicit Tailwind class to maintain white color instead of defaulting to... [ui, navigation, state]

## Current Progress
- Initiated work on creating a new home page for the portfolio website [page-development]
- Copied logo from old website to public directory, replacing the default Vite SVG with a 690x690 PNG monogram logo [assets, migration]
- Downloaded hero background image from hero.html and added it to the project's public/images directory as hero-bg.png [assets, hero]
- Project setup completed through 4 phases: library research, Tailwind/shadcn init, library installation, and initial p... [project-setup]
- Completed project setup through 7 phases, including vite configuration, library files, routes, main.tsx, and initial ... [milestone, setup-complete]

_For deeper context, use memory_search, memory_related, or memory_ask tools._
<!-- MEMORY:END -->
