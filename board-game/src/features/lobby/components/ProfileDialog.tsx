import { getComputerAvatar } from '../../../lib/computerAvatar'
import { FittedUiArtwork } from '../../../lib/FittedUiArtwork'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import type { useProfileLayout } from '../hooks/useProfileLayout'
import { useSessionStore } from '../../../store/sessionStore'
import { useMessageFriendship } from '../hooks/useMessageFriendship'
import { useProfileChallenge } from '../hooks/useProfileChallenge'
import { useAccountLogout } from '../hooks/useAccountLogout'
import profileTitle from '../../../assets/profile/info-title-friends-frame.png'
import profileActionButtonFrame from '../../../assets/profile/actions/button-frame.png'
import profileActionInfo from '../../../assets/profile/actions/info.png'
import profileActionChallenge from '../../../assets/profile/actions/challenge.png'
import profileActionFriend from '../../../assets/profile/actions/friend.png'
import profileActionRemoveFriend from '../../../assets/profile/actions/remove-friend.png'
import profileActionMessage from '../../../assets/profile/actions/message.png'
import profileActionFollow from '../../../assets/profile/actions/follow.png'
import profileActionGift from '../../../assets/profile/actions/gift.png'
import avatarCustomizationTitle from '../../../assets/profile/avatar-customization-title.png'
import xiangqiMode from '../../../assets/profile/mode-xiangqi.png'
import hiddenMode from '../../../assets/profile/mode-hidden.png'
import { PlayerInfoCard } from './PlayerInfoCard'
import profileScene from '../../../assets/profile/0ee91cbb-26f8-4bb8-bc0d-2fe1b86ad68b.png'
import honorsFrame from '../../../assets/profile/honors/honors-frame-tight.png'
import allHonorsIcon from '../../../assets/profile/honors/e3aedd93-2970-4bae-86c6-4b1937e9a288.png'
import honorsSelectionFrame from '../../../assets/profile/honors/76991422-5c14-4970-b197-0141d169d35d.png'
import honorsDetailFrame from '../../../assets/profile/honors/honors-detail-frame.png'
import arenaHonorFrame1 from '../../../assets/profile/honors/khung-thi-dau-1.png'
import arenaHonorFrame2 from '../../../assets/profile/honors/khung-thi-dau-2.png'
import arenaHonorFrame3 from '../../../assets/profile/honors/khung-thi-dau-3.png'
import awardedHonorFrame1 from '../../../assets/awarded-honors/phong-tang-1.png'
import awardedHonorFrame2 from '../../../assets/awarded-honors/phong-tang-2.png'
import awardedHonorFrame3 from '../../../assets/awarded-honors/phong-tang-3.png'
import awardedHonorFrame4 from '../../../assets/awarded-honors/phong-tang-4.png'
import awardedHonorFrame5 from '../../../assets/awarded-honors/phong-tang-5.png'
import lienThangFrameSprite from '../../../assets/awarded-honors/f1c6f373-f803-4331-a32e-b2d041c68110.png'
import totalGamesFrameSprite from '../../../assets/awarded-honors/6fc3cfba-04f1-4337-8430-8377074835f5.png'
import attendanceFrameSprite from '../../../assets/awarded-honors/bbceb019-6ed9-498e-aac8-30b90167f7b8.png'
import selectedHonorGlow from '../../../assets/profile/honors/189fd0e1-1168-4016-9dc0-6ec6124d03f9.png'
import grantHonorPanelFrame from '../../../assets/messages/options/frame.png'
import grantHonorRowFrame from '../../../assets/awarded-honors/grant-row.png'
import grantHonorSparkleFrame from '../../../assets/awarded-honors/grant-row-sparkle.png'
import { useHonorGrants } from '../hooks/useHonorGrants'
import editIcon from '../../../assets/icons/903174a3-cfa1-4f7c-badc-1dd24d62c991.png'
import { buttonInteraction } from '../../../lib/uiClasses'
import { AvatarCustomization, AvatarPortrait } from './AvatarCustomization'
import { getAvatarFrame } from '../../../lib/avatarFrames'
import { AvatarRankBadge } from '../../game/components/AvatarRankBadge'
import { AvatarFrameOverlay, AVATAR_FRAME_VISIBLE_SCALE } from '../../game/components/AvatarFrameOverlay'
import { VietnamAddressPicker } from './VietnamAddressPicker'
import { MessagesFriendRemovalConfirmation } from './MessagesFriendButton'
import { getHonorTitleFontSize, normalizeHonorTitle } from '../honorTitleText'

const panel = 'relative rounded-[var(--ui-p-14,14px)] border-2 border-[#c58a35] bg-[linear-gradient(135deg,#3b1d0b,#1b100b)] shadow-[inset_0_0_0_2px_#7d451b,inset_0_0_22px_#120904,0_2px_4px_#14080499]'
const goldButton = `${buttonInteraction} min-w-[var(--ui-p-210,210px)] rounded-[var(--ui-p-12,12px)] border-2 border-[#e3a74c] bg-[linear-gradient(135deg,#734016,#261207_62%,#59260f)] px-6 py-3 text-lg font-bold text-[#ffebba] shadow-[inset_0_0_0_2px_#4b200b,inset_0_0_0_4px_#bd772c,0_3px_4px_#14080488] [text-shadow:0_2px_2px_#291207] hover:brightness-110`

const HONOR_BADGE_ASPECT_CLASS = 'aspect-[3/1]'
const TITLE_FRAME_BUTTON_BASE_CLASS = `title-frame relative w-full min-w-0 ${HONOR_BADGE_ASPECT_CLASS} isolate cursor-pointer border-0 bg-transparent p-0 text-inherit [container-type:inline-size] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ffe08b]`
const SELECTED_TITLE_FRAME_FILTER = 'drop-shadow(0 0 max(0.8px, 0.45cqw) rgba(255, 238, 169, 0.95)) drop-shadow(0 0 max(1.4px, 1.1cqw) rgba(255, 196, 64, 0.85)) drop-shadow(0 0 max(2px, 1.8cqw) rgba(230, 136, 29, 0.55))'
const UNSELECTED_TITLE_FRAME_FILTER = 'drop-shadow(0 0 max(0.8px, 0.45cqw) rgba(255, 238, 169, 0)) drop-shadow(0 0 max(1.4px, 1.1cqw) rgba(255, 196, 64, 0)) drop-shadow(0 0 max(2px, 1.8cqw) rgba(230, 136, 29, 0))'
const titleFrameButtonClass = (selected: boolean, extraClass = '') => `${TITLE_FRAME_BUTTON_BASE_CLASS} ${selected ? 'selected' : ''} ${extraClass}`
const HONOR_ARTWORK_TARGET_ASPECT_RATIO = 5.5
const HONOR_TITLE_FONT_CLASS = 'font-honor-title font-bold italic'
const HONOR_TITLE_GOLD_TEXT_STYLE: CSSProperties = {
  letterSpacing: 0,
  fontKerning: 'normal',
  fontVariantLigatures: 'normal',
  backgroundImage: 'linear-gradient(180deg, #F7E397 0%, #F7E397 30%, #EEB33C 72%, #EEB33C 100%)',
  backgroundSize: '100% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  WebkitTextStroke: '0.012em #9a4a10',
}
const HONORS_CATEGORIES = [
  { id: 'all', label: 'Tất cả', top: '13%', height: '8.6%' },
  { id: 'arena', label: 'Vinh Quang Kỳ Đài', top: '22.4%', height: '9.4%' },
  { id: 'awarded', label: 'Danh Hiệu Phong Tặng', top: '32.6%', height: '10.2%' },
  { id: 'streak', label: 'Chuỗi Chiến Thắng', top: '43.3%', height: '9.9%' },
  { id: 'games', label: 'Tổng Ván Chơi', top: '54.1%', height: '10.1%' },
  { id: 'attendance', label: 'Online Chuyên Cần', top: '64.8%', height: '10.5%' },
] as const
type ArenaHonor = { id: string; level: 1 | 2 | 3; rank: 1 | 2 | 3; title: string; image: string; description: string; howToEarn: string }
const ARENA_HONORS: ArenaHonor[] = ([
  { level: 1, scope: 'Quốc gia', image: arenaHonorFrame1 },
  { level: 2, scope: 'Tỉnh', image: arenaHonorFrame2 },
  { level: 3, scope: 'Xã', image: arenaHonorFrame3 },
] as const).flatMap(({ level, scope, image }) => ([
  { rank: 1, title: 'Quán Quân', result: 'vô địch' },
  { rank: 2, title: 'Á Quân', result: 'đạt Á quân' },
  { rank: 3, title: 'Hạng Ba', result: 'đạt Hạng Ba' },
] as const).map(({ rank, title, result }) => ({
  id: `arena_${level}_${rank}`, level, rank, title, image,
  description: `${level === 1 && rank === 1 ? 'Danh hiệu cao quý nhất.\n' : ''}${rank === 1 ? 'Quán quân' : rank === 2 ? 'Á quân' : 'Hạng Ba'} cờ tướng cấp ${scope}.`,
  howToEarn: `Không thể tự mở khóa.\nNhận được khi ${result} giải đấu cờ tướng cấp ${scope}.`,
})))
const AWARDED_HONOR_LEVELS = [
  { level: 1, image: awardedHonorFrame1, honors: [
    { id: 'ky-dao', name: 'Kỳ Đạo', displayName: 'Kỳ Đạo', description: 'Danh hiệu tôn vinh người có phẩm chất và uy tín nổi bật trong kỳ đàn.', visibilityNote: 'Chỉ xuất hiện khi có đủ 20 người chơi khác phong tặng.' },
    { id: 'huyen-thoai', name: 'Huyền Thoại', displayName: 'Huyền Thoại', description: 'Danh hiệu tôn vinh kỳ thủ để lại dấu ấn đặc biệt trong kỳ đàn.', visibilityNote: 'Chỉ xuất hiện khi có đủ 20 người chơi khác phong tặng.' },
    { id: 'ton-su', name: 'Tôn Sư', displayName: 'Tôn Sư', description: 'Danh hiệu dành cho người được kính trọng về kỳ nghệ và kinh nghiệm.', visibilityNote: 'Chỉ xuất hiện khi có đủ 20 người chơi khác phong tặng.' },
  ] },
  { level: 2, image: awardedHonorFrame2, honors: [
    { id: 'danh-su', name: 'Danh Sư', displayName: 'Danh Sư', description: 'Dành cho người có kinh nghiệm, thường xuyên chỉ dẫn và chia sẻ kỳ nghệ.' },
    { id: 'cao-nhan', name: 'Cao Nhân', displayName: 'Cao Nhân', description: 'Dành cho kỳ thủ có kỳ nghệ cao, được những người chơi khác nể trọng.' },
    { id: 'bac-thay', name: 'Bậc Thầy', displayName: 'Bậc Thầy', description: 'Ghi nhận người có kiến thức và kinh nghiệm sâu rộng về cờ tướng.' },
  ] },
  { level: 3, image: awardedHonorFrame3, honors: [
    { id: 'ky-phung', name: 'Kỳ Phùng', displayName: 'Kỳ Phùng', description: 'Dành cho kỳ thủ được xem là một đối thủ xứng tầm và đáng gặp lại.' },
    { id: 'doi-thu', name: 'Đối Thủ', displayName: 'Đối Thủ', description: 'Dành cho người chơi được đối phương đánh giá cao sau những ván cờ.' },
    { id: 'quan-tu', name: 'Quân Tử', displayName: 'Quân Tử', description: 'Dành cho người chơi có tinh thần fair-play và cách ứng xử đẹp trên kỳ đàn.' },
  ] },
  { level: 4, image: awardedHonorFrame4, honors: [
    { id: 'nghia-hiep', name: 'Nghĩa Hiệp', displayName: 'Nghĩa Hiệp', description: 'Dành cho người thường xuyên giúp đỡ và hỗ trợ những kỳ hữu khác.' },
    { id: 'truyen-lua', name: 'Truyền Lửa', displayName: 'Truyền Lửa', description: 'Dành cho người truyền cảm hứng và khuyến khích người khác gắn bó với cờ tướng.' },
    { id: 'hao-han', name: 'Hảo Hán', displayName: 'Hảo Hán', description: 'Dành cho người chơi hào sảng, thân thiện và được kỳ hữu quý mến.' },
  ] },
  { level: 5, image: awardedHonorFrame5, honors: [
    { id: 'ky-huu', name: 'Kỳ Hữu', displayName: 'Kỳ Hữu', description: 'Dành cho người chơi thân thiện, thường xuyên giao lưu cùng những kỳ hữu khác.' },
    { id: 'dong-hanh', name: 'Đồng Hành', displayName: 'Đồng Hành', description: 'Dành cho người thường xuyên sát cánh, giao lưu và chơi cờ cùng kỳ hữu.' },
    { id: 'tri-ky', name: 'Tri Kỷ', displayName: 'Tri Kỷ', description: 'Dành cho người tạo được sự gắn bó và tình bằng hữu đặc biệt trên kỳ đàn.' },
  ] },
] as const

