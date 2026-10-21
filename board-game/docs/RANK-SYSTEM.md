# Hệ thống bậc và sao theo Elo

Nguồn quy tắc dùng chung: `src/lib/rankProgression.ts`. Elo dùng để xét bậc và sao; giới hạn tăng sao là **3000 Elo — Kỳ Thánh 3 sao**. Elo tổng vẫn có thể tăng cao hơn3000.

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
- Kỳ Thánh1 sao:2800–2899;2 sao:2900–2999;3 sao:từ3000. Sau đó bậc/sao không tăng nữa; Elo thật vẫn tăng và hiển thị đúng, không clamp điểm thật về3000.
- Dưới 1000 Elo dùng Tân Binh 1 sao. Elo không hữu hạn cũng mặc định 1000.
- Tên, ảnh danh hiệu và sao phải xuất phát từ cùng kết quả `getRankProgress`; không lưu riêng bậc/sao dễ lệch dữ liệu.
- Mọi hàng Bạn bè dùng chung hàm tính, kể cả lời mời đã gửi/đã nhận. Dữ liệu người chơi hiện là minh họa trong phiên.
- Đây là quy tắc phân bậc và hiển thị sao. Chưa có công thức cộng/trừ Elo sau trận hoặc lưu Elo máy chủ.
- Hàng sao dưới danh hiệu dùng RankStars, ảnh gốc `src/assets/references/uploads/rank-star-source.png` trim alpha tại `src/assets/player/rank-star.png`. Vùng sao rộng bằng khung danh hiệu và giới hạn tràn. Kích thước sao tối đa 31% bề rộng vùng, gap 0.5%; tự giảm nếu nhiều sao. Chỉ render sao đã đạt; sao luôn xếp từ mép trái vùng cố định sang phải, kể cả khi chỉ có 1 sao. Không căn giữa theo số sao thực tế.
- Lấy Tân Binh làm chuẩn cố định cho cả 7 danh hiệu: cùng tọa độ và khung ảnh 132.746801×53.085332px theo anchor avatar106px (tăng 8% theo yêu cầu). Hàng sao dùng cùng tỷ lệ kích thước/gap; không bù alpha hay dịch theo từng asset. Ảnh dùng object-contain trong khung cố định, đổi danh hiệu không làm thay vị trí hoặc kích thước vùng.
- Hàng sao dịch xuống2px theo yêu cầu, với bottomInset14px, clusterOffsetY-6px theo anchor106px; danh hiệu dịch-3px từ top87.876613px. Sao31% khung, gap0.5%, offsetX3px; đồng bộ cả7 danh hiệu và mọi màn hình.
- Đã gỡ chế độ chuyển danh hiệu mỗi2s. AvatarRankBadge dùng tại Home, Hồ sơ, Tùy chỉnh avatar và PlayerCard; mặc định Tân Binh Elo1000, 1 sao. Có thể truyền Elo của từng người chơi khi dữ liệu thật được tích hợp; giữ cùng tỷ lệ ảnh/vùng sao theo kích thước avatar.

- Vùng đủ3 ô sao rộng94% khung (3×31% + 2×0.5%), căn giữa rồi dịch phải3px theo anchor106px. Điền sao trái→phải, không dịch theo số sao. Mọi nơi dùng RankTitleBadge với cùng RANK_TITLE_STARS_STYLE; Bạn bè dùng khung166×66.382px trong cụm84px để sao dưới danh hiệu vừa hàng85px. Khi sửa chuẩn, cập nhật mọi nơi sử dụng trong cùng nhiệm vụ.

Nguồn danh hiệu2144×724 và sao1199×1219 vượt2× kích thước CSS nhỏ; avatar là SVG. Icon red-general.png ở cột Điểm chỉ60×62, chưa đạt2× khi hiển thị43px; giữ nguyên do yêu cầu không thay asset, không phóng file rồi coi đó là chi tiết nguồn mới.

Không làm tròn riêng sao/gap/top ở từng màn: dùng RankStars + RANK_TITLE_STARS_STYLE chung. Kích thước sao31% và gap0.5% phải giống Home; ô danh hiệu có thể làm tròn pixel khi render trực tiếp nhưng cụm sao giữ tỷ lệ chuẩn theo ô thực tế.

Quy tắc2026-10-05: Tân Binh giữ vị trí sao hiện hành. Sáu bậc2–7 (Kỳ Sĩ/Kỳ Thủ/Kỳ Tướng/Đại Sư/Kỳ Vương/Kỳ Thánh) hạ riêng hàng sao thêm1px CSS bằng getRankTitleStarsStyle(rank.level), top=calc(top chuẩn + 1px). Áp dụng mọi consumer; không dịch danh hiệu, avatar, thẻ hoặc thành phần UI khác; không đổi size/gap/hướng điền sao. Đây là ngoại lệ theo bậc người dùng yêu cầu, không phải offset riêng màn hình.

### Typography tên trong danh sách Xếp hạng

