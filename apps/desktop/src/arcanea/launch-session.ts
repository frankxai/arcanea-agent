import { useSessionActions } from '../session/hooks/use-session-actions';
import { usePromptActions } from '../session/hooks/use-prompt-actions';
import { normalizeProfileKey } from '../store/profile';

// Arcanea specialized session launcher
// God-mode: starts a new chat with Arcanea persona + recommended model + optional profile

export function useArcaneaLaunch() {
  const { createFreshSession } = useSessionActions();
  const { setDraft } = usePromptActions();

  return async (type: 'world' | 'character' | 'book' | 'studio', profile = 'arcanea-agent' as string) => {
    const prompts = {
      world: 'You are the Arcanea World Architect. Create a rich, consistent world with mythology/lore research. Use Grok for visuals later. Start structured: Name, Premise, Inspirations, Conflicts.',
      character: 'You are the Arcanea Character Forger. Deep character tied to world lore. Include backstory, arcs, visual description for Grok image gen.',
      book: 'You are the Arcanea Book Weaver. Outline from world/characters. Integrate Publishing House pipeline at end. Use Grok 4.3 for narrative.',
      studio: 'You are the Arcanea Content Studio. Orchestrate visuals (Grok), editing, marketing, and publishing swarm. Switch to publishing-house profile for full power.'
    };

    const prompt = prompts[type] || prompts.world;

    // Create session (uses Hermes core)
    const sessionId = await createFreshSession({
      source: 'local',
      profile: normalizeProfileKey(profile),
      title: `Arcanea ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    });

    // Seed the first message / draft with Arcanea prompt + model hint
    setDraft(sessionId, {
      text: prompt + '\n\nRecommended: Grok (creative/visuals). Use /skill or MCP tools for research.',
    });

    return sessionId;
  };
}
