import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { launchArcaneaChatFlow } from './launch-session'
import { ArcaneaCreationBar } from './creation-bar'
import { ContentStudio } from './content-studio'
import { ArcaneaLibrary } from './library'
import { ArcaneaModelRecommender } from './model-recommender'
import type { World } from './models'
import { WorldBuilder } from './world-builder'

type ArcaneaTab = 'builder' | 'library' | 'studio'

/**
 * Arcanea Main View — creative desktop landing (Creation Bar + Builder / Library / Studio).
 */
export default function ArcaneaView() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ArcaneaTab>('builder')
  const [worlds, setWorlds] = useState<World[]>([])

  const handleWorldCreated = (world: World) => {
    setWorlds(current => [...current, world])
    setActiveTab('library')
  }

  const tabClass = (tab: ArcaneaTab) =>
    cn(
      'rounded-md px-3 py-1.5 text-sm transition-colors',
      activeTab === tab
        ? 'bg-white/[0.06] font-semibold text-foreground'
        : 'text-muted-foreground hover:text-foreground'
    )

  return (
    <div className="flex h-full flex-col">
      <ArcaneaCreationBar onNewSession={() => launchArcaneaChatFlow('session', navigate)} />

      <div className="flex gap-2 border-b border-border/40 p-2">
        <button className={tabClass('builder')} type="button" onClick={() => setActiveTab('builder')}>
          World Builder
        </button>
        <button className={tabClass('library')} type="button" onClick={() => setActiveTab('library')}>
          Library
        </button>
        <button className={tabClass('studio')} type="button" onClick={() => setActiveTab('studio')}>
          Content Studio
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'builder' && (
          <>
            <ArcaneaModelRecommender task="creative" />
            <WorldBuilder onCreate={handleWorldCreated} />
          </>
        )}
        {activeTab === 'library' && <ArcaneaLibrary worlds={worlds} />}
        {activeTab === 'studio' && (
          <>
            <ArcaneaModelRecommender task="image" />
            <ContentStudio />
          </>
        )}
      </div>
    </div>
  )
}