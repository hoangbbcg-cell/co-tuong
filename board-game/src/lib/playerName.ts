import { GUEST_NAME_PATTERN } from './guestIdentity'

export const PLAYER_NAME_MAX_LENGTH = 10
export const PLAYER_NAME_LENGTH_MESSAGE = 'Vui lòng nhập tối đa 10 ký tự'

export function playerNameError(name: string): string {
  const normalized = name.trim().normalize('NFC')
  if (!normalized) return 'Vui lòng nhập tên'
  if (GUEST_NAME_PATTERN.test(normalized)) return ''
  return Array.from(normalized).length > PLAYER_NAME_MAX_LENGTH ? PLAYER_NAME_LENGTH_MESSAGE : ''
}

/** Validate a newly chosen name; existing account names remain usable. */
export function playerRenameError(name: string): string {
  const normalized = name.trim().normalize('NFC')
  if (!normalized || Array.from(normalized).length > PLAYER_NAME_MAX_LENGTH || /^(?:Guest\d{5}|Kỳ\s*Thủ\s*\d{5,6})$/iu.test(normalized)) {
    return 'Tên cần từ 1 đến 10 ký tự và không dùng mẫu tên khách dành riêng.'
  }
  if ((normalized.match(/\p{Lu}/gu) ?? []).length > 1) return 'Tên chỉ được có tối đa 1 ký tự in hoa.'
  return ''
}