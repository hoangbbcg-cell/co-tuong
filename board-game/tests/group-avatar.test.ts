import { expect, it, vi, beforeEach } from 'vitest'
const mocks=vi.hoisted(()=>({rows:vi.fn(),change:vi.fn(),mkdir:vi.fn(),writeFile:vi.fn(),unlink:vi.fn()}))
vi.mock('../server/repositories/accountRepository',()=>({rows:mocks.rows,change:mocks.change,transaction:async(fn:(c:object)=>unknown)=>fn({})}))
vi.mock('node:fs/promises',()=>({mkdir:mocks.mkdir,writeFile:mocks.writeFile,unlink:mocks.unlink}))
import { SocialRepository } from '../server/repositories/socialRepository'
import { groupAvatarBytes } from '../server/services/persistenceService'
beforeEach(()=>{vi.clearAllMocks();mocks.mkdir.mockResolvedValue(undefined);mocks.writeFile.mockResolvedValue(undefined);mocks.unlink.mockResolvedValue(undefined)})
it('rejects untrusted image formats and oversized payloads',()=>{
  expect(()=>groupAvatarBytes('data:image/svg+xml;base64,AAAA')).toThrow()
  expect(()=>groupAvatarBytes('data:image/jpeg;base64,AAAA')).toThrow()
  expect(()=>groupAvatarBytes('data:image/jpeg;base64,'+'A'.repeat(120001))).toThrow()
})
it('rejects non-owners before writing a file',async()=>{
  mocks.rows.mockResolvedValue([])
  await expect(new SocialRepository().groupAvatar('1','group',Buffer.from([255,216,255,217]))).rejects.toThrow('Chỉ chủ nhóm')
  expect(mocks.writeFile).not.toHaveBeenCalled()
})
it('stores an owner image under an opaque JPEG URL',async()=>{
  mocks.rows.mockResolvedValue([{id:'group'}]);mocks.change.mockResolvedValue({affectedRows:1})
  const url=await new SocialRepository().groupAvatar('1','group',Buffer.from([255,216,255,217]))
  expect(url).toMatch(/^\/media\/group-avatars\/[a-f0-9-]+\.jpg$/)
  expect(mocks.change).toHaveBeenCalledWith('UPDATE conversations SET avatar_object_key=? WHERE id=?',[url,'group'],expect.anything())
})
it('removes the new image when database persistence fails',async()=>{
  mocks.rows.mockResolvedValue([{id:'group'}]);mocks.change.mockRejectedValue(new Error('database failed'))
  await expect(new SocialRepository().groupAvatar('1','group',Buffer.from([255,216,255,217]))).rejects.toThrow('database failed')
  expect(mocks.unlink).toHaveBeenCalledOnce()
})
it('rejects image messages from non-members without writing files',async()=>{
  mocks.rows.mockResolvedValue([])
  await expect(new SocialRepository().imageMessage('1','group',Buffer.from([255,216,255,217]),'client')).rejects.toThrow('Không thuộc')
  expect(mocks.writeFile).not.toHaveBeenCalled()
})
it('cleans up uploaded message images when sending is blocked',async()=>{
  mocks.rows.mockResolvedValue([{user_id:'1'}])
  const repository=new SocialRepository()
  vi.spyOn(repository,'send').mockRejectedValue(new Error('blocked'))
  await expect(repository.imageMessage('1','group',Buffer.from([255,216,255,217]),'client')).rejects.toThrow('blocked')
  expect(mocks.unlink).toHaveBeenCalledOnce()
})
