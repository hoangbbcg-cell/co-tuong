// @vitest-environment jsdom
import { cleanup,render,screen } from '@testing-library/react'
import { afterEach,expect,it } from 'vitest'
import { CountryFlag } from '../src/lib/CountryFlag'
import { COUNTRY_CODES } from '../src/lib/profileLocation'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

afterEach(cleanup)
it('renders Vietnam as real SVG artwork aligned to the address row, not emoji text',()=>{
  render(<CountryFlag code="VN" className="h-[var(--ui-p-21,21px)] w-[var(--ui-p-28,28px)]" />)
  const flag=screen.getByRole('img',{name:'Cờ Việt Nam'})
  expect(flag.tagName).toBe('IMG')
  expect(decodeURIComponent(flag.getAttribute('src')??'')).toContain('flag-icons-vn')
  expect(flag.classList.contains('self-center')).toBe(true)
  expect(screen.queryByText('VN')).toBeNull()
})
it('bundles artwork for every selectable country',()=>{
  for(const code of COUNTRY_CODES)expect(existsSync(resolve('src/assets/countries',`${code.toLowerCase()}.svg`)),code).toBe(true)
})
