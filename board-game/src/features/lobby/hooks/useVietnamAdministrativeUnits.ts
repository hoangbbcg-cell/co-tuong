import { useEffect, useState } from 'react'

export type AdministrativeProvince = {
  code: number
  name: string
  divisionType: string
  wards: AdministrativeWard[]
}

export type AdministrativeWard = {
  code: number
  name: string
  divisionType: string
}

const apiBase = 'https://provinces.open-api.vn/api/v2'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseUnit(value: unknown): Omit<AdministrativeProvince, 'wards'> | AdministrativeWard | null {
  if (!isRecord(value) || typeof value.code !== 'number' || typeof value.name !== 'string') return null
  return {
    code: value.code,
    name: value.name,
    divisionType: typeof value.division_type === 'string' ? value.division_type : '',
  }
}

function parseWards(value: unknown): AdministrativeWard[] {
  if (!Array.isArray(value)) throw new Error('Danh sách xã/phường không đúng định dạng.')
  return value.map(parseUnit).filter((unit): unit is AdministrativeWard => unit !== null)
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
}

function parseProvinces(value: unknown): AdministrativeProvince[] {
  if (!Array.isArray(value)) throw new Error('Danh sách tỉnh/thành không đúng định dạng.')
  const provinces = value.map(item => {
    if (!isRecord(item) || !Array.isArray(item.wards)) return null
    const unit = parseUnit(item)
    if (!unit) return null
    return { ...unit, wards: parseWards(item.wards) }
  }).filter((unit): unit is AdministrativeProvince => unit !== null)
  if (provinces.length === 0) throw new Error('Không tải được danh sách tỉnh/thành.')
  return provinces.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
}

async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`Không tải được danh sách (HTTP ${response.status}).`)
  return await response.json() as unknown
}

export function useVietnamAdministrativeUnits(enabled: boolean, provinceCode: number | null) {
  const [provinces, setProvinces] = useState<AdministrativeProvince[]>([])
  const [provincesLoading, setProvincesLoading] = useState(false)
  const [provincesError, setProvincesError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    setProvincesLoading(true)
    setProvincesError('')
    void fetchJson(`${apiBase}/?depth=2`, controller.signal)
      .then(payload => setProvinces(parseProvinces(payload)))
      .catch(error => {
        if (controller.signal.aborted) return
        setProvincesError(error instanceof Error ? error.message : 'Không tải được danh sách tỉnh/thành.')
      })
      .finally(() => { if (!controller.signal.aborted) setProvincesLoading(false) })
    return () => controller.abort()
  }, [enabled, retry])

  const wards = provinceCode === null ? [] : provinces.find(province => province.code === provinceCode)?.wards ?? []

  return {
    provinces,
    wards,
    provincesLoading,
    provincesError,
    retry: () => setRetry(value => value + 1),
  }
}
