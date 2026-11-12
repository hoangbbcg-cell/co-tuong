import { expect,it } from 'vitest'
import { googleBrowserError } from '../src/lib/googleBrowser'

it.each([
  'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/140.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Version/18.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPhone) CriOS/140.0.0.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
])('keeps full browser Google authentication available: %s',ua=>{
  expect(googleBrowserError(ua)).toBe('')
  expect(googleBrowserError(ua,true)).toBe('')
})
