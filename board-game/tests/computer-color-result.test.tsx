// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { MatchResultDialog } from '../src/features/game/components/MatchResultDialog'
afterEach(() => { cleanup(); vi.restoreAllMocks() })
it.each(['red', 'black'] as const)('uses the actual %s winner instead of personal outcome', winner => {
  HTMLDialogElement.prototype.show = vi.fn()
  const now = vi.spyOn(performance, 'now').mockReturnValue(0)
  const close = vi.fn()
  render(<MatchResultDialog outcome="loss" winner={winner} onClose={close} rewardGold={150} eloDelta={13} />)
  const title = winner === 'red' ? 'Đỏ thắng' : 'Đen thắng'
  expect(screen.getByAltText(title).getAttribute('src')).toContain(`${winner}-wins.png`)
  expect(screen.queryByAltText('Thất bại')).toBeNull()
  expect(screen.queryByText('+150')).toBeNull()
  now.mockReturnValue(1500)
  fireEvent.click(screen.getByRole('button', { name: 'Xác nhận', hidden: true }))
  expect(close).toHaveBeenCalledOnce()
})
it('keeps the personal result for online callers without a color winner', () => {
  HTMLDialogElement.prototype.show = vi.fn()
  render(<MatchResultDialog outcome="loss" onClose={() => {}} />)
  expect(screen.getByAltText('Thất bại').getAttribute('src')).toContain('defeat.webp')
})
