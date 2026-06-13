# Next.js → TanStack Start Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the static `luancunha.dev` portfolio from Next.js 16 to TanStack Start, preserving content, styling, metadata, and the OG image, deployed as a Node server in Docker on Dokploy.

**Architecture:** Fresh TanStack Start scaffold (TanStack Router + Vite 6 + Nitro `node-server`), then port `page.tsx` JSX into a file-based route, translate the Next `Metadata` object into the root route's `head()`, and reimplement the dynamic OG image as a server route using satori + `@resvg/resvg-js`. The existing `globals.css` is reused almost verbatim; the Next font CSS variables are reproduced with self-hosted Fontsource Geist.

**Tech Stack:** TanStack Start, TanStack Router, Vite 6, React 19, Tailwind v4 (`@tailwindcss/vite`), `@fontsource-variable/geist(-mono)`, satori, `@resvg/resvg-js`, Nitro node-server, Docker.

**Spec:** `docs/superpowers/specs/2026-06-13-nextjs-to-tanstack-start-design.md`

---

## File Structure

Files created/modified across the migration:

- `vite.config.ts` — **create** — Vite + tanstackStart + nitro + react + tailwind plugins, port 3000.
- `tsconfig.json` — **modify** — Vite/React JSX + path aliases (replace Next config).
- `package.json` — **modify** — drop Next deps, add TanStack/Vite/font/og deps, rewrite scripts, `"type": "module"`.
- `src/router.tsx` — **create** — `createRouter()` wiring `routeTree.gen.ts`.
- `src/routes/__root.tsx` — **create** — HTML document shell + `head()` metadata + font/css imports (replaces `layout.tsx`).
- `src/routes/index.tsx` — **create** — the page (ported from `page.tsx`).
- `src/routes/og[.]png.ts` — **create** — OG image server route (replaces `opengraph-image.tsx`).
- `src/styles/app.css` — **create** — moved `globals.css` + `:root` Geist font-family vars.
- `public/fonts/Geist-Regular.ttf` — **create** — font buffer for satori.
- `public/icon.svg`, `public/favicon.ico` — **create** — moved from `src/app/`.
- `Dockerfile`, `.dockerignore` — **create**.
- `tests/home-content.test.mjs` — **modify** — repoint asserted paths to new route files.
- **Delete** at the end: `src/app/`, `next.config.*`, `next-env.d.ts`, `eslint.config.mjs` (Next flavor), `.next/`.

---

## Task 1: Scaffold reference project and import boilerplate

Ground the setup in the *current* TanStack Start API (it is pre-1.0; my snippets may be stale) by scaffolding a throwaway project, then copying its canonical config into this repo.

**Files:**
- Create: `vite.config.ts`, `tsconfig.json`, `src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`
- Modify: `package.json`

- [ ] **Step 1: Scaffold a reference app in a temp dir**

```bash
cd /tmp && rm -rf tss-ref && npx @tanstack/cli@latest create tss-ref --template typescript --add-on tailwind --package-manager npm
```

If the CLI flags differ (pre-1.0 drift), run `npx @tanstack/cli@latest create --help` first and use the interactive prompts: TypeScript, Tailwind add-on, npm. Goal is a minimal TanStack Start + Tailwind project.

- [ ] **Step 2: Inspect the generated canonical files**

```bash
cd /tmp/tss-ref && cat vite.config.ts tsconfig.json src/router.tsx src/routes/__root.tsx && cat package.json
```

Expected: real current plugin names (`@tanstack/react-start/plugin/vite`, nitro plugin), `head()` shape, `<HeadContent/>`/`<Scripts/>` import path, and exact dependency versions. **Use these exact names/versions in the steps below — prefer the generated values over this plan's snippets where they differ.**

- [ ] **Step 3: Copy config + boilerplate into the repo**

