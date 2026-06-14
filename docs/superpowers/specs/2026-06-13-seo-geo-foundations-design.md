# SEO/GEO Foundations — Design

**Date:** 2026-06-13
**Scope:** Technical SEO + GEO (Generative Engine Optimization) foundations for luancunha.dev. Zero visual change.
**Site:** TanStack Start single-page PT-BR portfolio. Domain `https://luancunha.dev/`.

## Goal

Make the site maximally legible to search crawlers and AI answer engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews) without altering the rendered design.

## Current state (already present)

`src/routes/__root.tsx` `head()` already ships: `charSet`, `viewport`, `title`, `description`, full OpenGraph set (`og:title/description/url/site_name/locale/type/image`), Twitter card (`summary_large_image` + title/description/image), `canonical` link, `icon` links, and a Umami analytics script.

Semantic HTML in `index.tsx` is solid: `header`, `section[id]`, `h1`–`h3`, `article`. No `<footer>` element.

## Gaps to close

### 1. Static files in `public/` (served at site root by srvx)

Rationale: content is static (single page, never changes) → static files, not server routes. (`og.png` is a route only because it is dynamically rendered via satori.)

- **`public/robots.txt`**
  - `User-agent: *` → `Allow: /`
  - Explicit `Allow` blocks for AI crawlers: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`.
  - `Sitemap: https://luancunha.dev/sitemap.xml`
- **`public/sitemap.xml`**
  - Single `<url>`: `loc=https://luancunha.dev/`, `lastmod` (2026-06-13), `changefreq=monthly`, `priority=1.0`.
- **`public/llms.txt`**
  - Markdown per the llms.txt convention: H1 name, blockquote one-line summary, then sections — who, services (MVP web, AI engineering, automações/n8n, integrações, sistemas internos, mobile), stack, and contact (WhatsApp, email, GitHub, LinkedIn). Pure GEO surface for AI engines.

### 2. JSON-LD structured data — `__root.tsx` `head().scripts[]`

Append one entry: `{ type: 'application/ld+json', children: JSON.stringify(graph) }`. Renders inside `<head>` via `HeadContent`. Biggest GEO win — machine-readable identity + entity disambiguation.

`@graph` with three nodes:

- **Person** — `name: "Luan Cunha"`, `jobTitle: "Desenvolvedor Full Stack"`, `url`, `email: contato@luancunha.dev`, `description`, `sameAs: ["https://github.com/anluuu", "https://www.linkedin.com/in/luan-cunha-37a7281b0/"]`, `knowsAbout: [...]` (stack/services: produtos web, AI engineering, automações, n8n, integrações, React, React Native, cloud, etc.), `image: https://luancunha.dev/og.png`.
- **WebSite** — `url`, `name: "Luan Cunha"`, `inLanguage: "pt-BR"`, `author: { @id: <person> }`.
- **ProfilePage** — `url`, `mainEntity: { @id: <person> }`, `inLanguage: "pt-BR"`.

Use `@id` cross-references so the three nodes link into one entity graph.

### 3. Missing meta — `__root.tsx` `head().meta[]`

Append: `author` (Luan Cunha), `theme-color` (match site bg), `robots` (`index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`), `og:image:width` (1200), `og:image:height` (630), `og:image:type` (image/png), `og:image:alt`, `twitter:image:alt`.

### 4. Semantic `<footer>` — `index.tsx`

Swap the bottom contact/social wrapper element to `<footer>`. Zero visual change — semantic signal only.

## Files

| File | Action |
|------|--------|
| `public/robots.txt` | new |
| `public/sitemap.xml` | new |
| `public/llms.txt` | new |
| `src/routes/__root.tsx` | edit — append meta + JSON-LD script |
| `src/routes/index.tsx` | edit — `<footer>` swap |
| `tests/seo-geo.test.mjs` | new — assertions |

## Testing

Follow repo convention (`node --test tests/*.test.mjs`, content-assertion style). New `tests/seo-geo.test.mjs`:

- `public/robots.txt` contains `Sitemap:` line + AI-crawler allow rules.
- `public/sitemap.xml` is valid XML, contains the canonical URL.
- `public/llms.txt` exists, non-empty, contains contact + services.
- `__root.tsx` source contains `application/ld+json`, `"@type":"Person"` (or template form), `sameAs`, and the new meta names (`author`, `robots`, `theme-color`, `og:image:width`).
- `index.tsx` source contains `<footer`.

JSON-LD correctness check: parse the `JSON.stringify`'d object in test (import is impractical on a `.tsx`; assert via source regex + a standalone `JSON.parse` of an extracted/shared schema object if factored out). Decision: keep schema inline in `__root.tsx`; test asserts presence via regex. (Plan may factor schema to a `src/seo/schema.ts` module for direct unit import — decide in plan.)

## Out of scope

Performance/CWV audit, a11y pass, copy/keyword rewrite (deferred — "fundamentos técnicos" scope only). No new visible page sections (FAQ block deferred).

## Verification

- `npm run test` green.
- `npm run build` succeeds.
- Manual: curl `/robots.txt`, `/sitemap.xml`, `/llms.txt` return 200 with correct bodies; view-source on `/` shows JSON-LD in `<head>`; validate JSON-LD via schema.org validator / Google Rich Results test.
