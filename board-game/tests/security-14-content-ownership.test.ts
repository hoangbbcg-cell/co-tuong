import { beforeEach, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  rows: vi.fn(),
  change: vi.fn(),
}))

vi.mock('../server/repositories/accountRepository', () => ({
  rows: mocks.rows,
  change: mocks.change,
  transaction: async (fn: (connection: object) => unknown) => fn({}),
}))

import { ContentRepository } from '../server/repositories/contentRepository'

beforeEach(() => {
  vi.resetAllMocks()
  mocks.rows.mockResolvedValue([])
  mocks.change.mockResolvedValue({ affectedRows: 1 })
})

it('does not update another user saved match', async () => {
  await expect(
    new ContentRepository().updateBookmark(
      '1',
      '00000000-0000-4000-8000-000000000001',
      'Changed',
      'Changed note',
    ),
  ).rejects.toThrow('Không tìm thấy ván đã lưu.')

  expect(mocks.change).not.toHaveBeenCalled()
  expect(mocks.rows).toHaveBeenCalledWith(
    expect.stringContaining('WHERE user_id=? AND match_id=?'),
    ['1', '00000000-0000-4000-8000-000000000001'],
  )
})

it('deletes only positions belonging to the actor', async () => {
  await new ContentRepository().removePosition(
    '1',
    '00000000-0000-4000-8000-000000000002',
  )

  expect(mocks.change).toHaveBeenCalledWith(
    expect.stringContaining('WHERE owner_id=? AND id=?'),
    ['1', '00000000-0000-4000-8000-000000000002'],
  )
})

it('deletes only bookmarks belonging to the actor', async () => {
  await new ContentRepository().bookmark(
    '1',
    '00000000-0000-4000-8000-000000000003',
    false,
  )

  expect(mocks.change).toHaveBeenCalledWith(
    expect.stringContaining('WHERE user_id=? AND match_id=?'),
    ['1', '00000000-0000-4000-8000-000000000003'],
  )
})

it('rejects overwriting a position owned by someone else', async () => {
  mocks.rows.mockResolvedValueOnce([])
  mocks.rows.mockResolvedValueOnce([{ owner: '2' }])

  const state = {
    board: Array.from({ length: 10 }, () => Array(9).fill(null)),
    currentTurn: 'red',
    phase: 'ready',
    variant: 'xiangqi',
    remainingTime: { red: 600, black: 600 },
  }

  await expect(
    new ContentRepository().savePosition('1', {
      id: '00000000-0000-4000-8000-000000000004',
      title: 'Unauthorized',
      note: '',
      boardState: state as Parameters<ContentRepository['savePosition']>[1]['boardState'],
      moveNumber: 0,
      redName: 'Red',
      blackName: 'Black',
    }),
  ).rejects.toThrow('Không sở hữu thế cờ.')

  expect(mocks.change).not.toHaveBeenCalled()
})
