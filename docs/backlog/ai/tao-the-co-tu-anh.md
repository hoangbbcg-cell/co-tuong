# AI tạo lại thế cờ từ ảnh

- Ngày ghi nhận: 2026-10-15.
- Nhóm: AI.
- Khu vực sử dụng: Vị trí tùy chỉnh → Tạo từ ảnh.
- Trạng thái: Ý tưởng tương lai — chưa triển khai.

## Mục tiêu

Bổ sung chức năng tạo lại bàn cờ từ ảnh trong phần Vị trí tùy chỉnh. Người dùng cung cấp ảnh bàn cờ, AI đọc và hiểu các quân cờ để dựng lại thế tương ứng trong trình xếp thế hiện có.

## Khả năng AI cần có

- Nhận diện bàn cờ, lưới 10×9 và hướng bàn trong ảnh.
- Đọc và phân biệt các loại quân: Tướng, Sĩ, Tượng, Mã, Xe, Pháo, Tốt; hiểu chữ tương ứng của hai phe, không chỉ nhận màu hoặc hình tròn.
- Xác định phe Đỏ/Đen và giao điểm của từng quân; phân biệt vị trí có quân với vị trí trống.
- Hướng tới hỗ trợ nhiều kiểu quân và ảnh chụp khác nhau, không chỉ ảnh dùng đúng bộ quân của ứng dụng. Phạm vi ảnh hỗ trợ cần được chốt và kiểm chứng khi triển khai.
- Khi ảnh mờ, quân bị che hoặc nhận diện chưa chắc chắn, đánh dấu để người dùng kiểm tra; không âm thầm đoán và coi là chính xác.

## Luồng dự kiến

1. Người dùng mở Vị trí tùy chỉnh và chọn Tạo từ ảnh.
2. Cung cấp ảnh bàn cờ để AI nhận diện.
3. Xem bản dựng lại cùng các vị trí chưa chắc chắn; sửa loại quân, phe, vị trí hoặc hướng bàn nếu cần.
4. Xác nhận để đưa thế đã kiểm tra vào trình xếp thế hiện có; tiếp tục chỉnh sửa và chọn bên đi trước.

Ảnh tĩnh không đủ để suy ra chắc chắn bên tới lượt. Không tự bắt đầu ván đấu sau nhận diện; giữ quy trình kiểm tra thế cờ hiện hành trước khi sử dụng.

## Liên hệ với hiện trạng

Theo [tài liệu Vị trí tùy chỉnh](../../../board-game/docs/CUSTOM-POSITION.md), nút Tạo từ ảnh hiện chưa mở luồng nhận diện trên UI; mã xử lý cục bộ trước đây chỉ hỗ trợ ảnh rõ cùng kiểu bàn/bộ quân. Ý tưởng này đề xuất bổ sung AI hiểu quân cờ, chưa phải khả năng đã có.

## Cần làm rõ trước khi triển khai

- Dịch vụ hoặc mô hình AI, chi phí và cách xử lý ảnh người dùng.
- Các kiểu ảnh/bộ quân được hỗ trợ và tiêu chí đánh giá độ chính xác.
- Cách hiển thị và sửa kết quả chưa chắc chắn.
- Cờ Úp: ảnh không thể cho biết danh tính thật của quân đang úp; không suy đoán quân ẩn. Phạm vi hỗ trợ cần chốt riêng.

## Phạm vi hiện tại

Chỉ ghi nhận ý tưởng trong backlog và liên kết ở README. Không sửa code game, không tích hợp AI, không thay đổi UI hoặc hành vi hiện hành.
