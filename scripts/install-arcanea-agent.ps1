param(
  [string]$Name = $(if ($env:ARCANEA_AGENT_PROFILE) { $env:ARCANEA_AGENT_PROFILE } else { "arcanea-agent" }),
  [string]$Source = $(if ($env:ARCANEA_AGENT_PROFILE_SOURCE) { $env:ARCANEA_AGENT_PROFILE_SOURCE } else { "github.com/frankxai/arcanea-agent-profile" }),
  [switch]$NoAlias,
  [switch]$NoForce
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command hermes -ErrorAction SilentlyContinue)) {
  Write-Error "Hermes Agent is not installed or not on PATH. Install from https://hermes-agent.nousresearch.com/docs first."
}

$argsList = @("profile", "install", $Source, "--name", $Name, "-y")
if (-not $NoAlias) { $argsList += "--alias" }
if (-not $NoForce) { $argsList += "--force" }

Write-Host "Installing Arcanea Agent profile:"
Write-Host "  source:  $Source"
Write-Host "  profile: $Name"
& hermes @argsList

Write-Host ""
Write-Host "Verifying profile install..."
& hermes profile show $Name

Write-Host ""
Write-Host "Next:"
Write-Host "  hermes -p $Name chat"
if (-not $NoAlias) { Write-Host "  $Name chat" }
