import { useEffect, useRef } from 'react'
import victory from '../assets/audio/victory-fanfare.mp3'
import defeat from '../assets/audio/defeat-fanfare.mp4'
import reward from '../assets/audio/home-reward-received.mp3'
import { useAudioSettingsStore } from '../store/audioSettingsStore'

const sources = { victory, defeat, reward }

/** Preload audio; optionally let an already started cue finish after dismissal. */
export function useCelebrationSound(kind: keyof typeof sources, active: boolean, { finishOnClose = false, resetKey }: { finishOnClose?: boolean; resetKey?: string } = {}) {
  const player = useRef<{ context: AudioContext; buffer: Promise<AudioBuffer>; stop: Set<() => void> } | null>(null)
  useEffect(() => {
    if (typeof AudioContext === 'undefined') return
    const context = new AudioContext({ latencyHint: 'interactive' })
    const abort = new AbortController()
    const buffer = fetch(sources[kind], { signal: abort.signal })
      .then(response => {
        if (!response.ok) throw new Error('Celebration audio unavailable')
        return response.arrayBuffer()
      })
      .then(data => context.decodeAudioData(data))
    void buffer.catch(() => {})
    const current = { context, buffer, stop: new Set<() => void>() }
    player.current = current
    const unlock = () => { if (context.state === 'suspended') void context.resume().catch(() => {}) }
    window.addEventListener('pointerdown', unlock, true)
    window.addEventListener('keydown', unlock, true)
    return () => {
      current.stop.forEach(stop => stop())
      player.current = null
      abort.abort()
      window.removeEventListener('pointerdown', unlock, true)
      window.removeEventListener('keydown', unlock, true)
      void context.close().catch(() => {})
    }
  }, [kind])

  useEffect(() => {
    const current = player.current
    return () => current?.stop.forEach(stop => stop())
  }, [resetKey, kind])

  useEffect(() => {
    const current = player.current
    if (!active || !current || useAudioSettingsStore.getState().muted) return
    let cancelled = false
    let source: AudioBufferSourceNode | null = null
    const gain = current.context.createGain()
    gain.connect(current.context.destination)
    const unsubscribe = useAudioSettingsStore.subscribe(state => {
      gain.gain.setValueAtTime(state.muted ? 0 : 1, current.context.currentTime)
    })
    let disposed = false
    const dispose = (stopSource = true) => {
      if (disposed) return
      disposed = true
      cancelled = true
      if (source) { source.onended = null; if (stopSource) source.stop(); source.disconnect(); source = null }
      gain.disconnect()
      unsubscribe()
      current.stop.delete(stop)
    }
    const stop = () => dispose()
    current.stop.add(stop)
    void Promise.all([current.buffer, current.context.resume()]).then(([buffer]) => {
      if (cancelled || player.current !== current || useAudioSettingsStore.getState().muted) { dispose(); return }
      source = current.context.createBufferSource()
      source.buffer = buffer
      source.connect(gain)
      source.onended = () => dispose(false)
      source.start()
    }).catch(() => dispose())
    return () => {
      cancelled = true
      if (!finishOnClose || !source) dispose()
    }
  }, [active, kind, finishOnClose, resetKey])
}