type AwardedHonorLevel = 1 | 2 | 3 | 4 | 5
type AwardedHonor = { id: string; level: AwardedHonorLevel; name: string; displayName: string; description: string; visibilityNote?: string; howToEarn: string; endorsementCount?: number; image: string; viewCount?: number }
const AWARDED_FRAME_ALPHA_BOUNDS: Record<AwardedHonorLevel, { left: number; top: number; right: number; bottom: number }> = {
  1: { left: 288, top: 27, right: 1212, bottom: 473 },
  2: { left: 362, top: 82, right: 1138, bottom: 418 },
  3: { left: 345, top: 87, right: 1155, bottom: 413 },
  4: { left: 320, top: 101, right: 1180, bottom: 399 },
  5: { left: 341, top: 154, right: 1159, bottom: 346 },
}
const AWARDED_FRAME_CANVAS = { width: 1500, height: 500 }
// Source PNG row at the frame's upper edge beneath the eye/count anchor (near 83% of the badge width).
const AWARDED_FRAME_COUNTER_ANCHOR_Y: Partial<Record<AwardedHonorLevel, number>> = { 2: 126, 3: 147, 4: 118, 5: 117 }
const AWARDED_HONOR_ENDORSEMENT_THRESHOLDS: Record<AwardedHonorLevel, number> = { 1: 20, 2: 15, 3: 10, 4: 5, 5: 3 }
const AWARDED_HONORS: AwardedHonor[] = AWARDED_HONOR_LEVELS.flatMap(({ level, image, honors }) =>
  honors.map(honor => ({ ...honor, id: `pt_${level}_${honor.id}`, level, image, howToEarn: level === 1 ? 'Nhận được khi có 20 người chơi khác phong tặng danh hiệu này.' : 'Nhận được khi có người chơi khác phong tặng danh hiệu này.' })),
)
type StreakHonorFrame = 'lien-thang-1' | 'lien-thang-2'
type StreakHonor = { id: string; level: 1 | 2; name: string; displayName: string; frame: StreakHonorFrame; description: string; howToEarn: string }
// Priority order from highest to lowest.
const STREAK_HONORS: StreakHonor[] = [
  { id: 'bat-bai-2', level: 2, name: 'Bất Bại', displayName: 'Bất Bại', frame: 'lien-thang-2', description: 'Danh hiệu cao nhất của Chuỗi Chiến Thắng, ghi nhận một chuỗi trận bất bại đầy ấn tượng.', howToEarn: 'Thắng 20 ván liên tiếp.' },
  { id: 'thong-tri-1', level: 1, name: 'Thống Trị', displayName: 'Thống Trị', frame: 'lien-thang-1', description: 'Danh hiệu dành cho kỳ thủ duy trì chuỗi chiến thắng vượt trội.', howToEarn: 'Thắng 15 ván liên tiếp.' },
  { id: 'lien-thang-1', level: 1, name: 'Liên Thắng', displayName: 'Liên Thắng', frame: 'lien-thang-1', description: 'Ghi nhận kỳ thủ tạo được chuỗi chiến thắng đáng chú ý.', howToEarn: 'Thắng 10 ván liên tiếp.' },
  { id: 'da-thang-1', level: 1, name: 'Đà Thắng', displayName: 'Đà Thắng', frame: 'lien-thang-1', description: 'Ghi nhận kỳ thủ đang duy trì phong độ chiến thắng ổn định.', howToEarn: 'Thắng 5 ván liên tiếp.' },
  { id: 'khoi-thang-1', level: 1, name: 'Khởi Thắng', displayName: 'Khởi Thắng', frame: 'lien-thang-1', description: 'Ghi nhận bước khởi đầu của một chuỗi chiến thắng.', howToEarn: 'Thắng 3 ván liên tiếp.' },
]
type GamesHonorFrame = 'games-1' | 'games-2'
type GamesHonor = { id: string; level: 1 | 2; name: string; displayName: string; frame: GamesHonorFrame; description: string; howToEarn: string }
// Priority order from highest to lowest; top sprite is level 2, ornate bottom sprite is level 1.
const GAMES_HONORS: GamesHonor[] = [
  { id: 'lao-lang-ky-dan-1', level: 1, name: 'Lão Làng Kỳ Đàn', displayName: 'Lão Làng Kỳ Đàn', frame: 'games-1', description: 'Danh hiệu cao nhất dành cho kỳ thủ đã trải qua vô số ván đấu trên kỳ đàn.', howToEarn: 'Hoàn thành 10.000 ván cờ.' },
  { id: 'ky-thu-lau-nam-2', level: 2, name: 'Kỳ Thủ Lâu Năm', displayName: 'Kỳ Thủ Lâu Năm', frame: 'games-2', description: 'Ghi nhận kỳ thủ có thời gian thi đấu lâu dài và giàu kinh nghiệm.', howToEarn: 'Hoàn thành 3.000 ván cờ.' },
  { id: 'lao-luyen-2', level: 2, name: 'Lão Luyện', displayName: 'Lão Luyện', frame: 'games-2', description: 'Ghi nhận kỳ thủ đã tích lũy nhiều kinh nghiệm qua những ván đấu.', howToEarn: 'Hoàn thành 1.000 ván cờ.' },
  { id: 'day-dan-2', level: 2, name: 'Dày Dặn', displayName: 'Dày Dặn', frame: 'games-2', description: 'Ghi nhận kỳ thủ đã trải qua nhiều trận đấu và tích lũy kinh nghiệm.', howToEarn: 'Hoàn thành 500 ván cờ.' },
  { id: 'khoi-dau-2', level: 2, name: 'Khởi Đầu', displayName: 'Khởi Đầu', frame: 'games-2', description: 'Dấu mốc đầu tiên trên hành trình tích lũy kinh nghiệm tại kỳ đàn.', howToEarn: 'Hoàn thành 100 ván cờ.' },
]
type AttendanceHonorFrame = 'attendance-1' | 'attendance-2'
type AttendanceHonor = { id: string; level: 1 | 2; name: string; displayName: string; frame: AttendanceHonorFrame; description: string; howToEarn: string }
// Level 1 has priority; level 2 titles follow in reverse of the supplied order.
const ATTENDANCE_HONORS: AttendanceHonor[] = [
  { id: 'thuong-truc-1', level: 1, name: 'Thường Trực', displayName: 'Thường Trực', frame: 'attendance-1', description: 'Danh hiệu cao nhất ghi nhận sự gắn bó lâu dài và thường xuyên với kỳ đàn.', howToEarn: 'Có hoạt động trong 365 ngày.' },
  { id: 'ben-bi-2', level: 2, name: 'Bền Bỉ', displayName: 'Bền Bỉ', frame: 'attendance-2', description: 'Ghi nhận kỳ thủ duy trì sự hiện diện và gắn bó trong thời gian dài.', howToEarn: 'Có hoạt động trong 180 ngày.' },
  { id: 'chuyen-can-2', level: 2, name: 'Chuyên Cần', displayName: 'Chuyên Cần', frame: 'attendance-2', description: 'Ghi nhận sự chăm chỉ và thường xuyên hoạt động trên kỳ đàn.', howToEarn: 'Có hoạt động trong 100 ngày.' },
  { id: 'sieng-nang-2', level: 2, name: 'Siêng Năng', displayName: 'Siêng Năng', frame: 'attendance-2', description: 'Ghi nhận kỳ thủ thường xuyên quay lại và tham gia hoạt động.', howToEarn: 'Có hoạt động trong 30 ngày.' },
  { id: 'tich-cuc-2', level: 2, name: 'Tích Cực', displayName: 'Tích Cực', frame: 'attendance-2', description: 'Dấu mốc dành cho kỳ thủ bắt đầu duy trì hoạt động đều đặn.', howToEarn: 'Có hoạt động trong 7 ngày.' },
]
const PROFILE_HONOR_CATEGORIES = ['arena', 'awarded', 'streak', 'games', 'attendance'] as const
type ProfileHonorCategory = (typeof PROFILE_HONOR_CATEGORIES)[number]
const HONORS_BY_CATEGORY = {
  arena: ARENA_HONORS,
  awarded: AWARDED_HONORS,
  streak: STREAK_HONORS,
  games: GAMES_HONORS,
  attendance: ATTENDANCE_HONORS,
}
const STREAK_FRAME_CROPS: Record<StreakHonorFrame, { image: string; aspectRatio: string; artworkWidthPercent: number; visualScaleY: number; imageTop: string; imageLeft: string; imageWidth: string; imageHeight: string }> = {
  'lien-thang-1': { image: lienThangFrameSprite, aspectRatio: '1980 / 290', artworkWidthPercent: 86, visualScaleY: (1980 / 290) / HONOR_ARTWORK_TARGET_ASPECT_RATIO, imageTop: '-20.69%', imageLeft: '-1.72%', imageWidth: '103.43%', imageHeight: `${(768 / 290) * 100}%` },
  'lien-thang-2': { image: lienThangFrameSprite, aspectRatio: '2020 / 368', artworkWidthPercent: 96, visualScaleY: ((2020 / 368) / HONOR_ARTWORK_TARGET_ASPECT_RATIO) * 1.22, imageTop: '-95.11%', imageLeft: '-0.69%', imageWidth: '101.39%', imageHeight: `${(768 / 368) * 100}%` },
}
const GAMES_BADGE_TARGET_WIDTH_PERCENT = 86
const getGamesArtworkScaleY = (aspectRatio: number) => aspectRatio / HONOR_ARTWORK_TARGET_ASPECT_RATIO
const GAMES_FRAME_CROPS: Record<GamesHonorFrame, { image: string; aspectRatio: string; artworkWidthPercent: number; visualScaleY: number; imageTop: string; imageLeft: string; imageWidth: string; imageHeight: string }> = {
  'games-2': { image: totalGamesFrameSprite, aspectRatio: '1728 / 268', artworkWidthPercent: GAMES_BADGE_TARGET_WIDTH_PERCENT, visualScaleY: getGamesArtworkScaleY(1728 / 268), imageTop: '-43.28%', imageLeft: '-1.33%', imageWidth: '102.66%', imageHeight: `${(887 / 268) * 100}%` },
  'games-1': { image: totalGamesFrameSprite, aspectRatio: '1764 / 360', artworkWidthPercent: 96, visualScaleY: getGamesArtworkScaleY(1764 / 360) * 1.3, imageTop: '-116.94%', imageLeft: '-0.28%', imageWidth: '100.57%', imageHeight: `${(887 / 360) * 100}%` },
}
const ATTENDANCE_FRAME_CROPS: Record<AttendanceHonorFrame, { image: string; aspectRatio: string; artworkWidthPercent: number; visualScaleY: number; imageTop: string; imageLeft: string; imageWidth: string; imageHeight: string }> = {
  'attendance-2': { image: attendanceFrameSprite, aspectRatio: '1631 / 261', artworkWidthPercent: 86, visualScaleY: (1631 / 261) / HONOR_ARTWORK_TARGET_ASPECT_RATIO, imageTop: '-47.51%', imageLeft: '-1.35%', imageWidth: '102.51%', imageHeight: `${(941 / 261) * 100}%` },
  'attendance-1': { image: attendanceFrameSprite, aspectRatio: '1663 / 363', artworkWidthPercent: 96, visualScaleY: ((1663 / 363) / HONOR_ARTWORK_TARGET_ASPECT_RATIO) * 1.3, imageTop: '-120.11%', imageLeft: '-0.24%', imageWidth: '100.54%', imageHeight: `${(941 / 363) * 100}%` },
}

