import confirmationActionSound from '../assets/audio/ui-action-confirmation.mp4'
import boardEntryActionSound from '../assets/audio/board-entry.wav'
import positionRemoveActionSound from '../assets/audio/position-remove.wav'
import positionMoveActionSound from '../assets/audio/đi quân (2).wav'
import customizationTabActionSound from '../assets/audio/customization-tab.mp4'
import { useAudioSettingsStore } from '../store/audioSettingsStore'

let context: AudioContext | null = null
let buffer: AudioBuffer | null = null
let loading: Promise<void> | null = null
let activeSource: AudioBufferSourceNode | null = null
let boardEntryBuffer: AudioBuffer | null = null
let boardEntryLoading: Promise<void> | null = null
let boardEntrySource: AudioBufferSourceNode | null = null
let positionRemoveBuffer: AudioBuffer | null = null
let positionRemoveLoading: Promise<void> | null = null
let positionRemoveSource: AudioBufferSourceNode | null = null
let positionMoveBuffer: AudioBuffer | null = null
let positionMoveLoading: Promise<void> | null = null
let positionMoveSource: AudioBufferSourceNode | null = null
let customizationTabBuffer: AudioBuffer | null = null
let customizationTabLoading: Promise<void> | null = null
let customizationTabSource: AudioBufferSourceNode | null = null
let idleSource: AudioBufferSourceNode | null = null
let pendingActionRequest = 0

function wakeUiAudioContext() {
  if (context?.state === 'suspended') {
    void context.resume().catch(() => {})
  }
}

function updateAudioReadiness() {
  const enabled = !useAudioSettingsStore.getState().muted && document.visibilityState === 'visible'
  if (!enabled) {
    idleSource?.stop()
    idleSource?.disconnect()
    idleSource = null
    return
  }
  if (!context) return
  wakeUiAudioContext()
  if (idleSource) return
  // Keep the render stream alive between clicks without adding audible sound.
  idleSource = context.createBufferSource()
  idleSource.buffer = context.createBuffer(1, context.sampleRate, context.sampleRate)
  idleSource.loop = true
  idleSource.connect(context.destination)
  idleSource.start()
}

export function maintainConfirmationAudioReadiness() {
  document.addEventListener('visibilitychange', updateAudioReadiness)
  window.addEventListener('pointerdown', wakeUiAudioContext, true)
  window.addEventListener('keydown', wakeUiAudioContext, true)
  const unsubscribe = useAudioSettingsStore.subscribe(updateAudioReadiness)
  return () => {
    document.removeEventListener('visibilitychange', updateAudioReadiness)
    window.removeEventListener('pointerdown', wakeUiAudioContext, true)
    window.removeEventListener('keydown', wakeUiAudioContext, true)
    unsubscribe()
    idleSource?.stop()
    idleSource?.disconnect()
    idleSource = null
  }
}

export function prepareConfirmationActionSound() {
  if (typeof AudioContext === 'undefined') return Promise.resolve()
  if (loading) return loading
  context ??= new AudioContext({ latencyHint: 'interactive' })
  const audioContext = context
  loading = fetch(confirmationActionSound)
    .then(response => {
      if (!response.ok) throw new Error('UI audio unavailable')
      return response.arrayBuffer()
    })
    .then(data => audioContext.decodeAudioData(data))
    .then(decoded => { buffer = decoded })
    .catch(() => { loading = null })
  return loading
}

export function prepareBoardEntryActionSound() {
  if (typeof AudioContext === 'undefined') return Promise.resolve()
  if (boardEntryLoading) return boardEntryLoading
  context ??= new AudioContext({ latencyHint: 'interactive' })
  const audioContext = context
  boardEntryLoading = fetch(boardEntryActionSound)
    .then(response => {
      if (!response.ok) throw new Error('Board entry audio unavailable')
      return response.arrayBuffer()
    })
    .then(data => audioContext.decodeAudioData(data))
    .then(decoded => { boardEntryBuffer = decoded })
    .catch(() => { boardEntryLoading = null })
  return boardEntryLoading
}

