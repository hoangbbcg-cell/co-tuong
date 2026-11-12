import {
  ENERGY_PAYMENT_PRODUCTS,
  energyPaymentProduct,
} from '../../src/lib/energyPaymentCatalog'

export function paymentAmount(code: unknown): number | null {
  return energyPaymentProduct(code)?.amountVnd ?? null
}

export function extendUnlimitedEnergy(
  currentUntil: Date | null,
  paidAt: Date,
): Date {
  if (!Number.isFinite(paidAt.getTime())) {
    throw new Error('Invalid payment date')
  }

  if (currentUntil && !Number.isFinite(currentUntil.getTime())) {
    throw new Error('Invalid subscription date')
  }

  if (currentUntil && currentUntil.getTime() > paidAt.getTime()) {
    throw new Error('Unlimited subscription is still active')
  }

  return new Date(
    paidAt.getTime() +
      ENERGY_PAYMENT_PRODUCTS.energy_unlimited_30d.durationDays *
        24 * 60 * 60 * 1000,
  )
}
