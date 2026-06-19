import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { launchArcaneaChatFlow } from './launch-session'

/**
 * Arcanea Content Studio — visuals, repurposing, Publishing House orchestration.
 */
export function ContentStudio() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Arcanea Content Studio</h1>
      <p>End-to-end from manuscript/world to published and marketed. Tailored workflows and cards.</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border p-4">
          <h3>Manuscript & Editing</h3>
          <p className="text-sm">SunEditor + lore consistency. Pull from Library.</p>
          <Button size="sm" variant="outline">
            Open Editor
          </Button>
        </div>
        <div className="rounded border p-4">
          <h3>Visuals (Grok-first)</h3>
          <p className="text-sm">Covers, interiors, marketing assets. Recommended: Grok image/video models.</p>
          <Button size="sm">Generate with Grok</Button>
        </div>
        <div className="rounded border p-4">
          <h3>Marketing & Influencer</h3>
          <p className="text-sm">ad-campaign-orchestrator + influencer-outreach.</p>
        </div>
        <div className="rounded border p-4">
          <h3>Publish & Social</h3>
          <p>Swarm Social Poster (SunVoice with dedicated profiles). KDP/Gumroad via book-distributor.</p>
          <Button className="mt-2" onClick={() => launchArcaneaChatFlow('publishing', navigate)}>
            Launch Publishing House Swarm
          </Button>
        </div>
      </div>
    </div>
  )
}