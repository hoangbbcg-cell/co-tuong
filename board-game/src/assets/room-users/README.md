# Room user card frames

- `waiting-card-frame.png`: khung chờ ghép màu vàng, tách từ phong cách thẻ hàng trên trong `src/assets/room-users/view-source.png`.
- `viewer-card-frame.png`: khung người xem màu xanh, tách từ phong cách thẻ hàng dưới trong `src/assets/room-users/view-source.png`.
- Hai ảnh được tạo bằng chế độ chỉnh sửa ảnh tích hợp, xóa chữ/avatar/số, giữ nền và viền, sau đó trim theo alpha sát mép.
- Component dùng `border-image` 9-slice để co giãn chiều ngang mà không kéo méo các góc.
- `waiting-card-frame-tight.png` và `viewer-card-frame-tight.png` là bản crop cơ học từ hai PNG trên, bỏ dải alpha thừa để viền hai loại thẻ có cùng chiều cao nhìn thấy và gap dọc đúng kích thước CSS. Crop theo vùng alpha > 32: chờ `(3, 6, 2077, 454)`, xem `(27, 96, 2004, 431)`; không vẽ lại nội dung.
