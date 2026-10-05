# Hệ thống bậc và sao theo Elo

Nguồn quy tắc dùng chung: `src/lib/rankProgression.ts`. Elo dùng để xét bậc và sao; giới hạn tăng sao là **2800 Elo**. Elo tổng vẫn có thể tăng cao hơn 2800.

Người chơi mới luôn khởi tạo ở `DEFAULT_PLAYER_ELO = 1000`: bậc1 Tân Binh, 1 sao. Session store dùng cùng hằng số; điểm Cờ Tướng và danh hiệu Home đọc cùng Elo trong session. Đây là mặc định cho dữ liệu người chơi mới khi bổ sung tạo tài khoản/persistence; hiện project chưa có backend tài khoản.

Home hiện dùng `previewStars={3}` để xem thử Tân Binh đủ 3 sao theo yêu cầu. Đây là số sao xem thử giao diện; Elo khởi tạo người chơi mới vẫn1000 và số sao thật vẫn lấy từ getRankProgress.

Home dùng placement=home: HOME_RANK_BADGE_OFFSETS nâng danh hiệu2px và sao7px theo anchor106px so với tọa độ chung. Người dùng cho phép thay đổi tiếp vị trí sao riêng Home; tọa độ sao chung và các consumer khác giữ nguyên. Dùng HOME_AVATA_RANK_STARS_STYLE.

Bộ ảnh danh hiệu cập nhật 2026-10-04 dùng chung `src/lib/rankArtwork.ts`; bảy ảnh mới đã trim alpha tại `src/assets/ranks/rank-*-v2.png`. Nguồn và crop ghi tại `src/assets/ranks/rank-artwork-v2.md`. Bạn bè và AvatarRankBadge dùng cùng catalog này.

| Bậc | Danh hiệu | Mốc Elo | Sao tối đa | Lên bậc tại |
| --- | --- | --- | --- | --- |
| 1 | Tân Binh | 1000–1299 | 3 | 1300 |
| 2 | Kỳ Sĩ | 1300–1599 | 3 | 1600 |
| 3 | Kỳ Thủ | 1600–1899 | 3 | 1900 |
| 4 | Kỳ Tướng | 1900–2199 | 3 | 2200 |
| 5 | Đại Sư | 2200–2499 | 3 | 2500 |
| 6 | Kỳ Vương | 2500–2799 | 3 | 2800 |
| 7 | Kỳ Thánh | Từ 2800 | 3 | Cao nhất |

- Mỗi bậc có 3 ô sao. Bậc 1 bắt đầu ở 1000 Elo với 1 sao; mỗi 100 Elo thêm 1 sao. Khi lên bậc, số sao về 1 ở danh hiệu kế tiếp: 1300, 1600, 1900, 2200, 2500, 2800.
- Sao tính theo Elo tối đa 2800. Khi Elo cao hơn 2800, bậc vẫn là Kỳ Thánh và sao giữ nguyên ở mức tại 2800; Elo thật trong dữ liệu/điểm số không bị giới hạn.
- Dưới 1000 Elo dùng Tân Binh 1 sao. Elo không hữu hạn cũng mặc định 1000.
- Tên, ảnh danh hiệu và sao phải xuất phát từ cùng kết quả `getRankProgress`; không lưu riêng bậc/sao dễ lệch dữ liệu.
- Mọi hàng Bạn bè dùng chung hàm tính, kể cả lời mời đã gửi/đã nhận. Dữ liệu người chơi hiện là minh họa trong phiên.
- Đây là quy tắc phân bậc và hiển thị sao. Chưa có công thức cộng/trừ Elo sau trận hoặc lưu Elo máy chủ.
- Hàng sao dưới danh hiệu dùng RankStars, ảnh gốc `ab9a1b7f-bb8b-42d9-aa84-4ca03e15d6ad.png` trim alpha tại `src/assets/player/rank-star.png`. Vùng sao rộng bằng khung danh hiệu và giới hạn tràn. Kích thước sao tối đa 25% bề rộng vùng, gap 1.5%; tự giảm nếu nhiều sao. Chỉ render sao đã đạt; sao luôn xếp từ mép trái vùng cố định sang phải, kể cả khi chỉ có 1 sao. Không căn giữa theo số sao thực tế.
- Lấy Tân Binh làm chuẩn cố định cho cả 7 danh hiệu: cùng tọa độ và khung ảnh 132.746801×53.085332px theo anchor avatar106px (tăng 8% theo yêu cầu). Hàng sao dùng cùng tỷ lệ kích thước/gap; không bù alpha hay dịch theo từng asset. Ảnh dùng object-contain trong khung cố định, đổi danh hiệu không làm thay vị trí hoặc kích thước vùng.
- Hàng sao dùng vị trí cố định tính từ đáy khung danh hiệu với offset -14px, thêm offset cả cụm -1px; áp dụng chung cả 7 danh hiệu. Đã nâng lên 3px theo anchor avatar106px.
- Đã gỡ chế độ chuyển danh hiệu mỗi2s. AvatarRankBadge dùng tại Home, Hồ sơ, Tùy chỉnh avatar và PlayerCard; mặc định Tân Binh Elo1000, 1 sao. Có thể truyền Elo của từng người chơi khi dữ liệu thật được tích hợp; giữ cùng tỷ lệ ảnh/vùng sao theo kích thước avatar.

- Vùng đủ3 ô sao của AvatarRankBadge rộng78% khung (3×25% + 2×1.5%), được căn giữa rồi dịch phải3px theo anchor106px. Điền sao thứ nhất ở ô trái, sao thứ hai và thứ ba thêm về bên phải; số sao tăng/giảm không dịch vị trí các sao đã có. Tọa độ đã khóa2026-10-05: dùng `RANK_STAR_LAYOUT`/`AVATA_RANK_STARS_STYLE` trong playerIdentityLayout.ts, không tự ghi đè hoặc dịch thêm. Mọi nơi dùng RankStars và cùng ảnh rank-star.png; Bạn bè dùng vùng103px cạnh tên danh hiệu để giữ bố cục hàng.
