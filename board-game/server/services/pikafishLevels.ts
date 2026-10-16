export interface PikafishLevelProfile {
  search: { type: 'depth' | 'nodes' | 'movetime'; value: number }
  maxMoveTime: number
  threads: number
  hash: number
}

// One primary UCI search limit per level. maxMoveTime is a server stop deadline,
// including the remaining-clock allowance, rather than another go parameter.
export const PIKAFISH_LEVELS = {
  1: { search: { type: 'depth', value: 1 }, maxMoveTime: 80, threads: 1, hash: 16 },
  2: { search: { type: 'depth', value: 2 }, maxMoveTime: 120, threads: 1, hash: 16 },
  3: { search: { type: 'depth', value: 3 }, maxMoveTime: 180, threads: 1, hash: 16 },
  4: { search: { type: 'nodes', value: 4096 }, maxMoveTime: 250, threads: 1, hash: 32 },
  5: { search: { type: 'nodes', value: 16000 }, maxMoveTime: 350, threads: 1, hash: 32 },
  6: { search: { type: 'nodes', value: 40000 }, maxMoveTime: 500, threads: 1, hash: 64 },
  7: { search: { type: 'nodes', value: 100000 }, maxMoveTime: 700, threads: 1, hash: 64 },
  8: { search: { type: 'nodes', value: 200000 }, maxMoveTime: 1000, threads: 2, hash: 128 },
  9: { search: { type: 'nodes', value: 400000 }, maxMoveTime: 1500, threads: 2, hash: 128 },
  10: { search: { type: 'movetime', value: 2500 }, maxMoveTime: 2500, threads: 4, hash: 128 },
} as const satisfies Record<number, PikafishLevelProfile>

export interface UciOption { type: string; min?: number; max?: number }

export function parseUciOption(line: string): { name: string; option: UciOption } | null {
  const match = /^option name (.+?) type (spin|string|check|combo|button)(?:\s|$)/.exec(line)
  if (!match) return null
  const min = /\smin (-?\d+)(?:\s|$)/.exec(line)
  const max = /\smax (-?\d+)(?:\s|$)/.exec(line)
  return { name: match[1], option: { type: match[2], min: min ? Number(min[1]) : undefined, max: max ? Number(max[1]) : undefined } }
}

export function profileOptions(options: Map<string, UciOption>, profile: PikafishLevelProfile, cpuCount: number, evalFile: string, multiPV = 1): string[] {
  const commands: string[] = []
  for (const [name, requested] of [['Threads', Math.min(profile.threads, cpuCount)], ['Hash', profile.hash], ['MultiPV', multiPV]] as const) {
    const option = options.get(name)
    if (option?.type !== 'spin' || option.min === undefined || option.max === undefined) continue
    const value = Math.max(option.min, Math.min(option.max, requested))
    commands.push(`setoption name ${name} value ${value}`)
  }
  if (options.get('EvalFile')?.type === 'string') commands.push(`setoption name EvalFile value ${evalFile}`)
  return commands
}

export function profileSearch(profile: PikafishLevelProfile, remainingMs: number): { command: string; stopAfterMs: number } {
  const stopAfterMs = Math.max(50, Math.floor(Math.min(profile.maxMoveTime, remainingMs / 30)))
  const value = profile.search.type === 'movetime' ? Math.min(profile.search.value, stopAfterMs) : profile.search.value
  return { command: `go ${profile.search.type} ${value}`, stopAfterMs }
}
