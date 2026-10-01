import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { socket } from '../services/socket'
import { useSessionStore } from '../store/sessionStore'
import type { RoomSnapshot } from '../types/room'

export function useRoomConnection() {
  const client = useQueryClient()
  useEffect(() => {
    const receive = (room: RoomSnapshot) => useSessionStore.getState().receiveRoom(room)
    const disconnect = (reason: string) => {
      if (reason === 'io client disconnect') return
      socket.disconnect()
      if (useSessionStore.getState().mode === 'online') {
        useSessionStore.getState().leave('Đã mất kết nối. Ghế chơi đã được giải phóng; hãy vào lại phòng.')
        void client.invalidateQueries({ queryKey: ['rooms'] })
      }
    }
    socket.on('room:state', receive)
    socket.on('disconnect', disconnect)
    return () => { socket.off('room:state', receive); socket.off('disconnect', disconnect) }
  }, [client])
}
