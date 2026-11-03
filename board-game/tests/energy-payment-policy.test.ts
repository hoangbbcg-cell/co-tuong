import { describe, expect, it } from 'vitest'
import {
  ENERGY_PAYMENT_PRODUCTS,
  energyPaymentProduct,
} from '../src/lib/energyPaymentCatalog'
import {
  extendUnlimitedEnergy,
  paymentAmount,
} from '../server/services/energyPaymentPolicy'

describe('energy payment policy', () => {
  it('uses fixed server prices', () => {
    expect(paymentAmount('energy_100')).toBe(19000)
    expect(paymentAmount('energy_unlimited_30d')).toBe(39000)
    expect(paymentAmount('invalid')).toBeNull()
    expect(paymentAmount('__proto__')).toBeNull()
  })

  it('defines exactly two products', () => {
    expect(Object.keys(ENERGY_PAYMENT_PRODUCTS)).toHaveLength(2)
    const product = energyPaymentProduct('energy_100')
    expect(product).not.toBeNull()
    expect(product && 'energy' in product ? product.energy : null).toBe(100)
  })

  it('starts a new subscription from payment time', () => {
    const paid = new Date('2026-10-29T10:00:00Z')
    expect(extendUnlimitedEnergy(null, paid).toISOString())
      .toBe('2026-11-28T10:00:00.000Z')
  })

  it('rejects an active subscription', () => {
    const paid = new Date('2026-10-29T10:00:00Z')
    const until = new Date('2026-11-15T10:00:00Z')
    expect(() => extendUnlimitedEnergy(until, paid))
      .toThrow('Unlimited subscription is still active')
  })

  it('restarts an expired subscription', () => {
    const paid = new Date('2026-10-29T10:00:00Z')
    const expired = new Date('2026-10-01T10:00:00Z')
    expect(extendUnlimitedEnergy(expired, paid).toISOString())
      .toBe('2026-11-28T10:00:00.000Z')
  })
})
