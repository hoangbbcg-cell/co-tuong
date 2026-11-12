import { randomUUID } from 'node:crypto'
import { AccountError } from '../errors'
import { ActivityRepository } from '../repositories/activityRepository'
import { ACTIVITY_FEATURES, ACTIVITY_PAGES, SERVER_ACTIVITY_CODES } from '../../src/types/activity'
import type { ActivityInput } from '../../src/types/activity'

export class ActivityService {
  constructor(readonly repository = new ActivityRepository()) {}
  validate(input: unknown): ActivityInput[] {
    if (!Array.isArray(input) || input.length < 1 || input.length > 20) throw new AccountError('Gói hoạt động không hợp lệ.')
    return input.map(event => {
      if (!event || typeof event !== 'object') throw new AccountError('Hoạt động không hợp lệ.')
      const { id, kind, code } = event
      if (typeof id !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(id)
        || (kind !== 'page' && kind !== 'feature') || typeof code !== 'string'
        || !Object.hasOwn(kind === 'page' ? ACTIVITY_PAGES : ACTIVITY_FEATURES, code)
        || (SERVER_ACTIVITY_CODES as readonly string[]).includes(code)) throw new AccountError('Hoạt động không hợp lệ.')
      return { id, kind, code }
    })
  }
  record(userId: string, input: unknown) { return this.repository.record(userId, this.validate(input)) }
  report(input: Record<string, unknown>, online: Set<string>) { return this.repository.report(analyticsFilters(input), online) }
  /** Observability must never prevent a successful sign-in when migration is pending. */
  login(userId: string, code: 'google' | 'guest' | 'guest_restore') {
    void this.repository.record(userId, [{ id: randomUUID(), kind: 'login', code }]).catch(() => {
      // No credentials or raw database errors in logs.
      console.warn('Không ghi được nhật ký đăng nhập quản trị.')
    })
  }
  feature(userId: string, code: keyof typeof ACTIVITY_FEATURES) {
    void this.repository.record(userId, [{ id: randomUUID(), kind: 'feature', code }]).catch(() => {
      console.warn('Không ghi được nhật ký chức năng quản trị.')
    })
  }
}

/** Route templates supplied by Express; never include path IDs or request bodies. */
export function successfulApiFeature(method: string, route: unknown): keyof typeof ACTIVITY_FEATURES | null {
  if (typeof route !== 'string' || !['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return null
  if (route === '/shop/purchase') return 'purchase_item'
  if (route === '/free-energy') return 'claim_energy'
  if (['/name', '/location', '/avatar'].includes(route)) return 'edit_profile'
  if (route === '/social') return 'social_action'
  if (route === '/conversations') return 'conversation'
  if (['/conversations/:id/messages', '/conversations/:id/images'].includes(route)) return 'send_message'
  if (route.startsWith('/group-invitations/') || (route.startsWith('/conversations/:id') && method === 'PATCH')) return 'group_settings'
  if (route === '/positions' && method === 'PUT') return 'save_position'
  if (route === '/positions/:id' && method === 'DELETE') return 'delete_position'
  if (route === '/saved-matches/:id') return 'bookmark_match'
  if (route === '/honors' || route.startsWith('/honors/')) return 'equip_honor'
  if (route === '/match-likes/:id') return 'like_match'
  return null
}

export interface AnalyticsFilters {
  q: string; days: number; type: 'all' | 'google' | 'guest'; status: 'all' | 'online' | 'offline'
  kind: 'all' | 'page' | 'feature' | 'login'; code: string; usersOffset: number; eventsOffset: number
}
export function analyticsFilters(input: Record<string, unknown>): AnalyticsFilters {
  const q = typeof input.q === 'string' ? input.q.trim() : ''
  if (q.length > 100) throw new AccountError('Từ khóa quá dài.')
  function choice<T extends string>(value: unknown, values: readonly T[], fallback: T): T {
    if (value === undefined || value === '') return fallback
    if (typeof value !== 'string' || !values.includes(value as T)) throw new AccountError('Bộ lọc không hợp lệ.')
    return value as T
  }
  const days = Number(input.days ?? 7)
  if (![0, 1, 7, 30].includes(days)) throw new AccountError('Khoảng thời gian không hợp lệ.')
  const offset = (value: unknown) => {
    const n = Number(value ?? 0)
    if (!Number.isSafeInteger(n) || n < 0 || n > 100000) throw new AccountError('Trang không hợp lệ.')
    return n
  }
  const code = typeof input.code === 'string' ? input.code : ''
  if (code && !Object.hasOwn(ACTIVITY_PAGES, code) && !Object.hasOwn(ACTIVITY_FEATURES, code) && !['google', 'guest', 'guest_restore'].includes(code)) throw new AccountError('Chức năng không hợp lệ.')
  return { q, days, code,
    type: choice(input.type, ['all', 'google', 'guest'], 'all'),
    status: choice(input.status, ['all', 'online', 'offline'], 'all'),
    kind: choice(input.kind, ['all', 'page', 'feature', 'login'], 'all'),
    usersOffset: offset(input.usersOffset), eventsOffset: offset(input.eventsOffset) }
}
