# Upstream Sync Protocol

This repo is a fork of `NousResearch/hermes-agent`.

## Remotes

```bash
git remote -v
# origin   https://github.com/frankxai/arcanea-agent.git
# upstream https://github.com/NousResearch/hermes-agent.git
```

## Weekly sync

```bash
cd C:/Users/frank/arcanea-agent
git fetch upstream origin
git checkout main
git status --short
# Stop if dirty except intended Arcanea patch files.
git merge --ff-only upstream/main || git merge upstream/main
```

If conflicts happen:

1. Preserve upstream behavior by default.
2. Re-apply only documented Arcanea patches.
3. Update `ARCANEA_PATCH_LEDGER.md`.
4. Run targeted checks.
5. Push `main` to `origin`.

## Verification tiers

### Docs/bootstrap-only changes

```bash
git status --short
git remote -v
git --no-pager log -1 --oneline --decorate
```

### Python/core changes

On Windows native Hermes, prefer direct pytest invocation per Hermes docs:

```bash
export PYTHONPATH="$(pwd)"
"/c/Program Files/Python311/python" -m pytest tests/<target> -v --tb=short -n 0
```

### Desktop changes

```bash
cd apps/desktop
npm run typecheck
npm run test:desktop:platforms
npm run build
```

### Full release candidate

```bash
hermes doctor
hermes status --all
# plus affected Hermes upstream test suite and Arcanea profile smoke tests
```

## Do not

- Do not rewrite upstream history.
- Do not delete upstream docs/license notices.
- Do not alter provider auth or credential storage for Arcanea branding.
- Do not add telemetry without explicit opt-in.
- Do not carry large private patches when an upstream hook/plugin extension would solve it.
