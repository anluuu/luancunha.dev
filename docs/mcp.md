# MCP setup

This project includes project-scoped MCP configuration for Codex and Claude Code.

## Codex

Codex reads `.codex/config.toml` after the project is trusted. The config launches both servers with `npx` and forwards only the required local environment variables:

```bash
export DOKPLOY_URL="YOUR_DOKPLOY_URL"
export DOKPLOY_API_KEY="YOUR_DOKPLOY_API_KEY"
export HOSTINGER_API_TOKEN="YOUR_HOSTINGER_API_TOKEN"
codex
```

Configured servers:

- Dokploy MCP: `npx -y @dokploy/mcp`
- Hostinger API MCP: `npx -y hostinger-api-mcp`

## Claude Code

Claude Code reads `.mcp.json` as a project MCP config. Replace the placeholder values locally or add the servers with the CLI using real values from your shell:

```bash
claude mcp add --scope project dokploy-mcp \
  -e DOKPLOY_URL="$DOKPLOY_URL" \
  -e DOKPLOY_API_KEY="$DOKPLOY_API_KEY" \
  -- npx -y @dokploy/mcp

claude mcp add --scope project hostinger-api \
  -e HOSTINGER_API_TOKEN="$HOSTINGER_API_TOKEN" \
  -- npx -y hostinger-api-mcp
```

Do not commit real tokens. Keep secrets in your shell, password manager, or local machine config.

## References

- Dokploy MCP: https://github.com/Dokploy/mcp
- Hostinger API MCP: https://github.com/hostinger/api-mcp-server
