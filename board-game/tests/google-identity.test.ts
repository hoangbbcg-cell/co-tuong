import { afterEach,expect,it,vi } from 'vitest'
const verify=vi.hoisted(()=>vi.fn())
vi.mock('google-auth-library',()=>({OAuth2Client:class {verifyIdToken=verify}}))
import { verifyGoogleCredential } from '../server/services/googleIdentity'
afterEach(()=>{vi.unstubAllEnvs();verify.mockReset()})
it('rejects forged tokens and verifies the configured audience without trusting client identity',async()=>{
  vi.stubEnv('GOOGLE_CLIENT_ID','web-client')
  verify.mockRejectedValue(new Error('Bad signature'))
  await expect(verifyGoogleCredential('forged','nonce')).rejects.toThrow('Không xác minh')
  expect(verify).toHaveBeenCalledWith({idToken:'forged',audience:'web-client'})
})
it('checks audience, nonce, expiry and issuer on verified payloads',async()=>{
  vi.stubEnv('GOOGLE_CLIENT_ID','web-client')
  const payload={sub:'google-sub',aud:'web-client',iss:'https://accounts.google.com',exp:Math.floor(Date.now()/1000)+3600,nonce:'nonce'}
  for(const invalid of [{aud:'wrong'},{nonce:'wrong'},{exp:1},{iss:'attacker'},{sub:''}]){
    verify.mockResolvedValue({getPayload:()=>({...payload,...invalid})})
    await expect(verifyGoogleCredential('token','nonce')).rejects.toThrow('Không xác minh')
  }
  verify.mockResolvedValue({getPayload:()=>payload})
  expect(await verifyGoogleCredential('token','nonce')).toBe('google-sub')
})
