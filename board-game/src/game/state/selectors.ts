import type { GameState, Side } from '../../types/game'
import { isInCheck } from '../rules'

export const sideName = (side: Side) => side === 'red' ? 'Đỏ' : 'Đen'
export function gameStatus(game: GameState): string {
  if (game.result) {
    if (game.result.reason === 'draw') return 'Hai bên đồng ý hòa. Ván cờ kết thúc!'
    const reasons = { capture: 'Ăn tướng', checkmate: 'Chiếu bí', stalemate: 'Hết nước đi', timeout: 'Hết giờ', resign: 'Xin thua', leave: 'Đối thủ rời phòng' }
    return `${reasons[game.result.reason]}! ${sideName(game.result.winner!)} thắng!`
  }
  return game.phase === 'playing' && isInCheck(game.currentTurn, game.board) ? `${sideName(game.currentTurn)} đang bị chiếu!` : ''
}
