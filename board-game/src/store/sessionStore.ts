import { create } from 'zustand'
import type { ChatMessage, RoomSnapshot } from '../types/room'
import type { Side } from '../types/game'

export type ComputerEngine = 'basic' | 'pikafish'
export interface MatchLikeRecord { matchId: string; actorId: string; targetSide: Side }

interface SessionStore {
  matchLikeRecords: MatchLikeRecord[]
  recordMatchLike: (record: MatchLikeRecord) => void
  clearMatchLikes: (matchId: string) => void
  screen: 'home' | 'rooms' | 'computer' | 'game'
  mode: 'local' | 'online' | 'computer'
  computerEngine: ComputerEngine
  humanSide: Side
  name: string
  lobbyOpen: boolean
  room: RoomSnapshot | null
  messages: ChatMessage[]
  notice: string
  setName: (name: string) => void
  joinLocal: () => void
  enterOnline: (room: RoomSnapshot) => void
  receiveRoom: (room: RoomSnapshot) => void
  leave: (notice?: string) => void
  append: (text: string, system?: boolean) => void
  setNotice: (notice: string) => void
}
export const useSessionStore = create<SessionStore>()((set, get) => ({
  screen: 'home', mode: 'local', computerEngine: 'basic', humanSide: 'red', name: 'Picolozz', lobbyOpen: false, room: null, matchLikeRecords: [],
  messages: [{ id: 'welcome', name: '', text: 'Picolozz đã vào phòng.', system: true }], notice: '',
  setName: name => set({ name: name.trim().slice(0, 24) }),
  joinLocal: () => {
    set({ screen: 'game', mode: 'local', computerEngine: 'basic', humanSide: 'red', lobbyOpen: false, room: null, notice: '' })
    get().append(`${get().name} đã vào phòng.`, true)
  },
  enterOnline: room => set({ screen: 'game', room, mode: 'online', lobbyOpen: false, notice: '' }),
  receiveRoom: room => set(state => state.mode === 'online' && state.room?.id === room.id ? { room } : {}),
  leave: (notice = '') => set({ screen: 'home', room: null, mode: 'local', computerEngine: 'basic', humanSide: 'red', lobbyOpen: false, notice }),
  append: (text, system = false) => set(state => ({ messages: [...state.messages, {
    id: crypto.randomUUID(), name: system ? '' : state.name, text: text.trim().slice(0, 300), system,
  }].slice(-100) })),
  recordMatchLike: record => set(state => state.matchLikeRecords.some(existing => existing.matchId === record.matchId && existing.actorId === record.actorId) ? state : { matchLikeRecords: [...state.matchLikeRecords, record] }),
  clearMatchLikes: matchId => set(state => {
    const matchLikeRecords = state.matchLikeRecords.filter(record => record.matchId !== matchId)
    return matchLikeRecords.length === state.matchLikeRecords.length ? state : { matchLikeRecords }
  }),
  setNotice: notice => set({ notice }),
}))
