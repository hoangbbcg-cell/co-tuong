// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { PlayerCard } from '../src/features/game/components/PlayerCard'

const mockProfile = vi.hoisted(() => ({
  current: null as null | {
    displayName: string
    avatarCode: string
    avatarFrameCode: string
    stats: { variant: string; elo: number }[]
  },
}))

vi.mock('../src/features/lobby/hooks/useDatabaseProfile', () => ({
  useDatabaseProfile: () => mockProfile.current,
}))

vi.mock('../src/features/lobby/components/AvatarCustomization', () => ({
  AvatarPortrait: ({ avatarIndex }: { avatarIndex: number }) =>
    <span data-testid="stable-portrait" data-avatar={avatarIndex} />,
}))

const props = {
  side: 'black' as const,
  name: 'Player A',
  playerId: 'player-a',
  started: true,
  active: false,
  remaining: 600000,
  turnElapsed: 0,
  likeMatchId: '',
  likeActorId: '',
}

afterEach(() => {
  cleanup()
  mockProfile.current = null
})

it('preserves portrait and Elo during a temporary profile gap', () => {
  mockProfile.current = {
    displayName: 'Stable Player',
    avatarCode: 'avatar-3',
    avatarFrameCode: 'frame-2',
    stats: [{ variant: 'xiangqi', elo: 1500 }],
  }

  const view = render(<PlayerCard {...props} />)

  expect(screen.getByTestId('stable-portrait').getAttribute('data-avatar')).toBe('3')
  expect(screen.getByText('1500')).toBeTruthy()
  expect(screen.getByText('Stable Player')).toBeTruthy()

  mockProfile.current = null
  view.rerender(<PlayerCard {...props} remaining={599000} />)

  expect(screen.getByTestId('stable-portrait').getAttribute('data-avatar')).toBe('3')
  expect(screen.getByText('1500')).toBeTruthy()
  expect(screen.getByText('Stable Player')).toBeTruthy()
})

it('never reuses the previous player profile for a different player', () => {
  mockProfile.current = {
    displayName: 'Stable Player',
    avatarCode: 'avatar-3',
    avatarFrameCode: 'frame-2',
    stats: [{ variant: 'xiangqi', elo: 1500 }],
  }

  const view = render(<PlayerCard {...props} />)

  mockProfile.current = null

  view.rerender(
    <PlayerCard {...props} playerId="player-b" name="Player B" />,
  )

  expect(screen.getByTestId('stable-portrait').getAttribute('data-avatar')).toBe('0')
  expect(screen.getByText('Player B')).toBeTruthy()
  expect(screen.queryByText('Stable Player')).toBeNull()
})

it('clears cached profile when the seat becomes empty', () => {
  mockProfile.current = {
    displayName: 'Stable Player',
    avatarCode: 'avatar-3',
    avatarFrameCode: 'frame-2',
    stats: [{ variant: 'xiangqi', elo: 1500 }],
  }

  const view = render(<PlayerCard {...props} />)
  expect(screen.getByTestId('stable-portrait').getAttribute('data-avatar')).toBe('3')

  mockProfile.current = null
  view.rerender(<PlayerCard {...props} empty />)
  view.rerender(<PlayerCard {...props} />)

  expect(screen.getByTestId('stable-portrait').getAttribute('data-avatar')).toBe('0')
  expect(screen.queryByText('Stable Player')).toBeNull()
})