import { useEffect, useSyncExternalStore } from 'react'
import { readAudioPreference, saveAudioPreference } from '../../../lib/audioPreferences'
import { BackgroundMusicPlayer } from '../audio/BackgroundMusicPlayer'
import firstTrack from '../../../assets/audio/et11lx-chinese-ancient-style-music-love-et11lx-155926.mp3'
import secondTrack from '../../../assets/audio/et11lx-chinese-ancient-style-music-love-etlx-247345.mp3'
import thirdTrack from '../../../assets/audio/chinesezenmusic-chinese-bamboo-flute-amp-guzheng-relaxing-zen-music-618302.mp3'

const tracks = [firstTrack, secondTrack, thirdTrack]
let trackIndex = 0

const listeners = new Set<() => void>()
let enabled = readAudioPreference('music', true)
let audio: BackgroundMusicPlayer | null = null
let replayTimer: ReturnType<typeof setTimeout> | null = null

function clearReplay() {
  if (replayTimer !== null) clearTimeout(replayTimer)
  replayTimer = null
}

function getAudio() {
  if (!audio) {
    audio = new BackgroundMusicPlayer(scheduleNext)
    // The shared player survives page changes, so its visibility listener must too.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') audio?.pause()
      else resumeMusic()
    })
  }
  return audio
}

function resumeMusic() {
  if (document.visibilityState !== 'hidden' && enabled && replayTimer === null && getAudio().paused) {
    void getAudio().play(tracks[trackIndex]).catch(() => {})
  }
}

function scheduleNext() {
  clearReplay()
  if (!enabled) return
  replayTimer = setTimeout(() => {
    replayTimer = null
    if (!enabled || !audio) return
    trackIndex = (trackIndex + 1) % tracks.length
    if (document.visibilityState !== 'hidden') void audio.play(tracks[trackIndex]).catch(() => {})
  }, 4000)
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

async function toggle() {
  enabled = !enabled
  saveAudioPreference('music', enabled)
  clearReplay()
  listeners.forEach(listener => listener())
  if (!enabled) { audio?.pause(); return }
  if (getAudio().ended) { scheduleNext(); return }
  try { if (document.visibilityState !== 'hidden') await getAudio().play(tracks[trackIndex]) }
  catch (error) {
    enabled = false
    saveAudioPreference('music', false)
    listeners.forEach(listener => listener())
    throw error
  }
}

// One shared player keeps the track and sound controls in sync across screens.
export function useHomeMusic() {
  const playing = useSyncExternalStore(subscribe, () => enabled)
  useEffect(() => {
    const resume = resumeMusic
    resume()
    document.addEventListener('pointerdown', resume)
    document.addEventListener('keydown', resume)
    return () => {
      document.removeEventListener('pointerdown', resume)
      document.removeEventListener('keydown', resume)
    }
  }, [])
  return { playing, toggle }
}
