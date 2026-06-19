import React from 'react';
import { World, Character, Book } from './models';

/**
 * Arcanea Library
 * Browse Worlds, Characters, Books, Artifacts.
 * Extends existing /artifacts route.
 * Shows consistency, tags, quick actions to Studio or New.
 */
export function ArcaneaLibrary({ worlds = [], characters = [], books = [] }: {
  worlds?: World[];
  characters?: Character[];
  books?: Book[];
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Arcanea Library</h1>
      <p className="mb-6 text-muted-foreground">Your created worlds, characters, books and artifacts. Powered by Hermes memory + SIS.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section>
          <h3 className="font-semibold mb-2 flex items-center gap-2">🌍 Worlds</h3>
          {worlds.length === 0 ? <div className="text-sm text-muted">No worlds yet. Use New World.</div> : worlds.map(w => (
            <div key={w.id} className="border p-3 rounded mb-2">
              <div className="font-medium">{w.name}</div>
              <div className="text-xs">Consistency: {(w.consistencyScore * 100).toFixed(0)}% • {w.tags.join(', ')}</div>
              <button className="text-xs underline">Open in Studio</button>
            </div>
          ))}
        </section>

        <section>
          <h3 className="font-semibold mb-2">🧑 Characters</h3>
          {characters.length === 0 ? <div className="text-sm text-muted">Forge characters tied to worlds.</div> : characters.map(c => (
            <div key={c.id} className="border p-3 rounded mb-2 text-sm">{c.name} — {c.role}</div>
          ))}
        </section>

        <section>
          <h3 className="font-semibold mb-2">📖 Books & Artifacts</h3>
          {books.length === 0 ? <div className="text-sm text-muted">Weave books from your worlds.</div> : books.map(b => (
            <div key={b.id} className="border p-3 rounded mb-2">{b.title} ({b.publishingStatus})</div>
          ))}
        </section>
      </div>

      <div className="mt-6 text-xs text-muted">Progression tracked here. Badges (long-term): First World, Published Author, Mythic NFT Creator.</div>
    </div>
  );
}
