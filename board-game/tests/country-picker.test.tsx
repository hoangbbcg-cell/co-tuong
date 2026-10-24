// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { VietnamAddressPicker } from '../src/features/lobby/components/VietnamAddressPicker'
vi.mock('../src/features/lobby/hooks/useVietnamAdministrativeUnits', () => ({
  useVietnamAdministrativeUnits: () => ({ provinces: [], wards: [], provincesLoading: false, wardsLoading: false })
}))
// These cases exercise desktop selection followed by the explicit save button.
beforeEach(() => vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false })))
afterEach(() => { cleanup(); vi.unstubAllGlobals() })
it('shows countries as selectable rows and saves the selected country', async () => {
  const save = vi.fn()
  render(<VietnamAddressPicker onCancel={() => {}} onSave={save} />)
  expect(screen.queryByRole('combobox')).toBeNull()
  const thailand = screen.getByRole('button', { name: /Thái Lan/ })
  fireEvent.click(thailand)
  expect(thailand.getAttribute('aria-pressed')).toBe('true')
  expect(screen.getByRole('button', { name: /Việt Nam/ }).getAttribute('aria-pressed')).toBe('false')
  expect(save).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Lưu địa chỉ' }))
  await waitFor(() => expect(save).toHaveBeenCalledWith('Thái Lan', '', 'TH', undefined, undefined, undefined))
})
it('searches countries without accents and clears the search before choosing a province', () => {
  render(<VietnamAddressPicker onCancel={() => {}} onSave={vi.fn()} />)
  fireEvent.change(screen.getByRole('searchbox', { name: 'Tìm quốc gia' }), { target: { value: 'viet nam' } })
  expect(screen.getByRole('button', { name: /Việt Nam/ })).toBeTruthy()
  expect(screen.queryByRole('button', { name: /Thái Lan/ })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp' }))
  expect((screen.getByRole('searchbox', { name: 'Tìm tỉnh, thành phố, xã hoặc phường' }) as HTMLInputElement).value).toBe('')
})
it('shows the server save error and allows retry without losing the selected country', async () => {
  const { AxiosError } = await import('axios')
  const failure = new AxiosError('Request failed')
  failure.response = { data: { error: 'Không xác minh được địa giới. Vui lòng thử lại.' }, status: 503, statusText: '', headers: {}, config: {} as never }
  const save = vi.fn().mockRejectedValueOnce(failure).mockResolvedValueOnce(undefined)
  render(<VietnamAddressPicker onCancel={() => {}} onSave={save} />)
  fireEvent.click(screen.getByRole('button', { name: /Thái Lan/ }))
  fireEvent.click(screen.getByRole('button', { name: 'Lưu địa chỉ' }))
  await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Không xác minh được địa giới'))
  expect(screen.getByRole('button', { name: /Thái Lan/ }).getAttribute('aria-pressed')).toBe('true')
  fireEvent.click(screen.getByRole('button', { name: 'Lưu địa chỉ' }))
  await waitFor(() => expect(save).toHaveBeenCalledTimes(2))
  expect(screen.queryByRole('alert')).toBeNull()
})
