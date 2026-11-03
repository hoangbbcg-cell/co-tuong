import { describe, expect, it } from 'vitest'
import {
  energyFullAt,
  shouldSendEnergyFull,
  energyDedupeKey
} from '../server/services/nativeFcmEnergyScheduler'
import { ENERGY_RECOVERY_MS } from '../src/lib/energy'

describe('FCM energy-full eligibility', () => {
  it('calculates true full time', () => {
    expect(energyFullAt(4, 1000)).toBe(1000)
    expect(energyFullAt(2, 1000))
      .toBe(1000 + 2 * ENERGY_RECOVERY_MS)
  })

  it('rejects already full energy', () => {
    expect(energyFullAt(5, 1000)).toBeNull()
  })

  it('waits until energy becomes full', () => {
    expect(shouldSendEnergyFull({
      energy: 4,
      recoveryAt: 1000,
      offlineSince: 900,
      now: 999
    })).toBe(false)

    expect(shouldSendEnergyFull({
      energy: 4,
      recoveryAt: 1000,
      offlineSince: 900,
      now: 1000
    })).toBe(true)
  })

  it('does not send when full before offline', () => {
    expect(shouldSendEnergyFull({
      energy: 4,
      recoveryAt: 1000,
      offlineSince: 1100,
      now: 1200
    })).toBe(false)
  })

  it('uses stable cycle-specific dedupe keys', () => {
    const a = energyDedupeKey('11', '3', 2, 1000)
    expect(a).toBe(energyDedupeKey('11', '3', 2, 1000))
    expect(a).not.toBe(energyDedupeKey('11', '4', 2, 1000))
  })
})