import axios from 'axios'
import type { Move } from '../types/game'

const api = axios.create({ baseURL: '/api/fairy-stockfish', timeout: 20_000 })
export const fairyStockfishApi = {
  ready: async (signal?: AbortSignal) => { await api.get('/ready', { signal }) },
  move: async (moves: string[], remainingMs: number, level: number, signal: AbortSignal, initialFen?: string) =>
    (await api.post<{ move: Move }>('/move', { moves, remainingMs, level, ...(initialFen ? { initialFen } : {}) }, { signal })).data.move,
}
