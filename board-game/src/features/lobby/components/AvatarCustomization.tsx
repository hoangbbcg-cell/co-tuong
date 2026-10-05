import { useState } from 'react'
import type { ReactNode } from 'react'
import avatarSelectionSprite from '../../../assets/profile/avatar-selection-sprite.png'
import { AVATAR_FRAMES, getAvatarFrame } from '../../../lib/avatarFrames'
import { AvatarRankBadge } from '../../game/components/AvatarRankBadge'
import { AvatarFrameOverlay } from '../../game/components/AvatarFrameOverlay'
import tabFrameIcon from '../../../assets/profile/customization-tab-frame.png'
import tabAvatarIcon from '../../../assets/profile/customization-tab-avatar.png'
import tabEffectIcon from '../../../assets/profile/customization-tab-effect.png'
import tabSkinIcon from '../../../assets/icons/2ddf00c5-60e9-4f2f-a241-07fb7a91a980.png'
import { buttonInteraction, selectionPalette } from '../../../lib/uiClasses'

const AVATAR_SPRITE_COLUMN_POSITIONS = [2.78, 26.41, 49.96, 73.55, 97.22]
const AVATAR_SPRITE_ROW_POSITIONS = [4.2, 48.83, 93.15]
const AVATAR_DISPLAY_ORDER = [0, 1, 3, 4, 7]

const actionButton = `${buttonInteraction} h-[46px] min-w-[178px] rounded-[10px] border-2 border-[#d29a43] bg-[linear-gradient(135deg,#3f1c0b,#1b0d06)] px-6 text-lg font-bold text-[#ffe4a3] shadow-[inset_0_0_0_2px_#5c2c11,0_2px_4px_#100602] hover:brightness-110`
const selectedButton = `${buttonInteraction} h-[46px] min-w-[208px] rounded-[10px] border-2 border-[#ffe08b] bg-[linear-gradient(180deg,#ffeaa7,#f1ae43)] px-6 text-lg font-bold text-[#492007] shadow-[inset_0_0_0_2px_#fff6c7,inset_0_-3px_0_#d38325,0_0_10px_#f9b34299] hover:brightness-105`
const selectedTabSurface = 'bg-[linear-gradient(145deg,#6c170b,#2b0b05)]'

function LockIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-[#e0b773] drop-shadow-[0_1px_1px_#170a04]"><path d="M7 10V7a5 5 0 0 1 10 0v3h1.2c.99 0 1.8.81 1.8 1.8v8.4c0 .99-.81 1.8-1.8 1.8H5.8c-.99 0-1.8-.81-1.8-1.8v-8.4c0-.99.81-1.8 1.8-1.8H7Zm2 0h6V7a3 3 0 0 0-6 0v3Zm3 3a2 2 0 0 0-1 3.73V19h2v-2.27A2 2 0 0 0 12 13Z" /></svg>
}

