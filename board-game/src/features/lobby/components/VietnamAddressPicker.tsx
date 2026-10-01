import { useEffect, useMemo, useRef, useState } from 'react'
import {
  useVietnamAdministrativeUnits,
  type AdministrativeProvince,
  type AdministrativeWard,
} from '../hooks/useVietnamAdministrativeUnits'
import { selectionPalette } from '../../../lib/uiClasses'

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLocaleLowerCase('vi').trim()
}

export function VietnamAddressPicker({ onCancel, onSave }: {
  onCancel: () => void
  onSave: (address: string) => void
}) {
  const [step, setStep] = useState<'province' | 'ward'>('province')
  const [province, setProvince] = useState<AdministrativeProvince | null>(null)
  const [ward, setWard] = useState<AdministrativeWard | null>(null)
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const handleTypingToSearch = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return
      const input = searchInputRef.current
      const dialog = input?.closest('dialog')
      const target = event.target
      if (!input || !dialog?.open || (target instanceof Node && target !== document.body && !dialog.contains(target))) return
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]')) return
      event.preventDefault()
      input.focus()
      setSearch(value => value + event.key)
    }
    window.addEventListener('keydown', handleTypingToSearch)
    return () => window.removeEventListener('keydown', handleTypingToSearch)
  }, [])
  const { provinces, wards, provincesLoading, provincesError, retry } =
    useVietnamAdministrativeUnits(true, province?.code ?? null)
  const loading = provincesLoading
  const error = provincesError
  const options = step === 'ward' ? wards : provinces
  const filteredOptions = useMemo(() => {
    const query = normalizeSearch(search)
    if (!query) return options
    return options.filter(option => normalizeSearch(`${option.name} ${option.divisionType}`).includes(query))
  }, [options, search])

  const selectProvince = (selected: AdministrativeProvince) => {
    setProvince(selected)
    setWard(null)
  }
  const returnToProvinces = () => {
    setStep('province')
    setWard(null)
    setSearch('')
  }
  const continueToWards = () => {
    if (!province) return
    setStep('ward')
    setSearch('')
  }
  const pickerButton = 'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[16px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efb75d]'

  return <section aria-label="Chọn địa chỉ" className="flex min-h-0 flex-1 flex-col rounded-xl border-2 border-[#b8782d] bg-[#1c0f08eF] p-3 text-[#f8dea6] shadow-[inset_0_0_0_2px_#532b13,inset_0_0_20px_#120904]">
    <div className="flex shrink-0 items-center gap-2">
      {step === 'ward' && <button type="button" aria-label="Quay lại chọn tỉnh/thành phố" onClick={returnToProvinces} className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#9d6425] bg-[#351a0b] text-[#f1bd58] hover:bg-[#613014] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efb75d]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6M9 12h11" /></svg>
      </button>}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-2xl leading-7 font-bold text-[#ffe5ac]">{step === 'ward' ? 'Chọn xã/phường' : 'Chọn tỉnh/thành phố'}</h3>
      </div>
      {step === 'province' && <span className="shrink-0 text-base font-semibold text-[#e0c38e]">34 tỉnh/thành</span>}
    </div>

    <label htmlFor="profile-address-search" className="sr-only">Tìm tỉnh, thành phố, xã hoặc phường</label>
    <div className="mt-3 flex shrink-0 items-center gap-2 rounded-lg border border-[#b17a36] bg-[#120a06] px-3 shadow-[inset_0_1px_4px_#0009] focus-within:ring-2 focus-within:ring-[#efb75d]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-[#e4b256]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
      <input ref={searchInputRef} id="profile-address-search" type="search" autoComplete="off" autoFocus value={search} onChange={event => setSearch(event.target.value)} placeholder={step === 'ward' ? 'Tìm xã/phường...' : 'Tìm tỉnh/thành phố...'} className="h-11 min-w-0 flex-1 bg-transparent text-[16px] font-medium text-[#ffe5ac] outline-none placeholder:text-[#a68b65]" />
      {search && <button type="button" aria-label="Xóa nội dung tìm kiếm" onClick={() => setSearch('')} className="grid size-7 shrink-0 place-items-center rounded text-[#c6aa77] hover:bg-[#f3dba71a] hover:text-[#ffe8ad]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m7 7 10 10M17 7 7 17" /></svg>
      </button>}
    </div>

    <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#704319] bg-[#170c07b8]">
      <div className="flex shrink-0 items-center border-b border-[#704319] px-3 py-2 text-xs text-[#c6aa77]">
        <span className="text-base leading-4 font-semibold">{step === 'ward' && province ? province.name : 'Việt Nam'}</span>
      </div>
      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
        {loading && <p role="status" className="p-4 text-center text-sm text-[#e5ce9f]">Đang tải danh sách...</p>}
        {error && <div role="alert" className="flex flex-col items-center gap-3 p-4 text-center text-sm text-[#f3c391]">
          <span>{error}</span>
          <button type="button" onClick={retry} className="rounded-md border border-[#c58a35] px-4 py-1.5 font-semibold text-[#ffe5ac] hover:bg-[#613014]">Tải lại</button>
        </div>}
        {!loading && !error && filteredOptions.map(option => {
          const isProvince = step === 'province'
          const selected = isProvince ? province?.code === option.code : ward?.code === option.code
          const optionStyle = selected
            ? `border ${selectionPalette.selected.border} bg-[linear-gradient(110deg,#8b4e1f,#4b260f)] ${selectionPalette.selected.text} ${selectionPalette.selected.glow} ring-1 ring-[#ffe08b]/60`
            : 'border border-[#9d6425] bg-[linear-gradient(110deg,#4a260f,#241207)] text-[#f8dea6] shadow-[inset_0_0_0_1px_#6e3c19] hover:border-[#e2ad53] hover:bg-[#613014]'
          return <button key={option.code} type="button" onClick={() => isProvince ? selectProvince(option as AdministrativeProvince) : setWard(option as AdministrativeWard)} aria-pressed={selected} className={`${pickerButton} ${optionStyle}`}>
            <span className="min-w-0 flex-1 truncate">{option.name}</span>
            {isProvince && <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0 text-[#e4b256]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>}
            {selected && <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-[#f4cc70]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>}
          </button>
        })}
        {!loading && !error && filteredOptions.length === 0 && <p className="p-4 text-center text-sm text-[#c6aa77]">Không tìm thấy kết quả phù hợp.</p>}
      </div>
    </div>

    <div className="mt-3 flex shrink-0 flex-col gap-2">
      <div className="h-5" aria-hidden="true" />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg border border-[#a86e2c] bg-[#351a0b] px-5 py-2 font-bold text-[#f0d69e] hover:bg-[#4b250e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efb75d]">Hủy</button>
        <button type="button" disabled={step === 'province' ? !province : !ward} onClick={() => { if (step === 'province') continueToWards(); else if (province && ward) onSave(`${ward.name}, ${province.name}`) }} className="rounded-lg border-2 border-[#edba5a] bg-[linear-gradient(135deg,#ffe29a,#f1bb5e)] px-5 py-2 font-bold text-[#46220c] shadow-[inset_0_0_0_1px_#fff1c5] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0bf]">{step === 'province' ? 'Tiếp' : 'Lưu địa chỉ'}</button>
      </div>
    </div>
  </section>
}
