# Arcanea Agent Profile Distribution

This directory is the first Arcanea Agent product surface: an installable Hermes profile distribution.

## Install locally from this checkout

```bash
hermes profile install C:/Users/frank/arcanea-agent/arcanea/profile-distribution --name arcanea-agent --alias --force -y
arcanea-agent setup
arcanea-agent chat
```

The Arcanea Registry MCP entry lives in `config.yaml` under `mcp_servers.arcanea_registry` and is installed disabled by default. Build the registry MCP package and enable/test it before public use.

If `hermes profile install` is unavailable in the installed Hermes version, create a profile manually and copy these files into it:

```bash
hermes profile create arcanea-agent --description "Arcanea local-first creative intelligence profile"
```

Then copy `SOUL.md`, `config.yaml`, `mcp.json`, and `skills/` into the created profile directory.

## What this includes

- Arcanea identity and operating doctrine.
- Safe config defaults.
- Optional Arcanea Registry MCP wiring.
- Starter Arcanea skill.

## What this does not include

- Provider credentials.
- User memories.
- Sessions.
- Logs.
- Any private Arcanea cloud secrets.

## Next steps

1. Build `packages/arcanea-registry-mcp` in the Arcanea monorepo.
2. Install this distribution into a fresh Hermes profile.
3. Start a chat and ask: `run arcanea start`.
4. Verify Registry MCP tools are available when env vars are configured.
