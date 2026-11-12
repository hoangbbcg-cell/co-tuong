import { accountApi } from './accountApi'
import { useSessionStore } from '../store/sessionStore'
import { useSavedMatches } from '../store/savedMatchesStore'
import { useSavedPositions } from '../store/savedPositionsStore'
import { usePlayedMatches } from '../store/playedMatchesStore'
import type { AccountProfile } from '../types/account'
import { countryNames } from '../lib/profileLocation'
import { useSocialStore } from '../store/socialStore'

export function applyAccount(profile:AccountProfile) {
  if (
    !profile ||
    typeof profile !== 'object' ||
    !Array.isArray(profile.stats)
  ) {
    throw new Error(
      'API tài khoản không trả về hồ sơ hợp lệ. ' +
      'Kiểm tra kết nối HOVANG backend từ ứng dụng Android.'
    )
  }
  useSessionStore.setState({account:profile,name:profile.displayName,elo:profile.stats.find(s=>s.variant==='xiangqi')?.elo??1000,
    gold:Number(profile.gold),energy:profile.energy,energyRecoveryAt:profile.energyRecoveryAt,countryCode:profile.countryCode,
    province:profile.provinceName??'',address:[profile.wardName,profile.provinceName].filter(Boolean).join(', ')||(profile.countryCode?countryNames.of(profile.countryCode):'Chưa chọn địa chỉ'),
    avatarIndex:Number(profile.avatarCode.replace('avatar-',''))||0,avatarFrameIndex:Number(profile.avatarFrameCode.replace('frame-',''))||0})
}
export async function refreshAccount(){applyAccount(await accountApi.me())}
type HistoryKind = 'played' | 'saved'
type HistoryData = Awaited<ReturnType<typeof accountApi.history>>
const historyTtlMs = 300_000

const historyCache = new Map<string, {
  data: HistoryData
  expires: number
  timer: ReturnType<typeof setTimeout>
}>()
const historyPending = new Map<string, Promise<void>>()
const historyVersions = new Map<string, number>()
let historyAccountId: string | null = null

function readGuestEntries<T extends { id: string; owner: string }>(
  key: string
): T[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
    return Array.isArray(value)
      ? value.filter((item): item is T =>
          !!item &&
          typeof item.id === 'string' &&
          typeof item.owner === 'string' &&
          !('serverAccountId' in item)
        )
      : []
  } catch {
    return []
  }
}

function restoreLocalEntries() {
  usePlayedMatches.setState({
    entries: readGuestEntries<ReturnType<typeof usePlayedMatches.getState>['entries'][number]>(
      'xiangqi-played-matches-v1'
    )
  })
  useSavedMatches.setState({
    entries: readGuestEntries<ReturnType<typeof useSavedMatches.getState>['entries'][number]>(
      'xiangqi-saved-matches-v1'
    )
  })
  useSavedPositions.setState({
    entries: readGuestEntries<ReturnType<typeof useSavedPositions.getState>['entries'][number]>(
      'xiangqi-saved-positions-v1'
    )
  })
}

function historyKey(accountId: string, kind: HistoryKind) {
  return `${accountId}:${kind}`
}

function historyVersion(key: string) {
  return historyVersions.get(key) ?? 0
}

function clearCachedKey(key: string) {
  const cached = historyCache.get(key)
  if (cached) clearTimeout(cached.timer)
  historyCache.delete(key)
}

export function invalidateAccountHistory(kind?: HistoryKind) {
  const accountId = useSessionStore.getState().account?.id
  const keys = new Set([
    ...historyCache.keys(),
    ...historyPending.keys(),
    ...historyVersions.keys()
  ])
  if (accountId != null) {
    if (!kind || kind === 'played') keys.add(historyKey(String(accountId), 'played'))
    if (!kind || kind === 'saved') keys.add(historyKey(String(accountId), 'saved'))
  }
  for (const key of keys) {
    if (kind && !key.endsWith(`:${kind}`)) continue
    historyVersions.set(key, historyVersion(key) + 1)
    historyPending.delete(key)
    clearCachedKey(key)
  }
}

export function clearAccountHistoryCache() {
  invalidateAccountHistory()
  historyAccountId = null
  restoreLocalEntries()
}

function publishHistory(kind: HistoryKind, data: HistoryData, accountId: string) {
  if (String(useSessionStore.getState().account?.id) !== accountId) return
  const owner = useSessionStore.getState().name

  if (kind === 'played') {
    const local = readGuestEntries<ReturnType<typeof usePlayedMatches.getState>['entries'][number]>(
      'xiangqi-played-matches-v1'
    )
    const remote = data.map(match => ({
      ...match,
      owner,
      isOnline: true as const,
      serverAccountId: accountId
    }))
    const remoteIds = new Set(remote.map(item => item.id))
    usePlayedMatches.setState({
      entries: [...local.filter(item =>
        item.owner !== owner || !remoteIds.has(item.id)
      ), ...remote]
    })
  } else {
    const local = readGuestEntries<ReturnType<typeof useSavedMatches.getState>['entries'][number]>(
      'xiangqi-saved-matches-v1'
    )
    const remote = data.map(match => ({ ...match, owner, serverAccountId: accountId }))
    const remoteIds = new Set(remote.map(item => item.id))
    useSavedMatches.setState({
      entries: [...local.filter(item =>
        item.owner !== owner || !remoteIds.has(item.id)
      ), ...remote]
    })
  }
}

export async function refreshMatchHistory(kind: HistoryKind = 'played') {
  const account = useSessionStore.getState().account
  if (!account) return

  const accountId = String(account.id)
  const key = historyKey(accountId, kind)
  const cached = historyCache.get(key)

  if (cached && cached.expires > Date.now()) {
    publishHistory(kind, cached.data, accountId)
    return
  }
  if (cached) clearCachedKey(key)

  const pending = historyPending.get(key)
  if (pending) return pending

  const version = historyVersion(key)
  const task = (async () => {
    const data = await accountApi.history(kind === 'saved')
    if (
      historyVersion(key) !== version ||
      String(useSessionStore.getState().account?.id) !== accountId
    ) return

    publishHistory(kind, data, accountId)
    const timer = setTimeout(() => {
      const current = historyCache.get(key)
      if (current?.timer === timer) historyCache.delete(key)
    }, historyTtlMs)
    historyCache.set(key, {
      data,
      expires: Date.now() + historyTtlMs,
      timer
    })
  })()

  historyPending.set(key, task)
  try {
    await task
  } finally {
    if (historyPending.get(key) === task) historyPending.delete(key)
  }
}

export async function loadAccountData(profile: AccountProfile) {
  const id = String(profile.id)
  if (historyAccountId !== id) {
    clearAccountHistoryCache()
    historyAccountId = id
  }
  applyAccount(profile)
  await useSocialStore.getState().refresh()
}