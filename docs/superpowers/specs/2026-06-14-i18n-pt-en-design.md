# i18n PT-BR / EN — Design

**Date:** 2026-06-14
**Stack:** TanStack Start (Router + Vite), React 19, SSR. `react-i18next`.
**Goal:** Bilingual portfolio. PT-BR at `/`, EN at `/en`. SEO-correct (distinct indexable URLs, hreflang, per-language OG/meta).

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Language selection | URL-based: `/` = pt-BR (default), `/en` = en |
| Translation scope | All visible copy + meta/OG/title. Decoration kept as-is. |
| OG image | Per language (PT + EN) |
| Anchor IDs | **Localized** per route (`#servicos`/`#contato` vs `#services`/`#contact`) |
| Library | `react-i18next` (+ `i18next`) — user-mandated |

**Decoration kept untranslated** (code-aesthetic, not prose): `matrixLines`, `commandLoop`, `$ whoami`, `./servicos`, `luan@portfolio:~$`, and similar terminal/code flavor.

## Architecture

### Routing
- `src/routes/index.tsx` → `createFileRoute('/')` — renders `<Home locale="pt-BR" />`.
- `src/routes/en.tsx` → `createFileRoute('/en')` — renders `<Home locale="en" />`.
- Shared page component `src/components/home.tsx` holds the entire page markup (extracted from current `index.tsx`), reading all prose via `t()`. No PT/EN branching inside markup — only translation keys.

### i18n module (`src/i18n/`)
- `src/i18n/pt.json`, `src/i18n/en.json` — translation resources, statically imported (bundled). No async loading, no http backend, no language detector.
- `src/i18n/index.ts` exports:
  - `type Locale = 'pt-BR' | 'en'`
  - `createI18n(locale: Locale)` → returns a **fresh** i18next instance, initialized **synchronously** with both `pt`/`en` resources and `lng = locale`, `fallbackLng = 'pt-BR'`.

**Why fresh instance per render:** A single module-global i18next instance is mutated by `changeLanguage`. Under SSR, concurrent requests in one Node process would race on `i18n.language`. Creating a new instance per `<Home>` render (server: once per request; client: once per page load) eliminates shared mutable state. Locale is fully determined by the route, so no runtime language switching of an existing instance is needed.

### Provider
- `<Home locale>` wraps its tree in `<I18nextProvider i18n={createI18n(locale)}>`.
- `useMemo(() => createI18n(locale), [locale])` so the client doesn't rebuild the instance on every render.
- Page components consume `const { t } = useTranslation()`.

### `<html lang>` (root)
- `__root.tsx` `RootDocument` (shellComponent) derives lang from the URL:
  `useRouterState({ select: (s) => s.location.pathname })` → pathname starts with `/en` ⇒ `lang="en"`, else `lang="pt-BR"`.
- Deterministic on server and client (same URL → same value) ⇒ no `suppressHydrationWarning` needed.

### Head / meta (per route)
TanStack merges head from root + matched route; child overrides parent tags by `name`/`property` (confirmed in `router-core/ssr` skill).

- **`__root` head keeps language-neutral tags:** `charSet`, `viewport`, `theme-color`, `robots`, icon links, analytics script, `og:type`, `og:site_name`, `og:image:width/height/type`.
- **Each route's `head()` emits language-specific tags:**
  - `title`, `description`
  - `og:title`, `og:description`, `og:url`, `og:locale` (`pt_BR` / `en_US`), `og:image`, `og:image:alt`
  - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`
  - `canonical` (`/` for PT, `/en` for EN)
  - JSON-LD `@graph`: `WebSite`/`ProfilePage` `inLanguage`, localized `Person.description` and `jobTitle`.
  - hreflang alternates (identical on both routes):
    - `<link rel="alternate" hreflang="pt-BR" href="https://luancunha.dev/">`
    - `<link rel="alternate" hreflang="en" href="https://luancunha.dev/en">`
    - `<link rel="alternate" hreflang="x-default" href="https://luancunha.dev/">`
- Localized meta strings come from the i18n resources (shared `meta.*` keys) so copy lives in one place. Route `head()` reads them via a small synchronous instance (`createI18n(locale).t(...)`) — `head()` runs outside React, so it can't use the hook.

### OG image (`src/routes/og[.]png.tsx`)
- Add a `lang` search param (`/og.png?lang=en`, default `pt-BR`).
- `OgImage` text becomes locale-aware (hardcoded localized strings in the route file or pulled from a shared constant — kept local to avoid coupling satori render to the i18n runtime).
- EN route sets `og:image` (and `twitter:image`) to `https://luancunha.dev/og.png?lang=en`. PT route unchanged (`/og.png`).

### Anchor IDs / nav (localized)
- Section `id` attributes and in-page nav `href="#..."` are driven by i18n keys (`anchors.services`, `anchors.contact`, `anchors.stack`, …), so PT renders `#servicos` and EN renders `#services`, with nav links matching.

### Language toggle
- Small `PT | EN` switch in the header nav, using TanStack `<Link>`. On `/` it links to `/en`; on `/en` it links to `/`. Current language shown as active/non-link.

### Ancillary SEO files
- `public/sitemap.xml`: add `/en` URL entry; both entries carry `xhtml:link rel="alternate" hreflang` pairs.
- `public/llms.txt`: note an English version exists at `/en`.

## Components / boundaries

| Unit | Purpose | Depends on |
|------|---------|------------|
| `src/i18n/index.ts` | Create SSR-safe i18next instances; export `Locale` | `i18next`, `react-i18next`, resources |
| `src/i18n/{pt,en}.json` | Translation strings (prose, meta, anchors) | — |
| `src/components/home.tsx` | Full page markup, locale-agnostic, uses `t()` | i18n provider |
| `src/routes/index.tsx` | `/` route, PT head, renders `<Home locale="pt-BR">` | home, i18n |
| `src/routes/en.tsx` | `/en` route, EN head, renders `<Home locale="en">` | home, i18n |
| `src/routes/__root.tsx` | Document shell, dynamic `<html lang>`, neutral head | router |
| `src/routes/og[.]png.tsx` | OG PNG, `?lang` param | satori, resvg |

## Error handling / edge cases
- Unknown path under `/en/...`: out of scope (site is a single page); standard router not-found applies.
- Missing translation key → `fallbackLng = 'pt-BR'` returns PT string (visible-but-safe), surfaced by tests.
- `head()` cannot use React hooks → uses a throwaway `createI18n(locale)` instance for string lookup. Acceptable: cheap, synchronous, no shared state.

## Testing (`tests/i18n.test.mjs`, `node --test`)
1. `/` renders with `lang="pt-BR"`; a known PT string present; EN equivalent absent.
2. `/en` renders with `lang="en"`; known EN string present; PT equivalent absent.
3. Both routes emit all three hreflang alternates (pt-BR, en, x-default).
4. Canonical differs: `/` vs `/en`.
5. Anchor IDs localized: PT has `id="servicos"`, EN has `id="services"`.
6. Every key in `pt.json` exists in `en.json` and vice-versa (no missing/extra keys).

## New dependencies
- `i18next`
- `react-i18next`

## Out of scope (YAGNI)
- Runtime language switcher that mutates a live instance (URL routing replaces it).
- Browser/Accept-Language auto-redirect.
- More than two languages.
- Translating decorative/code-flavor strings.
