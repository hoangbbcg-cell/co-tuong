# Quân cờ từ ảnh mẫu

Hiện tại Board dựng quân bằng utility Tailwind và chữ từ `piece.name`, không import ảnh hoặc `index.ts` trong thư mục này. Các tài nguyên dưới đây chỉ giữ để đối chiếu.

Nguồn trước đây: `../015f80dc-24ee-4f7a-8a6b-19c3cec7fd6d.png` (1536×1024), do người dùng cung cấp.
Giữ nguyên ảnh nguồn, không tạo lại chữ, đổi màu hoặc tăng nét.

`index.ts` khai báo vùng SVG viewBox cho 14 mẫu quân. Hàng trên là đen,
hàng dưới là đỏ; thứ tự: xe, mã, tượng, sĩ, tướng, pháo, tốt.
Mỗi vùng rộng 218px, cao 224px. Tọa độ x theo thứ tự trên:
- Đen: 17, 231, 444, 655, 869, 1080, 1294; y = 222.
- Đỏ: 14, 230, 443, 656, 871, 1083, 1300; y = 500.

Trước đây Board hiển thị từng vùng ảnh trong khung tròn 46×46px để bỏ nền ngoài quân.
Vị trí, vùng bấm và animation giữ nguyên. PNG riêng và preview cũ trong
thư mục này chỉ giữ để đối chiếu, không còn được import vào bàn cờ.
