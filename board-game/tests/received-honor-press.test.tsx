// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { RewardItemTile, RewardPreviewDialog } from '../src/features/lobby/components/RewardItemTile'

class TestPointerEvent extends MouseEvent {
  readonly pointerId: number
  readonly isPrimary: boolean
  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init)
    this.pointerId = init.pointerId ?? 1
    this.isPrimary = init.isPrimary ?? true
  }
}
beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('PointerEvent', TestPointerEvent)
  vi.stubGlobal('matchMedia', () => ({ matches: true }))
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals() })
const details = () => <aside>Thông tin danh hiệu</aside>

it('shows centered large information immediately on pointerdown and hides it on release outside', () => {
  const view = render(<RewardPreviewDialog name="Danh hiệu" onClose={vi.fn()} details={details}><span>Danh hiệu</span></RewardPreviewDialog>)
  const target = view.container.querySelector('[data-honor-press-target]')!
  const panel = () => view.container.querySelector('[data-mobile-honor-details]')!
  expect(panel().getAttribute('data-mobile-honor-details')).toBe('false')
  fireEvent.pointerDown(target, { pointerId: 7, button: 0 })
  expect(panel().getAttribute('data-mobile-honor-details')).toBe('true')
  expect(panel().className).toContain('compact:fixed')
  expect(panel().className).toContain('compact:left-1/2')
  fireEvent.pointerUp(window, { pointerId: 7 })
  expect(panel().getAttribute('data-mobile-honor-details')).toBe('false')
})

it('reopens information while pressed even after it was closed, and hides it on pointer cancellation', () => {
  const view = render(<RewardPreviewDialog name="Danh hiệu" onClose={vi.fn()} detailsVisible={false} details={details}><span>Danh hiệu</span></RewardPreviewDialog>)
  const target = view.container.querySelector('[data-honor-press-target]')!
  expect(view.container.querySelector('[data-mobile-honor-details]')).toBeNull()
  fireEvent.pointerDown(target, { pointerId: 2, button: 0 })
  expect(view.container.querySelector('[data-mobile-honor-details="true"]')).toBeTruthy()
  fireEvent.pointerCancel(window, { pointerId: 2 })
  expect(view.container.querySelector('[data-mobile-honor-details]')).toBeNull()
})

it('hides on lost capture or window blur without waiting for another tap', () => {
  const view = render(<RewardPreviewDialog name="Danh hiệu" onClose={vi.fn()} details={details}><span>Danh hiệu</span></RewardPreviewDialog>)
  const target = view.container.querySelector('[data-honor-press-target]')!
  const visible = () => !!view.container.querySelector('[data-mobile-honor-details="true"]')
  fireEvent.pointerDown(target, { pointerId: 3, button: 0 })
  fireEvent(target, new TestPointerEvent('lostpointercapture', { pointerId: 3, bubbles: true }))
  expect(visible()).toBe(false)
  fireEvent.pointerDown(target, { pointerId: 4, button: 0 })
  expect(visible()).toBe(true)
  fireEvent(window, new Event('blur'))
  expect(visible()).toBe(false)
})

it('only releases the pointer that started the hold', () => {
  const view = render(<RewardPreviewDialog name="Danh hiệu" onClose={vi.fn()} details={details}><span>Danh hiệu</span></RewardPreviewDialog>)
  const target = view.container.querySelector('[data-honor-press-target]')!
  fireEvent.pointerDown(target, { pointerId: 5, button: 0 })
  fireEvent.pointerUp(window, { pointerId: 6 })
  expect(view.container.querySelector('[data-mobile-honor-details="true"]')).toBeTruthy()
  fireEvent.pointerUp(window, { pointerId: 5 })
  expect(view.container.querySelector('[data-mobile-honor-details="true"]')).toBeNull()
})

it('supports immediate holds from the original reward tile', () => {
  const start = vi.fn(), end = vi.fn()
  const view = render(<RewardItemTile label="Danh hiệu mới" onClick={vi.fn()} onPressStart={start} onPressEnd={end}><span>Danh hiệu</span></RewardItemTile>)
  fireEvent.pointerDown(view.getByRole('button'), { pointerId: 9, button: 0 })
  expect(start).toHaveBeenCalledTimes(1)
  fireEvent.pointerUp(window, { pointerId: 9 })
  expect(end).toHaveBeenCalledTimes(1)
})

it('leaves desktop presses and non-honor click behavior unchanged', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const start = vi.fn(), click = vi.fn()
  const view = render(<RewardItemTile label="Vật phẩm" onClick={click} onPressStart={start}><span>Vật phẩm</span></RewardItemTile>)
  fireEvent.pointerDown(view.getByRole('button'), { pointerId: 1, button: 0 })
  expect(start).not.toHaveBeenCalled()
  fireEvent.click(view.getByRole('button'))
  expect(click).toHaveBeenCalledTimes(1)
})
