# Arcanea Agent — Product UX Next

**Status:** Active product direction  
**Date:** 2026-07-17  
**Purpose:** Own UX: who needs what, how we provide it, why the engineering we already did matters, and what to build next.

---

## 1. What we already engineered (and why it is the right foundation)

| Layer | What exists | Why it matters for UX |
| --- | --- | --- |
| **Hermes substrate** | CLI, TUI, Desktop, gateway, providers, profiles, skills, cron, MCP, sessions | Users get a real agent OS, not a chat toy. Multi-surface = work where they already live. |
| **Profile-first product** | `arcanea-agent-profile` + install one-liners | Lowest legal/ops headache: ship identity + workflows without forking auth/runtime. |
| **Fork + patch ladder** | `arcanea-agent` + `ARCANEA_PATCH_LEDGER` + upstream remote | Desktop/product surface when needed; core stays rebaseable. |
| **BYOK doctrine** | No Arcanea-held model keys in v0 | Trust + legal smoothness: user owns provider relationship. |
| **Creative OS surface** | Desktop Arcanea layer: World / Character / Book / Library / Studio | Differentiator vs stock Hermes: creation jobs, not generic chat. |
| **Publishing House** | Full swarm profile (production → marketing → social) | Proves “agent as operating system for a business,” not a feature demo. |
| **SIS / memory doctrine** | Local-first, SIS canonical, Hermes as runtime memory UX | Continuity is the product. Chat without memory is a demo. |
| **Handoff to native harnesses** | Doctrine: Codex / Claude / OpenCode / Gemini | Best tool for the job; Arcanea is conductor, not monoculture. |

**One sentence positioning**

> Arcanea Agent is a **local-first creative intelligence cockpit**: sign in with *your* models, keep *your* worlds/projects/memory, run specialized creative + publishing swarms — without Arcanea becoming your cloud AI landlord.

---

## 2. Who the users are (ICP bands)

Build for three bands. Do not build one mega-product for everyone at once.

### Band A — Creator operator (primary, near-term)
- Authors, worldbuilders, indie studios, content systems people  
- **Job:** “Turn lore + drafts into finished, consistent artifacts and ship them.”  
- **Pain:** ChatGPT tabs lose context; tools don’t share canon; publishing is fragmented.  
- **Success:** World → Character → Book/Artifact with continuity; one install, local control.

### Band B — Agentic power user / small team
- Builders running multi-agent workflows (you, Swarm Sun, serious indies)  
- **Job:** “Run a creative business as software: production, social, outreach, ops.”  
- **Pain:** Orchestration is glue code; no provenance; tools don’t compound.  
- **Success:** Profiles + skills + cron + contracts; replicable house they can fork.

### Band C — Platform / ecosystem (later)
- Devs, studios integrating Registry / MCP / packs  
- **Job:** “Discover agents/skills; plug Arcanea intelligence into my stack.”  
- **Pain:** Marketplace noise; no provenance; credential custody risk.  
- **Success:** Protocol-first registry, premium packs, optional gateway later.

**Explicit non-user for v1:** enterprises needing SSO + Arcanea-managed tokens + compliance paperwork. Defer.

---

## 3. Jobs to be done (what users actually need)

Map every UI surface and skill to a job. If it doesn’t map, cut or demote it.

| Job | User words | How we provide today | Gap |
| --- | --- | --- | --- |
| **J1 Continuity** | “Don’t make me re-explain my world.” | Profile SOUL + skills + planned SIS MCP | SIS optional path still open; first-run memory empty |
| **J2 Create** | “Start a world/character/book now.” | Creation bar + skills + world-builder UI | Demo workflows not packaged as 5 guided runs |
| **J3 Consistency** | “Keep lore/canon clean.” | Lore skills + Publishing House guards | Public canon pack + Guardian checks as one-click |
| **J4 Ship** | “Manuscript → published + promoted.” | publishing-house profile | One-command “House day” + status board UX |
| **J5 Route work** | “Use the right coding agent.” | Doctrine only | Runtime handoff skill + task contracts |
| **J6 Trust** | “My keys and files stay mine.” | BYOK, local profiles, no telemetry default | Privacy page + clear data map in onboarding |
| **J7 Replicate** | “I want my own house/profile.” | GitHub profile install | Templates gallery + “fork this house” UX |
| **J8 Progress** | “I feel stronger over time.” | progression.ts / badges (desktop) | XP from real actions (ship, publish, skill use) |

