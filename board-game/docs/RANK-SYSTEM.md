# Hệ thống bậc và sao theo Elo

- 2026-10-23: Theo user, hạ cụm sao toàn project2px theo khung tham chiếu: clusterOffsetYPx -14→-12; vị trí hiện tại cao hơn6px so trước chuỗi chỉnh. Token chung áp dụng mobile/laptop/người chơi/máy. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng cụm sao toàn project thêm4px theo khung tham chiếu: clusterOffsetYPx -10→-14, tổng nâng8px so trước các lượt chỉnh. Token chung áp dụng mobile/laptop/người chơi/máy. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng sao toàn project thêm2px theo khung tham chiếu: clusterOffsetYPx -8→-10, tổng nâng4px so trước hai lượt chỉnh. Đồng bộ mobile/laptop/người chơi/máy qua token chung. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: Theo user, nâng cụm sao toàn project/mobile/laptop qua RANK_STAR_LAYOUT.clusterOffsetYPx -6→-8 (lên2px ở tỷ lệ tham chiếu, co cùng khung). RankTitleBadge và RankingRankBadge cùng dùng getRankTitleStarsStyle; gồm sao máy artwork riêng. Giữ kích thước sao/avatar/danh hiệu/luật Elo. Build/typecheck PASS; dist cập nhật; chưa browser QA.

- 2026-10-23: User khóa riêng Bạn bè LAPTOP, hoàn tác lượt đồng bộ vừa rồi trên desktop. FriendsDialogFrame chỉ dùng SocialDialogFrame khi compact; desktop khôi phục khung/nền/title/tab/dòng150 liền nhau/khung list/nền nâu SVG như ngay trước task đồng bộ. Mobile giữ dòng/khung/tab dùng chung Xếp hạng. Các chỉnh tiếp mặc định chỉ Bạn bè mobile trừ khi user mở laptop rõ. Tests ranking-view+mobile-dialog-layout3/3 PASS, typecheck/build PASS; dist index-DILmSzb6.js/index-DYj2_tBu.css xác nhận. Chưa browser QA.

- 2026-10-23: Theo user đồng bộ Bạn bè với Xếp hạng: SocialDialogFrame dùng chung khung ngoài/khung trong/nền phong cảnh/hoa văn/tiêu đề/nút X; title slot theo tỷ lệ artwork Xếp hạng để hàng3tab Bạn bè cùng mốc với2tab Xếp hạng. socialModeTabsClass, socialPlayerRowClass/ListClass và getSocialRowStyle dùng chung: dòng desktop138, mobile6slot, gap8×dialogScale, bo10×rowScale/viền/nền giống nhau; bỏ khung danh sách/nền nâu SVG riêng Bạn bè. Lời mời giữ4nhận+2gửi qua biến số slot; giữ các nút và data/search/keyboard behavior. Avatar/tên/luật không đổi. Existing ranking-view+mobile-dialog-layout3/3 PASS, typecheck/build PASS; dist cập nhật. Chưa browser QA trực quan; khóa lại phạm vi.

- 2026-10-23: Theo user, nền/thẻ Xếp hạng mobile phải trắng kem thay vàng: lớp phủ giấy #fffaf0eb, thẻ #fffdf7/#f7f3eb/#fffaf2, header #f2ede3, nền cột Elo #e9e2d5. Giảm ám vàng ở bóng panel và dải nền cột hạng. Chỉ màu compact, giữ geometry/asset/Elo/avatar/desktop; khóa lại sau task.

- 2026-10-23: Theo user, hai tab Cờ Tướng/Cờ Úp ở Xếp hạng mobile phóng đồng tỷ lệ1.4→1.6 lần kích thước gốc264×70 (tăng thêm14.3% so lượt trước); giữ tâm, ảnh nguyên tỷ lệ và cả hai trạng thái. Desktop giữ cỡ cũ; khóa lại phạm vi sau task.