function prepareBuffer(sound: string, unavailableMessage: string, setBuffer: (buffer: AudioBuffer) => void, getLoading: () => Promise<void> | null, setLoading: (loading: Promise<void> | null) => void) {
  if (typeof AudioContext === 'undefined') return Promise.resolve()
  const existing = getLoading()
  if (existing) return existing
  context ??= new AudioContext({ latencyHint: 'interactive' })
  const audioContext = context
  const loading = fetch(sound)
    .then(response => {
      if (!response.ok) throw new Error(unavailableMessage)
      return response.arrayBuffer()
    })
    .then(data => audioContext.decodeAudioData(data))
    .then(setBuffer)
    .catch(() => { setLoading(null) })
  setLoading(loading)
  return loading
}

export function preparePositionRemoveActionSound() {
  return prepareBuffer(positionRemoveActionSound, 'Position remove audio unavailable', decoded => { positionRemoveBuffer = decoded }, () => positionRemoveLoading, loading => { positionRemoveLoading = loading })
}

export function preparePositionMoveActionSound() {
  return prepareBuffer(positionMoveActionSound, 'Position move audio unavailable', decoded => { positionMoveBuffer = decoded }, () => positionMoveLoading, loading => { positionMoveLoading = loading })
}

export function prepareCustomizationTabActionSound() {
  return prepareBuffer(customizationTabActionSound, 'Customization tab audio unavailable', decoded => { customizationTabBuffer = decoded }, () => customizationTabLoading, loading => { customizationTabLoading = loading })
}

export function unlockConfirmationActionSound() {
  void prepareConfirmationActionSound()
  void prepareBoardEntryActionSound()
  updateAudioReadiness()
  wakeUiAudioContext()
}

export function playConfirmationActionSound() {
  if (useAudioSettingsStore.getState().muted) return

  unlockConfirmationActionSound()
  const request = ++pendingActionRequest
  if (!context) return
  if (!buffer) {
    void prepareConfirmationActionSound().then(() => {
      if (request !== pendingActionRequest || useAudioSettingsStore.getState().muted || !buffer || !context) return
      startActionSound(buffer, activeSource, source => { activeSource = source }, () => activeSource)
    })
    return
  }
  startActionSound(buffer, activeSource, source => { activeSource = source }, () => activeSource)
}

function startActionSound(soundBuffer: AudioBuffer, currentSource: AudioBufferSourceNode | null, setSource: (source: AudioBufferSourceNode | null) => void, getSource: () => AudioBufferSourceNode | null) {
  if (!context) return
  currentSource?.stop()
  const source = context.createBufferSource()
  source.buffer = soundBuffer
  source.connect(context.destination)
  source.onended = () => {
    source.disconnect()
    if (getSource() === source) setSource(null)
  }
  setSource(source)
  source.start()
}

export function playBoardEntryActionSound() {
  if (useAudioSettingsStore.getState().muted) return

  unlockConfirmationActionSound()
  if (!context || !boardEntryBuffer) return
  boardEntrySource?.stop()
  const source = context.createBufferSource()
  source.buffer = boardEntryBuffer
  source.connect(context.destination)
  source.onended = () => {
    source.disconnect()
    if (boardEntrySource === source) boardEntrySource = null
  }
  boardEntrySource = source
  source.start()
}

