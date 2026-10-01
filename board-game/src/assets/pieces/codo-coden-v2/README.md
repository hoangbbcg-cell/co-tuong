# Quân cờ cắt từ ảnh người dùng

Nguồn: `src/assets/pieces/coden-codo-v1/codo.png` và `src/assets/pieces/coden-codo-v1/coden.png`. Giữ nguyên pixel màu, chữ và ánh sáng của ảnh gốc. Script `docs/crop-codo-coden-v2.ps1` ghi tọa độ cắt của đủ 14 loại quân và tạo alpha khử răng cưa theo mép thân quân; file ôm sát thân, không giữ nền bàn hoặc bóng đã dính nền.

ChessPiece hiển thị object-contain, không padding/border. Bóng được tái tạo bằng drop-shadow nâu #48280999, lệch 7px/10px, blur 5px trong hệ tọa độ bàn; bóng nằm ngoài asset để không làm nhỏ phần thân quân.
