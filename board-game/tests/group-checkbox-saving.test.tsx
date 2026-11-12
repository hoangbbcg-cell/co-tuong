// @vitest-environment jsdom
import { useState } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { MessagesGroupSettings } from '../src/features/lobby/components/MessagesGroupSettings'
afterEach(cleanup)
it.each(['Tắt tin nhắn nhóm','Khóa bạc có thể nhắn'])('keeps %s checked and its visible box mounted across saving',async label=>{
  let finish!:()=>void
  const saving=new Promise<void>(resolve=>{finish=resolve})
  function Harness(){
    const [values,setValues]=useState({chat:false,deputy:false})
    return <MessagesGroupSettings name="Nhóm" onBack={()=>{}} onDissolve={async()=>{}} chatDisabled={values.chat} deputyChatAllowed={values.deputy} onSetChat={async(chat,deputy)=>{await saving;setValues({chat,deputy})}}/>
  }
  const view=render(<Harness/>)
  fireEvent.click(screen.getByRole('button',{name:'Tắt tin nhắn nhóm'}))
  const input=screen.getByLabelText(label) as HTMLInputElement
  const visibleBox=input.nextElementSibling
  fireEvent.click(input)
  expect(input.checked).toBe(true)
  expect(input.disabled).toBe(true)
  expect(input.nextElementSibling).toBe(visibleBox)
  view.rerender(<Harness/>)
  expect(input.checked).toBe(true)
  expect(input.nextElementSibling).toBe(visibleBox)
  await act(async()=>{finish();await saving})
  expect(input.checked).toBe(true)
  expect(input.disabled).toBe(false)
  expect(input.nextElementSibling).toBe(visibleBox)
})
