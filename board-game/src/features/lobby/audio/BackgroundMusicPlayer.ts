/** Buffer playback avoids registering the background music as system media. */
export class BackgroundMusicPlayer {
  private context: AudioContext | null = null
  private source: AudioBufferSourceNode | null = null
  private loading: { url: string; buffer: Promise<AudioBuffer> } | null = null
  private version = 0
  paused = true
  ended = false

  constructor(private readonly onEnded: () => void) {}

  async play(url: string) {
    const version = ++this.version
    const context = this.context ??= new AudioContext()
    this.paused = false
    try {
      // Resume during the user gesture, before loading/decoding the track.
      await context.resume()
      if (version !== this.version) return
      if (this.source) return
      if (this.loading?.url !== url) {
        this.loading = { url, buffer: fetch(url).then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          return response.arrayBuffer()
        }).then(data => context.decodeAudioData(data)) }
      }
      const buffer = await this.loading.buffer
      if (version !== this.version) return
      const source = context.createBufferSource()
      source.buffer = buffer
      source.connect(context.destination)
      source.onended = () => {
        if (this.source !== source) return
        source.disconnect()
        this.source = null
        this.loading = null
        this.paused = true
        this.ended = true
        this.onEnded()
      }
      this.source = source
      this.ended = false
      source.start()
    } catch (error) {
      if (version === this.version) {
        this.paused = true
        this.loading = null
      }
      throw error
    }
  }

  pause() {
    this.version += 1
    this.paused = true
    if (this.context) void this.context.suspend().catch(() => {})
  }
}
