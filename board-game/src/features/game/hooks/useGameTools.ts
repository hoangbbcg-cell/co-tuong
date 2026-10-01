import { useState } from 'react'
import { useHomeMusic } from '../../lobby/hooks/useHomeMusic'

export function useGameTools(onCamera: () => Promise<void>) {
  const music = useHomeMusic()
  const [notice, setNotice] = useState('')

  const toggleMusic = async () => {
    try { await music.toggle(); setNotice('') }
    catch { setNotice('Không thể phát nhạc trên trình duyệt này.') }
  }
  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
      setNotice('')
    } catch { setNotice('Trình duyệt chưa hỗ trợ toàn màn hình.') }
  }
  return { playing: music.playing, toggleMusic, fullscreen, notice, camera: onCamera }
}