Copy from `/tmp/tss-ref` into `/Users/anlu/www/luancunha.dev`: `vite.config.ts`, `tsconfig.json`, `src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, and any entry files the template generates (`src/entry-server.tsx`, `src/client.tsx`/`src/main.tsx` if present). Do NOT copy `node_modules`, `package-lock.json`, or `.gitignore`.

Add `server: { port: 3000 }` to `vite.config.ts` if not present, and confirm the nitro preset is `node-server` (default).

- [ ] **Step 4: Merge dependencies into package.json**

Set `"type": "module"`. Replace the `dependencies`/`devDependencies` Next entries with the TanStack stack from the reference `package.json` (pin EXACT versions, no `^`, because pre-1.0). Replace scripts:

```json
{
  "scripts": {
    "dev": "vite dev --port 3000",
    "build": "vite build",
    "start": "node .output/server/index.mjs",
    "lint": "eslint .",
    "test": "node --test tests/*.test.mjs"
  }
}
```

Keep `name`, `version`, `private`. Do NOT remove `src/app/` yet (tests still read it; removed in Task 7).

- [ ] **Step 5: Install and boot**

```bash
rtk pnpm install 2>/dev/null || npm install
npm run dev
```

Expected: dev server boots on `http://localhost:3000` serving the scaffold's placeholder index. Open it to confirm. Ctrl-C to stop.

- [ ] **Step 6: Commit**

```bash
git add vite.config.ts tsconfig.json src/router.tsx src/routes package.json package-lock.json
git commit -m "chore: scaffold TanStack Start alongside Next app"
```

---

## Task 2: Styles + fonts (globals.css → app.css, Fontsource Geist)

**Files:**
- Create: `src/styles/app.css`, `public/fonts/Geist-Regular.ttf`
- Modify: `src/routes/__root.tsx`, `package.json`

- [ ] **Step 1: Add font + asset dependencies**

```bash
npm install @fontsource-variable/geist @fontsource-variable/geist-mono
```

- [ ] **Step 2: Move globals.css into app.css**

```bash
mkdir -p src/styles && cp src/app/globals.css src/styles/app.css
```

`globals.css` already starts with `@import "tailwindcss";` and references `var(--font-geist-sans)` / `var(--font-geist-mono)` in multiple rules. Leave those references untouched.

- [ ] **Step 3: Define the Geist font-family vars**

The Next version set `--font-geist-sans`/`--font-geist-mono` via `next/font`. Reproduce them. Add to the TOP of `src/styles/app.css`, immediately AFTER `@import "tailwindcss";`:

```css
@import "@fontsource-variable/geist/index.css";
@import "@fontsource-variable/geist-mono/index.css";

:root {
  --font-geist-sans: "Geist Variable", Arial, Helvetica, sans-serif;
  --font-geist-mono: "Geist Mono Variable", monospace;
}
```

**Verify the exact Fontsource family names first:** `grep -h "font-family" node_modules/@fontsource-variable/geist/index.css | head -1` and the same for `geist-mono`. Use the exact strings (e.g. `"Geist Variable"`) in the vars above.

- [ ] **Step 4: Wire CSS into the root route**

In `src/routes/__root.tsx`, import the stylesheet as a URL and add it to `head().links` (follow the pattern the scaffold already uses for its own css):

```tsx
import appCss from '../styles/app.css?url'
// ...
head: () => ({
  links: [{ rel: 'stylesheet', href: appCss }],
})
```

Remove any scaffold-default css import that is being replaced.

- [ ] **Step 5: Set `<html lang="pt-BR">`**

In the root document component, set `lang="pt-BR"` on `<html>` (matching the Next `layout.tsx`).

- [ ] **Step 6: Download the satori font buffer**

satori (Task 5) needs a static `.ttf`. Place a Geist static TTF at `public/fonts/Geist-Regular.ttf`:

```bash
mkdir -p public/fonts
cp node_modules/@fontsource/geist/files/geist-latin-400-normal.woff2 /dev/null 2>/dev/null # placeholder check
```

Fontsource ships `.woff2` only (satori needs `.ttf`/`.otf`/`.woff`). Download a Geist static TTF instead:

```bash
curl -L -o public/fonts/Geist-Regular.ttf "https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-sans/Geist-Regular.ttf"
```

Verify: `file public/fonts/Geist-Regular.ttf` reports TrueType font, size > 50KB. If that URL 404s, fetch any Geist `.ttf` from the official `vercel/geist-font` releases. (Used only for OG rendering, not page fonts.)

- [ ] **Step 7: Verify styles load**

```bash
npm run dev
```

Open `http://localhost:3000` — the scaffold placeholder should now render with the dark background / base body styles from `app.css` and Geist applied. Ctrl-C.

- [ ] **Step 8: Commit**

```bash
git add src/styles/app.css src/routes/__root.tsx package.json package-lock.json public/fonts/Geist-Regular.ttf
git commit -m "feat: tailwind + self-hosted Geist fonts in TanStack root"
```

