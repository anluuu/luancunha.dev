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

const sitemap = read("../public/sitemap.xml");

test("sitemap.xml lists both locales with hreflang alternates", () => {
  assert.match(sitemap, /<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  assert.match(sitemap, /<loc>https:\/\/luancunha\.dev\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/luancunha\.dev\/en<\/loc>/);
  assert.match(sitemap, /hreflang="pt-BR"/);
  assert.match(sitemap, /hreflang="en"/);
  assert.match(sitemap, /hreflang="x-default"/);
});

const llms = read("../public/llms.txt");

test("llms.txt summarizes identity, services, contact and the EN version", () => {
  assert.match(llms, /^# Luan Cunha/m);
  assert.match(llms, /AI engineering/);
  assert.match(llms, /n8n/);
  assert.match(llms, /contato@luancunha\.dev/);
  assert.match(llms, /github\.com\/anluuu/);
  assert.match(llms, /linkedin\.com\/in\/luan-cunha/);
  assert.match(llms, /\/en/);
});

const root = read("../src/routes/__root.tsx");
const head = read("../src/i18n/head.ts");

test("head builder emits JSON-LD with linked Person/WebSite/ProfilePage", () => {
  assert.match(head, /application\/ld\+json/);
  assert.match(head, /'@type': 'Person'/);
  assert.match(head, /'@type': 'WebSite'/);
  assert.match(head, /'@type': 'ProfilePage'/);
  assert.match(head, /sameAs/);
  assert.match(head, /github\.com\/anluuu/);
});

test("root keeps language-neutral SEO meta", () => {
  assert.match(root, /name: 'author', content: 'Luan Cunha'/);
  assert.match(root, /name: 'robots'/);
  assert.match(root, /max-image-preview:large/);
  assert.match(root, /name: 'theme-color'/);
  assert.match(root, /property: 'og:image:width', content: '1200'/);
  assert.match(root, /property: 'og:image:height', content: '630'/);
});

test("head builder carries per-locale title + og:image:alt", () => {
  assert.match(head, /og:image:alt/);
  assert.match(head, /twitter:image:alt/);
  assert.match(head, /meta\.title/);
});

const homeComp2 = read("../src/components/home.tsx");

test("contact region uses a semantic <footer>", () => {
  assert.match(homeComp2, /<footer\s+id=\{anchorContact\}/);
  assert.match(homeComp2, /<\/footer>/);
});
