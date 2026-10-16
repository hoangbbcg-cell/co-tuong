import axios from 'axios'
import type { Move } from '../types/game'

const api = axios.create({ baseURL: '/api/pikafish', timeout: 20000 })
export const pikafishApi = {
  ready: async (signal?: AbortSignal) => { await api.get('/ready', { signal }) },
  move: async (moves: string[], remainingMs: number, level: number, signal: AbortSignal, initialFen?: string, thinkMs?: number) =>
    (await api.post<{ move: Move }>('/move', { moves, remainingMs, level, ...(initialFen ? { initialFen } : {}), ...(thinkMs !== undefined ? { thinkMs } : {}) }, { signal })).data.move,
}
