# History UI crops

Nguồn: `history-reference.png` (1470×1070), giữ lại nguyên bản làm ảnh đối chiếu.

2026-10-05: Runtime MatchResultBadge nay dùng sprite PNG người dùng chỉ định 24f07314-e511-454e-9d58-2a50197a5a34.png (2172×724). Thắng lấy viewBox(126,177,935,361), Thua lấy(1115,191,936,353), gồm4px padding quanh vùng alpha>=8; giữ nguyên ảnh nguồn và tỉ lệ bằng preserveAspectRatio=xMidYMid meet. Các crop win/loss v2 trong bảng chỉ còn là ảnh đối chiếu. Ô hiển thị vẫn82.77551×39px; Thua giữ offset-2px/-2px.

| Asset | Vùng nguồn (x, y, rộng, cao) | Xử lý |
| --- | --- | --- |
| `history-tab-played.png` | 410, 140, 315, 82 | Xóa nền giấy nối từ mép, trim sát nét cọ. |
| `history-tab-played-unselected.png` | Biến thể từ `history-tab-played.png` | Trạng thái chưa chọn: nền nâu đậm, chữ kem sáng “Đã chơi”; giữ nét cọ trong suốt, crop sát và xuất 305×70. |
| `history-tab-watched.png` | 800, 140, 315, 82 | Xóa nền giấy nối từ mép, trim sát nét cọ. |
| `history-tab-saved.png` | Biến thể từ `history-tab-watched.png` | Trạng thái chưa chọn: nền nâu đậm, chữ kem sáng “Đã lưu”; giữ nét cọ trong suốt, crop sát và xuất 306×67. |
| `history-tab-saved-selected.png` | Biến thể từ `history-tab-saved.png` | Dùng màu đỏ của `history-tab-played.png` cho trạng thái đã chọn; giữ chữ vàng, crop sát và xuất 306×67. |
| `history-replay-button-frame.png` | 1132, 263, 151, 52 | Cắt đúng viền nút, xóa chữ/icon mờ trong ảnh và mask bốn góc alpha 0; UI đặt icon/chữ HTML sắc nét lên trên. |
| `history-concealed-piece.png` | 775, 260, 58, 58 | Cắt sát mặt quân, mặt nạ tròn feather 1px; bốn góc alpha 0. |
| `history-result-win-v2.png` | 578, 263, 104, 49 | Giữ sọc và màu vàng bên trong, cắt bỏ viền gấp bên phải, phóng 4×; file cuối 416×196. |
| `history-result-loss-v2.png` | 578, 449, 104, 49 | Giữ sọc và màu xanh bên trong, cắt bỏ viền gấp bên phải, phóng 4×; file cuối 416×196. |
| `history-brown-texture.png` | 735, 962, 55, 60 | Texture gỗ nâu trống từ footer ảnh tham chiếu; dùng lặp theo chiều ngang ở footer Lịch sử. |
| `history-parchment-background.png` | Generated 1024×1536 | Nền giấy nâu vàng toàn ảnh, không alpha/padding; tạo từ mẫu lịch sử bằng imagegen và dùng `cover` cho khung danh sách. |

2026-10-22: Mobile dùng chung HistoryTabButton cho Đã chơi/Đã lưu: CSS mask lấy alpha của history-tab-played.png giữ dáng nét cọ, tô gradient đỏ/nâu theo trạng thái; chữ HTML font-heading italic cùng cỡ50px thiết kế. Không sửa asset gốc; desktop tiếp tục dùng ảnh tab có chữ như trước.

2026-10-22 (hoàn tác theo user): bỏ cách tô mask/chữ HTML thử ở trên; cả mobile và desktop dùng lại ảnh tab gốc có chữ, giữ kích thước khung trước thử nghiệm.

- 2026-10-24: User xác nhận thiết kế nút tab Đã lưu giống Đã chơi. HistoryTabButton MOBILE dùng chung dáng alpha nét cọ của playedTab, nền đỏ khi chọn/nâu khi chưa chọn và chữ HTML font-heading50/extrabold/italic vàng, đồng nhất cả2tab. Giữ kích thước/vị trí và desktop dùng ảnh gốc; dữ liệu/nội dung không đổi. Yêu cầu mới thay lần hoàn tác mask trước đây. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-24: Theo user, hoàn tác riêng lượt đồng bộ thiết kế2nút Đã chơi/Đã lưu vừa thử: bỏ mask/chữ HTML, trả HistoryTabButton dùng ảnh tab gốc có chữ (compact:size-full). Giữ kích thước/tab/data/bố cục đã chốt trước lượt thử. Build/typecheck PASS; dist xác nhận ảnh tab gốc; chưa browser QA.

- 2026-10-24: Theo user, thay2tab Lịch sử MOBILE bằng4PNG mới ở assets: 0c6e579c active Đã chơi,527ca72d idle Đã chơi,c29af6e7 active Đã lưu,d30c4e9b idle Đã lưu. Giữ nguyên pixel nguồn2172×724; SVG viewBox0/90/2172/550 giảm lề trống dọc, không redraw chữ/nền. Desktop tiếp tục4ảnh cũ; giữ kích thước/vị trí tab. Đã xem đủ4ảnh, build/typecheck PASS; dist có đủ4asset mới; chưa browser QA.

- 2026-10-24: Theo user,2tab Lịch sử mobile thay bằng sprite b52ef10c-bb5a-4de9-800e-24e6a8d904eb.png chứa4trạng thái: trái idle/phải active, trên Đã chơi/dưới Đã lưu. SVG crop mỗi ô cùng1050×220 (x20/1100,y110/374) trên nguồn2173×724, giữ kích thước hộp cố định; không sửa pixel asset. Bỏ import4ảnh mobile trước, desktop giữảnh cũ. Build/typecheck PASS; dist có sprite mới; chưa browser QA.
