import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const read = (rel) => {
  const url = new URL(rel, import.meta.url);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
};
const readJson = (rel) => JSON.parse(read(rel));

const home = read("../src/components/home.tsx");
const pt = readJson("../src/i18n/pt.json");
const ogImage = read("../src/routes/og[.]png.tsx");

test("home component keeps the Matrix decoration intact", () => {
  assert.match(home, /matrixLines/);
  assert.match(home, /ACCESS_GRANTED/);
  assert.match(home, /neural_handshake/);
  assert.match(home, /react-bits-veil/);
  assert.match(home, /decrypt-text/);
  assert.match(home, /split-text/);
  assert.match(home, /text-type/);
  assert.match(home, /shiny-text/);
  assert.match(home, /command-loop/);
  assert.match(home, /orbital-particles/);
  assert.match(home, /stack-carousel/);
  assert.match(home, /luan@portfolio:~\$/);
});

test("home component renders via translations and localized anchors", () => {
  assert.match(home, /useTranslation/);
  assert.match(home, /t\(/);
  assert.match(home, /anchors\.services/);
  assert.match(home, /anchors\.contact/);
  assert.match(home, /<footer/);
});

test("portfolio positioning lives in the PT resources", () => {
  assert.equal(pt.meta.personDescription.includes("experiência consolidada"), true);
  assert.equal(pt.cta.whatsapp, "Falar no WhatsApp");
  assert.equal(pt.cta.email, "Enviar e-mail");
  assert.equal(pt.stack.title, "Arquitetura de ponta a ponta.");
  assert.equal(pt.services.items[0].title, "MVP web");
  assert.equal(pt.availability.title.startsWith("Aberto para freelas selecionados"), true);
  assert.equal(pt.social.github.includes("código público"), true);
  assert.equal(pt.social.linkedin.includes("trajetória"), true);
});

test("brand and tech tokens remain present", () => {
  for (const token of [
    "React Native", "Expo", "Google Cloud", "AWS", "n8n",
    "Claude Code", "Codex", "AI Engineering", "LLM workflows",
  ]) {
    assert.match(home, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(home, /5548920045037/);
  assert.match(home, /mailto:contato@luancunha\.dev/);
  assert.match(home, /https:\/\/github\.com\/anluuu/);
  assert.match(home, /https:\/\/www\.linkedin\.com\/in\/luan-cunha-37a7281b0\//);
});

test("og image route still uses satori and the brand name", () => {
  assert.match(ogImage, /satori/);
  assert.match(ogImage, /Luan Cunha/);
});