---

## Task 3: Port the page (page.tsx → routes/index.tsx)

**Files:**
- Modify: `src/routes/index.tsx`
- Reference: `src/app/page.tsx` (519 lines, do not delete yet)

- [ ] **Step 1: Copy the page body into the route component**

Replace `src/routes/index.tsx` with:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  // PASTE the entire body of the default export from src/app/page.tsx here
  // (all the const arrays: matrixLines, whatsappHref, emailHref, heroWords,
  //  services, etc. go ABOVE this function or inside the module scope exactly
  //  as in page.tsx), returning the same JSX.
}
```

Concretely: copy everything from `src/app/page.tsx` EXCEPT line 1 (`import Link from "next/link";`) and the `export default function Home()` declaration line. Keep all module-level `const` arrays. Put them at module scope in `index.tsx`. Wrap the returned JSX in the `Home` component above.

- [ ] **Step 2: Replace the 5 `<Link>` usages with `<a>`**

`page.tsx` uses `<Link>` only for in-page hash anchors (`#stack`, `#servicos`, `#contato`) — no client navigation needed. Replace each `<Link ...>` with `<a ...>` and each `</Link>` with `</a>`, keeping `href`, `className`, and children identical.

```bash
# After pasting, confirm none remain:
grep -n "<Link\|</Link\|next/link" src/routes/index.tsx
```

Expected: no matches.

- [ ] **Step 3: Verify it renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Compare against the live Next site / git history: hero ("Luan Cunha."), Matrix lines, services, stack section (`#stack`), contato section (`#contato`), WhatsApp + email links. Visual parity expected. Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: port portfolio page to TanStack route"
```

---

## Task 4: Metadata (layout.tsx Metadata → root head())

**Files:**
- Modify: `src/routes/__root.tsx`
- Create: `public/icon.svg`, `public/favicon.ico`
- Reference: `src/app/layout.tsx`

- [ ] **Step 1: Move the icons to public/**

```bash
cp src/app/icon.svg public/icon.svg && cp src/app/favicon.ico public/favicon.ico
```

- [ ] **Step 2: Translate the Metadata object into head()**

In `src/routes/__root.tsx`, set `head()` to return the full metadata translated from `layout.tsx`. URLs are absolute (no `metadataBase` equivalent):

```tsx
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Luan Cunha - Desenvolvedor Full Stack' },
      {
        name: 'description',
        content:
          'Portfólio de Luan Cunha, desenvolvedor full stack com experiência consolidada em produtos web, AI engineering, automações, integrações e sistemas sob demanda.',
      },
      { property: 'og:title', content: 'Luan Cunha - Desenvolvedor Full Stack' },
      {
        property: 'og:description',
        content:
          'Produtos web, AI engineering, automações, sistemas internos e apps mobile com execução full stack.',
      },
      { property: 'og:url', content: 'https://luancunha.dev/' },
      { property: 'og:site_name', content: 'Luan Cunha' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://luancunha.dev/og.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Luan Cunha - Desenvolvedor Full Stack' },
      {
        name: 'twitter:description',
        content:
          'Produtos web, AI engineering, automações, sistemas internos e apps mobile com execução full stack.',
      },
      { name: 'twitter:image', content: 'https://luancunha.dev/og.png' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: 'https://luancunha.dev/' },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    ],
  }),
  component: RootDocument,
})
```

Keep the `appCss` import from Task 2. Merge — do not duplicate the stylesheet link.

- [ ] **Step 3: Verify rendered head**

```bash
npm run dev
# in another shell:
rtk curl -s http://localhost:3000/ | grep -iE "<title>|og:|twitter:|canonical|description"
```

Expected: `<title>Luan Cunha - Desenvolvedor Full Stack</title>`, all og:/twitter: tags, canonical, description present in SSR HTML. Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add src/routes/__root.tsx public/icon.svg public/favicon.ico
git commit -m "feat: port site metadata and icons to TanStack head"
```

---

## Task 5: OG image server route (opengraph-image.tsx → routes/og[.]png.ts)

**Files:**
- Create: `src/routes/og[.]png.ts`
- Modify: `package.json`
- Reference: `src/app/opengraph-image.tsx`

- [ ] **Step 1: Add OG rendering dependencies**

```bash
npm install satori @resvg/resvg-js
```

- [ ] **Step 2: Create the server route**

