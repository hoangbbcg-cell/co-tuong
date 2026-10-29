// @vitest-environment jsdom
import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import { RoomOfferDialog } from '../src/features/game/components/RoomOfferDialog'
import type { RoomSnapshot } from '../src/types/room'

const initialRoom = { takebackOffer: { requester: 'red' as const, plies: 1 as const }, drawOffer: null }

function TwoPlayerSessions() {
  const [room, setRoom] = useState<Pick<RoomSnapshot, 'takebackOffer' | 'drawOffer'>>(initialRoom)
  const receive = () => setRoom({ ...room, takebackOffer: null })
  return <>
    <section aria-label="Phiên người yêu cầu">
      <RoomOfferDialog online playerSide="red" {...room} pending={false} replyDraw={() => {}} replyTakeback={receive} />
    </section>
    <section aria-label="Phiên người phản hồi">
      <RoomOfferDialog online playerSide="black" {...room} pending={false} replyDraw={() => {}} replyTakeback={receive} />
    </section>
  </>
}

describe('popup yêu cầu đi lại theo room snapshot', () => {
  it('ẩn popup trên phiên nhận snapshot takebackOffer=null và không giữ lớp chặn bàn cờ', () => {
    const room = { ...initialRoom, takebackOffer: null as RoomSnapshot['takebackOffer'] }
    render(<>
      <RoomOfferDialog online playerSide="red" {...room} pending={false} replyDraw={() => {}} replyTakeback={() => {}} />
      <RoomOfferDialog online playerSide="black" {...room} pending={false} replyDraw={() => {}} replyTakeback={() => {}} />
    </>)
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(document.querySelector('.fixed.inset-0.z-50')).toBeNull()
  })

  it('đóng ngay sau phản hồi trước hạn khi server cập nhật snapshot cho cả hai phiên', () => {
    render(<TwoPlayerSessions />)
    expect(screen.getAllByRole('alertdialog')).toHaveLength(1)
    expect(screen.getByRole('region', { name: 'Phiên người yêu cầu' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Cho phép đi lại' }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('không dựng lại popup cho phiên mới khi snapshot sau kết nối đã hết offer', () => {
    const snapshot = { ...initialRoom, takebackOffer: null as RoomSnapshot['takebackOffer'] }
    render(<RoomOfferDialog online playerSide="black" {...snapshot} pending={false} replyDraw={() => {}} replyTakeback={() => {}} />)
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })
})
