// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest'
import { isUiCheckboxLabelClick, isUiSelectionAction, isUiTabAction } from '../src/lib/uiActionSound'

afterEach(() => { document.body.replaceChildren() })

it('gives native checkboxes the tab sound even inside a row marked with X sound', () => {
  document.body.innerHTML = '<label data-ui-selection-sound><input type="checkbox" data-ui-selection-sound>Chọn</label>'
  const checkbox = document.querySelector('input')!
  expect(isUiTabAction(checkbox)).toBe(true)
  expect(isUiSelectionAction(checkbox)).toBe(false)
})

it('recognizes custom checkbox descendants and ignores disabled checkboxes', () => {
  document.body.innerHTML = '<button role="checkbox" data-ui-selection-sound><svg><path /></svg></button><fieldset disabled><input type="checkbox"></fieldset>'
  expect(isUiTabAction(document.querySelector('path'))).toBe(true)
  document.querySelector('button')!.setAttribute('aria-disabled', 'true')
  expect(isUiTabAction(document.querySelector('path'))).toBe(false)
  expect(isUiSelectionAction(document.querySelector('path'))).toBe(false)
  expect(isUiTabAction(document.querySelector('input'))).toBe(false)
})

it('plays once when clicking the label forwards a click to its native checkbox', () => {
  document.body.innerHTML = '<label data-ui-selection-sound><span>Chọn</span><input type="checkbox"></label>'
  const play = vi.fn()
  const listener = (event: MouseEvent) => {
    if (isUiCheckboxLabelClick(event.target)) return
    if (isUiTabAction(event.target)) play('tab')
    else if (isUiSelectionAction(event.target)) play('X')
  }
  document.addEventListener('click', listener, true)
  try {
    document.querySelector('span')!.click()
    expect(document.querySelector('input')!.checked).toBe(true)
    expect(play.mock.calls).toEqual([['tab']])
  } finally { document.removeEventListener('click', listener, true) }
})

it('keeps the explicit X sound for switches that are not checkbox inputs', () => {
  document.body.innerHTML = '<button role="switch" data-ui-selection-sound>Ẩn</button>'
  const button = document.querySelector('button')!
  expect(isUiTabAction(button)).toBe(false)
  expect(isUiSelectionAction(button)).toBe(true)
})
