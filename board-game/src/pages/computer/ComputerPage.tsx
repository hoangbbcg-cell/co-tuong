import { ComputerSetup } from '../../features/lobby/components/ComputerSetup'
import { useComputerSetup } from '../../features/lobby/hooks/useComputerSetup'
import { useHomeMusic } from '../../features/lobby/hooks/useHomeMusic'
import { useRoomEntrance } from '../../features/game/hooks/useRoomEntrance'
import { OpeningCover } from '../../features/game/components/OpeningCover'

export function ComputerPage({ onEntranceComplete }: { onEntranceComplete: () => void }) {
  const setup = useComputerSetup()
  const music = useHomeMusic()
  const entrance = useRoomEntrance(onEntranceComplete)
  return <><main aria-label="Chơi với máy" data-testid="computer-entrance" data-entering={entrance.entering} className="flex h-dvh w-full items-center justify-center overflow-hidden bg-[#263a35] data-[entering=true]:bg-transparent">
    <div className="relative h-dvh w-full overflow-hidden">
      <div ref={entrance.sceneRef} className="h-full [clip-path:inset(0)]"><ComputerSetup setup={setup} music={music} entering={entrance.entering} /></div>
    </div>
  </main>{entrance.entering && <OpeningCover onComplete={entrance.finishEntrance} />}</>
}
