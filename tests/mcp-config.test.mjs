import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const codexConfig = readFileSync(
  new URL("../.codex/config.toml", import.meta.url),
  "utf8",
);
const claudeConfig = JSON.parse(
  readFileSync(new URL("../.mcp.json", import.meta.url), "utf8"),
);
const docs = readFileSync(new URL("../docs/mcp.md", import.meta.url), "utf8");

test("project MCP config includes Dokploy and Hostinger for Codex and Claude Code", () => {
  assert.match(codexConfig, /\[mcp_servers\.dokploy-mcp\]/);
  assert.match(codexConfig, /args = \["-y", "@dokploy\/mcp"\]/);
  assert.match(codexConfig, /env_vars = \["DOKPLOY_URL", "DOKPLOY_API_KEY"\]/);
  assert.match(codexConfig, /\[mcp_servers\.hostinger-api\]/);
  assert.match(codexConfig, /args = \["-y", "hostinger-api-mcp"\]/);
  assert.match(codexConfig, /env_vars = \["HOSTINGER_API_TOKEN"\]/);

  assert.ok(claudeConfig.mcpServers["dokploy-mcp"]);
  assert.ok(claudeConfig.mcpServers["hostinger-api"]);
  assert.deepEqual(claudeConfig.mcpServers["dokploy-mcp"].args, [
    "-y",
    "@dokploy/mcp",
  ]);
  assert.deepEqual(claudeConfig.mcpServers["hostinger-api"].args, [
    "-y",
    "hostinger-api-mcp",
  ]);
});

test("MCP docs are present and configs do not contain real secrets", () => {
  assert.ok(existsSync(new URL("../docs/mcp.md", import.meta.url)));
  assert.match(docs, /Dokploy MCP/);
  assert.match(docs, /Hostinger API MCP/);
  assert.match(docs, /Claude Code/);
  assert.match(docs, /Codex/);

  const serialized = `${codexConfig}\n${JSON.stringify(claudeConfig)}\n${docs}`;
  assert.match(serialized, /YOUR_DOKPLOY_URL/);
  assert.match(serialized, /YOUR_DOKPLOY_API_KEY/);
  assert.match(serialized, /YOUR_HOSTINGER_API_TOKEN/);
  assert.doesNotMatch(serialized, /gho_|sk-|Bearer\s+[A-Za-z0-9._-]+/i);
});
