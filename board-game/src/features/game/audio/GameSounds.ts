type SoundName = 'move' | 'capture' | 'check' | 'checkmate' | 'introOne' | 'introTwo'
type Channel = 'effects' | 'intro' | 'checkmate'
type Clip = { sound: SoundName; volume: number; delay?: number; offset?: number }

/** Decodes each asset once per board and gives each cue its own playback source. */
export class GameSounds {
  private readonly context = new AudioContext()
  private readonly abort = new AbortController()
  private readonly buffers = new Map<SoundName, Promise<AudioBuffer>>()
  private readonly active: Record<Channel, Set<AudioBufferSourceNode>> = {
    effects: new Set(), intro: new Set(), checkmate: new Set(),
  }
  private readonly versions: Record<Channel, number> = { effects: 0, intro: 0, checkmate: 0 }
  private readonly waiting = new Set<() => void>()
  private readonly warned = new Set<string>()
  private disposed = false

  constructor(sources: Record<SoundName, string>) {
    for (const name of Object.keys(sources) as SoundName[]) {
      const buffer = fetch(sources[name], { signal: this.abort.signal })
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          return response.arrayBuffer()
        })
        .then(data => this.context.decodeAudioData(data))
      this.buffers.set(name, buffer)
      // Preloading must not create unhandled rejections before the first cue.
      void buffer.catch(error => this.warn(name, error))
    }
    window.addEventListener('pointerdown', this.unlock, true)
    window.addEventListener('keydown', this.unlock, true)
    document.addEventListener('visibilitychange', this.onVisibility)
    this.context.addEventListener('statechange', this.onStateChange)
  }

  private warn(key: string, error: unknown) {
    if (this.disposed || this.warned.has(key)) return
    this.warned.add(key)
    console.warn(`Không thể phát âm thanh bàn cờ (${key}).`, error)
  }

  private readonly onStateChange = () => {
    if (this.context.state !== 'running' && !this.disposed) return
    for (const resolve of this.waiting) resolve()
    this.waiting.clear()
  }

  private readonly onVisibility = () => {
    if (document.visibilityState === 'visible') this.unlock()
  }

  private readonly unlock = () => {
    if (this.disposed || this.context.state === 'running') return
    void this.context.resume().then(this.onStateChange).catch(error => {
      // A later real gesture can resume the context; pending cues stay cancellable.
      if (!(error instanceof DOMException && error.name === 'NotAllowedError')) this.warn('resume', error)
    })
  }

  private async ready(names: SoundName[], channel: Channel, version: number) {
    const buffers = await Promise.all(names.map(name => this.buffers.get(name)!))
    if (this.disposed || this.versions[channel] !== version) return null
    if (this.context.state !== 'running') {
      await new Promise<void>(resolve => {
        this.waiting.add(resolve)
        this.unlock()
      })
    }
    if (this.disposed || this.versions[channel] !== version) return null
    return buffers
  }

  private start(buffer: AudioBuffer, clip: Clip, channel: Channel, time: number) {
    const source = this.context.createBufferSource()
    const gain = this.context.createGain()
    source.buffer = buffer
    gain.gain.setValueAtTime(clip.volume, time)
    source.connect(gain).connect(this.context.destination)
    this.active[channel].add(source)
    source.onended = () => {
      this.active[channel].delete(source)
      source.disconnect()
      gain.disconnect()
    }
    source.start(time + (clip.delay ?? 0), clip.offset ?? 0)
  }

  private async playClips(clips: Clip[], channel: Channel) {
    const version = this.versions[channel]
    try {
      const buffers = await this.ready(clips.map(clip => clip.sound), channel, version)
      if (!buffers) return
      const time = this.context.currentTime
      clips.forEach((clip, index) => this.start(buffers[index], clip, channel, time))
    } catch (error) { this.warn(channel, error) }
  }

  play(sound: 'move' | 'capture' | 'check') {
    void this.playClips([{ sound, volume: sound === 'check' ? 1 : 0.65 }], 'effects')
  }

  playCheckmate() {
    this.stop('effects')
    this.stop('checkmate')
    // Keep the main mate cue audible if the decorative overlay clip fails to load.
    void this.playClips([{ sound: 'checkmate', volume: 0.95 }], 'checkmate')
    void this.playClips([{ sound: 'introTwo', volume: 0.65 }], 'checkmate')
  }

  playIntro() {
    this.stopIntro()
    const version = this.versions.intro
    void this.ready(['introOne', 'introTwo'], 'intro', version).then(buffers => {
      if (!buffers) return
      const [one, two] = buffers
      const time = this.context.currentTime
      const delay = two.duration / 5
      // Preserve the original overlap, using the audio clock instead of timeupdate.
      this.start(two, { sound: 'introTwo', volume: 0.9 }, 'intro', time)
      this.start(one, { sound: 'introOne', volume: 0.65, delay, offset: delay % one.duration }, 'intro', time)
    }).catch(error => this.warn('intro', error))
  }

  private stop(channel: Channel) {
    this.versions[channel]++
    for (const source of this.active[channel]) source.stop()
    this.active[channel].clear()
  }

  stopIntro() { this.stop('intro') }

  stopAll() {
    this.stop('effects')
    this.stop('intro')
    this.stop('checkmate')
  }

  dispose() {
    if (this.disposed) return
    this.disposed = true
    this.stopAll()
    this.abort.abort()
    window.removeEventListener('pointerdown', this.unlock, true)
    window.removeEventListener('keydown', this.unlock, true)
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.context.removeEventListener('statechange', this.onStateChange)
    this.onStateChange()
    void this.context.close().catch(() => undefined)
  }
}
