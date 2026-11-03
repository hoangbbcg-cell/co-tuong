import { GoogleAuth } from 'google-auth-library'
import { NativeFcmRepository } from '../repositories/nativeFcmRepository'

/** Server only. Requires GOOGLE_APPLICATION_CREDENTIALS and explicit enable flag. */
export async function sendNativeFcmToAccount(userId: string, title: string, body: string): Promise<{ sent: number; failed: number }> {
  if (process.env.HOVANG_NATIVE_FCM_SEND !== 'enabled') throw new Error('FCM send disabled')
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) throw new Error('Firebase server credential not configured')
  if (!title || title.length > 160 || !body || body.length > 500) throw new Error('Invalid message')
  const project = 'hovang-94cd7'
  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/firebase.messaging'] })
  const client = await auth.getClient()
  const access = await client.getAccessToken()
  if (!access.token) throw new Error('FCM authorization unavailable')
  const repository = new NativeFcmRepository()
  const devices = await repository.tokensForUser(userId)
  let sent = 0, failed = 0
  for (const device of devices) {
    try {
      const response = await fetch(`https://fcm.googleapis.com/v1/projects/${project}/messages:send`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${access.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: { token: device.token, notification: { title, body }, android: { priority: 'normal' } } }),
      })
      if (response.ok) sent++
      else {
        failed++
        if ([404, 410].includes(response.status)) await repository.disable(userId, device.hash)
      }
    } catch { failed++ }
  }
  return { sent, failed }
}
