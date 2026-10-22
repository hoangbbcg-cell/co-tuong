import { useEffect, useMemo, useRef, useState } from 'react'
import {
  useVietnamAdministrativeUnits,
  type AdministrativeProvince,
  type AdministrativeWard,
} from '../hooks/useVietnamAdministrativeUnits'
import { selectionPalette } from '../../../lib/uiClasses'
import { COUNTRY_CODES, countryNames } from '../../../lib/profileLocation'
import { CountryFlag } from '../../../lib/CountryFlag'
import { errorMessage } from '../../../services/api'

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLocaleLowerCase('vi').trim()
}

export function VietnamAddressPicker({ onCancel, onSave }: {
  onCancel: () => void
  onSave: (address: string, province: string, countryCode: string, provinceCode?:string, wardCode?:string, wardName?:string) => void | Promise<void>
}) {
  const [country, setCountry] = useState('VN')
  const [choosingCountry, setChoosingCountry] = useState(true)
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)
  const savingRef = useRef(false)
  const save = async (address: string, provinceName: string) => {
    if (savingRef.current) return
    savingRef.current = true
    setSaving(true)
    setSaveError('')
    try { await onSave(address, provinceName, country,province?String(province.code):undefined,ward?String(ward.code):undefined,ward?.name) }
    catch (error) { setSaveError(errorMessage(error)) }
    finally { savingRef.current = false; setSaving(false) }
  }
  const [step, setStep] = useState<'province' | 'ward'>('province')
  const [province, setProvince] = useState<AdministrativeProvince | null>(null)
  const [ward, setWard] = useState<AdministrativeWard | null>(null)
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const pendingCountryTap = useRef<string | null>(null)
  const pendingProvinceTap = useRef<number | null>(null)
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
  const { provinces, wards, provincesLoading, provincesError, wardsLoading, wardsError, retryProvinces, retryWards } =
    useVietnamAdministrativeUnits(!choosingCountry && country === 'VN', province?.code ?? null)
  const loading = step === 'ward' ? wardsLoading : provincesLoading
  const error = step === 'ward' ? wardsError : provincesError
  const retry = step === 'ward' ? retryWards : retryProvinces
  const options = step === 'ward' ? wards : provinces
  const filteredOptions = useMemo(() => {
    const query = normalizeSearch(search)
    if (!query) return options
    return options.filter(option => normalizeSearch(`${option.name} ${option.divisionType}`).includes(query))
  }, [options, search])

  const filteredCountries = COUNTRY_CODES.filter(code => normalizeSearch(`${countryNames.of(code)} ${code}`).includes(normalizeSearch(search)))

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
  const handleProvinceOptionClick = (option: AdministrativeProvince) => {
    if (window.matchMedia('(max-width: 800px)').matches) {
      const isSecondTap = pendingProvinceTap.current === option.code
      pendingProvinceTap.current = isSecondTap ? null : option.code
      selectProvince(option)
      if (!isSecondTap) return
      pendingCountryTap.current = null
      continueToWards()
      return
    }
    selectProvince(option)
  }
  const handleCountryOptionClick = (code: string) => {
    if (window.matchMedia('(max-width: 800px)').matches) {
      const isSecondTap = pendingCountryTap.current === code
      pendingCountryTap.current = isSecondTap ? null : code
      setCountry(code)
      if (!isSecondTap) return
      pendingProvinceTap.current = null
      if (code === 'VN') {
        setSearch('')
        setChoosingCountry(false)
      } else {
        void save(countryNames.of(code) ?? code, '')
      }
      return
    }
    setCountry(code)
  }
  const pickerButton = 'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[16px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efb75d]'
  const backButton = (label: string, onClick: () => void, visibleLabel: string) => <button type="button" aria-label={label} onClick={onClick} className="flex h-12 shrink-0 items-center gap-2 rounded-lg border border-[#9d6425] bg-[#351a0b] px-3 text-base font-semibold text-[#f1bd58] hover:bg-[#613014] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efb75d] compact:h-14 compact:w-14 compact:justify-center compact:p-0">
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 compact:size-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6M9 12h11" /></svg>
    <span className="whitespace-nowrap compact:hidden">{visibleLabel}</span>
  </button>

  return <section aria-label="Chọn địa chỉ" className="flex min-h-0 flex-1 flex-col rounded-xl border-2 border-[#b8782d] bg-[#1c0f08eF] p-3 text-[#f8dea6] shadow-[inset_0_0_0_2px_#532b13,inset_0_0_20px_#120904]">
    {choosingCountry ? <>
      <div className="flex shrink-0 items-center gap-2">
        {backButton('Quay lại thông tin', onCancel, 'Chọn địa chỉ')}
        <h3 className="min-w-0 flex-1 truncate text-2xl font-bold text-[#ffe5ac]">Chọn quốc gia</h3>
      </div>
    <label htmlFor="profile-country-search" className="sr-only">Tìm quốc gia</label>
    <div className="mt-3 flex h-14 shrink-0 items-center gap-3 rounded-lg border border-[#b17a36] bg-[#120a06] px-4 shadow-[inset_0_1px_4px_#0009] focus-within:ring-2 focus-within:ring-[#efb75d]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0 text-[#e4b256]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
      <input ref={searchInputRef} id="profile-country-search" type="search" autoComplete="off" value={search} onChange={event => setSearch(event.target.value)} placeholder="Tìm quốc gia..." className="h-full min-w-0 flex-1 bg-transparent text-[18px] font-medium text-[#ffe5ac] outline-none placeholder:text-[#a68b65]" />
      {search && <button type="button" aria-label="Xóa nội dung tìm kiếm" onClick={() => setSearch('')} className="grid size-7 shrink-0 place-items-center rounded text-[#c6aa77] hover:bg-[#f3dba71a] hover:text-[#ffe8ad]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m7 7 10 10M17 7 7 17" /></svg>
      </button>}
    </div>

      <div aria-label="Quốc gia" className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto rounded-lg border border-[#704319] bg-[#170c07b8] p-2 compact:flex compact:flex-col">
        {filteredCountries.map(code => <button key={code} type="button" aria-pressed={country === code} onClick={() => handleCountryOptionClick(code)} className={`${pickerButton} border ${code === 'VN' ? 'compact:order-1' : code === 'CN' ? 'compact:order-2' : 'compact:order-3'} ${country === code ? `${selectionPalette.selected.border} bg-[linear-gradient(110deg,#8b4e1f,#4b260f)] ${selectionPalette.selected.text} ${selectionPalette.selected.glow}` : 'border-[#9d6425] bg-[linear-gradient(110deg,#4a260f,#241207)] text-[#f8dea6] hover:border-[#e2ad53] hover:bg-[#613014]'}`}>
          <CountryFlag code={code} className="h-[21px] w-[28px] shrink-0" />
          <span className="min-w-0 flex-1 truncate">{countryNames.of(code)}</span>
          {country === code && <span aria-hidden="true" className="text-[#f4cc70]">✓</span>}
        </button>)}
        {filteredCountries.length === 0 && <p className="p-4 text-center text-sm text-[#c6aa77]">Không tìm thấy kết quả phù hợp.</p>}
      </div>
      <p className="mt-3 text-sm text-[#e0c38e] compact:hidden">Sau khi lưu, bạn không thể thay đổi quốc gia và địa chỉ.</p>
      {saveError && <p role="alert">{saveError}</p>}
      <div className="mt-auto flex justify-end gap-2 pt-3">
        <button type="button" onClick={onCancel} className="rounded-lg border border-[#a86e2c] bg-[#351a0b] px-5 py-2 font-bold">Hủy</button>
        <button type="button" disabled={saving} onClick={() => country === 'VN' ? (setSearch(''), setChoosingCountry(false)) : save(countryNames.of(country) ?? country, '')} className="rounded-lg border-2 border-[#edba5a] bg-[linear-gradient(135deg,#ffe29a,#f1bb5e)] px-5 py-2 font-bold text-[#46220c]">{saving ? 'Đang lưu...' : country === 'VN' ? 'Tiếp' : 'Lưu địa chỉ'}</button>
      </div>
    </> : <>
    <div className="flex shrink-0 items-center gap-2">
      {step === 'ward'
        ? backButton('Quay lại chọn tỉnh/thành phố', returnToProvinces, 'Chọn tỉnh/thành')
        : backButton(`Quay lại chọn quốc gia ${countryNames.of(country)}`, () => { setSearch(''); setChoosingCountry(true) }, 'Chọn quốc gia')}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-2xl leading-7 font-bold text-[#ffe5ac]">{step === 'ward' ? 'Chọn xã/phường' : 'Chọn tỉnh/thành phố'}</h3>
      </div>
      {step === 'province' && <span className="shrink-0 text-base font-semibold text-[#e0c38e]">34 tỉnh/thành</span>}
    </div>

    <label htmlFor="profile-address-search" className="sr-only">Tìm tỉnh, thành phố, xã hoặc phường</label>
    <div className="mt-3 flex h-14 shrink-0 items-center gap-3 rounded-lg border border-[#b17a36] bg-[#120a06] px-4 shadow-[inset_0_1px_4px_#0009] focus-within:ring-2 focus-within:ring-[#efb75d]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0 text-[#e4b256]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
      <input ref={searchInputRef} id="profile-address-search" type="search" autoComplete="off" value={search} onChange={event => setSearch(event.target.value)} placeholder={step === 'ward' ? 'Tìm xã/phường...' : 'Tìm tỉnh/thành phố...'} className="h-full min-w-0 flex-1 bg-transparent text-[18px] font-medium text-[#ffe5ac] outline-none placeholder:text-[#a68b65]" />
      {search && <button type="button" aria-label="Xóa nội dung tìm kiếm" onClick={() => setSearch('')} className="grid size-7 shrink-0 place-items-center rounded text-[#c6aa77] hover:bg-[#f3dba71a] hover:text-[#ffe8ad]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m7 7 10 10M17 7 7 17" /></svg>
      </button>}
    </div>

    <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#704319] bg-[#170c07b8]">
      <div className="flex shrink-0 items-center border-b border-[#704319] px-3 py-3 text-sm text-[#c6aa77]">
        <span className="text-lg leading-5 font-semibold">{step === 'ward' && province ? province.name : 'Việt Nam'}</span>
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
          return <button key={option.code} type="button" onClick={() => isProvince ? handleProvinceOptionClick(option as AdministrativeProvince) : setWard(option as AdministrativeWard)} aria-pressed={selected} className={`${pickerButton} ${optionStyle}`}>
            <span className="min-w-0 flex-1 truncate">{option.name}</span>
            {isProvince && <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0 text-[#e4b256]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>}
            {selected && <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-[#f4cc70]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>}
          </button>
        })}
        {!loading && !error && filteredOptions.length === 0 && <p className="p-4 text-center text-sm text-[#c6aa77]">Không tìm thấy kết quả phù hợp.</p>}
      </div>
    </div>

    <div className="mt-3 flex shrink-0 flex-col gap-2">
      <p className="text-base leading-6 text-[#e0c38e] compact:hidden">Sau khi lưu, bạn không thể thay đổi quốc gia và địa chỉ.</p>
      {saveError && <p role="alert">{saveError}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg border border-[#a86e2c] bg-[#351a0b] px-5 py-2 font-bold text-[#f0d69e] hover:bg-[#4b250e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efb75d]">Hủy</button>
        <button type="button" disabled={saving || (step === 'province' ? !province : !ward)} onClick={() => { if (step === 'province') continueToWards(); else if (province && ward) save(`${ward.name}, ${province.name}`, province.name) }} className="rounded-lg border-2 border-[#edba5a] bg-[linear-gradient(135deg,#ffe29a,#f1bb5e)] px-5 py-2 font-bold text-[#46220c] shadow-[inset_0_0_0_1px_#fff1c5] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0bf]">{saving ? 'Đang lưu...' : step === 'province' ? 'Tiếp' : 'Lưu địa chỉ'}</button>
      </div>
    </div>
    </>}
  </section>
}
