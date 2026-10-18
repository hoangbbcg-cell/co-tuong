# Bảng năng lượng: video và gói mua

- Ngày chốt:2026-10-16.
- Ưu tiên: **Cần làm sớm** theo yêu cầu người dùng.
- Trạng thái: backlog đã ghi nhận; chưa triển khai UI, quảng cáo, thanh toán hoặc database.

## Yêu cầu đã chốt

Bấm vào mục Năng lượng sẽ mở một bảng có3 lựa chọn:

| Lựa chọn | Giá | Quyền lợi |
| --- | --- | --- |
| Xem video | Không thu tiền | Cộng1 năng lượng |
| Mua gói50 năng lượng | 19.000đ | Nhận50 năng lượng |
| Mua gói vô hạn | 40.000đ | Vô hạn năng lượng trong1 tháng |

Không tự đổi giá, số lượng hoặc thời hạn trên. Một tháng chưa được quy đổi thành30 ngày khi chưa chốt cách tính.

## Đối chiếu trước khi triển khai

- Hiện năng lượng tự hồi tối đa5, hồi1 mỗi7 phút. Cần chốt cách giữ50 năng lượng mua: số dư riêng hay cho vượt trần; không được làm mất năng lượng đã mua do clamp về5.
- Cần chốt thời điểm bắt đầu/kết thúc gói vô hạn, cách gia hạn/cộng dồn và xử lý số dư khi gói còn/hết hạn.
- Quy tắc tài khoản hiện hành chỉ cho tài khoản đã liên kết mua bằng tiền thật; giữ điều kiện này, chưa mở mua cho Guest.
- Cần chọn tích hợp video và thanh toán, xác nhận hoàn tất ở server và chống nhận thưởng/cộng gói trùng. Chưa có tích hợp nào trong project.
- Cần đối chiếu schema MySQL trước khi làm: thiết kế energy0–5 hiện tại chưa đủ biểu diễn gói50/vô hạn. Đây là nhu cầu mới trong backlog, chưa duyệt thay schema hoặc tạo thêm bảng ở nhiệm vụ này.
- Không thay phạm vi áp dụng năng lượng từng mode hoặc ngoại lệ thử nghiệm khi chưa có yêu cầu riêng.

## Tiêu chí hoàn thành dự kiến

- Bấm mục Năng lượng mở đúng bảng3 lựa chọn và quyền lợi đã chốt.
- Chỉ cộng thưởng/cấp gói sau khi có xác nhận hợp lệ, lưu theo user; không tin client tự khai hoàn tất.
- Hiển thị đúng năng lượng đã mua và thời hạn vô hạn; tải lại không mất quyền lợi.
- Có trạng thái lỗi/hủy và không thu/cộng trùng khi thử lại.

Tài liệu này chỉ lưu công việc cần làm sớm, không phải xác nhận tính năng đã hoạt động.

- 2026-10-17: Popup Năng lượng theo mẫu mới, nguồn 21090d85-e647-4210-8a57-0a9e779a67ea.png, nút X vuông tách riêng thay nút tròn nguồn. Mở từ vùng/nút cộng năng lượng Home. Nội dung100 năng lượng/19.000đ, vô hạn30 ngày/39.000đ, video3 lượt và hồi30 phút là artwork xem UI theo mẫu lần này, chưa đổi nghiệp vụ7 phút/gói đã chốt hoặc triển khai quảng cáo/thanh toán. Nút hành động báo chưa tích hợp, không cộng tài nguyên.

- 2026-10-17: Theo yêu cầu thu nhỏ popup Năng lượng: chiều rộng tối đa1160px/80vw thay1460px/94vw; bỏ hàng mô tả dưới tiêu đề và toàn bộ thanh ghi chú cuối, dồn artwork gọn theo chiều dọc. Giữ tiêu đề Năng lượng/3 gói/nút X. Không thay HOANGBBCG hoặc nghiệp vụ.
