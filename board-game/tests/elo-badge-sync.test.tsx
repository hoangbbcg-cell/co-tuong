// @vitest-environment jsdom
// Regression for the shared Elo badge: the badge tier follows the higher Elo of
// the two variants (never their sum), while displayed Elo stays variant-specific.
import { act, render, screen, cleanup } from '@testing-library/react'
import { afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest'
import { PlayerCard } from '../src/features/game/components/PlayerCard'
import { introPlayer } from '../src/features/game/components/MatchIntro'
import { ProfileDialog } from '../src/features/lobby/components/ProfileDialog'
import { useSessionStore } from '../src/store/sessionStore'
import type { VariantRating } from '../src/lib/rankProgression'
import type { AccountProfile } from '../src/types/account'
import { getRankProgress, sharedRankElo, sharedRankEloFromStats } from '../src/lib/rankProgression'

vi.mock('../src/features/lobby/hooks/useDatabaseProfile', () => ({
  useDatabaseProfile: (name: string, own: boolean) => own
    ? { id: '1', displayName: 'SelfPlayer', avatarCode: 'avatar-0', avatarFrameCode: 'frame-0',
        stats: [{ variant: 'xiangqi', elo: 1500 }, { variant: 'jieqi', elo: 2500 }] }
    : { id: '2', displayName: name, avatarCode: 'avatar-1', avatarFrameCode: 'frame-0',
        stats: [{ variant: 'xiangqi', elo: 1000 }, { variant: 'jieqi', elo: 2200 }] },
}))

const ownStats: VariantRating[] = [{ variant: 'xiangqi', elo: 1500 }, { variant: 'jieqi', elo: 2500 }]
const ownProfile = {
  id: '1', displayName: 'SelfPlayer', avatarCode: 'avatar-0', avatarFrameCode: 'frame-0',
  stats: ownStats,
} as unknown as AccountProfile
const layout = { width: 740, height: 850, scale: 0.7, avatarWidth: 980, avatarHeight: 780, avatarScale: 0.7 }

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.open = true }
  HTMLDialogElement.prototype.close = function () { this.open = false }
})
afterEach(cleanup)
beforeEach(() => {
  useSessionStore.setState({ name: 'SelfPlayer', account: null })
})

it('shared badge Elo picks the higher variant Elo and never sums them', () => {
  expect(sharedRankElo(1500, 2500)).toBe(2500)
  expect(sharedRankElo(2500, 1500)).toBe(2500)
  expect(sharedRankElo(1400, 1200)).not.toBe(2600)
  expect(sharedRankEloFromStats(ownProfile.stats)).toBe(2500)
})

it('missing variant stats fall back to the default Elo, not the other Elo plus default', () => {
  expect(sharedRankEloFromStats([{ variant: 'xiangqi', elo: 1900 } as VariantRating])).toBe(1900)
  expect(sharedRankEloFromStats([{ variant: 'jieqi', elo: 1900 } as VariantRating])).toBe(1900)
  expect(sharedRankEloFromStats(undefined)).toBe(1000)
  expect(sharedRankElo(undefined, undefined, 1350)).toBe(1350)
})

it('badge tier boundaries follow the shared Elo', () => {
  expect(getRankProgress(sharedRankElo(1000, 1600))).toMatchObject({ level: 3, name: 'Kỳ Thủ' })
  expect(getRankProgress(sharedRankElo(2799, 2800))).toMatchObject({ level: 7, name: 'Kỳ Thánh', stars: 1 })
  expect(getRankProgress(sharedRankElo(3050, 1000))).toMatchObject({ level: 7, name: 'Kỳ Thánh', stars: 3 })
})

it('MatchIntro keeps the variant Elo for sorting and text while the badge uses the shared tier', () => {
  const asXiangqi = introPlayer('SelfPlayer', ownProfile, 'xiangqi')
  const asJieqi = introPlayer('SelfPlayer', ownProfile, 'jieqi')
  expect(asXiangqi.elo).toBe(1500)
  expect(asJieqi.elo).toBe(2500)
  expect(asXiangqi.rankElo).toBe(2500)
  expect(asJieqi.rankElo).toBe(2500)
})

const cardProps = { name: 'SelfPlayer', started: false, active: false, remaining: 600000, turnElapsed: 0, likeMatchId: '', likeActorId: '' } as const

it('PlayerCard in-match avatar badge shows the shared tier while the Elo row stays variant-specific', () => {
  const xiangqi = render(<PlayerCard {...cardProps} side="black" playerId="1" />)
  expect(screen.getByText('1500')).toBeTruthy()
  expect(screen.getByRole('img', { name: 'Danh hiệu Kỳ Vương' })).toBeTruthy()
  xiangqi.unmount()
  render(<PlayerCard {...cardProps} side="black" variant="jieqi" playerId="1" />)
  expect(screen.getByText('2500')).toBeTruthy()
  expect(screen.getByRole('img', { name: 'Danh hiệu Kỳ Vương' })).toBeTruthy()
})

it('ProfileDialog applies the shared tier for own profile with the higher jieqi Elo', () => {
  const ref = { current: null as HTMLDialogElement | null }
  render(<ProfileDialog dialogRef={ref as never} layout={layout} name="SelfPlayer" onClose={() => {}} primaryActionLabel="Liên kết" onPrimaryAction={() => {}} />)
  act(() => ref.current?.showModal())
  expect(screen.getByRole('img', { name: 'Danh hiệu Kỳ Vương' })).toBeTruthy()
})

it('ProfileDialog applies the shared tier for another player whose jieqi Elo is higher', () => {
  const ref = { current: null as HTMLDialogElement | null }
  render(<ProfileDialog dialogRef={ref as never} layout={layout} name="OtherPlayer" onClose={() => {}} primaryActionLabel="Kết bạn" onPrimaryAction={() => {}} />)
  act(() => ref.current?.showModal())
  expect(screen.getByRole('img', { name: 'Danh hiệu Đại Sư' })).toBeTruthy()
})
