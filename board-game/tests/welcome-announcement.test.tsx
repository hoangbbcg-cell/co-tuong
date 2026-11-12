// @vitest-environment jsdom
import { afterAll, afterEach, beforeAll, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { WelcomeAnnouncement } from '../src/app/WelcomeAnnouncement'
const modal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal')
const close = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'close')
beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function(this: HTMLDialogElement) { this.open = true } })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function(this: HTMLDialogElement) { this.open = false } })
})
afterEach(cleanup)
afterAll(() => {
  for (const [name, descriptor] of [['showModal', modal], ['close', close]] as const) {
    if (descriptor) Object.defineProperty(HTMLDialogElement.prototype, name, descriptor)
    else Reflect.deleteProperty(HTMLDialogElement.prototype, name)
  }
})
it('shows the supplied welcome message and working external community links on Home', () => {
  render(<WelcomeAnnouncement active />)
  expect(screen.getByRole('dialog', { name: 'Chào mừng đến với HOVANG' })).toBeTruthy()
  expect(screen.getByRole('dialog').textContent).not.toContain('https://')
  expect(screen.getByText('HOVANG – Cờ Tướng Online đã chính thức ra mắt!')).toBeTruthy()
  const facebook = screen.getByRole('link', { name: /Cộng đồng Facebook/ })
  const zalo = screen.getByRole('link', { name: /Nhóm Zalo/ })
  expect(facebook.getAttribute('href')).toBe('https://www.facebook.com/share/1GheyTB5rm/')
  expect(zalo.getAttribute('href')).toBe('https://zalo.me/g/8ux46ujifj5hjjzlfil5')
  for (const link of [facebook, zalo]) {
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  }
})
it.each(['Đóng thông báo chào mừng'])('dismisses using %s and stays closed when returning to Home', name => {
  const view = render(<WelcomeAnnouncement active />)
  fireEvent.click(screen.getByRole('button', { name }))
  expect(screen.queryByRole('dialog')).toBeNull()
  view.rerender(<WelcomeAnnouncement active={false} />)
  view.rerender(<WelcomeAnnouncement active />)
  expect(screen.queryByRole('dialog')).toBeNull()
})
it('waits for Home and supports Escape dismissal', () => {
  const view = render(<WelcomeAnnouncement active={false} />)
  expect(screen.queryByRole('dialog')).toBeNull()
  view.rerender(<WelcomeAnnouncement active />)
  fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true, cancelable: true }))
  expect(screen.queryByRole('dialog')).toBeNull()
})