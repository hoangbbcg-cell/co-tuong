import { expect, it, vi } from 'vitest'
import { PersistenceService } from '../server/services/persistenceService'

it('allows a named group with only its creator, while direct chat still needs one recipient', async () => {
  const service = new PersistenceService()
  const create = vi.spyOn(service.social, 'createConversation').mockResolvedValue('group-id')
  expect(await service.createConversation('1', { title: 'Nhóm riêng', members: [] })).toBe('group-id')
  expect(create).toHaveBeenCalledWith('1', [], 'Nhóm riêng')
  await expect(service.createConversation('1', { members: [] })).rejects.toThrow('Chat trực tiếp cần đúng một người nhận.')
  await expect(service.createConversation('1', { title: ' ', members: [] })).rejects.toThrow('Nội dung')
  await expect(service.createConversation('1', { title: 'Nhóm', members: ['1'] })).rejects.toThrow('chính mình')
  expect(create).toHaveBeenCalledTimes(1)
})