- 2026-10-23: Theo user, chữ Đang online trong Xếp hạng mobile phải bằng Offline: cả hai cùng cỡ22×rowScale cố định, một dòng; bỏ tự co riêng hai trạng thái này vì chuỗi online dài hơn gây chữ nhỏ. Trạng thái Đang chơi và tên vẫn fit như cũ. Giữ desktop, áp dụng cả hai tab; khóa lại sau task.

- 2026-10-23: Theo user, Xếp hạng mobile dịch Elo trái thêm12px logical (offset36→24 theo dialogScale), tiêu đề căn theo cùng eloOffset/eloWidthExtension. Đổi nhãn Điểm→Elo. Tên/trạng thái hiển thị đủ một dòng không ellipsis; RankingSingleLineText/useSingleLineTextSize đo chữ thật bằng Range, tự co font khi cột thiếu chỗ, tính lại khi resize/font tải xong. Max tên28/trạng thái22 theo rowScale; avatar và kích thước ô giữ nguyên. Khóa lại sau task.

- 2026-10-23: Theo user, tăng riêng nội dung hàng Xếp hạng mobile: số/huy hiệu thứ hạng phóng15% bằng scale trong chính ô hạng; tên người chơi24→28 logical theo rowScale, trạng thái19→22. Giữ full name/wrap, avatar, cột/nhãn đã căn, Elo và desktop. Áp dụng cả Cờ Tướng/Cờ Úp, khóa lại sau task.

- 2026-10-23: User yêu cầu căn nhãn Người chơi/Điểm với hàng dưới (các nhãn nằm ở Xếp hạng). Compact: header co cùng bề rộng nội dung danh sách qua useRankingListInset đo scrollbar/padding bằng ResizeObserver; Người chơi căn đúng mép tên sau avatar84+gap20+margin8 theo rowScale; Điểm căn giữa ô Elo có offset36 và phần rộng thêm34px theo dialogScale. Giữ nội dung hàng, avatar và desktop; khóa lại sau task.

- 2026-10-22: User yêu cầu nguyên mẫu nút × Xếp hạng cho Bạn bè/Lịch sử mobile: DialogCloseButton cố định borderRadius12px như Xếp hạng, không nhận --radius-xl bị getCrispUiLayout scale ở bảng khác; dùng cùng buttonInteraction. Cỡ72/56 theo scale; desktop trả đúng56/42 theo scale. Build/typecheck PASS; dist index-DXuPjUd7.js/index-CF_yB55F.css cập nhật; chưa browser QA.

- 2026-10-22: Dùng chung DialogCloseButton cho Xếp hạng, Bạn bè và Lịch sử. Cùng markup/style dấu ×; compact là72px vùng bấm và56px glyph theo scale dialog; desktop56/42. Friends/history hooks cung cấp compact theo viewport. npm.cmd run build/typecheck PASS; dist index-BSq7Ldtc.js/index-BC4nPvAz.css cập nhật; chưa browser QA.

- 2026-10-22: Theo user, tăng thêm nút × Xếp hạng mobile: vùng bấm64→72px, dấu48→56px. npm.cmd run build/typecheck PASS; dist index-uEKQmEuV.js/index-CyNrYBfH.css cập nhật; desktop giữ nguyên, chưa browser QA.

- 2026-10-22: Theo user, nút × đóng Xếp hạng mobile tăng56→64px, dấu ×42→48px; desktop giữ hiện tại. npm.cmd run build/typecheck PASS; dist index-F6RiQncf.js/index-CyNrYBfH.css cập nhật. Chưa browser QA.

- 2026-10-22: Xếp hạng mobile theo user: trạng thái online/offline/đang chơi bỏ truncate, cho wrap và giảm gap chấm/chữ để hiện đủ. Thanh cuộn mobile bỏ skin trắng/thin/gutter, dùng native overflow-y-auto cùng Lịch sử; màu xám/tự ẩn theo trình duyệt và hệ điều hành. Desktop giữ skin cũ. npm.cmd run build/typecheck PASS; dist index-CSMz296x.js/index-ByTeN08r.css cập nhật. Chưa browser QA trên điện thoại.

