// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { GameSounds } from '../src/features/game/audio/GameSounds'

class FakeSource {
  buffer: AudioBuffer | null = null
  onended: (() => void) | null = null
  connect = vi.fn(() => ({ connect: vi.fn() }))
  disconnect = vi.fn()
  start = vi.fn()
  stop = vi.fn()
}
class FakeContext extends EventTarget {
  static instances: FakeContext[] = []
  state = 'suspended'
  currentTime = 2
  destination = {}
  allowResume = true
  sources: FakeSource[] = []
  constructor() { super(); FakeContext.instances.push(this) }
  resume = vi.fn(async () => {
    if (this.allowResume) { this.state = 'running'; this.dispatchEvent(new Event('statechange')) }
  })
  close = vi.fn(async () => { this.state = 'closed' })
  decodeAudioData = vi.fn(async (data: ArrayBuffer) => ({ duration: new Uint8Array(data)[0] === 5 ? 10 : 20 }) as AudioBuffer)
  createBufferSource() { const source = new FakeSource(); this.sources.push(source); return source }
  createGain() { return { gain: { setValueAtTime: vi.fn() }, disconnect: vi.fn() } }
}
const sources = { move: '/move', capture: '/capture', check: '/check', checkmate: '/checkmate', introOne: '/introOne', introTwo: '/introTwo' }
let sounds: GameSounds
let context: FakeContext
let failedSource: string | null

beforeEach(() => {
  vi.stubGlobal('AudioContext', FakeContext)
  failedSource = null
  vi.stubGlobal('fetch', vi.fn(async (url: string) => {
    if (url === failedSource) throw new Error('offline')
    return { ok: true, arrayBuffer: async () => new Uint8Array([Object.values(sources).indexOf(url)]).buffer }
  }))
  sounds = new GameSounds(sources)
  context = FakeContext.instances.at(-1)!
})
afterEach(() => { sounds.dispose(); vi.unstubAllGlobals(); FakeContext.instances = [] })

it('preloads every clip and lets successive cues play without interrupting each other', async () => {
  sounds.play('move')
  sounds.play('move')
  sounds.play('capture')
  sounds.play('check')
  await vi.waitFor(() => expect(context.sources).toHaveLength(4))
  expect(fetch).toHaveBeenCalledTimes(6)
  expect(context.decodeAudioData).toHaveBeenCalledTimes(6)
  for (const source of context.sources) {
    expect(source.start).toHaveBeenCalledTimes(1)
    expect(source.stop).not.toHaveBeenCalled()
  }
})

it('retries suspended playback on a real gesture instead of dropping the cue', async () => {
  context.allowResume = false
  sounds.play('move')
  await vi.waitFor(() => expect(context.resume).toHaveBeenCalled())
  expect(context.sources).toHaveLength(0)
  context.allowResume = true
  window.dispatchEvent(new Event('pointerdown'))
  await vi.waitFor(() => expect(context.sources).toHaveLength(1))
})

it('cancels intro even when it is still waiting for audio permission', async () => {
  context.allowResume = false
  sounds.playIntro()
  await vi.waitFor(() => expect(context.resume).toHaveBeenCalled())
  sounds.stopIntro()
  context.allowResume = true
  window.dispatchEvent(new Event('keydown'))
  await vi.waitFor(() => expect(context.state).toBe('running'))
  await Promise.resolve()
  expect(context.sources).toHaveLength(0)
})

it('starts the two intro layers on the same audio clock with the original one-fifth overlap', async () => {
  sounds.playIntro()
  await vi.waitFor(() => expect(context.sources).toHaveLength(2))
  expect(context.sources[0].start).toHaveBeenCalledWith(2, 0)
  expect(context.sources[1].start).toHaveBeenCalledWith(4, 2)
})

it('stops previous move effects and starts both checkmate layers together', async () => {
  sounds.play('move')
  await vi.waitFor(() => expect(context.sources).toHaveLength(1))
  sounds.playCheckmate()
  await vi.waitFor(() => expect(context.sources).toHaveLength(3))
  expect(context.sources[0].stop).toHaveBeenCalledTimes(1)
  expect(context.sources[1].start).toHaveBeenCalledWith(2, 0)
  expect(context.sources[2].start).toHaveBeenCalledWith(2, 0)
})

it('keeps the main checkmate cue when the decorative layer cannot load', async () => {
  sounds.dispose()
  FakeContext.instances = []
  failedSource = '/introTwo'
  sounds = new GameSounds(sources)
  context = FakeContext.instances.at(-1)!
  sounds.playCheckmate()
  await vi.waitFor(() => expect(context.sources).toHaveLength(1))
  expect(context.sources[0].start).toHaveBeenCalledWith(2, 0)
})

it('disposes pending playback and removes gesture listeners when leaving the board', async () => {
  context.allowResume = false
  sounds.play('move')
  await vi.waitFor(() => expect(context.resume).toHaveBeenCalled())
  sounds.dispose()
  const resumeCalls = context.resume.mock.calls.length
  window.dispatchEvent(new Event('pointerdown'))
  await Promise.resolve()
  expect(context.resume).toHaveBeenCalledTimes(resumeCalls)
  expect(context.sources).toHaveLength(0)
  expect(context.close).toHaveBeenCalledTimes(1)
})
