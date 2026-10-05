import { create } from 'zustand'
import type { ChatMessage, RoomSnapshot } from '../types/room'
import type { Side } from '../types/game'
import { ENERGY_RECOVERY_MS, recoverEnergy } from '../lib/energy'
import { DEFAULT_PLAYER_ELO } from '../lib/rankProgression'

export type ComputerEngine = 'basic' | 'pikafish'
export interface MatchLikeRecord { matchId: string; actorId: string; targetSide: Side }

interface SessionStore {
  elo: number
  energy: number
  energyRecoveryAt: number | null
  recoverEnergy: (now?: number) => void
  gold: number
  consumeEnergy: () => void
  matchLikeRecords: MatchLikeRecord[]
  recordMatchLike: (record: MatchLikeRecord) => void
  clearMatchLikes: (matchId: string) => void
  screen: 'home' | 'rooms' | 'computer' | 'game'
  mode: 'local' | 'online' | 'computer'
  computerEngine: ComputerEngine
  humanSide: Side
  name: string
  avatarFrameIndex: number
  setAvatarFrameIndex: (avatarFrameIndex: number) => void
  avatarIndex: number
  setAvatarIndex: (avatarIndex: number) => void
  lobbyOpen: boolean
  room: RoomSnapshot | null
  messages: ChatMessage[]
  notice: string
  setName: (name: string) => void
  joinLocal: () => void
  enterOnline: (room: RoomSnapshot) => void
  receiveRoom: (room: RoomSnapshot, playerId?: string) => void
  leave: (notice?: string) => void
  append: (text: string, system?: boolean) => void
  setNotice: (notice: string) => void
}
export const useSessionStore = create<SessionStore>()((set, get) => ({
  elo: DEFAULT_PLAYER_ELO,
  energy: 5,
  energyRecoveryAt: null,
  recoverEnergy: (now = Date.now()) => set(state => {
    const next = recoverEnergy(state.energy, state.energyRecoveryAt, now)
    return next.energy === state.energy && next.energyRecoveryAt === state.energyRecoveryAt ? state : next
  }),
  gold: 100000,
  consumeEnergy: () => set(state => {
    const now = Date.now()
    const recovered = recoverEnergy(state.energy, state.energyRecoveryAt, now)
    return { energy: Math.max(0, recovered.energy - 1), energyRecoveryAt: recovered.energyRecoveryAt ?? now + ENERGY_RECOVERY_MS }
  }),
  screen: 'home', mode: 'local', computerEngine: 'basic', humanSide: 'red', name: 'Picolozz', lobbyOpen: false, room: null, matchLikeRecords: [],
  messages: [{ id: 'welcome', name: '', text: 'Picolozz đã vào phòng.', system: true }], notice: '',
  setName: name => set({ name: name.trim().slice(0, 24) }),
  avatarFrameIndex: 0,
  setAvatarFrameIndex: avatarFrameIndex => set({ avatarFrameIndex }),
  avatarIndex: 0,
  setAvatarIndex: avatarIndex => set({ avatarIndex }),
  joinLocal: () => {
    set({ screen: 'game', mode: 'local', computerEngine: 'basic', humanSide: 'red', lobbyOpen: false, room: null, notice: '' })
    get().append(`${get().name} đã vào phòng.`, true)
  },
  enterOnline: room => set({ screen: 'game', room, mode: 'online', lobbyOpen: false, notice: '' }),
  receiveRoom: (room, playerId) => {
    const state = get()
    if (state.mode !== 'online' || state.room?.id !== room.id) return
    const started = state.room.game.phase !== 'playing' && room.game.phase === 'playing' && room.players.some(player => player.id === playerId)
    set({ room })
    if (started) get().consumeEnergy()
  },
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