---

## 4. Own experience: the product loop (not a feature list)

### Magic path (first 15 minutes)

1. **Install Hermes Desktop** (stock) or Arcanea installer wrapper.  
2. **One command / button:** install Arcanea profile.  
3. **BYOK setup:** pick provider (Grok-first for creative; Claude optional for canon).  
4. **First win:** New World → 5-minute structured world seed (name, pillars, factions stub, open questions).  
5. **Second win:** New Character bound to that world.  
6. **Show Library:** both objects persist; next session resumes.  
7. **Offer upgrade path:** “Open Publishing House profile when ready to ship a book.”

If step 4 fails or feels like empty chat, the product fails — no matter how good the fork is.

### Daily loop (power users)

```
Capture (inbox/voice/chat)
  → Contract (scope, non-goals, acceptance)
    → Swarm / skill run
      → Verify (commands, files, previews)
        → Provenance (what/why/sources)
          → Memory (SIS + local library)
            → Next contract
```

### Weekly loop (operator)

- House review: what shipped, what stalled  
- Social/campaign agents status  
- Skill self-improvement notes  
- Upstream Hermes sync if on fork path  

---

## 5. Funnel (how people enter and pay — low headache)

Stay aligned with least legal/ops pain while still capturing value.

```
Awareness
  arcanea.ai/agent + short demos + public profile repo
       ↓
Install (free)
  Hermes + profile install (or thin Arcanea desktop later)
       ↓
Activation
  First World + Character + Library resume
       ↓
Habit
  Daily create/ship loops; optional Publishing House
       ↓
Monetize (adjacent value first — NOT model resale day 1)
  • Premium packs (world templates, Luminor workflows, house kits)
  • Creator templates / Content Studio cards
  • Team / multi-profile workspace tooling (later)
  • Optional curated gateway (BYOK first; managed keys only with partner agreements)
       ↓
Ecosystem
  Registry discovery (protocol + attribution)
  Forkable houses for communities
```

**Do not** lead with “we sell API tokens like Nous/OpenRouter.” That is a *later* option under API strategy docs. **Lead with** “install, own, create, ship.”

Revenue order of preference:

1. Premium creative packs + Publishing House kits  
2. Hosted optional sync / team features (opt-in)  
3. Curated gateway subscription (routing intelligence), still BYOK-capable  
4. Marketplace payouts only after proven pull  

---

## 6. Why “what we built” is the moat (tell this story)

External competitors ship chat UIs. You ship **compounding creative systems**:

1. **Substrate choice** — Hermes Desktop/auth/gateway is already the best open agent cockpit shape; you did not rebuild electron + provider matrix.  
2. **Extension ladder** — profile → skill → MCP → plugin → thin desktop → core patch. That is product engineering discipline users never see but feel as stability.  
3. **Identity without lock-in** — Arcanea SOUL + skills on stock Hermes means adopters can leave the fork and keep the profile. Trust.  
4. **Domain depth** — World/Character/Book/Studio + Publishing House is vertical creative OS, not horizontal agent glue.  
5. **Sovereign memory** — SIS + local-first is the anti-churn moat: the longer they work, the more *their* world lives with them, not in a vendor chat log.  
6. **Replicability** — Profiles and houses others can install/fork. Distribution is product.

---

## 7. What else we should build (prioritized)

### P0 — Make the magic path undeniable (next 1–2 weeks)

| # | Build | Outcome |
| --- | --- | --- |
| P0.1 | **Guided First Session** skill + desktop first-run | User finishes World + Character without reading docs |
| P0.2 | **Five demo workflows** as runnable skills/cards | Resume project · Capture→contract · Registry install · Handoff code · Publish artifact |
| P0.3 | **Privacy & data map page** | Keys local, what is stored where, telemetry off |
| P0.4 | **Library persistence E2E** | Create → quit → reopen still there (file-backed SoT) |
| P0.5 | **Smoke install CI** | GitHub install of profile always green |

### P1 — Continuity + handoff (true Arcanea delta)

| # | Build | Outcome |
| --- | --- | --- |
| P1.1 | **SIS project-graph MCP** (read/provenance-first, optional) | Cross-session project truth |
| P1.2 | **Task contract templates** skill | Every big job has scope/acceptance/rollback |
| P1.3 | **Runtime handoff bridge** skill | “Send this coding job to Claude Code / Codex / OpenCode” |
| P1.4 | **Registry MCP demo mode** (no Supabase required for browse) | Discovery without admin secrets |
| P1.5 | **Provenance packet** on artifact create | What changed, sources, models, verification |

