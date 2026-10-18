
- 2026-10-16: Tên Guest hiển thị mới dùng “Kỳ thủ” + 5 số random; guest_code nội bộ DB vẫn 6 số để giữ unique/schema. Guest cũ 6 số vẫn được validate để tương thích, tên tự sinh cũ trong DB chỉ đổi display_name/search_name, không xóa hồ sơ/dữ liệu. Cách vào trên thiết bị mới (tự vào Guest hay hiện màn chọn) đang chờ người dùng làm rõ.

- 2026-10-16 (đính chính): Tên hiển thị Guest mới phải là “Guest” + 5 chữ số random (ví dụ Guest04217), không phải “Kỳ thủ”. guest_code nội bộ vẫn 6 số; tên cũ vẫn được validate tương thích. Đã đổi lại tên Guest cũ trong DB từ Kỳ thủxxxxx sang Guestxxxxx, giữ toàn bộ dữ liệu.
