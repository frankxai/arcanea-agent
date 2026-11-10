// Arcanea World Builder Progression (documented + light tracking)
// Metrics: writing volume, worlds/characters/books, lore quality, sales/NFTs/apps
// Badges long-term. Not core gamification — joy of creation first.

export interface WorldBuilderProgress {
  worldsCreated: number;
  charactersForged: number;
  booksWeaved: number;
  totalWords: number;
  avgLoreQuality: number; // 0-1
  publishedCount: number;
  badges: string[]; // e.g. "First World", "Mythweaver", "Published Author", "NFT Creator"
}

export const defaultProgress: WorldBuilderProgress = {
  worldsCreated: 0,
  charactersForged: 0,
  booksWeaved: 0,
  totalWords: 0,
  avgLoreQuality: 0,
  publishedCount: 0,
  badges: []
};

export function awardBadge(progress: WorldBuilderProgress, newBadge: string): WorldBuilderProgress {
  if (progress.badges.includes(newBadge)) return progress;
  return { ...progress, badges: [...progress.badges, newBadge] };
}

// Example usage in creation: after New World, increment + check thresholds for badges.
export function updateProgress(current: WorldBuilderProgress, action: 'world' | 'book' | 'publish', value?: number): WorldBuilderProgress {
  const p = { ...current };
  if (action === 'world') p.worldsCreated++;
  if (action === 'book') p.booksWeaved++;
  if (action === 'publish') { p.publishedCount++; p.badges = awardBadge(p, 'Published Author').badges; }
  // Add more logic for words, quality
  return p;
}
