import { randomUUID } from 'node:crypto'
import { change, rows, transaction } from './accountRepository'
import { AccountError } from '../errors'
import { mkdir, writeFile, unlink } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

export const groupAvatarDirectory = fileURLToPath(new URL('../../uploads/group-avatars/', import.meta.url))
export const messageImageDirectory = fileURLToPath(new URL('../../uploads/message-images/', import.meta.url))

const pair=(a:string,b:string) => BigInt(a)<BigInt(b)?[a,b]:[b,a]
export class SocialRepository {
  async suggestions(id:string) {
    return rows(`SELECT CAST(u.id AS CHAR) id,CAST(u.public_id AS CHAR) publicId,u.display_name name,u.avatar_code avatarCode,u.avatar_frame_code avatarFrameCode,s.elo FROM users u LEFT JOIN user_game_stats s ON s.user_id=u.id AND s.variant='xiangqi' WHERE u.status='active' AND u.id<>? AND NOT EXISTS (SELECT 1 FROM friendships f WHERE f.status='accepted' AND ((f.user_low_id=? AND f.user_high_id=u.id) OR (f.user_high_id=? AND f.user_low_id=u.id))) AND NOT EXISTS (SELECT 1 FROM user_blocks b WHERE (b.blocker_id=? AND b.blocked_id=u.id) OR (b.blocked_id=? AND b.blocker_id=u.id)) ORDER BY RAND() LIMIT 20`,[id,id,id,id,id])
  }
  async imageMessage(id:string,conversation:string,bytes:Buffer,clientId:string,extension:'jpg'|'png'|'webp'|'gif'='jpg') {
    const membership=await rows('SELECT user_id FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,id])
    if(!membership.length)throw new AccountError('Không thuộc cuộc trò chuyện.',403)
    const filename=`${randomUUID()}.${extension}`
    await mkdir(messageImageDirectory,{recursive:true})
    await writeFile(join(messageImageDirectory,filename),bytes,{flag:'wx'})
    try { return await this.send(id,conversation,`/media/message-images/${filename}`,clientId) }
    catch(error) { await unlink(join(messageImageDirectory,filename)).catch(()=>{});throw error }
  }
  async list(id:string) {
    const friends=await rows(`SELECT CAST(u.id AS CHAR) id,CAST(u.public_id AS CHAR) publicId,u.display_name name,u.avatar_code avatarCode,u.avatar_frame_code avatarFrameCode,f.status,CAST(f.requested_by AS CHAR) requestedBy,s.elo FROM friendships f JOIN users u ON u.id=IF(f.user_low_id=?,f.user_high_id,f.user_low_id) LEFT JOIN user_game_stats s ON s.user_id=u.id AND s.variant='xiangqi' WHERE f.user_low_id=? OR f.user_high_id=?`,[id,id,id])
    const follows=await rows('SELECT CAST(followed_id AS CHAR) id FROM user_follows WHERE follower_id=?',[id])
    const blocks=await rows('SELECT CAST(blocked_id AS CHAR) id FROM user_blocks WHERE blocker_id=?',[id])
    return {friends,follows,blocks}
  }
  async friendship(id:string,target:string,action:'request'|'accept'|'remove') {
    const [low,high]=pair(id,target)
    if(action==='request') await change("INSERT INTO friendships(user_low_id,user_high_id,requested_by,status) VALUES (?,?,?,'pending') ON DUPLICATE KEY UPDATE user_low_id=friendships.user_low_id",[low,high,id])
    else if(action==='accept') {
      const result=await change("UPDATE friendships SET status='accepted' WHERE user_low_id=? AND user_high_id=? AND requested_by<>? AND status='pending'",[low,high,id])
      if(!result.affectedRows)throw new AccountError('Không có lời mời để chấp nhận.')
    } else await change('DELETE FROM friendships WHERE user_low_id=? AND user_high_id=?',[low,high])
  }
  async relation(id:string,target:string,kind:'follow'|'message-block',enabled:boolean) {
    // Message block deliberately does not touch friendship, follow, rooms or matchmaking.
    const table=kind==='follow'?'user_follows':'user_blocks', actor=kind==='follow'?'follower_id':'blocker_id',other=kind==='follow'?'followed_id':'blocked_id'
    await change(enabled?`INSERT INTO ${table}(${actor},${other}) VALUES (?,?) ON DUPLICATE KEY UPDATE ${actor}=${table}.${actor}`:`DELETE FROM ${table} WHERE ${actor}=? AND ${other}=?`,[id,target])
  }
  async conversations(id:string) {
    return rows(`SELECT c.id,c.type,c.title,c.avatar_object_key avatarUrl,cm.title_override nickname,cm.muted_until mutedUntil,cm.muted_indefinitely mutedIndefinitely,CAST(other.id AS CHAR) peerId,other.display_name peerName,c.last_message_at lastMessageAt,
      (SELECT body FROM messages m WHERE m.conversation_id=c.id AND m.id>COALESCE(cm.cleared_through_message_id,0) ORDER BY m.id DESC LIMIT 1) preview,
      (SELECT COUNT(*) FROM messages m WHERE m.conversation_id=c.id AND m.sender_id<>cm.user_id AND m.id>GREATEST(COALESCE(cm.last_read_message_id,0),COALESCE(cm.cleared_through_message_id,0))) unreadCount
      FROM conversation_members cm JOIN conversations c ON c.id=cm.conversation_id
      LEFT JOIN users other ON other.id=IF(c.direct_user_low_id=?,c.direct_user_high_id,c.direct_user_low_id)
      WHERE cm.user_id=? AND cm.left_at IS NULL AND (cm.cleared_through_message_id IS NULL OR EXISTS(SELECT 1 FROM messages m WHERE m.conversation_id=c.id AND m.id>cm.cleared_through_message_id)) ORDER BY COALESCE(c.last_message_at,c.created_at) DESC,c.created_at DESC,c.id DESC LIMIT 100`,[id,id])
  }
  async createConversation(id:string,targets:string[],title:string|null) {
    return transaction(async c=>{
      const members=[...new Set([id,...targets])].sort((a,b)=>BigInt(a)<BigInt(b)?-1:1)
      const direct=title===null
      let conversation:string=randomUUID()
      if(direct) {
        await change("INSERT INTO conversations(id,type,direct_user_low_id,direct_user_high_id,created_by) VALUES (?,'direct',?,?,?) ON DUPLICATE KEY UPDATE id=conversations.id",[conversation,members[0],members[1],id],c)
        const existing=await rows('SELECT id FROM conversations WHERE direct_user_low_id=? AND direct_user_high_id=?',[members[0],members[1]],c)
        conversation=String(existing[0].id)
      } else await change("INSERT INTO conversations(id,type,title,created_by) VALUES (?,'group',?,?)",[conversation,title,id],c)
      for(const user of members) await change('INSERT INTO conversation_members(conversation_id,user_id,role) VALUES (?,?,?) ON DUPLICATE KEY UPDATE user_id=conversation_members.user_id',[conversation,user,user===id?'owner':'member'],c)
      return conversation
    })
  }
  async messages(id:string,conversation:string) {
    const member=await rows('SELECT cleared_through_message_id FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,id])
    if(!member[0])throw new AccountError('Không thuộc cuộc trò chuyện.',403)
    return rows(`SELECT CAST(m.id AS CHAR) id,m.conversation_id conversationId,CAST(m.sender_id AS CHAR) senderId,u.display_name displayName,m.body,m.sent_at sentAt,m.client_message_id clientMessageId FROM messages m JOIN users u ON u.id=m.sender_id WHERE m.conversation_id=? AND m.id>? ORDER BY m.id DESC LIMIT 100`,[conversation,String(member[0].cleared_through_message_id??'0')])
  }
  async send(id:string,conversation:string,body:string,clientId:string) {
    return transaction(async c=>{
      // Lock the conversation to serialize send/clear/member changes and preserve deletion boundaries.
      const conv=await rows('SELECT * FROM conversations WHERE id=? FOR UPDATE',[conversation],c)
      const member=await rows('SELECT user_id FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,id],c)
      if(!conv[0]||!member.length)throw new AccountError('Không thuộc cuộc trò chuyện.',403)
      if(conv[0].type==='group') {
        const blocked=await rows('SELECT user_id FROM conversation_member_blocks WHERE conversation_id=? AND user_id=?',[conversation,id],c)
        if(blocked.length)throw new AccountError('Bạn đã bị chặn chat trong nhóm.',403)
      }
      if(conv[0].type==='direct') {
        const target=String(conv[0].direct_user_low_id)===id?String(conv[0].direct_user_high_id):String(conv[0].direct_user_low_id)
        // Lock the target user: message-block mutations take the same lock.
        await rows('SELECT id FROM users WHERE id=? FOR UPDATE',[target],c)
        const blocked=await rows('SELECT blocker_id FROM user_blocks WHERE blocker_id=? AND blocked_id=?',[target,id],c)
        if(blocked.length)throw new AccountError('Người chơi đã chặn tin nhắn của bạn.',403)
      }
      const existing=await rows('SELECT CAST(id AS CHAR) id,conversation_id,body FROM messages WHERE sender_id=? AND client_message_id=?',[id,clientId],c)
      if(existing[0]) {
        if(existing[0].conversation_id!==conversation || existing[0].body!==body)throw new AccountError('Mã tin nhắn đã được dùng.',409)
        return String(existing[0].id)
      }
      await change('INSERT INTO messages(conversation_id,sender_id,client_message_id,body) VALUES (?,?,?,?)',[conversation,id,clientId,body],c)
      const r=await rows('SELECT CAST(LAST_INSERT_ID() AS CHAR) id',[],c)
      await change('UPDATE conversations SET last_message_at=UTC_TIMESTAMP(3) WHERE id=?',[conversation],c)
      return String(r[0].id)
    })
  }
  async member(id:string,conversation:string,action:'clear'|'nickname'|'leave'|'add'|'remove'|'transfer-owner'|'dissolve'|'approve'|'reject'|'block-member'|'unblock-member'|'promote-deputy'|'demote-deputy',value:string|null) {
    return transaction(async c=>{
      const conv=await rows('SELECT type,member_approval_required FROM conversations WHERE id=? FOR UPDATE',[conversation],c)
      const member=await rows('SELECT role FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,id],c)
      if(!conv[0]||!member.length)throw new AccountError('Không thuộc cuộc trò chuyện.',403)
      if(action==='clear') await change('UPDATE conversation_members SET cleared_through_message_id=(SELECT MAX(id) FROM messages WHERE conversation_id=?) WHERE conversation_id=? AND user_id=?',[conversation,conversation,id],c)
      else if(action==='nickname') await change('UPDATE conversation_members SET title_override=? WHERE conversation_id=? AND user_id=?',[value,conversation,id],c)
      else if(conv[0].type!=='group')throw new AccountError('Chỉ áp dụng cho nhóm.')
      else if(action==='leave') {
        if(member[0].role==='owner')throw new AccountError('Vui lòng chuyển khóa vàng cho người khác trước khi rời nhóm.',409)
        await change('UPDATE conversation_members SET left_at=UTC_TIMESTAMP(3) WHERE conversation_id=? AND user_id=?',[conversation,id],c)
      }
      else if(action==='add') {
        const blocked=await rows('SELECT user_id FROM conversation_member_blocks WHERE conversation_id=? AND user_id=?',[conversation,id],c)
        if(blocked.length)throw new AccountError('Bạn đã bị chặn mời thành viên trong nhóm.',403)
        const target=await rows("SELECT id FROM users WHERE id=? AND status='active'",[value],c)
        if(!target.length)throw new AccountError('Không tìm thấy người chơi.',404)
        const active=await rows('SELECT user_id FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,value],c)
        if(active.length)return {pendingApproval:false}
        if(Number(conv[0].member_approval_required)===1 && member[0].role!=='owner') {
          await change('INSERT INTO conversation_join_requests(conversation_id,user_id,invited_by) VALUES (?,?,?) ON DUPLICATE KEY UPDATE user_id=conversation_join_requests.user_id',[conversation,value,id],c)
          return {pendingApproval:true}
        }
        await change("INSERT INTO conversation_members(conversation_id,user_id,role) VALUES (?,?,'member') ON DUPLICATE KEY UPDATE left_at=NULL,role='member'",[conversation,value],c)
        await change('DELETE FROM conversation_join_requests WHERE conversation_id=? AND user_id=?',[conversation,value],c)
        return {pendingApproval:false}
      }
      else if(member[0].role!=='owner')throw new AccountError('Chỉ chủ nhóm được quản lý thành viên.',403)
      else if(action==='unblock-member') await change('DELETE FROM conversation_member_blocks WHERE conversation_id=? AND user_id=?',[conversation,value],c)
      else if(action==='block-member'||action==='promote-deputy'||action==='demote-deputy') {
        const target=await rows('SELECT role FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,value],c)
        if(!target.length)throw new AccountError('Người chơi không còn trong nhóm.',404)
        if(value===id||target[0].role==='owner')throw new AccountError('Không thể thay đổi quyền của trưởng nhóm.',403)
        if(action==='block-member') await change('INSERT INTO conversation_member_blocks(conversation_id,user_id,blocked_by) VALUES (?,?,?) ON DUPLICATE KEY UPDATE user_id=conversation_member_blocks.user_id',[conversation,value,id],c)
        else await change('UPDATE conversation_members SET role=? WHERE conversation_id=? AND user_id=?',[action==='promote-deputy'?'deputy':'member',conversation,value],c)
      }
      else if(action==='transfer-owner') {
        if(value===id)throw new AccountError('Hãy chọn thành viên khác.')
        const target=await rows('SELECT role FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,value],c)
        if(!target.length)throw new AccountError('Người chơi không còn trong nhóm.',404)
        await change("UPDATE conversation_members SET role='member' WHERE conversation_id=? AND user_id=?",[conversation,id],c)
        await change("UPDATE conversation_members SET role='owner' WHERE conversation_id=? AND user_id=?",[conversation,value],c)
      }
      else if(action==='dissolve') {
        await change('UPDATE conversation_members SET left_at=UTC_TIMESTAMP(3) WHERE conversation_id=? AND left_at IS NULL',[conversation],c)
        await change('DELETE FROM conversation_join_requests WHERE conversation_id=?',[conversation],c)
      }
      else if(action==='approve'||action==='reject') {
        const request=await rows('SELECT user_id FROM conversation_join_requests WHERE conversation_id=? AND user_id=?',[conversation,value],c)
        if(!request.length)throw new AccountError('Yêu cầu không còn chờ duyệt.',404)
        if(action==='approve')await change("INSERT INTO conversation_members(conversation_id,user_id,role) VALUES (?,?,'member') ON DUPLICATE KEY UPDATE left_at=NULL,role='member'",[conversation,value],c)
        await change('DELETE FROM conversation_join_requests WHERE conversation_id=? AND user_id=?',[conversation,value],c)
      }
      else if(action==='remove') {
        const target=await rows('SELECT role FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,value],c)
        if(!target.length)throw new AccountError('Người chơi không còn trong nhóm.',404)
        if(target[0].role==='owner')throw new AccountError('Không thể xóa chủ nhóm.',403)
        await change('UPDATE conversation_members SET left_at=UTC_TIMESTAMP(3) WHERE conversation_id=? AND user_id=?',[conversation,value],c)
      }
      else await change("INSERT INTO conversation_members(conversation_id,user_id,role) VALUES (?,?,'member') ON DUPLICATE KEY UPDATE left_at=NULL",[conversation,value],c)
    })
  }
  async blockedMembers(id:string,conversation:string) {
    const membership=await rows('SELECT user_id FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,id])
    if(!membership.length)throw new AccountError('Không thuộc nhóm.',403)
    return rows('SELECT CAST(b.user_id AS CHAR) id,u.display_name name FROM conversation_member_blocks b JOIN users u ON u.id=b.user_id WHERE b.conversation_id=? ORDER BY b.created_at,b.user_id',[conversation])
  }
  async groupSettings(id:string,conversation:string) {
    const result=await rows("SELECT c.member_approval_required FROM conversations c JOIN conversation_members cm ON cm.conversation_id=c.id WHERE c.id=? AND c.type='group' AND cm.user_id=? AND cm.left_at IS NULL",[conversation,id])
    if(!result.length)throw new AccountError('Không thuộc nhóm.',403)
    return {approvalRequired:Number(result[0].member_approval_required)===1}
  }
  async setGroupApproval(id:string,conversation:string,enabled:boolean) {
    return transaction(async c=>{
      await rows('SELECT id FROM conversations WHERE id=? FOR UPDATE',[conversation],c)
      const owner=await rows("SELECT role FROM conversation_members WHERE conversation_id=? AND user_id=? AND role='owner' AND left_at IS NULL",[conversation,id],c)
      if(!owner.length)throw new AccountError('Chỉ chủ nhóm được đổi cài đặt.',403)
      await change("UPDATE conversations SET member_approval_required=? WHERE id=? AND type='group'",[enabled?1:0,conversation],c)
    })
  }
  async pendingMembers(id:string,conversation:string) {
    const owner=await rows("SELECT role FROM conversation_members WHERE conversation_id=? AND user_id=? AND role='owner' AND left_at IS NULL",[conversation,id])
    if(!owner.length)throw new AccountError('Chỉ chủ nhóm được xem yêu cầu chờ duyệt.',403)
    return rows('SELECT CAST(r.user_id AS CHAR) id,u.display_name name,i.display_name inviterName FROM conversation_join_requests r JOIN users u ON u.id=r.user_id JOIN users i ON i.id=r.invited_by WHERE r.conversation_id=? ORDER BY r.created_at,r.user_id',[conversation])
  }
  async block(id:string,target:string,enabled:boolean) {
    await transaction(async c=>{
      await rows('SELECT id FROM users WHERE id=? FOR UPDATE',[id],c)
      await change(enabled?'INSERT INTO user_blocks(blocker_id,blocked_id) VALUES (?,?) ON DUPLICATE KEY UPDATE blocker_id=user_blocks.blocker_id':'DELETE FROM user_blocks WHERE blocker_id=? AND blocked_id=?',[id,target],c)
    })
  }
  async read(id:string,conversation:string,message:string) {
    const valid=await rows('SELECT id FROM messages WHERE conversation_id=? AND id=?',[conversation,message])
    if(!valid.length)throw new AccountError('Tin nhắn không thuộc cuộc trò chuyện.')
    await change('UPDATE conversation_members SET last_read_message_id=GREATEST(COALESCE(last_read_message_id,0),?) WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[message,conversation,id])
  }
  async members(id:string,conversation:string) {
    const membership=await rows('SELECT user_id FROM conversation_members WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[conversation,id])
    if(!membership.length)throw new AccountError('Không thuộc cuộc trò chuyện.',403)
    return rows('SELECT CAST(cm.user_id AS CHAR) id,u.display_name name,cm.role FROM conversation_members cm JOIN users u ON u.id=cm.user_id WHERE cm.conversation_id=? AND cm.left_at IS NULL ORDER BY cm.role,cm.user_id',[conversation])
  }
  async mute(id:string,conversation:string,hours:number|null) {
    await change('UPDATE conversation_members SET muted_indefinitely=?,muted_until=IF(? IS NULL,NULL,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL ? HOUR)) WHERE conversation_id=? AND user_id=? AND left_at IS NULL',[hours===null?1:0,hours,hours,conversation,id])
  }
  async renameGroup(id:string,conversation:string,title:string) {
    const result=await change("UPDATE conversations c JOIN conversation_members cm ON cm.conversation_id=c.id SET c.title=? WHERE c.id=? AND c.type='group' AND cm.user_id=? AND cm.role='owner' AND cm.left_at IS NULL",[title,conversation,id])
    if(!result.affectedRows)throw new AccountError('Chỉ chủ nhóm đang tham gia được đổi tên nhóm.',403)
  }
  async groupAvatar(id:string,conversation:string,bytes:Buffer) {
    const filename=`${randomUUID()}.jpg`
    let written=false
    try {
      return await transaction(async c=>{
        const owner=await rows("SELECT c.id FROM conversations c JOIN conversation_members cm ON cm.conversation_id=c.id WHERE c.id=? AND c.type='group' AND cm.user_id=? AND cm.role='owner' AND cm.left_at IS NULL FOR UPDATE",[conversation,id],c)
        if(!owner.length)throw new AccountError('Chỉ chủ nhóm đang tham gia được đổi ảnh nhóm.',403)
        await mkdir(groupAvatarDirectory,{recursive:true})
        await writeFile(join(groupAvatarDirectory,filename),bytes,{flag:'wx'})
        written=true
        const url=`/media/group-avatars/${filename}`
        await change('UPDATE conversations SET avatar_object_key=? WHERE id=?',[url,conversation],c)
        return url
      })
    } catch(error) { if(written)await unlink(join(groupAvatarDirectory,filename)).catch(()=>{});throw error }
  }
}

