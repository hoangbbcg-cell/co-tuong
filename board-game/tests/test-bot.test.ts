import { expect, it, vi } from 'vitest'
import { TestBotService } from '../server/services/testBotService'
import { getLegalMoves } from '../src/game/rules'
import type { GameState, Move } from '../src/types/game'
import type { AccountProfile } from '../src/types/account'

export function humanMove(game: GameState): Move {
  for (let row=0;row<10;row++) for(let col=0;col<9;col++) {
    if(game.board[row][col]?.side !== 'red') continue
    const to=getLegalMoves(row,col,game.board)[0]
    if(to)return {from:{row,col},to}
  }
  throw new Error('No human move')
}
it.each(['xiangqi','jieqi'] as const)('loses %s after two human moves without paying on retries', async variant => {
  const reward=vi.fn(async()=>({gold:'150'} as AccountProfile)),service=new TestBotService({reward})
  const start=service.start('one',variant)
  expect(start.game.variant??'xiangqi').toBe(variant)
  const first=await service.move('one',start.id,humanMove(start.game),'first')
  expect(first.game.phase).toBe('playing');expect(first.humanMoves).toBe(1)
  expect(first.game.currentTurn).toBe('red');expect(reward).not.toHaveBeenCalled()
  const move=humanMove(first.game)
  const [win,retry]=await Promise.all([service.move('one',start.id,move,'second'),service.move('one',start.id,move,'second')])
  expect(win.game.result?.winner).toBe('black');expect(win.humanMoves).toBe(2)
  expect(win.goldAwarded).toBe(0)
  expect(retry).toEqual(win);expect(reward).not.toHaveBeenCalled()
  await expect(service.move('one',start.id,move,'different')).rejects.toThrow('kết thúc')
})
it('rejects invalid moves and other users without granting gold', async () => {
  const reward=vi.fn(),service=new TestBotService({reward}),start=service.start('one','xiangqi')
  expect(()=>service.move('other',start.id,humanMove(start.game),'first')).toThrow('hết hạn')
  await expect(service.move('one',start.id,{from:{row:0,col:0},to:{row:1,col:0}},'invalid')).rejects.toThrow('không hợp lệ')
  expect(reward).not.toHaveBeenCalled()
})
