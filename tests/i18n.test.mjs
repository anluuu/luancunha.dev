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
