import axios from 'axios'
import type { Move } from '../types/game'

const api = axios.create({ baseURL: '/api/pikafish', timeout: 20000 })
export const pikafishApi = {
  ready: async (signal?: AbortSignal) => { await api.get('/ready', { signal }) },
  move: async (moves: string[], remainingMs: number, signal: AbortSignal) =>
    (await api.post<{ move: Move }>('/move', { moves, remainingMs }, { signal })).data.move,
}
