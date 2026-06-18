# Arcanea Agent Architecture

Arcanea Agent is a layered product on top of Hermes Agent.

```text
Arcanea Agent
├─ Arcanea Desktop / AgentHub surface
│  ├─ initially stock Hermes Desktop
│  └─ later thin branded desktop patches only if needed
├─ Arcanea profile distribution
│  ├─ SOUL.md identity
│  ├─ config defaults
│  ├─ Arcanea skills
│  ├─ MCP wiring
│  └─ optional cron/workflows
├─ Arcanea integrations
│  ├─ Arcanea Registry MCP
│  ├─ SIS memory/project graph MCP
│  ├─ provenance tools
│  └─ native runtime handoff bridge
├─ Hermes Agent core
│  ├─ provider auth
│  ├─ agent loop
│  ├─ tools/skills/plugins
│  ├─ desktop/TUI/CLI/gateway
│  ├─ profiles/sessions/memory
│  └─ cron/webhooks/MCP client
└─ Native execution runtimes
   ├─ Codex
   ├─ Claude Code / Arcanea Flow
   ├─ Arcanea Code / OpenCode
   ├─ Gemini / Antigravity
   └─ local/custom endpoints
```

## Core doctrine

Hermes is the local-first runtime and desktop substrate. Arcanea is the creative OS and product layer.

## Memory doctrine

SIS remains canonical for durable Arcanea continuity. Hermes memory can improve local UX, but Arcanea project decisions, provenance, and cross-runtime handoffs should resolve through SIS or explicitly documented adapters.

## Auth doctrine

Arcanea Agent v0 is BYOK-first. Users sign into provider/coding-agent auth locally through Hermes-supported flows. Arcanea should not custody model credentials in v0.

## Marketplace doctrine

Arcanea Registry should remain protocol-first and attribution-first. Monetize adjacent value first: premium packs, templates, team workspaces, cloud sync, and services. Avoid marketplace payout/revenue-split complexity until product pull is proven.
