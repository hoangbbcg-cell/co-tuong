// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { useHonorGrants } from '../src/features/lobby/hooks/useHonorGrants'
import { useSessionStore } from '../src/store/sessionStore'

afterEach(() => { cleanup(); localStorage.clear() })
it('phong lần nữa giữ nguyên một lượt phong, không xóa khỏi lưu trữ', async () => {
  localStorage.clear()
  useSessionStore.setState({ account: null })
  const hook = renderHook(() => useHonorGrants())
  await act(async () => { await hook.result.current.toggleGrant('Người chơi', 'pt_5_ky-huu') })
  await act(async () => { await hook.result.current.toggleGrant('Người chơi', 'pt_5_ky-huu') })
  expect(hook.result.current.getGrantedHonorIds('Người chơi')).toEqual(['pt_5_ky-huu'])
  expect(JSON.parse(localStorage.getItem('co-tuong-honor-grants-v1')!)).toEqual({ 'người chơi': ['pt_5_ky-huu'] })
})
