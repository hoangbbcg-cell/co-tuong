import { PayOS } from '@payos/node'

export type VerifiedPayosTransaction = {
  orderCode: string
  amountVnd: number
  transactionId: string
}

type WebhookVerifier = {
  webhooks: {
    verify: (body: any) => Promise<{
      orderCode: number
      amount: number
      currency: string
      reference: string
      code: string
    }>
  }
}

export async function verifyPayosPayment(
  body: unknown,
  client: WebhookVerifier,
): Promise<VerifiedPayosTransaction | null> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('Invalid webhook body')
  }

  const envelope = body as Record<string, unknown>

  // Never trust the success flag until the signature is verified.
  const verified = await client.webhooks.verify(body)

  if (
    envelope.success !== true ||
    envelope.code !== '00' ||
    verified.code !== '00'
  ) {
    return null
  }

  if (
    !Number.isSafeInteger(verified.orderCode) ||
    verified.orderCode <= 0 ||
    !Number.isSafeInteger(verified.amount) ||
    verified.amount <= 0 ||
    verified.currency !== 'VND' ||
    typeof verified.reference !== 'string' ||
    !/^[\x20-\x7E]{1,128}$/.test(verified.reference)
  ) {
    throw new Error('Invalid verified payment data')
  }

  return {
    orderCode: String(verified.orderCode),
    amountVnd: verified.amount,
    transactionId: verified.reference,
  }
}

export function payosWebhookClient() {
  const clientId = process.env.PAYOS_CLIENT_ID
  const apiKey = process.env.PAYOS_API_KEY
  const checksumKey = process.env.PAYOS_CHECKSUM_KEY

  if (!clientId || !apiKey || !checksumKey) {
    throw new Error('Missing payOS webhook credentials')
  }

  return new PayOS({ clientId, apiKey, checksumKey })
}