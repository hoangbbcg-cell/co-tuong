import { readGuestEntry } from './guestIdentity'

export interface ProfileLocation { address: string; province: string; countryCode: string }
const key = () => `co-tuong-location:${readGuestEntry()?.name ?? 'local-profile'}`
export function readProfileLocation(): ProfileLocation | null {
  try {
    const value = JSON.parse(localStorage.getItem(key()) ?? 'null') as Partial<ProfileLocation> | null
    return value && typeof value.address === 'string' && typeof value.province === 'string' && typeof value.countryCode === 'string' && /^[A-Z]{2}$/.test(value.countryCode) ? value as ProfileLocation : null
  } catch { return null }
}
export function saveProfileLocation(value: ProfileLocation) {
  localStorage.setItem(key(), JSON.stringify(value))
}
export const countryFlag = (code: string) => String.fromCodePoint(...Array.from(code, letter => 127397 + letter.charCodeAt(0)))
export const countryNames = new Intl.DisplayNames(['vi'], { type: 'region' })
export const COUNTRY_CODES = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ')