function playPreparedActionSound(buffer: AudioBuffer | null, currentSource: AudioBufferSourceNode | null, setSource: (source: AudioBufferSourceNode | null) => void, prepare: () => Promise<void>, getBuffer: () => AudioBuffer | null, getSource: () => AudioBufferSourceNode | null) {
  if (useAudioSettingsStore.getState().muted) return
  unlockConfirmationActionSound()
  const request = ++pendingActionRequest
  if (!context) return
  if (!buffer) {
    void prepare().then(() => {
      const prepared = getBuffer()
      if (request !== pendingActionRequest || useAudioSettingsStore.getState().muted || !prepared || !context) return
      startActionSound(prepared, currentSource, setSource, getSource)
    })
    return
  }
  if (currentSource) {
    currentSource.onended = null
    currentSource.stop()
    currentSource.disconnect()
  }
  const source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source.onended = () => {
    source.disconnect()
    setSource(null)
  }
  setSource(source)
  source.start()
}

export function playPositionRemoveActionSound() {
  playPreparedActionSound(positionRemoveBuffer, positionRemoveSource, source => { positionRemoveSource = source }, preparePositionRemoveActionSound, () => positionRemoveBuffer, () => positionRemoveSource)
}

export function playPositionMoveActionSound() {
  playPreparedActionSound(positionMoveBuffer, positionMoveSource, source => { positionMoveSource = source }, preparePositionMoveActionSound, () => positionMoveBuffer, () => positionMoveSource)
}

export function playCustomizationTabActionSound() {
  playPreparedActionSound(customizationTabBuffer, customizationTabSource, source => { customizationTabSource = source }, prepareCustomizationTabActionSound, () => customizationTabBuffer, () => customizationTabSource)
}

export function isUiTabAction(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  const checkbox = target.closest('input[type="checkbox"], [role="checkbox"]')
  if (checkbox) return !checkbox.matches(':disabled, [aria-disabled="true"]')
  if (target.closest('[data-ui-selection-sound]')) return false
  const control = target.closest('[data-ui-tab-sound], [role="switch"], button[aria-label]')
  if (!control) return false
  if (control.matches('[data-ui-tab-sound], [role="switch"]')) return true
  return /^(?:Bật|Tắt) (?:âm thanh|nhạc)(?:\s|$)/i.test(control.getAttribute('aria-label') ?? '')
}

export function isUiSelectionAction(target: EventTarget | null): boolean {
  if (target instanceof Element && target.closest('input[type="checkbox"], [role="checkbox"]')) return false
  return target instanceof Element && !!target.closest('[data-ui-selection-sound]')
}

export function isUiCheckboxLabelClick(target: EventTarget | null): boolean {
  if (!(target instanceof Element) || target.closest('input[type="checkbox"], [role="checkbox"]')) return false
  return target.closest('label')?.control?.matches('input[type="checkbox"]') ?? false
}

export function isConfirmationActionButton(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  const button = target.closest('button')
  if (!button || button.matches(':disabled')) return false

  const text = button.textContent?.trim()
  const label = button.getAttribute('aria-label') ?? ''
  if (/^(?:(?:Mở|Xem) hồ sơ|Xem thông tin)(?:\s|$)/i.test(label)) return true
  if (label === 'Đóng thông tin danh hiệu') return true
  if (/^(?:Quay lại|Trở về|Trở lại|Về|Back)(?:\s|$)/i.test(label)
    || label === 'Rời phòng') return true
  if (text === '×' || text === '✕' || text === '✖'
    || /^Đóng(?:\s|$)/i.test(label) && !!button.querySelector('img, svg')) return true

  const notice = button.closest('dialog, [role="alertdialog"], [role="dialog"]')
  if (notice && /^(?:Đóng|Đã hiểu|Xác nhận|OK)$/i.test(text ?? '')
    && !notice.querySelector('input, textarea, select, [contenteditable="true"]')) {
    const actions = [...notice.querySelectorAll('button')].filter(action => {
      const caption = action.textContent?.trim() ?? ''
      return caption !== '' && !/^[×✕✖]$/.test(caption)
    })
    if (actions.length === 1 && actions[0] === button) return true
  }

  return button.classList.contains('rounded-[8px]!') && (
    button.classList.contains('border-[#c98b31]') || button.classList.contains('border-[#ffe08b]')
  )
}
