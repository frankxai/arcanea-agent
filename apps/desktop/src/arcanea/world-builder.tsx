import React, { useState } from 'react';
import { World, computeConsistency } from './models';
import { Button } from '@/components/ui/button'; // adapt to existing

/**
 * Arcanea World Builder
 * Guided flow: Research (MCP + mythology) → Form → Consistency check → Launch Book/Character
 * Uses Grok for visuals/inspiration.
 */
export function WorldBuilder({ onCreate }: { onCreate: (world: World) => void }) {
  const [form, setForm] = useState({
    name: '',
    corePremise: '',
    tone: 'epic mythic',
    keyInspirations: 'Greek mythology, Arcanea canon, ancient forests',
    majorConflicts: '',
  });
  const [researchResults, setResearchResults] = useState<string[]>([]);
  const [isResearching, setIsResearching] = useState(false);

  const runResearch = async () => {
    setIsResearching(true);
    // In real: call Hermes MCP (youtube_content, web, sis_memory, arcanea_registry) or skill
    // For now: simulate pulling lore + mythology
    await new Promise(r => setTimeout(r, 800));
    setResearchResults([
      'From Arcanea Vault: The Radiant Awakening — light vs shadow cycles',
      'Mythology: World Tree Yggdrasil variants, Celtic otherworlds',
      'Dataset: Common trope - Chosen one with hidden bloodline',
      'Inspiration: Your previous worlds - consistent "light as memory" motif'
    ]);
    setIsResearching(false);
  };

  const createWorld = () => {
    const world: World = {
      id: 'world-' + Date.now(),
      name: form.name || 'Unnamed Realm',
      corePremise: form.corePremise,
      tone: form.tone,
      keyInspirations: form.keyInspirations.split(',').map(s => s.trim()),
      majorConflicts: form.majorConflicts ? form.majorConflicts.split(',') : ['The Fade - loss of memory/light'],
      locations: [],
      loreEntries: researchResults.map((r, i) => ({
        id: 'lore-' + i,
        title: 'Research ' + (i + 1),
        content: r,
        source: 'mcp-research',
        confidence: 0.85
      })),
      createdAt: new Date().toISOString(),
      consistencyScore: 0,
      tags: ['arcanea', 'mythic']
    };
    world.consistencyScore = computeConsistency(world);
    onCreate(world);
    alert(`World "${world.name}" created. Consistency: ${(world.consistencyScore * 100).toFixed(0)}%. Next: New Character or Book. (Grok recommended for visuals.)`);
  };

  return (
    <div className="p-6 space-y-4 border rounded-lg bg-card">
      <h2 className="text-xl font-semibold">Arcanea World Architect</h2>
      <p className="text-sm text-muted-foreground">Research pulls from MCPs, mythology, your Arcanea canon. Grok for gen.</p>

      <div>
        <label className="block text-sm">World Name</label>
        <input className="border p-2 w-full rounded" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="The Veiled Realms" />
      </div>

      <div>
        <label className="block text-sm">Core Premise</label>
        <textarea className="border p-2 w-full rounded h-20" value={form.corePremise} onChange={e => setForm({...form, corePremise: e.target.value})} placeholder="Memory is light. When the last story is forgotten, the world fades..." />
      </div>

      <Button onClick={runResearch} disabled={isResearching} variant="outline">
        {isResearching ? 'Researching (MCPs + Lore)...' : '🔍 Run Research (Mythology + Arcanea + Datasets)'}
      </Button>

      {researchResults.length > 0 && (
        <div className="bg-muted p-3 rounded text-sm">
          <strong>Research Results:</strong>
          <ul className="list-disc ml-4 mt-1">
            {researchResults.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}

      <Button onClick={createWorld} className="w-full" size="lg">Create World + Start Lore Session</Button>
      <p className="text-xs">Progression: +1 World created. Lore quality tracked.</p>
    </div>
  );
}
