import { useState } from 'react'
import { useAdmin } from '../../features/admin/useAdmin'
import { ADMIN_AVATARS, ADMIN_FRAMES } from '../../types/admin'
import type { AdminChange, AdminUser } from '../../types/admin'

const input = 'w-full rounded border border-[#9b784b] bg-[#21170f] px-3 py-2 text-[#fff1cf]'
const button = 'rounded border border-[#bd904d] bg-[#72451f] px-4 py-2 font-semibold text-[#fff1cf] hover:brightness-110 disabled:opacity-50'

export function AdminPage() {
  const admin = useAdmin()
  const [password, setPassword] = useState('')
  const [query, setQuery] = useState('')
  return <main className="min-h-dvh bg-[#17110d] p-5 font-sans text-[#f8e9cd]">
    <div className="mx-auto max-w-6xl space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#745433] pb-4">
        <h1 className="text-2xl font-bold">Quản trị Cờ Tướng</h1>
        <div className="flex gap-3"><a href="/" className={button}>Về trò chơi</a>{admin.authenticated && <button className={button} disabled={admin.loading} onClick={() => void admin.logout()}>Đăng xuất quản trị</button>}</div>
      </header>
      {admin.error && <p role="alert" className="rounded border border-red-500 bg-red-950 p-3">{admin.error}</p>}
      {admin.notice && <p role="status" className="rounded border border-green-700 bg-green-950 p-3">{admin.notice}</p>}
      {!admin.authenticated ? <form className="mx-auto max-w-sm space-y-4 rounded-xl border border-[#745433] p-6" onSubmit={event => { event.preventDefault(); void admin.login(password).then(() => setPassword('')) }}>
        <h2 className="text-xl font-semibold">Đăng nhập quản trị</h2>
        <label className="block">Mật khẩu<input className={`${input} mt-2`} type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required maxLength={128} /></label>
        <button className={button} disabled={admin.loading}>Đăng nhập</button>
      </form> : <>
        <form className="flex flex-wrap gap-3" onSubmit={event => { event.preventDefault(); void admin.search(query) }}>
          <input aria-label="ID hoặc tên người chơi" className={`${input} max-w-md`} placeholder="Nhập ID 8 số hoặc tên người chơi" value={query} onChange={event => setQuery(event.target.value)} maxLength={100} />
          <button className={button} disabled={admin.loading}>Tìm người chơi</button>
        </form>
        <div className="grid gap-5 md:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="space-y-2">{admin.users.map(user => <button key={user.publicId} disabled={admin.loading} className={`${button} block w-full text-left`} onClick={() => void admin.select(user.publicId)}>{user.name}<span className="block text-sm">ID: {user.publicId}</span></button>)}</aside>
          {admin.target ? <AdminEditor key={`${admin.target.profile.id}:${admin.target.audit[0]?.id ?? ''}`} target={admin.target} catalog={admin.catalog} busy={admin.loading} onApply={admin.apply} /> : <p>Chọn người chơi để xem và chỉnh tài khoản.</p>}
        </div>
      </>}
      {admin.loading && <p role="status">Đang xử lý...</p>}
    </div>
  </main>
}