- 2026-10-22: Theo user, tăng thêm5px chiều ngang ô Elo Xếp hạng mobile; width calc từ29 lên34px×dialogScale. npm.cmd run build/typecheck PASS; dist/assets/index-BmjJ11DY.js và index-CcFjjYfI.css cập nhật. Desktop giữ nguyên; chưa browser QA.

- 2026-10-22: Theo user, ô nền Elo mobile giữ cao full hàng và tăng rộng thêm5px×dialogScale (29px tổng); build PASS, dist/assets/index-DLGEiX34.js mới nhất. Desktop giữ nguyên. Chưa browser QA.

- 2026-10-22: Theo user, nền nâu bao Elo Xếp hạng mobile cao100% hàng, marginBlock0; rộng thêm24px×dialogScale về phải, giữ mốc trái/offset và vùng tên. Desktop giữ nguyên. npm.cmd run build/typecheck PASS; dist index-D7LsS19u.js/index-CNVVDGzD.css cập nhật; chưa browser QA.

- 2026-10-22: Xếp hạng mobile: Elo cột122×eloScale/offset36×dialogScale; tên giữ24×rowScale, bỏ truncate và cho xuống dòng, h3 tự cao để không khuất. fullName+equalDigitSize dùng cùng font-heading/weight/lining-nums cho toàn tên (chữ và số bằng cỡ), chỉ compact. Desktop/consumer khác giữ mặc định. Build/typecheck PASS; dist index-g6Edeibv.js/index-C444bi-_.css xác nhận fullName; chưa browser QA.

- 2026-10-22: Theo user, tên trong Xếp hạng mobile tăng22→24 logical theo rowScale; chữ số trong tên dùng100% thay90% qua SocialPlayerName.equalDigitSize riêng compact. Laptop và các consumer khác giữ mặc định. npm.cmd run build/typecheck PASS; dist index-70fAFiZP.js xác nhận equalDigitSize. Chưa browser QA.

- 2026-10-22: Sửa Xếp hạng mobile theo ảnh user: cột Elo dùng132×eloScale thay156×rowScale, trả phần rộng chênh lệch cho cột tên nên Elo dịch phải thực trong layout; header và hàng dùng chung gridTemplateColumns. Giữ offset24px, avatar/nút và desktop. npm.cmd run build (typecheck+Vite) PASS; dist index-B6l5561i.js xác nhận grid mới. Chưa browser QA.

Nguồn quy tắc dùng chung: `src/lib/rankProgression.ts`. Elo dùng để xét bậc và sao; giới hạn tăng sao là **3000 Elo — Kỳ Thánh 3 sao**. Elo tổng vẫn có thể tăng cao hơn3000.

Người chơi mới luôn khởi tạo ở `DEFAULT_PLAYER_ELO = 1000`: bậc1 Tân Binh, 1 sao. Session store dùng cùng hằng số; điểm Cờ Tướng và danh hiệu Home đọc cùng Elo trong session. Đây là mặc định cho dữ liệu người chơi mới khi bổ sung tạo tài khoản/persistence; hiện project chưa có backend tài khoản.

Home hiện dùng `previewStars={3}` để xem thử Tân Binh đủ 3 sao theo yêu cầu. Đây là số sao xem thử giao diện; Elo khởi tạo người chơi mới vẫn1000 và số sao thật vẫn lấy từ getRankProgress.

Chuẩn toàn project2026-10-05 đã dịch xuống2px theo yêu cầu: danh hiệu top84.876613px, sao top120.961945px theo avatar106px. Sao cách đỉnh khung danh hiệu36.085332px theo khung132.746801×53.085332px, tự co theo tỷ lệ. Mọi nơi dùng RankTitleBadge/AvatarRankBadge và RANK_TITLE_STARS_STYLE, không offset riêng màn hình.

