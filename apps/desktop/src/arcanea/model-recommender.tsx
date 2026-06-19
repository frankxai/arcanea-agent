import React from 'react';

/**
 * Model Recommender for Arcanea
 * Grok-first for image/video/creative. Grok 4.3 / build for deep reasoning.
 * Shown in creation flows and composer.
 */
export function ArcaneaModelRecommender({ task = 'creative' }: { task?: string }) {
  const recs: Record<string, { model: string; reason: string; provider: string }> = {
    'image': { model: 'Grok (image/video)', reason: 'Best for mythic visuals, covers, scenes', provider: 'xAI' },
    'video': { model: 'Grok video gen', reason: 'High-quality motion for lore cinematics', provider: 'xAI' },
    'creative': { model: 'Grok 4.3 / Grok-build', reason: 'Strong narrative, world logic, lore consistency', provider: 'xAI' },
    'research': { model: 'Grok or strong web model', reason: 'Mythology + dataset synthesis', provider: 'xAI' },
    'default': { model: 'Grok', reason: 'Arcanea creative default', provider: 'xAI' }
  };

  const rec = recs[task] || recs.default;

  return (
    <div className="text-xs p-2 bg-purple-50 dark:bg-purple-950 border border-purple-200 rounded flex items-center gap-2">
      <span className="font-medium">Recommended:</span> {rec.model} — {rec.reason} ({rec.provider})
      <span className="ml-auto text-purple-600">Arcanea tuned</span>
    </div>
  );
}
