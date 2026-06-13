import { beforeEach, describe, expect, it, vi } from 'vitest'

import { billingCommands } from '../app/slash/commands/billing.js'
import { getOverlayState, resetOverlayState } from '../app/overlayStore.js'
import type { BillingStateResponse } from '../gatewayTypes.js'

vi.mock('../lib/openExternalUrl.js', () => ({
  openExternalUrl: vi.fn(() => true)
}))

const billingCommand = billingCommands.find(cmd => cmd.name === 'billing')!

const ownerState = (overrides: Partial<BillingStateResponse> = {}): BillingStateResponse => ({
  auto_reload: { enabled: false, reload_to_display: '—', reload_to_usd: null, threshold_display: '—', threshold_usd: null },
  balance_display: '$142.50',
  balance_usd: '142.5',
  can_charge: true,
  card: { brand: 'visa', last4: '4242', masked: 'visa ····4242' },
  charge_presets: ['100', '250', '500'],
  charge_presets_display: ['$100', '$250', '$500'],
  cli_billing_enabled: true,
  is_admin: true,
  logged_in: true,
  max_usd: '10000',
  min_usd: '10',
  monthly_cap: {
    is_default_ceiling: true,
    limit_display: '$1000',
    limit_usd: '1000',
    spent_display: '$180',
    spent_this_month_usd: '180'
  },
  ok: true,
  org_name: 'Acme',
  portal_url: 'https://portal/billing?topup=open',
  role: 'OWNER',
  ...overrides
})

const guarded =
  <T,>(fn: (r: T) => void) =>
  (r: null | T) => {
    if (r) {
      fn(r)
    }
  }

/** Build a ctx whose rpc routes by method name to a supplied map of results. */
const buildCtx = (results: Record<string, unknown>) => {
  const sys = vi.fn()
  const calls: Array<{ method: string; params: unknown }> = []
  const rpc = vi.fn((method: string, params: unknown) => {
    calls.push({ method, params })
    return Promise.resolve(results[method])
  })
  const ctx = {
    gateway: { rpc },
    guarded,
    guardedErr: vi.fn(),
    sid: 'sid-1',
    stale: () => false,
    transcript: { page: vi.fn(), panel: vi.fn(), sys }
  }
  const run = async (arg: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    billingCommand.run(arg, ctx as any, 'billing')
    await rpc.mock.results[0]?.value
    await Promise.resolve()
    await Promise.resolve()
  }
  return { calls, ctx, rpc, run, sys }
}

const printed = (sys: ReturnType<typeof vi.fn>) => sys.mock.calls.map(c => c[0]).join('\n')

