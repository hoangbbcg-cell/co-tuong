// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { finishGame } from '../src/game/moves/actions'
import { useGameStore } from '../src/store/gameStore'
import { useSavedMatches } from '../src/store/savedMatchesStore'
import { useMatchSaving } from '../src/features/game/hooks/useMatchSaving'
import { useReplayPlayback } from '../src/features/game/hooks/useReplayPlayback'
import type { GameState } from '../src/types/game'
import type { RecordedMatch } from '../src/types/recordedMatch'
it('late viewers wait for completion and save the latest completed match across games', () => {
  useSavedMatches.setState({ entries: [] })
  const initial = createGame()
  const playing: GameState = { ...initial, phase: 'playing' }
  const first: RecordedMatch = { id: 'first', endedAt: 1, redName: 'A', blackName: 'B', states: [initial, finishGame(initial, 'red', 'resign')] }
  const second: RecordedMatch = { ...first, id: 'second', states: [initial, finishGame(initial, 'black', 'resign')] }
  const props: { game: GameState; archive?: RecordedMatch } = { game: playing, archive: first }
  const { result, rerender } = renderHook(({ game, archive }: typeof props) => useMatchSaving(game, archive, true, 'Viewer', 'A', 'B'), { initialProps: props })
  expect(result.current.recording).toBeNull()
  act(() => result.current.save())
  expect(useSavedMatches.getState().entries).toHaveLength(0)
  rerender({ game: first.states[1], archive: first })
  expect(result.current.recording?.id).toBe('first')
  rerender({ game: playing, archive: undefined })
  act(() => result.current.save())
  expect(useSavedMatches.getState().entries.at(-1)?.id).toBe('first')
  rerender({ game: second.states[1], archive: second })
  expect(result.current.saved).toBe(false)
  act(() => result.current.save())
  expect(useSavedMatches.getState().entries.at(-1)?.id).toBe('second')
})
it('local save only exists after finish, survives reset and is idempotent', () => {
  useSavedMatches.setState({ entries: [] })
  const initial = createGame()
  const { result, rerender } = renderHook(({ game }) => useMatchSaving(game, undefined, false, 'Owner', 'Owner', 'Pikafish'), { initialProps: { game: initial } })
  expect(result.current.recording).toBeNull()
  useGameStore.setState({ history: [initial] })
  rerender({ game: finishGame(initial, 'red', 'resign') })
  expect(result.current.recording?.states).toHaveLength(2)
  act(() => result.current.save())
  expect(result.current.saved).toBe(true)
  const id = result.current.recording?.id
  rerender({ game: createGame() })
  expect(result.current.recording?.id).toBe(id)
  act(() => result.current.save())
  expect(useSavedMatches.getState().entries).toHaveLength(1)
})
it('playback supplies initial state, auto advances, seeks without mutations and resumes', () => {
  vi.useFakeTimers()
  const initial = createGame()
  const moved = { ...initial, board: initial.board.map((row, r) => row.map((piece, c) => r === 0 && c === 0 ? null : piece)) }
  const recording = { id: 'auto', endedAt: 1, redName: 'A', blackName: 'B', states: [initial, moved, finishGame(moved, 'red', 'capture')] }
  const before = JSON.stringify(recording)
  const { result, unmount } = renderHook(() => useReplayPlayback(recording))
  expect(result.current.game).toBe(initial)
  act(() => vi.advanceTimersByTime(1200))
  expect(result.current.step).toBe(1)
  act(() => result.current.seek(0))
  act(() => vi.advanceTimersByTime(2400))
  expect(result.current.step).toBe(0)
  act(() => result.current.toggle())
  act(() => vi.advanceTimersByTime(1200))
  expect(result.current.step).toBe(1)
  act(() => result.current.seek(result.current.total))
  expect(result.current.game?.phase).toBe('finished')
  expect(JSON.stringify(recording)).toBe(before)
  unmount(); vi.useRealTimers()
})
