import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from '@/lib/icons'
import { notify } from '@/store/notifications'

import { computeConsistency, type World } from './models'
import { arcaneaGlass } from './tokens'

export function WorldBuilder({ onCreate }: { onCreate: (world: World) => void }) {
  const [form, setForm] = useState({
    corePremise: '',
    keyInspirations: 'Greek mythology, Arcanea canon, ancient forests',
    majorConflicts: '',
    name: '',
    tone: 'epic mythic'
  })
  const [isResearching, setIsResearching] = useState(false)
  const [researchResults, setResearchResults] = useState<string[]>([])

  const runResearch = async () => {
    setIsResearching(true)
    await new Promise(r => setTimeout(r, 800))
    setResearchResults([
      'Arcanea Vault: The Radiant Awakening — light vs shadow cycles',
      'Mythology: World Tree variants, Celtic otherworlds',
      'Pattern: Chosen one with hidden bloodline (use carefully)',
      'Motif: "light as memory" — consistent across your worlds'
    ])
    setIsResearching(false)
  }

  const createWorld = () => {
    const world: World = {
      consistencyScore: 0,
      corePremise: form.corePremise,
      createdAt: new Date().toISOString(),
      id: `world-${Date.now()}`,
      keyInspirations: form.keyInspirations.split(',').map(s => s.trim()),
      locations: [],
      loreEntries: researchResults.map((r, i) => ({
        confidence: 0.85,
        content: r,
        id: `lore-${i}`,
        source: 'mcp-research',
        title: `Research ${i + 1}`
      })),
      majorConflicts: form.majorConflicts
        ? form.majorConflicts.split(',').map(s => s.trim())
        : ['The Fade — loss of memory and light'],
      name: form.name || 'Unnamed Realm',
      tags: ['arcanea', 'mythic'],
      tone: form.tone
    }

    world.consistencyScore = computeConsistency(world)
    onCreate(world)

    notify({
      durationMs: 5000,
      kind: 'success',
      message: `Consistency ${(world.consistencyScore * 100).toFixed(0)}% — lore session opening in chat.`,
      title: `World "${world.name}" saved`
    })
  }

  return (
    <div className={`space-y-4 p-6 ${arcaneaGlass}`}>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">World Architect</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Research seeds from mythology + Arcanea canon. Grok for visuals after the world exists.
        </p>
      </div>

      <label className="block space-y-1 text-sm">
        <span className="text-muted-foreground">World name</span>
        <Input
          className="border-white/[0.08] bg-white/[0.02]"
          placeholder="The Veiled Realms"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="text-muted-foreground">Core premise</span>
        <textarea
          className="min-h-20 w-full rounded-md border border-white/[0.08] bg-white/[0.02] p-2 text-sm"
          placeholder="Memory is light. When the last story is forgotten, the world fades…"
          value={form.corePremise}
          onChange={e => setForm({ ...form, corePremise: e.target.value })}
        />
      </label>

      <Button disabled={isResearching} variant="outline" onClick={runResearch}>
        <Search className="mr-1.5 size-4" />
        {isResearching ? 'Researching lore…' : 'Run research (mythology + canon)'}
      </Button>

      {researchResults.length > 0 ? (
        <ul className="space-y-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-sm">
          {researchResults.map((r, i) => (
            <li key={i} className="text-muted-foreground">
              • {r}
            </li>
          ))}
        </ul>
      ) : null}

      <Button className="w-full bg-[#00bcd4] text-[#09090b] hover:bg-[#00bcd4]/90" size="lg" onClick={createWorld}>
        Create world & open lore session
      </Button>
    </div>
  )
}