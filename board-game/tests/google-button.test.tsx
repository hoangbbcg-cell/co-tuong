// @vitest-environment jsdom
import { cleanup,render,screen,waitFor,act,fireEvent } from '@testing-library/react'
import { afterEach,expect,it,vi } from 'vitest'
const gis=vi.hoisted(()=>({initialize:vi.fn(),renderButton:vi.fn()}))
vi.mock('../src/services/googleIdentity',()=>({loadGoogleIdentity:async()=>gis}))
import { GoogleSignInButton } from '../src/features/lobby/components/GoogleSignInButton'
import { accountApi } from '../src/services/accountApi'
import { useEntryStore } from '../src/store/entryStore'
afterEach(()=>{cleanup();vi.restoreAllMocks();vi.unstubAllEnvs();gis.initialize.mockReset();gis.renderButton.mockReset()})
it('uses the official GIS popup with nonce, then sends only its credential through the entry flow',async()=>{
  vi.stubEnv('VITE_GOOGLE_CLIENT_ID','web-client')
  vi.spyOn(accountApi,'googleNonce').mockResolvedValue('server-nonce')
  const enter=vi.spyOn(useEntryStore.getState(),'enterGoogle').mockResolvedValue()
  const complete=vi.fn()
  render(<GoogleSignInButton onComplete={complete} onError={vi.fn()}/>)
  await waitFor(()=>expect(gis.renderButton).toHaveBeenCalledOnce())
  expect(gis.initialize.mock.calls[0][0]).toMatchObject({client_id:'web-client',nonce:'server-nonce',auto_select:false,ux_mode:'popup'})
  expect(gis.initialize.mock.calls[0][0]).toMatchObject({use_fedcm_for_button:true,button_auto_select:false})
  await act(async()=>{gis.initialize.mock.calls[0][0].callback({credential:'verified-by-backend'})})
  expect(enter).toHaveBeenCalledWith('verified-by-backend');expect(complete).toHaveBeenCalledOnce()
  expect(screen.queryByRole('status')).toBeNull()
})

it.each(['Zalo Android','FBAN/FB4A;FBAV/500','Instagram 400 Android','Mozilla/5.0 (Linux; Android 14; Mobile; wv) Chrome/140.0'])('avoids Google popup/nonce inside %s and explains how to sign in',async userAgent=>{
  vi.stubEnv('VITE_GOOGLE_CLIENT_ID','web-client')
  vi.spyOn(navigator,'userAgent','get').mockReturnValue(userAgent)
  const nonce=vi.spyOn(accountApi,'googleNonce')
  const onError=vi.fn()
  render(<GoogleSignInButton onError={onError}/>)
  fireEvent.click(screen.getByRole('button',{name:'Đăng nhập với Google'}))
  expect(onError).toHaveBeenCalledWith(expect.stringContaining('Chrome hoặc Safari'))
  expect(nonce).not.toHaveBeenCalled()
  expect(gis.initialize).not.toHaveBeenCalled()
})

it('warns a WebView guest about preserving their existing account instead of promising a browser transfer',()=>{
  vi.stubEnv('VITE_GOOGLE_CLIENT_ID','web-client')
  vi.spyOn(navigator,'userAgent','get').mockReturnValue('Zalo Android')
  const nonce=vi.spyOn(accountApi,'googleNonce')
  const onError=vi.fn()
  render(<GoogleSignInButton link onError={onError}/>)
  fireEvent.click(screen.getByRole('button',{name:'Đăng nhập với Google'}))
  expect(onError).toHaveBeenCalledWith(expect.stringContaining('Đừng xóa dữ liệu'))
  expect(nonce).not.toHaveBeenCalled()
})

it('recovers from a failed nonce request with a visible retry',async()=>{
  vi.stubEnv('VITE_GOOGLE_CLIENT_ID','web-client')
  const nonce=vi.spyOn(accountApi,'googleNonce').mockRejectedValueOnce(new Error('Network unavailable')).mockResolvedValueOnce('retry-nonce')
  render(<GoogleSignInButton link onError={vi.fn()}/>)
  fireEvent.click(await screen.findByText('Thử lại đăng nhập Google'))
  await waitFor(()=>expect(gis.renderButton).toHaveBeenCalledOnce())
  expect(nonce).toHaveBeenNthCalledWith(2,true)
  expect(gis.initialize.mock.calls[0][0].nonce).toBe('retry-nonce')
})

it('ignores a credential from an unmounted Google button',async()=>{
  vi.stubEnv('VITE_GOOGLE_CLIENT_ID','web-client')
  vi.spyOn(accountApi,'googleNonce').mockResolvedValue('server-nonce')
  const enter=vi.spyOn(useEntryStore.getState(),'enterGoogle').mockResolvedValue()
  const {unmount}=render(<GoogleSignInButton onError={vi.fn()}/>)
  await waitFor(()=>expect(gis.renderButton).toHaveBeenCalledOnce())
  const callback=gis.initialize.mock.calls[0][0].callback
  unmount()
  callback({credential:'stale'})
  expect(enter).not.toHaveBeenCalled()
})