### P2 — Ship vertical (creator money path)

| # | Build | Outcome |
| --- | --- | --- |
| P2.1 | **Publishing House day board** (status of pipelines) | Operator UX, not only chat |
| P2.2 | **One-command house demo** with synthetic manuscript | Proof video + install confidence |
| P2.3 | **Premium pack v0** (3 world kits + 1 book kit) | First monetizable SKU without API resale |
| P2.4 | **Content Studio cards** wired to real skills | Cards → runs, not dead UI |

### P3 — Thin branded desktop (only if P0 dogfood says profiles aren’t enough)

| # | Build | Outcome |
| --- | --- | --- |
| P3.1 | Installer that installs Hermes + Arcanea profile | One download story |
| P3.2 | Onboarding shell (BYOK + first world) | Own brand without core divergence |
| P3.3 | AgentHub panes backed by MCP/API only | Discovery/monitor without new agent loop |
| P3.4 | Packaging “Arcanea Agent” artifacts | Real DMG/EXE when ready |

### P4 — Ecosystem / later platform

- Public Registry read API  
- Hybrid gateway (BYOK default) per API strategy  
- Team workspaces  
- Marketplace payouts (last)

---

## 8. UX principles (non-negotiable)

1. **First win in 15 minutes** or the install failed.  
2. **Objects over threads** — worlds, characters, books, contracts are first-class; chat is the interface, not the product.  
3. **BYOK and local files by default** — cloud is opt-in acceleration.  
4. **Enhance-never-erase** — no silent canon overwrite; propose diffs.  
5. **Verify or it didn’t happen** — skill outputs must leave files/commands evidence.  
6. **Profile > fork > core patch** — protect upstream and adopters.  
7. **Mythology frames; behavior is concrete** — beautiful names, measurable outcomes.  
8. **One SoT per concern** — library files, SIS projects, patch ledger, not duplicated truth.

---

## 9. Messaging matrix (how we talk about this)

| Audience | Headline | Proof |
| --- | --- | --- |
| Creator | “Your worlds remember you.” | Library + resume + lore guards |
| Operator | “Run a publishing house as software.” | Publishing House profile + swarm skills |
| Builder | “Profiles first. Fork when you must.” | Install one-liner + patch ladder |
| Skeptic | “Your keys. Your files. Your agents.” | BYOK + local Hermes + no custody |

Avoid: “another AI desktop,” “we replace Claude/Codex,” “we resell all models.”

---

## 10. Immediate execution checklist (this week)

- [ ] Ship **arcanea-first-session** skill (World → Character → Library write).  
- [ ] Package the **five demo workflows** as Content Studio cards that invoke real skills.  
- [ ] Write **docs/arcanea/PRIVACY.md** data map.  
- [ ] Close Phase 1 open item: document **SIS optional path** clearly.  
- [ ] Add **task-contract** skill + template files under profile.  
- [ ] Record 3-minute screen: install → first world → library.  
- [ ] Decide go/no-go for thin desktop packaging based on dogfood of P0 only.

---

## 11. Success metrics (simple)

| Stage | Metric |
| --- | --- |
| Install | Profile install success rate (smoke CI green) |
| Activation | % users with ≥1 World + ≥1 Character within 24h |
| Habit | Sessions with Library open or project resume ≥3 days / week |
| Value | Artifacts with provenance packets / week |
| Revenue (later) | Premium pack installs or paid house kits |
| Trust | Support tickets about key custody = 0 |

---

## 12. Relationship to existing plans

- Extends `BOOTSTRAP_PLAN.md` Phases 2–4 with **user jobs**, not only engineering phases.  
- Honors `ARCHITECTURE.md` (Hermes substrate, Arcanea product layer).  
- Aligns monetization with `ARCANEA_API_PROVIDER_STRATEGY.md` but **defers** gateway as lead product.  
- Uses Publishing House as the flagship vertical proof.  
- Keeps dual path: **profiles in stock Hermes** (adoption) + **fork** (Milestone 2 thin desktop when needed).

---

*This file is the product UX SoT for Arcanea Agent next builds. Engineering tasks should cite Job IDs (J1–J8) or P0–P4 items.*
