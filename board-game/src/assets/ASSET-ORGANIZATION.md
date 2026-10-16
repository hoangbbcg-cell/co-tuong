# Asset organization

- 2026-10-13: Nút gỗ Đấu ngay của Vị trí tùy chỉnh tại buttons/custom-position-start.png, chỉnh chữ từ ready-button-ss-shadow-reference.png; nguồn/alpha crop tại buttons/custom-position-start-source.md.

- 2026-10-13: Banner Luyện cờ màn máy tại computer-setup/training-banner.png, nguồn63e5f151 trong references/uploads; crop/script tại computer-setup/training-banner-source.md.


- 2026-10-10: Runtime bàn/ghế Chọn Bàn tại `room-selection/table-*.png`, nguồn lưu `references/uploads/room-tables/`; mô tả tại `room-selection/table-artwork-source.md`.

- 2026-10-10: Bộ 34 icon tỉnh/thành tạo mới nằm tại `room-selection/province-icons/`; tên/biểu tượng/thứ tự/prompt tại manifest.json. Nguồn giữ tại `references/uploads/province-icons-generated/`, crop bằng `scripts/prepare-province-icons.ps1`.

Ảnh giao diện đang dùng nằm theo nhóm chức năng hiện có. Ảnh nguồn người dùng cung cấp được gom tại `references/uploads/`; reference và đầu vào script crop được giữ để đối chiếu/tái tạo. Tài liệu nguồn và giấy phép giữ cùng nhóm.

Dọn ngày 2026-10-03: xóa 129 ảnh không được tham chiếu; gom 8 ảnh nguồn rời. Không chỉnh pixel hoặc giao diện.

## Quy tắc thư mục hiện hành
| Asset chạy | Tên file hiện tại | Tên nguồn ban đầu |
| --- | --- | --- |
| Khung avatar vàng mặc định | `player/avatar-frames/gold-frame.png` | `30dfa56b-d9f3-4129-b9fd-aaf0ea884188.png` |
| Khung avatar đỏ | `player/avatar-frames/red-frame.png` | `3830d50d-608d-4c7c-b4b8-90ab56e5d423.png` |
| Khung avatar xanh lá | `player/avatar-frames/green-frame.png` | `bfe1914e-68bf-4a53-bba9-394552e7a83a.png` |
| Khung avatar xanh dương | `player/avatar-frames/blue-frame.png` | `c6e6ed73-8a09-4dc7-955b-27b0da3557b0.png` |

- Asset chạy được dùng đặt trong thư mục chức năng; khung avatar mặc định (`30dfa56b…`) và ba biến thể (`3830d50d…`, `bfe1914e…`, `c6e6ed73…`) nằm tại `player/avatar-frames/` với tên `gold-frame.png`, `red-frame.png`, `green-frame.png`, `blue-frame.png`.
- Ảnh/video người dùng cung cấp để tham chiếu, crop hoặc lưu nguồn nằm tại `references/uploads/`, có tên mô tả mục đích. Các ảnh nguồn rank/profile, thẻ Chọn Bàn, bàn trống, nhạc nền và hàng phong danh hiệu đã được chuyển vào đây.
- Các file nguồn cũ có UUID chưa xác định chức năng vẫn được giữ trong `references/uploads/` với tên gốc: `1c7141e5-e240-4d7b-abfe-9b66335606a0.png`, `e0dda929-bdf0-4851-8aa8-73b89bcb2862.png`.
- Bản nguồn trùng nội dung với các reference đã có vẫn được giữ để bảo toàn file người dùng cung cấp; script và tài liệu dùng đường dẫn reference đã đặt tên.
- Không để ảnh/audio rời trực tiếp ở `src/assets/`; cập nhật import, script crop và tài liệu nguồn cùng lúc khi di chuyển.

- 2026-10-10: Nguồn 8ee5ac91 và f6d81a33 đã xác định là khung/thẻ chọn tỉnh thành; runtime và tọa độ crop tại `room-selection/province-picker-source.md`.

- 2026-10-13: Mặt sau quân trong ván Cờ Úp dùng một quân cắt sát từ ảnh người dùng cung cấp `references/uploads/63d54150-142b-46fb-82ba-3b855bf0da68.png` (tấm 3×2, lấy quân trên trái), xuất `pieces/concealed-back.png`; ô chế độ Cờ Úp ở Home giữ nguyên. Crop vùng (33,89) 444×444, giới hạn ellipse để loại nhiễu ngoài quân rồi trim alpha còn 441×435.