Xếp hạng giữ bố cục thiết kế1120×750, avatar84px/danh hiệu105.2px/hàng138px theo hệ số responsive. Không scale parent hoặc dùng Canvas cho ảnh tĩnh ở đây: RankingDialog chuyển kích thước sang CSS cuối cùng, làm tròn ô ảnh bằng Math.round. RankingRankBadge đọc AVATA_RATIO và dùng chính RankStars/RANK_TITLE_STARS_STYLE như Home để giữ đúng tỷ lệ kích thước/khoảng cách và hướng điền sao; ảnh gốc dùng img width/height và object-contain. Không thay nguồn hoặc tọa độ chuẩn để chữa mờ. Các màn còn lại cũng render ảnh gốc trực tiếp qua CrispUiImage, không Canvas/parent scale; xem docs/UI-IMAGE-RENDERING.md.

- Ngoại lệ mobile theo yêu cầu 2026-10-22: nội dung mỗi hàng tăng1.5× theo chiều rộng điện thoại, gồm huy hiệu hạng/avatar/tên/điểm/thao tác; vùng cuộn của từng tab chia cho khoảng6 hàng. Biển tiêu đề tăng12%, hai tab mode tăng40%, hàng nhãn cột dùng cùng scale1.5× với hàng để giữ trục thẳng. Ô Elo thu xuống1.35× và dịch phải24px theo scale dialog để chừa chỗ hiển thị tên. Desktop, dữ liệu và artwork nguồn giữ nguyên.

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

- 2026-10-23: User yêu cầu hoàn tác thử màu nền/thẻ Xếp hạng: bỏ toàn bộ override màu compact vừa thêm, trở lại màu nền giấy/thẻ/header/cột Elo sẵn có trước task đổi trắng kem. Giữ các chỉnh sửa kích thước/căn cột trước đó; khóa lại phạm vi.

- 2026-10-23: Đồng bộ tên/trạng thái hai tab Xếp hạng mobile theo user: tên cố định28×rowScale, font-heading, không tự co; vùng tên hai dòng cùng chiều cao/neo đáy. Trạng thái cùng font-heading/cỡ22×rowScale/line-height1.2, nhãn đang chơi đúng variant. Avatar/màu/desktop giữ hiện tại; khóa lại sau task.

- 2026-10-23: Đính chính theo user: tên người chơi trong Xếp hạng mobile nằm một hàng. Tên dùng font-heading chung, tự co theo chiều rộng để hiện đủ; khung tên trở về chiều cao một hàng để trạng thái giữ vị trí thẳng hàng trên hai tab. Build/typecheck PASS; khóa lại phạm vi.

- 2026-10-23: Đính chính theo user: tên Xếp hạng mobile không tự thu nhỏ; giữ cỡ28×rowScale trên một hàng và cho chữ tràn ngang nếu dài. Cùng font/cỡ/vị trí giữa Cờ Tướng và Cờ Úp; build/typecheck PASS.

- 2026-10-23: Theo user, thu nhỏ nhẹ tên trong Xếp hạng mobile từ28 xuống26×rowScale. Giữ một hàng, tràn ngang khi dài, cùng font/vị trí trên hai tab; không đổi chiều cao vùng tên, trạng thái, avatar hay desktop. Build/typecheck PASS; khóa lại phạm vi.

- 2026-10-23: Theo user, thu nhỏ nhẹ huy hiệu Top 1–3 trong Xếp hạng mobile: scale phần huy hiệu trong ô hạng từ1.15 xuống1.08. Không đổi avatar, cột hoặc desktop; khóa lại sau task.

- 2026-10-23: Theo user, thu nhỏ thêm huy hiệu Top 1–3 Xếp hạng mobile: bỏ phần phóng thêm, về scale rowScale gốc (từ1.08). Desktop/avatar/các cột giữ nguyên; khóa lại sau task.

- 2026-10-23: Theo user, giảm bo góc khung Elo Xếp hạng compact: khung nền và ô số từ bán kính9/8 về5 theo scale dialog. Desktop và số liệu giữ nguyên; khóa lại sau task.

