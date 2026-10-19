import axios from 'axios'
import type { AdminChange, AdminUser } from '../types/admin'
const api = axios.create({ baseURL: '/api/admin', timeout: 15000 })
export const adminApi = {
  me: async () => { await api.get('/me') },
  login: async (password: string) => { await api.post('/login', { password }) },
  logout: async () => { await api.post('/logout') },
  search: async (q: string) => (await api.get<{ publicId: string; name: string }[]>('/users', { params: { q } })).data,
  user: async (id: string) => (await api.get<AdminUser>(`/users/${id}`)).data,
  catalog: async () => (await api.get<{ code: string; title: string }[]>('/catalog')).data,
  change: async (id: string, input: AdminChange) => (await api.post<AdminUser>(`/users/${id}`, input)).data,
}
