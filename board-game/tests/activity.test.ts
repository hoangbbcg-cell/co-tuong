import { expect, it, vi } from 'vitest'
import { ActivityService, analyticsFilters, successfulApiFeature } from '../server/services/activityService'
import { ActivityRepository } from '../server/repositories/activityRepository'

const id = '12345678-1234-4123-8123-123456789012'
it('validates fixed codes, strips claimed identity/time and rejects forged server events', async () => {
  const repository = new ActivityRepository(), record = vi.spyOn(repository, 'record').mockResolvedValue()
  const service = new ActivityService(repository)
  await service.record('7', [{ id, kind: 'page', code: 'home', userId: '999', createdAt: '1999', password: 'private' }])
  expect(record).toHaveBeenCalledWith('7', [{ id, kind: 'page', code: 'home' }])
  for (const event of [
    { id, kind: 'login', code: 'google' }, { id, kind: 'feature', code: 'purchase_item' },
    { id, kind: 'page', code: '/home?token=secret' }, { id, kind: 'page', code: 'constructor' },
    { id: 'wrong', kind: 'feature', code: 'friends' },
  ]) expect(() => service.validate([event])).toThrow()
  expect(() => service.validate([])).toThrow()
  expect(() => service.validate(Array.from({ length: 21 }, () => ({ id, kind: 'page', code: 'home' })))).toThrow()
  expect(record).toHaveBeenCalledTimes(1)
})
it('validates filters and bounds pagination before querying the database', () => {
  expect(analyticsFilters({})).toMatchObject({ days: 7, usersOffset: 0, eventsOffset: 0, status: 'all' })
  expect(analyticsFilters({ q: ' 12345678 ', days: '30', type: 'guest', status: 'offline', kind: 'page', code: 'home', eventsOffset: '50' })).toMatchObject({ q: '12345678', days: 30, eventsOffset: 50 })
  for (const filters of [{ days: '-1' }, { type: 'admin' }, { kind: 'password' }, { eventsOffset: '0;DROP TABLE users' }, { usersOffset: '100001' }, { q: 'a'.repeat(101) }, { code: '/private' }]) expect(() => analyticsFilters(filters)).toThrow()
})
it('only maps recognized successful API templates, not URLs or request text', () => {
  expect(successfulApiFeature('POST', '/conversations/:id/messages')).toBe('send_message')
  expect(successfulApiFeature('POST', '/shop/purchase')).toBe('purchase_item')
  expect(successfulApiFeature('GET', '/shop/purchase')).toBeNull()
  expect(successfulApiFeature('POST', '/google')).toBeNull()
  expect(successfulApiFeature('POST', '/activity')).toBeNull()
  expect(successfulApiFeature('POST', '/conversations/real-private-id/messages')).toBeNull()
})
it('telemetry failure cannot fail successful login or action', async () => {
  const repository = new ActivityRepository()
  vi.spyOn(repository, 'record').mockRejectedValue(new Error('database unavailable'))
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const service = new ActivityService(repository)
  expect(() => service.login('7', 'google')).not.toThrow()
  expect(() => service.feature('7', 'send_message')).not.toThrow()
  await Promise.resolve()
  expect(warn).toHaveBeenCalledTimes(2)
  expect(warn.mock.calls.flat().join(' ')).not.toContain('database unavailable')
  warn.mockRestore()
})
