import { ChallengeNotifications } from './ChallengeNotifications'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { GamePage } from '../pages/game/GamePage'
import { useRoomConnection } from './useRoomConnection'
import { useEnergyRecovery } from './useEnergyRecovery'
import { useSessionStore } from '../store/sessionStore'
import { HomePage } from '../pages/home/HomePage'
import { ShopPage } from '../pages/shop/ShopPage'
import { RoomSelectionPage } from '../pages/rooms/RoomSelectionPage'
import { ComputerPage } from '../pages/computer/ComputerPage'
import { CustomPositionPage } from '../pages/computer/CustomPositionPage'
import { EnergyNotice } from '../features/game/components/EnergyNotice'
import { useSavedMatches } from '../store/savedMatchesStore'

export function App() {
  useRoomConnection()
  useEnergyRecovery()
  const screen = useSessionStore(state => state.screen)
  const liveSeatKey = useSessionStore(state => state.mode === 'online' && state.room
    ? JSON.stringify([state.room.id, ...state.room.players.map(player => player.id).sort()])
    : 'local')
  const replay = useSavedMatches(state => state.replay)
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
    {(screen === 'home' || keepHome) && <div className="w-full" inert={screen !== 'home'} aria-hidden={screen !== 'home'}><HomePage /></div>}
    {(screen === 'game' || screen === 'replay' && replay) && <div className="fixed inset-0"><GamePage key={screen === 'replay' ? replay?.id : liveSeatKey} skipEntrance={skipEntrance} replayData={screen === 'replay' ? replay ?? undefined : undefined} onEntranceComplete={finishEntrance} /></div>}
    {screen === 'rooms' && <div className="fixed inset-0"><RoomSelectionPage onEntranceComplete={finishEntrance} /></div>}
    {screen === 'computer' && <div className="fixed inset-0"><ComputerPage onEntranceComplete={finishEntrance} /></div>}
    {screen === 'position' && <div className="fixed inset-0"><CustomPositionPage /></div>}
    {screen === 'shop' && <ShopPage />}
    <EnergyNotice />
  </>
}
