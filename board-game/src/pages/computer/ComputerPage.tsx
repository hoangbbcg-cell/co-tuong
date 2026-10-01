import { ComputerSetup } from '../../features/lobby/components/ComputerSetup'
import { useComputerSetup } from '../../features/lobby/hooks/useComputerSetup'
import { useHomeMusic } from '../../features/lobby/hooks/useHomeMusic'
import { useRoomEntrance } from '../../features/game/hooks/useRoomEntrance'

export function ComputerPage({ onEntranceComplete }: { onEntranceComplete: () => void }) {
  const setup = useComputerSetup()
  const music = useHomeMusic()
  const entrance = useRoomEntrance(onEntranceComplete)
  return <main aria-label="Chơi với máy" data-testid="computer-entrance" data-entering={entrance.entering} inert={entrance.entering} className="flex h-dvh w-full items-center justify-center overflow-hidden bg-[#263a35] data-[entering=true]:bg-transparent">
    <div className="relative h-[calc(100dvh-12px)] w-[calc(100%-240px)] overflow-hidden border-[5px] border-[#80582c] shadow-[inset_0_0_0_2px_#efd397,0_0_0_1px_#e1c993,0_8px_30px_#101d18aa] compact:w-[calc(100%-12px)]">
      <div ref={entrance.sceneRef} className="h-full [clip-path:inset(0)]"><ComputerSetup setup={setup} music={music} /></div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-[2px] z-10 border border-[#e3bf78] shadow-[inset_0_0_0_2px_#63472055]" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 left-0 z-10 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-0 -bottom-1 z-10 -scale-x-100 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
    </div>
  </main>
}
