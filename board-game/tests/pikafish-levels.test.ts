import { describe, expect, it } from 'vitest'
import { PIKAFISH_LEVELS, parseUciOption, profileOptions, profileSearch, type UciOption } from '../server/services/pikafishLevels'

describe('Pikafish level profiles', () => {
  it('uses one primary limit with increasing node budgets and a clock allowance', () => {
    let previousNodes = 0
    for (const profile of Object.values(PIKAFISH_LEVELS)) {
      const search = profileSearch(profile, 600000)
      expect(search.command).toMatch(/^go (depth|nodes|movetime) \d+$/)
      expect(search.stopAfterMs).toBe(profile.maxMoveTime)
      if (profile.search.type === 'nodes') {
        expect(profile.search.value).toBeGreaterThan(previousNodes)
        previousNodes = profile.search.value
      }
    }
    expect(profileSearch(PIKAFISH_LEVELS[1], 600000)).toEqual({ command: 'go depth 1', stopAfterMs: 80 })
    expect(profileSearch(PIKAFISH_LEVELS[10], 600000)).toEqual({ command: 'go movetime 2500', stopAfterMs: 2500 })
    expect(profileSearch(PIKAFISH_LEVELS[10], 3000)).toEqual({ command: 'go movetime 100', stopAfterMs: 100 })
  })
  it('only applies advertised options and respects engine/CPU bounds', () => {
    const options = new Map<string, UciOption>()
    for (const line of ['option name Threads type spin default 1 min 1 max 2', 'option name Hash type spin default 16 min 1 max 64', 'option name EvalFile type string default pikafish.nnue']) {
      const parsed = parseUciOption(line)!
      options.set(parsed.name, parsed.option)
    }
    expect(profileOptions(options, PIKAFISH_LEVELS[10], 1, 'pikafish.nnue')).toEqual(['setoption name Threads value 1', 'setoption name Hash value 64', 'setoption name EvalFile value pikafish.nnue'])
    expect(profileOptions(new Map(), PIKAFISH_LEVELS[10], 8, 'pikafish.nnue')).toEqual([])
    options.set('MultiPV', { type: 'spin', min: 1, max: 3 })
    expect(profileOptions(options, PIKAFISH_LEVELS[1], 8, 'pikafish.nnue', 5)).toContain('setoption name MultiPV value 3')
    expect(parseUciOption('info string option name fake')).toBeNull()
  })
})
