export function readAudioPreference(key: 'music' | 'muted', fallback: boolean): boolean {
  try {
    const value = localStorage.getItem(`co-tuong-audio-${key}-v1`)
    return value === 'true' ? true : value === 'false' ? false : fallback
  } catch { return fallback }
}

export function saveAudioPreference(key: 'music' | 'muted', value: boolean): void {
  try { localStorage.setItem(`co-tuong-audio-${key}-v1`, String(value)) }
  catch { /* Keep controls usable when browser storage is unavailable. */ }
}