function AdminEditor({ target, catalog, busy, onApply }: { target: AdminUser; catalog: { code: string; title: string }[]; busy: boolean; onApply: (command: AdminChange) => Promise<void> }) {
  const p = target.profile
  const [gold, setGold] = useState(p.gold)
  const [energy, setEnergy] = useState(String(p.energy))
  const [xiangqi, setXiangqi] = useState(String(p.stats.find(s => s.variant === 'xiangqi')?.elo ?? 1000))
  const [jieqi, setJieqi] = useState(String(p.stats.find(s => s.variant === 'jieqi')?.elo ?? 1000))
  const [reason, setReason] = useState('')
  const [action, setAction] = useState<'avatar' | 'frame' | 'honor'>('avatar')
  const [code, setCode] = useState('avatar-0')
  const [equip, setEquip] = useState(true)
  const choices = action === 'avatar' ? ADMIN_AVATARS : action === 'frame' ? ADMIN_FRAMES : catalog.map(item => ({ code: item.code, name: item.title }))
  const send = (command: Omit<Extract<AdminChange, { action: 'resources' }>, 'reason' | 'requestId'> | Omit<Exclude<AdminChange, { action: 'resources' }>, 'reason' | 'requestId'>) => onApply({ ...command, reason, requestId: crypto.randomUUID() })
  return <section className="min-w-0 space-y-5">
    <h2 className="text-xl font-bold">{p.displayName} · ID {p.publicId}</h2>
    <label className="block">Lý do chỉnh sửa<input className={`${input} mt-1`} value={reason} onChange={event => setReason(event.target.value)} minLength={3} maxLength={300} placeholder="Ví dụ: Cấp tài nguyên kiểm thử" /></label>
    <form className="space-y-3 rounded-lg border border-[#745433] p-4" onSubmit={event => { event.preventDefault(); void send({ action: 'resources', gold: Number(gold), energy: Number(energy), xiangqi: Number(xiangqi), jieqi: Number(jieqi) }) }}>
      <h3 className="text-lg font-semibold">Đặt số dư và Elo</h3>
      <div className="grid grid-cols-2 gap-3">{[{ label: 'Vàng', value: gold, set: setGold, max: 1_000_000_000 }, { label: 'Năng lượng', value: energy, set: setEnergy, max: 1_000_000 }, { label: 'Elo Cờ Tướng', value: xiangqi, set: setXiangqi, max: 1_000_000 }, { label: 'Elo Cờ Úp', value: jieqi, set: setJieqi, max: 1_000_000 }].map(field => <label key={field.label}>{field.label}<input className={`${input} mt-1`} type="number" min={0} max={field.max} step={1} required value={field.value} onChange={event => field.set(event.target.value)} /></label>)}</div>
      <button className={button} disabled={busy || reason.trim().length < 3}>Lưu tài nguyên và Elo</button>
    </form>
    <form className="space-y-3 rounded-lg border border-[#745433] p-4" onSubmit={event => { event.preventDefault(); void send({ action, code, equip }) }}>
      <h3 className="text-lg font-semibold">Cấp vật phẩm / danh hiệu</h3>
      <label className="block">Loại<select className={input} value={action} onChange={event => { const value = event.target.value as typeof action; setAction(value); setCode(value === 'avatar' ? 'avatar-0' : value === 'frame' ? 'frame-0' : catalog[0]?.code ?? '') }}><option value="avatar">Avatar</option><option value="frame">Khung avatar</option><option value="honor">Danh hiệu</option></select></label>
      <label className="block">Vật phẩm<select className={input} value={code} onChange={event => setCode(event.target.value)}>{choices.map(item => <option key={item.code} value={item.code}>{item.name} ({item.code})</option>)}</select></label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={equip} onChange={event => setEquip(event.target.checked)} />Trang bị / hiển thị ngay</label>
      <button className={button} disabled={busy || !code || reason.trim().length < 3}>Cấp cho người chơi</button>
      <p className="text-sm">Đang dùng: {p.avatarCode}, {p.avatarFrameCode}. Đã cấp: {target.cosmetics.map(item => item.code).join(', ') || 'Chưa có'}. Danh hiệu sở hữu: {target.honors.length}.</p>
    </form>
    <section className="space-y-2"><h3 className="text-lg font-semibold">Lịch sử chỉnh sửa gần nhất</h3>{target.audit.map(log => <details key={log.id} className="rounded border border-[#745433] p-3"><summary>{new Date(log.createdAt).toLocaleString('vi-VN')} · {log.action} · {log.reason}</summary><pre className="mt-2 overflow-auto whitespace-pre-wrap text-sm">{JSON.stringify({ trước: log.before, sau: log.after }, null, 2)}</pre></details>)}</section>
  </section>
}
