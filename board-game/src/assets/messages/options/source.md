# Tùy chọn chat

- action-row-blank.png: imagegen chỉnh từ block.png, bỏ chữ/icon trái và giữ nền nâu liền mạch, viền vàng, họa tiết/mũi tên phải. Output gốc2164×727, crop vùng(0,244,2164,236), loại alpha dưới10 để bỏ pixel gần trong suốt dư; ảnh runtime2164×236, góc alpha0. Dùng làm toàn nền hàng cho Chặn/Bỏ chặn và Xem thành viên, không phủ lớp chữ nhật dưới nhãn HTML.

- Nguồn người dùng: `../../references/uploads/messages-options-8109d221.png`, ID8109d221-b5fa-4bae-ae0b-e84300de1d15; 1448×1086px.
- Crop có thể tái tạo bằng `scripts/crop-message-options.ps1`. Không dùng ảnh chụp toàn màn hình làm điều khiển; nút là asset riêng trong button HTML. Title được bỏ bằng ghép các vùng nền header không có chữ.
- Panel tham chiếu: x278,y38,w894,h1008. Frame chỉ giữ viền, bên trong và vùng ngoài nét trang trí có alpha. Các nút có mask alpha cho góc ngoài, wrapper padding/margin/border0, ảnh object-contain.
- Header trái (309,70,211,97), giữa (520,150,423,14), phải (943,70,200,97); cảnh (309,167,834,257), nền dưới (340,511,770,14). Dải giữa/nền dưới chỉ lấy vùng không có chữ/nút/viền của nguồn.
- Quay lại (318,73,86,78); Xem thông tin (396,426,316,78); Biệt danh (740,426,318,78).
- Năm hàng (325,y,801,86), y lần lượt528/623/719/816/912: Chặn, Tắt thông báo, Xóa cuộc trò chuyện, Xóa bạn, Báo cáo.
- Sau mask, trim1px transparent bên phải/dưới của các nút: Quay lại85×77; Xem thông tin315×77; Biệt danh317×77; mỗi hàng800×85. Kích thước wrapper khớp đúng asset sau trim.
- Avatar của người đang chat phủ vào vị trí portrait trong vòng vàng của nguồn; không thay kích thước avatar hiện hành ở header/danh sách/tin nhắn. Popup dùng chân dung200×200 ở(346,164), Picolozz lấy AvatarPortrait index0 từ sprite avatar-selection-sprite.png1619×971 thay ảnh crop86×86 để tránh phóng mờ.

- scene-background.png: nền cảnh được chỉnh bằng công cụ imagegen tích hợp từ scene.png; 2172×724px, full bleed không padding. Prompt: remove central silhouette portrait, entire gold circular frame and gold cloud ornaments; reconstruct sunset clouds/mountains, preserve bamboo/pagodas/red foliage and illustration palette; no people/text/border. Giữ scene.png gốc để đối chiếu; script crop không ghi đè nền mới. Avatar nay là lớp riêng có width=height theo pixel, crop tròn, tâm(446,264) và đường kính200 theo chiều rộng thiết kế894.

