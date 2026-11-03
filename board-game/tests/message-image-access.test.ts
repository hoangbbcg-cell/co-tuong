import { beforeEach, expect, it, vi } from 'vitest'

const mocks=vi.hoisted(()=>({rows:vi.fn()}))

vi.mock('../server/repositories/accountRepository',()=>({
  rows:mocks.rows,
  change:vi.fn(),
  transaction:async(fn:(c:object)=>unknown)=>fn({})
}))

import { SocialRepository } from '../server/repositories/socialRepository'

beforeEach(()=>{
  vi.resetAllMocks()
})

it('allows an active conversation member to read its image',async()=>{
  mocks.rows.mockResolvedValueOnce([{allowed:1}])

  const result=await new SocialRepository().canReadImage(
    '7','12345678-1234-4234-8234-123456789abc.jpg'
  )

  expect(result).toBe(true)
  expect(mocks.rows).toHaveBeenCalledWith(
    expect.stringContaining('conversation_members'),
    ['7','/media/message-images/12345678-1234-4234-8234-123456789abc.jpg']
  )
})

it('denies users who are not active members',async()=>{
  mocks.rows.mockResolvedValueOnce([])

  const result=await new SocialRepository().canReadImage(
    '8','12345678-1234-4234-8234-123456789abc.jpg'
  )

  expect(result).toBe(false)
})

it('requires active membership in the SQL access policy',async()=>{
  mocks.rows.mockResolvedValueOnce([])

  await new SocialRepository().canReadImage(
    '9','12345678-1234-4234-8234-123456789abc.jpg'
  )

  const sql=mocks.rows.mock.calls[0][0] as string
  expect(sql).toContain('cm.left_at IS NULL')
  expect(sql).toContain('m.id>COALESCE(cm.cleared_through_message_id,0)')
  expect(sql).toContain('m.body=?')
})