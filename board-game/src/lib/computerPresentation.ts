export const JIEQI_COMPUTER_PATH = '/co-up-ong-hoang'
export const LEGACY_JIEQI_COMPUTER_PATH = '/jieqi-ai'

export function isJieqiComputerPath(path: string) {
  return [JIEQI_COMPUTER_PATH, LEGACY_JIEQI_COMPUTER_PATH].includes(path.replace(/\/$/, ''))
}

/** Public messages must never repeat worker/native/network diagnostics. */
export function computerErrorMessage(variant: 'xiangqi' | 'jieqi' = 'xiangqi') {
  return `${variant === 'jieqi' ? 'Cờ Úp Ông Hoàng' : 'Ông Hoàng'} chưa thể xử lý yêu cầu. Vui lòng thử lại.`
}
