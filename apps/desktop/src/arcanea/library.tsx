import { Button } from '@/components/ui/button'
import { ImageIcon, Palette } from '@/lib/icons'

import type { Book, Character, World } from './models'
import { ArcaneaStudioHeader } from './studio-header'
import { arcaneaGlass, arcaneaGlassHover } from './tokens'

export function ArcaneaLibrary({
  books = [],
  characters = [],
  onOpenStudio,
  onVisualizeWorld,
  worlds = []
}: {
  books?: Book[]
  characters?: Character[]
  onOpenStudio?: () => void
  onVisualizeWorld?: (world: World) => void
  worlds?: World[]
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <ArcaneaStudioHeader
        subtitle="Worlds, characters, and manuscripts you've forged — persisted locally until SIS sync ships."
        title="Arcanea Library"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <section className={`p-4 ${arcaneaGlass}`}>
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <span className="text-[#00bcd4]">Worlds</span>
            <span className="text-xs font-normal text-muted-foreground">({worlds.length})</span>
          </h3>
          {worlds.length === 0 ? (
            <p className="text-sm text-muted-foreground">No worlds yet — use World Builder or New World.</p>
          ) : (
            <ul className="space-y-2">
              {worlds.map(w => (
                <li key={w.id} className={`space-y-2 p-3 text-sm ${arcaneaGlass} ${arcaneaGlassHover}`}>
                  <div className="font-medium">{w.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{w.corePremise}</div>
                  <div className="text-xs text-[#ffd700]/80">
                    Consistency {(w.consistencyScore * 100).toFixed(0)}% · {w.tags.join(', ')}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {onVisualizeWorld ? (
                      <Button size="xs" variant="outline" onClick={() => onVisualizeWorld(w)}>
                        <ImageIcon className="mr-1 size-3" />
                        Visualize
                      </Button>
                    ) : null}
                    {onOpenStudio ? (
                      <Button size="xs" variant="ghost" onClick={onOpenStudio}>
                        <Palette className="mr-1 size-3" />
                        Studio
                      </Button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={`p-4 ${arcaneaGlass}`}>
          <h3 className="mb-3 font-semibold text-[#00bcd4]">Characters</h3>
          {characters.length === 0 ? (
            <p className="text-sm text-muted-foreground">Forge characters tied to worlds from the creation bar.</p>
          ) : (
            characters.map(c => (
              <div key={c.id} className="mb-2 rounded border border-white/[0.06] p-2 text-sm">
                {c.name} — {c.role}
              </div>
            ))
          )}
        </section>

        <section className={`p-4 ${arcaneaGlass}`}>
          <h3 className="mb-3 font-semibold text-[#00bcd4]">Books & Artifacts</h3>
          {books.length === 0 ? (
            <p className="text-sm text-muted-foreground">Weave books from worlds — or browse Hermes Artifacts.</p>
          ) : (
            books.map(b => (
              <div key={b.id} className="mb-2 rounded border border-white/[0.06] p-2 text-sm">
                {b.title} ({b.publishingStatus})
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}