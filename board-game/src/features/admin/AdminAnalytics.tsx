import { AdminSearchInput } from './AdminSearchInput'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { adminApi } from '../../services/adminApi'
import { errorMessage } from '../../services/api'
import { ADMIN_USERS_PAGE_SIZE, ACTIVITY_FEATURES, ACTIVITY_PAGES, LOGIN_LABELS, activityLabel } from '../../types/activity'
import type { AnalyticsReport } from '../../types/activity'

const input = 'rounded border border-[#9b784b] bg-[#21170f] px-3 py-2 text-[#fff1cf]'
const button = 'rounded-lg border border-[#bd904d] bg-[#72451f] px-4 py-2 font-medium transition-colors hover:bg-[#925b29] disabled:opacity-50'
const time = (value: string | null) => value ? new Date(value).toLocaleString('vi-VN') : 'Chưa có ghi nhận'
const kindLabel = (kind: string) => kind === 'page' ? 'Vào trang' : kind === 'login' ? 'Đăng nhập' : 'Chức năng'
const defaults = { q: '', days: 7, type: 'all', status: 'all', kind: 'all', code: '', usersOffset: 0, eventsOffset: 0 }

export function AdminAnalytics({ onSessionExpired, onViewUser }: { onSessionExpired?: () => void; onViewUser?: (publicId: string) => void } = {}) {
  const [filters, setFilters] = useState(defaults)
  const [query, setQuery] = useState('')
  const [report, setReport] = useState<AnalyticsReport | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [tab, setTab] = useState<'users' | 'events' | 'usage'>('users')
  const refreshRef = useRef<() => void>(() => {})
  const change = (key: keyof typeof defaults, value: string | number) => {
    setReport(null)
    setFilters(previous => ({ ...previous, usersOffset: 0, eventsOffset: 0, [key]: value }))
  }
  useEffect(() => {
    let alive = true
    let controller: AbortController | undefined
    let pending = false
    let unauthorized = false
    const load = async () => {
      if (pending || unauthorized) return
      pending = true
      controller = new AbortController()
      setLoading(true)
      try {
        const data = await adminApi.analytics(filters, controller.signal)
        if (alive) { setReport(data); setError('') }
      } catch (e) {
        if (alive) {
          if (axios.isAxiosError(e) && e.response?.status === 401) {
            unauthorized = true
            setReport(null)
            onSessionExpired?.()
          }
          setError(errorMessage(e))
        }
      } finally { pending = false; if (alive) setLoading(false) }
    }
    refreshRef.current = () => { void load() }
    void load()
    const interval = window.setInterval(() => { if (document.visibilityState === 'visible') void load() }, 15000)
    return () => { alive = false; controller?.abort(); window.clearInterval(interval) }
  }, [filters, refresh, onSessionExpired])
  const page = (key: 'usersOffset' | 'eventsOffset', delta: number) => {
    setReport(null)
    setFilters(previous => ({ ...previous, [key]: Math.max(0, previous[key] + delta) }))
  }
  return <section aria-label="Thống kê và hoạt động người chơi" id="admin-overview" className="admin-panel admin-analytics space-y-5 rounded-2xl border border-[#745433] bg-[#211810] p-4 shadow-xl sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><p className="admin-eyebrow">TỔNG QUAN HỆ THỐNG</p><h2 className="text-xl font-bold">Người chơi & hoạt động</h2></div>
      <button type="button" className={button} disabled={loading} onClick={() => refreshRef.current()}>Làm mới thống kê</button>
    </div>
    <p className="text-sm text-[#dac6a6]">Đếm tài khoản duy nhất, nhiều tab chỉ tính một. Online là đang kết nối game; offline là không kết nối, kể cả phiên đăng nhập còn hạn. Google/khách theo liên kết hiện tại. Tự cập nhật mỗi 15 giây.</p>
    {error && <div role="alert" className="rounded border border-red-500 p-3">Không tải được thống kê: {error}<button type="button" className={`${button} ml-3`} onClick={() => setRefresh(n => n + 1)}>Thử tải lại</button></div>}
    {report && <>
      <div className="admin-metrics grid grid-cols-2 gap-3 lg:grid-cols-6">{[
        ['Tài khoản đã vào game', report.totals.total], ['Đang online', report.totals.online], ['Đang offline', report.totals.offline],
        ['Tài khoản Google', report.totals.google], ['Tài khoản khách', report.totals.guest], ['Hoạt động trong kỳ', report.totals.activeInPeriod],
      ].map(([label, value]) => <div key={String(label)} className="admin-metric rounded-lg border border-[#745433] bg-[#261b12] p-3"><p className="text-sm">{label}</p><p className="mt-2 text-2xl font-bold tabular-nums">{value === null ? '—' : Number(value).toLocaleString('vi-VN')}</p></div>)}</div>
      <p className="text-xs">Cập nhật: {time(report.generatedAt)}. Các ô tổng tính toàn bộ tài khoản đang hoạt động trong hệ thống; “Hoạt động trong kỳ” theo khoảng thời gian bên dưới.</p>
    </>}
    {report?.activityAvailable === false && <p role="status" className="rounded border border-amber-500 p-3">Nhật ký chưa được kích hoạt trong cơ sở dữ liệu. Tổng tài khoản và online/offline vẫn hiển thị; cần hoàn tất migration 022 để xem lịch sử sử dụng.</p>}
    <form className="admin-filters flex flex-wrap items-end gap-3" onSubmit={event => { event.preventDefault(); change('q', query.trim()) }}>
      <div className="admin-filter-search"><span className="admin-filter-label">Người chơi</span><AdminSearchInput label="Lọc hoạt động theo ID hoặc tên" placeholder="ID 8 số hoặc tên" value={query} onChange={setQuery} onClear={() => { setQuery(''); change('q', ''); setTab('users') }} /></div>
      <button type="submit" className={button}>Lọc người chơi</button>
      <label className="grid gap-1">Thời gian<select className={input} value={filters.days} onChange={e => change('days', Number(e.target.value))}><option value={1}>24 giờ</option><option value={7}>7 ngày</option><option value={30}>30 ngày</option><option value={0}>Toàn bộ nhật ký</option></select></label>
      <label className="grid gap-1">Loại tài khoản<select className={input} value={filters.type} onChange={e => change('type', e.target.value)}><option value="all">Tất cả tài khoản</option><option value="google">Google</option><option value="guest">Khách</option></select></label>
      <label className="grid gap-1">Kết nối<select className={input} value={filters.status} onChange={e => change('status', e.target.value)}><option value="all">Online & offline</option><option value="online">Online</option><option value="offline">Offline</option></select></label>
    </form>
    <nav className="admin-tabs flex flex-wrap gap-2" aria-label="Nhóm thống kê">{([
      ['users', 'Danh sách người chơi'], ['events', 'Nhật ký hoạt động'], ['usage', 'Thống kê chức năng'],
    ] as const).map(([key, label]) => <button key={key} type="button" aria-pressed={tab === key} className={`${button} ${tab === key ? 'bg-[#a36b2f]' : ''}`} onClick={() => setTab(key)}>{label}</button>)}</nav>
    {tab !== 'users' && <div className="flex flex-wrap gap-3">
      <label className="grid gap-1">Loại hoạt động<select className={input} value={filters.kind} onChange={e => { setFilters(f => ({ ...f, code: '' })); change('kind', e.target.value) }}><option value="all">Tất cả hoạt động</option><option value="page">Vào trang</option><option value="feature">Chức năng</option><option value="login">Đăng nhập</option></select></label>
      <label className="grid gap-1">Trang / chức năng<select className={input} value={filters.code} onChange={e => change('code', e.target.value)}><option value="">Tất cả trang / chức năng</option>{[
        ...(filters.kind === 'all' || filters.kind === 'page' ? Object.entries(ACTIVITY_PAGES) : []),
        ...(filters.kind === 'all' || filters.kind === 'feature' ? Object.entries(ACTIVITY_FEATURES) : []),
        ...(filters.kind === 'all' || filters.kind === 'login' ? Object.entries(LOGIN_LABELS) : []),
      ].map(([code, label]) => <option key={code} value={code}>{label}</option>)}</select></label>
    </div>}
    <details className="admin-help"><summary>Cách đọc nhật ký hoạt động</summary><p className="text-sm text-[#dac6a6]">Nhật ký bắt đầu từ lúc triển khai bản này, không khôi phục được lượt dùng cũ. Vào trang và thao tác giao diện do client ghi nhận; đăng nhập và thao tác API thành công do server ghi nhận. Đây là lượt mở/bấm chức năng, không phải số giao dịch hay số ván hoàn tất.</p></details>
    {loading && <p role="status">Đang tải thống kê…</p>}
    {report && <div className="admin-table-wrap overflow-x-auto">
      {tab === 'users' && <>
        <p className="mb-3 text-sm text-[#dac6a6]">Tối đa 30 người mỗi trang · Ưu tiên người đang online</p>
        <table className="w-full min-w-[650px] text-left text-sm"><thead><tr>{['Người chơi', 'Tài khoản', 'Kết nối', 'Tạo tài khoản', 'Hoạt động gần nhất', 'Chi tiết'].map(label => <th key={label} className="p-3">{label}</th>)}</tr></thead><tbody>{report.users.map(user => <tr key={user.id} className="border-t border-[#745433]/50 even:bg-white/[0.025] hover:bg-white/[0.05]">
          <td className="p-3">{user.name}<span className="block text-xs">ID {user.publicId}</span></td><td className="p-3">{user.accountType === 'google' ? 'Google' : 'Khách'}</td><td className="p-3"><span className={user.online ? 'whitespace-nowrap rounded-full bg-emerald-950 px-3 py-1 text-emerald-300' : 'whitespace-nowrap rounded-full bg-stone-800 px-3 py-1 text-stone-300'}>{user.online ? '● Online' : '○ Offline'}</span></td><td className="p-3">{time(user.createdAt)}</td><td className="p-3">{time(user.lastSeenAt)}</td>
          <td className="p-3"><div className="flex flex-wrap gap-2">{onViewUser && <button type="button" className={button} onClick={() => onViewUser(user.publicId)}>Xem chi tiết</button>}<button type="button" className={button} onClick={() => { setQuery(user.publicId); change('q', user.publicId); setTab('events') }}>Xem hoạt động</button></div></td>
        </tr>)}</tbody></table>
        {!report.users.length && <p className="p-3">Không có người chơi phù hợp.</p>}
        <Pagination pageSize={ADMIN_USERS_PAGE_SIZE} offset={filters.usersOffset} hasMore={report.usersHasMore} busy={loading} onPage={delta => page('usersOffset', delta)} />
      </>}
      {tab === 'events' && <>
        <table className="w-full min-w-[600px] text-left text-sm"><thead><tr>{['Thời gian', 'Người chơi', 'Loại', 'Hoạt động'].map(label => <th key={label} className="p-3">{label}</th>)}</tr></thead><tbody>{report.events.map(event => <tr key={event.id} className="border-t border-[#745433]/50 even:bg-white/[0.025] hover:bg-white/[0.05]"><td className="p-3">{time(event.createdAt)}</td><td className="p-3">{event.name} · {event.publicId}</td><td className="p-3">{kindLabel(event.kind)}</td><td className="p-3">{activityLabel(event.kind, event.code)}</td></tr>)}</tbody></table>
        {!report.events.length && <p className="p-3">{report.activityAvailable === false ? 'Nhật ký chưa được kích hoạt.' : 'Chưa có hoạt động trong bộ lọc này.'}</p>}
        <Pagination offset={filters.eventsOffset} hasMore={report.eventsHasMore} busy={loading} onPage={delta => page('eventsOffset', delta)} />
      </>}
      {tab === 'usage' && <>
        <table className="w-full min-w-[450px] text-left text-sm"><thead><tr>{['Loại', 'Trang / chức năng', 'Lượt sử dụng', 'Tài khoản duy nhất'].map(label => <th key={label} className="p-3">{label}</th>)}</tr></thead><tbody>{report.usage.map(item => <tr key={`${item.kind}:${item.code}`} className="border-t border-[#745433]/50 even:bg-white/[0.025] hover:bg-white/[0.05]"><td className="p-3">{kindLabel(item.kind)}</td><td className="p-3">{activityLabel(item.kind, item.code)}</td><td className="p-3">{item.count.toLocaleString('vi-VN')}</td><td className="p-3">{item.users.toLocaleString('vi-VN')}</td></tr>)}</tbody></table>
        {!report.usage.length && <p className="p-3">{report.activityAvailable === false ? 'Thống kê chức năng chưa được kích hoạt.' : 'Chưa có dữ liệu thống kê trong bộ lọc này.'}</p>}
      </>}
    </div>}
  </section>
}

function Pagination({ offset, hasMore, busy, onPage, pageSize = 50 }: { pageSize?: number; offset: number; hasMore: boolean; busy: boolean; onPage: (delta: number) => void }) {
  return <div className="mt-3 flex items-center gap-3"><button type="button" className={button} disabled={busy || offset === 0} onClick={() => onPage(-pageSize)}>Trang trước</button><span>Trang {Math.floor(offset / pageSize) + 1}</span><button type="button" className={button} disabled={busy || !hasMore || offset + pageSize > 100000} onClick={() => onPage(pageSize)}>Trang sau</button></div>
}