- 2026-10-23: Theo user, thẻ Elo trong danh sách Xếp hạng dùng artwork/kiểu số của Home (elo-frame.png, font-number, CrispUiImage); Cờ Úp dùng icon quân ẩn và Elo theo variant hiện chọn. Thay khung nâu cũ, giữ dữ liệu, cột/offset và áp dụng cả desktop/compact.

- 2026-10-23: Theo user đính chính thẻ Elo Xếp hạng: khôi phục viền nâu bao ngoài, tăng lớp viền và nền Home-frame lên cao42 (trước32), số18→22 và icon22→25 theo eloScale. Cờ Tướng/Cờ Úp cùng layout; dữ liệu/desktop scaling giữ đúng. Build/typecheck PASS.

- 2026-10-23: Đính chính theo user: khung bao Elo là lớp nền nâu trong suốt cũ bg-[#b68c53]/20, desktop margin17/cao trừ34, mobile full hàng và bo5. Bỏ border/gradient/shadow vừa thêm nhầm. Giữ thẻ Elo Home cao42, số22/icon25 đã phóng; padding dùng token34 có sẵn. Khóa lại phạm vi.

- 2026-10-23: Theo user, tăng tiếp thẻ Elo Xếp hạng: artwork cao42→46 theo scale; số22→24. Nền nâu bao ngoài nới thêm6px cả chiều rộng và cao, căn giữa trong ô; giữ viền/nền nâu cũ, icon và dữ liệu. Áp dụng cả desktop/compact.

- 2026-10-23: Theo user, khung nâu bao Elo trong Xếp hạng điện thoại rộng thêm7px (tổng phần nới compact 6→13px theo dialog scale). Thẻ Elo bên trong và desktop giữ nguyên.

- 2026-10-23: Theo ảnh user, chỉ nới nền nâu nhạt phía sau thẻ Elo mobile thêm đúng7px hiển thị sang phải: tách nền thành lớp absolute compact:-right-[7px]. Không thay bề rộng/neo của thẻ ảnh, icon hoặc số; desktop giữ nguyên. Khóa lại phạm vi.

- 2026-10-23: Đính chính theo user: nền nâu bao Elo mobile nới đều hai bên, trái3.5px/phải3.5px (tổng chiều ngang thêm7px), thay nới riêng bên phải7px. Giữ thẻ/số và tâm hiện tại; khóa lại phạm vi.

- 2026-10-23: Theo user, tăng nút đóng chung Xếp hạng/Bạn bè/Lịch sử mobile: vùng bấm72→84 và dấu×56→64 theo dialog scale. Giữ góc12px, vị trí/buttonInteraction, desktop56/42. Áp dụng qua DialogCloseButton dùng chung; khóa lại phạm vi.

- 2026-10-23: Theo user, nâng nút× chung Xếp hạng/Bạn bè/Lịch sử mobile lên3px hiển thị qua DialogCloseButton. Giữ kích thước84/64, neo ngang/góc và desktop. Khóa lại phạm vi.

- 2026-10-23: Theo user, nâng nút× mobile thêm5px, tổng offset lên8px; đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton. Giữ kích thước và desktop; khóa lại phạm vi.

- 2026-10-23: Theo user, dịch nút× mobile sang phải5px, giữ offset lên8px; đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton. Desktop giữ nguyên; khóa lại phạm vi.

- 2026-10-23: Theo user, dịch nút× mobile thêm lên10px/trái15px so vị trí trước; tổng offset trái10/lên18px. Đồng bộ Xếp hạng/Bạn bè/Lịch sử qua DialogCloseButton; khóa lại phạm vi.

- 2026-10-23: User đính chính hướng dịch nút× lượt trước: phải15px thay trái15px, giữ nâng thêm10px. Tổng offset hiện tại phải20/lên18px cho Xếp hạng/Bạn bè/Lịch sử mobile; desktop giữ nguyên. Khóa lại phạm vi.
