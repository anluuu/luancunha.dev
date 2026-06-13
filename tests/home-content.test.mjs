import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const page = readFileSync(
  new URL("../src/routes/index.tsx", import.meta.url),
  "utf8",
);
const layout = readFileSync(
  new URL("../src/routes/__root.tsx", import.meta.url),
  "utf8",
);
const ogImageUrl = new URL("../src/routes/og[.]png.tsx", import.meta.url);
const ogImage = existsSync(ogImageUrl) ? readFileSync(ogImageUrl, "utf8") : "";

test("home page presents the Matrix portfolio positioning", () => {
  assert.match(page, /experiência consolidada/i);
  assert.match(page, /Matrix/i);
  assert.match(page, /matrixLines/);
  assert.match(page, /ACCESS_GRANTED/);
  assert.match(page, /neural_handshake/);
  assert.match(page, /Arquitetura/);
  assert.match(page, /react-bits-veil/);
  assert.match(page, /decrypt-text/);
  assert.match(page, /split-text/);
  assert.match(page, /text-type/);
  assert.match(page, /shiny-text/);
  assert.match(page, /AI engineering/);
  assert.match(page, /LLM workflows/);
  assert.match(page, /command-loop/);
  assert.match(page, /orbital-particles/);
  assert.match(page, /stack-carousel/);
  assert.match(page, /React Native/);
  assert.match(page, /Expo/);
  assert.match(page, /Google Cloud/);
  assert.match(page, /AWS/);
  assert.match(page, /n8n/);
  assert.match(page, /Claude Code/);
  assert.match(page, /Codex/);
  assert.match(page, /Falar no WhatsApp/);
  assert.match(page, /5548920045037/);
  assert.match(page, /mailto:contato@luancunha.dev/);
  assert.match(page, /Enviar e-mail/);
  assert.match(page, /https:\/\/github\.com\/anluuu/);
  assert.match(page, /https:\/\/www\.linkedin\.com\/in\/luan-cunha-37a7281b0\//);
  assert.match(page, /GitHub/);
  assert.match(page, /LinkedIn/);
  assert.match(page, /MVP web/);
  assert.match(page, /Automação com n8n/);
  assert.match(page, /App mobile/);
  assert.match(page, /Aberto para freelas selecionados/);
  assert.match(page, /projetos reais sob contrato/);
  assert.match(page, /código público, experimentos e projetos próprios/i);
  assert.match(page, /trajetória, recomendações e contato profissional/i);
  assert.match(layout, /og:title/);
  assert.match(layout, /twitter/);
  assert.match(ogImage, /satori/);
  assert.match(ogImage, /Luan Cunha/);
});
