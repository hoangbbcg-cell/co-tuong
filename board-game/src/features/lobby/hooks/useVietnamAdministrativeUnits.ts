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
const requestTimeoutMs = 12_000

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
    if (!isRecord(item)) return null
    const unit = parseUnit(item)
    if (!unit) return null
    const province: AdministrativeProvince = { ...unit, wards: [] }
    return province
  }).filter((unit): unit is AdministrativeProvince => unit !== null)
  if (provinces.length === 0) throw new Error('Không tải được danh sách tỉnh/thành.')
  return provinces.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
}

async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
  const controller = new AbortController()
  const abortRequest = () => controller.abort()
  const timeout = window.setTimeout(abortRequest, requestTimeoutMs)
  signal.addEventListener('abort', abortRequest, { once: true })
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`Không tải được danh sách (HTTP ${response.status}).`)
    return await response.json() as unknown
  } catch (error) {
    if (controller.signal.aborted && !signal.aborted) {
      throw new Error('Tải danh sách quá lâu. Vui lòng thử lại.')
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
    signal.removeEventListener('abort', abortRequest)
  }
}

export function useVietnamAdministrativeUnits(enabled: boolean, provinceCode: number | null) {
  const [provinces, setProvinces] = useState<AdministrativeProvince[]>([])
  const [provincesLoading, setProvincesLoading] = useState(false)
  const [provincesError, setProvincesError] = useState('')
  const [provinceRetry, setProvinceRetry] = useState(0)
  const [wards, setWards] = useState<AdministrativeWard[]>([])
  const [wardsLoading, setWardsLoading] = useState(false)
  const [wardsError, setWardsError] = useState('')
  const [wardsRetry, setWardsRetry] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    setProvincesLoading(true)
    setProvincesError('')
    void fetchJson(`${apiBase}/?depth=1`, controller.signal)
      .then(payload => setProvinces(parseProvinces(payload)))
      .catch(error => {
        if (!controller.signal.aborted) setProvincesError(error instanceof Error ? error.message : 'Không tải được danh sách tỉnh/thành.')
      })
      .finally(() => { if (!controller.signal.aborted) setProvincesLoading(false) })
    return () => controller.abort()
  }, [enabled, provinceRetry])

  useEffect(() => {
    if (!enabled || provinceCode === null) {
      setWards([])
      setWardsLoading(false)
      setWardsError('')
      return
    }
    const controller = new AbortController()
    setWards([])
    setWardsLoading(true)
    setWardsError('')
    void fetchJson(`${apiBase}/p/${provinceCode}?depth=2`, controller.signal)
      .then(payload => {
        if (!isRecord(payload)) throw new Error('Danh sách xã/phường không đúng định dạng.')
        setWards(parseWards(payload.wards))
      })
      .catch(error => {
        if (!controller.signal.aborted) setWardsError(error instanceof Error ? error.message : 'Không tải được danh sách xã/phường.')
      })
      .finally(() => { if (!controller.signal.aborted) setWardsLoading(false) })
    return () => controller.abort()
  }, [enabled, provinceCode, wardsRetry])

  return {
    provinces,
    wards,
    provincesLoading,
    provincesError,
    wardsLoading,
    wardsError,
    retryProvinces: () => setProvinceRetry(value => value + 1),
    retryWards: () => setWardsRetry(value => value + 1),
  }
}
