import { playerNameError } from '../lib/playerName'
import { readGuestEntry } from '../lib/guestIdentity'
import { create } from 'zustand'
import type { ChatMessage, RoomSnapshot } from '../types/room'
import type { Side } from '../types/game'
import { ENERGY_RECOVERY_MS, MAX_ENERGY, recoverEnergy } from '../lib/energy'
import { DEFAULT_PLAYER_ELO } from '../lib/rankProgression'
import { createClientId } from '../lib/clientId'
import { COUNTRY_CODES, readProfileLocation, saveProfileLocation } from '../lib/profileLocation'
import type { AccountProfile } from '../types/account'
import { accountApi } from '../services/accountApi'

export type ComputerEngine = 'basic' | 'pikafish' | 'hovang'
export interface MatchLikeRecord { matchId: string; actorId: string; targetSide: Side }

interface SessionStore {
  account: AccountProfile | null
  address: string
  province: string
  countryCode: string | null
  setAddress: (address: string, province: string, countryCode?: string) => void
  elo: number
  energy: number
  energyRecoveryAt: number | null
  energyNoticeOpen: boolean
  energyVideoUnavailable: boolean
  showEnergyNotice: () => void
  dismissEnergyNotice: () => void
  showEnergyVideoUnavailable: () => void
  recoverEnergy: (now?: number) => void
  gold: number
  consumeEnergy: () => void
  friendshipOverrides: Record<string, boolean>
  pendingFriendRequests: Record<string, boolean>
  incomingFriendRequestOverrides: Record<string, boolean>
  setIncomingFriendRequest: (name: string, pending: boolean) => void
  followedPlayers: Record<string, boolean>
  togglePlayerFollow: (name: string) => void
  setFriendRequestPending: (name: string, pending: boolean) => void
  friendRemovalConfirmationMutedUntil: number | null
  setFriendRemovalConfirmationMutedUntil: (until: number | null) => void
  setFriendship: (name: string, isFriend: boolean) => void
  matchLikeRecords: MatchLikeRecord[]
  recordMatchLike: (record: MatchLikeRecord) => void
  clearMatchLikes: (matchId: string) => void
  screen: 'home' | 'rooms' | 'computer' | 'position' | 'game' | 'replay' | 'shop'
  mode: 'local' | 'online' | 'computer'
  computerDemo: boolean
  testBotId?: string
  testBotGold?: number
  computerDemoQueued: boolean
  customPositionTrial: boolean
  computerEngine: ComputerEngine
  selectedComputerEngine: 'pikafish' | 'hovang'
  computerLevel: number
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
  account:null,
  address: readProfileLocation()?.address ?? 'TP. Hồ Chí Minh',
  province: readProfileLocation()?.province ?? 'Thành phố Hồ Chí Minh',
  countryCode: readProfileLocation()?.countryCode ?? null,
  setAddress: (address, province, countryCode = 'VN') => {
    if (get().countryCode || !COUNTRY_CODES.includes(countryCode)) return
    const location = { address, province, countryCode }
    saveProfileLocation(location)
    set(location)
  },
  elo: DEFAULT_PLAYER_ELO,
  energy: MAX_ENERGY,
  energyRecoveryAt: null,
  energyNoticeOpen: false,
  energyVideoUnavailable: false,
  showEnergyNotice: () => set({ energyNoticeOpen: true, energyVideoUnavailable: false }),
  dismissEnergyNotice: () => set({ energyNoticeOpen: false, energyVideoUnavailable: false }),
  showEnergyVideoUnavailable: () => set({ energyVideoUnavailable: true }),
  recoverEnergy: (now = Date.now()) => set(state => {
    if(state.account)return state
    const next = recoverEnergy(state.energy, state.energyRecoveryAt, now)
    return next.energy === state.energy && next.energyRecoveryAt === state.energyRecoveryAt ? state : next
  }),
  gold: 10_000_000,
  consumeEnergy: () => set(state => {
    if(state.account){
      if(state.account.energyUnlimited)return state
      void accountApi.request.post('/demo-energy',{id:createClientId()}).then(()=>accountApi.me()).then(profile=>set({account:profile,energy:profile.energy,energyRecoveryAt:profile.energyRecoveryAt})).catch(()=>set({notice:'Không trừ được năng lượng. Vui lòng thử lại.'}))
      return state
    }
    const now = Date.now()
    const recovered = recoverEnergy(state.energy, state.energyRecoveryAt, now)
    return { energy: Math.max(0, recovered.energy - 1), energyRecoveryAt: recovered.energyRecoveryAt ?? now + ENERGY_RECOVERY_MS }
  }),
  screen: 'home', mode: 'local', computerDemo: false, computerDemoQueued: false, customPositionTrial: false, computerEngine: 'basic', selectedComputerEngine: 'pikafish', computerLevel: 2, humanSide: 'red', name: readGuestEntry()?.name ?? 'Picolozz', lobbyOpen: false, room: null, friendshipOverrides: {}, pendingFriendRequests: {}, friendRemovalConfirmationMutedUntil: null, matchLikeRecords: [],
  messages: [{ id: 'welcome', name: '', text: 'Picolozz đã vào phòng.', system: true }], notice: '',
  setName: name => { if (!playerNameError(name)) set({ name: name.trim().normalize('NFC') }) },
  setFriendship: (name, isFriend) => set(state => ({ friendshipOverrides: { ...state.friendshipOverrides, [name]: isFriend }, pendingFriendRequests: isFriend ? { ...state.pendingFriendRequests, [name]: false } : state.pendingFriendRequests })),
  setFriendRequestPending: (name, pending) => set(state => ({ pendingFriendRequests: { ...state.pendingFriendRequests, [name]: pending } })),
  followedPlayers: {},
  incomingFriendRequestOverrides: {},
  setIncomingFriendRequest: (name, pending) => set(state => ({ incomingFriendRequestOverrides: { ...state.incomingFriendRequestOverrides, [name]: pending } })),
  togglePlayerFollow: name => set(state => ({ followedPlayers: { ...state.followedPlayers, [name]: !state.followedPlayers[name] } })),
  setFriendRemovalConfirmationMutedUntil: until => set({ friendRemovalConfirmationMutedUntil: until }),
  avatarFrameIndex: 0,
  setAvatarFrameIndex: avatarFrameIndex => set({ avatarFrameIndex }),
  avatarIndex: 0,
  setAvatarIndex: avatarIndex => set({ avatarIndex }),
  joinLocal: () => {
    set({ screen: 'game', mode: 'local', testBotId: undefined, testBotGold: undefined, computerDemo: false, computerDemoQueued: false, customPositionTrial: false, computerEngine: 'basic', humanSide: 'red', lobbyOpen: false, room: null, notice: '' })
    get().append(`${get().name} đã vào phòng.`, true)
  },
  enterOnline: room => set({ screen: 'game', room, mode: 'online', testBotId: undefined, testBotGold: undefined, computerDemo: false, computerDemoQueued: false, customPositionTrial: false, lobbyOpen: false, notice: '' }),
  receiveRoom: (room, playerId) => {
    const state = get()
    if (state.mode !== 'online' || state.room?.id !== room.id) return
    const started = state.room.game.phase !== 'playing' && room.game.phase === 'playing' && room.players.some(player => player.id === playerId)
    set({ room })
    if (started && !get().account) get().consumeEnergy()
  },
  leave: (notice = '') => set({ screen: 'home', room: null, mode: 'local', testBotId: undefined, testBotGold: undefined, computerDemo: false, computerDemoQueued: false, customPositionTrial: false, computerEngine: 'basic', humanSide: 'red', lobbyOpen: false, notice }),
  append: (text, system = false) => set(state => ({ messages: [...state.messages, {
    id: createClientId(), name: system ? '' : state.name, text: text.trim().slice(0, 300), system,
  }].slice(-100) })),
  recordMatchLike: record => set(state => state.matchLikeRecords.some(existing => existing.matchId === record.matchId && existing.actorId === record.actorId) ? state : { matchLikeRecords: [...state.matchLikeRecords, record] }),
  clearMatchLikes: matchId => set(state => {
    const matchLikeRecords = state.matchLikeRecords.filter(record => record.matchId !== matchId)
    return matchLikeRecords.length === state.matchLikeRecords.length ? state : { matchLikeRecords }
  }),
  setNotice: notice => set({ notice }),
}))
