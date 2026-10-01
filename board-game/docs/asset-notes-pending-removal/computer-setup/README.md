# Ảnh cắt màn hình Chơi với máy

Nguồn: `../Chơi với máy.png` (1956 × 804), người dùng cung cấp và yêu cầu cắt trực tiếp ngày 2026-09-18. Giữ nguyên ảnh nguồn và RGB vùng cắt, không sinh lại bằng AI.

Tọa độ `x, y, width, height` tính bằng pixel từ góc trên trái:

| File | Vùng cắt |
| --- | --- |
| title.png | 570, 84, 814, 96 |
| robot-black.png | 554, 180, 174, 141 |
| robot-red.png | 554, 317, 174, 143 |
| custom-position.png | 536, 508, 444, 80 |
| start-match.png | 999, 508, 422, 80 |
| puzzles.png | 466, 595, 1025, 141 |
| trophy.png | 1739, 15, 56, 54 |
| muted.png | 1817, 15, 55, 54 |
| avatar.png | 171, 16, 52, 50 |
| back.png | 104, 27, 34, 23 |
| footer.png | 722, 747, 514, 20 |

Robot có alpha theo hợp hai đường tròn cho chân dung và huy hiệu, chuyển tiếp mép 1px. Tâm tương đối chân dung (74,70) đen / (74,71) đỏ, bán kính 71; huy hiệu (140,110) đen / (140,108) đỏ, bán kính 29. Các ảnh chữ/nút/banner giữ phần nền đã dính trong screenshot để không làm mất bóng, màu và chi tiết gốc. Chưa có background rời; không cam kết khớp toàn màn hình 100% khi scale hoặc dùng nền thay thế.

ComputerSetup dùng ảnh trong button/h1 với alt để giữ thao tác và tên truy cập. Select và radio vẫn là điều khiển HTML thật; không quảng cáo Pikafish như engine đã tích hợp.

Background rời đã được người dùng cung cấp tại `../chơi với máy nền.png`, dùng trực tiếp trong ComputerSetup, không áp sepia hoặc phủ tối. Các vùng cắt chữ vẫn giữ nền từ screenshot gốc.

2026-09-18: `title-transparent.png` được chỉnh bằng ImageGen từ `title.png`: giữ chữ “Chơi với máy” và hai họa tiết mây, xóa nền chữ nhật và toàn bộ dòng phụ. Prompt: preserve main Vietnamese title and gold cloud ornaments; remove subtitle and its small lines; remove dark background to true alpha; no new text. Đã xem ảnh và kiểm tra alpha. UI dùng vùng hiển thị cao 100px để bỏ khoảng trong suốt thừa; không còn dùng footer.png. Theo yêu cầu mới, nền trang có lớp nâu gradient mềm ở giữa; ảnh nền gốc giữ nguyên.
