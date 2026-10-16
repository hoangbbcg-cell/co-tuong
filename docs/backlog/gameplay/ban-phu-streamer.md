# Bàn phụ streamer

- Ngày ghi nhận: 2026-10-15.
- Nhóm: Gameplay.
- Trạng thái: Ý tưởng tương lai — chưa triển khai.

## Ý tưởng

Khi đang chơi, có nút mở một bàn cờ phụ đè lên màn hình để người chơi thử hoặc minh họa các nước đi.

## Hành vi mong muốn

- Khi mở, bàn phụ copy thế cờ hiện tại làm thế gốc và giữ state riêng.
- Người chơi được tự do đi quân trên bàn phụ. Mọi thao tác chỉ tác động tới nhánh thử, không ảnh hưởng state ván thật, socket, lượt đi, đồng hồ hay kết quả.
- Có hoàn tác, làm lại, reset về đúng thế tại lúc mở và đóng bàn phụ.
- Ván thật phía sau vẫn tiếp tục bình thường, kể cả đồng hồ và nước đi của đối thủ. Bàn phụ không tự đồng bộ theo các nước mới của ván thật.
- Đóng bàn phụ không áp dụng các nước thử vào ván thật.

## Hạn chế Pikafish và gợi ý

Pikafish và gợi ý phải bị hạn chế trong trận người thật để tránh gian lận. Chính sách cụ thể cần được chốt trước khi triển khai; ý tưởng này không cho phép mở trợ giúp engine không giới hạn trong trận người thật.

## Phạm vi hiện tại

Chỉ ghi nhận backlog. Chưa code tính năng, chưa thay đổi gameplay hoặc UI hiện hành. Cần làm rõ quy tắc đi quân tự do và chính sách trợ giúp trước khi thực hiện.
