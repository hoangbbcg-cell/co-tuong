import { useAudioSettingsStore } from '../store/audioSettingsStore'
import { isEnergyError } from '../lib/energy'
import { refreshAccount } from '../services/accountSession'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { roomSocket, socket } from '../services/socket'
import { useSessionStore } from '../store/sessionStore'
import { showRoomNotice } from '../lib/roomNotice'
import type { RoomSnapshot } from '../types/room'

// HOVANG_ROOM_SOUND_V1: long-lived one-shot audio avoids sound loss on room navigation.
const roomSoundUrls = { seat: '/audio/room-seat.mp3', leave: '/audio/room-leave.mp3' } as const
// HOVANG_ROOM_LEAVE_FAST_V4_1: reuse the preloaded leave sound on mobile.
let cachedLeaveAudio: HTMLAudioElement | null = null
function prepareLeaveAudio() {
  if (typeof Audio === 'undefined') return null
  if (!cachedLeaveAudio) {
    cachedLeaveAudio = new Audio(roomSoundUrls.leave)
    cachedLeaveAudio.preload = 'auto'
    cachedLeaveAudio.volume = 0.8
    cachedLeaveAudio.load()
  }
  return cachedLeaveAudio
}
function playRoomSound(kind: 'seat' | 'leave') {
  if (useAudioSettingsStore.getState().muted) return
  if (kind === 'leave') {
    const audio = prepareLeaveAudio()
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    void audio.play().catch(() => {})
    return
  }
  const audio = new Audio(roomSoundUrls[kind])
  audio.volume = 0.8
  void audio.play().catch(() => {}) // Browser autoplay policy may block a listener until its first gesture.
}

export function useRoomConnection() {
  const client = useQueryClient()
  const hasAccount = useSessionStore(state => !!state.account)
  useEffect(() => {
    const receive = (room: RoomSnapshot) => useSessionStore.getState().receiveRoom(room, socket.id)
    let resuming = false
    const resume = () => {
      if (resuming || !useSessionStore.getState().account || !socket.connected) return
      resuming = true
      void roomSocket.resume().then(room => {
        if (!room) return
        const state = useSessionStore.getState()
        if (state.mode === 'online' && state.room?.id === room.id) {
          state.receiveRoom(room, socket.id)
          state.setNotice('')
        } else state.enterOnline(room)
        void client.invalidateQueries({ queryKey: ['rooms'] })
      }).catch(() => {}).finally(() => { resuming = false })
    }
    const disconnect = (reason: string) => {
      if (reason === 'io client disconnect') return
      if (useSessionStore.getState().mode === 'online') {
        useSessionStore.getState().setNotice('Mất kết nối. Đồng hồ vẫn chạy; đang thử kết nối lại.')
      }
    }
    const replaced = (roomId: string) => { if (useSessionStore.getState().room?.id === roomId) useSessionStore.getState().leave('Quyền điều khiển ván đã chuyển sang thiết bị khác.') }
    const removed = (roomId: string) => { if (useSessionStore.getState().room?.id === roomId) { useSessionStore.getState().leave('Bạn đã bị đuổi khỏi phòng.'); void client.invalidateQueries({ queryKey: ['rooms'] }) } }
    const notice = (message: string) => {
      if (isEnergyError(message)) {
        useSessionStore.getState().showEnergyNotice()
        if (useSessionStore.getState().account) void refreshAccount().catch(() => {})
      } else showRoomNotice(message)
    }
    const roomSound = (event: { kind: 'seat' | 'leave'; roomId: string; actorId: string }) => {
      if (event.kind === 'seat' && socket.id === event.actorId) return
      // Ignore cues for rooms this client is no longer watching, except leave during own exit.
      if (useSessionStore.getState().room?.id !== event.roomId && !(event.kind === 'leave' && socket.id === event.actorId)) return
      playRoomSound(event.kind)
    }
    // Preload after the first permitted user gesture, keeping server authority unchanged.
    const warmLeaveSound = () => { prepareLeaveAudio() }
    document.addEventListener('pointerdown', warmLeaveSound, { once: true, passive: true })
    document.addEventListener('keydown', warmLeaveSound, { once: true })
    socket.on('room:sound', roomSound)
    socket.on('room:notice', notice)
    socket.on('room:removed', removed)
    socket.on('room:state', receive)
    socket.on('disconnect', disconnect)
    socket.on('connect', resume)
    socket.on('room:control-replaced', replaced)
    if (socket.connected) resume()
    return () => { document.removeEventListener('pointerdown', warmLeaveSound); document.removeEventListener('keydown', warmLeaveSound); socket.off('room:sound', roomSound); socket.off('room:notice', notice); socket.off('room:removed', removed); socket.off('room:state', receive); socket.off('disconnect', disconnect); socket.off('connect', resume); socket.off('room:control-replaced', replaced) }
  }, [client, hasAccount])
}
