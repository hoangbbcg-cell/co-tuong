export const SHOP_AVATAR_DEFINITIONS = [
  { index: 18, slug: 'xich-long', name: 'Xích Long' },
  { index: 19, slug: 'bach-lien', name: 'Bạch Liên' },
  { index: 20, slug: 'thanh-phong', name: 'Thanh Phong' },
  { index: 21, slug: 'tu-nguyet', name: 'Tử Nguyệt' },
  { index: 22, slug: 'hac-ung', name: 'Hắc Ưng' },
  { index: 23, slug: 'kim-su', name: 'Kim Sư' },
  { index: 24, slug: 'hong-anh', name: 'Hồng Anh' },
  { index: 25, slug: 'van-truc', name: 'Vân Trúc' },
  { index: 26, slug: 'lam-diep', name: 'Lam Điệp' },
  { index: 27, slug: 'loi-chan', name: 'Lôi Chấn' },
  { index: 28, slug: 'tuyet-mai', name: 'Tuyết Mai' },
  { index: 29, slug: 'hoang-son', name: 'Hoàng Sơn' },
  { index: 30, slug: 'ngoc-cam', name: 'Ngọc Cầm' },
  { index: 31, slug: 'phong-hoa', name: 'Phong Hỏa' },
  { index: 32, slug: 'ngan-ha', name: 'Ngân Hà' },
  { index: 33, slug: 'thien-co', name: 'Thiên Cơ' },
  { index: 34, slug: 'an-nhien', name: 'An Nhiên' },
  { index: 35, slug: 'bao-lam', name: 'Bảo Lâm' },
  { index: 36, slug: 'chu-tuoc', name: 'Chu Tước' },
  { index: 37, slug: 'huyen-vu', name: 'Huyền Vũ' },
  { index: 38, slug: 'kim-thien', name: 'Đường Tăng' },
  { index: 39, slug: 'bach-long', name: 'Bạch Long' },
  { index: 40, slug: 'bach-ho', name: 'Bạch Hổ' },
  { index: 41, slug: 'ho-ly', name: 'Hồ Ly' },
  { index: 42, slug: 'tay-du-ton-ngo-khong', name: 'Tôn Ngộ Không' },
  { index: 43, slug: 'tay-du-hac-lang', name: 'Hắc Lang' },
  { index: 44, slug: 'tay-du-thien-ton', name: 'Thiên Tôn' },
  { index: 45, slug: 'tay-du-tru-bat-gioi', name: 'Trư Bát Giới' },
  { index: 46, slug: 'tay-du-duong-tang', name: 'Sa Tăng' },
] as const

export const WEEKLY_SHOP_STANDARD_AVATARS = [39, 40, 41, 43, 44] as const
export const WEEKLY_SHOP_JOURNEY_AVATARS = [42, 38, 45, 46] as const

export const SHOP_FRAME_DEFINITIONS = [
  { index: 7, slug: 'do-hong', name: 'Viền đỏ hồng' },
  { index: 8, slug: 'xanh-ngoc', name: 'Viền xanh ngọc' },
  { index: 9, slug: 'tim-thach', name: 'Viền tím thạch' },
  { index: 10, slug: 'vang-kim', name: 'Viền vàng kim' },
  { index: 11, slug: 'bac-sang', name: 'Viền bạc sáng' },
  { index: 12, slug: 'dong-co', name: 'Viền đồng cổ' },
  { index: 13, slug: 'xanh-duong', name: 'Viền xanh dương' },
  { index: 14, slug: 'hong-ngoc', name: 'Viền hồng ngọc' },
  { index: 15, slug: 'den-vang', name: 'Viền đen vàng' },
  { index: 16, slug: 'trang-ngoc', name: 'Viền trắng ngọc' },
  { index: 17, slug: 'cam-ho-phach', name: 'Viền hổ phách' },
  { index: 18, slug: 'xanh-la', name: 'Viền xanh lá' },
  { index: 19, slug: 'lam-bac', name: 'Viền lam bạc' },
  { index: 20, slug: 'tim-vang', name: 'Viền tím vàng' },
  { index: 21, slug: 'do-dong', name: 'Viền đỏ đồng' },
  { index: 22, slug: 'hong-phan', name: 'Viền hồng phấn' },
  { index: 23, slug: 'ngoc-bich', name: 'Viền ngọc bích' },
  { index: 24, slug: 'xanh-dem', name: 'Viền xanh đêm' },
  { index: 25, slug: 'vang-chanh', name: 'Viền vàng chanh' },
  { index: 26, slug: 'nau-go', name: 'Viền nâu gỗ' },
  { index: 27, slug: 'vien-ho-ly', name: 'Viền Hồ Ly' },
  { index: 28, slug: 'vien-thien-ton', name: 'Viền Thiên Tôn' },
  { index: 29, slug: 'vien-sa-tang', name: 'Viền Sa Tăng' },
  { index: 30, slug: 'vien-bach-long', name: 'Viền Bạch Long' },
  { index: 31, slug: 'vien-hac-lang', name: 'Viền Hắc Lang' },
  { index: 32, slug: 'vien-bach-ho', name: 'Viền Bạch Hổ' },
] as const

export const AVATAR_COUNT = 18 + SHOP_AVATAR_DEFINITIONS.length
export const FRAME_COUNT = 7 + SHOP_FRAME_DEFINITIONS.length

export const WEEKLY_SHOP_FRAMES = [27, 28, 29, 30, 31, 32] as const
