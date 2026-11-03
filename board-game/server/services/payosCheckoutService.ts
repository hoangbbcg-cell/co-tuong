import {
  createPayosPaymentLink,
  type PayosPaymentClient,
  type PayosPaymentResult,
} from './payosService'

export type PayosExistingLink = {
  orderCode: number
  amount: number
  status: string
  checkoutUrl?: string
  qrCode?: string
  id?: string
}

export type PayosCheckoutClient = PayosPaymentClient & {
  paymentRequests: PayosPaymentClient['paymentRequests'] & {
    get: (orderCode: number) => Promise<PayosExistingLink>
  }
}

export type CheckoutInput = {
  orderCode: number
  amountVnd: number
  description: string
  expiresAt: Date
}

export async function resolvePayosCheckout(
  input: CheckoutInput,
  client: PayosCheckoutClient,
  publicOrigin: string,
): Promise<PayosPaymentResult> {
  let existing: PayosExistingLink | null = null

  try {
    existing = await client.paymentRequests.get(input.orderCode)
  } catch (error) {
    // A network or authentication error must never be treated as a missing link.
    // Only a provider-confirmed 404 permits creating a new link.
    if (
      !error ||
      typeof error !== 'object' ||
      !('status' in error) ||
      error.status !== 404
    ) {
      throw error
    }
  }

  if (existing) {
    if (
      existing.orderCode !== input.orderCode ||
      existing.amount !== input.amountVnd
    ) {
      throw new Error('payOS existing payment does not match order')
    }

    if (
      existing.status !== 'PENDING' ||
      !existing.checkoutUrl ||
      !existing.qrCode ||
      !existing.id
    ) {
      throw new Error('payOS existing payment cannot be reused')
    }

    return {
      orderCode: existing.orderCode,
      checkoutUrl: existing.checkoutUrl,
      qrCode: existing.qrCode,
      paymentLinkId: existing.id,
    }
  }

  return createPayosPaymentLink(input, client, publicOrigin)
}