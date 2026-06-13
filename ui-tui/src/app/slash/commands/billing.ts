import type {
  BillingChargeResponse,
  BillingChargeStatusResponse,
  BillingMutationResponse,
  BillingStateResponse
} from '../../../gatewayTypes.js'
import { openExternalUrl } from '../../../lib/openExternalUrl.js'
import { patchOverlayState } from '../../overlayStore.js'
import type { SlashCommand, SlashRunCtx } from '../types.js'

// Poll cadence (plan §5, frozen): 2s interval, 5-minute cap.
const POLL_INTERVAL_MS = 2000
const POLL_CAP_MS = 5 * 60 * 1000

type Sys = (text: string) => void

/** Render the role/kill-switch-gated overview (Screen 1) as transcript text. */
const renderOverview = (sys: Sys, s: BillingStateResponse): void => {
  const lines = ['💳 Usage credits', `Balance: ${s.balance_display}`]
  if (s.monthly_cap && s.monthly_cap.limit_usd != null) {
    const ceiling = s.monthly_cap.is_default_ceiling ? ' (default ceiling)' : ''
    lines.push(`This month: ${s.monthly_cap.spent_display} of ${s.monthly_cap.limit_display} used${ceiling}`)
  }
  if (s.auto_reload) {
    lines.push(
      s.auto_reload.enabled
        ? `Auto-reload: on — below ${s.auto_reload.threshold_display} → reload to ${s.auto_reload.reload_to_display}`
        : 'Auto-reload: off'
    )
  }
  if (s.org_name) {
    lines.push(`Org: ${s.org_name}${s.role ? ` · ${s.role}` : ''}`)
  }

  if (!s.is_admin) {
    lines.push('', 'Billing actions require an org admin/owner.')
  } else if (!s.cli_billing_enabled) {
    lines.push('', 'Terminal billing is turned off for this org — enable it on the portal.')
  } else {
    lines.push(
      '',
      'Actions:',
      '  /billing buy <amount>           — buy credits',
      '  /billing auto-reload <below> <to> — configure auto-reload',
      '  /billing limit                  — view the monthly limit'
    )
    if (s.charge_presets_display.length) {
      lines.push(`Presets: ${s.charge_presets_display.join(', ')}`)
    }
  }
  if (s.portal_url) {
    lines.push('', `Manage on portal: ${s.portal_url}`)
  }
  sys(lines.join('\n'))
}

/** Map a typed billing error envelope to user-facing copy + portal funnel. */
const renderBillingError = (
  sys: Sys,
  ctx: SlashRunCtx,
  env: { error?: string; message?: string; portal_url?: string | null; retry_after?: number | null }
): void => {
  const portal = env.portal_url
  switch (env.error) {
    case 'insufficient_scope':
      armStepUp(sys, ctx)
      return
    case 'no_payment_method':
      sys(
        '💳 No saved card for terminal charges yet. Set one up on the portal ' +
          "(one-time credit buys don't save a reusable card)."
      )
      break
    case 'cli_billing_disabled':
      sys('🔴 Terminal billing is turned off for this org. Enable it on the portal.')
      break
    case 'monthly_cap_exceeded':
      sys(`🔴 ${env.message || 'Monthly spend cap reached.'}`)
      break
    case 'rate_limited': {
      const mins = env.retry_after ? ` (try again in ~${Math.max(1, Math.round(env.retry_after / 60))} min)` : ''
      sys(`🟡 Too many charges right now${mins}. This isn't a payment failure.`)
      break
    }
    default:
      sys(`🔴 ${env.message || env.error || 'Billing request failed.'}`)
  }
  if (portal) {
    sys(`Portal: ${portal}`)
  }
}

/** 403 insufficient_scope → arm a ConfirmReq that runs the lazy step-up. */
const armStepUp = (sys: Sys, ctx: SlashRunCtx): void => {
  sys('💳 Terminal billing needs an extra permission (billing:manage).')
  patchOverlayState({
    confirm: {
      cancelLabel: 'Not now',
      confirmLabel: 'Re-authorize',
      detail: 'An org admin/owner must tick "Allow terminal billing" in the portal.',
      onConfirm: () => {
        ctx.gateway
          .rpc<BillingMutationResponse>('billing.step_up', {})
          .then(
            ctx.guarded<BillingMutationResponse>(r => {
              if (r.ok && r.granted) {
                sys('✅ Terminal billing enabled. Run /billing buy again to continue.')
              } else {
                sys('🟡 Terminal billing was not granted (an admin must tick the box).')
              }
            })
          )
          .catch(ctx.guardedErr)
      },
      title: 'Grant terminal billing access?'
    }
  })
}

