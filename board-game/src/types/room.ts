import type { GameState, Move, Side } from './game'

export interface ChatMessage { id: string; name: string; text: string; system: boolean }
export interface RoomPlayer { id: string; name: string; side: Side; ready: boolean }
export interface RoomViewer { id: string; name: string; queued: boolean }
export const ROOM_MINUTES = [3, 5, 10, 15, 30] as const
export interface RoomSummary { id: string; name: string; players: number; phase: GameState['phase']; minutes?: number }
export interface RoomSnapshot {
  minutes?: number
  id: string; name: string; players: RoomPlayer[]; viewers?: RoomViewer[]; game: GameState
  nextMatchOffer?: { id: string; winner: Side; loser: Side; nextPlayerId: string } | null
  nextMatchDeclinedId?: string | null
  messages: ChatMessage[]; drawOffer: Side | null
  takebackOffer?: { requester: Side; plies: 1 | 2 } | null
  takebackDecline?: { id: string; requester: Side; declinedBy: Side } | null
  takebackRemaining?: Record<Side, number>
  moveCount?: number
}
export type RoomCommand =
  | { type: 'ready' }
  | { type: 'join-queue' }
  | { type: 'leave-queue' }
  | { type: 'move'; move: Move }
  | { type: 'resign' }
  | { type: 'offer-draw' }
  | { type: 'reply-draw'; accepted: boolean }
  | { type: 'reply-next-match'; accepted: boolean }
  | { type: 'request-takeback' }
  | { type: 'reply-takeback'; accepted: boolean }
  | { type: 'reset' }
export type Reply<T> = { ok: true; data: T } | { ok: false; error: string }
export type Ack<T> = (reply: Reply<T>) => void
export interface ServerEvents { 'room:state': (room: RoomSnapshot) => void }
export interface ClientEvents {
  'room:join': (input: { roomId: string; name: string }, ack: Ack<RoomSnapshot>) => void
  'room:leave': (ack: Ack<null>) => void
  'game:command': (command: RoomCommand, ack: Ack<RoomSnapshot>) => void
  'chat:send': (text: string, ack: Ack<RoomSnapshot>) => void
}
