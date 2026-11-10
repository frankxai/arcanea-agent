import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { Globe, ImageIcon, NotebookTabs, Palette } from '@/lib/icons'

import { ArcaneaCreationBar } from './creation-bar'
import { ContentStudio } from './content-studio'
import { launchArcaneaChatFlow } from './launch-session'
import { ArcaneaLibrary } from './library'
import { ArcaneaModelRecommender } from './model-recommender'
import type { World } from './models'
import { loadArcaneaWorlds, saveArcaneaWorlds } from './storage'
import { ArcaneaStudioHeader } from './studio-header'
import { arcaneaGlass } from './tokens'
import { WorldBuilder } from './world-builder'

type ArcaneaTab = 'builder' | 'library' | 'studio'

const TABS: { id: ArcaneaTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'builder', label: 'World Builder', icon: Globe },
  { id: 'library', label: 'Library', icon: NotebookTabs },
  { id: 'studio', label: 'Content Studio', icon: Palette }
]

/**
 * Arcanea Main View — creative desktop landing.
 */
export default function ArcaneaView() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ArcaneaTab>('studio')
  const [worlds, setWorlds] = useState<World[]>(() => loadArcaneaWorlds())

  useEffect(() => {
    saveArcaneaWorlds(worlds)
  }, [worlds])

  const handleWorldCreated = (world: World) => {
    setWorlds(current => [...current, world])
    setActiveTab('library')

    const context = [
      `Name: ${world.name}`,
      `Premise: ${world.corePremise}`,
      `Tone: ${world.tone}`,
      `Inspirations: ${world.keyInspirations.join(', ')}`,
      `Conflicts: ${world.majorConflicts.join(', ')}`,
      `Consistency: ${(world.consistencyScore * 100).toFixed(0)}%`
    ].join('\n')

    launchArcaneaChatFlow('world', navigate, { worldContext: context })
  }

  return (
    <div className="flex h-full flex-col bg-[#09090b]/40">
      <ArcaneaCreationBar onNewSession={() => launchArcaneaChatFlow('session', navigate)} />

      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-5xl space-y-5">
          <ArcaneaStudioHeader
            subtitle="Grok-first creative intelligence — worlds, visuals, manuscripts, and publishing in one studio."
          />

          <nav className={`flex flex-wrap gap-1 p-1 ${arcaneaGlass}`}>
            {TABS.map(tab => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors',
                    activeTab === tab.id
                      ? 'bg-[#00bcd4]/15 font-semibold text-[#00bcd4]'
                      : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
                  )}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              )
            })}
            <button
              className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[#00bcd4]/10 hover:text-[#00bcd4]"
              type="button"
              onClick={() => setActiveTab('studio')}
            >
              <ImageIcon className="size-3.5" />
              Quick Visual
            </button>
          </nav>

          <div className="min-h-0">
            {activeTab === 'builder' && (
              <div className="space-y-4">
                <ArcaneaModelRecommender task="creative" />
                <WorldBuilder onCreate={handleWorldCreated} />
              </div>
            )}
            {activeTab === 'library' && (
              <ArcaneaLibrary
                worlds={worlds}
                onOpenStudio={() => setActiveTab('studio')}
                onVisualizeWorld={world => {
                  setActiveTab('studio')
                  launchArcaneaChatFlow('image', navigate, {
                    imagePreset: 'world',
                    imageHint: `${world.name}: ${world.corePremise}`
                  })
                }}
              />
            )}
            {activeTab === 'studio' && <ContentStudio />}
          </div>
        </div>
      </div>
    </div>
  )
}