function getSpriteFrameBoxStyle(crop: { aspectRatio: string; artworkWidthPercent: number; visualScaleY: number }): CSSProperties {
  return { left: '50%', top: '50%', width: `${crop.artworkWidthPercent}%`, aspectRatio: Number(crop.aspectRatio.split('/')[0]) / Number(crop.aspectRatio.split('/')[1]) / crop.visualScaleY, transform: 'translate(-50%, -50%)' }
}

function getAwardedFrameVisibleBoxStyle(level: AwardedHonorLevel): CSSProperties {
  const bounds = AWARDED_FRAME_ALPHA_BOUNDS[level]
  const scaleX = level === 2 || level === 3 ? 1.7 : level === 5 ? 1.58 : 1.52
  const scaleY = 1.36
  const left = 50 + ((bounds.left / AWARDED_FRAME_CANVAS.width) * 100 - 50) * scaleX
  const right = 50 + ((bounds.right / AWARDED_FRAME_CANVAS.width) * 100 - 50) * scaleX
  const top = 50 + ((bounds.top / AWARDED_FRAME_CANVAS.height) * 100 - 50) * scaleY
  const bottom = 50 + ((bounds.bottom / AWARDED_FRAME_CANVAS.height) * 100 - 50) * scaleY
  return { left: `${left}%`, top: `${top}%`, width: `${right - left}%`, height: `${bottom - top}%` }
}

function SelectedTitleFrameEffect({ active, frameStyle, sizeScale = 1, intensity = 1 }: { active: boolean; frameStyle: CSSProperties; sizeScale?: number; intensity?: number }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute z-0 overflow-visible [container-type:inline-size] transition-opacity duration-200 ease-out ${active ? 'opacity-100' : 'opacity-0'}`} style={frameStyle}>
    <CrispUiImage src={selectedHonorGlow} alt="" style={{ width: `${115 * sizeScale}%`, opacity: intensity }} className="pointer-events-none absolute left-1/2 top-1/2 block h-auto max-w-none -translate-x-1/2 -translate-y-1/2" />
  </div>
}

function getProgressHonorGlowScale(levelOneFrame: boolean) {
  return levelOneFrame ? 1.05 : 1.08
}

function getProgressHonorGlowIntensity(levelOneFrame: boolean) {
  return levelOneFrame ? 0.6 : 0.7
}

function getArenaHonorDetailTitleOffsetY(honor: ArenaHonor) {
  return honor.level === 1 && honor.rank === 2 ? -1 : honor.level === 2 ? 2 : honor.level === 3 ? -2 : 0
}

function ArenaHonorTitle({ honor, detailOffsetY = 0, previewOffsetY = 0 }: { honor: ArenaHonor; detailOffsetY?: number; previewOffsetY?: number }) {
  const normalizedTitle = normalizeHonorTitle(honor.title)
  return <span aria-label={normalizedTitle} className={`relative z-50 inline-block whitespace-nowrap py-[0.04em] ${HONOR_TITLE_FONT_CLASS} text-[length:clamp(var(--ui-p-10,10px),9cqw,var(--ui-p-29,29px))] leading-[1.2] drop-shadow-[0_1px_0_#5f1c00] ${honor.level === 3 || honor.rank === 2 && honor.level === 1 ? 'translate-y-px' : honor.rank === 3 && honor.level === 2 ? '-translate-y-px' : ''}`} style={{ ...HONOR_TITLE_GOLD_TEXT_STYLE, top: detailOffsetY || previewOffsetY || undefined }}>{normalizedTitle}</span>
}

function ArenaHonorBadge({ honor, isSelected, onSelect }: { honor: ArenaHonor; isSelected: boolean; onSelect: (honor: ArenaHonor) => void }) {
  return <button type="button" aria-pressed={isSelected} aria-label={`Xem thông tin ${honor.title} cấp ${honor.level}`} onClick={event => { event.stopPropagation(); onSelect(honor) }} className={titleFrameButtonClass(isSelected)}>
    <SelectedTitleFrameEffect active={isSelected} frameStyle={{ inset: 0 }} sizeScale={honor.level === 1 ? 1.3 : honor.level === 2 ? 1.25 : 1.2} />
    <FittedUiArtwork scaleY={1.16} src={honor.image} alt="" aria-hidden="true" style={{ filter: isSelected ? SELECTED_TITLE_FRAME_FILTER : UNSELECTED_TITLE_FRAME_FILTER }} className="pointer-events-none absolute inset-0 z-10 block size-full object-contain transition-[filter] duration-200 ease-out" />
    <span className={`pointer-events-none absolute inset-0 z-20 flex ${honor.level === 3 ? 'translate-y-0' : 'translate-y-[var(--ui-p-2,2px)]'} items-center justify-center overflow-hidden whitespace-nowrap px-[15%] text-center`}><ArenaHonorTitle honor={honor} /></span>
  </button>
}

function getProfileArenaHonorPreviewTitleOffsetY(honor: ArenaHonor) {
  return honor.level === 1 ? (honor.rank === 1 ? 2 : 1) : honor.level === 2 ? 2 : 0
}

function getProfileAwardedHonorPreviewTitleOffsetY(level: number) {
  return level === 2 || level === 5 ? 1 : 0
}

function getAwardedHonorDetailTitleOffsetY(level: number) {
  return level === 1 ? 3 : level === 2 ? -1 : level === 3 ? 0 : level === 4 || level === 5 ? -5 : 0
}

function AwardedHonorTitle({ displayName, detailOffsetY = 0, previewOffsetY = 0 }: { displayName: string; detailOffsetY?: number; previewOffsetY?: number }) {
  const normalizedName = normalizeHonorTitle(displayName)
  return <span className={`relative z-50 block w-full overflow-hidden whitespace-nowrap py-[0.08em] text-center ${HONOR_TITLE_FONT_CLASS} leading-[1.3] drop-shadow-[0_1px_0_#5f1c00]`} style={{ ...HONOR_TITLE_GOLD_TEXT_STYLE, top: detailOffsetY || previewOffsetY || undefined, fontSize: `clamp(10px, min(${getHonorTitleFontSize(normalizedName) + 3}px, 9cqw), 29px)` }}>{normalizedName}</span>
}

function StreakHonorTitle({ displayName }: { displayName: string }) {
  const normalizedName = normalizeHonorTitle(displayName)
  return <span className={`block w-full overflow-hidden whitespace-nowrap text-center ${HONOR_TITLE_FONT_CLASS} leading-[1.3] text-[#5b2605] drop-shadow-[0_1px_0_#fff0a8]`} style={{ fontSize: `clamp(10px, min(${getHonorTitleFontSize(normalizedName) + 3}px, 9cqw), 29px)`, letterSpacing: 0, fontKerning: 'normal', fontVariantLigatures: 'normal' }}>{normalizedName}</span>
}

function HonorDetailText({ text }: { text: string }) {
  return <>{normalizeHonorTitle(text).split(/(\d+(?:[.,]\d+)*)/u).map((part, index) => /^\d+(?:[.,]\d+)*$/u.test(part)
    ? <span key={index} className="inline-block align-baseline text-[1.08em] font-bold" style={{ fontVariantNumeric: 'lining-nums', fontFeatureSettings: '"lnum" 1', position: 'relative', top: '-0.04em' }}>{part}</span>
    : part)}</>
}

function StreakHonorBadge({ honor, isSelected, onSelect }: { honor: StreakHonor; isSelected: boolean; onSelect: (honor: StreakHonor) => void }) {
  const crop = STREAK_FRAME_CROPS[honor.frame]
  return <button type="button" aria-pressed={isSelected} aria-label={`Xem thông tin ${normalizeHonorTitle(honor.name)}, Chuỗi Chiến Thắng ${honor.level}`} onClick={event => { event.stopPropagation(); onSelect(honor) }} className={titleFrameButtonClass(isSelected)}>
    <SelectedTitleFrameEffect active={isSelected} frameStyle={getSpriteFrameBoxStyle(crop)} sizeScale={getProgressHonorGlowScale(honor.frame === 'lien-thang-2')} intensity={getProgressHonorGlowIntensity(honor.frame === 'lien-thang-2')} />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 transition-[filter] duration-200 ease-out" style={{ filter: `brightness(${isSelected ? 0.9 : 1}) ${isSelected ? SELECTED_TITLE_FRAME_FILTER : UNSELECTED_TITLE_FRAME_FILTER}` }}>
      <div className="absolute overflow-hidden" style={getSpriteFrameBoxStyle(crop)}>
        <CrispUiImage src={crop.image} alt="" className="absolute max-w-none" style={{ top: crop.imageTop, left: crop.imageLeft, width: crop.imageWidth, height: crop.imageHeight, objectFit: 'fill' }} />
      </div>
    </div>
    <span className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden whitespace-nowrap px-[15%] text-center transition-[filter] duration-200 ease-out ${isSelected ? 'brightness-[0.9]' : ''} ${honor.frame === 'lien-thang-2' ? 'translate-y-[var(--ui-p-2,2px)]' : ''}`}>
      <StreakHonorTitle displayName={honor.displayName} />
    </span>
  </button>
}

function GamesHonorBadge({ honor, isSelected, onSelect }: { honor: GamesHonor; isSelected: boolean; onSelect: (honor: GamesHonor) => void }) {
  const crop = GAMES_FRAME_CROPS[honor.frame]
  return <button type="button" aria-pressed={isSelected} aria-label={`Xem thông tin ${normalizeHonorTitle(honor.name)}, Tổng Ván Chơi ${honor.level}`} onClick={event => { event.stopPropagation(); onSelect(honor) }} className={titleFrameButtonClass(isSelected)}>
    <SelectedTitleFrameEffect active={isSelected} frameStyle={getSpriteFrameBoxStyle(crop)} sizeScale={getProgressHonorGlowScale(honor.frame === 'games-1')} intensity={getProgressHonorGlowIntensity(honor.frame === 'games-1')} />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 transition-[filter] duration-200 ease-out" style={{ filter: `brightness(${isSelected ? 0.9 : 1}) ${isSelected ? SELECTED_TITLE_FRAME_FILTER : UNSELECTED_TITLE_FRAME_FILTER}` }}>
      <div className="absolute overflow-hidden" style={getSpriteFrameBoxStyle(crop)}>
        <CrispUiImage src={crop.image} alt="" className="absolute max-w-none" style={{ top: crop.imageTop, left: crop.imageLeft, width: crop.imageWidth, height: crop.imageHeight, objectFit: 'fill' }} />
      </div>
    </div>
    <span className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden whitespace-nowrap px-[15%] text-center transition-[filter] duration-200 ease-out ${isSelected ? 'brightness-[0.9]' : ''} ${honor.frame === 'games-1' ? 'translate-y-[var(--ui-p-2,2px)]' : ''}`}>
      <StreakHonorTitle displayName={honor.displayName} />
    </span>
  </button>
}

