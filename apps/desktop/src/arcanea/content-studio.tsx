import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUpRight, Bell, ImageIcon, MonitorPlay, PencilLine, Sparkles } from '@/lib/icons'

import { launchArcaneaChatFlow, launchArcaneaImageFlow, type ArcaneaImagePreset } from './launch-session'
import { ArcaneaModelRecommender } from './model-recommender'
import { arcaneaGlass, arcaneaGlassHover } from './tokens'

const IMAGE_PRESETS: { id: ArcaneaImagePreset; title: string; desc: string }[] = [
  { id: 'cover', title: 'Book Cover', desc: 'Cinematic cover art, thumbnail-legible' },
  { id: 'portrait', title: 'Character Portrait', desc: 'PFP-grade icon power + lore face' },
  { id: 'world', title: 'World Vista', desc: 'Locations, realms, environmental myth' },
  { id: 'faction', title: 'Faction Reveal', desc: 'Emblem + heraldic scene' },
  { id: 'marketing', title: 'Marketing Hero', desc: 'Social/ad hook visual' }
]

function StudioCard({
  action,
  children,
  icon: Icon,
  title
}: {
  action?: React.ReactNode
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
  title: string
}) {
  return (
    <article className={`flex flex-col gap-3 p-5 ${arcaneaGlass} ${arcaneaGlassHover}`}>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-[#00bcd4]" />
        <h3 className="font-semibold tracking-tight">{title}</h3>
      </div>
      <div className="flex-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
      {action ? <div className="pt-1">{action}</div> : null}
    </article>
  )
}

/**
 * Arcanea Content Studio — visuals, editing, publishing workflows.
 */
export function ContentStudio() {
  const navigate = useNavigate()
  const [visualHint, setVisualHint] = useState('')
  const [selectedPreset, setSelectedPreset] = useState<ArcaneaImagePreset>('cover')

  const generateVisual = () => {
    launchArcaneaImageFlow(navigate, selectedPreset, visualHint)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <ArcaneaModelRecommender task="image" />

      <section className={`space-y-4 p-5 ${arcaneaGlass}`}>
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-[#ffd700]" />
          <h2 className="text-lg font-semibold">Visual Forge (Grok-first)</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Loads an image_generate-ready session. Connect xAI OAuth, then press Enter in chat to run.
        </p>

        <div className="flex flex-wrap gap-2">
          {IMAGE_PRESETS.map(p => (
            <button
              key={p.id}
              className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                selectedPreset === p.id
                  ? 'border-[#00bcd4]/50 bg-[#00bcd4]/10 text-foreground'
                  : 'border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:border-[#00bcd4]/25'
              }`}
              type="button"
              onClick={() => setSelectedPreset(p.id)}
            >
              <span className="block font-medium">{p.title}</span>
              <span className="block opacity-80">{p.desc}</span>
            </button>
          ))}
        </div>

        <Input
          className="border-white/[0.08] bg-white/[0.02]"
          placeholder="Optional: subject, character, book title, mood…"
          value={visualHint}
          onChange={e => setVisualHint(e.target.value)}
        />

        <Button className="bg-[#00bcd4] text-[#09090b] hover:bg-[#00bcd4]/90" onClick={generateVisual}>
          <ImageIcon className="mr-1.5 size-4" />
          Generate with Grok
        </Button>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <StudioCard icon={PencilLine} title="Manuscript & Editing">
          SunEditor + lore consistency. Canon audit before publish.
          <Button
            size="sm"
            variant="outline"
            onClick={() => launchArcaneaChatFlow('editor', navigate)}
          >
            Open Editor Session
          </Button>
        </StudioCard>

        <StudioCard icon={MonitorPlay} title="Motion & Lore Cinematics">
          Storyboard → video gen when available; image frames first.
          <Button
            size="sm"
            variant="outline"
            onClick={() => launchArcaneaChatFlow('video', navigate)}
          >
            Plan Cinematic
          </Button>
        </StudioCard>

        <StudioCard icon={Bell} title="Marketing & Influencer">
          ad-campaign-orchestrator + influencer-outreach cards.
          <Button
            size="sm"
            variant="outline"
            onClick={() => launchArcaneaChatFlow('marketing', navigate)}
          >
            Launch Campaign Plan
          </Button>
        </StudioCard>

        <StudioCard icon={ArrowUpRight} title="Publish & Distribute">
          Publishing House swarm — KDP/Gumroad, social SunVoice profiles.
          <Button
            className="bg-[#0d47a1] hover:bg-[#0d47a1]/90"
            size="sm"
            onClick={() => launchArcaneaChatFlow('publishing', navigate)}
          >
            Launch Publishing House
          </Button>
        </StudioCard>
      </div>
    </div>
  )
}