/** Poll a charge to a terminal state (settled/failed/timeout). Non-blocking. */
const pollCharge = (sys: Sys, ctx: SlashRunCtx, chargeId: string): void => {
  const start = Date.now()
  const tick = (): void => {
    if (ctx.stale()) {
      return
    }
    ctx.gateway
      .rpc<BillingChargeStatusResponse>('billing.charge_status', { charge_id: chargeId })
      .then(
        ctx.guarded<BillingChargeStatusResponse>(r => {
          if (!r.ok) {
            // 429/503 while polling = retry-after, NOT a failure. Back off + continue.
            if (r.error === 'rate_limited') {
              const wait = (r.retry_after ?? 5) * 1000
              setTimeout(tick, Math.min(wait, 30000))
              return
            }
            sys(`🔴 Could not check the charge: ${r.message || r.error || 'error'}`)
            return
          }
          if (r.status === 'settled') {
            sys(`✅ ${r.amount_usd ? `$${r.amount_usd}` : 'Credits'} added.`)
            return
          }
          if (r.status === 'failed') {
            renderChargeFailed(sys, ctx, r.reason)
            return
          }
          // pending → keep polling until the 5-min cap, then call it a timeout.
          if (Date.now() - start >= POLL_CAP_MS) {
            sys(
              '🟡 Still processing after 5 minutes — this is a timeout, not a failure. ' +
                'Check /billing or the portal shortly.'
            )
            return
          }
          setTimeout(tick, POLL_INTERVAL_MS)
        })
      )
      .catch(ctx.guardedErr)
  }
  tick()
}

const renderChargeFailed = (sys: Sys, _ctx: SlashRunCtx, reason?: string | null): void => {
  switch ((reason || '').trim()) {
    case 'authentication_required':
      sys('🔴 Your bank requires verification (3DS). Complete it on the portal to finish this purchase.')
      break
    case 'payment_method_expired':
      sys('🔴 Your card has expired. Update it on the portal.')
      break
    case 'card_declined':
      sys('🔴 Your card was declined. Try another card on the portal.')
      break
    default:
      sys(`🔴 The charge didn't go through (${reason || 'processing_error'}).`)
  }
}

/** Validate a custom amount against state bounds + 2dp, mirroring the server. */
const validateAmount = (raw: string, s: BillingStateResponse): { amount?: string; error?: string } => {
  const cleaned = raw.trim().replace(/^\$/, '').trim()
  if (!cleaned || !/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    return { error: 'Enter a dollar amount, e.g. 100 (max 2 decimal places).' }
  }
  const value = Number(cleaned)
  if (!(value > 0)) {
    return { error: 'Amount must be greater than $0.' }
  }
  if (s.min_usd != null && value < Number(s.min_usd)) {
    return { error: `Minimum is $${s.min_usd}.` }
  }
  if (s.max_usd != null && value > Number(s.max_usd)) {
    return { error: `Maximum is $${s.max_usd}.` }
  }
  return { amount: cleaned }
}

/** `/billing buy <amount>` → confirm (Screen 4) → charge → poll. */
const runBuy = (arg: string, ctx: SlashRunCtx, sys: Sys, s: BillingStateResponse): void => {
  if (!s.is_admin || !s.cli_billing_enabled) {
    sys('🔴 Buying credits requires an org admin/owner with terminal billing enabled.')
    if (s.portal_url) {
      sys(`Portal: ${s.portal_url}`)
    }
    return
  }
  const amountArg = arg.trim()
  if (!amountArg) {
    const presets = s.charge_presets_display.join(', ') || '(none)'
    sys(`Usage: /billing buy <amount>\nPresets: ${presets}`)
    return
  }
  const v = validateAmount(amountArg, s)
  if (v.error || !v.amount) {
    sys(`🔴 ${v.error}`)
    return
  }
  const amount = v.amount
  const payLine = s.card ? `Payment: ${s.card.masked}` : 'No saved card on file'
  patchOverlayState({
    confirm: {
      cancelLabel: 'Cancel',
      confirmLabel: `Pay $${amount}`,
      detail:
        `Total due: $${amount}  (one-time credits — no tax)\n${payLine}\n\n` +
        'By confirming, you allow Nous Research to charge your card in the amount above.',
      onConfirm: () => {
        sys('💳 Charge submitted — confirming settlement…')
        ctx.gateway
          .rpc<BillingChargeResponse>('billing.charge', { amount_usd: amount })
          .then(
            ctx.guarded<BillingChargeResponse>(r => {
              if (r.ok && r.charge_id) {
                pollCharge(sys, ctx, r.charge_id)
              } else {
                renderBillingError(sys, ctx, r)
              }
            })
          )
          .catch(ctx.guardedErr)
      },
      title: `Buy $${amount} in credits?`
    }
  })
}

