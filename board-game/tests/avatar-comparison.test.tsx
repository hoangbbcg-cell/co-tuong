// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { AvatarCustomization } from '../src/features/lobby/components/AvatarCustomization'
import { useSessionStore } from '../src/store/sessionStore'

afterEach(cleanup)

// The user retired A/B/C comparison. Keep the preview isolation regression.
it('previews an avatar without equipping; cancel preserves selection and Use applies once', () => {
  const equip = vi.fn(), cancel = vi.fn()
  const before = useSessionStore.getState().avatarIndex
  const props = { previewPanel: null, selectedAvatarIndex: 0, selectedFrameIndex: 0, onUse: equip, onCancel: cancel }
  const view = render(<AvatarCustomization {...props} />)
  expect(screen.queryByRole('button', { name: 'So sánh độ nét A/B/C' })).toBeNull()
  const choice = screen.getByRole('button', { name: 'Chọn avatar nhân vật 2' })
  fireEvent.click(choice)
  expect(choice.getAttribute('aria-pressed')).toBe('true')
  expect(equip).not.toHaveBeenCalled()
  expect(useSessionStore.getState().avatarIndex).toBe(before)
  fireEvent.click(screen.getByRole('button', { name: 'Hủy' }))
  expect(cancel).toHaveBeenCalledOnce()
  expect(equip).not.toHaveBeenCalled()
  expect(useSessionStore.getState().avatarIndex).toBe(before)
  view.unmount()

  render(<AvatarCustomization {...props} />)
  fireEvent.click(screen.getByRole('button', { name: 'Chọn avatar nhân vật 2' }))
  fireEvent.click(screen.getByRole('button', { name: 'Sử dụng' }))
  expect(equip).toHaveBeenCalledExactlyOnceWith(1, 0)
  fireEvent.click(screen.getByRole('button', { name: 'Sử dụng' }))
  expect(equip).toHaveBeenCalledOnce()
})
