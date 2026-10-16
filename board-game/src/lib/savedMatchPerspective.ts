import type { RecordedMatch } from '../types/recordedMatch'
import type { Side } from '../types/game'

export function savedMatchSide(match: Pick<RecordedMatch, 'redName' | 'blackName'>, owner: string): Side {
  return match.blackName === owner && match.redName !== owner ? 'black' : 'red'
}
