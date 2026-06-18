# Arcanea Patch Ledger

This ledger tracks every Arcanea-specific divergence from upstream Hermes Agent.

## Rule

No Arcanea patch should land without an entry here unless it is pure documentation about Arcanea's use of the fork.

For each patch, answer:

1. What changed?
2. Why can it not be implemented as a profile distribution, skill, MCP server, plugin, or desktop-only config?
3. What upstream file(s) did it touch?
4. How do we test it?
5. Should it be upstreamed to Nous?

## Current patch stack

| Date | Commit | Area | Files | Reason | Upstream candidate | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-06-18 | 77841e77f, ef3ed0e43 | bootstrap docs/profile config | `ARCANEA.md`, `ARCANEA_PATCH_LEDGER.md`, `UPSTREAM_SYNC.md`, `docs/arcanea/*`, `arcanea/profile-distribution/*` | Establish fork doctrine and v0 product plan without touching Hermes core. | No | Docs readback, git status, remotes, YAML/JSON validation, local profile install, `hermes -p arcanea-agent mcp list`. |
| 2026-06-18 | 75c113baa | installer/profile publication | `scripts/install-arcanea-agent.sh`, `scripts/install-arcanea-agent.ps1`, `docs/arcanea/INSTALL.md`, `docs/arcanea/PHASE_1_EXECUTION_LOG.md`, `.github/ISSUE_TEMPLATE/phase-task.md`, `ARCANEA.md`, `docs/arcanea/BOOTSTRAP_PLAN.md` | Publish one-command Arcanea profile install path while keeping Hermes core untouched. | No | `bash -n`, PowerShell parser, public GitHub profile install smoke, skills list, MCP list. |
| 2026-06-18 | f1e3e76bd | profile distribution installer hardening | `hermes_cli/profile_distribution.py`, `tests/hermes_cli/test_profile_distribution.py` | Prevent Git/VCS metadata from shipping into installed Hermes profiles and clean stale metadata on force reinstall, fixing Windows permission failures. | Yes | `py -3.13 -m pytest tests/hermes_cli/test_profile_distribution.py -q -o addopts=''` → 71 passed. |

## Patch categories

### Category A: Preferred, low-risk

- Arcanea docs
- Arcanea profile distribution files
- Arcanea optional skills
- Arcanea MCP server docs/config
- Desktop skin assets isolated from upstream logic

### Category B: Allowed with review

- Desktop onboarding flow
- Desktop navigation panes backed by existing Hermes dashboard/API/MCP surfaces
- Installer wrapper that installs Hermes then Arcanea profile
- Profile-distribution defaults

### Category C: Avoid unless upstreamed

- agent loop
- provider runtime/auth
- tool schemas
- gateway core
- session DB format
- security/approval engine
- MCP client internals

## Upstreaming rule

If a fix improves Hermes for everyone, open it upstream first or immediately after proving it here.
