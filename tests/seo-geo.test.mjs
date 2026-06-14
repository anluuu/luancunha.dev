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

test("sitemap.xml lists the canonical URL", () => {
  assert.match(sitemap, /<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(sitemap, /<loc>https:\/\/luancunha\.dev\/<\/loc>/);
});

const llms = read("../public/llms.txt");

test("llms.txt summarizes identity, services, and contact", () => {
  assert.match(llms, /^# Luan Cunha/m);
  assert.match(llms, /AI engineering/);
  assert.match(llms, /n8n/);
  assert.match(llms, /contato@luancunha\.dev/);
  assert.match(llms, /github\.com\/anluuu/);
  assert.match(llms, /linkedin\.com\/in\/luan-cunha/);
});
