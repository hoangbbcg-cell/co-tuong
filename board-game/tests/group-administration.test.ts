import { beforeEach, expect, it, vi } from 'vitest'
const mocks=vi.hoisted(()=>({rows:vi.fn(),change:vi.fn()}))
vi.mock('../server/repositories/accountRepository',()=>({rows:mocks.rows,change:mocks.change,transaction:async(fn:(c:object)=>unknown)=>fn({})}))
import { SocialRepository } from '../server/repositories/socialRepository'
beforeEach(()=>{vi.resetAllMocks();mocks.rows.mockResolvedValue([]);mocks.change.mockResolvedValue({affectedRows:1})})
function membership(role:string){mocks.rows.mockResolvedValueOnce([{type:'group'}]).mockResolvedValueOnce([{role}])}
it('requires the owner to transfer the key before leaving',async()=>{
  membership('owner')
  await expect(new SocialRepository().member('1','group','leave',null)).rejects.toThrow('chuyển khóa vàng')
  expect(mocks.change).not.toHaveBeenCalled()
})
it.each(['transfer-owner','dissolve'] as const)('rejects %s from a regular member',async action=>{
  membership('member')
  await expect(new SocialRepository().member('2','group',action,'3')).rejects.toThrow('Chỉ chủ nhóm')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('transfers ownership only to an active member',async()=>{
  membership('owner');mocks.rows.mockResolvedValueOnce([])
  await expect(new SocialRepository().member('1','group','transfer-owner','2')).rejects.toThrow('không còn trong nhóm')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('changes both roles within the group transaction',async()=>{
  membership('owner');mocks.rows.mockResolvedValueOnce([{role:'member'}])
  await new SocialRepository().member('1','group','transfer-owner','2')
  expect(mocks.change).toHaveBeenNthCalledWith(1,expect.stringContaining("role='member'"),['group','1'],expect.anything())
  expect(mocks.change).toHaveBeenNthCalledWith(2,expect.stringContaining("role='owner'"),['group','2'],expect.anything())
})
it('dissolves by ending every active membership without deleting messages',async()=>{
  membership('owner')
  await new SocialRepository().member('1','group','dissolve',null)
  expect(mocks.change).toHaveBeenCalledTimes(2)
  expect(mocks.change).toHaveBeenCalledWith('UPDATE conversation_members SET left_at=UTC_TIMESTAMP(3) WHERE conversation_id=? AND left_at IS NULL',['group'],expect.anything())
})

it('queues an invitation from a regular member when approval is enabled',async()=>{
  mocks.rows.mockResolvedValueOnce([{type:'group',member_approval_required:1}]).mockResolvedValueOnce([{role:'member'}]).mockResolvedValueOnce([]).mockResolvedValueOnce([{id:'3'}]).mockResolvedValueOnce([])
  const result=await new SocialRepository().member('2','group','add','3')
  expect(result).toEqual({pendingApproval:true})
  expect(mocks.change).toHaveBeenCalledOnce()
  expect(mocks.change).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO conversation_join_requests'),['group','3','2'],expect.anything())
})
it.each([['owner',1],['member',0]])('adds immediately for role %s and approval %s',async(role,enabled)=>{
  mocks.rows.mockResolvedValueOnce([{type:'group',member_approval_required:enabled}]).mockResolvedValueOnce([{role}]).mockResolvedValueOnce([]).mockResolvedValueOnce([{id:'3'}]).mockResolvedValueOnce([])
  const result=await new SocialRepository().member('2','group','add','3')
  expect(result).toEqual({pendingApproval:false})
  expect(mocks.change).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO conversation_members'),['group','3'],expect.anything())
})
it.each(['approve','reject'] as const)('prevents a regular member from %s',async action=>{
  membership('member')
  await expect(new SocialRepository().member('2','group',action,'3')).rejects.toThrow('Chỉ chủ nhóm')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('approval creates membership then removes the pending request',async()=>{
  membership('owner');mocks.rows.mockResolvedValueOnce([{user_id:'3'}])
  await new SocialRepository().member('1','group','approve','3')
  expect(mocks.change).toHaveBeenNthCalledWith(1,expect.stringContaining('INSERT INTO conversation_members'),['group','3'],expect.anything())
  expect(mocks.change).toHaveBeenNthCalledWith(2,expect.stringContaining('DELETE FROM conversation_join_requests'),['group','3'],expect.anything())
})
it('rejection removes only the pending request',async()=>{
  membership('owner');mocks.rows.mockResolvedValueOnce([{user_id:'3'}])
  await new SocialRepository().member('1','group','reject','3')
  expect(mocks.change).toHaveBeenCalledOnce()
  expect(mocks.change).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM conversation_join_requests'),['group','3'],expect.anything())
})
it('does not disclose pending requests to a non-owner',async()=>{
  mocks.rows.mockResolvedValueOnce([])
  await expect(new SocialRepository().pendingMembers('2','group')).rejects.toThrow('Chỉ chủ nhóm')
})

it('keeps repeated invites to an existing member as a no-op',async()=>{
  mocks.rows.mockResolvedValueOnce([{type:'group',member_approval_required:1}]).mockResolvedValueOnce([{role:'member'}]).mockResolvedValueOnce([]).mockResolvedValueOnce([{id:'3'}]).mockResolvedValueOnce([{user_id:'3'}])
  expect(await new SocialRepository().member('2','group','add','3')).toEqual({pendingApproval:false})
  expect(mocks.change).not.toHaveBeenCalled()
})
it('requires an existing request before approval',async()=>{
  membership('owner');mocks.rows.mockResolvedValueOnce([])
  await expect(new SocialRepository().member('1','group','approve','3')).rejects.toThrow('không còn chờ duyệt')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('prevents non-owners from changing the approval setting',async()=>{
  mocks.rows.mockResolvedValueOnce([{id:'group'}]).mockResolvedValueOnce([])
  await expect(new SocialRepository().setGroupApproval('2','group',true)).rejects.toThrow('Chỉ chủ nhóm')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('persists the owner approval setting',async()=>{
  mocks.rows.mockResolvedValueOnce([{id:'group'}]).mockResolvedValueOnce([{role:'owner'}])
  await new SocialRepository().setGroupApproval('1','group',true)
  expect(mocks.change).toHaveBeenCalledWith(expect.stringContaining('member_approval_required=?'),[1,'group'],expect.anything())
})
