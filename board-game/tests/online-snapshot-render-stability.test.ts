import { afterEach, expect, it, vi } from 'vitest'
import { useSessionStore } from '../src/store/sessionStore'
import { createGame } from '../src/game/state/initial'
import { applyMove } from '../src/game/moves/actions'
import type { RoomSnapshot } from '../src/types/room'
const original = useSessionStore.getState()
afterEach(() => useSessionStore.setState(original, true))
const room = (): RoomSnapshot => ({ id: 'render-room', name: 'Bàn', players: [{id:'one',name:'An',side:'red',ready:true},{id:'two',name:'Bình',side:'black',ready:true}], viewers: [], messages: [], drawOffer: null, moveCount: 0, game: {...createGame(),phase:'playing'} })
it('does not notify the UI again for a duplicate authoritative move ack', () => {
  const current=room();useSessionStore.setState({mode:'online',room:current})
  const listener=vi.fn();const unsubscribe=useSessionStore.subscribe(listener)
  useSessionStore.getState().receiveRoom(structuredClone(current),'one')
  unsubscribe()
  expect(listener).not.toHaveBeenCalled()
  expect(useSessionStore.getState().room).toBe(current)
})
it('updates online clocks while keeping unchanged board, pieces, seats and messages stable', () => {
  const current=room();useSessionStore.setState({mode:'online',room:current})
  const next=structuredClone(current);next.game.remainingTime.red-=250;next.game.turnElapsed+=250;next.game.lastClockUpdate+=250
  useSessionStore.getState().receiveRoom(next,'one')
  const received=useSessionStore.getState().room!
  expect(received.game.remainingTime.red).toBe(next.game.remainingTime.red)
  expect(received.game.board).toBe(current.game.board)
  expect(received.players).toBe(current.players)
  expect(received.messages).toBe(current.messages)
})
it('applies real moves and takebacks without recreating stationary pieces or changing server data', () => {
  const current=room();useSessionStore.setState({mode:'online',room:current})
  const next=structuredClone(current);next.game=applyMove(next.game,{from:{row:6,col:0},to:{row:5,col:0}},0);next.moveCount=1
  useSessionStore.getState().receiveRoom(next,'one')
  const received=useSessionStore.getState().room!
  expect(received).toEqual(next)
  expect(received.game.board[0]).toBe(current.game.board[0])
  expect(received.game.board[9][4]).toBe(current.game.board[9][4])
  expect(received.game.board[5][0]?.id).toBe(current.game.board[6][0]?.id)
  useSessionStore.getState().receiveRoom(structuredClone(current),'one')
  expect(useSessionStore.getState().room).toEqual(current)
})
it('still applies queue/seat, readiness and result updates with unchanged move counts', () => {
  const current=room();useSessionStore.setState({mode:'online',room:current})
  const next=structuredClone(current);next.players[0].ready=false;next.viewers=[{id:'view',name:'Cường',queued:true}];next.game.phase='finished';next.game.result={winner:'black',reason:'resign'}
  useSessionStore.getState().receiveRoom(next,'one')
  expect(useSessionStore.getState().room).toEqual(next)
})