import { Sparkles } from '@/lib/icons'

import { arcaneaHeading } from './tokens'

export function ArcaneaStudioHeader({
  subtitle,
  title = 'Arcanea Studio'
}: {
  subtitle: string
  title?: string
}) {
  return (
    <header className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[#0d47a1]/20 via-transparent to-[#00bcd4]/10 px-6 py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-[#00bcd4]/10 blur-3xl"
      />
      <div className="relative flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg border border-[#00bcd4]/30 bg-[#00bcd4]/10">
          <Sparkles className="size-5 text-[#00bcd4]" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${arcaneaHeading}`}>{title}</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </header>
  )
}