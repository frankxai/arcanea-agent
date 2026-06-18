#!/usr/bin/env bash
set -euo pipefail

PROFILE_NAME="${ARCANEA_AGENT_PROFILE:-arcanea-agent}"
SOURCE="${ARCANEA_AGENT_PROFILE_SOURCE:-github.com/frankxai/arcanea-agent-profile}"
CREATE_ALIAS=1
FORCE=1

usage() {
  cat <<'USAGE'
Install the Arcanea Agent Hermes profile distribution.

Usage:
  scripts/install-arcanea-agent.sh [--name PROFILE] [--source SOURCE] [--no-alias] [--no-force]

Defaults:
  PROFILE = arcanea-agent
  SOURCE  = github.com/frankxai/arcanea-agent-profile

Examples:
  scripts/install-arcanea-agent.sh
  scripts/install-arcanea-agent.sh --name arcanea-agent-smoke --no-alias
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name)
      PROFILE_NAME="${2:?--name requires a profile name}"
      shift 2
      ;;
    --source)
      SOURCE="${2:?--source requires a profile distribution source}"
      shift 2
      ;;
    --no-alias)
      CREATE_ALIAS=0
      shift
      ;;
    --no-force)
      FORCE=0
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if ! command -v hermes >/dev/null 2>&1; then
  cat >&2 <<'ERR'
Hermes Agent is not installed or not on PATH.
Install Hermes first:
  curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
ERR
  exit 1
fi

cmd=(hermes profile install "$SOURCE" --name "$PROFILE_NAME" -y)
if [[ "$CREATE_ALIAS" == "1" ]]; then
  cmd+=(--alias)
fi
if [[ "$FORCE" == "1" ]]; then
  cmd+=(--force)
fi

printf 'Installing Arcanea Agent profile:\n'
printf '  source:  %s\n' "$SOURCE"
printf '  profile: %s\n' "$PROFILE_NAME"
printf '\n'
"${cmd[@]}"

printf '\nVerifying profile install...\n'
hermes profile show "$PROFILE_NAME"
printf '\nNext:\n'
printf '  hermes -p %s chat\n' "$PROFILE_NAME"
if [[ "$CREATE_ALIAS" == "1" ]]; then
  printf '  %s chat\n' "$PROFILE_NAME"
fi
