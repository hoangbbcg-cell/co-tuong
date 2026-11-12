import { v4 as uuidv4 } from 'uuid'

export function generateUUID(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  return uuidv4()
}
