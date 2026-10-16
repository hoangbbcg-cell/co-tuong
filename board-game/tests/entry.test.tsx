// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { ENTRY_STORAGE_KEY, readGuestEntry, useEntryStore } from '../src/store/entryStore'
import { EntryGate } from '../src/app/EntryGate'
import { useSessionStore } from '../src/store/sessionStore'
import { createGuestName } from '../src/lib/guestIdentity'
import { playerNameError } from '../src/lib/playerName'

vi.mock('../src/app/App', () => ({ App: () => <div>Game entry</div> }))
beforeEach(() => { localStorage.clear(); useEntryStore.setState({ entry: null }) })
afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('browser entry', () => {
  it('shows login first and remembers guest entry across reloads', () => {
    const view = render(<EntryGate />)
    expect(screen.getByRole('button', { name: 'Chơi như khách' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Chơi như khách' }))
    const name = useSessionStore.getState().name
    expect(name).toMatch(/^Kỳ thủ\d{6}$/u)
    expect(readGuestEntry()?.name).toBe(name)
    expect(screen.getByText('Game entry')).toBeInTheDocument()
    view.unmount()
    useEntryStore.setState({ entry: readGuestEntry() })
    render(<EntryGate />)
    expect(screen.getByText('Game entry')).toBeInTheDocument()
  })
  it('pads random numbers and permits only the exact guest-name exception', () => {
    vi.spyOn(crypto, 'getRandomValues').mockImplementation(array => {
      ;(array as Uint32Array)[0] = 42
      return array
    })
    expect(createGuestName()).toBe('Kỳ thủ000042')
    expect(playerNameError('Kỳ thủ000042')).toBe('')
    expect(playerNameError('Kỳ thủ1234567')).not.toBe('')
    expect(playerNameError('NgườiChơi12345')).not.toBe('')
  })
  it('restores the saved name before initializing the game session', async () => {
    localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify({ version: 1, provider: 'guest', name: 'Kỳ thủ000042' }))
    vi.resetModules()
    const { useSessionStore: restoredSession } = await import('../src/store/sessionStore')
    expect(restoredSession.getState().name).toBe('Kỳ thủ000042')
  })
  it('upgrades old guest entries once and reuses their name', () => {
    localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify({ version: 1, provider: 'guest' }))
    const first = readGuestEntry()
    expect(first?.name).toMatch(/^Kỳ thủ\d{6}$/u)
    expect(readGuestEntry()).toEqual(first)
    useEntryStore.getState().enterGuest()
    expect(useSessionStore.getState().name).toBe(first?.name)
    useEntryStore.getState().enterGuest()
    expect(readGuestEntry()).toEqual(first)
  })
  it('rejects corrupt storage and client-created Google credentials', () => {
    localStorage.setItem(ENTRY_STORAGE_KEY, '{bad')
    expect(readGuestEntry()).toBeNull()
    localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify({ version: 1, provider: 'google' }))
    expect(readGuestEntry()).toBeNull()
  })
  it('logs out without losing the guest identity or saved data', () => {
    useEntryStore.getState().enterGuest()
    const name = useSessionStore.getState().name
    localStorage.setItem('xiangqi-saved-matches-v1', '[{"id":"saved"}]')
    useEntryStore.getState().signOut()
    expect(useEntryStore.getState().entry).toBeNull()
    expect(readGuestEntry()).toEqual({ version: 1, provider: 'guest', name, signedOut: true })
    render(<EntryGate />)
    expect(screen.getByRole('button', { name: 'Chơi như khách' })).toBeInTheDocument()
    useEntryStore.getState().enterGuest()
    expect(readGuestEntry()?.signedOut).toBeUndefined()
    expect(useSessionStore.getState().name).toBe(name)
    expect(localStorage.getItem('xiangqi-saved-matches-v1')).toBe('[{"id":"saved"}]')
  })
  it('keeps login visible when browser storage fails', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota') })
    render(<EntryGate />)
    fireEvent.click(screen.getByRole('button', { name: 'Chơi như khách' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Không thể ghi nhớ')
    expect(screen.queryByText('Game entry')).not.toBeInTheDocument()
  })
  it('does not pretend Google sign-in succeeded before OAuth is configured', () => {
    render(<EntryGate />)
    fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập với Google' }))
    expect(screen.getByRole('status')).toHaveTextContent('chưa được cấu hình')
    expect(localStorage.getItem(ENTRY_STORAGE_KEY)).toBeNull()
  })
})
