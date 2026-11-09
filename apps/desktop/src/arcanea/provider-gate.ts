import { isArcaneaAgent } from '@/arcanea/agent-detect'
import { listOAuthProviders } from '@/hermes'
import { startManualOnboarding } from '@/store/onboarding'

const ARCANEA_CREATIVE_IDS = new Set(['xai-oauth', 'openai-codex'])

export const ARCANEA_CREATIVE_GATE_REASON =
  'Arcanea is Grok-first. Connect xAI Grok OAuth (SuperGrok / Premium+) or OpenAI OAuth (ChatGPT) to start.'

let gateChecked = false

/** True when Arcanea desktop should block on xAI or OpenAI OAuth (Nous alone is not enough). */
export async function needsArcaneaCreativeProvider(): Promise<boolean> {
  if (!isArcaneaAgent()) {
    return false
  }

  try {
    const { providers } = await listOAuthProviders()

    return !providers.some(p => ARCANEA_CREATIVE_IDS.has(p.id) && p.status?.logged_in)
  } catch {
    return true
  }
}

/** Arcanea profile may satisfy runtime via Nous OAuth — still prompt for Grok/OpenAI. */
export async function ensureArcaneaCreativeProvider(): Promise<void> {
  if (gateChecked) {
    return
  }

  gateChecked = true

  if (await needsArcaneaCreativeProvider()) {
    startManualOnboarding(ARCANEA_CREATIVE_GATE_REASON)
  }
}