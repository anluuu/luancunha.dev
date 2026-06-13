# Migrate luancunha.dev: Next.js 16 → TanStack Start

**Date:** 2026-06-13
**Status:** Approved design, ready for implementation plan

## Context

`luancunha.dev` is a single-page Portuguese (pt-BR) portfolio site currently built on Next.js 16.2.9 (React 19.2.4, Tailwind v4). It is fully static: one route, no data fetching, no `"use client"`/`"use server"` directives. We are migrating it to TanStack Start, deployed as a Node server in Docker on a self-hosted VPS running Dokploy.

### Next.js features in use

- `src/app/layout.tsx` — `Metadata` export (title, description, openGraph, twitter, canonical, `metadataBase`), `next/font/google` (Geist + Geist Mono), HTML shell (`lang="pt-BR"`), `globals.css` import.
- `src/app/page.tsx` — the page. Pure JSX, framework-agnostic except `import Link from "next/link"` (5 usages, all in-page hash anchors: `#stack`, `#servicos`, `#contato`).
- `src/app/opengraph-image.tsx` — dynamic OG image via `next/og` `ImageResponse`. Uses `fontFamily: "Arial, sans-serif"` only — no custom font loaded.
- `src/app/globals.css` — Tailwind v4 (`@import "tailwindcss"`) + custom theme.
- `src/app/icon.svg`, `src/app/favicon.ico` — site icons.

## Goal

Reproduce the site exactly on TanStack Start — same content, same look, same metadata, same OG image — with no new features and no content changes. Switch bundler (Next → Vite 6), routing (app dir → TanStack Router file-based), and deploy (Node server + Docker).

## Approach

**Fresh scaffold, port content.** Scaffold a clean TanStack Start project, then port `page.tsx` JSX and `globals.css` into the new structure and rewire framework-specific imports. Avoids leftover Next config. Chosen over in-place dependency swap (error-prone) and full rewrite (wasteful — JSX is already portable).

## Architecture

### Stack

- TanStack Start (TanStack Router + Vite 6), React 19
- Tailwind v4 via `@tailwindcss/vite` (no PostCSS config)
- Nitro `node-server` preset
- Fonts: `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`
- OG image: `satori` + `@resvg/resvg-js`
- Deploy: multi-stage Dockerfile → Dokploy, port 3000

**Version pinning:** TanStack Start is pre-1.0. Pin exact versions (no `^`) for `@tanstack/react-start`, `@tanstack/react-router`, and Vite to avoid breakage.

### File mapping

| Next.js | TanStack Start |
|---------|----------------|
| `src/app/layout.tsx` | `src/routes/__root.tsx` — `createRootRoute({ head })`, HTML shell, `<HeadContent/>`, `<Scripts/>`, font + CSS imports |
| `src/app/page.tsx` | `src/routes/index.tsx` — `createFileRoute('/')`, same JSX, `<Link>` → `<a>` |
| `src/app/opengraph-image.tsx` | `src/routes/og[.]png.ts` — server route, satori + resvg → PNG |
| `src/app/globals.css` | `src/styles/app.css` |
| `next/font/google` Geist | `@fontsource-variable/geist(-mono)` imports + Tailwind `@theme` font vars |
| `next/link` | plain `<a>` (all links are hash anchors) |
| `src/app/icon.svg`, `favicon.ico` | `public/` + `links` in root `head` |

### Components

**`src/routes/__root.tsx`** — root document. Renders `<html lang="pt-BR">` shell with `<HeadContent/>` in `<head>` and `<Outlet/>` + `<Scripts/>` in `<body>`. `head()` returns the static `meta[]` and `links[]` arrays translated from the Next `Metadata` object:

- `meta`: `charSet`, `viewport`, `{ title }`, description, and `og:*` / `twitter:*` / `og:image` property tags.
- `links`: canonical (`https://luancunha.dev/`), stylesheet (`app.css?url`), icon (`/icon.svg`), favicon.
- Imports: `app.css?url`, `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`.

`metadataBase` (Next) has no direct equivalent — OG/canonical URLs are written absolute (`https://luancunha.dev/...`).

**`src/routes/index.tsx`** — `createFileRoute('/')` with the ported `page.tsx` JSX as `component`. The 5 `<Link href="#...">` become `<a href="#...">` (same `className`). No loader, no head override (root head covers it).

**`src/routes/og[.]png.ts`** — server route, `GET` handler. Ports the `opengraph-image.tsx` JSX into a satori call (1200×630), renders SVG, converts to PNG with `@resvg/resvg-js`, returns `Response` with `Content-Type: image/png` and a `Cache-Control` header. satori requires ≥1 font buffer; load a Geist `.woff`/`.ttf` (from the fontsource package or `public/`) and pass it. OG meta in `__root.tsx` points `og:image` at `https://luancunha.dev/og.png`.

**`src/styles/app.css`** — content of `globals.css`, with `@theme` block setting `--font-sans: "Geist Variable"` and `--font-mono: "Geist Mono Variable"` (matching the fontsource family names) to replace the Next `--font-geist-sans`/`--font-geist-mono` CSS variables.

### Config files

- `vite.config.ts` — plugins: `tsConfigPaths()`, `tanstackStart()`, `nitro()` (default `node-server`), `viteReact()`, `tailwindcss()`. `server.port: 3000`.
- `package.json` — `"type": "module"`; scripts `dev: vite`, `build: vite build`, `start: node .output/server/index.mjs`. Remove all `next`/`eslint-config-next` deps; add TanStack/Vite/fontsource/satori/resvg deps. Keep `test` script (`node --test tests/*.test.mjs`).
- `tsconfig.json` — Vite/React JSX settings, path aliases.
- `Dockerfile` — multi-stage `node:20-alpine`: build stage runs install + `vite build`; runtime stage copies `.output` + `node_modules`, `EXPOSE 3000`, `ENV NODE_ENV=production`, `CMD ["node", ".output/server/index.mjs"]`.
- `.dockerignore` — `node_modules`, `.output`, `.git`, etc.

## Data flow

None at runtime beyond static serving. SSR renders the single route to HTML; the OG server route renders a PNG on request (cached). No client-side navigation — single page with hash anchors.

## Verification / testing

- `npm run dev` → site renders identically (visual check vs current site: hero, services, stack, contact sections; fonts; gradient/matrix styling).
- `npm run build` → produces `.output/server/index.mjs` with no errors.
- `npm start` → server serves on :3000; `/` returns SSR HTML with correct `<title>`, meta, OG tags; `/og.png` returns a 1200×630 PNG matching the current OG image.
- Existing `tests/*.test.mjs` still pass under `node --test` (review whether any assert Next specifics; update if so).
- Docker build succeeds; container serves on :3000.
- Lint: replace `eslint-config-next` with a Vite/React-appropriate ESLint config (or drop the `lint` script if not worth maintaining for a one-page site — decide during planning).

## Out of scope

- No new features, no content/copy changes, no redesign.
- No client-side routing or additional routes.
- No analytics, CMS, or data layer.

## Risks

- **Pre-1.0 TanStack Start:** pin exact versions; check the scaffold output against current docs (APIs may differ from this spec — verify `tanstackStart`/`nitro` plugin names and `head()` shape against the generated project).
- **satori fonts:** satori needs explicit font buffers and does not auto-load system fonts. The current OG uses `Arial` (a system font satori lacks); supplying a Geist buffer will change the OG font slightly — acceptable, or match intent by bundling an Arial-like fallback. Decide during planning.
- **Fontsource family names:** confirm the exact CSS `font-family` string the variable packages expose before wiring Tailwind `@theme` vars.
