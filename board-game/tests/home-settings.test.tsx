// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { HomeSettings } from '../src/features/lobby/components/HomeSettings'
import { useAudioSettingsStore } from '../src/store/audioSettingsStore'

afterEach(() => { cleanup(); useAudioSettingsStore.setState({ muted: false }) })

it('opens below settings, toggles game sound independently, and closes outside or on Escape', () => {
  const toggle = vi.fn(async () => {})
  render(<HomeSettings music={{ playing: true, toggle }} onError={vi.fn()} />)
  fireEvent.click(screen.getByRole('button', { name: 'Cài đặt' }))
  expect(screen.getByRole('group').className).toContain('top-full')
  fireEvent.click(screen.getByRole('button', { name: 'Tắt tiếng' }))
  expect(useAudioSettingsStore.getState().muted).toBe(true)
  expect(toggle).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Tắt nhạc nền' }))
  expect(toggle).toHaveBeenCalledTimes(1)
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(screen.queryByRole('group')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Cài đặt' }))
  fireEvent.pointerDown(document.body)
  expect(screen.queryByRole('group')).toBeNull()
})