Create `src/routes/og[.]png.ts` (the `[.]` escapes the dot so the path is `/og.png`). Port the `opengraph-image.tsx` JSX into a satori call. satori takes a React element via `React.createElement` (no JSX in a `.ts` file) — or rename to `.tsx` and use JSX. Use `.tsx` for readability: name it `src/routes/og[.]png.tsx`.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

export const Route = createFileRoute('/og.png')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Load the font buffer from the public asset (env-agnostic self-fetch).
        const fontRes = await fetch(new URL('/fonts/Geist-Regular.ttf', request.url))
        const fontData = await fontRes.arrayBuffer()

        const svg = await satori(
          // PASTE the JSX tree from opengraph-image.tsx's ImageResponse here,
          // but change the root div style `fontFamily: "Arial, sans-serif"`
          // to `fontFamily: "Geist"`. All other styles copy verbatim.
          <OgImage />,
          {
            width: 1200,
            height: 630,
            fonts: [{ name: 'Geist', data: fontData, weight: 400, style: 'normal' }],
          },
        )

        const png = new Resvg(svg).render().asPng()
        return new Response(png, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=86400, immutable',
          },
        })
      },
    },
  },
})

function OgImage() {
  // PASTE the JSX returned inside opengraph-image.tsx's `new ImageResponse( ... )`
  // (the outer <div style={{...}}> ... </div>), with fontFamily changed to "Geist".
  // satori requires explicit display:flex on any element with >1 child — the
  // source already sets this on every multi-child div, so copy verbatim.
}
```

**Note on `request.url`:** in dev/prod it is the absolute request URL, so `new URL('/fonts/...', request.url)` resolves to the same origin's static asset. Confirm the scaffold's server-route handler signature exposes `request` (check Task 1 Step 2 output); adjust destructuring if the current API names it differently.

- [ ] **Step 3: Verify the PNG renders**

```bash
npm run dev
# another shell:
rtk curl -s -o /tmp/og.png -w "%{content_type} %{size_download}\n" http://localhost:3000/og.png
file /tmp/og.png
```

Expected: `image/png`, size > 10KB, `file` reports `PNG image data, 1200 x 630`. Open `/tmp/og.png` and confirm it matches the current OG (purple gradient, "Luan Cunha", tech tags). Font differs from Arial (now Geist) — acceptable per spec. Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add "src/routes/og[.]png.tsx" package.json package-lock.json
git commit -m "feat: dynamic OG image via satori server route"
```

---

## Task 6: Update existing content tests

The `tests/home-content.test.mjs` suite reads `src/app/page.tsx`, `src/app/layout.tsx`, and `src/app/opengraph-image.tsx` by path and regex-asserts content. Repoint it to the new files so it stays a real regression guard. `tests/mcp-config.test.mjs` is unrelated — leave it.

**Files:**
- Modify: `tests/home-content.test.mjs`

- [ ] **Step 1: Run the suite to see it break on old paths**

```bash
node --test tests/home-content.test.mjs
```

Expected: passes now (old files still exist) OR fails once `src/app` removed. Note current state.

- [ ] **Step 2: Repoint the file reads**

In `tests/home-content.test.mjs`, change the three `new URL(...)` paths:

```js
const page = readFileSync(new URL("../src/routes/index.tsx", import.meta.url), "utf8");
const layout = readFileSync(new URL("../src/routes/__root.tsx", import.meta.url), "utf8");
const ogImageUrl = new URL("../src/routes/og[.]png.tsx", import.meta.url);
```

Then fix any assertion that targeted Next specifics: the `og:image` / metadata assertions now live in `__root.tsx` (the `layout` variable), and the OG JSX lives in the `og[.]png.tsx` file. Adjust each `assert.match(layout, ...)` / `assert.match(ogImage, ...)` so the regex targets the file that now contains that string. Run after each adjustment.

- [ ] **Step 3: Verify the suite passes**

```bash
node --test tests/*.test.mjs
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add tests/home-content.test.mjs
git commit -m "test: repoint content assertions to TanStack route files"
```

---

## Task 7: Remove Next.js, finalize config, Docker

**Files:**
- Delete: `src/app/`, `next-env.d.ts`, `next.config.*`, old `eslint.config.mjs`
- Create: `Dockerfile`, `.dockerignore`, new `eslint.config.mjs`
- Modify: `package.json`, `.gitignore`

