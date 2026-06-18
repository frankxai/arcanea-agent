# Phase 1 Execution Log

## 2026-06-18

### Completed

- Created public standalone profile-distribution repo: `frankxai/arcanea-agent-profile`.
- Published Arcanea Agent profile payload at repository root so `hermes profile install github.com/frankxai/arcanea-agent-profile` works.
- Added install scripts to the full fork:
  - `scripts/install-arcanea-agent.sh`
  - `scripts/install-arcanea-agent.ps1`
- Built Arcanea Registry MCP in the Arcanea monorepo and verified `dist/cli.js` exists.
- Kept Registry MCP disabled by default because current package requires Supabase service-role env vars.

### Verification commands

```bash
cd C:/Users/frank/arcanea-agent-profile
python - <<'PY'
import json, yaml
for p in ['distribution.yaml','config.yaml']:
    yaml.safe_load(open(p, encoding='utf-8'))
json.load(open('mcp.json', encoding='utf-8'))
PY

hermes profile install github.com/frankxai/arcanea-agent-profile --name arcanea-agent-public-smoke --force -y
hermes profile show arcanea-agent-public-smoke
hermes -p arcanea-agent-public-smoke skills list
hermes -p arcanea-agent-public-smoke mcp list
```

### Open next

- Make Arcanea Registry MCP support read-only/no-Supabase demo mode, or split admin publish/deploy from public discovery.
- Add SIS project graph MCP path.
- Add runtime handoff bridge skill and task contract templates.
