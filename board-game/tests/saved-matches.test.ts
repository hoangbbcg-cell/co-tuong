// @vitest-environment jsdom
import { beforeEach, expect, it, vi } from 'vitest'
import { useSavedMatches } from '../src/store/savedMatchesStore'
import { createGame } from '../src/game/state/initial'
import { finishGame } from '../src/game/moves/actions'
beforeEach(() => { localStorage.clear(); useSavedMatches.setState({ entries: [] }) })
it('stores finished matches once, preserves boards and persists removal', () => {
  const game = createGame()
  const recording = { id: 'one', endedAt: 1, redName: 'A', blackName: 'B', states: [game] }
  expect(() => useSavedMatches.getState().save('me', recording)).toThrow('Chỉ lưu')
  recording.states.push(finishGame(game, 'red', 'resign'))
  useSavedMatches.getState().save('me', recording)
  useSavedMatches.getState().save('me', recording)
  expect(useSavedMatches.getState().entries).toHaveLength(1)
  recording.states[0].board[0][0] = null
  expect(useSavedMatches.getState().entries[0].states[0].board[0][0]).not.toBeNull()
  expect(JSON.parse(localStorage.getItem('xiangqi-saved-matches-v1')!)).toHaveLength(1)
  useSavedMatches.getState().remove('other', 'one')
  expect(useSavedMatches.getState().entries).toHaveLength(1)
  useSavedMatches.getState().remove('me', 'one')
  expect(JSON.parse(localStorage.getItem('xiangqi-saved-matches-v1')!)).toHaveLength(0)
})
it('quota failure does not report success', () => {
  const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceeded') })
  expect(() => useSavedMatches.getState().save('me', { id: 'two', endedAt: 1, redName: 'A', blackName: 'B', states: [finishGame(createGame(), 'red', 'resign')] })).toThrow('Bộ nhớ đã đầy')
  expect(useSavedMatches.getState().entries).toHaveLength(0)
  spy.mockRestore()
})

 it('uses the owner side regardless of the first turn, with red fallback for spectators', async () => {
 const { savedMatchSide } = await import('../src/lib/savedMatchPerspective')
 const game = createGame()
 const record = { id: 'perspective', endedAt: 1, redName: 'red player', blackName: 'me', states: [game] }
 expect(savedMatchSide(record, 'me')).toBe('black')
 game.currentTurn = 'black'
 expect(savedMatchSide(record, 'me')).toBe('black')
 expect(savedMatchSide(record, 'red player')).toBe('red')
 expect(savedMatchSide(record, 'spectator')).toBe('red')
 })
