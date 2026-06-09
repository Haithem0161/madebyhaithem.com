# Haithem Mustafa Portfolio

A production-ready Next.js 16 + TypeScript portfolio for Haithem Mustafa (Full Stack Developer)
with Arabic/English (RTL) support and per-project case-study pages.

## Stack

- **Next.js 16** (App Router, Turbopack, RSC)
- **React 19** + **TypeScript 5.9** (strict)
- **Tailwind CSS v4** + **shadcn/ui** (base-nova, RTL)
- **next-intl 4** — i18n (`en`, `ar`) with `proxy.ts` middleware and `as-needed` locale prefix
- **TanStack React Query 5** (SSR-safe singleton + Devtools)
- **Zustand 5** (devtools + persist)
- **Axios** (env-driven, interceptors)
- **Framer Motion** + **Zod 4** + **react-hook-form** + **next-themes**
- **ESLint 9** flat config (`eslint-config-next`)

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (English) or [http://localhost:3000/ar](http://localhost:3000/ar) (Arabic).

## Scripts

```bash
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Run production server
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

## Adding a shadcn component

```bash
pnpx shadcn@latest add card
```

## Adding a locale

1. Add the code (e.g. `fr`) to `routing.locales` in `src/i18n/routing.ts`.
2. Add the direction in `localeDirection` (`ltr` or `rtl`).
3. Create `messages/fr.json` mirroring `messages/en.json`.

## Project layout

See [CLAUDE.md](CLAUDE.md) for the full architecture map and conventions.
