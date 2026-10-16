import { GUEST_NAME_PATTERN } from './guestIdentity'

export const PLAYER_NAME_MAX_LENGTH = 10
export const PLAYER_NAME_LENGTH_MESSAGE = 'Vui lòng nhập tối đa 10 ký tự'

export function playerNameError(name: string): string {
  const normalized = name.trim().normalize('NFC')
  if (!normalized) return 'Vui lòng nhập tên'
  if (GUEST_NAME_PATTERN.test(normalized)) return ''
  return Array.from(normalized).length > PLAYER_NAME_MAX_LENGTH ? PLAYER_NAME_LENGTH_MESSAGE : ''
}
