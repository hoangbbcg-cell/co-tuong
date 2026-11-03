// @vitest-environment jsdom
import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useTakebackDeclineNotice } from '../src/features/game/hooks/useTakebackDeclineNotice'
import { showRoomNotice } from '../src/lib/roomNotice'
import type { RoomSnapshot } from '../src/types/room'
import type { Side } from '../src/types/game'

vi.mock('../src/lib/roomNotice', () => ({ showRoomNotice: vi.fn() }))
afterEach(() => { cleanup(); vi.clearAllMocks() })
const notice = { id: 'decline-1', requester: 'red' as const, declinedBy: 'black' as const }
const initial = { scope: 'room:seats', online: true, playerSide: 'red' as Side | undefined, notice: null as RoomSnapshot['takebackDecline'], computer: false, localVersion: 0 }

it('chỉ người yêu cầu thấy một gợi ý, không lặp theo snapshot', () => {
  const side: Side = 'red'
  const hook = renderHook(useTakebackDeclineNotice, { initialProps: { ...initial, playerSide: side } })
  hook.rerender({ ...initial, playerSide: side, notice })
  expect(showRoomNotice).toHaveBeenCalledExactlyOnceWith('Từ chối')
  hook.rerender({ ...initial, playerSide: side, notice: { ...notice } })
  expect(showRoomNotice).toHaveBeenCalledTimes(1)
  hook.rerender({ ...initial, playerSide: side, notice: null })
  hook.rerender({ ...initial, playerSide: side, notice: { ...notice, id: 'expired-2' } })
  expect(showRoomNotice).toHaveBeenCalledTimes(2)
})

it('người từ chối không thấy gợi ý khi bấm nút hoặc khi tự hết hạn', () => {
  const hook = renderHook(useTakebackDeclineNotice, { initialProps: { ...initial, playerSide: 'black' as Side } })
  hook.rerender({ ...initial, playerSide: 'black', notice })
  hook.rerender({ ...initial, playerSide: 'black', notice: { ...notice, id: 'timeout' } })
  expect(showRoomNotice).not.toHaveBeenCalled()
})

it('không phát lại sự kiện cũ khi vừa mở phòng hoặc cho viewer', () => {
  const old = renderHook(useTakebackDeclineNotice, { initialProps: { ...initial, notice } })
  expect(showRoomNotice).not.toHaveBeenCalled()
  old.unmount()
  const viewer = renderHook(useTakebackDeclineNotice, { initialProps: { ...initial, playerSide: undefined } })
  viewer.rerender({ ...initial, playerSide: undefined, notice })
  expect(showRoomNotice).not.toHaveBeenCalled()
})

it('máy từ chối dùng cùng gợi ý, reset phiên không phát lại', () => {
  const props = { ...initial, online: false, computer: true }
  const hook = renderHook(useTakebackDeclineNotice, { initialProps: props })
  hook.rerender({ ...props, localVersion: 1 })
  expect(showRoomNotice).toHaveBeenCalledExactlyOnceWith('Từ chối')
  hook.rerender({ ...props, scope: 'new-session', localVersion: 1 })
  expect(showRoomNotice).toHaveBeenCalledTimes(1)
})
