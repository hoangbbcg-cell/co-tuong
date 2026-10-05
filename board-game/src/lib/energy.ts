export const MAX_ENERGY = 5
export const ENERGY_RECOVERY_MS = 5 * 60 * 1000
export function recoverEnergy(energy: number, recoveryAt: number | null, now: number) {
  if (energy >= MAX_ENERGY) return { energy: MAX_ENERGY, energyRecoveryAt: null }
  if (recoveryAt === null) return { energy, energyRecoveryAt: now + ENERGY_RECOVERY_MS }
  if (now < recoveryAt) return { energy, energyRecoveryAt: recoveryAt }
  const recovered = Math.floor((now - recoveryAt) / ENERGY_RECOVERY_MS) + 1
  const next = Math.min(MAX_ENERGY, energy + recovered)
  return { energy: next, energyRecoveryAt: next === MAX_ENERGY ? null : recoveryAt + recovered * ENERGY_RECOVERY_MS }
}
