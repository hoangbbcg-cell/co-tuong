import axios from 'axios'
import type { RoomSummary } from '../types/room'

const api = axios.create({ baseURL: '/api', timeout: 8000 })
export const roomApi = {
  list: async (signal?: AbortSignal) => (await api.get<RoomSummary[]>('/rooms', { signal })).data,
  create: async (name: string, minutes = 10) => (await api.post<RoomSummary>('/rooms', { name, minutes })).data,
}
export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) return error.response?.data?.error ?? 'Không kết nối được máy chủ. Hãy kiểm tra backend.'
  return error instanceof Error ? error.message : 'Không thực hiện được thao tác.'
}
