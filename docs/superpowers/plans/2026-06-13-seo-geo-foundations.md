# SEO/GEO Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add technical SEO + GEO surfaces (robots.txt, sitemap.xml, llms.txt, JSON-LD, missing meta, semantic footer) to luancunha.dev with zero visual change.

**Architecture:** Static crawler/AI files live in `public/` (served at site root by srvx). Structured data + meta are added to the existing `head()` in `src/routes/__root.tsx`. Footer is a semantic element swap in `src/routes/index.tsx`. One test file `tests/seo-geo.test.mjs` asserts all of it, matching the repo's content-assertion convention (`node --test`).

**Tech Stack:** TanStack Start (Router + Vite), Node test runner, schema.org JSON-LD.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `public/robots.txt` | Crawl rules + AI-crawler allows + sitemap pointer |
| `public/sitemap.xml` | Single-URL sitemap |
| `public/llms.txt` | AI-engine-readable site summary |
| `src/routes/__root.tsx` | JSON-LD `@graph` + missing meta in `head()` |
| `src/routes/index.tsx` | `<section id="contato">` → `<footer id="contato">` |
| `tests/seo-geo.test.mjs` | Assertions for all of the above |

---

### Task 1: robots.txt

**Files:**
- Create: `public/robots.txt`
- Test: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Write the failing test**

Create `tests/seo-geo.test.mjs`:

```js
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const read = (rel) => {
  const url = new URL(rel, import.meta.url);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
};

const robots = read("../public/robots.txt");

test("robots.txt allows all and points to sitemap", () => {
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/luancunha\.dev\/sitemap\.xml/);
});

test("robots.txt explicitly allows AI crawlers", () => {
  for (const ua of [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
  ]) {
    assert.match(robots, new RegExp(`User-agent: ${ua}`));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: FAIL (robots is empty string → no match).

- [ ] **Step 3: Create the file**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://luancunha.dev/sitemap.xml
```

- [ ] **Step 4: Run test to verify it passes**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: PASS (robots tests green; sitemap/llms tests not yet written).

- [ ] **Step 5: Commit**

```bash
rtk git add public/robots.txt tests/seo-geo.test.mjs
rtk git commit -m "feat(seo): add robots.txt with AI-crawler allows"
```

---

### Task 2: sitemap.xml

**Files:**
- Create: `public/sitemap.xml`
- Modify: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Write the failing test**

Append to `tests/seo-geo.test.mjs`:

```js
const sitemap = read("../public/sitemap.xml");

test("sitemap.xml lists the canonical URL", () => {
  assert.match(sitemap, /<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(sitemap, /<loc>https:\/\/luancunha\.dev\/<\/loc>/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: FAIL on the sitemap test.

- [ ] **Step 3: Create the file**

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://luancunha.dev/</loc>
    <lastmod>2026-06-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
rtk git add public/sitemap.xml tests/seo-geo.test.mjs
rtk git commit -m "feat(seo): add sitemap.xml"
```

---

### Task 3: llms.txt

**Files:**
- Create: `public/llms.txt`
- Modify: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Write the failing test**

Append to `tests/seo-geo.test.mjs`:

```js
const llms = read("../public/llms.txt");

test("llms.txt summarizes identity, services, and contact", () => {
  assert.match(llms, /^# Luan Cunha/m);
  assert.match(llms, /AI engineering/);
  assert.match(llms, /n8n/);
  assert.match(llms, /contato@luancunha\.dev/);
  assert.match(llms, /github\.com\/anluuu/);
  assert.match(llms, /linkedin\.com\/in\/luan-cunha/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: FAIL on the llms test.

- [ ] **Step 3: Create the file**

Create `public/llms.txt`:

```markdown
# Luan Cunha

> Desenvolvedor full stack. Produtos web, AI engineering, automações, integrações e sistemas sob demanda.

## Sobre

Luan Cunha é desenvolvedor full stack com experiência consolidada em produtos web, AI engineering, automações, integrações e sistemas internos sob demanda. Atua do diagnóstico do problema à entrega de código pronto para produção.

## Serviços

- MVP web — produtos web do zero ao deploy.
- AI engineering — LLM workflows, integrações com Codex e Claude.
- Automações — fluxos operacionais com n8n.
- Integrações — APIs, webhooks, billing, autenticação.
- Sistemas internos — ferramentas sob demanda para operação.
- Mobile — apps com React Native e Expo (OTA).

## Stack

React, React Native, Expo, TypeScript, Node, n8n, Google Cloud, AWS, Claude Code, Codex.

## Contato

- WhatsApp: https://wa.me/5548920045037
- E-mail: contato@luancunha.dev
- GitHub: https://github.com/anluuu
- LinkedIn: https://www.linkedin.com/in/luan-cunha-37a7281b0/
```

- [ ] **Step 4: Run test to verify it passes**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
rtk git add public/llms.txt tests/seo-geo.test.mjs
rtk git commit -m "feat(geo): add llms.txt site summary"
```

---

### Task 4: JSON-LD structured data + missing meta

**Files:**
- Modify: `src/routes/__root.tsx`
- Modify: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Write the failing test**

Append to `tests/seo-geo.test.mjs`:

