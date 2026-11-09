const WORLDS_KEY = 'arcanea:worlds-v1';
const PROGRESS_KEY = 'arcanea:progress-v1';

export function loadWorlds() {
  try {
    return JSON.parse(localStorage.getItem(WORLDS_KEY) || '[]');
  } catch { return []; }
}

export function saveWorld(world: any) {
  const worlds = loadWorlds();
  const idx = worlds.findIndex((w: any) => w.id === world.id);
  if (idx >= 0) worlds[idx] = world; else worlds.push(world);
  localStorage.setItem(WORLDS_KEY, JSON.stringify(worlds));
}

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch { return { worldsCreated: 0, charactersForged: 0, booksWeaved: 0, badges: [] }; }
}

export function saveProgress(p: any) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}
