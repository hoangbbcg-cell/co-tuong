export const ENTRY_STORAGE_KEY = 'co-tuong-entry-v1'
export const GUEST_NAME_PATTERN = /^(?:Guest\d{5}|Kỳ thủ\d{5}|Kỳ thủ\d{6}|Kỳ Thủ \d{6})$/u
export interface GuestEntry { version: 1; provider: 'guest'; name: string; signedOut?: true }

export function createGuestName(): string {
  const value = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000
  return `Guest${String(value % 100_000).padStart(5, '0')}`
}

export function readGuestEntry(): GuestEntry | null {
  try {
    const entry: unknown = JSON.parse(localStorage.getItem(ENTRY_STORAGE_KEY) ?? 'null')
    if (!entry || typeof entry !== 'object' || !('version' in entry) || entry.version !== 1 || !('provider' in entry) || entry.provider !== 'guest') return null
    if ('name' in entry) {
      return typeof entry.name === 'string' && GUEST_NAME_PATTERN.test(entry.name)
        ? { version: 1, provider: 'guest', name: entry.name, ...('signedOut' in entry && entry.signedOut === true ? { signedOut: true as const } : {}) } : null
    }
    // Upgrade the previous entry-only preference once, retaining the generated name.
    const upgraded: GuestEntry = { version: 1, provider: 'guest', name: createGuestName() }
    localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify(upgraded))
    return upgraded
  } catch { return null }
}
