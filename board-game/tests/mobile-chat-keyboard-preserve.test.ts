import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const source = readFileSync(resolve(process.cwd(), 'src/features/game/components/Chat.tsx'), 'utf8')
describe('mobile in-game chat: keep keyboard and chat open after send', () => {
  it('does not blur when send button is pressed', () => {
    expect(source).toContain("event.target.closest('#chatSendButton')")
    expect(source).toContain('id="chatSendButton" type="submit" onPointerDown=')
    expect(source).toContain('document.activeElement === chat.inputRef.current) event.preventDefault()')
  })
  it('preserves focus and sends normally', () => {
    expect(source).toContain('document.activeElement === chat.inputRef.current) chat.inputRef.current?.focus(); void chat.send()')
    expect(source).toContain('enterKeyHint="send"')
  })
  it('keeps intentional blur outside send and mobile input activation behavior', () => {
    expect(source).toContain('chat.inputRef.current?.blur(); setInputActivated(false)')
    expect(source).toContain('onBlur={() => setInputActivated(false)}')
    expect(source).toContain('readOnly={window.matchMedia')
  })
})