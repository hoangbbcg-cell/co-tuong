import type { useMatchIntro } from '../hooks/useMatchIntro'

interface Props {
  intro: ReturnType<typeof useMatchIntro>
  redName: string
  blackName: string
}

const nameStyle = 'relative min-w-0 border-y-2 border-[#a77b32] px-2 py-3 text-center font-["Segoe_Script","URW_Chancery_L",Georgia,cursive] text-[clamp(18px,3.4vw,40px)] leading-tight font-black italic text-[#b88a42] [overflow-wrap:anywhere] [-webkit-text-stroke:0.4px_currentColor] [text-shadow:0_2px_2px_#201207] shadow-[0_1px_0_#e4c47c66,inset_0_1px_0_#e4c47c66]'
const beamStyle = 'absolute top-0 h-full w-[18%] opacity-0 bg-[linear-gradient(90deg,transparent,#e4aa3288,#fff2b8,transparent)] blur-[2px] [filter:drop-shadow(0_0_8px_#ffca50)]'
export function MatchIntro({ intro, redName, blackName }: Props) {
  return <div ref={intro.panelRef} hidden={!intro.visible} data-testid="match-intro" className="pointer-events-none fixed inset-0 z-40 overflow-hidden" role="status" aria-label="Khai cuộc">
    <div className="absolute inset-0 bg-[#100d08]/45 backdrop-blur-[2px]" aria-hidden="true" />
    <div className="absolute top-1/2 left-1/2 w-[min(94vw,760px)] -translate-x-1/2 -translate-y-1/2">
      <div className="relative grid grid-cols-[minmax(0,1fr)_clamp(76px,14vw,140px)_minmax(0,1fr)] items-center gap-2">
        <div ref={intro.redRef} className={nameStyle}><span>{redName}</span></div>
        <svg ref={intro.crossRef} viewBox="0 0 100 100" className="relative z-2 w-full [filter:drop-shadow(0_3px_3px_#100b06)]" aria-hidden="true">
          <circle cx="50" cy="50" r="47" fill="#231b10" stroke="#b88a42" strokeWidth="2" />
          <circle cx="50" cy="50" r="43" fill="none" stroke="#e4c47c" strokeWidth="0.5" />
          <g transform="translate(14 14) scale(.72)">
          {[-45, 45].map(angle => <g key={angle} transform={`rotate(${angle} 50 50)`} stroke="#68451f" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M50 2 56 15 54 66H46L44 15Z" fill="#f1ead5" />
            <path d="M50 7V65h4l2-50Z" fill="#b9b5a4" stroke="none" />
            <path d="M50 9v51" stroke="#fffaf0" />
            <path d="m36 64 14 3 14-3 2 7-16 2-16-2Z" fill="#d8ae55" />
            <path d="M46 73h8v18h-8Z" fill="#714326" />
            <path d="m46 77 8 2m-8 3 8 2m-8 3 8 2" stroke="#d8ae55" />
            <path d="m50 90 6 4-6 5-6-5Z" fill="#d8ae55" />
          </g>)}
        </g>
        </svg>
        <div ref={intro.blackRef} className={nameStyle}><span>{blackName}</span></div>
        <div className="pointer-events-none absolute inset-0 z-3 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"><span ref={intro.leftBeamRef} className={beamStyle} /></div>
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"><span ref={intro.rightBeamRef} className={beamStyle} /></div>
        </div>
      </div>
    </div>
  </div>
}
