import { useEffect, useRef, useState } from 'react'
import { connect, socket } from '../../../services/socket'
import { useSessionStore } from '../../../store/sessionStore'

export function useLobbyPresence(province: string) {
  const currentProvince = useRef(province)
  currentProvince.current = province
  const screen = useSessionStore(state => state.screen)
  const [players, setPlayers] = useState(0)
  const [provinceCounts, setProvinceCounts] = useState<Record<string, number>>({})
  useEffect(() => {
    if (screen !== 'rooms') return
    let active = true
    setPlayers(0)
    const announce = () => { if (active) socket.emit('lobby:presence', currentProvince.current) }
    const disconnected = () => { setPlayers(0); setProvinceCounts({}) }
    socket.on('lobby:count', setPlayers)
    socket.on('lobby:province-counts', setProvinceCounts)
    socket.on('connect', announce)
    socket.on('disconnect', disconnected)
    if (socket.connected) announce()
    else void connect().catch(disconnected)
    return () => {
      active = false
      socket.off('lobby:count', setPlayers)
      socket.off('lobby:province-counts', setProvinceCounts)
      socket.off('connect', announce)
      socket.off('disconnect', disconnected)
      if (socket.connected) socket.emit('lobby:presence', null)
    }
  }, [screen])
  useEffect(() => {
    if (screen === 'rooms' && socket.connected) socket.emit('lobby:presence', province)
  }, [province, screen])
  return { province, players, provinceCounts }
}
