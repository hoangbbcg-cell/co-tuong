// @vitest-environment jsdom
import { StrictMode } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
const state = vi.hoisted(() => ({ loading: true, restoreError: '', entry: {} as object | null, restore: vi.fn() }))
vi.mock('../src/store/entryStore',()=>({useEntryStore:Object.assign((select:(s:typeof state)=>unknown)=>select(state),{getState:()=>state})}))
vi.mock('../src/app/App',()=>({App:()=> <div>Home ready</div>}))
vi.mock('../src/pages/login/LoginPage',()=>({LoginPage:()=> <div>Login ready</div>}))
import { EntryGate } from '../src/app/EntryGate'
import { createLoadingInstallController, loadingInstall } from '../src/app/loadingInstall'
let controller: typeof loadingInstall
let standalone=false
beforeEach(()=>{
  vi.useFakeTimers();localStorage.clear();loadingInstall.setLoading(false);standalone=false
  state.loading=true;state.restoreError='';state.entry={};state.restore.mockClear()
  Object.defineProperty(navigator,'userAgent',{configurable:true,value:'Mozilla/5.0 Android Chrome/142.0.0.0 Mobile Safari/537.36'})
  Object.defineProperty(navigator,'vendor',{configurable:true,value:'Google Inc.'})
  vi.stubGlobal('matchMedia',()=>({get matches(){return standalone},addEventListener:vi.fn(),removeEventListener:vi.fn()}))
  controller=createLoadingInstallController(window)
})
afterEach(()=>{cleanup();controller.dispose();vi.useRealTimers();vi.unstubAllGlobals();vi.restoreAllMocks()})
function mount(){return render(<EntryGate installController={controller}/>)}
function ready(view:ReturnType<typeof mount>){state.loading=false;view.rerender(<EntryGate installController={controller}/>);act(()=>{vi.advanceTimersByTime(1000)})}
it('holds Loading after account/timer completion without needing beforeinstallprompt',()=>{
  const view=mount();ready(view);act(()=>{vi.advanceTimersByTime(60000)})
  expect(state.restore).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('status')).toBeTruthy();expect(screen.queryByText('Home ready')).toBeNull()
})
it('Later releases Home and stores seven days',()=>{
  const view=mount();ready(view);const now=Date.now();fireEvent.click(screen.getByRole('button',{name:'Để sau'}))
  expect(screen.getByText('Home ready')).toBeTruthy();expect(Number(localStorage.getItem('hovang-shortcut-later-until'))).toBe(now+604800000)
})
it('Allow holds Loading with instructions until the user closes them, without waiting for Chrome APIs',()=>{
  const view=mount();ready(view);fireEvent.click(screen.getByRole('button',{name:'Cho phép'}))
  expect(screen.getByText('Cách thêm lối tắt HOVANG')).toBeTruthy();expect(screen.queryByText('Home ready')).toBeNull()
  fireEvent.click(screen.getByRole('button',{name:'Đóng hướng dẫn'}));expect(screen.getByText('Home ready')).toBeTruthy()
  const event=new Event('beforeinstallprompt',{cancelable:true});Object.assign(event,{prompt:vi.fn()});act(()=>{window.dispatchEvent(event)})
  expect(screen.queryByRole('complementary')).toBeNull()
})
it.each(['desktop','standalone','fullscreen','cooldown'] as const)('bypasses %s without waiting',kind=>{
  if(kind==='desktop')Object.defineProperty(navigator,'userAgent',{configurable:true,value:'Windows Chrome/142'})
  if(kind==='standalone')standalone=true
  if(kind==='fullscreen')vi.stubGlobal('matchMedia',(query:string)=>({matches:query.includes('fullscreen'),addEventListener:vi.fn(),removeEventListener:vi.fn()}))
  if(kind==='cooldown')localStorage.setItem('hovang-shortcut-later-until',String(Date.now()+604800000))
  const view=mount();ready(view);expect(screen.getByText('Home ready')).toBeTruthy()
})
it('does not skip background readiness after an early choice',()=>{
  const view=mount();fireEvent.click(screen.getByRole('button',{name:'Để sau'}));act(()=>{vi.advanceTimersByTime(1000)})
  expect(screen.getByRole('status')).toBeTruthy();ready(view);expect(screen.getByText('Home ready')).toBeTruthy()
})
it('keeps authentication routing and displays restore errors instead of the invitation',()=>{
  const view=mount();state.loading=false;state.restoreError='Mất kết nối';view.rerender(<EntryGate installController={controller}/>)
  expect(screen.getByRole('alert').textContent).toContain('Mất kết nối');expect(screen.queryByRole('complementary')).toBeNull()
  state.restoreError='';state.entry=null;ready(view);expect(screen.getByText('Login ready')).toBeTruthy()
})
it('does not leave a pending gate after unmount and works in StrictMode',()=>{
  const view=render(<StrictMode><EntryGate installController={controller}/></StrictMode>)
  expect(screen.getByText('Thêm lối tắt HOVANG?')).toBeTruthy()
  view.unmount();expect(controller.getGateSnapshot()).toBe(false)
})