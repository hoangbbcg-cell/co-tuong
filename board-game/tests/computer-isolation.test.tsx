// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSessionStore } from '../src/store/sessionStore'
import { useGameStore } from '../src/store/gameStore'
import { challengeProfile } from '../src/services/challenge'
import { MatchActions } from '../src/features/game/components/MatchActions'
import { ChallengeRepository } from '../server/repositories/challengeRepository'
import { RoomRepository } from '../server/repositories/roomRepository'
import { ChallengeService } from '../server/services/challengeService'
import { RoomService } from '../server/services/roomService'

beforeEach(() => {
  useSessionStore.setState({ screen: 'game', mode: 'computer', name: 'An', room: null, avatarIndex: 0, avatarFrameIndex: 0 })
  useGameStore.getState().reset(0)
  useGameStore.getState().start(0)
})
afterEach(cleanup)

describe('isolated computer matches', () => {
  it.each(['pikafish', 'basic'] as const)('does not publish a busy status for %s', engine => {
    useSessionStore.setState({ computerEngine: engine })
    expect(challengeProfile().localBusy).toBe(false)
    useSessionStore.setState({ mode: 'local' })
    expect(challengeProfile().localBusy).toBe(true)
  })
  it('accepts invitations into a new online room without exposing the computer match', () => {
    const rooms = new RoomService(new RoomRepository(), () => 0)
    const challenges = new ChallengeService(new ChallengeRepository(), rooms)
    challenges.update('a', challengeProfile())
    challenges.update('b', { ...challengeProfile(), name: 'Binh' })
    expect(rooms.list()).toEqual([])
    expect(rooms.roomFor('a')).toBeUndefined()
    const invite = challenges.send('b', { id: 'a', name: 'An' }).invite
    const { room } = challenges.reply('a', { id: invite.id, accepted: true })
    expect(room?.players.map(player => player.id)).toEqual(['b', 'a'])
    expect(rooms.list()).toHaveLength(1)
  })
  it('hides draw/resign for computer matches and retains takeback', () => {
    const props = { visible: true, disabled: false, drawDisabled: false, takebackDisabled: false, takebacksLeft: 2, onDraw: vi.fn(), onResign: vi.fn(), onTakeback: vi.fn() }
    const { rerender } = render(<MatchActions {...props} showDrawResign={false} />)
    expect(screen.queryByRole('button', { name: /Cầu hòa/ })).toBeNull()
    expect(screen.queryByRole('button', { name: /Xin thua/ })).toBeNull()
    expect(screen.getByRole('button', { name: /Đi lại/ })).toBeTruthy()
    rerender(<MatchActions {...props} />)
    expect(screen.queryByRole('button', { name: /Cầu hòa/ })).toBeNull()
    expect(screen.getByRole('button', { name: /Xin thua/ })).toBeTruthy()
  })
})
