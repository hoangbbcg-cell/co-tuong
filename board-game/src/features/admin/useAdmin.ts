import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { adminApi } from '../../services/adminApi'
import { errorMessage } from '../../services/api'
import type { AdminChange, AdminUser } from '../../types/admin'

export function useAdmin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [users, setUsers] = useState<{ publicId: string; name: string }[]>([])
  const [catalog, setCatalog] = useState<{ code: string; title: string }[]>([])
  const [target, setTarget] = useState<AdminUser | null>(null)
  const busy = useRef(false)
  const run = async (action: () => Promise<void>) => {
    if (busy.current) return
    busy.current = true; setLoading(true); setError(''); setNotice('')
    try { await action() }
    catch (e) {
      setError(errorMessage(e))
      if (axios.isAxiosError(e) && e.response?.status === 401) { setAuthenticated(false); setTarget(null); setUsers([]); setCatalog([]) }
    } finally { busy.current = false; setLoading(false) }
  }
  useEffect(() => {
    let alive = true
    void adminApi.me().then(() => { if (alive) setAuthenticated(true) }).catch(() => {}).finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])
  useEffect(() => {
    if (!authenticated) return
    let alive = true
    void adminApi.catalog().then(data => { if (alive) setCatalog(data) }).catch(e => { if (alive) setError(errorMessage(e)) })
    return () => { alive = false }
  }, [authenticated])
  return {
    authenticated, loading, error, notice, users, catalog, target,
    login: (password: string) => run(async () => { await adminApi.login(password); setAuthenticated(true) }),
    logout: () => run(async () => { await adminApi.logout(); setAuthenticated(false); setTarget(null); setUsers([]); setCatalog([]) }),
    search: (q: string) => run(async () => { setUsers(await adminApi.search(q)) }),
    select: (id: string) => run(async () => { setTarget(await adminApi.user(id)) }),
    apply: (command: AdminChange) => run(async () => {
      if (!target) return
      setTarget(await adminApi.change(target.profile.publicId, command))
      setNotice('Đã lưu thay đổi. Người chơi tải lại trang để nhận dữ liệu mới.')
    }),
  }
}