- Tên người chơi trong RankingDialog giữ cỡ theo cùng tỷ lệ với avatar hàng: font-size = 22/84 kích thước avatar. Tính từ token --ranking-84 để thay kích thước avatar sẽ tự co giãn tên theo. Hiện dùng font-heading, font-weight 900 và text-stroke 0.65px. Không đổi khi chưa được mở khóa phần typography Xếp hạng.


- 2026-10-16: Số trong tên trên PlayerNameplate dùng NumberText chung với compact90%, font-number/lining-nums/tabular-nums, weight normal và giữ nguyên độ sáng (soften=false). Chữ và số cùng baseline inline, bỏ chữ số oldstyle của font-heading. Đồng bộ Home/PlayerCard/thiết lập qua component chung; giữ nguyên khung/kích thước/vị trí avatar và nameplate.

- 2026-10-16: Chốt tên Bạn bè/Xếp hạng dùng SocialPlayerName chung tại SocialUi: chữ font-heading/extrabold/stroke0.2px; số NumberText font-number/normal/compact90%/opacity88%, stroke riêng0.1px để tăng nhẹ từ lần trước, cùng baseline inline. Trạng thái dùng socialPresenceTextClass font-heading/bold. Phạm vi người dùng mở gồm typography tên/trạng thái hai màn, không đổi font-size/spacing/avatar/khung/hàng/nút/rank/Elo. Áp dụng mọi tab qua component chung; khóa lại phạm vi sau nhiệm vụ.

- 2026-10-16: Theo yêu cầu tăng số thêm chút, stroke số trong SocialPlayerName tăng0.1px→0.2px, đồng bộ tên Bạn bè/Xếp hạng. Giữ nguyên chữ/font/weight/cỡ/opacity/baseline/hình học; phạm vi khác vẫn khóa.

- 2026-10-16: Sửa cắt nét tên Bạn bè/Xếp hạng: SocialPlayerName có line-height1.4 và tự truncate ngang; h3 giữ slot cao24px, flex items-center/không overflow-hidden để line box đầy đủ vượt slot mà không bị cắt dấu/đuôi chữ. Giữ font/weight/stroke/baseline tương đối và chiều cao hàng/avatar/spacing. Đồng bộ component chung, chỉ mở phạm vi sửa cắt nét rồi khóa lại.

- 2026-10-16: Chốt ghép đấu tự động tương lai: ưu tiên cùng cấp bậc/cùng số sao; không có thì ngẫu nhiên đối thủ hơn/kém1 sao, mở rộng lần lượt2 rồi3 sao, tối đa3. Không có phù hợp thì người chơi vào phòng một mình chờ, không fallback máy/ghép quá phạm vi. Chỉ ghi thiết kế, chưa đổi code hiện hành; chi tiết ranh giới bậc/sao trần cần chốt trước code. Xem board-game/docs/MATCHMAKING.md.

- 2026-10-16: Chốt ELO mục tiêu theo đối thủ trước trận: thắng cùng bậc/sao +13, thắng cao hơn1/2/3 sao +16/+17/+18, thắng thấp hơn1/2/3 sao đều+10; thua cùng bậc/sao hoặc đối thủ thấp hơn đều-13, thua đối thủ cao hơn1/2/3 sao đều-10. Tính riêng mỗi người, không zero-sum. Chỉ tài liệu, chưa code/DB; hòa/điểm sàn/ngoài phạm vi và ranh giới bậc chưa chốt. Bảng chuẩn tại docs/MATCHMAKING.md.

- 2026-10-16: Chốt sao liên tục qua bậc cho ghép đấu/ELO: index=(bậc-1)*3+(sao-1), chênh=index đối thủ-index mình. BậcN/3 sao +1/+2/+3 là bậcN+1/1/2/3 sao; bậcN/1 sao -1/-2/-3 là bậcN-1/3/2/1 sao. Chỉ xét bậc tồn tại, không dùng danh hiệu trang trí hoặc tự thêm sao ẩn. Thay ghi chú ranh giới bậc chưa chốt trước đó; bảng điểm giữ nguyên. Chỉ tài liệu, chưa code/DB. Xem docs/MATCHMAKING.md.

- 2026-10-16: Theo yêu cầu tăng độ đậm và dày số tên Bạn bè/Xếp hạng: SocialPlayerName giữ weight normal, số bỏ soften (opacity100% thay88%), stroke0.2→0.3px. Giữ phần chữ/font/cỡ/line-box1.4/baseline/hình học; áp dụng cả2 màn qua component chung, phạm vi khác giữ khóa.

- 2026-10-19: Sửa sao/danh hiệu trong Thông tin người chơi/Tùy chỉnh và popup thông tin chat: AvatarRankBadge trước thiếu elo nên luôn mặc định1000/Tân Binh1sao. ProfileDialog lấy Elo xiangqi của đúng displayedAccount (hồ sơ mình fallback session.elo), truyền chung sang AvatarCustomization; MessagesOptionsPanel lấy profile đúng người. Không sửa hình học/avatar/star style hoặc công thức sao.11/11 regression profile/realtime-customization/otherplayer/logout/rank PASS, typecheck/build PASS, dist index-BsIxUJLJ.js xác nhận. Chưa browserQA.
