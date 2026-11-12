// @vitest-environment jsdom
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useActivityTracking } from '../src/app/useActivityTracking'
import { useSessionStore } from '../src/store/sessionStore'
import type { AccountProfile } from '../src/types/account'

function Harness() { useActivityTracking(); return <><button>Gợi ý</button><button aria-label="Bạn bè">Mở</button><button>nội dung riêng tư</button><input aria-label="Bí mật" /></> }
beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
  useSessionStore.setState({ account: { id: '1' } as AccountProfile, screen: 'home', mode: 'local', room: null })
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); useSessionStore.setState({ account: null, screen: 'home', mode: 'local', room: null }) })
const events = () => (vi.mocked(fetch).mock.calls.flatMap(([, init]) => JSON.parse(String(init?.body)).events))
it('tracks initial and changed screens once, fixed controls only, and never form content', () => {
  const view = render(<Harness />)
  fireEvent.click(view.getByRole('button', { name: 'Gợi ý' }))
  fireEvent.click(view.getByRole('button', { name: 'Bạn bè' }))
  fireEvent.click(view.getByRole('button', { name: 'nội dung riêng tư' }))
  fireEvent.change(view.getByLabelText('Bí mật'), { target: { value: 'secret-token' } })
  act(() => { useSessionStore.setState({ screen: 'computer' }); useSessionStore.setState({ gold: 123 }); vi.advanceTimersByTime(1000) })
  expect(events().map((event: { code: string }) => event.code)).toEqual(['home', 'hint', 'friends', 'computer'])
  expect(JSON.stringify(events())).not.toContain('secret')
  expect(JSON.stringify(events())).not.toContain('riêng tư')
})
it('does not record before authentication or send queued events under a different account', () => {
  useSessionStore.setState({ account: null })
  const view = render(<Harness />)
  fireEvent.click(view.getByRole('button', { name: 'Gợi ý' }))
  act(() => { vi.advanceTimersByTime(1500) })
  expect(fetch).not.toHaveBeenCalled()
  act(() => { useSessionStore.setState({ account: { id: '1' } as AccountProfile }) })
  act(() => { useSessionStore.setState({ account: { id: '2' } as AccountProfile }) })
  act(() => { vi.advanceTimersByTime(1000) })
  expect(events()).toHaveLength(1)
  view.unmount()
  vi.mocked(fetch).mockClear()
  act(() => { useSessionStore.setState({ screen: 'shop' }); vi.advanceTimersByTime(2000) })
  expect(fetch).not.toHaveBeenCalled()
})
