// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { RewardPreviewDialog } from '../src/features/lobby/components/RewardItemTile'

afterEach(cleanup)

it('ignores a click arriving on a backdrop that appeared during the opening gesture', () => {
  const close = vi.fn()
  render(<RewardPreviewDialog name="Danh hiệu" onClose={close}><span>Vật phẩm</span></RewardPreviewDialog>)
  const overlay = screen.getByRole('dialog')
  fireEvent.click(overlay)
  expect(close).not.toHaveBeenCalled()
  fireEvent.pointerDown(screen.getByText('Vật phẩm'))
  fireEvent.click(overlay)
  expect(close).not.toHaveBeenCalled()
  fireEvent.pointerDown(overlay)
  fireEvent.click(overlay)
  expect(close).toHaveBeenCalledTimes(1)
})

it('keeps the explicit close button and Escape available', () => {
  const close = vi.fn()
  render(<RewardPreviewDialog name="Danh hiệu" onClose={close}><span>Vật phẩm</span></RewardPreviewDialog>)
  fireEvent.click(screen.getByRole('button', { name: 'Đóng' }))
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
  expect(close).toHaveBeenCalledTimes(2)
})
