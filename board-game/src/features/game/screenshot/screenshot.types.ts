import type { Move, PieceType, Position, Side } from '../../../types/game'

export interface ScreenshotPiece {
  side: Side
  type: PieceType
  concealed: boolean
}

export interface ScreenshotPlayer {
  name: string
  elo: number
  clock: string
  active: boolean
  ready: boolean
  outcome?: 'win' | 'loss'
}

export interface ScreenshotSnapshotData {
  board: Array<Array<ScreenshotPiece | null>>
  bottomSide: Side
  currentTurn: Side
  phase: 'ready' | 'playing' | 'finished'
  lastMove: Move | null
  selected: Position | null
  legalMoves: Position[]
  red: ScreenshotPlayer
  black: ScreenshotPlayer
}

export interface ScreenshotSnapshot extends ScreenshotSnapshotData {
  version: number
}

export interface ScreenshotAssetUrls {
  background: string
  board: string
  moveMarker: string
  avatar: string
  avatarFallback: string
  nameFrame: string
  eloFrame: string
  pieces: Record<Side, Record<PieceType, string>>
}

export type ScreenshotWorkerRequest =
  | { type: 'init'; assets: ScreenshotAssetUrls }
  | { type: 'render'; snapshot: ScreenshotSnapshot }

export type ScreenshotWorkerResponse =
  | { type: 'ready' }
  | { type: 'rendered'; version: number; blob: Blob; durationMs: number }
  | { type: 'error'; version?: number; message: string }
