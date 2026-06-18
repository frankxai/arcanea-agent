# Arcanea Agent

Arcanea Agent is the Arcanea-local fork and productization surface for [Hermes Agent](https://github.com/NousResearch/hermes-agent).

## Positioning

Arcanea Agent should become the local-first creative intelligence cockpit for Arcanea OS:

- desktop-first agent experience
- BYOK/provider-auth first
- Arcanea project memory and provenance
- SIS continuity integration
- Arcanea Registry and AgentHub integration
- premium creative workflows, Luminor/Guardian skills, and creator templates

## Foundation decision

This repository starts as a true GitHub fork of `NousResearch/hermes-agent`.

Use Hermes for the substrate:

- desktop app
- CLI/TUI
- provider auth
- profiles and profile distributions
- gateway and webhooks
- MCP client
- skills/plugins
- cron
- session store and memory hooks

Use Arcanea for the differentiated layer:

- Arcanea identity and onboarding
- Arcanea profile distribution
- Arcanea Registry MCP
- SIS memory/project graph/provenance MCPs
- AgentHub views
- Luminor/Guardian workflows
- creator marketplace and premium packs

## Non-goals

- Do not replace Codex, Claude Code, Arcanea Code/OpenCode, Gemini, or SIS.
- Do not fork Hermes core behavior unless the change cannot be a profile, skill, MCP server, plugin, or desktop-only patch.
- Do not custody user model credentials in Arcanea Cloud for v0.
- Do not imply endorsement by Nous Research.

## Install v0 profile

The public installable profile distribution lives in a companion repo because Hermes profile installation expects `distribution.yaml` at the source repo root:

```bash
hermes profile install github.com/frankxai/arcanea-agent-profile --name arcanea-agent --alias --force -y
arcanea-agent chat
```

Local installer wrappers live in `scripts/install-arcanea-agent.sh` and `scripts/install-arcanea-agent.ps1`.

## Repository policy

- `origin`: `https://github.com/frankxai/arcanea-agent.git`
- `upstream`: `https://github.com/NousResearch/hermes-agent.git`
- Profile distribution: `https://github.com/frankxai/arcanea-agent-profile`
- Keep upstream close.
- Keep Arcanea patches small, documented, and easy to rebase.
- Upstream generic fixes to Nous when possible.

## Patch ladder

Before changing Hermes core, try this order:

1. Arcanea profile distribution
2. Arcanea skill
3. Arcanea MCP server
4. Arcanea Hermes plugin
5. Desktop UI/onboarding patch
6. Hermes core patch, preferably upstreamed

## First milestone

Milestone 0 is not a divergent app. It is a safe fork with an Arcanea patch ledger, upstream sync protocol, and a concrete product plan.

Milestone 1 is an installable Arcanea Agent profile distribution that works on stock Hermes.

Milestone 2 is a thin branded desktop prototype only if distribution dogfooding proves it is needed.
