import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const read = (rel) => {
  const url = new URL(rel, import.meta.url);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
};
const readJson = (rel) => JSON.parse(read(rel));

const pt = readJson("../src/i18n/pt.json");
const en = readJson("../src/i18n/en.json");

// Recursively collect dotted key paths (objects only; arrays are leaves).
const keyPaths = (obj, prefix = "") => {
  if (Array.isArray(obj) || typeof obj !== "object" || obj === null) {
    return [prefix];
  }
  return Object.entries(obj).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
};

test("pt and en resources have identical key shapes", () => {
  const ptKeys = keyPaths(pt).sort();
  const enKeys = keyPaths(en).sort();
  assert.deepEqual(ptKeys, enKeys);
});

test("resources carry the expected per-locale values", () => {
  assert.equal(pt.meta.title, "Luan Cunha - Desenvolvedor Full Stack");
  assert.equal(en.meta.title, "Luan Cunha - Full Stack Developer");
  assert.equal(pt.anchors.services, "servicos");
  assert.equal(en.anchors.services, "services");
  assert.equal(pt.anchors.contact, "contato");
  assert.equal(en.anchors.contact, "contact");
  assert.equal(pt.meta.ogLocale, "pt_BR");
  assert.equal(en.meta.ogLocale, "en_US");
  assert.equal(pt.services.items.length, 6);
  assert.equal(en.services.items.length, 6);
  assert.equal(pt.proof.length, 3);
  assert.equal(en.proof.length, 3);
});

const i18nIndex = read("../src/i18n/index.ts");

test("createI18n builds a fresh, synchronously-initialized instance", () => {
  assert.match(i18nIndex, /export\s+function\s+createI18n/);
  assert.match(i18nIndex, /createInstance\(\)/);
  assert.match(i18nIndex, /initReactI18next/);
  assert.match(i18nIndex, /fallbackLng:\s*['"]pt-BR['"]/);
  assert.match(i18nIndex, /export\s+type\s+Locale/);
});

const headSrc = read("../src/i18n/head.ts");

test("buildHead emits per-locale meta, canonical and hreflang", () => {
  assert.match(headSrc, /export\s+function\s+buildHead/);
  // hreflang alternates
  assert.match(headSrc, /hreflang:\s*['"]pt-BR['"]/);
  assert.match(headSrc, /hreflang:\s*['"]en['"]/);
  assert.match(headSrc, /hreflang:\s*['"]x-default['"]/);
  // per-locale canonical + og image + url
  assert.match(headSrc, /\/en/);
  assert.match(headSrc, /og\.png\?lang=en/);
  // JSON-LD moved here, language-aware
  assert.match(headSrc, /application\/ld\+json/);
  assert.match(headSrc, /'@type':\s*'Person'/);
  assert.match(headSrc, /'@type':\s*'WebSite'/);
  assert.match(headSrc, /'@type':\s*'ProfilePage'/);
  assert.match(headSrc, /inLanguage/);
});

const homeComp = read("../src/components/home.tsx");

test("Home is a locale-driven component with its own i18n provider", () => {
  assert.match(homeComp, /export\s+function\s+Home/);
  assert.match(homeComp, /locale:\s*Locale/);
  assert.match(homeComp, /I18nextProvider/);
  assert.match(homeComp, /createI18n/);
  assert.match(homeComp, /useMemo/);
});

const indexRoute = read("../src/routes/index.tsx");
const enRoute = read("../src/routes/en.tsx");

test("routes render Home with the correct locale and head", () => {
  assert.match(indexRoute, /createFileRoute\(['"]\/['"]\)/);
  assert.match(indexRoute, /buildHead\(['"]pt-BR['"]\)/);
  assert.match(indexRoute, /locale="pt-BR"/);

  assert.match(enRoute, /createFileRoute\(['"]\/en['"]\)/);
  assert.match(enRoute, /buildHead\(['"]en['"]\)/);
  assert.match(enRoute, /locale="en"/);
});

const rootSrc = read("../src/routes/__root.tsx");

test("root derives <html lang> from the URL", () => {
  assert.match(rootSrc, /useRouterState/);
  assert.match(rootSrc, /location\.pathname/);
  assert.match(rootSrc, /startsWith\(['"]\/en['"]\)/);
  assert.match(rootSrc, /<html lang=\{/);
  assert.doesNotMatch(rootSrc, /structuredData/);
  assert.doesNotMatch(rootSrc, /rel: 'canonical'/);
});
