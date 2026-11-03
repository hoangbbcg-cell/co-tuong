// @vitest-environment jsdom
import { beforeEach, expect, it, vi } from 'vitest'
import { usePlayedMatches } from '../src/store/playedMatchesStore'
import { useSavedMatches } from '../src/store/savedMatchesStore'
import { createGame } from '../src/game/state/initial'
import { finishGame } from '../src/game/moves/actions'
beforeEach(() => { localStorage.clear(); useSavedMatches.setState({ entries: [] }) })
it('stores finished matches once, preserves boards and persists removal', async () => {
  const game = createGame()
  const recording = { id: 'one', endedAt: 1, redName: 'A', blackName: 'B', states: [game] }
  await expect(useSavedMatches.getState().save('me', recording)).rejects.toThrow('Chỉ lưu')
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
it('quota failure does not report success', async () => {
  const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceeded') })
  await expect(useSavedMatches.getState().save('me', { id: 'two', endedAt: 1, redName: 'A', blackName: 'B', states: [finishGame(createGame(), 'red', 'resign')] })).rejects.toThrow('Bộ nhớ đã đầy')
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

it('records a started zero-move match and replaces it with its zero-move final result', () => {
  vi.useFakeTimers()
  usePlayedMatches.setState({ entries: [] })
  try {
    const ready = { id: 'started-zero', endedAt: Date.now(), redName: 'me', blackName: 'B', states: [createGame()] }
    usePlayedMatches.getState().record('me', ready)
    expect(usePlayedMatches.getState().entries).toHaveLength(0)
    const initial = { ...createGame(), phase: 'playing' as const }
    const started = { ...ready, startedAt: Date.now(), states: [initial] }
    usePlayedMatches.getState().record('me', started)
    expect(usePlayedMatches.getState().entries[0].states).toEqual([initial])
    const final = finishGame(initial, 'black', 'leave')
    usePlayedMatches.getState().record('me', { ...started, states: [final] })
    expect(usePlayedMatches.getState().entries).toHaveLength(1)
    expect(usePlayedMatches.getState().entries[0].states).toEqual([final])
    usePlayedMatches.getState().record('me', started)
    expect(usePlayedMatches.getState().entries[0].states[0].phase).toBe('finished')
  } finally {
    usePlayedMatches.setState({ entries: [] })
    vi.useRealTimers()
  }
})

it('local deletion does not require server history', async () => {
  const { accountApi } = await import('../src/services/accountApi')
  const { useSessionStore } = await import('../src/store/sessionStore')
  const previousAccount = useSessionStore.getState().account
  const historySpy = vi.spyOn(accountApi, 'history').mockRejectedValue(new Error('network offline'))
  try {
    useSessionStore.setState({ account: { id: 'test-account' } as never })
    const started = finishGame(createGame(), 'red', 'resign')
    await useSavedMatches.getState().save('me', {
      id: 'local-delete-regression',
      endedAt: Date.now(),
      redName: 'me',
      blackName: 'Máy',
      states: [started]
    })
    await useSavedMatches.getState().remove('me', 'local-delete-regression')
    expect(useSavedMatches.getState().entries).toHaveLength(0)
    expect(JSON.parse(localStorage.getItem('xiangqi-saved-matches-v1')!)).toEqual([])
    expect(historySpy).not.toHaveBeenCalled()
  } finally {
    historySpy.mockRestore()
    useSessionStore.setState({ account: previousAccount })
  }
})