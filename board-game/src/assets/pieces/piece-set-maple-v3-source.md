# Nguồn bộ quân maple v3

- Ngày xử lý: 2026-09-24.
- Nguồn: hai sprite sheet quân đen và quân đỏ do người dùng cung cấp trong hội thoại.
- Công cụ: OpenAI built-in image generation ở chế độ background extraction/re-layout; giữ nguyên chữ, màu gỗ, bevel và bóng, đưa mỗi bên thành một hàng alpha tách biệt.
- Xử lý sau: chia mỗi hàng thành 7 vùng theo thứ tự `rook`, `horse`, `elephant`, `advisor`, `general`, `cannon`, `soldier`; tìm bounding box alpha > 2 và crop sát từng quân.
- Kích thước crop đen: 286–294px rộng, 303–305px cao. Crop đỏ: 292–297px rộng, 303–307px cao.
- Tất cả asset đã chứa bóng trong PNG; component không thêm filter màu hoặc bóng CSS.
