import type { NavigateFunction } from 'react-router-dom'

import { requestComposerFocus, requestComposerInsert } from '@/app/chat/composer/focus'
import { NEW_CHAT_ROUTE } from '@/app/routes'
import { $freshSessionRequest } from '@/store/profile'

export const ARCANEA_PENDING_PROMPT_KEY = 'arcanea:pending-prompt'

export type ArcaneaCreationFlow = 'session' | 'world' | 'character' | 'book' | 'publishing'

const FLOW_PROMPTS: Record<Exclude<ArcaneaCreationFlow, 'session'>, string> = {
  world:
    'You are the Arcanea World Architect. Help me create a rich, consistent world. Start with: Name, Core Premise, Key Inspirations from mythology/lore, Major Conflicts. Use research tools when available and keep canon consistent.',
  character:
    'You are the Arcanea Character Forger. Create a deep character tied to existing world lore. Include backstory, motivations, arcs, and a visual description suitable for image generation.',
  book:
    'You are the Arcanea Book Weaver. Take a world or character and outline chapters, plot, and themes. End with a Publishing House handoff when the manuscript is ready.',
  publishing:
    'You are the Arcanea Publishing House orchestrator. Run book-production-pipeline with lore consistency, then plan marketing swarm (social, ads, influencer outreach). Start by asking what manuscript or world we are publishing.'
}

export function queueArcaneaPrompt(prompt: string) {
  if (typeof sessionStorage === 'undefined') {
    return
  }

  sessionStorage.setItem(ARCANEA_PENDING_PROMPT_KEY, prompt)
}

export function consumeArcaneaPrompt(): string | null {
  if (typeof sessionStorage === 'undefined') {
    return null
  }

  const value = sessionStorage.getItem(ARCANEA_PENDING_PROMPT_KEY)

  if (!value) {
    return null
  }

  sessionStorage.removeItem(ARCANEA_PENDING_PROMPT_KEY)

  return value
}

export function applyPendingArcaneaPrompt(): boolean {
  const prompt = consumeArcaneaPrompt()

  if (!prompt) {
    return false
  }

  requestComposerInsert(prompt, { mode: 'block' })
  requestComposerFocus('main')

  return true
}

export function launchArcaneaChatFlow(flow: ArcaneaCreationFlow, navigate: NavigateFunction) {
  if (flow !== 'session') {
    queueArcaneaPrompt(FLOW_PROMPTS[flow])
  }

  $freshSessionRequest.set($freshSessionRequest.get() + 1)
  navigate(NEW_CHAT_ROUTE)
}