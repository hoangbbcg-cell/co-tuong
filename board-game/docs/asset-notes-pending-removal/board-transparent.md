# Nguồn bàn cờ

`board-transparent.png` tạo từ `board-source.png` do người dùng cung cấp, kích thước 532×572. Giữ nguyên ảnh nguồn và RGB của gỗ/đường kẻ. Chỉ xóa vùng trắng nối với mép ảnh bằng flood fill (kênh nhỏ nhất ≥200, chênh lệch kênh ≤35), thay bằng alpha 0; không xóa vùng trong bàn.

Board dùng trực tiếp ảnh này, không chồng lưới SVG cũ. Tọa độ quân/vùng bấm được căn theo lưới ảnh mới.
