# Install Arcanea Agent

Arcanea Agent currently ships as a Hermes Agent fork plus a standalone installable Hermes profile distribution.

## Fast path

```bash
hermes profile install github.com/frankxai/arcanea-agent-profile --name arcanea-agent --alias --force -y
arcanea-agent chat
```

## From this fork checkout

```bash
cd C:/Users/frank/arcanea-agent
bash scripts/install-arcanea-agent.sh
```

Windows PowerShell users can run:

```powershell
cd C:\Users\frank\arcanea-agent
.\scripts\install-arcanea-agent.ps1
```

## Reinstall / smoke test under a different profile

```bash
bash scripts/install-arcanea-agent.sh --name arcanea-agent-smoke --no-alias
hermes -p arcanea-agent-smoke skills list
hermes -p arcanea-agent-smoke mcp list
```

## Profile source

The public profile-distribution repo is:

https://github.com/frankxai/arcanea-agent-profile

It exists because Hermes profile installation expects `distribution.yaml` at the root of the source repo. The full `arcanea-agent` fork contains the Hermes codebase, so the profile is published separately to avoid copying the entire fork into a Hermes profile.

## Security posture

- Provider credentials remain local to Hermes.
- `.env`, `auth.json`, memories, sessions, and logs are never shipped.
- Arcanea Registry MCP is wired but disabled by default.
- SIS integration is planned as a read/provenance-first MCP path.
