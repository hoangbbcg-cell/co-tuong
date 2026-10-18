// @vitest-environment jsdom
import { afterEach,beforeEach,describe,expect,it,vi } from 'vitest'
import { cleanup,fireEvent,render,screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { useEntryStore } from '../src/store/entryStore'
import { EntryGate } from '../src/app/EntryGate'
import { useSessionStore } from '../src/store/sessionStore'
import { playerNameError } from '../src/lib/playerName'
const mocks=vi.hoisted(()=>({me:vi.fn(),guest:vi.fn(),restoreGuest:vi.fn(),logout:vi.fn()}))
vi.mock('../src/services/accountApi',()=>({accountApi:mocks}))
vi.mock('../src/services/accountSession',()=>({loadAccountData:async(profile:{displayName:string})=>{useSessionStore.setState({name:profile.displayName})}}))
vi.mock('../src/app/App',()=>({App:()=> <div>Game entry</div>}))
const profile={id:'9007199254740993',publicId:'12345678',displayName:'Kỳ Thủ 000042'}
beforeEach(()=>{vi.stubEnv('VITE_GOOGLE_CLIENT_ID','');localStorage.clear();useEntryStore.setState({entry:null,loading:true});mocks.me.mockReset().mockRejectedValue({isAxiosError:true,response:{status:401}});mocks.restoreGuest.mockReset().mockRejectedValue({isAxiosError:true,response:{status:401}});mocks.guest.mockReset().mockResolvedValue(profile);mocks.logout.mockReset().mockResolvedValue(undefined)})
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllEnvs()})
describe('server-backed Guest entry',()=>{
  it('automatically restores the same device Guest after logout and reload without creating another',async()=>{
    await useEntryStore.getState().enterGuest()
    await useEntryStore.getState().signOut()
    mocks.guest.mockClear()
    mocks.restoreGuest.mockResolvedValue(profile)
    useEntryStore.setState({entry:null,loading:true})
    render(<EntryGate/>)
    expect(await screen.findByText('Game entry')).toBeInTheDocument()
    expect(useEntryStore.getState().entry?.name).toBe(profile.displayName)
    expect(mocks.restoreGuest).toHaveBeenCalledOnce()
    expect(mocks.guest).not.toHaveBeenCalled()
    expect(JSON.parse(localStorage.getItem('co-tuong-entry-v1')!).signedOut).toBeUndefined()
  })
  it('does not recover or create a Guest when checking the session fails due to a network error',async()=>{
    mocks.me.mockRejectedValue(new Error('Network'))
    await useEntryStore.getState().restore()
    expect(mocks.restoreGuest).not.toHaveBeenCalled()
    expect(mocks.guest).not.toHaveBeenCalled()
    expect(useEntryStore.getState().entry).toBeNull()
  })
  it('shares concurrent startup restoration instead of rotating the device session twice',async()=>{
    mocks.restoreGuest.mockResolvedValue(profile)
    await Promise.all([useEntryStore.getState().restore(),useEntryStore.getState().restore()])
    expect(mocks.me).toHaveBeenCalledOnce()
    expect(mocks.restoreGuest).toHaveBeenCalledOnce()
  })
  it('creates a real Guest only after the backend succeeds',async()=>{
    render(<EntryGate/>);fireEvent.click(await screen.findByRole('button',{name:'Chơi như khách'}))
    expect(await screen.findByText('Game entry')).toBeInTheDocument();expect(useSessionStore.getState().name).toBe(profile.displayName);expect(mocks.guest).toHaveBeenCalledOnce()
  })
  it('restores the server session without a localStorage marker',async()=>{
    mocks.me.mockResolvedValue(profile);render(<EntryGate/>);expect(await screen.findByText('Game entry')).toBeInTheDocument();expect(mocks.guest).not.toHaveBeenCalled()
  })
  it('ignores forged client account and linked flags',async()=>{
    localStorage.setItem('co-tuong-entry-v1',JSON.stringify({version:1,provider:'google',linked:true,name:'Admin'}));render(<EntryGate/>);expect(await screen.findByRole('button',{name:'Chơi như khách'})).toBeInTheDocument();expect(useEntryStore.getState().entry).toBeNull()
  })
  it('revokes the session and retains old saved data',async()=>{
    await useEntryStore.getState().enterGuest();localStorage.setItem('xiangqi-saved-matches-v1','old-data');await useEntryStore.getState().signOut();expect(mocks.logout).toHaveBeenCalledOnce();expect(useEntryStore.getState().entry).toBeNull();expect(localStorage.getItem('xiangqi-saved-matches-v1')).toBe('old-data')
  })
  it('keeps entry when backend logout fails',async()=>{
    await useEntryStore.getState().enterGuest();mocks.logout.mockRejectedValue(new Error('Network'));await expect(useEntryStore.getState().signOut()).rejects.toThrow('Network');expect(useEntryStore.getState().entry).not.toBeNull()
  })
  it('does not fabricate a Guest when the backend fails',async()=>{
    mocks.guest.mockRejectedValue(new Error('Network'));render(<EntryGate/>);fireEvent.click(await screen.findByRole('button',{name:'Chơi như khách'}));expect(await screen.findByRole('alert')).toHaveTextContent('Không kết nối');expect(useEntryStore.getState().entry).toBeNull()
  })
  it('accepts only exact Guest-name exceptions',()=>{
    expect(playerNameError('Kỳ Thủ 000042')).toBe('');expect(playerNameError('Kỳ thủ000042')).toBe('');expect(playerNameError('Kỳ Thủ 0000427')).not.toBe('')
  })
  it('does not fake Google OAuth',async()=>{
    render(<EntryGate/>);fireEvent.click(await screen.findByRole('button',{name:'Đăng nhập với Google'}));expect(screen.getByRole('status')).toHaveTextContent('chưa được cấu hình');expect(mocks.guest).not.toHaveBeenCalled()
  })
})
