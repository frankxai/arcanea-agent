// Arcanea World Builder Models
// Structured data for worlds, characters, books, artifacts.
// Ties to Hermes session memory + SIS provenance.

export interface LoreEntry {
  id: string;
  title: string;
  content: string;
  source?: 'mythology' | 'user' | 'mcp-research' | 'arcanea-canon';
  confidence: number; // 0-1
}

export interface World {
  id: string;
  name: string;
  corePremise: string;
  tone: string;
  keyInspirations: string[]; // mythology, lore, datasets
  majorConflicts: string[];
  locations: string[];
  loreEntries: LoreEntry[];
  createdAt: string;
  consistencyScore: number; // computed
  tags: string[];
}

export interface Character {
  id: string;
  worldId?: string;
  name: string;
  role: string;
  backstory: string;
  motivations: string[];
  arcs: string[];
  visualDescription: string; // for image gen
  loreTies: string[];
  createdAt: string;
}

export interface Book {
  id: string;
  worldId?: string;
  characterIds: string[];
  title: string;
  outline: string[];
  themes: string[];
  chapters: Array<{ title: string; summary: string }>;
  publishingStatus: 'draft' | 'editing' | 'visuals' | 'published';
  createdAt: string;
}

export interface Artifact {
  id: string;
  type: 'world' | 'character' | 'book' | 'visual' | 'nft-metadata';
  data: World | Character | Book | any;
  provenance: string; // Hermes session id or MCP call
}

export type CreationType = 'world' | 'character' | 'book';

// Helper for lore consistency (stub for full engine)
export function computeConsistency(world: Partial<World>): number {
  if (!world.loreEntries || world.loreEntries.length === 0) return 0.6;
  const avg = world.loreEntries.reduce((s, e) => s + e.confidence, 0) / world.loreEntries.length;
  return Math.min(1, avg * 0.9 + (world.keyInspirations?.length || 0) * 0.02);
}
