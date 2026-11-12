import { generateKeyPairSync } from 'node:crypto'
import { mkdir, open, stat } from 'node:fs/promises'
import { join } from 'node:path'

// Run explicitly on LOCAL. Never print or upload the private key.
const folder = join(process.cwd(), '.local-secrets')
const destination = join(folder, 'notification-vapid.json')
await mkdir(folder, { recursive: true })
try { await stat(destination); throw new Error('VAPID file already exists; refusing to overwrite') }
catch (e) { if (e?.code !== 'ENOENT') throw e }
const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' })
const priv = privateKey.export({ format: 'jwk' })
const pub = publicKey.export({ format: 'jwk' })
const b64 = (v) => Buffer.from(v, 'base64url')
const pushPublicKey = Buffer.concat([Buffer.from([4]), b64(pub.x), b64(pub.y)]).toString('base64url')
const file = await open(destination, 'wx', 0o600)
try {
  await file.writeFile(JSON.stringify({ publicKey: pushPublicKey, privateKey: priv.d }, null, 2) + '\n')
} finally { await file.close() }
console.log('VAPID key pair written locally to .local-secrets/notification-vapid.json; do not share or commit this file.')
console.log('Public key:', pushPublicKey)
