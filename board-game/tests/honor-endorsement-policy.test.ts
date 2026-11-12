import { expect, it } from 'vitest'
import { ContentRepository } from '../server/repositories/contentRepository'

it('server từ chối gỡ lượt phong trước khi truy cập hoặc thay đổi dữ liệu', async () => {
  await expect(new ContentRepository().endorse('giver', 'recipient', 'pt_5_ky-huu', false)).rejects.toThrow('đã phong không thể gỡ')
})
