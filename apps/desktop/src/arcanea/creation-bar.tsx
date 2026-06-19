import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { FileText, FolderOpen, Globe, Palette, Plus, Sparkles, Users } from '@/lib/icons'

import { ARCANEA_ROUTE, ARTIFACTS_ROUTE } from '@/app/routes'

import { launchArcaneaChatFlow } from './launch-session'

/**
 * Arcanea Creation Bar — New Session + guided creative flows.
 */
export function ArcaneaCreationBar({ onNewSession }: { onNewSession?: () => void }) {
  const navigate = useNavigate()

  const startSession = () => {
    if (onNewSession) {
      onNewSession()
      return
    }

    launchArcaneaChatFlow('session', navigate)
  }

  return (
    <div className="flex items-center gap-2 border-b border-border/50 bg-background/80 p-2 rounded-t-lg">
      <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <Sparkles className="size-4 text-[#00bcd4]" />
        <span className="font-semibold text-foreground">Arcanea</span>
        <span>Creation</span>
      </div>
      <div className="ml-2 flex gap-1.5">
        <Button size="sm" variant="outline" onClick={startSession}>
          <Plus className="mr-1 size-4" /> New Session
        </Button>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          size="sm"
          variant="default"
          onClick={() => launchArcaneaChatFlow('world', navigate)}
        >
          <Globe className="mr-1 size-4" /> New World
        </Button>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          size="sm"
          variant="default"
          onClick={() => launchArcaneaChatFlow('character', navigate)}
        >
          <Users className="mr-1 size-4" /> New Character
        </Button>
        <Button
          className="bg-amber-600 hover:bg-amber-700"
          size="sm"
          variant="default"
          onClick={() => launchArcaneaChatFlow('book', navigate)}
        >
          <FileText className="mr-1 size-4" /> New Book
        </Button>
        <Button size="sm" variant="ghost" onClick={() => navigate(ARTIFACTS_ROUTE)}>
          <FolderOpen className="mr-1 size-4" /> Library
        </Button>
        <Button size="sm" variant="ghost" onClick={() => navigate(ARCANEA_ROUTE)}>
          <Palette className="mr-1 size-4" /> Content Studio
        </Button>
      </div>
      <div className="ml-auto text-xs text-muted-foreground">Grok-first for creative gen • Arcanea voice</div>
    </div>
  )
}