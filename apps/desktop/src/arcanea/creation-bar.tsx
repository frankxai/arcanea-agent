import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { FileText, FolderOpen, Globe, ImageIcon, Palette, Plus, Sparkles, Users } from '@/lib/icons'

import { ARCANEA_ROUTE, ARTIFACTS_ROUTE } from '@/app/routes'

import { launchArcaneaChatFlow, launchArcaneaImageFlow } from './launch-session'

/**
 * Arcanea Creation Bar — quick creative entry points.
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
    <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] bg-[#09090b]/80 px-3 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-sm">
        <Sparkles className="size-4 text-[#00bcd4]" />
        <span className="font-semibold text-foreground">Arcanea</span>
        <span className="text-muted-foreground">Studio</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Button size="sm" variant="outline" onClick={startSession}>
          <Plus className="mr-1 size-4" /> Session
        </Button>
        <Button
          className="border-[#00bcd4]/30 bg-[#00bcd4]/10 text-[#00bcd4] hover:bg-[#00bcd4]/20"
          size="sm"
          variant="outline"
          onClick={() => launchArcaneaChatFlow('world', navigate)}
        >
          <Globe className="mr-1 size-4" /> World
        </Button>
        <Button
          className="border-[#0d47a1]/40 bg-[#0d47a1]/15 hover:bg-[#0d47a1]/25"
          size="sm"
          variant="outline"
          onClick={() => launchArcaneaChatFlow('character', navigate)}
        >
          <Users className="mr-1 size-4" /> Character
        </Button>
        <Button
          className="border-[#ffd700]/30 bg-[#ffd700]/10 text-[#ffd700] hover:bg-[#ffd700]/20"
          size="sm"
          variant="outline"
          onClick={() => launchArcaneaChatFlow('book', navigate)}
        >
          <FileText className="mr-1 size-4" /> Book
        </Button>
        <Button
          className="border-[#00bcd4]/40 bg-[#00bcd4]/15 hover:bg-[#00bcd4]/25"
          size="sm"
          variant="outline"
          onClick={() => launchArcaneaImageFlow(navigate, 'portrait')}
        >
          <ImageIcon className="mr-1 size-4" /> Visual
        </Button>
        <Button size="sm" variant="ghost" onClick={() => navigate(ARTIFACTS_ROUTE)}>
          <FolderOpen className="mr-1 size-4" /> Artifacts
        </Button>
        <Button size="sm" variant="ghost" onClick={() => navigate(ARCANEA_ROUTE)}>
          <Palette className="mr-1 size-4" /> Studio
        </Button>
      </div>

      <div className="ml-auto hidden text-xs text-muted-foreground lg:block">
        Grok OAuth • image_generate • canon skills
      </div>
    </div>
  )
}