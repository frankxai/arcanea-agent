# Arcanea Agent Bootstrap Plan

Generated: 2026-06-18
Status: active bootstrap plan

## Goal

Create `frankxai/arcanea-agent` as the Arcanea-local fork and product surface for Hermes Agent while keeping upstream sync cheap and using extension points before core patches.

## Phase 0: Fork foundation, today

- [x] Create GitHub fork `frankxai/arcanea-agent` from `NousResearch/hermes-agent`.
- [x] Clone to `C:/Users/frank/arcanea-agent`.
- [x] Set `origin` to Frank's fork and `upstream` to Nous.
- [x] Add Arcanea fork doctrine docs.
- [x] Add patch ledger.
- [x] Add upstream sync protocol.
- [x] Add v0 profile-distribution scaffold.
- [x] Verify and push bootstrap commit.

## Phase 1: Stock-Hermes Arcanea profile

Build Arcanea Agent v0 as a Hermes profile distribution that works on unmodified Hermes.

Deliverables:

- [x] `arcanea/profile-distribution/distribution.yaml`
- [x] `arcanea/profile-distribution/SOUL.md`
- [x] `arcanea/profile-distribution/config.yaml`
- [x] `arcanea/profile-distribution/mcp.json`
- [x] `arcanea/profile-distribution/skills/arcanea-start/SKILL.md`
- [x] Standalone installable repo: `frankxai/arcanea-agent-profile`
- [x] Installer docs: `docs/arcanea/INSTALL.md`
- [x] Installer scripts: `scripts/install-arcanea-agent.sh`, `scripts/install-arcanea-agent.ps1`
- [x] Phase execution log: `docs/arcanea/PHASE_1_EXECUTION_LOG.md`

Acceptance:

- [x] A clean Hermes install can install the Arcanea profile from GitHub root.
- [x] User credentials remain local.
- [x] Arcanea Registry MCP can be wired without editing Hermes core.
- [ ] SIS memory access is documented and optional until a public MCP path is stable.

## Phase 2: Arcanea integration layer

Add optional MCP/plugin/profile surfaces, not core patches.

Workstreams:

1. Arcanea Registry MCP wiring.
2. SIS memory/project graph MCP wiring.
3. Arcanea AgentHub concepts and dashboard panes.
4. Runtime handoff bridge to Codex, Claude Code, Arcanea Code/OpenCode, Gemini.
5. Provenance capture workflow.

## Phase 3: Thin desktop prototype

Only start if Phase 1 dogfood proves users need a branded desktop beyond profile distribution.

Allowed patches:

- app naming and visual skin
- first-run Arcanea onboarding
- default Arcanea profile install
- optional AgentHub navigation panes backed by existing API/MCP surfaces

Forbidden until separately approved:

- provider auth internals
- agent loop
- tool schemas
- gateway core
- security approvals
- session DB migrations

## Phase 4: Public beta

- Installer wrapper.
- Privacy/security page.
- BYOK provider onboarding.
- Five demo workflows.
- Optional diagnostics export, telemetry off by default.

## Five demo workflows

1. Resume an Arcanea project with SIS context.
2. Turn chat/voice/capture into a task contract.
3. Discover and install an agent/skill from Arcanea Registry.
4. Route a coding task to the correct native harness.
5. Create/publish a creative artifact with provenance.
