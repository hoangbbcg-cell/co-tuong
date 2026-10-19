// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { AvatarCustomization } from '../src/features/lobby/components/AvatarCustomization'

afterEach(cleanup)
it('opens an isolated A/B/C preview without equipping or changing the selected avatar', () => {
  const equip = vi.fn()
  render(<AvatarCustomization previewPanel={null} selectedAvatarIndex={0} selectedFrameIndex={0} onUse={equip} onCancel={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: 'So sánh độ nét A/B/C' }))
  const dialog = screen.getByRole('dialog', { name: 'So sánh độ nét avatar A/B/C' })
  const image = screen.getByAltText('B: Lão quân sư')
  expect(image.getAttribute('width')).toBe('136')
  expect(image.getAttribute('srcset')).toMatch(/136.* 1x, .*272.* 2x/)
  expect(dialog.textContent).toContain('Chờ ảnh C')
  expect(dialog.querySelector('[data-sample="A"] img')).toBeTruthy()
  expect(equip).not.toHaveBeenCalled()
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(screen.queryByRole('dialog')).toBeNull()
})
