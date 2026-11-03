export const ENERGY_PAYMENT_PRODUCTS = {
  energy_100: {
    code: 'energy_100',
    title: '100 năng lượng',
    amountVnd: 19000,
    energy: 100,
  },
  energy_unlimited_30d: {
    code: 'energy_unlimited_30d',
    title: 'Năng lượng vô hạn 30 ngày',
    amountVnd: 39000,
    durationDays: 30,
  },
} as const

export type EnergyPaymentProductCode =
  keyof typeof ENERGY_PAYMENT_PRODUCTS

export function energyPaymentProduct(code: unknown) {
  if (
    typeof code !== 'string' ||
    !Object.prototype.hasOwnProperty.call(ENERGY_PAYMENT_PRODUCTS, code)
  ) {
    return null
  }

  return ENERGY_PAYMENT_PRODUCTS[code as EnergyPaymentProductCode]
}
