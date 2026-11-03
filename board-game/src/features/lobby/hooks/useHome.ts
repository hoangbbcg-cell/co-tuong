import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { roomApi, errorMessage } from '../../../services/api'
import { roomSocket } from '../../../services/socket'
import { randomAvailableRoom } from '../../../lib/quickRoom'
import { MAX_ENERGY, isEnergyError } from '../../../lib/energy'
import { refreshMatchHistory } from '../../../services/accountSession'

export function useHome() {
  const name = useSessionStore(state => state.name)
  const energy = useSessionStore(state => state.energy)
  const energyUnlimited = useSessionStore(state => state.account?.energyUnlimited ?? false)
  const gold = useSessionStore(state => state.gold)
  const energyRecoveryAt = useSessionStore(state => state.energyRecoveryAt)
  const [energyNow, setEnergyNow] = useState(Date.now)
  useEffect(() => {
    if (energyRecoveryAt === null) return
    setEnergyNow(Date.now())
    const update = () => {
      if (document.visibilityState === 'visible') setEnergyNow(Date.now())
    }
    const timer = window.setInterval(update, 1000)
    document.addEventListener('visibilitychange', update)
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', update) }
  }, [energyRecoveryAt])
  const seconds = energyRecoveryAt === null ? 420 : Math.max(0, Math.ceil((energyRecoveryAt - energyNow) / 1000))
  const energyCountdown = energy >= MAX_ENERGY ? 'Năng lượng đầy' : `Hồi năng lượng sau: ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
  const setName = useSessionStore(state => state.setName)
  const notice = useSessionStore(state => state.notice)
  const [message, setMessage] = useState('')
  const requireEnergy = () => {
    const store = useSessionStore.getState()
    if (store.account?.energyUnlimited) return true
    store.recoverEnergy()
    if (useSessionStore.getState().energy > 0) return true
    useSessionStore.getState().showEnergyNotice()
    return false
  }
  const client = useQueryClient()
  const joiningRef = useRef(false)
  const quick = useMutation({
    mutationFn: async (variant: 'xiangqi' | 'jieqi') => {
      const rooms = await client.fetchQuery({ queryKey: ['rooms'], queryFn: ({ signal }) => roomApi.list(signal), staleTime: 0 })
      const room = randomAvailableRoom(rooms, Math.random, variant, !useSessionStore.getState().countryCode)
      if (!requireEnergy()) return { blocked: true as const }
      const profile = useSessionStore.getState()
      const province = profile.countryCode === 'VN' ? profile.province.trim() || undefined : undefined
      const destination = room ?? await (variant === 'jieqi' ? roomApi.create('Bàn Cờ Úp', 10, 60, province, undefined, 'jieqi') : roomApi.create('Bàn cờ', 10, 60, province))
      return roomSocket.join(destination.id, name)
    },
    onSuccess: room => {
      if (room && 'blocked' in room) return
      if (room) useSessionStore.getState().enterOnline(room)
      void client.invalidateQueries({ queryKey: ['rooms'] })
    },
    onError: error => { const message = errorMessage(error); if (isEnergyError(message)) useSessionStore.getState().showEnergyNotice(); else setMessage(message) },
    onSettled: () => { joiningRef.current = false },
  })
  const quickPlay = () => { if (requireEnergy()) quick.mutate('xiangqi') }
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
  const openHistory = () => {
    historyRef.current?.showModal()
    void refreshMatchHistory('played').catch(() => setMessage('Không tải được lịch sử ván đấu.'))
  }
  const closeHistory = () => historyRef.current?.close()
  useEffect(() => {
    if (message && !messageRef.current?.open) messageRef.current?.showModal()
    if (!message && messageRef.current?.open) messageRef.current.close()
  }, [message])
  const openRooms = () => useSessionStore.setState({ screen: 'rooms', lobbyOpen: true })
  const openShop = () => useSessionStore.setState({ screen: 'shop', lobbyOpen: false })
  const openComputer = () => useSessionStore.setState({ screen: 'computer', lobbyOpen: false, selectedComputerEngine: 'fairy' })
  const closeRooms = () => useSessionStore.setState({ lobbyOpen: false })
  const playLocal = () => {
    useGameStore.getState().reset(performance.now())
    useSessionStore.getState().joinLocal()
  }
  const playHidden = () => {
    if (requireEnergy()) quick.mutate('jieqi')
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
  return { openShop, energyCountdown: energyUnlimited ? 'Năng lượng vô hạn' : energyCountdown, energy, energyUnlimited, gold, openComputer, playHidden, quickPlay, joining: quick.isPending, name, setName, notice, message, messageRef, profileRef, rankingRef, friendsRef, historyRef, openProfile, closeProfile, openRanking, closeRanking, openFriends, closeFriends, openHistory, closeHistory, setMessage, openRooms, closeRooms, playLocal, fullscreen, exit }
}
