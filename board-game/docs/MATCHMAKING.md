# Ghép đấu theo cấp bậc và sao

## Quy tắc mục tiêu — người dùng chốt 2026-10-16

- Áp dụng cho luồng tự động ghép đối thủ online; chưa thay đổi code trong nhiệm vụ ghi nhận này.
- Ưu tiên phòng có đối thủ cùng cấp bậc và cùng số sao.
- Không có thì tìm đối thủ hơn hoặc kém1 sao, chọn ngẫu nhiên trong các đối thủ phù hợp, không ưu tiên phía cao hơn hoặc thấp hơn.
- Không có ở mức1 thì mở rộng mức2, rồi mức3; tối đa chênh3 sao. Luôn ưu tiên mức chênh thấp hơn nếu có đối thủ.
- Không có đối thủ trong phạm vi trên thì tạo/vào phòng riêng có một mình người chơi để chờ; không ghép vượt3 sao.
- Khi triển khai quy tắc mới, fallback ghép tự động vào máy ở Home và mở form tạo bàn khi hết bàn ở Chọn Bàn phải được đối chiếu/thay bằng hành vi ngồi phòng một mình theo quy tắc này. Đây là mục tiêu tương lai, chưa đổi fallback hiện chạy.

## Quy tắc hiện hành cần bảo toàn khi triển khai

- Chỉ ghép vào phòng mở có đúng1 người ngồi, chưa đấu; người xem không tính là ghế. Bỏ qua phòng khóa.
- Giữ kiểm tra năng lượng, thời gian phòng theo ngữ cảnh, quy tắc ghế và xác thực server.
- Không suy diễn bộ lọc ghép tự động thành lệnh cấm vào phòng thủ công, mời chơi/So tài, xem trận hoặc hàng chờ. Những luồng đó chưa có yêu cầu thay đổi.
- Bậc/sao dùng nguồn chuẩn cùng hệ thống ELO (`RANK-SYSTEM.md`); không dùng danh hiệu trang trí được chọn để ghép.

## Sao liên tục qua các bậc — người dùng chốt 2026-10-16

- Mỗi bậc có3 sao; tính chênh lệch theo chuỗi liên tục: bậcN/1 sao → bậcN/2 sao → bậcN/3 sao → bậcN+1/1 sao.
- Chỉ số tiến trình = (cấp bậc - 1) × 3 + (số sao - 1). Chênh sao = chỉ số đối thủ - chỉ số mình.
- Ví dụ mình bậcN/3 sao: đối thủ hơn1/2/3 sao lần lượt là bậcN+1/1 sao, bậcN+1/2 sao, bậcN+1/3 sao.
- Ví dụ mình bậcN/1 sao: đối thủ thấp hơn1/2/3 sao lần lượt là bậcN-1/3 sao, bậcN-1/2 sao, bậcN-1/1 sao.
- Ví dụ mình bậcN/2 sao: hơn1 là cùng bậc/3 sao, hơn2 là bậc kế/1 sao; thấp hơn1 là cùng bậc/1 sao, thấp hơn2 là bậc trước/3 sao.
- Áp dụng cùng cách tính cho ghép đấu±3 sao và bảng ELO sau trận; dùng bậc/sao trước trận. Không so riêng số sao hiển thị, không so danh hiệu trang trí được chọn.
- Không tạo bậc thấp hơn bậc đầu hoặc cao hơn bậc cuối; chỉ xét các mức thực sự tồn tại. Không tự thay đổi quy tắc sao hiển thị/ELO trần hiện hành.

## Chi tiết cần chốt trước khi code

- Chính sách riêng (nếu cần) cho chênh ELO ở bậc cao nhất khi sao hiển thị đã chạm trần; hiện không tự suy thêm sao ẩn từ ELO.
- Cấu hình phòng tự tạo theo ngữ cảnh và cách xử lý nhiều yêu cầu ghép đồng thời. Không mặc định code chi tiết chưa chốt.
- Khi triển khai database/auth, server phải dùng ELO/bậc/sao đáng tin cậy và kiểm tra lại phòng tại thời điểm ghép.

## Cộng/trừ ELO sau trận — người dùng chốt 2026-10-16

So sánh đối thủ với người đang được tính điểm, dùng cấp bậc/sao trước trận. Cùng mức là cùng cấp bậc và cùng số sao; hơn/kém sao tính theo chỉ số tiến trình liên tục qua các bậc ở mục trên.

| Đối thủ so với mình trước trận | Mình thắng | Mình thua |
| --- | --- | --- |
| Cùng cấp bậc và cùng số sao | +13 | -13 |
| Cao hơn1 sao | +16 | -10 |
| Cao hơn2 sao | +17 | -10 |
| Cao hơn3 sao | +18 | -10 |
| Thấp hơn1 sao | +10 | -13 |
| Thấp hơn2 sao | +10 | -13 |
| Thấp hơn3 sao | +10 | -13 |

- Tính riêng cho mỗi người theo bảng, không bắt buộc tổng điểm cộng/trừ bằng0. Ví dụ người thấp hơn1 sao thắng thì nhận+16; người cao hơn thua người thấp hơn bị-13. Người cao hơn thắng thì nhận+10; người thấp hơn thua người cao hơn bị-10.
- Chưa có quy tắc điểm khi hòa, điểm sàn, trận ngoài phạm vi±3 sao, trận máy/local, trận không tính hạng hoặc các kiểu kết thúc đặc biệt. Không tự đặt quy tắc cho các trường hợp này; cần chốt trước khi triển khai.
- Chưa thay công thức/code ELO hiện tại; server và database chưa triển khai lưu/cộng trừ điểm thật.

## Trạng thái

- Đã lưu quy tắc thiết kế; chưa triển khai matchmaking mới, chưa tạo database hoặc thay đổi gameplay/UI.

- 2026-10-16: Chốt trần danh hiệu/sao: Kỳ Thánh1 sao2800–2899,2 sao2900–2999,3 sao từ3000; đạt đủ thì không tăng bậc/sao nữa nhưng ELO thật vẫn tăng. Thay trần sao2800 trước đây bằng3000, giữ mốc vào Kỳ Thánh2800. Đã áp dụng getRankProgress chung mọi consumer, không đổi UI/geometry/avatar hoặc triển khai tính điểm sau trận/DB.
