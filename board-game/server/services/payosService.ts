import { PayOS } from '@payos/node'

export type PayosPaymentInput = {
  orderCode: number
  amountVnd: number
  description: string
  expiresAt: Date
}

export type PayosPaymentResult = {
  orderCode: number
  checkoutUrl: string
  qrCode: string
  paymentLinkId: string
}

export type PayosPaymentClient = {
  paymentRequests: {
    create: (data: {
      orderCode: number
      amount: number
      description: string
      returnUrl: string
      cancelUrl: string
      expiredAt: number
    }) => Promise<PayosPaymentResult>
  }
}

export function payosEnabled() {
  return process.env.PAYOS_PAYMENT_ENABLED === 'true'
}

export function payosClient(): PayosPaymentClient {
  if (!payosEnabled()) {
    throw new Error('payOS payments are disabled')
  }

  const clientId = process.env.PAYOS_CLIENT_ID
  const apiKey = process.env.PAYOS_API_KEY
  const checksumKey = process.env.PAYOS_CHECKSUM_KEY

  if (!clientId || !apiKey || !checksumKey) {
    throw new Error('Missing payOS credentials')
  }

  return new PayOS({ clientId, apiKey, checksumKey })
}

export async function createPayosPaymentLink(
  input: PayosPaymentInput,
  client: PayosPaymentClient,
  publicOrigin: string,
): Promise<PayosPaymentResult> {
  if (
    !Number.isSafeInteger(input.orderCode) ||
    input.orderCode <= 0 ||
    !Number.isSafeInteger(input.amountVnd) ||
    input.amountVnd <= 0 ||
    !Number.isFinite(input.expiresAt.getTime()) ||
    input.expiresAt.getTime() <= Date.now() ||
    input.description.length < 1 ||
    input.description.length > 25
  ) {
    throw new Error('Invalid payOS payment data')
  }

  const origin = new URL(publicOrigin)
  if (
    origin.protocol !== 'https:' ||
    origin.username ||
    origin.password ||
    origin.search ||
    origin.hash ||
    origin.pathname !== '/'
  ) {
    throw new Error('Invalid public payment origin')
  }

  const response = await client.paymentRequests.create({
    orderCode: input.orderCode,
    amount: input.amountVnd,
    description: input.description,
    returnUrl: new URL('/payment/return', origin).toString(),
    cancelUrl: new URL('/payment/cancel', origin).toString(),
    expiredAt: Math.floor(input.expiresAt.getTime() / 1000),
  })

  if (
    response.orderCode !== input.orderCode ||
    !response.checkoutUrl.startsWith('https://') ||
    !response.paymentLinkId ||
    !response.qrCode
  ) {
    throw new Error('Invalid payOS response')
  }

  return {
    orderCode: response.orderCode,
    checkoutUrl: response.checkoutUrl,
    qrCode: response.qrCode,
    paymentLinkId: response.paymentLinkId,
  }
}
