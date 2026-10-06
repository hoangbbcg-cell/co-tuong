# Hệ thống bậc và sao theo Elo

Nguồn quy tắc dùng chung: `src/lib/rankProgression.ts`. Elo dùng để xét bậc và sao; giới hạn tăng sao là **2800 Elo**. Elo tổng vẫn có thể tăng cao hơn 2800.

Người chơi mới luôn khởi tạo ở `DEFAULT_PLAYER_ELO = 1000`: bậc1 Tân Binh, 1 sao. Session store dùng cùng hằng số; điểm Cờ Tướng và danh hiệu Home đọc cùng Elo trong session. Đây là mặc định cho dữ liệu người chơi mới khi bổ sung tạo tài khoản/persistence; hiện project chưa có backend tài khoản.

Home hiện dùng `previewStars={3}` để xem thử Tân Binh đủ 3 sao theo yêu cầu. Đây là số sao xem thử giao diện; Elo khởi tạo người chơi mới vẫn1000 và số sao thật vẫn lấy từ getRankProgress.

Chuẩn toàn project2026-10-05 đã dịch xuống2px theo yêu cầu: danh hiệu top84.876613px, sao top120.961945px theo avatar106px. Sao cách đỉnh khung danh hiệu36.085332px theo khung132.746801×53.085332px, tự co theo tỷ lệ. Mọi nơi dùng RankTitleBadge/AvatarRankBadge và RANK_TITLE_STARS_STYLE, không offset riêng màn hình.

Xếp hạng giữ bố cục thiết kế1120×750, avatar84px/danh hiệu105.2px/hàng138px theo hệ số responsive. Không scale parent hoặc dùng Canvas cho ảnh tĩnh ở đây: RankingDialog chuyển kích thước sang CSS cuối cùng, làm tròn ô ảnh bằng Math.round. RankingRankBadge đọc AVATA_RATIO và dùng chính RankStars/RANK_TITLE_STARS_STYLE như Home để giữ đúng tỷ lệ kích thước/khoảng cách và hướng điền sao; ảnh gốc dùng img width/height và object-contain. Không thay nguồn hoặc tọa độ chuẩn để chữa mờ. Các màn còn lại cũng render ảnh gốc trực tiếp qua CrispUiImage, không Canvas/parent scale; xem docs/UI-IMAGE-RENDERING.md.

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
- Hàng sao dịch xuống2px theo yêu cầu, với bottomInset14px, clusterOffsetY-6px theo anchor106px; danh hiệu dịch-3px từ top87.876613px. Sao25% khung, gap1.5%, offsetX3px; đồng bộ cả7 danh hiệu và mọi màn hình.
- Đã gỡ chế độ chuyển danh hiệu mỗi2s. AvatarRankBadge dùng tại Home, Hồ sơ, Tùy chỉnh avatar và PlayerCard; mặc định Tân Binh Elo1000, 1 sao. Có thể truyền Elo của từng người chơi khi dữ liệu thật được tích hợp; giữ cùng tỷ lệ ảnh/vùng sao theo kích thước avatar.

- Vùng đủ3 ô sao rộng78% khung (3×25% + 2×1.5%), căn giữa rồi dịch phải3px theo anchor106px. Điền sao trái→phải, không dịch theo số sao. Mọi nơi dùng RankTitleBadge với cùng RANK_TITLE_STARS_STYLE; Bạn bè dùng khung166×66.382px trong cụm84px để sao dưới danh hiệu vừa hàng85px. Khi sửa chuẩn, cập nhật mọi nơi sử dụng trong cùng nhiệm vụ.

Nguồn danh hiệu2144×724 và sao1199×1219 vượt2× kích thước CSS nhỏ; avatar là SVG. Icon red-general.png ở cột Điểm chỉ60×62, chưa đạt2× khi hiển thị43px; giữ nguyên do yêu cầu không thay asset, không phóng file rồi coi đó là chi tiết nguồn mới.

Không làm tròn riêng sao/gap/top ở từng màn: dùng RankStars + RANK_TITLE_STARS_STYLE chung. Kích thước sao25% và gap1.5% phải giống Home; ô danh hiệu có thể làm tròn pixel khi render trực tiếp nhưng cụm sao giữ tỷ lệ chuẩn theo ô thực tế.

Quy tắc2026-10-05: Tân Binh giữ vị trí sao hiện hành. Sáu bậc2–7 (Kỳ Sĩ/Kỳ Thủ/Kỳ Tướng/Đại Sư/Kỳ Vương/Kỳ Thánh) hạ riêng hàng sao thêm1px CSS bằng getRankTitleStarsStyle(rank.level), top=calc(top chuẩn + 1px). Áp dụng mọi consumer; không dịch danh hiệu, avatar, thẻ hoặc thành phần UI khác; không đổi size/gap/hướng điền sao. Đây là ngoại lệ theo bậc người dùng yêu cầu, không phải offset riêng màn hình.