- [ ] **Step 1: Remove Next source and config**

```bash
rm -rf src/app next-env.d.ts next.config.mjs next.config.ts 2>/dev/null
```

- [ ] **Step 2: Remove Next dependencies**

```bash
npm uninstall next eslint-config-next
```

Then grep for stragglers: `grep -rn "next/\|from \"next\"\|@next" src/` → expected no matches.

- [ ] **Step 3: Replace ESLint config**

The old `eslint.config.mjs` extends `next`. Replace with a minimal flat config for TypeScript/React (use what the Task 1 scaffold generated if it included one; otherwise):

```js
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['.output/**', 'src/routeTree.gen.ts'] },
)
```

Install missing lint deps if needed (`npm install -D typescript-eslint @eslint/js`). If lint upkeep is not worth it for a one-page site, instead delete `eslint.config.mjs` and remove the `lint` script — decide here.

- [ ] **Step 4: Update .gitignore**

Ensure `.gitignore` ignores `.output`, `.nitro`, `node_modules`, and `src/routeTree.gen.ts` (generated). Remove `.next` entry if present (no longer relevant; harmless to keep).

- [ ] **Step 5: Create .dockerignore**

```
node_modules
.output
.nitro
.git
.next
*.log
docs
```

- [ ] **Step 6: Create the Dockerfile**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

(`.output` from the node-server preset is self-contained; if the build externalizes deps, also `COPY --from=builder /app/node_modules ./node_modules` — verify by checking whether `.output/server/index.mjs` runs standalone in Step 8.)

- [ ] **Step 7: Full local production verification**

```bash
npm run build
npm start &
sleep 3
rtk curl -s http://localhost:3000/ | grep -iE "<title>|og:image"
rtk curl -s -o /tmp/og2.png -w "%{content_type} %{size_download}\n" http://localhost:3000/og.png
file /tmp/og2.png
kill %1
```

Expected: build succeeds, `<title>` + `og:image` present, `/og.png` is a 1200×630 PNG.

- [ ] **Step 8: Docker build + run verification**

```bash
docker build -t luancunha-dev .
docker run --rm -d -p 3000:3000 --name luancunha-test luancunha-dev
sleep 4
rtk curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
rtk curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:3000/og.png
docker stop luancunha-test
```

Expected: both return `200`; og.png content-type `image/png`. If the page 500s on missing deps, add the `node_modules` COPY from Step 6 and rebuild.

- [ ] **Step 9: Run full test suite + lint**

```bash
node --test tests/*.test.mjs
npm run lint
```

Expected: tests pass; lint clean (or `lint` script removed per Step 3).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: remove Next.js, add Dockerfile for Dokploy deploy"
```

---

## Task 8: Update project docs

**Files:**
- Modify: `AGENTS.md`, `README` (if present), `CLAUDE.md` reference

- [ ] **Step 1: Update the framework note**

`AGENTS.md` currently warns about a custom Next.js. Replace its content to reflect TanStack Start: scaffold conventions, where routes live (`src/routes/`), that `routeTree.gen.ts` is generated, the OG server route, and the Docker/Dokploy deploy (`npm run build` → `.output`, `node .output/server/index.mjs`, port 3000).

- [ ] **Step 2: Note Dokploy deploy specifics**

Document for Dokploy: build via Dockerfile, exposes port 3000, no env vars required (static site). If the repo's `docs/mcp.md` references deploy, add a line pointing at the Dockerfile.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md docs
git commit -m "docs: update project docs for TanStack Start"
```

---

## Self-Review Notes

- **Spec coverage:** stack (T1), Tailwind+fonts (T2), page port + Link→a (T3), metadata (T4), OG image satori/resvg (T5), tests (T6), Docker/Nitro/cleanup/ESLint decision (T7), docs (T8). All spec sections mapped.
- **Open spec decisions resolved in plan:** ESLint → replace-or-drop decided in T7S3; satori font → Geist buffer via `public/fonts` (T2S6/T5); Fontsource family name → verified at T2S3.
- **Pre-1.0 risk:** T1S2 explicitly grounds plugin names / `head()` shape / server-handler signature in the live scaffold, overriding this plan's snippets where they drift.
- **Naming consistency:** OG route file is `src/routes/og[.]png.tsx` (with `.tsx` for JSX) throughout T5/T6; `appCss` import shared between T2 and T4 (single stylesheet link, merged not duplicated).
