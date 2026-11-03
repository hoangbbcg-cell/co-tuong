import { beforeEach, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  rows: vi.fn(),
  change: vi.fn(),
}))

vi.mock('../server/repositories/accountRepository', () => ({
  rows: mocks.rows,
  change: mocks.change,
  transaction: async (fn: (c: object) => unknown) => fn({}),
}))

import { SocialRepository } from '../server/repositories/socialRepository'

beforeEach(() => {
  vi.resetAllMocks()
  mocks.rows.mockResolvedValue([])
  mocks.change.mockResolvedValue({ affectedRows: 1 })
})

const membership = (role: string) => {
  mocks.rows
    .mockResolvedValueOnce([{ type: 'group' }])
    .mockResolvedValueOnce([{ role }])
}

it.each([
  'remove',
  'transfer-owner',
  'dissolve',
  'approve',
  'reject',
  'promote-deputy',
  'demote-deputy',
  'block-member',
  'unblock-member',
] as const)('denies %s to regular members', async action => {
  membership('member')

  await expect(
    new SocialRepository().member('2', 'group', action, '3'),
  ).rejects.toThrow('Chỉ chủ nhóm')

  expect(mocks.change).not.toHaveBeenCalled()
})

it('denies owner actions to a user who has left the group', async () => {
  mocks.rows
    .mockResolvedValueOnce([{ type: 'group' }])
    .mockResolvedValueOnce([])

  await expect(
    new SocialRepository().member('1', 'group', 'dissolve', null),
  ).rejects.toThrow('Không thuộc cuộc trò chuyện')

  expect(mocks.change).not.toHaveBeenCalled()
})

it('denies deputy members from transferring ownership', async () => {
  membership('deputy')

  await expect(
    new SocialRepository().member('2', 'group', 'transfer-owner', '3'),
  ).rejects.toThrow('Chỉ chủ nhóm')

  expect(mocks.change).not.toHaveBeenCalled()
})

it('clears only the requesting member chat history', async () => {
  membership('member')

  await new SocialRepository().member('2', 'group', 'clear', null)

  expect(mocks.change).toHaveBeenCalledWith(
    expect.stringContaining(
      'WHERE conversation_id=? AND user_id=?',
    ),
    ['group', 'group', '2'],
    expect.anything(),
  )
})

it('changes only the requesting member nickname', async () => {
  membership('member')

  await new SocialRepository().member(
    '2', 'group', 'nickname', 'My group',
  )

  expect(mocks.change).toHaveBeenCalledWith(
    expect.stringContaining(
      'WHERE conversation_id=? AND user_id=?',
    ),
    ['My group', 'group', '2'],
    expect.anything(),
  )
})
