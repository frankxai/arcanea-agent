/** True when running the Arcanea Agent fork desktop (not stock Hermes.exe). */
export function isArcaneaAgent(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return Boolean((window as Window & { __ARCANEA_AGENT__?: boolean }).__ARCANEA_AGENT__)
}