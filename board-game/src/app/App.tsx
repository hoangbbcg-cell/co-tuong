import { useCallback, useLayoutEffect, useState } from 'react'
import { GamePage } from '../pages/game/GamePage'
import { useRoomConnection } from './useRoomConnection'
import { useEnergyRecovery } from './useEnergyRecovery'
import { useSessionStore } from '../store/sessionStore'
import { HomePage } from '../pages/home/HomePage'
import { RoomSelectionPage } from '../pages/rooms/RoomSelectionPage'
import { ComputerPage } from '../pages/computer/ComputerPage'

export function App() {
  useRoomConnection()
  useEnergyRecovery()
  const screen = useSessionStore(state => state.screen)
  const [keepHome, setKeepHome] = useState(screen === 'home')
  const finishEntrance = useCallback(() => setKeepHome(false), [])
  useLayoutEffect(() => {
    if (screen === 'home') setKeepHome(true)
  }, [screen])
  return <>
    {(screen === 'home' || keepHome) && <div className="w-full" inert={screen !== 'home'} aria-hidden={screen !== 'home'}><HomePage /></div>}
    {screen === 'game' && <div className="fixed inset-0"><GamePage onEntranceComplete={finishEntrance} /></div>}
    {screen === 'rooms' && <div className="fixed inset-0"><RoomSelectionPage onEntranceComplete={finishEntrance} /></div>}
    {screen === 'computer' && <div className="fixed inset-0"><ComputerPage onEntranceComplete={finishEntrance} /></div>}
  </>
}
