import { useEffect, useRef, useState } from 'react'

// Original pentatonic ambient melody, synthesized locally without external audio.
const melody = [261.63, 329.63, 392, 440, 392, 329.63, 293.66, 261.63, 196, 261.63, 293.66, 329.63, 392, 329.63, 293.66, 196]
export function useHomeMusic() {
  const [playing, setPlaying] = useState(false)
  const audio = useRef<AudioContext | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const stop = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
    if (audio.current) void audio.current.close()
    audio.current = null
  }
  useEffect(() => stop, [])
  const toggle = async () => {
    if (audio.current) { stop(); setPlaying(false); return }
    const context = new AudioContext()
    audio.current = context
    try {
      await context.resume()
      if (audio.current !== context) return
      let index = 0
      const note = () => {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.value = melody[index++ % melody.length]
        gain.gain.setValueAtTime(0, context.currentTime)
        gain.gain.linearRampToValueAtTime(0.08, context.currentTime + 0.015)
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.7)
        oscillator.connect(gain).connect(context.destination)
        oscillator.start()
        oscillator.stop(context.currentTime + 1.8)
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
      }
      note()
      timer.current = setInterval(note, 650)
      setPlaying(true)
    } catch (error) { stop(); setPlaying(false); throw error }
  }
  return { playing, toggle }
}
