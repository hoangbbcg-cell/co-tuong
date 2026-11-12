import { WelcomeAnnouncement } from './WelcomeAnnouncement'
import { useActivityTracking } from './useActivityTracking'
import { HovangLoadingOverlay } from '../components/HovangLoadingOverlay'
import { useDesktopDialogScrollbars } from './useDesktopDialogScrollbars'
import { HomeRewardNotifications } from '../features/lobby/components/HomeRewardNotifications'

import { ChallengeNotifications } from './ChallengeNotifications'
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useRoomConnection } from './useRoomConnection'
import { useEnergyRecovery } from './useEnergyRecovery'
import { useSessionStore } from '../store/sessionStore'
import { HomePage } from '../pages/home/HomePage'
import { ComputerPage } from '../pages/computer/ComputerPage'
import { CustomPositionPage } from '../pages/computer/CustomPositionPage'
import { GamePage } from '../pages/game/GamePage'




import { EnergyNotice } from '../features/game/components/EnergyNotice'
import { useSavedMatches } from '../store/savedMatchesStore'
import { socket } from '../services/socket'
import type { Side } from '../types/game'
import { isUiCheckboxLabelClick, isConfirmationActionButton, isUiSelectionAction, isUiTabAction, playConfirmationActionSound, playCustomizationTabActionSound, prepareConfirmationActionSound, prepareBoardEntryActionSound, preparePositionRemoveActionSound, prepareCustomizationTabActionSound, unlockConfirmationActionSound, maintainConfirmationAudioReadiness } from '../lib/uiActionSound'

const RoomSelectionPage = lazy(() => import('../pages/rooms/RoomSelectionPage').then(module => ({ default: module.RoomSelectionPage })))
const ShopPage = lazy(() => import('../pages/shop/ShopPage').then(module => ({ default: module.ShopPage })))

function preloadMatchScreens() {
  // Load transition destinations while Home is visible so Suspense never
  // replaces the current screen with a bare background during navigation.
  void Promise.all([import('../pages/game/GamePage'), import('../pages/rooms/RoomSelectionPage'), import('../pages/computer/ComputerPage'), import('../pages/computer/CustomPositionPage'), import('../pages/shop/ShopPage')])
}
// Start fetching route chunks as soon as the app module is evaluated. The
// first click after a hard reload must not be the moment that starts loading
// the destination chunk.
preloadMatchScreens()
export function App() {
  useActivityTracking()
  useEffect(() => { preloadMatchScreens() }, [])
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
  // The route shell depends on phase/seats, not the online clock or every move snapshot.
  const roomPhase = useSessionStore(state => state.mode === 'online' ? state.room?.game.phase : null)
  const session = useSessionStore.getState()
  const room = session.mode === 'online' ? session.room : null
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
  if (roomPhase === 'playing' && room) {
    const self = room.players.find(player => player.id === socket.id)
    liveParticipant.current = self ? { room: room.id, side: self.side, completed: room.lastCompletedMatch?.id } : null
    leaveResult.current = null
  }
  if (screen !== 'game') { liveParticipant.current = null; leaveResult.current = null }
  const liveRoomKey = useSessionStore(state => state.mode === 'online' ? state.room?.id : 'local')
  const enteredRoom = useRef<string | undefined>(undefined)
  const skipEntrance = screen === 'game' && liveRoomKey !== 'local' && enteredRoom.current === liveRoomKey
  const [keepHome, setKeepHome] = useState(screen === 'home')
  const [keepComputer, setKeepComputer] = useState(screen === 'computer')
  const finishEntrance = useCallback(() => {
    setKeepHome(false)
    setKeepComputer(false)
  }, [])
  const finishPositionEntrance = useCallback(() => setKeepComputer(false), [])
  useLayoutEffect(() => {
    if (screen === 'home') { setKeepHome(true); setKeepComputer(false) }
    if (screen === 'computer') setKeepComputer(true)
    // Keep the current setup screen mounted until the lazy GamePage has
    // rendered and completed its entrance. This lets Suspense show a spinner
    // over the existing screen instead of replacing it with a blank cover.
    enteredRoom.current = screen === 'game' ? liveRoomKey : undefined
  }, [screen, liveRoomKey])
  return <>
    <ChallengeNotifications />
    <HomeRewardNotifications />
    <WelcomeAnnouncement active={screen === 'home'} />
    
    {(screen === 'home' || keepHome) && <div className="w-full" inert={screen !== 'home'} aria-hidden={screen !== 'home'}><HomePage /></div>}
    {(screen === 'computer' || keepComputer) && <div className="fixed inset-0" inert={screen !== 'computer'} aria-hidden={screen !== 'computer'}><ComputerPage onEntranceComplete={finishEntrance} /></div>}
    <Suspense fallback={<HovangLoadingOverlay label="Đang tải màn hình" />}>
      {(screen === 'game' || screen === 'replay' && replay) && <div className="fixed inset-0"><GamePage key={screen === 'replay' ? replay?.id : liveRoomKey} presentationKey={liveSeatKey} initialResultSide={leaveResult.current?.key === liveSeatKey ? leaveResult.current.side : undefined} skipEntrance={skipEntrance || keepComputer} replayData={screen === 'replay' ? replay ?? undefined : undefined} onEntranceComplete={finishEntrance} /></div>}
      {screen === 'rooms' && <div className="fixed inset-0"><RoomSelectionPage onEntranceComplete={finishEntrance} /></div>}
      {screen === 'position' && <div className="fixed inset-0"><CustomPositionPage onEntranceComplete={finishPositionEntrance} /></div>}
      {screen === 'shop' && <ShopPage />}
    </Suspense>
    <EnergyNotice />
  </>
}



