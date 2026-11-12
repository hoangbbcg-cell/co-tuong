const renders = vi.hoisted(() => ({ count: 0 }))
// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, expect, it, vi } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { useSessionStore } from '../src/store/sessionStore'
import type { RoomSnapshot } from '../src/types/room'
vi.mock('../src/app/useRoomConnection', () => ({ useRoomConnection: () => {} }))
vi.mock('../src/app/useEnergyRecovery', () => ({ useEnergyRecovery: () => {} }))
vi.mock('../src/services/socket', () => ({ socket: { id: 'self' } }))
vi.mock('../src/pages/game/GamePage', () => ({ GamePage: () => { renders.count++; return <div data-testid="result">room</div> } }))
vi.mock('../src/app/ChallengeNotifications', () => ({ ChallengeNotifications: () => null }))
vi.mock('../src/pages/home/HomePage', () => ({ HomePage: () => null }))
vi.mock('../src/pages/shop/ShopPage', () => ({ ShopPage: () => null }))
vi.mock('../src/pages/rooms/RoomSelectionPage', () => ({ RoomSelectionPage: () => null }))
vi.mock('../src/pages/computer/ComputerPage', () => ({ ComputerPage: () => null }))
vi.mock('../src/pages/computer/CustomPositionPage', () => ({ CustomPositionPage: () => null }))
vi.mock('../src/features/game/components/EnergyNotice', () => ({ EnergyNotice: () => null }))
let App: typeof import('../src/app/App')['App']

beforeAll(async () => {
  const appModule = await import('../src/app/App')
  App = appModule.App

  // App preloads route modules during import.
  // Wait for all dynamic imports before Vitest can tear down jsdom.
  await vi.dynamicImportSettled()
}, 30000)
afterEach(async () => { cleanup(); useSessionStore.setState({screen:'home',room:null}); await vi.dynamicImportSettled(); renders.count=0 })
it('does not rerender the room shell for online moves, clock snapshots and duplicate acks', async () => {
  const game={...createGame(),phase:'playing' as const}
  const room:RoomSnapshot={id:'stable-render',name:'Room',players:[{id:'self',name:'Self',side:'red',ready:true},{id:'other',name:'Other',side:'black',ready:true}],game,messages:[],drawOffer:null,moveCount:0}
  useSessionStore.setState({screen:'game',mode:'online',room})
  render(<App />)
  const shell=await screen.findByTestId('result');const count=renders.count
  const move=structuredClone(room);move.moveCount=1;move.game.currentTurn='black';move.game.board[5][0]=move.game.board[6][0];move.game.board[6][0]=null;move.game.lastMove={from:{row:6,col:0},to:{row:5,col:0}}
  act(()=>useSessionStore.getState().receiveRoom(move,'self'))
  for(let i=0;i<4;i++){
    const clock=structuredClone(move);clock.game.remainingTime.black-=250*(i+1);clock.game.turnElapsed+=250*(i+1)
    act(()=>useSessionStore.getState().receiveRoom(clock,'self'))
    act(()=>useSessionStore.getState().receiveRoom(structuredClone(clock),'self'))
  }
  expect(screen.getByTestId('result')).toBe(shell)
  expect(renders.count).toBe(count)
  act(()=>useSessionStore.getState().receiveRoom({...move,game:{...move.game,phase:'finished',result:{winner:'red',reason:'resign'}}},'self'))
  expect(renders.count).toBeGreaterThan(count)
})