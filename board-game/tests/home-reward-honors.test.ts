// @vitest-environment jsdom
import { beforeEach, expect, it, vi } from 'vitest'

beforeEach(() => { localStorage.clear(); vi.resetModules() })
const load = () => import('../src/store/homeRewardsStore')

it('does not notify existing honors on first sync', async () => {
  const rewards = await load()
  rewards.observeRewardHonors('mobile', ['old'])
  expect(rewards.pendingHomeRewards('mobile')).toEqual([])
  rewards.observeRewardHonors('mobile', ['old', 'new'])
  expect(rewards.pendingHomeRewards('mobile').map(reward => reward.code)).toEqual(['new'])
})

it('recovers old device caches once without duplicating an already pending receipt', async () => {
  localStorage.setItem('cotuong-home-rewards-v1:old', JSON.stringify({ honors: ['current', 'revoked'], pending: [{ id: 'queued', kind: 'honor', code: 'current' }] }))
  const rewards = await load()
  rewards.observeRewardHonors('old', ['current', 'new'])
  expect(rewards.pendingHomeRewards('old')).toEqual([])
  expect(rewards.pendingHomeRewards('old')).toHaveLength(0)
})

it('does not reopen confirmed receipts after reload or returning home', async () => {
  const rewards = await load()
  rewards.observeRewardHonors('confirmed', ['current'])
  rewards.acknowledgeHomeRewards('confirmed', rewards.pendingHomeRewards('confirmed').map(reward => reward.id))
  vi.resetModules()
  const reloaded = await load()
  reloaded.observeRewardHonors('confirmed', ['current'])
  expect(reloaded.pendingHomeRewards('confirmed')).toEqual([])
})

it('drops revoked honors and detects receiving the same honor again after a reset', async () => {
  const rewards = await load()
  rewards.observeRewardHonors('reset', ['current'])
  rewards.observeRewardHonors('reset', [])
  expect(rewards.pendingHomeRewards('reset')).toEqual([])
  rewards.observeRewardHonors('reset', ['current'])
  expect(rewards.pendingHomeRewards('reset').map(reward => reward.code)).toEqual(['current'])
})

it('keeps resource receipts and isolates accounts while syncing honors', async () => {
  localStorage.setItem('cotuong-home-rewards-v1:resources', JSON.stringify({ pending: [{ id: 'gold', kind: 'gold', code: 'gold', amount: '150' }] }))
  const rewards = await load()
  rewards.observeRewardHonors('resources', [])
  rewards.observeRewardHonors('other', ['current'])
  expect(rewards.pendingHomeRewards('resources')).toEqual([])
  expect(rewards.pendingHomeRewards('other')).toHaveLength(0)
})


it('migrates old honor notices once without showing old awards', async () => {
  localStorage.setItem('cotuong-home-rewards-v1:legacy', JSON.stringify({
    honors: ['old'],
    honorReceiptsInitialized: true,
    pending: [{ id: 'stale', kind: 'honor', code: 'old' }]
  }))
  const rewards = await load()
  expect(rewards.pendingHomeRewards('legacy')).toEqual([])
  rewards.observeRewardHonors('legacy', ['old', 'new'])
  expect(rewards.pendingHomeRewards('legacy').map(reward => reward.code)).toEqual(['new'])
})

it('keeps genuinely new honor notices across reload and removes them after confirmation', async () => {
  const rewards = await load()
  rewards.observeRewardHonors('player', ['old'])
  rewards.observeRewardHonors('player', ['old', 'new'])
  expect(rewards.pendingHomeRewards('player').map(reward => reward.code)).toEqual(['new'])

  vi.resetModules()
  const reloaded = await load()
  expect(reloaded.pendingHomeRewards('player').map(reward => reward.code)).toEqual(['new'])
  reloaded.acknowledgeHomeRewards(
    'player',
    reloaded.pendingHomeRewards('player').map(reward => reward.id)
  )

  vi.resetModules()
  const confirmed = await load()
  expect(confirmed.pendingHomeRewards('player')).toEqual([])
})

it('never exposes match gold or elo in home notifications', async () => {
  localStorage.setItem('cotuong-home-rewards-v1:match', JSON.stringify({
    rewardNoticeVersion: 2,
    pending: [
      { id: 'gold', kind: 'gold', code: 'gold', amount: '100' },
      { id: 'elo', kind: 'elo', code: 'xiangqi', amount: '10' }
    ]
  }))
  const rewards = await load()
  expect(rewards.pendingHomeRewards('match')).toEqual([])
})