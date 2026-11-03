import { CrispUiImage } from './CrispUiImage'
import { countryNames } from './profileLocation'

const flags=import.meta.glob<string>('../assets/countries/*.svg',{eager:true,query:'?url',import:'default'})

/** Bundled SVG artwork: Windows does not render regional-indicator emoji as flags. */
export function CountryFlag({code,className=''}:{code:string;className?:string}) {
  const source=flags[`../assets/countries/${code.toLowerCase()}.svg`]
  if(!source)return null
  return <CrispUiImage src={source} alt={`Cờ ${countryNames.of(code)??code}`} title={countryNames.of(code)} draggable={false} className={`block m-0 shrink-0 self-center border-0 p-0 object-contain ${className}`} />
}