describe('/billing slash command', () => {
  beforeEach(() => {
    resetOverlayState()
  })

  it('not logged in → prompts to log in, no overlay', async () => {
    const { run, sys } = buildCtx({ 'billing.state': { ...ownerState(), logged_in: false, ok: true } })
    await run('')
    expect(printed(sys)).toContain('Not logged into Nous Portal')
    expect(getOverlayState().confirm).toBeNull()
  })

  it('overview renders balance, cap, and actions for an admin', async () => {
    const { run, sys, rpc } = buildCtx({ 'billing.state': ownerState() })
    await run('')
    expect(rpc).toHaveBeenCalledWith('billing.state', {})
    const out = printed(sys)
    expect(out).toContain('💳 Usage credits')
    expect(out).toContain('Balance: $142.50')
    expect(out).toContain('$180 of $1000 used (default ceiling)')
    expect(out).toContain('/billing buy')
    expect(out).toContain('Manage on portal:')
  })

  it('member sees gated message, no buy actions', async () => {
    const { run, sys } = buildCtx({
      'billing.state': ownerState({ is_admin: false, can_charge: false, role: 'MEMBER', card: null, monthly_cap: null, auto_reload: null })
    })
    await run('')
    expect(printed(sys)).toContain('require an org admin/owner')
  })

  it('buy <amount> arms a confirm overlay with consent + total', async () => {
    const { run, sys } = buildCtx({ 'billing.state': ownerState() })
    await run('buy 100')
    const confirm = getOverlayState().confirm
    expect(confirm).toBeTruthy()
    expect(confirm?.title).toBe('Buy $100 in credits?')
    expect(confirm?.confirmLabel).toBe('Pay $100')
    expect(confirm?.detail).toContain('Total due: $100')
    expect(confirm?.detail).toContain('Nous Research')
    expect(confirm?.detail).toContain('visa ····4242')
    // overview should NOT have printed an error
    expect(printed(sys)).not.toContain('🔴')
  })

  it('buy rejects an out-of-bounds amount client-side (no overlay)', async () => {
    const { run, sys } = buildCtx({ 'billing.state': ownerState() })
    await run('buy 5')
    expect(printed(sys)).toContain('Minimum is $10')
    expect(getOverlayState().confirm).toBeNull()
  })

  it('buy rejects sub-cent amount', async () => {
    const { run, sys } = buildCtx({ 'billing.state': ownerState() })
    await run('buy 10.005')
    expect(printed(sys)).toContain('2 decimal places')
    expect(getOverlayState().confirm).toBeNull()
  })

  it('buy confirm → charge → poll → settled', async () => {
    vi.useFakeTimers()
    try {
      const { run, sys } = buildCtx({
        'billing.state': ownerState(),
        'billing.charge': { ok: true, charge_id: 'ch_1', idempotency_key: 'k' },
        'billing.charge_status': { ok: true, status: 'settled', amount_usd: '100' }
      })
      await run('buy 100')
      const confirm = getOverlayState().confirm!
      confirm.onConfirm()
      // flush charge rpc + first poll
      await vi.runAllTimersAsync()
      const out = printed(sys)
      expect(out).toContain('Charge submitted')
      expect(out).toContain('✅ $100 added.')
    } finally {
      vi.useRealTimers()
    }
  })

  it('charge no_payment_method → portal funnel copy', async () => {
    const { run, sys } = buildCtx({
      'billing.state': ownerState(),
      'billing.charge': { ok: false, error: 'no_payment_method', portal_url: '/billing?topup=open', idempotency_key: 'k' }
    })
    await run('buy 100')
    getOverlayState().confirm!.onConfirm()
    await Promise.resolve()
    await Promise.resolve()
    const out = printed(sys)
    expect(out).toContain('No saved card for terminal charges')
    expect(out).toContain('Portal: /billing?topup=open')
  })

  it('charge insufficient_scope → arms step-up confirm', async () => {
    const { run } = buildCtx({
      'billing.state': ownerState(),
      'billing.charge': { ok: false, error: 'insufficient_scope', idempotency_key: 'k' }
    })
    await run('buy 100')
    getOverlayState().confirm!.onConfirm() // the buy-confirm
    await Promise.resolve()
    await Promise.resolve()
    // The charge failed with insufficient_scope → a NEW confirm (step-up) is armed.
    const stepUp = getOverlayState().confirm
    expect(stepUp?.title).toBe('Grant terminal billing access?')
  })

  it('limit screen is read-only', async () => {
    const { run, sys } = buildCtx({ 'billing.state': ownerState() })
    await run('limit')
    const out = printed(sys)
    expect(out).toContain('Monthly spend limit')
    expect(out).toContain('$180 of $1000 used this month (default ceiling)')
    expect(out).toContain('read-only')
    expect(getOverlayState().confirm).toBeNull()
  })

  it('auto-reload <below> <to> arms a confirm overlay', async () => {
    const { run } = buildCtx({ 'billing.state': ownerState() })
    await run('auto-reload 20 100')
    const confirm = getOverlayState().confirm
    expect(confirm?.title).toBe('Turn on auto-reload?')
    expect(confirm?.detail).toContain('Below $20 → reload to $100')
    expect(confirm?.confirmLabel).toBe('Agree and turn on')
  })

  it('auto-reload rejects reload-to <= threshold', async () => {
    const { run, sys } = buildCtx({ 'billing.state': ownerState() })
    await run('auto-reload 100 50')
    expect(printed(sys)).toContain('greater than the threshold')
    expect(getOverlayState().confirm).toBeNull()
  })
})
