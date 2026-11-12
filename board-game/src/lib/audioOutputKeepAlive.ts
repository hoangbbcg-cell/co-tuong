// A zero-gain/silent graph can be culled during idle. One 16-bit LSB of DC
// keeps this branch nonzero without adding a tone. Callers gate it on mute/visibility.
export const AUDIO_KEEP_ALIVE_DC = 1 / 32768

export function createAudioOutputKeepAlive(context: AudioContext, destination: AudioNode = context.destination) {
  const source = context.createConstantSource()
  source.offset.value = AUDIO_KEEP_ALIVE_DC
  source.offset.setValueAtTime(AUDIO_KEEP_ALIVE_DC, context.currentTime)
  source.connect(destination)
  source.start()
  return source
}
