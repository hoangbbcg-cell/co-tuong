import type { GameState, Move, Side } from './game'
import type { RecordedMatch } from './recordedMatch'
import type { ChallengeProfile, ChallengeInvite, ChallengeResult, ChallengeAccepted } from './challenge'

export interface ChatMessage { id: string; name: string; text: string; system: boolean }
export interface RoomPlayer { userId?: string; id: string; name: string; side: Side; ready: boolean }
export interface RoomViewer { id: string; name: string; queued: boolean }
export const ROOM_MINUTES = [3, 5, 10, 15, 30] as const
export const ROOM_TURN_SECONDS = [30, 60, 90, 120] as const
export interface RoomSummary { variant?: GameState['variant']; locked?: boolean; id: string; name: string; players: number; viewerCount?: number; playerNames?: string[]; phase: GameState['phase']; minutes?: number; province?: string }
export interface RoomSnapshot {
  locked?: boolean
  readyCountdown?: number | null
  lastCompletedMatch?: RecordedMatch
  province?: string
  turnSeconds?: number
  minutes?: number
  id: string; name: string; players: RoomPlayer[]; viewers?: RoomViewer[]; game: GameState
  messages: ChatMessage[]; drawOffer: Side | null
  takebackOffer?: { requester: Side; plies: 1 | 2 } | null
  takebackDecline?: { id: string; requester: Side; declinedBy: Side } | null
  repetitionNoticePaused?: boolean
  repetitionNoticeKind?: 'warning' | null
  repetitionAttemptNotice?: { id: string; recipient: Side; message: string } | null
  takebackRemaining?: Record<Side, number>
  moveCount?: number
}
export type RoomCommand =
  | { type: 'ready' }
  | { type: 'join-queue' }
  | { type: 'leave-queue' }
  | { type: 'move'; move: Move }
  | { type: 'repetition-notice'; action: 'close' }
  | { type: 'repetition-attempt'; move: Move }
  | { type: 'resign' }
  | { type: 'offer-draw' }
  | { type: 'reply-draw'; accepted: boolean }
  | { type: 'request-takeback' }
  | { type: 'reply-takeback'; accepted: boolean }
  | { type: 'reset' }
export type Reply<T> = { ok: true; data: T } | { ok: false; error: string }
export type Ack<T> = (reply: Reply<T>) => void
export interface ServerEvents {
  'lobby:count': (count: number) => void
  'lobby:province-counts': (counts: Record<string, number>) => void
  'room:state': (room: RoomSnapshot) => void
  'challenge:invite': (invite: ChallengeInvite) => void
  'challenge:result': (result: ChallengeResult) => void
  'challenge:accepted': (result: ChallengeAccepted) => void
}

export interface ClientEvents {
  'lobby:presence': (province: string | null) => void
  'presence:update': (profile: ChallengeProfile, ack: Ack<null>) => void
  'challenge:send': (target: { id?: string; name: string }, ack: Ack<null>) => void
  'challenge:reply': (reply: { id: string; accepted: boolean }, ack: Ack<null>) => void
  'room:join': (input: { roomId: string; name: string; password?: string; asViewer?: boolean }, ack: Ack<RoomSnapshot>) => void
  'room:leave': (ack: Ack<null>) => void
  'game:command': (command: RoomCommand, ack: Ack<RoomSnapshot>) => void
  'chat:send': (text: string, ack: Ack<RoomSnapshot>) => void
}
