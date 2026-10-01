# Ảnh chế độ Home

## Bản nguyên cụm từ game action.png

Nguồn mới: `../game action.png`, giữ cả hình và bảng chữ. ImageGen tích hợp tách nền thành `full-badges-sheet.png` (1122×1402). Cắt 4 ô 561×701 bằng System.Drawing: quick-full.png (0,0), hidden-full.png (561,0), computer-full.png (0,701), rooms-full.png (561,701). Thứ tự Home đã được xác nhận: nguồn 1→ô 1, 2→ô 4, 3→ô 3, 4→ô 2. Các ảnh cũ giữ đối chiếu. Đã xem sheet và kiểm tra alpha.

Home hiển thị nguyên cụm rộng 170px sau bù scale khi đủ chỗ, cao tự theo tỷ lệ, max-width 100% để vừa mobile; bỏ nhãn rời cũ, giữ tên truy cập và chức năng hiện tại.

Prompt: Extract the FOUR COMPLETE game menu badges from this image onto TRUE transparent alpha background. Each badge MUST include its circular illustration, gold frame, decorative clouds/foliage, and its entire lower brown name plaque with original Vietnamese gold lettering. Left-to-right exact labels: 'Cờ Tướng', 'Cờ Úp', 'Đấu với máy', 'Chọn Bàn'. Preserve original artwork, proportions, letters, colors and detail; remove ONLY the landscape scenery between and behind badges. No new elements. Arrange as a TWO BY TWO sprite sheet with four equal cells: first top-left, second top-right, third bottom-left, fourth bottom-right. Canvas aspect ratio 4:5; each cell aspect ratio 4:5. Keep each complete badge centered in its cell with at least 5% transparent margins, equal visual sizes, no overlapping cell boundaries. True alpha transparency, no background color or checkerboard. Preserve the attached text plaques, do not remove them.

Nguồn người dùng: `../action game.png`, ngày 2026-09-19. Giữ nguyên nguồn.

ImageGen tích hợp tách nền ba hình thành `extracted-sheet.png` (2172×724, RGBA), sau đó cắt ba vùng 724×724 bằng System.Drawing theo yêu cầu cắt ảnh. Đã xem sheet và xác nhận alpha góc bằng 0. Vì dùng ImageGen, chi tiết có thể khác ảnh nguồn.

| File | Vùng x,y,w,h trong sheet | Ảnh gốc → vị trí Home |
| --- | --- | --- |
| quick.png | 0,0,724,724 | Ô 1 Cờ Tướng → Chơi Nhanh |
| hidden.png | 724,0,724,724 | Ô 2 Cờ Úp → ô cuối Cờ Úp |
| rooms.png | 1448,0,724,724 | Ô cuối Chơi Online → ô 2 Chọn Bàn |

Không dùng ô Kho Games. Giữ nguyên ô Chơi Với Máy, tên nút hiện tại và callback.

Prompt: Background extraction for game UI assets. Extract exactly THREE original circular illustrations from this reference: original first (xiangqi pieces and flag), original second (concealed chess pieces with lantern), original fourth (two glowing players at online chess table). EXCLUDE original third '10+ Games'. Remove all landscape background and ALL bottom text plaques/labels including their frames. Preserve circular gold frames and the small decorative clouds, foliage, rocks belonging to each illustration. Keep original illustration details and style; do not redesign. Output a TRUE transparent alpha PNG sprite sheet, wide 3:1 aspect ratio, exactly three equal square cells in one horizontal row. First in left third, second in middle third, fourth in right third. Each complete icon centered within its cell with generous transparent padding of at least 5% on every side; no overlap across cell boundaries. No labels, no text below icons, no checkerboard or opaque background. All three circles same visual diameter.