function AttendanceHonorBadge({ honor, isSelected, onSelect }: { honor: AttendanceHonor; isSelected: boolean; onSelect: (honor: AttendanceHonor) => void }) {
  const crop = ATTENDANCE_FRAME_CROPS[honor.frame]
  return <button type="button" aria-pressed={isSelected} aria-label={`Xem thông tin ${normalizeHonorTitle(honor.name)}, Online Chuyên Cần ${honor.level}`} onClick={event => { event.stopPropagation(); onSelect(honor) }} className={titleFrameButtonClass(isSelected)}>
    <SelectedTitleFrameEffect active={isSelected} frameStyle={getSpriteFrameBoxStyle(crop)} sizeScale={getProgressHonorGlowScale(honor.frame === 'attendance-1')} intensity={getProgressHonorGlowIntensity(honor.frame === 'attendance-1')} />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 transition-[filter] duration-200 ease-out" style={{ filter: `brightness(${isSelected ? 0.9 : 1}) ${isSelected ? SELECTED_TITLE_FRAME_FILTER : UNSELECTED_TITLE_FRAME_FILTER}` }}>
      <div className="absolute overflow-hidden" style={getSpriteFrameBoxStyle(crop)}>
        <CrispUiImage src={crop.image} alt="" className="absolute max-w-none" style={{ top: crop.imageTop, left: crop.imageLeft, width: crop.imageWidth, height: crop.imageHeight, objectFit: 'fill' }} />
      </div>
    </div>
    <span className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden whitespace-nowrap px-[15%] text-center transition-[filter] duration-200 ease-out ${isSelected ? 'brightness-[0.9]' : ''}`}>
      <StreakHonorTitle displayName={honor.displayName} />
    </span>
  </button>
}

function AwardedHonorCount({ honor }: { honor: AwardedHonor }) {
  if (honor.level < 2) return null
  const frameAnchorY = AWARDED_FRAME_COUNTER_ANCHOR_Y[honor.level] ?? 0
  const viewBadgeTop = `${((frameAnchorY / 500) * 1.36 - 0.18) * 100}%`
  return <span aria-label={`Lượt phong tặng: ${honor.viewCount ?? 0}`} style={{ top: viewBadgeTop }} className="pointer-events-none absolute right-[12%] z-30 flex items-center gap-[0.24em] rounded-[0.45em] border border-[#d4a13c] bg-[linear-gradient(135deg,#8b6125,#5a3716)] px-[0.55em] py-[0.24em] text-[length:clamp(var(--ui-p-10,10px),4.4cqw,var(--ui-p-15,15px))] font-semibold leading-none text-[#ffe5a6] shadow-[0_1px_3px_#140804]">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-[1.35em] shrink-0" focusable="false" aria-hidden="true"><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></svg>
    <span className="font-number lining-nums tabular-nums">{honor.viewCount ?? 0}</span>
  </span>
}

function AwardedHonorBadge({ honor, isSelected, onSelect }: { honor: AwardedHonor; isSelected: boolean; onSelect: (honor: AwardedHonor) => void }) {
  const viewCount = honor.viewCount ?? 0
  const hasViewCount = honor.level >= 2
  const scaleX = honor.level === 2 || honor.level === 3 ? 1.7 : honor.level === 5 ? 1.58 : 1.52
  return <button type="button" aria-pressed={isSelected} aria-label={`Xem thông tin ${normalizeHonorTitle(honor.name)}${hasViewCount ? `. Lượt phong tặng: ${viewCount}` : ''}`} onClick={event => { event.stopPropagation(); onSelect(honor) }} className={titleFrameButtonClass(isSelected, `${honor.level === 1 ? 'translate-y-[var(--ui-p-2,2px)]' : honor.level >= 4 ? '-translate-y-[var(--ui-p-2,2px)]' : ''}`)}>
    <SelectedTitleFrameEffect active={isSelected} frameStyle={getAwardedFrameVisibleBoxStyle(honor.level)} sizeScale={honor.level <= 4 ? 1.3 : 1.25} />
    <FittedUiArtwork src={honor.image} alt="" aria-hidden="true" style={{ filter: isSelected ? SELECTED_TITLE_FRAME_FILTER : UNSELECTED_TITLE_FRAME_FILTER }} scaleX={scaleX} scaleY={1.36} className="pointer-events-none absolute inset-0 z-10 block size-full object-contain transition-[filter] duration-200 ease-out" />
    <AwardedHonorCount honor={honor} />
    <span style={{ top: honor.level === 1 ? 'calc(53% + 4px)' : honor.level === 3 ? 'calc(53% + 1px)' : honor.level === 4 ? 'calc(53% - 2px)' : honor.level === 5 ? 'calc(53% - 3px)' : '53%' }} className="pointer-events-none absolute left-1/2 z-20 flex h-full w-[70%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap text-center">
      <AwardedHonorTitle displayName={honor.displayName} />
    </span>
  </button>
}

export function AwardedHonorGrantPanel({ targetName, grantedHonorIds, onGrant, onClose, anchor }: { targetName: string; grantedHonorIds: string[]; onGrant: (honor: AwardedHonor) => void; onClose: () => void; anchor?: { left: number; top: number; width: number } }) {
  const panelRef = useRef<HTMLElement>(null)
  useEffect(() => {
    panelRef.current?.focus()
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); onClose() } }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [onClose])
  const width = Math.min(230, window.innerWidth - 24)
  const height = Math.min(360, window.innerHeight - 24)
  const left = anchor ? Math.max(12, Math.min(window.innerWidth - width - 12, anchor.left + anchor.width / 2 - width / 2)) : (window.innerWidth - width) / 2
  const top = anchor ? Math.max(12, Math.min(window.innerHeight - height - 12, anchor.top)) : (window.innerHeight - height) / 2
  return <div className="fixed inset-0 z-[1000]" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }} onContextMenu={event => { event.preventDefault(); onClose() }}>
    <section ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`Phong danh hiệu cho ${targetName}`} className="absolute overflow-hidden bg-[#30190b] outline-none" style={{ left, top, width, height }}>
      <CrispUiImage src={grantHonorPanelFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full max-w-none object-fill" />
      <div className="relative flex h-full flex-col px-[8%] pb-[6%] pt-[5%]">
        <h2 className="m-0 flex h-[40px] shrink-0 items-center justify-center gap-2 font-heading text-[18px] font-bold text-[#ffe5a6]"><span aria-hidden="true" className="text-[#d79b45]">❧</span>Phong danh hiệu<span aria-hidden="true" className="text-[#d79b45]">❧</span></h2>
        <div aria-label="Danh sách 15 danh hiệu Phong Tặng" className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-color:#e4b357_transparent] [scrollbar-width:thin]" style={{ '--grant-row-height': `calc((${height}px - 40px - ${width * .11}px) / 8)` } as CSSProperties}>
          {AWARDED_HONORS.map(honor => <button key={honor.id} type="button" aria-pressed={grantedHonorIds.includes(honor.id)} aria-label={`${grantedHonorIds.includes(honor.id) ? 'Bỏ phong' : 'Phong tặng'} ${honor.displayName} cho ${targetName}`} onClick={() => onGrant(honor)} className={`relative m-0 flex h-[var(--grant-row-height)] w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 font-heading text-[15px] font-semibold leading-none text-[#f3dda9] ${grantedHonorIds.includes(honor.id) ? 'brightness-50' : 'hover:brightness-125'}`}>
            <CrispUiImage src={honor.level === 1 ? grantHonorSparkleFrame : grantHonorRowFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full object-fill" />
            <span className="relative truncate px-[15%]">{honor.displayName}</span>
          </button>)}
        </div>
      </div>
    </section>
  </div>
}
type HonorDetail = ArenaHonor | AwardedHonor | StreakHonor | GamesHonor | AttendanceHonor
type ProfileHonorPreview = HonorDetail
type SpriteHonor = StreakHonor | GamesHonor | AttendanceHonor
type SelectedProfileHonors = Record<ProfileHonorCategory, string[]>
const PROFILE_HONORS_PER_PAGE = 9
const PROFILE_HONOR_HOLD_MS = 1500
const PROFILE_HONOR_SCROLL_MS = 6000
const PROFILE_HONOR_END_HOLD_MS = 500

function getProfileHonorPriorityLevel(honor: ProfileHonorPreview): number {
  return honor.id === 'bat-bai-2' ? 1 : honor.level
}

function createEmptySelectedProfileHonors(): SelectedProfileHonors {
  return { arena: [], awarded: [], streak: [], games: [], attendance: [] }
}

function loadSelectedProfileHonors(profileId: string): SelectedProfileHonors {
  const empty = createEmptySelectedProfileHonors()
  try {
    if (typeof window === 'undefined') return empty
    const stored = window.localStorage.getItem(`profile-honors:${profileId}`)
    if (!stored) return empty
    const parsed: unknown = JSON.parse(stored)
    if (!parsed || typeof parsed !== 'object') return empty
    const values = parsed as Record<string, unknown>
    for (const category of PROFILE_HONOR_CATEGORIES) {
      const knownIds = new Set(HONORS_BY_CATEGORY[category].map(honor => honor.id))
      const categoryValues = values[category]
      if (!Array.isArray(categoryValues)) continue
      empty[category] = [...new Set(categoryValues.filter((id): id is string => typeof id === 'string' && knownIds.has(id)))].slice(0, 3)
    }
  } catch {
    return createEmptySelectedProfileHonors()
  }
  return empty
}

function getProfileHonorCategory(honor: HonorDetail): ProfileHonorCategory {
  return PROFILE_HONOR_CATEGORIES.find(category => HONORS_BY_CATEGORY[category].some(candidate => candidate.id === honor.id)) ?? 'awarded'
}

function isProfileHonorSelectable(honor: HonorDetail): boolean {
  if ('rank' in honor || 'frame' in honor) return true
  return (honor.endorsementCount ?? 0) >= (honor.level === 1 ? 20 : 1)
}

function getUnlockedProfileHonors(resolveHonor: (honor: HonorDetail) => HonorDetail = honor => honor): HonorDetail[] {
  const honors: HonorDetail[] = []
  for (const category of PROFILE_HONOR_CATEGORIES) {
    if (category !== 'arena' && category !== 'awarded') continue
    honors.push(...HONORS_BY_CATEGORY[category].map(resolveHonor).filter(isProfileHonorSelectable))
  }
  return honors
}

function getSelectedProfileHonors(selected: SelectedProfileHonors): ProfileHonorPreview[] {
  const result: ProfileHonorPreview[] = []
  for (const category of PROFILE_HONOR_CATEGORIES) {
    for (const id of selected[category]) {
      const honor = HONORS_BY_CATEGORY[category].find(candidate => candidate.id === id)
      if (honor) result.push(honor)
    }
  }
  return result
}

function isSpriteHonor(honor: HonorDetail): honor is SpriteHonor {
  return 'frame' in honor
}

function getSpriteHonorCrop(honor: SpriteHonor) {
  const crop = honor.frame === 'lien-thang-1' || honor.frame === 'lien-thang-2'
    ? STREAK_FRAME_CROPS[honor.frame]
    : honor.frame === 'games-1' || honor.frame === 'games-2'
      ? GAMES_FRAME_CROPS[honor.frame]
      : ATTENDANCE_FRAME_CROPS[honor.frame]
  return crop
}

