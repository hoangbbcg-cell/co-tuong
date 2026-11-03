// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { HovangLoadingOverlay } from '../src/components/HovangLoadingOverlay'
afterEach(cleanup)
it('announces loading, overlays its region and disappears when loading completes', () => {
  const { rerender } = render(<div><button>Tiếp tục</button><HovangLoadingOverlay label="Đang tải dữ liệu" /></div>)
  const status = screen.getByRole('status', { name: 'Đang tải dữ liệu' })
  expect(status.className).toContain('absolute')
  expect(status.className).toContain('pointer-events-none')
  expect(status.querySelector('svg')?.classList.contains('animate-spin')).toBe(true)
  rerender(<div><button>Tiếp tục</button></div>)
  expect(screen.queryByRole('status')).toBeNull()
  expect(screen.getByRole('button', { name: 'Tiếp tục' })).toBeTruthy()
})
it('supports a centered full-screen fallback for lazy pages', () => {
  render(<HovangLoadingOverlay fullscreen />)
  expect(screen.getByRole('status').className).toContain('fixed')
  expect(screen.getByRole('status').className).toContain('place-items-center')
})
