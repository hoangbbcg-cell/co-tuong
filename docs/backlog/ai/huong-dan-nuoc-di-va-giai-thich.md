# Phân tích và Gợi ý trong chế độ đấu máy

- Ngày ghi nhận: 2026-10-15.
- Nhóm: AI; liên quan luyện tập.
- Trạng thái: Đã triển khai phần Gợi ý ngày2026-10-15; Phân tích giải thích lý do vẫn là ý tưởng tương lai.

## Ý tưởng

Trong chế độ đấu máy, Phân tích và Gợi ý có hai chức năng riêng. Chỉ Phân tích hiển thị lý do; Gợi ý dùng Pikafish chỉ nước đi bằng mũi tên xanh.

## Phân tích

- Dùng Pikafish mạnh nhất, không hạ sức mạnh, với thời gian tính700ms để cung cấp kết quả cho phần giải thích.
- Phân tích đúng thế cờ và bên tới lượt tại thời điểm bấm nút.
- Giải thích bằng tiếng Việt dễ hiểu: mục tiêu của nước đi, đe dọa cần hóa giải, lợi ích chiến thuật hoặc cải thiện thế trận, tùy tình huống thực tế.
- Khi phù hợp, minh họa các nước đáp trả chính của đối phương và diễn biến tiếp theo để làm rõ lý do.
- Phân biệt diễn biến dự kiến với kết quả chắc chắn; lời giải thích phải bám nước hợp lệ và kết quả phân tích, không tự bịa lý do.

## Gợi ý

- Khi bấm Gợi ý, Pikafish tìm nước đi hợp lệ cho thế cờ và bên tới lượt hiện tại.
- Hiển thị mũi tên xanh trên bàn từ vị trí quân cần đi đến vị trí đích.
- Chỉ chỉ nước đi, không hiển thị phần giải thích lý do của Phân tích.
- Không tự đi quân hoặc tự áp dụng nước gợi ý vào ván; người chơi quyết định thực hiện.
- Nguồn gợi ý là Pikafish, không thay bằng máy cơ bản hoặc nước do mô hình ngôn ngữ tự đoán.
- Dùng Pikafish mạnh nhất, không hạ sức mạnh, với thời gian tính700ms.

## Phạm vi sử dụng

Phạm vi cập nhật2026-10-15: Gợi ý áp dụng trong các bàn thử, gồm nhánh đánh thử từ replay ván/thế đã lưu và Vị trí tùy chỉnh. Bỏ nút Gợi ý riêng ở các ván Cờ Tướng/Cờ Úp thông thường. Phân tích giải thích lý do vẫn chưa triển khai.

Trong trận người thật, phải hạn chế trợ giúp AI/Pikafish để tránh gian lận, nhất quán với [ý tưởng bàn phụ streamer](../gameplay/ban-phu-streamer.md). Chính sách cụ thể cần chốt trước khi triển khai.

## Cần làm rõ trước khi triển khai

- Cách kết hợp engine tìm nước với AI diễn giải và kiểm chứng nội dung giải thích.
- Mức độ chi tiết, cách trình bày biến minh họa và xử lý khi thế cờ thay đổi trong lúc phân tích.
- Chi phí, thời gian chờ và giới hạn sử dụng.

## Phạm vi hiện tại

Mọi nút Gợi ý trong các bàn thử đã nối Pikafish mạnh nhất/search700ms, đúng phe người chơi của bàn đang xem, chỉ ở lượt người chơi. Vẽ một mũi tên xanh trên Board hiện có, không tự đi quân; đổi thế/lượt, reset/undo hoặc rời màn hình sẽ xóa/hủy gợi ý. Không bật gợi ý trong trận online thật; Pikafish chưa hỗ trợ Cờ Úp nên báo rõ khi gặp biến thể này. Phân tích giải thích lý do chưa triển khai.
