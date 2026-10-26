import { beforeEach, expect, it, vi } from 'vitest'
const mocks=vi.hoisted(()=>({rows:vi.fn(),change:vi.fn()}))
vi.mock('../server/repositories/accountRepository',()=>({rows:mocks.rows,change:mocks.change,transaction:async(fn:(c:object)=>unknown)=>fn({})}))
import { SocialRepository } from '../server/repositories/socialRepository'
beforeEach(()=>{vi.resetAllMocks();mocks.rows.mockResolvedValue([]);mocks.change.mockResolvedValue({affectedRows:1})})
function actor(role:string){mocks.rows.mockResolvedValueOnce([{type:'group'}]).mockResolvedValueOnce([{role}])}
it.each(['member','deputy'])('denies moderation and role changes by %s',async role=>{
  for(const action of ['block-member','unblock-member','promote-deputy','demote-deputy'] as const){
    actor(role)
    await expect(new SocialRepository().member('2','group',action,'3')).rejects.toThrow('Chỉ chủ nhóm')
  }
  expect(mocks.change).not.toHaveBeenCalled()
})
it('blocks chat and invites without removing membership',async()=>{
  actor('owner');mocks.rows.mockResolvedValueOnce([{role:'member'}])
  await new SocialRepository().member('1','group','block-member','2')
  expect(mocks.change).toHaveBeenCalledOnce()
  expect(mocks.change).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO conversation_member_blocks'),['group','2','1'],expect.anything())
})
it('rejects a blocked member sending group chat before writing anything',async()=>{
  mocks.rows.mockResolvedValueOnce([{type:'group'}]).mockResolvedValueOnce([{user_id:'2'}]).mockResolvedValueOnce([{user_id:'2'}])
  await expect(new SocialRepository().send('2','group','message','client')).rejects.toThrow('chặn chat')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('rejects a blocked member inviting anyone before creating a request',async()=>{
  actor('member');mocks.rows.mockResolvedValueOnce([{user_id:'2'}])
  await expect(new SocialRepository().member('2','group','add','3')).rejects.toThrow('chặn mời')
  expect(mocks.change).not.toHaveBeenCalled()
})
it.each(['block-member','promote-deputy','demote-deputy'] as const)('protects the owner from %s',async action=>{
  actor('owner');mocks.rows.mockResolvedValueOnce([{role:'owner'}])
  await expect(new SocialRepository().member('1','group',action,'1')).rejects.toThrow('trưởng nhóm')
  expect(mocks.change).not.toHaveBeenCalled()
})
it.each([['promote-deputy','member','deputy'],['demote-deputy','deputy','member']] as const)('applies %s only to a current member',async(action,before,after)=>{
  actor('owner');mocks.rows.mockResolvedValueOnce([{role:before}])
  await new SocialRepository().member('1','group',action,'2')
  expect(mocks.change).toHaveBeenCalledWith('UPDATE conversation_members SET role=? WHERE conversation_id=? AND user_id=?',[after,'group','2'],expect.anything())
})
it('unblocks without changing membership or role',async()=>{
  actor('owner')
  await new SocialRepository().member('1','group','unblock-member','2')
  expect(mocks.change).toHaveBeenCalledOnce()
  expect(mocks.change).toHaveBeenCalledWith('DELETE FROM conversation_member_blocks WHERE conversation_id=? AND user_id=?',['group','2'],expect.anything())
})
it('does not disclose blocked members to outsiders',async()=>{
  await expect(new SocialRepository().blockedMembers('outside','group')).rejects.toThrow('Không thuộc nhóm')
})