/** `/billing auto-reload <below> <to>` → confirm (Screen 2) → PATCH. */
const runAutoReload = (arg: string, ctx: SlashRunCtx, sys: Sys, s: BillingStateResponse): void => {
  if (!s.is_admin || !s.cli_billing_enabled) {
    sys('🔴 Auto-reload requires an org admin/owner with terminal billing enabled.')
    return
  }
  if (!s.card) {
    sys('🔴 No saved card — set one up on the portal first.')
    if (s.portal_url) {
      sys(`Portal: ${s.portal_url}`)
    }
    return
  }
  const parts = arg.trim().split(/\s+/).filter(Boolean)
  if (parts.length !== 2) {
    sys('Usage: /billing auto-reload <below-amount> <reload-to-amount>')
    return
  }
  const tv = validateAmount(parts[0], s)
  const rv = validateAmount(parts[1], s)
  if (tv.error || !tv.amount) {
    sys(`🔴 Threshold: ${tv.error}`)
    return
  }
  if (rv.error || !rv.amount) {
    sys(`🔴 Reload-to: ${rv.error}`)
    return
  }
  if (Number(rv.amount) <= Number(tv.amount)) {
    sys('🔴 Reload-to amount must be greater than the threshold.')
    return
  }
  const threshold = tv.amount
  const reloadTo = rv.amount
  patchOverlayState({
    confirm: {
      cancelLabel: 'Cancel',
      confirmLabel: 'Agree and turn on',
      detail:
        `Below $${threshold} → reload to $${reloadTo}\nCard: ${s.card.masked}\n\n` +
        'By turning this on, you authorize Nous Research to automatically charge this card ' +
        'whenever your balance falls below the threshold. Turn off any time here or on the portal.',
      onConfirm: () => {
        ctx.gateway
          .rpc<BillingMutationResponse>('billing.auto_reload', {
            enabled: true,
            threshold: Number(threshold),
            top_up_amount: Number(reloadTo)
          })
          .then(
            ctx.guarded<BillingMutationResponse>(r => {
              if (r.ok) {
                sys(`✅ Auto-reload on: below $${threshold} → reload to $${reloadTo}.`)
              } else {
                renderBillingError(sys, ctx, r)
              }
            })
          )
          .catch(ctx.guardedErr)
      },
      title: 'Turn on auto-reload?'
    }
  })
}

/** `/billing limit` → read-only monthly cap (Screen 5). */
const runLimit = (sys: Sys, s: BillingStateResponse): void => {
  const lines = ['💳 Monthly spend limit']
  if (s.monthly_cap && s.monthly_cap.limit_usd != null) {
    const ceiling = s.monthly_cap.is_default_ceiling ? ' (default ceiling)' : ''
    lines.push(`${s.monthly_cap.spent_display} of ${s.monthly_cap.limit_display} used this month${ceiling}`)
  } else {
    lines.push('No monthly cap visible (managed on the portal).')
  }
  lines.push('The monthly limit is set on the portal — the terminal shows it read-only.')
  if (s.portal_url) {
    lines.push(`Manage on portal: ${s.portal_url}`)
  }
  sys(lines.join('\n'))
}

export const billingCommands: SlashCommand[] = [
  {
    help: 'Manage Nous terminal billing — buy credits, auto-reload, limits',
    name: 'billing',
    run: (arg, ctx) => {
      const sys: Sys = ctx.transcript.sys
      const raw = (arg || '').trim()
      const [subRaw, ...rest] = raw.split(/\s+/)
      const sub = (subRaw || '').toLowerCase()
      const subArg = rest.join(' ')

      ctx.gateway
        .rpc<BillingStateResponse>('billing.state', {})
        .then(
          ctx.guarded<BillingStateResponse>(s => {
            if (!s.logged_in) {
              sys('💳 Not logged into Nous Portal — run /portal to log in, then /billing.')
              return
            }
            if (sub === 'buy' || sub === 'credits' || sub === 'topup' || sub === 'top-up') {
              runBuy(subArg, ctx, sys, s)
            } else if (sub === 'auto-reload' || sub === 'autoreload' || sub === 'auto' || sub === 'reload') {
              runAutoReload(subArg, ctx, sys, s)
            } else if (sub === 'limit' || sub === 'cap' || sub === 'monthly') {
              runLimit(sys, s)
            } else if (sub === 'portal' && s.portal_url) {
              const url = s.portal_url
              openExternalUrl(url)
              sys(`Opening portal: ${url}`)
            } else {
              renderOverview(sys, s)
            }
          })
        )
        .catch(ctx.guardedErr)
    }
  }
]
