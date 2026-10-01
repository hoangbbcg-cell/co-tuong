import type { Move } from '../../types/game'

export function toUci(move: Move): string {
  return `${String.fromCharCode(97 + move.from.col)}${9 - move.from.row}${String.fromCharCode(97 + move.to.col)}${9 - move.to.row}`
}

export function fromUci(value: string): Move | null {
  if (!/^[a-i][0-9][a-i][0-9]$/.test(value)) return null
  return {
    from: { row: 9 - Number(value[1]), col: value.charCodeAt(0) - 97 },
    to: { row: 9 - Number(value[3]), col: value.charCodeAt(2) - 97 },
  }
}
