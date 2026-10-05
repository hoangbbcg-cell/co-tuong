import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { roomApi, errorMessage } from '../../../services/api'
import { roomSocket } from '../../../services/socket'

export function useHome() {
  const name = useSessionStore(state => state.name)
  const energy = useSessionStore(state => state.energy)
  const gold = useSessionStore(state => state.gold)
  const energyRecoveryAt = useSessionStore(state => state.energyRecoveryAt)
  const [energyNow, setEnergyNow] = useState(Date.now)
  useEffect(() => {
    if (energyRecoveryAt === null) return
    setEnergyNow(Date.now())
    const timer = window.setInterval(() => setEnergyNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [energyRecoveryAt])
  // Tạm hiện mẫu 5:00 khi đầy năng lượng để kiểm tra giao diện tooltip.
  const seconds = energyRecoveryAt === null ? 300 : Math.max(0, Math.ceil((energyRecoveryAt - energyNow) / 1000))
  const energyCountdown = `Hồi năng lượng sau: ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
  const setName = useSessionStore(state => state.setName)
  const notice = useSessionStore(state => state.notice)
  const [message, setMessage] = useState('')
  const client = useQueryClient()
  const joiningRef = useRef(false)
  const quick = useMutation({
    mutationFn: async () => {
      const rooms = await client.fetchQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), staleTime: 0 })
      const room = rooms.find(room => room.players === 1 && room.phase !== 'playing')
        ?? rooms.find(room => room.players === 0 && room.phase !== 'playing')
      if (!room) return null
      return roomSocket.join(room.id, name)
    },
    onSuccess: room => {
      if (room) useSessionStore.getState().enterOnline(room)
      else {
        useGameStore.getState().reset(performance.now())
        useSessionStore.getState().joinLocal()
        useSessionStore.setState({ mode: 'computer' })
      }
      void client.invalidateQueries({ queryKey: ['rooms'] })
    },
    onError: error => setMessage(errorMessage(error)),
    onSettled: () => { joiningRef.current = false },
  })
  const quickPlay = () => {
    if (joiningRef.current) return
    joiningRef.current = true
    quick.mutate()
  }
  const messageRef = useRef<HTMLDialogElement>(null)
  const profileRef = useRef<HTMLDialogElement>(null)
  const rankingRef = useRef<HTMLDialogElement>(null)
  const friendsRef = useRef<HTMLDialogElement>(null)
  const historyRef = useRef<HTMLDialogElement>(null)
  const openProfile = () => profileRef.current?.showModal()
  const closeProfile = () => profileRef.current?.close()
  const openRanking = () => rankingRef.current?.showModal()
  const closeRanking = () => rankingRef.current?.close()
  const openFriends = () => friendsRef.current?.showModal()
  const closeFriends = () => friendsRef.current?.close()
  const openHistory = () => historyRef.current?.showModal()
  const closeHistory = () => historyRef.current?.close()
  useEffect(() => {
    if (message && !messageRef.current?.open) messageRef.current?.showModal()
    if (!message && messageRef.current?.open) messageRef.current.close()
  }, [message])
  const openRooms = () => useSessionStore.setState({ screen: 'rooms', lobbyOpen: true })
  const openComputer = () => useSessionStore.setState({ screen: 'computer', lobbyOpen: false })
  const closeRooms = () => useSessionStore.setState({ lobbyOpen: false })
  const playLocal = () => {
    useGameStore.getState().reset(performance.now())
    useSessionStore.getState().joinLocal()
  }
  const playHidden = () => {
    useGameStore.getState().reset(performance.now(), 'jieqi')
    useSessionStore.getState().joinLocal()
    useSessionStore.setState({ mode: 'computer' })
  }
  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch { setMessage('Trình duyệt chưa cho phép chế độ toàn màn hình.') }
  }
  const exit = async () => {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen() }
      catch { setMessage('Không thể thoát toàn màn hình. Bạn có thể nhấn Esc.') }
    } else {
      setMessage('Bạn có thể đóng tab trình duyệt để thoát trò chơi.')
    }
  }
  return { energyCountdown, energy, gold, openComputer, playHidden, quickPlay, joining: quick.isPending, name, setName, notice, message, messageRef, profileRef, rankingRef, friendsRef, historyRef, openProfile, closeProfile, openRanking, closeRanking, openFriends, closeFriends, openHistory, closeHistory, setMessage, openRooms, closeRooms, playLocal, fullscreen, exit }
}