function SelectionCornerGlints() {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
    {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map(position => <svg key={position} viewBox="0 0 24 24" className={`absolute size-5 animate-pulse text-[#fff0a1] drop-shadow-[0_0_4px_#ffc83d] ${position}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22V9a7 7 0 0 1 7-7h13" strokeWidth="2" /><path d="m4 5 2-4 2 4 4 2-4 2-2 4-2-4-4-2z" fill="currentColor" strokeWidth="1" /></svg>)}
  </span>
}

type CustomizationTabIconName = 'frame' | 'avatar' | 'skin' | 'effect'

function CustomizationTabIcon({ name }: { name: CustomizationTabIconName }) {
  const icons: Record<CustomizationTabIconName, string> = {
    frame: tabFrameIcon,
    avatar: tabAvatarIcon,
    skin: tabSkinIcon,
    effect: tabEffectIcon,
  }

  return <span aria-hidden="true" className={`relative z-10 grid shrink-0 place-items-center ${name === 'skin' ? 'translate-y-[2px] size-9' : name === 'avatar' ? '-translate-y-[4px] size-6' : 'size-7'}`}><img src={icons[name]} alt="" className="block size-full object-contain" /></span>
}

export function AvatarPortrait({ avatarIndex, className }: { avatarIndex: number; className: string }) {
  const column = avatarIndex % 5
  const row = Math.floor(avatarIndex / 5)

  return <span aria-hidden="true" className={`block bg-no-repeat ${className}`} style={{ backgroundImage: `url(${avatarSelectionSprite})`, backgroundSize: '550% 330%', backgroundPosition: `${AVATAR_SPRITE_COLUMN_POSITIONS[column]}% ${AVATAR_SPRITE_ROW_POSITIONS[row]}%` }} />
}

export function AvatarCustomization({ onCancel, onUse, previewPanel, selectedAvatarIndex, selectedFrameIndex }: { onCancel: () => void; onUse: (avatarIndex: number, frameIndex: number) => void; previewPanel: ReactNode; selectedAvatarIndex: number; selectedFrameIndex: number }) {
  const [activeTab, setActiveTab] = useState<CustomizationTabIconName>('avatar')
  const [draftAvatarIndex, setDraftAvatarIndex] = useState(selectedAvatarIndex)
  const [draftFrameIndex, setDraftFrameIndex] = useState(selectedFrameIndex)
  const [appliedSelection, setAppliedSelection] = useState<{ avatarIndex: number; frameIndex: number } | null>(null)
  const selectionApplied = appliedSelection?.avatarIndex === draftAvatarIndex && appliedSelection.frameIndex === draftFrameIndex

  return <div className="flex min-h-0 flex-1 flex-col gap-2 text-[#f8dea6]">
    <section aria-label="Xem trước avatar" className="relative isolate grid h-[190px] shrink-0 grid-cols-[0.82fr_1fr] gap-3 rounded-[10px]">
      <div className="relative flex h-[188px] min-h-0 shrink-0 self-center -translate-y-[18px] flex-col items-center justify-center">
        <div className="relative h-[183px] w-[136px] shrink-0">
          <span className="absolute top-0 left-0 grid size-[136px] place-items-center">
            <span className="absolute size-full overflow-hidden rounded-full bg-[#123334]"><AvatarPortrait avatarIndex={draftAvatarIndex} className="size-full rounded-full" /></span><AvatarFrameOverlay src={getAvatarFrame(draftFrameIndex).image} /><AvatarRankBadge />
          </span>
        </div>
      </div>
      {previewPanel}
    </section>

    <nav aria-label="Danh mục tùy chỉnh avatar" className="grid h-[50px] shrink-0 grid-cols-4 gap-2">
      {[
        { label: 'Chọn avatar', icon: 'avatar' as const },
        { label: 'Chọn viền', icon: 'frame' as const },
        { label: 'Skin', icon: 'skin' as const },
        { label: 'Hiệu ứng', icon: 'effect' as const },
      ].map(tab => <button key={tab.icon} type="button" onClick={() => {
        if (activeTab !== tab.icon) {
          if (tab.icon === 'avatar') setDraftAvatarIndex(selectedAvatarIndex)
          if (tab.icon === 'frame') setDraftFrameIndex(selectedFrameIndex)
        }
        setActiveTab(tab.icon)
      }} aria-current={activeTab === tab.icon ? 'page' : undefined} className={`${buttonInteraction} relative flex h-full min-w-0 items-center justify-center gap-2 rounded-[10px] [corner-shape:scoop] border-2 p-0 font-cormorant text-[22px] font-semibold ${activeTab === tab.icon ? `${selectionPalette.selected.border} ${selectedTabSurface} ${selectionPalette.selected.text} ${selectionPalette.selected.glow}` : `${selectionPalette.unselected.border} ${selectionPalette.unselected.surface} ${selectionPalette.unselected.text} opacity-80`}`}>
        {activeTab === tab.icon && <SelectionCornerGlints />}<CustomizationTabIcon name={tab.icon} /><span className="relative z-10 inline-flex h-7 min-w-0 items-center truncate leading-none">{tab.label}</span>
      </button>)}
    </nav>

    {activeTab === 'avatar' ? <div aria-label="Chọn một trong 5 avatar" className="grid min-h-0 flex-1 grid-cols-5 grid-rows-3 gap-2 rounded-[10px] border border-[#9f6025] bg-[#1c0d07aa] p-2 shadow-[inset_0_0_12px_#0d0503]">
      {AVATAR_DISPLAY_ORDER.map(avatarIndex => <button key={`avatar-${avatarIndex}`} type="button" aria-label={`Chọn avatar nhân vật ${avatarIndex + 1}`} aria-pressed={draftAvatarIndex === avatarIndex} onClick={() => setDraftAvatarIndex(avatarIndex)} className={`${buttonInteraction} relative grid min-h-0 min-w-0 place-items-center overflow-hidden rounded-[9px] border-2 ${draftAvatarIndex === avatarIndex ? `${selectionPalette.selected.border} ${selectionPalette.selected.surface} ${selectionPalette.selected.glow}` : `${selectionPalette.unselected.border} ${selectionPalette.unselected.surface}`}`}>
        <AvatarPortrait avatarIndex={avatarIndex} className="h-[calc(100%-8px)] aspect-square rounded-full" />
        {draftAvatarIndex === avatarIndex && <SelectionCornerGlints />}
        {selectedAvatarIndex === avatarIndex && <span aria-hidden="true" className="absolute right-1 bottom-1 grid size-6 place-items-center rounded-full border-2 border-[#d4f387] bg-[#285a24] text-base font-bold leading-none text-[#eaffb5] shadow-[0_1px_3px_#170c04]">✓</span>}
      </button>)}
    </div> : activeTab === 'frame' ? <div aria-label="Khung avatar, 6 cột và 3 hàng" className="grid min-h-0 flex-1 grid-cols-6 grid-rows-3 gap-2 rounded-[10px] border border-[#9f6025] bg-[#1c0d07aa] p-2 shadow-[inset_0_0_12px_#0d0503]">
      {Array.from({ length: 18 }, (_, index) => index < AVATAR_FRAMES.length
        ? <button key={`frame-${index}`} type="button" aria-label={AVATAR_FRAMES[index].label} aria-pressed={draftFrameIndex === index} onClick={() => setDraftFrameIndex(index)} className={`${buttonInteraction} relative grid min-h-0 min-w-0 place-items-center overflow-hidden rounded-[9px] border-2 ${draftFrameIndex === index ? `${selectionPalette.selected.border} ${selectionPalette.selected.surface} ${selectionPalette.selected.glow}` : `${selectionPalette.unselected.border} ${selectionPalette.unselected.surface}`}`}>
          <span className="relative grid h-full max-h-full aspect-square place-items-center"><span className="relative grid size-[77.1%] place-items-center"><AvatarFrameOverlay src={AVATAR_FRAMES[index].image} /></span></span>
          {draftFrameIndex === index && <SelectionCornerGlints />}
          {selectedFrameIndex === index && <span aria-hidden="true" className="absolute right-1 bottom-1 grid size-6 place-items-center rounded-full border-2 border-[#d4f387] bg-[#285a24] text-base font-bold leading-none text-[#eaffb5] shadow-[0_1px_3px_#170c04]">✓</span>}
        </button>
        : <div key={`locked-frame-${index}`} role="img" aria-label={`Ô khung mẫu ${index + 1} đang khóa`} className={`relative grid min-h-0 min-w-0 place-items-center overflow-hidden rounded-[9px] border ${selectionPalette.unselected.border} ${selectionPalette.unselected.surface}`}><LockIcon /></div>)}
    </div> : <div aria-hidden="true" className="min-h-0 flex-1" />}

    <footer className="flex h-[50px] shrink-0 items-center justify-center gap-4">
      <button type="button" onClick={onCancel} className={actionButton}>Hủy</button>
      <button type="button" aria-disabled={selectionApplied} onClick={() => {
        if (selectionApplied) return
        onUse(draftAvatarIndex, draftFrameIndex)
        setAppliedSelection({ avatarIndex: draftAvatarIndex, frameIndex: draftFrameIndex })
      }} className={selectedButton} style={{ filter: selectionApplied ? 'brightness(0.65)' : undefined }}>Sử dụng</button>
    </footer>
  </div>
}
