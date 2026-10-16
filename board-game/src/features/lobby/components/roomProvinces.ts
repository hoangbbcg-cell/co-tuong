import icon0 from '../../../assets/room-selection/province-icons/01_ha_noi.png'
import icon1 from '../../../assets/room-selection/province-icons/02_cao_bang.png'
import icon2 from '../../../assets/room-selection/province-icons/03_tuyen_quang.png'
import icon3 from '../../../assets/room-selection/province-icons/04_dien_bien.png'
import icon4 from '../../../assets/room-selection/province-icons/05_lai_chau.png'
import icon5 from '../../../assets/room-selection/province-icons/06_son_la.png'
import icon6 from '../../../assets/room-selection/province-icons/07_lao_cai.png'
import icon7 from '../../../assets/room-selection/province-icons/08_thai_nguyen.png'
import icon8 from '../../../assets/room-selection/province-icons/09_lang_son.png'
import icon9 from '../../../assets/room-selection/province-icons/10_quang_ninh.png'
import icon10 from '../../../assets/room-selection/province-icons/11_bac_ninh.png'
import icon11 from '../../../assets/room-selection/province-icons/12_phu_tho.png'
import icon12 from '../../../assets/room-selection/province-icons/13_hai_phong.png'
import icon13 from '../../../assets/room-selection/province-icons/14_hung_yen.png'
import icon14 from '../../../assets/room-selection/province-icons/15_ninh_binh.png'
import icon15 from '../../../assets/room-selection/province-icons/16_thanh_hoa.png'
import icon16 from '../../../assets/room-selection/province-icons/17_nghe_an.png'
import icon17 from '../../../assets/room-selection/province-icons/18_ha_tinh.png'
import icon18 from '../../../assets/room-selection/province-icons/19_quang_tri.png'
import icon19 from '../../../assets/room-selection/province-icons/20_hue.png'
import icon20 from '../../../assets/room-selection/province-icons/21_da_nang.png'
import icon21 from '../../../assets/room-selection/province-icons/22_quang_ngai.png'
import icon22 from '../../../assets/room-selection/province-icons/23_gia_lai.png'
import icon23 from '../../../assets/room-selection/province-icons/24_khanh_hoa.png'
import icon24 from '../../../assets/room-selection/province-icons/25_dak_lak.png'
import icon25 from '../../../assets/room-selection/province-icons/26_lam_dong.png'
import icon26 from '../../../assets/room-selection/province-icons/27_dong_nai.png'
import icon27 from '../../../assets/room-selection/province-icons/28_tp_ho_chi_minh.png'
import icon28 from '../../../assets/room-selection/province-icons/29_tay_ninh.png'
import icon29 from '../../../assets/room-selection/province-icons/30_dong_thap.png'
import icon30 from '../../../assets/room-selection/province-icons/31_vinh_long.png'
import icon31 from '../../../assets/room-selection/province-icons/32_an_giang.png'
import icon32 from '../../../assets/room-selection/province-icons/33_can_tho.png'
import icon33 from '../../../assets/room-selection/province-icons/34_ca_mau.png'

const provinceIcons: Record<string, string> = {
  'Hà Nội': icon0,
  'Cao Bằng': icon1,
  'Tuyên Quang': icon2,
  'Điện Biên': icon3,
  'Lai Châu': icon4,
  'Sơn La': icon5,
  'Lào Cai': icon6,
  'Thái Nguyên': icon7,
  'Lạng Sơn': icon8,
  'Quảng Ninh': icon9,
  'Bắc Ninh': icon10,
  'Phú Thọ': icon11,
  'Hải Phòng': icon12,
  'Hưng Yên': icon13,
  'Ninh Bình': icon14,
  'Thanh Hóa': icon15,
  'Nghệ An': icon16,
  'Hà Tĩnh': icon17,
  'Quảng Trị': icon18,
  'Huế': icon19,
  'Đà Nẵng': icon20,
  'Quảng Ngãi': icon21,
  'Gia Lai': icon22,
  'Khánh Hòa': icon23,
  'Đắk Lắk': icon24,
  'Lâm Đồng': icon25,
  'Đồng Nai': icon26,
  'TP. Hồ Chí Minh': icon27,
  'Tây Ninh': icon28,
  'Đồng Tháp': icon29,
  'Vĩnh Long': icon30,
  'An Giang': icon31,
  'Cần Thơ': icon32,
  'Cà Mau': icon33,
}

export function roomProvinceLabel(name: string) {
  if (name === 'Thành phố Hồ Chí Minh') return 'TP. Hồ Chí Minh'
  return name.replace(/^(?:Thành phố|Tỉnh)\s+/, '')
}

export function roomProvinceIcon(name: string) {
  return provinceIcons[roomProvinceLabel(name)]
}
