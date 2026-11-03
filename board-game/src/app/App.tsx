import { usePhonePortrait } from './usePhonePortrait'
import { HovangLoadingOverlay } from '../components/HovangLoadingOverlay'
import { useDesktopDialogScrollbars } from './useDesktopDialogScrollbars'
import { HomeRewardNotifications } from '../features/lobby/components/HomeRewardNotifications'

import { ChallengeNotifications } from './ChallengeNotifications'
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useRoomConnection } from './useRoomConnection'
import { useEnergyRecovery } from './useEnergyRecovery'
import { useSessionStore } from '../store/sessionStore'
import { HomePage } from '../pages/home/HomePage'




import { EnergyNotice } from '../features/game/components/EnergyNotice'
import { useSavedMatches } from '../store/savedMatchesStore'
import { socket } from '../services/socket'
import type { Side } from '../types/game'
import { isUiCheckboxLabelClick, isConfirmationActionButton, isUiSelectionAction, isUiTabAction, playConfirmationActionSound, playCustomizationTabActionSound, prepareConfirmationActionSound, prepareBoardEntryActionSound, preparePositionRemoveActionSound, prepareCustomizationTabActionSound, unlockConfirmationActionSound, maintainConfirmationAudioReadiness } from '../lib/uiActionSound'

const GamePage = lazy(() => import('../pages/game/GamePage').then(module => ({ default: module.GamePage })))
const RoomSelectionPage = lazy(() => import('../pages/rooms/RoomSelectionPage').then(module => ({ default: module.RoomSelectionPage })))
const ComputerPage = lazy(() => import('../pages/computer/ComputerPage').then(module => ({ default: module.ComputerPage })))
const CustomPositionPage = lazy(() => import('../pages/computer/CustomPositionPage').then(module => ({ default: module.CustomPositionPage })))
const ShopPage = lazy(() => import('../pages/shop/ShopPage').then(module => ({ default: module.ShopPage })))

function preloadMatchScreens() {
  // HOVANG: disabled eager route preloading.
  // React.lazy still loads each screen when requested.
}
export function App() {
  usePhonePortrait()
  useDesktopDialogScrollbars()
  useRoomConnection()
  useEffect(() => {
    const preload = () => preloadMatchScreens()
    if (document.readyState === 'complete') {
      preload()
    } else {
      window.addEventListener('load', preload, { once: true })
      return () => window.removeEventListener('load', preload)
    }
  }, [])
  useEnergyRecovery()
  useEffect(() => {
    void prepareConfirmationActionSound()
    void prepareBoardEntryActionSound()
    void preparePositionRemoveActionSound()
    void prepareCustomizationTabActionSound()
    const stopMaintainingAudio = maintainConfirmationAudioReadiness()
    document.addEventListener('pointerdown', unlockConfirmationActionSound, true)
    document.addEventListener('keydown', unlockConfirmationActionSound, true)
    const playForConfirmationAction = (event: MouseEvent) => {
      if (isUiCheckboxLabelClick(event.target)) return
      if (isUiTabAction(event.target)) playCustomizationTabActionSound()
      else if (isUiSelectionAction(event.target)) playConfirmationActionSound()
      else if (isConfirmationActionButton(event.target)) playConfirmationActionSound()
    }
    document.addEventListener('click', playForConfirmationAction, true)
    return () => {
      stopMaintainingAudio()
      document.removeEventListener('click', playForConfirmationAction, true)
      document.removeEventListener('pointerdown', unlockConfirmationActionSound, true)
      document.removeEventListener('keydown', unlockConfirmationActionSound, true)
    }
  }, [])
  const screen = useSessionStore(state => state.screen)
  const liveSeatKey = useSessionStore(state => state.mode === 'online' && state.room
    ? JSON.stringify([state.room.id, ...state.room.players.map(player => player.id).sort()])
    : 'local')
  const replay = useSavedMatches(state => state.replay)
  const room = useSessionStore(state => state.mode === 'online' ? state.room : null)
  const liveParticipant = useRef<{ room: string; side: Side; completed?: string } | null>(null)
  const previousSeats = useRef(liveSeatKey)
  const leaveResult = useRef<{ key: string; side: Side } | null>(null)
  if (previousSeats.current !== liveSeatKey) {
    const prior = liveParticipant.current
    const completed = room?.lastCompletedMatch
    const result = completed?.states.at(-1)?.result
    leaveResult.current = prior && prior.room === room?.id && completed?.id !== prior.completed
      && result?.reason === 'leave' && result.winner === prior.side
      && room?.players.some(player => player.id === socket.id)
      ? { key: liveSeatKey, side: prior.side } : null
    // A live participant can hand off a departure result only once. A later
    // join/seat change must not revive that completed match on another mount.
    liveParticipant.current = null
    previousSeats.current = liveSeatKey
  }
  if (room?.game.phase === 'playing') {
    const self = room.players.find(player => player.id === socket.id)
    liveParticipant.current = self ? { room: room.id, side: self.side, completed: room.lastCompletedMatch?.id } : null
    leaveResult.current = null
  }
  if (screen !== 'game') { liveParticipant.current = null; leaveResult.current = null }
  const liveRoomKey = useSessionStore(state => state.mode === 'online' ? state.room?.id : 'local')
  const enteredRoom = useRef<string | undefined>(undefined)
  const skipEntrance = screen === 'game' && enteredRoom.current === liveRoomKey
  const [keepHome, setKeepHome] = useState(screen === 'home')
  const finishEntrance = useCallback(() => setKeepHome(false), [])
  useLayoutEffect(() => {
    if (screen === 'home') setKeepHome(true)
    enteredRoom.current = screen === 'game' ? liveRoomKey : undefined
  }, [screen, liveRoomKey])
  return <>
    <ChallengeNotifications />
    <HomeRewardNotifications />
    
    {(screen === 'home' || keepHome) && <div className="w-full" inert={screen !== 'home'} aria-hidden={screen !== 'home'}><HomePage /></div>}
    <Suspense fallback={<HovangLoadingOverlay fullscreen />}>{(screen === 'game' || screen === 'replay' && replay) && <div className="fixed inset-0"><GamePage key={screen === 'replay' ? replay?.id : liveRoomKey} presentationKey={liveSeatKey} initialResultSide={leaveResult.current?.key === liveSeatKey ? leaveResult.current.side : undefined} skipEntrance={skipEntrance} replayData={screen === 'replay' ? replay ?? undefined : undefined} onEntranceComplete={finishEntrance} /></div>}
    {screen === 'rooms' && <div className="fixed inset-0"><RoomSelectionPage onEntranceComplete={finishEntrance} /></div>}
    {screen === 'computer' && <div className="fixed inset-0"><ComputerPage onEntranceComplete={finishEntrance} /></div>}
    {screen === 'position' && <div className="fixed inset-0"><CustomPositionPage /></div>}
    {screen === 'shop' && <ShopPage />}</Suspense>
    <EnergyNotice />
  </>
}