function HonorDetailSprite({ honor, isSelected = false }: { honor: SpriteHonor; isSelected?: boolean }) {
  const crop = getSpriteHonorCrop(honor)
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 transition-[filter] duration-200 ease-out ${isSelected ? 'z-10' : 'z-0'}`} style={{ filter: isSelected ? SELECTED_TITLE_FRAME_FILTER : UNSELECTED_TITLE_FRAME_FILTER }}>
    <div className="absolute overflow-hidden" style={getSpriteFrameBoxStyle(crop)}>
      <CrispUiImage src={crop.image} alt="" className="absolute max-w-none" style={{ top: crop.imageTop, left: crop.imageLeft, width: crop.imageWidth, height: crop.imageHeight, objectFit: 'fill' }} />
    </div>
  </div>
}

function ProfileHonorPreviewBadge({ honor, onSelect }: { honor: ProfileHonorPreview; onSelect: (honor: HonorDetail, trigger: HTMLButtonElement) => void }) {
  const buttonClass = titleFrameButtonClass(false, '!cursor-pointer !w-[106%] -ml-[3%] -translate-y-[2.83%]')
  if ('rank' in honor) return <button type="button" data-profile-honor-preview-badge="true" aria-label={`Xem thông tin ${normalizeHonorTitle(honor.title)}`} onClick={event => onSelect(honor, event.currentTarget)} className={buttonClass}>
    <FittedUiArtwork scaleY={1.16} src={honor.image} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 block size-full object-contain" />
    <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden whitespace-nowrap px-[15%] text-center">
      <ArenaHonorTitle honor={honor} previewOffsetY={getProfileArenaHonorPreviewTitleOffsetY(honor)} />
    </span>
  </button>

  if ('frame' in honor) return <button type="button" data-profile-honor-preview-badge="true" aria-label={`Xem thông tin ${normalizeHonorTitle(honor.name)}`} onClick={event => onSelect(honor, event.currentTarget)} className={buttonClass}>
    <HonorDetailSprite honor={honor} />
    <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden whitespace-nowrap px-[15%] text-center">
      <StreakHonorTitle displayName={honor.displayName} />
    </span>
  </button>

  const artworkScaleX = honor.level === 2 || honor.level === 3 ? 1.7 : honor.level === 5 ? 1.58 : 1.52
  const titleTop = honor.level === 1 ? 'calc(53% + 4px)' : honor.level === 3 ? 'calc(53% + 1px)' : honor.level === 4 ? 'calc(53% - 2px)' : honor.level === 5 ? 'calc(53% - 3px)' : '53%'
  return <button type="button" data-profile-honor-preview-badge="true" aria-label={`Xem thông tin ${normalizeHonorTitle(honor.name)}`} onClick={event => onSelect(honor, event.currentTarget)} className={buttonClass} style={{ translate: `0 calc(50% - ${titleTop})` }}>
    <FittedUiArtwork src={honor.image} alt="" aria-hidden="true" style={{ filter: UNSELECTED_TITLE_FRAME_FILTER }} scaleX={artworkScaleX} scaleY={1.36} className="pointer-events-none absolute inset-0 z-10 block size-full object-contain" />
    <AwardedHonorCount honor={honor} />
    <span style={{ top: titleTop }} className="pointer-events-none absolute left-1/2 z-20 flex h-full w-[70%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap text-center">
      <AwardedHonorTitle displayName={honor.displayName} previewOffsetY={getProfileAwardedHonorPreviewTitleOffsetY(honor.level)} />
    </span>
  </button>
}

function isStreakHonor(honor: HonorDetail): honor is StreakHonor {
  return 'frame' in honor && (honor.frame === 'lien-thang-1' || honor.frame === 'lien-thang-2')
}

function isGamesHonor(honor: HonorDetail): honor is GamesHonor {
  return 'frame' in honor && (honor.frame === 'games-1' || honor.frame === 'games-2')
}

function HonorCatalogBadge({ honor, isSelected, onSelect }: { honor: HonorDetail; isSelected: boolean; onSelect: (honor: HonorDetail) => void }) {
  if ('rank' in honor) return <ArenaHonorBadge honor={honor} isSelected={isSelected} onSelect={onSelect} />
  if ('frame' in honor) {
    if (isStreakHonor(honor)) return <StreakHonorBadge honor={honor} isSelected={isSelected} onSelect={onSelect} />
    if (isGamesHonor(honor)) return <GamesHonorBadge honor={honor} isSelected={isSelected} onSelect={onSelect} />
    return <AttendanceHonorBadge honor={honor} isSelected={isSelected} onSelect={onSelect} />
  }
  return <AwardedHonorBadge honor={honor} isSelected={isSelected} onSelect={onSelect} />
}

function ProfileHonorSelectionButton({ honorName, isSelected, canSelect, onToggle }: { honorName: string; isSelected: boolean; canSelect: boolean; onToggle: () => void }) {
  return <span className="absolute left-[3%] top-[2%] z-40 grid size-[clamp(var(--ui-p-18,18px),2cqw,var(--ui-p-24,24px))] place-items-center">
    <button type="button" aria-label={`${isSelected ? 'Bỏ khỏi' : 'Hiển thị'} hồ sơ: ${normalizeHonorTitle(honorName)}`} aria-pressed={isSelected} disabled={!isSelected && !canSelect} onClick={event => { event.stopPropagation(); onToggle() }} className={`relative z-10 grid size-full place-items-center rounded-full border border-[#e1b359] p-0 shadow-[0_1px_4px_#120803] transition-colors ${isSelected ? 'bg-[#2f9b58] text-white' : 'bg-[linear-gradient(135deg,#75471c,#321909)] text-[#ffe5a6]'} ${!isSelected && !canSelect ? 'cursor-not-allowed opacity-45' : 'cursor-pointer hover:brightness-125'}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isSelected ? 'size-[82%]' : 'size-[72%]'}>
        {isSelected ? <path d="m5 12 4 4L19 6" /> : <path d="M12 5v14M5 12h14" />}
      </svg>
    </button>
  </span>
}

function HonorHiddenToggle({ isHidden, onToggle, className = 'absolute right-[10.5%] top-[10%] z-20 translate-y-[var(--ui-p-10,10px)]' }: { isHidden: boolean; onToggle: () => void; className?: string }) {
  return <div className={`${className} flex items-center gap-2`}>
    <span className="font-cormorant text-[length:clamp(var(--ui-p-11,11px),1.3vw,var(--ui-p-16,16px))] font-bold text-[#ffe5a6]">Ẩn</span>
    <button type="button" role="switch" aria-label="Ẩn thông tin danh hiệu" aria-checked={isHidden} onClick={onToggle} className={`relative h-[var(--ui-p-20,20px)] w-[var(--ui-p-38,38px)] cursor-pointer rounded-full border border-[#dfbc7a] p-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe08b] ${isHidden ? 'bg-[#2f9b58]' : 'bg-[#777777]'}`}>
      <span aria-hidden="true" className={`absolute left-[var(--ui-p-2,2px)] top-1/2 size-[var(--ui-p-14,14px)] -translate-y-1/2 rounded-full bg-[#fff4d4] shadow-[0_1px_3px_#190b04] transition-transform duration-150 ${isHidden ? 'translate-x-[var(--ui-p-18,18px)]' : 'translate-x-0'}`} />
    </button>
  </div>
}

function HonorDetailPopover({ honor, onBack, standalonePosition, honorColumn, isHidden, onToggleHidden }: { honor: HonorDetail; onBack: () => void; standalonePosition?: { side: 'left' | 'right'; anchorX: number }; honorColumn?: number; isHidden?: boolean; onToggleHidden?: () => void }) {
  const standalone = standalonePosition !== undefined
  const isArenaHonor = 'rank' in honor
  const title = normalizeHonorTitle(isArenaHonor ? honor.title : honor.displayName)
  const descriptionLines = isArenaHonor
    ? honor.description.split('\n').filter(Boolean).map(text => ({ text, bullet: true }))
    : isSpriteHonor(honor)
      ? [{ text: honor.description, bullet: true }]
      : [
      { text: honor.description, bullet: true },
      ...(honor.visibilityNote ? [{ text: honor.visibilityNote, bullet: true }] : []),
      ...((honor.endorsementCount ?? 0) >= AWARDED_HONOR_ENDORSEMENT_THRESHOLDS[honor.level] ? [{ text: 'Đã được cộng đồng công nhận.', bullet: true }] : []),
    ]
  const howToEarnLines = honor.howToEarn.split('\n').filter(Boolean)
  const left = isArenaHonor && honor.rank === 3
    ? 'calc(27.9499% + 16.465px)'
    : isArenaHonor && honor.rank === 2
      ? 'calc(70.3167% + 15px)'
      : honorColumn === 1
        ? 'calc(70.3167% + 15px)'
        : 'calc(46.6333% + 15px)'

  const standaloneWidth = standalonePosition?.side === 'right'
    ? `min(82vw, 54dvh, calc(100vw - ${standalonePosition.anchorX}px))`
    : standalonePosition
      ? `min(82vw, 54dvh, ${standalonePosition.anchorX}px)`
      : undefined

  return <div data-honor-detail-popover="true" className={`absolute z-50 aspect-[932/1481] overflow-hidden ${standalone ? '' : 'top-[49.2173%] -translate-y-1/2'}`} style={{ left: standalonePosition ? `${standalonePosition.anchorX}px` : left, top: standalone ? '50%' : undefined, transform: standalonePosition ? `translate(${standalonePosition.side === 'left' ? '-100%' : '0'}, -50%)` : undefined, width: standalone ? standaloneWidth : 'calc(43.4168% - 31.465px)' }}>
    <CrispUiImage src={honorsDetailFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 block size-full" />
    <h2 id="honors-detail-title" className="sr-only">Thông tin danh hiệu: {title}</h2>
    {!standalone && isHidden !== undefined && onToggleHidden && <HonorHiddenToggle isHidden={isHidden} onToggle={onToggleHidden} />}
    <div className="absolute left-[21%] top-[15.5%] z-10 h-[13.2%] w-[58%] [container-type:inline-size]">
      {isSpriteHonor(honor) ? <HonorDetailSprite honor={honor} /> : <FittedUiArtwork src={honor.image} alt="" aria-hidden="true" scaleX={isArenaHonor ? 1 : honor.level === 2 || honor.level === 3 ? 1.7 : honor.level === 5 ? 1.58 : 1.52} scaleY={isArenaHonor ? 1.16 : 1.36} className="pointer-events-none absolute inset-0 z-0 block size-full object-contain" />}
      <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center text-center">
        {isArenaHonor ? <span className="inline-block translate-y-[var(--ui-p-2,2px)]"><ArenaHonorTitle honor={honor} detailOffsetY={getArenaHonorDetailTitleOffsetY(honor)} /></span> : isSpriteHonor(honor) ? <StreakHonorTitle displayName={honor.displayName} /> : <span className="block w-full translate-y-[var(--ui-p-5,5px)]"><AwardedHonorTitle displayName={honor.displayName} detailOffsetY={getAwardedHonorDetailTitleOffsetY(honor.level)} /></span>}
      </div>
    </div>
    <ul className={`absolute left-[13%] top-[43.8%] z-10 flex h-auto max-h-[17%] w-[74%] flex-col justify-start gap-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-[0.45em] text-left font-cormorant font-semibold text-[length:clamp(var(--ui-p-12,12px),1.8vw,var(--ui-p-18,18px))] leading-relaxed text-[#ffe5a6] [text-shadow:0_1px_2px_#170903] ${isArenaHonor ? 'translate-y-[var(--ui-p-2,2px)]' : ''}`}>
      {descriptionLines.map(({ text, bullet }, index) => <li key={`${honor.id}-description-${index}`} className={bullet ? "relative pl-5 before:absolute before:left-0 before:content-['◆']" : 'relative'}><HonorDetailText text={text} /></li>)}
    </ul>
    <ul className={`absolute left-[13%] top-[69.5%] z-10 flex h-auto max-h-[23%] w-[74%] flex-col justify-start gap-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-[0.45em] text-left font-cormorant font-semibold text-[length:clamp(var(--ui-p-12,12px),1.8vw,var(--ui-p-18,18px))] leading-relaxed text-[#ffe5a6] [text-shadow:0_1px_2px_#170903] ${isArenaHonor ? 'translate-y-[var(--ui-p-2,2px)]' : ''}`}>
      {howToEarnLines.map((line, index) => <li key={`${honor.id}-how-to-earn-${index}`} className="relative pl-5 before:absolute before:left-0 before:content-['◆']"><HonorDetailText text={line} /></li>)}
    </ul>
    <button type="button" aria-label={standalone ? 'Đóng thông tin danh hiệu' : 'Quay lại danh sách danh hiệu'} onClick={onBack} className="absolute right-0 top-[2.4%] z-20 h-[9%] w-[12%] cursor-pointer rounded-full bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ffe08b]" />
  </div>
}

function HonorsFrame({ onClose, selectedHonor, onSelectHonor, onBack, selectedProfileHonors, onToggleProfileHonor, honorDetailsHidden, onToggleHonorDetailsHidden, resolveHonor }: { resolveHonor: (honor: HonorDetail) => HonorDetail; onClose: () => void; selectedHonor: HonorDetail | null; onSelectHonor: (honor: HonorDetail) => void; onBack: () => void; selectedProfileHonors: SelectedProfileHonors; onToggleProfileHonor: (honor: HonorDetail) => void; honorDetailsHidden: boolean; onToggleHonorDetailsHidden: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof HONORS_CATEGORIES)[number]['id']>('all')
  const [illuminatedHonorId, setIlluminatedHonorId] = useState<string | null>(null)
  const [selectedHonorColumn, setSelectedHonorColumn] = useState<number | undefined>()
  const selectedItem = HONORS_CATEGORIES.find(category => category.id === selectedCategory)
  const honorsForCategory = (selectedCategory === 'all'
    ? getUnlockedProfileHonors(resolveHonor)
    : HONORS_BY_CATEGORY[selectedCategory]).map(resolveHonor)
  // Percentage row gaps use total content height; normalize to the All tab's row count.
  const allHonorRowCount = Math.ceil(getUnlockedProfileHonors(resolveHonor).length / 3)
  const categoryHonorRowCount = Math.max(1, Math.ceil(honorsForCategory.length / 3))
  const honorRowGap = `${(3 * allHonorRowCount) / categoryHonorRowCount}%`
  const handleSelectHonor = (honor: HonorDetail, column: number) => {
    setIlluminatedHonorId(honor.id)
    setSelectedHonorColumn(column)
    if (!honorDetailsHidden) onSelectHonor(honor)
  }
  const toggleHonorDetailsHidden = () => {
    const willHide = !honorDetailsHidden
    onToggleHonorDetailsHidden()
    if (willHide) onBack()
  }
  const renderHonor = (honor: HonorDetail, index: number) => {
    const category = getProfileHonorCategory(honor)
    const isSelectable = isProfileHonorSelectable(honor)
    const isInProfile = selectedProfileHonors[category].includes(honor.id)
    const canSelect = isSelectable && (isInProfile || selectedProfileHonors[category].length < 3)
    const honorName = 'rank' in honor ? honor.title : honor.name
    return <div key={honor.id} className="relative [container-type:inline-size]">
      <HonorCatalogBadge honor={honor} isSelected={illuminatedHonorId === honor.id} onSelect={selected => handleSelectHonor(selected, index % 3)} />
      {isSelectable && <ProfileHonorSelectionButton honorName={honorName} isSelected={isInProfile} canSelect={canSelect} onToggle={() => onToggleProfileHonor(honor)} />}
    </div>
  }

  return <div className="relative aspect-[1366/999] w-full" onClick={event => {
    const detailPopover = event.currentTarget.querySelector('[data-honor-detail-popover]')
    if (detailPopover?.contains(event.target as Node)) return
    setIlluminatedHonorId(null)
    if (selectedHonor) onBack()
  }}>
    <div className="relative h-full w-full overflow-visible">
    <div className="absolute" style={{ left: '-3.0747%', top: '-3.5035%', width: '106.0029%', height: '108.7087%' }}>
    <CrispUiImage src={honorsFrame} alt="" aria-hidden="true" className="pointer-events-none absolute block max-w-none" style={{ left: '2.9006%', top: '3.2228%', width: '94.337%', height: '91.989%' }} />
    <div aria-hidden="true" className="pointer-events-none absolute z-[15] overflow-hidden [container-type:inline-size]" style={{ top: HONORS_CATEGORIES[0].top, left: '4.7%', width: '17.7%', height: HONORS_CATEGORIES[0].height }}>
      <div className="absolute inset-0 bg-no-repeat" style={{ backgroundImage: `url(${honorsFrame})`, backgroundSize: '533% 979%', backgroundPosition: '2.5% 23.5%' }} />
      <div className="absolute inset-x-[4%] top-[9%] bottom-[9%] rounded-[var(--ui-p-3,3px)] bg-[linear-gradient(90deg,#3c1e0e_0%,#281207_52%,#3c1e0e_100%)]" />
      <CrispUiImage src={allHonorsIcon} alt="" className="pointer-events-none absolute left-[-13%] top-1/2 block w-[70%] max-w-none -translate-y-1/2" />
      <span className="pointer-events-none absolute left-[45%] top-1/2 w-[53%] -translate-y-1/2 text-left font-cormorant text-[12cqw] font-semibold leading-[1.1] text-[#f3e5c8] [text-shadow:0_1px_2px_#1b0d04]">Tất cả</span>
    </div>
    <h2 id="honors-frame-title" className="sr-only">Danh hiệu</h2>
    {HONORS_CATEGORIES.map(category => {
      const selected = selectedCategory === category.id
      return <button key={category.id} type="button" aria-label={category.label} aria-pressed={selected} onClick={() => setSelectedCategory(category.id)} style={{ top: category.top, left: '4.7%', width: '17.7%', height: category.height }} className="absolute z-20 cursor-pointer rounded-[var(--ui-p-10,10px)] border-2 border-transparent bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ffe08b]" />
    })}
    {selectedItem && <CrispUiImage src={honorsSelectionFrame} alt="" aria-hidden="true" className="pointer-events-none absolute z-30 max-w-none mix-blend-lighten" style={{ top: `calc(${selectedItem.top} + 0.4% - ${selectedItem.height} * 0.2)`, left: '3.284%', width: '20.532%', height: `calc(${selectedItem.height} * 1.4)` }} />}
    <div className="absolute left-[24%] top-[12.5%] z-10 h-[79.5%] w-[70%] overflow-hidden">
      <div className="absolute inset-x-0 top-[var(--ui-p-18,18px)] bottom-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {honorsForCategory.length > 0 ? <div className="grid w-full grid-cols-3 gap-x-[1.5%] pt-[var(--ui-p-6,6px)]" style={{ rowGap: honorRowGap }}>{honorsForCategory.map(renderHonor)}</div> : <p className="grid h-full place-items-center font-cormorant text-xl font-semibold text-[#f3d59a]">Chưa có danh hiệu</p>}
      </div>
    </div>
        {!honorDetailsHidden && selectedHonor && <HonorDetailPopover honor={selectedHonor} onBack={onBack} honorColumn={selectedHonorColumn} isHidden={honorDetailsHidden} onToggleHidden={toggleHonorDetailsHidden} />}
<HonorHiddenToggle isHidden={honorDetailsHidden} onToggle={toggleHonorDetailsHidden} className="absolute right-[9%] top-[5.8%] z-40 translate-y-[var(--ui-p-25,25px)]" />
<button type="button" aria-label="Đóng danh hiệu" onClick={onClose} className="absolute top-[5.6%] right-[2.5%] z-40 size-[6%] cursor-pointer rounded-full bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ffe08b]" />
    </div>
    </div>

  </div>
}

const profileIdStorageKey = 'co-tuong-profile-id'

function getOrCreateProfileId() {
  if (typeof window === 'undefined') return '100000000'
  try {
    const storedId = window.localStorage.getItem(profileIdStorageKey)
    if (storedId) return storedId
    const random = new Uint32Array(1)
    window.crypto.getRandomValues(random)
    const profileId = String(100_000_000 + (random[0] % 900_000_000))
    window.localStorage.setItem(profileIdStorageKey, profileId)
    return profileId
  } catch {
    return '100000000'
  }
}

export function ProfileDialog({ dialogRef, name, playerId, challengeTargetId, onOpenMessages, onClose, primaryActionLabel, onPrimaryAction, layout, editable = false, isOwnProfile = editable }: {
  layout: ReturnType<typeof useProfileLayout>
  dialogRef: RefObject<HTMLDialogElement | null>
  name: string
  editable?: boolean
  isOwnProfile?: boolean
  playerId?: string
  challengeTargetId?: string
  onOpenMessages?: (name: string, playerId?: string) => void
  onClose: () => void
  primaryActionLabel: string
  onPrimaryAction: () => void
}) {
  const friendship = useMessageFriendship(name)
  const [otherAddress, setOtherAddress] = useState('TP. Hồ Chí Minh')
  const ownAddress = useSessionStore(state => state.address)
  const setOwnAddress = useSessionStore(state => state.setAddress)
  const address = isOwnProfile ? ownAddress : otherAddress
  const [profileId] = useState(getOrCreateProfileId)
  const displayedProfileId = isOwnProfile ? profileId : playerId
  const [selectedProfileHonorIds, setSelectedProfileHonorIds] = useState<SelectedProfileHonors>(() => loadSelectedProfileHonors(profileId))
  const [honorDetailsHidden, setHonorDetailsHidden] = useState(false)
  const [locationPickerOpen, setLocationPickerOpen] = useState(false)
  const [avatarCustomizationOpen, setAvatarCustomizationOpen] = useState(false)
  const [honorsOpen, setHonorsOpen] = useState(false)


  const [previewHonorDetailOpen, setPreviewHonorDetailOpen] = useState(false)
  const [viewOtherProfileInfo, setViewOtherProfileInfo] = useState(false)
  const [profileActionFeedback, setProfileActionFeedback] = useState<string | null>(null)
  const logoutDialogRef = useRef<HTMLDialogElement>(null)
  const [logoutError, setLogoutError] = useState('')
  const logout = useAccountLogout()
  const confirmLogout = () => {
    try { logout(); logoutDialogRef.current?.close(); onClose() }
    catch { setLogoutError('Không thể đăng xuất. Hãy cho phép lưu dữ liệu trình duyệt rồi thử lại.') }
  }
  const challenge = useProfileChallenge(name, challengeTargetId, setProfileActionFeedback)
  const [previewDetailPosition, setPreviewDetailPosition] = useState<{ side: 'left' | 'right'; anchorX: number } | null>(null)
  const [selectedHonor, setSelectedHonor] = useState<HonorDetail | null>(null)
  const ownAvatarIndex = useSessionStore(state => state.avatarIndex)
  const isFollowing = useSessionStore(state => Boolean(state.followedPlayers[name]))
  const togglePlayerFollow = useSessionStore(state => state.togglePlayerFollow)
  const setSelectedAvatarIndex = useSessionStore(state => state.setAvatarIndex)
  const selectedAvatarIndex = editable ? ownAvatarIndex : 0
  const ownFrameIndex = useSessionStore(state => state.avatarFrameIndex)
  const setSelectedFrameIndex = useSessionStore(state => state.setAvatarFrameIndex)
  const selectedFrameIndex = editable ? ownFrameIndex : 0
  const { getGrantCount } = useHonorGrants()
  const resolveHonor = (honor: HonorDetail): HonorDetail => 'rank' in honor || 'frame' in honor ? honor : { ...honor, viewCount: getGrantCount(name, honor.id), endorsementCount: getGrantCount(name, honor.id) }
  const ownedHonorCount = getUnlockedProfileHonors(resolveHonor).length
  const previewHonors = getSelectedProfileHonors(selectedProfileHonorIds).map(resolveHonor).filter(isProfileHonorSelectable)
  const eligibleProfileHonors: SelectedProfileHonors = {
    ...selectedProfileHonorIds,
    awarded: previewHonors.filter(honor => getProfileHonorCategory(honor) === 'awarded').map(honor => honor.id),
  }
  const orderedPreviewHonors = [...previewHonors].sort((a, b) => {
    const categoryA = getProfileHonorCategory(a)
    const categoryB = getProfileHonorCategory(b)
    const categoryDifference = PROFILE_HONOR_CATEGORIES.indexOf(categoryA) - PROFILE_HONOR_CATEGORIES.indexOf(categoryB)
    if (categoryDifference !== 0) return categoryDifference

    const levelDifference = getProfileHonorPriorityLevel(a) - getProfileHonorPriorityLevel(b)
    if (levelDifference !== 0) return levelDifference

    const categoryHonors = HONORS_BY_CATEGORY[categoryA]
    return categoryHonors.findIndex(honor => honor.id === a.id) - categoryHonors.findIndex(honor => honor.id === b.id)
  })
  const previewHonorPages = Array.from({ length: Math.ceil(orderedPreviewHonors.length / PROFILE_HONORS_PER_PAGE) }, (_, pageIndex) =>
    orderedPreviewHonors.slice(pageIndex * PROFILE_HONORS_PER_PAGE, (pageIndex + 1) * PROFILE_HONORS_PER_PAGE),
  )
  const previewHonorListKey = orderedPreviewHonors.map(honor => honor.id).join('|')
  const previewHonorTrackRef = useRef<HTMLDivElement | null>(null)
  const previewHonorAnimationRef = useRef<Animation | null>(null)
  const [visiblePreviewHonorPages, setVisiblePreviewHonorPages] = useState<number[]>([0])
  const [previewHonorCarouselPaused, setPreviewHonorCarouselPaused] = useState(false)
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const updateOpen = () => setProfileDialogOpen(dialog.open)
    updateOpen()
    const observer = new MutationObserver(updateOpen)
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] })
    return () => observer.disconnect()
  }, [dialogRef])
  useEffect(() => {
    setPreviewHonorCarouselPaused(false)
  }, [previewHonorListKey, profileDialogOpen, honorsOpen])
  useEffect(() => {
    setViewOtherProfileInfo(false)
    setProfileActionFeedback(null)
  }, [name, profileDialogOpen])
  const showOtherProfileActions = !isOwnProfile && !viewOtherProfileInfo
  const profileHonorPreviewVisible = profileDialogOpen && !showOtherProfileActions && !honorsOpen && !avatarCustomizationOpen && !locationPickerOpen
  useEffect(() => {
    const track = previewHonorTrackRef.current
    if (!track || !profileHonorPreviewVisible || previewHonorPages.length < 2) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scrollEnd = PROFILE_HONOR_HOLD_MS + PROFILE_HONOR_SCROLL_MS
    const cycleDuration = scrollEnd + PROFILE_HONOR_END_HOLD_MS
    const lastTransform = `translateX(-${(previewHonorPages.length - 1) * 100}%)`
    const keyframes: Keyframe[] = [
      { transform: 'translateX(0%)', offset: 0 },
      ...(reducedMotion
        ? previewHonorPages.map((_, index) => ({ transform: `translateX(-${index * 100}%)`, offset: (PROFILE_HONOR_HOLD_MS + PROFILE_HONOR_SCROLL_MS * index / previewHonorPages.length) / cycleDuration, easing: 'steps(1, end)' }))
        : [{ transform: 'translateX(0%)', offset: PROFILE_HONOR_HOLD_MS / cycleDuration }]),
      { transform: lastTransform, offset: scrollEnd / cycleDuration },
      { transform: lastTransform, offset: 1 },
    ]
    // Normal iterations jump straight back to the first frame at the end; never reverse.
    const animation = track.animate(keyframes, {
      duration: cycleDuration,
      easing: 'linear',
      direction: 'normal',
      iterations: Infinity,
    })
    previewHonorAnimationRef.current = animation
    return () => {
      animation.cancel()
      previewHonorAnimationRef.current = null
    }
  }, [previewHonorListKey, previewHonorPages.length, profileHonorPreviewVisible])
  useEffect(() => {
    const animation = previewHonorAnimationRef.current
    if (previewHonorCarouselPaused || previewHonorDetailOpen) animation?.pause()
    else animation?.play()
  }, [previewHonorCarouselPaused, previewHonorDetailOpen, previewHonorListKey, previewHonorPages.length, profileHonorPreviewVisible])
  useEffect(() => {
    const track = previewHonorTrackRef.current
    if (!track || !profileHonorPreviewVisible) return
    const pages = Array.from(track.children)
    const visible = new Set<number>([0])
    setVisiblePreviewHonorPages([0])
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const index = pages.indexOf(entry.target)
        if (entry.intersectionRatio >= 0.001) visible.add(index)
        else visible.delete(index)
      }
      setVisiblePreviewHonorPages([...visible])
    }, { root: track.parentElement, threshold: 0.001 })
    pages.forEach(page => observer.observe(page))
    return () => observer.disconnect()
  }, [previewHonorListKey, previewHonorPages.length, profileHonorPreviewVisible])
  const [profileIdCopied, setProfileIdCopied] = useState(false)
  useEffect(() => { setProfileIdCopied(false) }, [displayedProfileId])
  const copyFeedbackTimeout = useRef<number | null>(null)
  useEffect(() => () => {
    if (copyFeedbackTimeout.current !== null) window.clearTimeout(copyFeedbackTimeout.current)
  }, [])
  useEffect(() => {
    try {
      window.localStorage.setItem(`profile-honors:${profileId}`, JSON.stringify(selectedProfileHonorIds))
    } catch {
      // Keep the current selection in memory when local storage is unavailable.
    }
  }, [profileId, selectedProfileHonorIds])
  const toggleProfileHonor = (honor: HonorDetail) => {
    const category = getProfileHonorCategory(honor)
    if (!isProfileHonorSelectable(honor)) return
    setSelectedProfileHonorIds(previous => {
      const current = previous[category].filter(id => {
        const existing = HONORS_BY_CATEGORY[category].find(candidate => candidate.id === id)
        return existing && isProfileHonorSelectable(resolveHonor(existing))
      })
      if (current.includes(honor.id)) return { ...previous, [category]: current.filter(id => id !== honor.id) }
      if (current.length >= 3) return previous
      return { ...previous, [category]: [...current, honor.id] }
    })
  }
  const toggleHonorDetailsHidden = () => setHonorDetailsHidden(hidden => !hidden)
  const copyProfileId = async (): Promise<boolean> => {
    if (!displayedProfileId) return false
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(displayedProfileId)
        return true
      }
    } catch {
      // Fall back when clipboard permission is unavailable.
    }
    try {
      const input = document.createElement('textarea')
      input.value = displayedProfileId
      input.setAttribute('readonly', '')
      input.style.position = 'fixed'
      input.style.left = '-9999px'
      document.body.appendChild(input)
      try {
        input.focus()
        input.select()
        return document.execCommand('copy')
      } finally {
        input.remove()
      }
    } catch {
      // Clipboard access can be blocked by the browser.
      return false
    }
  }
  const copyProfileIdAndShowFeedback = async () => {
    if (!await copyProfileId()) return
    setProfileIdCopied(true)
    if (copyFeedbackTimeout.current !== null) window.clearTimeout(copyFeedbackTimeout.current)
    copyFeedbackTimeout.current = window.setTimeout(() => {
      setProfileIdCopied(false)
      copyFeedbackTimeout.current = null
    }, 1600)
  }
  const editButton = `${buttonInteraction} grid size-8 shrink-0 place-items-center rounded-md text-[#f1bd58] hover:bg-[#f3dba71a] hover:text-[#ffe8ad]`
  const editControl = () => <button type="button" aria-label="Đổi địa chỉ" onClick={() => setLocationPickerOpen(true)} className={`${editButton} ml-auto`}><CrispUiImage src={editIcon} alt="" aria-hidden="true" className="block size-9 object-contain" /></button>
  const dialogWidth = avatarCustomizationOpen ? layout.avatarWidth : layout.width
  const dialogHeight = avatarCustomizationOpen ? layout.avatarHeight : layout.height
  const dialogScale = avatarCustomizationOpen ? layout.avatarScale : layout.scale
  const closePreviewHonorDetail = () => {
    setPreviewHonorDetailOpen(false)
    setPreviewDetailPosition(null)
    setSelectedHonor(null)
  }
  const renderPhotoPanel = (sizeClass: string) => <PlayerInfoCard
    className={sizeClass}
    data={{ name, xiangqiScore: 1234, jieqiScore: 1234, friends: 10, followers: 120 + (isFollowing ? 1 : 0), likes: '2.4K', address, playerId: displayedProfileId }}
    editControl={editable && !avatarCustomizationOpen ? editControl() : undefined}
    idCopied={profileIdCopied}
    onCopyId={() => { void copyProfileIdAndShowFeedback() }}
  />
  return <dialog ref={dialogRef} aria-labelledby={previewHonorDetailOpen && selectedHonor ? 'honors-detail-title' : honorsOpen ? (selectedHonor ? 'honors-frame-title honors-detail-title' : 'honors-frame-title') : 'profile-title'} onClick={event => {
    if (previewHonorDetailOpen) {
      const target = event.target
      const targetElement = target instanceof Element ? target : target instanceof Node ? target.parentElement : null
      const clickedPopover = target instanceof Node && Boolean(event.currentTarget.querySelector('[data-honor-detail-popover]')?.contains(target))
      const clickedAnotherBadge = Boolean(targetElement?.closest('[data-profile-honor-preview-badge]'))
      if (!clickedPopover && !clickedAnotherBadge) {
        closePreviewHonorDetail()
        return
      }
    }
    if (event.target === event.currentTarget) {
      if (selectedHonor) setSelectedHonor(null)
      else if (honorsOpen) setHonorsOpen(false)
      else if (locationPickerOpen) setLocationPickerOpen(false)
      else if (avatarCustomizationOpen) setAvatarCustomizationOpen(false)
      else onClose()
    }
  }} onCancel={event => { event.preventDefault(); if (friendship.removalName) friendship.cancelRemoval(); else if (profileActionFeedback) setProfileActionFeedback(null); else if (previewHonorDetailOpen) closePreviewHonorDetail(); else if (selectedHonor) setSelectedHonor(null); else if (honorsOpen) setHonorsOpen(false); else if (locationPickerOpen) setLocationPickerOpen(false); else if (avatarCustomizationOpen) setAvatarCustomizationOpen(false); else onClose() }} onClose={() => { setSelectedHonor(null); setPreviewHonorDetailOpen(false); setPreviewDetailPosition(null); setAvatarCustomizationOpen(false); setLocationPickerOpen(false); setHonorsOpen(false); setViewOtherProfileInfo(false); setProfileActionFeedback(null); friendship.cancelRemoval() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/50" style={(honorsOpen || previewHonorDetailOpen ? { position: 'fixed', inset: 0, margin: 0, width: '100vw', height: '100dvh', display: 'grid', placeItems: 'center', transform: 'none' } : { width: dialogWidth * dialogScale, height: dialogHeight * dialogScale, transform: 'translateY(0px)' }) as CSSProperties}>
    {honorsOpen ? <div style={{ width: 'min(90vw, 123.06dvh)' }}><HonorsFrame resolveHonor={resolveHonor} onClose={() => { setSelectedHonor(null); setHonorsOpen(false) }} selectedHonor={selectedHonor} onSelectHonor={setSelectedHonor} onBack={() => setSelectedHonor(null)} selectedProfileHonors={eligibleProfileHonors} onToggleProfileHonor={toggleProfileHonor} honorDetailsHidden={honorDetailsHidden} onToggleHonorDetailsHidden={toggleHonorDetailsHidden} /></div> : <div onDragStart={event => { if (event.target instanceof HTMLImageElement) event.preventDefault() }} className="absolute origin-top-left rounded-[var(--ui-p-22,22px)] border-[length:var(--ui-p-5,5px)] border-[#5e3014] bg-[linear-gradient(135deg,#7a431c,#2d160a)] p-4 shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904] [&_img]:select-none [&_svg]:select-none" style={{ left: previewHonorDetailOpen ? `calc(50% - ${dialogWidth * dialogScale / 2}px)` : 0, top: previewHonorDetailOpen ? `calc(50% - ${dialogHeight * dialogScale / 2}px)` : 0, ...getCrispUiLayout(dialogScale, dialogWidth, dialogHeight) }}>
    <div inert={Boolean(profileActionFeedback || friendship.removalName)} className="relative flex h-full flex-col rounded-xl border-[length:var(--ui-p-3,3px)] border-[#d39a42] bg-[radial-gradient(ellipse_at_50%_20%,#b87a3344,transparent_43%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-4 pb-3 shadow-[0_0_0_2px_#48220e,inset_0_0_18px_#160904]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[var(--ui-p-10,10px)]">
        <CrispUiImage src={profileScene} alt="" className={`absolute top-0 object-cover object-[left_top] ${avatarCustomizationOpen ? 'left-0 h-[var(--ui-p-226,226px)] w-full' : 'left-0 h-[var(--ui-p-238,238px)] w-full'}`} />
        {avatarCustomizationOpen && <>
          <div className="absolute inset-x-0 top-0 h-[var(--ui-p-226,226px)]" style={{ backgroundImage: 'linear-gradient(90deg, transparent 45%, rgba(43,22,11,0.62) 48%, #2b160b 53%, #2b160b 100%)' }} />
        </>}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-2 overflow-hidden rounded-lg opacity-20"><svg viewBox="0 0 660 800" preserveAspectRatio="none" className="h-full w-full" fill="none" stroke="#b8873e" strokeWidth="5"><path d="M-30 130c85-90 120 30 40 18-60-12-15-84 30-42m450-100c-60 35-30 95 15 60s-40-70-65-20M-40 680c80-65 165 10 95 55-55 35-100-50-45-65 65-18 80 93 160 57m340 75c-65-70 15-125 58-75 30 40-45 80-60 30-10-40 80-80 140-20"/><path d="M-15 780q80-100 160 0m-145 0q65-80 130 0m-110 0q45-55 90 0M500 0q75 90 150 0m-130 0q55 65 110 0"/></svg></div>
      <header className={`relative z-20 mx-auto -mt-[var(--ui-p-42,42px)] ${avatarCustomizationOpen ? 'mb-3' : 'mb-1'} w-[68%] text-center`}>
        <CrispUiImage src={avatarCustomizationOpen ? avatarCustomizationTitle : profileTitle} alt="" className="pointer-events-none mx-auto h-[var(--ui-p-86,86px)] w-auto" />
        <h2 id="profile-title" className="sr-only">{avatarCustomizationOpen ? 'Tùy chỉnh avatar' : 'Thông tin'}</h2>
      </header>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-3">
        {avatarCustomizationOpen ? <AvatarCustomization previewPanel={renderPhotoPanel('h-[var(--ui-p-185,185px)] self-center -translate-y-[var(--ui-p-30,30px)]')} selectedAvatarIndex={selectedAvatarIndex} selectedFrameIndex={selectedFrameIndex} onCancel={() => setAvatarCustomizationOpen(false)} onUse={(index, frameIndex) => { setSelectedAvatarIndex(index); setSelectedFrameIndex(frameIndex) }} /> : locationPickerOpen ? <VietnamAddressPicker onCancel={() => setLocationPickerOpen(false)} onSave={(value, province) => { if (isOwnProfile) setOwnAddress(value, province); else setOtherAddress(value); setLocationPickerOpen(false) }} /> : <>
        <section aria-label="Hồ sơ người chơi" className="relative isolate grid h-[var(--ui-p-190,190px)] shrink-0 grid-cols-[var(--ui-p-145,145px)_1fr] gap-3 rounded-[var(--ui-p-10,10px)]">
          <div className="relative z-10 flex min-h-0 flex-col items-center gap-1 pt-1 text-center">
            <button type="button" disabled={!editable} onClick={() => setAvatarCustomizationOpen(true)} aria-label={editable ? 'Tùy chỉnh avatar' : 'Avatar kỳ sĩ'} className={`${buttonInteraction} relative size-[var(--ui-p-128,128px)] shrink-0 rounded-full border-0 bg-transparent p-0 shadow-none disabled:cursor-default disabled:opacity-100`}>
              <span className="relative grid size-full place-items-center">{!isOwnProfile && getComputerAvatar(name) ? <img src={getComputerAvatar(name)} alt="" className="block size-full object-contain" style={{ transform: `scale(${AVATAR_FRAME_VISIBLE_SCALE})` }} /> : <AvatarPortrait avatarIndex={selectedAvatarIndex} className="size-full rounded-full" />}{(isOwnProfile || !getComputerAvatar(name)) && <><AvatarFrameOverlay src={getAvatarFrame(selectedFrameIndex).image} alt={getAvatarFrame(selectedFrameIndex).label} /><AvatarRankBadge /></>}

              </span>
            </button>
          </div>
          {renderPhotoPanel('h-full self-center -translate-y-[var(--ui-p-21,21px)]')}
        </section>
        <section aria-label="Thống kê ván đấu minh họa" className="grid h-[var(--ui-p-132,132px)] shrink-0 grid-cols-2 gap-5">
          {[{ name: 'Cờ Tướng', image: xiangqiMode }, { name: 'Cờ Úp', image: hiddenMode }].map(mode => <div key={mode.name} className="rounded-[var(--ui-p-12,12px)] border-2 border-[#b8782d] bg-[linear-gradient(135deg,#f8d99e,#efbd6b)] px-3 py-2 text-[#54270d] shadow-[inset_0_0_0_2px_#fff0bd,inset_0_0_0_4px_#ce9648,0_3px_4px_#2b120755]">
            <CrispUiImage src={mode.image} alt={mode.name} className="mx-auto mb-1 h-[var(--ui-p-36,36px)] w-auto object-contain" />
            <div className="grid grid-cols-2 divide-x divide-[#b77b43] text-center">
              {['Thắng', 'Thua'].map(label => <div key={label}><p className="text-lg font-bold leading-5">{label}</p><p className="mt-1 font-number text-2xl font-bold text-[#c3261e]">1203</p></div>)}
            </div>
          </div>)}
        </section>
        {showOtherProfileActions ? <section aria-label={`Thao tác với ${name}`} className={`${panel} grid min-h-[var(--ui-p-240,240px)] flex-1 grid-cols-3 grid-rows-2 gap-x-3 gap-y-5 px-3 pt-8 pb-10`}>
          {([
            { id: 'info', label: 'Xem thông tin', icon: profileActionInfo },
            { id: 'challenge', label: 'So tài', icon: profileActionChallenge },
            { id: 'friend', label: friendship.isFriend ? 'Xóa bạn' : friendship.incoming ? 'Chấp nhận' : friendship.pending ? 'Hủy thêm' : 'Thêm bạn', icon: friendship.isFriend || (friendship.pending && !friendship.incoming) ? profileActionRemoveFriend : profileActionFriend },
            { id: 'message', label: 'Nhắn tin', icon: profileActionMessage },
            { id: 'follow', label: isFollowing ? 'Bỏ theo dõi' : 'Theo dõi', icon: profileActionFollow },
            { id: 'gift', label: 'Tặng quà', icon: profileActionGift },
          ] as const).map(action => <button key={action.id} type="button" disabled={action.id === 'challenge' && challenge.pending} onClick={() => {
            if (action.id === 'info') setViewOtherProfileInfo(true)
            else if (action.id === 'friend') friendship.activate()
            else if (action.id === 'follow') togglePlayerFollow(name)
            else if (action.id === 'challenge') void challenge.invite()
            else if (action.id === 'message' && onOpenMessages) {
              onClose()
              onOpenMessages(name, playerId)
            }
            else if (action.id === 'gift') setProfileActionFeedback('Tính năng tặng quà chưa được hỗ trợ.')
            else setProfileActionFeedback(`Tính năng ${action.label.toLowerCase()} với ${name} chưa được hỗ trợ.`)
          }} className={`${buttonInteraction} relative block aspect-[1471/680] w-full min-w-0 self-center border-0 bg-transparent p-0 leading-none [container-type:inline-size]`}>
            <span aria-hidden="true" className={`pointer-events-none absolute inset-0 border-0 border-solid border-transparent ${(action.id === 'friend' && friendship.pending && !friendship.incoming) || (action.id === 'follow' && isFollowing) ? 'brightness-55' : ''}`} style={{ borderImageSource: `url(${profileActionButtonFrame})`, borderImageSlice: '200 fill', borderImageWidth: '13.596cqw', borderImageRepeat: 'stretch' }} />
            <span className="pointer-events-none absolute inset-0 flex items-center gap-[1%] pl-[9%] pr-[3%]">
              {action.id === 'friend' ? <span className="flex aspect-[1106/1091] w-[32%] shrink-0 items-center justify-center p-0 leading-none">
                <CrispUiImage src={action.icon} alt="" aria-hidden="true" className="block h-full w-auto max-w-none object-contain" />
              </span> : <CrispUiImage src={action.icon} alt="" aria-hidden="true" className="block h-auto w-[32%] shrink-0 object-contain" />}
              <span className="min-w-0 flex-1 whitespace-nowrap text-center font-cormorant text-[10.7cqw] font-bold leading-none tracking-[-0.025em] text-[#ffebba] [text-shadow:0_1px_1px_#291207]">{action.label}</span>
            </span>
          </button>)}
        </section> : <section aria-labelledby="profile-honors" className={`${panel} min-h-[var(--ui-p-240,240px)] flex-1 p-4`}>
          <h3 id="profile-honors" className="mb-4 flex items-center gap-3 font-georgia text-2xl font-bold italic text-[#ffe1a0] [text-shadow:0_1px_0_#321604]"><span aria-hidden="true" className="text-[#e8ae50]">⚑</span>Danh hiệu<span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-[#d99a42] to-transparent" /><span aria-label={`Sở hữu: ${ownedHonorCount}`} className="inline-flex shrink-0 items-baseline gap-1 text-[length:var(--ui-p-22,22px)] not-italic font-medium"><span>Sở hữu:</span><span className="font-number text-[20px] lining-nums tabular-nums">{ownedHonorCount}</span></span>{editable && <button type="button" aria-label="Mở danh hiệu" onClick={() => { setSelectedHonor(null); setHonorsOpen(true) }} className={`${buttonInteraction} grid size-6 shrink-0 place-items-center rounded-md p-0 text-[#f1bd58] hover:bg-[#f3dba71a] hover:text-[#ffe8ad]`}><svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg></button>}</h3>
          <div className="relative h-[var(--ui-p-220,220px)] overflow-hidden" aria-label="Danh hiệu đã chọn để hiển thị" onMouseEnter={() => setPreviewHonorCarouselPaused(true)} onMouseLeave={() => setPreviewHonorCarouselPaused(false)}>
            {previewHonorPages.length > 0 ? <div ref={previewHonorTrackRef} className="flex h-full w-full">
              {previewHonorPages.map((page, pageIndex) => <div key={pageIndex} role="group" aria-label={`Trang danh hiệu ${pageIndex + 1} / ${previewHonorPages.length}`} aria-hidden={!visiblePreviewHonorPages.includes(pageIndex)} inert={!visiblePreviewHonorPages.includes(pageIndex)} className="grid h-full w-full shrink-0 grid-cols-3 grid-rows-3 content-start gap-x-3 gap-y-3">
                {page.map((honor, pageSlotIndex) => <ProfileHonorPreviewBadge key={honor.id} honor={honor} onSelect={(selected, trigger) => {
                  const badge = trigger.getBoundingClientRect()
                  const side = pageSlotIndex % 3 < 2 ? 'right' : 'left'
                  setSelectedHonor(selected)
                  setPreviewDetailPosition({ side, anchorX: side === 'right' ? badge.right + 15 : badge.left - 15 })
                  setPreviewHonorDetailOpen(true)
                }} />)}
              </div>)}
            </div> : <p className="grid h-full place-items-center text-center font-cormorant text-lg font-semibold text-[#f3d59a]">Chưa có danh hiệu</p>}
          </div>
        </section>}
        </>}
      </div>
      {!avatarCustomizationOpen && !locationPickerOpen && <footer className="relative mt-4 flex shrink-0 items-center justify-between gap-3">{isOwnProfile ? <button type="button" className={goldButton} onClick={onPrimaryAction}>{primaryActionLabel}</button> : viewOtherProfileInfo ? <button type="button" className={goldButton} onClick={() => setViewOtherProfileInfo(false)}>Quay lại</button> : <span />}<button type="button" autoFocus className={goldButton} onClick={isOwnProfile ? () => { setLogoutError(''); logoutDialogRef.current?.showModal() } : onClose}>{isOwnProfile ? 'Đăng xuất' : 'Thoát'}</button></footer>}
    </div>
    {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[var(--ui-p-76,76px)] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}

    {profileActionFeedback && <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-black/60 p-5"><section role="alertdialog" aria-modal="true" aria-label="Thông báo" className={`${panel} w-full max-w-[var(--ui-p-380,380px)] p-5 text-center text-[#ffe3a2]`}><p className="mb-5 text-lg">{profileActionFeedback}</p><button type="button" autoFocus className={goldButton} onClick={() => setProfileActionFeedback(null)}>Đóng</button></section></div>}
    {friendship.removalName && <MessagesFriendRemovalConfirmation name={friendship.removalName} skip={friendship.skipConfirmation} onSkipChange={friendship.setSkipConfirmation} onCancel={friendship.cancelRemoval} onConfirm={friendship.confirmRemoval} />}
    </div>}

    <dialog ref={logoutDialogRef} aria-label="Xác nhận đăng xuất" className={`${panel} m-auto w-[min(420px,calc(100vw-24px))] p-6 text-center text-[#ffe3a2] backdrop:bg-black/60`}>
      <p className="m-0 mb-6 font-heading text-2xl font-semibold">Bạn có chắc muốn đăng xuất?</p>
      {logoutError && <p role="alert" className="mb-4">{logoutError}</p>}
      <div className="flex justify-center gap-3"><button type="button" autoFocus className={`${goldButton} min-w-0! flex-1`} onClick={() => logoutDialogRef.current?.close()}>Hủy</button><button type="button" className={`${goldButton} min-w-0! flex-1`} onClick={confirmLogout}>Đồng ý</button></div>
    </dialog>
    {previewHonorDetailOpen && selectedHonor && previewDetailPosition && <HonorDetailPopover honor={selectedHonor} standalonePosition={previewDetailPosition} onBack={closePreviewHonorDetail} />}
  </dialog>
}
