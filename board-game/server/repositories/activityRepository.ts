import { ADMIN_USERS_PAGE_SIZE } from '../../src/types/activity'
import { rows, change, transaction } from './accountRepository'
import type { ActivityKind, AnalyticsReport } from '../../src/types/activity'
import type { AnalyticsFilters } from '../services/activityService'

export class ActivityRepository {
  async record(userId: string, events: { id: string; kind: ActivityKind; code: string }[]) {
    await transaction(async connection => {
      for (const event of events) {
        await change(`INSERT INTO user_activity_events(id,user_id,kind,code) VALUES (?,?,?,?)
          ON DUPLICATE KEY UPDATE id=user_activity_events.id`, [event.id, userId, event.kind, event.code], connection)
      }
      await change(`INSERT INTO user_activity_state(user_id,first_seen_at,last_seen_at)
        SELECT user_id,MIN(created_at),MAX(created_at) FROM user_activity_events
        WHERE user_id=? AND id IN (${events.map(() => '?').join(',')}) GROUP BY user_id
        ON DUPLICATE KEY UPDATE first_seen_at=LEAST(user_activity_state.first_seen_at,VALUES(first_seen_at)),
        last_seen_at=GREATEST(user_activity_state.last_seen_at,VALUES(last_seen_at))`, [userId, ...events.map(event => event.id)], connection)
    })
  }

  async report(filters: AnalyticsFilters, connected: Set<string>): Promise<AnalyticsReport> {
    const tables = await rows(`SELECT TABLE_NAME name FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE()
      AND TABLE_NAME IN ('user_activity_events','user_activity_state')`)
    const activityAvailable = tables.length === 2
    // Snapshot/deduplicate authenticated connections once for consistent counts.
    const ids = [...connected].filter(id => /^\d+$/.test(id))
    const online = ids.length ? `u.id IN (${ids.map(() => '?').join(',')})` : 'FALSE'
    const [totals] = await rows(`SELECT COUNT(*) total,COALESCE(SUM(u.google_sub IS NOT NULL),0) google,
      COALESCE(SUM(u.google_sub IS NULL),0) guest,COALESCE(SUM(${online}),0) online
      FROM users u WHERE u.status='active'`, ids)
    const conditions = ["u.status='active'"]
    const params: (string | number)[] = []
    if (filters.q) {
      conditions.push('(CAST(u.public_id AS CHAR)=? OR u.display_name LIKE ?)')
      params.push(filters.q, `%${filters.q.replace(/[\\%_]/g, '\\$&')}%`)
    }
    if (filters.type !== 'all') conditions.push(`u.google_sub IS ${filters.type === 'google' ? 'NOT ' : ''}NULL`)
    if (filters.status !== 'all') {
      conditions.push(filters.status === 'online' ? online : `NOT (${online})`)
      params.push(...ids)
    }
    const where = conditions.join(' AND ')
    const users = await rows(`SELECT CAST(u.id AS CHAR) id,CAST(u.public_id AS CHAR) publicId,u.display_name name,
      IF(u.google_sub IS NULL,'guest','google') accountType,u.created_at createdAt,${activityAvailable ? 's.last_seen_at' : 'NULL'} lastSeenAt
      FROM users u ${activityAvailable ? 'LEFT JOIN user_activity_state s ON s.user_id=u.id' : ''} WHERE ${where}
      ORDER BY (${online}) DESC,u.id DESC LIMIT ${ADMIN_USERS_PAGE_SIZE + 1} OFFSET ${filters.usersOffset}`, [...params, ...ids])
    const period = filters.days ? ` AND e.created_at>=DATE_SUB(UTC_TIMESTAMP(3),INTERVAL ${filters.days} DAY)` : ''
    const eventConditions = [where + period]
    const eventParams = [...params]
    if (filters.kind !== 'all') { eventConditions.push('e.kind=?'); eventParams.push(filters.kind) }
    if (filters.code) { eventConditions.push('e.code=?'); eventParams.push(filters.code) }
    const eventWhere = eventConditions.join(' AND ')
    const [events, usage, active] = activityAvailable ? await Promise.all([
      rows(`SELECT e.id,CAST(u.public_id AS CHAR) publicId,u.display_name name,e.kind,e.code,e.created_at createdAt
        FROM user_activity_events e JOIN users u ON u.id=e.user_id WHERE ${eventWhere}
        ORDER BY e.created_at DESC,e.id DESC LIMIT 51 OFFSET ${filters.eventsOffset}`, eventParams),
      rows(`SELECT e.kind,e.code,COUNT(*) count,COUNT(DISTINCT e.user_id) users
        FROM user_activity_events e JOIN users u ON u.id=e.user_id WHERE ${eventWhere}
        GROUP BY e.kind,e.code ORDER BY count DESC,e.kind,e.code`, eventParams),
      rows(`SELECT COUNT(DISTINCT e.user_id) count FROM user_activity_events e
        JOIN users u ON u.id=e.user_id WHERE u.status='active'${period}`),
    ]) : [[], [], [{ count: null }]]
    const total = Number(totals.total), onlineCount = Number(totals.online)
    return {
      activityAvailable,
      totals: { total, google: Number(totals.google), guest: Number(totals.guest), online: onlineCount,
        offline: total - onlineCount, activeInPeriod: activityAvailable ? Number(active[0].count) : null },
      users: users.slice(0, ADMIN_USERS_PAGE_SIZE).map(user => ({ ...user, online: connected.has(String(user.id)) })) as AnalyticsReport['users'],
      usersHasMore: users.length > ADMIN_USERS_PAGE_SIZE, events: events.slice(0, 50) as AnalyticsReport['events'], eventsHasMore: events.length > 50,
      usage: usage.map(row => ({ kind: row.kind, code: row.code, count: Number(row.count), users: Number(row.users) })),
      generatedAt: new Date().toISOString(),
    }
  }
}
