export const ADMIN_USERS_PAGE_SIZE = 30
/** Fixed codes only: never store form values, chat text, tokens or raw URLs. */
export const ACTIVITY_PAGES = {
  home: 'Trang chủ', rooms: 'Chọn bàn', computer: 'Chơi với máy', position: 'Xếp thế cờ',
  game: 'Bàn chơi', replay: 'Xem lại', shop: 'Cửa hàng',
} as const
export const ACTIVITY_FEATURES = {
  quick_play: 'Chơi nhanh Cờ Tướng', hidden_play: 'Chơi nhanh Cờ Úp',
  profile: 'Mở hồ sơ', friends: 'Mở bạn bè', rankings: 'Mở xếp hạng', history: 'Mở lịch sử',
  ai_controls: 'Bật / tắt hiển thị cụm AI',
  messages: 'Mở tin nhắn', honors: 'Xem danh hiệu', sound: 'Cài đặt âm thanh',
  ready: 'Sẵn sàng', queue: 'Xếp hàng', unqueue: 'Thoát hàng', stand_up: 'Xuống bàn',
  save_match: 'Lưu ván / thế cờ', screenshot: 'Chụp bàn cờ', fullscreen: 'Toàn màn hình',
  trial: 'Đánh thử', hint: 'Gợi ý', analyze: 'Phân tích', start: 'Đấu ngay',
  computer_game: 'Vào ván máy', online_game: 'Vào ván online', local_game: 'Vào ván local',
  create_room: 'Tạo bàn', energy: 'Mở bổ sung năng lượng', gold: 'Mở bổ sung vàng',
  purchase_item: 'API mua vật phẩm thành công', claim_energy: 'API nhận năng lượng thành công',
  edit_profile: 'API cập nhật hồ sơ thành công', social_action: 'API thao tác bạn bè thành công',
  conversation: 'API tạo hội thoại thành công', send_message: 'API gửi tin nhắn thành công',
  group_settings: 'API quản lý nhóm thành công', save_position: 'API lưu thế cờ thành công',
  delete_position: 'API xóa thế cờ thành công', bookmark_match: 'API lưu / sửa ván thành công',
  equip_honor: 'API chọn danh hiệu thành công', like_match: 'API thích ván thành công',
} as const
export type ActivityInput = { id: string; kind: 'page' | 'feature'; code: string }
export const SERVER_ACTIVITY_CODES = ['purchase_item', 'claim_energy', 'edit_profile', 'social_action', 'conversation',
  'send_message', 'group_settings', 'save_position', 'delete_position', 'bookmark_match', 'equip_honor', 'like_match'] as const
export type ActivityKind = ActivityInput['kind'] | 'login'
export const LOGIN_LABELS = { google: 'Đăng nhập Google', guest: 'Chơi khách', guest_restore: 'Khôi phục khách' } as const
export function activityLabel(kind: string, code: string) {
  const catalog: Record<string, string> = kind === 'page' ? ACTIVITY_PAGES : kind === 'login' ? LOGIN_LABELS : ACTIVITY_FEATURES
  return catalog[code] ?? code
}
export interface AnalyticsUser {
  id: string; publicId: string; name: string; accountType: 'google' | 'guest'; online: boolean
  createdAt: string; lastSeenAt: string | null
}
export interface AnalyticsEvent {
  id: string; publicId: string; name: string; kind: ActivityKind; code: string; createdAt: string
}
export interface AnalyticsReport {
  activityAvailable?: boolean
  totals: { total: number; google: number; guest: number; online: number; offline: number; activeInPeriod: number | null }
  users: AnalyticsUser[]; usersHasMore: boolean
  events: AnalyticsEvent[]; eventsHasMore: boolean
  usage: { kind: ActivityKind; code: string; count: number; users: number }[]
  generatedAt: string
}
