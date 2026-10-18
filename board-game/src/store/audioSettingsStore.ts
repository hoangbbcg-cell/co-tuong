import { create } from 'zustand'
import { readAudioPreference, saveAudioPreference } from '../lib/audioPreferences'

// Background music has an independent player and switch.
export const useAudioSettingsStore = create<{ muted: boolean; toggleMuted: () => void }>(set => ({
  muted: readAudioPreference('muted', false),
  toggleMuted: () => set(state => {
    const muted = !state.muted
    saveAudioPreference('muted', muted)
    return { muted }
  }),
}))
