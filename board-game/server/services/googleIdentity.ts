import { OAuth2Client } from 'google-auth-library'
import { AccountError } from '../errors'

const client = new OAuth2Client()
export async function verifyGoogleCredential(credential: unknown, nonce: string): Promise<string> {
  const audience = process.env.GOOGLE_CLIENT_ID
  if (!audience) throw new AccountError('Google chưa được cấu hình trên máy chủ.', 503)
  if (typeof credential !== 'string' || credential.length > 12000 || !credential || !nonce) throw new AccountError('Thông tin Google không hợp lệ.', 401)
  try {
    const ticket = await client.verifyIdToken({ idToken: credential, audience })
    const payload = ticket.getPayload()
    // The library verifies signature, issuer, expiry and audience. Keep explicit claim checks too.
    if (!payload?.sub || payload.sub.length > 255 || !/^[\x21-\x7e]+$/.test(payload.sub) || payload.aud !== audience ||
      !['accounts.google.com', 'https://accounts.google.com'].includes(payload.iss) || payload.exp <= Date.now()/1000 ||
      (payload as typeof payload & { nonce?: string }).nonce !== nonce) throw new Error('Invalid claims')
    return payload.sub
  } catch { throw new AccountError('Không xác minh được đăng nhập Google. Vui lòng thử lại.', 401) }
}
