import {beforeEach,expect,it,vi} from 'vitest'
const mocks=vi.hoisted(()=>({rows:vi.fn(),change:vi.fn()}))
vi.mock('../server/repositories/accountRepository',()=>({rows:mocks.rows,change:mocks.change,transaction:async(fn:(c:object)=>unknown)=>fn({})}))
import {SocialRepository} from '../server/repositories/socialRepository'
beforeEach(()=>{vi.resetAllMocks();mocks.rows.mockResolvedValue([]);mocks.change.mockResolvedValue({affectedRows:1})})
it('allows resending an invitation using the same unique group-recipient entry',async()=>{
  const repository = new SocialRepository()
  for (let attempt = 0; attempt < 2; attempt++) {
    mocks.rows.mockResolvedValueOnce([{type:'group',member_approval_required:0}]).mockResolvedValueOnce([{role:'owner'}]).mockResolvedValueOnce([]).mockResolvedValueOnce([{id:'2'}]).mockResolvedValueOnce([])
    await repository.member('1','group','add','2')
  }
  const writes = mocks.change.mock.calls.filter(([sql])=>sql.includes('INSERT INTO conversation_invitations'))
  expect(writes).toHaveLength(2)
  for (const [sql,params] of writes) {
    expect(sql).toContain('ON DUPLICATE KEY UPDATE')
    expect(params).toEqual(['group','2','1'])
  }
})
function invitation(approval=0){mocks.rows.mockResolvedValueOnce([{member_approval_required:approval}]).mockResolvedValueOnce([{invitedBy:'1'}])}
it('does not allow an unrelated recipient to accept or reject another invitation',async()=>{
  mocks.rows.mockResolvedValueOnce([{member_approval_required:0}]).mockResolvedValueOnce([])
  await expect(new SocialRepository().respondInvitation('9','group',true)).rejects.toThrow('không còn tồn tại')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('rejects without granting membership or requesting owner approval',async()=>{
  invitation(1)
  await new SocialRepository().respondInvitation('2','group',false)
  expect(mocks.change).toHaveBeenCalledOnce()
  expect(mocks.change).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM conversation_invitations'),['group','2'],expect.anything())
})
it.each([['owner',1],['member',0]])('joins only after recipient acceptance from %s with approval %s',async(role,approval)=>{
  invitation(approval);mocks.rows.mockResolvedValueOnce([{user_id:'1'}]).mockResolvedValueOnce([{role}]).mockResolvedValueOnce([]).mockResolvedValueOnce([])
  expect(await new SocialRepository().respondInvitation('2','group',true)).toEqual({pendingApproval:false})
  expect(mocks.change).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO conversation_members'),['group','2'],expect.anything())
})
it('queues owner approval after recipient consent without granting access',async()=>{
  invitation(1);mocks.rows.mockResolvedValueOnce([{user_id:'3'}]).mockResolvedValueOnce([{role:'deputy'}]).mockResolvedValueOnce([]).mockResolvedValueOnce([])
  expect(await new SocialRepository().respondInvitation('2','group',true)).toEqual({pendingApproval:true})
  expect(mocks.change).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO conversation_join_requests'),['group','2','1'],expect.anything())
  expect(mocks.change.mock.calls.some(([sql])=>sql.includes('INSERT INTO conversation_members'))).toBe(false)
})
it.each(['left','blocked','dissolved'])('does not grant access when inviter is %s',async reason=>{
  invitation();mocks.rows.mockResolvedValueOnce(reason==='dissolved'?[]:[{user_id:'3'}]).mockResolvedValueOnce(reason==='left'?[]:[{role:'member'}]).mockResolvedValueOnce(reason==='blocked'?[{user_id:'1'}]:[])
  await expect(new SocialRepository().respondInvitation('2','group',true)).rejects.toThrow()
  expect(mocks.change).not.toHaveBeenCalled()
})
it('consumes an invitation for an existing member without downgrading their role',async()=>{
  invitation();mocks.rows.mockResolvedValueOnce([{user_id:'1'}]).mockResolvedValueOnce([{role:'owner'}]).mockResolvedValueOnce([]).mockResolvedValueOnce([{user_id:'2'}])
  await new SocialRepository().respondInvitation('2','group',true)
  expect(mocks.change).toHaveBeenCalledOnce()
})
it('creating a group immediately adds selected contacts without sending invitations',async()=>{
  await new SocialRepository().createConversation('1',['2','3'],'Nhóm')
  const memberships=mocks.change.mock.calls.filter(([sql])=>sql.includes('INSERT INTO conversation_members'))
  expect(memberships).toHaveLength(3)
  expect(memberships[0][1].slice(1)).toEqual(['1','owner'])
  expect(memberships.slice(1).map(call=>call[1].slice(1))).toEqual([['2','member'],['3','member']])
  expect(mocks.change.mock.calls.filter(([sql])=>sql.includes('INSERT INTO conversation_invitations'))).toHaveLength(0)
})
