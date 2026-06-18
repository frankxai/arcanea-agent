
# Arcanea Agent ☤

<p align="center">
  <a href="https://arcanea.ai">Arcanea.ai</a> • 
  <a href="https://github.com/frankxai/arcanea-agent-profile">Profile Distribution</a> • 
  <a href="https://github.com/frankxai/arcanea-agents">Agents Registry</a>
</p>

<p align="center">
  <a href="https://github.com/frankxai/arcanea-agent/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"></a>
  <a href="https://github.com/NousResearch/hermes-agent"><img src="https://img.shields.io/badge/Built%20on-Hermes%20Agent-FF6B6B?style=for-the-badge" alt="Built on Hermes"></a>
  <a href="https://arcanea.ai"><img src="https://img.shields.io/badge/Part%20of-Arcanea%20OS-7C3AED?style=for-the-badge" alt="Arcanea OS"></a>
  <a href="https://github.com/frankxai/arcanea-agent/stargazers"><img src="https://img.shields.io/github/stars/frankxai/arcanea-agent?style=for-the-badge" alt="Stars"></a>
</p>

**The local-first creative intelligence cockpit for Arcanea.**  
A world-class fork and distribution layer on top of [Hermes Agent](https://github.com/NousResearch/hermes-agent) purpose-built for creators, worldbuilders, writers, and visionary teams.

Arcanea Agent gives you the full power of Hermes (skills, memory, MCP, gateway, delegation, cron) while adding deep native support for:
- Persistent creative systems
- Lore & world consistency
- Provenance & task contracts
- SIS memory integration
- Curated Arcanea agents and profiles

---

## The Arcanea Agent Ecosystem

| Repo | Purpose | Install |
|------|---------|---------|
| **arcanea-agent** (this) | The full fork + product surface | For contributors & advanced customization |
| **[arcanea-agent-profile](https://github.com/frankxai/arcanea-agent-profile)** | The official installable Hermes profile | `hermes profile install github.com/frankxai/arcanea-agent-profile --name arcanea-agent --alias --force -y` |
| **[arcanea-agents](https://github.com/frankxai/arcanea-agents)** | Curated registry of Arcanea agents & profiles | Browse → one-command install |

**Recommended for most users:** Start with the **Profile Distribution**. It gives you the full Arcanea experience on stock Hermes without forking the runtime.

---

## Quick Start (Recommended)

```bash
# One command — installs Arcanea Agent as a first-class Hermes profile
hermes profile install github.com/frankxai/arcanea-agent-profile --name arcanea-agent --alias --force -y

# Launch
arcanea-agent chat
```

**Windows (PowerShell):**

```powershell
# After installing Hermes
hermes profile install github.com/frankxai/arcanea-agent-profile --name arcanea-agent --alias --force -y
arcanea-agent chat
```

See the full [Installation Guide](docs/arcanea/INSTALL.md).

---

## Why Arcanea Agent?

<table>
<tr>
<td><b>Local-first by default</b></td>
<td>Everything runs on your machine. Your models, your memory, your data. BYOK (Bring Your Own Keys) is the foundation.</td>
</tr>
<tr>
<td><b>Creative-native</b></td>
<td>Built for worldbuilding, lore consistency, long-form narrative, visual systems, and compounding creative work — not just code.</td>
</tr>
<tr>
<td><b>Skills that actually stick</b></td>
<td>Hermes’ self-improving skills system + Arcanea-curated creative skills (luminors, guardians, task contracts, provenance).</td>
</tr>
<tr>
<td><b>Memory that compounds</b></td>
<td>SIS integration for project graphs, living lore, and cross-session continuity across your entire creative life.</td>
</tr>
<tr>
<td><b>Multi-agent reality</b></td>
<td>Route work to the best native harness (Claude Code, Codex, OpenCode, Gemini, etc.) with clean handoff contracts.</td>
</tr>
<tr>
<td><b>Registry & discoverability</b></td>
<td>Install beautiful, tested Arcanea agents and profiles from the official registry with one command.</td>
</tr>
</table>

---

## Core Features

- **Full Hermes power** — CLI, TUI, gateway (Telegram/Discord/etc.), skills, memory, MCP, cron, delegation, checkpoints.
- **Arcanea SOUL & defaults** — Pre-loaded with creative doctrine, task contract templates, and worldbuilding guardrails.
- **Arcanea Registry MCP** — (opt-in) Discover and install agents, skills, and tools from the growing Arcanea collection.
- **Provenance & contracts** — Structured handoffs between agents and humans with clear ownership.
- **Windows-native excellence** — First-class support (the user base is heavily Windows).
- **Profile distribution model** — Clean separation between the runtime fork and the experience layer.

---

## Install the Full Fork (Contributors & Power Users)

```bash
git clone https://github.com/frankxai/arcanea-agent.git
cd arcanea-agent
# Follow upstream Hermes development setup
```

Most people should **not** need this. Use the profile distribution instead.

---

## The Three Repos — How They Fit Together

```
arcanea-agent (this repo)
├── The fork of Hermes
├── Arcanea-specific patches (minimal)
├── Installer scripts
└── Advanced docs

arcanea-agent-profile
├── Pure Hermes profile distribution
├── SOUL.md, config, skills, MCP wiring
└── One-command public install

arcanea-agents
├── The living registry
├── Curated agents & profiles
├── Categories + install commands
└── Community submissions
```

---

## Documentation & Guides

- [Installation](docs/arcanea/INSTALL.md)
- [Bootstrap Plan & Execution Log](docs/arcanea/BOOTSTRAP_PLAN.md)
- [Phase 1 Execution Log](docs/arcanea/PHASE_1_EXECUTION_LOG.md)
- [Hermes Documentation](https://hermes-agent.nousresearch.com/docs/) (the foundation)

---

## Contributing

We follow a strict “profile / skill / MCP first” philosophy.

Before touching the fork:
1. Can this be a skill?
2. Can this be an MCP server?
3. Can this be a profile override?
4. Only then consider a minimal, well-documented patch.

See `ARCANEA.md` and the patch ledger for current doctrine.

---

## Community & Links

- **Arcanea** — https://arcanea.ai
- **Arcanea Agents Registry** — https://github.com/frankxai/arcanea-agents
- **Profile Distribution** — https://github.com/frankxai/arcanea-agent-profile
- **Upstream** — [Nous Research Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## License

MIT — see [LICENSE](LICENSE).

Built with ❤️ for creators who want their intelligence to compound.

**Arcanea Agent** — Local-first. Creator-first. Future-proof.
