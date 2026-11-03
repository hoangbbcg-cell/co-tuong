# Bảng Tạo bàn

- 2026-10-13: Khung chạy dùng lại `../room-selection/province-picker-frame.png` từ nguồn `72f80581-6af2-490e-b9fa-fcdf2f104da8.png` (crop1369×953). Tiêu đề và nút X có sẵn trong ảnh; nút đóng chỉ là hit area. Giữ các điều khiển thời gian, Hủy/Tạo bàn bằng ba ảnh tách từ skin v2 cũ: `time-field.png` (344,286,902,140), `cancel-button.png` (558,764,257,122), `confirm-button.png` (849,764,333,122). Script `scripts/crop-create-room-controls.ps1` tái tạo ảnh và bỏ nền thừa ở bốn góc thành alpha trong suốt. Form dùng aspect1369/953, max-width680px và giới hạn cao73dvh, đặt lại control theo khung mới. Cả Chọn Bàn và LobbyDialog dùng chung CreateRoomForm.

- Mẫu: ảnh bảng Tạo bàn riêng người dùng gửi ngày 2026-10-09, nền cảnh nâu/cây bên trái/chùa bên phải/mây phía dưới.
- Imagegen tạo skin trống từ mẫu, xóa chữ/icon để đặt điều khiển HTML. Bản sinh: `exec-3d8810dc-0826-4998-8fe3-e1eca00ca097.png` trong thư mục generated_images phiên `01a114fe-44d9-7742-973f-d1d57330def7`.
- Runtime `dialog-skin.png`: crop vùng (24,32,1488,928), bỏ nhiễu alpha <=8 và trim sát còn1488×926; giữ alpha thật phía ngoài khung. Skin chứa một nền cảnh/khung, các ô chọn và nút trống, không lớp nâu phủ thêm.
- Chữ, icon, mũi tên, nút đóng, select và nút tạo/hủy là HTML/SVG tương tác đặt theo tỷ lệ của skin; mặc định10 phút/60 giây.
- 2026-10-09: Người dùng yêu cầu thu nhỏ hai nút. Tạo biến thể `dialog-skin-v2.png` bằng chỉnh ảnh: chỉ thu nút đáy theo tâm, giữ bố cục/khung; crop sát alpha thành1589×983. Component dùng v2 và HTML hit area căn theo hai nút nhỏ mới.

- 2026-10-15: Dùng lại khung chọn tỉnh/thành phố, tiêu đề HTML Tạo bàn. Hai nút cắt từ references/uploads/10f8e709-8f9d-45c2-91b8-66de5eee541b.png: cancel-upload (160,300,681,286), confirm-upload (933,300,681,286). Ô thời gian/mật khẩu field-upload cắt từ references/uploads/6ff86838-3388-442d-a427-d9be1bfe8539.png tại (70,126,2033,409). Bbox theo alpha>16, góc alpha0, giữ pixel nguồn. Công tắc Bàn khóa/ô mật khẩu/xem-ẩn chỉ là UI xem trước theo xác nhận của người dùng, chưa gửi/lưu mật khẩu hay khóa phòng server.

- 2026-10-15: Sửa lớp select nằm trên ảnh để hiện10 phút/60 giây; password focus không đổi khung, autocomplete off và text-security che chữ; nút Hủy/Tạo hover opacity90%.

- 2026-10-15: Công tắc Bàn khóa thu80%, tắt mờ tối50%; mật khẩu hiện text thường và bỏ nút xem/ẩn. Outline/ring focus tắt chung toàn project theo yêu cầu.

- 2026-10-15: Hover Hủy/Tạo phủ vàng10% mask theo ảnh; công tắc off nền nâu/núm kem nâu, hover viền vàng, không filter dim toàn cụm.

- 2026-10-15: Tạo bàn hover vàng30%; tắt khóa thì hai trường thời gian lên11% chiều cao form, bật trở lại; Hủy/Tạo giữ vị trí đáy.

- 2026-10-15: Bàn khóa không còn chỉ UI preview: form gửi mật khẩu và backend xác thực khi vào bàn; xem docs/ROOM-LOCKS.md. RoomPasswordDialog tái dùng frame/field/cancel/confirm hiện có, không thêm asset.
