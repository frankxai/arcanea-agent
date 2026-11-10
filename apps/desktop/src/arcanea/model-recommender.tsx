import { Sparkles } from '@/lib/icons'

import { arcaneaGlass } from './tokens'

/**
 * Grok-first model hints for Arcanea task classes.
 */
export function ArcaneaModelRecommender({ task = 'creative' }: { task?: string }) {
  const recs: Record<string, { model: string; reason: string }> = {
    image: { model: 'grok-imagine-image (xAI)', reason: 'Covers, portraits, faction art' },
    video: { model: 'Grok video / storyboard frames', reason: 'Lore cinematics & motion' },
    creative: { model: 'grok-4.3 / grok-build', reason: 'Narrative, world logic, lore' },
    research: { model: 'grok-4.3 + web', reason: 'Mythology synthesis' },
    default: { model: 'grok-4.3', reason: 'Arcanea creative default' }
  }

  const rec = recs[task] ?? recs.default

  return (
    <div
      className={`flex flex-wrap items-center gap-2 px-3 py-2 text-xs ${arcaneaGlass}`}
    >
      <Sparkles className="size-3.5 text-[#ffd700]" />
      <span className="font-medium text-[#00bcd4]">Recommended</span>
      <span className="text-muted-foreground">
        {rec.model} — {rec.reason}
      </span>
    </div>
  )
}