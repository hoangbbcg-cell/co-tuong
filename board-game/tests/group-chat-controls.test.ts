import { beforeEach, expect, it, vi } from 'vitest'
const mocks=vi.hoisted(()=>({rows:vi.fn(),change:vi.fn()}))
vi.mock('../server/repositories/accountRepository',()=>({rows:mocks.rows,change:mocks.change,transaction:async(fn:(c:object)=>unknown)=>fn({})}))
import { SocialRepository } from '../server/repositories/socialRepository'
beforeEach(()=>{vi.resetAllMocks();mocks.rows.mockResolvedValue([]);mocks.change.mockResolvedValue({affectedRows:1})})
it.each([['member',0],['member',1],['deputy',0]])('blocks %s with deputy option %s when group chat is off',async(role,allowed)=>{
  mocks.rows.mockResolvedValueOnce([{type:'group',group_chat_disabled:1,deputy_chat_allowed:allowed}]).mockResolvedValueOnce([{user_id:'2',role}])
  await expect(new SocialRepository().send('2','group','text','client')).rejects.toThrow('tắt tin nhắn nhóm')
  expect(mocks.change).not.toHaveBeenCalled()
})
it.each([['owner',0,1],['deputy',1,1],['member',0,0]])('allows %s with deputy option %s and lock %s',async(role,allowed,locked)=>{
  mocks.rows.mockResolvedValueOnce([{type:'group',group_chat_disabled:locked,deputy_chat_allowed:allowed}]).mockResolvedValueOnce([{user_id:'2',role}]).mockResolvedValueOnce([]).mockResolvedValueOnce([{id:'message',conversation_id:'group',body:'text'}])
  expect(await new SocialRepository().send('2','group','text','client')).toBe('message')
})
it('keeps individual chat blocks effective for a deputy allowed by the group',async()=>{
  mocks.rows.mockResolvedValueOnce([{type:'group',group_chat_disabled:1,deputy_chat_allowed:1}]).mockResolvedValueOnce([{user_id:'2',role:'deputy'}]).mockResolvedValueOnce([{user_id:'2'}])
  await expect(new SocialRepository().send('2','group','text','client')).rejects.toThrow('chặn chat')
})
it('only the owner can change group chat settings',async()=>{
  mocks.rows.mockResolvedValueOnce([{type:'group'}]).mockResolvedValueOnce([])
  await expect(new SocialRepository().setGroupChat('2','group',true,true)).rejects.toThrow('Chỉ trưởng nhóm')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('persists both options under the conversation lock',async()=>{
  mocks.rows.mockResolvedValueOnce([{type:'group'}]).mockResolvedValueOnce([{role:'owner'}])
  await new SocialRepository().setGroupChat('1','group',true,true)
  expect(mocks.change).toHaveBeenCalledWith('UPDATE conversations SET group_chat_disabled=?,deputy_chat_allowed=? WHERE id=?',[1,1,'group'],expect.anything())
})


// CHECKPOINT_1_1_READ_MUTE_SECURITY
it('rejects read receipts from non-members',async()=>{
  mocks.rows.mockResolvedValueOnce([])
  await expect(new SocialRepository().read('2','group','10'))
    .rejects.toThrow('Kh\u00f4ng thu\u1ed9c cu\u1ed9c tr\u00f2 chuy\u1ec7n.')
  expect(mocks.change).not.toHaveBeenCalled()
})

it('rejects read receipts for messages outside the conversation',async()=>{
  mocks.rows.mockResolvedValueOnce([{user_id:'2'}])
    .mockResolvedValueOnce([])
  await expect(new SocialRepository().read('2','group','10'))
    .rejects.toThrow('Tin nh\u1eafn kh\u00f4ng thu\u1ed9c cu\u1ed9c tr\u00f2 chuy\u1ec7n.')
  expect(mocks.change).not.toHaveBeenCalled()
})

it('updates read receipts only for active members in a transaction',async()=>{
  mocks.rows.mockResolvedValueOnce([{user_id:'2'}])
    .mockResolvedValueOnce([{id:'10'}])
  await new SocialRepository().read('2','group','10')
  expect(mocks.change).toHaveBeenCalledWith(
    expect.stringContaining('last_read_message_id'),
    ['10','group','2'],
    expect.anything()
  )
})

it('rejects mute requests from non-members',async()=>{
  mocks.rows.mockResolvedValueOnce([])
  await expect(new SocialRepository().mute('2','group',24))
    .rejects.toThrow('Kh\u00f4ng thu\u1ed9c cu\u1ed9c tr\u00f2 chuy\u1ec7n.')
  expect(mocks.change).not.toHaveBeenCalled()
})

it('allows active members to mute themselves',async()=>{
  mocks.rows.mockResolvedValueOnce([{user_id:'2'}])
  await new SocialRepository().mute('2','group',24)
  expect(mocks.change).toHaveBeenCalledWith(
    expect.stringContaining('muted_until'),
    [0,24,24,'group','2'],
    expect.anything()
  )
})
it('records a centered leave event only after an active member leaves', async () => {
  mocks.rows.mockResolvedValueOnce([{type:'group'}]).mockResolvedValueOnce([{role:'member'}])
  await new SocialRepository().member('2','group','leave',null)
  expect(mocks.change).toHaveBeenCalledWith('INSERT INTO messages(conversation_id,sender_id,client_message_id,body) VALUES (?,?,?,?)',['group','2',expect.stringMatching(/^group-left:[a-f0-9]{25}$/),'đã rời nhóm'],expect.anything())
})
it('does not record a leave event when leaving is rejected', async () => {
  mocks.rows.mockResolvedValueOnce([{type:'group'}]).mockResolvedValueOnce([{role:'owner'}])
  await expect(new SocialRepository().member('1','group','leave',null)).rejects.toThrow('chuyển khóa vàng')
  expect(mocks.change).not.toHaveBeenCalled()
})
it('rejects user messages impersonating server leave events', async () => {
  await expect(new SocialRepository().send('2','group','fake','group-left:fake')).rejects.toThrow('Mã tin nhắn không hợp lệ')
  expect(mocks.change).not.toHaveBeenCalled()
})