```js
const root = read("../src/routes/__root.tsx");

test("__root.tsx emits JSON-LD with linked Person/WebSite/ProfilePage", () => {
  assert.match(root, /application\/ld\+json/);
  assert.match(root, /'@type': 'Person'/);
  assert.match(root, /'@type': 'WebSite'/);
  assert.match(root, /'@type': 'ProfilePage'/);
  assert.match(root, /sameAs/);
  assert.match(root, /github\.com\/anluuu/);
  assert.match(root, /JSON\.stringify\(structuredData\)/);
});

test("__root.tsx adds the missing SEO meta", () => {
  assert.match(root, /name: 'author', content: 'Luan Cunha'/);
  assert.match(root, /name: 'robots'/);
  assert.match(root, /max-image-preview:large/);
  assert.match(root, /name: 'theme-color'/);
  assert.match(root, /property: 'og:image:width', content: '1200'/);
  assert.match(root, /property: 'og:image:height', content: '630'/);
  assert.match(root, /property: 'og:image:alt'/);
  assert.match(root, /name: 'twitter:image:alt'/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: FAIL on both new tests.

- [ ] **Step 3: Add the `structuredData` const**

In `src/routes/__root.tsx`, insert immediately before `export const Route = createRootRoute({` (currently line 7):

```tsx
const siteUrl = 'https://luancunha.dev/'
const personId = 'https://luancunha.dev/#luan-cunha'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Luan Cunha',
      jobTitle: 'Desenvolvedor Full Stack',
      url: siteUrl,
      email: 'contato@luancunha.dev',
      image: 'https://luancunha.dev/og.png',
      description:
        'Desenvolvedor full stack com experiência consolidada em produtos web, AI engineering, automações, integrações e sistemas internos sob demanda.',
      knowsAbout: [
        'Produtos web',
        'AI engineering',
        'LLM workflows',
        'Automações',
        'n8n',
        'Integrações de API',
        'React',
        'React Native',
        'Expo',
        'TypeScript',
        'Node.js',
        'Google Cloud',
        'AWS',
      ],
      sameAs: [
        'https://github.com/anluuu',
        'https://www.linkedin.com/in/luan-cunha-37a7281b0/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://luancunha.dev/#website',
      url: siteUrl,
      name: 'Luan Cunha',
      inLanguage: 'pt-BR',
      author: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://luancunha.dev/#profilepage',
      url: siteUrl,
      inLanguage: 'pt-BR',
      mainEntity: { '@id': personId },
    },
  ],
}
```

- [ ] **Step 4: Append the missing meta entries**

In the `meta: [ ... ]` array, after the last entry (`{ name: 'twitter:image', content: 'https://luancunha.dev/og.png' },` on line 36), add:

```tsx
      { name: 'author', content: 'Luan Cunha' },
      { name: 'theme-color', content: '#0a0612' },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: 'Luan Cunha - Desenvolvedor Full Stack' },
      { name: 'twitter:image:alt', content: 'Luan Cunha - Desenvolvedor Full Stack' },
```

- [ ] **Step 5: Append the JSON-LD script**

In the `scripts: [ ... ]` array, after the existing analytics script object (closes with `},` near line 49), add:

```tsx
      {
        type: 'application/ld+json',
        children: JSON.stringify(structuredData),
      },
```

- [ ] **Step 6: Run test to verify it passes**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
rtk git add src/routes/__root.tsx tests/seo-geo.test.mjs
rtk git commit -m "feat(seo): add JSON-LD structured data and missing meta tags"
```

---

### Task 5: Semantic footer

**Files:**
- Modify: `src/routes/index.tsx`
- Modify: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Write the failing test**

Append to `tests/seo-geo.test.mjs`:

```js
const indexPage = read("../src/routes/index.tsx");

test("contact region uses a semantic <footer>", () => {
  assert.match(indexPage, /<footer\s+id="contato"/);
  assert.match(indexPage, /<\/footer>/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: FAIL on the footer test.

- [ ] **Step 3: Swap the element**

In `src/routes/index.tsx`, the last section is the contact block. Change its opening tag from:

```tsx
      <section
        id="contato"
        className="relative z-10 border-t border-[oklch(64%_0.16_300_/_0.2)] bg-[oklch(7%_0.025_285)] px-5 py-20"
      >
```

to:

```tsx
      <footer
        id="contato"
        className="relative z-10 border-t border-[oklch(64%_0.16_300_/_0.2)] bg-[oklch(7%_0.025_285)] px-5 py-20"
      >
```

Then change that block's closing `</section>` (the last `</section>` before `</main>`) to `</footer>`.

- [ ] **Step 4: Run test to verify it passes**

Run: `rtk proxy node --test tests/seo-geo.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
rtk git add src/routes/index.tsx tests/seo-geo.test.mjs
rtk git commit -m "feat(seo): use semantic footer for contact region"
```

---

### Task 6: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `rtk proxy npm run test`
Expected: PASS (all existing tests + `seo-geo.test.mjs`).

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Production build**

Run: `rtk proxy npm run build`
Expected: build succeeds; `dist/client/robots.txt`, `dist/client/sitemap.xml`, `dist/client/llms.txt` are present (Vite copies `public/` to `dist/client`).

- [ ] **Step 4: Runtime smoke test (manual)**

Run: `npm start` then in another shell:
```bash
rtk proxy curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/robots.txt
rtk proxy curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/sitemap.xml
rtk proxy curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/llms.txt
rtk proxy curl -s http://localhost:3000/ | grep -o 'application/ld+json'
```
Expected: three `200`s and one `application/ld+json` match in the SSR HTML.

- [ ] **Step 5: Validate JSON-LD (manual, post-deploy)**

After deploy, run `https://luancunha.dev/` through Google Rich Results Test and schema.org validator. Expected: Person/WebSite/ProfilePage detected, no errors.

---

## Notes

- `theme-color` `#0a0612` approximates the site's near-black `oklch(7% 0.025 285)` background. Adjust if a closer match is wanted.
- JSON-LD is kept inline in `__root.tsx` (no separate module) per the spec decision; tests assert via source regex.
- No `.tsx` is imported in tests — all assertions read source text, matching the existing `home-content.test.mjs` style.
