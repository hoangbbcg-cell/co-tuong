# Bộ bảy danh hiệu mới

Nguồn: bảy ảnh người dùng đưa vào `src/assets/`, cập nhật 2026-10-04. Ảnh runtime được trim đúng bounding box của alpha khác 0; giữ màu, chữ và tỷ lệ gốc. Catalog dùng chung ở `src/lib/rankArtwork.ts`, được dùng cả dưới avatar và trong Bạn bè.

| Danh hiệu | Ảnh nguồn tại src/assets | Ảnh runtime | Crop x,y,w,h |
| --- | --- | --- | --- |
| Tân Binh | fb989ecd-fece-4d52-bb86-c605dd1ba5d6.png | rank-01-novice-v2.png | 0,40,2061,716 |
| Kỳ Sĩ | 4b8dda35-1ce5-4b4e-8c09-cef65ad0ee6e.png | rank-02-knight-v2.png | 0,22,2063,710 |
| Kỳ Thủ | 354c1f6e-5577-429c-bb6a-241173208ef2.png | rank-03-adept-v2.png | 0,9,2062,731 |
| Kỳ Tướng | a1d977cc-9d7a-4234-9a89-0be4732fba1e.png | rank-04-commander-v2.png | 17,12,2045,728 |
| Đại Sư (bậc 5) | c1fadcad-4e76-4eff-a586-6a56d7a3891f.png | rank-06-grandmaster-v2.png | 12,0,2145,693 |
| Kỳ Vương (bậc 6) | e5d90995-5042-4e95-b943-d53d8665f3b9.png | rank-05-king-v2.png | 14,0,2144,724 |
| Kỳ Thánh | 1ae4409a-2684-4c68-85dd-844d422231b9.png | rank-07-saint-v2.png | 16,0,2063,756 |

Giữ ô ảnh, vị trí và vùng sao cố định hiện có khi đổi bậc; ảnh hiển thị bằng object-contain. Bảy ảnh cũ đã được gỡ khỏi project sau khi thay toàn bộ import; bản khôi phục nằm trong thư mục work của chat.
