# Quân cờ cắt từ ảnh mẫu

Quân đen hiện dùng `black-*-source-cut-v2.png`: thu mép trái mask vào 3 pixel nguồn, giữ mép phải, loại dải nền còn sót. Quân đỏ giữ bản v1. Dùng `-BlackOnly` khi chạy script để chỉ xuất quân đen.

Nguồn: `../c7ad3098-859f-443b-819c-e9f9a521b7b6.png` (941×1672), ảnh người dùng cung cấp, chứa cả hai phe.

14 file `*-source-cut-v1.png` cắt trực tiếp từ nguồn, giữ nguyên RGB bên trong quân, chữ và vị trí vòng trong. Alpha mép ngoài lấy mẫu 8×8 để chống răng cưa. Không dùng AI tạo lại hoặc đổi màu ảnh.

Tọa độ và lệnh tái tạo: `board-game/docs/crop-reference-pieces.ps1`. Chạy bằng PowerShell với System.Drawing có sẵn; không cần dependency mới.

PNG chỉ chứa thân quân, tight crop 104×118 hoặc 106×118px. Bóng nền bàn không giữ trong PNG vì chứa đường kẻ; ChessPiece hiển thị bóng mềm lệch phải/xuống 4×6px, blur 3px, opacity 48%. Đây là bóng tái tạo gần mẫu, không phải bóng gốc đã tách pixel.
