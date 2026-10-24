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



## Sắp xếp 2026-10-24

| File nguồn | Đường dẫn mới |
| --- | --- |
| 07100236-8b2c-46b7-a762-41aa66c18726.png | references/uploads/room-selection/07100236-8b2c-46b7-a762-41aa66c18726.png |
| 0963fdaa-fd2f-4c9d-bcce-0cd1500ccfd8.png | messages/create-group-frame.png |
| 0a700f7c-2c0d-40c8-a397-49d1229dbd64.png | references/uploads/history/0a700f7c-2c0d-40c8-a397-49d1229dbd64.png |
| 0fed4f87-153a-4338-ad9b-a3a0e2e1ff1c.png | references/uploads/history/0fed4f87-153a-4338-ad9b-a3a0e2e1ff1c.png |
| 17dba0c6-ed86-4828-af8d-601de53cf19d.png | references/uploads/game-result/17dba0c6-ed86-4828-af8d-601de53cf19d.png |
| 1e7b8a6f-7458-4710-a3d2-d139141d8cfc.png | references/uploads/unclassified/1e7b8a6f-7458-4710-a3d2-d139141d8cfc.png |
| 21090d85-e647-4210-8a57-0a9e779a67ea.png | references/uploads/energy-shop/21090d85-e647-4210-8a57-0a9e779a67ea.png |
| 2a1666ac-81f6-4519-ad6f-d39df43e1280.png | references/uploads/unclassified/2a1666ac-81f6-4519-ad6f-d39df43e1280.png |
| 4470bd4d-e86e-44ae-b57e-7f0f4af78a2f.png | references/uploads/history/4470bd4d-e86e-44ae-b57e-7f0f4af78a2f.png |
| 49740109-5a33-4729-890d-c965b532934c.png | references/uploads/shop/49740109-5a33-4729-890d-c965b532934c.png |
| 49ad812e-f5a3-4f08-a96f-27dcf19142c1.png | references/uploads/unclassified/49ad812e-f5a3-4f08-a96f-27dcf19142c1.png |
| 5838272b-e801-4114-8e4b-2f665dde7348.png | references/uploads/unclassified/5838272b-e801-4114-8e4b-2f665dde7348.png |
| 5fc33724-02ea-4d9c-b66c-e3f96b9fcbf5.png | references/uploads/shop/5fc33724-02ea-4d9c-b66c-e3f96b9fcbf5.png |
| 63e5f151-292a-42f2-aaf6-87a98eb66220.png | references/uploads/computer-setup/63e5f151-292a-42f2-aaf6-87a98eb66220.png |
| 6c0cdab5-e284-4ae6-ac70-c3119205ed80.png | references/uploads/history/6c0cdab5-e284-4ae6-ac70-c3119205ed80.png |
| 72f80581-6af2-490e-b9fa-fcdf2f104da8.png | references/uploads/room-selection/72f80581-6af2-490e-b9fa-fcdf2f104da8.png |
| 7c55d422-22c0-40f3-9c29-ee23f4b57d58.png | references/uploads/messages/7c55d422-22c0-40f3-9c29-ee23f4b57d58.png |
| 95959a5a-61d2-4816-a2d7-0f5de8a2b0e8.png | references/uploads/unclassified/95959a5a-61d2-4816-a2d7-0f5de8a2b0e8.png |
| 971d28dd-8350-46e9-a9d0-0b0ac67e38fd.png | references/uploads/room-selection/971d28dd-8350-46e9-a9d0-0b0ac67e38fd.png |
| 998873f2-4e94-4eb1-807e-40dcbd926489.png | references/uploads/room-selection/998873f2-4e94-4eb1-807e-40dcbd926489.png |
| e05c67be-c3da-4cdb-bece-77e6fdd38dae.png | references/uploads/room-selection/e05c67be-c3da-4cdb-bece-77e6fdd38dae.png |
| e7544f25-2cc2-4bfb-8fcd-c3f3ff3dd520.png | references/uploads/home-actions/e7544f25-2cc2-4bfb-8fcd-c3f3ff3dd520.png |
| ff38225e-a7c3-4f17-97dd-14a883c0cef9.png | references/uploads/game-result/ff38225e-a7c3-4f17-97dd-14a883c0cef9.png |

