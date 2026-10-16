# Bộ bảy danh hiệu mới

Nguồn: bảy ảnh người dùng đưa vào `src/assets/`, cập nhật 2026-10-04. Ảnh runtime được trim đúng bounding box của alpha khác 0; giữ màu, chữ và tỷ lệ gốc. Catalog dùng chung ở `src/lib/rankArtwork.ts`, được dùng cả dưới avatar và trong Bạn bè.

| Danh hiệu | Ảnh nguồn tại src/assets/references/uploads | Ảnh runtime | Crop x,y,w,h |
| --- | --- | --- | --- |
| Tân Binh | rank-01-novice-source.png | rank-01-novice-v2.png | 0,40,2061,716 |
| Kỳ Sĩ | rank-02-knight-source.png | rank-02-knight-v2.png | 0,22,2063,710 |
| Kỳ Thủ | rank-03-adept-source.png | rank-03-adept-v2.png | 0,9,2062,731 |
| Kỳ Tướng | rank-04-commander-source.png | rank-04-commander-v2.png | 17,12,2045,728 |
| Đại Sư (bậc 5) | rank-06-grandmaster-source.png | rank-06-grandmaster-v2.png | 12,0,2145,693 |
| Kỳ Vương (bậc 6) | rank-05-king-source.png | rank-05-king-v2.png | 14,0,2144,724 |
| Kỳ Thánh | rank-07-saint-source.png | rank-07-saint-v2.png | 16,0,2063,756 |

Giữ ô ảnh, vị trí và vùng sao cố định hiện có khi đổi bậc; ảnh hiển thị bằng object-contain. Bảy ảnh cũ đã được gỡ khỏi project sau khi thay toàn bộ import; bản khôi phục nằm trong thư mục work của chat.

