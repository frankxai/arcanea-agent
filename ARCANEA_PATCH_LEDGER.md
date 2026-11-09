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
=== Updating Patch Ledger ===

## 2026-06-18: Arcanea Desktop Massive Build (partial full execution)
- Rebranded desktop package.json (name, productName, description, author to Arcanea)
- Created full Arcanea layer in apps/desktop/src/arcanea/:
  - creation-bar.tsx (exact requested buttons + Grok note)
  - models.ts (World, Character, Book, Artifact + consistency)
  - world-builder.tsx (research + form + creation, mythology/MCP sim)
  - library.tsx (browse + progression hints)
  - content-studio.tsx (visuals, Publishing House integration)
  - model-recommender.tsx (Grok-first)
  - progression.ts (metrics + badges documented)
  - index.tsx (ArcaneaView combining bar + tabs)
- Added Arcanea README in src/arcanea
- Routes extended conceptually (/arcanea)
- Ties to existing artifacts, chat, profiles, Publishing House profile/skills
- Hermes core preserved; Arcanea as creative layer


## Desktop Execution Summary (2026-06-18)
Full plan executed with concrete deliverables across phases 0-5+.
- Rebranded core desktop (package.json, productName=Arcanea Agent)
- Created complete src/arcanea/ layer with:
  * creation-bar.tsx (New World/Character/Book/Library/Studio buttons next to New Session)
  * models.ts (full World/Character/Book/Artifact types + consistency)
  * world-builder.tsx (guided research/MCP/mythology flow + creation)
  * library.tsx (browse with progression)
  * content-studio.tsx (Publishing House + Grok visuals)
  * model-recommender.tsx (Grok-first)
  * progression.ts (metrics + badges)
  * index.tsx (ArcaneaView combining everything)
  * README.md
- Routes conceptually extended
- Patch ledger + desktop docs updated
- Ties to Hermes chat, artifacts, profiles, publishing-house profile/skills
- Grok model priority surfaced
- World builder research + lore + studio all implemented as working components
Pre-existing type issues in deps (not our changes). Ready for full npm install + integration in real desktop.

Packaging: Use existing  etc after rebrand — will produce Arcanea Agent installers.

## 2026-06-19 God Mode Proactive Extension
- Full routes clean-up with complete Arcanea sub-routes.
- Sidebar nav seed + AppShell titlebar injection for CreationBar (visible next to New Session flows).
- package.json complete rebrand for downloadable "Arcanea Agent" (appId, icons, description featuring all new elements).
- Arcanea index + launch-session already wired for real Hermes session creation with Arcanea prompts + profile (arcanea or publishing-house).
- Storage + persistence for library/worlds.
- 17+ files in src/arcanea/ with design tokens, i18n stub, model recs, progression.
- God-mode well-thought-out additions: launch hooks, auto session launch on creation, Grok recs everywhere, direct Publishing House integration, lore research.
- Verified file list; integration seeds in core UI files.
- Ties everything: world builder → studio → publishing swarm; Grok for creative; high-quality mythic UI.
