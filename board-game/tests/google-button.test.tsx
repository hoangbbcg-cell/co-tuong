// @vitest-environment jsdom
import { cleanup,render,screen,waitFor,act } from '@testing-library/react'
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
  await act(async()=>{gis.initialize.mock.calls[0][0].callback({credential:'verified-by-backend'})})
  expect(enter).toHaveBeenCalledWith('verified-by-backend');expect(complete).toHaveBeenCalledOnce()
  expect(screen.queryByRole('status')).toBeNull()
})
