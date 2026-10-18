// @vitest-environment jsdom
import { expect, it } from 'vitest'
import { useSessionStore } from '../src/store/sessionStore'
import { readProfileLocation } from '../src/lib/profileLocation'

it('locks location after saving, persists it and rejects later changes', () => {
  localStorage.clear()
  useSessionStore.setState({ countryCode: null })
  useSessionStore.getState().setAddress('Phường Bàn Thạch, Thành phố Đà Nẵng', 'Thành phố Đà Nẵng', 'VN')
  useSessionStore.getState().setAddress('Japan', '', 'JP')
  expect(useSessionStore.getState().countryCode).toBe('VN')
  expect(readProfileLocation()).toEqual({ address: 'Phường Bàn Thạch, Thành phố Đà Nẵng', province: 'Thành phố Đà Nẵng', countryCode: 'VN' })
})
