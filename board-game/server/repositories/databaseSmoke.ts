import { randomInt, randomUUID } from 'node:crypto'
import type { RowDataPacket } from 'mysql2/promise'
import { getMysqlConnection } from './mysqlPool'
import { FOUNDATION_TABLES, verifySchema } from './migrationRepository'

/** DML only. Always rolled back, including failure. AUTO_INCREMENT gaps are expected. */
export async function smokeDatabase(): Promise<void> {
  await verifySchema()
  const c = await getMysqlConnection()
  const match = randomUUID(), conversation = randomUUID(), position = randomUUID(), event = randomUUID()
  const honor = `smoke_${randomUUID()}`
  const json = JSON.stringify({ board: [], currentTurn: 'red', formatVersion: 1 })
  const users: string[] = []
  try {
    await c.beginTransaction()
    for (let i = 0; i < 2; i++) {
      let id: string | undefined
      for (let attempt = 0; attempt < 30 && !id; attempt++) {
        const code = String(randomInt(0, 1_000_000)).padStart(6, '0')
        try {
          await c.execute('INSERT INTO users(public_id,guest_code,display_name,search_name) VALUES (?,?,?,?)', [String(randomInt(100_000_000, 1_000_000_000)), code, `Kỳ Thủ ${code}`, `kỳ thủ ${code}`])
          const [rows] = await c.query<RowDataPacket[]>('SELECT CAST(LAST_INSERT_ID() AS CHAR) AS id')
          id = String(rows[0].id)
        } catch (error) {
          if (!error || typeof error !== 'object' || !('code' in error) || error.code !== 'ER_DUP_ENTRY') throw error
        }
      }
      if (!id) throw new Error('Smoke could not allocate a guest code.')
      users.push(id)
    }
    const [a, b] = users.sort((x, y) => BigInt(x) < BigInt(y) ? -1 : 1)
    await c.execute("INSERT INTO user_game_stats(user_id,variant) VALUES (?,'xiangqi')", [a])
    await c.execute('INSERT INTO user_resources(user_id,gold) VALUES (?,0)', [a])
    await c.execute("INSERT INTO matches(id,source,variant,status,rated,initial_time_ms,turn_limit_ms,initial_state,final_state,winner_side,finish_reason,rules_version,started_at,ended_at) VALUES (?,'server_online','xiangqi','finished',0,600000,60000,?,?,'red','resign','smoke',UTC_TIMESTAMP(3),UTC_TIMESTAMP(3))", [match, json, json])
    await c.execute("INSERT INTO match_players(match_id,side,user_id,name_snapshot,elo_before,elo_delta,elo_after) VALUES (?,'red',?,'Smoke A',1000,13,1013),(?,'black',?,'Smoke B',1000,-13,987)", [match,a,match,b])
    await c.execute("INSERT INTO match_moves(match_id,ply,side,from_row,from_col,to_row,to_col,uci,state_after,accepted_at) VALUES (?,1,'red',6,0,5,0,'a3a4',?,UTC_TIMESTAMP(3))", [match,json])
    await c.execute("INSERT INTO resource_events(id,user_id,resource_type,delta,reason,match_id,idempotency_key) VALUES (?,?,'energy',-1,'smoke',?,?)", [event,a,match,event])
    await c.execute('INSERT INTO saved_matches(user_id,match_id) VALUES (?,?)', [a,match])
    await c.execute("INSERT INTO saved_positions(id,owner_id,title,note,variant,state,format_version,source_match_id,source_ply,move_number,red_name_snapshot,black_name_snapshot) VALUES (?,?,'Smoke','ghi chú tiếng Việt','xiangqi',?,1,?,1,1,'A','B')", [position,a,json,match])
    await c.execute("INSERT INTO friendships(user_low_id,user_high_id,requested_by,status) VALUES (?,?,?,'accepted')", [a,b,a])
    await c.execute('INSERT INTO user_follows(follower_id,followed_id) VALUES (?,?)', [a,b])
    await c.execute('INSERT INTO user_blocks(blocker_id,blocked_id) VALUES (?,?)', [b,a])
    await c.execute("INSERT INTO conversations(id,type,direct_user_low_id,direct_user_high_id,created_by) VALUES (?,'direct',?,?,?)", [conversation,a,b,a])
    await c.execute("INSERT INTO conversation_members(conversation_id,user_id,role) VALUES (?,?,'member'),(?,?,'member')", [conversation,a,conversation,b])
    await c.execute("INSERT INTO messages(conversation_id,sender_id,client_message_id,body) VALUES (?,?,?,'Kiểm tra tiếng Việt')", [conversation,a,randomUUID()])
    const [messageRows] = await c.query<RowDataPacket[]>('SELECT CAST(LAST_INSERT_ID() AS CHAR) AS id')
    const message = String(messageRows[0].id)
    await c.execute('UPDATE conversation_members SET last_read_message_id=?,cleared_through_message_id=? WHERE conversation_id=? AND user_id=?', [message,message,conversation,a])
    await c.execute("INSERT INTO honors(code,category,level,title,description,criteria,catalog_order) VALUES (?,'awarded',1,'Thử','Thử',?,1)", [honor,json])
    await c.execute('INSERT INTO user_honors(user_id,honor_code,source_match_id) VALUES (?,?,?)', [a,honor,match])
    await c.execute('INSERT INTO honor_endorsements(giver_id,recipient_id,honor_code) VALUES (?,?,?)', [b,a,honor])
    await c.execute("INSERT INTO match_likes(match_id,actor_id,target_side) VALUES (?,?,'red')", [match,b])
    // Read every table through its test-owned keys, never modify pre-existing rows.
    for (const table of FOUNDATION_TABLES) {
      const key = table === 'users' ? ['id',a] : table === 'honors' ? ['code',honor]
        : table === 'conversations' ? ['id',conversation] : table === 'conversation_members' || table === 'messages' ? ['conversation_id',conversation]
        : table === 'saved_positions' ? ['id',position] : table === 'resource_events' ? ['id',event]
        : table === 'friendships' ? ['user_low_id',a] : table === 'user_follows' ? ['follower_id',a]
        : table === 'user_blocks' ? ['blocker_id',b] : table === 'honor_endorsements' ? ['recipient_id',a]
        : ['user_game_stats','user_resources','user_honors'].includes(table) ? ['user_id',a] : table === 'matches' ? ['id',match] : ['match_id',match]
      const [rows] = await c.query<RowDataPacket[]>(`SELECT * FROM \`${table}\` WHERE \`${key[0]}\`=?`, [key[1]])
      if (!rows.length) throw new Error(`Smoke read failed: ${table}`)
    }
    async function rejects(sql: string, values: string[], expected: string) {
      try { await c.execute(sql, values) }
      catch (error) { if (error && typeof error === 'object' && 'code' in error && error.code === expected) return; throw error }
      throw new Error(`Constraint not enforced: ${expected}`)
    }
    await rejects('INSERT INTO saved_matches(user_id,match_id) VALUES (?,?)', [a,match], 'ER_DUP_ENTRY')
    await rejects("INSERT INTO saved_matches(user_id,match_id) VALUES (?,?)", [a,randomUUID()], 'ER_NO_REFERENCED_ROW_2')
    await c.execute('UPDATE user_resources SET energy=8 WHERE user_id=?', [a])
    const [energy] = await c.execute<RowDataPacket[]>('SELECT energy FROM user_resources WHERE user_id=?', [a])
    if (Number(energy[0]?.energy) !== 8) throw new Error('Energy above natural recovery cap must be supported.')
    await rejects('INSERT INTO user_follows(follower_id,followed_id) VALUES (?,?)', [a,a], 'ER_CHECK_CONSTRAINT_VIOLATED')
    await rejects('INSERT INTO conversations(id,type,direct_user_low_id,direct_user_high_id,created_by) VALUES (?,\'direct\',?,?,?)', [randomUUID(),a,b,a], 'ER_DUP_ENTRY')
    await rejects('UPDATE users SET guest_code=\'abc123\' WHERE id=?', [a], 'ER_CHECK_CONSTRAINT_VIOLATED')
    await rejects('UPDATE match_players SET elo_after=999 WHERE match_id=? AND side=\'red\'', [match], 'ER_CHECK_CONSTRAINT_VIOLATED')
    const group = randomUUID()
    await c.execute("INSERT INTO conversations(id,type,created_by) VALUES (?,'group',?),(?,'group',?)", [group,a,randomUUID(),a])
    await c.execute("INSERT INTO conversation_members(conversation_id,user_id,role) VALUES (?,?,'owner')", [group,a])
    await rejects('UPDATE conversation_members SET last_read_message_id=? WHERE conversation_id=? AND user_id=?', [message,group,a], 'ER_NO_REFERENCED_ROW_2')
    const [stats] = await c.execute<RowDataPacket[]>('SELECT elo FROM user_game_stats WHERE user_id=?', [a])
    if (stats[0]?.elo !== 1000) throw new Error('Default Elo is not 1000.')
    const [big] = await c.query<RowDataPacket[]>("SELECT CAST(9007199254740993 AS CHAR) AS id")
    if (big[0].id !== '9007199254740993') throw new Error('BIGINT serialization failed.')
  } finally {
    try { await c.rollback() } finally { c.release() }
  }
  const verify = await getMysqlConnection()
  try {
    const [rows] = await verify.execute<RowDataPacket[]>('SELECT id FROM users WHERE id IN (?,?)', users)
    if (rows.length) throw new Error('Smoke rollback verification failed.')
  } finally { verify.release() }
}
